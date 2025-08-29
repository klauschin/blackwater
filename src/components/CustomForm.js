'use client';

import React, { useState } from 'react';
import { setProgressStatus } from '@/store/global/progressLoaderSlice';
import { useAppDispatch } from '@/store/hook';
import { useForm } from 'react-hook-form';
import { hasArrayValue, toCamelCase } from '@/lib/utils';
import { formatObjectToHtml } from '@/lib/utils';
import {
	Form,
	FormControl,
	FormField,
	FormFieldController,
	FormLabel,
	FormMessage,
} from '@/components/Form';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Textarea from '@/components/Textarea';

const VALIDATION_PATTERNS = {
	email: {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
		message: 'Please enter a valid email address',
	},
	phone: {
		value:
			/^(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})$/,
		message: 'Please enter a valid phone number',
	},
};

const FORM_STATES = {
	IDLE: 'idle',
	SUBMITTING: 'submitting',
	SUCCESS: 'success',
	ERROR: 'error',
};

const getFieldRules = ({ required, inputType, minLength }) => {
	const rules = {
		required: required && 'This field is required',
	};

	if (inputType === 'email') {
		rules.pattern = VALIDATION_PATTERNS.email;
	} else if (inputType === 'tel') {
		rules.pattern = VALIDATION_PATTERNS.phone;
	}

	if (minLength) {
		rules.minLength = {
			value: minLength,
			message: `Must be at least ${minLength} characters`,
		};
	}

	return rules;
};

const FormItem = ({ item, control }) => {
	const { inputType, fieldLabel, placeholder, selectOptions, name, rules } =
		item;

	const renderFormComponent = (field) => {
		switch (inputType) {
			case 'textarea':
				return <Textarea {...field} placeholder={placeholder} />;
			case 'select':
				return (
					<Select
						{...field}
						options={selectOptions}
						placeholder={placeholder}
					/>
				);
			default:
				return <Input {...field} type={inputType} placeholder={placeholder} />;
		}
	};

	return (
		<FormFieldController
			control={control}
			name={name}
			rules={rules}
			render={({ field }) => {
				return (
					<FormField>
						<FormLabel>{fieldLabel}</FormLabel>
						<FormControl>{renderFormComponent(field)}</FormControl>
						<FormMessage />
					</FormField>
				);
			}}
		/>
	);
};

export default function CustomForm({ data }) {
	const {
		formTitle,
		formFields,
		successMessage,
		errorMessage,
		sendToEmail,
		emailSubject,
		formFailureNotificationEmail,
	} = data || {};
	const [formState, setFormState] = useState(FORM_STATES.IDLE);
	const dispatch = useAppDispatch();
	const formFieldsData = (formFields || []).map((item) => {
		return {
			...item,
			name: toCamelCase(item.fieldLabel),
			rules: getFieldRules(item),
		};
	});

	const defaultValues = formFieldsData.reduce((acc, { name, inputType }) => {
		acc[name] = '';
		return acc;
	}, {});

	const form = useForm({
		defaultValues,
		mode: 'onSubmit',
	});

	const onHandleSubmit = async (formData) => {
		dispatch(setProgressStatus('start'));
		setFormState(FORM_STATES.SUBMITTING);

		const bodyData = {
			sendToEmail: sendToEmail,
			emailSubject: emailSubject,
			formData: formData,
		};

		try {
			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bodyData),
			});

			if (!response.ok) {
				sendErrorNotificationEmail({
					emailTo: formFailureNotificationEmail,
					bodyData: bodyData,
					errorInfo: response.text(),
				});
				setFormState(FORM_STATES.ERROR);
				throw new Error(await response.text());
			}

			setFormState(FORM_STATES.SUCCESS);
		} catch (error) {
			console.error('Form submission error:', error);
			setFormState(FORM_STATES.ERROR);
			sendErrorNotificationEmail({
				emailTo: formFailureNotificationEmail,
				bodyData: bodyData,
				errorInfo: response.text(),
			});
		} finally {
			setTimeout(() => {
				dispatch(setProgressStatus('complete'));
				if (formState == FORM_STATES.SUCCESS) form.reset();
			}, 1000);
		}
	};

	if (!hasArrayValue(formFields)) return null;

	return (
		<div className="c-form">
			{formTitle && <h4>{formTitle}</h4>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onHandleSubmit)}>
					{formFieldsData.map((item) => (
						<FormItem key={item._key} item={item} control={form.control} />
					))}
					<button
						type="submit"
						disabled={formState === FORM_STATES.SUBMITTING}
						className="btn"
					>
						{formState === FORM_STATES.SUBMITTING ? 'Submitting...' : 'Submit'}
					</button>
				</form>
			</Form>
			{formState === FORM_STATES.SUCCESS && (
				<p>{successMessage || 'Success. Your message has been sent.'}</p>
			)}
			{formState === FORM_STATES.ERROR && (
				<p>
					{errorMessage ||
						'Error. There was an issue submitting your message. Please try again later.'}
				</p>
			)}
		</div>
	);
}

/**
 * Sends an error notification email with form data and error information.
 * Attempts multiple backup email endpoints if primary fails.
 * @param {string} params.emailTo - Recipient email address
 * @param {Object} params.formData - Form data to include in email
 * @param {string} params.errorInfo - Error information to include in email
 * @returns {Promise<{success: boolean, attempts: number, lastError?: Error}>}
 */

async function sendErrorNotificationEmail({ emailTo, bodyData, errorInfo }) {
	const { sendToEmail, emailSubject, formData } = bodyData;
	const emailData = {
		email: emailTo,
		emailSubject: emailSubject,
		emailHtmlContent: `
			<p>
				Your form failed to send. Please notify your website administrator. A backup is provided below.
			</p>
			<p>
				<strong>Error Details: </strong><br>
				Page URL: ${window.location.href}<br>
				Timestamp: ${new Date().toISOString()}<br>
				${formatObjectToHtml(errorInfo)}
			</p>
      <p>
				<strong>Form Data: </strong><br>
				Send to: ${sendToEmail}<br>
				Subject: ${emailSubject}<br>
				${formatObjectToHtml(formData)}
			</p>`,
	};

	async function sendEmail({ apiUrl, emailData }) {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(emailData),
				signal: controller.signal,
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`HTTP error! status: ${response.status}, body: ${errorText}`
				);
			}

			return true;
		} catch (error) {
			console.error(`Email sending failed for ${apiUrl}:`, error);
			return false;
		} finally {
			clearTimeout(timeout);
		}
	}

	const emailApiUrls = [
		'/api/send-notification-email',
		'/api/send-backup-email',
		'/api/send-backup-email?useTransporter2=true',
	];

	let attempts = 0;
	let lastError = null;

	for (const apiUrl of emailApiUrls) {
		attempts++;

		try {
			const success = await sendEmail({ apiUrl, emailData });
			if (success) {
				return { success: true, attempts };
			}
		} catch (error) {
			lastError = error;
			console.error(`Attempt ${attempts} failed:`, error);
		}

		// Add delay between retries
		if (attempts < emailApiUrls.length) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}

	return {
		success: false,
		attempts,
		lastError,
	};
}

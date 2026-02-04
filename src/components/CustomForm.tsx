'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	Controller,
	useForm,
	FieldValues,
	Control,
	ControllerFieldState,
} from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { hasArrayValue, toCamelCase } from '@/lib/utils';
import { formatObjectToHtml } from '@/lib/utils';
import CustomPortableText from '@/components/CustomPortableText';

import { Button } from '@/components/ui/Button';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldStatus,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

// Type definitions
type FormState = 'idle' | 'submitting' | 'success' | 'error';

const FORM_STATES: Record<string, FormState> = {
	IDLE: 'idle',
	SUBMITTING: 'submitting',
	SUCCESS: 'success',
	ERROR: 'error',
} as const;

interface ValidationPattern {
	value: RegExp;
	message: string;
}

const VALIDATION_PATTERNS: Record<string, ValidationPattern> = {
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

interface SelectOption {
	_key: string;
	value: string;
	title: string;
}

interface FormField {
	_key: string;
	fieldLabel: string;
	required?: boolean;
	inputType?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
	minLength?: number;
	placeholder?: string;
	selectOptions?: SelectOption[];
	fieldWidth?: 'full' | 'half';
	description?: string;
}

interface FormFieldWithName extends FormField {
	name: string;
}

interface CustomFormData {
	formFields?: FormField[];
	successMessage?: string;
	errorMessage?: string;
	sendToEmail?: string;
	emailSubject?: string;
	formFailureNotificationEmail?: string;
	legalConsent?: any; // Type based on your CustomPortableText blocks type
}

interface CustomFormProps {
	data?: CustomFormData;
	className?: string;
	fieldGapX?: number;
}

interface EmailData {
	email: string;
	emailSubject: string;
	emailHtmlContent: string;
}

interface SendEmailParams {
	apiUrl: string;
	emailData: EmailData;
}

interface SendErrorNotificationParams {
	emailTo: string;
	bodyData: {
		sendToEmail?: string;
		emailSubject?: string;
		formData: FieldValues;
	};
	errorInfo: string;
}

interface EmailResult {
	success: boolean;
	attempts: number;
	lastError?: Error;
}

interface FieldComponentTypeProps {
	id: string;
	field: FormFieldWithName;
	fieldState: ControllerFieldState;
	controllerField: any; // You can use ControllerRenderProps from react-hook-form for more specific typing
}

interface FormItemProps {
	form: {
		control: Control<any>;
		handleSubmit: any;
		reset: () => void;
	};
	field: FormFieldWithName;
}

export function createDynamicResolver(fieldsArray: FormField[]) {
	const shape: Record<string, z.ZodTypeAny> = {};

	fieldsArray.forEach((field) => {
		const { fieldLabel, required, inputType, minLength } = field;
		let schema: z.ZodTypeAny = z.string();

		if (required) {
			schema = z.string().min(1, { message: 'This field is required' });
		} else {
			schema = z.string().optional().or(z.literal(''));
		}

		if (inputType === 'email') {
			schema = z.string().email('Invalid email format');
		}

		if (inputType === 'tel') {
			const phoneRegex = new RegExp(VALIDATION_PATTERNS.phone.value);
			schema = z.string().regex(phoneRegex, VALIDATION_PATTERNS.phone.message);
		}

		if (minLength) {
			schema = z.string().min(minLength, {
				message: `Must be at least ${minLength} characters`,
			});
		}

		shape[toCamelCase(fieldLabel)] = schema;
	});
	return zodResolver(z.object(shape));
}

const FieldComponentType: React.FC<FieldComponentTypeProps> = ({
	id,
	field,
	fieldState,
	controllerField,
}) => {
	const { inputType, placeholder, selectOptions } = field || {};

	switch (inputType) {
		case 'textarea':
			return (
				<Textarea
					{...controllerField}
					id={id}
					placeholder={placeholder}
					className={cn('h-40 resize-none')}
				/>
			);
		case 'select':
			return (
				<Select
					name={field.name}
					value={controllerField.value}
					onValueChange={controllerField.onChange}
				>
					<SelectTrigger
						id={id}
						className={cn('w-full', { ' pr-8': fieldState.invalid })}
					>
						<SelectValue placeholder="Select one" />
					</SelectTrigger>
					<SelectContent side="bottom" position="popper">
						{selectOptions?.map((item) => (
							<SelectItem key={item._key} value={item.value}>
								{item.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			);
		default:
			return (
				<Input
					{...controllerField}
					id={id}
					placeholder={placeholder}
					className={cn({ 'pr-8': fieldState.invalid })}
				/>
			);
	}
};

const FormItem: React.FC<FormItemProps> = ({ form, field }) => {
	const { fieldLabel, fieldWidth, description } = field;
	const [isFocused, setIsFocused] = useState<boolean>(false);

	return (
		<Controller
			name={field.name}
			control={form.control}
			render={({ field: controllerField, fieldState }) => {
				const isInvalid = fieldState.invalid;
				const id = field.name + '-' + field._key;
				return (
					<Field
						orientation="horizontal"
						data-invalid={isInvalid}
						className={cn('basis-full', {
							'basis-[calc(50%-var(--gap-x)/2)]': fieldWidth === 'half',
						})}
					>
						<FieldContent>
							<FieldLabel
								htmlFor={id}
								className={cn('capitalize', {
									"gap-0 after:content-['*']": field.required,
								})}
							>
								{fieldLabel}
							</FieldLabel>
							{description && (
								<FieldDescription>{description}</FieldDescription>
							)}
							<div className="relative grid">
								<FieldComponentType
									id={id}
									field={field}
									controllerField={{
										...controllerField,
										onFocus: () => {
											setIsFocused(true);
										},
										onBlur: () => {
											controllerField?.onBlur?.();
											setIsFocused(false);
										},
									}}
									fieldState={fieldState}
								/>
								<FieldStatus
									fieldState={fieldState}
									isFocused={isFocused}
									isShowErrorOnFocus={true}
								/>
							</div>
						</FieldContent>
					</Field>
				);
			}}
		/>
	);
};

export function CustomForm({ data, className, fieldGapX }: CustomFormProps) {
	const {
		formFields,
		successMessage,
		errorMessage,
		sendToEmail,
		emailSubject,
		formFailureNotificationEmail,
		legalConsent,
	} = data || {};
	const [formState, setFormState] = useState<FormState>(FORM_STATES.IDLE);

	const formFieldData: FormFieldWithName[] = (formFields || []).map((item) => {
		return {
			...item,
			name: toCamelCase(item.fieldLabel),
		};
	});

	const defaultValues = formFieldData.reduce<Record<string, string>>(
		(acc, { name }) => {
			acc[name] = '';
			return acc;
		},
		{}
	);

	const form = useForm({
		resolver: createDynamicResolver(formFields || []),
		defaultValues,
		mode: 'onSubmit',
	});

	const onHandleSubmit = async (formData: FieldValues) => {
		setFormState(FORM_STATES.SUBMITTING);

		const bodyData = {
			sendToEmail: sendToEmail,
			emailSubject: emailSubject,
			formData: formData,
		};

		try {
			const response = await fetch('/api/contact-form/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bodyData),
			});

			if (!response.ok) {
				const errorText = await response.text();
				sendErrorNotificationEmail({
					emailTo: formFailureNotificationEmail || '',
					bodyData: bodyData,
					errorInfo: errorText,
				});
				setFormState(FORM_STATES.ERROR);
				form.reset();
				throw new Error(errorText);
			}

			setFormState(FORM_STATES.SUCCESS);
		} catch (error) {
			console.error('Form submission error:', error);
			setFormState(FORM_STATES.ERROR);
			// Note: 'response' is not in scope here - this was a bug in the original code
			sendErrorNotificationEmail({
				emailTo: formFailureNotificationEmail || '',
				bodyData: bodyData,
				errorInfo: error instanceof Error ? error.message : String(error),
			});
		}
	};

	if (!hasArrayValue(formFields)) return null;

	return (
		<form
			onSubmit={form.handleSubmit(onHandleSubmit)}
			className={cn(className)}
		>
			<FieldGroup
				className="flex flex-wrap gap-x-(--gap-x) gap-y-4"
				style={{ '--gap-x': `${fieldGapX}px` } as React.CSSProperties}
			>
				{formFieldData.map((field) => (
					<FormItem key={field._key} field={field} form={form} />
				))}
			</FieldGroup>
			{formState === FORM_STATES.SUCCESS && (
				<p className="t-b-1">
					{successMessage || 'Success. Your message has been sent.'}
				</p>
			)}
			{formState === FORM_STATES.ERROR && (
				<p>
					{errorMessage ||
						'Error. There was an issue submitting your message. Please try again later.'}
				</p>
			)}
			{legalConsent && (
				<div className="mt-auto max-w-[340px] text-[10px]">
					<CustomPortableText blocks={legalConsent} />
				</div>
			)}
			<Button
				type="submit"
				disabled={formState === FORM_STATES.SUBMITTING}
				className={cn('w-fit')}
			>
				{formState === FORM_STATES.SUBMITTING ? 'Sending...' : 'Submit'}
			</Button>
		</form>
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
async function sendErrorNotificationEmail({
	emailTo,
	bodyData,
	errorInfo,
}: SendErrorNotificationParams): Promise<EmailResult> {
	const { sendToEmail, emailSubject, formData } = bodyData;
	const emailData: EmailData = {
		email: emailTo,
		emailSubject: emailSubject || 'Form Submission Error',
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

	async function sendEmail({
		apiUrl,
		emailData,
	}: SendEmailParams): Promise<boolean> {
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

	const emailApiUrls: string[] = [
		'/api/send-notification-email',
		'/api/send-backup-email',
		'/api/send-backup-email?useTransporter2=true',
	];

	let attempts = 0;
	let lastError: Error | null = null;

	for (const apiUrl of emailApiUrls) {
		attempts++;

		try {
			const success = await sendEmail({ apiUrl, emailData });
			if (success) {
				return { success: true, attempts };
			}
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error));
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
		lastError: lastError || undefined,
	};
}

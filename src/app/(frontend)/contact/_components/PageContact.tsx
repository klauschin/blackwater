'use client';
import CustomPortableText from '@/components/CustomPortableText';
import { CustomForm } from '@/components/CustomForm';

interface ContactFormData {
	formTitle?: string;
	formFields?: any[];
	successMessage?: string;
	errorMessage?: string;
	sendToEmail?: string;
	emailSubject?: string;
	formFailureNotificationEmail?: string;
}

interface PageContactProps {
	data?: {
		title?: string;
		description?: string;
		contactForm?: ContactFormData;
		legalConsent?: any;
	};
}

export function PageContact({ data }: PageContactProps) {
	const { title, description, contactForm, legalConsent } = data || {};

	return (
		<div className="px-contain m-auto flex flex-wrap justify-center h-main">
			<div className="lg:flex-1 space-y-2">
				{title && <h1 className="t-l-1 uppercase">{title}</h1>}
				{description && <p>{description}</p>}
			</div>
			<div className="lg:flex-1">
				{contactForm?.formTitle && (
					<h4 className="mb-15">{contactForm?.formTitle}</h4>
				)}
				<CustomForm
					data={contactForm}
					className="[&_button[type=submit]]:w-full [&_button[type=submit]]:mt-15 space-y-4 [&_label]:uppercase"
					fieldGapX={10}
				/>
				{legalConsent && (
					<div className="mt-4 text-xs">
						<CustomPortableText blocks={legalConsent} />
					</div>
				)}
			</div>
		</div>
	);
}

'use client';

import { CustomForm } from '@/components/CustomForm';

interface ContactFormData {
	formTitle?: string;
	formFields?: any[];
	successMessage?: string;
	errorMessage?: string;
	sendToEmail?: string;
	emailSubject?: string;
	formFailureNotificationEmail?: string;
	legalConsent?: any;
}

interface PageContactProps {
	data?: { 
		title?: string; 
		description?: string;
		contactForm?: ContactFormData;
	};
}

export function PageContact({ data }: PageContactProps) {
	const { title, description, contactForm } = data || {};

	return (
		<div className="px-contain m-auto flex flex-wrap justify-center h-main pt-[25vh]">
			<div className="lg:flex-1 space-y-2">
				{title && <h1 className="t-l-1 uppercase">{title}</h1>}
				{description && <p>{description}</p>}
			</div>
			<div className="lg:flex-1">
				<CustomForm
					data={contactForm}
					className="[&_h4]:mb-15 [&_button[type=submit]]:mt-15"
				/>
			</div>
		</div>
	);
}

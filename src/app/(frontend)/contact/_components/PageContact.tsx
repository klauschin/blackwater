'use client';
import CustomPortableText from '@/components/CustomPortableText';
import { CustomForm } from '@/components/CustomForm';
import { PortableTextSimple, PageContactQueryResult } from 'sanity.types';
interface ContactFormData {
	formTitle?: PortableTextSimple;
	formFields?: any[];
	successMessage?: string;
	errorMessage?: string;
	sendToEmail?: string;
	emailSubject?: string;
	formFailureNotificationEmail?: string;
}

interface PageContactProps {
	data?: PageContactQueryResult;
}

export function PageContact({ data }: PageContactProps) {
	const { title, description, contactForm, legalConsent } = data || {};

	return (
		<div className="px-contain m-auto flex flex-wrap justify-center h-main">
			<div className="lg:flex-1 space-y-2">
				{title && <h1 className="t-l-1 uppercase">{title}</h1>}
				{description && <p>{description}</p>}
			</div>
			<div className="lg:flex-1 flex flex-col justify-center">
				{contactForm?.formTitle && (
					<div className="mb-15">
						<CustomPortableText blocks={contactForm?.formTitle} />
					</div>
				)}
				<CustomForm
					data={contactForm}
					className="[&_button[type=submit]]:w-full space-y-4 [&_label]:uppercase"
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

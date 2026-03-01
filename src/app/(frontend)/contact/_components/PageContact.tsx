'use client';
import CustomPortableText from '@/components/CustomPortableText';
import { CustomForm } from '@/components/CustomForm';
import { PageContactQueryResult } from 'sanity.types';

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
				<div className="max-w-md">
					{contactForm?.formTitle && (
						<div className="t-b-2 mb-15 wysiwyg">
							<CustomPortableText blocks={contactForm?.formTitle} />
						</div>
					)}
					<CustomForm
						id="page-contact-form"
						data={contactForm}
						className="[&_button[type=submit]]:w-full space-y-4 [&_label]:uppercase"
						fieldGapX={10}
					/>
					{legalConsent && (
						<div className="mt-4 t-b-2 wysiwyg">
							<CustomPortableText blocks={legalConsent} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

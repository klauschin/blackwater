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
		<div className="px-contain m-auto flex flex-col md:flex-row md:justify-center min-h-main gap-2.5 my-10">
			<div className="md:flex-1 space-y-2 text-left w-full">
				{title && <h1 className="t-l-1 uppercase">{title}</h1>}
				{description && <p>{description}</p>}
			</div>
			<div className="md:flex-1 flex flex-col justify-center">
				<div className="max-w-md">
					<CustomForm
						id="page-contact-form"
						data={contactForm}
						className="[&_button[type=submit]]:w-full [&_label]:uppercase [&_button[type=submit]]:sticky [&_button[type=submit]]:bottom-[calc(var(--height-g-toolbar)+1rem)] [&_button[type=submit]]:md:relative [&_button[type=submit]]:md:bottom-0"
						fieldGapX={10}
					/>
					{legalConsent && (
						<div className="mt-4 t-b-2 wysiwyg">
							<CustomPortableText blocks={legalConsent as any} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

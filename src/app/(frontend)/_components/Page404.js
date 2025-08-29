'use client';

import CustomLink from '@/components/CustomLink';
import CustomPortableText from '@/components/CustomPortableText';

export default function Page404({ data }) {
	const { heading, paragraph, callToAction } = data || {};

	return (
		<div className="min-h-main py-section flex-col items-center justify-center text-center">
			<div className="c-narrow wysiwyg">
				<h1>{heading || 'Page not found'}</h1>

				{paragraph && <CustomPortableText blocks={paragraph} />}

				{callToAction && (
					<CustomLink
						link={callToAction.link}
						className="rounded-2xl border px-4"
					>
						{callToAction.label}
					</CustomLink>
				)}
			</div>
		</div>
	);
}

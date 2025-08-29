'use client';
import React from 'react';
import InteractiveWater from '@/components/InteractiveWater';
import CustomLink from '@/components/CustomLink';
import CustomPortableText from '@/components/CustomPortableText';
import { Button } from '@/components/Button';
interface PageGeneralProps {
	data: {
		heading: string;
		content: [];
		callToAction: {
			isButton: boolean;
			label: string;
			link: { isNewTab: boolean; route: string; _type: string };
		};
	};
}

export default function Page404({ data }: PageGeneralProps) {
	const { heading, content, callToAction } = data || {};
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="p-fill -z-10">
				<InteractiveWater />
			</div>
			<h1 className="text-4xl text-white z-10">
				{heading || 'Page not found'}
			</h1>
			<div className="relative z-10 text-white p-contain max-w-5xl">
				{content && <CustomPortableText blocks={content} />}
			</div>
			<Button asChild className="uppercase">
				{callToAction && (
					<CustomLink
						link={callToAction.link}
						title={callToAction.label}
						isButton={true}
					>
						{callToAction.label}
					</CustomLink>
				)}
			</Button>
		</div>
	);
}

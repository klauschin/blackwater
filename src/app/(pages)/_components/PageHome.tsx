'use client';

import type { HomePageData } from '@/types';
import CustomPortableText from '@/components/CustomPortableText';
import InteractiveWater from '@/components/InteractiveWater';

export interface PageHomeProps {
	data: HomePageData;
}

export default function PageHome({ data }: PageHomeProps) {
	const { content } = data || {};

	return (
		<div className="h-screen flex flex-col justify-center items-center relative">
			<InteractiveWater />
			<div className="relative z-10 text-white p-contain max-w-5xl">
				{content && <CustomPortableText blocks={content} />}
			</div>
		</div>
	);
}

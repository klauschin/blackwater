'use client';
import PageModules from '@/components/PageModules';
import { motion } from 'motion/react';
import { fadeAnim } from '@/lib/animate';
interface PageHomeProps {
	data: {
		pageModules?: Array<any>;
		landingTitle?: string;
	};
}

export default function PageHome({ data }: PageHomeProps) {
	const { pageModules, landingTitle } = data || {};

	return (
		<div className="p-home flex min-h-[inherit] flex-col justify-center gap-5">
			<div className="px-contain mx-auto max-w-sm text-center text-sm text-balance uppercase sm:max-w-6xl">
				<motion.h1
					key="landing-title"
					initial="hide"
					animate="show"
					variants={fadeAnim}
					transition={{
						duration: 0.6,
						delay: 0.3,
						ease: [0, 0.71, 0.2, 1.01],
					}}
				>
					{landingTitle}
				</motion.h1>
			</div>
			{pageModules?.map((module, i) => (
				<PageModules key={`page-module-${i}`} module={module} />
			))}
		</div>
	);
}

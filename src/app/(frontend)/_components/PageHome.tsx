import PageModules from '@/components/PageModules';
import { TextReveal } from '@/components/TextReveal';

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
			<TextReveal
				text={landingTitle || ''}
				className="px-contain mx-auto max-w-[340px] text-center text-sm text-balance uppercase sm:max-w-6xl"
				htmlTag="h1"
			/>
			{pageModules?.map((module, i) => (
				<PageModules key={`page-module-${i}`} module={module} />
			))}
		</div>
	);
}

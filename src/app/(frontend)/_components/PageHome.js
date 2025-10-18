import PageModules from '@/components/PageModules';
import { TextReveal } from '@/components/TextReveal';

export default function PageHome({ data }) {
	const { pageModules, landingTitle } = data || {};

	return (
		<div className="p-home flex h-screen flex-col justify-center gap-5">
			<TextReveal
				text={landingTitle}
				maxWordsPerLine={6}
				className="px-contain mx-auto max-w-[340px] text-center text-sm text-balance uppercase sm:max-w-6xl"
				htmlTag="h1"
				splitMethod="manual"
			/>
			{pageModules?.map((module, i) => (
				<PageModules key={`page-module-${i}`} module={module} />
			))}
		</div>
	);
}

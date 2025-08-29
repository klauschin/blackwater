import PageModules from '@/components/PageModules';
import { TextReveal } from '@/components/TextReveal';

export default function PageHome({ data }) {
	const { pageModules, landingTitle } = data || {};

	return (
		<div className="p-home flex h-screen flex-col justify-center gap-5">
			<TextReveal
				text={landingTitle}
				maxWordsPerLine={6}
				className="px-contain mx-auto max-w-5xl text-center text-[13px] -tracking-[0.03rem] text-balance uppercase"
				htmlTag="h1"
				splitMethod="manual"
			/>
			{pageModules?.map((module, i) => (
				<PageModules key={`page-module-${i}`} module={module} />
			))}
		</div>
	);
}

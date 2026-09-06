import PageModules from '@/components/PageModules';
import type { Locale } from '@/lib/i18n';

interface PageHomeProps {
	data: {
		pageModules?: Array<any>;
	};
	locale: Locale;
}

export default function PageHome({ data, locale }: PageHomeProps) {
	const { pageModules } = data || {};

	return (
		<>
			{pageModules?.map((module, index) => (
				<PageModules
					key={module._key}
					module={module}
					locale={locale}
					// The first module opens the page, so it owns the <h1>; everything
					// below falls through to HeroBlock's 'h2' default. Hidden modules are
					// filtered out in GROQ (`moduleVisible`), so slot 0 is what a visitor
					// actually sees.
					headingLevel={index === 0 ? 'h1' : undefined}
				/>
			))}
		</>
	);
}

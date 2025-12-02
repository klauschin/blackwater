import PageModules from '@/components/PageModules';
import { cn, hasArrayValue } from '@/lib/utils';

export default function PageGeneral({ data }) {
	const { pageModules } = data || {};

	return (
		<div className={cn({
			"min-h-main flex flex-col justify-center": hasArrayValue(pageModules) && pageModules.length === 1,
		})}>
			{hasArrayValue(pageModules) &&
				pageModules?.map((module, i) => (
					<PageModules
						key={module?._key}
						module={module}
						index={i}
						hasFirstSection
					/>
				))}
		</div>
	);
}

import { hasArrayValue } from '@/lib/utils';
import CustomPortableText from '@/components/CustomPortableText';
import PageModules from '@/components/PageModules';

export default function PageGeneral({ data }) {
	const { title, layout, content, pageModules } = data || {};

	return (
		<>
			{layout === 'editor' && hasArrayValue(content) && (
				<section className="p-general">
					{title && <h1 className="p-general__header">{title}</h1>}
					<div className="p-general__content wysiwyg-page">
						<CustomPortableText blocks={content} />
					</div>
				</section>
			)}
			{layout === 'modules' &&
				pageModules?.map((module, i) => (
					<PageModules
						key={module?._key}
						module={module}
						index={i}
						hasFirstSection
					/>
				))}
		</>
	);
}

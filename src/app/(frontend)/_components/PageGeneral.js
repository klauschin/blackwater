import { hasArrayValue } from '@/lib/utils';
import CustomPortableText from '@/components/CustomPortableText';
import PageModules from '@/components/PageModules';

export default function PageGeneral({ data }) {
	const { title, layout, content, pageModules } = data || {};

	return (
		<section className="p-general flex justify-center px-contain max-w-5xl mx-auto">
			{title && <h1 className="p-general__header flex-1">{title}</h1>}
			<div className="p-general__content wysiwyg-page flex-1">
				<CustomPortableText blocks={content} />
			</div>
		</section>
	);
}

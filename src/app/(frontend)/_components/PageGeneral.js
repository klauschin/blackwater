import { hasArrayValue } from '@/lib/utils';
import CustomPortableText from '@/components/CustomPortableText';
import PageModules from '@/components/PageModules';

export default function PageGeneral({ data }) {
	const { title, layout, content, pageModules } = data || {};

	return (
		<div class="min-h-main">
			{layout === 'editor' && hasArrayValue(content) && (
				<div className="flex justify-center items-center min-h-[inherit]">
					<div className='wysiwyg-page max-w-[650px] text-center'>
						<CustomPortableText blocks={content} />
					</div>
				</div>
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
		</div>
	);
}

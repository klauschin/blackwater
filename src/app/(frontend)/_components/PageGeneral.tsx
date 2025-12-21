import CustomPortableText from '@/components/CustomPortableText';
import { format } from 'date-fns';

interface PageGeneralData {
	title?: string;
	content?: any; // TODO: Refine this type if possible, e.g., PortableTextBlock[]
	_updatedAt?: string;
}

interface PageGeneralProps {
	data: PageGeneralData;
}

export default function PageGeneral({ data }: PageGeneralProps) {
	const { title, content, _updatedAt } = data || {};

	return (
		<section className="p-general flex flex-col lg:flex-row justify-center px-contain max-w-6xl mx-auto my-48 gap-10">
			<div className="flex-1 lg:sticky lg:top-header h-fit">
				{title && <h1 className="t-b-1 uppercase">{title}</h1>}
				{_updatedAt && (
					<p className="t-b-1 uppercase">
						Last updated: {format(new Date(_updatedAt), 'PPP')}
					</p>
				)}
			</div>

			<div className="p-general__content wysiwyg-page flex-1">
				<CustomPortableText blocks={content} />
			</div>
		</section>
	);
}

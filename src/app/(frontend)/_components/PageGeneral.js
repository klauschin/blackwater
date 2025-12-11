import CustomPortableText from '@/components/CustomPortableText';


export default function PageGeneral({ data }) {
	const { title, content } = data || {};

	return (
		<section className="p-general flex justify-center px-contain max-w-5xl mx-auto my-48">
			<aside className="flex-1 sticky top-48">
				{title && <h1 className="t-b-1 uppercase">{title}</h1>}
			</aside>

			<div className="p-general__content wysiwyg-page flex-1">
				<CustomPortableText blocks={content} />
			</div>
		</section>
	);
}

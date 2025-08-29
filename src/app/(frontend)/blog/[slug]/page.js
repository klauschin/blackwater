import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { pageBlogSingleQuery, pageBlogSlugsQuery } from '@/sanity/lib/queries';
import defineMetadata from '@/lib/defineMetadata';
import PageBlogSingle from '../_components/PageBlogSingle';

export async function generateStaticParams() {
	const { data } = await sanityFetch({
		query: pageBlogSlugsQuery,
		perspective: 'published',
		stega: false,
	});
	return data;
}

export async function generateMetadata(props) {
	const params = await props.params;
	const { data } = await sanityFetch({
		query: pageBlogSingleQuery,
		params,
		tags: [`pBlog:${params.slug}`],
		stega: false,
	});
	return defineMetadata({ data });
}

export default async function Page(props) {
	const params = await props.params;
	const { data } = await sanityFetch({
		query: pageBlogSingleQuery,
		params,
		tags: [`pBlog:${params.slug}`],
	});

	if (!data) return notFound();

	return <PageBlogSingle data={data} />;
}

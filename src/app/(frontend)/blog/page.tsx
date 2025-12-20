import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import {
	pageBlogIndexQuery,
	pageBlogIndexWithArticleDataSSGQuery,
	pageBlogPaginationMethodQuery,
} from '@/sanity/lib/queries';
import defineMetadata from '@/lib/defineMetadata';
import PageBlogIndex from './_components/PageBlogIndex';

export function getBlogPaginationMethodData() {
	return sanityFetch({
		query: pageBlogPaginationMethodQuery,
		tags: ['pBlogIndex', 'pBlog'],
	});
}

export async function generateMetadata() {
	const { data } = await sanityFetch({
		query: pageBlogIndexQuery,
		tags: ['pBlogIndex'],
		stega: false,
	});
	return defineMetadata({ data });
}

export default async function Page() {
	const isArticleDataSSG = true;

	const { data } = await sanityFetch({
		query: isArticleDataSSG
			? pageBlogIndexWithArticleDataSSGQuery
			: pageBlogIndexQuery,
		tags: ['pBlogIndex'],
	});

	if (!data) return notFound();

	return <PageBlogIndex data={data} />;
}

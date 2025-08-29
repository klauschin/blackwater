import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { pageContactQuery } from '@/sanity/lib/queries';
import defineMetadata from '@/lib/defineMetadata';
import PageContact from './_components/PageContact';

export async function generateMetadata() {
	const data = await sanityFetch({
		query: pageContactQuery,
		tags: ['pContact'],
		stega: false,
	});
	return defineMetadata({ data });
}

export default async function Page() {
	const { data } = await sanityFetch({
		query: pageContactQuery,
		tags: ['pContact'],
	});

	if (!data) return notFound();

	return <PageContact data={data} />;
}

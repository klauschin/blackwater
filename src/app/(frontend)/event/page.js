import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { pEventIndexQuery } from '@/sanity/lib/queries';
import defineMetadata from '@/lib/defineMetadata';
import { PageEventIndex } from './_components/PageEventIndex';

export async function generateMetadata() {
	const { data } = await sanityFetch({
		query: pEventIndexQuery,
		tags: ['pEventIndex'],
		stega: false,
	});
	return defineMetadata({ data });
}

export default async function Page() {
	const { data } = await sanityFetch({
		query: pEventIndexQuery,
		tags: ['pEventIndex'],
	});

	if (!data) return notFound();

	return <PageEventIndex data={data} />;
}

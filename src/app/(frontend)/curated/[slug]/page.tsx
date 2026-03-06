import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import {
	pageCuratedSingleQuery,
	pageCuratedSlugsQuery,
} from '@/sanity/lib/queries';
import defineMetadata from '@/lib/defineMetadata';
import PageCuratedSingle from './_components/PageCuratedSingle';

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const { data } = await sanityFetch({
		query: pageCuratedSlugsQuery,
		perspective: 'published',
		stega: false,
	});
	return data ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const { data } = await sanityFetch({
		query: pageCuratedSingleQuery,
		params: { slug },
		tags: ['pCurated'],
		stega: false,
	});
	return defineMetadata({ data });
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const { data } = await sanityFetch({
		query: pageCuratedSingleQuery,
		params: { slug },
		tags: ['pCurated', 'pCuratedCategory'],
	});

	if (!data) return notFound();

	return <PageCuratedSingle data={data} />;
}

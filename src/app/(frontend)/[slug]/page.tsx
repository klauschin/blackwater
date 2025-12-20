import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { pageGeneralQuery, pageGeneralSlugsQuery } from '@/sanity/lib/queries';
import defineMetadata from '@/lib/defineMetadata';
import PageGeneral from '../_components/PageGeneral';

export async function generateStaticParams() {
	const { data } = await sanityFetch({
		query: pageGeneralSlugsQuery,
		perspective: 'published',
		stega: false,
	});

	return data;
}

type MetadataProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	props: MetadataProps
): Promise<Metadata> {
	const params = await props.params;
	const { data } = await sanityFetch({
		query: pageGeneralQuery,
		params,
		tags: [`pGeneral:${params.slug}`],
		stega: false,
	});
	return defineMetadata({ data });
}

export default async function PageSlugRoute(props: MetadataProps) {
	const params = await props.params;

	const { data } = await sanityFetch({
		query: pageGeneralQuery,
		params,
		tags: [`pGeneral:${params.slug}`],
	});

	if (!data) {
		return notFound();
	}

	return <PageGeneral data={data} />;
}

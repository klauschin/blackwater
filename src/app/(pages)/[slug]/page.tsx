import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import defineMetadata from '@/lib/defineMetadata';
import PageGeneral from '../_components/PageGeneral';
import { getPageBySlug, getPagesPaths } from '@/sanity/lib/fetch';

export async function generateStaticParams() {
	const { data: slugs } = await getPagesPaths({ pageType: 'pGeneral' });
	const params = slugs.map((slug: string) => ({ slug }));
	return params;
}

const getPageData = async (slug: string) => {
	return await getPageBySlug({ slug });
};

type MetadataProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { slug } = await params;
	const data = await getPageData(slug);
	return defineMetadata({ data });
}

export default async function PageSlugRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const data = await getPageData(slug);
	const { page } = data || {};

	if (!page) {
		return notFound();
	}

	return <PageGeneral data={page} />;
}

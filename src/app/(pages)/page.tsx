import React from 'react';

import PageHome from './_components/PageHome';
import { getPageHomeData } from '@/sanity/lib/fetch';
import { notFound } from 'next/navigation';
import defineMetadata from '@/lib/defineMetadata';
const getPageData = async () => {
	return await getPageHomeData();
};

export async function generateMetadata() {
	const data = await getPageData();
	return defineMetadata({ data });
}

export default async function Page() {
	const pageData = await getPageData();
	const { page } = pageData || {};

	if (!page) {
		return notFound();
	}

	return <PageHome data={page} />;
}

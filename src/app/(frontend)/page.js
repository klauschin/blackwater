import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { pageHomeQuery } from '@/sanity/lib/queries';
import defineMetadata from '@/lib/defineMetadata';
import PageHome from './_components/PageHome';

export async function generateMetadata() {
	const { data } = await sanityFetch({
		query: pageHomeQuery,
		tags: ['pHome'],
		stega: false,
	});
	return defineMetadata({ data });
}

export default async function Page() {
	const { data } = await sanityFetch({
		query: pageHomeQuery,
		tags: ['pHome'],
	});

	if (!data)
		return (
			<div className="flex h-screen items-center justify-center">
				<p>
					Edit the content in{' '}
					<Link
						href="/sanity/structure/pages;homepage"
						className="text-blue underline"
					>
						/sanity/structure/pages;homepage
					</Link>
				</p>
			</div>
		);

	return <PageHome data={data} />;
}

import { sanityFetch } from '@/sanity/lib/live';
import { page404Query } from '@/sanity/lib/queries';
import Page404 from './_components/Page404';

export default async function NotFound() {
	const { data } = await sanityFetch({
		query: page404Query,
		tags: ['p404'],
	});
	return <Page404 data={data} />;
}

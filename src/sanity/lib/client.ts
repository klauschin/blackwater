import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn,
	perspective: 'published',
});

export async function sanityFetch<const QueryString extends string>({
	query,
	params = {},
	revalidate = 60,
	tags = [],
}: {
	query: QueryString;
	params?: QueryParams;
	revalidate?: number | false;
	tags?: string[];
}) {
	return client.fetch(query, params, {
		next: {
			revalidate: tags.length ? false : revalidate,
			tags,
		},
	});
}

import 'server-only';

import { sanityFetch } from '@/sanity/lib/client';
import { sanityFetch as sanityLiveFetch } from '@/sanity/lib/live';
import * as queries from '@/sanity/lib/queries';
import { defineQuery } from 'next-sanity';

export async function getSiteData() {
	const data = sanityFetch({
		query: `{${queries.site}}`,
		tags: [
			'gAnnouncement',
			'gHeader',
			'gFooter',
			'settingsMenu',
			'settingsGeneral',
			'settingsSharing',
			'settingsIntegration',
			'settingsBrandColors',
		],
	});

	return data;
}

const getPageDataStructure = ({ query }: { query: string }) => {
	const data = `{
		"page": ${query},
		${queries.site}
	}`;

	return data;
};

export async function getPageHomeData() {
	const query = getPageDataStructure({ query: queries.pageHomeQuery });

	return sanityFetch({
		query,
		tags: [`pHome`],
	});
}

export async function get404PageData() {
	const query = getPageDataStructure({ query: queries.page404Query });

	return sanityFetch({
		query,
		tags: ['p404'],
	});
}

export function getPagesPaths({ pageType }: { pageType: string }) {
	const getQuery = (pageType: string) => {
		switch (pageType) {
			case 'pGeneral':
				return defineQuery(`*[_type == "pGeneral" ].slug.current`);
			default:
				console.warn('Invalid Page Type:', pageType);
				return defineQuery(`*[_type == "pGeneral" ].slug.current`);
		}
	};

	const query = getQuery(pageType);
	return sanityLiveFetch({ query, perspective: 'published', stega: false });
}

export function getPageBySlug({ slug }: { slug: string }) {
	const query = getPageDataStructure({ query: queries.pagesBySlugQuery });

	return sanityFetch({
		query,
		params: { slug },
		tags: [`pGeneral:${slug}`],
	});
}

// new pages below...
// export function getAboutPage(params) {
// 	const query = getPageDataStructure({ query: queries.pageAboutQuery });

// 	return sanityFetch({
// 		query,
// 		params: params,
// 		tags: [`pAbout:${params.slug}`],
// 	});
// }

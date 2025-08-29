const { createClient } = require('@sanity/client');

const sanityOptions = {
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: 'production',
	apiVersion: '2023-08-01',
	useCdn: false,
	perspective: 'published',
};

const client = createClient(sanityOptions);
const path = require('path');

const nextConfig = {
	async redirects() {
		let dynamicRedirects = [];

		const isExternalURL = (url) => {
			const siteOrigin = process.env.SITE_URL;
			const destinationOrigin = new URL(url, siteOrigin).origin;
			return destinationOrigin !== siteOrigin;
		};

		const redirects = await client.fetch(
			`*[_type == "settingsRedirect"]{
					"source": url.current,
					"destination": destination {
							"resolvedHref": select(
								linkType == "external" => externalUrl,
								linkType == "internal" => internalLink-> {
									"url": select(
										_type == "pHome" => "/",
										_type == "pBlogIndex" => "/blog",
										_type == "pBlog" => "/blog/" + slug.current,
										defined(slug.current) => "/" + slug.current,
										null
									)
								}.url,
								null
							)
						}.resolvedHref,
					"permanent": permanent
        }`
		);

		if (redirects && Array.isArray(redirects)) {
			dynamicRedirects = redirects.map((redirect) => ({
				source: redirect?.source,
				destination: redirect?.destination,
				permanent: redirect.permanent,
				...(isExternalURL(redirect?.destination) && { basePath: false }),
			}));
		}

		return dynamicRedirects;
	},
	env: {
		SITE_URL: process.env.SITE_URL,
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/**`,
			},
		],
	},
};

module.exports = nextConfig;

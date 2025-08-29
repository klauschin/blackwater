import { defineType } from 'sanity';

export default defineType({
	title: 'SEO + Social Sharing',
	name: 'settingsSharing',
	type: 'document',
	fields: [
		{
			title: 'Site Title',
			name: 'siteTitle',
			type: 'string',
			description: 'The name of your site, usually your company/brand name',
		},
		{
			name: 'shareGraphic',
			type: 'image',
			description: '1200 x 630px in PNG, JPG, or GIF',
			options: {
				accept: '.jpg,.png,.gif',
			},
		},
		{
			name: 'favicon',
			type: 'image',
			description: '256 x 256px in PNG',
			options: {
				accept: '.png',
			},
		},
		{
			name: 'faviconLight',
			type: 'image',
			description:
				'For devices in dark mode, use a light color to create contrast with dark backgrounds.',
			options: {
				accept: '.png',
			},
		},
	],
	preview: {
		prepare() {
			return {
				title: 'SEO + Social Sharing',
			};
		},
	},
});

import sharing from '@/sanity/schemaTypes/objects/sharing';
import slug from '@/sanity/schemaTypes/objects/slug';
import title from '@/sanity/schemaTypes/objects/title';
import { defineType } from 'sanity';

export const pHome = defineType({
	title: 'Homepage',
	name: 'pHome',
	type: 'document',
	fields: [
		title({ initialValue: 'Homepage' }),
		slug({ initialValue: { _type: 'slug', current: '/' }, readOnly: true }),
		{
			title: 'Landing Title',
			name: 'landingTitle',
			type: 'string',
		},
		{
			title: 'Text Color',
			name: 'textColor',
			type: 'reference',
			to: [{ type: 'settingsBrandColors' }],
		},
		{
			title: 'Page Modules',
			name: 'pageModules',
			type: 'array',
			of: [{ type: 'freeform' }],
		},
		sharing(),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({ title = 'Untitled' }) {
			return {
				title,
			};
		},
	},
});

import slug from '@/sanity/schemaTypes/objects/slug';
import { TagsIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const pEventStatus = defineType({
	title: 'Status',
	name: 'pEventStatus',
	type: 'document',
	icon: TagsIcon,
	fields: [
		{ name: 'title', type: 'string', validation: (Rule) => [Rule.required()] },
		slug(),
		{
			title: 'Status Color',
			name: 'statusColor',
			type: 'reference',
			to: [{ type: 'settingsBrandColors' }],
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: ({ title }) => ({
			title,
		}),
	},
});

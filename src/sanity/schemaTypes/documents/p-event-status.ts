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
			title: 'Status text color',
			name: 'statusTextColor',
			type: 'reference',
			to: [{ type: 'settingsBrandColors' }],
		},
		{
			title: 'Status background color',
			name: 'statusBgColor',
			type: 'reference',
			to: [{ type: 'settingsBrandColors' }],
		},
		{
			name: 'link',
			type: 'url',
			description: 'Luma link or other services link',
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

import { slug } from '@/sanity/schemaTypes/objects/slug';
import { TagsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const pCuratedCategory = defineType({
	title: 'Curated Category',
	name: 'pCuratedCategory',
	type: 'document',
	icon: TagsIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => [Rule.required()],
		}),
		slug(),
	],
	preview: {
		select: { title: 'title' },
		prepare: ({ title }) => ({ title }),
	},
});

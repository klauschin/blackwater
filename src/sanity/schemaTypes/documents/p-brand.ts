import { slug } from '@/sanity/schemaTypes/objects/slug';
import { TagsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const pBrand = defineType({
	title: 'Brand',
	name: 'pBrand',
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

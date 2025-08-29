import { defineType } from 'sanity';
import { SlugField } from '@/sanity/component/SlugField';

export default defineType({
	title: 'Page',
	name: 'pGeneral',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: (Rule) => [Rule.required()],
		},
		{
			title: 'Page Slug (URL)',
			name: 'slug',
			type: 'slug',
			components: {
				field: SlugField,
			},
			options: {
				source: 'title',
				slugify: (input) =>
					input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
			},
			validation: (Rule) => [Rule.required()],
		},
		{
			title: 'Content',
			name: 'content',
			type: 'portableText',
		},
		{
			title: 'SEO + Share Settings',
			name: 'sharing',
			type: 'sharing',
		},
	],
	preview: {
		select: {
			title: 'title',
			slug: 'slug',
		},
		prepare({ title = 'Untitled', slug = {} }) {
			return {
				title,
				subtitle: slug.current ? `/${slug.current}` : 'Missing page slug',
			};
		},
	},
});

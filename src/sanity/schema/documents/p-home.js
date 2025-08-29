import { defineType, defineField } from 'sanity';
import { SlugField } from '@/sanity/component/SlugField';

export default defineType({
	title: 'Page',
	name: 'pHome',
	type: 'document',
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
		}),
		defineField({
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
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'portableText',
		}),
		defineField({
			title: 'SEO + Share Settings',
			name: 'sharing',
			type: 'sharing',
		}),
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

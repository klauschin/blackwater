import sharing from '@/sanity/schemaTypes/objects/sharing';
import slug from '@/sanity/schemaTypes/objects/slug';
import title from '@/sanity/schemaTypes/objects/title';
import { BookIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const pEvent = defineType({
	title: 'Event',
	name: 'pEvent',
	type: 'document',
	icon: BookIcon,
	fields: [
		title(),
		slug(),
		{
			name: 'categories',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: { type: 'pEventCategory' },
				},
			],
			validation: (Rule) => Rule.unique(),
		},
		{
			name: 'publishDate',
			type: 'date',
			options: {
				dateFormat: 'MM/DD/YY',
				calendarTodayLabel: 'Today',
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'content',
			type: 'portableText',
		},
		{
			title: 'Related Articles',
			name: 'relatedEvents',
			type: 'array',
			description:
				'If left empty, will be pulled 2 articles from the same category',
			of: [
				{
					name: 'articles',
					type: 'reference',
					to: [{ type: 'pEvent' }],
				},
			],
		},
		sharing(),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'slug',
			categories: 'categories.0.title',
		},
		prepare({ title = 'Untitled', slug = {}, categories }) {
			const path = `/blog/${slug?.current}`;
			const categoryTitle = categories ?? '';
			const subtitle = `[${
				categoryTitle ? categoryTitle : '(missing category)'
			}] - ${slug.current ? path : '(missing slug)'}`;

			return {
				title: title,
				subtitle: subtitle,
				media: BookIcon,
			};
		},
	},
});

import sharing from '@/sanity/schemaTypes/objects/sharing';
import slug from '@/sanity/schemaTypes/objects/slug';
import { BookIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const pEvent = defineType({
	title: 'Event',
	name: 'pEvent',
	type: 'document',
	icon: BookIcon,
	fields: [
		{ name: 'title', type: 'string', validation: (Rule) => [Rule.required()] },
		slug(),
		{
			name: 'eventDate',
			type: 'date',
			options: {
				dateFormat: 'MM/DD/YY',
				calendarTodayLabel: 'Today',
			},
			validation: (Rule) => Rule.required(),
		},
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
			name: 'status',
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
			name: 'content',
			type: 'portableText',
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
			const path = `/event/${slug?.current}`;
			const categoryTitle = categories ?? '';
			const subtitle = `${slug?.current ? path : '(missing slug)'} - [${
				categoryTitle ? categoryTitle : '(missing category)'
			}]`;

			return {
				title: title,
				subtitle: subtitle,
				media: BookIcon,
			};
		},
	},
});

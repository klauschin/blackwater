import sharing from '@/sanity/schemaTypes/objects/sharing';
import { slug } from '@/sanity/schemaTypes/objects/slug';
import { BookIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const pEvent = defineType({
	title: 'Event',
	name: 'pEvent',
	type: 'document',
	icon: BookIcon,
	fields: [
		{ name: 'title', type: 'string', validation: (Rule) => [Rule.required()] },
		{ name: 'subtitle', type: 'string' },
		slug(),
		{
			name: 'eventDatetime',
			type: 'datetime',
			options: {
				dateFormat: 'MM/DD/YY',
				calendarTodayLabel: 'Today',
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'location',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'locationLink',
			type: 'url',
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
			name: 'statusList',
			type: 'array',
			of: [
				{
					name: 'statusItem',
					type: 'object',
					fields: [
						{
							title: 'Status',
							name: 'eventStatus',
							type: 'reference',
							to: { type: 'pEventStatus' },
						},
						{
							name: 'link',
							type: 'link',
						},
					],
					preview: {
						select: {
							title: 'eventStatus.title',
						},
						prepare({ title = 'Untitled' }) {
							return {
								title: title,
							};
						},
					},
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
			location: 'location',
			eventDatetime: 'eventDatetime',
			categories: 'categories.0.title',
		},
		prepare({ title = 'Untitled', location, eventDatetime, categories }) {
			const categoryTitle = categories ?? '';
			const subtitle = `${location} - ${categoryTitle ? `[${categoryTitle}]` : ''}`;

			return {
				title: `${title} - ${new Date(eventDatetime).toLocaleDateString('en-US')}`,
				subtitle: subtitle,
				media: BookIcon,
			};
		},
	},
});

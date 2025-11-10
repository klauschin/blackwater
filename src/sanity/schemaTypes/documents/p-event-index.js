import slug from '@/sanity/schemaTypes/objects/slug';
import { BookIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const pEventIndex = defineType({
	title: 'Events',
	name: 'pEventIndex',
	type: 'document',
	icon: BookIcon,
	fields: [
		{ name: 'title', type: 'string', validation: (Rule) => [Rule.required()] },
		slug({
			initialValue: { _type: 'slug', current: 'event' },
			readOnly: true,
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({ title = 'Untitled' }) {
			return {
				title: title,
			};
		},
	},
});

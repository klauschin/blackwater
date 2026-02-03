import sharing from '@/sanity/schemaTypes/objects/sharing';
import { slug } from '@/sanity/schemaTypes/objects/slug';
import { BookIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const pEvents = defineType({
	title: 'Events',
	name: 'pEvents',
	type: 'document',
	icon: BookIcon,
	fields: [
		{ name: 'title', type: 'string', validation: (Rule) => [Rule.required()] },
		slug({
			initialValue: { _type: 'slug', current: 'events' },
			readOnly: true,
		}),
		sharing(),
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

import { MenuIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export default defineType({
	title: 'Menu',
	name: 'settingsMenu',
	type: 'document',
	fields: [
		{
			title: 'Menu Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Menu Title Url',
			name: 'url',
			type: 'link',
		},
		{
			title: 'Menu Items',
			name: 'items',
			type: 'array',
			of: [{ type: 'navItem' }],
			// validation: (Rule) => Rule.max(8),
		},
		{
			title: 'Display latest news',
			name: 'latestNews',
			type: 'boolean',
		},
	],
	preview: {
		select: {
			title: 'title',
			items: 'items',
		},
		prepare({ title = 'Untitled', items = [] }) {
			return {
				title,
				subtitle: `${items.length} link(s)`,
				media: MenuIcon,
			};
		},
	},
});

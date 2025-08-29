import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const HeaderMenu = defineField({
	title: 'Menu',
	name: 'headerMenu',
	type: 'object',
	icon: MenuIcon,
	fields: [
		{
			title: 'Type',
			name: 'type',
			type: 'string',
			options: {
				list: [
					{ title: 'Mega Menu', value: 'megaMenu' },
					{ title: 'Link', value: 'link' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			validation: (Rule) => Rule.required(),
		},
		{
			title: 'Mega Menu',
			name: 'menu',
			type: 'reference',
			to: [{ type: 'settingsMenu' }],
			hidden: ({ parent }) => parent.type != 'megaMenu',
		},
		{
			title: 'Link',
			name: 'link',
			type: 'cta',
			hidden: ({ parent }) => parent.type != 'link',
		},
	],
	initialValue: {
		type: 'link',
	},
	preview: {
		select: {
			type: 'type',
			megaMenuTitle: 'menu.title',
			linkTitle: 'link.label',
		},
		prepare({ type, megaMenuTitle, linkTitle }) {
			const itemType = type == 'megaMenu' ? 'Mega Menu' : 'Link';
			const itemTitle = type == 'megaMenu' ? megaMenuTitle : linkTitle;
			return {
				title: itemTitle ? itemTitle : 'Untitled',
				subtitle: itemType,
			};
		},
	},
});

export default defineType({
	title: 'Header',
	name: 'gHeader',
	type: 'document',
	fields: [
		{
			title: 'Header Menus & Link',
			name: 'headerMenus',
			type: 'array',
			of: [HeaderMenu],
		},
		{
			title: 'Header Call to Action',
			name: 'headerCta',
			type: 'cta',
		},
	],
	preview: {
		prepare() {
			return {
				title: 'Header Menus & Link',
			};
		},
	},
});

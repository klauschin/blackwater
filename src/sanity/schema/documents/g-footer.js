import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const FooterMenu = defineField({
	title: 'Menu',
	name: 'footerMenu',
	type: 'object',
	icon: MenuIcon,
	fields: [
		{
			title: 'Type',
			name: 'type',
			type: 'string',
			options: {
				list: [
					{ title: 'Menu', value: 'menu' },
					{ title: 'Link', value: 'link' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			validation: (Rule) => Rule.required(),
		},
		{
			title: 'Menu',
			name: 'menu',
			type: 'reference',
			to: [{ type: 'settingsMenu' }],
			hidden: ({ parent }) => parent.type != 'menu',
		},
		{
			title: 'Links',
			name: 'links',
			type: 'array',
			of: [
				{
					title: 'Link',
					name: 'link',
					type: 'cta',
				},
			],
			validation: (Rule) => Rule.max(2),
			hidden: ({ parent }) => parent.type != 'link',
			preview: {
				select: {
					title: 'link.label',
				},
				prepare({ title }) {
					return {
						title: title,
					};
				},
			},
		},
	],
	initialValue: {
		type: 'link',
	},
	preview: {
		select: {
			type: 'type',
			menuTitle: 'menu.title',
			linkTitle: 'link.label',
		},
		prepare({ type, menuTitle, linkTitle }) {
			const itemType = type == 'menu' ? 'Menu' : 'Link';
			const itemTitle = type == 'menu' ? menuTitle : linkTitle;
			return {
				title: itemTitle ? itemTitle : 'Untitled',
				subtitle: itemType,
			};
		},
	},
});

export default defineType({
	title: 'Footer Settings',
	name: 'gFooter',
	type: 'document',
	fields: [
		{
			title: 'Footer Menus & Link',
			name: 'footerMenus',
			type: 'array',
			of: [FooterMenu],
		},
		{
			title: 'Legal menu',
			name: 'legalMenu',
			type: 'reference',
			to: [{ type: 'settingsMenu' }],
		},
	],
	preview: {
		prepare() {
			return {
				title: 'Footer Settings',
			};
		},
	},
});

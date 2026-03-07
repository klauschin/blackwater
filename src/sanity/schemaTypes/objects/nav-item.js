import { LinkIcon, MasterDetailIcon, WarningOutlineIcon } from '@sanity/icons';
import { resolveHref } from '@/lib/routes';
import { defineType } from 'sanity';
import { link } from '@/sanity/schemaTypes/objects/link';

export const navItem = defineType({
	title: 'Item',
	name: 'navItem',
	type: 'object',
	icon: LinkIcon,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		link({
			showLabel: false,
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
			internalLinkSlug: 'link.linkInput.internalLink.slug.current',
			internalLinkType: 'link.linkInput.internalLink._type',
			externalUrl: 'link.linkInput.externalUrl',
			linkType: 'link.linkInput.linkType',
		},
		prepare({
			title,
			internalLinkSlug,
			internalLinkType,
			externalUrl,
			linkType,
		}) {
			if ((!linkType || !internalLinkType) && !externalUrl) {
				return {
					title: 'Empty Item',
					media: WarningOutlineIcon,
				};
			}
			const isExternal = linkType === 'external';

			return {
				title: title,
				subtitle: isExternal
					? externalUrl
					: resolveHref({
							documentType: internalLinkType,
							slug: internalLinkSlug,
						}),
				media: isExternal ? LinkIcon : MasterDetailIcon,
			};
		},
	},
});

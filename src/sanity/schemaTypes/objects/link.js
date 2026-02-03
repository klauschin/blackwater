import { LinkIcon, MasterDetailIcon, WarningOutlineIcon } from '@sanity/icons';
import { resolveHref } from '@/lib/utils';
import { defineField, defineType } from 'sanity';

export function link({ title, name, showLabel = true, ...props } = {}) {
	return defineType({
		title: title || 'Link',
		name: name || 'link',
		type: 'object',
		icon: LinkIcon,
		fields: [
			...(showLabel
				? [
						{
							name: 'label',
							title: 'Label',
							type: 'string',
						},
					]
				: []),
			defineField({
				name: 'linkInput',
				type: 'linkInput',
			}),
			defineField({
				title: 'Open in new tab',
				name: 'isNewTab',
				type: 'boolean',
				initialValue: false,
			}),
		],
		preview: {
			select: {
				title: 'label',
				internalLinkSlug: 'linkInput.internalLink.slug.current',
				internalLinkType: 'linkInput.internalLink._type',
				externalUrl: 'linkInput.externalUrl',
				linkType: 'linkInput.linkType',
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
		...props,
	});
}

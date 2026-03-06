import sharing from '@/sanity/schemaTypes/objects/sharing';
import { slug } from '@/sanity/schemaTypes/objects/slug';
import { StarIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const pCurated = defineType({
	title: 'Curated Product',
	name: 'pCurated',
	type: 'document',
	icon: StarIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => [Rule.required()],
		}),
		slug(),
		defineField({
			name: 'category',
			type: 'reference',
			to: [{ type: 'pCuratedCategory' }],
		}),
		defineField({
			name: 'mainImage',
			title: 'Main Image',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
					title: 'Alt Text',
				}),
			],
		}),
		defineField({
			name: 'price',
			type: 'string',
			description: 'e.g. $1,299 or From $49/mo',
		}),
		defineField({
			name: 'purchaseLink',
			title: 'Purchase Link',
			type: 'url',
		}),
		defineField({
			name: 'excerpt',
			type: 'text',
			rows: 3,
			description: 'Short description shown on listing cards',
			validation: (Rule) => Rule.max(200).warning('Keep under 200 characters'),
		}),
		defineField({
			name: 'content',
			type: 'portableText',
		}),
		defineField({
			title: 'Related Products',
			name: 'relatedProducts',
			type: 'array',
			description:
				'If left empty, will pull products from the same category',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'pCurated' }],
				}),
			],
			validation: (Rule) => Rule.unique(),
		}),
		sharing(),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'slug',
			category: 'category.title',
			media: 'mainImage',
		},
		prepare({ title = 'Untitled', slug = {}, category, media }) {
			return {
				title,
				subtitle: `[${category ?? '(no category)'}] — /curated/${slug?.current ?? '(no slug)'}`,
				media,
			};
		},
	},
});

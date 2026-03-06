import sharing from '@/sanity/schemaTypes/objects/sharing';
import { slug } from '@/sanity/schemaTypes/objects/slug';
import { StarIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const pCuratedIndex = defineType({
	title: 'Curated',
	name: 'pCuratedIndex',
	type: 'document',
	icon: StarIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => [Rule.required()],
		}),
		slug({
			initialValue: { _type: 'slug', current: 'curated' },
			readOnly: true,
		}),
		defineField({
			name: 'subtitle',
			type: 'string',
			description: 'Tagline shown below the title',
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 3,
			description: 'Brief intro copy for the page',
		}),
		defineField({
			name: 'featuredProduct',
			title: 'Featured Product',
			type: 'reference',
			to: [{ type: 'pCurated' }],
			description: 'Optional hero pick shown at the top of the page',
		}),
		sharing(),
	],
	preview: {
		select: { title: 'title' },
		prepare({ title = 'Untitled' }) {
			return { title };
		},
	},
});

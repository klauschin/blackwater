import { defineType } from 'sanity';

export default defineType({
	name: 'cta',
	type: 'object',
	fields: [
		{
			title: 'Label',
			name: 'label',
			type: 'string',
		},
		{
			title: 'Link',
			name: 'link',
			type: 'link',
		},
	],
});

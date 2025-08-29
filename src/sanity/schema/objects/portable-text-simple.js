import { defineType } from 'sanity';

export default defineType({
	name: 'portableTextSimple',
	type: 'array',
	of: [
		{
			title: 'Block',
			type: 'block',
			styles: [{ title: 'Paragraph', value: 'normal' }],
			lists: [
				{ title: 'Bullet', value: 'bullet' },
				{ title: 'Numbered', value: 'number' },
			],
			marks: {
				decorators: [
					{ title: 'Bold', value: 'strong' },
					{ title: 'Italic', value: 'em' },
					{ title: 'Underline', value: 'underline' },
					{ title: 'Strike', value: 'strike-through' },
					{
						title: 'Sup',
						value: 'sup',
						icon: () => (
							<span>
								X<sup>2</sup>
							</span>
						),
						component: ({ children }) => <sup>{children}</sup>,
					},
				],
				annotations: [
					{
						name: 'link',
						type: 'link',
					},
				],
			},
		},
	],
});

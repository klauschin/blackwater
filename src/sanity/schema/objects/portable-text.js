import { defineType } from 'sanity';
import customIframe from '@/sanity/lib/custom-iframe';
import customImage from '@/sanity/lib/custom-image';

export default defineType({
	name: 'portableText',
	type: 'array',
	of: [
		{
			title: 'Block',
			type: 'block',
			styles: [
				{ title: 'Paragraph', value: 'normal' },
				{
					title: 'Heading 1',
					value: 'h1',
					component: ({ children }) => (
						<h1
							style={{
								fontSize: '36px',
							}}
						>
							{children}
						</h1>
					),
				},
				{
					title: 'Heading 2',
					value: 'h2',
					component: ({ children }) => (
						<h2
							style={{
								fontSize: '30px',
							}}
						>
							{children}
						</h2>
					),
				},
				{
					title: 'Heading 3',
					value: 'h3',
					component: ({ children }) => (
						<h3
							style={{
								fontSize: '25px',
							}}
						>
							{children}
						</h3>
					),
				},
				{
					title: 'Heading 4',
					value: 'h4',
					component: ({ children }) => (
						<h4
							style={{
								fontSize: '25px',
								textTransform: 'unset',
							}}
						>
							{children}
						</h4>
					),
				},
				{ title: 'Quote', value: 'blockquote' },
			],
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
					{ title: 'Code', value: 'code' },
				],
				annotations: [
					{
						name: 'link',
						type: 'link',
					},
				],
			},
		},
		customImage(),
		customIframe(),
	],
});

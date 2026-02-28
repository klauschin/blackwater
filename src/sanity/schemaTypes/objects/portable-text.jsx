import customIframe from '@/sanity/schemaTypes/objects/custom-iframe';
import customImage from '@/sanity/schemaTypes/objects/custom-image';
import { link } from '@/sanity/schemaTypes/objects/link';
import { BlockquoteIcon, InfoOutlineIcon } from '@sanity/icons';
import { defineType } from 'sanity';

const H2 = (props) => <span>{props.children}</span>;
const H3 = (props) => <span>{props.children}</span>;
const H4 = (props) => <span>{props.children}</span>;
const Normal = (props) => <span>{props.children}</span>;
const Normal2 = (props) => <span>{props.children}</span>;
const Blockquote = (props) => {
	return (
		<blockquote className="before:inline before:content-[open-quote] after:inline after:content-[close-quote]">
			{props.renderDefault(props)}
		</blockquote>
	);
};

export const portableText = defineType({
	name: 'portableText',
	type: 'array',
	of: [
		{
			title: 'Block',
			type: 'block',
			styles: [
				{
					title: 'Heading 2',
					value: 'h2',
					component: H2,
				},
				{
					title: 'Heading 3',
					value: 'h3',
					component: H3,
				},
				{
					title: 'Heading 4',
					value: 'h4',
					component: H4,
				},
				{ title: 'Paragraph', value: 'normal', component: Normal },
				{ title: 'Paragraph 2', value: 'normal-2', component: Normal2 },
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
				],
				annotations: [
					{
						name: 'blockquote',
						type: 'object',
						title: 'Quote',
						icon: BlockquoteIcon,
						fields: [
							{
								name: 'author',
								type: 'string',
							},
							{
								name: 'title',
								type: 'string',
							},
							{
								name: 'isHidden',
								type: 'boolean',
								initialValue: true,
							},
						],
						components: { annotation: Blockquote },
					},
					link({
						showLabel: false,
						options: {
							modal: { type: 'dialog' },
						},
					}),
					link({
						title: 'Button',
						name: 'callToAction',
						showLabel: false,
						icon: InfoOutlineIcon,
						options: {
							modal: { type: 'dialog' },
						},
					}),
				],
			},
		},
		customImage({ hasLinkOptions: true, hasCaptionOptions: true }),
		customIframe(),
	],
});

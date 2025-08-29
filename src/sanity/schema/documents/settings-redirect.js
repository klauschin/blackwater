import { defineField, defineType } from 'sanity';
import { LinkInput } from '@/sanity/component/LinkInput';
import { HtmlDescription } from '@/sanity/lib/helpers';

const slugValidator = (rule) =>
	rule.required().custom((value) => {
		if (!value || !value.current) return "Can't be blank";
		if (!value.current.startsWith('/')) {
			return 'The path must start with a /';
		}
		return true;
	});

export default defineType({
	name: 'settingsRedirect',
	title: 'Redirects',
	type: 'document',
	description: 'Redirect for next.config.js',
	fields: [
		defineField({
			title: 'Redirects',
			name: 'redirects',
			type: 'array',
			of: [
				{
					title: 'Redirect',
					name: 'redirect',
					type: 'object',
					fields: [
						defineField({
							title: 'Source',
							name: 'url',
							type: 'slug',
							validation: (rule) => slugValidator(rule),
							description: (
								<HtmlDescription>
									Enter path (e.g. /blog/lorem-ipsum). Source path supports{' '}
									<a
										href="https://nextjs.org/docs/pages/api-reference/next-config-js/redirects#path-matching"
										target="_blank"
										rel="noopener noreferrer"
									>
										path matching
									</a>
									.
								</HtmlDescription>
							),
						}),
						defineField({
							type: 'string',
							title: 'Destination',
							name: 'destination',
							components: {
								input: LinkInput,
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'permanent',
							type: 'boolean',
						}),
					],
					initialValue: {
						permanent: true,
					},
					preview: {
						select: {
							title: 'url.current',
							subtitle: 'destination',
						},
						prepare({ title, subtitle }) {
							return {
								title: `Source: ${title}`,
								subtitle: `Destination: ${subtitle}`,
							};
						},
					},
				},
			],
			options: {
				layout: 'list',
			},
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Redirects',
			};
		},
	},
});

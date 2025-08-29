import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		fontFamily: {
			display: ['var(--font-aw-conqueror)'],
			body: ['var(--font-aw-conqueror)'],
		},
		extend: {
			spacing: {
				contain: 'var(--s-contain)',
				'contain-dynamic': 'var(--s-contain-dynamic)',
			},
		},
	},
	plugins: [],
};
export default config;

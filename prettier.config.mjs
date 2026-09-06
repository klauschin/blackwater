// Was `.prettierrc`. Moved to a .mjs config so the notes below can be real
// comments: JSON has none, and the previous file faked one with a `// "plugins"`
// KEY, which prettier parsed as an unknown option and warned about on every
// single run — alongside two more warnings for the importOrder options, which
// only the disabled plugin reads and which sat outside the fake comment.
/** @type {import('prettier').Config} */
const config = {
	tabWidth: 2,
	singleQuote: true,
	semi: true,
	printWidth: 80,
	trailingComma: 'es5',
	useTabs: true,

	// Both plugins are installed (see devDependencies) but deliberately OFF, and
	// the `importOrder*` options below belong to the first one — they are inert
	// on their own, so they stay inside this block rather than beside the live
	// options, where prettier warned about them as unknown.
	//
	// Turning this on rewrites 223 of the ~294 files under src/ in one commit:
	// import order across the whole tree, plus every className reordered by
	// prettier-plugin-tailwindcss. Re-enable only as its own isolated commit.
	//
	// plugins: [
	// 	'@trivago/prettier-plugin-sort-imports',
	// 	'prettier-plugin-tailwindcss',
	// ],
	// importOrderSortSpecifiers: true,
	// importOrder: [
	// 	'^react$',
	// 	'^next',
	// 	'^@testing-library',
	// 	'<THIRD_PARTY_MODULES>',
	// 	'^@/app/api',
	// 	'^@/lib',
	// 	'^@/hooks',
	// 	'^@/providers',
	// 	'^@/layout',
	// 	'^@/app/\\(pages\\)',
	// 	'^@/components',
	// 	'^[./_components]',
	// 	'^[./]',
	// 	'^@/types',
	// ],
};

export default config;

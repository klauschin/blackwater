import { cva } from 'class-variance-authority';

/**
 * The site's pill, as a variant rather than a class string copied per route.
 * It was spelled out verbatim in /size-guide and again in /events, and the two
 * had already drifted on padding and type scale with nothing recording whether
 * that was deliberate — so a restyle of the active fill or the focus ring would
 * have landed on one page and not the other. `cva` here mirrors
 * `buttonVariants`, which already establishes the pattern for exactly this.
 *
 * A LEAF MODULE on purpose, and NOT part of `Tabs.tsx`: that file imports
 * `@base-ui/react/tabs`, so anything importing the variant from there dragged
 * the whole tabs runtime into its route's client bundle. `/events` renders no
 * tabs at all and was paying 18KB raw / 6.8KB gzip for them (measured against a
 * production build). Same reason `dateFnsLocale.ts` is kept out of `i18n.ts`
 * and `event-status.ts` out of `dictionary.ts`.
 *
 * The state selectors are Base UI's `data-active` / `not-data-active`, NOT
 * Radix's `data-[state=active]`. Nothing fails loudly if you use the Radix
 * spelling: the pill simply never fills in, on every route at once.
 *
 * **`not-data-active:` is load-bearing for a non-tab caller, so do not fold it
 * away.** For a real tab "not active" is the default state, which makes the
 * prefix look redundant — but `/events` puts this variant on a PLAIN BUTTON to
 * get the resting outline pill, and a button never carries `data-active`. The
 * `:not([data-active])` those rules compile to is what paints it; hoisting them
 * to the unprefixed base would silently fill that button in, on a route this
 * file never mentions.
 */
export const tabsTriggerVariants = cva(
	'cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				// Unstyled, as this primitive shipped: the default stays a bare
				// passthrough so existing call sites are unaffected.
				default: '',
				pill: 'border-foreground data-active:bg-foreground data-active:text-background not-data-active:hover:bg-foreground/5 rounded-full border uppercase whitespace-nowrap not-data-active:bg-transparent',
			},
			size: {
				default: '',
				sm: 't-l-2 px-2.5 py-1.5',
				md: 't-l-1 px-3.5 py-1.5',
			},
		},
		defaultVariants: { variant: 'default', size: 'default' },
	}
);

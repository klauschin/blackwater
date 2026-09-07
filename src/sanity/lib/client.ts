import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/env';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
	perspective: 'published',
	stega: {
		studioUrl,
		// Set logger to 'console' for more verbose logging
		// logger: console,
		filter: (props) => {
			if (props.sourcePath.at(-1) === 'title') {
				return true;
			}

			// `richDate.timezone` is an IANA identifier that is never rendered — it
			// is fed to `Intl`, which throws a RangeError on anything it does not
			// recognise. `filterDefault` has no reason to skip it (its denylist
			// covers `status`, and the value is neither date-like nor URL-like), so
			// in the Presentation tool it was encoded for EVERY event and took
			// `/events` to its error boundary on any dataset. Opting it out here is
			// the root fix: readers get a clean value, editors lose nothing, and
			// `defineLive` shares this client so draft mode is covered too.
			if (props.sourcePath.at(-1) === 'timezone') {
				return false;
			}

			return props.filterDefault(props);
		},
	},
	requestTagPrefix: 'website',
});

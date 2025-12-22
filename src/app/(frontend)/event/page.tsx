import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { pEventIndexQuery } from '@/sanity/lib/queries';
import defineMetadata from '@/lib/defineMetadata';
import { PageEventIndex } from './_components/PageEventIndex';

export async function generateMetadata(): Promise<Metadata> {
	const { data } = await sanityFetch({
		query: pEventIndexQuery,
		tags: ['pEventIndex'],
		stega: false,
	});
	return defineMetadata({ data });
}

export default async function Page() {
	const { data } = await sanityFetch({
		query: pEventIndexQuery,
		tags: ['pEventIndex'],
	});

	if (!data) return notFound();

	const { eventList } = data || {};
	const groupedEvents = eventList.reduce(
		(
			acc: Record<string, (typeof eventList)[number][]>,
			event: (typeof eventList)[number]
		) => {
			const date = new Date(event.eventDatetime);
			const year = date.getFullYear();
			const month = date
				.toLocaleString('en-US', { month: 'long' })
				.toLowerCase();

			const key = `${year}_${month}`;

			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(event);

			return acc;
		},
		{}
	);
	console.log('🚀 ~ :46 ~ Page ~ groupedEvents:', groupedEvents);

	return <PageEventIndex data={{ groupedEvents, ...data }} />;
}

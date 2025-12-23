'use client';

type PageEventSingleProps = {
	data: {
		title?: string;
	};
};
export default function PageEventSingle({ data }: PageEventSingleProps) {
	const { title } = data || {};

	return <div>Coming soon</div>;
}

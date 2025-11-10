import React from 'react';

export function PageEventIndex({ data }) {
	const { title } = data || {};
	return (
		<section>
			<h1>{title}</h1>
		</section>
	);
}

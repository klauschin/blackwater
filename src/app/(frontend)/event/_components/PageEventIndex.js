import React from 'react';
import { hasArrayValue } from '@/lib/utils';

export function PageEventIndex({ data }) {
	const { title, eventList } = data || {};
	// console.log(data);
	return (
		<div className="px-contain mx-auto max-w-7xl">
			<h1 className="sr-only">{title}</h1>
			{hasArrayValue(eventList) && (
				<ul>
					{eventList.map((item) => {
						const { slug, title, _id, status, eventDate, location } =
							item || {};

						return (
							<li className="flex border-b border-white py-5" key={_id}>
								<p>{title}</p>
								<date>{eventDate}</date>
								<p>{location}</p>
								{hasArrayValue(status) && (
									<div className="flex">
										{status.map(({ _id, title }) => {
											return <span key={_id}>{title}</span>;
										})}
									</div>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

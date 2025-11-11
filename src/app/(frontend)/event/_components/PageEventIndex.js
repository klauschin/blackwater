import React from 'react';
import Link from 'next/link';
import { buildRgbaCssString, hasArrayValue } from '@/lib/utils';

export function PageEventIndex({ data }) {
	const { title, eventList } = data || {};
	// console.log(data);
	return (
		<div className="px-contain mx-auto max-w-7xl">
			<h1 className="sr-only">{title}</h1>
			{hasArrayValue(eventList) && (
				<ul>
					{eventList.map((item) => {
						const {
							slug,
							title,
							_id,
							status,
							eventDate,
							location,
							locationLink,
						} = item || {};

						return (
							<li
								className="flex items-center border-b border-white py-5"
								key={_id}
							>
								<p className="t-h-4 flex-2">{title}</p>
								<date className="t-h-4 min-w-28">{eventDate}</date>
								{locationLink ? (
									<Link className="t-h-4 min-w-72 flex-1" href={locationLink}>
										{location}
									</Link>
								) : (
									<p className="t-h-4 min-w-72 flex-1">{location}</p>
								)}

								{hasArrayValue(status) && (
									<div className="flex">
										{status.map((item) => {
											const { _id, title, statusColor } = item || {};
											console.log(item);
											return (
												<span
													key={_id}
													className="t-b-1 rounded-4xl p-2.5 text-white"
													style={{
														backgroundColor: buildRgbaCssString(statusColor),
													}}
												>
													{title}
												</span>
											);
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

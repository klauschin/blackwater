import React from 'react';
import Link from 'next/link';
<<<<<<< Updated upstream
=======
import { format, formatDistance } from 'date-fns';
>>>>>>> Stashed changes
import { buildRgbaCssString, hasArrayValue } from '@/lib/utils';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';

export function PageEventIndex({ data }) {
	const { title, eventList } = data || {};
	// console.log(data);
	return (
		<div className="px-contain mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-center">
			<h1 className="sr-only">{title}</h1>
			{hasArrayValue(eventList) && (
				<Table className="border-t border-b border-white">
					<TableHeader>
						<TableRow className="t-h-4 font-bold uppercase">
							<TableHead className="font-bold">codex</TableHead>
							<TableHead className="font-bold">date</TableHead>
							<TableHead className="font-bold">loaction</TableHead>
							<TableHead className="text-right font-bold">status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
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
<<<<<<< Updated upstream
								<TableRow key={_id}>
									<TableCell className="t-h-4">{title}</TableCell>
									<TableCell className="t-h-4 sm:min-w-28">
										{eventDate}
=======
								<TableRow key={_id} className="t-h-4">
									<TableCell className="font-bold">{title}</TableCell>
									<TableCell className="sm:min-w-28">
										{format(new Date(eventDate), 'iii, MM.dd.yy')}
>>>>>>> Stashed changes
									</TableCell>
									<TableCell>
										{locationLink ? (
											<Link className="sm:min-w-72" href={locationLink}>
												{location}
											</Link>
										) : (
											<p className="sm:min-w-72">{location}</p>
										)}
									</TableCell>

									{hasArrayValue(status) && (
										<TableCell className="flex justify-end gap-1">
											{status.map((item) => {
												const { _id, title, statusColor } = item || {};
												return (
													<span
														key={_id}
														className="t-b-2 rounded-4xl p-1.25 text-white"
														style={{
															backgroundColor: buildRgbaCssString(statusColor),
														}}
													>
														{title}
													</span>
												);
<<<<<<< Updated upstream
											})}
										</TableCell>
									)}
=======
											})
										) : (
											<span className="t-b-2 rounded-4xl bg-white px-2.5 py-1.5 text-black">
												{formatDistance(new Date(eventDate), new Date(), {
													addSuffix: true,
												})}
											</span>
										)}
									</TableCell>
>>>>>>> Stashed changes
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)}
		</div>
	);
}

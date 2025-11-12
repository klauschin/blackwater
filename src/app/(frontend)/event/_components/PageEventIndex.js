import React from 'react';
import Link from 'next/link';
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
		<div className="px-contain mx-auto max-w-7xl">
			<h1 className="sr-only">{title}</h1>
			{hasArrayValue(eventList) && (
				<Table className="border-t border-b border-white">
					<TableHeader>
						<TableRow className="uppercase">
							<TableHead>codex</TableHead>
							<TableHead>date</TableHead>
							<TableHead>loaction</TableHead>
							<TableHead className="text-right">status</TableHead>
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
								<TableRow key={_id}>
									<TableCell className="t-h-4">{title}</TableCell>
									<TableCell className="t-h-4 sm:min-w-28">
										{eventDate}
									</TableCell>
									<TableCell className="t-h-4">
										{locationLink ? (
											<Link className="sm:min-w-72" href={locationLink}>
												{location}
											</Link>
										) : (
											<p className="t-h-4 sm:min-w-72">{location}</p>
										)}
									</TableCell>

									{hasArrayValue(status) && (
										<TableCell className="flex justify-end gap-1">
											{status.map((item) => {
												const { _id, title, statusColor } = item || {};
												return (
													<span
														key={_id}
														className="t-b-1 rounded-4xl p-1.25 text-white"
														style={{
															backgroundColor: buildRgbaCssString(statusColor),
														}}
													>
														{title}
													</span>
												);
											})}
										</TableCell>
									)}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)}
		</div>
	);
}

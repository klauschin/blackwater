import React from 'react';
import Link from 'next/link';
import { format, formatDistance } from 'date-fns';
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

	return (
		<div className="px-contain mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-center">
			<h1 className="sr-only">{title}</h1>
			{hasArrayValue(eventList) && (
				<Table className="border-t border-b border-white">
					<TableHeader>
						<TableRow className="t-b-1 font-bold uppercase">
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
								<TableRow key={_id} className="t-b-1">
									<TableCell className="font-bold">{title}</TableCell>
									<TableCell className="sm:min-w-28">
										{format(new Date(eventDate), 'iii, MM.dd.yy')}
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
											})}
										</TableCell>
									)}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)
			}
		</div >
	);
}

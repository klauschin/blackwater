'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buildRgbaCssString, hasArrayValue } from '@/lib/utils';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import type { PEvent, PEventStatus } from 'sanity.types';

interface PageEventIndexProps {
	data: PEvent & {
		groupedEvents: {
			[key: string]: PEvent[];
		};
	};
}

export function PageEventIndex({ data }: PageEventIndexProps) {
	const { title, groupedEvents } = data || {};
	const currentDate = new Date();
	const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
	const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

	const availableMonths = useMemo(() => {
		if (!groupedEvents) return [];

		return Object.keys(groupedEvents)
			.map((key) => {
				const firstEvent = groupedEvents[key][0];
				if (!firstEvent || !firstEvent.eventDatetime) return null;

				const date = new Date(firstEvent.eventDatetime);
				return {
					key,
					month: date.getMonth(),
					year: date.getFullYear(),
					date: date,
					events: groupedEvents[key] as PEvent[],
				};
			})
			.filter(Boolean)
			.sort((a, b) => a!.date.getTime() - b!.date.getTime());
	}, [groupedEvents]);

	const currentMonthIndex = useMemo(() => {
		const index = availableMonths.findIndex((itemMonth) => {
			if (!itemMonth) {
				return;
			}

			itemMonth.month === currentMonth && itemMonth.year === currentYear;
		});
		// If current month not found, default to first available month
		return index >= 0 ? index : 0;
	}, [availableMonths, currentMonth, currentYear]);

	const currentMonthData = availableMonths[currentMonthIndex];
	const displayEvents = currentMonthData?.events || [];

	// Navigation handlers
	const goToPreviousMonth = () => {
		if (currentMonthIndex > 0) {
			const prevMonth = availableMonths[currentMonthIndex - 1];
			if (!prevMonth) return;
			setCurrentMonth(prevMonth.month);
			setCurrentYear(prevMonth.year);
		}
	};

	const goToNextMonth = () => {
		if (currentMonthIndex < availableMonths.length - 1) {
			const nextMonth = availableMonths[currentMonthIndex + 1];
			if (!nextMonth) return;
			setCurrentMonth(nextMonth.month);
			setCurrentYear(nextMonth.year);
		}
	};

	const hasPrevious = currentMonthIndex > 0;
	const hasNext = currentMonthIndex < availableMonths.length - 1;

	const monthYearDisplay = currentMonthData
		? format(currentMonthData.date, 'MMMM yyyy')
		: '';

	return (
		<div className="px-contain mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-center">
			<h1 className="sr-only">{title}</h1>
			{availableMonths.length > 0 && (
				<div className="my-10 flex items-center justify-between">
					<Button
						onClick={goToPreviousMonth}
						disabled={!hasPrevious}
						aria-label="Previous month"
					>
						<ChevronLeft className="h-5 w-5" />
						Previous
					</Button>

					<h2 className="text-2xl font-bold uppercase">{monthYearDisplay}</h2>

					<Button
						onClick={goToNextMonth}
						disabled={!hasNext}
						aria-label="Next month"
					>
						Next
						<ChevronRight className="h-5 w-5" />
					</Button>
				</div>
			)}

			{hasArrayValue(displayEvents) ? (
				<div className="flex-1">
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
							{displayEvents.map((item) => {
								const {
									title,
									subtitle,
									_id,
									status,
									eventDatetime,
									location,
									locationLink,
								} = item || {};

								return (
									<TableRow key={_id} className="t-b-1">
										<TableCell>
											<span className="font-bold uppercase">{title}</span>
											{subtitle && <span className="ml-2.5">{subtitle}</span>}
										</TableCell>
										<TableCell className="sm:min-w-28 uppercase">
											{eventDatetime
												? format(new Date(eventDatetime), 'iii, MM.dd.yy')
												: 'TBD'}
										</TableCell>
										<TableCell className="uppercase">
											{locationLink ? (
												<Link className="sm:min-w-72" href={locationLink}>
													{location}
												</Link>
											) : (
												<p className="sm:min-w-72">{location}</p>
											)}
										</TableCell>

										{hasArrayValue(status) && (
											<TableCell className="flex justify-end gap-1 uppercase">
												{status.map((item: any) => {
													const { _id, title, statusColor } = item || {};
													return (
														<span
															key={_id}
															className="t-b-2 rounded-4xl p-1.25 text-white"
															style={{
																backgroundColor:
																	buildRgbaCssString(statusColor) || undefined,
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
				</div>
			) : (
				<p className="py-8 text-center">No events for this month</p>
			)}
		</div>
	);
}

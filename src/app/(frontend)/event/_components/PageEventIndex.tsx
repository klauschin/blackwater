'use client';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
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
				const events = groupedEvents[key];
				const firstEvent = events[0];
				if (!firstEvent || !firstEvent.eventDatetime) return null;

				const date = new Date(firstEvent.eventDatetime);

				return {
					key,
					month: date.getMonth(),
					year: date.getFullYear(),
					date: date,
					events: events as PEvent[],
				};
			})
			.filter((item): item is NonNullable<typeof item> => item !== null)
			.sort((a, b) => a.date.getTime() - b.date.getTime());
	}, [groupedEvents]);

	const currentMonthIndex = useMemo(() => {
		const index = availableMonths.findIndex((itemMonth) => {
			return itemMonth.month === currentMonth && itemMonth.year === currentYear;
		});

		return index >= 0 ? index : 0;
	}, [availableMonths, currentMonth, currentYear]);

	const currentMonthData = availableMonths[currentMonthIndex];
	const displayEvents = useMemo(() => {
		return currentMonthData?.events || [];
	}, [currentMonthData]);

	const isHideStatusColumn = useMemo(() => {
		const isAllStatusEmpty = displayEvents.every((event) => {
			return event.status === null || event.status === undefined;
		});
		return isAllStatusEmpty;
	}, [displayEvents]);

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
		<div className="px-contain mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-between">
			<h1 className="sr-only">{title}</h1>
			<div className="flex items-center justify-between flex-1">
				<h5 className="t-h-5 uppercase">{monthYearDisplay}</h5>
				{availableMonths.length > 0 && (
					<div className="flex items-center justify-between">
						<Button
							onClick={goToPreviousMonth}
							disabled={!hasPrevious}
							aria-label="Previous month"
							variant="ghost"
						>
							Previous
						</Button>
						/
						<Button
							onClick={goToNextMonth}
							disabled={!hasNext}
							aria-label="Next month"
							variant="ghost"
						>
							Next
							<ArrowRight className="h-5 w-5" />
						</Button>
					</div>
				)}
			</div>
			{hasArrayValue(displayEvents) ? (
				<div className="flex-1">
					<Table className="border-t border-b">
						<TableHeader>
							<TableRow className="t-h-6 uppercase">
								<TableHead className="font-bold px-0">codex</TableHead>
								<TableHead className="font-bold">time</TableHead>
								<TableHead className="font-bold">loaction</TableHead>
								{!isHideStatusColumn && (
									<TableHead className="text-right font-bold">status</TableHead>
								)}
							</TableRow>
						</TableHeader>
						<TableBody>
							{displayEvents.map((item, index) => {
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
										<TableCell
											className={cn(
												'font-bold uppercase px-0 flex gap-2 t-h-6'
											)}
										>
											<span className="min-w-20">{title}</span>
											<span className="text-muted">{subtitle}</span>
										</TableCell>
										<TableCell className="sm:min-w-28 t-b-1 uppercase">
											{eventDatetime
												? format(new Date(eventDatetime), 'iii, MM.dd.yy')
												: 'TBD'}
										</TableCell>
										<TableCell className="t-b-1 uppercase">
											{locationLink ? (
												<Link className="sm:min-w-72" href={locationLink}>
													{location}
												</Link>
											) : (
												<p className="sm:min-w-72">{location}</p>
											)}
										</TableCell>
										<TableCell className="flex justify-end gap-1 uppercase">
											{hasArrayValue(status) &&
												status.map((item: any) => {
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

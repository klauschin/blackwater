'use client';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
import type { PEvent } from 'sanity.types';
import { motion } from 'motion/react';

interface PageEventsProps {
	data: PEvent & {
		groupedEvents: {
			[key: string]: PEvent[];
		};
	};
}

const MotionTableRow = motion(TableRow);
const MotionTableBody = motion(TableBody);
export function PageEvents({ data }: PageEventsProps) {
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
		<div className="px-contain mx-auto min-h-[inherit]">
			<h1 className="sr-only">{title}</h1>
			<div className="flex items-center justify-between my-10 lg:my-14 sticky top-header bg-background/90 z-10 backdrop-blur-2xl">
				<motion.h5
					key={monthYearDisplay}
					variants={{
						hidden: { opacity: 0, y: 30 },
						show: {
							opacity: 1,
							y: 0,
						},
					}}
					transition={{
						duration: 0.6,
						delay: 0.3,
						ease: [0, 0.71, 0.2, 1.01],
					}}
					initial="hidden"
					animate="show"
					className="t-h-5 uppercase"
				>
					{monthYearDisplay}
				</motion.h5>
				{availableMonths.length > 0 && (
					<div className="flex items-center justify-between">
						<Button
							onClick={goToPreviousMonth}
							disabled={!hasPrevious}
							aria-label="Previous month"
							variant="ghost"
							size="sm"
							className="uppercase t-b-2 cursor-pointer"
						>
							<ArrowLeft className="size-3.5" />
							Previous
						</Button>
						/
						<Button
							onClick={goToNextMonth}
							disabled={!hasNext}
							aria-label="Next month"
							variant="ghost"
							size="sm"
							className="uppercase t-b-2 cursor-pointer"
						>
							Next
							<ArrowRight className="size-3.5" />
						</Button>
					</div>
				)}
			</div>
			{hasArrayValue(displayEvents) ? (
				<Table className="border-t border-b my-12 lg:mb-28">
					<TableHeader>
						<TableRow className="t-h-6 uppercase">
							<TableHead className="font-bold px-0 lg:w-full">codex</TableHead>
							<TableHead className="font-bold text-right lg:text-left">
								time
							</TableHead>
							<TableHead className="font-bold hidden lg:table-cell">
								location
							</TableHead>
							{!isHideStatusColumn && (
								<TableHead className="text-right font-bold hidden lg:table-cell">
									status
								</TableHead>
							)}
						</TableRow>
					</TableHeader>
					<MotionTableBody
						key={displayEvents[0]._id}
						variants={{
							hidden: { opacity: 0 },
							show: {
								opacity: 1,
								transition: { staggerChildren: 0.1 },
							},
						}}
						initial="hidden"
						animate="show"
					>
						{displayEvents.map((item, index) => {
							const {
								title,
								subtitle,
								_id,
								status,
								eventDatetime,
								location,
								locationLink,
								lumaLink,
							} = item || {};

							return (
								<MotionTableRow
									key={_id}
									className="t-b-1 transition-colors hover:bg-foreground "
									variants={{
										hidden: { opacity: 0 },
										show: { opacity: 1 },
									}}
								>
									<TableCell
										className={cn(
											'font-bold uppercase px-0 t-h-6 lg:flex flex-wrap items-center gap-2.5'
										)}
									>
										<p className="text-pretty">{title}</p>
										{subtitle && (
											<p className="mt-4 lg:mt-0 text-muted">{subtitle}</p>
										)}
										<LocationItem
											location={location}
											locationLink={locationLink}
											className="lg:hidden mt-2"
										/>
										<div className="flex flex-wrap gap-2 lg:hidden mt-6 empty:hidden">
											<StatusItems status={status} lumaLink={lumaLink} />
										</div>
									</TableCell>
									<TableCell className="t-b-1 uppercase lg:align-middle align-top text-right lg:text-left">
										{eventDatetime
											? format(new Date(eventDatetime), 'iii, MM.dd.yy')
											: 'TBD'}
									</TableCell>
									<TableCell className="t-b-1 uppercase hidden lg:table-cell">
										<LocationItem
											location={location}
											locationLink={locationLink}
										/>
									</TableCell>
									<TableCell className="justify-end gap-1 hidden lg:flex">
										<StatusItems status={status} lumaLink={lumaLink} />
									</TableCell>
								</MotionTableRow>
							);
						})}
					</MotionTableBody>
				</Table>
			) : (
				<p className="py-8 text-center">No events for this month</p>
			)}
		</div>
	);
}

function LocationItem({
	locationLink,
	location,
	className,
}: {
	location: string | undefined;
	locationLink?: string | undefined;
	className?: string;
}) {
	if (!location) return null;
	return (
		<p className={cn('relative', className)}>
			{location}
			{locationLink && (
				<Link
					className="p-fill"
					href={locationLink}
					aria-label={location}
					target="_blank"
				/>
			)}
		</p>
	);
}

function StatusItems({
	className,
	status,
	lumaLink,
}: {
	status: any;
	className?: string;
	lumaLink?: string;
}) {
	if (!hasArrayValue(status)) return null;
	return status.map((item: any) => {
		const { _id, title, statusColor } = item || {};
		return (
			<span
				key={_id}
				className={cn(
					't-b-2 rounded-4xl py-2 px-2.5 text-foreground uppercase relative flex items-center gap-0.5 t-b-2',
					className
				)}
				style={{
					backgroundColor: buildRgbaCssString(statusColor) || undefined,
				}}
			>
				{title}
				{lumaLink && (
					<>
						<ArrowRight className="size-3" />
						<Link className="p-fill" href={lumaLink} aria-hidden={true} />
					</>
				)}
			</span>
		);
	});
}

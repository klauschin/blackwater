'use client';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildRgbaCssString, hasArrayValue } from '@/lib/utils';

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

export function PageEvents({ data }: PageEventsProps) {
	const { title, groupedEvents } = data || {};
	const currentDate = new Date();
	const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
	const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

	const isEventEnded = (eventDatetime: string | null | undefined) => {
		if (!eventDatetime) return false;
		const eventDate = new Date(eventDatetime);
		// Compare dates by setting time to end of day for the event date
		const eventDateEndOfDay = new Date(eventDate);
		eventDateEndOfDay.setHours(23, 59, 59, 999);
		return eventDateEndOfDay < currentDate;
	};

	// Helper function to get days until event (returns null if event has passed or is more than 3 days away)
	const getDaysUntilEvent = (eventDatetime: string | null | undefined) => {
		if (!eventDatetime) return null;
		const eventDate = new Date(eventDatetime);
		const eventDateStartOfDay = new Date(eventDate);
		eventDateStartOfDay.setHours(0, 0, 0, 0);

		const today = new Date(currentDate);
		today.setHours(0, 0, 0, 0);

		const diffTime = eventDateStartOfDay.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		// Only return days if event is in the future and within 3 days
		if (diffDays >= 0 && diffDays <= 3) {
			return diffDays;
		}
		return null;
	};

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
	const colStyle = isHideStatusColumn
		? 'grid-cols-[60%_1fr] lg:grid-cols-[3fr_10%_1fr]'
		: 'grid-cols-[60%_1fr] lg:grid-cols-[3fr_10%_1fr_230px]';

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
		<div className="px-contain mx-auto min-h-[inherit] py-10 lg:py-17.5">
			<h1 className="sr-only">{title}</h1>
			<div className="flex items-center justify-between sticky top-header bg-background/95 z-10 ">
				<motion.p
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
				</motion.p>
				{availableMonths.length > 0 && (
					<div className="flex items-center justify-between">
						<Button
							onClick={goToPreviousMonth}
							disabled={!hasPrevious}
							aria-label="Previous month"
							variant="ghost"
							size="sm"
							className="uppercase t-b-2 cursor-pointer hover:opacity-60"
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
							className="uppercase t-b-2 cursor-pointer hover:opacity-60"
						>
							Next
							<ArrowRight className="size-3.5" />
						</Button>
					</div>
				)}
			</div>
			{hasArrayValue(displayEvents) ? (
				<div className="mt-10 lg:mt-17.5">
					<div
						className={cn(
							't-h-6 uppercase grid border-y border-b border-white/80 py-2 lg:py-6',
							colStyle
						)}
					>
						<Th className="px-0">codex</Th>
						<Th
							isHideStatusColumn={isHideStatusColumn}
							className="text-right lg:text-left"
						>
							time
						</Th>
						<Th
							isHideStatusColumn={isHideStatusColumn}
							className="hidden lg:block"
						>
							location
						</Th>
						{!isHideStatusColumn && (
							<Th
								isHideStatusColumn={isHideStatusColumn}
								className="hidden lg:block text-right"
							>
								status
							</Th>
						)}
					</div>
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

						const eventHasEnded = isEventEnded(eventDatetime);
						const daysUntil = getDaysUntilEvent(eventDatetime);

						return (
							<motion.div
								key={_id}
								data-key={_id}
								className={cn(
									't-b-1 transition-colors hover:bg-foreground/90 grid items-center border-b group py-4 border-white/80 lg:py-2 lg:min-h-15',
									colStyle
								)}
								variants={{
									hidden: { opacity: 0 },
									show: { opacity: 1 },
								}}
								transition={{
									duration: 2,
									delay: (index + 1) * 0.12,
									ease: [0, 0.5, 0.5, 1],
								}}
								initial="hidden"
								animate="show"
							>
								<Td
									className={cn(
										'font-bold uppercase lg:pl-0 t-h-6 lg:flex flex-wrap items-center gap-2.5 text-balance'
									)}
								>
									<p className="text-balance mb-4 lg:mb-0">{title}</p>
									{subtitle && (
										<p className="text-muted text-balance">{subtitle}</p>
									)}
								</Td>
								<Td className="t-b-1 uppercase mb-auto text-right lg:text-left lg:mb-0">
									{eventDatetime
										? format(new Date(eventDatetime), 'iii, MM.dd.yy')
										: 'TBD'}
								</Td>
								<Td className="t-b-1 uppercase whitespace-pre-wrap text-balance mt-2 lg:mt-0 h-full flex items-center">
									<p
										className={cn('relative', {
											'underline hover:opacity-60 transition-opacity':
												locationLink,
										})}
									>
										{location}
									</p>
									{locationLink && (
										<Link
											className="p-fill increase-target-size"
											href={locationLink}
											aria-label={location}
											target="_blank"
										/>
									)}
								</Td>
								<Td className="lg:justify-end gap-1 flex col-start-1 lg:col-start-[unset] mt-6 lg:mt-0">
									{eventHasEnded && (
										<StatusItem key="ended" data={{ title: 'ended' }} />
									)}
									{daysUntil !== null && daysUntil !== undefined && (
										<StatusItem
											key={`in-${daysUntil}-day`}
											data={{
												title:
													daysUntil === 0
														? 'today'
														: `in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`,
											}}
										/>
									)}
									{hasArrayValue(status) &&
										status.map((item: any) => (
											<StatusItem key={item._id} data={item} />
										))}
								</Td>
							</motion.div>
						);
					})}
				</div>
			) : (
				<p className="py-8 text-center">No events for this month</p>
			)}
		</div>
	);
}

function StatusItem({ data }: { data: any }) {
	const { title, statusTextColor, statusBgColor, link } = data || {};
	return (
		<span
			className="rounded-4xl py-2 px-2.5 uppercase relative flex items-center gap-0.5 t-b-2"
			style={{
				color: buildRgbaCssString(statusTextColor) || 'var(--foreground)',
				backgroundColor: buildRgbaCssString(statusBgColor) || 'var(--muted)',
			}}
		>
			{title}
			{link && (
				<>
					<ArrowRight className="size-3" />
					<Link className="p-fill" href={link} aria-hidden={true} />
				</>
			)}
		</span>
	);
}

function Th({
	isHideStatusColumn,
	className,
	...props
}: React.ComponentProps<typeof motion.div> & {
	isHideStatusColumn?: boolean;
}) {
	return (
		<motion.div
			key={String(isHideStatusColumn)}
			variants={{
				hidden: { opacity: 0, y: 10 },
				show: { opacity: 1, y: 0 },
			}}
			initial="hidden"
			animate="show"
			transition={{
				duration: 0.6,
				delay: 0.3,
				ease: [0, 0.5, 0.5, 1],
			}}
			className={cn('font-bold px-2', className)}
			{...props}
		/>
	);
}
function Td({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'lg:px-2 whitespace-nowrap group-hover:text-background transition-colors empty:hidden relative',
				className
			)}
			{...props}
		/>
	);
}

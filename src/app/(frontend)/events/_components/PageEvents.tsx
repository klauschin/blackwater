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
		<div className="px-contain mx-auto min-h-[inherit]">
			<h1 className="sr-only">{title}</h1>
			<div className="flex items-center justify-between py-10 lg:py-14 sticky top-header bg-background/95 z-10 ">
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
				<div className="my-12 lg:mb-28">
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
					<motion.div
						key={displayEvents[0]._id}
						variants={{
							hidden: { opacity: 0 },
							show: {
								opacity: 1,
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
								<motion.div
									key={_id}
									className={cn(
										't-b-1 transition-colors hover:bg-foreground/90 grid items-center border-b group py-4 border-white/80',
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
									<Td className="t-b-1 uppercase whitespace-pre-wrap text-balance mt-2 lg:mt-0">
										<LocationItem
											location={location}
											locationLink={locationLink}
										/>
									</Td>
									<Td className="lg:justify-end gap-1 flex col-start-1 lg:col-start-[unset] mt-6 lg:mt-0">
										<StatusItems status={status} lumaLink={lumaLink} />
									</Td>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
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
		<p
			className={cn('relative', className, {
				'underline hover:opacity-60 transition-opacity': locationLink,
			})}
		>
			{location}
			{locationLink && (
				<Link
					className="p-fill increase-target-size"
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
				'lg:px-2 whitespace-nowrap group-hover:text-background transition-colors empty:hidden',
				className
			)}
			{...props}
		/>
	);
}

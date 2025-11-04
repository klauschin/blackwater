import React from 'react';
import { isSameDay, isToday } from 'date-fns';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

export default function DayCell({
	date,
	events,
	isCurrentMonth,
	onDayClick,
	onEventClick,
}) {
	const dayEvents = events.filter((event) =>
		isSameDay(new Date(event.date), date)
	);

	const isDateToday = isToday(date);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			onClick={() => onDayClick(date)}
			className={`min-h-[120px] cursor-pointer border border-gray-100 p-3 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
				!isCurrentMonth ? 'bg-gray-50/50 opacity-60' : 'bg-white'
			}`}
		>
			<div className="mb-2 flex items-start justify-between">
				<span
					className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium transition-all ${
						isDateToday
							? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
							: isCurrentMonth
								? 'text-gray-900'
								: 'text-gray-400'
					}`}
				>
					{date.getDate()}
				</span>
			</div>
			<div className="space-y-1">
				{dayEvents.slice(0, 3).map((event) => (
					<EventCard
						key={event.id}
						event={event}
						onClick={(e) => {
							e.stopPropagation();
							onEventClick(event);
						}}
					/>
				))}
				{dayEvents.length > 3 && (
					<p className="pl-3 text-xs font-medium text-gray-500">
						+{dayEvents.length - 3} more
					</p>
				)}
			</div>
		</motion.div>
	);
}

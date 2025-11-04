import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const colorClasses = {
	blue: 'bg-blue-50 border-blue-200 text-blue-900',
	purple: 'bg-purple-50 border-purple-200 text-purple-900',
	pink: 'bg-pink-50 border-pink-200 text-pink-900',
	green: 'bg-green-50 border-green-200 text-green-900',
	orange: 'bg-orange-50 border-orange-200 text-orange-900',
	red: 'bg-red-50 border-red-200 text-red-900',
};

const accentColors = {
	blue: 'bg-blue-500',
	purple: 'bg-purple-500',
	pink: 'bg-pink-500',
	green: 'bg-green-500',
	orange: 'bg-orange-500',
	red: 'bg-red-500',
};

export default function EventCard({ event, onClick }) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.2 }}
			onClick={onClick}
			className={`${colorClasses[event.color || 'blue']} group mb-1.5 cursor-pointer rounded-lg border p-2 transition-all duration-200 hover:shadow-md`}
		>
			<div className="flex items-start gap-2">
				<div
					className={`${accentColors[event.color || 'blue']} mt-1 h-full w-1 flex-shrink-0 rounded-full`}
				/>
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-medium group-hover:text-clip">
						{event.title}
					</p>
					{event.start_time && (
						<div className="mt-0.5 flex items-center gap-1 text-xs opacity-75">
							<Clock className="h-3 w-3" />
							<span>{event.start_time}</span>
							{event.end_time && <span>- {event.end_time}</span>}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
}

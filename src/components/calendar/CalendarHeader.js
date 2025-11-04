import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CalendarHeader({
	currentDate,
	onPrevMonth,
	onNextMonth,
	onToday,
	onAddEvent,
}) {
	return (
		<div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
			<div className="flex items-center gap-4">
				<h1 className="text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
					{format(currentDate, 'MMMM yyyy')}
				</h1>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="icon"
						onClick={onPrevMonth}
						className="h-9 w-9 rounded-full border-gray-200 hover:bg-gray-50"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={onNextMonth}
						className="h-9 w-9 rounded-full border-gray-200 hover:bg-gray-50"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<div className="flex gap-3">
				<Button
					variant="outline"
					onClick={onToday}
					className="rounded-full px-6"
				>
					Today
				</Button>
				<Button
					onClick={onAddEvent}
					className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 text-white shadow-lg hover:from-blue-700 hover:to-purple-700"
				>
					<Plus className="mr-2 h-4 w-4" />
					New Event
				</Button>
			</div>
		</div>
	);
}

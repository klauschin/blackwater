import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const colorOptions = [
	{ value: 'blue', label: 'Blue', class: 'bg-blue-500' },
	{ value: 'purple', label: 'Purple', class: 'bg-purple-500' },
	{ value: 'pink', label: 'Pink', class: 'bg-pink-500' },
	{ value: 'green', label: 'Green', class: 'bg-green-500' },
	{ value: 'orange', label: 'Orange', class: 'bg-orange-500' },
	{ value: 'red', label: 'Red', class: 'bg-red-500' },
];

export default function EventModal({
	open,
	onClose,
	onSave,
	onDelete,
	event,
	selectedDate,
}) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		date: '',
		start_time: '',
		end_time: '',
		color: 'blue',
	});

	useEffect(() => {
		if (event) {
			setFormData(event);
		} else if (selectedDate) {
			setFormData((prev) => ({
				...prev,
				date: format(selectedDate, 'yyyy-MM-dd'),
				title: '',
				description: '',
				start_time: '',
				end_time: '',
				color: 'blue',
			}));
		}
	}, [event, selectedDate, open]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-light">
						{event ? 'Edit Event' : 'New Event'}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="space-y-5 py-4">
						<div className="space-y-2">
							<Label htmlFor="title" className="text-sm font-medium">
								Event Title
							</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								placeholder="Enter event title"
								required
								className="border-gray-200 focus:border-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description" className="text-sm font-medium">
								Description
							</Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								placeholder="Add description (optional)"
								className="min-h-[80px] border-gray-200 focus:border-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="date"
								className="flex items-center gap-2 text-sm font-medium"
							>
								<Calendar className="h-4 w-4" />
								Date
							</Label>
							<Input
								id="date"
								type="date"
								value={formData.date}
								onChange={(e) =>
									setFormData({ ...formData, date: e.target.value })
								}
								required
								className="border-gray-200 focus:border-blue-500"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="start_time"
									className="flex items-center gap-2 text-sm font-medium"
								>
									<Clock className="h-4 w-4" />
									Start Time
								</Label>
								<Input
									id="start_time"
									type="time"
									value={formData.start_time}
									onChange={(e) =>
										setFormData({ ...formData, start_time: e.target.value })
									}
									className="border-gray-200 focus:border-blue-500"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="end_time" className="text-sm font-medium">
									End Time
								</Label>
								<Input
									id="end_time"
									type="time"
									value={formData.end_time}
									onChange={(e) =>
										setFormData({ ...formData, end_time: e.target.value })
									}
									className="border-gray-200 focus:border-blue-500"
								/>
							</div>
						</div>

						<div className="space-y-3">
							<Label className="text-sm font-medium">Color</Label>
							<RadioGroup
								value={formData.color}
								onValueChange={(value) =>
									setFormData({ ...formData, color: value })
								}
								className="flex gap-3"
							>
								{colorOptions.map((color) => (
									<div key={color.value} className="flex items-center">
										<RadioGroupItem
											value={color.value}
											id={color.value}
											className="sr-only"
										/>
										<Label
											htmlFor={color.value}
											className={`${color.class} h-8 w-8 cursor-pointer rounded-full transition-all hover:scale-110 ${
												formData.color === color.value
													? 'scale-110 ring-2 ring-gray-900 ring-offset-2'
													: ''
											}`}
										/>
									</div>
								))}
							</RadioGroup>
						</div>
					</div>

					<DialogFooter className="gap-2">
						{event && (
							<Button
								type="button"
								variant="destructive"
								onClick={() => onDelete(event.id)}
								className="mr-auto"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete
							</Button>
						)}
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button
							type="submit"
							className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
						>
							{event ? 'Update' : 'Create'} Event
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

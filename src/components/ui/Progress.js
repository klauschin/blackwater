'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

function Progress({ className, value, ...props }) {
	// Determine if we should use the exit animation
	const isComplete = value === 101;

	// Calculate the transform based on the value
	let transform;
	if (isComplete) {
		transform = 'translateX(100%)'; // Exit to the right
	} else {
		transform = `translateX(-${100 - (value || 0)}%)`;
	}

	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={cn('relative w-full overflow-hidden h-[3px]', className)}
			data-progress={value}
			{...props}
		>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className={cn(
					'relative h-full w-full flex-1 z-1 bg-accent',
					// Apply different classes based on completion state
					isComplete
						? 'origin-right duration-800 ease-circ-in-out'
						: 'origin-left duration-400 ease-circ-in-out'
				)}
				style={{ transform }}
			/>
		</ProgressPrimitive.Root>
	);
}

export { Progress };

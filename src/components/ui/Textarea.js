import * as React from 'react';
import { cn } from '@/lib/utils';

function Textarea({ className, ...props }) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				'flex field-sizing-content min-h-30 w-full resize-none rounded-md border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring md:text-sm',
				className
			)}
			{...props}
		/>
	);
}

export { Textarea };

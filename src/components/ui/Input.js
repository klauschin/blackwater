import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-black md:text-sm',
				'focus-visible:ring',
				className
			)}
			{...props}
		/>
	);
}

export { Input };

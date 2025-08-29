'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

function Label({ className, ...props }) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				'peer-disabled:state-disabled group-data-[disabled=true]:state-disabled flex items-center gap-2 text-sm leading-none font-medium select-none',
				className
			)}
			{...props}
		/>
	);
}

export { Label };

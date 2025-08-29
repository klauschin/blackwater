'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import Icon from '@/components/Icon';

const iconSize = 1.5;
const borderRadius = 'rounded-md';

//Accordion Props: https://www.radix-ui.com/primitives/docs/components/accordion#examples
function Accordion({ ...props }) {
	return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(`border`, borderRadius, className)}
			{...props}
		/>
	);
}

function AccordionTrigger({ className, children, ...props }) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					'accordion-trigger t-b-2 flex flex-1 cursor-pointer items-center justify-between gap-4 p-4 transition-transform [&[data-state=open]>div>.accordion-item-icon:before]:[transform:translate3d(-50%,-50%,0)rotate(180deg)]',
					borderRadius,
					className
				)}
				{...props}
			>
				{children}
				<div
					className={`flex items-center justify-center`}
					style={{ width: `${iconSize}em`, height: `${iconSize}em` }}
				>
					<Icon
						type="plus"
						size={iconSize * 0.4}
						thickness="1px"
						className="accordion-item-icon"
					/>
				</div>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({ className, children, ...props }) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden border-t"
			{...props}
		>
			<div className={cn('wysiwyg p-4', className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

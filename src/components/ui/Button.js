import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

/*
	1. Default: <Button>Button</Button>
	2. Default w Link:
		<Button asChild>
			<Link href="/login">Login</Link>
		</Button>
	3. Outline: <Button variant="outline">Outline</Button>
	4. Underline: <Button variant="underline" size="underline">Underline</Button>
	5. Underline Draw: <Button variant="underlineDraw" size="underline">Underline Draw</Button>
	6. Underline Hover: <Button variant="underlineHover" size="underline">Underline Hover</Button>
	7. Icon: <Button variant="outline" size="icon"><ChevronRight /></Button>
*/

const buttonVariants = cva(
	"relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md t-l-2 transition-[background-color,border-color,color] duration-200 ease-sin-in-out cursor-pointer leading-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
	{
		variants: {
			variant: {
				default: 'bg-black text-white hover:bg-black/80',
				outline:
					'border text-black border-black hover:bg-black hover:text-white',
				secondary:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				underline: 'underline-offset-[0.2em] underline',
				underlineDraw:
					"before:content-[''] before:absolute before:top-[calc(100%+1px)] before:left-0 before:w-[calc(100%-1px)] before:h-px before:bg-current before:origin-right before:scale-x-0 before:transition-transform before:duration-600 before:ease-in-out hover:before:scale-x-100 hover:before:origin-left",
				underlineHover:
					"before:content-[''] before:absolute before:top-[calc(100%+1px)] before:left-0 before:w-[calc(100%-1px)] before:h-px before:bg-current before:origin-left before:scale-x-100 before:transition-transform before:duration-600 before:ease-in-out hover:before:scale-x-0 hover:before:origin-right",
			},
			size: {
				default: 'h-12 px-8 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-14 rounded-md px-6 has-[>svg]:px-4',
				underline: 'h-auto',
				icon: 'size-10',
				iconLarge: 'size-12',
				iconSmall: 'size-7',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

function Button({
	className,
	variant,
	size,
	type = 'button',
	ariaLabel,
	asChild = false,
	...props
}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			{...(!asChild && { type })}
			type={type}
			aria-label={ariaLabel}
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };

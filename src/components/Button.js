'use client';

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import SvgIcons from '@/components/SvgIcons';
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
	'relative inline-flex justify-between gap-2.5 items-center leading-none rounded-[3px] whitespace-nowrap transition-colors duration-300 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:pointer-events-none',
	{
		variants: {
			variant: {
				default: 't-l-1 uppercase py-2.5 px-4',
				cta: 't-l-1 uppercase p-2.5 max-w-[350px] whitespace-normal text-left',
				sm: 't-l-2 px-3 py-2',
				nav: 't-l-2 px-2 h-[33px] rounded-none',
				pill: 't-l-2 h-5 rounded-[3px] px-4',
				asteriskCircle:
					't-l-2 flex w-full items-center justify-between px-2.5 py-2 gap-4 rounded-none group transition-colors [&_svg]:size-2 [&_svg]:animate-rotate after:inline-block after:w-3 after:h-3 after:border after:border-current after:rounded-full after:transition-transform after:duration-300 after:ease-cubic-in-out [&.is-active]:after:scale-0 hover:after:scale-0',
				asterisk:
					'overflow-hidden t-l-2 flex w-full items-center justify-between px-2.5 py-2 gap-4 rounded-none group transition-colors [&_svg]:size-2 [&_svg]:animate-rotate',
			},
			color: {
				black: 'bg-black text-white',
				gainsboro: 'bg-gainsboro text-black [&>.btn-bg]:bg-red',
				white: 'bg-white text-black',
				cream: 'bg-cream text-black [&>.btn-bg]:bg-laurel [&>*]:!text-black',
				moss: 'bg-moss text-white [&>.btn-bg]:bg-kombu',
				gold: 'bg-gold text-black [&>.btn-bg]:bg-red',
				red: 'bg-red text-white',
				laurel: 'bg-laurel text-white',
				laurelBlack: 'bg-laurel text-black [&>.btn-bg]:bg-red',
				gray: 'bg-gray text-white [&>.btn-bg]:bg-red',
				kombu: 'bg-kombu text-white',
			},
			hoverColor: {
				white:
					'hover:bg-white hover:text-black [&.is-active]:bg-white [&.is-active]:text-black',
				red: 'hover:bg-red hover:text-white [&.is-active]:bg-red [&.is-active]:text-white',
				kombu:
					'hover:bg-white hover:text-kombu [&.is-active]:bg-white [&.is-active]:text-kombu',
				gold: 'hover:bg-gold hover:text-black [&.is-active]:bg-gold [&.is-active]:text-black',
			},
			textColor: {
				black: 'text-black',
			},
		},
		defaultVariants: {
			variant: 'default',
			color: 'black',
		},
	}
);

const Button = React.forwardRef((props, ref) => {
	const {
		variant = 'default',
		color = 'black',
		hoverColor,
		textColor,
		type = 'button',
		className = '',
		asChild = false,
		asSpan = false,
		isActive = false,

		...rest
	} = props;

	const Comp = asChild ? Slot : asSpan ? 'span' : 'button';

	const content =
		props.variant === 'asteriskCircle' ? (
			<>
				{props.children}
				<span className="ease-cubic-in-out tablet:group-[.is-no-asterisk]:inline-block absolute top-1/2 right-3 inline-block -translate-y-1/2 scale-0 transform transition-transform duration-300 group-hover:scale-100 group-[.is-active]:scale-100 group-[.is-no-asterisk]:hidden">
					<SvgIcons type="asterisk" />
				</span>
			</>
		) : props.variant === 'asterisk' ? (
			<>
				<span className="btn-bg ease-cubic-in-out absolute inset-0 h-full w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 group-[.is-active]:scale-x-100" />

				<span className="transition-color relative z-[1] duration-300 group-hover:text-white group-[.is-active]:text-white">
					{props.children}
				</span>
				<span className="ease-back-in-out tablet:group-[.is-no-asterisk]:inline-block inline-block translate-x-10 text-white transition-all duration-300 group-hover:translate-x-0 group-[.is-active]:translate-x-0 group-[.is-active]:scale-100 group-[.is-no-asterisk]:hidden">
					<SvgIcons type="asterisk" />
				</span>
			</>
		) : (
			props.children
		);

	return (
		<Comp
			ref={ref}
			className={cn(
				buttonVariants({ variant, color, hoverColor, textColor, className }),
				{
					'is-active pointer-events-none': isActive,
				}
			)}
			type={type}
			{...rest}
		>
			{content}
		</Comp>
	);
});

Button.displayName = 'Button';

export { Button };

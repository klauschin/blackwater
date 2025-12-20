import React, { useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hasArrayValue } from '@/lib/utils';
import Menu from '@/components/Menu';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/Sheet';

type MobileMenuProps = {
	data: any;
};
export default function MobileMenu({ data }: MobileMenuProps) {
	const pathname = usePathname();
	const { menu } = data || {};
	const { items } = menu || {};
	const [open, setOpen] = useState(false);

	if (!hasArrayValue(items)) return null;

	const buttonClasses =
		'group block relative h-8 w-8 transition-opacity duration-600 ml-auto cursor-pointer text-black mobile:hidden';
	const buttonContent = (
		<>
			<div className="absolute top-1/2 left-1/2 min-h-10 min-w-10 -translate-x-1/2 -translate-y-1/2" />
			<div className="absolute top-1/4 left-1/2 h-0.5 w-8 origin-center -translate-x-1/2 -translate-y-1/2 bg-current transition-all duration-200 group-data-[state=open]:top-1/2 group-data-[state=open]:rotate-45" />
			<div className="absolute top-3/4 left-1/2 h-0.5 w-8 origin-center -translate-x-1/2 -translate-y-1/2 bg-current transition-all duration-200 group-data-[state=open]:top-1/2 group-data-[state=open]:-rotate-45" />
			<div className="absolute top-1/2 left-1/2 h-0.5 w-8 origin-center -translate-x-1/2 -translate-y-1/2 bg-current transition-all duration-200 group-data-[state=open]:opacity-0" />
		</>
	);

	return (
		<Sheet open={open} onOpenChange={() => setOpen(!open)}>
			<SheetTrigger className={buttonClasses} aria-label="Open Mobile Menu">
				{buttonContent}
			</SheetTrigger>
			<SheetContent className="px-contain mobile:hidden pt-[calc(var(--h-announcement)+var(--height-header)+20px)] pb-5">
				<SheetHeader>
					<SheetTitle className="sr-only">Mobile menu</SheetTitle>
					<SheetDescription className="sr-only">
						Navigation menu for smaller screen sizes
					</SheetDescription>
				</SheetHeader>

				{hasArrayValue(items) && (
					<Menu
						items={items}
						className="g-mobile-menu__links"
						ulClassName="flex flex-col justify-start items-center t-h-3"
					/>
				)}
			</SheetContent>
		</Sheet>
	);
}

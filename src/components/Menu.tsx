import React from 'react';
import { usePathname } from 'next/navigation';
import { checkIfLinkIsActive } from '@/lib/utils';
import CustomLink from '@/components/CustomLink';
import Dropdown from '@/components/MenuDropdown';
import { cn } from '@/lib/utils';

export interface MenuItem {
	link: LinkProps;
	title: string;
	dropdownItems?: MenuItem[];
}

type MenuProps = {
	className?: string;
	ulClassName?: string;
	items: MenuItem[];
};
interface LinkProps {
	href: string;
}

export default function Menu({ items, className, ulClassName }: MenuProps) {
	const pathName = usePathname();

	if (!items) {
		return false;
	}

	return (
		<div className={cn(className)}>
			<ul className={cn(ulClassName)}>
				{items.map((item: MenuItem, index) => {
					const { link, dropdownItems } = item || {};
					const isDropdown = !!dropdownItems;

					if (isDropdown) {
						const isActive =
							dropdownItems.filter((item) => {
								return checkIfLinkIsActive({
									pathName: pathName,
									url: link.href,
								});
							}).length > 0;

						return (
							<li key={`li-${index}`} className={cn({ 'is-active': isActive })}>
								<Dropdown title={item.title} items={item.dropdownItems || []} />
							</li>
						);
					}

					const isActive = checkIfLinkIsActive({
						pathName: pathName,
						url: link.href,
					});

					return (
						<li key={`li-${index}`} className={cn({ 'is-active': isActive })}>
							<CustomLink link={link}>{item.title}</CustomLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

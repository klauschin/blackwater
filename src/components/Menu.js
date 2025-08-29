import React from 'react';
import { usePathname } from 'next/navigation';
import { checkIfLinkIsActive } from '@/lib/utils';
import CustomLink from '@/components/CustomLink';
import Dropdown from '@/components/MenuDropdown';
import clsx from 'clsx';

export default function Menu({ items, className, ulClassName }) {
	const pathName = usePathname();

	if (!items) {
		return false;
	}

	return (
		<div className={className || ''}>
			<ul className={ulClassName || ''}>
				{items.map((item, index) => {
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
							<li
								key={`li-${index}`}
								className={clsx({ 'is-active': isActive })}
							>
								<Dropdown title={item.title} items={item.dropdownItems} />
							</li>
						);
					}

					const isActive = checkIfLinkIsActive({
						pathName: pathName,
						url: link.href,
					});

					return (
						<li key={`li-${index}`} className={clsx({ 'is-active': isActive })}>
							<CustomLink link={link}>{item.title}</CustomLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

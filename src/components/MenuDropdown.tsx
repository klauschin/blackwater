import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { checkIfLinkIsActive } from '@/lib/utils';
import { cn } from '@/lib/utils';
import CustomLink from '@/components/CustomLink';
import { Button } from '@/components/ui/Button';

interface MenuItem {
	link: { href: string };
	title: string;
}

type MenuDropdownProps = {
	items: MenuItem[];
	title?: string;
};

export default function MenuDropdown({ title, items }: MenuDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const pathName = usePathname();

	return (
		<>
			<div className={cn('dropdown', { 'is-open': isOpen })}>
				<Button
					className="dropdown-toggle"
					aria-expanded={isOpen}
					onClick={() => setIsOpen(!isOpen)}
				>
					{title}
				</Button>
				<div className="dropdown-content">
					<ul className="dropdown-nav">
						{items.map((item: MenuItem, index) => {
							const { link, title } = item || {};
							const isActive = checkIfLinkIsActive({
								pathName: pathName,
								url: link.href,
							});

							return (
								<li
									key={`li-${index}`}
									className={cn({ 'is-active': isActive })}
								>
									<CustomLink link={link}>{title}</CustomLink>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<style jsx>{`
				.dropdown {
					&.is-open {
						.dropdown-content {
							opacity: 1;
							pointer-event: auto;
						}
					}
				}
				.dropdown-content {
					opacity: 0;
					pointer-event: none;
				}
				.dropdown-nav {
					position: absolute;
				}
			`}</style>
		</>
	);
}

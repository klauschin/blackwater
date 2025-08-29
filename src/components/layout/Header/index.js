import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { hasArrayValue } from '@/lib/utils';
import Menu from '@/components/Menu';
import MobileMenu from '@/components/MobileMenu';

export default function Header({ data }) {
	const { siteTitle, menu } = data || {};
	const { items } = menu || {};
	const headerRef = useRef();

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--h-header',
			`${headerRef?.current?.offsetHeight || 0}px`
		);
	}, []);

	return (
		<>
			<header
				ref={headerRef}
				className="px-contain relative z-10 flex w-full items-center gap-4 bg-white py-2.5 leading-none"
			>
				<Link href="/">
					<span className="t-b-1">{siteTitle ?? 'Title'}</span>
				</Link>

				{hasArrayValue(items) && (
					<>
						<Menu
							items={items}
							className="mobile:block hidden select-none"
							ulClassName="flex item-center gap-2.5 t-b-2"
						/>
						<MobileMenu data={data} />
					</>
				)}
			</header>
		</>
	);
}

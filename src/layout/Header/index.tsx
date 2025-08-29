'use client';
import './style.scss';
import React, { useEffect, useState } from 'react';
import SvgIcons from '@/components/SvgIcons';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { scrollEnable, scrollDisable } from '@/lib/utils';
import Link from 'next/link';
import MobileMenuTrigger from './MobileMenuTrigger';

export default function Header() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const onToggleMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		isMobileMenuOpen ? scrollEnable() : scrollDisable();
	};

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	return null;

	return (
		<>
			<header
				className={clsx('g-header f-h f-a-c', {
					'is-open': isMobileMenuOpen,
				})}
			></header>
		</>
	);
}

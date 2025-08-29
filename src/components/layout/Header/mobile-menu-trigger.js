import React from 'react';
import { cn } from '@/lib/utils';

export default function MobileMenuTrigger({ isMobileMenuOpen, onHandleClick }) {
	return (
		<button
			aria-label="Toggle Menu"
			className={cn('g-mobile-menu-trigger mobile-down-only', {
				'is-open': isMobileMenuOpen,
			})}
			onClick={onHandleClick}
		>
			<div className="line" />
			<div className="line" />
			<div className="line" />
		</button>
	);
}

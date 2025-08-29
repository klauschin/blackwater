import React from 'react';
import { usePathname } from 'next/navigation';
import { pageTransitionFade } from '@/lib/animate';
import { m } from 'motion/react';

export default function Main({ children }) {
	const pathname = usePathname();
	return (
		<m.main
			id="main"
			key={pathname}
			initial="initial"
			animate="animate"
			variants={pageTransitionFade}
		>
			{children}
		</m.main>
	);
}

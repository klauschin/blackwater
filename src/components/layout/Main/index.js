import { m } from 'motion/react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { pageTransitionFade } from '@/lib/animate';

export default function Main({ children }) {
	const pathname = usePathname();
	return (
		<m.main
			id="main"
			key={pathname}
			initial="initial"
			animate="animate"
			variants={pageTransitionFade}
			className="min-h-main py-[0.1px]"
		>
			{children}
		</m.main>
	);
}

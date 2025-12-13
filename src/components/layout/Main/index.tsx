import { usePathname } from 'next/navigation';
import { pageTransitionFade } from '@/lib/animate';
import { motion } from 'motion/react';

export default function Main({ children }) {
	const pathname = usePathname();
	return (
		<motion.main
			id="main"
			key={pathname}
			initial="initial"
			animate="animate"
			variants={pageTransitionFade}
		>
			{children}
		</motion.main>
	);
}

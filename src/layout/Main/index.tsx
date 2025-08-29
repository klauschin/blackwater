'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { pageTransitionFade } from '@/lib/animate';

export default function Main({ children }: { children: React.ReactNode }) {
	return (
		<motion.main
			id="main"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransitionFade}
		>
			{children}
		</motion.main>
	);
}

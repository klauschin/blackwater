'use client';
import './style.scss';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageTransitionFade } from '@/lib/animate';

export default function Footer() {
	const footerRef = useRef();

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--s-footer',
			`${footerRef?.current?.offsetHeight || 0}px`
		);
	}, []);

	return null;

	return (
		<>
			<motion.footer
				ref={footerRef}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={pageTransitionFade}
				className="g-footer cr-white bg-black"
			>
				<div className="g-footer__main"></div>
			</motion.footer>
		</>
	);
}

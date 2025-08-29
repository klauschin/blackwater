'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '@/lib/gtag';
import { siteSetup } from '@/hooks/useVsSetup';
import AdaSkip from './AdaSkip';
import Announcement from './Announcement';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ProgressLoader from './ProgressLoader';
import { LazyMotion, domAnimation } from 'motion/react';

export function Layout({ children, siteData }) {
	const { announcement, header, footer } = siteData || {};
	const pathname = usePathname();

	useEffect(() => {
		siteSetup();
	}, []);

	useEffect(() => {
		if (siteData?.integrations?.gaID) {
			gtag.pageview(pathname, siteData?.integrations?.gaID);
		}
	}, [siteData, pathname]);

	useEffect(() => {
		const setViewportHeight = () => {
			document.documentElement.style.setProperty(
				'--s-vp-height-js',
				`${window.innerHeight}px`
			);
		};

		// Set once on load
		setViewportHeight();

		// Optional: Update on resize
		window.addEventListener('resize', setViewportHeight);

		// Cleanup on unmount
		return () => {
			window.removeEventListener('resize', setViewportHeight);
		};
	}, []);

	const headerData = {
		...header,
		siteTitle: siteData?.title,
	};

	return (
		<LazyMotion features={domAnimation}>
			<ProgressLoader />
			<AdaSkip />
			<Announcement data={announcement} />
			<Header data={headerData} />
			<Main>{children}</Main>
			{/* <Footer siteData={siteData} data={footer} /> */}
		</LazyMotion>
	);
}

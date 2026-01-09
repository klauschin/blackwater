'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '@/lib/gtag';
import AdaSkip from './AdaSkip';
import { Footer } from './Footer';
import { Header } from './Header';
import { ToolBar } from './ToolBar';
import { Main } from './Main';
import { LazyMotion, domAnimation } from 'motion/react';

type LayoutProps = {
	children: React.ReactNode;
	siteData: any;
};
export function Layout({ children, siteData }: LayoutProps) {
	const { header, footer, sharing } = siteData || {};
	const pathname = usePathname();

	useEffect(() => {
		if (siteData?.integrations?.gaID) {
			gtag.pageview(pathname, siteData?.integrations?.gaID);
		}
	}, [siteData, pathname]);

	const headerData = {
		...header,
		siteTitle: sharing?.siteTitle,
	};

	const footerData = {
		...footer,
		siteTitle: sharing?.siteTitle,
	};

	return (
		<LazyMotion features={domAnimation}>
			<AdaSkip />
			<Header data={headerData} />
			<Main>{children}</Main>
			<Footer data={footerData} />
			<ToolBar menu={footerData.toolbarMenu} />
		</LazyMotion>
	);
}

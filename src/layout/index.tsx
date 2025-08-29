'use client';
import React from 'react';
// import AdaSkip from './AdaSkip';
import Announcement from './Announcement';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	if (pathname.startsWith('/sanity')) {
		return children;
	}

	return (
		<>
			{/* <AdaSkip /> */}
			<Announcement data={null} />
			<Header />
			<Main>{children}</Main>
			<Footer />
		</>
	);
}

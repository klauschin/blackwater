import '@/styles/globals.css';
import localFont from 'next/font/local';
import React from 'react';
import Layout from '@/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Klaus Chin',
};

const awConqueror = localFont({
	src: '../../public/fonts/font-aw-conqueror-light.woff2',
	variable: '--font-aw-conqueror',
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="overflow-hidden">
			<body className={`${awConqueror.variable} font-display antialiased`}>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}

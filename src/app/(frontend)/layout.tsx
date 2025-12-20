import type { Metadata } from 'next';
import { VisualEditing } from 'next-sanity/visual-editing';
import localFont from 'next/font/local';
import { draftMode } from 'next/headers';
import '@/globals.css';
import { imageBuilder } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { SanityLive } from '@/sanity/lib/live';
import { siteDataQuery } from '@/sanity/lib/queries';
import ReactQueryProvider from '@/lib/providers/ReactQueryProvider';
import DraftModeToast from '@/components/DraftModeToast';
import { Layout } from '@/components/layout';
import HeadTrackingCode from '@/components/layout/HeadTrackingCode';
import { Toaster } from 'sonner';

const fontABCDisplay = localFont({
	src: [
		{
			path: '../fonts/font-abc-display-regular.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-ABC-Display',
});

export async function generateMetadata(): Promise<Metadata> {
	const {
		data: { sharing },
	} = await sanityFetch({
		query: siteDataQuery,
		tags: ['settingsGeneral'],
		stega: false,
	});

	const { siteTitle } = sharing || {};
	const siteFavicon = sharing?.favicon || false;
	const siteFaviconUrl = siteFavicon
		? imageBuilder.image(siteFavicon).width(256).height(256).url()
		: '/favicon.ico';

	const siteFaviconLight = sharing?.faviconLight || false;
	const siteFaviconLightUrl = siteFaviconLight
		? imageBuilder.image(siteFaviconLight).width(256).height(256).url()
		: siteFaviconUrl;

	const shareGraphic = sharing?.shareGraphic?.asset;
	const shareGraphicUrl = shareGraphic
		? imageBuilder.image(shareGraphic).format('webp').width(1200).url()
		: null;

	const shareVideoUrl = sharing?.shareVideo || null;

	return {
		metadataBase: new URL(process.env.SITE_URL),
		title: {
			template: `%s | ${siteTitle}`,
			default: siteTitle,
		},
		creator: siteTitle,
		publisher: siteTitle,
		applicationName: siteTitle,
		openGraph: {
			title: siteTitle,
			images: [
				{
					url: shareGraphicUrl,
					width: 1200,
					height: 630,
				},
			],
			videos: [
				{
					url: shareVideoUrl,
					width: 1200,
					height: 630,
					type: 'video/mp4',
				},
			],
			url: process.env.SITE_URL,
			siteName: siteTitle,
			locale: 'en_US',
			type: 'website',
		},
		icons: {
			icon: [
				{
					url: siteFaviconUrl,
					media: '(prefers-color-scheme: light)',
				},
				{
					url: siteFaviconLightUrl,
					media: '(prefers-color-scheme: dark)',
				},
			],
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isEnabled: isDraftModeEnabled } = await draftMode();
	const { data } = await sanityFetch({
		query: siteDataQuery,
		tags: [
			'gAnnouncement',
			'gHeader',
			'gFooter',
			'settingsMenu',
			'settingsGeneral',
			'settingsIntegration',
			'settingsBrandColors',
		],
	});

	return (
		<ReactQueryProvider>
			<html lang="en" className={`${fontABCDisplay.variable}`}>
				<head>
					<meta
						httpEquiv="Content-Type"
						charSet="UTF-8"
						content="text/html;charset=utf-8"
					/>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<HeadTrackingCode siteData={data} />
				</head>

				<body>
					<Layout siteData={data}>{children}</Layout>
					<SanityLive />
					<Toaster />
					{isDraftModeEnabled && (
						<>
							<DraftModeToast />
							<VisualEditing />
						</>
					)}
				</body>
			</html>
		</ReactQueryProvider>
	);
}

// oxlint-disable-next-line no-unassigned-import

export { metadata, viewport } from 'next-sanity/studio';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>{children}</body>
		</html>
	);
}

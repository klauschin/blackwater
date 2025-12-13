import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { hasArrayValue } from '@/lib/utils';

type HeadTrackingCodeProps = {};
export default function HeadTrackingCode({ siteData = {} }) {
	const { integrations } = siteData || {};
	const { gaIDs, gtmIDs } = integrations || {};

	const isSanityRoute =
		typeof window !== 'undefined' &&
		window.location.pathname.startsWith('/sanity');

	if (process.env.NODE_ENV !== 'production' || isSanityRoute) {
		return null;
	}

	return (
		<>
			{hasArrayValue(gaIDs) &&
				gaIDs.map((id) => <GoogleAnalytics key={id} gaId={id} />)}
			{hasArrayValue(gtmIDs) &&
				gtmIDs.map((id) => <GoogleTagManager key={id} gtmId={id} />)}
		</>
	);
}

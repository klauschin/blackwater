import { PageEmailSignature } from './_components/PageEmailSignature';

export default async function Page() {
	const SITE_URL = process.env.SITE_URL;
	return <PageEmailSignature siteUrl={SITE_URL} />;
}

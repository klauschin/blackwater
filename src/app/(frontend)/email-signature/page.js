import PageEmailSignature from './_components/PageEmailSignature';

export const metadata = {
	title: 'Email Signature',
	robots: {
		index: false,
		follow: false,
	},
};

export default async function Page() {
	return <PageEmailSignature />;
}

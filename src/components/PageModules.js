import React from 'react';
import dynamic from 'next/dynamic';
import Img from '@/components/Image';

const Marquee = dynamic(() => import('./Marquee'));
const Freeform = dynamic(() => import('./Freeform'), {
	loading: () => <p>Loading...</p>,
});

export default function PageModules({ module }) {
	const type = module._type;

	switch (type) {
		case 'freeform':
			return <Freeform data={module} />;
		case 'marquee':
			return <Marquee data={module} />;

		default:
			return null;
	}
}

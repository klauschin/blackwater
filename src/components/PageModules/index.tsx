import dynamic from 'next/dynamic';
import React from 'react';

const Marquee = dynamic(() => import('./Marquee'));
const Freeform = dynamic(() => import('../Freeform'), {
	loading: () => <p>Loading...</p>,
});

interface PageModulesProps {
	module: any;
}

export default function PageModules({ module }: PageModulesProps) {
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

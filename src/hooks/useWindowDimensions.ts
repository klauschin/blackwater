'use client';

import { useLayoutEffect, useState } from 'react';

interface WindowDimensions {
	width: number;
	height: number;
}

function getWindowDimensions(): WindowDimensions {
	if (typeof window === 'undefined') {
		return {
			width: 0,
			height: 0,
		};
	}
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

export default function useWindowDimensions(): WindowDimensions {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
		getWindowDimensions()
	);

	useLayoutEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
}

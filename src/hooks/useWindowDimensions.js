'use client';

import { useEffect, useState } from 'react';

export const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536,
	max: 2000,
};

const getWindowDimensions = () => {
	if (typeof window === 'undefined') {
		return { width: 0, height: 0 };
	}
	const { innerWidth: width, innerHeight: height } = window;
	return { width, height };
};

const getDeviceFlags = (width) => {
	const isTouchDevice =
		typeof window !== 'undefined' &&
		window.matchMedia('(any-hover: none)').matches;

	return {
		isTouchDevice,
		isSm: width < breakpoints.sm,
		isMd: width >= breakpoints.sm && width < breakpoints.md,
		isLg: width >= breakpoints.md && width < breakpoints.lg,
		isXl: width >= breakpoints.lg && width < breakpoints.xl,
		isXxl: width >= breakpoints.xl && width < breakpoints.xxl,
		isAboveXxl: width >= breakpoints.xxl,
		isAboveMax: width >= breakpoints.max,
		isDesktop: width >= breakpoints.lg,
		isTablet: width < breakpoints.lg,
		isMobile: width < breakpoints.md,
	};
};

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);
	const [deviceFlags, setDeviceFlags] = useState(
		getDeviceFlags(windowDimensions.width)
	);

	useEffect(() => {
		const handleResize = () => {
			const newDimensions = getWindowDimensions();
			setWindowDimensions(newDimensions);
			setDeviceFlags(getDeviceFlags(newDimensions.width));
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {
		width: windowDimensions.width,
		height: windowDimensions.height,
		...deviceFlags,
	};
}

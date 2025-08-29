import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const useDotButton = (emblaApi, onButtonClick) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);

	const onDotButtonClick = useCallback(
		(index) => {
			if (!emblaApi) return;
			emblaApi.scrollTo(index);
			if (onButtonClick) onButtonClick(emblaApi);
		},
		[emblaApi, onButtonClick]
	);

	const onInit = useCallback((emblaApi) => {
		setScrollSnaps(emblaApi.scrollSnapList());
	}, []);

	const onSelect = useCallback((emblaApi) => {
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onInit(emblaApi);
		onSelect(emblaApi);

		emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onInit, onSelect]);

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	};
};

export const DotButton = ({ isSelected, index, ...props }) => (
	<button
		type="button"
		className={cn(
			"relative size-2.5 cursor-pointer rounded-full border-none bg-black shadow-none transition-opacity duration-300 outline-none after:absolute after:top-1/2 after:left-1/2 after:block after:size-[15px] after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] hover:opacity-60",
			isSelected ? 'opacity-100' : 'opacity-30'
		)}
		aria-label={`Navigate to slide ${index}`}
		{...props}
	/>
);

import React, { useCallback, useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/Button';

export const usePrevNextButtons = (emblaApi) => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((emblaApi) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

export const PrevButton = ({ ...props }) => (
	<Button
		variant="default"
		size="icon"
		className="flex cursor-pointer items-center justify-center"
		aria-label="Navigate to the previous slide"
		{...props}
	>
		<Icon type="caret-left" />
	</Button>
);

export const NextButton = ({ ...props }) => (
	<Button
		variant="default"
		size="icon"
		className="flex cursor-pointer items-center justify-center"
		aria-label="Navigate to the next slide"
		{...props}
	>
		<Icon type="caret-right" />
	</Button>
);

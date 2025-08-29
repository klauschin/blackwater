'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { DotButton, useDotButton } from './DotButton';
import { NextButton, PrevButton, usePrevNextButtons } from './NavButtons';
import AutoHeight from 'embla-carousel-auto-height';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

export default function Carousel({
	align = 'center',
	breakpoints = {},
	containScroll = 'trimSnaps',
	dragFree = false,
	gap = '0px',
	itemWidth = 100, // as %
	itemMinWidth = 0, // as px
	loop = true,
	slidesToScroll = 1,

	isShowNav = false,
	isShowDots = false,
	isFade = false,
	isAutoplay = false,
	autoplayInterval = 4000,
	isAutoHeight = true,
	children,
	className,
}) {
	const options = {
		align: isFade ? 'center' : align,
		breakpoints,
		containScroll: isFade ? false : containScroll,
		dragFree,
		loop,
		slidesToScroll,
		inViewThreshold: 1,
		skipSnaps: true,
	};
	const autoplayOptions = {
		stopOnInteraction: false,
		jump: isFade,
		delay: autoplayInterval,
	};
	const plugins = [
		ClassNames(),
		WheelGesturesPlugin(),
		...(isFade ? [Fade()] : []),
		...(isAutoplay ? [Autoplay(autoplayOptions)] : []),
		...(isAutoHeight ? [AutoHeight()] : []),
	];

	const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);
	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi);

	const [isSingleSlide, setIsSingleSlide] = useState(true);
	const [isDraggable, setIsDraggable] = useState(true);
	const [isDragging, setIsDragging] = useState(false);

	const updateDraggingDown = useCallback(() => {
		setIsDragging(true);
	}, [emblaApi]);

	const updateDraggingUp = useCallback(() => {
		setIsDragging(false);
	}, [emblaApi]);

	const updateDraggable = useCallback(() => {
		if (emblaApi.canScrollNext()) {
			setIsDraggable(true);
			emblaApi.reInit({ watchDrag: true });
		} else {
			setIsDraggable(false);
			emblaApi.reInit({ watchDrag: false });
		}
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		setIsSingleSlide(emblaApi.scrollSnapList().length <= 1);

		updateDraggable(emblaApi);

		emblaApi.on('pointerUp', updateDraggingUp);
		emblaApi.on('pointerDown', updateDraggingDown);
		emblaApi.on('resize', updateDraggable);
	}, [emblaApi, updateDraggable]);

	if (!children?.length > 0) return null;

	return (
		<div
			className={cn('relative w-full', className)}
			style={{
				'--item-width': `${itemWidth}%`,
				'--item-min-width': `${itemMinWidth}px`,
				'--item-gap': gap,
			}}
		>
			<div
				ref={emblaRef}
				className={cn('overflow-hidden', {
					'cursor-grab': isDraggable,
					'cursor-grabbing': isDragging && isDraggable,
					'cursor-auto': !isDraggable,
				})}
			>
				<div className="flex touch-pan-y items-start select-none [transition:height_0.2s] backface-hidden [&>*]:mr-[var(--item-gap)] [&>*]:min-w-[var(--item-min-width,0)] [&>*]:flex-[0_0_var(--item-width)]">
					{children}
				</div>
			</div>

			{(isShowDots || isShowNav) && !isSingleSlide && isDraggable && (
				<div className="mt-2.5 flex justify-center">
					{isShowDots && (
						<div className="flex flex-wrap items-center justify-start gap-[10px]">
							{scrollSnaps.map((_, index) => (
								<DotButton
									key={`item-${index}`}
									index={index}
									onClick={() => onDotButtonClick(index)}
									isSelected={index === selectedIndex}
								/>
							))}
						</div>
					)}

					{isShowNav && (
						<div className="ml-auto grid grid-cols-2 items-center">
							<PrevButton
								onClick={onPrevButtonClick}
								disabled={prevBtnDisabled}
							/>
							<NextButton
								onClick={onNextButtonClick}
								disabled={nextBtnDisabled}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

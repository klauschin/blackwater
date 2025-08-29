import './style.scss';
import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import AutoHeight from 'embla-carousel-auto-height';
import ClassNames from 'embla-carousel-class-names';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import React, { useCallback, useEffect, useState } from 'react';
import { DotButton } from './dot-button';
import { NextButton, PrevButton } from './nav-button';

export default function Carousel({
	children,
	className,
	itemWidth = '100%',
	itemGap = 0,

	align = 'center',
	breakpoints = {},
	containScroll = 'trimSnaps',
	dragFree = false,
	loop = true,
	slidesToScroll = 1,
	watchDrag = true,

	isShowNav = false,
	isShowDots = false,
	isAutoHeight = true,
	isFade = false,
	fadeDuration = 400,
	isAutoplay = false,
	autoplayInterval = 4000,
}) {
	const autoplayOptions = {
		delay: autoplayInterval,
		stopOnInteraction: false,
		playOnInit: isAutoplay,
		jump: isFade,
	};

	const [emblaRef, embla] = useEmblaCarousel(
		{
			align: align,
			breakpoints: breakpoints,
			containScroll: containScroll,
			dragFree: dragFree,
			loop: loop,
			slidesToScroll: slidesToScroll,
			watchDrag: watchDrag,
		},
		[
			Autoplay(autoplayOptions),
			isAutoHeight || isFade ? AutoHeight() : false,
			ClassNames(),
			WheelGesturesPlugin(),
		]
	);

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);

	const scrollPrev = useCallback(
		() => embla && embla.scrollPrev(isFade),
		[embla, isFade]
	);
	const scrollNext = useCallback(
		() => embla && embla.scrollNext(isFade),
		[embla, isFade]
	);
	const scrollTo = useCallback(
		(index) => embla && embla.scrollTo(index, isFade),
		[embla, isFade]
	);
	const onInit = useCallback((embla, emblaApi) => {
		const isResizeEvent = emblaApi === 'resize';
		const toggleClass = isResizeEvent ? 'remove' : 'add';
		embla.rootNode().classList[toggleClass]('is-ready');
		if (isResizeEvent) embla.reInit();
		setScrollSnaps(embla.scrollSnapList());
	}, []);
	const onSelect = useCallback((embla) => {
		setSelectedIndex(embla.selectedScrollSnap());
		setPrevBtnEnabled(embla.canScrollPrev());
		setNextBtnEnabled(embla.canScrollNext());
	}, []);

	useEffect(() => {
		if (!embla) return;

		onInit(embla);
		onSelect(embla);

		embla
			.on('init', onInit)
			.on('reInit', onInit)
			.on('resize', onInit)
			.on('reInit', onSelect)
			.on('select', onSelect);
	}, [embla, onInit, onSelect]);

	return (
		<>
			<div
				ref={emblaRef}
				className={clsx('c-carousel', className, {
					'is-fade': isFade,
				})}
				style={{
					'--item-width': itemWidth,
					'--item-gap': itemGap,
					'--t-duration': fadeDuration,
				}}
			>
				<div className="c-carousel__container">{children}</div>

				{isShowNav && (
					<div className="c-carousel__buttons f-h">
						<PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
						<NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
					</div>
				)}

				{isShowDots && (
					<div className="c-carousel__dots f-h f-j-c">
						{scrollSnaps.map((_, index) => (
							<DotButton
								key={index}
								selected={index === selectedIndex}
								onClick={() => scrollTo(index)}
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
}

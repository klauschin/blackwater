import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn, formatNumberSuffix } from '@/lib/utils';
import CustomPortableText from '@/components/CustomPortableText';

export default function Announcement({ data }) {
	const pathname = usePathname();
	const { display, messages } = data || {};
	const announcementRef = useRef(null);

	const [isDisplay, setDisplay] = useState(false);
	const [activeBlock, setActiveBlock] = useState(0);
	const [isAutoplay, setAutoplay] = useState(data?.autoplay);

	const updateActiveBlock = (index) => {
		setActiveBlock(index);
		setAutoplay(false);
	};

	const getAnnouncementHeight = useCallback(() => {
		const blockHeight =
			announcementRef.current?.querySelector('.announcement-block.is-active')
				?.offsetHeight || 0;
		const dotsHeight =
			announcementRef.current?.querySelector('.announcement-dots')
				?.offsetHeight || 0;

		const height = blockHeight + dotsHeight;

		return {
			height: height,
			visibleHeight: isDisplay ? height : 0,
		};
	}, [announcementRef, isDisplay]);

	// show announcement after page load, to avoid style flash
	useEffect(() => {
		announcementRef.current.style.display = 'block';
	}, []);

	// determine whether to display announcement bar
	useEffect(() => {
		setDisplay(
			display === 'all' || (display === 'homepage' && pathname == '/')
		);
	}, [display, pathname]);

	// changes on display change
	useEffect(() => {
		const announcementElement = announcementRef.current;
		const updateRootVariable = () => {
			const { visibleHeight } = getAnnouncementHeight();

			document.documentElement.style.setProperty(
				'--h-announcement',
				`${visibleHeight}px`
			);
		};

		updateRootVariable();
		if (announcementElement) {
			const { height, visibleHeight } = getAnnouncementHeight();
			announcementElement.style.marginTop = `${visibleHeight - height}px`;

			setTimeout(() => {
				announcementElement.style.transition = `margin 0.4s, height 0.4s 0.2s`;
			}, 400);
		}
	}, [isDisplay, announcementRef, getAnnouncementHeight]);

	// changes on active block change
	useEffect(() => {
		// update announcement height, so it transitions nicely
		const { height, visibleHeight } = getAnnouncementHeight();
		announcementRef.current.style.height = `${height}px`;

		// set dynamic announcement height at root
		setTimeout(() => {
			document.documentElement.style.setProperty(
				'--h-announcement-dynamic',
				`${visibleHeight}px`
			);
		}, 600);

		// autoplay
		const interval = data?.autoplayInterval || 8;
		const autoplayInterval =
			isAutoplay && isDisplay
				? setInterval(() => {
						const activeBlockNext =
							activeBlock < data?.messages.length - 1 ? activeBlock + 1 : 0;
						setActiveBlock(activeBlockNext);
					}, interval * 1000)
				: null;

		return () => clearInterval(autoplayInterval);
	}, [activeBlock, isAutoplay, isDisplay, data, getAnnouncementHeight]);

	return (
		<div
			ref={announcementRef}
			className="relative z-10 hidden bg-(--background) text-center text-(--color)"
			style={{
				'--color': `${data?.textColor?.hex || '#FFFFFF'}`,
				'--background': `${data?.backgroundColor?.hex || '#000000'}`,
				'--emphasize': `${data?.emphasizeColor?.hex || '#D5FF00'}`,
			}}
		>
			{messages && (
				<div className="announcement-blocks relative">
					{messages.map((el, index) => {
						if (el.content)
							return (
								<div
									key={`item-${index}`}
									className={cn(
										'announcement-block t-l-3 pointer-events-none absolute top-0 left-0 block w-full py-2.5 opacity-0 delay-0 [transition:opacity_0.4s] [&_b]:text-(--emphasize) [&_strong]:text-(--emphasize)',
										{
											'is-active pointer-events-auto relative opacity-100 delay-400':
												activeBlock == index,
										}
									)}
								>
									<CustomPortableText blocks={el.content} />
								</div>
							);
					})}
				</div>
			)}
			{messages && messages.length > 1 && (
				<div className="announcement-dots absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 px-2.5 pb-1.5">
					{messages.map((el, index) => {
						return (
							<button
								type="button"
								key={`item-${index}`}
								data-announcement-trigger={index}
								aria-label={`Jump to the ${formatNumberSuffix(
									index + 1
								)} message`}
								className={cn(
									'relative size-2.5 cursor-pointer rounded-full border transition-all duration-200 after:absolute after:h-4.5 after:w-4.5 after:transform-[translate3d(-50%,-50%,0)]',
									{
										'bg-(--emphasize) text-(--emphasize)': activeBlock == index,
									}
								)}
								onClick={() => updateActiveBlock(index)}
							></button>
						);
					})}
				</div>
			)}
		</div>
	);
}

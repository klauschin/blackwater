'use client';

import React from 'react';
import ReactFastMarquee from 'react-fast-marquee';
import { cn, hasArrayValue } from '@/lib/utils';
import Image from '@/components/Image';

/**
 * ReactFastMarquee options:
 * @param {string} [className] - CSS class to style the container div.
 * @param {boolean} [autoFill=false] - Automatically fills blank space with copies of the children.
 * @param {boolean} [play=true] - Controls whether the marquee is playing or paused.
 * @param {boolean} [pauseOnHover=false] - Pauses the marquee when hovered.
 * @param {boolean} [pauseOnClick=false] - Pauses the marquee when clicked.
 * @param {"left:"|"right"|"up"|"down"} [direction="left"] - Direction of the marquee. Vertical directions are experimental.
 * @param {number} [speed=50] - Speed in pixels per second.
 * @param {number} [delay=0] - Delay before animation starts, in seconds.
 * @param {number} [loop=0] - Number of times the marquee should loop. 0 is infinite.
 * @param {boolean} [gradient=false] - Displays a gradient overlay.
 * @param {string} [gradientColor="white"] - Color of the gradient.
 * @param {number|string} [gradientWidth=200] - Width of the gradient on both sides.
 * @param {function} [onFinish] - Callback when marquee finishes scrolling (only if loop is non-zero).
 * @param {function} [onCycleComplete] - Callback when a loop completes (not called when max loops reached).
 * @param {ReactNode} children - Content to display inside the marquee.
 * @returns {ReactElement}
 */

export default function Marquee({ data = {}, children }) {
	if (!(hasArrayValue(data?.items) || children)) return null;

	const {
		items,
		speed,
		reverse,
		pausable,
		showGradient,
		gradientColor,
		isMerged,
	} = data;

	return (
		<section
			className={cn(
				'relative',
				(isMerged === 'top' || isMerged === 'bottom') && 'z-10 h-0'
			)}
		>
			<div
				className={cn(
					'py-section-half relative flex flex-col items-center justify-center select-none max-md:gap-6 md:flex-row',
					isMerged === 'top' && '-translate-y-full'
				)}
			>
				<ReactFastMarquee
					autoFill
					gradient={showGradient}
					gradientWidth={100}
					gradientColor={gradientColor ?? undefined}
					pauseOnHover={pausable}
					speed={speed}
					direction={reverse ? 'right' : 'left'}
				>
					{children
						? children
						: items?.map((item, index) => {
								const { _key, _type } = item;
								switch (_type) {
									case 'simple':
										return (
											<div key={_key} className="marquee-text px-2 lg:px-4">
												{item.text}
											</div>
										);
									case 'image':
										return (
											<Image
												key={_key}
												image={item.image}
												alt={item.image?.alt}
												className="marquee-image max-h-6 max-w-[200px] lg:max-h-8"
											/>
										);
								}
							})}
				</ReactFastMarquee>
			</div>
		</section>
	);
}

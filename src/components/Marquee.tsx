'use client';

import React, { ReactNode, ReactElement } from 'react';
import ReactFastMarquee, { MarqueeProps } from 'react-fast-marquee';
import { cn, hasArrayValue } from '@/lib/utils';
import Image from '@/components/Image'; // Assuming this component is correctly typed

// Sanity image object (simplified for this context)
interface SanityImage {
	_type: 'image';
	alt?: string;
	asset: {
		_ref: string;
		_type: string;
		// ... other asset fields
	};
	// ... other image fields (like metadata)
}

// Defines the structure for a 'simple' marquee item
interface MarqueeSimpleItem {
	_key: string;
	_type: 'simple';
	text: string;
}

// Defines the structure for an 'image' marquee item
interface MarqueeImageItem {
	_key: string;
	_type: 'image';
	image: SanityImage;
}

// Union type for all possible items in the marquee
type MarqueeItem = MarqueeSimpleItem | MarqueeImageItem;

// Defines the structure for the 'data' prop from CMS
interface MarqueeData {
	items?: MarqueeItem[];
	speed?: number; // Corresponds to speed in pixels per second
	reverse?: boolean; // Controls direction: left (false) or right (true)
	pausable?: boolean; // Controls pauseOnHover
	showGradient?: boolean; // Controls gradient visibility
	gradientColor?: string; // Color of the gradient
	isMerged?: 'top' | 'bottom' | null; // Controls merging with adjacent sections
}

interface MarqueePropsWithData {
	data?: MarqueeData;
	children?: ReactNode;
}

export default function Marquee({
	data = {},
	children,
}: MarqueePropsWithData): ReactElement | null {
	const {
		items,
		speed,
		reverse,
		pausable,
		showGradient,
		gradientColor,
		isMerged,
	} = data;

	if (!(hasArrayValue(items) || children)) {
		return null;
	}

	const marqueeProps: MarqueeProps = {
		autoFill: true, // Always autofill based on original JS
		gradient: showGradient ?? false,
		gradientWidth: 100,
		gradientColor: gradientColor, // This can be undefined/null, which the component handles
		pauseOnHover: pausable ?? false,
		speed: speed ?? 50, // Default speed is 50
		direction: (reverse ? 'right' : 'left') as 'left' | 'right',
		loop: 0, // Default to infinite loop
	};

	const renderContent = (): ReactNode => {
		if (children) {
			return children;
		}

		return items?.map((item: MarqueeItem, index: number) => {
			const { _key, _type } = item;
			switch (_type) {
				case 'simple':
					// item is now guaranteed to be MarqueeSimpleItem
					return (
						<div key={_key} className="marquee-text px-2 lg:px-4">
							{item.text}
						</div>
					);
				case 'image':
					// item is now guaranteed to be MarqueeImageItem
					return (
						<Image
							key={_key}
							image={item.image}
							alt={item.image?.alt}
							className="marquee-image max-h-6 max-w-[200px] lg:max-h-8"
						/>
					);
				default:
					return null;
			}
		});
	};

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
				<ReactFastMarquee {...marqueeProps}>{renderContent()}</ReactFastMarquee>
			</div>
		</section>
	);
}

'use client';

import React from 'react';
import { buildRgbaCssString, cn, getSpacingClass } from '@/lib/utils';
import CustomPortableText from '@/components/CustomPortableText';

export default function Freeform({ data, className }) {
	const { content, sectionAppearance } = data;

	const {
		backgroundColor,
		textColor,
		textAlign = 'text-left',
		maxWidth = 'none',
		spacingTop,
		spacingBottom,
		spacingTopDesktop,
		spacingBottomDesktop,
	} = sectionAppearance || {};

	const hasBackground = !!backgroundColor;

	const spacingClasses = [
		getSpacingClass('spacingTop', spacingTop, hasBackground),
		getSpacingClass('spacingBottom', spacingBottom, hasBackground),
		getSpacingClass('spacingTopDesktop', spacingTopDesktop, hasBackground),
		getSpacingClass(
			'spacingBottomDesktop',
			spacingBottomDesktop,
			hasBackground
		),
	].filter(Boolean);

	const maxWidthClasses =
		{
			none: 'w-full',
			xl: 'max-w-7xl',
			l: 'max-w-5xl',
			m: 'max-w-3xl',
			s: 'max-w-xl',
			xs: 'max-w-xs',
		}[maxWidth] || 'w-full';

	return (
		<section
			className={cn(
				'wysiwyg px-contain mx-auto',
				textAlign,
				maxWidthClasses,
				...spacingClasses
			)}
			style={{
				color: buildRgbaCssString(textColor) || 'inherit',
				backgroundColor: buildRgbaCssString(backgroundColor) || null,
			}}
		>
			<CustomPortableText blocks={content} />
		</section>
	);
}

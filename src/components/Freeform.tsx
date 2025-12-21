'use client';

import { buildRgbaCssString, cn, getSpacingClass } from '@/lib/utils';
import CustomPortableText from '@/components/CustomPortableText';

type MaxWidthType = 'none' | 'xl' | 'l' | 'm' | 's' | 'xs';

type FreeformProps = {
	data: any;
	className?: string;
};
export default function Freeform({ data, className }: FreeformProps) {
	const { content, sectionAppearance } = data;

	const sectionAppearanceTyped =
		(sectionAppearance as {
			backgroundColor?: any;
			textColor?: any;
			textAlign?: string;
			maxWidth?: MaxWidthType;
			spacingTop?: any;
			spacingBottom?: any;
			spacingTopDesktop?: any;
			spacingBottomDesktop?: any;
		}) || {};

	const {
		backgroundColor,
		textColor,
		textAlign = 'text-left',
		maxWidth = 'none',
		spacingTop,
		spacingBottom,
		spacingTopDesktop,
		spacingBottomDesktop,
	} = sectionAppearanceTyped;

	const hasBackground = !!backgroundColor;

	const spacingClasses = [
		getSpacingClass('marginTop', spacingTop, hasBackground),
		getSpacingClass('marginBottom', spacingBottom, hasBackground),
		getSpacingClass('marginTopDesktop', spacingTopDesktop, hasBackground),
		getSpacingClass('marginBottomDesktop', spacingBottomDesktop, hasBackground),
	].filter(Boolean);

	const maxWidthClasses =
		(
			{
				none: 'w-full',
				xl: 'max-w-7xl',
				l: 'max-w-5xl',
				m: 'max-w-3xl',
				s: 'max-w-xl',
				xs: 'max-w-xs',
			} as const
		)[maxWidth] || 'w-full';

	return (
		<section
			className={cn(
				'wysiwyg px-contain mx-auto',
				textAlign,
				maxWidthClasses,
				...spacingClasses,
				className
			)}
			style={{
				color: buildRgbaCssString(textColor) || 'inherit',
				backgroundColor: buildRgbaCssString(backgroundColor) || undefined,
			}}
		>
			<CustomPortableText blocks={content} />
		</section>
	);
}

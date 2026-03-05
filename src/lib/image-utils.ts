import { imageBuilder } from '@/sanity/lib/image';

interface BuildImageOptions {
	width?: number;
	height?: number;
	format?: 'jpg' | 'pjpg' | 'png' | 'webp';
	quality?: number;
}

interface BuildImageSrcSetOptions extends BuildImageOptions {
	srcSizes: number[];
	aspectRatio?: number;
}

interface SanityRgb {
	r: number;
	g: number;
	b: number;
	a: number;
}

interface SanityColor {
	hex: string;
	rgb: SanityRgb;
}

export function buildImageSrc(
	image: any,
	{ width, height, format, quality = 80 }: BuildImageOptions = {}
): string {
	if (!image || !imageBuilder) {
		return '';
	}

	try {
		let imgSrc = imageBuilder.image(image);

		if (width) {
			imgSrc = imgSrc.width(Math.round(width));
		}

		if (height) {
			imgSrc = imgSrc.height(Math.round(height));
		}

		if (format) {
			imgSrc = imgSrc.format(format);
		}

		if (quality) {
			imgSrc = imgSrc.quality(quality);
		}

		return imgSrc?.fit('max').auto('format').url() || '';
	} catch (error) {
		console.error('Error building image source:', error);
		return '';
	}
}

export function buildImageSrcSet(
	image: any,
	{ srcSizes, aspectRatio = 1, format, quality = 80 }: BuildImageSrcSetOptions
): string | false {
	if (!image || !srcSizes || srcSizes.length === 0) {
		return false;
	}

	try {
		const sizes = srcSizes
			.map((width) => {
				const height = aspectRatio
					? Math.round((width * aspectRatio) / 100)
					: undefined;

				const imgSrc = buildImageSrc(image, { width, height, format, quality });

				return imgSrc ? `${imgSrc} ${width}w` : '';
			})
			.filter(Boolean);

		return sizes.length ? sizes.join(',') : false;
	} catch (error) {
		console.error('Error building image srcset:', error);
		return false;
	}
}

export function buildRgbaCssString(
	color: SanityColor | null | undefined
): string | false {
	if (!color) {
		return false;
	}

	const r = color?.rgb?.r ?? 255;
	const g = color?.rgb?.g ?? 255;
	const b = color?.rgb?.b ?? 255;
	const a = color?.rgb?.a ?? 1;

	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

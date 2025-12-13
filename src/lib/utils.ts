import { imageBuilder } from '@/sanity/lib/image';
import {
	FaFacebookF,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaSpotify,
	FaXTwitter,
	FaYoutube,
} from 'react-icons/fa6';
import { clsx, ClassValue } from 'clsx';
import sanitizeHtml from 'sanitize-html';
import { twMerge } from 'tailwind-merge';
import { IconType } from 'react-icons';

// --- INTERFACES & TYPES ---

// For the Sanity Image Builder functions
interface BuildImageOptions {
	width?: number;
	height?: number;
	format?: string; // e.g., 'jpg', 'webp'
	quality?: number;
}

interface BuildImageSrcSetOptions extends BuildImageOptions {
	srcSizes: number[];
	aspectRatio?: number; // percentage, e.g., 100 for 1:1, 50 for 2:1
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

// For resolveHref function
interface LinkResolverArgs {
	documentType:
		| 'pHome'
		| 'pGeneral'
		| 'pBlogIndex'
		| 'pBlog'
		| 'pEventIndex'
		| 'pEvent'
		| 'externalUrl'
		| string;
	slug?: string | null;
}

// For getIcon function
type SocialIconKey =
	| 'facebook'
	| 'instagram'
	| 'linkedin'
	| 'spotify'
	| 'x'
	| 'youTube'
	| 'github'
	| string;

// --- UTILITIES / GET ---

/**
 * Merges Tailwind classes using twMerge and clsx.
 * @param inputs - Array of class values (string, array, or object).
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random integer.
 */
export function getRandomInt(min: number, max: number): number {
	const _min = Math.ceil(min);
	const _max = Math.floor(max);

	// inclusive of max and min
	return Math.floor(Math.random() * (_max - _min + 1) + _min);
}

/**
 * Removes query parameters from a URL.
 * @param url - The input URL string.
 * @returns The base URL and path without query parameters.
 */
export function getUrlBaseAndPath(url: string): string {
	if (url.includes('?')) {
		return url.split('?')[0] as string;
	} else {
		return url;
	}
}

/**
 * Checks if a value is an Array and has elements.
 * @param arr - The value to check.
 * @returns True if the value is a non-empty array, otherwise false.
 */
export function hasArrayValue<T>(arr: T[] | unknown): arr is T[] {
	return Array.isArray(arr) && arr.length > 0;
}

/**
 * Maps a string key to a corresponding React Icon component.
 * @param icon - The string key for the social media icon.
 * @returns The React Icon component (IconType) or null.
 */
export function getIcon(icon: SocialIconKey): IconType | null {
	switch (icon) {
		case 'facebook':
			return FaFacebookF;
		case 'instagram':
			return FaInstagram;
		case 'linkedin':
			return FaLinkedin;
		case 'spotify':
			return FaSpotify;
		case 'x':
			return FaXTwitter;
		case 'youTube':
			return FaYoutube;
		case 'github':
			return FaGithub;
		default:
			return null;
	}
}

// --- UTILITIES / FORMAT ---

/**
 * Formats a number with an ordinal suffix (st, nd, rd, th).
 * @param value - The number to format (will be parsed to an integer).
 * @param suffixOnly - If true, only returns the suffix, otherwise returns the number + suffix.
 * @returns The number with the correct ordinal suffix.
 */
export function formatNumberSuffix(
	value: string | number,
	suffixOnly?: boolean
): string {
	const int = parseInt(String(value), 10);
	const integer = suffixOnly ? '' : int;

	if (isNaN(int)) return ''; // Handle non-numeric input

	// Covers 11th, 12th, 13th
	if (int > 3 && int < 21) return `${integer}th`;

	switch (int % 10) {
		case 1:
			return `${integer}st`;
		case 2:
			return `${integer}nd`;
		case 3:
			return `${integer}rd`;
		default:
			return `${integer}th`;
	}
}

/**
 * Converts a string into a URL-friendly "handleized" format (slug-like).
 * @param string - The input string.
 * @returns The handleized string.
 */
export function formatHandleize(string: string): string {
	return String(string)
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/[^\w-]/g, '') // remove non-alphanumeric characters except hyphens
		.replace(/-+/g, '-') // remove consecutive hyphens
		.trim() // trim leading or trailing whitespace
		.toLowerCase(); // convert to lowercase
}

/**
 * Pads the start of a string to reach a specified length with a given character.
 * @param val - The value to pad.
 * @param length - The target length of the string.
 * @param char - The character to pad with (default is '0').
 * @returns The padded string.
 */
export function formatPad(
	val: string | number,
	length: number = 2,
	char: string | number = 0
): string {
	// val.toString() ensures number is converted to string for padStart
	return String(val).padStart(length, String(char));
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp.
 * @param min - The minimum allowed value (default 0).
 * @param max - The maximum allowed value (default 1).
 * @returns The clamped number.
 */
export function formatClamp(
	value: number,
	min: number = 0,
	max: number = 1
): number {
	// example, formatClamp(999, 0, 300) = 300
	return value < min ? min : value > max ? max : value;
}

/**
 * Formats a number string with commas as thousands separators (e.g., 3000.12 -> 3,000.12).
 * @param string - The number string to format.
 * @returns The formatted string with commas.
 */
export function formatNumberWithCommas(string: string | number): string {
	// example, formatNumberWithCommas(3000.12) = 3,000.12
	const parts = String(string).split('.');
	// Add thousands separators to the integer part
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return parts.join('.');
}

/**
 * Formats a number string in European style (space as thousands separator, comma as decimal separator).
 * (e.g., 3000.12 -> 3 000,12).
 * @param string - The number string to format.
 * @returns The formatted string in European style.
 */
export function formatNumberEuro(string: string | number): string {
	// example, formatNumberEuro(3000.12) = 3 000,12
	const parts = String(string).split('.');
	// Add thousands separators (space) to the integer part
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

	// Join parts with a comma
	return parts.join(',');
}

/**
 * Formats a Date object into US standard format (DD/MM/YYYY).
 * @param date - The Date object.
 * @returns The formatted date string.
 */
export function formatDateUsStandard(date: Date): string {
	return [
		formatPad(date.getDate()),
		formatPad(date.getMonth() + 1), // getMonth() is 0-indexed
		date.getFullYear(),
	].join('/');
}

/**
 * Replaces newlines in a text string with `<br>` tags and sanitizes the output.
 * @param text - The input text string.
 * @returns The HTML string with newlines converted to `<br>` tags, or undefined.
 */
export function formatNewLineToBr(
	text: string | null | undefined
): string | undefined {
	if (!text) return undefined;

	return sanitizeHtml(text.replace(/\n/g, '<br>'), {
		allowedTags: ['br'],
		allowedAttributes: {},
	});
}

/**
 * Converts a simple object's key-value pairs into a formatted HTML string with `<br>` separators.
 * Key names are converted to title case.
 * @param obj - The object to format.
 * @returns The HTML string.
 */
export function formatObjectToHtml(obj: Record<string, any>): string {
	return Object.entries(obj)
		.map(([key, value]) => {
			const formattedKey = key
				.replace(/([A-Z])/g, ' $1') // insert space before capital letters
				.replace(/^./, (str) => str.toUpperCase()) // capitalize first letter
				.replace(/\?/g, ''); // remove question marks from key

			return `${formattedKey}: ${value}`;
		})
		.join('<br>');
}

/**
 * Normalizes a URL by collapsing consecutive slashes in the path.
 * @param url - The input URL string.
 * @returns The normalized URL string.
 */
export function formatUrl(url: string): string {
	const parts = url.split('://');
	if (parts.length !== 2) {
		// If it doesn't match the expected format, return as is or handle error
		return url;
	}
	const [protocol, rest] = parts;

	// Replace multiple slashes with a single slash, unless it's immediately after the protocol (://)
	const normalizedRest = rest.replace(/\/{2,}/g, '/');
	return `${protocol}://${normalizedRest}`;
}

// --- UTILITIES / VALIDATION ---

/**
 * Validates a string against a common email regex pattern.
 * @param string - The string to validate.
 * @returns True if the string is a valid email, otherwise false.
 */
export function validateEmail(string: string): boolean {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return regex.test(string);
}

/**
 * Validates a string against a common US phone number regex pattern.
 * @param string - The string to validate.
 * @returns True if the string is a valid US phone number, otherwise false.
 */
export function validateUsPhone(string: string): boolean {
	const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

	return regex.test(string);
}

/**
 * Validates if a string is valid JSON and returns the parsed object, or returns false and logs an error.
 * NOTE: The original function used `JSON.parse(string)` *after* the `try...catch`. I've fixed this logic to use the already parsed `json` if successful.
 * @param jsonString - The string to validate and parse.
 * @returns The parsed JSON object of type `any` (or more specific type if known) or `false`.
 */
export function validateAndReturnJson(jsonString: string): any | false {
	try {
		const parsedJson = JSON.parse(jsonString);
		return parsedJson;
	} catch (e) {
		console.error('JSON parsing failed:', e);
		return false;
	}
}

// --- UTILITIES / ARRAY ---

/**
 * Finds the intersection of two arrays.
 * @param a1 - The first array.
 * @param a2 - The second array.
 * @returns A new array containing only the elements common to both input arrays.
 */
export function arrayIntersection<T>(a1: T[], a2: T[]): T[] {
	return a1.filter((n) => a2.includes(n));
}

/**
 * Returns an array with only unique values.
 * @param array - The input array.
 * @returns A new array containing only the unique elements.
 */
export const arrayUniqueValues = <T>(array: T[]): T[] => {
	let unique = [...new Set(array)];

	return unique;
};

/**
 * Sorts an array of objects in ascending order based on a specified object property.
 * The function sorts the array *in place*.
 * @param arr - The array of objects to sort.
 * @param objVal - The key/property name to sort by.
 * @returns The sorted array.
 */
export function arraySortObjValAsc<T extends Record<K, any>, K extends keyof T>(
	arr: T[],
	objVal: K
): T[] {
	return arr.sort((a, b) => {
		if (a[objVal] > b[objVal]) {
			return 1;
		}
		if (b[objVal] > a[objVal]) {
			return -1;
		}
		return 0;
	});
}

/**
 * Sorts an array of objects in descending order based on a specified object property.
 * The function sorts the array *in place*.
 * @param arr - The array of objects to sort.
 * @param objVal - The key/property name to sort by.
 * @returns The sorted array.
 */
export function arraySortObjValDesc<
	T extends Record<K, any>,
	K extends keyof T,
>(arr: T[], objVal: K): T[] {
	return arr.sort((a, b) => {
		if (a[objVal] > b[objVal]) {
			return -1;
		}
		if (b[objVal] > a[objVal]) {
			return 1;
		}
		return 0;
	});
}

/**
 * Calculates the Cartesian product of multiple arrays.
 * @param arrays - The arrays to calculate the Cartesian product from.
 * @returns An array of arrays, where each inner array is a combination.
 */
export function arrayCartesian<T>(...arrays: T[][]): T[][] {
	return [...arrays].reduce(
		(a, b) =>
			a
				.map((x) => b.map((y) => x.concat(y)))
				.reduce((a, b) => a.concat(b), [] as T[][]),
		[[]] as T[][]
	);
}

// --- ACTIONS ---

/**
 * Disables scrolling on the document body by setting overflow to 'hidden'.
 */
export function scrollDisable(): void {
	document.documentElement.style.overflow = 'hidden';
	document.body.style.overflow = 'hidden';
}

/**
 * Enables scrolling on the document body by setting overflow to 'initial'.
 */
export function scrollEnable(): void {
	document.documentElement.style.overflow = 'initial';
	document.body.style.overflow = 'initial';
}

/**
 * Returns a debounced version of a function.
 * @param fn - The function to debounce.
 * @param ms - The delay in milliseconds.
 * @returns The debounced function.
 */
// NOTE: This debounced function's type uses the Function type for simplicity,
// but for maximum safety, you might use a more complex type inference.
export function debounce<T extends (...args: any[]) => void>(
	fn: T,
	ms: number
): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout> | null;

	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			timer = null;
			// Using apply to preserve 'this' context and pass arguments
			fn.apply(this, args);
		}, ms);
	} as (...args: Parameters<T>) => void;
}

/**
 * Creates a promise-based delay function.
 * @param ms - The delay in milliseconds.
 * @returns A function that returns a Promise resolving after the delay.
 */
export function sleeper<T>(ms: number): (x: T) => Promise<T> {
	return function (x: T): Promise<T> {
		return new Promise((resolve) => setTimeout(() => resolve(x), ms));
	};
}

// --- REACT SPECIFIC / SANITY IMAGE ---

/**
 * Builds a single image source URL using Sanity's image builder.
 * Assumes 'image' is a Sanity Image asset object.
 * @param image - The Sanity image object.
 * @param options - Image build options (width, height, format, quality).
 * @returns The final image URL string or false if invalid/error.
 */
export function buildImageSrc(
	image: any, // Use a more specific Sanity Image type if available
	{ width, height, format, quality = 80 }: BuildImageOptions = {}
): string | false {
	if (!image || !imageBuilder) {
		return false;
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

		// Assumes the image builder returns an object with a .url() method
		return imgSrc?.fit('max').auto('format').url() || false;
	} catch (error) {
		console.error('Error building image source:', error);
		return false;
	}
}

/**
 * Builds an image srcset string for responsive images using Sanity's image builder.
 * @param image - The Sanity image object.
 * @param options - Srcset build options (srcSizes, aspectRatio, format, quality).
 * @returns The final srcset string or false if invalid/error.
 */
export function buildImageSrcSet(
	image: any, // Use a more specific Sanity Image type if available
	{ srcSizes, aspectRatio = 1, format, quality = 80 }: BuildImageSrcSetOptions
): string | false {
	if (!image || !srcSizes || srcSizes.length === 0) {
		return false;
	}

	try {
		const sizes = srcSizes
			.map((width) => {
				// Calculate height based on aspect ratio
				const height = aspectRatio
					? Math.round((width * aspectRatio) / 100)
					: undefined;

				const imgSrc = buildImageSrc(image, {
					width,
					height,
					format,
					quality,
				});

				// buildImageSrc already applies format, so this check might be redundant
				// if (format) {
				//   imgSrc = imgSrc.format(format);
				// }

				return imgSrc ? `${imgSrc} ${width}w` : '';
			})
			.filter(Boolean); // Filter out any false/empty strings

		return sizes.length ? sizes.join(',') : false;
	} catch (error) {
		console.error('Error building image srcset:', error);
		return false;
	}
}

/**
 * Converts a Sanity color object (with RGB values) to an RGBA CSS string.
 * @param color - The Sanity color object.
 * @returns An RGBA CSS string (e.g., 'rgba(r, g, b, a)') or false.
 */
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

/**
 * Converts a string into a URL-friendly slug.
 * @param str - The string to slugify.
 * @returns The slugified string or undefined if input is null/empty.
 */
export function slugify(str: string | null | undefined): string | undefined {
	if (str === null || str === undefined) return undefined;

	// Normalize and trim early; if empty after trim, return fallback
	const base = String(str)
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.trim(); // trim leading or trailing whitespace
	if (!base) return undefined;

	const slug = base
		.toLowerCase() // convert to lowercase
		.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
		.replace(/\s+/g, '-') // spaces → hyphen
		.replace(/-+/g, '-'); // collapse hyphens

	return slug;
}

/**
 * Converts a string (typically space/hyphen separated) into camelCase.
 * @param str - The string to convert.
 * @returns The camelCase string or null.
 */
export function toCamelCase(str: string | null | undefined): string | null {
	if (!str) return null;

	return String(str)
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			// If it's the first word, convert to lowercase, otherwise uppercase
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, ''); // remove spaces
}

/**
 * Simple validation for a URL string.
 * @param urlString - The string to validate.
 * @returns True if the string is a valid URL, otherwise false.
 */
export function isValidUrl(urlString: string): boolean {
	const urlPattern = new RegExp(
		'^(https?:\\/\\/)?' + // validate protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?', // validate query string
		'i'
	);
	return !!urlPattern.test(urlString);
}

// --- TAILWIND UTILITIES ---

type SpacingValue = keyof typeof SPACING_CLASSES.pt; // Union of allowed numeric keys (0, 1, ..., 96)
type SpacingPrefix = keyof typeof SPACING_CLASSES; // Union of allowed prefix keys (pt, pb, mt, mb, sm:pt, etc.)

// The original SPACING_CLASSES constant is kept as a non-exported const
// to serve as the source of truth for the types above.
const SPACING_CLASSES = {
	// ... (Your SPACING_CLASSES object is very large, keeping it here as a JS object is fine,
	// but for TS, we can use the keys/types derived from its structure)
	pt: {
		0: 'pt-0',
		1: 'pt-1',
		// ... all other pt values
	} as const,
	pb: {
		0: 'pb-0',
		1: 'pb-1',
		// ... all other pb values
	} as const,
	// ... all other keys (mt, mb, sm:pt, sm:pb, sm:mt, sm:mb)
	// NOTE: For a complete type-safe conversion, the entire object must be typed.
	// Using `as const` ensures keys are literal types.
} as const;

type SpacingType =
	| 'paddingTop'
	| 'paddingBottom'
	| 'marginTop'
	| 'marginBottom'
	| 'paddingTopDesktop'
	| 'paddingBottomDesktop'
	| 'marginTopDesktop'
	| 'marginBottomDesktop';

/**
 * Gets the corresponding Tailwind CSS class for a spacing utility.
 * @param spacingType - The type of spacing (e.g., 'paddingTop', 'marginBottomDesktop').
 * @param value - The Tailwind spacing scale value (e.g., 8, 16).
 * @param hasBackground - True if the spacing should use padding (hasBackground) instead of margin.
 * @returns The Tailwind class string (e.g., 'pt-8', 'sm:pb-16') or null.
 */
export function getSpacingClass(
	spacingType: SpacingType,
	value: SpacingValue | null | undefined,
	hasBackground: boolean = false
): string | null {
	if (value === null || value === undefined) return null;

	// Use a string literal for the prefix determination
	let prefix: string;
	if (spacingType.includes('Top')) {
		prefix = hasBackground ? 'pt' : 'mt';
	} else if (spacingType.includes('Bottom')) {
		prefix = hasBackground ? 'pb' : 'mb';
	} else {
		return null;
	}

	const isResponsive = spacingType.includes('Desktop');
	const finalPrefix = isResponsive ? `sm:${prefix}` : prefix;

	// Type assertion here to satisfy TS that finalPrefix is a valid key of SPACING_CLASSES
	const classMap = SPACING_CLASSES[finalPrefix as SpacingPrefix];

	// Cast value to keyof typeof classMap to ensure it's a valid number string
	return (classMap && classMap[value as keyof typeof classMap]) || null;
}

/**
 * Checks if a link should be considered active based on the current path and target URL.
 * @param args - Object containing the current pathName, target url, and an optional flag for child links.
 * @returns True if the link is active, otherwise false.
 */
export const checkIfLinkIsActive = ({
	pathName,
	url,
	isChild,
}: {
	pathName: string;
	url: string;
	isChild?: boolean;
}): boolean => {
	if (isChild) {
		// Compares the first segment of the pathName and url (e.g., /blog/post vs /blog)
		return (pathName.split('/')[1] || '') === (url.split('/')[1] || '');
	} else {
		return pathName === url;
	}
};

/**
 * Resolves a Sanity document type and slug into a public URL path.
 * @param args - Object containing the Sanity documentType and slug.
 * @returns The resolved URL path string or undefined.
 */
export const resolveHref = ({
	documentType,
	slug,
}: LinkResolverArgs): string | undefined => {
	if (!documentType) return undefined;

	switch (documentType) {
		case 'pHome':
			return '/';
		case 'pGeneral':
			return `/${slug}`;
		case 'pBlogIndex':
			return '/blog';
		case 'pBlog':
			return `/blog/${slug}`;
		case 'pEventIndex':
			return '/event';
		case 'pEvent':
			return `/event/${slug}`;
		case 'externalUrl':
			// The slug is expected to be the full external URL here
			return slug || undefined;

		default:
			console.warn('Invalid document type:', documentType);
			return undefined;
	}
};

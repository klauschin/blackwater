import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// ***UTILITIES / NUMBER FORMATTING***

export function formatNumberSuffix(
	value: number | string,
	suffixOnly: boolean
): string {
	let int = parseInt(value as string);
	let integer = suffixOnly ? '' : int.toString();

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

// ***UTILITIES / STRING VALIDATION***

export function validateEmail(string: string): boolean {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return regex.test(string);
}

export function validateUsPhone(string: string): boolean {
	const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
	return regex.test(string);
}

// ***UTILITIES / ARRAY***

export function arrayIntersection<T>(a1: T[], a2: T[]): T[] {
	return a1.filter((n) => a2.indexOf(n) !== -1);
}

// Sorting array of objects ascending by a specified property
export function arraySortObjValAsc<T>(arr: T[], objVal: keyof T): T[] {
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

// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
export function arrayCartesian<T>(...arrays: T[][]): T[][] {
	return arrays.reduce(
		(a, b) =>
			a.map((x) => b.map((y) => x.concat(y))).reduce((a, b) => a.concat(b), []),
		[[]] as T[][]
	);
}

// ***ACTIONS***

export function scrollDisable(): void {
	document.documentElement.style.overflow = 'hidden';
	document.body.style.overflow = 'hidden';
}

export function scrollEnable(): void {
	document.documentElement.style.overflow = 'initial';
	document.body.style.overflow = 'initial';
}

// ***REACT SPECIFIC***

interface RGB {
	r: number;
	g: number;
	b: number;
	a?: number;
}

interface Color {
	rgb?: RGB;
}

export function buildRgbaCssString(color?: Color): string | false {
	if (!color) {
		return false;
	}

	const r = color.rgb?.r ?? 255;
	const g = color.rgb?.g ?? 255;
	const b = color.rgb?.b ?? 255;
	const a = color.rgb?.a ?? 1;

	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function slugify(str: string): string {
	return str
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.trim() // trim leading or trailing whitespace
		.toLowerCase() // convert to lowercase
		.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/-+/g, '-'); // remove consecutive hyphens
}

export function hasArrayValue<T>(arr: T[] | undefined): boolean {
	if (!arr) {
		return false;
	}
	return Array.isArray(arr) && arr.length > 0;
}

export const sanitizeForId = (label: string) => {
	return label
		.toLowerCase()
		.replace(/[^\w\s]|(\s+)/g, (_match: string, group1: string) =>
			group1 ? '-' : ''
		);
};

export function isValidUrl(urlString: string) {
	const urlPattern = new RegExp(
		'^(https?:\\/\\/)?' + // validate protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	);
	return !!urlPattern.test(urlString);
}

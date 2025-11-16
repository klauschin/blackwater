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
import { clsx } from 'clsx';
import sanitizeHtml from 'sanitize-html';
import { twMerge } from 'tailwind-merge';

// ***UTILITIES / GET***
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getRandomInt(min, max) {
	const _min = Math.ceil(min);
	const _max = Math.floor(max);

	// inclusive of max and min
	return Math.floor(Math.random() * (_max - _min + 1) + _min);
}

export function getUrlBaseAndPath(url) {
	if (url.includes('?')) {
		return url.split('?')[0];
	} else {
		return url;
	}
}

export function hasArrayValue(arr) {
	return Array.isArray(arr) && arr.length > 0;
}

export function getIcon(icon) {
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

// ***UTILITIES / FORMAT***

export function formatNumberSuffix(value, suffixOnly) {
	let int = parseInt(value);
	let integer = suffixOnly ? '' : int;

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

export function formatHandleize(string) {
	return String(string)
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/[^\w-]/g, '') // remove non-alphanumeric characters except hyphens
		.replace(/-+/g, '-') // remove consecutive hyphens
		.trim() // trim leading or trailing whitespace
		.toLowerCase(); // convert to lowercase
}

export function formatPad(val, length = 2, char = 0) {
	// example, leading zero: 8 = "08",
	// example, password: 000088885581 = "********5581"
	return val.toString().padStart(length, char);
}

export function formatClamp(value, min = 0, max = 1) {
	// example, formatClamp(999, 0, 300) = 300
	return value < min ? min : value > max ? max : value;
}

export function formatNumberWithCommas(string) {
	// example, formatNumberWithCommas(3000.12) = 3,000.12
	const parts = string.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return parts.join('.');
}

export function formatNumberEuro(string) {
	// example, formatNumberEuro(3000.12) = 3 000,12
	const parts = string.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

	return parts.join(',');
}

export function formatDateUsStandard(date) {
	return [
		formatPad(date.getDate()),
		formatPad(date.getMonth() + 1),
		date.getFullYear(),
	].join('/');
}

// usage: <p dangerouslySetInnerHTML={{ __html: formatNewLineToBr(text) }}/>
export function formatNewLineToBr(text) {
	if (!text) return;

	return sanitizeHtml(text.replace(/\n/g, '<br>'), {
		allowedTags: ['br'],
		allowedAttributes: {},
	});
}

export function formatObjectToHtml(obj) {
	return Object.entries(obj)
		.map(([key, value]) => {
			const formattedKey = key
				.replace(/([A-Z])/g, ' $1')
				.replace(/^./, (str) => str.toUpperCase())
				.replace(/\?/g, '');

			return `${formattedKey}: ${value}`;
		})
		.join('<br>');
}

export function formatUrl(url) {
	const [protocol, rest] = url.split('://');
	const normalizedRest = rest.replace(/\/+/g, '/');
	return `${protocol}://${normalizedRest}`;
}

// ***UTILITIES / VALIDATION***

export function validateEmail(string) {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return regex.test(string);
}

export function validateUsPhone(string) {
	const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

	return regex.test(string);
}

export function validateAndReturnJson(json) {
	try {
		JSON.parse(json);
	} catch (e) {
		console.error(e);
		return false;
	}

	return JSON.parse(string);
}

// ***UTILITIES / ARRAY***

export function arrayIntersection(a1, a2) {
	return a1.filter(function (n) {
		return a2.indexOf(n) !== -1;
	});
}

// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
export const arrayUniqueValues = (array) => {
	let unique = [...new Set(array)];

	return unique;
};

// sorting array of objects asc
export function arraySortObjValAsc(arr, objVal) {
	return arr.sort(function (a, b) {
		if (a[objVal] > b[objVal]) {
			return 1;
		}
		if (b[objVal] > a[objVal]) {
			return -1;
		}
		return 0;
	});
}

// sorting array of objects desc
export function arraySortObjValDesc(arr, objVal) {
	return arr.sort(function (a, b) {
		if (a[objVal] > b[objVal]) {
			return -1;
		}
		if (b[objVal] > a[objVal]) {
			return 1;
		}
		return 0;
	});
}

// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
export function arrayCartesian(...arrays) {
	return [...arrays].reduce(
		(a, b) =>
			a.map((x) => b.map((y) => x.concat(y))).reduce((a, b) => a.concat(b), []),
		[[]]
	);
}

// ***ACTIONS***

export function scrollDisable() {
	document.documentElement.style.overflow = 'hidden';
	document.body.style.overflow = 'hidden';
}

export function scrollEnable() {
	document.documentElement.style.overflow = 'initial';
	document.body.style.overflow = 'initial';
}

// simple debounce
export function debounce(fn, ms) {
	let timer;

	return (_) => {
		clearTimeout(timer);
		timer = setTimeout((_) => {
			timer = null;
			fn.apply(this, arguments);
		}, ms);
	};
}

// delay with promise
export function sleeper(ms) {
	return function (x) {
		return new Promise((resolve) => setTimeout(() => resolve(x), ms));
	};
}

// ***REACT SPECIFIC***

export function buildImageSrc(
	image,
	{ width, height, format, quality = 80 } = {}
) {
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

		return imgSrc && imgSrc.fit('max').auto('format').url();
	} catch (error) {
		console.error('Error building image source:', error);
		return false;
	}
}

export function buildImageSrcSet(
	image,
	{ srcSizes, aspectRatio = 1, format, quality = 80 } = {}
) {
	if (!image || !srcSizes) {
		return false;
	}

	try {
		const sizes = srcSizes
			.map((width) => {
				let imgSrc = buildImageSrc(image, {
					width,
					height: aspectRatio
						? Math.round(width * aspectRatio) / 100
						: undefined,
					format,
					quality,
				});

				if (format) {
					imgSrc = imgSrc.format(format);
				}

				return imgSrc ? `${imgSrc} ${width}w` : '';
			})
			.filter(Boolean);

		return sizes.length ? sizes.join(',') : false;
	} catch (error) {
		console.error('Error building image srcset:', error);
		return false;
	}
}

export function buildRgbaCssString(color) {
	if (!color) {
		return false;
	}

	const r = color?.rgb?.r ?? 255;
	const g = color?.rgb?.g ?? 255;
	const b = color?.rgb?.b ?? 255;
	const a = color?.rgb?.a ?? 1;

	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function slugify(str) {
	if (str === null || str === undefined) return;

	// Normalize and trim early; if empty after trim, return fallback
	const base = String(str)
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.trim(); // trim leading or trailing whitespace
	if (!base) return;

	const slug = base
		.toLowerCase() // convert to lowercase
		.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
		.replace(/\s+/g, '-') // spaces → hyphen
		.replace(/-+/g, '-'); // collapse hyphens

	return slug;
}

export function toCamelCase(str) {
	if (!str) return null;

	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index == 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, '');
}

export function isValidUrl(urlString) {
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

const SPACING_CLASSES = {
	pt: {
		0: 'pt-0',
		1: 'pt-1',
		2: 'pt-2',
		3: 'pt-3',
		4: 'pt-4',
		5: 'pt-5',
		6: 'pt-6',
		7: 'pt-7',
		8: 'pt-8',
		9: 'pt-9',
		10: 'pt-10',
		11: 'pt-11',
		12: 'pt-12',
		14: 'pt-14',
		16: 'pt-16',
		20: 'pt-20',
		24: 'pt-24',
		28: 'pt-28',
		32: 'pt-32',
		36: 'pt-36',
		40: 'pt-40',
		44: 'pt-44',
		48: 'pt-48',
		52: 'pt-52',
		56: 'pt-56',
		60: 'pt-60',
		64: 'pt-64',
		72: 'pt-72',
		80: 'pt-80',
		96: 'pt-96',
	},
	pb: {
		0: 'pb-0',
		1: 'pb-1',
		2: 'pb-2',
		3: 'pb-3',
		4: 'pb-4',
		5: 'pb-5',
		6: 'pb-6',
		7: 'pb-7',
		8: 'pb-8',
		9: 'pb-9',
		10: 'pb-10',
		11: 'pb-11',
		12: 'pb-12',
		14: 'pb-14',
		16: 'pb-16',
		20: 'pb-20',
		24: 'pb-24',
		28: 'pb-28',
		32: 'pb-32',
		36: 'pb-36',
		40: 'pb-40',
		44: 'pb-44',
		48: 'pb-48',
		52: 'pb-52',
		56: 'pb-56',
		60: 'pb-60',
		64: 'pb-64',
		72: 'pb-72',
		80: 'pb-80',
		96: 'pb-96',
	},
	// Margin classes
	mt: {
		0: 'mt-0',
		1: 'mt-1',
		2: 'mt-2',
		3: 'mt-3',
		4: 'mt-4',
		5: 'mt-5',
		6: 'mt-6',
		7: 'mt-7',
		8: 'mt-8',
		9: 'mt-9',
		10: 'mt-10',
		11: 'mt-11',
		12: 'mt-12',
		14: 'mt-14',
		16: 'mt-16',
		20: 'mt-20',
		24: 'mt-24',
		28: 'mt-28',
		32: 'mt-32',
		36: 'mt-36',
		40: 'mt-40',
		44: 'mt-44',
		48: 'mt-48',
		52: 'mt-52',
		56: 'mt-56',
		60: 'mt-60',
		64: 'mt-64',
		72: 'mt-72',
		80: 'mt-80',
		96: 'mt-96',
	},
	mb: {
		0: 'mb-0',
		1: 'mb-1',
		2: 'mb-2',
		3: 'mb-3',
		4: 'mb-4',
		5: 'mb-5',
		6: 'mb-6',
		7: 'mb-7',
		8: 'mb-8',
		9: 'mb-9',
		10: 'mb-10',
		11: 'mb-11',
		12: 'mb-12',
		14: 'mb-14',
		16: 'mb-16',
		20: 'mb-20',
		24: 'mb-24',
		28: 'mb-28',
		32: 'mb-32',
		36: 'mb-36',
		40: 'mb-40',
		44: 'mb-44',
		48: 'mb-48',
		52: 'mb-52',
		56: 'mb-56',
		60: 'mb-60',
		64: 'mb-64',
		72: 'mb-72',
		80: 'mb-80',
		96: 'mb-96',
	},
	// Desktop responsive classes
	'sm:pt': {
		0: 'sm:pt-0',
		1: 'sm:pt-1',
		2: 'sm:pt-2',
		3: 'sm:pt-3',
		4: 'sm:pt-4',
		5: 'sm:pt-5',
		6: 'sm:pt-6',
		7: 'sm:pt-7',
		8: 'sm:pt-8',
		9: 'sm:pt-9',
		10: 'sm:pt-10',
		11: 'sm:pt-11',
		12: 'sm:pt-12',
		14: 'sm:pt-14',
		16: 'sm:pt-16',
		20: 'sm:pt-20',
		24: 'sm:pt-24',
		28: 'sm:pt-28',
		32: 'sm:pt-32',
		36: 'sm:pt-36',
		40: 'sm:pt-40',
		44: 'sm:pt-44',
		48: 'sm:pt-48',
		52: 'sm:pt-52',
		56: 'sm:pt-56',
		60: 'sm:pt-60',
		64: 'sm:pt-64',
		72: 'sm:pt-72',
		80: 'sm:pt-80',
		96: 'sm:pt-96',
	},
	'sm:pb': {
		0: 'sm:pb-0',
		1: 'sm:pb-1',
		2: 'sm:pb-2',
		3: 'sm:pb-3',
		4: 'sm:pb-4',
		5: 'sm:pb-5',
		6: 'sm:pb-6',
		7: 'sm:pb-7',
		8: 'sm:pb-8',
		9: 'sm:pb-9',
		10: 'sm:pb-10',
		11: 'sm:pb-11',
		12: 'sm:pb-12',
		14: 'sm:pb-14',
		16: 'sm:pb-16',
		20: 'sm:pb-20',
		24: 'sm:pb-24',
		28: 'sm:pb-28',
		32: 'sm:pb-32',
		36: 'sm:pb-36',
		40: 'sm:pb-40',
		44: 'sm:pb-44',
		48: 'sm:pb-48',
		52: 'sm:pb-52',
		56: 'sm:pb-56',
		60: 'sm:pb-60',
		64: 'sm:pb-64',
		72: 'sm:pb-72',
		80: 'sm:pb-80',
		96: 'sm:pb-96',
	},
	'sm:mt': {
		0: 'sm:mt-0',
		1: 'sm:mt-1',
		2: 'sm:mt-2',
		3: 'sm:mt-3',
		4: 'sm:mt-4',
		5: 'sm:mt-5',
		6: 'sm:mt-6',
		7: 'sm:mt-7',
		8: 'sm:mt-8',
		9: 'sm:mt-9',
		10: 'sm:mt-10',
		11: 'sm:mt-11',
		12: 'sm:mt-12',
		14: 'sm:mt-14',
		16: 'sm:mt-16',
		20: 'sm:mt-20',
		24: 'sm:mt-24',
		28: 'sm:mt-28',
		32: 'sm:mt-32',
		36: 'sm:mt-36',
		40: 'sm:mt-40',
		44: 'sm:mt-44',
		48: 'sm:mt-48',
		52: 'sm:mt-52',
		56: 'sm:mt-56',
		60: 'sm:mt-60',
		64: 'sm:mt-64',
		72: 'sm:mt-72',
		80: 'sm:mt-80',
		96: 'sm:mt-96',
	},
	'sm:mb': {
		0: 'sm:mb-0',
		1: 'sm:mb-1',
		2: 'sm:mb-2',
		3: 'sm:mb-3',
		4: 'sm:mb-4',
		5: 'sm:mb-5',
		6: 'sm:mb-6',
		7: 'sm:mb-7',
		8: 'sm:mb-8',
		9: 'sm:mb-9',
		10: 'sm:mb-10',
		11: 'sm:mb-11',
		12: 'sm:mb-12',
		14: 'sm:mb-14',
		16: 'sm:mb-16',
		20: 'sm:mb-20',
		24: 'sm:mb-24',
		28: 'sm:mb-28',
		32: 'sm:mb-32',
		36: 'sm:mb-36',
		40: 'sm:mb-40',
		44: 'sm:mb-44',
		48: 'sm:mb-48',
		52: 'sm:mb-52',
		56: 'sm:mb-56',
		60: 'sm:mb-60',
		64: 'sm:mb-64',
		72: 'sm:mb-72',
		80: 'sm:mb-80',
		96: 'sm:mb-96',
	},
};

export function getSpacingClass(spacingType, value, hasBackground = false) {
	if (value === null || value === undefined) return null;
	const prefix = spacingType.includes('Top')
		? hasBackground
			? 'pt'
			: 'mt'
		: spacingType.includes('Bottom')
			? hasBackground
				? 'pb'
				: 'mb'
			: '';

	const isResponsive = spacingType.includes('Desktop');
	const finalPrefix = isResponsive ? `sm:${prefix}` : prefix;

	return SPACING_CLASSES[finalPrefix]?.[value] || null;
}

export const checkIfLinkIsActive = ({ pathName, url, isChild }) => {
	if (isChild) {
		return pathName.split('/')[1] == url.split('/')[1];
	} else {
		return pathName == url;
	}
};

export const resolveHref = ({ documentType, slug }) => {
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
			return slug;

		default:
			console.warn('Invalid document type:', documentType);
			return undefined;
	}
};

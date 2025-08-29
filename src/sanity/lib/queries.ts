import { defineQuery } from 'next-sanity';

// Construct our "home" page GROQ
export const homeID = defineQuery(`*[_type=="pHome"][0]._id`);
export const staticPageSlug = defineQuery(`[]`);

// Construct our "link" GROQ
const link = defineQuery(`
	_type,
	route,
	isNewTab
`);

// Construct our "menu" GROQ
const menu = defineQuery(`
	_key,
	_type,
	title,
	items[]{
		title,
		link {
			${link}
		},
		dropdownItems[]{
			_key,
			title,
			link {
				${link}
			},
		}
	}
`);

// Construct our "image meta" GROQ
export const imageMeta = defineQuery(`
	"alt": coalesce(alt, asset->altText),
	asset,
	crop,
	customRatio,
	hotspot,
	"id": asset->assetId,
	"type": asset->mimeType,
	"width": asset->metadata.dimensions.width,
	"height": asset->metadata.dimensions.height,
	"aspectRatio": asset->metadata.dimensions.aspectRatio,
	"lqip": asset->metadata.lqip
`);

export const callToAction = defineQuery(`
	label,
	link {
		${link}
	},
	"isButton": true
`);

// Construct our "portable text content" GROQ
export const portableTextContent = defineQuery(`
	...,
	markDefs[]{
		...,
		_type == "link" => {
			${link}
		},
		_type == "callToAction" => {
			${callToAction}
		}
	},
	_type == "image" => {
		${imageMeta}
	}
`);

export const freeformObj = defineQuery(`
	...,
	_type,
	_key,
	content[]{
		${portableTextContent}
	},
	sectionAppearance
`);

// Construct our content "modules" GROQ
export const pageModules = defineQuery(`
	_type == 'freeform' => {
		${freeformObj}
	},
	_type == 'carousel' => {
		_type,
		_key,
		items,
		autoplay,
		autoplayInterval,
	},
	_type == 'marquee' => {
		_type,
		_key,
		items[]{
			_type == 'simple' => {
				_type,
				text
			},
			_type == 'image' => {
				_type,
				"image": {
					${imageMeta}
				}
			}
		},
		speed,
		reverse,
		pausable
	},
`);

// Construct our "site" GROQ
export const site = defineQuery(`
	"site": {
		"title": *[_type == "settingsGeneral"][0].siteTitle,
		"favicon": *[_type == "settingsGeneral"][0].favicon,
		"faviconLight": *[_type == "settingsGeneral"][0].faviconLight,
		"announcement": *[_type == "gAnnouncement"][0]{
			display,
			messages,
			autoplay,
			autoplayInterval,
			backgroundColor,
			textColor,
			emphasizeColor,
			"link": ${link}
		},
		"header": *[_type == "gHeader"][0]{
			menu->{
				${menu}
			}
		},
		"footer": *[_type == "gFooter"][0]{
			menu->{
				${menu}
			},
			menuLegal->{
				${menu}
			},
		},
		"sharing": *[_type == "settingsSharing"][0]{
			shareGraphic,
		},
		"integrations": *[_type == "settingsIntegration"][0]{
			gtmID,
			gaID,
			KlaviyoApiKey,
		},
	}
`);

export const pageHomeQuery = defineQuery(`
	*[_type == "pHome"][0]{
		title,
		"slug": slug.current,
		"isHomepage": true,
		content[]{
			${portableTextContent}
		},
		sharing
	}
`);

export const page404Query = defineQuery(`*[_type == "p404" && _id == "p404"][0]{
	heading,
	content[]{
		${portableTextContent}
	},
	callToAction{
		${callToAction}
	}
}`);

export const pagesBySlugQuery = defineQuery(`
	*[_type == "pGeneral" && slug.current == $slug][0]{
			title,
			"slug": slug.current,
			sharing,
			pageModules[]{
				${pageModules}
			},
	}`);

// new pages below...
// export const pageAboutQuery = defineQuery(`
// 	*[_type == "pSpace"][0]{
// 			title,
// 			"slug": slug.current,
// 			sharing
// 	}`);

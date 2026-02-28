import { defineQuery } from 'next-sanity';

export const homeID = defineQuery(`*[_type == "pHome"][0]._id`);

const baseFields = `
	_id,
	_type,
	title,
	"slug": slug.current,
	"sharing":{
		...sharing,
		"siteTitle": *[_type == "settingsGeneral"][0].siteTitle,
	}
`;
export const resolvedHrefQuery = `
	"resolvedHref": select(
			linkType == "external" => externalUrl,
			linkType == "internal" => internalLink-> {
				"url": select(
					_type == "pHome" => "/",
					_type == "pBlogIndex" => "/blog",
					_type == "pBlog" => "/blog/" + slug.current,
					defined(slug.current) => "/" + slug.current,
					null
				)
			}.url,
			null)`;
const linkFields = `
	_type,
	"linkType": linkInput.linkType,
	"href": linkInput {
		${resolvedHrefQuery}
	}.resolvedHref,
	isNewTab
`;

const menuFields = `
	_id,
	_type,
	title,
	items[]{
		title,
		link {
			${linkFields}
		},
		dropdownItems[]{
			_key,
			title,
			link {
				${linkFields}
			}
		}
	}
`;

export const imageMetaFields = `
	asset,
	crop,
	customRatio,
	hotspot,
	"meta": asset-> {
		"id": assetId,
		"alt": coalesce(^.alt, altText),
		"type": mimeType,
		"width": metadata.dimensions.width,
		"height": metadata.dimensions.height,
		"aspectRatio": metadata.dimensions.aspectRatio,
		"lqip": metadata.lqip
	}
`;

const callToActionFields = `
	label,
	link {
		${linkFields}
	},
	"isButton": true
`;

const portableTextContentFields = `
	...,
	markDefs[]{
		...,
		_type == "link" => {
			${linkFields}
		},
		_type == "callToAction" => {
			${callToActionFields}
		}
	},
	_type == "image" => {
		${imageMetaFields},
		link {
			${linkFields}
		}
	}
`;

const freeformFields = `
	_type,
	_key,
	content[]{
		${portableTextContentFields}
	},
	sectionAppearance {
		...,
		"backgroundColor": backgroundColor->color,
		"textColor": textColor->color
	}
`;

const pageModuleFields = `
	_type == 'freeform' => {
		${freeformFields}
	},
`;

const customFormFields = `
	formFields[] {
		placeholder,
		_key,
		required,
		fieldLabel,
		inputType,
		size,
		selectOptions[] {
			_key,
			"title": option,
			"value": option
		}
	}
`;

export const siteDataQuery = defineQuery(`{
		"announcement": *[_type == "gAnnouncement"][0]{
			display,
			messages,
			autoplay,
			autoplayInterval,
			backgroundColor,
			textColor,
			emphasizeColor,
			"link": ${linkFields}
		},
		"header": *[_type == "gHeader"][0]{
			menu->{
				${menuFields}
			}
		},
		"footer": *[_type == "gFooter"][0]{
			menu->{
				${menuFields}
			},
			"menuLegal": menuLegal->{
				${menuFields}
			},
			"toolbarMenu": toolbarMenu->{
				${menuFields}
			},
			note
		},
		"sharing": *[_type == "settingsGeneral"][0]{
			siteTitle,
			shareGraphic,
			'shareVideo': shareVideo.asset->url,
			favicon,
			faviconLight
		},
		"integrations": *[_type == "settingsIntegration"][0]{
			gaIDs,
			gtmIDs
		},
	}
`);

export const pageHomeQuery = defineQuery(`
	*[_type == "pHome"][0]{
		${baseFields},
		"isHomepage": true,
		landingTitle,
		"textColor": textColor->color,
		pageModules[]{
			${pageModuleFields}
		}
	}
`);

export const page404Query = defineQuery(`
	*[_type == "p404" && _id == "p404"][0]{
		${baseFields},
		heading,
		paragraph[]{
			${portableTextContentFields}
		},
		callToAction{
			${callToActionFields}
		}
	}
`);

export const pageGeneralQuery = defineQuery(`
	*[_type == "pGeneral" && slug.current == $slug][0]{
		${baseFields},
		content[]{
			${portableTextContentFields}
		},
		_updatedAt
	}
`);
export const pageGeneralSlugsQuery = defineQuery(`
  *[_type == "pGeneral" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pageContactQuery = defineQuery(`
	*[_type == "pContact"][0]{
		${baseFields},
		description,
		contactForm {
			formTitle[]{
				${portableTextContentFields}
			},
			${customFormFields},
			successMessage,
			errorMessage,
			sendToEmail,
			emailSubject,
			formFailureNotificationEmail
		},
		legalConsent[]{
			${portableTextContentFields}
		}
	}
`);

export const pEventsQuery = defineQuery(`
	*[_type == "pEvents"][0]{
		${baseFields},
		"eventList": *[_type == "pEvent"] | order(eventDatetime asc) {
			${baseFields},
			subtitle,
			eventDatetime,
			location,
			locationLink,
			categories[]-> {
				_id,
				title,
				"slug": slug.current,
				categoryColor->{...color}
			},
			statusList[]{
				_key,
				link {
					${linkFields}
				},
				eventStatus-> {
					_id,
					title,
					"slug": slug.current,
					statusTextColor->{...color},
					statusBgColor->{...color}
				}
			}
		},
	}
`);

const blogPostBaseFields = `
	${baseFields},
	author->{name},
	categories[]-> {
		_id,
		title,
		"slug": slug.current,
		categoryColor->{...color}
	}
`;

export const blogPostCardFields = `${blogPostBaseFields}, excerpt`;

export const blogPostFullFields = `
	${blogPostBaseFields},
	content[]{
		${portableTextContentFields}
	},
	"relatedBlogs": relatedBlogs[]->{
		${blogPostCardFields}
	}
`;

export const articleListAllQuery = `
	"articleList": *[_type == "pBlog"] | order(_updatedAt desc) [0...12] {
		${blogPostCardFields}
	}
`;

const blogIndexBaseQuery = `
	${baseFields},
	"slug": "blog",
	itemsPerPage,
	paginationMethod,
	loadMoreButtonLabel,
	infiniteScrollCompleteLabel,
	"itemsTotalCount": count(*[_type == "pBlog"])
`;

export const pageBlogIndexQuery = defineQuery(`
	*[_type == "pBlogIndex"][0]{
		${blogIndexBaseQuery}
	}
`);

export const pageBlogIndexWithArticleDataSSGQuery = defineQuery(`
	*[_type == "pBlogIndex"][0]{
		${blogIndexBaseQuery},
		${articleListAllQuery}
	}
`);

export const pageBlogPaginationMethodQuery = defineQuery(`
	{
		"articleTotalNumber": count(*[_type == "pBlog"]),
		"itemsPerPage": *[_type == "pBlogIndex"][0].itemsPerPage
	}`);

export const pageBlogSlugsQuery = defineQuery(`
  *[_type == "pBlog" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pageBlogSingleQuery = defineQuery(`
	*[_type == "pBlog" && slug.current == $slug][0]{
		${blogPostFullFields},
		"defaultRelatedBlogs": *[_type == "pBlog"
			&& count(categories[@._ref in ^.^.categories[]._ref ]) > 0
			&& _id != ^._id
		] | order(publishedAt desc, _createdAt desc) [0...2] {
			${blogPostCardFields}
		}
	}
`);

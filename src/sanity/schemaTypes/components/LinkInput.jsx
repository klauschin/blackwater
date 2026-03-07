'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import {
	DocumentPdfIcon,
	LinkIcon,
	MasterDetailIcon,
	SearchIcon,
} from '@sanity/icons';
import { Autocomplete, Card, Flex, Stack, Text } from '@sanity/ui';
import { isValidUrl, validateEmail } from '@/lib/utils';
import { resolveHref } from '@/lib/routes';
import { set } from 'sanity';

const pageDocumentOrder = [
	'pHome',
	'pGeneral',
	'pEvents',
	'pEvent',
	'pBlogIndex',
	'pBlog',
	'pContact',
];

const fetchOptions = async () => {
	const groqQuery = `{
    "pages": * [_type in ${JSON.stringify(pageDocumentOrder)}] {
      title,
      _type,
      _id,
      "slug": slug.current,
    },
    "files": * [_type == "sanity.fileAsset" && mimeType == "application/pdf"] {
      _id,
      originalFilename,
      url,
      size
    }
  }`;

	const data = await client.fetch(groqQuery);

	const sortOrderMap = new Map(pageDocumentOrder.map((type, i) => [type, i]));
	const DEFAULT_RANK = pageDocumentOrder.length;

	const getPageTitle = (type, title) => {
		switch (type) {
			case 'pHome':
				return 'Home Page';
			default:
				return Array.isArray(title) ? toPlainText(title) : title;
		}
	};

	const fileOptions = (data.files || []).map((fileItem) => ({
		value: fileItem.url,
		payload: {
			pageTitle: fileItem.originalFilename,
			_id: fileItem._id,
			_type: 'pdf',
			route: fileItem.url,
			isInternal: false,
			isFile: true,
			fileSize: fileItem.size,
		},
	}));

	const pageOptions = (data.pages || [])
		.map(({ _type, slug, _id, title }) => ({
			value: _id,
			payload: {
				pageTitle: getPageTitle(_type, title),
				_id,
				_type,
				slug,
				route: resolveHref({ documentType: _type, slug }),
				isInternal: true,
				isFile: false,
			},
		}))
		.sort((a, b) => {
			const rankA = sortOrderMap.has(a.payload._type)
				? sortOrderMap.get(a.payload._type)
				: DEFAULT_RANK;
			const rankB = sortOrderMap.has(b.payload._type)
				? sortOrderMap.get(b.payload._type)
				: DEFAULT_RANK;
			return rankA - rankB;
		});

	return [...pageOptions, ...fileOptions];
};

const renderOption = (option) => {
	const { isNew, payload } = option;
	const { pageTitle, route, isFile, fileSize } = payload;

	// Format file size for display
	const formatFileSize = (bytes) => {
		if (!bytes) return '';
		const mb = bytes / (1024 * 1024);
		return mb < 1 ? `${(bytes / 1024).toFixed(0)} KB` : `${mb.toFixed(1)} MB`;
	};

	return (
		<Card as="button" padding={[4, 2]}>
			<Flex>
				{isNew ? (
					<LinkIcon style={{ fontSize: 36 }} />
				) : isFile ? (
					<DocumentPdfIcon style={{ fontSize: 36 }} />
				) : (
					<MasterDetailIcon style={{ fontSize: 36 }} />
				)}
				<Stack space={2} flex={1} paddingLeft={1}>
					<Text size={[1, 1, 2]} textOverflow="ellipsis">
						{pageTitle}
					</Text>
					<Text size={1} muted>
						{isFile && fileSize
							? `${route} • ${formatFileSize(fileSize)}`
							: route || option.value}
					</Text>
				</Stack>
			</Flex>
		</Card>
	);
};

export const LinkInput = (props) => {
	const { inputProps } = props;
	const { elementProps, onChange, value } = inputProps;
	const [loading, setLoading] = useState(true);
	const [pageItemData, setPageItemData] = useState([]);
	const [optionsList, setOptionsList] = useState([]);

	const handleChange = useCallback(
		(selectedValue) => {
			if (!selectedValue) {
				onChange(
					set({
						_type: 'linkInput',
						linkType: 'internal',
						internalLink: undefined,
						externalUrl: undefined,
						isFile: false,
					})
				);
				return;
			}

			const selectedOption = optionsList.find(
				(option) => option.value === selectedValue
			);

			if (selectedOption?.payload?.isInternal) {
				onChange(
					set({
						_type: 'linkInput',
						linkType: 'internal',
						internalLink: {
							_type: 'reference',
							_ref: selectedValue,
						},
						externalUrl: undefined,
						isFile: false,
					})
				);
			} else {
				onChange(
					set({
						_type: 'linkInput',
						linkType: 'external',
						internalLink: undefined,
						externalUrl: selectedValue,
						isFile: selectedOption?.payload?.isFile || false,
					})
				);
			}
		},
		[onChange, optionsList]
	);

	const handleQueryChange = useCallback(
		(query) => {
			const filteredOptions = pageItemData.filter(({ payload }) => {
				const queryLower = query?.toLowerCase();

				return (
					payload.route?.toLowerCase().includes(queryLower) ||
					payload.pageTitle?.toLowerCase().includes(queryLower) ||
					payload._id?.toLowerCase().includes(queryLower)
				);
			});

			const isSpecialLink =
				(query || '').startsWith('mailto:') || (query || '').startsWith('tel:');

			const isEmail = validateEmail(query);
			const processedQuery =
				isEmail && !query.startsWith('mailto:') ? `mailto:${query}` : query;

			const result = filteredOptions.length
				? filteredOptions
				: isValidUrl(query) || isSpecialLink || isEmail
					? [
							{
								value: processedQuery,
								payload: {
									pageTitle: processedQuery,
									route: processedQuery,
									isInternal: false,
									isFile: false,
								},
								isNew: true,
							},
						]
					: pageItemData;

			setOptionsList(result);
		},
		[pageItemData]
	);

	useEffect(() => {
		const loadPageItems = async () => {
			setLoading(true);
			const result = await fetchOptions();
			setPageItemData(result);
			setOptionsList(result);
			setLoading(false);
		};
		loadPageItems();
	}, []);

	// Helper function to get the current value for display
	const getCurrentValue = useCallback(() => {
		if (!value) return '';
		const { internalLink, linkType } = value;

		if (linkType === 'internal' && internalLink?._ref) {
			const referencedPage = pageItemData.find(
				(page) => page.value === internalLink._ref
			);
			if (referencedPage) {
				return referencedPage.value;
			}
			return internalLink._ref;
		}

		if (linkType === 'external' && value.externalUrl) {
			return value.externalUrl;
		}

		return '';
	}, [value, pageItemData]);

	// Helper function to get display title
	const getDisplayTitle = useCallback(
		(value) => {
			if (!value) return '';

			if (value.linkType === 'internal' && value.internalLink?._ref) {
				const referencedPage = pageItemData.find(
					(page) => page.value === value.internalLink._ref
				);
				return referencedPage
					? referencedPage.payload.pageTitle
					: value.internalLink._ref;
			}

			if (value.linkType === 'external' && value.externalUrl) {
				// Check if it's a file URL
				const fileOption = pageItemData.find(
					// CHANGE variable name
					(item) => item.payload.isFile && item.value === value.externalUrl
				);
				return fileOption ? fileOption.payload.pageTitle : value.externalUrl;
			}

			return '';
		},

		[pageItemData]
	);

	return (
		<Autocomplete
			{...elementProps}
			loading={loading}
			disabled={loading}
			options={optionsList}
			value={getCurrentValue()}
			openButton
			filterOption={() => true}
			onChange={handleChange}
			onQueryChange={handleQueryChange}
			icon={SearchIcon}
			placeholder="Paste a link or search"
			renderOption={renderOption}
			renderValue={(currentValue, option) => {
				if (!option) {
					return getDisplayTitle(value);
				}
				return option.payload.pageTitle;
			}}
		/>
	);
};

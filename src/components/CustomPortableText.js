import React from 'react';
import { PortableText } from '@portabletext/react';
import { cn } from '@/lib/utils';
import CustomLink from '@/components/CustomLink';
import Img from '@/components/Image';
import PortableTable from './PortableTable';

export default function CustomPortableText({ blocks, hasPTag = true }) {
	if (!blocks) return null;

	const portableTextComponents = {
		block: {
			...(!hasPTag && { normal: ({ children }) => <>{children}</> }),
			h1: ({ children }) => <h1>{children}</h1>,
			h2: ({ children }) => <h2>{children}</h2>,
			h3: ({ children }) => <h3>{children}</h3>,
			h4: ({ children }) => <h4>{children}</h4>,
			h5: ({ children }) => <h5>{children}</h5>,
			h6: ({ children }) => <h6>{children}</h6>,
			label: ({ children }) => <p className="text-sm uppercase">{children}</p>,
		},
		list: {
			bullet: ({ children }) => <ul>{children}</ul>,
			number: ({ children }) => <ol>{children}</ol>,
		},
		types: {
			image: (data) => {
				const { value } = data;
				if (!value?.asset) return;

				const { link } = value || {};
				if (link?.href) {
					return (
						<CustomLink link={link}>
							<Img image={value} />
						</CustomLink>
					);
				}
				return <Img image={value} />;
			},
			iframe: ({ value }) => {
				const { embedSnippet } = value;
				if (!embedSnippet) {
					return null;
				}
				const widthMatch = embedSnippet.match(/width="\s*(\d+)"/);
				const heightMatch = embedSnippet.match(/height="\s*(\d+)"/);
				const width = widthMatch?.[1];
				const height = heightMatch?.[1];
				const aspectRatio = width && height ? width / height : 1.77;

				return (
					<div
						className="relative overflow-hidden [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
						style={{ aspectRatio: aspectRatio }}
						dangerouslySetInnerHTML={{ __html: embedSnippet }}
					/>
				);
			},
			portableTable: (props) => {
				const { value } = props;
				return <PortableTable blocks={value} />;
			},
		},
		marks: {
			link: ({ value, children }) => {
				return <CustomLink link={value}>{children}</CustomLink>;
			},
			callToAction: ({ value, children }) => {
				const { link, isButton } = value || {};
				return (
					<CustomLink link={link} className={cn({ btn: isButton })}>
						{children}
					</CustomLink>
				);
			},
		},
	};

	return <PortableText value={blocks} components={portableTextComponents} />;
}

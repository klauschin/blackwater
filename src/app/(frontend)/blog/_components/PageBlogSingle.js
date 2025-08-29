'use client';

import React from 'react';
import { hasArrayValue } from '@/lib/utils';
import BlogCard from '@/components/BlogCard';
import CustomPortableText from '@/components/CustomPortableText';

export default function PageBlogSingle({ data }) {
	const { title, content, relatedBlogs, defaultRelatedBlogs } = data || {};

	return (
		<>
			<section className="p-blog-single">
				<h1 className="p-blog-single__title">{title}</h1>
				<div className="p-blog-single__content wysiwyg-page">
					<CustomPortableText blocks={content} />
				</div>
			</section>

			{(hasArrayValue(relatedBlogs) || hasArrayValue(defaultRelatedBlogs)) && (
				<section className="p-blog-related data-container">
					<h2 className="p-blog-related__title">Related Guides</h2>
					<div className="p-blog-related__content">
						{[...Array(4)].map((_, index) => {
							const relatedItems = relatedBlogs || [];
							const defaultItems = defaultRelatedBlogs || [];
							const allItems = [...relatedItems, ...defaultItems];
							const item = allItems[index];
							return (
								item && <BlogCard key={`${item._id}-${index}`} data={item} />
							);
						})}
					</div>
				</section>
			)}
		</>
	);
}

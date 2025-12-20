'use client';

/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.
*/
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { getBlogPostData } from '@/sanity/lib/queries';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import BlogCard from '@/components/BlogCard';
import clsx from 'clsx';

const getBlogQueryGROQ = ({ pageNumber, pageSize }) => {
	let queryGroq = `_type == "pBlog"`;

	return `*[${queryGroq}] | order(_updatedAt desc) [(${pageNumber} * ${pageSize})...(${pageNumber} + 1) * ${pageSize}]{
		${getBlogPostData('card')}
	}`;
};

const BlogArticles = ({ articles }) => {
	return (
		<div className="p-blog-articles__list">
			{articles?.map((item) => (
				<BlogCard key={item._id} data={item} />
			))}
		</div>
	);
};

const ListWithClientQuery = ({ data, currentPageNumber }) => {
	const { itemsPerPage, itemsTotalCount } = data || {};
	const pageNumber = Number(currentPageNumber);

	const fetchArticles = async ({ pageNumber, itemsPerPage }) => {
		const query = getBlogQueryGROQ({
			pageNumber,
			pageSize: itemsPerPage,
		});
		const res = await client.fetch(query);
		return res;
	};

	const {
		data: articlesData,
		isPending,
		isError,
		error,
		isFetching,
		isPlaceholderData,
	} = useQuery({
		queryKey: ['blogs', pageNumber],
		queryFn: () => fetchArticles({ pageNumber, itemsPerPage }),
		placeholderData: keepPreviousData,
	});

	return (
		<div>
			{isPending || isFetching ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {error.message}</div>
			) : (
				<BlogArticles articles={articlesData} />
			)}
		</div>
	);
};

const ListWithSSG = ({ data, currentPageNumber }) => {
	const { articleList, itemsPerPage } = data;
	const [listState, setListState] = useState('isLoading');
	const [listData, setListData] = useState([]);

	useEffect(() => {
		const pageSizeStart = (currentPageNumber - 1) * itemsPerPage;
		const pageSizeEnd = currentPageNumber * itemsPerPage;
		setListData(articleList.slice(pageSizeStart, pageSizeEnd));
		setListState(null);
	}, [articleList, itemsPerPage, currentPageNumber]);

	return (
		<>
			{listState === 'isLoading' ? (
				<p>Loading...</p>
			) : (
				<BlogArticles articles={listData} />
			)}
		</>
	);
};

/**
 *  TODO:
 * 	- Add the Tailwind CSS styling
 *  - Refactor the line 130 calc function. Move the function out of the return scope, do the calc before the return scope.
 **/

export default function BlogPagination({ data }) {
	const searchParams = useSearchParams();
	const currentPageNumber = searchParams.get('page') || 1;
	const { itemsTotalCount, itemsPerPage } = data;
	const ARTICLE_TOTAL_PAGE = Math.round(itemsTotalCount / itemsPerPage);

	return (
		<>
			{/* <ListWithClientQuery data={data} currentPageNumber={currentPageNumber} /> */}
			<ListWithSSG data={data} currentPageNumber={currentPageNumber} />
			{ARTICLE_TOTAL_PAGE > 1 && (
				<div className="flex items-center justify-center gap-2.5">
					<Link
						href={{
							pathname: '/blog',
							query: { page: Math.max(1, Number(currentPageNumber) - 1) },
						}}
						className={clsx('c-blog__pagination__button', {
							'is-disabled': Number(currentPageNumber) === 1,
						})}
					>
						<div className="icon-caret-left" />
					</Link>
					{(() => {
						const pages = [];
						const currentPage = Number(currentPageNumber);

						if (currentPage === 1) {
							// First page - show first 3 pages
							for (let i = 1; i <= Math.min(3, ARTICLE_TOTAL_PAGE); i++) {
								pages.push(i);
							}

							if (ARTICLE_TOTAL_PAGE > 3) {
								pages.push('...');
								pages.push(ARTICLE_TOTAL_PAGE);
							}
						} else if (currentPage === ARTICLE_TOTAL_PAGE) {
							// Last page - show last 3 pages
							if (ARTICLE_TOTAL_PAGE > 3) {
								pages.push(1);
								pages.push('...');
							}
							for (
								let i = Math.max(1, ARTICLE_TOTAL_PAGE - 2);
								i <= ARTICLE_TOTAL_PAGE;
								i++
							) {
								pages.push(i);
							}
						} else {
							// Middle pages - show previous, current, and next
							if (currentPage > 2) {
								pages.push(1);
								pages.push('...');
							}

							pages.push(currentPage - 1);
							pages.push(currentPage);
							pages.push(currentPage + 1);

							if (currentPage < ARTICLE_TOTAL_PAGE - 1) {
								pages.push('...');
								pages.push(ARTICLE_TOTAL_PAGE);
							}
						}

						return pages.map((page, index) => {
							if (page === '...') {
								return (
									<span
										key={`ellipsis-${index}`}
										className="c-blog__pagination__ellipsis"
									>
										...
									</span>
								);
							}

							return (
								<Link
									href={{
										pathname: '/blog',
										query: { page },
									}}
									key={page}
									className={clsx('c-blog__pagination__button', {
										'is-active': page === currentPage,
									})}
								>
									{page}
								</Link>
							);
						});
					})()}
					<Link
						href={{
							pathname: '/blog',
							query: {
								page: Math.min(
									ARTICLE_TOTAL_PAGE,
									Number(currentPageNumber) + 1
								),
							},
						}}
						className={clsx('c-blog__pagination__button', {
							'is-disabled': Number(currentPageNumber) === ARTICLE_TOTAL_PAGE,
						})}
					>
						<div className="icon-caret-right" />
					</Link>
				</div>
			)}
		</>
	);
}

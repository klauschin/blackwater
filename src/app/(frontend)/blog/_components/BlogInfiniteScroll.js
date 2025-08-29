/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.

*/

'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { getBlogPostData } from '@/sanity/lib/queries';
import { useInfiniteQuery } from '@tanstack/react-query';
import { InView } from 'react-intersection-observer';
import BlogCard from '@/components/BlogCard';

/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.

*/

/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.

*/

/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.

*/

/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.

*/

/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.

*/

/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.

*/

/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.

*/

/*
	To determine whether to use SSG or client-side fetching to render articles, consider the following criteria: if the response size of the article list is larger than 128KB or there are more than 200 posts, you should use the client fetch component.

	By default, the component used is SSG (<ListWithSSG/>). If you need to use the client fetch, follow these steps:

	1.	Uncomment the <ListWithClientQuery /> component and delete the <ListWithSSG/> component.
	2.	Go to the blog fetch function sanityFetch located in 'src/app/(frontend)/blog/page.js', and set isArticleDataSSG to false. Alternatively, you can modify the pageBlogIndexWithArticleDataSSGQuery located in 'src/sanity/lib/queries' to remove the query articleListAllQuery.

*/

const getBlogQueryGROQ = ({ pageParam, pageSize }) => {
	let queryGroq = `_type == "pBlog"`;

	return `*[${queryGroq}] | order(_updatedAt desc) [(${pageParam} * ${pageSize})...(${pageParam} + 1) * ${pageSize}]{
		${getBlogPostData('card')}
	}`;
};

const ListWithClientQuery = ({ data }) => {
	const {
		paginationMethod,
		itemsPerPage,
		loadMoreButtonLabel,
		infiniteScrollCompleteLabel,
	} = data || {};

	const LOAD_MORE_BUTTON_LABEL = loadMoreButtonLabel ?? 'Load More';
	const NO_MORE_ARTICLES_MESSAGE =
		infiniteScrollCompleteLabel ?? 'You’ve reached the end';

	const fetchArticles = async ({ pageParam }) => {
		const query = getBlogQueryGROQ({
			pageParam,
			pageSize: itemsPerPage,
		});
		const res = await client.fetch(query);
		return res;
	};

	const {
		data: articlesData,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ['blogs'],
		queryFn: ({ pageParam }) => fetchArticles({ pageParam }),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length ? allPages.length : undefined;
		},
	});

	return (
		<>
			{status === 'pending' ? (
				<p>Loading...</p>
			) : status === 'error' ? (
				<p>Error: {error.message}</p>
			) : (
				<>
					<section className="p-blog-articles">
						{articlesData.pages.map((group, i) => (
							<React.Fragment key={i}>
								{group.map((item) => (
									<BlogCard key={item._id} data={item} />
								))}
							</React.Fragment>
						))}
					</section>
					{paginationMethod === 'load-more' ? (
						<button
							onClick={() => fetchNextPage()}
							disabled={!hasNextPage || isFetchingNextPage}
							className="btn"
						>
							{isFetchingNextPage
								? 'Loading more...'
								: hasNextPage
									? LOAD_MORE_BUTTON_LABEL
									: NO_MORE_ARTICLES_MESSAGE}
						</button>
					) : (
						<InView
							as="section"
							className="p-blog__footer"
							onChange={(inView) => {
								if (inView && hasNextPage && !isFetchingNextPage) {
									fetchNextPage();
								}
							}}
						>
							{isFetching
								? 'Loading more...'
								: !hasNextPage && NO_MORE_ARTICLES_MESSAGE}
						</InView>
					)}
				</>
			)}
		</>
	);
};

const ListWithSSG = ({ data }) => {
	const {
		articleList,
		paginationMethod,
		itemsPerPage,
		loadMoreButtonLabel,
		infiniteScrollCompleteLabel,
		itemsTotalCount,
	} = data || {};

	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [listState, setListState] = useState('pending');
	const [listData, setListData] = useState([]);
	const hasNextPage = listData.length < itemsTotalCount;

	useEffect(() => {
		setListState('isFetching');
		const pageSizeEnd = currentPageNumber * itemsPerPage;
		setListData(articleList.slice(0, pageSizeEnd));
		setListState('success');
	}, [articleList, listState, itemsPerPage, currentPageNumber]);

	const fetchNextPage = () => {
		setListState('isFetchingNextPage');
		setCurrentPageNumber((prev) => prev + 1);
	};

	const LOAD_MORE_BUTTON_LABEL = loadMoreButtonLabel ?? 'Load More';
	const NO_MORE_ARTICLES_MESSAGE =
		infiniteScrollCompleteLabel ?? 'You’ve reached the end';

	return (
		<>
			{listState === 'pending' ? (
				<p>Loading...</p>
			) : listState === 'error' ? (
				<p>Error: {listState}</p>
			) : (
				<>
					<div className="p-blog-articles__list">
						{listData.map((item, index) => (
							<BlogCard key={item._id} data={item} />
						))}
					</div>
					{paginationMethod === 'load-more' ? (
						<button
							onClick={() => fetchNextPage()}
							disabled={!hasNextPage || listState === 'isFetchingNextPage'}
							className="btn"
						>
							{listState === 'isFetchingNextPage'
								? 'Loading more...'
								: hasNextPage
									? LOAD_MORE_BUTTON_LABEL
									: NO_MORE_ARTICLES_MESSAGE}
						</button>
					) : (
						<InView
							as="section"
							className="p-blog__footer"
							onChange={(inView) => {
								if (
									inView &&
									hasNextPage &&
									listState !== 'isFetchingNextPage'
								) {
									fetchNextPage();
								}
							}}
						>
							{listState === 'isFetching'
								? 'Loading more...'
								: !hasNextPage && NO_MORE_ARTICLES_MESSAGE}
						</InView>
					)}
				</>
			)}
		</>
	);
};

export default function BlogInfiniteScroll({ data }) {
	return (
		<>
			<ListWithSSG data={data} />
			{/* <ListWithClientQuery data={data} /> */}
		</>
	);
}

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Img from '@/components/Image';
import { cn } from '@/lib/utils';
import { fadeAnim } from '@/lib/animate';
import { motion } from 'motion/react';
import type { PageCuratedIndexQueryResult } from 'sanity.types';

type Props = {
	data: NonNullable<PageCuratedIndexQueryResult>;
};

export function PageCuratedIndex({ data }: Props) {
	const {
		title,
		subtitle,
		description,
		featuredProduct,
		productList,
		categories,
	} = data || {};

	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	const filteredProducts = useMemo(() => {
		if (!productList) return [];
		if (!activeCategory) return productList;
		return productList.filter((p) => p.category?.slug === activeCategory);
	}, [productList, activeCategory]);

	return (
		<div className="px-contain mx-auto min-h-[inherit] py-10 lg:py-17.5">
			{/* Header */}
			<div className="max-w-2xl mb-10 lg:mb-17.5">
				<motion.h1
					className="t-h-2 uppercase"
					initial="hide"
					animate="show"
					variants={fadeAnim}
					transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
				>
					{title}
				</motion.h1>
				{subtitle && (
					<motion.p
						className="t-h-5 mt-3 text-muted uppercase"
						initial="hide"
						animate="show"
						variants={fadeAnim}
						transition={{
							duration: 0.8,
							delay: 0.1,
							ease: [0, 0.71, 0.2, 1.01],
						}}
					>
						{subtitle}
					</motion.p>
				)}
				{description && (
					<motion.p
						className="t-b-1 mt-4 text-muted"
						initial="hide"
						animate="show"
						variants={fadeAnim}
						transition={{
							duration: 0.8,
							delay: 0.2,
							ease: [0, 0.71, 0.2, 1.01],
						}}
					>
						{description}
					</motion.p>
				)}
			</div>

			{/* Featured product */}
			{featuredProduct && (
				<motion.div
					className="mb-10 lg:mb-17.5"
					initial="hide"
					animate="show"
					variants={fadeAnim}
					transition={{ duration: 0.8, delay: 0.15, ease: [0, 0.5, 0.5, 1] }}
				>
					<p className="t-h-6 uppercase text-muted mb-4">Featured pick</p>
					<Link
						href={`/curated/${featuredProduct.slug}`}
						className="group grid grid-cols-1 lg:grid-cols-2 gap-6 border border-foreground/20 p-4 lg:p-6 hover:bg-foreground/5 transition-colors"
					>
						{featuredProduct.mainImage && (
							<div className="aspect-[4/3] overflow-hidden bg-foreground/5">
								<Img
									className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
									image={featuredProduct.mainImage as any}
									alt={featuredProduct.title ?? ''}
								/>
							</div>
						)}
						<div className="flex flex-col justify-center gap-3">
							{featuredProduct.category && (
								<span className="t-h-6 uppercase text-muted">
									{featuredProduct.category.title}
								</span>
							)}
							<h2 className="t-h-3 uppercase">{featuredProduct.title}</h2>
							{featuredProduct.price && (
								<p className="t-h-5 uppercase">{featuredProduct.price}</p>
							)}
							{featuredProduct.excerpt && (
								<p className="t-b-1 text-muted line-clamp-3">
									{featuredProduct.excerpt}
								</p>
							)}
							<span className="t-h-6 uppercase underline underline-offset-4 mt-2 group-hover:opacity-60 transition-opacity self-start">
								View pick →
							</span>
						</div>
					</Link>
				</motion.div>
			)}

			{/* Category filter */}
			{categories && categories.length > 0 && (
				<motion.div
					className="flex gap-2 flex-wrap mb-8"
					initial="hide"
					animate="show"
					variants={fadeAnim}
					transition={{ duration: 0.6, delay: 0.2, ease: [0, 0.5, 0.5, 1] }}
				>
					<button
						onClick={() => setActiveCategory(null)}
						className={cn(
							't-h-6 uppercase px-3 py-1.5 border transition-colors cursor-pointer',
							activeCategory === null
								? 'bg-foreground text-background border-foreground'
								: 'border-foreground/30 hover:border-foreground/60'
						)}
					>
						All
					</button>
					{categories.map((cat) => (
						<button
							key={cat._id}
							onClick={() => setActiveCategory(cat.slug ?? null)}
							className={cn(
								't-h-6 uppercase px-3 py-1.5 border transition-colors cursor-pointer',
								activeCategory === cat.slug
									? 'bg-foreground text-background border-foreground'
									: 'border-foreground/30 hover:border-foreground/60'
							)}
						>
							{cat.title}
						</button>
					))}
				</motion.div>
			)}

			{/* Product grid */}
			{filteredProducts.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-foreground/20">
					{filteredProducts.map((product, index) => (
						<motion.article
							key={product._id}
							initial="hide"
							animate="show"
							variants={fadeAnim}
							transition={{
								duration: 0.8,
								delay: index * 0.06,
								ease: [0, 0.5, 0.5, 1],
							}}
						>
							<Link
								href={`/curated/${product.slug}`}
								className="group flex flex-col h-full border border-foreground/10 p-4 hover:bg-foreground/5 transition-colors"
							>
								{product.mainImage ? (
									<div className="aspect-[4/3] overflow-hidden bg-foreground/5 mb-4">
										<Img
											className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
											image={product.mainImage as any}
											alt={product.title ?? ''}
										/>
									</div>
								) : (
									<div className="aspect-[4/3] bg-foreground/5 mb-4" />
								)}
								<div className="flex flex-col gap-1.5 flex-1">
									{product.category && (
										<span className="t-h-6 uppercase text-muted">
											{product.category.title}
										</span>
									)}
									<h2 className="t-h-5 uppercase leading-tight">
										{product.title}
									</h2>
									{product.price && (
										<p className="t-b-2 text-muted">{product.price}</p>
									)}
									{product.excerpt && (
										<p className="t-b-2 text-muted line-clamp-2 mt-1">
											{product.excerpt}
										</p>
									)}
								</div>
							</Link>
						</motion.article>
					))}
				</div>
			) : (
				<p className="py-8 text-center t-b-1 text-muted">
					No products in this category yet.
				</p>
			)}
		</div>
	);
}

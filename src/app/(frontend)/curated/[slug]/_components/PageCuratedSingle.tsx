'use client';
import React from 'react';
import Link from 'next/link';
import Img from '@/components/Image';
import CustomPortableText from '@/components/CustomPortableText';
import { fadeAnim } from '@/lib/animate';
import { motion } from 'motion/react';
import type { PageCuratedSingleQueryResult } from 'sanity.types';
import { hasArrayValue } from '@/lib/utils';

type Props = {
	data: NonNullable<PageCuratedSingleQueryResult>;
};

export default function PageCuratedSingle({ data }: Props) {
	const {
		title,
		categories,
		mainImage,
		price,
		purchaseLink,
		content,
		relatedProducts,
		defaultRelatedProducts,
	} = data || {};

	const displayRelated =
		relatedProducts && relatedProducts.length > 0
			? relatedProducts
			: defaultRelatedProducts;

	return (
		<div className="px-contain mx-auto min-h-[inherit] py-10 lg:py-17.5">
			<motion.nav
				className="t-h-6 uppercase text-muted mb-8 flex items-center gap-2"
				initial="hide"
				animate="show"
				variants={fadeAnim}
				transition={{ duration: 0.6, ease: [0, 0.71, 0.2, 1.01] }}
			>
				<Link
					href="/curated"
					className="hover:text-foreground transition-colors"
				>
					Curated
				</Link>

				<>
					<span>/</span>
					<span>
						{hasArrayValue(categories) &&
							categories.map((item: any, index: number) => {
								return (
									<React.Fragment key={index}>{item.title}</React.Fragment>
								);
							})}
					</span>
				</>
			</motion.nav>

			{/* Product hero */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24">
				{/* Image */}
				<motion.div
					className="relative aspect-4/3 overflow-hidden bg-foreground"
					initial="hide"
					animate="show"
					variants={fadeAnim}
					transition={{ duration: 0.8, delay: 0.05, ease: [0, 0.5, 0.5, 1] }}
				>
					{mainImage ? (
						<Img fill="contain" imageObj={mainImage as any} alt={title ?? ''} />
					) : (
						<div className="w-full h-full bg-foreground" />
					)}
				</motion.div>

				{/* Details */}
				<div className="flex flex-col gap-4 justify-center">
					{hasArrayValue(categories) &&
						categories.map((item: any, index: number) => {
							return (
								<motion.span
									key={item._id || index}
									className="t-h-6 uppercase text-muted"
									initial="hide"
									animate="show"
									variants={fadeAnim}
									transition={{
										duration: 0.6,
										delay: 0.1,
										ease: [0, 0.71, 0.2, 1.01],
									}}
								>
									{item.title}
								</motion.span>
							);
						})}

					<motion.h1
						className="t-h-2 uppercase"
						initial="hide"
						animate="show"
						variants={fadeAnim}
						transition={{
							duration: 0.8,
							delay: 0.15,
							ease: [0, 0.71, 0.2, 1.01],
						}}
					>
						{title}
					</motion.h1>

					{price && (
						<motion.p
							className="t-h-4 uppercase"
							initial="hide"
							animate="show"
							variants={fadeAnim}
							transition={{
								duration: 0.6,
								delay: 0.2,
								ease: [0, 0.71, 0.2, 1.01],
							}}
						>
							{price}
						</motion.p>
					)}

					{purchaseLink && (
						<motion.div
							initial="hide"
							animate="show"
							variants={fadeAnim}
							transition={{
								duration: 0.6,
								delay: 0.25,
								ease: [0, 0.71, 0.2, 1.01],
							}}
						>
							<a
								href={purchaseLink}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 t-h-6 uppercase border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
							>
								Buy now
								<span aria-hidden="true">↗</span>
							</a>
						</motion.div>
					)}
				</div>
			</div>

			{/* Content */}
			{content && content.length > 0 && (
				<motion.div
					className="max-w-2xl mb-16 lg:mb-24"
					initial="hide"
					animate="show"
					variants={fadeAnim}
					transition={{ duration: 0.8, delay: 0.3, ease: [0, 0.5, 0.5, 1] }}
				>
					<CustomPortableText blocks={content as any} />
				</motion.div>
			)}

			{/* Related products */}
			{displayRelated && displayRelated.length > 0 && (
				<div className="border-t border-foreground/20 pt-10">
					<motion.p
						className="t-h-6 uppercase text-muted mb-6"
						initial="hide"
						animate="show"
						variants={fadeAnim}
						transition={{ duration: 0.6, ease: [0, 0.71, 0.2, 1.01] }}
					>
						More picks
					</motion.p>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-foreground/20">
						{displayRelated.map((product, index) => (
							<motion.article
								key={product._id}
								initial="hide"
								animate="show"
								variants={fadeAnim}
								transition={{
									duration: 0.8,
									delay: index * 0.08,
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
												imageObj={product.mainImage as any}
												alt={product.title ?? ''}
											/>
										</div>
									) : (
										<div className="aspect-[4/3] bg-foreground/5 mb-4" />
									)}
									<div className="flex flex-col gap-1.5">
										<h3 className="t-h-5 uppercase leading-tight">
											{product.title}
										</h3>
										{product.price && (
											<p className="t-b-2 text-muted">{product.price}</p>
										)}
									</div>
								</Link>
							</motion.article>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

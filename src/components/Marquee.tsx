import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface MarqueeItem {
	_type: 'simple';
	text?: string;
	font?: string;
}

interface MarqueeData {
	pausable?: boolean;
	reverse?: boolean;
	speed?: number;
	items?: MarqueeItem[];
}

interface MarqueeProps {
	data: MarqueeData;
	children?: ReactNode;
}

const Marquee: React.FC<MarqueeProps> = ({ data, children }) => {
	const { pausable, reverse, speed = 30, items = [] } = data;
	const animationSpeed = `${speed}s`;

	if (!items.length && !children) return null;

	return (
		<>
			<div
				className={clsx('marquee user-select-disable', {
					'is-pausable': pausable,
				})}
				data-direction={reverse ? 'right' : 'left'}
			>
				<div className="marquee-inner">
					{[...Array(3)].map((_, index) => (
						<div
							key={index}
							className="marquee-block"
							aria-hidden={index > 0 ? 'true' : 'false'}
						>
							{children}
							{items.map((item, index) => {
								switch (item._type) {
									case 'simple':
										return (
											<span
												key={index}
												className={clsx('marquee-text', item.font)}
											>
												{item.text}
											</span>
										);
								}
							})}
						</div>
					))}
				</div>
			</div>
			<style jsx>{`
				.marquee {
					--gap: 1rem;
					position: relative;
					padding: 10px 0;

					&[data-direction='right'] {
						.marquee-block {
							animation-direction: reverse;
						}
					}

					@keyframes marquee {
						0% {
							transform: translate3d(0, 0, 0);
						}

						100% {
							transform: translate3d(calc(-100% - var(--gap)), 0, 0);
						}
					}

					.marquee-inner {
						position: relative;
						width: 100%;
						overflow: hidden;
						display: flex;
						gap: var(--gap);
					}

					.marquee-block {
						flex-shrink: 0;
						display: flex;
						justify-content: space-around;
						gap: var(--gap);
						min-width: 100%;
						animation: marquee ${animationSpeed} 0.5s linear infinite;
					}

					.marquee-text {
						white-space: nowrap;

						&:not(:last-child) {
							margin-right: var(--gap);
						}
					}

					&.is-pausable {
						@media (hover: hover) {
							&:hover {
								.marquee-block {
									animation-play-state: paused;
								}
							}
						}
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.marquee-block {
						animation-play-state: paused !important;
					}
				}
			`}</style>
		</>
	);
};

export default Marquee;

'use client';

import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect } from 'react';

export function Typewriter({
	children,
	className,
	speed = 1.5,
	isShowBlinkingCursor,
}: {
	children: string;
	className?: string;
	speed?: number;
	isShowBlinkingCursor?: boolean;
}) {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const displayText = useTransform(rounded, (latest) =>
		children.slice(0, latest)
	);

	useEffect(() => {
		count.set(0);
		const controls = animate(count, children.length, {
			duration: speed,
			ease: 'linear',
		});

		return controls.stop;
	}, [children, count, speed]);

	return (
		<p className={className} aria-label={children}>
			<motion.span>{displayText}</motion.span>
			{isShowBlinkingCursor && (
				<motion.span
					animate={{ opacity: [0, 1, 0] }}
					transition={{ repeat: Infinity, duration: 0.8 }}
					className="inline-block w-[2px] h-[1em] bg-current ml-0.5"
				/>
			)}
		</p>
	);
}

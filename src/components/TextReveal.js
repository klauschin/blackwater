'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { buildRgbaCssString, cn } from '@/lib/utils';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { motion, useInView } from 'motion/react';

export function TextReveal({
	text,
	textColor,
	className = '',
	htmlTag,
	handleAnimationComplete,
}) {
	const CompTag = htmlTag || 'span';

	const { isMobileScreen } = useWindowDimensions();

	const animationConfig = useMemo(
		() => ({
			delay: isMobileScreen ? 0.2 : 0.36,
			duration: 0.2,
		}),
		[isMobileScreen]
	);

	const [lines, setLines] = useState([text]);
	const containerRef = useRef(null);
	const measureRef = useRef(null);
	const isInView = useInView(containerRef, {
		once: true,
		margin: '0px 0px -10% 0px', // Trigger slightly before fully in view
	});

	const textColorStyle = useMemo(
		() => (textColor ? buildRgbaCssString(textColor) : null),
		[textColor]
	);

	const splitTextIntoLines = (text, maxWidth) => {
		if (!measureRef.current || maxWidth <= 0) return [text];

		const words = text.split(' ');
		const lines = [];
		let currentLine = '';

		for (const word of words) {
			const testLine = currentLine ? `${currentLine} ${word}` : word;

			// Measure the width of the test line
			measureRef.current.textContent = testLine;
			const lineWidth = measureRef.current.getBoundingClientRect().width;

			if (lineWidth <= maxWidth) {
				currentLine = testLine;
			} else {
				// If current line is not empty, push it and start new line
				if (currentLine) {
					lines.push(currentLine);
					currentLine = word;
				} else {
					// Single word is too long, just add it anyway
					lines.push(word);
				}
			}
		}

		// Add the last line if it exists
		if (currentLine) {
			lines.push(currentLine);
		}

		return lines.length > 0 ? lines : [text];
	};

	useEffect(() => {
		const updateLines = () => {
			if (!containerRef.current || !measureRef.current) return;

			const containerWidth = containerRef.current.getBoundingClientRect().width;
			const availableWidth = containerWidth - 30;
			const newLines = splitTextIntoLines(text, availableWidth);
			setLines(newLines);
		};

		// Initial calculation with a small delay to ensure DOM is ready
		const timeoutId = setTimeout(updateLines, 0);

		// Update on resize
		const resizeObserver = new ResizeObserver(() => {
			// Use requestAnimationFrame to debounce resize events
			requestAnimationFrame(updateLines);
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			clearTimeout(timeoutId);
			resizeObserver.disconnect();
		};
	}, [text]);

	return (
		<div
			className={cn('relative overflow-hidden', className, {
				'text-cream': !textColor,
			})}
			ref={containerRef}
			style={{
				color: textColorStyle,
			}}
		>
			<CompTag className="sr-only">{text}</CompTag>
			{/* Invisible measuring element with same styles */}
			<span
				ref={measureRef}
				className={cn(
					'pointer-events-none absolute -top-full left-0 whitespace-nowrap opacity-0'
				)}
				aria-hidden="true"
			/>

			{/* Rendered lines */}
			{lines.map((line, index, array) => {
				const isLast = index == array.length - 1;
				const delayBasis = index * animationConfig.delay;
				return (
					<div key={index} className="relative inline-block overflow-hidden">
						<motion.div
							key={index}
							className="absolute inset-0 z-20"
							style={{
								backgroundColor: textColorStyle || 'var(--color-cream)',
							}}
							initial={{ x: '-101%' }}
							animate={{ x: isInView ? '101%' : '-101%' }}
							transition={{
								duration: animationConfig.duration + 0.1,
								ease: [0.0, 0.5, 0.5, 1.0],
								delay: delayBasis + 0.8,
							}}
						/>
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: isInView ? 1 : 0 }}
							transition={{
								duration: animationConfig.duration,
								delay: delayBasis + 1,
							}}
							onAnimationComplete={() => {
								if (isLast) {
									handleAnimationComplete && handleAnimationComplete(true);
								}
							}}
						>
							{line}
						</motion.span>
					</div>
				);
			})}
		</div>
	);
}

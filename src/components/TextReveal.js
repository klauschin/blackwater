'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export function TextReveal({
	text,
	className = '',
	splitMethod = 'words',
	maxWordsPerLine = 6,
	htmlTag,
}) {
	const CompTag = htmlTag || 'span';
	const isHeroSection = htmlTag === 'h1';
	const animationDelay = isHeroSection ? 0.6 : 0;

	const lineVariants = {
		hidden: {
			clipPath: 'inset(0 100% 0 0)',
			opacity: 0,
		},
		visible: (custom) => ({
			clipPath: 'inset(0 0% 0 0)',
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94],
				delay: custom * 0.5 + animationDelay,
			},
		}),
	};

	const [textLines, setTextLines] = useState([]);
	const splitTextIntoLines = (inputText) => {
		if (!inputText) return [];

		switch (splitMethod) {
			case 'sentences':
				// Split by sentences (periods, exclamation marks, question marks)
				return inputText
					.split(/[.!?]+/)
					.filter((sentence) => sentence.trim().length > 0)
					.map((sentence) => sentence.trim());

			case 'manual':
				// Split by pipe character or newlines for manual control
				return inputText
					.split(/\||\n/)
					.filter((line) => line.trim().length > 0)
					.map((line) => line.trim());

			case 'words':
			default:
				// Smart word-based splitting
				const words = inputText.split(' ');
				const lines = [];
				let currentLine = '';

				words.forEach((word, index) => {
					const testLine = currentLine ? `${currentLine} ${word}` : word;

					// If adding this word would exceed max words per line, start new line
					if (currentLine && testLine.split(' ').length > maxWordsPerLine) {
						lines.push(currentLine.trim());
						currentLine = word;
					} else {
						currentLine = testLine;
					}

					// If this is the last word, add the current line
					if (index === words.length - 1) {
						lines.push(currentLine.trim());
					}
				});

				return lines.filter((line) => line.length > 0);
		}
	};

	// Set up text lines on component mount or when text changes
	useEffect(() => {
		const lines = splitTextIntoLines(text);
		setTextLines(lines);
	}, [text, splitMethod, maxWordsPerLine]);

	return (
		<div className={cn(className)}>
			<CompTag className="sr-only">{text}</CompTag>
			{textLines.map((line, index, array) => {
				return (
					<motion.span
						className="block"
						key={index}
						initial="hidden"
						animate="visible"
						whileInView="visible"
						variants={lineVariants}
						viewport={{ once: true, amount: 1 }}
						custom={index + 0.3}
					>
						{line}
					</motion.span>
				);
			})}
		</div>
	);
}

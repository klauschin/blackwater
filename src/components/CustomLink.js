'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import useKey from '@/hooks/useKey';
import clsx from 'clsx';

/**
 * CustomLink component for handling both internal and external links
 *
 * @param {Object} props
 * @param {Object} props.link - Link object from Sanity
 * @param {string} props.link.linkType - 'internal' or 'external'
 * @param {string} props.link.href - Pre-resolved href from GROQ (preferred)
 * @param {boolean} props.isNewTab - Force open in new tab
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Link content
 * @param {string} props.className - CSS classes
 */

export default function CustomLink({
	link,
	children,
	className,
	isNewTab,
	onClick,
	...props
}) {
	const router = useRouter();
	const { hasPressedKeys } = useKey();

	if (!link) return children;

	const { href } = link;
	const isOpenNewTab = isNewTab ?? link.isNewTab;

	if (!href) return children;

	const isMailTo = href.match('^mailto:');

	const handleClick = (event) => {
		onClick?.(event);

		if (event.defaultPrevented) return;

		if (document.startViewTransition && !isOpenNewTab && !hasPressedKeys) {
			event.preventDefault();
			document.startViewTransition(() => {
				router.push(href);
			});
		}
	};

	return (
		<NextLink
			href={href}
			target={isMailTo || isOpenNewTab ? '_blank' : undefined}
			rel={isOpenNewTab ? 'noopener noreferrer' : undefined}
			onClick={handleClick}
			className={clsx(className)}
			{...props}
		>
			{children}
		</NextLink>
	);
}

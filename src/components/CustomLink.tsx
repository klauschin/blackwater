import clsx from 'clsx';
import NextLink from 'next/link';
import React from 'react';

export { NextLink };

interface CustomLinkProps {
	link: { route: string; isNewTab?: boolean | undefined };
	title?: string;
	children: React.ReactNode;
	className?: string;
	ariaLabel?: string;
	isNewTab?: boolean;
	isButton?: boolean;
}

export default function CustomLink({
	link,
	title,
	children,
	className,
	ariaLabel,
	isNewTab,
	isButton,
	...props
}: CustomLinkProps) {
	if (!link.route) {
		return null;
	}

	const { route } = link;
	const isOpenNewTab = isNewTab ?? link.isNewTab;

	return (
		<NextLink
			href={route}
			title={title}
			target={route?.match('^mailto:') || isOpenNewTab ? '_blank' : undefined}
			rel={isOpenNewTab ? 'noopener noreferrer' : undefined}
			aria-label={ariaLabel || `${title || `Go to ${route}`}`}
			className={clsx(className, {
				btn: isButton,
			})}
			{...props}
		>
			{children}
		</NextLink>
	);
}

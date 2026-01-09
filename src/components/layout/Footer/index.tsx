import { useEffect, useRef } from 'react';
import { pageTransitionFade } from '@/lib/animate';
import Menu from '@/components/Menu';
import { m } from 'motion/react';
import type { GFooter, SettingsMenu } from 'sanity.types';

type FooterProps = GFooter & {
	siteTitle?: string;
	menu?: SettingsMenu;
};

export function Footer({ data }: { data: FooterProps }) {
	const { menu, note } = data || {};
	const footerRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--h-footer',
			`${footerRef?.current?.offsetHeight || 0}px`
		);
	}, []);

	return (
		<m.footer
			ref={footerRef}
			initial="initial"
			animate="animate"
			variants={pageTransitionFade}
			className="bg-background text-foreground px-contain py-10 mb-15 lg:mb-0"
		>
			{menu && (
				<Menu
					data={menu}
					className="mb-10 md:hidden flex items-center t-b-2 gap-2.5 select-none uppercase justify-between"
				/>
			)}
			{note && <p className="t-l-2 uppercase text-right">{note}</p>}
		</m.footer>
	);
}

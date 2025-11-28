import React, { useEffect, useRef } from 'react';
import { pageTransitionFade } from '@/lib/animate';
import Menu from '@/components/Menu';
import { m } from 'motion/react';

export default function Footer({ data }) {
	console.log(data);
	const { siteTitle } = data || {};
	const footerRef = useRef();

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--h-footer',
			`${footerRef?.current?.offsetHeight || 0}px`
		);
	}, []);

	return (
		<>
			<m.footer
				ref={footerRef}
				initial="initial"
				animate="animate"
				variants={pageTransitionFade}
				className="bg-black text-white"
			>
				<div className="px-contain py-5">
					{data?.menu?.items && (
						<Menu
							items={data.menu.items}
							ulClassName="flex items-center justify-start t-b-2 gap-2.5 select-none"
						/>
					)}
				</div>

				<div className="px-contain flex items-center justify-between py-2.5">
					<div className="relative">
						© {new Date().getFullYear()} {siteTitle}
					</div>

					{data?.menuLegal?.items && (
						<Menu
							items={data.menuLegal.items}
							ulClassName="flex items-center gap-2.5 t-b-2 select-none"
						/>
					)}
				</div>
			</m.footer>
		</>
	);
}

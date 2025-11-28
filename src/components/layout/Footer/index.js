import React, { useEffect, useRef } from 'react';
import { pageTransitionFade } from '@/lib/animate';
import Menu from '@/components/Menu';
import { m } from 'motion/react';
import { cn } from '@/lib/utils';

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
				className="bg-black text-white px-contain"
			>

				{data?.menu?.items && (
					<Menu
						items={data.menu.items}
						className="my-5 md:hidden block"
						ulClassName="flex items-center justify-between t-b-2 gap-2.5 select-none"
					/>
				)}

				<div className="flex items-center justify-between py-2.5">
					<div className="relative t-b-3 ml-auto">
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

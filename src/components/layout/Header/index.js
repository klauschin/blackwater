import Link from 'next/link';
import { TZDate } from '@date-fns/tz';
import { format, formatDistance } from 'date-fns';
import { hasArrayValue } from '@/lib/utils';
import { LogoSvg } from '@/components/LogoSvg';
import Menu from '@/components/Menu';
import MobileMenu from '@/components/MobileMenu';

export default function Header({ data }) {
	const { siteTitle, menu } = data || {};
	const { items } = menu || {};

	return (
		<header className="px-contain h-header sticky top-0 left-0 z-10 flex w-full items-center justify-between bg-black py-2.5 leading-none">
			<Link href="/" title={siteTitle} className="w-24 text-white">
				<LogoSvg />
			</Link>
			<div className="t-b-1 flex items-center gap-0.5">
				<LocationCurrentTime />
				(TPE)
			</div>
			{hasArrayValue(items) && (
				<>
					<Menu
						items={items}
						className="mobile:block hidden select-none"
						ulClassName="flex item-center gap-2.5 t-b-2"
					/>
					<MobileMenu data={data} />
				</>
			)}
		</header>
	);
}

function LocationCurrentTime() {
	const now = new Date();
	const tzDate = new TZDate(now, 'Asia/Singapore');
	return <time>{format(tzDate, 'iiii, p')}</time>;
}

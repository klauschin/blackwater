import Link from 'next/link';
import { TZDate } from '@date-fns/tz';
import { format, formatDistance } from 'date-fns';
import { hasArrayValue } from '@/lib/utils';
import { LogoSvg } from '@/components/LogoSvg';
import Menu from '@/components/Menu';

interface HeaderProps {
  data?: {
    siteTitle?: string;
    menu?: {
      items?: any[];
    };
  };
}

export default function Header({ data }: HeaderProps) {
	const { siteTitle, menu } = data || {};
	const { items } = menu || {};

	return (
		<header className="px-contain h-header sticky top-0 z-10 grid w-full grid-cols-2 items-center bg-black leading-none">
			{/* {hasArrayValue(items) && (
				<Menu
					items={items}
					className="hidden select-none lg:block"
					ulClassName="flex item-center gap-2.5 t-b-2 uppercase"
				/>
			)} */}
			<Link href="/" title={siteTitle} className="mr-auto w-24 text-white">
				<LogoSvg />
			</Link>
			<div className="t-b-1 ml-auto flex items-center gap-0.5">
				<LocationCurrentTime />
				(TPE)
			</div>
		</header>
	);
}

function LocationCurrentTime() {
	const now = new Date();
	const tzDate = new TZDate(now, 'Asia/Singapore');
	return <time>{format(tzDate, 'iiii, p')}</time>;
}

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AdaSkip() {
	return (
		<Button
			asChild
			className="top-[calc(var(--h-announcement, 0px)+10px)] left-contain fixed z-overlay -translate-y-full focus:translate-y-0"
		>
			<Link href="#main">Skip to content</Link>
		</Button>
	);
}

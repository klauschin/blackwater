import { cn } from '@/lib/utils';

type SvgIconsProps = {
	className?: string;
};

export function ArrowUpRight({ className }: SvgIconsProps) {
	return (
		<svg
			className={cn(className)}
			viewBox="0 0 8 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0.868476 8L0 7.16493L5.91232 1.25261L0.768267 1.33612L2.08768 0H8V5.91232L6.64718 7.23173L6.76409 2.10438L0.868476 8Z"
				fill="currentColor"
			/>
		</svg>
	);
}

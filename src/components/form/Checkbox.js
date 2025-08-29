import { cn } from '@/lib/utils';
import { Checkbox as BaseCheckbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';

export function Checkbox({
	variant = 'default', // 'default' or 'labelBox'

	name = 'terms',
	labelText = 'Accept terms and conditions',
	description = '',

	className,
	...props
}) {
	// Dynamic container component - can be 'div' or the imported Label component
	const Container = variant === 'labelBox' ? Label : 'div';
	const containerBaseClassName = `grid grid-cols-[auto_1fr] grid-rows-[auto_auto] item-center gap-x-2 gap-y-1 [grid-template-areas:'checkbox_label'_'._description']`;
	// Conditional props based on variant
	const containerProps =
		variant === 'labelBox'
			? {
					htmlFor: name,
					className: cn(
						containerBaseClassName,
						'p-4 border rounded-md cursor-pointer',
						props.disabled && 'cursor-not-allowed border-subtle',
						!props.disabled && 'hover:bg-subtle transition-colors duration-100'
					),
				}
			: {
					className: cn(containerBaseClassName),
				};
	return (
		<Container {...containerProps}>
			<BaseCheckbox
				id={name}
				name={name}
				className={cn('[grid-area:checkbox]', className)}
				{...props}
			/>
			{variant === 'default' ? (
				<Label htmlFor={name} className="w-fit [grid-area:label]">
					{labelText}
				</Label>
			) : (
				<span className="peer-disabled:state-disabled text-sm leading-none font-medium [grid-area:label]">
					{labelText}
				</span>
			)}
			{description && (
				<p className="peer-disabled:state-disabled text-sm font-normal [grid-area:description]">
					{description}
				</p>
			)}
		</Container>
	);
}

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/Label';
import {
	RadioGroup as BaseRadioGroup,
	RadioGroupItem,
} from '@/components/ui/RadioGroup';

export function RadioGroup({
	name = 'default-radio-group',
	options = [
		{ value: 'default', label: 'Default', disabled: false },
		{ value: 'comfortable', label: 'Comfortable', disabled: false },
		{ value: 'compact', label: 'Compact', disabled: false },
	],
	defaultValue,

	className,
	...props
}) {
	// Use provided defaultValue or first option's value as fallback
	const resolvedDefaultValue = defaultValue || options[0]?.value;
	return (
		<BaseRadioGroup
			name={name}
			id={name}
			defaultValue={resolvedDefaultValue}
			className={className}
			{...props}
		>
			{options.map((option, index) => {
				const optionId = `${name}-${option.value}-${index}`;
				return (
					<div key={option.value} className="flex items-center gap-2">
						<RadioGroupItem
							value={option.value}
							id={optionId}
							disabled={option.disabled}
						/>
						<Label htmlFor={optionId}>{option.label}</Label>
					</div>
				);
			})}
		</BaseRadioGroup>
	);
}

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input as BaseInput } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function Input({
	isLabelVisible = false,
	isWithButton = false,
	isDisabled = false,

	name = 'email',
	labelText = 'Email',
	placeholder = '',
	buttonText = 'Submit',
	buttonVariant = 'default',

	className,
	...props
}) {
	return (
		<div className={'grid w-full gap-2'}>
			<Label htmlFor={name} className={!isLabelVisible && 'sr-only'}>
				{labelText}
			</Label>
			<div className="flex gap-2">
				<BaseInput
					id={name}
					name={name}
					placeholder={placeholder}
					disabled={isDisabled}
					className={className}
					{...props}
				/>
				{isWithButton && (
					<Button
						type="submit"
						variant={buttonVariant}
						disabled={isDisabled}
						className={'h-full'}
					>
						{buttonText}
					</Button>
				)}
			</div>
		</div>
	);
}

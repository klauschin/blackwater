import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Textarea as BaseTextarea } from '@/components/ui/Textarea';

export function Textarea({
	isLabelVisible = false,
	isWithButton = false,
	isDisabled = false,

	name = 'message',
	labelText = 'Your Message',
	placeholder = 'Enter your message here...',
	buttonText = 'Send message',
	buttonVariant = 'default',
	description = '',

	className,
	...props
}) {
	return (
		<div className={'grid w-full gap-2'}>
			<Label htmlFor={name} className={!isLabelVisible && 'sr-only'}>
				{labelText}
			</Label>
			<BaseTextarea
				id={name}
				name={name}
				placeholder={placeholder}
				disabled={isDisabled}
				className={className}
				{...props}
			/>
			{description && <p className="text-sm">{description}</p>}
			{isWithButton && (
				<Button
					type="submit"
					variant={buttonVariant}
					disabled={isDisabled}
					className="md:w-fit"
				>
					{buttonText}
				</Button>
			)}
		</div>
	);
}

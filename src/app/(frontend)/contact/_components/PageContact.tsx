'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/Button';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from '@/components/ui/InputGroup';

const formSchema = z.object({
	title: z
		.string()
		.min(5, 'Bug title must be at least 5 characters.')
		.max(32, 'Bug title must be at most 32 characters.'),
	description: z
		.string()
		.min(20, 'Description must be at least 20 characters.')
		.max(100, 'Description must be at most 100 characters.'),
});

interface PageContactProps {
	data?: { title?: string; description?: string };
}

export function PageContact({ data }: PageContactProps) {
	const { title, description } = data || {};

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
		},
	});

	function onSubmit(data: unknown) {
		toast('You submitted the following values:', {
			description: (
				<pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: 'bottom-right',
			classNames: {
				content: 'flex flex-col gap-2',
			},
		});
	}

	return (
		<div className="w-full sm:max-w-md m-auto flex flex-col justify-center h-main">
			<div>
				{title && <h1>{title}</h1>}
				{description && <p>{description}</p>}
			</div>
			<div>
				<form id="p-contact" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="p-contact-first-name">
										First Name
									</FieldLabel>
									<Input
										{...field}
										id="p-contact-first-name"
										aria-invalid={fieldState.invalid}
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="description"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="p-contact-description">
										Description
									</FieldLabel>
									<InputGroup>
										<InputGroupTextarea
											{...field}
											id="p-contact-description"
											placeholder="I'm having an issue with the login button on mobile."
											rows={6}
											className="min-h-24 resize-none"
											aria-invalid={fieldState.invalid}
										/>
										<InputGroupAddon align="block-end">
											<InputGroupText className="tabular-nums">
												{field.value.length}/100 characters
											</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
									<FieldDescription>
										Include steps to reproduce, expected behavior, and what
										actually happened.
									</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</div>
			<div>
				<Field orientation="horizontal">
					<Button type="button" variant="outline" onClick={() => form.reset()}>
						Reset
					</Button>
					<Button type="submit" form="p-contact">
						Submit
					</Button>
				</Field>
			</div>
		</div>
	);
}

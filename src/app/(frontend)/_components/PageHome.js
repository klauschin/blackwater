import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import PageModules from '@/components/PageModules';
import { Checkbox } from '@/components/form/Checkbox';
import { Input } from '@/components/form/Input';
import { RadioGroup } from '@/components/form/RadioGroup';
import { Select } from '@/components/form/Select';
import { Textarea } from '@/components/form/Textarea';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/Sheet';

export default function PageHome({ data }) {
	const { pageModules } = data || {};

	return (
		<div className="p-home py-section px-contain">
			{pageModules?.map((module, i) => (
				<PageModules key={`page-module-${i}`} module={module} />
			))}

			{/* TEMP: Typography */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Typography</h1>
			<div className="mb-6 space-y-4">
				<div className="t-h-1">The quick brown fox jumps over the lazy dog</div>
				<div className="t-h-2">The quick brown fox jumps over the lazy dog</div>
				<div className="t-h-3">The quick brown fox jumps over the lazy dog</div>
				<div className="t-h-4">The quick brown fox jumps over the lazy dog</div>
				<div className="t-h-5">The quick brown fox jumps over the lazy dog</div>
				<div className="t-h-6">The quick brown fox jumps over the lazy dog</div>
				<div className="t-h-7">The quick brown fox jumps over the lazy dog</div>
				<div className="t-h-8">The quick brown fox jumps over the lazy dog</div>
				<div className="t-h-9">The quick brown fox jumps over the lazy dog</div>
			</div>

			<div className="mb-6 space-y-4">
				<div className="t-b-1">Lorem ipsum dolor sit amet, consectetur.</div>
				<div className="t-b-2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</div>
				<div className="t-b-3">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</div>
				<div className="t-b-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</div>
				<div className="t-b-5">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</div>
			</div>
			<div className="space-y-4">
				<div className="t-l-1">Label Button</div>
				<div className="t-l-2">Label Button</div>
				<div className="t-l-3">Label Button</div>
			</div>

			{/* TEMP: Component Button */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Component Button</h1>
			<div className="flex flex-wrap items-center gap-2">
				<Button>Button</Button>
				<Button asChild>
					<Link href="/login">Login (Link)</Link>
				</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="underline" size="underline">
					Underline
				</Button>
				<Button variant="underlineDraw" size="underline">
					Underline Draw
				</Button>
				<Button variant="underlineHover" size="underline">
					Underline Hover
				</Button>
				<Button variant="default" size="icon">
					<ChevronRight />
				</Button>
			</div>

			{/* FIXME: Old Component Form Input, to be deleted */}
			{/* <Field name="checkbox" type="checkbox" label="I am a checkbox" />
			<Field name="input" label="First name" />
			<Field name="input" label="First name" isFloatingLabel />
			<Field name="input" label="First name" isHideLabel /> */}

			{/* TEMP: Component Form Input */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Component Input</h1>
			<div className="grid max-w-sm gap-2">
				<Input />
				<Input
					isLabelVisible
					labelText="With Label"
					id="name"
					placeholder="name"
				/>
				<Input isLabelVisible isDisabled labelText="Not Allowed" />
				<Input isLabelVisible labelText="File Type" type="file" id="picture" />
				<Input isLabelVisible isWithButton labelText="With Button" />
				<Input
					isLabelVisible
					isWithButton
					labelText="With Button (outline)"
					buttonVariant="outline"
				/>
			</div>

			{/* TEMP: Component Form Textarea */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Component Textarea</h1>
			<div className="grid max-w-lg gap-2">
				<Textarea placeholder="Type your message here." />
				<Textarea isLabelVisible labelText="Your message" name="message" />
				<Textarea
					isLabelVisible
					isDisabled
					labelText="Disabled Textarea"
					placeholder="This textarea is disabled."
				/>
				<Textarea
					isLabelVisible
					isWithButton
					labelText="With Button"
					description="Please provide your feedback."
				/>
				<Textarea
					isLabelVisible
					isWithButton
					labelText="With Button (outline)"
					buttonVariant="outline"
				/>
			</div>

			{/* TEMP: Component Form Select */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Component Select</h1>
			<div className="flex gap-2">
				<div className="grid gap-2">
					<p>Side: bottom</p>
					<Select side="bottom" />
				</div>
				<div className="grid gap-2">
					<p>Side: right</p>
					<Select side="right" />
				</div>
				<div className="grid gap-2">
					<p>hasSeparator: false</p>
					<Select hasSeparator={false} />
				</div>
				<div className="grid gap-2">
					<p>hasSeparator: false, hasScrollButtons: false</p>
					<Select hasSeparator={false} hasScrollButtons={false} />
				</div>
			</div>

			{/* TEMP: Component Form Checkbox */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Component Checkbox</h1>
			<div className="grid max-w-md gap-2">
				<div className="grid gap-2">
					<p>Default Checked:</p>
					<Checkbox name="terms" defaultChecked />
				</div>
				<div className="grid gap-2">
					<p>Disabled:</p>
					<Checkbox disabled name="terms-disabled" />
				</div>
				<div className="grid gap-2">
					<p>Variant Default:</p>
					<Checkbox
						name="terms-2"
						description="By clicking this checkbox, you agree to the terms and conditions."
					/>
				</div>
				<div className="grid gap-2">
					<p>Variant Label Box:</p>
					<Checkbox
						variant="labelBox"
						name="terms-3"
						description="By clicking this checkbox, you agree to the terms and conditions."
					/>
				</div>
				<div className="grid gap-2">
					<p>Variant Label Box (disabled):</p>
					<Checkbox
						disabled
						variant="labelBox"
						name="terms-4"
						description="By clicking this checkbox, you agree to the terms and conditions."
					/>
				</div>
			</div>

			{/* TEMP: Component Form RadioGroup */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Component RadioGroup</h1>
			<div className="flex max-w-md gap-4">
				<div className="grid shrink-0 gap-2">
					<p>Default:</p>
					<RadioGroup />
				</div>
				<div className="grid shrink-0 gap-2">
					<p>With Default Value:</p>
					<RadioGroup name="not-default" defaultValue={'compact'} />
				</div>
				<div className="grid shrink-0 gap-2">
					<p>Option Disabled:</p>
					<RadioGroup
						name="disabled-option"
						options={[
							{ value: 'default', label: 'Default', disabled: false },
							{ value: 'comfortable', label: 'Comfortable', disabled: false },
							{ value: 'compact', label: 'Compact', disabled: true },
						]}
					/>
				</div>
				<div className="grid shrink-0 gap-2">
					<p>Group Disabled:</p>
					<RadioGroup name="disabled-group" disabled />
				</div>
			</div>

			{/* TEMP: Component Accordion */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Component Accordion</h1>
			<Accordion type="single" collapsible className="grid gap-2">
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-2">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* TEMP: Component Sheet */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Component Sheet</h1>
			<div className="flex flex-wrap gap-2">
				{['top', 'right', 'bottom', 'left'].map((side) => {
					const content = {
						top: "That you want to see what's up here? Well, you found the secret stash of dad jokes! Why don't scientists trust atoms? Because they make up everything! 🧪😄",
						right:
							"You're ready to venture to the right side of things? Fun fact: Most people are right-handed, but did you know kangaroos are left-handed? 🦘👈",
						bottom:
							"You want to dig to the bottom of this? Here's a deep thought: If you're waiting for the waiter, aren't you the waiter? 🤔🍽️",
						left: "You're going left? That's right! I mean... that's correct! Here's a leftie fact: Left-handed people are better at multitasking! 🧠✨",
					};

					return (
						<Sheet key={side}>
							<SheetTrigger
								asChild
								aria-label={`Open ${side.charAt(0).toUpperCase() + side.slice(1)} Sheet`}
							>
								<Button>
									{side.charAt(0).toUpperCase() + side.slice(1)} Sheet
								</Button>
							</SheetTrigger>
							<SheetContent side={side}>
								<SheetHeader>
									<SheetTitle>Are you absolutely sure?</SheetTitle>
									<SheetDescription>{content[side]}</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					);
				})}
			</div>
			{/* TEMP: Component Dialog */}
			<h1 className="t-h-3 lg:t-h-1 mt-5 mb-2">Component Dialog</h1>
			<Dialog>
				<DialogTrigger asChild>
					<Button>Open</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This is your last chance to turn back! Beyond this dialog lies a
							world where buttons have feelings, components come to life, and
							CSS animations dance in perfect harmony. There&apos;s no going
							back once you&apos;ve seen the beauty of well-crafted UI
							components. Are you brave enough to continue?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button>Close</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

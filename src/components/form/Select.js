import {
	Select as BaseSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';

export function Select({
	hasSeparator = true,
	hasScrollButtons = true,

	side = 'bottom',
	placeholder = 'Select an option',
	name = 'technology',
	options = [
		{
			groupLabel: 'Popular',
			values: [
				{ value: 'react', label: 'React' },
				{ value: 'vue', label: 'Vue.js' },
				{ value: 'angular', label: 'Angular' },
			],
		},
		{
			groupLabel: 'Backend',
			values: [
				{ value: 'nodejs', label: 'Node.js' },
				{ value: 'python', label: 'Python' },
				{ value: 'java', label: 'Java' },
				{ value: 'go', label: 'Go' },
			],
		},
		{
			groupLabel: '',
			values: [
				{ value: 'react-native', label: 'React Native' },
				{ value: 'flutter', label: 'Flutter' },
				{ value: 'swift', label: 'Swift' },
				{ value: 'kotlin', label: 'Kotlin' },
			],
		},
		{
			groupLabel: 'Database',
			values: [
				{ value: 'postgresql', label: 'PostgreSQL' },
				{ value: 'mongodb', label: 'MongoDB' },
				{ value: 'mysql', label: 'MySQL' },
				{ value: 'redis', label: 'Redis' },
			],
		},
		{
			groupLabel: '',
			values: [
				{ value: 'aws', label: 'Amazon Web Services' },
				{ value: 'azure', label: 'Microsoft Azure' },
				{ value: 'gcp', label: 'Google Cloud Platform' },
				{ value: 'vercel', label: 'Vercel' },
				{ value: 'netlify', label: 'Netlify' },
			],
		},
	],

	className,
	...props
}) {
	return (
		<BaseSelect id={name} name={name} className={className} {...props}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent side={side} hasScrollButtons={hasScrollButtons}>
				{options.map((group, groupIndex) => (
					<SelectGroup key={groupIndex}>
						{groupIndex > 0 && hasSeparator && <SelectSeparator />}
						<SelectLabel>{group.groupLabel}</SelectLabel>
						{group.values.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				))}
			</SelectContent>
		</BaseSelect>
	);
}

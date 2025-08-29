import * as React from 'react';
import { hasArrayValue } from '@/lib/utils';
import clsx from 'clsx';

const Select = React.forwardRef(({ options, className, ...props }, ref) => {
	if (!hasArrayValue(options)) return null;
	return (
		<select className={clsx(className)} ref={ref} {...props}>
			{options.map((item, index) => {
				const { value, title, isDefault } = item || {};
				const optionTitle = title || value;

				return (
					<option key={index} disabled={isDefault} value={item.value}>
						{optionTitle}
					</option>
				);
			})}
		</select>
	);
});

Select.displayName = 'Select';

export default Select;

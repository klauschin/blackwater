import React, { useId } from 'react';
import { fadeAnim } from '@/lib/animate';
import { hasArrayValue, slugify } from '@/lib/utils';
import clsx from 'clsx';
import { AnimatePresence, m } from 'motion/react';

const FieldTypes = {
	SELECT: 'select',
	TEXTAREA: 'textarea',
	CHECKBOX: 'checkbox',
};

const Label = ({ isHideLabel, id, label, name }) => (
	<label
		className={clsx({
			'screen-reader-only': isHideLabel,
		})}
		htmlFor={id}
	>
		{label || name}
	</label>
);

export default function Field({
	name,
	type = 'text',
	label,
	placeholder,
	className,
	hasValue,
	errors,
	isHideLabel,
	isFloatingLabel,
	disabled,
	register,
	rules,
	selectOptions,
}) {
	const id = useId();
	const isLabelAtTop = !isFloatingLabel && type !== FieldTypes.CHECKBOX;

	const renderField = () => {
		switch (type) {
			case FieldTypes.SELECT:
				return (
					<select
						name={name}
						id={id}
						className={clsx({
							'is-contain-value': hasValue,
						})}
						disabled={disabled}
						{...(register ? register(name) : {})}
					>
						{hasArrayValue(selectOptions) &&
							selectOptions.map(({ _key, option }) => (
								<option key={_key} value={slugify(option)}>
									{option}
								</option>
							))}
					</select>
				);
			case FieldTypes.TEXTAREA:
				return (
					<textarea
						name={name}
						id={id}
						className={clsx({
							'is-contain-value': hasValue,
						})}
						placeholder={placeholder}
						disabled={disabled}
						{...(register ? register(name, rules) : {})}
					/>
				);
			case FieldTypes.CHECKBOX:
				return (
					<input
						type="checkbox"
						name={name}
						id={id}
						disabled={disabled}
						{...(register ? register(name) : {})}
					/>
				);
			default:
				return (
					<input
						type={type}
						name={name}
						id={id}
						className={clsx({
							'is-contain-value': hasValue,
						})}
						placeholder={placeholder}
						disabled={disabled}
						{...(register ? register(name, rules) : {})}
					/>
				);
		}
	};

	return (
		<div
			className={clsx('field', className, {
				'is-error': errors && errors[name],
				'is-floating-label': !isLabelAtTop,
			})}
		>
			{isLabelAtTop && (
				<Label isHideLabel={isHideLabel} id={id} label={label} name={name} />
			)}
			{renderField()}
			{!isLabelAtTop && (
				<Label isHideLabel={isHideLabel} id={id} label={label} name={name} />
			)}

			<AnimatePresence>
				{errors?.[name] && (
					<m.p
						initial="hide"
						animate="show"
						exit="hide"
						variants={fadeAnim}
						className="error-message"
					>
						{errors[name].message || 'Required field'}
					</m.p>
				)}
			</AnimatePresence>
		</div>
	);
}

import React from 'react';
import clsx from 'clsx';

export const DotButton = (props) => {
	const { selected, onClick } = props;

	return (
		<button
			type="button"
			onClick={onClick}
			className={clsx('c-carousel__dot', {
				'is-selected': selected,
			})}
		/>
	);
};

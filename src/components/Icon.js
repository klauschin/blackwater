import React from 'react';

const Icon = ({
	type = 'close',
	size = 0.75,
	thickness = '1px',
	color = 'currentColor',
	className = '',
}) => {
	// Create style object directly instead of using Tailwind classes for dimensions
	const styleObj = {
		'--icon-thickness':
			typeof thickness === 'string' ? thickness : `${thickness}px`,
		'--icon-color': color,
		width: typeof size === 'number' ? `${size}em` : size,
		height: typeof size === 'number' ? `${size}em` : size,
	};

	// Common styles for all icons except triangles
	const baseStyles = `relative inline-block`;

	// Triangle icons use a different approach with borders
	if (type.startsWith('triangle')) {
		const triangleSize = typeof size === 'number' ? size : parseFloat(size);
		const triangleBaseSize = triangleSize * 0.75;

		// Set up common triangle styles
		const triangleStyles = {
			display: 'inline-block',
			width: 0,
			height: 0,
			borderStyle: 'solid',
			color: color,
		};

		switch (type) {
			case 'triangle-left':
				return (
					<span
						className={`inline-block transition-transform duration-200 ${className}`}
						style={{
							...triangleStyles,
							borderWidth: `${triangleBaseSize}em ${triangleBaseSize}em ${triangleBaseSize}em 0`,
							borderColor: `transparent ${color} transparent transparent`,
						}}
					/>
				);
			case 'triangle-right':
				return (
					<span
						className={`inline-block transition-transform duration-200 ${className}`}
						style={{
							...triangleStyles,
							borderWidth: `${triangleBaseSize}em 0 ${triangleBaseSize}em ${triangleBaseSize}em`,
							borderColor: `transparent transparent transparent ${color}`,
						}}
					/>
				);
			case 'triangle-up':
				return (
					<span
						className={`inline-block transition-transform duration-200 ${className}`}
						style={{
							...triangleStyles,
							borderWidth: `0 ${triangleBaseSize}em ${triangleBaseSize}em ${triangleBaseSize}em`,
							borderColor: `transparent transparent ${color} transparent`,
						}}
					/>
				);
			case 'triangle-down':
				return (
					<span
						className={`inline-block transition-transform duration-200 ${className}`}
						style={{
							...triangleStyles,
							borderWidth: `${triangleBaseSize}em ${triangleBaseSize}em 0 ${triangleBaseSize}em`,
							borderColor: `${color} transparent transparent transparent`,
						}}
					/>
				);
		}
	}

	return (
		<span
			className={`${baseStyles} ${className}`}
			style={styleObj}
			data-icon-type={type}
		/>
	);
};

export default Icon;

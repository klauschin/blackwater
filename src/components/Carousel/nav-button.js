import React from 'react';

export const PrevButton = ({ enabled, onClick }) => (
	<button
		type="button"
		className="c-carousel__button c-carousel__button--prev"
		aria-label="Navigate to the previous slide"
		onClick={onClick}
		disabled={!enabled}
	>
		<div className="icon-arrow-left" />
	</button>
);

export const NextButton = ({ enabled, onClick }) => (
	<button
		type="button"
		className="c-carousel__button c-carousel__button--next"
		aria-label="Navigate to the next slide"
		onClick={onClick}
		disabled={!enabled}
	>
		<div className="icon-arrow-right" />
	</button>
);

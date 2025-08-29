import { RefObject, MouseEvent, useEffect } from 'react';

// Define a type for the ref parameter, which can be a single RefObject or an array of RefObjects
type Refs = RefObject<HTMLElement | null>[] | RefObject<HTMLElement | null>;

export default function useOutsideClick(ref: Refs, callBackFunc: () => void) {
	useEffect(() => {
		function handleClickOutside(e: any) {
			const refs = Array.isArray(ref) ? ref : [ref];
			const refsClicked = refs.filter((el) => {
				return el?.current && el?.current.contains(e.target);
			});

			if (refsClicked.length == 0) {
				callBackFunc();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [ref, callBackFunc]);
}

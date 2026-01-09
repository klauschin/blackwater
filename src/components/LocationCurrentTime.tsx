'use client';
import { useState, useEffect } from 'react';
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

export function LocationCurrentTime() {
	const [time, setTime] = useState(new Date());
	const [showColon, setShowColon] = useState(true);
	useEffect(() => {
		const timerId = setInterval(() => {
			setTime(new Date());
			setShowColon((prev) => !prev);
		}, 1000);

		return () => clearInterval(timerId);
	}, []);

	const tzDate = new TZDate(time, 'Asia/Singapore');
	const formattedTime = format(tzDate, 'iiii, p');
	const timeWithFlashingColon = formattedTime.replace(
		/:/g,
		showColon ? ':' : ' '
	);
	return <time>{timeWithFlashingColon}</time>;
}

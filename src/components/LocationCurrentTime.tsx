'use client';
import { useState, useEffect } from 'react';
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

export function LocationCurrentTime() {
	const [time, setTime] = useState<Date | null>(null);
	const [showColon, setShowColon] = useState(true);
	useEffect(() => {
		setTime(new Date());
		const timerId = setInterval(() => {
			setTime(new Date());
			setShowColon((prev) => !prev);
		}, 1000);

		return () => clearInterval(timerId);
	}, []);

	if (!time) return null;

	const tzDate = new TZDate(time, 'Asia/Singapore');
	const formattedTime = format(tzDate, 'iiii, p');
	const timeWithFlashingColon = formattedTime.replace(
		/:/g,
		showColon ? ':' : ' '
	);
	return <time>{timeWithFlashingColon}</time>;
}

'use client';
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

export function LocationCurrentTime() {
	const now = new Date();
	const tzDate = new TZDate(now, 'Asia/Singapore');
	return <time>{format(tzDate, 'iiii, p')}</time>;
}

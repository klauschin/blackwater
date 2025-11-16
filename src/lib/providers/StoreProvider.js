'use client';

import { useMemo } from 'react';
import { makeStore } from '@/store';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }) {
	const store = useMemo(() => makeStore(), []);

	return <Provider store={store}>{children}</Provider>;
}

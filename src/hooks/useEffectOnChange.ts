/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';

export const useEffectOnChange = (callback: () => any, dependencies: any[]) => {
	const initial = useRef(true);
	useEffect(() => {
		if (initial.current) {
			initial.current = false;
			return;
		}
		return callback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);
};

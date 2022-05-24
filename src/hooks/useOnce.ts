import { useEffect, useRef } from 'react';

export const useOnce = (callback: () => any, dependencies: any[]) => {
	const once = useRef(true);
	useEffect(() => {
		if (!once.current) {
			return;
		}
		once.current = false;
		return callback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);
};

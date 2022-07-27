/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';

//防止useEffect重复执行
export const useEffectOnChange = (callback: () => any, dependencies: any[]) => {
	const initial = useRef(true);
	useEffect(() => {
		if (initial.current) {
			initial.current = false;
			return;
		}
		return callback();
	}, dependencies);
};

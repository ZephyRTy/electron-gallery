import { useEffect, useRef } from 'react';

//仅在组件初始化时执行一次
export const useOnce = (callback: () => any, dependencies: any[]) => {
	const once = useRef(true);
	useEffect(() => {
		if (!once.current) {
			return;
		}
		once.current = false;
		return callback();
	}, dependencies);
};

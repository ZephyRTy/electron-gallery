/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { MysqlOperator } from './mysqlOperator';
export const useMysql = (
	page: number,
	setState: React.Dispatch<React.SetStateAction<string[]>>,
	searchParam: string | null
) => {
	const mysqlOperator = MysqlOperator.getInstance();
	let count = mysqlOperator.count;
	let sqlParam: number[] = [count - page * 20 + 1, count - (page - 1) * 20];
	useEffect(() => {
		if (!searchParam) {
			mysqlOperator.select(sqlParam).then((result: any) => {
				setState(result);
			});
		} else {
			mysqlOperator.search(searchParam).then((result: any) => {
				let len = result.length;
				setState(
					result.slice(len - page * 20 + 1, len - (page - 1) * 20)
				);
			});
		}
	}, [page]);
	useEffect(() => {
		return () => {
			mysqlOperator.end();
		};
	}, []);
	return mysqlOperator;
};

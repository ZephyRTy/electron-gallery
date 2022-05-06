/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { MysqlOperator } from './mysqlOperator';
export const useMysql = (
	page: number,
	setState: React.Dispatch<React.SetStateAction<string[]>>,
	setTotal: React.Dispatch<React.SetStateAction<number>>,
	searchParam: string | null
) => {
	const mysqlOperator = MysqlOperator.getInstance();

	useEffect(() => {
		mysqlOperator.getCount().then((count: any) => {
			let sqlParam: number[] = [
				count - page * 20 + 1,
				count - (page - 1) * 20
			];
			let total = count;
			if (typeof searchParam !== 'string') {
				mysqlOperator.select(sqlParam).then((result: any) => {
					setState(result);
					setTotal(total);
				});
			} else {
				mysqlOperator.search(searchParam).then((result: any) => {
					total = result.length;
					setState(
						result.slice(
							total - page * 20 + 1,
							total - (page - 1) * 20
						)
					);
					setTotal(total);
				});
			}
		});
	}, [page]);
	useEffect(() => {
		MysqlOperator.getInstance();
		return () => {
			mysqlOperator.end();
		};
	}, []);
	return mysqlOperator;
};

import { useState } from 'react';
import { useOnce } from '../../../hooks/useOnce';
import { Book } from '../../../types/global';
import { readerOperator } from '../../../utils/readerOperator';
import { SidebarContainer } from '../../Menu';
import { ReaderMenu } from '../ReaderMenu';
import styles from '../style/bookshelf.module.scss';
import { ShelfRow } from './ShelfRow';
const fs = window.require('fs');
const path = window.require('path');
const root = 'D:\\小说';
const ROW_NUM = 5;
const ITEM_NUM_OF_ROW = 4;
export const Bookshelf = () => {
	const [rows, setRows] = useState(new Array(ROW_NUM).fill([]) as Book[][]);
	useOnce(() => {
		readerOperator.load();
		fs.readdir(root, (err, files) => {
			const list: string[] = files
				.filter((file) => file.endsWith('.txt'))
				.slice(0, ROW_NUM * ITEM_NUM_OF_ROW);
			if (!err) {
				const newRows = new Array(ROW_NUM);
				for (let i = 0; i < ROW_NUM; i++) {
					newRows[i] = [];
				}
				for (let i = 0; i < ROW_NUM * ITEM_NUM_OF_ROW; ++i) {
					newRows[i % ROW_NUM].push({
						title: list[i]
							.replace('.txt', '')
							.replace('soushu2022.com@', '')
							.replace('-soushu555.org-[搜书吧网址]', '')
							.replace('www.soushu555.org', ''),
						path: path.join(root, list[i])
					});
				}
				setRows([...newRows]);
			}
		});
	}, []);
	return (
		<div className={styles['bookshelf'] + ' main-content'}>
			<SidebarContainer>
				<ReaderMenu />
			</SidebarContainer>
			{rows.map((e, i) => {
				return <ShelfRow bookItems={e} key={i} />;
			})}
		</div>
	);
};

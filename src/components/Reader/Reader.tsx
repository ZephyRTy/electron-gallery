import { useEffect } from 'react';
import { useOnce } from '../../hooks/useOnce';
import { ReaderMenu, SidebarContainer } from '../Gallery/Menu';
import { ScrollContent } from './ScrollContent';
import styles from './style/content.module.scss';
const effect = window.location.href.includes('localhost') ? useOnce : useEffect;
export const Reader = () => {
	return (
		<main className={styles['reader'] + ' main-content'}>
			<SidebarContainer>
				<ReaderMenu />
			</SidebarContainer>
			<ScrollContent />
		</main>
	);
};

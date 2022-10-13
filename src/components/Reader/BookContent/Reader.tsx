import { SidebarContainer } from '../../Menu';
import { ReaderMenu } from '../ReaderMenu';
import styles from '../style/reader.module.scss';
import { BookContent } from './Content';
export const Reader = () => {
	return (
		<main className={styles['reader'] + ' main-content'}>
			<SidebarContainer>
				<ReaderMenu />
			</SidebarContainer>
			<BookContent />
		</main>
	);
};

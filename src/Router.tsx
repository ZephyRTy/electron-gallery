import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Gallery } from './components/Gallery/Gallery';
import { PackDetail } from './components/Gallery/PackDetail';
import { FileOperator } from './utils/fileOperator';
export const MainRouter = () => {
	useEffect(() => {
		return () => {
			FileOperator.getInstance().missingUpdated();
		};
	}, []);

	return (
		<HashRouter>
			<Routes>
				<Route element={<Gallery />} path="/">
					<Route element={<Gallery />} path="gallery" />
				</Route>
				<Route
					element={<PackDetail />}
					path="gallery/pack/:pack"
				></Route>
				<Route element={<Gallery />} index />
			</Routes>
		</HashRouter>
	);
};

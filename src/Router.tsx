import { HashRouter, Route, Routes } from 'react-router-dom';
import { Gallery } from './components/Gallery/Gallery';
import { PackDetail } from './components/Gallery/PackDetail';
export const MainRouter = () => {
	return (
		<HashRouter>
			<Routes>
				<Route element={<Gallery />} path="/">
					<Route element={<Gallery />} path="gallery/:page"></Route>
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

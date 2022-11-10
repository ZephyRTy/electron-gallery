import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import { Header } from './components/Header';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MainRouter } from './Router';
const root = createRoot(document.getElementById('root')!);
root.render(
	<React.StrictMode>
		<Header />
		<MainRouter />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

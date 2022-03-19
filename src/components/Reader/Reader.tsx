import React, { useEffect } from 'react';
import './style/text.scss';

let flag = false;
const { ipcRenderer } = window.require('electron');
const fs = window.require('fs');
const dialog = window.require('@electron/remote').dialog;
export function Reader() {
	let [text, setText] = React.useState('');
	let [fileName, setFileName] = React.useState('');
	let textarea = React.useRef(null);
	let span = React.useRef(null);
	useEffect(() => {
		ipcRenderer.on('action', (event: any, arg: string) => {
			if (flag) {
				return;
			}
			if (arg === 'open') {
				flag = true;
				dialog
					.showOpenDialog({
						filters: [{ name: 'Text', extensions: ['txt'] }]
					})
					.then((res: { filePaths: string[] }) => {
						let decoderUTF8 = new TextDecoder();
						let decoderGBK = new TextDecoder('gbk');
						if (!res.filePaths.length) {
							return;
						}
						setFileName(res.filePaths[0]);
						let fileContent = fs.readFileSync(res.filePaths[0]);
						document.title = res.filePaths[0];
						let content = decoderUTF8.decode(
							new Uint8Array(fileContent)
						);
						if (content.search('\uFFFD') !== -1) {
							content = decoderGBK.decode(
								new Uint8Array(fileContent)
							);
						}
						fileContent = '';
						content = content.replace(/\n/g, '<br>');
						setText(content);
					});
			} else if (arg === 'save') {
				flag = true;
				let encoder = new TextEncoder();
				let content = text.replace(/<br>/g, '\n');
				let fileContent = encoder.encode(content);
				fs.writeFileSync(String.raw`${fileName}`, fileContent);
			}
			flag = false;
		});
		return () => {
			ipcRenderer.removeAllListeners('action');
			document.title = 'My Editor';
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		(span.current as any).scrollIntoView(true);
	}, [fileName]);
	// useEffect(() => {
	// 	console.log('change');
	// }, [text]);
	return (
		<div className={'box'}>
			<span ref={span}></span>
			<div
				ref={textarea}
				contentEditable={true}
				className={'textarea'}
				suppressContentEditableWarning
				dangerouslySetInnerHTML={{ __html: text }}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						console.log(window.getSelection()?.anchorNode);
						console.log(window.getSelection()?.getRangeAt(0));
					}
				}}
				onCompositionStart={(e) => {
					console.log('start');
					console.log(e);
				}}
				onCompositionEnd={(e) => {
					console.log('end');
					console.log(e);
				}}
				// onInput={(e) => {
				// 	console.log(e);
				// 	setText(text);
				// }}
			></div>
		</div>
	);
}

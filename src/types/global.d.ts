declare module '*.module.scss' {
	const styles: any;
	export default styles;
}
declare module '*.svg' {
	const icon: any;
	export default icon;
}
export type Data = {
	title: string;
	stared: boolean;
	index: number;
	cover: string;
	path: string;
};
export type Bookmark = Data & {
	timeStamp: string;
	url: string;
};

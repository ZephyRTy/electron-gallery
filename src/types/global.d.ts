/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
declare module '*.module.scss' {
	const styles: any;
	export default styles;
}
declare module '*.svg' {
	const icon: any;
	const ReactComponent: any;
	export { ReactComponent };
	export default icon;
}

declare module 'sq3' {
	const sq3: any;
	const Database: any;
	export default sq3;
	export { Database };
}

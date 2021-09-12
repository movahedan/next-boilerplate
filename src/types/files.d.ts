/* eslint-disable import/no-default-export */

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.scss' {
	const content: Record<string, string>;
	export default content;
}

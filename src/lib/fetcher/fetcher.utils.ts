let defaultConfig: RequestInit = {};
export const getDefaultConfig = (config?: RequestInit) => ({
	...defaultConfig,
	...(config || {}),
});
export const setDefaultConfig = (config: RequestInit) => {
	defaultConfig = config;
};

type ErrorHandler = <Data>(
	error: Error,
	ongoingRequest: { url: string; config: RequestInit }
) => Promise<Data>;
let errorHandler: ErrorHandler = (error) => {
	throw error;
};
export const setErrorHandler = (callback: typeof errorHandler) => {
	errorHandler = callback;
};
export const getErrorHandler = () => errorHandler;

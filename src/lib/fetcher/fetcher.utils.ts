import type { ErrorHandler } from './fetcher.types';

let defaultConfig: RequestInit = {};
export const getDefaultConfig = (config?: RequestInit) => ({
	...defaultConfig,
	...(config || {}),
});
export const setDefaultConfig = (config: RequestInit) => {
	defaultConfig = config;
};

let errorHandler: ErrorHandler = (error) => {
	throw error;
};
export const setErrorHandler = (callback: typeof errorHandler) => {
	errorHandler = callback;
};
export const getErrorHandler = () => errorHandler;

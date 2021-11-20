import {
	getErrorHandler,
	setErrorHandler,
	getDefaultConfig,
	setDefaultConfig,
} from './fetcher.utils';

export const fetcher = async <Data = unknown>(
	url: string,
	configProps?: RequestInit
): Promise<Data> => {
	const config = getDefaultConfig(configProps);

	return fetch(url, config)
		.then((res) => {
			if (res.ok) return res.json();

			throw {
				name: String(res.status),
				message: res.statusText,
				stack: res.url,
				apiError: res,
			} as Error;
		})
		.catch((error: Error) => {
			const errorHandler = getErrorHandler();
			const ongoingRequest = { url, config };

			return errorHandler<Data>(error, ongoingRequest);
		});
};

fetcher.setDefaultConfig = setDefaultConfig;
fetcher.setErrorHandler = setErrorHandler;

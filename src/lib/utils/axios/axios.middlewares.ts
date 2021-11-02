import { captureException } from '@sentry/minimal';
import { Severity } from '@sentry/types';

import type { AxiosClientConfigProps } from './axios.d';

// TODO rotationHandler
// TODO rotationQueue
// TODO toLogoutPage
const rotationHandler = async () => new Promise<void>((res) => res());
const toLogoutPage = async (asPath?: string) =>
	new Promise<string | undefined>((res) => res(asPath));

const maxRetry = 10;
let retryCounter = 0;
export const axiosClientErrorMiddleware =
	({ asPath }: AxiosClientConfigProps) =>
	async (requestPayload: {
		response: { status: number };
	}): Promise<unknown> => {
		const { response } = requestPayload;

		if (!response) {
			// toastNetworkError();
		} else {
			const { status } = response;

			if (status === 401) {
				if (retryCounter < maxRetry) {
					retryCounter++;

					return await rotationHandler();
				} else {
					captureException(requestPayload, {
						level: Severity.Critical,
					});
					toLogoutPage(asPath);
				}
			} else if (status === 500) {
				// if (global.window) toast500();
				captureException(requestPayload, {
					level: Severity.Critical,
				});
			} else if (status === 502) {
				// if (global.window) toast502();
			} else if (status === 403) {
				// if (global.window) toast403();
			}
		}

		return Promise.reject(requestPayload);
	};

export const axiosServerErrorMiddleware =
	() =>
	async (requestPayload: { response: { status: number } }): Promise<unknown> =>
		Promise.reject(requestPayload);

import { fetcher } from 'lib/fetcher';

import type { ErrorHandler } from 'lib/fetcher';
import type { GetServerSidePropsContext } from 'next';
import type { Dispatch } from 'react';

export type FetcherConfig = (
	dispatcher: Dispatch<unknown>,
	req?: GetServerSidePropsContext['req'],
	res?: GetServerSidePropsContext['res']
) => void;

export const fetcherConfig: FetcherConfig = (dispatcher) => {
	fetcher.setDefaultConfig({ credentials: 'include' });
	fetcher.setErrorHandler(errorHandler(dispatcher));
};

type Dispatcher = Parameters<FetcherConfig>[0];
type ConfigErrorHandler = (dispatcher: Dispatcher) => ErrorHandler;

const errorHandler: ConfigErrorHandler =
	(dispatcher) => (error, ongoingRequest) => {
		try {
			if (error.apiError?.status === 401) {
				return notAuthorizeHandler(dispatcher)(error, ongoingRequest);
			}

			throw error;
		} catch (e) {
			console.error(error);
			throw error;
		}
	};

const notAuthorizeHandler: ConfigErrorHandler = (dispatcher) => (error) => {
	// In case of you want to clear profile after a none successful rotation
	dispatcher(false);

	throw error;
};

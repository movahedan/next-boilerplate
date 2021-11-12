import dynamic from 'next/dynamic';

import { waitForMilliseconds } from './wait-for-milliseconds';

import type { Loader } from 'next/dynamic';
import type { ComponentType } from 'react';

export const delayImport = <P = unknown>(
	importCallback: Loader<P>,
	timeout = 150
): ComponentType<P> =>
	dynamic<P>(
		waitForMilliseconds(timeout).then(() =>
			typeof importCallback === 'function' ? importCallback() : importCallback
		),
		{
			ssr: false,
		}
	);

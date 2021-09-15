import { withSentry } from '@sentry/nextjs';

import { dbConnect } from 'lib/mongodb/mongodb';

import type { NextApiHandler } from 'next';

export const withDefaultMiddlewares = (handler: NextApiHandler) =>
	withSentry(async (...props: Parameters<NextApiHandler>) => {
		await dbConnect();

		return handler(...props);
	});

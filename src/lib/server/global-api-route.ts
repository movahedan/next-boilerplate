import { withSentry } from '@sentry/nextjs';

import { dbConnect } from 'lib/db/setup';

import type { NextApiHandler } from 'next';

export const globalApiHanlder = (handler: NextApiHandler) =>
	withSentry(async (...props: Parameters<NextApiHandler>) => {
		await dbConnect();

		return handler(...props);
	});

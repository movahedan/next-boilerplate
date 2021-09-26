import { withSentry } from '@sentry/nextjs';

import type { NextApiHandler } from 'next';

export const globalApiHanlder = (handler: NextApiHandler) =>
	withSentry(async (...props: Parameters<NextApiHandler>) => handler(...props));

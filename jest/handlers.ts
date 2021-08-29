import { rest } from 'msw';

import { mockedData } from './mocks';

// local server example only - to test that 'an' API call will be intercepted
export const handlers = [
	rest.get('http://localhost:3004/result', (req, res, ctx) => {
		return res(ctx.json(mockedData));
	}),
];

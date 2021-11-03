import { waitFor } from '@testing-library/dom';

import { waitForMilliseconds } from './wait-for-milliseconds';

it('waitForMilliseconds should resolve 1 after given milliseconds', async () => {
	const timeout = 10;
	const result = await waitFor(() => waitForMilliseconds(timeout));

	expect(result).toBe(1);
});

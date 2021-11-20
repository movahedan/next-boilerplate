import { renderHook } from '@testing-library/react-hooks';

import { useAliveRef } from './use-alive-ref';

describe('useAliveRef', () => {
	it('should have isAlive status of component', () => {
		const { result, unmount } = renderHook(() => useAliveRef());

		expect(result.current).toStrictEqual({ current: true });
		unmount();
		expect(result.current).toStrictEqual({ current: false });
	});
});

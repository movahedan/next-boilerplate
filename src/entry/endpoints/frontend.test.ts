import { frontendEndpoints } from '.';

describe('frontend endpoints', () => {
	it('should generate correct endpoint', () => {
		const endpoint = frontendEndpoints.products.detail(1);
		expect(endpoint).toBe('/products/1');
	});
});

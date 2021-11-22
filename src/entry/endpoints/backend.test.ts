import { backendEndpoints } from './backend';

describe('backend endpoints', () => {
	it('should generate correct endpoint', () => {
		const endpoint = backendEndpoints.sample({ sortBy: 'asc' });
		expect(endpoint).toBe('http://localhost:3001/sample?sortBy=asc');
	});
});

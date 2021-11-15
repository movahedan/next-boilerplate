import {
	getDefaultConfig,
	getErrorHandler,
	setDefaultConfig,
	setErrorHandler,
} from './fetcher.utils';

describe('Fetcher config', () => {
	it('should have a getter', () => {
		const config = getDefaultConfig();

		expect(config).toStrictEqual({});
	});

	it('config getter should accept properties to attach to the fetch', () => {
		const config = getDefaultConfig({ key: 'value' } as RequestInit);

		expect(config).toStrictEqual({ key: 'value' });
	});

	it('should have a setter', () => {
		setDefaultConfig({ key: 'value' } as RequestInit);
		const config = getDefaultConfig();

		expect(config).toStrictEqual({ key: 'value' });
	});
});

describe('Fetcher error handler', () => {
	const sampleError = {
		name: 'error name',
		message: 'error message',
		stack: 'error stack',
	};

	it('should have a getter', () => {
		const errorHandler = getErrorHandler();

		expect(() =>
			errorHandler(sampleError, { url: '', config: {} })
		).toThrowError(sampleError);
	});

	it('should have a setter', () => {
		setErrorHandler((error) => {
			throw {
				...error,
				foo: 'bar',
			};
		});

		const errorHandler = getErrorHandler();

		expect(
			() => errorHandler(sampleError, { url: '', config: {} })
			// @ts-expect-error custom error testing
		).toThrowError({ ...sampleError, foo: 'bar' });
	});
});

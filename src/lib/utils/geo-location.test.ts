import { getGeoLocation } from './geo-location';

describe('getGeoLocation', () => {
	it('returns the users current position', async () => {
		const { getCurrentPosition } = window.navigator.geolocation;
		const coords = { longitude: 123, latitude: 456 };

		(getCurrentPosition as jest.Mock).mockImplementationOnce((success) => {
			success({ coords });
		});

		expect(await getGeoLocation()).toStrictEqual(coords);
	});

	it('returns null', async () => {
		const { getCurrentPosition } = window.navigator.geolocation;
		(getCurrentPosition as jest.Mock).mockImplementationOnce((_, error) => {
			error();
		});

		expect(await getGeoLocation()).toBeNull();
	});
});

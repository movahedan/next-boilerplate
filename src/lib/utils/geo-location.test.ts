import { getGeoLocation } from './geo-location';

describe('getGeoLocation', () => {
	it('returns the users current position', async () => {
		const mockGeoLocation = global.navigator.geolocation;
		const coords = { longitude: 123, latitude: 456 };

		(mockGeoLocation.getCurrentPosition as jest.Mock).mockImplementationOnce(
			(success) => {
				success({ coords });
			}
		);

		expect(await getGeoLocation()).toStrictEqual(coords);
	});

	it('returns null', async () => {
		const mockGeoLocation = global.navigator.geolocation;
		(mockGeoLocation.getCurrentPosition as jest.Mock).mockImplementationOnce(
			(_, error) => {
				error();
			}
		);

		expect(await getGeoLocation()).toBeNull();
	});
});

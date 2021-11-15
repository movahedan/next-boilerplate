type GeoLocation = {
	longitude: number;
	latitude: number;
} | null;

export const getGeoLocation = (): Promise<GeoLocation> =>
	new Promise<GeoLocation>((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					longitude: position.coords.longitude,
					latitude: position.coords.latitude,
				});
			},
			() => {
				// Fail silently
				resolve(null);
			}
		);
	});

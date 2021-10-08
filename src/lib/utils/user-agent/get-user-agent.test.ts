import { getUserAgent } from '.';

it('get-user-agent should return proper user-agent', () => {
	const sampleServerUa =
		'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0';
	const sampleWindowUa =
		'Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.7.0';

	expect(getUserAgent()).toEqual(sampleWindowUa);

	expect(
		getUserAgent({
			headers: {
				'user-agent': sampleServerUa,
			},
		})
	).toEqual(sampleServerUa);

	expect(
		getUserAgent({
			headers: undefined,
		})
	).toEqual(sampleWindowUa);
});

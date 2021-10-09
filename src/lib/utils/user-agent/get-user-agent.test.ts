import { getUserAgent } from './get-user-agent';

it('get-user-agent should return proper user-agent', () => {
	const sampleServerUa =
		'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0';

	const req = {
		headers: {
			'user-agent': sampleServerUa,
		},
	};

	// @ts-expect-error Mocking purpose
	expect(getUserAgent(req)).toEqual(sampleServerUa);
	// @ts-expect-error Mocking purpose
	expect(getUserAgent({ headers: undefined })).toEqual('');
});

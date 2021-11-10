import { parseUrl, stringifyUrl } from './urls';

describe('routing utils', () => {
	it('parseUrl', async () => {
		const urlForTest =
			'/some-page?querynumber=1&querynumberarray=21&querynumberarray=22&querystring=hello&queryboolean=true&queryemptyarray&queryemptyarray&queryemptystring';
		let { url, query } = parseUrl(urlForTest);

		expect(url).toEqual('/some-page');
		expect(query).toEqual({
			querynumber: 1,
			querynumberarray: [21, 22],
			querystring: 'hello',
			queryboolean: true,
		});

		({ url, query } = parseUrl('/some-page'));

		expect(url).toEqual('/some-page');
		expect(query).toEqual({});

		({ url, query } = parseUrl('/some-page?query=false'));

		expect(url).toEqual('/some-page');
		expect(query).toEqual({ query: false });
	});

	it('stringifyUrl', async () => {
		let url = stringifyUrl({
			url: '/some-page?',
			query: {
				query1: 1,
				query2: [21, 22],
				query3: 3,
			},
		});
		expect(url).toEqual('/some-page?query1=1&query2=21&query2=22&query3=3');

		url = stringifyUrl({ url: '/some-page?' });
		expect(url).toEqual('/some-page');
		url = stringifyUrl({ url: '/some-page', query: {} });
		expect(url).toEqual('/some-page');
		url = stringifyUrl({ url: '/some-page?', query: {} });
		expect(url).toEqual('/some-page');
		url = stringifyUrl({ url: '/some-page?query' });
		expect(url).toEqual('/some-page');
	});
});

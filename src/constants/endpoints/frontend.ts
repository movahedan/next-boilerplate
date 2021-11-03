import { stringifyUrl } from 'lib/utils';

import type { QueryType } from 'lib/utils';

export const frontendEndpoints = {
	notFound: createEndpoint.bind<string, undefined, string>('/404'),
	home: createEndpoint.bind<string, undefined, string>('/'),
	components: createEndpoint.bind<string, undefined, string>('/components'),
	products: {
		index: createEndpoint.bind<string, undefined, string>('/products'),
		detail: (id: string | number) =>
			createEndpoint.call<string, undefined[], string>(`/products/${id}`),
	},
};

function createEndpoint<Query extends QueryType = QueryType>(
	this: string,
	query?: Query
) {
	return stringifyUrl({ url: this, query });
}

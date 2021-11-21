import { stringifyUrl } from 'lib/utils';

import type { QueryType } from 'lib/utils';

export const backendEndpoints = {
	sample: createEndpoint.bind<string, { sortBy?: string } | undefined, string>(
		'/sample'
	),
};

function createEndpoint<Query extends QueryType = QueryType>(
	this: string,
	query?: Query
) {
	return `${baseUrl}${stringifyUrl({ url: this, query })}`;
}

const baseUrl =
	process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

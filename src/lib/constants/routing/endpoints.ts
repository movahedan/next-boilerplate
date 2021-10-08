import { stringifyUrl } from './urls';

import type { QueryType } from './urls.types';

const baseUrl =
	process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

function createEndpoint<Query extends QueryType = QueryType>(
	this: string,
	query?: Query
) {
	return `${baseUrl}${stringifyUrl({ url: this, query })}`;
}

export const endpoints = {
	sample:
		createEndpoint.bind<string, { sortBy?: string } | undefined, string>(
			'/sample'
		),
};

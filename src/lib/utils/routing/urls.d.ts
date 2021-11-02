import type { ParsedUrlQueryInput as QueryType } from 'querystring';

export type { ParsedUrlQueryInput as QueryType } from 'querystring';

export type StringifyUrl = (args: { url: string; query?: QueryType }) => string;

export type ParseUrl = (asPath: string) => { url: string; query: QueryType };

export type QueryItemType =
	| string
	| number
	| boolean
	| ReadonlyArray<string>
	| ReadonlyArray<number>
	| ReadonlyArray<boolean>
	| null
	| undefined;

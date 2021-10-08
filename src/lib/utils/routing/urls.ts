import { parse, stringify } from 'querystring';

import type {
	ParseUrl,
	StringifyUrl,
	QueryType,
	QueryItemType,
} from './urls.types';

export const stringifyUrl: StringifyUrl = ({ url, query }) =>
	getPrettyPath(getUrl(url), getPrettyQuery(query || {}));

export const parseUrl: ParseUrl = (asPath: string) => ({
	url: getUrl(asPath),
	query: parseQuery(asPath.split('?')[1] || ''),
});

const getUrl = (url: string) => url.split('?')[0];

const getPrettyPath = (url: string, querystring: string) =>
	`${url}${querystring ? `?${querystring}` : ''}`;

const getPrettyQuery = (query: QueryType) => stringify(filterTruthy(query));

const filterTruthy = (query: QueryType) =>
	Object.fromEntries(Object.entries(query).filter(([, value]) => !!value));

const parseQuery = (querystring: string): QueryType =>
	Object.entries(parse(querystring)).reduce(
		(queries, [currentKey, currentValue]) => {
			const serializedValue = Array.isArray(currentValue)
				? currentValue.map(serializeValue).filter(Boolean)
				: currentValue
				? serializeValue(currentValue)
				: undefined;

			if (!getIsTruthy(serializedValue)) {
				return queries;
			}

			return Object.assign(queries, {
				[currentKey]: serializedValue,
			});
		},
		{} as QueryType
	);

const serializeValue = (value: QueryItemType) =>
	convertToNumber(convertToBoolean(convertToUndefined(value)));

const getIsTruthy = (value: QueryItemType | QueryItemType[]) => {
	// Do not get the exact false value as a not truthy to remove
	const isNotTruthy = value !== false && !value;
	const isEmptyArray = Array.isArray(value) && value.length === 0;

	if (isNotTruthy || isEmptyArray) {
		return false;
	}

	return true;
};

const convertToUndefined = (value: QueryItemType) =>
	value === '' ? null : value;

const convertToBoolean = (value: QueryItemType) =>
	value === 'true' ? true : value === 'false' ? false : value;

const convertToNumber = (value: QueryItemType) => {
	if (typeof value !== 'string') return value;

	if (!isNaN(parseFloat(value))) return parseFloat(value);
	else return value;
};

import UAParser from 'ua-parser-js';

export const getParsedUserAgent = (userAgent: string) => {
	const parsedUA = new UAParser(userAgent).getResult();

	return parsedUA;
};

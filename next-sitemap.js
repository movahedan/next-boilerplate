// @ts-check

const shouldIndex = process.env.NEXT_PUBLIC_INDEXING_ENABLED ? true : false;
const siteUrl = shouldIndex ? 'https://www.soheilmovahhedan.com/' : undefined;

/**
 * @type {import("next-sitemap").IRobotPolicy}
 **/
const robotTxtPolicy = shouldIndex
	? {
			userAgent: '*',
			allow: '/',
	  }
	: {
			userAgent: '*',
			disallow: '/',
	  };

/**
 * @type {import("next-sitemap").IConfig}
 **/
module.exports = {
	siteUrl: siteUrl,
	generateRobotsTxt: shouldIndex,
	robotsTxtOptions: {
		policies: [robotTxtPolicy],
	},
};

// These examples are taken from Mozilla documentation
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
export const mobileUserAgentCases = [
	[
		'Mozilla (Gecko, Firefox)',
		'Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/13.0 Firefox/13.0',
	],
	[
		'WebKit-based (Android, Safari)',
		'Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
	],
	[
		'Blink-based (Chromium, Google Chrome, Opera 15+, Edge on Android)',
		'Mozilla/5.0 (Linux; Android 4.4.2); Nexus 5 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Mobile Safari/537.36 OPR/20.0.1396.72047',
	],
	[
		'Presto-based (Opera 12-)',
		'Opera/9.80 (Android 2.3.3; Linux; Opera Mobi/ADR-1111101157; U; es-ES) Presto/2.9.201 Version/11.50',
	],
	[
		'Internet Explorer',
		'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
	],
	[
		'Edge on Windows 10 Mobile',
		'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36 Edge/16.16299',
	],
];

export const desktopUserAgentCases = [
	['Mozilla (Gecko, Firefox)', 'Mozilla/5.0 Gecko/13.0 Firefox/13.0'],
	[
		'Blink-based (Chromium, Google Chrome, Opera 15+, Edge)',
		'Mozilla/5.0 (Linux) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36 OPR/20.0.1396.72047',
	],
	[
		'Presto-based (Opera 12-)',
		'Opera/9.80 (Linux; U; es-ES) Presto/2.9.201 Version/11.50',
	],
	['Internet Explorer', 'Mozilla/5.0 (compatible; MSIE 9.0; Trident/5.0)'],
];

import 'node';

declare global {
	interface Window {
		dataLayer: Record<string, unknown>[];
	}
}

// declare global {
// 	namespace NodeJS {
// 		interface Global {
// 			mongoose: Mongoose;
// 		}
// 	}
// }

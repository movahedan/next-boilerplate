import { connect } from 'mongoose';

import { mongodbUri } from 'lib/utils';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose || null;
export async function dbConnect() {
	if (cached) return cached;

	if (!mongodbUri) {
		throw new Error(
			'Please define the MONGODB_URI environment variable inside .env'
		);
	}

	cached = await connect(mongodbUri);

	return cached;
}

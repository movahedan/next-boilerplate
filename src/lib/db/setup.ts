import { connect } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose || null;
export async function dbConnect() {
	if (cached) return cached;

	if (!MONGODB_URI) {
		throw new Error(
			'Please define the MONGODB_URI environment variable inside .env'
		);
	}

	cached = await connect(MONGODB_URI);

	return cached;
}

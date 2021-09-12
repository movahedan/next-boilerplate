export const isProduction = process.env.NODE_ENV === 'production';
export const isServer = typeof global.window === 'undefined';

export const isWebVitalsEnable = process.env.NEXT_PUBLIC_WEB_VITALS === '1';

export const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
export const analyticsTrackingId =
	process.env.NEXT_PUBLIC_ANALYTICS_TRACKING_ID;

export const mongodbUri = process.env.MONGODB_URI;

export const isServer = typeof global.window === "undefined";

export const isProduction = process.env.NODE_ENV === "production";

export const isWebVitalsEnable = process.env.NEXT_PUBLIC_WEB_VITALS === "1";

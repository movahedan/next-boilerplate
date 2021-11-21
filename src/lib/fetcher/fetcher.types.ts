export type ErrorHandler = <Data>(
	error: Error,
	ongoingRequest: { url: string; config: RequestInit }
) => Promise<Data>;

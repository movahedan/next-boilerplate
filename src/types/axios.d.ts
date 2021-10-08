import type { AxiosError } from 'axios';

declare module 'axios' {
	declare type AxiosWrapperType<T> = (args?: never) => Promise<
		| {
				data: T;
				error: undefined;
		  }
		| {
				data: undefined;
				error: Error | AxiosError<T>;
		  }
	>;
}

import type { IncomingMessage, ServerResponse } from 'http';

export interface AxiosClientConfigProps {
	asPath?: string;
}

export interface AxiosServerConfigProps extends AxiosClientConfigProps {
	req: IncomingMessage;
	res: ServerResponse;
}

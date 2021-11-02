import axios from 'axios';

import { getUserAgent } from 'lib/utils/user-agent';

import {
	axiosClientErrorMiddleware,
	axiosServerErrorMiddleware,
} from './axios.middlewares';

import type { AxiosClientConfigProps, AxiosServerConfigProps } from './axios.d';

let serverInterceptor: number | null = null;
export function configClientAxios(props: AxiosClientConfigProps): void {
	axios.defaults.baseURL = process.env.API_BASE;
	axios.defaults.withCredentials = true;

	if (serverInterceptor !== null) {
		axios.interceptors.response.eject(serverInterceptor);
		serverInterceptor = null;
	}
	serverInterceptor = axios.interceptors.response.use(
		undefined,
		axiosClientErrorMiddleware(props)
	);
}

let clientInterceptor: number | null = null;
export function configServerAxios(props: AxiosServerConfigProps): void {
	const { req } = props;

	axios.defaults.baseURL = process.env.API_BASE;
	axios.defaults.withCredentials = true;
	axios.defaults.headers['User-Agent'] = getUserAgent(req);

	if (clientInterceptor !== null) {
		axios.interceptors.response.eject(clientInterceptor);
		clientInterceptor = null;
	}
	clientInterceptor = axios.interceptors.response.use(
		undefined,
		axiosServerErrorMiddleware()
	);
}

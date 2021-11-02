import axios from 'axios';

import {
	axiosClientErrorMiddleware,
	axiosServerErrorMiddleware,
} from './axios.middlewares';

import type { AxiosClientConfigProps } from './axios.d';

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
export function configServerAxios(): void {
	axios.defaults.baseURL = process.env.API_BASE;
	axios.defaults.withCredentials = true;

	if (clientInterceptor !== null) {
		axios.interceptors.response.eject(clientInterceptor);
		clientInterceptor = null;
	}
	clientInterceptor = axios.interceptors.response.use(
		undefined,
		axiosServerErrorMiddleware()
	);
}

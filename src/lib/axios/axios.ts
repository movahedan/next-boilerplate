import { configClientAxios, configServerAxios } from './axios.configs';

export const axiosModule = {
	config: {
		client: configClientAxios,
		server: configServerAxios,
	},
};

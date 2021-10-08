import { configClientAxios, configServerAxios } from './configs';

export const axiosModule = {
	config: {
		client: configClientAxios,
		server: configServerAxios,
	},
};

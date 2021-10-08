import { loadEnvConfig } from '@next/env';

const globalSetup = async () => {
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);
};

export default globalSetup;

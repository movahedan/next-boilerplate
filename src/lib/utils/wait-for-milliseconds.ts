export const waitForMilliseconds = (timeout: number): Promise<1> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(1);
		}, timeout);
	});

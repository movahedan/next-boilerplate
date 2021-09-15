import { useEffect } from 'react';

import { analyticEvent } from './command';

interface IAuthEventProps {
	id: string; // A unique page identifier (if available).
}

export const analyticAuthEvent = ({ id }: IAuthEventProps) =>
	analyticEvent('authenticated', { profileId: id });

export const useAuthenticatedEvent = () => {
	const profile = useDummyProfile();
	useEffect(() => {
		analyticAuthEvent(profile);
	}, [profile]);
};

const useDummyProfile = () => ({ id: '1' });

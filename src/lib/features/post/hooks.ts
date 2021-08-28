import { useQuery } from 'react-query';

import { fetchPosts } from './requests';

export const usePosts = (limit: number) =>
	useQuery(['posts', limit], () => fetchPosts(limit));

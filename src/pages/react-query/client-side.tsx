import { PostList } from 'ui';

const ClientOnly = () => {
	return (
		<>
			<p>This data is loaded on client and not prefetched</p>
			<PostList />
		</>
	);
};

export default ClientOnly;

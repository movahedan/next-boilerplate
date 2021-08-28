export const fetchPosts = async (limit = 10) => {
	const parsed = (await fetch(
		'https://jsonplaceholder.typicode.com/posts'
	).then((res) => res.json())) as { id: number; title: string }[];
	const result = parsed.filter((x) => x.id <= limit);

	return result;
};

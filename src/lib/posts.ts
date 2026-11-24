import { getCollection } from "astro:content";

export async function getVisiblePostsNewestFirst() {
	const visiblePosts = await getCollection(
		"posts",
		({ data }) => import.meta.env.DEV || !data.draft,
	);
	return visiblePosts.sort(
		(a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
	);
}

import type { CollectionEntry } from "astro:content";

const excerptLength = 120;

const htmlEntities: Record<string, string> = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": '"',
	"&#39;": "'",
};

// 1 行に URL だけを置いた段落は埋め込みの代わりなので、冒頭の文に含めない
const linkOnlyParagraph = /^<p><a [^>]*>[^<]*<\/a><\/p>$/;

// 見出しやコードブロックを冒頭に含めないよう、段落だけから作る
export function getExcerpt(post: CollectionEntry<"posts">) {
	const html = post.rendered?.html ?? "";
	const paragraphs = (html.match(/<p>[\s\S]*?<\/p>/g) ?? []).filter(
		(paragraph) => !linkOnlyParagraph.test(paragraph),
	);
	const text = paragraphs
		.join(" ")
		.replace(/<[^>]+>/g, "")
		.replace(/&(amp|lt|gt|quot|#39);/g, (entity) => htmlEntities[entity])
		.replace(/\s+/g, " ")
		.trim();
	return text.slice(0, excerptLength);
}

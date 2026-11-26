import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
	loader: glob({ base: "./src/content/posts", pattern: "*/index.md" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			publishedAt: z.coerce.date(),
			tags: z.array(z.string()).default([]),
			thumbnail: image().optional(),
			draft: z.boolean().default(false),
		}),
});

export const collections = { posts };

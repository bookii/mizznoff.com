// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkBreaks from "remark-breaks";

export default defineConfig({
	site: "https://mizznoff.com",
	markdown: {
		remarkPlugins: [remarkBreaks],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});

// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [ mdx(), sitemap(), pagefind() ],
	markdown: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeMathJax] }
});

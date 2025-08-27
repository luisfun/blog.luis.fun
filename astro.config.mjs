// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rehypeMathML from '@daiji256/rehype-mathml'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import pagefind from 'astro-pagefind'
import rehypeExternalLinks from 'rehype-external-links'
import remarkMath from 'remark-math'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.luis.fun',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap(), pagefind(), icon()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathML, [rehypeExternalLinks, { target: '_blank', rel: 'noreferrer' }]],
  },
})

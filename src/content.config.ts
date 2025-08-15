import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const post = defineCollection({
  loader: glob({ base: './src/contents', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    emoji: z.string(),
    title: z.string(),
    description: z.string(),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
  }),
})

export const collections = { post }

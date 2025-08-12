import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const post = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/contents', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema:
		z.object({
			emoji: z.string(),
			title: z.string(),
			description: z.string(),
			created: z.coerce.date(),
			updated: z.coerce.date().optional(),
		}),
});

export const collections = { post };

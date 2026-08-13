import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Le site est monolingue depuis août 2026 : les collections blog-en et blog-es,
// restées vides depuis leur création, ont été retirées avec le reste de l'i18n.
export const collections = {
  "blog-fr": defineCollection({
    loader: glob({ base: "./src/content/blog-fr", pattern: "**/*.md" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
    }),
  }),
};

import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { authorIds } from "./data/authors";

// blog-en réintroduit en août 2026 pour la version anglaise du site (voir
// src/data/i18n-routes.ts). Contrairement à l'ancienne collection retirée le
// 2026-08-13, celle-ci a un vrai contenu : un fichier par article FR, même
// nom, pour garantir le mapping de slug.
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  // Clé du registre src/data/authors.ts. Optionnel : les articles antérieurs à
  // septembre 2026 n'en ont pas, et le build refuse une clé inconnue.
  author: z.enum(authorIds).optional(),
});

export const collections = {
  "blog-fr": defineCollection({
    loader: glob({ base: "./src/content/blog-fr", pattern: "**/*.md" }),
    schema: blogSchema,
  }),
  "blog-en": defineCollection({
    loader: glob({ base: "./src/content/blog-en", pattern: "**/*.md" }),
    schema: blogSchema,
  }),
};

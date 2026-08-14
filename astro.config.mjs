// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

function withTrailingSlash(pathname) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function isInternalPathWithoutExtension(pathname) {
  return pathname.startsWith("/") && !pathname.startsWith("//") && !/\.[a-zA-Z0-9]+$/.test(pathname);
}

function normalizeMarkdownInternalLinks() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== "object") return;

      if ((node.type === "link" || node.type === "definition") && typeof node.url === "string") {
        const [basePath, hashPart] = node.url.split("#");
        const [pathname, queryPart] = basePath.split("?");

        if (isInternalPathWithoutExtension(pathname)) {
          const normalizedPath = withTrailingSlash(pathname);
          const query = queryPart ? `?${queryPart}` : "";
          const hash = hashPart ? `#${hashPart}` : "";
          node.url = `${normalizedPath}${query}${hash}`;
        }
      }

      if (Array.isArray(node.children)) {
        for (const child of node.children) visit(child);
      }
    };

    visit(tree);
  };
}

export default defineConfig({
  site: "https://izybiz.fr",
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [normalizeMarkdownInternalLinks],
  },
  integrations: [
    // Pas de `serialize` posant lastmod: new Date() — c'est ce que faisait la
    // configuration précédente, et elle datait donc les huit pages de l'instant
    // du build. Toutes les pages se déclaraient modifiées à chaque déploiement,
    // y compris des mentions légales inchangées depuis des mois. Un lastmod qui
    // ment est un signal que Google finit par ignorer.
    // Mieux vaut aucune date qu'une fausse : pour les articles, la vraie date
    // reste exposée par <time datetime> et par datePublished du schéma Article.
    sitemap(),
  ],
});

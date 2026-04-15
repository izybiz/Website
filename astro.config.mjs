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
    sitemap({
      filter: (page) =>
        !page.includes("/contact/merci") &&
        !page.includes("/contact/thank-you") &&
        !page.includes("/contacto/gracias"),
      i18n: {
        defaultLocale: "fr",
        locales: { fr: "fr-FR", en: "en-US", es: "es-ES" },
      },
      serialize(item) {
        return { ...item, lastmod: new Date().toISOString() };
      },
    }),
  ],
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en", "es"],
    routing: {
      prefixDefaultLocale: false,
      fallback: { en: "en" },
    },
  },
});

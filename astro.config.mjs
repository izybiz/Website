// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://izybiz.fr",
  trailingSlash: "always",
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

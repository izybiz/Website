/**
 * Source unique des paires de chemins FR ↔ EN.
 *
 * Consommée par Layout.astro pour calculer les balises hreflang et l'URL
 * cible du bouton EN/FR du header. Toute nouvelle page traduite doit être
 * ajoutée ici pour apparaître dans le switcher — sinon il retombe sur la
 * home de la langue cible.
 *
 * Slugs des pages légales traduits (meilleur pour le SEO anglophone).
 * Articles de blog : chaque paire est déclarée ici, les slugs FR et EN sont
 * libres (identiques pour les 3 premiers articles, traduits depuis
 * septembre 2026).
 */
export interface RoutePair {
  fr: string;
  en: string;
}

export const routePairs: RoutePair[] = [
  { fr: "/", en: "/en/" },
  { fr: "/contact/", en: "/en/contact/" },
  { fr: "/mentions-legales/", en: "/en/legal-notice/" },
  { fr: "/politique-de-confidentialite/", en: "/en/privacy-policy/" },
  { fr: "/blog/", en: "/en/blog/" },
  {
    fr: "/blog/agents-ia-acheteurs-chatgpt-pas-google-2026-04-29/",
    en: "/en/blog/agents-ia-acheteurs-chatgpt-pas-google-2026-04-29/",
  },
  {
    fr: "/blog/agents-ia-vs-prestataires-cout-execution-2026-05-08/",
    en: "/en/blog/agents-ia-vs-prestataires-cout-execution-2026-05-08/",
  },
  {
    fr: "/blog/geo-dirigeants-agents-ia-supervision/",
    en: "/en/blog/geo-dirigeants-agents-ia-supervision/",
  },
  {
    fr: "/blog/apercus-ia-en-france-pourquoi-etre-1er-sur-google-ne-suffit-plus/",
    en: "/en/blog/google-ai-overviews-france-ranking-not-enough/",
  },
  {
    fr: "/blog/score-de-visibilite-ia-pourquoi-un-bon-score-seo-ne-suffit-plus/",
    en: "/en/blog/ai-visibility-score-why-seo-isnt-enough/",
  },
];

export function counterpartPath(pathname: string): RoutePair | null {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (
    routePairs.find((pair) => pair.fr === normalized || pair.en === normalized) ?? null
  );
}

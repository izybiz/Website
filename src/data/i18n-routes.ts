/**
 * Source unique des paires de chemins FR ↔ EN.
 *
 * Consommée par Layout.astro pour calculer les balises hreflang et l'URL
 * cible du bouton EN/FR du header. Toute nouvelle page traduite doit être
 * ajoutée ici pour apparaître dans le switcher — sinon il retombe sur la
 * home de la langue cible.
 *
 * Slugs des pages légales traduits (meilleur pour le SEO anglophone).
 * Slugs des articles de blog identiques FR/EN (mapping trivial).
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
];

export function counterpartPath(pathname: string): RoutePair | null {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (
    routePairs.find((pair) => pair.fr === normalized || pair.en === normalized) ?? null
  );
}

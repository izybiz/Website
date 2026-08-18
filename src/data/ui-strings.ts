// Textes d'interface partagés par le chrome et le blog.
//
// Dimension « langue » réintroduite en août 2026 pour la version anglaise du
// site (voir src/data/i18n-routes.ts pour le mapping des pages). Les deux
// dictionnaires doivent garder les mêmes clés — c'est ce que vérifie le type
// de `t()`.
export const ui = {
  fr: {
    "nav.blog": "Blog",
    "nav.login": "Connexion",
    "nav.cta": "Analyser mon site",
    "footer.privacy": "Politique de confidentialité",
    "footer.legal": "Mentions légales",
    "footer.contact": "Contact",
    "footer.copyright": "© 2026 Izybiz — Tous droits réservés",
    "blog.readmore": "Lire l'article",
    "blog.subtitle":
      "95 % des projets IA en entreprise échouent. Pas par manque de technologie — par manque de méthode de pilotage. Ce blog documente ce qui fonctionne, pour les managers d'ETI et PME en France.",
  },
  en: {
    "nav.blog": "Blog",
    "nav.login": "Login",
    "nav.cta": "Analyze my site",
    "footer.privacy": "Privacy Policy",
    "footer.legal": "Legal Notice",
    "footer.contact": "Contact",
    "footer.copyright": "© 2026 Izybiz — All rights reserved",
    "blog.readmore": "Read the article",
    "blog.subtitle":
      "95% of enterprise AI projects fail. Not for lack of technology — for lack of a management method. This blog documents what works, for managers of French SMEs and mid-sized companies.",
  },
} as const;

export type Lang = "fr" | "en";

export function t(key: keyof typeof ui.fr, lang: Lang = "fr") {
  return ui[lang][key];
}

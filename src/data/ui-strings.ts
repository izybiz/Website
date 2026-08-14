// Textes d'interface partagés par le chrome et le blog.
//
// Remplace l'ancien src/i18n/translations.ts : le site est monolingue depuis
// que les routes /en/ et /es/ ont été retirées (août 2026). Si l'anglais ou
// l'espagnol reviennent un jour, c'est ici qu'il faudra réintroduire une
// dimension « langue ».
export const ui = {
  "nav.blog": "Blog",
  "footer.privacy": "Politique de confidentialité",
  "footer.legal": "Mentions légales",
  "footer.copyright": "© 2026 Izybiz — Tous droits réservés",
  "blog.readmore": "Lire l'article",
  "blog.subtitle":
    "95 % des projets IA en entreprise échouent. Pas par manque de technologie — par manque de méthode de pilotage. Ce blog documente ce qui fonctionne, pour les managers d'ETI et PME en France.",
} as const;

export function t(key: keyof typeof ui) {
  return ui[key];
}

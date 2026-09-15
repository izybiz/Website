// Registre des auteurs d'articles de blog. Un article référence un auteur par
// sa clé dans le champ `author` de son en-tête (voir src/content.config.ts) ;
// le template [slug].astro affiche alors le bloc photo + nom + fonction et
// Layout.astro l'utilise pour le JSON-LD Article. La photo vit dans
// public/assets/ ; la fonction est traduite car le bloc s'affiche aussi sur
// /en/blog/.
import type { Lang } from "./ui-strings";

export interface Author {
  name: string;
  role: Record<Lang, string>;
  photo: string;
  url?: string;
}

export const authors = {
  "lucie-dine": {
    name: "Lucie Dine",
    role: { fr: "Product Manager / Product Owner", en: "Product Manager / Product Owner" },
    photo: "/assets/lucie-dine.jpg",
  },
} as const satisfies Record<string, Author>;

export type AuthorId = keyof typeof authors;
export const authorIds = Object.keys(authors) as [AuthorId, ...AuthorId[]];

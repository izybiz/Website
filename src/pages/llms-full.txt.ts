// /llms-full.txt — le contenu du site en un seul fichier Markdown.
//
// Complément de /llms.txt : là où l'index donne des liens, celui-ci donne le
// texte, pour qu'un modèle n'ait pas à parcourir le site page par page.
//
// Le corps des articles vient de la collection de contenu : c'est exactement
// ce que les pages publient, sans risque de divergence. Voir llms.txt.ts pour
// la mise en garde sur le statut non standard de ces fichiers.
import { getCollection } from "astro:content";
import { siteSummary as s, SITE_URL } from "../data/site-summary";

export async function GET() {
  const posts = (await getCollection("blog-fr")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const fr = (d: Date) =>
    d.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  const body = [
    `# ${s.name} — contenu complet`,
    ``,
    `> ${s.tagline}`,
    ``,
    `Source : ${SITE_URL}. ${s.language}`,
    ``,
    `## L'offre en bref`,
    ``,
    ...s.facts.map((f) => `- ${f}`),
    ``,
    `## Éditeur`,
    ``,
    s.publisher,
    ``,
    `Contact : ${s.contact}`,
    ``,
    `## Pages`,
    ``,
    ...s.pages.flatMap((p) => [`### ${p.title} — ${SITE_URL}${p.path}`, ``, p.description, ``]),
    ...s.legalPages.flatMap((p) => [
      `### ${p.title} — ${SITE_URL}${p.path}`,
      ``,
      p.description,
      ``,
    ]),
    // Chaque article est un H2, et les titres de son corps (des H2 en Markdown)
    // sont décalés en H3 pour passer dessous. Sans ce décalage, les sous-titres
    // d'un article se retrouvent au même niveau que son titre, et un modèle ne
    // peut plus dire où un article s'arrête.
    ...posts.flatMap((p) => {
      const url = `${SITE_URL}/blog/${p.id.replace(/\.md$/, "")}/`;
      return [
        `## Article — ${p.data.title}`,
        ``,
        `Publié le ${fr(p.data.pubDate)} · ${url}`,
        ``,
        p.data.description,
        ``,
        p.body.trim().replace(/^(#{1,5}) /gm, "#$1 "),
        ``,
        `---`,
        ``,
      ];
    }),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

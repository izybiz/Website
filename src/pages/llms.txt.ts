// /llms.txt — index du site à l'intention des modèles de langage.
//
// Format proposé par llmstxt.org : un H1, un résumé en blockquote, du contexte
// libre, puis des sections H2 de liens annotés.
//
// Ce n'est PAS un standard adopté : aucun grand modèle ne s'est engagé à lire
// ce fichier. Il est ici parce qu'il coûte peu et qu'il est cohérent avec ce
// que vend Izybiz — pas parce qu'il apporterait du trafic à lui seul.
//
// Généré au build depuis src/data/site-summary.ts et la collection blog-fr :
// un nouvel article y apparaît sans intervention. Ne jamais le figer en
// fichier statique dans public/, il dériverait au premier article publié.
import { getCollection } from "astro:content";
import { siteSummary as s, SITE_URL } from "../data/site-summary";

export async function GET() {
  const posts = (await getCollection("blog-fr")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const link = (path: string, title: string, description: string) =>
    `- [${title}](${SITE_URL}${path}): ${description}`;

  const body = [
    `# ${s.name}`,
    ``,
    `> ${s.tagline}`,
    ``,
    ...s.facts.map((f) => `${f}\n`),
    `${s.publisher}`,
    ``,
    `Contact : ${s.contact}. ${s.language}`,
    ``,
    `## Pages`,
    ``,
    ...s.pages.map((p) => link(p.path, p.title, p.description)),
    ``,
    `## Articles`,
    ``,
    ...posts.map((p) =>
      link(
        `/blog/${p.id.replace(/\.md$/, "")}/`,
        p.data.title,
        `${p.data.description} (publié le ${p.data.pubDate.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })})`,
      ),
    ),
    ``,
    `## Optionnel`,
    ``,
    ...s.legalPages.map((p) => link(p.path, p.title, p.description)),
    `- [Contenu complet](${SITE_URL}/llms-full.txt): toutes les pages et tous les articles en Markdown, en un seul fichier.`,
    ``,
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

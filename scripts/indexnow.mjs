/**
 * Prévient les moteurs qu'une page a changé, via le protocole IndexNow.
 *
 * À qui ça sert : Bing, Yandex, Seznam, Naver partagent la même soumission.
 * **Google n'adhère pas à IndexNow** — il a testé le protocole puis ne l'a
 * jamais adopté. Pour Google, le levier reste le `lastmod` du sitemap
 * (scripts/lastmod.mjs) et son propre rythme de crawl.
 *
 * Ce n'est pas un lot de consolation pour autant : l'index de Bing alimente
 * les réponses de ChatGPT et de Copilot. Pour un site qui vend la visibilité
 * dans les moteurs de réponse, y entrer vite compte autant que Google.
 *
 * Usage :
 *   node scripts/indexnow.mjs --dry-run          # montre sans envoyer
 *   node scripts/indexnow.mjs                    # toutes les URLs du sitemap
 *   node scripts/indexnow.mjs https://izybiz.fr/blog/mon-article/
 */

import { readFileSync, existsSync } from "node:fs";

const HOST = "izybiz.fr";
const KEY = "536936180a06708ee925c7e125effec8";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP = "dist/sitemap-0.xml";

function urlsFromSitemap() {
  if (!existsSync(SITEMAP)) {
    throw new Error(
      `${SITEMAP} introuvable — lancer \`npm run build\` avant, ou passer les URLs en argument.`
    );
  }
  const xml = readFileSync(SITEMAP, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const explicit = args.filter((a) => a.startsWith("http"));
const urlList = explicit.length > 0 ? explicit : urlsFromSitemap();

const foreign = urlList.filter((u) => !u.startsWith(`https://${HOST}/`));
if (foreign.length > 0) {
  // IndexNow rejette le lot entier si une URL sort du domaine de la clé.
  console.error(`URLs hors du domaine ${HOST} :\n  ${foreign.join("\n  ")}`);
  process.exit(1);
}

console.log(`IndexNow → ${urlList.length} URL(s), clé ${KEY_LOCATION}`);
for (const u of urlList) console.log(`  ${u}`);

if (dryRun) {
  console.log("--dry-run : rien n'a été envoyé.");
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// 200 = accepté, 202 = accepté mais clé pas encore vérifiée (normal au 1er envoi).
const body = await response.text();
console.log(`${response.status} ${response.statusText}${body ? ` — ${body}` : ""}`);
if (![200, 202].includes(response.status)) process.exit(1);

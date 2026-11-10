/**
 * Date de dernière modification réelle de chaque page, pour le sitemap.
 *
 * Le piège que ce module existe pour éviter : la configuration d'avant posait
 * `lastmod: new Date()` dans `serialize`, donc datait TOUTES les pages de
 * l'instant du build. Des mentions légales inchangées depuis des mois se
 * déclaraient modifiées à chaque déploiement. Un `lastmod` qui ment est un
 * signal que Google finit par ignorer — pour le site entier, pas seulement
 * pour la page fautive.
 *
 * La correction d'alors avait été de tout supprimer. Mieux, mais Google perd
 * alors son principal indice de fraîcheur pour décider quoi recrawler.
 *
 * Ici on rend la vraie date, ou rien. Jamais une date inventée :
 *   1. la date du dernier commit git qui touche le fichier source ;
 *   2. à défaut, pour un article, le `pubDate` de son en-tête ;
 *   3. à défaut, pas de `lastmod` du tout.
 *
 * Le garde-fou qui compte est `isShallowClone()` : dans un dépôt cloné en
 * profondeur 1, `git log` rend la date du checkout pour TOUS les fichiers —
 * ce qui reproduirait exactement le bug d'origine, en plus discret. Dans ce
 * cas on refuse git en bloc et on retombe sur `pubDate`.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function git(args) {
  try {
    return execFileSync("git", args, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

let shallowChecked = false;
let shallow = true; // par défaut méfiant : pas de git prouvé = pas de date git

function isShallowClone() {
  if (!shallowChecked) {
    shallowChecked = true;
    const inRepo = git(["rev-parse", "--is-inside-work-tree"]) === "true";
    shallow = !inRepo || git(["rev-parse", "--is-shallow-repository"]) !== "false";
    if (shallow) {
      console.warn(
        "[sitemap] historique git indisponible ou tronqué (clone shallow) — " +
          "lastmod limité aux pubDate des articles, aucune date inventée."
      );
    }
  }
  return shallow;
}

const gitDateCache = new Map();

function gitDate(relPath) {
  if (isShallowClone()) return null;
  if (gitDateCache.has(relPath)) return gitDateCache.get(relPath);
  const iso = git(["log", "-1", "--format=%cI", "--", relPath]);
  const date = iso ? new Date(iso) : null;
  const value = date && !Number.isNaN(date.getTime()) ? date : null;
  gitDateCache.set(relPath, value);
  return value;
}

/** `pubDate: 2026-09-15` lu dans l'en-tête d'un article. */
function pubDate(relPath) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) return null;
  const head = readFileSync(abs, "utf8").slice(0, 600);
  const match = head.match(/^pubDate:\s*"?([0-9]{4}-[0-9]{2}-[0-9]{2})"?/m);
  if (!match) return null;
  const date = new Date(`${match[1]}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Les articles d'une collection, en chemins relatifs. */
function articlesOf(collection) {
  const dir = join(ROOT, "src/content", collection);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => `src/content/${collection}/${name}`);
}

/**
 * Fichiers sources derrière une URL publiée. Déduits du chemin plutôt que
 * listés à la main : une table de correspondance se périmerait au premier
 * article ajouté, et un `lastmod` périmé est un `lastmod` qui ment.
 */
function sourcesFor(pathname) {
  const path = pathname.replace(/^\/+|\/+$/g, "");
  const segments = path ? path.split("/") : [];

  if (segments[0] === "blog" && segments.length === 2) {
    return [`src/content/blog-fr/${segments[1]}.md`];
  }
  if (segments[0] === "en" && segments[1] === "blog" && segments.length === 3) {
    return [`src/content/blog-en/${segments[2]}.md`];
  }
  // Une page d'index de blog change aussi quand un article paraît, sans que son
  // propre fichier soit touché. Ses sources incluent donc la collection.
  if (path === "blog") {
    return ["src/pages/blog/index.astro", ...articlesOf("blog-fr")];
  }
  if (path === "en/blog") {
    return ["src/pages/en/blog/index.astro", ...articlesOf("blog-en")];
  }
  if (segments.length === 0) {
    return ["src/pages/index.astro", "src/components/HomeV2Fr.astro"];
  }
  if (path === "en") {
    return ["src/pages/en/index.astro", "src/components/HomeV2En.astro"];
  }
  return [`src/pages/${path}.astro`, `src/pages/${path}/index.astro`];
}

/** Date de dernière modification d'une URL, ou `null` si on ne la connaît pas. */
export function lastmodFor(url) {
  let pathname;
  try {
    pathname = new URL(url).pathname;
  } catch {
    return null;
  }

  const sources = sourcesFor(pathname).filter((rel) => existsSync(join(ROOT, rel)));
  if (sources.length === 0) return null;

  // Une page composée de plusieurs fichiers vaut son fichier le plus récent.
  const dates = sources.map(gitDate).filter(Boolean);
  if (dates.length > 0) {
    return new Date(Math.max(...dates.map((d) => d.getTime())));
  }

  for (const rel of sources) {
    const published = pubDate(rel);
    if (published) return published;
  }
  return null;
}

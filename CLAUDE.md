# CLAUDE.md — izybiz/Website

Site corporate **izybiz.fr**. Repo GitHub : `izybiz/Website`.

## Commandes

```sh
npm install
npm run dev      # localhost:4321
npm run build    # sortie dist/ — même commande que Netlify
npm run preview
```

Node **>= 22.12.0** (voir `package.json` et `netlify.toml`).

## Conventions

- **Site monolingue (FR)** depuis août 2026. Les routes `/en/` et `/es/` et tout
  l'échafaudage i18n ont été retirés — ne pas les réintroduire sans demande
  explicite. Les textes d'interface sont dans `src/data/ui-strings.ts`.
- **Trailing slash** : toujours sur les liens internes (`trailingSlash: "always"`)
- **Blog FR** : `src/content/blog-fr/*.md`
- Commits en français, cohérents avec l'historique ; PRs vers `main`

## Architecture

La refonte d'août 2026 (maquette Claude Design) porte quatre pages. Chacune a sa
feuille de style, scopée sous une classe racine pour ne pas déborder sur les
autres :

| Page | Composant / page | Style | Classe racine |
|---|---|---|---|
| Accueil | `src/components/HomeV2Fr.astro` | `styles/home-v2.css` | `.home-v2` |
| Contact | `src/pages/contact.astro` | `styles/contact.css` | `.contact-v2` |
| Légales ×2 | `src/pages/*.astro` | `styles/legal.css` | `.legal-page` |
| Blog | `src/pages/blog/` | `styles/blog.css` | — |

`blog.css` porte aussi le socle du site (base `html`/`body`, helper `.sr-only`) :
il est chargé par `Layout.astro` sur **toutes** les pages. Il remplace l'ancien
`global.css`, 5 229 lignes dont 19 classes servaient encore.

Le header et le footer sont dans `Layout.astro` + `styles/site-chrome.css`, et
s'appliquent à **tout** le site, blog compris. Les tokens de marque (`--bg`,
`--orange`, `--font-display`…) sont définis en `:root` dans `site-chrome.css`.

Le seul JavaScript de la home est `public/home-v2.js` (onglets, frise animée,
formulaires). `public/analytics.js` équipe les CTA sur toutes les pages.

## Pièges à connaître

**Grilles `auto-fit` — débordement mobile.** Toujours écrire
`minmax(min(320px, 100%), 1fr)`, jamais `minmax(320px, 1fr)`. Une piste figée ne
rétrécit jamais : sous ce seuil elle déborde et la page défile horizontalement.
Le bug était présent sur sept grilles, corrigé le 2026-08-13.

**Données structurées.** Le JSON-LD de `Layout.astro` est ce que Google et les
moteurs de réponse IA lisent en priorité pour décrire l'offre. Il a déjà divergé
une fois de ce que la home affirmait (il annonçait un « accès sur invitation »
alors que le diagnostic est gratuit et ouvert). **À relire à chaque changement de
positionnement.**

**Le sitemap ne pose pas de `lastmod`,** et c'est volontaire : la configuration
précédente le remplissait avec la date du build, donc toutes les pages se
déclaraient modifiées à chaque déploiement. Ne pas le réintroduire sans une
vraie date par page.

**Aucun appel à Supabase.** Consigne de Lucie : rien sur le site ne doit
appeler Supabase. L'ancien `public/script.js`, qui exposait une clé, a été
supprimé.

## Chantier en cours — formulaires sans destination

Les **quatre** formulaires (trois sur la home, un sur contact) **n'envoient rien
nulle part**. C'est volontaire, faute de destination choisie : ne pas « corriger »
sans demander.

Sur la home, la soumission ouvre une modale « Votre diagnostic démarre » qui
**annonce un mail que personne n'envoie**. Lucie l'a demandée en connaissance de
cause.

Point de branchement unique : `sendDiagnostic()` dans `public/home-v2.js`. Elle
reçoit déjà le `FormData`. La modale ne devra s'ouvrir qu'une fois la requête
acceptée.

## Vérifier une modification

Pas de navigateur dans les sessions Claude Code — le contrôle visuel revient à
Lucie. Ce qui est vérifiable en ligne de commande :

```sh
npm run build                      # doit sortir 9 pages
cp -R dist /tmp/avant              # avant une refactorisation
diff -r /tmp/avant dist            # après : toute différence non voulue est un bug
```

Cette comparaison du HTML généré page par page est la méthode qui a validé le
nettoyage du 2026-08-13.

## Déploiement

Push sur `main` → build Netlify → izybiz.fr. **Ne jamais travailler directement
sur `main`.** Un commit local ne déclenche rien ; pousser une branche de travail
crée au plus une preview Netlify sur une adresse séparée.

## Handover complet

`../HANDOVER.md` dans `Izybiz-Website/`, ou `HANDOVER-CLAUDE-CODE.md` à la
racine `VS-CODE/`. Attention : ces deux documents sont antérieurs à la refonte
d'août 2026 et décrivent en partie un site qui n'existe plus.

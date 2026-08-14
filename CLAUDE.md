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

**`/llms.txt` et `/llms-full.txt` sont générés au build**, par
`src/pages/llms*.txt.ts`, depuis `src/data/site-summary.ts` et la collection
`blog-fr`. Un nouvel article y apparaît sans intervention. **Ne jamais les figer
en fichiers statiques dans `public/`** : ils dériveraient à la première
publication. Le texte de `site-summary.ts` décrit l'offre — à relire avec le
JSON-LD à chaque changement de positionnement.

**Le sitemap ne pose pas de `lastmod`,** et c'est volontaire : la configuration
précédente le remplissait avec la date du build, donc toutes les pages se
déclaraient modifiées à chaque déploiement. Ne pas le réintroduire sans une
vraie date par page.

**Aucun appel à Supabase.** Consigne de Lucie : rien sur le site ne doit
appeler Supabase. L'ancien `public/script.js`, qui exposait une clé, a été
supprimé.

## Formulaires

Les **trois formulaires de la home** partent vers **Web3Forms**, qui les
transforme en mail. Tout passe par `sendDiagnostic()` dans `public/home-v2.js` —
point unique, ne pas dupliquer l'appel ailleurs.

**Le destinataire n'est pas dans le code.** Il est attaché à la clé, côté
`app.web3forms.com` (compte `sdine@izybiz.fr`, formulaire `izybiz-form`).
Aujourd'hui `contact.me@izybiz.fr`. Changer l'adresse de réception ne demande
donc **aucune** modification du site — ne pas chercher un `to` à modifier, il
n'existe pas.

La clé `ae024e50-…` est **publique par conception** : Web3Forms l'affiche comme
telle et elle voyage dans le JS livré. Ce n'est pas un secret échappé.

La modale « Votre diagnostic démarre » ne s'ouvre **que** si l'envoi est accepté.
En cas d'échec, le formulaire affiche un message et propose l'adresse mail
directe : `.hv2-form__message`, alimenté par le script.

Il n'y a **pas de diagnostic automatique** derrière : Lucie reçoit la demande et
répond à la main. Le champ caché `origine` indique lequel des trois formulaires
a servi.

**Le texte du mail reçu se règle dans `sendDiagnostic()`.** Web3Forms affiche le
**nom** de chaque champ en titre, dans l'ordre d'envoi : les clés du payload sont
donc rédigées pour être lues (« Site à analyser », « À faire »), pas pour
ressembler à du code. L'objet reprend le domaine du visiteur, l'expéditeur est
« Site izybiz ». Seule la phrase d'introduction (« Hello, A new form has been
submitted… ») est hors de portée : Web3Forms la réserve à ses offres payantes.
Comme le champ n'est plus nommé `email`, `replyto` est posé explicitement — sans
lui, « Répondre » ne mènerait nulle part.

**Reste à faire :**
- Le formulaire de `/contact` (6 champs) **n'envoie toujours rien**. La page est
  par ailleurs inatteignable : `netlify.toml` redirige `/contact` vers
  `/#diagnostic`. Décider du sort de la page avant de la brancher.
- Aucun repli sans JavaScript : si le script ne charge pas, les formulaires de
  la home ne fonctionnent pas. Un `action`/`method` natif et une page `/merci`
  le couvriraient. Le champ *Redirect URL* du tableau de bord ne sert que dans
  ce cas — il est vide, c'est voulu.

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

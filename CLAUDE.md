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

- **Site bilingue FR/EN** depuis fin août 2026 (branche `feature/site-en`). Le
  français reste la langue par défaut (`/`) ; l'anglais vit sous `/en/`. Voir
  la section i18n ci-dessous avant de toucher au chrome ou d'ajouter une page.
- **Trailing slash** : toujours sur les liens internes (`trailingSlash: "always"`)
- **Blog FR** : `src/content/blog-fr/*.md` · **Blog EN** : `src/content/blog-en/*.md`
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

`public/home-v2.js` porte les comportements propres à la home (onglets, frise
animée, ancre `#diagnostic`). `public/forms.js` porte l'envoi des formulaires,
partagé avec `/contact`. `public/analytics.js` équipe les CTA sur toutes les
pages.

## i18n (FR/EN)

Routing manuel, pas la config i18n native d'Astro : chaque page anglaise est
un fichier sous `src/pages/en/`, sibling de son équivalent FR.

- **`src/data/i18n-routes.ts`** est la source unique du mapping FR↔EN. Toute
  nouvelle page traduite doit y être ajoutée, sinon le bouton EN/FR de
  `Layout.astro` retombe sur la home de la langue cible et les balises
  hreflang ne se génèrent pas pour cette page.
- **Slugs** : pages légales traduites (`/en/legal-notice/`,
  `/en/privacy-policy/`, meilleur pour le SEO anglophone). Articles de blog :
  **même nom de fichier** FR/EN (`src/content/blog-en/<même-slug>.md`) —
  mapping trivial, mais un article FR sans fichier `blog-en` homonyme n'aura
  jamais de version anglaise.
- **`Layout.astro`** porte la prop `lang` (`"fr"` par défaut). Elle pilote
  `<html lang>`, les hreflang fr/en/x-default, `og:locale`, le JSON-LD
  Organization/SoftwareApplication (description et `availableLanguage`
  traduits), et les hrefs du header/footer (legal, privacy, contact, blog,
  home). Une page qui oublie de passer `lang="en"` affichera un chrome en
  français sur une URL `/en/`.
- **`src/data/ui-strings.ts`** est un dictionnaire `{fr, en}` — `t(key, lang)`.
  Les deux dictionnaires doivent garder les mêmes clés.
- **`public/forms.js`** détecte la langue via `document.documentElement.lang`
  (pas de prop à faire voyager jusqu'au script). Les messages de succès/erreur
  affichés au visiteur sont bilingues ; le contenu du mail reçu par Lucie
  reste toujours en français (email interne), seul son objet gagne un
  préfixe `[EN]` pour signaler dans quelle langue répondre.
- **`HomeV2En.astro`** traduit `HomeV2Fr.astro` texte par texte. Les ids
  internes `attirer`/`convertir`/`vendre` ne sont **pas** traduits : ce sont
  des sélecteurs utilisés par `home-v2.css`
  (`.hv2-tab--attirer[aria-selected="true"]` etc.) — seul le `label` affiché
  change de langue.
- **Connu et non corrigé** : les 3 articles de `blog-fr` se terminent par
  « Beta privée, accès sur invitation », une formule obsolète depuis que le
  diagnostic est gratuit et ouvert (cf. le piège JSON-LD ci-dessous). Les
  versions `blog-en` ont été traduites avec la formule actuelle plutôt que ce
  texte périmé — les originaux FR n'ont pas été touchés (hors périmètre de la
  tâche qui a ajouté l'anglais). À corriger si Lucie le souhaite.
- Hors périmètre pour l'instant : `llms.txt`/`llms-full.txt` restent FR
  uniquement (dérivés de `site-summary.ts`), et `404.astro` reste FR.

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

Les **quatre formulaires** partent vers **Web3Forms**, qui les transforme en
mail. Tout passe par **`public/forms.js`**, partagé par la home et la page
contact — point unique, ne pas dupliquer l'appel ailleurs.

Deux familles, distinguées par `data-form-kind` sur le `<form>` :

| | `diagnostic` | `contact` |
|---|---|---|
| Où | 3 formulaires de la home | `/contact` |
| Champs | email, site | nom, entreprise, email, site, demande, message |
| Confirmation | modale « Votre diagnostic démarre » | message sous le bouton |

Un formulaire se déclare avec `data-site-form`, `data-form-kind` et
`data-form-location` (ce dernier alimente l'événement GA4). Le contenu du mail
de chaque famille est décrit dans la table `KINDS` de `forms.js`.

**Noms réservés par Web3Forms** — `access_key`, `subject`, `from_name`,
`replyto`, `redirect`, `botcheck`, `ccemail`. Un champ visible qui porterait
l'un d'eux serait pris pour un réglage et n'apparaîtrait pas dans le mail :
c'est pourquoi le choix « votre demande » de la page contact s'appelle
`demande`.

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

**Le texte du mail reçu se règle dans la table `KINDS` de `forms.js`.** Web3Forms affiche le
**nom** de chaque champ en titre, dans l'ordre d'envoi : les clés du payload sont
donc rédigées pour être lues (« Site à analyser », « À faire »), pas pour
ressembler à du code. L'objet reprend le domaine du visiteur, l'expéditeur est
« Site izybiz ». Seule la phrase d'introduction (« Hello, A new form has been
submitted… ») est hors de portée : Web3Forms la réserve à ses offres payantes.
Comme le champ n'est plus nommé `email`, `replyto` est posé explicitement — sans
lui, « Répondre » ne mènerait nulle part.

`/contact` **redevient une destination** : la redirection vers `/#diagnostic`
qui la masquait est retirée de `netlify.toml`, la page ayant désormais un
formulaire qui fonctionne.

**Reste à faire :**
- Aucune mention RGPD à côté des formulaires. Le lien vers la politique de
  confidentialité n'existe que dans le pied de page, alors qu'une adresse mail
  est collectée.
- Aucun repli sans JavaScript : si le script ne charge pas, aucun formulaire ne
  fonctionne. Un `action`/`method` natif et une page `/merci` le couvriraient.
  Le champ *Redirect URL* du tableau de bord ne sert que dans ce cas — il est
  vide, c'est voulu.
- `public/forms.js` et `public/home-v2.js` portent des noms fixes, sans
  empreinte : après un déploiement, un visiteur déjà venu peut garder l'ancienne
  version en cache quelques temps. Première piste si une modification semble ne
  pas prendre effet en ligne.

## Vérifier une modification

Pas de navigateur dans les sessions Claude Code — le contrôle visuel revient à
Lucie. Ce qui est vérifiable en ligne de commande :

```sh
npm run build                      # doit sortir 17 pages (9 FR + 8 EN)
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

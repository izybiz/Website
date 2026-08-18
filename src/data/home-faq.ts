/**
 * FAQ de la home v2 (août 2026).
 *
 * Source unique : consommée par HomeV2Fr.astro pour le rendu et par
 * index.astro pour le schéma FAQPage. Toute modification ici met les deux
 * à jour — ne pas dupliquer les questions ailleurs.
 */
export interface FaqEntry {
  q: string;
  a: string;
}

export const homeFaq: FaqEntry[] = [
  {
    q: "C'est un logiciel ou une prestation ?",
    a: "Un logiciel, Izy, qui s'occupe de tout : une équipe d'agents fait le travail, Izy pilote la mission et vous rend compte. Vous n'installez rien, vous ne coordonnez personne. Au démarrage, un rendez-vous de cadrage définit votre mission ; ensuite, Izy tourne tous les mois.",
  },
  {
    q: "C'est pour qui ?",
    a: "Des sociétés B2B de prestations humaines (nettoyage, chauffage, transport, maintenance, second œuvre, bureaux d'études) dont la vente est peu digitalisée, et qu'on ne trouve pas quand on cherche leur métier dans leur région. Aucune compétence technique n'est demandée.",
  },
  {
    q: "Qu'est-ce que ça me demande, à moi ?",
    a: "Pour le diagnostic : une adresse de site et cinq minutes. Ensuite un rendez-vous de cadrage, puis une validation par mois dans la conversation.",
  },
  {
    q: "Qu'est-ce que je reçois, concrètement ?",
    a: "Dès le diagnostic : votre position comparée au leader de votre marché, et une première action détaillée. Le plan complet s'ouvre avec l'abonnement : plan de mission, optimisation du site page par page, calendrier éditorial, articles et posts produits, bilan chaque mois.",
  },
  {
    q: "En quoi c'est différent d'une agence ou d'un outil SEO ?",
    a: "Un outil vous laisse le travail. Une agence vous vend des heures. Izy exécute : une seule mission cadrée, la même méthode tous les mois, la rigueur d'un consultant à une cadence qu'un consultant ne tient pas.",
  },
  {
    q: "Pourquoi le diagnostic est gratuit ?",
    a: "Parce qu'il est automatisé, et qu'il dit s'il y a une mission à cadrer. Si ce n'est pas le cas, on vous le dit.",
  },
  {
    q: "Au bout de combien de temps ça marche ?",
    a: "Le plan et les premières optimisations arrivent le premier mois. Sur les recherches, comptez plusieurs mois : Izy suit les indicateurs fixés au cadrage plutôt que de promettre une date.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Le diagnostic ne coûte rien. Le cadrage et l'abonnement mensuel sont chiffrés après le diagnostic, selon la mission retenue.",
  },
  {
    q: "Vous vous occupez aussi de mes devis et de mes contacts ?",
    a: "C'est la suite du chemin : Convertir, puis Vendre, en préparation. Les clients de la première étape seront les premiers servis.",
  },
];

// Version anglaise, même ordre et même contenu — consommée par HomeV2En.astro
// et src/pages/en/index.astro (schéma FAQPage).
export const homeFaqEn: FaqEntry[] = [
  {
    q: "Is it software or a service?",
    a: "Software — Izy — that handles everything: a team of agents does the work, Izy runs the mission and reports back to you. You install nothing and coordinate no one. A scoping call defines your mission at the start; after that, Izy runs every month.",
  },
  {
    q: "Who is it for?",
    a: "B2B companies selling human services (cleaning, heating, transport, maintenance, fit-out trades, engineering firms) whose sales process is barely digitised, and who don't show up when someone searches for their trade in their area. No technical skills required.",
  },
  {
    q: "What does it actually require from me?",
    a: "For the diagnosis: a website address and five minutes. Then a scoping call, followed by one validation per month in the conversation.",
  },
  {
    q: "What do I actually get?",
    a: "From the diagnosis: your position compared to your market's leader, and one detailed first action. The full plan opens with the subscription: a mission plan, page-by-page site optimisation, an editorial calendar, articles and posts produced, and a report every month.",
  },
  {
    q: "How is this different from an agency or an SEO tool?",
    a: "A tool leaves you the work. An agency sells you hours. Izy executes: one clearly scoped mission, the same method every month, a consultant's rigour at a pace no consultant can sustain.",
  },
  {
    q: "Why is the diagnosis free?",
    a: "Because it's automated, and it tells you whether there's a mission worth scoping. If there isn't, we tell you.",
  },
  {
    q: "How long until it works?",
    a: "The plan and the first optimisations arrive in month one. For search results, expect several months: Izy tracks the indicators set during scoping rather than promising a date.",
  },
  {
    q: "How much does it cost?",
    a: "The diagnosis costs nothing. Scoping and the monthly subscription are priced after the diagnosis, based on the mission chosen.",
  },
  {
    q: "Do you also handle my quotes and contacts?",
    a: "That's next on the path: Convert, then Sell, currently in preparation. Customers from the first stage will be served first.",
  },
];

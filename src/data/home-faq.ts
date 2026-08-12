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

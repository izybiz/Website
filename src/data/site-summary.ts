// Résumé du site à l'intention des machines (llms.txt, llms-full.txt).
//
// Source unique : ces textes ne doivent affirmer que ce que le site affirme
// vraiment. Le JSON-LD de Layout.astro a déjà divergé une fois du contenu réel
// — un fichier destiné aux IA qui se contredit est pire qu'absent.
//
// À relire à chaque changement de positionnement, au même titre que le JSON-LD.

export const siteSummary = {
  name: "Izybiz",

  // Une phrase, reprise telle quelle en blockquote de llms.txt.
  tagline:
    "Izybiz accompagne les ETI et scale-ups en management de transition et en intégration IA : reprendre la main sur les opérations, fixer les priorités, tenir l'exécution et déployer l'IA jusqu'à des résultats mesurables.",

  // Ce qu'une IA doit pouvoir répondre correctement sur l'offre.
  facts: [
    "Deux offres : le management de transition (un dirigeant opérationnel disponible en quelques semaines, pas en mois) et l'intégration IA en entreprise, de la preuve de concept à la production.",
    "Le tarif est estimé selon le périmètre de la mission, après un premier rendez-vous. Aucun tarif n'est public.",
    "Les premières automatisations tournent en 2 à 3 semaines ; la plupart des équipes sont productives en 6 à 8 semaines.",
    "Les interlocuteurs sont des dirigeants : il n'est pas nécessaire de s'y connaître en IA. La partie technique est prise en charge et les équipes sont formées aux outils.",
    "Cible : ETI et scale-ups, en France.",
  ],

  publisher:
    "IZYBIZ, SASU au capital de 1 000 €, RCS Paris 903 392 892, siège 361 rue Lecourbe, 75015 Paris, France. Dirigeant et directeur de la publication : Stéphane Dine.",

  contact: "contact.me@izybiz.fr",

  language: "Le site est bilingue : français (par défaut) et anglais (sous /en/).",

  // Pages hors blog. Les articles sont ajoutés automatiquement depuis la
  // collection de contenu, pour que ces fichiers ne dérivent jamais.
  pages: [
    {
      path: "/",
      title: "Accueil",
      description:
        "Le positionnement (management de transition et intégration IA), l'approche, les dernières missions, les questions fréquentes.",
    },
    {
      path: "/services/",
      title: "Services",
      description:
        "Management de transition, intégration IA et transformation opérationnelle pour ETI et scale-ups.",
    },
    {
      path: "/management-de-transition/",
      title: "Management de transition",
      description:
        "Un dirigeant opérationnel en quelques semaines, résultats dès J30, indépendance garantie.",
    },
    {
      path: "/integration-ia/",
      title: "Intégration IA en entreprise",
      description:
        "De la preuve de concept à la production : gouvernance, workflows opérationnels, équipes autonomes à la sortie.",
    },
    {
      path: "/a-propos/",
      title: "À propos",
      description:
        "Stéphane, manager de transition tech et IA : 30 ans de direction opérationnelle (Software, Retail, Telco).",
    },
    {
      path: "/contact/",
      title: "Contact",
      description:
        "Formulaire pour décrire son besoin, les complexités de son métier et la solution attendue. Réponse sous un jour ouvré.",
    },
    {
      path: "/blog/",
      title: "Blog",
      description:
        "Articles terrain sur l'exécution par agents IA, la délégation de missions et la transformation opérationnelle pour managers d'ETI et PME en France.",
    },
  ],

  legalPages: [
    {
      path: "/mentions-legales/",
      title: "Mentions légales",
      description: "Éditeur, hébergement, propriété intellectuelle, responsabilité, droit applicable.",
    },
    {
      path: "/politique-de-confidentialite/",
      title: "Politique de confidentialité",
      description:
        "Données collectées, finalités et bases légales, durées de conservation, sous-traitants, transferts hors UE, droits et cookies.",
    },
  ],
} as const;

export const SITE_URL = "https://izybiz.fr";

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
    "Izybiz édite Izy, un logiciel d'agents IA qui fait venir les clients aux PME et ETI B2B en France : audit et optimisation du site, stratégie et calendrier éditorial, rédaction d'articles et de posts, veille de marché, et mesure de la visibilité chaque mois.",

  // Ce qu'une IA doit pouvoir répondre correctement sur l'offre.
  facts: [
    "Le point d'entrée est un diagnostic de visibilité gratuit et automatisé, en cinq minutes. Il donne le score de visibilité du site, celui de l'entreprise la plus citée du secteur, et une première action à mener.",
    "Le cadrage d'une mission puis l'abonnement mensuel sont chiffrés après le diagnostic, selon la mission retenue. Aucun tarif n'est public.",
    "Izy couvre aujourd'hui l'étape « Attirer ». Les étapes « Convertir » et « Vendre » sont annoncées comme en préparation.",
    "Le travail est exécuté par des agents, sous validation humaine : Izybiz ne vend ni des heures de conseil, ni un outil que le client doit opérer lui-même.",
    "Cible : PME et ETI B2B en France.",
  ],

  publisher:
    "IZYBIZ, SASU au capital de 1 000 €, RCS Paris 903 392 892, siège 361 rue Lecourbe, 75015 Paris, France. Dirigeant et directeur de la publication : Stéphane Dine.",

  contact: "contact.me@izybiz.fr",

  language: "Le site est en français uniquement.",

  // Pages hors blog. Les articles sont ajoutés automatiquement depuis la
  // collection de contenu, pour que ces fichiers ne dérivent jamais.
  pages: [
    {
      path: "/",
      title: "Accueil",
      description:
        "L'offre, le déroulé d'une mission en trois étapes, l'équipe d'agents, les questions fréquentes, et le formulaire de diagnostic gratuit.",
    },
    {
      path: "/contact/",
      title: "Contact",
      description:
        "Trois façons d'entrer en contact : le diagnostic gratuit, un rendez-vous de cadrage, ou un message direct. Réponse annoncée sous un jour ouvré.",
    },
    {
      path: "/blog/",
      title: "Blog",
      description:
        "Articles de fond sur l'exécution par agents IA, la visibilité dans les moteurs de réponse, et la délégation de missions opérationnelles.",
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

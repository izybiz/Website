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

// Questions reprises de l'ancien site izybiz.fr (avant la refonte d'août
// 2026) — même apparence .hv2-faq que la refonte, contenu de l'ancien site.
export const homeFaq: FaqEntry[] = [
  {
    q: "Comment on transforme l'IA en résultats business ?",
    a: "Izybiz repose sur une idée simple : les projets d'IA n'échouent pas à cause de la technologie, mais parce que personne ne porte à la fois l'intention business et la livraison. Forts de 20 ans de management, nous faisons en sorte que les solutions IA soient déployées, adoptées et produisent des résultats business concrets.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Nous estimons en fonction de votre périmètre. Prenez rendez-vous : nous vous donnerons des chiffres dès le départ. La transparence avant tout.",
  },
  {
    q: "Quel délai pour les premiers résultats ?",
    a: "Vous voyez des automatisations en marche en 2 à 3 semaines. Le déploiement complet dépend de vos systèmes. La plupart des équipes sont productives en 6 à 8 semaines.",
  },
  {
    q: "Dois-je changer mon équipe ou mes processus ?",
    a: "Non. Nous nous adaptons à votre façon de travailler aujourd'hui. Si votre process est cassé, nous vous le dirons. Mais nous n'imposons pas de réorganisation.",
  },
  {
    q: "Comment mesurez-vous le succès ?",
    a: "Heures gagnées par semaine. Affaires conclues. Fonctionnalités livrées. Erreurs réduites. Nous choisissons 2 à 3 métriques qui comptent pour vous et nous les suivons.",
  },
  {
    q: "Que faire si nous devons pivoter en cours de projet ?",
    a: "Nous anticipons les changements. Les workflows sont faciles à modifier. Pivoter coûte du temps, pas d'argent supplémentaire.",
  },
  {
    q: "Est-ce personnalisé ou basé sur des templates ?",
    a: "Les deux. Nous partons de vos processus concrets, pas de gabarits génériques. Mais nous réutilisons des patterns qui ont fait leurs preuves.",
  },
  {
    q: "Faut-il s'y connaître en IA pour travailler avec vous ?",
    a: "Pas du tout. Nos interlocuteurs sont des dirigeants, pas des ingénieurs. Toute la partie technique de l'IA est prise en charge de bout en bout, et vos équipes sont formées aux outils une fois en place.",
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

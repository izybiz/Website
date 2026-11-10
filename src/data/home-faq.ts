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

// Version anglaise — consommée par HomeV2En.astro et src/pages/en/index.astro
// (schéma FAQPage). Traduction de homeFaq (positionnement management de
// transition / intégration IA), pour rester cohérente avec le reste de la
// home EN — voir refonte-home-izybiz.md.
export const homeFaqEn: FaqEntry[] = [
  {
    q: "How do you turn AI into business results?",
    a: "Izybiz rests on a simple idea: AI projects don't fail because of the technology — they fail because nobody owns both the business intent and the delivery. With 20 years of management experience, we make sure AI solutions get deployed, adopted, and produce concrete business results.",
  },
  {
    q: "How much does it cost?",
    a: "We estimate based on your scope. Book a call and we'll give you figures from the start. Transparency first.",
  },
  {
    q: "How long until we see first results?",
    a: "You'll see automations running within 2 to 3 weeks. Full rollout depends on your systems. Most teams are productive within 6 to 8 weeks.",
  },
  {
    q: "Do I need to change my team or my processes?",
    a: "No. We adapt to the way you work today. If your process is broken, we'll tell you. But we don't impose a reorganisation.",
  },
  {
    q: "How do you measure success?",
    a: "Hours saved per week. Deals closed. Features shipped. Errors reduced. We pick 2 to 3 metrics that matter to you and we track them.",
  },
  {
    q: "What if we need to pivot mid-project?",
    a: "We plan for change. Workflows are easy to adjust. Pivoting costs time, not extra money.",
  },
  {
    q: "Is this custom-built or template-based?",
    a: "Both. We start from your actual processes, not generic templates. But we reuse patterns that have already proven themselves.",
  },
  {
    q: "Do I need to know AI to work with you?",
    a: "Not at all. The people we work with are executives, not engineers. All the technical AI work is handled end to end, and your teams are trained on the tools once they're in place.",
  },
];

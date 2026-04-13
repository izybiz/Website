---
title: "GitHub Spec-Kit: /specify, /plan, /tasks pour votre agent IA"
description: "Vos agents IA dévient de votre intention? Le spec-kit GitHub transforme votre besoin en spécification exécutable en 3 commandes. Voici comment ça fonctionne."
pubDate: 2025-11-15
lang: "fr"
translationKey: "2025-11-15"
---

Depuis mai 2025, BMAD a montré qu'on peut sortir du vibe coding. En imposant une équipe d'agents spécialisés -- analyste, PM, architecte, dev, QA -- qui se passent des artefacts structurés, il garantit que l'IA produit ce que vous avez réellement spécifié. Ça marche. C'est aussi un framework complet, avec une courbe de configuration réelle.

GitHub vient de répondre avec le spec-kit GitHub, sorti en novembre 2025: et si on pouvait faire le même pari côté spécification, mais en beaucoup plus léger?

Une CLI. Trois commandes. Et votre intention se transforme en spécification exécutable pour l'agent IA que vous utilisez déjà. C'est le principe du spec-driven development: moins d'itérations, plus de fiabilité.

---

## Le problème que spec-kit GitHub résout

Vous utilisez Cursor, Claude, Copilot, ou un autre agent IA pour développer. Vous lui décrivez ce que vous voulez. Il produit quelque chose. Ce n'est pas tout à fait ça, vous reformulez, il corrige, quelque chose d'autre change. Vous itérez.

Ce n'est pas du vibe coding au sens strict -- vous avez un objectif. Mais l'agent IA n'a pas de spec. Il travaille depuis un prompt, pas depuis un document structuré qui décrit précisément ce que le système doit faire, comment on mesure que c'est réussi, et ce qu'il ne doit absolument pas faire.

La différence entre un prompt et une spécification exécutable, c'est la différence entre "construis-moi quelque chose qui ressemble à ça" et "voici le contrat exact de ce que tu dois livrer".

Spec-kit produit ce cahier des charges structuré. En trois commandes.

---

## Les trois commandes du spec-kit GitHub

### `/specify`: transformer l'intention en document structuré

Vous décrivez votre besoin en langage naturel. Ce que vous voulez construire, pour qui, dans quel contexte, avec quelles contraintes. `/specify` engage un dialogue structuré: il pose des questions de clarification, identifie les zones grises, et produit un document de spécification agent IA complet.

Ce document n'est pas un cahier des charges en PDF. C'est un fichier de spécification structurée que votre agent IA peut lire comme input direct. Il contient:

- Le contexte et les objectifs
- Les fonctionnalités requises, avec leur priorité
- Les critères d'acceptance pour chaque fonctionnalité
- Les contraintes techniques et les dépendances
- Les cas limites et les comportements en cas d'erreur

Ce que `/specify` fait que vous ne ferez pas naturellement dans un prompt: il force l'exhaustivité. Il ne vous laisse pas ignorer les cas limites. Il ne vous laisse pas écrire "l'outil doit gérer les erreurs" sans définir ce que ça veut dire concrètement. C'est le rôle de la spécification agent IA: contraindre l'intention avant d'ouvrir le workflow IA.

### `/plan`: décomposer la spec en étapes exécutables

Une fois la spec produite, `/plan` la traduit en plan d'implémentation. Il décompose le projet en modules, séquence les dépendances, et identifie les points d'attention techniques.

Ce plan est ce que votre agent IA reçoit pour travailler. Pas "construis ce module", mais "voici le module, voici ce qu'il doit faire, voici ce dont il dépend, voici comment on valide qu'il est correct".

Le plan est aussi ce qui vous permet de piloter. Chaque étape est délimitée, avec un livrable attendu et des critères de validation. Vous ne mesurez plus l'avancement au feeling -- vous le mesurez à ce qui a été livré et ce qui a été validé. C'est là que le développement IA structuré par la spécification prend tout son sens.

### `/tasks`: générer la liste de tâches pour l'agent

`/tasks` prend le plan et génère la liste de tâches concrètes pour l'agent IA. Chaque tâche est atomique, avec son contexte, ses inputs, ses outputs attendus, et ses dépendances.

C'est le niveau d'instruction auquel un agent IA travaille de façon fiable. Pas une description générale, une tâche précise avec un périmètre clair.

Ce que ça change dans la pratique: votre agent IA ne "devine" plus ce qu'il doit faire. Il reçoit une tâche délimitée, il produit un output défini, il passe à la suivante. Le résultat final est cohérent parce que chaque tâche a été conçue pour l'être.

---

## Ce que ça donne concrètement

La responsable produit d'une scale-up SaaS B2B a utilisé spec-kit sur un module d'export de rapports en octobre 2025. Trente minutes pour exprimer le besoin à `/specify`. Une heure pour valider le document produit et ajuster deux critères d'acceptance. `/plan` a séquencé le projet en six modules. `/tasks` a généré 23 tâches pour l'agent.

Durée de développement: onze jours. Alignement avec la spec initiale: 96 %. Aucun aller-retour de reformulation en cours de route.

"La différence, c'est que j'ai lu le document de spec et j'ai dit oui ou non sur chaque point avant que quoi que ce soit soit codé. L'agent n'a pas eu à deviner. Les 4 % d'écart, c'est des cas limites que j'avais sous-spécifiés -- c'est moi, pas l'agent."

Un chef de projet d'une agence digitale l'a utilisé sur un projet client en novembre 2025. Trois développeurs, un périmètre de six semaines. Chaque semaine, `/tasks` génère les tâches pour la semaine suivante depuis le plan. Les développeurs savent exactement quoi produire. Le client sait exactement comment valider.

"On a divisé par trois le temps passé en réunion de cadrage. La spec fait ce travail à notre place."

> **Vous passez à un développement IA structuré?** Une [intégration IA structurée](https://izybiz.fr/integration-ia) couvre use cases, gouvernance, workflows, et outillage, avec des résultats mesurables dès J30. [Discutons-en.](https://izybiz.fr/contact)

---

## Spec-kit GitHub ou BMAD: lequel choisir

La question n'est pas laquelle est meilleure. C'est laquelle correspond à votre projet.

| | spec-kit | BMAD |
|---|---|---|
| **Ce qu'il apporte** | Spécification structurée pour l'agent que vous utilisez déjà | Équipe complète d'agents spécialisés sur tout le cycle |
| **Complexité de mise en place** | Faible -- CLI, trois commandes | Moyenne à élevée -- configuration de 21 agents |
| **Point d'entrée** | Votre agent IA existant (Cursor, Claude, Copilot...) | Remplacement de votre workflow de développement |
| **Type de projet** | Module ou outil délimité, premier projet structuré | Produit complet, plusieurs modules interdépendants |
| **Profil requis** | Référent spec métier + dev pour validation | Dev senior pour orchestration des agents |
| **Ce que vous gardez** | Vos outils actuels, vous ajoutez la spec | Vous adoptez le framework complet |

Spec-kit s'insère dans votre workflow existant. Vous gardez l'agent IA que vous utilisez déjà -- vous lui donnez simplement de quoi travailler de façon fiable.

BMAD remplace le workflow. Il impose sa propre chaîne d'agents spécialisés, sa propre logique d'artefacts, sa propre gouvernance.

**La règle pratique:** commencez par le spec-kit GitHub. Si votre projet dépasse un module délimité, ou si vous voulez industrialiser le modèle sur des projets complexes, envisagez BMAD pour la suite.

Les deux résolvent le même problème -- l'absence de spécification structurée dans le développement IA. Ils le résolvent à des niveaux de sophistication différents, pour des contextes différents.

---

## Les deux erreurs à éviter avec spec-kit

**Spec vague, résultat vague.** `/specify` pose des questions -- répondez-y précisément. "L'outil doit permettre de suivre les opportunités" n'est pas une spec. "L'outil affiche les opportunités en cours classées par probabilité de closing, avec une alerte quand une opportunité n'a pas eu d'activité depuis 7 jours" en est une. La qualité du document de spécification détermine la qualité du livrable.

**Valider la spec avant de coder.** Le document produit par `/specify` n'est pas définitif -- il est le point de départ d'une validation. Lisez-le. Corrigez ce qui ne correspond pas. Ajoutez ce qui manque. L'investissement est là, pas dans les allers-retours de reformulation en cours de développement.

---

## Ce que le spec-kit GitHub change pour vos projets IA

Le problème du vibe coding n'est pas la vitesse. C'est l'absence de contrat entre ce que vous voulez et ce que l'IA produit.

Le spec-kit GitHub crée ce contrat. En trente minutes à deux jours selon la complexité du projet, vous produisez une spécification exécutable que votre agent IA peut suivre fidèlement, que votre équipe peut valider, et que vous pouvez auditer si quelque chose ne correspond pas.

Ce n'est pas une contrainte de plus dans votre processus. C'est la contrainte qui rend les autres utiles. C'est ce que les équipes qui pilotent vraiment leur workflow IA ont compris: la spécification structurée précède l'exécution.

Vous avez des projets de développement IA à structurer? On peut vous accompagner sur la mise en place de spec-kit ou BMAD selon votre contexte -- du premier document de spec au [pilotage de la performance](https://izybiz.fr/pilotage-performance) des livrables. Une [mission de management de transition DSI](https://izybiz.fr/management-de-transition) pose les fondamentaux en 90 jours. [Discutez de votre situation.](https://izybiz.fr/contact)

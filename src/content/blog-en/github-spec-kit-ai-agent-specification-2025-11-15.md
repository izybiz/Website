---
title: "GitHub Spec-Kit: /specify, /plan, /tasks for Your AI Agent"
description: "Your AI agents drift from your intent. The GitHub spec-kit turns your requirement into an executable specification in 3 commands. Here is how it works."
pubDate: 2025-11-15
lang: "en"
translationKey: "2025-11-15"
---

Since May 2025, BMAD has shown that escaping vibe coding is possible. By enforcing a team of specialised agents, analyst, PM, architect, developer, QA, that pass structured artefacts to one another, it guarantees that the AI produces what you actually specified. It works. It is also a complete framework, with a real configuration learning curve.

GitHub has now responded with the GitHub spec-kit, released in November 2025: what if we could make the same bet on the specification side, but far more lightly?

One CLI. Three commands. And your intent is transformed into an executable specification for the AI agent you already use. That is the principle of spec-driven development: fewer iterations, greater reliability.

---

## The problem that GitHub spec-kit solves

You use Cursor, Claude, Copilot, or another AI agent for development. You describe what you want. It produces something. It is not quite right, you rephrase, it corrects, something else changes. You iterate.

This is not vibe coding in the strict sense, you have an objective. But the AI agent has no spec. It works from a prompt, not from a structured document that precisely describes what the system must do, how you measure success, and what it must absolutely not do.

The difference between a prompt and an executable specification is the difference between "build me something that looks like this" and "here is the exact contract of what you must deliver".

Spec-kit produces that structured brief. In three commands.

---

## The three commands of the GitHub spec-kit

### `/specify`: turning intent into a structured document

You describe your requirement in natural language. What you want to build, for whom, in what context, with what constraints. `/specify` opens a structured dialogue: it asks clarifying questions, identifies grey areas, and produces a complete AI agent specification document.

This document is not a requirements PDF. It is a structured specification file that your AI agent can read as direct input. It contains:

- Context and objectives
- Required features, with their priority
- Acceptance criteria for each feature
- Technical constraints and dependencies
- Edge cases and error-handling behaviours

What `/specify` does that you would not naturally do in a prompt: it forces exhaustiveness. It does not let you ignore edge cases. It does not let you write "the tool must handle errors" without defining what that means concretely. That is the role of AI agent specification: constraining intent before opening the AI workflow.

### `/plan`: decomposing the spec into executable steps

Once the spec is produced, `/plan` translates it into an implementation plan. It breaks the project down into modules, sequences dependencies, and identifies technical points of attention.

This plan is what your AI agent receives to work from. Not "build this module", but "here is the module, here is what it must do, here is what it depends on, here is how we validate it is correct".

The plan is also what allows you to manage progress. Each step is bounded, with an expected deliverable and validation criteria. You no longer measure progress by feel, you measure it by what has been delivered and what has been validated. This is where spec-driven AI development comes fully into its own.

### `/tasks`: generating the task list for the agent

`/tasks` takes the plan and generates the concrete task list for the AI agent. Each task is atomic, with its context, its inputs, its expected outputs, and its dependencies.

This is the level of instruction at which an AI agent works reliably. Not a general description, a precise task with a clear scope.

What this changes in practice: your AI agent no longer "guesses" what to do. It receives a bounded task, produces a defined output, and moves to the next. The final result is coherent because every task was designed to be so.

---

## What this looks like in practice

The head of product at a B2B SaaS scale-up used spec-kit on a report-export module in October 2025. Thirty minutes to express the requirement to `/specify`. One hour to review the produced document and adjust two acceptance criteria. `/plan` sequenced the project into six modules. `/tasks` generated 23 tasks for the agent.

Development duration: eleven days. Alignment with the initial spec: 96%. No reformulation back-and-forth along the way.

"The difference was that I read the spec document and said yes or no to each point before anything was coded. The agent did not have to guess. The 4% discrepancy was edge cases I had under-specified, that was me, not the agent."

A project manager at a digital agency used it on a client project in November 2025. Three developers, a six-week scope. Each week, `/tasks` generates the tasks for the following week from the plan. Developers know exactly what to produce. The client knows exactly how to validate.

"We cut the time spent in scoping meetings by three. The spec does that work for us."

> **Moving to structured AI development?** A [structured AI integration](https://izybiz.fr/integration-ia) covers use cases, governance, workflows, and tooling, with measurable results from day 30. [Let's talk.](https://izybiz.fr/contact)

---

## Spec-kit or BMAD: which to choose

The question is not which is better. It is which fits your project.

| | spec-kit | BMAD |
|---|---|---|
| **What it provides** | Structured specification for the agent you already use | A complete team of specialised agents across the full cycle |
| **Setup complexity** | Low, CLI, three commands | Medium to high, configuration of 21 agents |
| **Entry point** | Your existing AI agent (Cursor, Claude, Copilot...) | Replacement of your development workflow |
| **Project type** | Bounded module or tool, first structured project | Full product, multiple interdependent modules |
| **Profile required** | Business spec lead + developer for validation | Senior developer for agent orchestration |
| **What you keep** | Your current tools, you add the spec layer | You adopt the complete framework |

Spec-kit slots into your existing workflow. You keep the AI agent you already use, you simply give it something to work from reliably.

BMAD replaces the workflow. It enforces its own chain of specialised agents, its own artefact logic, its own governance.

**The practical rule:** start with the GitHub spec-kit. If your project exceeds a bounded module, or if you want to industrialise the model across complex projects, consider BMAD for the next step.

Both solve the same problem, the absence of structured specification in AI development. They solve it at different levels of sophistication, for different contexts.

---

## The two mistakes to avoid with spec-kit

**Vague spec, vague result.** `/specify` asks questions, answer them precisely. "The tool must allow tracking of opportunities" is not a spec. "The tool displays open opportunities ranked by closing probability, with an alert when an opportunity has had no activity for 7 days" is. The quality of the specification document determines the quality of the deliverable.

**Validate the spec before coding.** The document produced by `/specify` is not final, it is the starting point for validation. Read it. Correct what does not match. Add what is missing. The investment is there, not in reformulation back-and-forth mid-development.

---

## What the GitHub spec-kit changes for your AI projects

The problem with vibe coding is not speed. It is the absence of a contract between what you want and what the AI produces.

The GitHub spec-kit creates that contract. In thirty minutes to two days depending on project complexity, you produce an executable specification that your AI agent can follow faithfully, that your team can validate, and that you can audit if something does not match.

This is not one more constraint in your process. It is the constraint that makes the others useful. This is what teams who genuinely manage their AI workflow have understood: structured specification precedes execution.

You have AI development projects to structure? We can support you in deploying spec-kit or BMAD depending on your context, from the first specification document to [performance management](https://izybiz.fr/pilotage-performance) of deliverables. An [interim CTO engagement](https://izybiz.fr/management-de-transition) lays the foundations in 90 days. [Discuss your situation.](https://izybiz.fr/contact)

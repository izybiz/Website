/**
 * Prévient IndexNow après chaque déploiement réussi.
 *
 * `onSuccess` et pas `onBuild` : au moment du build le nouveau contenu n'est pas
 * encore en ligne, et un moteur qui viendrait aussitôt relirait l'ancienne page.
 *
 * Rien ici ne doit faire échouer un déploiement. Le site est en production ; un
 * ping raté est un non-événement, un déploiement rouge n'en est pas un. D'où le
 * try/catch qui avale tout : on journalise, on ne relance jamais l'erreur.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

export const onSuccess = async () => {
  try {
    const { stdout } = await run("node", ["scripts/indexnow.mjs"], { timeout: 30_000 });
    console.log(stdout);
  } catch (error) {
    console.log(`[indexnow] ping non effectué : ${error.message}`);
  }
};

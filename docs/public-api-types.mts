// Objectif : vérifier les types publiés depuis un projet consommateur.
import { riverSignalCase, assessRiverSignal, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = riverSignalCase({
  "id": "exemple-1",
  "text": "Mesures synthétiques répétées sur trois campagnes et deux stations voisines : le même paramètre évolue dans le même sens avec des méthodes comparables.",
  "source": {
    "url": "https://example.test/source-publique",
    "date": "2026-10-01"
  },
  "details": {
    "territoire": "France — cas synthétique",
    "origine": "donnée synthétique"
  }
});
void DECISIONS;
void assessRiverSignal(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "persistent_signal", probabilities: { "persistent_signal": 0.82, "review_required": 0.06, "isolated_signal": 0.06, "no_measurement": 0.06 }, confidence: 0.82 } } })));

// Ces erreurs attendues protègent le contrat des consommateurs TypeScript.
// @ts-expect-error — un fournisseur doit retourner une réponse Jev complète.
createFakeProvider(() => ({}));
const result = await assessRiverSignal(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: {} })));
const review: boolean = result.review;
void review;
// @ts-expect-error — la revue humaine est un booléen.
const incorrect: string = result.review;
void incorrect;

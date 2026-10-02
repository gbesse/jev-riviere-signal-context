// Objectif : montrer une décision sémantique avec des données entièrement synthétiques.
import assert from "node:assert/strict";
import { assessRiverSignal } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = {
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
};
const provider = createFakeProvider(() => ({
  "model": "jev-1.13.0",
  "answers": {
    "decision": {
      "type": "choice",
      "choice": "persistent_signal",
      "probabilities": {
        "persistent_signal": 0.82,
        "review_required": 0.06,
        "isolated_signal": 0.06,
        "no_measurement": 0.06
      },
      "confidence": 0.82
    }
  },
  "usage": {
    "input_tokens": 120,
    "output_tokens": 0
  }
}));
const résultat = await assessRiverSignal(dossier, provider);
assert.equal(résultat.decision, "persistent_signal");
assert.equal(résultat.review, false);
assert.equal(provider.calls, 1);
console.log(`Décision : ${résultat.label} · probabilité : ${résultat.probability}`);

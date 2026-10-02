// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessRiverSignal } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessRiverSignal({
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
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));

// Objectif : produire un rapport hors ligne comparant les trois chemins de décision.
import { assessRiverSignal } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const principal = {
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
const limite = {
  "id": "limite-1",
  "text": "Cas synthétique traité par une règle déterministe avant toute analyse sémantique.",
  "source": {
    "url": "https://example.test/cas-limite",
    "date": "2026-10-01"
  },
  "measurements": []
};
const revue = {
  "id": "revue-1",
  "text": "Deux valeurs élevées proviennent de stations différentes, avec unités et méthodes non renseignées et sans historique comparable.",
  "source": {
    "url": "https://example.test/dossier-ambigu",
    "date": "2026-10-01"
  },
  "details": {
    "origine": "donnée synthétique",
    "signal": "informations incomplètes"
  }
};
const réponses = [{
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
}, {
  "model": "jev-1.13.0",
  "answers": {
    "decision": {
      "type": "choice",
      "choice": "review_required",
      "probabilities": {
        "persistent_signal": 0.1267,
        "review_required": 0.62,
        "isolated_signal": 0.1267,
        "no_measurement": 0.1267
      },
      "confidence": 0.62
    }
  },
  "usage": {
    "input_tokens": 140,
    "output_tokens": 0
  }
}];
const provider = createFakeProvider(() => réponses.shift());
const résultats = [];
for (const [scénario, dossier] of [["principal", principal], ["limite déterministe", limite], ["revue humaine", revue]]) {
  const résultat = await assessRiverSignal(dossier, provider);
  résultats.push({ scénario, décision: résultat.label, revueHumaine: résultat.review, déterministe: résultat.deterministic });
}
console.log(JSON.stringify({ dépôt: "jev-riviere-signal-context", résultats }, null, 2));

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
void assessRiverSignal(dossier, createFakeProvider(() => ({})));

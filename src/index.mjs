// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "persistent_signal": "signal_persistant",
  "review_required": "revue_requise",
  "isolated_signal": "signal_ponctuel",
  "no_measurement": "aucune_mesure_fournie"
});
const CRITERIA = Object.freeze({
  "persistent_signal": "signal persistant",
  "review_required": "revue requise",
  "isolated_signal": "signal ponctuel",
  "no_measurement": "aucune mesure fournie"
});
export function riverSignalCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessRiverSignal(input, provider) {
  const record = riverSignalCase(input);
  if (Array.isArray(record.measurements) && record.measurements.length === 0) return { decision: "no_measurement", label: DECISIONS["no_measurement"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier à partir des seuls éléments sourcés. Évaluez la répétition du signal, la concordance entre stations, la saison et les conditions de prélèvement documentées. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni règle applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-riviere-signal-context <dossier.json>");
  const dossier = riverSignalCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessRiverSignal avec un fournisseur Jev configuré." }, null, 2));
}

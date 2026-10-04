# Comment la décision est prise

Replace un groupe de mesures de cours d’eau dans un contexte persistant, ponctuel ou insuffisamment documenté.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon la répétition du signal, la concordance entre stations, la saison et les conditions de prélèvement documentées. Une confiance inférieure à `0.8`, la catégorie `review_required` ou une absence de données choisie par le modèle marque le résultat pour revue humaine. Une collection vide explicitement fournie reste un résultat déterministe sans appel Jev.

Les conversions d’unités, seuils de qualité et agrégations temporelles restent déterministes.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.

// Gestion des interactions de la carte et mise à jour des panneaux d'information

/**
 * Met à jour tous les panneaux d'information pour une zone donnée
 */
function updateInfoPanels(zoneKey, zoneData) {
    // Éléments DOM
    const elements = {
        canopee: document.getElementById('canopee-zone-name'),
        occupation: document.getElementById('occupation-zone-name'),
        analysis: document.getElementById('analysis-zone-name')
    };

    // Définir les noms à afficher en fonction de la clé
    const displayName = (zoneKey === 'select-commune' || zoneKey === 'select-zones') ? '' : zoneKey;
    let analysisTitleName;
    if (zoneKey === 'select-commune') {
        analysisTitleName = 'de la Commune';
    } else if (zoneKey === 'select-zones') {
        analysisTitleName = 'des Zones Étudiées';
    } else {
        analysisTitleName = `du secteur ${zoneKey}`;
    }

    // Mise à jour des titres
    if (elements.canopee) elements.canopee.textContent = displayName;
    if (elements.occupation) elements.occupation.textContent = displayName;
    if (elements.analysis) elements.analysis.textContent = analysisTitleName;

    // Mise à jour du texte d'analyse en utilisant la clé correcte
    const analysisData = findZoneAnalysis(zoneKey);
    const analysisHtml = analysisData?.html || '<p>Sélectionnez une zone pour afficher une analyse détaillée.</p>';
    const analysisElement = document.getElementById('dynamic-analysis-text');
    if (analysisElement) {
        analysisElement.innerHTML = analysisHtml;
    }

    // Mise à jour des indicateurs
    updateVegetationIndicators(zoneData);
}


/**
 * Met à jour uniquement les éléments qui dépendent de l'unité (ha ou %)
 */
function updateUnitDependentElements() {
    const zoneSelect = document.getElementById('zone-select');
    if (!zoneSelect) return;
    
    const currentZoneKey = zoneSelect.value;
    
    // Récupération des données selon le type de zone
    let zoneData;
    if (currentZoneKey === 'select-zones') {
        zoneData = getAggregatedDataForZones();
    } else {
        zoneData = findZoneData(currentZoneKey);
    }
    
    // Mise à jour des indicateurs avec les bonnes données
    updateVegetationIndicators(zoneData);
    
    // Mise à jour du graphique
    const chartKey = (currentZoneKey === 'select-zones') ? 'overall' : currentZoneKey;
    if (window.updateChartForZone) {
        window.updateChartForZone(chartKey);
    }
}

/**
 * Met à jour les indicateurs de végétation (évolution et équivalence terrains de foot)
 */
function updateVegetationIndicators(zoneData) {
    const vegetationElement = document.getElementById('vegetation-loss');
    const footballElement = document.getElementById('football-transcription');

    if (!vegetationElement || !footballElement || !zoneData) {
        if (vegetationElement) vegetationElement.textContent = '-- %';
        if (footballElement) footballElement.textContent = '';
        return;
    }

    const isHectares = document.getElementById('unit-switch-v1')?.checked;
    const currentZoneKey = document.getElementById('zone-select').value; // Récupère la clé de la zone actuellement sélectionnée

    // Trouve l'index de la végétation dynamiquement à partir de la configuration
    const vegetationIndex = chartCategories.indexOf('Végétation');
    if (vegetationIndex === -1) { // Sécurité minimale si "Végétation" n'est pas trouvé
        if (vegetationElement) vegetationElement.textContent = 'N/A';
        if (footballElement) footballElement.textContent = 'Catégorie "Végétation" non définie.';
        return;
    }

    // Données de végétation
    const vegBefore = zoneData.dataBefore[vegetationIndex];
    const vegAfter = zoneData.dataAfter[vegetationIndex];
    const vegBeforeHa = zoneData.dataBeforeha[vegetationIndex];
    const vegAfterHa = zoneData.dataAfterha[vegetationIndex];

    // Calcul de l'évolution
    let evolutionText = 'Non calculé';
    let diffHa = vegAfterHa - vegBeforeHa; // Calcule diffHa ici pour la cohérence

    // Condition pour afficher "Non calculé"
    if (currentZoneKey === 'select-commune' || diffHa === 0) { // Vérifie si la zone est 'select-commune' OU si la différence en hectares est 0
        evolutionText = 'Non calculé';
    } else if (isHectares) {
        evolutionText = `${diffHa > 0 ? '+' : ''}${diffHa.toFixed(1)} ha`;
    } else if (vegBefore > 0) {
        const diffPercent = ((vegAfter - vegBefore) / vegBefore) * 100;
        evolutionText = `${diffPercent > 0 ? '+' : ''}${diffPercent.toFixed(1)} %`;
    }
    vegetationElement.textContent = evolutionText;

    // Équivalence terrains de football
    let footballText = '';
    // Ajout de la condition pour 'select-commune' et diffHa === 0 ici aussi
    if (footballFields >= 0.1 && currentZoneKey !== 'select-commune' && diffHa !== 0) {
        const footballFields = Math.abs(diffHa) / 0.714; // 1 terrain = 0.714 ha
        footballText = `Soit ${footballFields.toFixed(1)} terrains de football`;
    }
    footballElement.textContent = footballText;
}

/**
 * Gère la sélection d'une zone (carte ou menu déroulant)
 */
function handleZoneSelection(zoneKey) {
    //recup pour afficher le i de l'information
     document.getElementById('occupation-info-tooltip').style.display = (zoneKey === 'select-commune') ? 'inline-block' : 'none';
    // Synchronisation du menu déroulant
    const zoneSelect = document.getElementById('zone-select');
    if (zoneSelect && zoneSelect.value !== zoneKey) {
        zoneSelect.value = zoneKey;
    }

    // Reset des couches de comparaison
    resetComparisonLayers();

    // Chargement des couches spécifiques si disponibles
    const specificLayers = findInMapping(window.zoneSpecificGeojsonData, zoneKey);
    if (specificLayers) {
        loadComparisonLayers(specificLayers, zoneKey);
    }

    // Mise à jour du graphique
    if (window.updateChartForZone) {
        const chartKey = (zoneKey === 'select-zones') ? 'overall' : zoneKey;
        window.updateChartForZone(chartKey);
    }
 
    // Gestion des vues globales (commune ou toutes zones)
    if (zoneKey === "select-commune" || zoneKey === "select-zones") {
        handleGlobalView(zoneKey);
    } else {
        handleSpecificZone(zoneKey, specificLayers);
    }
}

/**
 * Gère l'affichage des vues globales (commune ou toutes zones)
 */
function handleGlobalView(zoneKey) {
    resetAllLayerStyles();
    
    if (zoneKey === "select-commune") {
        if (communeLayer) communeLayer.setStyle(highlightCommuneStyle);
        if (map) map.setView(window.mapCenter, window.initialZoom);
        updateInfoPanels(zoneKey, findZoneData(zoneKey));
    } else { // "select-zones"
        const aggregatedData = getAggregatedDataForZones();
        highlightAllPolygons();
        updateInfoPanels(zoneKey, aggregatedData);
    }
}


/**
 * Gère l'affichage d'une zone spécifique
 */
function handleSpecificZone(zoneKey, hasSpecificLayers) {
    const zoneData = findZoneData(zoneKey);
    const zoneLayer = findZoneLayer(zoneKey);

    updateInfoPanels(zoneKey, zoneData);

    // Zoom sur la zone si pas de couches spécifiques
    if (zoneLayer && !hasSpecificLayers) {
        highlightPolygonAndZoom(zoneLayer);
    }
}

// Initialisation des écouteurs d'événements
document.addEventListener('DOMContentLoaded', () => {
    const unitSwitch = document.getElementById('unit-switch-v1');
    const zoneSelect = document.getElementById('zone-select');

    // Écouteur pour le changement d'unité
    if (unitSwitch && zoneSelect) {
        unitSwitch.addEventListener('change', updateUnitDependentElements);
    }
});
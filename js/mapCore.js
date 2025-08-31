// Variables globales pour la carte et les couches
let map;
let geojsonLayers = {};
let communeLayer = null;
let legend;
let geojsonLayerBefore = null;
let geojsonLayerAfter = null;
let opacityControl = null;

/**
 * Recherche une valeur dans un objet de mapping
 */
function findInMapping(mappingObject, key, defaultValue = null) {
    return mappingObject?.[key] || defaultValue;
}

// Fonctions de recherche spécialisées
const findZoneLayer = (zoneName) => findInMapping(geojsonLayers, zoneName);
const findZoneData = (zoneName) => findInMapping(window.polygonChartDataMapping, zoneName);
const findZoneAnalysis = (zoneName) => findInMapping(window.zoneAnalysisText, zoneName, "<p>Information non disponible pour cette zone.</p>");

/**
 * Initialise la carte de base
 */
function initializeMap() {
    const tileLayerUrl = window.layerUrl || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> version courante & FreshWay';

    map = L.map('map').setView(window.mapCenter, window.initialZoom);
    L.tileLayer(tileLayerUrl, { attribution }).addTo(map);
}

/**
 * Ajoute la couche commune à la carte
 */
function addCommuneLayer() {
    if (!window.commune?.geojsonData) return;

    communeLayer = L.geoJSON(window.commune.geojsonData, {
        style: defaultCommuneStyle,
        onEachFeature: (feature, layer) => {
            layer.on('click', () => handleZoneSelection("select-commune"));
        }
    }).addTo(map);
}

/**
 * Ajoute les zones d'étude à la carte
 */
function addStudyZones() {
    if (!window.zone_etudiee?.geojsonData?.features) return;

    L.geoJSON(window.zone_etudiee.geojsonData, {
        style: defaultPolygonStyle,
        onEachFeature: (feature, layer) => {
            const zoneName = feature.properties?.nom;
            if (!zoneName) {
                console.warn("Zone sans nom:", feature);
                return;
            }

            geojsonLayers[zoneName] = layer;
            layer.on('click', () => handleZoneSelection(zoneName));
        }
    }).addTo(map);
}

/**
 * Configure le menu déroulant et sa synchronisation
 */
function setupZoneSelector() {
    const zoneSelect = document.getElementById('zone-select');
    if (!zoneSelect) {
        console.error("Élément #zone-select introuvable");
        return;
    }

    // Écouteur de changement
    zoneSelect.addEventListener('change', function() {
        handleZoneSelection(this.value);
    });

    // Sélection initiale
    const defaultValue = zoneSelect.querySelector('[value="select-commune"]') ? 
        "select-commune" : zoneSelect.options[0]?.value;
    
    if (defaultValue) {
        zoneSelect.value = defaultValue;
        handleZoneSelection(defaultValue);
    }
}

/**
 * Ajoute le contrôle de légende personnalisé
 */
function addLegendControl() {
    if (typeof CustomButtonControl === 'undefined') {
        console.error("CustomButtonControl non défini");
        return;
    }

    if (!document.querySelector('.leaflet-control[title="Afficher/Masquer la légende"]')) {
        new CustomButtonControl({ position: 'bottomleft' }).addTo(map);
    }
}

function getAggregatedDataForZones() {
    const zonesToProcess = Object.entries(window.polygonChartDataMapping)
                                 .filter(([key, _]) => key !== 'select-commune')
                                 .map(([_, value]) => value);

    if (zonesToProcess.length === 0) return null;

    const numCategories = 4;
    const sums = { pBefore: new Array(numCategories).fill(0), pAfter: new Array(numCategories).fill(0), haBefore: new Array(numCategories).fill(0), haAfter: new Array(numCategories).fill(0) };

    zonesToProcess.forEach(zone => {
        for (let i = 0; i < numCategories; i++) {
            sums.pBefore[i] += zone.dataBefore[i] || 0;
            sums.pAfter[i] += zone.dataAfter[i] || 0;
            sums.haBefore[i] += zone.dataBeforeha[i] || 0;
            sums.haAfter[i] += zone.dataAfterha[i] || 0;
        }
    });

    return {
        dataBefore: sums.pBefore.map(s => s / zonesToProcess.length),
        dataAfter: sums.pAfter.map(s => s / zonesToProcess.length),
        dataBeforeha: sums.haBefore,
        dataAfterha: sums.haAfter
    };
}

// Initialisation principale
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    addCommuneLayer();
    addStudyZones();
    addLegend();
    addLegendControl();
    setupZoneSelector();
});


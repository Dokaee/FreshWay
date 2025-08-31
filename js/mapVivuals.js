// ===== STYLES DE BASE =====
const defaultPolygonStyle = {
    color: 'rgb(255, 120, 0)',
    weight: 5,
    opacity: 0.65,
    fillColor: 'rgb(255, 200, 100)',
    fillOpacity: 0.1
};

const highlightStyle = {
    color: 'rgb(82, 174, 180)',
    weight: 5,
    opacity: 2,
    fillColor: 'rgb(0,255,255)',
    fillOpacity: 0.2
};

const defaultCommuneStyle = {
    fillOpacity: '0',
    weight: '3',
    color: 'rgb(19, 19, 19)',
    dashArray: '5, 10'
};

const highlightCommuneStyle = {
    fillOpacity: '0.2',
    weight: '3',
    color: 'rgb(82, 174, 180)',
    fillColor: 'rgb(0,255,255)',
    dashArray: '5, 10'
};

// ===== STYLES D'OCCUPATION DU SOL =====
const LAND_USE_STYLES = {
    vegetation: { fillOpacity: '1', weight: '0', fillColor: 'rgb(157, 187, 125)' },
    building: { fillOpacity: '1', weight: '0', fillColor: 'rgb(205, 116, 119)' },
    waterTight: { fillOpacity: '1', weight: '0', fillColor: 'rgb(207, 207, 205)' },
    bareGround: { fillOpacity: '1', weight: '0', fillColor: 'rgb(185, 99, 49)' },
    canopy: { fillOpacity: '1', weight: '0', fillColor: 'rgb(86, 110, 65)' },
    hydrography: { fillOpacity: '1', weight: '0', fillColor: 'rgb(52, 66, 196)' }
};

// ===== VARIABLES D'ÉTAT =====
let currentVisibleLayer = null;

/**
 * Retourne le style approprié selon la classe d'occupation du sol
 */
function getZoneStyle(feature) {
    const className = feature.properties.nom_classe;
    const styleMap = {
        [window.vegetation]: LAND_USE_STYLES.vegetation,
        [window.building]: LAND_USE_STYLES.building,
        [window.waterTight]: LAND_USE_STYLES.waterTight,
        [window.bareGrnd]: LAND_USE_STYLES.bareGround,
        [window.canopee]: LAND_USE_STYLES.canopy
    };
    return styleMap[className] || { 
        color: "#808080", 
        weight: 1, 
        opacity: 0.6, 
        fillOpacity: 0.1, 
        fillColor: "#808080" 
    };
}

// ===== GESTION DES STYLES DE COUCHES =====

/**
 * Remet tous les styles à leur état par défaut
 */
function resetAllLayerStyles() {
    if (communeLayer) communeLayer.setStyle(defaultCommuneStyle);
    Object.values(geojsonLayers).forEach(layer => layer.setStyle(defaultPolygonStyle));
}

/**
 * Met en surbrillance un polygone et zoome dessus
 */
function highlightPolygonAndZoom(layer) {
    resetAllLayerStyles();
    layer.setStyle(highlightStyle);
    if (layer.getBounds) map.fitBounds(layer.getBounds());
}

/**
 * Met en surbrillance tous les polygones et ajuste la vue
 */
function highlightAllPolygons() {
    resetAllLayerStyles();
    const allBounds = new L.LatLngBounds();
    
    Object.values(geojsonLayers).forEach(layer => {
        layer.setStyle(highlightStyle);
        if (layer.getBounds) allBounds.extend(layer.getBounds());
    });
    
    if (allBounds.isValid()) map.fitBounds(allBounds);
}

// ===== GESTION DE LA LÉGENDE =====

/**
 * Génère le HTML des éléments permanents de la légende
 */
function createPermanentLegendHTML() {
    return `
        <div class="flex items-center mb-2">
            <svg class="w-5 h-5 flex-shrink-0 mr-2" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="rgba(0, 255, 255, 0)" stroke="rgb(0, 0, 0)" stroke-width="20" stroke-dasharray="20,10"/>
            </svg>
            <span>Limite de la commune</span>
        </div>
        <div class="flex items-center mb-2">
            <svg class="w-5 h-5 flex-shrink-0 mr-2" viewBox="0 0 100 100">
                 <rect width="100" height="100" fill="rgba(255, 150, 60, 0.1)" stroke="rgb(255, 150, 60)" stroke-width="15" />
            </svg>
            <span>Zone d'étude</span>
        </div>
        <hr class="my-2">
    `;
}

/**
 * Crée et ajoute la légende à la carte
 */
function addLegend() {
    if (legend) return;

    legend = L.control({ position: 'bottomright' });
    legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'info legend bg-white p-2 rounded-md shadow-md font-["Libre Franklin"] text-gray-800 leading-relaxed border border-gray-200 hidden');
        
        div.innerHTML = `
            <h4 class="mt-0 mb-3 text-site-primary text-base font-bold text-center pb-1 border-b border-gray-200">Occupation du Sol</h4>
            ${createPermanentLegendHTML()}
            <div id="legend-items-dynamic"></div>
        `;
        return div;
    };
    legend.addTo(map);
}

/**
 * Met à jour le contenu dynamique de la légende selon les features affichées
 */
function updateLegendContent(features) {
    if (!legend) return;

    const legendItemsContainer = legend.getContainer().querySelector('#legend-items-dynamic');
    if (!legendItemsContainer) return;

    const legendOrder = [
        { id: window.building, name: "Bâtiment", style: LAND_USE_STYLES.building },
        { id: window.vegetation, name: "Végétation", style: LAND_USE_STYLES.vegetation },
        { id: window.waterTight, name: "Zone imperméable", style: LAND_USE_STYLES.waterTight },
        { id: window.hydrography, name: "Hydrographie", style: LAND_USE_STYLES.bareGround }, // Assumant que hydrographie utilise le style bareGround
        { id: window.bareGrnd, name: "Sol nu", style: LAND_USE_STYLES.bareGround }
    ];

    const canopyItem = { id: window.canopee, name: "Canopée", style: LAND_USE_STYLES.canopy };

    let dynamicContent = '';
    if (features && features.length > 0) {
        const uniqueClassNames = new Set(features.map(f => f.properties.nom_classe));
        
        // Ajout des éléments principaux
        legendOrder.forEach(item => {
            if (uniqueClassNames.has(item.id)) {
                dynamicContent += `<div class="flex items-center mb-2">
                    <i class="w-5 h-5 flex-shrink-0 mr-2 rounded-sm" style="background:${item.style.fillColor};"></i> 
                    <span>${item.name}</span>
                </div>`;
            }
        });
        
        // Ajout de la canopée séparément si présente
        if (uniqueClassNames.has(canopyItem.id)) {
            dynamicContent += `<hr class="my-2">
                <div class="flex items-center mb-0">
                    <i class="w-5 h-5 flex-shrink-0 mr-2 rounded-sm" style="background:${canopyItem.style.fillColor};"></i> 
                    <span>${canopyItem.name}</span>
                </div>`;
        }
    }

    legendItemsContainer.innerHTML = dynamicContent;
}

/**
 * Bascule la visibilité de la légende
 */
window.toggleLegend = function(show) {
    if (!legend) addLegend();
    const legendElement = legend.getContainer();
    if (typeof show === 'boolean') {
        legendElement.classList.toggle('hidden', !show);
    } else {
        legendElement.classList.toggle('hidden');
    }
};

/**
 * Contrôle personnalisé pour le bouton de légende
 */
const CustomButtonControl = L.Control.extend({
    onAdd: function() {
        const container = L.DomUtil.create('div', 'leaflet-control leaflet-bar bg-white hover:bg-gray-100 text-gray-700 p-2 rounded shadow cursor-pointer');
        container.innerHTML = 'Légende';
        container.setAttribute('title', 'Afficher/Masquer la légende');
        L.DomEvent.on(container, 'click', function(e) {
            L.DomEvent.stopPropagation(e);
            window.toggleLegend();
        });
        return container;
    }
});

// ===== GESTION DES COUCHES DE COMPARAISON =====

/**
 * Nettoie et supprime les couches de comparaison
 */
function resetComparisonLayers() {
    if (geojsonLayerBefore && map.hasLayer(geojsonLayerBefore)) map.removeLayer(geojsonLayerBefore);
    if (geojsonLayerAfter && map.hasLayer(geojsonLayerAfter)) map.removeLayer(geojsonLayerAfter);
    geojsonLayerBefore = null;
    geojsonLayerAfter = null;
    currentVisibleLayer = null;
    if (opacityControl) {
        map.removeControl(opacityControl);
        opacityControl = null;
    }
    updateLegendContent([]);

    // Restaure le highlight de la zone actuellement sélectionnée
    const zoneSelect = document.getElementById('zone-select');
    if (zoneSelect?.value) {
        const currentZone = zoneSelect.value;
        
        if (currentZone === 'select-commune') {
            if (communeLayer) communeLayer.setStyle(highlightCommuneStyle);
        } else if (currentZone === 'select-zones') {
            highlightAllPolygons();
        } else {
            // Zone spécifique : réappliquer le highlight
            const zoneLayer = findZoneLayer(currentZone);
            if (zoneLayer) {
                resetAllLayerStyles();
                zoneLayer.setStyle(highlightStyle);
            }
        }
    }

}

/**
 * Gère l'affichage des couches de comparaison (avant/après)
 */
function setComparisonLayerVisibility(mode) {
    if (!geojsonLayerBefore || !geojsonLayerAfter || !opacityControl) return;

    const container = opacityControl.getContainer();
    const btnBefore = container.querySelector('#btn-before');
    const btnAfter = container.querySelector('#btn-after');
    
    // Styles définis
    const activeStyleBefore = 'bg-site-primary text-white border-teal-600'; // Style actif pour le bouton Avant (vert)
    const inactiveStyleBefore = 'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-300'; // Style inactif pour le bouton Avant

    const activeStyleAfter = 'bg-site-secondary text-white border-gray-300'; // Style actif pour le bouton Après (gris, comme inactif)
    const inactiveStyleAfter = 'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-300'; // Style inactif pour le bouton Après

    // Fonction utilitaire pour basculer les classes
    const toggleClasses = (element, addClass, removeClass) => {
        element.classList.remove(...removeClass.split(' '));
        element.classList.add(...addClass.split(' '));
    };

    if (mode === currentVisibleLayer) {
        if (map.hasLayer(geojsonLayerBefore)) map.removeLayer(geojsonLayerBefore);
        if (map.hasLayer(geojsonLayerAfter)) map.removeLayer(geojsonLayerAfter);
        currentVisibleLayer = null;
        toggleClasses(btnBefore, inactiveStyleBefore, activeStyleBefore);
        toggleClasses(btnAfter, inactiveStyleAfter, activeStyleAfter); // Utilise les styles inactifs pour Après
        return;
    }

    currentVisibleLayer = mode;

    if (mode === 'before') {
        if (map.hasLayer(geojsonLayerAfter)) map.removeLayer(geojsonLayerAfter);
        if (!map.hasLayer(geojsonLayerBefore)) map.addLayer(geojsonLayerBefore);
        toggleClasses(btnBefore, activeStyleBefore, inactiveStyleBefore);
        toggleClasses(btnAfter, inactiveStyleAfter, activeStyleAfter); // Utilise les styles inactifs pour Après
    } else if (mode === 'after') {
        if (map.hasLayer(geojsonLayerBefore)) map.removeLayer(geojsonLayerBefore);
        if (!map.hasLayer(geojsonLayerAfter)) map.addLayer(geojsonLayerAfter);
        toggleClasses(btnAfter, activeStyleAfter, inactiveStyleAfter); // Utilise les styles inactifs pour Après
        toggleClasses(btnBefore, inactiveStyleBefore, activeStyleBefore);
    }
}

/**
 * Crée le contrôle de comparaison temporelle
 */
function createOpacityControl() {
    if (opacityControl) map.removeControl(opacityControl);

    opacityControl = L.control({ position: 'topright' });
    opacityControl.onAdd = function() {
        const [yearBefore = 'Avant', yearAfter = 'Après'] = window.annees || [];
        const div = L.DomUtil.create('div', 'bg-white p-3 rounded-lg shadow-lg border border-gray-300 flex items-center space-x-2');
        
        div.innerHTML = `
            <button id="btn-before" title="${yearBefore}"
                    class="h-9 px-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-md border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-site-primary shadow-sm font-semibold">
                ${yearBefore}
            </button>
            <button id="btn-after" title="${yearAfter}"
                    class="h-9 px-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-md border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-site-secondary shadow-sm font-semibold">
                ${yearAfter}
            </button>
            <button id="btn-close-compare" title="Quitter la comparaison"
                    class="w-9 h-9 bg-gray-400 hover:bg-gray-500 text-white rounded-md border border-gray-500 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm">
                <span class="text-2xl font-light">×</span>
            </button>
        `;
        
        L.DomEvent.disableClickPropagation(div);
        
        div.querySelector('#btn-before').addEventListener('click', () => setComparisonLayerVisibility('before'));
        div.querySelector('#btn-after').addEventListener('click', () => setComparisonLayerVisibility('after'));
        div.querySelector('#btn-close-compare').addEventListener('click', () => resetComparisonLayers());
        
        return div;
    };
    opacityControl.addTo(map);
}

/**
 * Charge et configure les couches de comparaison temporelle
 */
function loadComparisonLayers(specificLayersData, nomZone) {
    resetAllLayerStyles();
    createOpacityControl();

    // Création des couches GeoJSON
    geojsonLayerBefore = L.geoJSON(specificLayersData.before, {
        style: getZoneStyle,
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<b>Année : ${window.annees?.[0] || ''}<br>Classe:</b> ${feature.properties.nom_classe || 'N/A'}`);
        }
    });
    
    geojsonLayerAfter = L.geoJSON(specificLayersData.after, {
        style: getZoneStyle,
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<b>Année : ${window.annees?.[1] || ''}<br>Classe:</b> ${feature.properties.nom_classe || 'N/A'}`);
        }
    });

    // Mise à jour de la légende
    const allFeatures = [...(specificLayersData.before?.features || []), ...(specificLayersData.after?.features || [])];
    updateLegendContent(allFeatures);

    // Affichage initial de la couche "avant"
    setComparisonLayerVisibility('before');

    // Ajustement des limites de la carte
    const combinedBounds = new L.LatLngBounds();
    [geojsonLayerBefore, geojsonLayerAfter].forEach(layer => {
        if (layer.getBounds?.()?.isValid()) combinedBounds.extend(layer.getBounds());
    });

    if (combinedBounds.isValid()) {
        map.fitBounds(combinedBounds);
    } else {
        // Fallback sur la zone si pas de bounds valides
        const fallbackLayer = findZoneLayer(nomZone);
        if (fallbackLayer) highlightPolygonAndZoom(fallbackLayer);
    }
}
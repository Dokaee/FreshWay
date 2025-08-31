// Variables globales
let chart = null;

// Déterminer la position du séparateur de manière dynamique
const canopeeIndex = chartCategories.indexOf('Canopée');
const separatorPosition = canopeeIndex !== -1 ? canopeeIndex - 0.5 : null;

// Configuration de base du graphique
const chartConfig = {
    type: 'bar',
    data: {
        labels: chartCategories,
        datasets: [
            {
                label: annees[0],
                data: [],
                backgroundColor: 'rgba(92, 169, 163, 0.6)',
                borderColor: 'rgba(92, 169, 163, 1)',
                borderWidth: 1.5,
                borderRadius: 3,
            },
            {
                label: annees[1],
                data: [],
                backgroundColor: 'rgba(237, 106, 90, 0.6)',
                borderColor: 'rgba(237, 106, 90, 1)',
                borderWidth: 1.5,
                borderRadius: 3,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 25 } },
        scales: {
            y: { 
                beginAtZero: true, 
                title: { display: true, text: 'Occupation (%)', font: { family: 'Libre Franklin' } }, 
                grid: { drawOnChartArea: false } 
            },
            x: { title: { display: false }, grid: { display: false } }
        },
        plugins: {
            legend: { position: 'bottom', labels: { font: { family: 'Libre Franklin' } } },
            tooltip: {
                titleFont: { family: 'Merriweather' },
                bodyFont: { family: 'Libre Franklin' },
                callbacks: {
                    label: function (context) {
                        const unit = isHectareMode() ? ' ha' : '%';
                        return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}${unit}`;
                    }
                }
            },
            datalabels: {
                color: '#000',
                anchor: 'end',
                align: 'end',
                offset: 2,
                formatter: (value) => {
                    if (currentZone === 'select-commune' && value === 0) {
                        return null;
                    }
                    return value.toFixed(1) + (isHectareMode() ? ' ha' : '%');
                }
            },
            annotation: separatorPosition === null ? {} : {
                annotations: {
                    separatorLine: {
                        type: 'line',
                        scaleID: 'x',
                        value: separatorPosition,
                        borderColor: 'rgba(0, 0, 0, 0.4)',
                        borderWidth: 1.5,
                        borderDash: [6, 6]
                    }
                }
            }
        },
        animation: { duration: 800, easing: 'easeInOutQuart' }
    }
};

// Fonctions utilitaires
function isHectareMode() {
    return document.getElementById('unit-switch-v1')?.checked || false;
}


function getZoneData(zoneKey) {
    if (zoneKey === 'overall') {
        const aggregatedData = getAggregatedDataForZones();
        if (!aggregatedData) return null;

        const beforeKey = isHectareMode() ? 'dataBeforeha' : 'dataBefore';
        const afterKey = isHectareMode() ? 'dataAfterha' : 'dataAfter';
        
        return {
            before: aggregatedData[beforeKey],
            after: aggregatedData[afterKey]
        };
    }
    
    const zoneData = polygonChartDataMapping[zoneKey];
    if (!zoneData) return null;

    const beforeKey = isHectareMode() ? 'dataBeforeha' : 'dataBefore';
    const afterKey = isHectareMode() ? 'dataAfterha' : 'dataAfter';
    
    return {
        before: zoneData[beforeKey],
        after: zoneData[afterKey]
    };
}

function updateChart(zoneKey = currentZone) {
    if (typeof zoneKey === 'string') {
        currentZone = zoneKey;
    }

    if (!chart) return;

    const data = getZoneData(currentZone);
    if (!data) return;

    // Mise à jour des données
    chart.data.datasets[0].data = data.before;
    chart.data.datasets[1].data = data.after;
    
    // Mise à jour des labels d'axe
    const unit = isHectareMode() ? 'ha' : '%';
    chart.options.scales.y.title.text = isHectareMode() ? 'Surface (ha)' : 'Occupation (%)';
    
    chart.update();
}

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('compositionChart');
    if (!canvas) return;

    Chart.register(ChartDataLabels);
    chart = new Chart(canvas, chartConfig);

    // Affichage initial
    updateChart('select-commune');

    // Écouteur pour le changement d'unité
    const unitSwitch = document.getElementById('unit-switch-v1');
    if (unitSwitch) {
        unitSwitch.addEventListener('change', () => updateChart());
    }
});

// Export pour utilisation externe
window.updateChartForZone = updateChart;
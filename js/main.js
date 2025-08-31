
document.addEventListener('DOMContentLoaded', function () {
    // Logique pour le tableau dépliable
    const toggleRows = document.querySelectorAll('[data-toggle-row]');

    toggleRows.forEach(row => {
        row.addEventListener('click', () => {
            const justificationRow = row.nextElementSibling;
            if (justificationRow) {
                justificationRow.classList.toggle('hidden');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Logique pour le bouton de bascule de la légende
    const toggleLegendButton = document.getElementById('toggle-legend');
    const legendPanel = document.getElementById('legend-panel');
    const legendIcon = document.getElementById('legend-icon');

    if (toggleLegendButton && legendPanel) {
        toggleLegendButton.addEventListener('click', function () {
            const isHidden = legendPanel.classList.contains('hidden');
            
            if (isHidden) {
                legendPanel.classList.remove('hidden');
                toggleLegendButton.querySelector('span').textContent = 'Masquer les valeurs possibles';
                legendIcon.style.transform = 'rotate(180deg)';
            } else {
                legendPanel.classList.add('hidden');
                toggleLegendButton.querySelector('span').textContent = 'Afficher les valeurs possibles';
                legendIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
});

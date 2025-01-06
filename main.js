document.addEventListener('DOMContentLoaded', function() {
    // Charger le fichier JSON avec les données des salles
    fetch('localization.json')
        .then(response => response.json())  // Convertir la réponse en JSON
        .then(roomData => {
            const areas = document.querySelectorAll('area');  // Sélectionner toutes les zones
            const tooltip = document.createElement('div');    // Créer une div pour la bulle
            tooltip.classList.add('tooltip');                  // Ajouter la classe 'tooltip'
            document.body.appendChild(tooltip);                // Ajouter la bulle au body

            // Quand on survole une zone
            areas.forEach(area => {
                area.addEventListener('mouseenter', function(event) {
                    const id = area.id;  // Récupérer l'ID de la zone
                    const room = roomData[id];  // Récupérer les données de la salle

                    if (room) {
                        tooltip.innerHTML = `
                            <h3>${room.title_fr}</h3>
                            <p>${room.description_fr || 'Pas de description disponible'}</p>
                            <p><em>Cliquez pour obtenir plus d'info</em></p>
                        `;  // Afficher le titre et une description vide (si elle existe)
                        tooltip.style.display = 'block';  // Afficher la bulle

                        // Positionner la bulle en fonction de la souris
                        const rect = area.getBoundingClientRect();  // Obtenir les coordonnées de l'area
                        tooltip.style.left = `${rect.left + window.scrollX}px`;
                        tooltip.style.top = `${rect.top + window.scrollY + rect.height + 5}px`;
                    } else {
                        console.warn('Données manquantes pour cette zone');
                    }
                });

                // Quand on quitte la zone
                area.addEventListener('mouseleave', function() {
                    tooltip.style.display = 'none';  // Cacher la bulle
                });
            });
        })
        .catch(error => {
            console.error('Erreur de chargement du fichier JSON:', error);
        });
});
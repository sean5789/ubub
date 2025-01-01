console.log("Le script Run JavaScript est exécuté.");

// Attendre que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function () {
  console.log("Le DOM est prêt. Initialisation du script.");

  try {
    // Fonction principale
    function initScript() {
      console.log("Le script principal est initialisé.");

      // Fonction pour vérifier la disponibilité de `bubble_fn_coords`
      function waitForBubbleFn() {
        if (typeof bubble_fn_coords === "function") {
          console.log("bubble_fn_coords est défini. Prêt à envoyer des données.");
          updateLocation(); // Mise à jour des coordonnées GPS
        } else {
          console.warn("bubble_fn_coords n'est pas encore défini. Nouvelle tentative dans 500ms...");
          setTimeout(waitForBubbleFn, 500); // Réessaye toutes les 500 ms
        }
      }

      // Fonction pour mettre à jour les coordonnées GPS
      function updateLocation() {
        console.log("updateLocation est appelée.");

        if (navigator.geolocation) {
          console.log("La géolocalisation est supportée. Tentative de récupération des coordonnées...");
          navigator.geolocation.getCurrentPosition(
            function (position) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              console.log("Latitude :", latitude, "Longitude :", longitude);

              // Vérifie si `bubble_fn_coords` est prêt avant de l'utiliser
              if (typeof bubble_fn_coords === "function") {
                bubble_fn_coords([latitude, longitude]); // Envoie les coordonnées à Bubble
                console.log("Les coordonnées ont été envoyées à Bubble.");
              } else {
                console.error("bubble_fn_coords n'est pas défini au moment de l'envoi.");
              }
            },
            function (error) {
              console.error("Erreur de géolocalisation :", error.message);
            }
          );
        } else {
          console.error("La géolocalisation n'est pas supportée par ce navigateur.");
        }
      }

      // Lancer la vérification pour `bubble_fn_coords`
      waitForBubbleFn();
    }

    // Lancer la fonction principale
    initScript();
  } catch (error) {
    console.error("Erreur détectée dans le script principal :", error.message);
  }
});

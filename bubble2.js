console.log("Le script Run JavaScript est exécuté.");

document.addEventListener("DOMContentLoaded", function () {
  console.log("Le DOM est prêt. Initialisation du script.");

  function initScript() {
    console.log("Le script principal est initialisé.");

    function updateLocation() {
      console.log("updateLocation est appelée.");
      if (navigator.geolocation) {
        console.log("La géolocalisation est supportée.");
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Latitude :", latitude, "Longitude :", longitude);

            if (typeof bubble_fn_coords === "function") {
              console.log("bubble_fn_coords est défini.");
              bubble_fn_coords([latitude, longitude]); // Envoie les données à Bubble
            } else {
              console.warn("bubble_fn_coords n'est pas encore défini. Nouvelle tentative...");
              waitForBubbleFn(); // Réessaye
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

    function waitForBubbleFn() {
      if (typeof bubble_fn_coords === "function") {
        console.log("bubble_fn_coords est maintenant défini. Mise à jour des coordonnées.");
        updateLocation();
      } else {
        console.warn("bubble_fn_coords n'est toujours pas défini. Nouvelle tentative dans 100ms...");
        setTimeout(waitForBubbleFn, 100);
      }
    }

    // Démarre la vérification pour bubble_fn_coords
    waitForBubbleFn();
  }

  initScript();
});

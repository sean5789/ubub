console.log("Le script Run JavaScript est exécuté.");

document.addEventListener("DOMContentLoaded", function () {
  console.log("Le DOM est prêt. Initialisation du script.");

  function initScript() {
    console.log("Le script principal est initialisé.");

    document.addEventListener("visibilitychange", function () {
      console.log("État de visibilité :", document.visibilityState);

      if (document.visibilityState === "visible") {
        console.log("La page est visible. Mise à jour des coordonnées GPS.");
        updateLocation();
      } else {
        console.log("La page est en arrière-plan.");
      }
    });

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
              bubble_fn_coords([latitude, longitude]);
            } else {
              console.error("bubble_fn_coords n'est pas défini.");
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
        console.log("bubble_fn_coords est défini.");
        if (document.visibilityState === "visible") {
          updateLocation();
        }
      } else {
        console.warn("bubble_fn_coords n'est pas encore défini. Nouvelle tentative...");
        setTimeout(waitForBubbleFn, 100);
      }
    }

    waitForBubbleFn();
  }

  initScript();
});

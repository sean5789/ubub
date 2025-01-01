self.addEventListener('install', (event) => {
  console.log('Service Worker installé.');
  self.skipWaiting(); // Active immédiatement le Service Worker
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activé.');
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-location') {
    event.waitUntil(updateLocation());
  }
});

async function updateLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Coordonnées récupérées : ${latitude}, ${longitude}`);

        // Envoie des données au serveur
        fetch('/update-location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude, longitude }),
        });
      },
      (error) => {
        console.error('Erreur de géolocalisation :', error.message);
      }
    );
  } else {
    console.error('La géolocalisation n’est pas supportée.');
  }
}

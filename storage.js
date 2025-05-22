const DB_NAME = 'offline-games-db';
const STORE_NAME = 'files';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveFileToIndexedDB(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).put(blob, url);
  await tx.complete;
  console.log(`✅ Saved ${url} to IndexedDB`);
}

async function getFileFromIndexedDB(url) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).get(url);
    request.onsuccess = () => {
      if (request.result) resolve(request.result);
      else reject(`❌ ${url} not found in IndexedDB`);
    };
    request.onerror = () => reject(request.error);
  });
}

function launchOfflineGame(file) {
  getFileFromIndexedDB(file)
    .then(blob => {
      const url = URL.createObjectURL(blob);
      window.location.href = url;
    })
    .catch(() => {
      alert("This game isn't available offline yet. Play it online first.");
    });
}

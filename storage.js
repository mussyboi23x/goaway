const DB_NAME = 'offline-games-db';
const STORE_NAME = 'files';

// ⬇️ Shows messages on screen for iPad debugging
function logToPage(msg) {
  const el = document.createElement('div');
  el.textContent = '🧪 ' + msg;
  el.style.background = 'rgba(0,0,0,0.7)';
  el.style.color = 'white';
  el.style.padding = '6px 12px';
  el.style.margin = '6px auto';
  el.style.fontFamily = 'monospace';
  el.style.borderRadius = '6px';
  el.style.maxWidth = '95%';
  el.style.textAlign = 'left';
  document.body.appendChild(el);
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
        logToPage("🗃️ Created 'files' store");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveFileToIndexedDB(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(blob, url);
    logToPage(`✅ Saved ${url} to IndexedDB`);
  } catch (err) {
    logToPage(`❌ Failed to save ${url}: ${err}`);
  }
}

async function getFileFromIndexedDB(url) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).get(url);
    request.onsuccess = () => {
      if (request.result) {
        logToPage(`📦 Loaded ${url} from IndexedDB`);
        resolve(request.result);
      } else {
        logToPage(`⚠️ ${url} not found in IndexedDB`);
        reject(`Not found: ${url}`);
      }
    };
    request.onerror = () => {
      logToPage(`❌ Error getting ${url} from IndexedDB`);
      reject(request.error);
    };
  });
}

function launchOfflineGame(file) {
  getFileFromIndexedDB(file)
    .then(blob => {
      const url = URL.createObjectURL(blob);
      window.location.href = url;
    })
    .catch(() => {
      logToPage("⚠️ This game isn't available offline yet.");
      alert("This game isn't available offline yet. Play it online first.");
    });
}

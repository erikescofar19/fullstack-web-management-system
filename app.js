// -----------------------------
// app.js unificado final con admin check, realtime y ordering
// -----------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// --- Configuración Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyBls_QFOxncjgNf0uf6dmcjDl-CssxDMcg",
  authDomain: "sazon-tete.firebaseapp.com",
  projectId: "sazon-tete",
  storageBucket: "sazon-tete.firebasestorage.app",
  messagingSenderId: "667459589865",
  appId: "1:667459589865:web:ce3a5b8f29f9e93d7ec278"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// -----------------------------
// INDEX.HTML → cargar menú (vista normal)
// -----------------------------
async function loadMenuPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerText = "Cargando menú...";

  try {
    const snap = await getDocs(collection(db, "menus"));
    container.innerHTML = "";

    if (snap.empty) {
      container.innerText = "No hay platillos disponibles.";
      return;
    }

    snap.forEach(docItem => {
      const it = docItem.data();
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h4>${escapeHtml(it.nombre)}</h4>
        <p>${escapeHtml(it.descripcion || "")}</p>
        <p><strong>$${it.precio ?? ""}</strong></p>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error("[ERROR al cargar menú]", err);
    container.innerText = "Error cargando menú.";
  }
}

// -----------------------------
// RESERVAR.HTML → enviar reservación 
// -----------------------------
function initReservationForm() {
  const form = document.getElementById('resForm');
  const msg = document.getElementById('msg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      nombre: document.getElementById('nombre').value.trim(),
      email: document.getElementById('email').value.trim(),
      fecha: document.getElementById('fecha').value,
      hora: document.getElementById('hora').value,
      personas: parseInt(document.getElementById('personas').value || '1'),
      notas: document.getElementById('notas').value || '',
      status: "pendiente",
      createdAt: serverTimestamp()
    };

    msg.innerText = '🔄 Enviando reservación...';

    try {
      const docRef = await addDoc(collection(db, "reservations"), data);
      console.log("✅ Reservación creada con ID:", docRef.id);
      msg.innerText = `✅ Reservación enviada correctamente. ID: ${docRef.id}`;
      form.reset();
    } catch (err) {
      console.error("❌ Error al enviar reservación:", err);
      msg.innerText = '❌ Error al enviar la reservación. Revisa la consola.';
    }
  });
}

// -----------------------------
// Pedidos desde index.html → seleccionar platillos y crear orden (solo orderNumber + platillos)
// -----------------------------
async function initMenuOrdering(containerId = 'menuContainer', submitBtnId = 'btnSubmitOrder', msgId = 'orderMsg') {
  const container = document.getElementById(containerId);
  const submitBtn = document.getElementById(submitBtnId);
  const orderMsg = document.getElementById(msgId);

  if (!container || !submitBtn) return;

  // Carga los platillos y los muestra con checkbox
  try {
    const snap = await getDocs(collection(db, "menus"));
    container.innerHTML = "";

    if (snap.empty) {
      container.innerText = "No hay platillos disponibles.";
      return;
    }

    snap.forEach(docItem => {
      const it = docItem.data();
      // cada checkbox tiene data-name para recuperar el nombre
      const div = document.createElement("div");
      div.className = "menu-card";
      div.innerHTML = `
        <label>
          <input type="checkbox" class="menu-checkbox" data-name="${escapeHtml(it.nombre)}">
          ${escapeHtml(it.nombre)} ${it.precio ? ` - $${it.precio}` : ''}
        </label>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("[ERROR cargar menú seleccionable]", err);
    container.innerText = "Error cargando menú.";
  }

  // Envío del pedido
  submitBtn.addEventListener('click', async () => {
    if (orderMsg) orderMsg.innerText = '';
    const checked = Array.from(container.querySelectorAll('.menu-checkbox:checked'));
    if (checked.length === 0) {
      if (orderMsg) orderMsg.innerText = "Selecciona al menos un platillo.";
      return;
    }

    // Construye array de nombres de platillos
    const platillos = checked.map(chk => chk.dataset.name);

    // Genera número de orden único (timestamp)
    const orderNumber = Date.now().toString();

    const data = {
      orderNumber: orderNumber,
      platillos: platillos,
      status: "pendiente",
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "reservations"), data);
      if (orderMsg) orderMsg.innerText = `✅ Pedido creado. Orden #${orderNumber}`;
      // desmarcar checkboxes
      checked.forEach(chk => chk.checked = false);
    } catch (err) {
      console.error("❌ Error creando pedido:", err);
      if (orderMsg) orderMsg.innerText = "Error al crear el pedido. Revisa la consola.";
    }
  });
}

// -----------------------------
// ADMIN.HTML → login y manejar reservaciones con admin check + botones (realtime)
// -----------------------------
function initAdminPanel() {
  const loginForm = document.getElementById('adminLoginForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const reservationsContainer = document.getElementById('reservationsContainer');

  // Login admin
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('adminEmail').value;
      const password = document.getElementById('adminPassword').value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login exitoso 😎");
        loginForm.reset();
      } catch (err) {
        console.error("❌ Error login admin:", err);
        alert("Credenciales incorrectas.");
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await signOut(auth);
      alert("Has cerrado sesión.");
    });
  }

  // Mostrar reservaciones si es admin (listener realtime)
  if (reservationsContainer) {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        reservationsContainer.innerHTML = "<p>Inicia sesión para ver reservaciones.</p>";
        return;
      }

      try {
        const idTokenResult = await user.getIdTokenResult(true);
        const isAdmin = !!idTokenResult.claims.admin;

        if (!isAdmin) {
          reservationsContainer.innerHTML = "<p>No tienes permisos de administrador.</p>";
          return;
        }

        // Listener realtime: se actualizará cuando cambien las reservaciones
        onSnapshot(collection(db, "reservations"), (snapshot) => {
          reservationsContainer.innerHTML = "";
          if (snapshot.empty) {
            reservationsContainer.innerHTML = "<p>No hay reservaciones.</p>";
            return;
          }

          snapshot.forEach(docItem => {
            const r = docItem.data();
            const div = document.createElement("div");
            div.className = "reservation-card";
            div.innerHTML = `
              <p><strong>${escapeHtml(r.nombre || r.orderNumber || 'Sin nombre')}</strong> ${r.orderNumber ? `(Orden #${escapeHtml(r.orderNumber)})` : ''}</p>
              <p>Status: ${escapeHtml(r.status || '')}</p>
              <p>Platillos:</p>
              <ul>
                ${(r.platillos || []).map(p => `<li>${escapeHtml(p)}</li>`).join('')}
              </ul>
              <button class="approveBtn">Aprobar</button>
              <button class="cancelBtn">Cancelar</button>
            `;
            reservationsContainer.appendChild(div);

            // Aplica acciones
            div.querySelector('.approveBtn').addEventListener('click', async () => {
              try {
                await updateDoc(doc(db, "reservations", docItem.id), { status: "Aprobada" });
              } catch (err) {
                console.error("❌ Error actualizando:", err);
                alert("Error al aprobar reservación.");
              }
            });

            div.querySelector('.cancelBtn').addEventListener('click', async () => {
              try {
                await updateDoc(doc(db, "reservations", docItem.id), { status: "Cancelada" });
              } catch (err) {
                console.error("❌ Error actualizando:", err);
                alert("Error al cancelar reservación.");
              }
            });
          });
        });

      } catch (err) {
        console.error("❌ Error verificando admin:", err);
        reservationsContainer.innerHTML = "No se pudieron cargar reservaciones.";
      }
    });
  }
}

// -----------------------------
// Helpers
// -----------------------------
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// -----------------------------
// Exportar funciones para HTML
// -----------------------------
export { loadMenuPreview, initReservationForm, initAdminPanel, initMenuOrdering, db };


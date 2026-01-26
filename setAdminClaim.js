// setAdminClaim.js
import admin from "firebase-admin";

// Inicializar Firebase con tu clave privada
admin.initializeApp({
  credential: admin.credential.cert("./serviceAccountKey.json"),
});

// UID para usuario admin
const uid = "2R3K3FqlHcZsDXoqV5hpqK6VHO63"; 

async function setAdminClaim() {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log("✅ Claim admin:true asignado al usuario:", uid);
}

setAdminClaim().catch(console.error);

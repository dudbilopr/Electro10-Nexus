// ============================================================
// js/firebase.js
// Inicializa Firebase y exporta las instancias de db y auth.
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { firebaseConfig } from '../config/firebase.config.js';

const app = initializeApp(firebaseConfig);

export const db  = getFirestore(app);
export const auth = getAuth(app);

// ============================================================
// js/auth.js
// Lógica de autenticación: login, registro, Google, logout.
// Actualiza la UI y sincroniza datos del usuario al iniciar.
// ============================================================
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { auth, db } from './firebase.js';
import { APP_ID, ADMIN_EMAIL } from '../config/firebase.config.js';
import { actualizarAvatarUI, mostrarDashboardEstudiante } from './ui.js';
import { cargarDatosPerfil } from './profile.js';

// ── Acciones de auth ─────────────────────────────────────────

export function iniciarSesion() {
    const email = document.getElementById('auth-email').value.trim();
    const pass  = document.getElementById('auth-pass').value;
    if (!email || !pass) return Swal.fire('Acceso', 'Debes ingresar tu correo y contraseña.', 'warning');
    signInWithEmailAndPassword(auth, email, pass)
        .catch(() => Swal.fire('Error', 'Credenciales inválidas. Verifica tu correo.', 'error'));
}

export function registrarUsuario() {
    const email = document.getElementById('auth-email').value.trim();
    const pass  = document.getElementById('auth-pass').value;
    if (!email || pass.length < 6) return Swal.fire('Atención', 'Ingresa un correo válido y contraseña mayor a 6 caracteres.', 'warning');
    createUserWithEmailAndPassword(auth, email, pass)
        .catch(e => Swal.fire('Error de Registro', e.message, 'error'));
}

export function iniciarSesionConGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider())
        .catch(e => Swal.fire('Error Google', e.message, 'error'));
}

export function cerrarSesion() {
    signOut(auth).then(() => mostrarDashboardEstudiante());
}

// ── Observer de sesión ───────────────────────────────────────

export function inicializarAuthObserver({ progressData, evalData, timeData, globalSettings, onLogin, onLogout }) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            window.currentUserUid  = user.uid;
            window.isMasterAdmin   = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

            // Actualizar UI de cabecera
            document.getElementById('auth-modal').style.display       = 'none';
            document.getElementById('btn-login-modal').style.display  = 'none';
            document.getElementById('user-info-container').style.display = 'flex';

            const shortEmail = user.email.split('@')[0];
            document.getElementById('user-email-text').innerText     = shortEmail;
            document.getElementById('student-name-hero').innerText   = shortEmail.toUpperCase();
            actualizarAvatarUI('initials', user.uid, shortEmail);

            // Cargar datos de Firestore
            try {
                const profSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', user.uid, 'profile', 'data'));
                if (profSnap.exists() && profSnap.data().name) {
                    const pData = profSnap.data();
                    document.getElementById('student-name-hero').innerText = pData.name;
                    actualizarAvatarUI(pData.avatarStyle || 'initials', user.uid, pData.name);
                }

                const pSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', user.uid, 'progress', 'data'));
                if (pSnap.exists()) Object.assign(progressData, pSnap.data());

                const eSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', user.uid, 'evaluations', 'data'));
                if (eSnap.exists()) Object.assign(evalData, eSnap.data());

                const tSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', user.uid, 'stats', 'data'));
                if (tSnap.exists()) timeData.value = tSnap.data().totalTimeMinutes || 0;
            } catch (e) { /* sin conexión */ }

            // Cargar ajustes del curso
            try {
                const setSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'settings', 'courseInfo'));
                if (setSnap.exists()) {
                    const info = setSnap.data();
                    globalSettings.currentWeek    = info.currentWeek    || 1;
                    globalSettings.startDate      = info.startDate      || '';
                    globalSettings.endDate        = info.endDate        || '';
                    globalSettings.excludedWeeks  = info.excludedWeeks  || [];
                    globalSettings.moduleWeeksMap = info.moduleWeeksMap || [];
                }
            } catch (e) { /* sin conexión */ }

            // Determinar rol real
            let actualRole = window.isMasterAdmin ? 'teacher' : 'student';
            if (!window.isMasterAdmin) {
                try {
                    const myDir = await getDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'directory', user.uid));
                    if (myDir.exists()) actualRole = myDir.data().role || actualRole;
                } catch (e) { /* sin conexión */ }
            } else {
                actualRole = window.simulatedRole;
            }

            // Mostrar/ocultar panel admin
            const navAdmin = document.getElementById('nav-admin');
            if ((window.isMasterAdmin || actualRole === 'teacher') && actualRole !== 'student') {
                navAdmin.style.display = 'flex';
            } else {
                navAdmin.style.display = 'none';
                const keyStorage = `alerta_semana_${globalSettings.currentWeek}_${user.uid}`;
                if (!localStorage.getItem(keyStorage) && !globalSettings.excludedWeeks.includes(String(globalSettings.currentWeek))) {
                    Swal.fire({
                        title: '¡Bienvenido de nuevo!',
                        text: 'Sigue explorando el Universo de Conocimiento a tu propio ritmo.',
                        icon: 'info', confirmButtonText: 'Ver Mapa', confirmButtonColor: 'var(--accent)'
                    }).then(res => { if (res.isConfirmed) window.mostrarCalendario(); });
                    localStorage.setItem(keyStorage, 'mostrada');
                    document.getElementById('noti-dot').style.display = 'block';
                }
            }

            await cargarDatosPerfil();

            // Restaurar estados de progreso en el menú
            document.querySelectorAll('.lesson-item').forEach(li => {
                const id = li.id.replace('menu-', '');
                if (progressData[id]) {
                    li.classList.add('completed');
                    const icon = li.querySelector('.icon-status');
                    if (icon) { icon.innerText = 'check_circle'; icon.classList.add('icon-filled'); }
                }
            });

            if (onLogin) onLogin();

        } else {
            window.currentUserUid = null;
            document.getElementById('user-info-container').style.display = 'none';
            document.getElementById('nav-admin').style.display = 'none';
            document.getElementById('auth-modal').style.display = 'flex';
            if (onLogout) onLogout();
        }
    });
}

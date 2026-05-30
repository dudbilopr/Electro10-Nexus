// ============================================================
// js/profile.js
// Guardar y cargar el perfil del estudiante en Firestore.
// Gestión del avatar y modo de vista admin.
// ============================================================
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db, auth } from './firebase.js';
import { APP_ID } from '../config/firebase.config.js';
import { actualizarAvatarUI } from './ui.js';

export async function guardarPerfil() {
    if (!window.currentUserUid) return;

    const name        = document.getElementById('prof-name').value;
    const inst        = document.getElementById('prof-school').value;
    const major       = document.getElementById('prof-major').value;
    const age         = document.getElementById('prof-age').value;
    const gender      = document.getElementById('prof-gender').value;
    const avatarStyle = document.getElementById('prof-avatar').value;
    const hours       = document.getElementById('prof-hours').value;
    const calc        = document.getElementById('prof-calc').value;
    const trig        = document.getElementById('prof-trig').value;
    const algebra     = document.getElementById('prof-algebra').value;

    try {
        let existingRole = 'student';
        try {
            const d = await getDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'directory', window.currentUserUid));
            if (d.exists()) existingRole = d.data().role || 'student';
        } catch (e) { /* sin conexión */ }

        if (window.isMasterAdmin) existingRole = 'teacher';

        const profileData = {
            name, institution: inst, role: existingRole, email: auth.currentUser.email,
            major, age, gender, avatarStyle,
            studyHours: hours, mathCalc: calc, mathTrig: trig, mathAlgebra: algebra
        };

        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'profile', 'data'), profileData, { merge: true });
        await setDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'directory', window.currentUserUid), profileData, { merge: true });

        document.getElementById('student-name-hero').innerText = name || auth.currentUser.email.split('@')[0];
        actualizarAvatarUI(avatarStyle, window.currentUserUid, name || auth.currentUser.email);
        Swal.fire('¡Encuesta Completada!', 'Tus datos de presaberes y perfil han sido actualizados exitosamente.', 'success');
    } catch (e) {
        Swal.fire('Error', e.message, 'error');
    }
}

export async function cargarDatosPerfil() {
    if (!window.currentUserUid) return;
    try {
        const pSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'profile', 'data'));
        if (pSnap.exists()) {
            const data = pSnap.data();
            const set  = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
            set('prof-name',    data.name);
            set('prof-school',  data.institution);
            set('prof-major',   data.major);
            set('prof-age',     data.age);
            set('prof-hours',   data.studyHours);

            const selGender = document.getElementById('prof-gender');
            if (selGender) selGender.value = data.gender || 'No Especificado';
            const selAvatar = document.getElementById('prof-avatar');
            if (selAvatar) selAvatar.value = data.avatarStyle || 'initials';
            const selCalc = document.getElementById('prof-calc');
            if (selCalc) selCalc.value = data.mathCalc || 'Medio';
            const selTrig = document.getElementById('prof-trig');
            if (selTrig) selTrig.value = data.mathTrig || 'Medio';
            const selAlg = document.getElementById('prof-algebra');
            if (selAlg) selAlg.value = data.mathAlgebra || 'Medio';

            const roleDisplay = document.getElementById('prof-role-display');
            if (roleDisplay) {
                roleDisplay.value = window.isMasterAdmin
                    ? 'Administrador Maestro'
                    : (data.role === 'teacher' ? 'Docente/Admin' : 'Estudiante');
            }

            const adminToggle = document.getElementById('admin-view-toggle-container');
            if (window.isMasterAdmin && adminToggle) {
                adminToggle.style.display = 'block';
                const adminMode = document.getElementById('admin-view-mode');
                if (adminMode) adminMode.value = window.simulatedRole || 'teacher';
            }
        }
    } catch (e) { /* sin conexión */ }
}

export function cambiarModoVistaAdmin() {
    window.simulatedRole = document.getElementById('admin-view-mode').value;
    Swal.fire('Modo Cambiado', `Navegando ahora como: ${window.simulatedRole === 'student' ? 'Estudiante' : 'Administrador'}.`, 'success')
        .then(() => {
            const navAdmin = document.getElementById('nav-admin');
            if (window.simulatedRole === 'student') {
                navAdmin.style.display = 'none';
                window.mostrarDashboardEstudiante();
            } else {
                navAdmin.style.display = 'flex';
            }
        });
}

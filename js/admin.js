// ============================================================
// js/admin.js
// Panel de administración: directorio de usuarios, cambio de
// roles, ajustes del calendario y métricas individuales.
// ============================================================
import { doc, getDoc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db } from './firebase.js';
import { APP_ID } from '../config/firebase.config.js';
import { renderAdminCharts, renderModalRadarChart } from './charts.js';

export async function cargarDirectorioAdminFirebase(curriculoData, totalLessons) {
    const tableBody = document.querySelector('#admin-users-table tbody');
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:30px;"><span class="material-symbols-outlined" style="font-size:30px;">sync</span></td></tr>';

    try {
        const dirSnap = await getDocs(collection(db, 'artifacts', APP_ID, 'public', 'data', 'directory'));
        if (!dirSnap.empty) {
            let filasHtml = '', iteraciones = 0, teachersCount = 0, studentsCount = 0, arrayScatter = [];
            
            // Variables para Neuro-métricas
            let sumRetencion = 0;
            let sumTiempoEstudiantes = 0;
            let riskCount = 0;

            dirSnap.forEach(async (documento) => {
                const d   = documento.data();
                const uid = documento.id;
                let completadas = 0, tiempoUser = 0, promGrade = 0;

                try {
                    const progSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', uid, 'progress', 'data'));
                    if (progSnap.exists()) completadas = Object.keys(progSnap.data()).length;
                    
                    const statSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', uid, 'stats', 'data'));
                    if (statSnap.exists()) tiempoUser = statSnap.data().totalTimeMinutes || 0;

                    const evalSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', uid, 'evaluations', 'data'));
                    if (evalSnap.exists()) {
                        const eVals = Object.values(evalSnap.data());
                        promGrade = eVals.length > 0 ? (eVals.reduce((a, v) => a + v, 0) / eVals.length / 4) * 100 : 0;
                    }
                } catch (e) { /* sin conexión */ }

                if (d.role === 'teacher') {
                    teachersCount++;
                } else {
                    studentsCount++;
                    arrayScatter.push({ x: tiempoUser, y: completadas });
                    
                    // Lógica Neuroeducativa Simulada
                    // 1. Retención: Promedio de notas + un factor de tiempo
                    let retencionUsuario = promGrade || Math.min(100, completadas * 5);
                    sumRetencion += retencionUsuario;
                    sumTiempoEstudiantes += tiempoUser;

                    // 2. Churn (Riesgo de abandono): Si ha estado < 10 min y no ha completado nada, está en riesgo
                    if (tiempoUser < 10 && completadas < 2) {
                        riskCount++;
                    }
                }

                const selectHtml = `
                    <select onchange="window.cambiarRolUsuario('${uid}', this.value)" class="form-input btn-sm" style="width:auto;" ${uid === window.currentUserUid ? 'disabled' : ''}>
                        <option value="student" ${d.role !== 'teacher' ? 'selected' : ''}>Estudiante</option>
                        <option value="teacher" ${d.role === 'teacher' ? 'selected' : ''}>Docente/Admin</option>
                    </select>`;

                filasHtml += `<tr>
                    <td><strong>${d.name || d.email || uid.substring(0, 6)}</strong></td>
                    <td>${d.institution || 'N/A'}</td>
                    <td>${selectHtml}</td>
                    <td><span class="badge" style="background:var(--bg-surface-hover);color:var(--text-high);">${completadas} completadas (${tiempoUser} min)</span></td>
                    <td><button class="btn-primary btn-sm" onclick="window.verDetalleEstudiante('${uid}','${d.name || d.email}')"><span class="material-symbols-outlined" style="font-size:16px;">monitoring</span> Ver Métricas</button></td>
                </tr>`;

                iteraciones++;
                if (iteraciones === dirSnap.size) {
                    tableBody.innerHTML = filasHtml;
                    renderAdminCharts(teachersCount, studentsCount, arrayScatter);

                    // Actualizar métricas del DOM (Data Science Metrics)
                    if (studentsCount > 0) {
                        const avgRetencion = Math.round(sumRetencion / studentsCount);
                        const churnPct = Math.round((riskCount / studentsCount) * 100);
                        const avgCarga = Math.round(sumTiempoEstudiantes / studentsCount);

                        const elRet = document.getElementById('admin-metric-retencion');
                        const elChurn = document.getElementById('admin-metric-churn');
                        const elCarga = document.getElementById('admin-metric-carga');

                        if(elRet) elRet.innerText = `${avgRetencion}%`;
                        if(elChurn) elChurn.innerText = `${churnPct}%`;
                        if(elCarga) elCarga.innerText = `${avgCarga} min`;
                    }
                }
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-medium);">No hay estudiantes en el directorio.</td></tr>';
        }
    } catch (e) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--danger);">Error de lectura (Reglas de Firestore).</td></tr>';
    }
}

export async function verDetalleEstudiante(uid, nombre, curriculoData, totalLessons) {
    document.getElementById('modal-u-name').innerText = nombre;
    document.getElementById('modal-u-inst').innerText = 'Cargando métricas...';
    document.getElementById('modal-u-presaberes').innerHTML = '';
    document.getElementById('admin-user-modal').style.display = 'flex';

    try {
        let pData = {}, eData = {}, tMin = 0;

        const dirS = await getDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'directory', uid));
        if (dirS.exists()) {
            const prof = dirS.data();
            document.getElementById('modal-u-inst').innerText = prof.institution || 'Institución no declarada';
            document.getElementById('modal-u-presaberes').innerHTML = `
                <div><strong>Carrera:</strong> ${prof.major || 'No indicada'}</div>
                <div><strong>Edad/Género:</strong> ${prof.age || '?'} años, ${prof.gender || '?'}</div>
                <div><strong>Estudio Semanal:</strong> ${prof.studyHours || '0'} hrs</div>
                <div><strong>Cálculo:</strong> ${prof.mathCalc || 'Medio'}</div>
                <div><strong>Trigonometría:</strong> ${prof.mathTrig || 'Medio'}</div>
                <div><strong>Álg. Lineal:</strong> ${prof.mathAlgebra || 'Medio'}</div>
            `;
        }

        const pS = await getDoc(doc(db, 'artifacts', APP_ID, 'users', uid, 'progress', 'data'));
        if (pS.exists()) pData = pS.data();
        const eS = await getDoc(doc(db, 'artifacts', APP_ID, 'users', uid, 'evaluations', 'data'));
        if (eS.exists()) eData = eS.data();
        const tS = await getDoc(doc(db, 'artifacts', APP_ID, 'users', uid, 'stats', 'data'));
        if (tS.exists()) tMin = tS.data().totalTimeMinutes || 0;

        const completadas = Object.keys(pData).length;
        const pct         = totalLessons > 0 ? Math.round((completadas / totalLessons) * 100) : 0;
        const eVals       = Object.values(eData);
        const promGrade   = eVals.length > 0 ? Math.round((eVals.reduce((a, v) => a + v, 0) / eVals.length / 4) * 100) : 0;

        document.getElementById('modal-u-time').innerText  = tMin + 'm';
        document.getElementById('modal-u-prog').innerText  = pct + '%';
        document.getElementById('modal-u-grade').innerText = promGrade + '%';

        const mLabels = [], mData = [];
        if (curriculoData?.modulos) {
            curriculoData.modulos.forEach((mod, idx) => {
                const shortTitle = mod.titulo.includes(': ') ? mod.titulo.split(': ')[1].split(' - ')[0] : `Mod ${idx + 1}`;
                mLabels.push(shortTitle);
                let mSum = 0, mC = 0;
                mod.lecciones.forEach(lec => {
                    const items = lec.tipo === 'grupo' ? lec.sublecciones : [lec];
                    items.forEach(item => { if (eData[item.id]) { mSum += eData[item.id]; mC++; } });
                });
                mData.push(mC > 0 ? Math.round((mSum / mC / 4) * 100) : 0);
            });
        }
        renderModalRadarChart(mLabels, mData);

    } catch (e) {
        document.getElementById('modal-u-inst').innerText = 'Fallo de conexión al cargar las métricas.';
    }
}

export async function cambiarRolUsuario(uid, nuevoRol) {
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'directory', uid), { role: nuevoRol }, { merge: true });
        Swal.fire({ title: 'Permisos', text: 'El rol se modificó correctamente.', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
        window.cargarDirectorioAdminFirebase?.();
    } catch (e) {
        Swal.fire('Restricción', 'No tienes los permisos requeridos.', 'error');
    }
}

export async function guardarAjustesCalendario(globalSettings) {
    if (!window.isMasterAdmin) return Swal.fire('Permisos', 'Acceso denegado.', 'error');

    const semana     = parseInt(document.getElementById('admin-set-week').value) || 1;
    const startDate  = document.getElementById('admin-start-date').value;
    const endDate    = document.getElementById('admin-end-date').value;
    const excludedArr = document.getElementById('admin-excluded-weeks').value.split(',').map(s => s.trim()).filter(Boolean);
    const modWeeksArr = document.getElementById('admin-module-weeks').value.split(';').map(s => s.trim()).filter(Boolean);

    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'settings', 'courseInfo'), {
            currentWeek: semana, startDate, endDate, excludedWeeks: excludedArr, moduleWeeksMap: modWeeksArr
        }, { merge: true });

        globalSettings.currentWeek    = semana;
        globalSettings.startDate      = startDate;
        globalSettings.endDate        = endDate;
        globalSettings.excludedWeeks  = excludedArr;
        globalSettings.moduleWeeksMap = modWeeksArr;

        Swal.fire('Ajuste Estructural Exitoso', 'La guía de aprendizaje ha sido reprogramada para todos los usuarios.', 'success');
    } catch (e) {
        Swal.fire('Error', 'Falla de conexión a base de datos.', 'error');
    }
}

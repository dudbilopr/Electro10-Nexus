// ============================================================
// js/app.js — Orquestador Principal
// Importa todos los módulos, inicializa el estado compartido
// y registra las funciones en window para el HTML inline.
// ============================================================

// ── Importaciones ────────────────────────────────────────────
import { db }                                   from './firebase.js';
import { APP_ID }                               from '../config/firebase.config.js';
import { doc, setDoc, increment }               from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { auth }                                 from './firebase.js';
import { iniciarSesion, registrarUsuario, iniciarSesionConGoogle, cerrarSesion, inicializarAuthObserver } from './auth.js';
import { toggleSidebar, toggleTheme, toggleChat, abrirModalAuth, mostrarNotificaciones, cambiarTab, resetNav, mostrarDashboardEstudiante, mostrarCalendario, mostrarPerfil, abrirPanelAdmin, actualizarAvatarUI, aplicarTemaGuardado, injectUIState } from './ui.js';
import { inicializarEstructuraBase }            from './curriculum.js';
import { loadContent, guardarEval, guardarNotas, guardarProgresoNube, getIconForType } from './content-loader.js';
import { actualizarGraficosEstudiante }         from './charts.js';
import { guardarPerfil, cargarDatosPerfil, cambiarModoVistaAdmin } from './profile.js';
import { cargarDirectorioAdminFirebase, verDetalleEstudiante, cambiarRolUsuario, guardarAjustesCalendario } from './admin.js';

// ── Estado Global Compartido ─────────────────────────────────
const progressData   = {};
const evalData       = {};
const timeData       = { value: 0 };  // Objeto para permitir mutación por referencia
const globalSettings = {
    currentWeek:    1,
    startDate:      '',
    endDate:        '',
    excludedWeeks:  [],
    moduleWeeksMap: []
};
let curriculoData = null;
let totalLessons  = 0;

window.currentUserUid  = null;
window.isMasterAdmin   = false;
window.simulatedRole   = 'teacher';

// ── Timer de tiempo activo ───────────────────────────────────
setInterval(async () => {
    if (!window.currentUserUid || window.isMasterAdmin) return;
    timeData.value++;
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'stats', 'data'), { totalTimeMinutes: increment(1) }, { merge: true });
    } catch (e) { /* sin conexión */ }
}, 60000);

// ── Listener de mensajes desde iframes hijo ──────────────────
window.addEventListener('message', async (event) => {
    const data = event.data;
    if (!data?.action) return;

    if (data.action === 'marcarCompletado') {
        const lessonId = data.lessonId || window._currentLeccionId;
        if (lessonId && !progressData[lessonId]) {
            progressData[lessonId] = true;
            localStorage.setItem('cursoElectromagnetismoProgreso', JSON.stringify(progressData));
            const li = document.getElementById('menu-' + lessonId);
            if (li) {
                li.classList.add('completed');
                const icon = li.querySelector('.icon-status');
                if (icon) { icon.innerText = 'check_circle'; icon.classList.add('icon-filled'); }
            }
            await guardarProgresoNube(lessonId);
            Swal.fire({ title: '¡Objetivo Alcanzado!', text: data.mensaje || 'Has completado esta actividad.', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 4000 });
            actualizarGraficosEstudiante(Object.keys(progressData).length, totalLessons, progressData, evalData, timeData, curriculoData);
        }
    }
    if (data.action === 'enviarNotaCognitiva' && data.score) {
        guardarEval(data.score, evalData);
    }
});

// ── Actualización del Dashboard ──────────────────────────────
window.actualizarContenidoDashboard = () => {
    if (!curriculoData) return;
    let nextLesson = null, nextLi = null;
    outer:
    for (const mod of curriculoData.modulos) {
        for (const lec of mod.lecciones) {
            const items = lec.tipo === 'grupo' ? lec.sublecciones : [lec];
            for (const item of items) {
                if (!progressData[item.id]) {
                    nextLesson = item;
                    nextLi = document.getElementById('menu-' + item.id);
                    break outer;
                }
            }
        }
    }

    const c = document.getElementById('next-lesson-container');
    if (nextLesson && nextLi) {
        c.innerHTML = `
        <div class="task-item" onclick="document.getElementById('${nextLi.id}').click()" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);padding:20px;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;gap:15px;align-items:center;min-width:0;">
                <div style="width:50px;height:50px;background:rgba(255,255,255,0.2);color:#fff;display:flex;align-items:center;justify-content:center;border-radius:12px;">
                    <span class="material-symbols-outlined icon-filled" style="font-size:24px;">${getIconForType(nextLesson.tipo)}</span>
                </div>
                <div class="truncate">
                    <h4 class="truncate" style="margin:0 0 5px 0;font-size:1.1rem;color:#fff;">${nextLesson.titulo}</h4>
                    <p style="margin:0;font-size:0.85rem;color:rgba(255,255,255,0.8);">Recomendación de Exploración</p>
                </div>
            </div>
            <span class="material-symbols-outlined" style="color:#fff;">explore</span>
        </div>`;
    } else {
        c.innerHTML = '<div style="background:rgba(16,185,129,0.2);color:#fff;padding:15px;border-radius:10px;"><span class="material-symbols-outlined" style="vertical-align:bottom;">workspace_premium</span> ¡Has completado todas las exploraciones disponibles!</div>';
    }
    actualizarGraficosEstudiante(Object.keys(progressData).length, totalLessons, progressData, evalData, timeData, curriculoData);
    generarDashboardGamificado(); // Actualiza consejos con base en tiempo/progreso
};

// ── Exposición en window (llamadas desde HTML) ───────────────
window.toggleSidebar             = toggleSidebar;
window.toggleTheme               = toggleTheme;
window.toggleChat                = toggleChat;
window.abrirModalAuth            = abrirModalAuth;
window.mostrarNotificaciones     = mostrarNotificaciones;
window.cambiarTab                = cambiarTab;
window.mostrarDashboardEstudiante = mostrarDashboardEstudiante;
window.mostrarCalendario         = () => { injectUIState({ progressData, curriculoData, totalLessons }); mostrarCalendario(); };
window.mostrarPerfil             = mostrarPerfil;
window.abrirPanelAdmin           = () => abrirPanelAdmin(globalSettings);
window.cerrarSesion              = cerrarSesion;
window.iniciarSesion             = iniciarSesion;
window.registrarUsuario          = registrarUsuario;
window.iniciarSesionConGoogle    = iniciarSesionConGoogle;
window.guardarEval               = (nivel) => guardarEval(nivel, evalData);
window.guardarNotas              = guardarNotas;
window.guardarProgresoNube       = guardarProgresoNube;
window.guardarPerfil             = guardarPerfil;
window.cargarDatosPerfil         = cargarDatosPerfil;
window.cambiarModoVistaAdmin     = cambiarModoVistaAdmin;
window.actualizarAvatarUI        = actualizarAvatarUI;
window.actualizarGraficosEstudiante = (c, t) => actualizarGraficosEstudiante(c, t, progressData, evalData, timeData, curriculoData);
window.cargarDirectorioAdminFirebase = () => cargarDirectorioAdminFirebase(curriculoData, totalLessons);
window.verDetalleEstudiante      = (uid, nombre) => verDetalleEstudiante(uid, nombre, curriculoData, totalLessons);
window.cambiarRolUsuario         = cambiarRolUsuario;
window.guardarAjustesCalendario  = () => guardarAjustesCalendario(globalSettings);
window.renderAdminCharts         = (t, s, sc) => renderAdminCharts(t, s, sc);

window.renderizarQuizDinamico = (leccion) => {
    // Generar HTML interactivo
    let html = `<div style="max-width:800px; margin:0 auto; padding:20px;">
        <h2 style="color:var(--text-high); text-align:center; margin-bottom:10px;">${leccion.titulo}</h2>
        <p style="color:var(--text-medium); text-align:center; margin-bottom:30px;">${leccion.descripcion || ''}</p>
        <div id="quiz-container" style="background:var(--bg-surface); padding:30px; border-radius:16px; box-shadow:var(--shadow-md); border:1px solid var(--border-color);">`;
    
    // Almacenamos temporalmente la lección actual para evaluarla
    window._currentQuizData = leccion;

    leccion.preguntas.forEach((q, i) => {
        html += `<div class="quiz-question" style="margin-bottom:25px;">
            <h4 style="color:var(--text-high); margin-bottom:15px;">${i + 1}. ${q.pregunta} <span style="font-size:0.7rem; color:var(--text-low); font-weight:normal;">(${q.tema})</span></h4>
            <div style="display:flex; flex-direction:column; gap:10px;">`;
        q.opciones.forEach((opt, oIdx) => {
            html += `<label style="display:flex; align-items:center; gap:10px; cursor:pointer; padding:10px 15px; border:1px solid var(--border-color); border-radius:8px; transition:all 0.2s;" class="quiz-opt-label">
                <input type="radio" name="q_${i}" value="${oIdx}" style="accent-color:var(--accent);">
                <span style="color:var(--text-medium);">${opt}</span>
            </label>`;
        });
        html += `</div>
            <div id="feedback_q_${i}" style="display:none; margin-top:10px; padding:10px; border-radius:8px; font-size:0.85rem;"></div>
        </div>`;
    });

    html += `<button onclick="window.evaluarQuizDinamico()" class="btn-primary" style="width:100%; padding:15px; font-size:1.1rem; margin-top:20px;">Enviar Respuestas y Ver Diagnóstico</button>
        </div>
        
        <!-- Contenedor del Gráfico de Diagnóstico (Oculto inicialmente) -->
        <div id="quiz-diagnostico-container" style="display:none; background:var(--bg-surface); padding:30px; border-radius:16px; box-shadow:var(--shadow-lg); border:1px solid var(--border-color); margin-top:30px; text-align:center;">
            <h3 style="color:var(--text-high);">Tu Diagnóstico Matemático</h3>
            <div style="width:100%; max-width:500px; height:300px; margin:20px auto; position:relative;">
                <canvas id="diagnosticoRadarChart"></canvas>
            </div>
            <h2 id="diag-score" style="font-size:3rem; margin:10px 0;">0%</h2>
            <p id="diag-msg" style="color:var(--text-medium); margin-bottom:20px;"></p>
            <div id="diag-tips" style="text-align:left; background:var(--bg-main); padding:20px; border-radius:12px; border-left:4px solid var(--accent); color:var(--text-medium);"></div>
        </div>
    </div>`;

    return html;
};

window.evaluarQuizDinamico = async () => {
    const leccion = window._currentQuizData;
    if (!leccion) return;

    let scorePonderado = 0;
    let pesoTotal = 0;
    let temasData = {}; // { "Cálculo": { score: 0, total: 0 } }

    let todasRespondidas = true;

    leccion.preguntas.forEach((q, i) => {
        const radios = document.getElementsByName('q_' + i);
        let valSeleccionado = null;
        radios.forEach(r => { if(r.checked) valSeleccionado = parseInt(r.value); });
        
        if(valSeleccionado === null) todasRespondidas = false;
        
        const feedbackEl = document.getElementById('feedback_q_' + i);
        if (!temasData[q.tema]) temasData[q.tema] = { score: 0, total: 0 };
        
        temasData[q.tema].total += q.peso;
        pesoTotal += q.peso;

        if (valSeleccionado === q.respuestaCorrecta) {
            scorePonderado += q.peso;
            temasData[q.tema].score += q.peso;
            if(valSeleccionado !== null) {
                feedbackEl.innerHTML = '✅ ¡Correcto!';
                feedbackEl.style.background = 'rgba(16,185,129,0.1)';
                feedbackEl.style.color = 'var(--success)';
                feedbackEl.style.display = 'block';
            }
        } else if(valSeleccionado !== null) {
            feedbackEl.innerHTML = `❌ Incorrecto. ${q.feedback_error}`;
            feedbackEl.style.background = 'rgba(239,68,68,0.1)';
            feedbackEl.style.color = 'var(--danger)';
            feedbackEl.style.display = 'block';
        }
    });

    if (!todasRespondidas) {
        return Swal.fire('Incompleto', 'Por favor responde todas las preguntas antes de enviar.', 'warning');
    }

    const puntajeFinal = Math.round((scorePonderado / pesoTotal) * 100);
    
    // Guardar la evaluación local y en nube
    if (window._currentLeccionId) {
        evalData[window._currentLeccionId] = puntajeFinal;
        localStorage.setItem('cursoElectromagnetismoEval', JSON.stringify(evalData));
        if (puntajeFinal >= 65) {
            progressData[window._currentLeccionId] = true;
            localStorage.setItem('cursoElectromagnetismoProgreso', JSON.stringify(progressData));
            window.guardarProgresoNube(window._currentLeccionId);
        }
        
        // Guardar la evaluación usando guardarEval sin pasar UI (esto se enviará al nodo /evaluations)
        if (window.currentUserUid) {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
            try {
                await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'evaluations', 'data'), {
                    [window._currentLeccionId]: puntajeFinal
                }, { merge: true });
            } catch(e) {}
        }
    }

    // Desplegar diagnóstico visual
    document.getElementById('quiz-container').style.display = 'none';
    const diagContainer = document.getElementById('quiz-diagnostico-container');
    diagContainer.style.display = 'block';

    const elScore = document.getElementById('diag-score');
    const elMsg = document.getElementById('diag-msg');
    const elTips = document.getElementById('diag-tips');

    elScore.innerText = puntajeFinal + '%';
    if (puntajeFinal >= 65) {
        elScore.style.color = 'var(--success)';
        elMsg.innerHTML = '¡Felicidades! Tienes las bases matemáticas necesarias para iniciar el curso de Electromagnetismo.<br><strong>Se han desbloqueado todos los módulos.</strong>';
        elTips.innerHTML = 'Sigue así. Durante el curso repasaremos estos conceptos aplicados a la física.';
    } else {
        elScore.style.color = 'var(--danger)';
        elMsg.innerHTML = 'Tu puntaje es menor a 65%. Necesitas reforzar tus bases matemáticas antes de continuar.<br><strong>Los módulos permanecerán bloqueados hasta que apruebes.</strong>';
        
        let debilidades = [];
        for(let tema in temasData) {
            if ((temasData[tema].score / temasData[tema].total) < 0.6) {
                debilidades.push(tema);
            }
        }
        elTips.innerHTML = `<strong>Tópicos a Nivelar Urgentemente:</strong><ul>${debilidades.map(d => `<li>${d}</li>`).join('')}</ul>`;
        elTips.innerHTML += `<div style="margin-top:15px;"><button onclick="window.location.reload()" class="btn-primary" style="background:var(--bg-surface-hover); color:var(--text-high); border:1px solid var(--border-color);">Reintentar Examen</button></div>`;
    }

    // Renderizar Radar Chart de Diagnóstico
    const labels = Object.keys(temasData);
    const dataVals = labels.map(l => Math.round((temasData[l].score / temasData[l].total) * 100));

    if (window.diagChartInstance) window.diagChartInstance.destroy();
    const ctx = document.getElementById('diagnosticoRadarChart').getContext('2d');
    window.diagChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Dominio por Tema (%)',
                data: dataVals,
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(37, 99, 235, 1)',
                pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                pointBorderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { r: { min: 0, max: 100, ticks: { display: false } } },
            plugins: { legend: { display: false } }
        }
    });

    // Actualizar barra lateral (Unlock)
    const presaberesLi = document.getElementById('menu-' + window._currentLeccionId);
    if(presaberesLi && puntajeFinal >= 65) {
        presaberesLi.classList.add('completed');
        const icon = presaberesLi.querySelector('.icon-status');
        if (icon) { icon.innerText = 'check_circle'; icon.classList.add('icon-filled'); }
    }
};

window._loadContent = (leccion, modTitulo) => {
    // ── Lógica de Bloqueo por Presaberes ──
    const examId = 'm0_l1';
    if (leccion.id !== examId && (!evalData[examId] || evalData[examId] < 65)) {
        Swal.fire({
            title: 'Acceso Restringido',
            html: 'Debes completar el <b>Examen Diagnóstico de Presaberes</b> (Módulo 0) con al menos 65% para desbloquear el resto del curso.',
            icon: 'warning',
            confirmButtonText: 'Ir al Diagnóstico',
            confirmButtonColor: 'var(--accent)'
        }).then(() => {
            const presaberesLi = document.getElementById('menu-' + examId);
            if(presaberesLi) presaberesLi.click();
        });
        return;
    }

    window._currentLeccionId = leccion.id;
    loadContent(leccion, modTitulo, progressData, evalData);
};

// ── Lógica de Alto Impacto (Neuroeducación y Gamificación) ──
window.guardarApuntes = async () => {
    if (!window.currentUserUid || window.isMasterAdmin) {
        return Swal.fire('Modo Visitante', 'Inicia sesión para guardar apuntes en la nube.', 'info');
    }
    const notas = document.getElementById('student-notes').value.trim();
    if (!notas) return Swal.fire('Oops', 'No puedes guardar un apunte vacío.', 'warning');
    
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'notes', 'data'), { content: notas }, { merge: true });
        Swal.fire('¡Apunte Guardado!', 'Tus conclusiones están seguras en Firestore.', 'success');
    } catch (e) {
        Swal.fire('Error', 'No se pudo guardar el apunte. Revisa tu conexión.', 'error');
    }
};

async function cargarApuntes() {
    if (!window.currentUserUid || window.isMasterAdmin) return;
    try {
        const { getDoc } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
        const docRef = doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'notes', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const notaInput = document.getElementById('student-notes');
            if (notaInput) notaInput.value = docSnap.data().content || '';
        }
    } catch (e) {}
}

function generarDashboardGamificado() {
    // Generar red de pares simulada/real (gamificación social)
    const basePares = 15 + Math.floor(Math.random() * 20); // 15-35 compañeros
    const elCount = document.getElementById('student-network-count');
    if (elCount) elCount.innerText = basePares;

    const avatarsContainer = document.getElementById('student-network-avatars');
    if (avatarsContainer) {
        let htmlAvatares = '';
        const avataresCount = Math.min(basePares, 5);
        for(let i=1; i<=avataresCount; i++) {
            const num = Math.floor(Math.random() * 100);
            htmlAvatares += `<img src="https://api.dicebear.com/7.x/adventurer/svg?seed=${num}" style="width:30px;height:30px;border-radius:50%;border:2px solid var(--bg-surface-hover);margin-left:-10px;">`;
        }
        if (basePares > 5) htmlAvatares += `<div style="width:30px;height:30px;border-radius:50%;background:var(--bg-main);border:2px solid var(--bg-surface-hover);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;margin-left:-10px;">+${basePares-5}</div>`;
        avatarsContainer.innerHTML = htmlAvatares;
    }

    // Generar Consejo Neuroeducativo dinámico basado en tiempo de estudio
    const minutos = timeData.value;
    const elTip = document.getElementById('student-neuro-tip');
    if (elTip) {
        if (minutos < 15) {
            elTip.innerText = "Fase de Calentamiento Cognitivo: Tu cerebro está asimilando la estructura. Empieza por las lecturas introductorias antes de ir a simuladores.";
        } else if (minutos >= 15 && minutos < 45) {
            elTip.innerText = "¡Atención Máxima! Estás en la cresta de tu curva de Ebbinghaus. Resuelve cuestionarios o desafíos ahora.";
        } else if (minutos >= 45 && minutos < 60) {
            elTip.innerText = "Alerta de Fatiga Neuronal: Has superado los 45 min. Levántate, bebe agua (Pausa Pomodoro) para consolidar lo aprendido en la memoria a largo plazo.";
        } else {
            elTip.innerText = "Carga Cognitiva Elevada: Has estudiado mucho hoy. ¡Felicidades! Repasa tus apuntes visuales y desconecta para asegurar el aprendizaje subconsciente.";
        }
    }
}

// ── Inicialización principal ─────────────────────────────────
async function init() {
    aplicarTemaGuardado();

    // Cargar progreso desde localStorage (datos offline)
    const savedProgress = localStorage.getItem('cursoElectromagnetismoProgreso');
    if (savedProgress) Object.assign(progressData, JSON.parse(savedProgress));

    // Construir el menú del currículo
    const result = await inicializarEstructuraBase(progressData);
    curriculoData = result.curriculoData;
    totalLessons  = result.totalLessons;

    // Inyectar estado en el módulo UI
    injectUIState({ progressData, curriculoData, totalLessons });

    // Mostrar dashboard inicial
    mostrarDashboardEstudiante();
    generarDashboardGamificado(); // Primera carga visual

    // Iniciar observer de autenticación
    inicializarAuthObserver({
        progressData, evalData, timeData, globalSettings,
        onLogin:  () => { 
            injectUIState({ progressData, curriculoData, totalLessons }); 
            window.actualizarContenidoDashboard(); 
            cargarApuntes(); // Carga las notas de firebase
            generarDashboardGamificado(); // Vuelve a calcular consejos
        },
        onLogout: () => { mostrarDashboardEstudiante(); }
    });
}

window.addEventListener('DOMContentLoaded', init);

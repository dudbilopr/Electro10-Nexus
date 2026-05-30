// ============================================================
// js/charts.js
// Gráficas Chart.js: donut de progreso, radar cognitivo,
// gráfica de tiempo y gráficas del panel admin.
// ============================================================

let studentDonut, studentRadar, studentBar, adminPie, adminScatter, modalRadarChart;

function clearChartContainer(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        const canvasId = containerId.replace('container-', 'student') + 'Chart';
        container.innerHTML = `<canvas id="${canvasId}"></canvas><div class="empty-chart-msg" style="position:absolute;">${message}</div>`;
    }
}

export function actualizarGraficosEstudiante(completadas, total, progressData, evalData, timeData, curriculoData) {
    const isDark    = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
    const textColor = isDark ? '#94A3B8' : '#475569';

    if (studentDonut)  studentDonut.destroy();
    if (studentRadar)  studentRadar.destroy();
    if (studentBar)    studentBar.destroy();

    const pct = total > 0 ? Math.round((completadas / total) * 100) : 0;

    // ── Donut ────────────────────────────────────────────────
    if (completadas === 0) {
        clearChartContainer('container-donut', 'Comienza a explorar lecciones para ver tu índice de finalización.');
    } else {
        document.getElementById('container-donut').innerHTML = '<canvas id="studentDonutChart"></canvas>';
        studentDonut = new Chart(document.getElementById('studentDonutChart'), {
            type: 'doughnut',
            data: { labels: ['Completado (%)', 'Pendiente (%)'], datasets: [{ data: [pct, 100 - pct], backgroundColor: ['#10b981', gridColor], borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: textColor } } } }
        });
    }

    // ── Radar y Bar ──────────────────────────────────────────
    let moduleLabels = [], moduleRadarData = [], moduleBarData = [];

    if (curriculoData?.modulos) {
        curriculoData.modulos.forEach((mod, idx) => {
            const shortTitle = mod.titulo.includes(': ') ? mod.titulo.split(': ')[1].split(' - ')[0] : `Mod ${idx + 1}`;
            moduleLabels.push(shortTitle);

            let modTotal = 0, modCompleted = 0, evalSum = 0, evalCount = 0;
            mod.lecciones.forEach(lec => {
                const items = lec.tipo === 'grupo' ? lec.sublecciones : [lec];
                items.forEach(item => {
                    modTotal++;
                    if (progressData[item.id]) modCompleted++;
                    if (evalData[item.id]) { evalSum += evalData[item.id]; evalCount++; }
                });
            });

            const dominio = evalCount > 0
                ? Math.round((evalSum / evalCount / 4) * 100)
                : (modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0);

            moduleRadarData.push(dominio);
            moduleBarData.push(modCompleted);
        });
    }

    if (completadas === 0) {
        clearChartContainer('container-radar', 'Tus autoevaluaciones dibujarán aquí tu mapa de habilidades.');
    } else {
        document.getElementById('container-radar').innerHTML = '<canvas id="studentRadarChart"></canvas>';
        studentRadar = new Chart(document.getElementById('studentRadarChart'), {
            type: 'radar',
            data: { labels: moduleLabels, datasets: [{ label: 'Dominio Cognitivo (%)', data: moduleRadarData, backgroundColor: 'rgba(37, 99, 235, 0.2)', borderColor: '#2563eb', pointBackgroundColor: '#2563eb' }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { r: { grid: { color: gridColor }, ticks: { display: false, max: 100, min: 0 }, pointLabels: { color: textColor, font: { size: 10 } } } }, plugins: { legend: { display: false } } }
        });
    }

    if (timeData.value === 0) {
        clearChartContainer('container-line', 'Conéctate y navega. Aquí registraremos tu tiempo.');
    } else {
        const lineEl = document.getElementById('container-line');
        if (lineEl) lineEl.innerHTML = '<canvas id="studentLineChart"></canvas>';
        studentBar = new Chart(document.getElementById('studentLineChart'), {
            type: 'bar',
            data: { labels: ['Tu Dedicación Real'], datasets: [{ label: 'Minutos Activos', data: [timeData.value], backgroundColor: '#8b5cf6', borderRadius: 6 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: gridColor }, ticks: { color: textColor, stepSize: 5 } }, x: { grid: { display: false }, ticks: { color: textColor } } }, plugins: { legend: { display: false } } }
        });
    }
}

export function renderAdminCharts(teachers, students, scatterData) {
    if (adminPie)     adminPie.destroy();
    if (adminScatter) adminScatter.destroy();

    const isDark    = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
    const textColor = isDark ? '#94A3B8' : '#475569';

    if (teachers === 0 && students === 0) {
        document.getElementById('admin-container-pie').innerHTML = '<canvas id="adminPieChart"></canvas><div class="empty-chart-msg" style="position:absolute;">Aún no hay usuarios inscritos.</div>';
    } else {
        document.getElementById('admin-container-pie').innerHTML = '<canvas id="adminPieChart"></canvas>';
        adminPie = new Chart(document.getElementById('adminPieChart'), {
            type: 'pie',
            data: { labels: ['Docentes', 'Estudiantes'], datasets: [{ data: [teachers, students], backgroundColor: ['#8b5cf6', '#3b82f6'], borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: textColor } } } }
        });
    }

    if (scatterData.length === 0) {
        document.getElementById('admin-container-scatter').innerHTML = '<canvas id="adminScatterChart"></canvas><div class="empty-chart-msg" style="position:absolute;">Aún no existen registros para analizar la correlación.</div>';
    } else {
        document.getElementById('admin-container-scatter').innerHTML = '<canvas id="adminScatterChart"></canvas>';
        adminScatter = new Chart(document.getElementById('adminScatterChart'), {
            type: 'scatter',
            data: { datasets: [{ label: 'Progreso y Dedicación', data: scatterData, backgroundColor: '#f59e0b', pointRadius: 6 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'Dedicación Activa (Minutos)', color: textColor }, grid: { color: gridColor }, ticks: { color: textColor } }, y: { title: { display: true, text: 'Lecciones Completadas', color: textColor }, grid: { color: gridColor }, ticks: { color: textColor } } }, plugins: { legend: { display: false } } }
        });
    }
}

export function renderModalRadarChart(labels, data) {
    if (modalRadarChart) modalRadarChart.destroy();
    modalRadarChart = new Chart(document.getElementById('modalUserRadarChart'), {
        type: 'radar',
        data: { labels, datasets: [{ label: 'Dominio de Aprendizaje (%)', data, backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6', pointBackgroundColor: '#8b5cf6' }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { display: false, max: 100, min: 0 } } }, plugins: { legend: { display: false } } }
    });
}

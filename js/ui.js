// ============================================================
// js/ui.js
// Funciones de interfaz: sidebar, tema, tabs, navegación,
// notificaciones y gestión de vistas del dashboard.
// ============================================================

// ── Estado compartido (importado desde app.js) ───────────────
// Estas variables se inyectan desde app.js en init()
let _progressData = {};
let _curriculoData = null;
let _totalLessons = 0;

export function injectUIState({ progressData, curriculoData, totalLessons }) {
    _progressData   = progressData;
    _curriculoData  = curriculoData;
    _totalLessons   = totalLessons;
}

// ── Navegación y vistas ──────────────────────────────────────

export function resetNav() {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    ['student-dashboard', 'calendar-dashboard', 'profile-dashboard', 'admin-dashboard', 'main-viewer-area', 'content-header']
        .forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
}

export function mostrarDashboardEstudiante() {
    resetNav();
    document.getElementById('nav-dashboard').classList.add('active');
    document.getElementById('student-dashboard').style.display = 'block';
    window.actualizarContenidoDashboard?.();
}

export function mostrarCalendario() {
    resetNav();
    document.getElementById('nav-calendario').classList.add('active');
    document.getElementById('calendar-dashboard').style.display = 'block';

    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    if (!_curriculoData?.modulos) return;

    const icons = ['science', 'biotech', 'rocket_launch', 'architecture', 'radar', 'satellite_alt', 'explore', 'stream'];

    _curriculoData.modulos.forEach((mod, idx) => {
        let totalItems = 0, completedItems = 0;
        mod.lecciones.forEach(lec => {
            if (lec.tipo === 'grupo') {
                lec.sublecciones.forEach(sub => { totalItems++; if (_progressData[sub.id]) completedItems++; });
            } else { totalItems++; if (_progressData[lec.id]) completedItems++; }
        });

        let nodeClass = 'c-node', badgeHtml = '';
        if (completedItems === totalItems && totalItems > 0) {
            nodeClass += ' c-completed';
            badgeHtml = '<span class="c-badge" style="background: var(--success); border: none;">Completado</span>';
        } else if (completedItems > 0) {
            nodeClass += ' c-active-node';
            badgeHtml = '<span class="c-badge" style="background: var(--warning); border: none;">En Curso</span>';
        } else {
            badgeHtml = '<span class="c-badge">Descubrir</span>';
        }

        const icon = icons[idx % icons.length];
        const shortTitle = mod.titulo.replace(/Módulo \d+:\s*/, '');

        const node = document.createElement('div');
        node.className = nodeClass;
        node.innerHTML = `
            ${badgeHtml}
            <div class="c-icon-wrap">
                <span class="material-symbols-outlined icon-filled">${icon}</span>
            </div>
            <h3 class="c-title">${shortTitle}</h3>
            <p class="c-desc">Exploración: ${completedItems}/${totalItems}</p>
        `;
        node.onclick = () => {
            mostrarDashboardEstudiante();
            const titleEls = Array.from(document.querySelectorAll('.module-title'));
            const titleEl = titleEls.find(el => el.innerText.includes(shortTitle) || el.innerText.includes(mod.titulo));
            if (titleEl && !titleEl.classList.contains('active-module')) titleEl.click();
            document.querySelector('.sidebar').scrollTo({ top: titleEl ? titleEl.offsetTop - 50 : 0, behavior: 'smooth' });
        };
        grid.appendChild(node);
    });
}

export function mostrarPerfil() {
    resetNav();
    document.getElementById('nav-perfil').classList.add('active');
    document.getElementById('profile-dashboard').style.display = 'block';
    window.cargarDatosPerfil?.();
}

export function abrirPanelAdmin(globalSettings) {
    resetNav();
    document.getElementById('nav-admin').classList.add('active');
    document.getElementById('admin-dashboard').style.display = 'block';

    document.getElementById('admin-set-week').value        = globalSettings.currentWeek;
    document.getElementById('admin-start-date').value      = globalSettings.startDate;
    document.getElementById('admin-end-date').value        = globalSettings.endDate;
    document.getElementById('admin-excluded-weeks').value  = globalSettings.excludedWeeks.join(', ');
    document.getElementById('admin-module-weeks').value    = globalSettings.moduleWeeksMap.join('; ');

    window.cargarDirectorioAdminFirebase?.();
}

// ── Sidebar, tema, chat ──────────────────────────────────────

export function toggleSidebar() {
    document.getElementById('sidebar-menu').classList.toggle('hidden');
}

export function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    document.getElementById('theme-icon').innerText = isDark ? 'light_mode' : 'dark_mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const dash = document.getElementById('student-dashboard');
    if (dash?.style.display === 'block') {
        const done = Object.keys(_progressData).length;
        window.actualizarGraficosEstudiante?.(done, _totalLessons);
    }
}

export function toggleChat() {
    const p = document.getElementById('chat-panel');
    p.style.display = p.style.display === 'flex' ? 'none' : 'flex';
}

export function abrirModalAuth() {
    document.getElementById('auth-modal').style.display = 'flex';
}

export function mostrarNotificaciones() {
    Swal.fire({ title: 'Notificaciones', text: 'Toda la red de conocimiento está abierta para ti. Explora libremente.', icon: 'info', confirmButtonColor: 'var(--accent)' });
    document.getElementById('noti-dot').style.display = 'none';
}

export function cambiarTab(tabId, btnElement) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btnElement.classList.add('active');
}

// ── Avatar ───────────────────────────────────────────────────

export function actualizarAvatarUI(style, uid, nameStr) {
    const avatarContainer = document.getElementById('avatar-initial');
    if (style === 'bot') {
        avatarContainer.innerHTML = `<img src="https://api.dicebear.com/7.x/bottts/svg?seed=${uid}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else if (style === 'adventurer') {
        avatarContainer.innerHTML = `<img src="https://api.dicebear.com/7.x/adventurer/svg?seed=${uid}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
        avatarContainer.innerHTML = nameStr.charAt(0).toUpperCase();
    }
}

// ── Aplicar tema guardado al iniciar ─────────────────────────
export function aplicarTemaGuardado() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon').innerText = 'light_mode';
    }
}

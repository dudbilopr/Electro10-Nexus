// ============================================================
// js/curriculum.js
// Inicializa y renderiza el currículo en el sidebar.
// Importa los módulos desde modulos/ y construye el menú.
// ============================================================
import { getIconForType, loadContent } from './content-loader.js';

export let curriculoData = null;
export let totalLessons  = 0;

// ── Carga el currículo desde modulos/ ──────────────────────
export async function inicializarEstructuraBase(progressData) {
    try {
        const modulo = await import('../modulos/curriculo.js');
        curriculoData = modulo.curriculoData;
    } catch (error) {
        console.warn('No se pudo importar el currículo externo. Usando respaldo mínimo.');
        curriculoData = {
            modulos: [{
                titulo: 'Módulo 1: Electrostática - Ley de Coulomb',
                lecciones: [
                    { id: 'm1-l1', tipo: 'multivideo', recurso: 'xLyRPFL0GJ8|mrCyjv9lf3I', titulo: '1. Teoría: Ley de Coulomb', descripcion: 'Selecciona la parte en el panel derecho.', llmLink: 'https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719' },
                    { id: 'm1-l2', tipo: 'multipresentacion', recurso: './player.html?clase=1|./player.html?clase=1', titulo: '2. Diapositivas de Apoyo', descripcion: 'Material visual utilizado en la clase magistral.' }
                ]
            }]
        };
    }

    const sidebar = document.getElementById('menu-content-area');
    totalLessons  = 0;

    curriculoData.modulos.forEach((modulo, index) => {
        const moduleWrapper = document.createElement('div');
        moduleWrapper.className = 'module-wrapper';

        let mainTitle = modulo.titulo, subLabel = `Módulo ${index + 1}`;
        if (modulo.titulo.includes(': ')) {
            const p = modulo.titulo.split(': ');
            subLabel  = p[0];
            mainTitle = p[1];
        }

        const moduleTitle = document.createElement('div');
        moduleTitle.className = 'module-title';
        moduleTitle.innerHTML = `
            <div class="module-title-info">
                <span class="material-symbols-outlined" style="color:var(--text-medium);font-size:22px;">folder_open</span>
                <div style="display:flex;flex-direction:column;flex:1;min-width:0;" class="text-wrap-safe">
                    <span style="font-size:10px;font-weight:700;color:var(--text-low);letter-spacing:0.5px;">${subLabel.toUpperCase()}</span>
                    <span style="line-height:1.2;">${mainTitle}</span>
                </div>
            </div>
            <span class="material-symbols-outlined arrow-icon">chevron_right</span>
        `;

        const lessonList = document.createElement('ul');
        lessonList.className = 'lesson-list collapsed';

        moduleTitle.onclick = () => {
            const isOpen = !lessonList.classList.contains('collapsed');
            document.querySelectorAll('.lesson-list').forEach(l => l.classList.add('collapsed'));
            document.querySelectorAll('.module-title').forEach(t => {
                t.classList.remove('active-module');
                t.querySelector('.arrow-icon').classList.remove('expanded-arrow');
                t.querySelector('.material-symbols-outlined').innerText = 'folder_open';
            });
            if (!isOpen) {
                lessonList.classList.remove('collapsed');
                moduleTitle.classList.add('active-module');
                moduleTitle.querySelector('.arrow-icon').classList.add('expanded-arrow');
                moduleTitle.querySelector('.material-symbols-outlined').innerText = 'folder';
            }
        };

        modulo.lecciones.forEach(leccion => {
            if (leccion.tipo === 'grupo') {
                const gHeader = document.createElement('div');
                gHeader.className = 'group-header';
                gHeader.innerHTML = `<div class="group-title-area text-wrap-safe" style="display:flex;gap:10px;align-items:flex-start;"><span class="material-symbols-outlined" style="font-size:18px;">topic</span><span>${leccion.titulo}</span></div><span class="material-symbols-outlined arrow-icon">expand_more</span>`;
                const gList = document.createElement('ul');
                gList.className = 'group-list';
                gHeader.onclick = () => gList.classList.toggle('expanded');
                leccion.sublecciones.forEach(sub => { totalLessons++; gList.appendChild(crearElementoLi(sub, modulo.titulo, progressData)); });
                lessonList.appendChild(gHeader);
                lessonList.appendChild(gList);
            } else {
                totalLessons++;
                lessonList.appendChild(crearElementoLi(leccion, modulo.titulo, progressData));
            }
        });

        moduleWrapper.appendChild(moduleTitle);
        moduleWrapper.appendChild(lessonList);
        sidebar.appendChild(moduleWrapper);
    });

    return { curriculoData, totalLessons };
}

// ── Crea un elemento <li> del menú lateral ───────────────────
function crearElementoLi(leccion, modTitulo, progressData) {
    const li = document.createElement('li');
    li.className = 'lesson-item';
    li.id        = 'menu-' + leccion.id;
    if (progressData[leccion.id]) li.classList.add('completed');
    li.innerHTML = `<span class="material-symbols-outlined icon-status">${progressData[leccion.id] ? 'check_circle' : getIconForType(leccion.tipo)}</span> <span class="lesson-item-text text-wrap-safe">${leccion.titulo}</span>`;
    li.onclick = () => window._loadContent(leccion, modTitulo);
    return li;
}

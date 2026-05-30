// ============================================================
// modulos/modulo1.js — Ley de Coulomb
// 📓 NotebookLLM: actualizar "llmLink" con tu link real
// ============================================================
export const modulo1 = {
    "titulo": "Módulo 1: Ley de Coulomb",
    "color": "#2563eb",
    "icono": "electric_bolt",
    "descripcionCorta": "Fuerza entre cargas eléctricas y principio de superposición",
    "subtemas": ["Carga eléctrica", "Conductores y aislantes", "Ley de Coulomb", "Principio de superposición", "Distribuciones de carga discreta"],
    "lecciones": [
        {
            "id": "m1-l1", "tipo": "multivideo",
            "recurso": "xLyRPFL0GJ8|mrCyjv9lf3I|HpHVmuQb1gM|YgP-9fVA0-Y|gigeloLe1jI|ph341nhqOII|tXschFCgjrY|q1Ez2tLVy10|EhCX3JR6mHQ|8FXllt2Z9Tk|a1M2OmlwGyc|_hgOrdi7Epw",
            "titulo": "1. Videos — Ley de Coulomb",
            "descripcion": "Selecciona el video en el panel derecho. Incluye teoría, ejemplos resueltos y experimentos.",
            "xp": 10
        },
        {
            "id": "m1-l2", "tipo": "presentacion",
            "recurso": "./player.html?clase=1",
            "titulo": "2. Diapositivas Interactivas",
            "descripcion": "Material visual con simulaciones embebidas, ecuaciones animadas y visualizaciones 3D.",
            "xp": 15
        },
        {
            "id": "m1-g1", "tipo": "grupo", "titulo": "3. Laboratorio Virtual",
            "sublecciones": [
                { "id": "m1-s1", "tipo": "simulador", "recurso": "simuladores/Sim_M1_Coulomb_Basico.html", "titulo": "3.1 Ley de Coulomb Interactiva", "descripcion": "Ajusta cargas y distancias. Observa la fuerza en tiempo real.", "xp": 20 },
                { "id": "m1-s2", "tipo": "simulador", "recurso": "simuladores/Sim_M1_Cargas.html", "titulo": "3.2 Análisis de Cargas", "descripcion": "Interacción entre múltiples cargas.", "xp": 20 },
                { "id": "m1-s3", "tipo": "simulador", "recurso": "simuladores/Sim_M1_Coulomb_Pro.html", "titulo": "3.3 Superposición de Fuerzas", "descripcion": "Principio de superposición con 3+ cargas.", "xp": 20 }
            ]
        },
        {
            "id": "m1-j1", "tipo": "juego",
            "recurso": "juegos/Juego_1.html",
            "titulo": "4. Physics Quest — Coulomb",
            "descripcion": "Desafío interactivo de 5 rondas. ¡Responde para ganar XP y desbloquear logros!",
            "xp": 25, "logro": { "id": "logro_m1", "nombre": "Maestro Electrostático", "icono": "⚡" }
        },
        {
            "id": "m1-l7", "tipo": "ejercicio",
            "recurso": "talleres/Taller_1_Ley_de_Coulomb.html",
            "titulo": "5. Taller Práctico — Coulomb",
            "descripcion": "Guía de 15 problemas con dificultad progresiva: conceptuales, numéricos y de aplicación.",
            "xp": 30
        },
        {
            "id": "m1-q1", "tipo": "quiz",
            "recurso": "quizzes/Quiz_Adaptativo_1.html",
            "titulo": "6. Quiz Adaptativo — Módulo 1",
            "descripcion": "10 preguntas adaptadas a tu nivel. El sistema ajusta la dificultad según tu desempeño.",
            "xp": 40
        },
        {
            // 📓 NOTEBOOKLM: Reemplaza el '#' con el link real de tu notebook
            // Ejemplo: "llmLink": "https://notebooklm.google.com/notebook/TU-ID-AQUI"
            "id": "m1-nb1", "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "7. NotebookLLM — Ley de Coulomb",
            "descripcion": "Asistente de IA entrenado con todo el material del módulo. Hazle preguntas, pide explicaciones o genera ejercicios.",
            "xp": 10
        },
        {
            "id": "m1-e1", "tipo": "referencias",
            "titulo": "8. Referencias Bibliográficas",
            "descripcion": "Fuentes académicas, libros de texto, artículos y recursos web verificados.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "📘 Libros de texto principales",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/1-1-electric-charge", "titulo": "OpenStax: University Physics Vol. 2 — Cap. 1", "descripcion": "Desarrollo formal de la Ley de Coulomb con ejemplos resueltos (acceso libre)." },
                        { "url": "https://www.amazon.com/dp/0131496824", "titulo": "Serway & Jewett — Physics for Scientists and Engineers", "descripcion": "Capítulos 23–24: electrostática clásica." },
                        { "url": "https://www.amazon.com/dp/0470469080", "titulo": "Hayt & Kemmerly — Engineering Electromagnetics", "descripcion": "Fundamentos de electrostática para ingeniería." }
                    ]
                },
                {
                    "tituloSeccion": "🌐 Recursos web académicos",
                    "links": [
                        { "url": "https://www.fisicalab.com/apartado/ley-de-coulomb", "titulo": "Fisicalab: Ley de Coulomb", "descripcion": "Explicación didáctica con gráficas y ejemplos numéricos." },
                        { "url": "https://en.wikipedia.org/wiki/Coulomb%27s_law", "titulo": "Wikipedia: Coulomb's Law", "descripcion": "Contexto histórico, formulación matemática y aplicaciones." },
                        { "url": "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage", "titulo": "Khan Academy: Fuerza Eléctrica", "descripcion": "Videos y ejercicios interactivos (gratuitos)." }
                    ]
                },
                {
                    "tituloSeccion": "🔬 Simuladores externos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/coulombs-law", "titulo": "PhET: Ley de Coulomb", "descripcion": "Simulador interactivo de la Universidad de Colorado." },
                        { "url": "https://www.educaplus.org/game/ley-de-coulomb", "titulo": "Educaplus: Simulador Coulomb", "descripcion": "Simulación web sin instalación." }
                    ]
                },
                {
                    "tituloSeccion": "📄 Artículos y PDFs",
                    "links": [
                        { "url": "https://www.unet.edu.ve/departamentos/fisica/electromagnetismo/coulomb.pdf", "titulo": "UNET: Apuntes Ley de Coulomb", "descripcion": "Documento académico universitario." }
                    ]
                }
            ]
        }
    ]
};

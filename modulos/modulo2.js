// modulos/modulo2.js — Campo Eléctrico
// 📓 NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo2 = {
    "titulo": "Módulo 2: Campo Eléctrico",
    "color": "#7c3aed",
    "icono": "scatter_plot",
    "descripcionCorta": "Vector de campo eléctrico, líneas de campo y dipolo eléctrico",
    "subtemas": ["Campo eléctrico de una carga puntual","Principio de superposición vectorial","Líneas de campo eléctrico","Dipolo eléctrico","Campo de distribuciones discretas","Movimiento de cargas en campo uniforme"],
    "lecciones": [
        { "id":"m2-l1","tipo":"multivideo","recurso":"y00efYMfQbg|-c8JxTvP9zs|CBwHsuVcXUI|hqg_89-2Lyo|c1jyhvkPqqk|3p_rM3i9IxY|tF8zfTVUAFY","titulo":"1. Videos — Campo Eléctrico","descripcion":"Teoría vectorial del campo eléctrico, líneas de campo y dipolos.","xp":10 },
        { "id":"m2-l2","tipo":"presentacion","recurso":"./player.html?clase=2","titulo":"2. Diapositivas Interactivas","descripcion":"Visualizaciones vectoriales 3D del campo eléctrico con controles interactivos.","xp":15 },
        { "id":"m2-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m2-s1","tipo":"simulador","recurso":"simuladores/Sim_M2_Campo_Vectorial.html","titulo":"3.1 Campo Eléctrico Vectorial","descripcion":"Visualiza el campo creado por múltiples cargas en tiempo real.","xp":20 },
            { "id":"m2-s2","tipo":"simulador","recurso":"simuladores/Sim_M1_Cargas.html","titulo":"3.2 Líneas de Campo","descripcion":"Traza líneas de campo para configuraciones arbitrarias de carga.","xp":20 }
          ]
        },
        { "id":"m2-j1","tipo":"juego","recurso":"juegos/Juego_2.html","titulo":"4. Physics Quest — Campo Eléctrico","descripcion":"¡Guía partículas a través de campos eléctricos! 5 rondas de desafío vectorial.","xp":25,"logro":{"id":"logro_m2","nombre":"Cartógrafo de Campos","icono":"🗺️"} },
        { "id":"m2-t","tipo":"grupo","titulo":"5. Talleres Prácticos",
          "sublecciones":[
            { "id":"m2-t1","tipo":"ejercicio","recurso":"talleres/Taller_2_1_Campo_Electrico.html","titulo":"5.1 Taller Práctico — Campo Eléctrico","descripcion":"Problemas con configuraciones de carga y dipolos.","xp":30 },
            { "id":"m2-t2","tipo":"ejercicio","recurso":"talleres/Taller_2_2_Distribuciones_Continuas.html","titulo":"5.2 Taller Práctico — Distribuciones Continuas","descripcion":"Integración de campo eléctrico de barras, anillos y discos.","xp":30 }
          ]
        },
        { "id":"m2-q1","tipo":"quiz","recurso":"quizzes/Quiz_Adaptativo_2.html","titulo":"6. Quiz Adaptativo — Módulo 2","descripcion":"Adaptativo 3 niveles: conceptual, cálculo vectorial y problemas de aplicación.","xp":40 },
        { "id":"m2-nb1","tipo":"notebooklm",
          // 📓 NOTEBOOKLM MÓDULO 2: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo":"7. NotebookLLM — Campo Eléctrico","descripcion":"IA entrenada con material de campo eléctrico. Pide explicaciones, derivaciones o ejercicios adicionales.","xp":10 },
        { "id":"m2-e1","tipo":"referencias","titulo":"8. Referencias Bibliográficas","descripcion":"Fuentes académicas verificadas sobre campo eléctrico y electrostática vectorial.","xp":10,
          "secciones":[
            { "tituloSeccion":"📘 Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/5-1-electric-field","titulo":"OpenStax: Campo Eléctrico — Cap. 5","descripcion":"Definición, propiedades y campo de distribuciones." },
                { "url":"https://www.amazon.com/dp/0131496824","titulo":"Serway — Física para Ciencias e Ingeniería Cap. 23","descripcion":"Campo eléctrico: teoría completa con problemas." }
            ]},
            { "tituloSeccion":"🌐 Recursos web","links":[
                { "url":"https://www.fisicalab.com/apartado/campo-electrico","titulo":"Fisicalab: Campo Eléctrico","descripcion":"Explicaciones, gráficas y ejercicios resueltos." },
                { "url":"https://www.khanacademy.org/science/ap-physics-2/ap-electric-charge-electric-force-and-voltage/electric-field-ap/a/electric-field-ap-physics-2","titulo":"Khan Academy: Campo Eléctrico","descripcion":"Videos y práctica guiada." }
            ]},
            { "tituloSeccion":"🔬 Simuladores externos","links":[
                { "url":"https://phet.colorado.edu/es/simulations/charges-and-fields","titulo":"PhET: Cargas y Campos","descripcion":"Simulador interactivo con líneas de campo en tiempo real." },
                { "url":"https://www.geogebra.org/m/bZcA35JW","titulo":"GeoGebra: Campo Eléctrico","descripcion":"Visualización 2D de campos vectoriales." }
            ]}
          ]
        }
    ]
};

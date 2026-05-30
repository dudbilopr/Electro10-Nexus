// modulos/modulo5.js — Capacitancia
// 📓 NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo5 = {
    "titulo": "Módulo 5: Capacitancia",
    "color": "#0891b2",
    "icono": "developer_board",
    "descripcionCorta": "Capacitores, energía almacenada, dieléctricos y circuitos capacitivos",
    "subtemas": ["Definición de capacitancia","Capacitor de placas paralelas","Capacitores esférico y cilíndrico","Energía almacenada en un capacitor","Dieléctricos y polarización","Constante dieléctrica relativa","Capacitores en serie y paralelo","Energía del campo eléctrico"],
    "lecciones": [
        { "id":"m5-l1","tipo":"multivideo","recurso":"NNelSWJnUNc|6YdyYPfLqfA|rPBpCN_TdXk|ZCGpHvTPNlA|P3DPNxNnCqQ|Y2bQSfZ8eZE","titulo":"1. Videos — Capacitancia","descripcion":"Capacitores, dieléctricos y energía: desde la teoría hasta los circuitos.","xp":10 },
        { "id":"m5-l2","tipo":"presentacion","recurso":"./player.html?clase=5","titulo":"2. Diapositivas Interactivas","descripcion":"Animaciones del proceso de carga de capacitores y efecto de los dieléctricos.","xp":15 },
        { "id":"m5-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m5-s1","tipo":"simulador","recurso":"simuladores/Sim_M5_Capacitancia.html","titulo":"3.1 Capacitor Interactivo","descripcion":"Ajusta separación, área y dieléctrico. Mide C, Q, V y energía.","xp":20 },
            { "id":"m5-s2","tipo":"simulador","recurso":"simuladores/Sim_M2_Campo_Vectorial.html","titulo":"3.2 Campo entre Placas","descripcion":"Visualiza el campo eléctrico uniforme entre placas paralelas.","xp":20 }
          ]
        },
        { "id":"m5-j1","tipo":"juego","recurso":"juegos/Juego_5.html","titulo":"4. Physics Quest — Capacitancia","descripcion":"Diseña el capacitor perfecto para almacenar la energía requerida. ¡5 desafíos de ingeniería!","xp":25,"logro":{"id":"logro_m5","nombre":"Ingeniero de Circuitos","icono":"🔋"} },
        { "id":"m5-l7","tipo":"ejercicio","recurso":"talleres/Taller_5_Capacitancia.html","titulo":"5. Taller Práctico — Capacitancia","descripcion":"Problemas de capacitores simples, combinaciones en red y energía almacenada.","xp":30 },
        { "id":"m5-q1","tipo":"quiz","recurso":"quizzes/Quiz_Adaptativo_5.html","titulo":"6. Quiz Adaptativo — Módulo 5","descripcion":"Desde definición de capacitancia hasta cálculo de energía con dieléctricos.","xp":40 },
        { "id":"m5-nb1","tipo":"notebooklm",
          // 📓 NOTEBOOKLM MÓDULO 5: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo":"7. NotebookLLM — Capacitancia","descripcion":"IA entrenada en capacitores. Explica dieléctricos, combinaciones y aplicaciones en circuitos.","xp":10 },
        { "id":"m5-e1","tipo":"referencias","titulo":"8. Referencias Bibliográficas","descripcion":"Fuentes académicas sobre capacitores, dieléctricos y energía en campos eléctricos.","xp":10,
          "secciones":[
            { "tituloSeccion":"📘 Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance","titulo":"OpenStax: Capacitores — Cap. 8","descripcion":"Capacitancia, energía y dieléctricos con ejemplos resueltos." },
                { "url":"https://www.amazon.com/dp/0131496824","titulo":"Serway — Física Vol. 2 Cap. 26","descripcion":"Capacitores en circuitos: teoría y problemas." }
            ]},
            { "tituloSeccion":"🌐 Recursos web","links":[
                { "url":"https://www.fisicalab.com/apartado/condensadores","titulo":"Fisicalab: Condensadores","descripcion":"Capacitores, dieléctricos y combinaciones." },
                { "url":"https://www.electronics-tutorials.ws/capacitor/cap_1.html","titulo":"Electronics Tutorials: Capacitors","descripcion":"Perspectiva de ingeniería electrónica." }
            ]},
            { "tituloSeccion":"🔬 Simuladores externos","links":[
                { "url":"https://phet.colorado.edu/es/simulations/capacitor-lab-basics","titulo":"PhET: Laboratorio de Capacitores","descripcion":"Experimenta con placas, separación y dieléctrico." }
            ]}
          ]
        }
    ]
};

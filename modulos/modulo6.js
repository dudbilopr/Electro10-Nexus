// modulos/modulo6.js — Circuitos Resistivos DC
// 📓 NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo6 = {
    "titulo": "Módulo 6: Circuitos Resistivos DC",
    "color": "#059669",
    "icono": "electrical_services",
    "descripcionCorta": "Corriente eléctrica, resistencia, Leyes de Kirchhoff y análisis de redes",
    "subtemas": ["Corriente eléctrica y densidad de corriente","Resistencia y resistividad","Ley de Ohm","Circuitos en serie y paralelo","Ley de Kirchhoff de voltajes (LKV)","Ley de Kirchhoff de corrientes (LKC)","Análisis de nodos y mallas","Transformación Delta-Estrella","Teorema de Thevenin y Norton","Potencia eléctrica disipada"],
    "lecciones": [
        { "id":"m6-l1","tipo":"multivideo","recurso":"Z_XkDlMFXGA|8Fy4-FOgNlA|gxbA_iy4aWM|y5X2AMZVMxM|s7YUiSeMJ0g|cFPjijfVTtU|WUmxkuYVHsQ","titulo":"1. Videos — Circuitos DC","descripcion":"Corriente, resistencia, Kirchhoff, Thevenin y Norton. Teoría completa con ejemplos.","xp":10 },
        { "id":"m6-l2","tipo":"presentacion","recurso":"./player.html?clase=6","titulo":"2. Diapositivas Interactivas","descripcion":"Análisis de circuitos con método de mallas y nodos animado paso a paso.","xp":15 },
        { "id":"m6-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m6-s1","tipo":"simulador","recurso":"simuladores/Sim_M6_Resistividad.html","titulo":"3.1 Resistividad y Geometría","descripcion":"Cómo la geometría del conductor afecta su resistencia.","xp":20 },
            { "id":"m6-s2","tipo":"simulador","recurso":"simuladores/Sim_M6_CircuitoDC.html","titulo":"3.2 Campo en Conductores","descripcion":"Campo eléctrico que impulsa la corriente en un conductor.","xp":20 }
          ]
        },
        { "id":"m6-j1","tipo":"juego","recurso":"juegos/Juego_6.html","titulo":"4. Physics Quest — Circuitos DC","descripcion":"Diseña circuitos para cumplir especificaciones de voltaje y corriente. ¡5 retos de ingeniería!","xp":25,"logro":{"id":"logro_m6","nombre":"Arquitecto de Redes","icono":"🔌"} },
        { "id":"m6-t","tipo":"grupo","titulo":"5. Talleres Prácticos",
          "sublecciones":[
            { "id":"m6-t1","tipo":"ejercicio","recurso":"talleres/Taller_6_1_Reduccion_Circuitos.html","titulo":"5.1 Taller — Reducción de Circuitos","descripcion":"Simplificación de redes resistivas: serie, paralelo y delta-estrella.","xp":25 },
            { "id":"m6-t2","tipo":"ejercicio","recurso":"talleres/Taller_6_2_Leyes_K.html","titulo":"5.2 Taller — Leyes de Kirchhoff","descripcion":"Análisis sistemático de redes usando LKV y LKC con 20 problemas.","xp":30 }
          ]
        },
        { "id":"m6-q1","tipo":"quiz","recurso":"quizzes/Quiz_Adaptativo_6.html","titulo":"6. Quiz Adaptativo — Módulo 6","descripcion":"Desde Ley de Ohm hasta análisis de redes complejas con Kirchhoff.","xp":40 },
        { "id":"m6-nb1","tipo":"notebooklm",
          // 📓 NOTEBOOKLM MÓDULO 6: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo":"7. NotebookLLM — Circuitos DC","descripcion":"IA especializada en circuitos DC. Ayuda a resolver por mallas, nodos y teoremas de Thevenin/Norton.","xp":10 },
        { "id":"m6-e1","tipo":"referencias","titulo":"8. Referencias Bibliográficas","descripcion":"Libros, tutoriales y simuladores para circuitos resistivos DC.","xp":10,
          "secciones":[
            { "tituloSeccion":"📘 Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/10-1-electromotive-force","titulo":"OpenStax: Circuitos DC — Cap. 10","descripcion":"FEM, resistencia interna, Kirchhoff y circuitos RC." },
                { "url":"https://www.amazon.com/dp/0073380679","titulo":"Hayt — Engineering Circuit Analysis","descripcion":"Análisis de circuitos con métodos de mallas y nodos." }
            ]},
            { "tituloSeccion":"🌐 Recursos web","links":[
                { "url":"https://www.allaboutcircuits.com/textbook/direct-current/","titulo":"All About Circuits: DC","descripcion":"Guía completa de circuitos DC con simuladores online." },
                { "url":"https://www.khanacademy.org/science/ap-physics-2/ap-circuits-topic","titulo":"Khan Academy: Circuitos Eléctricos","descripcion":"Videos paso a paso de Kirchhoff y circuitos." }
            ]},
            { "tituloSeccion":"🔬 Simuladores externos","links":[
                { "url":"https://phet.colorado.edu/es/simulations/circuit-construction-kit-dc","titulo":"PhET: Construcción de Circuitos DC","descripcion":"Construye y mide circuitos completos online." },
                { "url":"https://www.falstad.com/circuit/","titulo":"Falstad Circuit Simulator","descripcion":"Simulador profesional de circuitos en el navegador." }
            ]}
          ]
        }
    ]
};

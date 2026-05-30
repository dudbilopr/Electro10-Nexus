// modulos/modulo10.js — Ley de Faraday
// 📓 NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo10 = {
    "titulo": "Módulo 10: Ley de Faraday",
    "color": "#e11d48",
    "icono": "electric_meter",
    "descripcionCorta": "Inducción electromagnética, FEM inducida y Ley de Lenz",
    "subtemas": ["Flujo magnético","FEM inducida — Ley de Faraday","Ley de Lenz","FEM de movimiento (conductor en campo B)","Inductancia mutua y propia","Autoinductancia","Energía almacenada en inductores","Transformadores ideales"],
    "lecciones": [
        { "id":"m10-l1","tipo":"multivideo","recurso":"Kq6MkgJQCpI|MzVfz_DdRhA|NeG0T7BKZPM|ZBn-8GOxJHY|kDPi48ynPkM|GUCFk_Py5Ps","titulo":"1. Videos — Ley de Faraday","descripcion":"Inducción electromagnética: FEM, Lenz, inductores y transformadores.","xp":10 },
        { "id":"m10-l2","tipo":"presentacion","recurso":"./player.html?clase=10","titulo":"2. Diapositivas Interactivas","descripcion":"Animación del flujo magnético cambiante y generación de FEM. Ley de Lenz visualizada.","xp":15 },
        { "id":"m10-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m10-s1","tipo":"simulador","recurso":"simuladores/Sim_M10_FlujoMagnetico.html","titulo":"3.1 Flujo Magnético Interactivo","descripcion":"Observa cómo el cambio de flujo induce una FEM.","xp":20 },
            { "id":"m10-s2","tipo":"simulador","recurso":"simuladores/Sim_M10_FEM_Movimiento.html","titulo":"3.2 FEM de Movimiento","descripcion":"Conductor moviéndose en campo B: visualiza la FEM generada.","xp":20 }
          ]
        },
        { "id":"m10-j1","tipo":"juego","recurso":"juegos/Juego_10.html","titulo":"4. Physics Quest — Faraday","descripcion":"¡Genera la corriente exacta moviendo el conductor! 5 misiones de inducción.","xp":25,"logro":{"id":"logro_m10","nombre":"Maestro de la Inducción","icono":"⚙️"} },
        { "id":"m10-l7","tipo":"ejercicio","recurso":"talleres/Taller_10_Ley_de_Faraday.html","titulo":"5. Taller Práctico — Faraday","descripcion":"Cálculo de FEM inducida, inductancia mutua, autoinductancia y energía en inductores.","xp":30 },
        { "id":"m10-q1","tipo":"quiz","recurso":"quizzes/Quiz_Adaptativo_10.html","titulo":"6. Quiz Adaptativo — Módulo 10","descripcion":"Evalúa desde el concepto de flujo hasta el diseño de transformadores.","xp":40 },
        { "id":"m10-nb1","tipo":"notebooklm",
          // 📓 NOTEBOOKLM MÓDULO 10: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo":"7. NotebookLLM — Ley de Faraday","descripcion":"IA para inducción: explica Faraday, Lenz, inductancia y transformadores.","xp":10 },
        { "id":"m10-e1","tipo":"referencias","titulo":"8. Referencias Bibliográficas","descripcion":"Fuentes sobre inducción electromagnética y sus aplicaciones.","xp":10,
          "secciones":[
            { "tituloSeccion":"📘 Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law","titulo":"OpenStax: Ley de Faraday — Cap. 13","descripcion":"Flujo, FEM inducida, Lenz y aplicaciones." },
                { "url":"https://www.amazon.com/dp/0321971174","titulo":"Griffiths — Electrodynamics Cap. 7","descripcion":"Electrodinámica: inducción y energía del campo." }
            ]},
            { "tituloSeccion":"🌐 Recursos web","links":[
                { "url":"https://www.fisicalab.com/apartado/induccion-electromagnetica","titulo":"Fisicalab: Inducción Electromagnética","descripcion":"Teoría y ejercicios de Faraday y Lenz." },
                { "url":"https://www.khanacademy.org/science/ap-physics-2/ap-electromagnetic-induction","titulo":"Khan Academy: Inducción EM","descripcion":"Videos y práctica completa." }
            ]},
            { "tituloSeccion":"🔬 Simuladores externos","links":[
                { "url":"https://phet.colorado.edu/es/simulations/faradays-law","titulo":"PhET: Ley de Faraday","descripcion":"Mueve un imán y observa la FEM inducida en tiempo real." },
                { "url":"https://phet.colorado.edu/es/simulations/generator","titulo":"PhET: Generador Eléctrico","descripcion":"Visualiza cómo se genera corriente alterna." }
            ]}
          ]
        }
    ]
};

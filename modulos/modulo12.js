// modulos/modulo12.js — Circuitos RL, LC, RLC y Corriente Alterna
// 📓 NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo12 = {
    "titulo": "Módulo 12: Circuitos RL, LC, RLC y CA",
    "color": "#65a30d",
    "icono": "ac_unit",
    "descripcionCorta": "Circuitos con inductores y capacitores en corriente alterna: resonancia y fasores",
    "subtemas": ["Circuito RL: transitorio y estado estable","Circuito LC: oscilaciones electromagnéticas","Amortiguamiento en circuito RLC","Corriente alterna: representación fasorial","Reactancia inductiva y capacitiva","Impedancia compleja","Resonancia en serie y paralelo","Factor de potencia y potencia reactiva","Transformadores en CA","Filtros RC y RL: pasa-bajas y pasa-altas"],
    "lecciones": [
        { "id":"m12-l1","tipo":"multivideo","recurso":"2HxTt0Kl8KM|NHhK6RHFB4c|L4fTVV7mMBc|8p82v2_KYVQ|j-JK4GVv6BA|mFTfzQFdSJ8|SLFi1M0j2To","titulo":"1. Videos — Circuitos RL, LC, RLC y CA","descripcion":"Desde el circuito RL transitorio hasta resonancia y fasores en corriente alterna.","xp":10 },
        { "id":"m12-l2","tipo":"presentacion","recurso":"./player.html?clase=12","titulo":"2. Diapositivas Interactivas","descripcion":"Diagramas fasoriales animados, curvas de resonancia y respuesta en frecuencia.","xp":15 },
        { "id":"m12-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m12-s1","tipo":"simulador","recurso":"simuladores/Sim_M12_OsciladorLC.html","titulo":"3.1 Circuito LC Oscilante","descripcion":"Energía oscilando entre L y C: analogía con péndulo.","xp":20 },
            { "id":"m12-s2","tipo":"simulador","recurso":"simuladores/Sim_M12_RLC.html","titulo":"3.2 Respuesta RLC en Frecuencia","descripcion":"Curva de resonancia y factor Q del circuito RLC.","xp":20 },
            { "id":"m12-s3","tipo":"simulador","recurso":"simuladores/Sim_M12_Fasores.html","titulo":"3.3 Fasores Interactivos","descripcion":"Suma fasorial de voltajes en circuitos AC.","xp":20 }
          ]
        },
        { "id":"m12-j1","tipo":"juego","recurso":"juegos/Juego_12.html","titulo":"4. Physics Quest — Circuitos CA","descripcion":"¡Sintoniza el circuito RLC a la frecuencia de resonancia! 5 desafíos de ingeniería AC.","xp":25,"logro":{"id":"logro_m12","nombre":"Maestro de la Resonancia","icono":"〰️"} },
        { "id":"m12-l7","tipo":"ejercicio","recurso":"talleres/Taller_12_Circuitos_CA.html","titulo":"5. Taller Práctico — Circuitos CA","descripcion":"Impedancia, resonancia, fasores y factor de potencia. Transitorios.","xp":30 },
        { "id":"m12-q1","tipo":"quiz","recurso":"quizzes/Quiz_Adaptativo_12.html","titulo":"6. Quiz Adaptativo — Módulo 12","descripcion":"Evalúa desde conceptos de impedancia hasta cálculos de potencia en CA.","xp":40 },
        { "id":"m12-nb1","tipo":"notebooklm",
          // 📓 NOTEBOOKLM MÓDULO 12: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo":"7. NotebookLLM — Circuitos CA","descripcion":"IA para circuitos CA: fasores, impedancia, resonancia y filtros.","xp":10 },
        { "id":"m12-e1","tipo":"referencias","titulo":"8. Referencias Bibliográficas","descripcion":"Fuentes sobre circuitos RLC, corriente alterna y análisis de señales.","xp":10,
          "secciones":[
            { "tituloSeccion":"📘 Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/14-1-mutual-inductance","titulo":"OpenStax: Inductancia y Circuitos AC — Cap. 14–15","descripcion":"Inductores, RLC, corriente alterna y transformadores." },
                { "url":"https://www.amazon.com/dp/0073380679","titulo":"Hayt — Engineering Circuit Analysis Cap. 14","descripcion":"Análisis de circuitos en CA con fasores." },
                { "url":"https://www.amazon.com/dp/0132116056","titulo":"Nilsson & Riedel — Electric Circuits","descripcion":"Capítulo de CA: impedancia, resonancia y potencia." }
            ]},
            { "tituloSeccion":"🌐 Recursos web","links":[
                { "url":"https://www.allaboutcircuits.com/textbook/alternating-current/","titulo":"All About Circuits: AC","descripcion":"Guía completa de circuitos CA con fasores y filtros." },
                { "url":"https://www.electronics-tutorials.ws/accircuits/ac-resistance.html","titulo":"Electronics Tutorials: Circuitos AC","descripcion":"Impedancia, resonancia y filtros explicados visualmente." }
            ]},
            { "tituloSeccion":"🔬 Simuladores externos","links":[
                { "url":"https://phet.colorado.edu/es/simulations/circuit-construction-kit-ac","titulo":"PhET: Circuitos AC","descripcion":"Construye circuitos AC con inductores y capacitores." },
                { "url":"https://www.falstad.com/circuit/","titulo":"Falstad: Simulador AC","descripcion":"Simula circuitos RLC con respuesta en frecuencia en tiempo real." }
            ]}
          ]
        }
    ]
};

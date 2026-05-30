// modulos/modulo4.js — Potencial Eléctrico
// 📓 NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo4 = {
    "titulo": "Módulo 4: Potencial Eléctrico",
    "color": "#d97706",
    "icono": "bolt",
    "descripcionCorta": "Energía potencial eléctrica, potencial eléctrico y superficies equipotenciales",
    "subtemas": ["Trabajo y energía en campo eléctrico","Energía potencial eléctrica","Potencial eléctrico — definición","Potencial de una carga puntual","Superficies equipotenciales","Relación E y V (gradiente)","Potencial de distribuciones continuas","Energía almacenada en un sistema de cargas"],
    "lecciones": [
        { "id":"m4-l1","tipo":"multivideo","recurso":"mR1neFcFQms|UHPetewKgvc|D4_fOFVP5bI|gTjRqI6aFx8|DkD5JxYMjvU|eVt1V7G6W-I","titulo":"1. Videos — Potencial Eléctrico","descripcion":"Del trabajo eléctrico al potencial: derivación completa con ejemplos.","xp":10 },
        { "id":"m4-l2","tipo":"presentacion","recurso":"./player.html?clase=4","titulo":"2. Diapositivas Interactivas","descripcion":"Superficies equipotenciales animadas y relación E–V con visualizaciones 3D.","xp":15 },
        { "id":"m4-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m4-s1","tipo":"simulador","recurso":"simuladores/Sim_M4_Potencial_3D.html","titulo":"3.1 Potencial Eléctrico 3D","descripcion":"Explora el potencial y el campo de múltiples cargas en 3D.","xp":20 },
            { "id":"m4-s2","tipo":"simulador","recurso":"simuladores/Sim_M4_Equipotenciales.html","titulo":"3.2 Superficies Equipotenciales","descripcion":"Dibuja superficies equipotenciales y mide el gradiente.","xp":20 },
            { "id":"m4-s3","tipo":"simulador","recurso":"simuladores/Sim_M2_Campo_Vectorial.html","titulo":"3.3 Relación E–V","descripcion":"Verifica que el campo eléctrico es el gradiente negativo del potencial.","xp":20 }
          ]
        },
        { "id":"m4-j1","tipo":"juego","recurso":"juegos/Juego_4.html","titulo":"4. Physics Quest — Potencial","descripcion":"Navega partículas hacia zonas de menor potencial. ¡El trabajo hace la diferencia!","xp":25,"logro":{"id":"logro_m4","nombre":"Explorador de Superficies","icono":"⛰️"} },
        { "id":"m4-l7","tipo":"ejercicio","recurso":"talleres/Taller_4_Potencial_Electrico.html","titulo":"5. Taller Práctico — Potencial Eléctrico","descripcion":"Problemas de energía potencial, potencial de distribuciones y equipotenciales.","xp":30 },
        { "id":"m4-q1","tipo":"quiz","recurso":"quizzes/Quiz_Adaptativo_4.html","titulo":"6. Quiz Adaptativo — Módulo 4","descripcion":"Evalúa desde conceptos de trabajo hasta cálculo de potencial en distribuciones complejas.","xp":40 },
        { "id":"m4-nb1","tipo":"notebooklm",
          // 📓 NOTEBOOKLM MÓDULO 4: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo":"7. NotebookLLM — Potencial Eléctrico","descripcion":"IA especializada en potencial eléctrico. Pregunta sobre derivaciones, equipotenciales y más.","xp":10 },
        { "id":"m4-e1","tipo":"referencias","titulo":"8. Referencias Bibliográficas","descripcion":"Fuentes académicas sobre potencial eléctrico y energía en campos eléctricos.","xp":10,
          "secciones":[
            { "tituloSeccion":"📘 Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/7-1-electric-potential-energy","titulo":"OpenStax: Energía Potencial y Potencial — Cap. 7","descripcion":"Desarrollo completo del potencial eléctrico con ejemplos." },
                { "url":"https://www.amazon.com/dp/0321971174","titulo":"Griffiths — Electrodynamics Cap. 2.3","descripcion":"Potencial eléctrico con rigor matemático." }
            ]},
            { "tituloSeccion":"🌐 Recursos web","links":[
                { "url":"https://www.fisicalab.com/apartado/potencial-electrico","titulo":"Fisicalab: Potencial Eléctrico","descripcion":"Teoría y ejercicios con gráficas de equipotenciales." },
                { "url":"https://www.khanacademy.org/science/ap-physics-2/ap-electric-charge-electric-force-and-voltage/electric-potential-voltage-ap/v/electric-potential-energy","titulo":"Khan Academy: Potencial Eléctrico","descripcion":"Videos conceptuales y práctica." }
            ]},
            { "tituloSeccion":"🔬 Simuladores externos","links":[
                { "url":"https://phet.colorado.edu/es/simulations/charges-and-fields","titulo":"PhET: Cargas y Potencial","descripcion":"Mide el potencial en cualquier punto del espacio." }
            ]}
          ]
        }
    ]
};

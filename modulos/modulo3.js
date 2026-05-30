// modulos/modulo3.js — Ley de Gauss para el Campo Eléctrico
// 📓 NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo3 = {
    "titulo": "Módulo 3: Ley de Gauss",
    "color": "#dc2626",
    "icono": "radar",
    "descripcionCorta": "Flujo eléctrico, superficies gaussianas y simetría en el campo eléctrico",
    "subtemas": ["Flujo eléctrico","Ley de Gauss","Superficies gaussianas","Simetría esférica, cilíndrica y plana","Campo en distribuciones continuas uniformes","Conductores en equilibrio electrostático","Blindaje electrostático"],
    "lecciones": [
        { "id":"m3-l1","tipo":"multivideo","recurso":"yFOcL5WnJLw|YoYxhEJ57jA|mYHOENflNlc|hqhNsTmfHjM|aOPIm3YFSzQ|aDemZMR20fM","titulo":"1. Videos — Ley de Gauss","descripcion":"Flujo eléctrico, superficies gaussianas y aplicaciones con simetría.","xp":10 },
        { "id":"m3-l2","tipo":"presentacion","recurso":"./player.html?clase=3","titulo":"2. Diapositivas Interactivas","descripcion":"Visualización de flujo eléctrico a través de superficies con animaciones gaussianas.","xp":15 },
        { "id":"m3-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m3-s1","tipo":"simulador","recurso":"simuladores/Sim_M3_Flujo.html","titulo":"3.1 Flujo Eléctrico","descripcion":"Visualiza el flujo a través de diferentes superficies en tiempo real.","xp":20 },
            { "id":"m3-s2","tipo":"simulador","recurso":"simuladores/Sim_M3_Tabla_Gauss.html","titulo":"3.2 Tabla de Gauss Interactiva","descripcion":"Selecciona geometría y calcula el campo con la Ley de Gauss.","xp":20 },
            { "id":"m3-s3","tipo":"simulador","recurso":"simuladores/Sim_M2_Tablero_Distribuciones.html","titulo":"3.3 Distribuciones Simétricas","descripcion":"Campo de anillo, disco y cilindro cargados.","xp":20 }
          ]
        },
        { "id":"m3-j1","tipo":"juego","recurso":"juegos/Juego_3.html","titulo":"4. Physics Quest — Gauss","descripcion":"Elige la superficie gaussiana correcta y calcula el campo. ¡5 rondas desafiantes!","xp":25,"logro":{"id":"logro_m3","nombre":"Guardián del Flujo","icono":"🌊"} },
        { "id":"m3-l7","tipo":"ejercicio","recurso":"talleres/Taller_3_Ley_de_Gauss.html","titulo":"5. Taller Práctico — Gauss","descripcion":"Problemas de flujo eléctrico y aplicación de la Ley de Gauss con geometrías reales.","xp":30 },
        { "id":"m3-q1","tipo":"quiz","recurso":"quizzes/Quiz_Adaptativo_3.html","titulo":"6. Quiz Adaptativo — Módulo 3","descripcion":"Evalúa tu comprensión del flujo, las superficies gaussianas y sus aplicaciones.","xp":40 },
        { "id":"m3-nb1","tipo":"notebooklm",
          // 📓 NOTEBOOKLM MÓDULO 3: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo":"7. NotebookLLM — Ley de Gauss","descripcion":"IA especializada en Gauss. Explica cómo elegir la superficie gaussiana correcta.","xp":10 },
        { "id":"m3-e1","tipo":"referencias","titulo":"8. Referencias Bibliográficas","descripcion":"Fuentes para profundizar en la Ley de Gauss y el flujo eléctrico.","xp":10,
          "secciones":[
            { "tituloSeccion":"📘 Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/6-1-electric-flux","titulo":"OpenStax: Flujo Eléctrico y Ley de Gauss","descripcion":"Cap. 6: definición de flujo y aplicaciones con simetría." },
                { "url":"https://www.amazon.com/dp/0321971174","titulo":"Griffiths — Introduction to Electrodynamics","descripcion":"Cap. 2: electrostática con derivación rigurosa de la Ley de Gauss." }
            ]},
            { "tituloSeccion":"🌐 Recursos web","links":[
                { "url":"https://www.fisicalab.com/apartado/ley-de-gauss","titulo":"Fisicalab: Ley de Gauss","descripcion":"Aplicaciones por simetría con ejemplos numéricos." },
                { "url":"https://www.khanacademy.org/science/ap-physics-2/ap-electric-charge-electric-force-and-voltage/gauss-law-ap/v/electric-flux","titulo":"Khan Academy: Flujo y Ley de Gauss","descripcion":"Video introductorio y ejercicios." }
            ]},
            { "tituloSeccion":"🔬 Simuladores externos","links":[
                { "url":"https://phet.colorado.edu/es/simulations/charges-and-fields","titulo":"PhET: Cargas y Campos (flujo)","descripcion":"Mide el flujo a través de superficies definidas por el usuario." }
            ]}
          ]
        }
    ]
};

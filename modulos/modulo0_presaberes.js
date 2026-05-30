export const modulo0_presaberes = {
    id: "m0",
    titulo: "Módulo 0: Examen Diagnóstico de Presaberes",
    descripcion: "Prueba obligatoria para evaluar tus bases matemáticas antes de iniciar el curso. Puntaje mínimo: 65%.",
    lecciones: [
        {
            id: "m0_l1",
            titulo: "Diagnóstico Matemático Integral",
            tipo: "quiz",
            duracion: "30 min",
            preguntas: [
                {
                    pregunta: "Cálculo Diferencial: ¿Cuál es la derivada de f(x) = x^3 * sin(x)?",
                    opciones: [
                        "3x^2 * cos(x)",
                        "x^3 * cos(x) + 3x^2 * sin(x)",
                        "3x^2 * sin(x) - x^3 * cos(x)",
                        "3x^2 * sin(x)"
                    ],
                    respuestaCorrecta: 1,
                    peso: 15,
                    tema: "Cálculo Diferencial",
                    feedback_error: "Recuerda la regla del producto: (u*v)' = u'v + uv'."
                },
                {
                    pregunta: "Cálculo Integral: Evalúa la integral indefinida de ∫(2x * e^(x^2)) dx.",
                    opciones: [
                        "e^(x^2) + C",
                        "2 * e^(x^2) + C",
                        "e^(2x) + C",
                        "x^2 * e^(x^2) + C"
                    ],
                    respuestaCorrecta: 0,
                    peso: 15,
                    tema: "Cálculo Integral",
                    feedback_error: "Usa sustitución: u = x^2, du = 2x dx."
                },
                {
                    pregunta: "Ecuaciones Diferenciales: La solución general de dy/dx = y es:",
                    opciones: [
                        "y = C * e^x",
                        "y = x^2 / 2 + C",
                        "y = C * ln(x)",
                        "y = e^(Cx)"
                    ],
                    respuestaCorrecta: 0,
                    peso: 15,
                    tema: "Ecuaciones Diferenciales",
                    feedback_error: "Es una ecuación separable. (1/y)dy = dx -> ln|y| = x + C -> y = C*e^x."
                },
                {
                    pregunta: "Cálculo Vectorial: El gradiente de una función escalar f(x,y,z) produce:",
                    opciones: [
                        "Otro escalar que representa el volumen.",
                        "Un vector que apunta en la dirección de máxima tasa de cambio de f.",
                        "Un campo vectorial perpendicular al flujo eléctrico.",
                        "La divergencia del campo escalar."
                    ],
                    respuestaCorrecta: 1,
                    peso: 15,
                    tema: "Cálculo Vectorial",
                    feedback_error: "El gradiente (∇f) es fundamental en electromagnetismo para calcular el campo eléctrico a partir del potencial eléctrico."
                },
                {
                    pregunta: "Álgebra Lineal: ¿Cuál de las siguientes propiedades es correcta para el producto cruz (vectorial) de dos vectores A y B?",
                    opciones: [
                        "A x B = B x A",
                        "A x B es un escalar.",
                        "A x B = -(B x A)",
                        "El producto cruz solo está definido en 2 dimensiones."
                    ],
                    respuestaCorrecta: 2,
                    peso: 10,
                    tema: "Álgebra Lineal",
                    feedback_error: "El producto cruz es anticonmutativo: A x B = -(B x A)."
                },
                {
                    pregunta: "Física Básica: La Segunda Ley de Newton se expresa como:",
                    opciones: [
                        "F = m/a",
                        "F = m * a",
                        "E = mc^2",
                        "p = m * v"
                    ],
                    respuestaCorrecta: 1,
                    peso: 10,
                    tema: "Física Básica",
                    feedback_error: "Fuerza es masa por aceleración."
                },
                {
                    pregunta: "Cálculo Vectorial: ¿Qué operación sobre un campo vectorial A da como resultado un escalar?",
                    opciones: [
                        "Gradiente de A",
                        "Divergencia de A (∇ · A)",
                        "Rotacional de A (∇ x A)",
                        "Derivada parcial de A"
                    ],
                    respuestaCorrecta: 1,
                    peso: 10,
                    tema: "Cálculo Vectorial",
                    feedback_error: "El producto punto (divergencia) entre el operador nabla y un vector resulta en un escalar. Ley de Gauss."
                },
                {
                    pregunta: "Cálculo Integral: La integral de línea de un campo conservativo en una trayectoria cerrada es:",
                    opciones: [
                        "Siempre positiva.",
                        "Siempre negativa.",
                        "Cero (0).",
                        "Igual al trabajo realizado no nulo."
                    ],
                    respuestaCorrecta: 2,
                    peso: 10,
                    tema: "Cálculo Integral",
                    feedback_error: "En un campo conservativo, el trabajo en una trayectoria cerrada es nulo (ej. Ley de Faraday para campos electrostáticos)."
                }
            ]
        }
    ]
};

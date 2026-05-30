export const modulo0_presaberes = {
    id: "m0",
    titulo: "Módulo 0: Examen Diagnóstico de Presaberes",
    descripcion: "Prueba obligatoria para evaluar tus bases matemáticas avanzadas antes de iniciar el curso. Puntaje mínimo: 65%.",
    lecciones: [
        {
            id: "m0_l1",
            titulo: "Diagnóstico Matemático Integral (Nivel Universitario)",
            tipo: "quiz",
            duracion: "30 min",
            preguntas: [
                {
                    pregunta: "Evalúa el siguiente límite en varias variables: $$\\lim_{(x,y) \\to (0,0)} \\frac{x^2y}{x^4 + y^2}$$",
                    opciones: [
                        "1/2",
                        "El límite no existe",
                        "0",
                        "$\\infty$"
                    ],
                    respuestaCorrecta: 1,
                    peso: 15,
                    tema: "Cálculo Multivariado",
                    feedback_error: "Acercándote por la trayectoria $y = x^2$, el límite da $1/2$, pero por el eje x da $0$. Como depende de la trayectoria, no existe."
                },
                {
                    pregunta: "Dada la integral de línea $$\\oint_C \\mathbf{F} \\cdot d\\mathbf{r}$$ donde $\\mathbf{F} = (P, Q)$ es un campo conservativo y $C$ es una curva cerrada simple, ¿cuál es el resultado?",
                    opciones: [
                        "Depende de la parametrización de $C$",
                        "$\\pi$",
                        "0",
                        "El área encerrada por $C$"
                    ],
                    respuestaCorrecta: 2,
                    peso: 15,
                    tema: "Cálculo Vectorial",
                    feedback_error: "La integral de línea de un campo conservativo sobre cualquier trayectoria cerrada siempre es 0 (Teorema Fundamental de las integrales de línea)."
                },
                {
                    pregunta: "Calcula el flujo del campo vectorial $\\mathbf{F}(x,y,z) = x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}$ a través de una esfera $S$ de radio $R$ centrada en el origen, orientada hacia afuera.",
                    opciones: [
                        "$4\\pi R^3$",
                        "0",
                        "$2\\pi R^2$",
                        "$\\frac{4}{3}\\pi R^3$"
                    ],
                    respuestaCorrecta: 0,
                    peso: 20,
                    tema: "Teorema de la Divergencia",
                    feedback_error: "Por el Teorema de Gauss, $\\iint_S \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_V (\\nabla \\cdot \\mathbf{F}) dV$. La divergencia es $1+1+1=3$. Volumen esfera = $\\frac{4}{3}\\pi R^3$. Total: $4\\pi R^3$."
                },
                {
                    pregunta: "En álgebra lineal, ¿qué nos dice que el determinante del Jacobiano sea cero en un punto dado?",
                    opciones: [
                        "Que la función es localmente invertible",
                        "Que el cambio de variables deforma el espacio a volumen cero (singularidad)",
                        "Que el sistema de ecuaciones es inconsistente",
                        "Que el campo es irrotacional"
                    ],
                    respuestaCorrecta: 1,
                    peso: 15,
                    tema: "Álgebra Lineal",
                    feedback_error: "Un Jacobiano nulo indica que los vectores derivados son linealmente dependientes, comprimiendo el espacio y haciendo que la transformación no sea invertible localmente."
                },
                {
                    pregunta: "Resuelve la Ecuación Diferencial Lineal de primer orden: $$\\frac{dy}{dx} + \\frac{2}{x}y = \\frac{\\cos(x)}{x^2}$$",
                    opciones: [
                        "$y = \\frac{\\sin(x) + C}{x^2}$",
                        "$y = \\cos(x) + C x^2$",
                        "$y = \\frac{e^x}{x^2} + C$",
                        "$y = x^2\\sin(x) + C$"
                    ],
                    respuestaCorrecta: 0,
                    peso: 20,
                    tema: "Ecuaciones Diferenciales",
                    feedback_error: "El factor integrante es $\\mu(x) = e^{\\int (2/x)dx} = x^2$. Multiplicando, queda $(x^2y)' = \\cos(x)$. Integrando: $x^2y = \\sin(x) + C$, luego despejas $y$."
                },
                {
                    pregunta: "¿Cuál es el vector gradiente $\\nabla f$ de la función $f(x,y,z) = \\ln(x^2 + y^2 + z^2)$ en el punto $(1, 0, 1)$?",
                    opciones: [
                        "$(1, 0, 1)$",
                        "$(1, 1, 1)$",
                        "$(0, 0, 0)$",
                        "$(2, 0, 2)$"
                    ],
                    respuestaCorrecta: 0,
                    peso: 15,
                    tema: "Cálculo Diferencial",
                    feedback_error: "$\\nabla f = \\left(\\frac{2x}{r^2}, \\frac{2y}{r^2}, \\frac{2z}{r^2}\\right)$. En $(1,0,1)$, $r^2 = 2$. Evaluando: $\\left(\\frac{2}{2}, 0, \\frac{2}{2}\\right) = (1,0,1)$."
                }
            ]
        }
    ]
};

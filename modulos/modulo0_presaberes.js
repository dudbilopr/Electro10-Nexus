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
                    peso: 5,
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
                    peso: 10,
                    tema: "Cálculo Vectorial",
                    feedback_error: "La integral de línea de un campo conservativo sobre cualquier trayectoria cerrada siempre es 0 (Teorema Fundamental de las integrales de línea)."
                },
                {
                    pregunta: "Calcula el flujo del campo vectorial $\\mathbf{F}(x,y,z) = x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}$ a través de una esfera $S$ de radio $R$ orientada hacia afuera.",
                    opciones: [
                        "$4\\pi R^3$",
                        "0",
                        "$2\\pi R^2$",
                        "$\\frac{4}{3}\\pi R^3$"
                    ],
                    respuestaCorrecta: 0,
                    peso: 10,
                    tema: "Teorema de la Divergencia",
                    feedback_error: "Por el Teorema de Gauss, $\\iint_S \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_V (\\nabla \\cdot \\mathbf{F}) dV$. La divergencia es $3$. Volumen esfera = $\\frac{4}{3}\\pi R^3$. Total: $4\\pi R^3$."
                },
                {
                    pregunta: "En cinemática, si la aceleración de un cuerpo es $a(t) = 6t$ y parte del reposo en $x=0$, ¿cuál es su posición en $t=2$?",
                    opciones: [
                        "12",
                        "24",
                        "8",
                        "16"
                    ],
                    respuestaCorrecta: 2,
                    peso: 10,
                    tema: "Cinemática",
                    feedback_error: "$v(t) = \\int 6t dt = 3t^2$. Posición $x(t) = \\int 3t^2 dt = t^3$. En $t=2$, $x = 2^3 = 8$."
                },
                {
                    pregunta: "Un bloque de masa $m$ desliza por un plano inclinado con ángulo $\\theta$ (sin fricción). ¿Cuál es su aceleración?",
                    opciones: [
                        "$g \\cos(\\theta)$",
                        "$g \\sin(\\theta)$",
                        "$mg \\sin(\\theta)$",
                        "$g \\tan(\\theta)$"
                    ],
                    respuestaCorrecta: 1,
                    peso: 15,
                    tema: "Dinámica (Leyes de Newton)",
                    feedback_error: "La componente del peso paralela al plano es $mg \\sin(\\theta)$. Por $F=ma$, $ma = mg \\sin(\\theta) \\implies a = g \\sin(\\theta)$."
                },
                {
                    pregunta: "Un cilindro sólido de masa $M$ y radio $R$ gira sobre su eje. Su momento de inercia es $I = \\frac{1}{2}MR^2$. Si se le aplica un torque neto $\\tau$, ¿qué aceleración angular $\\alpha$ adquiere?",
                    opciones: [
                        "$\\frac{2\\tau}{MR^2}$",
                        "$\\frac{\\tau}{MR^2}$",
                        "$\\frac{\\tau M}{R^2}$",
                        "$\\tau M R^2$"
                    ],
                    respuestaCorrecta: 0,
                    peso: 15,
                    tema: "Rotación y Momento de Inercia",
                    feedback_error: "Por la segunda ley de Newton para rotación: $\\tau = I\\alpha$. Despejando $\\alpha = \\frac{\\tau}{I} = \\frac{\\tau}{\\frac{1}{2}MR^2} = \\frac{2\\tau}{MR^2}$."
                },
                {
                    pregunta: "Según la Ley de Gravitación Universal, si la distancia entre dos masas se reduce a la mitad, la fuerza de atracción gravitacional se:",
                    opciones: [
                        "Reduce a la mitad",
                        "Duplica",
                        "Cuadruplica",
                        "Mantiene igual"
                    ],
                    respuestaCorrecta: 2,
                    peso: 15,
                    tema: "Gravitación",
                    feedback_error: "La fuerza gravitacional es inversamente proporcional al cuadrado de la distancia ($F \\propto \\frac{1}{r^2}$). Si $r \\to r/2$, entonces $1/(r/2)^2 = 4/r^2$, por lo que la fuerza se cuadruplica."
                },
                {
                    pregunta: "Dados los vectores $\\mathbf{u} = 3\\mathbf{i} + 4\\mathbf{j}$ y $\\mathbf{v} = 4\\mathbf{i} - 3\\mathbf{j}$, ¿cuál es su producto escalar $\\mathbf{u} \\cdot \\mathbf{v}$?",
                    opciones: [
                        "12",
                        "0",
                        "25",
                        "7"
                    ],
                    respuestaCorrecta: 1,
                    peso: 10,
                    tema: "Vectores",
                    feedback_error: "El producto escalar es $(3)(4) + (4)(-3) = 12 - 12 = 0$. Esto indica que los vectores son perpendiculares (ortogonales)."
                },
                {
                    pregunta: "Resuelve la Ecuación Diferencial Lineal: $$\\frac{dy}{dx} + \\frac{2}{x}y = \\frac{\\cos(x)}{x^2}$$",
                    opciones: [
                        "$y = \\frac{\\sin(x) + C}{x^2}$",
                        "$y = \\cos(x) + C x^2$",
                        "$y = \\frac{e^x}{x^2} + C$",
                        "$y = x^2\\sin(x) + C$"
                    ],
                    respuestaCorrecta: 0,
                    peso: 10,
                    tema: "Ecuaciones Diferenciales",
                    feedback_error: "El factor integrante es $\\mu(x) = x^2$. Multiplicando y resolviendo se llega a $y = \\frac{\\sin(x) + C}{x^2}$."
                }
            ]
        }
    ]
};

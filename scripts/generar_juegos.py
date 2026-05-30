#!/usr/bin/env python3
"""Genera Juego_2.html ... Juego_12.html usando el motor de Juego_1.html"""
import os, re

ROOT = r'c:\Users\dudbi\Downloads\Curso_Introduccion_CDAT\Juegos'
with open(os.path.join(ROOT,'Juego_1.html'), encoding='utf-8') as f:
    template = f.read()

# Extraer motor (todo después de GAME_CONFIG hasta el final)
motor_m = re.search(r'(// ═+\n// MOTOR.*)', template, re.DOTALL)
motor_js = motor_m.group(1) if motor_m else ''

# Extraer style y body sin el script
style_m = re.search(r'<style>.*?</style>', template, re.DOTALL)
style_block = style_m.group(0)

body_m = re.search(r'(<body>.*?)<script>', template, re.DOTALL)
body_html = body_m.group(1)

GAMES = {
2:{"titulo":"Campo Eléctrico","desc":"Navega vectores de campo y calcula magnitudes. 5 rondas de electrostática vectorial.","color":"#7c3aed","mid":"m2-j1","xp":25,"logro":{"i":"🗺️","n":"Cartógrafo de Campos","d":"Completaste el Physics Quest de Campo Eléctrico sin errores"},"rondas":[
{"t":"Ronda 1","cat":"CONCEPTOS","q":"¿En qué dirección apunta el campo eléctrico de una carga negativa?","f":None,"ops":["Alejándose de la carga","Hacia la carga","En círculos alrededor","Perpendicular a la carga"],"c":1,"ok":"El campo de una carga NEGATIVA apunta hacia ella (una carga positiva de prueba sería atraída).","bad":"El campo de carga negativa apunta HACIA ella. Contrario al de carga positiva."},
{"t":"Ronda 2","cat":"CÁLCULO","q":"E en r=0.5m de q=+4μC:","f":"E = kq/r²","ops":["144 kN/C","288 kN/C","72 kN/C","36 kN/C"],"c":0,"ok":"E = 9×10⁹ × 4×10⁻⁶ / 0.25 = 144000 N/C = 144 kN/C.","bad":"E = kq/r² = 9×10⁹ × 4×10⁻⁶ / (0.5)² = 144 kN/C."},
{"t":"Ronda 3","cat":"VECTORES","q":"Dos cargas iguales +q están en los extremos de una recta. En el punto medio, E_total es:","f":None,"ops":["2kq/d² en cualquier dirección","kq/d² hacia una carga","Cero por simetría","kq/2d²"],"c":2,"ok":"Por simetría, los campos de ambas cargas se cancelan exactamente en el punto medio.","bad":"Las dos cargas iguales crean campos de igual magnitud pero opuesta dirección en el centro."},
{"t":"Ronda 4","cat":"LÍNEAS DE CAMPO","q":"Las líneas de campo eléctrico NUNCA pueden:","f":None,"ops":["Ser curvas","Cruzarse entre sí","Comenzar en cargas positivas","Terminar en cargas negativas"],"c":1,"ok":"Las líneas de campo no pueden cruzarse. Si se cruzaran, habría dos direcciones de E en ese punto.","bad":"Las líneas de E nunca se cruzan porque en cada punto el campo tiene una sola dirección."},
{"t":"Ronda 5 — FINAL","cat":"DIPOLO ELÉCTRICO","q":"El campo de un dipolo eléctrico a gran distancia decae como:","f":"E_dipolo ~ p/r³","ops":["1/r","1/r²","1/r³","constante"],"c":2,"ok":"El campo del dipolo decae como 1/r³, más rápido que el de una carga puntual (1/r²).","bad":"E_dipolo ∝ 1/r³. El factor extra de 1/r viene del momento dipolar p = qd."}
]},
3:{"titulo":"Ley de Gauss","desc":"Domina el flujo eléctrico y las superficies gaussianas. 5 rondas de simetría EM.","color":"#dc2626","mid":"m3-j1","xp":25,"logro":{"i":"🌊","n":"Guardián del Flujo","d":"Completaste el Physics Quest de Ley de Gauss sin errores"},"rondas":[
{"t":"Ronda 1","cat":"FLUJO","q":"El flujo eléctrico a través de una superficie cerrada que no contiene cargas es:","f":"Φ = Q_enc/ε₀","ops":["Igual al campo × área","Cero","Negativo siempre","Positivo siempre"],"c":1,"ok":"Φ = Q_enc/ε₀ = 0/ε₀ = 0. Sin carga dentro, el flujo neto es cero.","bad":"Φ = Q_enc/ε₀. Si Q_enc = 0 → Φ = 0."},
{"t":"Ronda 2","cat":"SIMETRÍA","q":"Para aplicar la Ley de Gauss con máxima eficiencia, la superficie gaussiana debe tener:","f":None,"ops":["El mismo material que el conductor","Simetría que haga E constante y paralelo a dA","La mayor área posible","Forma de cubo siempre"],"c":1,"ok":"La superficie ideal hace que E sea constante y paralelo (o perpendicular) a dA, simplificando la integral.","bad":"La clave es que E sea constante en la superficie para poder sacarlo de la integral."},
{"t":"Ronda 3","cat":"CÁLCULO","q":"Campo eléctrico a r=0.1m de una esfera conductora de R=0.05m con Q=5nC:","f":"E = kQ/r² (para r > R)","ops":["4500 N/C","450 N/C","45000 N/C","45 N/C"],"c":0,"ok":"E = kQ/r² = 9×10⁹ × 5×10⁻⁹ / 0.01 = 4500 N/C.","bad":"E = 9×10⁹ × 5×10⁻⁹ / (0.1)² = 45/0.01 = 4500 N/C."},
{"t":"Ronda 4","cat":"CONDUCTOR","q":"El campo eléctrico dentro de un conductor en equilibrio electrostático es:","f":None,"ops":["Máximo en el centro","Cero","Igual al campo externo","Proporcional a la carga"],"c":1,"ok":"En equilibrio electrostático, E = 0 dentro del conductor. Las cargas libres se redistribuyen hasta cancelar el campo.","bad":"E = 0 dentro. Las cargas libres del conductor se mueven hasta cancelar cualquier campo interno."},
{"t":"Ronda 5","cat":"GAUSS AVANZADO","q":"El campo de un plano conductor infinito con densidad σ a CUALQUIER distancia es:","f":"E = σ/ε₀","ops":["Decrece como 1/r²","Decrece como 1/r","Es constante: E = σ/ε₀","Depende del conductor"],"c":2,"ok":"¡Campo constante! E = σ/ε₀ para conductor, independiente de la distancia. Esto hace los condensadores tan especiales.","bad":"E = σ/ε₀ = constante. El plano infinito crea campo uniforme a cualquier distancia."}
]},
4:{"titulo":"Potencial Eléctrico","desc":"Domina el concepto de energía en campos eléctricos. 5 rondas de potencial y equipotenciales.","color":"#d97706","mid":"m4-j1","xp":25,"logro":{"i":"⛰️","n":"Explorador de Superficies","d":"Completaste el Physics Quest de Potencial sin errores"},"rondas":[
{"t":"Ronda 1","cat":"CONCEPTOS","q":"¿Cuánto trabajo requiere mover una carga sobre una superficie equipotencial?","f":None,"ops":["W = qV","W = q²/V","W = 0 (ninguno)","Depende de la trayectoria"],"c":2,"ok":"¡Exacto! Sobre una equipotencial, ΔV = 0 → W = qΔV = 0. No se requiere trabajo.","bad":"W = qΔV. En una superficie equipotencial, ΔV = 0 → W = 0."},
{"t":"Ronda 2","cat":"CÁLCULO","q":"Potencial a 0.3m de una carga de +1μC:","f":"V = kq/r","ops":["30000 V","3000 V","300 V","30 V"],"c":0,"ok":"V = 9×10⁹ × 10⁻⁶ / 0.3 = 30000 V = 30 kV.","bad":"V = kq/r = 9×10⁹ × 10⁻⁶ / 0.3 = 30000 V."},
{"t":"Ronda 3","cat":"ENERGÍA","q":"Al acercar dos cargas positivas, la energía potencial del sistema:","f":None,"ops":["Disminuye","Aumenta","No cambia","Se hace negativa"],"c":1,"ok":"U = kq₁q₂/r. Al reducir r, U aumenta. Hay que 'hacer trabajo' para acercar cargas que se repelen.","bad":"U = kq₁q₂/r. Si r disminuye y q₁q₂ > 0, entonces U aumenta."},
{"t":"Ronda 4","cat":"GRADIENTE","q":"El campo eléctrico E y el potencial V se relacionan por:","f":"E = -∇V","ops":["E = +∇V","E = -∇V","E = V/r","E = 1/V"],"c":1,"ok":"E = -∇V. El campo apunta en la dirección de máxima disminución del potencial (cuesta abajo en V).","bad":"E = -∇V. El signo negativo indica que E apunta del potencial alto al bajo."},
{"t":"Ronda 5","cat":"SUPERPOSICIÓN","q":"El potencial neto de dos cargas iguales +q en puntos equidistantes de ambas:","f":"V_total = V₁ + V₂ (escalar)","ops":["V = 0 por simetría","V = 2kq/r (el doble de cada una)","V = kq/r","V depende de la dirección"],"c":1,"ok":"¡Correcto! El potencial es ESCALAR, así que V_total = V₁ + V₂ = 2kq/r. Mucho más simple que la suma vectorial del campo.","bad":"El potencial es escalar. V_total = V₁ + V₂ = 2×(kq/r) = 2kq/r. ¡Sin análisis vectorial!"}
]},
5:{"titulo":"Capacitancia","desc":"Diseña capacitores y domina la energía almacenada. 5 rondas de electrostática aplicada.","color":"#0891b2","mid":"m5-j1","xp":25,"logro":{"i":"🔋","n":"Ingeniero de Circuitos","d":"Completaste el Physics Quest de Capacitancia sin errores"},"rondas":[
{"t":"Ronda 1","cat":"DEFINICIÓN","q":"Si un capacitor almacena Q=10μC con V=100V, su capacitancia es:","f":"C = Q/V","ops":["0.1 μF","1 μF","10 μF","100 μF"],"c":0,"ok":"C = Q/V = 10×10⁻⁶/100 = 10⁻⁷ F = 0.1 μF.","bad":"C = Q/V = 10μC / 100V = 0.1 μF."},
{"t":"Ronda 2","cat":"DIELÉCTRICO","q":"Al insertar un dieléctrico (κ=3) en un capacitor desconectado de la batería, el voltaje:","f":"Q = cte, C_nueva = κC₀","ops":["Aumenta 3 veces","Se mantiene igual","Disminuye 3 veces","Disminuye κ² veces"],"c":2,"ok":"C aumenta (= κC₀). Q se conserva (sin batería). V = Q/C_nueva = Q/(κC₀) = V₀/3. Disminuye.","bad":"C_nueva = κC₀. Q = cte. V_nueva = Q/C_nueva = V₀/κ. El voltaje DISMINUYE."},
{"t":"Ronda 3","cat":"COMBINACIONES","q":"C₁=3μF y C₂=6μF en paralelo. Capacitancia equivalente:","f":"C_par = C₁ + C₂","ops":["2 μF","9 μF","4.5 μF","18 μF"],"c":1,"ok":"En paralelo: C_eq = C₁ + C₂ = 3 + 6 = 9 μF.","bad":"Paralelo: C_eq = C₁ + C₂ = 9 μF."},
{"t":"Ronda 4","cat":"ENERGÍA","q":"La energía almacenada en C=100μF cargado a V=200V:","f":"U = ½CV²","ops":["2 J","4 J","1 J","8 J"],"c":0,"ok":"U = ½ × 100×10⁻⁶ × (200)² = ½ × 10⁻⁴ × 40000 = 2 J.","bad":"U = ½CV² = ½ × 10⁻⁴ × 4×10⁴ = 2 J."},
{"t":"Ronda 5","cat":"DISEÑO","q":"Para duplicar la capacitancia de un capacitor de placas paralelas sin cambiar el material, ¿qué hacer?","f":"C = ε₀A/d","ops":["Duplicar la separación d","Duplicar el área A","Reducir A a la mitad","Cambiar el material"],"c":1,"ok":"C = ε₀A/d. Si A → 2A y d se mantiene: C_nueva = 2C₀. ¡Duplicar el área duplica C!","bad":"C ∝ A/d. Para duplicar C: duplicar A (C = ε₀(2A)/d = 2C₀)."}
]},
6:{"titulo":"Circuitos Resistivos DC","desc":"Analiza redes resistivas con Kirchhoff y Ohm. 5 rondas de análisis de circuitos.","color":"#059669","mid":"m6-j1","xp":25,"logro":{"i":"🔌","n":"Arquitecto de Redes","d":"Completaste el Physics Quest de Circuitos DC sin errores"},"rondas":[
{"t":"Ronda 1","cat":"OHM","q":"Una resistencia de 47Ω conectada a 12V. Corriente:","f":"I = V/R","ops":["0.255 A","0.47 A","2.55 A","4.7 A"],"c":0,"ok":"I = V/R = 12/47 ≈ 0.255 A.","bad":"I = V/R = 12/47 ≈ 0.255 A ≈ 255 mA."},
{"t":"Ronda 2","cat":"SERIE","q":"R₁=10Ω, R₂=15Ω, R₃=25Ω en serie, batería 50V. Corriente en el circuito:","f":"R_eq = ΣR","ops":["1 A","2 A","0.5 A","5 A"],"c":0,"ok":"R_eq = 10+15+25 = 50Ω. I = 50/50 = 1 A.","bad":"R_total = 50Ω. I = V/R = 50/50 = 1 A."},
{"t":"Ronda 3","cat":"PARALELO","q":"Potencia disipada en R=20Ω si V=100V (en paralelo con la batería):","f":"P = V²/R","ops":["500 W","200 W","250 W","100 W"],"c":0,"ok":"P = V²/R = 10000/20 = 500 W.","bad":"P = V²/R = 100²/20 = 500 W."},
{"t":"Ronda 4","cat":"KIRCHHOFF","q":"En un nodo, entran corrientes I₁=3A e I₂=5A. La corriente que sale I₃ es:","f":"ΣI_entrada = ΣI_salida","ops":["2 A","8 A","15 A","0 A"],"c":1,"ok":"LKC: ΣI = 0 en el nodo. 3 + 5 = I₃ → I₃ = 8 A.","bad":"LKC: corrientes que entran = que salen. 3 + 5 = I₃ = 8 A."},
{"t":"Ronda 5","cat":"THEVENIN","q":"El teorema de Thevenin establece que cualquier red lineal puede reemplazarse por:","f":"V_Th en serie con R_Th","ops":["Una fuente de corriente con resistencia en paralelo","Una fuente de voltaje V_Th en serie con R_Th","Dos fuentes de voltaje","Una resistencia equivalente"],"c":1,"ok":"Thevenin: V_Th (voltaje en circuito abierto) en serie con R_Th. Norton usa fuente de corriente en paralelo.","bad":"Thevenin = V_Th en serie con R_Th. Norton = I_N en paralelo con R_N (equivalentes)."}
]},
7:{"titulo":"Ley de Lorentz","desc":"Controla partículas cargadas en campos magnéticos. 5 misiones de física de partículas.","color":"#ea580c","mid":"m7-j1","xp":25,"logro":{"i":"🚀","n":"Piloto Cuántico","d":"Completaste el Physics Quest de Lorentz sin errores"},"rondas":[
{"t":"Ronda 1","cat":"DIRECCIÓN","q":"Carga positiva moviéndose en +x, B en +z. ¿Dirección de F_magnética?","f":"F = qv × B","ops":["+y","-y","+z","-x"],"c":1,"ok":"F = q(î × k̂) = q(-ĵ) = -ĵ. La fuerza es en -y.","bad":"v = v₀î, B = B₀k̂. v×B = î×k̂ = -ĵ. Para q>0: F en -y."},
{"t":"Ronda 2","cat":"TRAYECTORIA","q":"Una partícula cargada con v ⊥ B en campo B uniforme describe:","f":None,"ops":["Una parábola","Una elipse","Un círculo","Una recta"],"c":2,"ok":"v ⊥ B constantemente → F centrípeta constante → CÍRCULO. Radio: r = mv/(qB).","bad":"F = qv×B ⊥ v siempre. Fuerza centrípeta constante → círculo."},
{"t":"Ronda 3","cat":"RADIO","q":"Protón (m=1.67×10⁻²⁷kg) con v=10⁶m/s en B=1T. Radio de órbita:","f":"r = mv/(qB)","ops":["10.4 mm","1.04 mm","104 mm","1.04 m"],"c":0,"ok":"r = 1.67×10⁻²⁷ × 10⁶ / (1.6×10⁻¹⁹ × 1) = 1.67×10⁻²¹/1.6×10⁻¹⁹ ≈ 10.4×10⁻³ m = 10.4 mm.","bad":"r = mv/(qB) = 1.67×10⁻²⁷ × 10⁶ / (1.6×10⁻¹⁹) ≈ 0.0104 m = 10.4 mm."},
{"t":"Ronda 4","cat":"TRABAJO","q":"¿Cuánto trabajo realiza la fuerza magnética de Lorentz sobre una carga en movimiento?","f":"W = ∫F·v dt","ops":["W = qvB","W = 0 siempre","W = ½mv²","Depende de B"],"c":1,"ok":"La fuerza de Lorentz es siempre ⊥ a v → W = F·v = 0. ¡La fuerza magnética no hace trabajo!","bad":"F_mag ⊥ v → W = ∫F·v dt = 0. La velocidad cambia de dirección, pero no de magnitud."},
{"t":"Ronda 5","cat":"CICLOTRÓN","q":"El período de revolución de una carga en campo B uniforme. ¿Depende de la velocidad?","f":"T = 2πm/(qB)","ops":["Sí, T ∝ v","Sí, T ∝ 1/v","No, T = 2πm/(qB) es constante","Depende del radio"],"c":2,"ok":"T = 2πm/(qB). Aunque cambie v, el radio r = mv/(qB) también cambia, y T se mantiene constante. ¡Base del ciclotrón!","bad":"T = 2πr/v = 2π(mv/qB)/v = 2πm/(qB). La v se cancela → T es independiente de v."}
]},
8:{"titulo":"Ley de Biot-Savart","desc":"Calcula campos magnéticos de corrientes eléctricas. 5 rondas de magnetostática.","color":"#9333ea","mid":"m8-j1","xp":25,"logro":{"i":"🧲","n":"Arquitecto Magnético","d":"Completaste el Physics Quest de Biot-Savart sin errores"},"rondas":[
{"t":"Ronda 1","cat":"HILO INFINITO","q":"B a 10cm de un hilo infinito con I=5A:","f":"B = μ₀I/(2πr)","ops":["10 μT","100 μT","1 μT","50 μT"],"c":0,"ok":"B = 4π×10⁻⁷ × 5 / (2π × 0.1) = 2×10⁻⁶/0.2 = 10⁻⁵ T = 10 μT.","bad":"B = μ₀I/(2πr) = 4π×10⁻⁷×5/(2π×0.1) = 10 μT."},
{"t":"Ronda 2","cat":"ESPIRA","q":"B en el centro de una espira circular de R=5cm con I=2A:","f":"B = μ₀I/(2R)","ops":["25.1 μT","12.6 μT","50.3 μT","6.28 μT"],"c":0,"ok":"B = 4π×10⁻⁷ × 2 / (2×0.05) = 8π×10⁻⁷/0.1 = 25.1 μT.","bad":"B = μ₀I/(2R) = 4π×10⁻⁷×2/(0.1) ≈ 25.1 μT."},
{"t":"Ronda 3","cat":"FUERZAS","q":"Dos hilos paralelos con corrientes en OPUESTA dirección se:","f":None,"ops":["Atraen","Repelen","No interactúan","Depende de la distancia"],"c":1,"ok":"Corrientes antiparalelas → REPULSIÓN. Corrientes paralelas → ATRACCIÓN.","bad":"Antiparalelas → repulsión. Paralelas → atracción. Lo opuesto a las cargas eléctricas."},
{"t":"Ronda 4","cat":"SOLENOIDE","q":"B dentro de solenoide: N=1000 vueltas, L=0.2m, I=3A:","f":"B = μ₀nI, n=N/L","ops":["18.8 mT","1.88 mT","0.188 mT","188 mT"],"c":0,"ok":"n = 1000/0.2 = 5000 v/m. B = 4π×10⁻⁷ × 5000 × 3 ≈ 18.8×10⁻³ T = 18.8 mT.","bad":"n = N/L = 5000 v/m. B = μ₀nI = 4π×10⁻⁷×5000×3 ≈ 18.8 mT."},
{"t":"Ronda 5","cat":"DECAIMIENTO","q":"B en el eje de una espira pequeña a gran distancia z decae como:","f":"B ∝ 1/z³ (dipolo magnético)","ops":["1/z","1/z²","1/z³","1/z⁴"],"c":2,"ok":"El campo axial de la espira a z >> R: B ≈ μ₀IR²/(2z³) ∝ 1/z³. Campo de dipolo magnético.","bad":"B_eje ≈ μ₀IR²/(2z³) ∝ 1/z³ para z >> R."}
]},
9:{"titulo":"Ley de Ampere","desc":"Domina la circulación del campo magnético con simetría. 5 rondas de electrodinámica.","color":"#0d9488","mid":"m9-j1","xp":25,"logro":{"i":"🔄","n":"Maestro Amperiano","d":"Completaste el Physics Quest de Ampere sin errores"},"rondas":[
{"t":"Ronda 1","cat":"CIRCULACIÓN","q":"La Ley de Ampere relaciona la circulación de B con:","f":"∮ B·dl = μ₀I_enc","ops":["El flujo magnético","La corriente encerrada en el camino","El campo eléctrico","La carga encerrada"],"c":1,"ok":"∮B·dl = μ₀I_enc. Solo la corriente que ATRAVIESA la superficie del lazo contribuye.","bad":"Ampere: ∮B·dl = μ₀I_enc. Es la corriente que pasa a través del camino amperiano."},
{"t":"Ronda 2","cat":"SOLENOIDE","q":"B dentro de solenoide infinito ideal (n vueltas/m, corriente I):","f":"B = μ₀nI","ops":["B varía con r","B = μ₀nI (uniforme)","B = 0","B = μ₀nI/r"],"c":1,"ok":"B = μ₀nI es uniforme dentro del solenoide ideal. ¡Es uno de los campos uniformes más importantes en electromagnetismo!","bad":"Dentro del solenoide ideal: B = μ₀nI = constante y uniforme."},
{"t":"Ronda 3","cat":"EXTERIOR","q":"B fuera de un solenoide ideal infinito es:","f":None,"ops":["μ₀nI","μ₀nI/2","Depende del radio","Cero"],"c":3,"ok":"Fuera: I_enc = 0 (las corrientes de ida y vuelta se cancelan). Gauss: B = 0 fuera del solenoide ideal.","bad":"Por Ampere con lazo exterior: I_enc = 0 → B = 0 fuera."},
{"t":"Ronda 4","cat":"TOROIDE","q":"B en el interior de un toroide de N=200 vueltas, I=4A, radio r=0.1m:","f":"B = μ₀NI/(2πr)","ops":["1.6 mT","0.8 mT","3.2 mT","0.4 mT"],"c":0,"ok":"B = 4π×10⁻⁷ × 200 × 4 / (2π × 0.1) = 16π×10⁻⁵/0.628 ≈ 1.6 mT.","bad":"B = μ₀NI/(2πr) = 4π×10⁻⁷ × 800 / (0.628) ≈ 1.6 mT."},
{"t":"Ronda 5","cat":"MAXWELL","q":"La corriente de desplazamiento de Maxwell explica:","f":"I_d = ε₀ dΦ_E/dt","ops":["Por qué la carga se conserva en conductores","Por qué existe campo magnético entre placas de capacitor en carga","La resistencia de los materiales","Por qué el solenoide tiene campo uniforme"],"c":1,"ok":"Maxwell: al cargar un capacitor, el campo E entre placas varía → corriente de desplazamiento → genera B. ¡Esto permitió predecir las ondas EM!","bad":"I_d = ε₀dΦ_E/dt. Entre las placas del capacitor, el campo E variable actúa como corriente generando B."}
]},
10:{"titulo":"Ley de Faraday","desc":"Domina la inducción electromagnética. 5 misiones de inducción y Lenz.","color":"#e11d48","mid":"m10-j1","xp":25,"logro":{"i":"⚙️","n":"Maestro de la Inducción","d":"Completaste el Physics Quest de Faraday sin errores"},"rondas":[
{"t":"Ronda 1","cat":"FARADAY","q":"Una espira con Φ_B = 0.5t² Weber. FEM inducida en t=2s:","f":"ε = -dΦ/dt = -t","ops":["ε = -2 V","ε = -1 V","ε = 0","ε = -0.5 V"],"c":0,"ok":"ε = -dΦ/dt = -d(0.5t²)/dt = -t. En t=2s: ε = -2 V.","bad":"ε = -dΦ/dt = -(d/dt)(0.5t²) = -t. En t=2: ε = -2 V."},
{"t":"Ronda 2","cat":"LENZ","q":"Al acercar el polo norte de un imán a una espira, la corriente inducida en la espira:","f":None,"ops":["Crea un polo norte enfrentado al imán (repulsión)","Crea un polo sur enfrentado al imán (atracción)","No fluye corriente","Depende de la resistencia"],"c":0,"ok":"Lenz: la corriente inducida se opone al cambio → crea un polo norte para repeler el imán que se acerca.","bad":"Lenz: la inducción se opone al cambio de flujo. Imán acercándose → flujo aumenta → espira lo repele."},
{"t":"Ronda 3","cat":"FEM MOTRIZ","q":"Conductor de 0.5m moviéndose a 3m/s perpendicular a B=0.4T. FEM inducida:","f":"ε = BLv","ops":["0.6 V","0.06 V","6 V","60 V"],"c":0,"ok":"ε = BLv = 0.4 × 0.5 × 3 = 0.6 V.","bad":"ε = BLv = 0.4×0.5×3 = 0.6 V."},
{"t":"Ronda 4","cat":"INDUCTANCIA","q":"La autoinductancia L de un inductor relaciona:","f":"ε = -L dI/dt","ops":["Voltaje y corriente DC","FEM inducida con la tasa de cambio de corriente","Campo B y corriente directa","Energía y voltaje"],"c":1,"ok":"ε = -L dI/dt. La FEM autoinducida se opone a los cambios de corriente (Lenz).","bad":"L mide la capacidad de un inductor para inducirse FEM en sí mismo: ε = -L dI/dt."},
{"t":"Ronda 5","cat":"TRANSFORMADOR","q":"Transformador: N₁=100, N₂=500. Si V₁=120V, ¿cuál es V₂?","f":"V₂/V₁ = N₂/N₁","ops":["V₂ = 600 V","V₂ = 24 V","V₂ = 120 V","V₂ = 6000 V"],"c":0,"ok":"V₂ = V₁ × N₂/N₁ = 120 × 500/100 = 600 V. Transformador elevador de voltaje.","bad":"V₂/V₁ = N₂/N₁ → V₂ = 120 × 5 = 600 V."}
]},
11:{"titulo":"Ecuaciones de Maxwell","desc":"Sintetiza el electromagnetismo clásico. 5 rondas hacia las ondas EM.","color":"#4f46e5","mid":"m11-j1","xp":25,"logro":{"i":"🌌","n":"Físico Teórico","d":"Completaste el Physics Quest de Maxwell sin errores"},"rondas":[
{"t":"Ronda 1","cat":"CUATRO ECUACIONES","q":"¿Cuál de estas NO es una ecuación de Maxwell?","f":None,"ops":["∮ E·dA = Q/ε₀","∮ B·dA = 0","F = qE + qv×B","∮ E·dl = -dΦ_B/dt"],"c":2,"ok":"F = q(E + v×B) es la Fuerza de Lorentz, no una ecuación de Maxwell. Las 4 de Maxwell son: Gauss E, Gauss B, Faraday y Ampere-Maxwell.","bad":"La Fuerza de Lorentz no es una ecuación de Maxwell. Maxwell: Gauss(×2) + Faraday + Ampere-Maxwell."},
{"t":"Ronda 2","cat":"ONDAS EM","q":"La velocidad de las ondas electromagnéticas en vacío predita por Maxwell:","f":"c = 1/√(μ₀ε₀)","ops":["c ≈ 3×10⁸ m/s (velocidad de la luz)","c ≈ 3×10⁶ m/s","c depende de la frecuencia","No se puede calcular"],"c":0,"ok":"Maxwell calculó c = 1/√(μ₀ε₀) ≈ 3×10⁸ m/s — ¡idéntico a la velocidad de la luz medida! Esto demostró que la luz ES una onda electromagnética.","bad":"c = 1/√(μ₀ε₀) ≈ 3×10⁸ m/s. Maxwell identificó que la luz es onda EM."},
{"t":"Ronda 3","cat":"GAUSS B","q":"¿Qué implica físicamente que ∮ B·dA = 0?","f":None,"ops":["B es siempre cero","No existen monopolos magnéticos (cargas magnéticas aisladas)","Las líneas de B son siempre rectas","B no penetra superficies cerradas"],"c":1,"ok":"¡Exacto! ∮B·dA = 0 significa que las líneas de B son siempre cerradas — no hay 'cargas magnéticas' (monopolos) que las originen o terminen.","bad":"Si existieran monopolos magnéticos, la ecuación sería ∮B·dA = μ₀Q_m ≠ 0."},
{"t":"Ronda 4","cat":"FARADAY-MAXWELL","q":"¿Qué dice la versión de Faraday de Maxwell en forma diferencial?","f":"∇ × E = -∂B/∂t","ops":["∇ · E = ρ/ε₀","∇ × E = -∂B/∂t","∇ · B = 0","∇ × B = μ₀J"],"c":1,"ok":"∇ × E = -∂B/∂t: un campo B que cambia en el tiempo genera un campo E rotacional. Es la base de los inductores y transformadores.","bad":"Las 4 formas diferenciales: ∇·E=ρ/ε₀, ∇·B=0, ∇×E=-∂B/∂t (Faraday), ∇×B=μ₀J+μ₀ε₀∂E/∂t."},
{"t":"Ronda 5","cat":"SÍNTESIS","q":"En una onda EM plana, los campos E y B son:","f":"E/B = c, E ⊥ B ⊥ k","ops":["Paralelos entre sí y a la dirección de propagación","E paralelo a k, B perpendicular","Ambos perpendiculares a la dirección de propagación y entre sí","E perpendicular a B pero paralelos a k"],"c":2,"ok":"¡Perfecto! E ⊥ B ⊥ k (dirección de propagación). La onda es transversal. E/B = c y oscilan en fase.","bad":"Onda EM: E ⊥ B ⊥ dirección de propagación. Ambos campos son perpendiculares a k y entre sí."}
]},
12:{"titulo":"Circuitos RL, LC, RLC y CA","desc":"Sintoniza circuitos y domina la resonancia en corriente alterna. 5 rondas de CA.","color":"#65a30d","mid":"m12-j1","xp":25,"logro":{"i":"〰️","n":"Maestro de la Resonancia","d":"Completaste el Physics Quest de Circuitos CA sin errores"},"rondas":[
{"t":"Ronda 1","cat":"REACTANCIAS","q":"X_L de un inductor de 0.1H a f=60Hz:","f":"X_L = 2πfL","ops":["37.7 Ω","6 Ω","60 Ω","377 Ω"],"c":0,"ok":"X_L = 2π × 60 × 0.1 = 37.7 Ω.","bad":"X_L = 2πfL = 2π×60×0.1 = 37.7 Ω."},
{"t":"Ronda 2","cat":"RESONANCIA","q":"ω₀ de un circuito RLC con L=0.1H, C=100μF:","f":"ω₀ = 1/√(LC)","ops":["316 rad/s","100 rad/s","31.6 rad/s","1000 rad/s"],"c":0,"ok":"ω₀ = 1/√(0.1 × 100×10⁻⁶) = 1/√(10⁻⁵) = 1/3.16×10⁻³ ≈ 316 rad/s.","bad":"ω₀ = 1/√(LC) = 1/√(10⁻⁵) ≈ 316 rad/s."},
{"t":"Ronda 3","cat":"IMPEDANCIA","q":"Circuito RLC serie en resonancia: R=50Ω, X_L=X_C=100Ω. Impedancia total:","f":"Z = √(R² + (X_L-X_C)²)","ops":["150 Ω","200 Ω","50 Ω","100 Ω"],"c":2,"ok":"En resonancia: X_L = X_C → (X_L-X_C) = 0. Z = √(R²+0) = R = 50 Ω.","bad":"En resonancia X_L = X_C se cancelan. Z = R = 50 Ω (mínimo)."},
{"t":"Ronda 4","cat":"DESFASE","q":"En un circuito capacitivo puro (solo C), la corriente respecto al voltaje:","f":None,"ops":["Está en fase con V","Adelanta 90° a V","Atrasa 90° a V","Adelanta 45° a V"],"c":1,"ok":"En un capacitor: i = C dV/dt. La corriente ADELANTA 90° al voltaje. Mnemónica: CIVIL (C-I adelanta V).","bad":"Capacitor: I adelanta 90° a V. Inductor: V adelanta 90° a I. Mnemónica: ELI el ICE man."},
{"t":"Ronda 5","cat":"FILTROS","q":"Un filtro pasa-bajas RC tiene frecuencia de corte f_c. Para f >> f_c, la salida (en C):","f":"f_c = 1/(2πRC)","ops":["Es igual a la entrada","Se atenúa progresivamente","Se amplifica","Tiene el mismo voltaje que la entrada"],"c":1,"ok":"Para f >> f_c: X_C = 1/(ωC) → 0 (el capacitor es casi cortocircuito a alta frecuencia). El voltaje en C se atenúa.","bad":"A alta frecuencia, X_C → 0. El capacitor en paralelo 'cortocircuita' la señal → V_out ≈ 0."}
]}
}

def build_game(num, cfg):
    s = style_block.replace('--accent:#2563eb', f'--accent:{cfg["color"]}')
    s = s.replace('--glow:rgba(37,99,235,0.4)', f'--glow:{cfg["color"]}66')

    rondas_js = []
    for r in cfg['rondas']:
        f_val = f'"{r["f"]}"' if r.get('f') else 'null'
        ops = ','.join(f'"{o}"' for o in r['ops'])
        rondas_js.append(f"""    {{
      titulo:"{r['t']}",categoria:"{r['cat']}",
      pregunta:"{r['q'].replace(chr(34),chr(39))}",
      formula:{f_val},
      opciones:[{ops}],correcta:{r['c']},
      feedback_ok:"{r['ok'].replace(chr(34),chr(39))}",
      feedback_bad:"{r['bad'].replace(chr(34),chr(39))}"
    }}""")

    config_js = f"""const GAME_CONFIG = {{
  titulo: "{cfg['titulo']}",
  descripcion: "{cfg['desc']}",
  color: "{cfg['color']}",
  moduloId: "{cfg['mid']}",
  xpGanado: {cfg['xp']},
  logro: {{icono:"{cfg['logro']['i']}",nombre:"{cfg['logro']['n']}",desc:"{cfg['logro']['d']}"}},
  rondas: [
{',\n'.join(rondas_js)}
  ]
}};"""

    bh = body_html

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Physics Quest — {cfg['titulo']}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
{s}
</head>
{bh}
<script>
{config_js}

{motor_js}
</script>
</body>
</html>"""
    return html

for num, cfg in GAMES.items():
    html = build_game(num, cfg)
    path = os.path.join(ROOT, f'Juego_{num}.html')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'OK: Juego_{num}.html ({len(html):,} bytes)')

print(f'\nTotal: {len(GAMES)} juegos generados.')

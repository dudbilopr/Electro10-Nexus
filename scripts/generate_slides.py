import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRESENTACIONES_DIR = os.path.join(BASE_DIR, "Presentaciones")

modules = [
    {
        "folder": "M6_Resistivos",
        "title": "Circuitos Resistivos y Corriente Continua",
        "subtitle": "Ley de Ohm, Resistividad y Leyes de Kirchhoff",
        "sims": ["simuladores/Sim_M6_Resistividad.html", "simuladores/Sim_M6_Kirchhoff.html", "", ""]
    },
    {
        "folder": "M9_Ampere",
        "title": "Ley de Ampere",
        "subtitle": "Circulación Magnética y Solenoides",
        "sims": ["simuladores/Sim_M9_Solenoide.html", "simuladores/Sim_M9_Tabla_Ampere.html", "", ""]
    },
    {
        "folder": "M10_Faraday",
        "title": "Ley de Faraday y Ley de Lenz",
        "subtitle": "Inducción Electromagnética y FEM",
        "sims": ["simuladores/Sim_M10_FlujoMagnetico.html", "simuladores/Sim_M10_FEM_Movimiento.html", "", ""]
    },
    {
        "folder": "M11_Maxwell",
        "title": "Ecuaciones de Maxwell",
        "subtitle": "Síntesis Electromagnética y Ondas EM",
        "sims": ["simuladores/Sim_M11_EcuacionesMaxwell.html", "simuladores/Sim_M11_OndaEM.html", "", ""]
    },
    {
        "folder": "M12_AC",
        "title": "Circuitos de Corriente Alterna",
        "subtitle": "Oscilaciones LC, RLC y Fasores",
        "sims": ["simuladores/Sim_M12_OsciladorLC.html", "simuladores/Sim_M12_RLC.html", "simuladores/Sim_M12_Fasores.html", ""]
    }
]

def get_portada_html(title, subtitle):
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{ background: #0f172a; font-family: 'Segoe UI', sans-serif; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; overflow: hidden; }}
    .title-wrapper {{ text-align: center; z-index: 10; padding: 2rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; backdrop-filter: blur(10px); box-shadow: 0 10px 40px rgba(0,0,0,0.5); }}
    h1 {{ font-size: 4vw; color: #38bdf8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; text-shadow: 0 0 20px rgba(56, 189, 248, 0.5); }}
    h2 {{ font-size: 2vw; color: #94a3b8; font-weight: 300; }}
    .bg-grid {{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 30px 30px; z-index: 0; opacity: 0.5; }}
  </style>
</head>
<body>
  <div class="bg-grid"></div>
  <div class="title-wrapper">
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
  </div>
</body>
</html>"""

def get_diapositiva_html(title, subtitle, sim_path, slide_num):
    iframe_html = f'<iframe src="../../{sim_path}" class="w-full h-full border-none rounded-xl"></iframe>' if sim_path else '<div class="w-full h-full flex items-center justify-center text-slate-500 bg-slate-900 rounded-xl">Contenido Teórico Adicional</div>'
    
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Diapositiva {slide_num}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        window.MathJax = {{ tex: {{ inlineMath: [['$','$'], ['\\\\(','\\\\)']] }} }};
    </script>
    <script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
    <style>
        body {{ background-color: #0f172a; overflow: hidden; }}
        .glass {{ background: rgba(30,41,59,0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }}
    </style>
</head>
<body class="text-slate-200 h-screen p-4 flex flex-col">
    <header class="glass p-4 rounded-xl mb-4 flex-none">
        <h1 class="text-2xl font-bold text-sky-400">{title}</h1>
        <p class="text-sm text-slate-400">{subtitle} - Parte {slide_num}</p>
    </header>
    <main class="flex-1 flex gap-4 min-h-0">
        <aside class="w-1/3 glass p-6 rounded-xl overflow-y-auto">
            <h2 class="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Conceptos Clave</h2>
            <div class="space-y-4 text-sm leading-relaxed text-slate-300">
                <p>Esta diapositiva interactiva permite explorar los conceptos físicos fundamentales mediante simulación en tiempo real.</p>
                <div class="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <p class="font-mono text-sky-300 font-bold mb-2">Ecuación Fundamental:</p>
                    <p class="text-center text-lg">$$ \\text{{Interactúa con el simulador}} $$</p>
                </div>
                <ul class="list-disc pl-5 space-y-2">
                    <li>Modifica los parámetros en el panel de control.</li>
                    <li>Observa la respuesta visual o gráfica.</li>
                    <li>Analiza el comportamiento físico.</li>
                </ul>
            </div>
        </aside>
        <section class="flex-1 glass p-2 rounded-xl">
            {iframe_html}
        </section>
    </main>
</body>
</html>"""


for mod in modules:
    mod_path = os.path.join(PRESENTACIONES_DIR, mod["folder"])
    if not os.path.exists(mod_path):
        os.makedirs(mod_path)
    
    # Portada
    with open(os.path.join(mod_path, "Portada.html"), "w", encoding="utf-8") as f:
        f.write(get_portada_html(mod["title"], mod["subtitle"]))
        
    # Diapositivas 1 to 4
    for i in range(1, 5):
        sim = mod["sims"][i-1]
        with open(os.path.join(mod_path, f"Diapositiva_{i}.html"), "w", encoding="utf-8") as f:
            f.write(get_diapositiva_html(mod["title"], mod["subtitle"], sim, i))
            
print("Missing presentations generated successfully.")

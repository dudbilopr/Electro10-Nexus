import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Modulo 9
mod9_path = os.path.join(BASE_DIR, "ModulosJS", "modulo9.js")
with open(mod9_path, "r", encoding="utf-8") as f:
    mod9 = f.read()

mod9 = mod9.replace('"recurso":"simuladores/Sim_M2_Cilindro.html"', '"recurso":"simuladores/Sim_M9_Solenoide.html"')
mod9 = mod9.replace('"recurso":"simuladores/Sim_M3_Tabla_Gauss.html"', '"recurso":"simuladores/Sim_M9_Tabla_Ampere.html"')

with open(mod9_path, "w", encoding="utf-8") as f:
    f.write(mod9)
print("modulo9.js patched")


# Modulo 10
mod10_path = os.path.join(BASE_DIR, "ModulosJS", "modulo10.js")
with open(mod10_path, "r", encoding="utf-8") as f:
    mod10 = f.read()

mod10 = mod10.replace('"recurso":"simuladores/Sim_M3_Flujo.html"', '"recurso":"simuladores/Sim_M10_FlujoMagnetico.html"')
mod10 = mod10.replace('"recurso":"simuladores/Sim_M7_Lorentz.html"', '"recurso":"simuladores/Sim_M10_FEM_Movimiento.html"')

with open(mod10_path, "w", encoding="utf-8") as f:
    f.write(mod10)
print("modulo10.js patched")

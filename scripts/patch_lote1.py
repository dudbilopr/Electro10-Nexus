import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Modulo 6
mod6_path = os.path.join(BASE_DIR, "ModulosJS", "modulo6.js")
with open(mod6_path, "r", encoding="utf-8") as f:
    mod6 = f.read()

mod6 = mod6.replace('"recurso":"simuladores/Sim_M2_Tablero_Lineas.html"', '"recurso":"simuladores/Sim_M6_Resistividad.html"')
mod6 = mod6.replace('"recurso":"simuladores/Sim_M2_Campo_Vectorial.html"', '"recurso":"simuladores/Sim_M6_CircuitoDC.html"')

with open(mod6_path, "w", encoding="utf-8") as f:
    f.write(mod6)
print("modulo6.js patched")


# Modulo 8
mod8_path = os.path.join(BASE_DIR, "ModulosJS", "modulo8.js")
with open(mod8_path, "r", encoding="utf-8") as f:
    mod8 = f.read()

# For M8 we replace Anillo -> Sim_M8_BiotSavart_Anillo.html
mod8 = mod8.replace('"recurso":"simuladores/Sim_M2_Anillo.html"', '"recurso":"simuladores/Sim_M8_BiotSavart_Anillo.html"')
# Varilla -> Sim_M8_BiotSavart_Hilo.html
mod8 = mod8.replace('"recurso":"simuladores/Sim_M2_Varilla.html"', '"recurso":"simuladores/Sim_M8_BiotSavart_Hilo.html"')
# For Arco, the teacher had Sim_M2_Arco.html. Let's point Arco to Sim_M8_BiotSavart_Anillo for now, as it's part of loop fields.
mod8 = mod8.replace('"recurso":"simuladores/Sim_M2_Arco.html"', '"recurso":"simuladores/Sim_M8_BiotSavart_Anillo.html"')

with open(mod8_path, "w", encoding="utf-8") as f:
    f.write(mod8)
print("modulo8.js patched")

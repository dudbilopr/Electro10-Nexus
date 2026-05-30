import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Modulo 11
mod11_path = os.path.join(BASE_DIR, "ModulosJS", "modulo11.js")
with open(mod11_path, "r", encoding="utf-8") as f:
    mod11 = f.read()

# m11-s1 is Onda EM
mod11 = re.sub(r'("id":"m11-s1".*?"recurso":)"simuladores/Sim_[^"]+"', r'\1"simuladores/Sim_M11_OndaEM.html"', mod11)
# m11-s2 is Ecuaciones de Maxwell
mod11 = re.sub(r'("id":"m11-s2".*?"recurso":)"simuladores/Sim_[^"]+"', r'\1"simuladores/Sim_M11_EcuacionesMaxwell.html"', mod11)

with open(mod11_path, "w", encoding="utf-8") as f:
    f.write(mod11)
print("modulo11.js patched")


# Modulo 12
mod12_path = os.path.join(BASE_DIR, "ModulosJS", "modulo12.js")
with open(mod12_path, "r", encoding="utf-8") as f:
    mod12 = f.read()

# m12-s1 is Oscilador LC
mod12 = re.sub(r'("id":"m12-s1".*?"recurso":)"simuladores/Sim_[^"]+"', r'\1"simuladores/Sim_M12_OsciladorLC.html"', mod12)
# m12-s2 is Resonancia RLC
mod12 = re.sub(r'("id":"m12-s2".*?"recurso":)"simuladores/Sim_[^"]+"', r'\1"simuladores/Sim_M12_RLC.html"', mod12)
# m12-s3 is Fasores
mod12 = re.sub(r'("id":"m12-s3".*?"recurso":)"simuladores/Sim_[^"]+"', r'\1"simuladores/Sim_M12_Fasores.html"', mod12)

with open(mod12_path, "w", encoding="utf-8") as f:
    f.write(mod12)
print("modulo12.js patched")

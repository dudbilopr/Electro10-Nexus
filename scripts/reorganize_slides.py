import os
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRESENTACIONES_DIR = os.path.join(BASE_DIR, "Presentaciones")

if not os.path.exists(PRESENTACIONES_DIR):
    os.makedirs(PRESENTACIONES_DIR)

mapping = {
    "Clase1": "M1_Coulomb",
    "Clase2": "M2_Gauss",
    "Clase3": "M3_Potencial",
    "Clase4": "M4_Materiales",
    "Clase5": "M5_Capacitancia",
    "Clase7": "M7_Lorentz",
    "Clase8": "M8_BiotSavart"
}

for old_name, new_name in mapping.items():
    old_path = os.path.join(BASE_DIR, old_name)
    new_path = os.path.join(PRESENTACIONES_DIR, new_name)
    if os.path.exists(old_path):
        print(f"Moving {old_path} -> {new_path}")
        shutil.move(old_path, new_path)
    else:
        print(f"Warning: {old_path} not found.")

print("Reorganization complete.")

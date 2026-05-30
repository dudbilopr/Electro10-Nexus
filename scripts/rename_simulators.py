import os
import glob

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIM_DIR = os.path.join(BASE_DIR, "Simuladores")
MOD_DIR = os.path.join(BASE_DIR, "ModulosJS")

MAPPING = {
    "Coulomb.html": "Sim_M1_Coulomb_Basico.html",
    "Simulador_Ley_de_Coulomb.html": "Sim_M1_Coulomb_Pro.html",
    "Simulador_Cargas_Electricas.html": "Sim_M1_Cargas.html",
    "Campo_Electrico.html": "Sim_M2_Campo_Vectorial.html",
    "Anillo_Cargado.html": "Sim_M2_Anillo.html",
    "Arco_Cargado.html": "Sim_M2_Arco.html",
    "Disco_Cargado.html": "Sim_M2_Disco.html",
    "Cilindro_Cargado.html": "Sim_M2_Cilindro.html",
    "Varilla_Cargada.html": "Sim_M2_Varilla.html",
    "Superficie_Semicircular_Cargada.html": "Sim_M2_Semicirculo.html",
    "Anillo_Disco_Cilindro (1).html": "Sim_M2_Tablero_Distribuciones.html",
    "Linea_Rectangulo_Paralelepipedo (1).html": "Sim_M2_Tablero_Lineas.html",
    "Flujo_Electrico.html": "Sim_M3_Flujo.html",
    "Tabla_Gauss.html": "Sim_M3_Tabla_Gauss.html",
    "Potencial_Electrico.html": "Sim_M4_Potencial_3D.html",
    "Potencial_Electrico_2.html": "Sim_M4_Equipotenciales.html",
    "Capacitance.html": "Sim_M5_Capacitancia.html",
    "LorentzLab10easy.html": "Sim_M7_Lorentz.html"
}

def main():
    # 1. Update ModulosJS files
    mod_files = glob.glob(os.path.join(MOD_DIR, "modulo*.js"))
    for mod_file in mod_files:
        with open(mod_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        updated = False
        for old_name, new_name in MAPPING.items():
            old_path = f"simuladores/{old_name}"
            new_path = f"simuladores/{new_name}"
            if old_path in content:
                content = content.replace(old_path, new_path)
                updated = True
                
        if updated:
            with open(mod_file, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated references in {os.path.basename(mod_file)}")
            
    # 2. Rename files in Simuladores
    for old_name, new_name in MAPPING.items():
        old_path = os.path.join(SIM_DIR, old_name)
        new_path = os.path.join(SIM_DIR, new_name)
        
        if os.path.exists(old_path):
            os.rename(old_path, new_path)
            print(f"Renamed: {old_name} -> {new_name}")
        else:
            print(f"Skipped (not found): {old_name}")

if __name__ == "__main__":
    main()

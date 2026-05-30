import os
import re

MODULOS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "ModulosJS")

MAPPINGS = {
    "modulo2.js": '        { "id":"m2-t","tipo":"grupo","titulo":"5. Talleres Prácticos",\n          "sublecciones":[\n            { "id":"m2-t1","tipo":"ejercicio","recurso":"talleres/Taller_2_1_Campo_Electrico.html","titulo":"5.1 Taller Práctico — Campo Eléctrico","descripcion":"Problemas con configuraciones de carga y dipolos.","xp":30 },\n            { "id":"m2-t2","tipo":"ejercicio","recurso":"talleres/Taller_2_2_Distribuciones_Continuas.html","titulo":"5.2 Taller Práctico — Distribuciones Continuas","descripcion":"Integración de campo eléctrico de barras, anillos y discos.","xp":30 }\n          ]\n        },\n',
    "modulo3.js": '        { "id":"m3-l7","tipo":"ejercicio","recurso":"talleres/Taller_3_Ley_de_Gauss.html","titulo":"5. Taller Práctico — Gauss","descripcion":"Problemas de flujo eléctrico y aplicación de la Ley de Gauss con geometrías reales.","xp":30 },\n',
    "modulo4.js": '        { "id":"m4-l7","tipo":"ejercicio","recurso":"talleres/Taller_4_Potencial_Electrico.html","titulo":"5. Taller Práctico — Potencial Eléctrico","descripcion":"Problemas de energía potencial, potencial de distribuciones y equipotenciales.","xp":30 },\n',
    "modulo5.js": '        { "id":"m5-l7","tipo":"ejercicio","recurso":"talleres/Taller_5_Capacitancia.html","titulo":"5. Taller Práctico — Capacitancia","descripcion":"Problemas de capacitores simples, combinaciones en red y energía almacenada.","xp":30 },\n',
    "modulo6.js": '        { "id":"m6-t","tipo":"grupo","titulo":"5. Talleres Prácticos",\n          "sublecciones":[\n            { "id":"m6-t1","tipo":"ejercicio","recurso":"talleres/Taller_6_1_Reduccion_Circuitos.html","titulo":"5.1 Taller — Reducción de Circuitos","descripcion":"Simplificación de redes resistivas: serie, paralelo y delta-estrella.","xp":25 },\n            { "id":"m6-t2","tipo":"ejercicio","recurso":"talleres/Taller_6_2_Leyes_K.html","titulo":"5.2 Taller — Leyes de Kirchhoff","descripcion":"Análisis sistemático de redes usando LKV y LKC con 20 problemas.","xp":30 }\n          ]\n        },\n',
    "modulo7.js": '        { "id":"m7-l7","tipo":"ejercicio","recurso":"talleres/Taller_7_Ley_de_Lorentz.html","titulo":"5. Taller Práctico — Lorentz","descripcion":"Problemas de trayectorias en campo magnético, espectrómetros y ciclotrones.","xp":30 },\n',
    "modulo8.js": '        { "id":"m8-l7","tipo":"ejercicio","recurso":"talleres/Taller_8_Biot_Savart.html","titulo":"5. Taller Práctico — Biot-Savart","descripcion":"Cálculo del campo magnético de hilos, arcos, espiras y solenoides finitos.","xp":30 },\n',
    "modulo9.js": '        { "id":"m9-l7","tipo":"ejercicio","recurso":"talleres/Taller_9_Ley_de_Ampere.html","titulo":"5. Taller Práctico — Ley de Ampere","descripcion":"Problemas de solenoides, toroides, conductores coaxiales y campo toroidal.","xp":30 },\n',
    "modulo10.js": '        { "id":"m10-l7","tipo":"ejercicio","recurso":"talleres/Taller_10_Ley_de_Faraday.html","titulo":"5. Taller Práctico — Faraday","descripcion":"Cálculo de FEM inducida, inductancia mutua, autoinductancia y energía en inductores.","xp":30 },\n',
    "modulo11.js": '        { "id":"m11-l7","tipo":"ejercicio","recurso":"talleres/Taller_11_Ecuaciones_Maxwell.html","titulo":"5. Taller Práctico — Maxwell","descripcion":"Problemas de corriente de desplazamiento, ondas EM y vector de Poynting.","xp":30 },\n',
    "modulo12.js": '        { "id":"m12-l7","tipo":"ejercicio","recurso":"talleres/Taller_12_Circuitos_CA.html","titulo":"5. Taller Práctico — Circuitos CA","descripcion":"Impedancia, resonancia, fasores y factor de potencia. Transitorios.","xp":30 },\n',
}

def patch():
    for filename, new_content in MAPPINGS.items():
        filepath = os.path.join(MODULOS_DIR, filename)
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()
            
        # Encontrar todas las líneas que tienen "tipo":"ejercicio"
        start_idx = -1
        end_idx = -1
        for i, line in enumerate(lines):
            if '"tipo":"ejercicio"' in line:
                if start_idx == -1:
                    start_idx = i
                end_idx = i
                
        if start_idx != -1:
            # Reemplazamos ese bloque de líneas por el nuevo contenido
            new_lines = lines[:start_idx] + [new_content] + lines[end_idx+1:]
            with open(filepath, "w", encoding="utf-8") as f:
                f.writelines(new_lines)
            print(f"Patched {filename}")

if __name__ == "__main__":
    patch()

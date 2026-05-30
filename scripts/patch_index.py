#!/usr/bin/env python3
# scripts/patch_index.py
# Aplica los cambios estructurales a index.html:
# 1. Reemplaza el bloque <style> por link a css/styles.css
# 2. Reemplaza el script monolitico por import a js/app.js

import re

with open(r'c:\Users\dudbi\Downloads\Curso_Introduccion_CDAT\index.html', encoding='utf-8') as f:
    content = f.read()

original_len = len(content)
changes = []

# ─── 1) Reemplazar head hasta cerrar <script de sweetalert ─────────────────
# Buscar la sección del head (antes del <style>)
head_pattern = re.compile(
    r'<!DOCTYPE html>.*?<script src="https://cdn\.jsdelivr\.net/npm/sweetalert2@11"></script>',
    re.DOTALL
)

new_head = '''<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EXGD1GSLLB"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-EXGD1GSLLB');</script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Plataforma educativa interactiva para el curso de Electromagnetismo. Videos, simuladores y evaluaciones.">
    <title>Electro10.easy | Plataforma Educativa</title>

    <!-- Fuentes Google: Inter y Material Symbols -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

    <!-- Estilos externos -->
    <link rel="stylesheet" href="./css/styles.css">

    <!-- Librerias externas (Graficos y Alertas) -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>'''

match = head_pattern.search(content)
if match:
    content = content[:match.start()] + new_head + content[match.end():]
    changes.append('HEAD reemplazado OK')
else:
    changes.append('HEAD no encontrado (revisar)')

# ─── 2) Eliminar bloque <style>...</style> ─────────────────────────────────
style_pattern = re.compile(r'\s*<style>.*?</style>', re.DOTALL)
content, n = style_pattern.subn('', content, count=1)
changes.append(f'Bloque <style> eliminado: {n} ocurrencia(s)')

# ─── 3) Reemplazar el script monolítico al final ────────────────────────────
script_pattern = re.compile(
    r'<script type="module">.*?</script>\s*</body>',
    re.DOTALL
)
new_script = '''    <!-- Lógica modularizada -->
    <script type="module" src="./js/app.js"></script>
</body>'''

content, n = script_pattern.subn(new_script, content, count=1)
changes.append(f'Script monolítico reemplazado: {n} ocurrencia(s)')

with open(r'c:\Users\dudbi\Downloads\Curso_Introduccion_CDAT\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

new_len = len(content)
print(f'Archivo original: {original_len:,} bytes')
print(f'Archivo nuevo:    {new_len:,} bytes')
print(f'Reduccion:        {original_len - new_len:,} bytes ({((original_len-new_len)/original_len*100):.1f}%)')
print()
for c in changes:
    print(' -', c)

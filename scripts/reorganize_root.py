import os
import shutil
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Map of old dir names to new dir names
RENAMES = {
    "Examen": "quizzes",
    "Juegos": "juegos",
    "ModulosJS": "modulos",
    "Presentaciones": "presentaciones",
    "Simuladores": "simuladores",
    "Talleres": "talleres"
}

# Directories to move to 'recursos'
RECURSOS = ["Logo", "Mathematics", "_archivo"]

def move_dirs():
    print("Moving and renaming directories...")
    
    # Create recursos if it doesn't exist
    recursos_path = os.path.join(BASE_DIR, "recursos")
    if not os.path.exists(recursos_path):
        os.makedirs(recursos_path)
    
    # 1. Rename standard folders
    for old, new in RENAMES.items():
        old_path = os.path.join(BASE_DIR, old)
        new_path = os.path.join(BASE_DIR, new)
        if os.path.exists(old_path):
            print(f"Renaming {old} -> {new}")
            shutil.move(old_path, new_path)
            
    # 2. Move to recursos
    for item in RECURSOS:
        item_path = os.path.join(BASE_DIR, item)
        if os.path.exists(item_path):
            print(f"Moving {item} -> recursos/{item}")
            shutil.move(item_path, os.path.join(recursos_path, item))
            
def update_references():
    print("Updating references in code...")
    
    # Files to process
    exts = ('.html', '.js', '.css', '.py')
    
    # Mapping for string replacements
    # Need to be careful with word boundaries or paths
    # It's safest to replace specifically formatted paths to avoid false positives.
    # We will replace occurrences like "ModulosJS/" -> "modulos/"
    # or "Juegos/" -> "juegos/"
    replacements = {
        "Examen/": "quizzes/",
        "Juegos/": "juegos/",
        "ModulosJS/": "modulos/",
        "Presentaciones/": "presentaciones/",
        "Simuladores/": "simuladores/",
        "Talleres/": "talleres/",
        "Logo/": "recursos/Logo/",
        "Mathematics/": "recursos/Mathematics/",
        "_archivo/": "recursos/_archivo/"
    }
    
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        # Skip hidden dirs or node_modules if any
        if '.git' in root or '.gemini' in root:
            continue
            
        for file in files:
            if file.endswith(exts):
                filepath = os.path.join(root, file)
                
                # Do not modify this script itself to avoid breaking during execution
                if filepath == os.path.abspath(__file__):
                    continue
                    
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                new_content = content
                
                for old_val, new_val in replacements.items():
                    # Replace things like href="Juegos/..." or src="./ModulosJS/..."
                    # We can simply replace the substring safely because they are very specific folder names followed by /
                    new_content = new_content.replace(old_val, new_val)
                
                # Special cases where the word might not have a trailing slash
                # e.g., if there's code dynamically appending to "ModulosJS" 
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
                    count += 1
                    
    print(f"Finished updating {count} files.")

if __name__ == "__main__":
    move_dirs()
    update_references()
    print("Reorganization complete.")

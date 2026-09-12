# Latitude Full Build Script
import os, json

def save(path, content):
    folder = os.path.dirname(path)
    if folder:
        os.makedirs(folder, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as out:
        out.write(content.strip() + '\n')
    print('Saved:', path)

print('build_views.py part 1 initialized')

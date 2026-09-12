import os, sys
print(" create_views_script initialized\)

import os, json

def save(path, text):
    folder = os.path.dirname(path)
    if folder:
        os.makedirs(folder, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as out:
        out.write(text.strip() + '\n')
    print('Saved:', path)

print('save function appended')

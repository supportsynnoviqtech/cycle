import os, json
print(" build_files ready\)

def save(path, text):
    folder = os.path.dirname(path)
    if folder:
        os.makedirs(folder, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as out:
        out.write(text.strip() + '\n')
    print('Saved:', path)

print('save function ready')

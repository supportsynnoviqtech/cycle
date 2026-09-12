# Latitude Full Generator Script
import os, json, sys

def save(path, text):
    os.makedirs(os.path.dirname(path) if os.path.dirname(path) else '.', exist_ok=True)
    with open(path, 'w', encoding='utf-8') as out:
        out.write(text.strip() + '\n')
    print('Wrote ' + path)

print('Module 1 initialized')

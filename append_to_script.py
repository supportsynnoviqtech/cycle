# Builder script writer
import os

def append_file(target, content):
    with open(target, 'a', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print('Appended to', target)

print('append_to_script.py ready')

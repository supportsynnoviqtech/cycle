# helper script
def append(target, code):
    with open(target, 'a', encoding='utf-8') as out:
        out.write(code + '\n')
    print('Appended to', target)

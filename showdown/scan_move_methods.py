import pathlib, re
root = pathlib.Path(r'C:\Users\Stijn\Desktop\Showdown-modifications\common\src\main\resources\data\cobblemon\moves')

for p in sorted(root.glob('*.js')):
    text = p.read_text(encoding='utf-8')
    i = 0
    while i < len(text):
        m = re.search(r'([A-Za-z_$][A-Za-z0-9_$]*)\s*\(([^)]*)\)\s*\{', text[i:])
        if not m:
            break
        start = i + m.start()
        name = m.group(1)
        params = m.group(2)
        if not (name.startswith('on') or name in {'durationCallback','switch'}):
            i = start + 1
            continue
        # find method end
        j = start + m.end() - 1
        depth = 0
        while j < len(text):
            ch = text[j]
            if ch == '{': depth += 1
            elif ch == '}': depth -= 1; 
            if depth == 0: break
            j += 1
        if j >= len(text): break
        body = text[start + m.end(): j]
        # remove strings/comments to avoid false positives
        # naive strip comments/strings
        s = []
        in_str = None; esc = False; line_comment = False; block_comment = False
        k = 0
        while k < len(body):
            ch = body[k]; nxt = body[k+1] if k+1 < len(body) else ''
            if in_str:
                if esc: esc=False
                elif ch == '\\': esc=True
                elif ch == in_str: in_str=None
                s.append(' '); k += 1; continue
            if line_comment:
                if ch == '\n': line_comment=False; s.append('\n')
                k += 1; continue
            if block_comment:
                if ch == '*' and nxt == '/': block_comment=False; k += 2; continue
                if ch == '\n': s.append('\n')
                k += 1; continue
            if ch == '/' and nxt == '/': line_comment=True; k += 2; continue
            if ch == '/' and nxt == '*': block_comment=True; k += 2; continue
            if ch in ('"', "'", '`'): in_str = ch; s.append(' '); k += 1; continue
            s.append(ch); k += 1
        body2 = ''.join(s)
        param_names = {part.strip().split('=')[0].strip() for part in params.split(',') if part.strip()}
        decls = set(re.findall(r'\b(?:const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)\b', body2))
        if re.search(r'\bmove\b', body2) and 'move' not in param_names and 'move' not in decls:
            print(p.name, 'method:', name, 'params:', params)
            print('  excerpt:', body[:120].replace('\n',' '))
        i = j + 1

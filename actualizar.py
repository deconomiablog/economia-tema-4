import json,re
from pathlib import Path
p=Path(__file__).resolve().parent
bank=json.loads((p/'questions.json').read_text())
assert len(bank)==125 and len({q['id'] for q in bank})==125
assert all(sum(q['b']==b for q in bank)==25 for b in range(5))
s=(p/'index.html').read_text()
s,count=re.subn(r'const BANK=.*?;\nconst BLOCKS=',lambda m:'const BANK='+json.dumps(bank,ensure_ascii=False,indent=2)+';\nconst BLOCKS=',s,count=1,flags=re.S)
assert count==1
(p/'index.html').write_text(s)
print('Banco de 125 preguntas sincronizado.')

// Comprobación sin dependencias: node verificar.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');const source=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const nodes=new Map(),memory={};const node=s=>{if(!nodes.has(s))nodes.set(s,{innerHTML:'',textContent:'',value:'',hidden:false,focus(){}});return nodes.get(s)};
const ctx={console,document:{querySelector:node,querySelectorAll:()=>[]},window:{scrollTo(){}},localStorage:{getItem:k=>memory[k]||null,setItem:(k,v)=>memory[k]=v},confirm:()=>true,setTimeout,Blob,URL};vm.createContext(ctx);vm.runInContext(source,ctx);
vm.runInContext(`
if(BANK.length!==60)throw Error('Número de preguntas');
for(let b=0;b<5;b++)if(BANK.filter(q=>q.b===b).length!==12)throw Error('Reparto');
for(const q of BANK){if(!q.why||!q.hint)throw Error('Explicación ausente');if(q.graph&&!graph(q.graph).includes('<svg'))throw Error('Gráfico ausente');}
if(numericValue('17,50')!==17.5||numericValue('')!==null||numericValue('3abc')!==null||numericValue('1.000,50')!==null)throw Error('Validación numérica');
mode='learn';start(BANK.map(q=>q.id));
for(let i=0;i<60;i++){const q=current();if(q.options)selected=q.correct;else $('#numeric').value=String(q.answer).replace('.',',');submit();if(!session.answers[i].ok)throw Error('Corrección '+q.id);const before=db.records[q.id].attempts;submit();if(db.records[q.id].attempts!==before)throw Error('Doble respuesta');next();}
if(stats().ok!==60||db.session!==null||!$('#app').innerHTML.includes('60 de 60'))throw Error('Resultados');
mode='exam';start([1]);selected=1;submit();if($('#feedback').innerHTML.includes(BANK[0].why))throw Error('Solución revelada en examen');if(db.records[1].ok!==false)throw Error('Error no registrado');next();if(!$('#app').innerHTML.includes('0 de 1'))throw Error('Resultado incorrecto');
mode='practice';start([11]);$('#numeric').value='no';submit();if(done)throw Error('Aceptó texto');$('#numeric').value='200';submit();if(!done)throw Error('Rechazó número');
`,ctx);
const ctx2={...ctx,document:{querySelector:node,querySelectorAll:()=>[]}};vm.createContext(ctx2);vm.runInContext(source,ctx2);assert.equal(vm.runInContext('db.session.ids[0]',ctx2),11);assert.equal(vm.runInContext('db.session.answers[0].ok',ctx2),true);
const bank=JSON.parse(fs.readFileSync(__dirname+'/questions.json','utf8'));assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify(BANK)',ctx2)),bank);
const expected={11:200,21:140,26:15,27:200,30:200,43:17.5,44:350,45:100,46:18.5,48:180,50:3,51:.2,55:340,58:3};
for(const [id,val] of Object.entries(expected))assert.equal(bank[+id-1].answer,val,'Cálculo pregunta '+id);
console.log('OK: 60 preguntas, 12 por bloque; respuestas, gráficos, cálculos, validación numérica, bloqueo de duplicados, modo examen, resultados y recuperación de sesión.');

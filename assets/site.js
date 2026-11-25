document.querySelectorAll('[data-ig]').forEach(a=>{a.href=RS[a.dataset.ig];a.target='_blank';a.rel='noopener'});
const f=document.querySelector('form');
if(f){f.addEventListener('submit',e=>{e.preventDefault();const L=[];
 f.querySelectorAll('[name]').forEach(c=>{const v=c.value.trim();if(v&&c.name!=='nome')L.push(c.dataset.r+': '+v)});
 const t='Olá, Robson! Sou '+f.elements.nome.value.trim()+'.\n'+(f.dataset.assunto?'Assunto: '+f.dataset.assunto+'\n':'')+escolhidas()+L.join('\n');
 window.open('https://wa.me/'+RS.whatsapp+'?text='+encodeURIComponent(t.trim()),'_blank','noopener')});
 document.querySelector('[data-cidade]')?.addEventListener('click',()=>setTimeout(()=>f.elements.local.focus({preventScroll:true}),700))}
function nomes(){return [...document.querySelectorAll('.cat input:checked')].map(i=>i.value)}
function escolhidas(){const n=nomes();return n.length?'Obras escolhidas: '+n.join(', ')+'\n':''}
// catálogo: a seleção vai pronta para o WhatsApp
const sel=document.querySelector('.sel');
if(sel){const up=()=>{const n=nomes();sel.hidden=!n.length;sel.querySelector('p').textContent=n.length?(n.length>1?n.length+' obras escolhidas: ':'1 obra escolhida: ')+n.join(', '):'Escolha as obras de que gostou';
 sel.querySelector('a').href='https://wa.me/'+RS.whatsapp+'?text='+encodeURIComponent(n.length?'Olá, Robson! Escolhi estas obras no catálogo: '+n.join(', ')+'. Pode me passar tamanhos e valores?':'Olá, Robson! Quero saber mais sobre as obras fine art.')};
 document.querySelectorAll('.cat input').forEach(i=>i.addEventListener('change',up));up()}
// capa: troca a cada 4 segundos, pausa com o mouse ou o foco em cima
const capa=document.querySelector('.capa');
if(capa){const T=capa.querySelectorAll('.txt .s'),P=capa.querySelectorAll('.fotos .s'),A=[...capa.querySelectorAll('.abas button:not(.pausa)')],b=capa.querySelector('.pausa');let at=0,para=matchMedia('(prefers-reduced-motion:reduce)').matches,sobre=false;
 const vai=n=>{at=n;[T,P].forEach(g=>g.forEach((x,k)=>x.classList.toggle('on',k===n)));A.forEach((x,k)=>x.setAttribute('aria-current',k===n))};
 const rot=()=>b.textContent=para?'Continuar':'Pausar';rot();
 A.forEach((x,k)=>x.addEventListener('click',()=>{vai(k);para=true;rot()}));b.addEventListener('click',()=>{para=!para;rot()});
 const alvo=capa.querySelector('.pilha');if(matchMedia('(hover:hover)').matches){alvo.addEventListener('mouseenter',()=>sobre=true);alvo.addEventListener('mouseleave',()=>sobre=false)}
 alvo.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible'))sobre=true});alvo.addEventListener('focusout',()=>sobre=false);
 setInterval(()=>{if(!para&&!sobre&&!document.hidden)vai((at+1)%3)},4000)}

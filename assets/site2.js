const H=document.documentElement,parado=H.classList.contains('parado');
try{if(sessionStorage.rsVisto)H.classList.add('visto');sessionStorage.rsVisto=1}catch(e){}
// entrada suave
const io=new IntersectionObserver(L=>L.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});
if(!parado)$$('.manif p,.sec h2,.sec .tres,.sangra>div,.marca blockquote,.janela,.sel h2').forEach(x=>{x.classList.add('rv');io.observe(x)});
// diafragma: acompanha a rolagem
const D=$('.diaf');if(D){const pal=D.querySelector('.palco'),furo=D.querySelector('.furo'),fi=furo.querySelector('img'),lug=D.querySelector('.lugar'),L=[...D.querySelectorAll('.legs span')];
 const FX=.5,FY=.395,lim=(a,b,v)=>Math.min(1,Math.max(0,(v-a)/(b-a))),suave=k=>k*k*(3-2*k);let cur=0,W,A,raf=0,ant=0;
 const alvo=()=>{const b=D.getBoundingClientRect();return lim(0,Math.max(1,b.height-A),-b.top)};
 const pinta=p=>{const k=suave(lim(.05,.92,p)),R0=Math.hypot(W,A)/2/.86,r=R0*Math.pow(1-k,1.3),g=k*1.9;
  const pr=fi.naturalHeight/fi.naturalWidth||1.25,w0=Math.max(W,A/2/(FY*pr),A/2/((1-FY)*pr)),w=Math.min(w0,Math.max(r*2.04,r/(FY*pr)*1.02)),cx=W/2,cy=A/2;
  fi.style.transform=`translate(${cx-w*FX}px,${cy-w*pr*FY}px) scale(${w/W})`;
  furo.style.clipPath=k>=1?'polygon(0 0,0 0,0 0)':'polygon('+[...Array(6)].map((_,i)=>{const a=g+i*Math.PI/3;return (cx+r*Math.cos(a)).toFixed(1)+'px '+(cy+r*Math.sin(a)).toFixed(1)+'px'}).join(',')+')';
  lug.style.transform=`scale(${1.14-.14*k})`;
  const o=[1,lim(.3,.44,p),lim(.66,.82,p)];L.forEach((x,i)=>{x.style.opacity=o[i];x.style.transform=`translateY(${(1-o[i])*18}px)`})};
 // aproxima aos poucos do ponto da rolagem, para a roda do mouse não dar trancos
 const anda=t=>{const dt=Math.min(60,t-(ant||t-16));ant=t;const a=alvo();cur+=(a-cur)*(1-Math.exp(-dt/110));if(Math.abs(a-cur)<.0004){cur=a;raf=0;ant=0}else raf=requestAnimationFrame(anda);pinta(cur)};
 const mede=()=>{W=pal.clientWidth;A=pal.clientHeight;cur=parado?.5:alvo();pinta(cur)};
 mede();addEventListener('resize',mede);addEventListener('load',mede);fi.addEventListener('load',mede);
 if(!parado)addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(anda)},{passive:true})}
// filtros
$$('.filtros button').forEach(b=>b.onclick=()=>{$$('.filtros button').forEach(x=>x.setAttribute('aria-pressed',x===b));$$('.grade figure').forEach(f=>f.hidden=!!b.dataset.f&&f.dataset.t!==b.dataset.f)});
// ampliação: anterior e próxima, respeitando o filtro
const passo=s=>{let n=at;do n=(n+s+F.length)%F.length;while(F[n].hidden);vai(n)};
[['Anterior',-1,''],['Próxima',1,'p']].forEach(([t,s,c])=>{const b=document.createElement('button');b.textContent=t;b.className='nav '+c;b.onclick=e=>{e.stopPropagation();passo(s)};d.append(b)});
d.addEventListener('keydown',e=>{if(/Arrow(Left|Right)/.test(e.key)){e.stopImmediatePropagation();passo(e.key==='ArrowRight'?1:-1)}},true);
let tx=0;d.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});d.addEventListener('touchend',e=>{const x=e.changedTouches[0].clientX-tx;if(Math.abs(x)>50)passo(x<0?1:-1)});
// índice de projetos
$$('.indice li').forEach(l=>{const f=()=>$('.indice>img').src='assets/fotos/'+l.dataset.i+'.jpg';l.onmouseenter=f;l.onfocus=f;l.onclick=f});
// parede
const un=(b)=>[...b.parentElement.children].forEach(x=>x.setAttribute('aria-pressed',x===b));
$$('[data-o]').forEach(b=>b.onclick=()=>{un(b);const i=$('.obra img');i.src='assets/fotos/'+b.dataset.o+'.jpg';i.alt=b.innerText});
$$('[data-p]').forEach(b=>b.onclick=()=>{un(b);$('.parede').style.setProperty('--p',b.dataset.p)});
$$('[data-s]').forEach(b=>b.onclick=()=>{un(b);$('.obra').style.setProperty('--s',b.dataset.s)});
// faixa: arrastar com o mouse
const fx=$('.faixa');if(fx){let x0=null,s0,mv;fx.addEventListener('dragstart',e=>e.preventDefault());fx.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'){x0=e.clientX;s0=fx.scrollLeft;mv=0}});addEventListener('pointermove',e=>{if(x0!==null){mv=Math.abs(e.clientX-x0);fx.scrollLeft=s0-(e.clientX-x0)}});addEventListener('pointerup',()=>x0=null);fx.addEventListener('click',e=>{if(mv>8)e.preventDefault()},true)}

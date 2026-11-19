(function(){
var $=function(i){return document.getElementById(i)},dir="pt",custom=[];
function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function ld(k){try{return localStorage.getItem(k)}catch(e){return null}}
function theme(t){document.documentElement.setAttribute("data-theme",t);document.querySelectorAll(".th").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.t===t)});sv("hv-theme",t)}
document.querySelectorAll(".th").forEach(function(b){b.onclick=function(){theme(b.dataset.t)}});
theme(ld("hv-theme")==="terra"?"terra":"prata");
var LAB={regra:"regra",conc:"conc",nd:"forma não documentada",unk:"sem entrada",frase:"frase documentada"};
function render(){var txt=$("src").value,res=$("res"),chips=$("chips"),note=$("note");chips.innerHTML="";note.textContent="";
 if(!txt.trim()){res.className="res ph";res.textContent="A tradução aparece aqui.";return}
 res.className="res";res.textContent="";var unk=0,nd=0,list=HV.translate(txt,dir);
 list.forEach(function(s){var first=1;
  s.parts.forEach(function(p,i){var e=document.createElement("span");if(p.tag==="unk"){e.className="unk";unk++}if(p.tag==="nd"){e.className="nd";e.title=p.info||"forma não documentada: mantive a forma base";nd++}
   e.textContent=(first&&dir==="pt"&&p.tag!=="unk"?HV.cap(p.o):p.o);first=0;res.appendChild(e);res.appendChild(document.createTextNode(" "))});
  res.appendChild(document.createTextNode(s.end+" "));
  s.parts.forEach(function(p){var c=document.createElement("span");c.className="chip"+(p.tag==="unk"||p.tag==="nd"?" "+p.tag:"");var b=document.createElement("b");b.textContent=p.s;c.appendChild(b);c.appendChild(document.createTextNode(" → "+p.o));
   var inf=p.info||(p.tag&&p.tag!=="rev"?LAB[p.tag]:"");if(inf){var i=document.createElement("i");i.textContent=inf;c.appendChild(i)}chips.appendChild(c)})});
 var m=[];if(unk)m.push(unk+(unk>1?" palavras sem entrada ficaram entre colchetes":" palavra sem entrada ficou entre colchetes")+"; adicione-as em Seu dicionário.");
 if(nd)m.push("Formas com linha pontilhada não têm declinação documentada; usei a forma base.");
 if(dir==="hv")m.push("Glosa em português, na ordem do valiriano; as etiquetas mostram caso, número e pessoa.");
 note.textContent=m.join(" ")}
function setDir(d){dir=d;var pt=d==="pt";$("from").textContent=pt?"Português":"Alto Valiriano";$("to").textContent=pt?"Alto Valiriano":"Português";$("keys").style.display=pt?"none":"flex";
 $("src").placeholder=pt?"Escreva aqui. Ex.: o homem ama a mulher":"Escreva aqui. Ex.: Vala ābre jorrāelas";buildEx();render()}
function buildEx(){var ex=$("ex");ex.innerHTML="";(dir==="pt"?["O homem ama a mulher","Meu dragão come o pão","Os dragões dormem","A mulher fala com a mãe","O dragão não é um escravo","Todos os homens devem servir","Onde estão os lobos?"]:["Vala ābre jorrāelas","Valar dohaeris","Ñuhys zaldrīzes havon ipradas","Avy jorrāelan","Zaldrīzes buzdari iksos daor"]).forEach(function(t){var b=document.createElement("button");b.textContent=t;b.onclick=function(){$("src").value=t;render()};ex.appendChild(b)})}
"āēīōūȳñ".split("").forEach(function(c){var b=document.createElement("button");b.textContent=c;b.type="button";b.onclick=function(){var t=$("src"),a=t.selectionStart||0,z=t.selectionEnd||0;t.value=t.value.slice(0,a)+c+t.value.slice(z);t.focus();t.selectionStart=t.selectionEnd=a+1;render()};$("keys").appendChild(b)});
$("src").addEventListener("input",render);
$("swap").onclick=function(){var r=$("res"),cur=r.classList.contains("ph")?"":r.textContent.trim(),ok=cur&&!r.querySelector(".unk");setDir(dir==="pt"?"hv":"pt");$("src").value=ok?cur:"";render()};
$("cp").onclick=function(){var r=$("res");if(r.classList.contains("ph"))return;var b=this;try{navigator.clipboard.writeText(r.textContent.trim()).then(function(){b.textContent="Copiado";setTimeout(function(){b.textContent="Copiar"},1500)},function(){})}catch(e){}};
function drawCw(){var w=$("cw");w.innerHTML="";custom.forEach(function(c,i){var s=document.createElement("span");s.textContent=c[0]+" → "+c[1];var b=document.createElement("button");b.textContent="×";b.setAttribute("aria-label","Remover "+c[0]);b.onclick=function(){custom.splice(i,1);saveC()};s.appendChild(b);w.appendChild(s)})}
function saveC(){sv("hv-custom",JSON.stringify(custom));HV.setCustom(custom);drawCw();render()}
$("cadd").onclick=function(){var a=$("cpt").value.trim(),b=$("chv").value.trim();if(!a||!b)return;custom.push([a,b,$("cty").value]);$("cpt").value="";$("chv").value="";saveC()};
try{var raw=ld("hv-custom");if(raw){var p=JSON.parse(raw);if(Array.isArray(p)){custom=p;HV.setCustom(custom)}}}catch(e){}
drawCw();setDir("pt");
})();

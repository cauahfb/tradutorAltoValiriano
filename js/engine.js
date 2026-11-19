var HV=(function(){
var strip=function(s){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()};
var CS=["nom","acc","gen","dat","loc","ins","com","voc"];
var CN={nom:"nominativo",acc:"acusativo",gen:"genitivo",dat:"dativo",loc:"locativo",ins:"instrumental",com:"comitativo",voc:"vocativo"};
var SRC={n:"dragão|zaldrīzes;homem|vala;mulher|ābra;mãe|muña;criança,menina,garota|riña;cavaleiro,soldado|azantys;hóspede,convidado|zentys;rei|dārys;rainha|dāria;sacerdote,padre|voktys;marinheiro|loktys;herege|quptys;lobo|zokla;coruja|atroksia;gato|kēli;elmo|gelte;espada|korze;urso|gryves;cabra|hobres;pé|deks;perna|kris;boca|relgos;nariz|pungos;pão|havon;carne|parklon;flor|rūklon;grama|parmon;ouro|āeksion;prata|gēlion;cobre|brāedion;aço|korzion;bronze|brāedāzma;vento|jelmio;tempestade|jelmāzma;pai|kepa;tio|qȳbor;serpente,cobra|tyvaros;amigo|raqiros;cão,cachorro|jaos;casa|lenton;água|iēdar;sangue|ānogar;mar|embar;rio|qelbar;língua,idioma|ēngos;dia|tubis;noite|bantis;inverno|sōnar;sorte|biarves;templo|anogrion;escravo|buzdari;fogo|dracarys;nome|brōzi;deus|jaehos;mão|ondos;coração|prūmia",
a:"bom,boa|sȳz;feliz|kirine;bonito,bonita,belo,bela,lindo,linda|gevie;escuro,escura|zōbrie;livre|dāeri;forte|kostōba;fraco,fraca|nākostōba;alto,alta,longo,longa|bōsa;quente|bāne;rápido,rápida|adere;velho,velha,antigo,antiga|uēpa",
d:"bem|sȳrī;devagar|paerī;rapidamente|aderī;profundamente|trūmirī;de novo|arlī;hoje|tubī;agora|sīr;sim|issa;olá|rytsas;obrigado,obrigada|kirimvose;por favor|kostilus;adeus,tchau|geros ilas;mas|yn;e|se",
w:"o que|skoros;quem|sparos;onde|skoriot",
p:"meu,minha,meus,minhas|ñuha;teu,tua,teus,tuas,seu,sua,seus,suas|aōha;nosso,nossa,nossos,nossas|īlva;vosso,vossa|jeva;dele,dela|zȳha;deles,delas|pōja",
v:"amar|jorrāelagon;falar|ȳdragon;dormir|ēdrugon;comer|ipradagon;dar|tepagon;dizer|vestragon;servir|dohaeragon;morrer|morghūljagon;vir|māzigon;viver|glaesagon;matar|ossēnagon;abraçar|ellagon;carregar|nevegon;ser|iksagon;estar|iksagon"};
var L={},REV={},VF={},custom=[];
function add(pt,hv,t){var k=strip(pt);if(!L[k])L[k]={pt:pt,hv:hv,t:t}}
function load(){L={};
 Object.keys(SRC).forEach(function(t){SRC[t].split(";").forEach(function(r){var x=r.split("|");x[0].split(",").forEach(function(p,i){add(p,x[1],t)})})});
 custom.forEach(function(c){add(c[0],c[1],c[2])});
 genVerbs();genRev()}
function stem(v){return v.replace(/(ō|o)$/,"")}
var PRN=["1sg","2sg","3sg","1pl","2pl","3pl"];
var PR={"1sg":{nom:"nyke",acc:"yne",gen:"yno",dat:"ynot",loc:"nykē",ins:"ynoma",com:"ynoma",voc:"nykys"},"2sg":{nom:"ao",acc:"avy",gen:"aō",dat:"aōt",loc:"aō",ins:"aōma",com:"aōma",voc:"aōs"},"3sg":{nom:"ziry",acc:"ziry",gen:"zijo",dat:"zijot",loc:"zirȳ",ins:"zijosy",com:"zijomy",voc:"zirys"},"1pl":{nom:"īlon",acc:"īlōn",gen:"īlo",dat:"īlot",loc:"īlō",ins:"īloma",com:"īloma",voc:"īlos"},"2pl":{nom:"jeme",acc:"jemī",gen:"jemo",dat:"jemot",loc:"jemē",ins:"jemme",com:"jemme",voc:"jemys"},"3pl":{nom:"pōnta",acc:"pōnte",gen:"pōnto",dat:"pōntot",loc:"pōntā",ins:"pōntosa",com:"pōntoma",voc:"pōntus"}};
var SUBJ={eu:"1sg",tu:"2sg",voce:"2sg",ele:"3sg",ela:"3sg",nos:"1pl",vos:"2pl",voces:"2pl",eles:"3pl",elas:"3pl"};
var OBJ={me:"1sg",te:"2sg",lhe:"3sg",nos:"1pl",vos:"2pl",lhes:"3pl",o:"3sg",a:"3sg",os:"3pl",as:"3pl"};
var PREP={de:["gen"],do:["gen"],da:["gen"],dos:["gen"],das:["gen"],para:["dat"],pra:["dat"],em:["loc"],no:["loc"],na:["loc"],nos:["loc"],nas:["loc"],com:["com"],sem:["gen","mijiot"],sobre:["gen","bē"],sob:["gen","gō"],entre:["gen","rȳ"]};
var CP={sg:["a","e","o","ot","ā","osa","oma","us"],pl:["i","ī","oti","oti","oti","ossi","ommi","is"],pc:["un","uni","uno","unta","unna","ussa","umma","ussa"],col:["ar","ari","aro","arta","arra","arza","arma","arza"]};
function decl(hv,cs,num){var i=CS.indexOf(cs),st;
 if(/ia$/.test(hv)&&num!=="sg"&&num!=="col"){st=hv.slice(0,-2);var E={pl:["ī","ī","ȳti","ȳti","ȳti"],pc:["ȳn","ȳni","ȳno","ȳnta","ȳnna"]}[num];if(E[i])return {f:st+E[i],ok:1};return {f:st+CP[num][i],ok:0}}
 if(/a$/.test(hv))return {f:hv.slice(0,-1)+CP[num][i],ok:1};
 if(/ys$/.test(hv)){st=hv.slice(0,-2);
  if(num==="sg"&&cs==="nom")return {f:hv,ok:1};if(num==="sg"&&cs==="acc")return {f:st+"i",ok:1};
  if(num==="pl"&&cs==="nom")return {f:st+"yssy",ok:1};if(num==="pl"&&cs==="acc")return {f:st+"ī",ok:1}}
 if(/es$/.test(hv)){st=hv.slice(0,-2);
  if(num==="sg"&&cs==="nom")return {f:hv,ok:1};if(num==="sg"&&cs==="acc")return {f:st+"ī",ok:1};
  if(num==="pl"&&cs==="nom")return {f:hv+"se",ok:1}}
 return {f:hv,ok:num==="sg"&&cs==="nom"}}
function gen(hv){return /a$|e$|i$/.test(hv)?"L":/s$/.test(hv)?"S":/n$/.test(hv)?"T":"A"}
var PT={nom:{L:["a","i"],S:["ys","yz"],T:["on","a"],A:["or","a"]},acc:{L:["e","ī"],S:["i","ī"],T:["on","a"],A:["or","a"]},voc:{L:["us","is"],S:["ys","yz"],T:["os","as"],A:["os","as"]}};
function possAdj(b,noun,cs,num){var st=b.slice(0,-1),g=gen(noun),n=num==="sg"||num==="col"?0:1,e;
 if(PT[cs])e=PT[cs][g][n];else if(cs==="gen")e="o";else if(cs==="dat")e="ot";else if(cs==="loc")e=n?"ȳ":"ā";else if(cs==="ins")e="os";else e="om";
 return st+e}
var LONG={a:"ā",e:"ē",i:"ī",o:"ō",u:"ū",y:"ȳ"};
function conj(inf,pn,neg){var k=PRN.indexOf(pn),st;
 if(inf==="iksagon"){var R={"1sg":"iksan","2sg":"iksā","3sg":"issa","3pl":"issi"},S={"3sg":"iksos"};var f=neg?(S[pn]||R[pn]):R[pn];return f?{f:f,ok:1,subj:neg&&!!S[pn]}:{f:inf,ok:0}}
 if(k<0)return {f:inf,ok:1};
 if(/agon$/.test(inf)){st=inf.slice(0,-4);return {f:st+(neg?["aon","aō","aos","aoty","aōt","aosy"]:["an","ā","as","ī","āt","asi"])[k],ok:1,subj:neg}}
 st=inf.slice(0,-3);var h=st.slice(0,-1),v=st.slice(-1),ok=v==="e"||k===2||k===5;
 var P=[st+"n",h+(LONG[v]||v),st+"s",h+(v==="e"?"ī":(LONG[v]||v)),h+(LONG[v]||v)+"t",st+"si"],S2=[h+"ion",h+"iō",h+"ios",h+"ioty",h+"iōt",h+"iosy"];
 return {f:(neg?S2:P)[k],ok:ok,subj:neg}}
var IRR={sou:["ser","1sg"],somos:["ser","1pl"],sao:["ser","3pl"],estou:["estar","1sg"],estas:["estar","2sg"],esta:["estar","3sg"],estamos:["estar","1pl"],estao:["estar","3pl"],dou:["dar","1sg"],das:["dar","2sg"],da:["dar","3sg"],damos:["dar","1pl"],dao:["dar","3pl"],digo:["dizer","1sg"],diz:["dizer","3sg"],dizemos:["dizer","1pl"],dizem:["dizer","3pl"],venho:["vir","1sg"],vem:["vir","3sg"],vimos:["vir","1pl"]};
function genVerbs(){VF={};
 Object.keys(IRR).forEach(function(k){if(L[IRR[k][0]])VF[k]={lem:IRR[k][0],pn:IRR[k][1],tense:"pres"}});
 var E={ar:[["o","as","a","amos","ais","am"],["ei","aste","ou","amos","astes","aram"]],er:[["o","es","e","emos","eis","em"],["i","este","eu","emos","estes","eram"]],ir:[["o","es","e","imos","is","em"],["i","iste","iu","imos","istes","iram"]]};
 Object.keys(L).forEach(function(k){var e=L[k];if(e.t!=="v")return;var m=k.match(/^(.*)(ar|er|ir)$/);if(!m)return;
  var put=function(f,pn,t){if(!VF[f])VF[f]={lem:k,pn:pn,tense:t}};
  E[m[2]][0].forEach(function(s,i){put(m[1]+s,PRN[i],"pres")});if(k!=="vir")E[m[2]][1].forEach(function(s,i){put(m[1]+s,PRN[i],"past")});
  put(k,"inf","inf")})}
function genRev(){REV={};var put=function(f,o){var k=strip(f);(REV[k]=REV[k]||[]).push(o)};
 Object.keys(L).forEach(function(k){var e=L[k];
  if(e.t==="n")["sg","pl","pc","col"].forEach(function(n){CS.forEach(function(c){var d=decl(e.hv,c,n);if(d.ok)put(d.f,{pt:e.pt,info:CN[c]+" "+({sg:"singular",pl:"plural",pc:"paucal",col:"coletivo"})[n]})})});
  else if(e.t==="v"&&e.hv!=="iksagon"){put(e.hv,{pt:e.pt,info:"infinitivo"});PRN.forEach(function(p){[0,1].forEach(function(ng){var c=conj(e.hv,p,ng);if(c.ok)put(c.f,{pt:e.pt,info:p.replace("sg"," sg.").replace("pl"," pl.")+(ng?" subjuntivo":" presente")})})})}
  else if(e.t==="v"){put(e.hv,{pt:"ser/estar",info:"infinitivo"});PRN.forEach(function(p){[0,1].forEach(function(ng){var c=conj(e.hv,p,ng);if(c.ok)put(c.f,{pt:"ser/estar",info:p+(ng?" subjuntivo":" presente")})})})}
  else if(e.t==="p"){put(e.hv,{pt:e.pt,info:"adjetivo possessivo"})}
  else put(e.hv,{pt:e.pt,info:e.t==="a"?"adjetivo":e.t==="w"?"interrogativo":""})});
 PRN.forEach(function(p){CS.forEach(function(c){put(PR[p][c],{pt:{"1sg":"eu","2sg":"você","3sg":"ele/ela","1pl":"nós","2pl":"vocês","3pl":"eles/elas"}[p],info:"pronome, "+CN[c]})})});
 put("daor",{pt:"não",info:""});put("kessa",{pt:"sim",info:"futuro"})}
function lex(s){var e=L[s];if(e)return {e:e,pl:0};
 var c=[];if(/oes$|aes$/.test(s))c.push(s.slice(0,-3)+"ao");if(/ais$/.test(s))c.push(s.slice(0,-3)+"al");if(/es$/.test(s))c.push(s.slice(0,-2));if(/s$/.test(s))c.push(s.slice(0,-1));
 for(var i=0;i<c.length;i++){e=L[c[i]];if(e&&(e.t==="n"||e.t==="a"||e.t==="p"))return {e:e,pl:1}}return null}
function an(w){var raw=w.toLowerCase(),s=strip(w);
 if(raw==="é")return {t:"verb",lem:"ser",pn:"3sg",tense:"pres",src:w};
 if(s==="nao")return {t:"neg",src:w};
 var x;
 if(PREP[s]&&!(L[s]))return {t:"prep",c:PREP[s][0],post:PREP[s][1],src:w};
 if(SUBJ[s])return {t:"pron",pn:SUBJ[s],src:w};
 if(OBJ[s])return {t:"pron",pn:OBJ[s],src:w,clit:1};
 if(VF[s]&&L[VF[s].lem])return {t:"verb",lem:VF[s].lem,pn:VF[s].pn,tense:VF[s].tense,src:w};
 x=lex(s);if(x){var e=x.e;return {t:e.t==="n"?"noun":e.t==="a"?"adj":e.t==="p"?"poss":e.t==="w"?"wh":"adv",hv:e.hv,pl:x.pl,src:w,pt:e.pt,ty:e.t}}
 return {t:"unk",src:w}}
function parse(ws){var T=[],i=0;
 while(i<ws.length){var hit=null;
  for(var n=Math.min(3,ws.length-i);n>1&&!hit;n--){var k=strip(ws.slice(i,i+n).join(" ")),e=L[k];if(e&&(e.t==="d"||e.t==="w"))hit={t:e.t==="w"?"wh":"adv",hv:e.hv,src:ws.slice(i,i+n).join(" "),ty:e.t,n:n}}
  if(!hit){var t=an(ws[i]);
   if(/^(o|a|os|as|um|uma|uns|umas)$/.test(strip(ws[i]))){var nx=ws[i+1]&&an(ws[i+1]);hit=nx&&nx.t==="verb"&&OBJ[strip(ws[i])]?t:{t:"art",src:ws[i]}}
   else hit=t;hit.n=1}
  T.push(hit);i+=hit.n}
 return T}
function trSent(txt){
 var ws=(txt.match(/[\p{L}]+(?:-[\p{L}]+)*/gu)||[]),T=parse(ws),neg=T.some(function(t){return t.t==="neg"}),
 vi=-1;T.forEach(function(t,i){if(vi<0&&t.t==="verb")vi=i});
 var V=vi>=0?T[vi]:null,cop=V&&V.lem&&/^(ser|estar)$/.test(V.lem),ch=[],chips=[],pend=[],prep=null,flags=0;
 function nextNonArt(i){for(i++;i<T.length&&T[i].t==="art";i++);return T[i]}
 T.forEach(function(t,i){var p=T[i-1];
  switch(t.t){
  case "art":chips.push({s:t.src,o:"(sem artigo no idioma)",k:"drop"});break;
  case "neg":chips.push({s:t.src,o:"daor"+(V?" (verbo no subjuntivo)":""),k:""});break;
  case "prep":prep=t;break;
  case "adj":case "poss":{var nx=nextNonArt(i);
   if(p&&p.t==="noun"&&ch.length&&ch[ch.length-1].k==="np"&&!ch[ch.length-1].done){ch[ch.length-1].adj.push(t)}
   else if(nx&&nx.t==="noun")pend.push(t);else ch.push({k:"x",o:t.hv,s:t.src,tag:"conc"});break}
  case "noun":ch.push({k:"np",n:t,adj:pend,prep:prep,i:i});pend=[];prep=null;break;
  case "pron":{
   if(!t.clit&&(vi<0||i<vi)&&!prep){chips.push({s:t.src,o:"(sujeito omitido: o verbo já indica a pessoa)",k:"drop"})}
   else ch.push({k:"pro",pn:t.pn,prep:prep,s:t.src,cop:cop});prep=null;break}
  case "verb":if(i===vi)ch.push({k:"v"});else chips.push({s:t.src,o:"(verbo auxiliar ignorado)",k:"drop"});break;
  case "adv":ch.push({k:"x",o:t.hv,s:t.src});break;
  case "wh":ch.unshift({k:"x",o:t.hv,s:t.src});break;
  default:ch.push({k:"unk",s:t.src})}});
 var out=[],tail=[],po=[];
 ch.forEach(function(c){
  if(c.k==="np"){var cs=c.prep?c.prep.c:(cop||vi<0||c.i<vi?"nom":"acc"),num=c.n.pl?"pl":"sg",d=decl(c.n.hv,cs,num),parts=[];
   c.adj.forEach(function(a){if(a.t==="poss")parts.push({o:possAdj(a.hv,c.n.hv,cs,num),s:a.src,tag:"regra"});else parts.push({o:a.hv,s:a.src,tag:"conc"})});
   parts.push({o:d.f,s:c.n.src,tag:d.ok?(cs==="nom"&&num==="sg"?"":"regra"):"nd",info:CN[cs]+(num==="pl"?" plural":"")});
   if(c.prep&&c.prep.post)parts.push({o:c.prep.post,s:c.prep.src,tag:""});
   var last=po[po.length-1];if(c.prep&&c.prep.c==="gen"&&!c.prep.post&&last&&last.k==="np"){po.splice(po.length-1,0,{k:"np",parts:parts})}else po.push({k:"np",parts:parts})}
  else if(c.k==="pro"){var o=PR[c.pn][c.prep?c.prep.c:(c.cop?"nom":"acc")];po.push({k:"pro",parts:[{o:o,s:c.s,tag:"regra"}]})}
  else if(c.k==="x")po.push({k:"x",parts:[{o:c.o,s:c.s,tag:c.tag||""}]});
  else if(c.k==="unk"){po.push({k:"unk",parts:[{o:"["+c.s+"]",s:c.s,tag:"unk"}]});}
  else if(c.k==="v"){var h=L[V.lem].hv,cj=V.tense==="inf"?{f:h,ok:1}:conj(h,V.pn,neg),np=[{o:cj.f,s:V.src,tag:cj.ok?"regra":"nd",info:V.tense==="past"?"passado: usei o presente (tempos passado e futuro não são gerados)":""}];
   if(V.tense==="inf"||h==="iksagon"&&cj.ok&&!cj.subj&&V.tense==="pres"&&!neg)np[0].tag="";
   tail=np;if(neg)tail.push({o:"daor",s:"não",tag:""})}});
 po.forEach(function(g){g.parts.forEach(function(p){out.push(p)})});tail.forEach(function(p){out.push(p)});
 return out}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
var PH=[["todos os homens devem morrer","Valar morghūlis"],["todos os homens devem servir","Valar dohaeris"],["fogo de dragao","Dracarys"],["eu te amo","Avy jorrāelan"],["por favor","Kostilus"],["hoje nao","Tubī daor"],["o inverno esta aqui","Sōnar mastan"],["valiriano e minha lingua materna","Valyrio muño ēngos ñuhys issa"],["onde estao meus dragoes","Skoriot ñuhyz zaldrīzesse ilzi"],["a noite e escura e cheia de terrores","Bantis zōbrie issa se ossȳngnoti lēdys"],["qual e o seu nome","Skoroso jemēle brōzā"],["sete infernos","Sīkudi nopāzmi"],["estou bem obrigado","Sȳz iksan, kirimvose"],["uma menina nao tem nome","Riña dōre brōzi ēza"],["o dia e lindo","Tubis gevie issa"],["voce nao sabe nada","Daoruni gīmī"],["segure a porta","Nerni ōrēs"],["pare","Kelītīs"],["onde fica o banheiro","Skoriot rāenābion ilza"]];
var PF={},PB={};PH.forEach(function(p){PF[p[0]]=p[1];PB[strip(p[1]).replace(/[^a-z ]/g," ").replace(/\s+/g," ").trim()]=p[0]});
function nk(s){return strip(s).replace(/[^\p{L}\s]/gu," ").replace(/\s+/g," ").trim()}
function translate(text,dir){var parts=text.match(/[^.!?;\n]+[.!?;]*/g)||[],res=[];
 parts.forEach(function(p){var core=p.replace(/[.!?;\s]+$/,""),end=(p.match(/[.!?;]+$/)||[""])[0];if(!core.trim())return;
  var k=nk(core),ph=(dir==="pt"?PF:PB)[k];
  if(ph){res.push({parts:[{o:ph,s:core,tag:"frase"}],end:end});return}
  if(dir==="pt"){res.push({parts:trSent(core),end:end});return}
  var ws=core.match(/[\p{L}]+/gu)||[],parts2=[];
  ws.forEach(function(w){var r=REV[strip(w)];
   if(r)parts2.push({o:r[0].pt,s:w,tag:"rev",info:r.map(function(x){return x.info}).filter(Boolean).join(" · ")});
   else parts2.push({o:"["+w+"]",s:w,tag:"unk"})});
  res.push({parts:parts2,end:end})});
 return res}
function setCustom(c){custom=c;load()}
load();
return {translate:translate,setCustom:setCustom,decl:decl,conj:conj,cap:cap,strip:strip,size:function(){return Object.keys(L).length}}})();


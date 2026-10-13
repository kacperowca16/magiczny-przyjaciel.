'use strict';
const KEY='magiczny-przyjaciel-v1';
const defaults={food:65,joy:65,stars:0,wins:0};
let state={...defaults};
try { const stored=JSON.parse(localStorage.getItem(KEY)||'null'); if(stored&&typeof stored==='object') for(const k of Object.keys(defaults)) if(Number.isFinite(stored[k])) state[k]=Math.max(0,Math.min(k==='food'||k==='joy'?100:100000,Math.floor(stored[k]))); } catch(e){console.warn('Nie można odczytać zapisu',e)}
const $=id=>document.getElementById(id);
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){console.warn('Nie można zapisać gry',e)}}
function render(){ $('stars').textContent=state.stars;$('foodBar').style.width=state.food+'%';$('joyBar').style.width=state.joy+'%';$('garden').textContent=state.wins>=5?'🌷 🌻 🌈 🌷':state.wins>=2?'🌱 🌷 🌼 🌱':'🌱 🌷 🌱';$('progress').textContent=state.wins>=5?'Brawo! Ogród rozkwitł! 🌈':state.wins>=2?'Twój ogród rośnie! Jeszcze trochę magii ✨':'Pomóż Lumiemu odkrywać magiczny ogród!';}
let messageTimer;
function say(msg){$('speech').textContent=msg;clearTimeout(messageTimer);messageTimer=setTimeout(()=>$('speech').textContent='Pobawimy się razem? 💜',2800)}
function act(type){if(type==='feed'){state.food=Math.min(100,state.food+18);say('Mniam! Ale pyszne! 🍎')}else{state.joy=Math.min(100,state.joy+16);say('Hihi! Łaskocze! 💗')}save();render()}
$('feed').addEventListener('click',()=>act('feed'));$('pet').addEventListener('click',()=>act('pet'));$('lumi').addEventListener('click',()=>act('pet'));
const colors=[{name:'CZERWONY',hex:'#f05c71'},{name:'NIEBIESKI',hex:'#4d9de0'},{name:'ŻÓŁTY',hex:'#f4d35e'},{name:'ZIELONY',hex:'#62bf87'},{name:'FIOLETOWY',hex:'#a487e7'},{name:'POMARAŃCZOWY',hex:'#f7a14a'}];
let target=null,locked=false;
function nextRound(){locked=false;$('gameMsg').textContent='Dotknij właściwego koloru!';const shuffled=[...colors].sort(()=>Math.random()-.5);const options=shuffled.slice(0,3);target=options[Math.floor(Math.random()*3)];$('prompt').textContent='Znajdź kolor: '+target.name;$('choices').replaceChildren();for(const c of options){const b=document.createElement('button');b.style.background=c.hex;b.setAttribute('aria-label',c.name);b.title=c.name;b.addEventListener('click',()=>choose(c));$('choices').appendChild(b)}}
function choose(c){if(locked)return;if(c.name!==target.name){$('gameMsg').textContent='Spróbuj jeszcze raz! 💜';return}locked=true;state.stars+=1;state.wins+=1;state.joy=Math.min(100,state.joy+8);save();render();$('gameMsg').textContent='Brawo! ⭐ +1 gwiazdka';setTimeout(()=>{if(!$('game').classList.contains('hidden'))nextRound()},1100)}
$('play').addEventListener('click',()=>{$('game').classList.remove('hidden');nextRound()});$('close').addEventListener('click',()=>{$('game').classList.add('hidden');say('Super zabawa! ⭐')});document.addEventListener('keydown',e=>{if(e.key==='Escape')$('game').classList.add('hidden')});render();
if('serviceWorker' in navigator && location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));

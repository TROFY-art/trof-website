/* إعدادات الموقع: عبّي الفراغات مرة وحدة */
(function(){
var CONFIG={
  clientId:'1536360221906178088',
  guildId:'',              /* آيدي السيرفر */
  ownerId:'',              /* آيدي حسابك (المالك) */
  staffRoleIds:[],         /* آيدي رتب المشرفين والإداريين */
  adminStreetRoleIds:[]    /* آيدي رتبة ادمن ستريت */
};
var RANK={everyone:0,staff:1,admin:2,owner:3};
/* الأقسام: need = من يشوف القسم. cmds = قائمة الأوامر [['/اسم','الوصف']] */
var SECTIONS=[
 {id:'general',icon:'👤',t:'أوامر عامة',d:'الأوامر اللي تقدر تعدّلها بسيرفرك',need:'everyone',cmds:[]},
 {id:'levels',icon:'📊',t:'المستويات',d:'XP كتابي وصوتي',need:'everyone',cmds:[]},
 {id:'music',icon:'🎵',t:'الموسيقى',d:'تشغيل الأغاني',need:'everyone',cmds:[]},
 {id:'giveaway',icon:'🎁',t:'الجيفاواي',d:'نظام الجيفاواي',need:'everyone',cmds:[]},
 {id:'tickets',icon:'🎫',t:'التكتات',d:'نظام التكتات',need:'everyone',cmds:[]},
 {id:'shop-avatar',icon:'🖼️',t:'شوب الأفتار',d:'متجر الأفتارات',need:'everyone',cmds:[]},
 {id:'shop-banner',icon:'🎨',t:'شوب البنرات',d:'متجر البنرات',need:'everyone',cmds:[]},
 {id:'moderation',icon:'🔒',t:'أوامر الإدارة',d:'للمشرفين والإداريين',need:'staff',cmds:[]},
 {id:'admin-street',icon:'👑',t:'ادمن ستريت',d:'لأعضاء ادمن ستريت',need:'admin',cmds:[]},
 {id:'owner',icon:'⚡',t:'المالك',d:'للمالك فقط',need:'owner',cmds:[]}
];
var auth={rank:0,user:null};
function base(){return new URL('./',location.href).href}
function readToken(){
  if(location.hash.indexOf('access_token=')>-1){
    var p=new URLSearchParams(location.hash.slice(1));
    try{sessionStorage.setItem('trof_token',p.get('access_token'))}catch(e){}
    history.replaceState(null,'',location.pathname+location.search);
  }
  try{return sessionStorage.getItem('trof_token')}catch(e){return null}
}
function has(ids,list){return ids.some(function(i){return list.indexOf(i)>-1})}
function logout(silent){try{sessionStorage.removeItem('trof_token')}catch(e){}if(!silent)location.reload()}
function load(cb){
  var t=readToken();
  if(!t||!CONFIG.guildId){cb();return}
  fetch('https://discord.com/api/v10/users/@me/guilds/'+CONFIG.guildId+'/member',{headers:{Authorization:'Bearer '+t}})
    .then(function(r){if(!r.ok)throw 0;return r.json()})
    .then(function(m){
      var u=m.user||{},roles=m.roles||[];
      auth.user=u;
      auth.rank=(CONFIG.ownerId&&u.id===CONFIG.ownerId)?3:has(CONFIG.adminStreetRoleIds,roles)?2:has(CONFIG.staffRoleIds,roles)?1:0;
      cb();
    })
    .catch(function(){logout(true);cb()});
}
function login(){
  location.href='https://discord.com/oauth2/authorize?client_id='+CONFIG.clientId+'&response_type=token&scope='+encodeURIComponent('identify guilds.members.read')+'&redirect_uri='+encodeURIComponent(base());
}
function dust(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var box=document.getElementById('dust');if(!box)return;
  for(var k=0;k<16;k++){
    var d=document.createElement('i'),z=2+Math.random()*3;
    d.style.cssText='left:'+(Math.random()*100)+'%;width:'+z+'px;height:'+z+'px;animation-duration:'+(9+Math.random()*10)+'s;animation-delay:-'+(Math.random()*15)+'s';
    box.appendChild(d);
  }
}
window.TROF={dust:dust,CONFIG:CONFIG,SECTIONS:SECTIONS,auth:auth,load:load,login:login,logout:logout,
  can:function(s){return auth.rank>=RANK[s.need]},
  avatar:function(){var u=auth.user;return u&&u.avatar?'https://cdn.discordapp.com/avatars/'+u.id+'/'+u.avatar+'.png?size=64':''}};
})();

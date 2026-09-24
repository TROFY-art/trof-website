/* إعدادات الموقع: عبّي الفراغات مرة وحدة */
(function(){
var CONFIG={
  clientId:'1536360221906178088',
  guildId:'',              /* آيدي السيرفر */
  ownerId:'',              /* آيدي حسابك (المالك) */
  staffRoleIds:[],         /* آيدي رتب المشرفين والإداريين */
  adminStreetRoleIds:[],   /* آيدي رتبة ادمن ستريت */
  apiUrl:''                /* رابط API البوت لجلب الرصيد والمستوى والرانك */
};
var RANK={everyone:0,staff:1,admin:2,owner:3};
var ROLE=['عضو','إدارة','ادمن ستريت','المالك'];
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
var API='https://discord.com/api/v10';
function base(){return new URL('./',location.href).href}
function token(){
  if(location.hash.indexOf('access_token=')>-1){
    var p=new URLSearchParams(location.hash.slice(1));
    try{sessionStorage.setItem('trof_token',p.get('access_token'))}catch(e){}
    history.replaceState(null,'',location.pathname+location.search);
  }
  try{return sessionStorage.getItem('trof_token')}catch(e){return null}
}
function has(ids,list){return ids.some(function(i){return list.indexOf(i)>-1})}
function ok(r){if(!r.ok)throw 0;return r.json()}
function logout(silent){try{sessionStorage.removeItem('trof_token')}catch(e){}if(!silent)location.href=base()}
function load(cb){
  var t=token();
  if(!t){cb();return}
  var H={headers:{Authorization:'Bearer '+t}};
  fetch(API+'/users/@me',H).then(ok).then(function(u){
    auth.user=u;
    auth.rank=(CONFIG.ownerId&&u.id===CONFIG.ownerId)?3:0;
    if(!CONFIG.guildId)return;
    return fetch(API+'/users/@me/guilds/'+CONFIG.guildId+'/member',H).then(ok).then(function(m){
      var roles=m.roles||[];
      if(auth.rank<3)auth.rank=has(CONFIG.adminStreetRoleIds,roles)?2:has(CONFIG.staffRoleIds,roles)?1:0;
    }).catch(function(){});
  }).then(function(){cb()},function(){logout(true);cb()});
}
function login(){
  location.href='https://discord.com/oauth2/authorize?client_id='+CONFIG.clientId+'&response_type=token&scope='+encodeURIComponent('identify guilds.members.read')+'&redirect_uri='+encodeURIComponent(base());
}
function avatar(size){
  var u=auth.user;if(!u)return '';
  if(u.avatar)return 'https://cdn.discordapp.com/avatars/'+u.id+'/'+u.avatar+'.png?size='+(size||64);
  var n=0;try{n=Number((BigInt(u.id)>>BigInt(22))%BigInt(6))}catch(e){}
  return 'https://cdn.discordapp.com/embed/avatars/'+n+'.png';
}
function mountAccount(){
  var box=document.getElementById('acct');if(!box)return;
  box.innerHTML='';
  if(auth.user){
    var a=document.createElement('a');a.className='me';a.href='profile.html';a.setAttribute('aria-label','ملفي الشخصي');
    var i=document.createElement('img');i.src=avatar(64);i.alt='';a.appendChild(i);box.appendChild(a);
  }else{
    var b=document.createElement('button');b.type='button';b.className='btn alt';b.textContent='تسجيل الدخول عبر Discord';b.onclick=login;box.appendChild(b);
  }
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
window.TROF={CONFIG:CONFIG,SECTIONS:SECTIONS,auth:auth,load:load,login:login,logout:logout,dust:dust,mountAccount:mountAccount,avatar:avatar,token:token,
  roleName:function(){return ROLE[auth.rank]},
  can:function(s){return auth.rank>=RANK[s.need]}};
})();

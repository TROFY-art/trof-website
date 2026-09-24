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
var LANGS=['ar','en'],NAMES={ar:'العربية',en:'English'},lang='ar';
try{lang=localStorage.getItem('trof_lang')||'ar'}catch(e){}
if(LANGS.indexOf(lang)<0)lang='ar';
document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
var STR={
ar:{lead:'بوت دسكورد واحد يدير سيرفرك كله: مستويات، موسيقى، جيفاواي، تكتات وأدوات إدارة.',addBot:'أضف البوت إلى سيرفرك',note:'مشروع غير تجاري.',tap:'اضغط على أي قسم لفتح صفحته.',choose:'📁 اختر قسماً...',hint:'سجّل الدخول لتظهر لك الأقسام الخاصة برتبتك.',login:'دخول عبر Discord',myProfile:'ملفي الشخصي',back:'الرجوع للأقسام',missing:'هذا القسم غير موجود.',restricted:'هذا القسم متاح لرتب محددة فقط. إذا رتبتك تسمح، سجّل الدخول عبر Discord.',soon:'أوامر هذا القسم تنضاف هنا قريباً.',profileLogin:'سجّل الدخول عبر Discord حتى تشوف ملفك الشخصي.',balance:'الرصيد',level:'المستوى',rank:'الرانك',logout:'تسجيل الخروج',noApi:'الرصيد والمستوى والرانك تظهر بعد ربط الموقع بقاعدة بيانات البوت.',apiErr:'تعذر جلب بياناتك من البوت الآن.',home:'TROF System | بوت دسكورد',profile:'ملفي | TROF System'},
en:{lead:'One Discord bot to run your whole server: levels, music, giveaways, tickets and moderation tools.',addBot:'Add the bot to your server',note:'A non-commercial project.',tap:'Tap any section to open its page.',choose:'📁 Choose a section...',hint:'Log in to see the sections for your role.',login:'Log in with Discord',myProfile:'My profile',back:'Back to sections',missing:"This section doesn't exist.",restricted:'This section is only for certain roles. If your role allows it, log in with Discord.',soon:"This section's commands will be added here soon.",profileLogin:'Log in with Discord to see your profile.',balance:'Balance',level:'Level',rank:'Rank',logout:'Log out',noApi:"Balance, level and rank will appear once the site is connected to the bot's database.",apiErr:"Couldn't load your data from the bot right now.",home:'TROF System | Discord bot',profile:'My profile | TROF System'}
};
var EN={general:['General commands','Commands you can customize in your server'],levels:['Levels','Text and voice XP'],music:['Music','Play songs'],giveaway:['Giveaways','Giveaway system'],tickets:['Tickets','Ticket system'],'shop-avatar':['Avatar shop','Avatar store'],'shop-banner':['Banner shop','Banner store'],moderation:['Moderation commands','For moderators and admins'],'admin-street':['Admin Street','For Admin Street members'],owner:['Owner','Owner only']};
var ROLE_EN=['Member','Staff','Admin Street','Owner'];
function t(k){return (STR[lang]&&STR[lang][k])||STR.ar[k]||k}
function name(s){return lang==='en'&&EN[s.id]?EN[s.id][0]:s.t}
function desc(s){return lang==='en'&&EN[s.id]?EN[s.id][1]:s.d}
function cmdDesc(c){return lang==='en'&&c[2]?c[2]:c[1]}
function translate(){
  [].forEach.call(document.querySelectorAll('[data-i18n]'),function(e){e.textContent=t(e.getAttribute('data-i18n'))});
  var k=document.body.getAttribute('data-title');if(k)document.title=t(k);
}
function mountLang(){
  var b=document.getElementById('lang');if(!b)return;
  var next=LANGS[(LANGS.indexOf(lang)+1)%LANGS.length];
  b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg><span></span>';
  b.lastChild.textContent=NAMES[next];
  b.onclick=function(){try{localStorage.setItem('trof_lang',next)}catch(e){}location.reload()};
}
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
    var a=document.createElement('a');a.className='me';a.href='profile.html';a.setAttribute('aria-label',t('myProfile'));
    var i=document.createElement('img');i.src=avatar(64);i.alt='';a.appendChild(i);box.appendChild(a);
  }else{
    var b=document.createElement('button');b.type='button';b.className='btn alt';b.textContent=t('login');b.onclick=login;box.appendChild(b);
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
window.TROF={t:t,name:name,desc:desc,cmdDesc:cmdDesc,CONFIG:CONFIG,SECTIONS:SECTIONS,auth:auth,load:load,login:login,logout:logout,dust:dust,mountAccount:mountAccount,avatar:avatar,token:token,
  roleName:function(){return (lang==='en'?ROLE_EN:ROLE)[auth.rank]},
  can:function(s){return auth.rank>=RANK[s.need]}};
mountLang();translate();
})();

/* إعدادات الموقع */
(function(){
var CONFIG={
  clientId:'1536360221906178088',
  guildId:'1320024268364320778',
  ownerId:'986328374010073118',
  staffRoleIds:[],
  adminStreetRoleIds:[],
  apiUrl:'/api'
};
var RANK={everyone:0,staff:1,admin:2,owner:3};
var ROLE=['عضو','إدارة','ادمن ستريت','المالك'];

var SECTIONS=[
 {id:'general',icon:'embed',t:'صانع Embed',d:'أنشئ رسائل مخصصة',need:'everyone',url:'embed.html',cmds:[]},
 {id:'shop',icon:'shop',t:'المتجر',d:'اشترِ خلفيات وشارات',need:'everyone',url:'shop.html',cmds:[]},
 {id:'tickets',icon:'ticket',t:'تكت',d:'نظام التكتات',need:'everyone',url:'tickets.html',cmds:[]},
 {id:'welcome',icon:'welcome',t:'الترحيب',d:'رسائل الترحيب بالأعضاء الجدد',need:'everyone',url:'welcome.html',cmds:[]},
 {id:'levels',icon:'levels',t:'المستويات',d:'XP كتابي وصوتي',need:'everyone',url:'levels.html',cmds:[]},
 {id:'protection',icon:'shield',t:'الحماية',d:'حماية السيرفر',need:'staff',url:'protection.html',cmds:[]},
 {id:'moderation',icon:'settings',t:'إدارة السيرفر',d:'تحكم كامل بالفئات والقنوات والرتب',need:'staff',url:'server-manager.html',cmds:[]},
 {id:'shortcuts',icon:'shortcut',t:'اختصارات',d:'اختصارات الأوامر',need:'everyone',url:'shortcuts.html',cmds:[]},
 {id:'vote',icon:'vote',t:'صوّت للبوت',d:'احصل على مكافآت',need:'everyone',url:'vote.html',cmds:[]}
];

var LANGS=['ar','en'],NAMES={ar:'العربية',en:'English'},lang='ar';
try{lang=localStorage.getItem('trof_lang')||'ar'}catch(e){}
if(LANGS.indexOf(lang)<0)lang='ar';
document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';

var STR={
ar:{
lead:'بوت دسكورد واحد يدير سيرفرك كله: مستويات، موسيقى، جيفاواي، تكتات وأدوات إدارة.',
addBot:'أضف البوت إلى سيرفرك',
note:'مشروع غير تجاري.',
tap:'اضغط على أي قسم لفتح صفحته.',
choose:'📁 اختر قسماً...',
hint:'سجّل الدخول لتظهر لك الأقسام الخاصة برتبتك.',
login:'Login',
myProfile:'ملفي الشخصي',
back:'الرجوع للأقسام',
missing:'هذا القسم غير موجود.',
restricted:'هذا القسم متاح لرتب محددة فقط.',
soon:'أوامر هذا القسم تنضاف هنا قريباً.',
profileLogin:'سجّل الدخول عبر Discord حتى تشوف ملفك الشخصي.',
balance:'الرصيد',
level:'المستوى',
rank:'الرانك',
logout:'تسجيل الخروج',
noApi:'الرصيد والمستوى والرانك تظهر بعد ربط الموقع بقاعدة بيانات البوت.',
apiErr:'تعذر جلب بياناتك من البوت الآن.',
home:'TROF System | بوت دسكورد',
profile:'ملفي | TROF System',
selectServer:'اختر السيرفر',
noServers:'لا توجد سيرفرات تملك فيها صلاحيات',
loading:'جاري التحميل...',
checking:'جاري التحقق...',
vote:'صوّت للبوت',
voteBack:'الرجوع للرئيسية',
termsBack:'الرجوع للرئيسية',
privacyBack:'الرجوع للرئيسية'
},
en:{
lead:'One Discord bot to run your whole server: levels, music, giveaways, tickets and moderation tools.',
addBot:'Add the bot to your server',
note:'A non-commercial project.',
tap:'Tap any section to open its page.',
choose:'📁 Choose a section...',
hint:'Log in to see the sections for your role.',
login:'Login',
myProfile:'My profile',
back:'Back to sections',
missing:"This section doesn't exist.",
restricted:'This section is only for certain roles.',
soon:"This section's commands will be added here soon.",
profileLogin:'Log in with Discord to see your profile.',
balance:'Balance',
level:'Level',
rank:'Rank',
logout:'Log out',
noApi:"Balance, level and rank will appear once the site is connected to the bot's database.",
apiErr:"Couldn't load your data from the bot right now.",
home:'TROF System | Discord bot',
profile:'My profile | TROF System',
selectServer:'Select Server',
noServers:'No servers where you have permissions',
loading:'Loading...',
checking:'Checking...',
vote:'Vote for Bot',
voteBack:'Back to Home',
termsBack:'Back to Home',
privacyBack:'Back to Home'
}
};

var EN={general:['Embed Builder','Create custom messages'],shop:['Shop','Buy backgrounds and badges'],tickets:['Tickets','Ticket system'],welcome:['Welcome','Welcome messages'],levels:['Levels','Text and voice XP'],protection:['Protection','Server protection'],moderation:['Server Manager','Full control'],shortcuts:['Shortcuts','Command shortcuts'],vote:['Vote','Get rewards']};
var ROLE_EN=['Member','Staff','Admin Street','Owner'];

function t(k){return (STR[lang]&&STR[lang][k])||STR.ar[k]||k}
function name(s){return lang==='en'&&EN[s.id]?EN[s.id][0]:s.t}
function desc(s){return lang==='en'&&EN[s.id]?EN[s.id][1]:s.d}
function cmdDesc(c){return lang==='en'&&c[2]?c[2]:c[1]}

function getIconSVG(name){
  var icons={
    embed:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h7M7 17h4"/></svg>',
    shop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l1-5h16l1 5"/><path d="M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9"/><path d="M9 13a3 3 0 006 0"/></svg>',
    vip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>',
    ticket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4z"/><path d="M13 6v12"/></svg>',
    welcome:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l2.4 4.8L20 8l-4 4 1 5.6-5-2.8L7 17.6 8 12 4 8l5.6-1.2z"/></svg>',
    levels:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M10 20V4M16 20v-8M22 20h-20"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/></svg>',
    shortcut:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>',
    vote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 12l2 2 4-4"/><path d="M3 8l3-3h12l3 3v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>'
  };
  return icons[name]||icons.embed;
}

function translate(){
  [].forEach.call(document.querySelectorAll('[data-i18n]'),function(e){e.textContent=t(e.getAttribute('data-i18n'))});
  var k=document.body.getAttribute('data-title');if(k)document.title=t(k);
}
function mountLang(){
  var b=document.getElementById('lang');if(!b)return;
  var next=LANGS[(LANGS.indexOf(lang)+1)%LANGS.length];
  b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg><span></span>';
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
  var called = false;
  function safeCb() { if (called) return; called = true; cb(); }
  setTimeout(safeCb, 5000);
  var t = token();
  if (!t) { safeCb(); return; }
  var H = { headers: { Authorization: 'Bearer ' + t } };
  fetch(API + '/users/@me', H)
    .then(function(r){
      if (r.status === 429) {
        return new Promise(function(resolve){ setTimeout(resolve, 2000); })
          .then(function(){ return fetch(API + '/users/@me', H); });
      }
      return r;
    })
    .then(ok)
    .then(function(u){
      auth.user = u;
      auth.rank = (CONFIG.ownerId && u.id === CONFIG.ownerId) ? 3 : 0;
      if (!CONFIG.guildId) { safeCb(); return; }
      setTimeout(function(){
        fetch(API + '/users/@me/guilds/' + CONFIG.guildId + '/member', H)
          .then(function(r){
            if (r.status === 429) throw new Error('rate_limit');
            return r;
          })
          .then(ok)
          .then(function(m){
            var roles = m.roles || [];
            if (auth.rank < 3) {
              auth.rank = has(CONFIG.adminStreetRoleIds, roles) ? 2 :
                          has(CONFIG.staffRoleIds, roles) ? 1 : 0;
            }
          })
          .catch(function(){})
          .finally(safeCb);
      }, 500);
    })
    .catch(function(){
      logout(true);
      safeCb();
    });
}

function login(){
  var scopes='identify guilds guilds.members.read';
  location.href='https://discord.com/oauth2/authorize?client_id='+CONFIG.clientId+'&response_type=token&scope='+encodeURIComponent(scopes)+'&redirect_uri='+encodeURIComponent(base());
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

var selectedGuild=null;
var botGuildIds=null;

function getSelectedGuild(){
  try{
    var saved=localStorage.getItem('trof_selected_guild');
    return saved?saved:null;
  }catch(e){return null}
}
function setSelectedGuild(guildId){
  try{localStorage.setItem('trof_selected_guild',guildId)}catch(e){}
  selectedGuild=guildId;
}

async function fetchBotGuilds(){
  if(botGuildIds!==null)return botGuildIds;
  try{
    var res=await fetch(TROF.CONFIG.apiUrl+'/bot/guilds');
    if(res.ok){
      var data=await res.json();
      botGuildIds=data.guild_ids||[];
      return botGuildIds;
    }
  }catch(e){}
  return [];
}

// ============================================
// ✅ دالة fetchUserGuilds - محدثة
// ============================================
async function fetchUserGuilds(){
  var t = token();
  if (!t) return [];

  try {
    var res = await fetch(API + '/users/@me/guilds', {
      headers: {Authorization: 'Bearer ' + t}
    });

    if (res.status === 429) {
      await new Promise(function(r){ setTimeout(r, 3000); });
      res = await fetch(API + '/users/@me/guilds', {
        headers: {Authorization: 'Bearer ' + t}
      });
    }

    if (!res.ok) return [];
    var guilds = await res.json();

    var botGuilds = await fetchBotGuilds();
    var result = [];

    for (var i = 0; i < guilds.length; i++) {
      var g = guilds[i];
      var gid = String(g.id);

      // 1) تأكد البوت في السيرفر
      if (botGuilds.length > 0 && botGuilds.indexOf(gid) === -1) continue;

      // 2) فحص الصلاحيات
      var hasAccess = false;

      // أ) مالك
      if (g.owner === true) hasAccess = true;

      // ب) صلاحيات إدارية
      if (!hasAccess) {
        var perms = parseInt(g.permissions) || 0;
        if (
          (perms & 0x8) === 0x8 ||
          (perms & 0x20) === 0x20 ||
          (perms & 0x10000000) === 0x10000000 ||
          (perms & 0x2) === 0x2 ||
          (perms & 0x4) === 0x4 ||
          (perms & 0x10) === 0x10
        ) {
          hasAccess = true;
        }
      }

      // ج) رتب إدارية (من البوت API)
      if (!hasAccess) {
        try {
          var roleRes = await fetch(CONFIG.apiUrl + '/guild/' + gid + '/check-admin/' + auth.user.id);
          if (roleRes.ok) {
            var roleData = await roleRes.json();
            if (roleData.has_access === true) hasAccess = true;
          }
        } catch (e) {}
      }

      if (hasAccess) result.push(g);
    }

    return result;

  } catch (e) {
    console.error('fetchUserGuilds error:', e.message);
    return [];
  }
}

async function renderServerSelector(){
  var box=document.getElementById('server-selector');
  if(!box)return;
  if(!auth.user){
    box.innerHTML='';
    box.classList.remove('has-user');
    return;
  }
  box.classList.add('has-user');
  box.innerHTML='<button class="server-btn" id="server-toggle" type="button" aria-label="'+t('selectServer')+'">'+
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'+
    '</button>';
  var guilds=await fetchUserGuilds();
  var current=getSelectedGuild();
  var toggle=document.getElementById('server-toggle');
  var oldDropdown=document.getElementById('server-dropdown');
  if(oldDropdown)oldDropdown.remove();
  var oldOverlay=document.getElementById('server-overlay');
  if(oldOverlay)oldOverlay.remove();
  var overlay=document.createElement('div');
  overlay.id='server-overlay';
  document.body.appendChild(overlay);
  var dropdown=document.createElement('div');
  dropdown.id='server-dropdown';
  dropdown.className='server-dropdown';
  dropdown.hidden=true;
  var dropHTML='<div class="server-dropdown-header">'+
    '<span>'+t('selectServer')+'</span>'+
    '<button class="server-close" id="server-close" type="button">✕</button>'+
    '</div>';
  if(guilds.length===0){
    dropHTML+='<div class="server-empty">'+t('noServers')+'</div>';
  }else{
    dropHTML+='<ul class="server-list">';
    guilds.forEach(function(g){
      var isActive=(String(g.id)===String(current));
      var icon=g.icon
        ?'https://cdn.discordapp.com/icons/'+g.id+'/'+g.icon+'.png?size=64'
        :'https://cdn.discordapp.com/embed/avatars/0.png';
      dropHTML+='<li>';
      dropHTML+='<button class="server-item'+(isActive?' active':'')+'" data-guild-id="'+g.id+'">';
      dropHTML+='<img src="'+icon+'" alt="">';
      dropHTML+='<span>'+g.name+'</span>';
      if(isActive)dropHTML+='<span class="server-check">✓</span>';
      dropHTML+='</button>';
      dropHTML+='</li>';
    });
    dropHTML+='</ul>';
  }
  dropdown.innerHTML=dropHTML;
  document.body.appendChild(dropdown);
  var close=document.getElementById('server-close');
  function openMenu(){
    dropdown.hidden=false;
    setTimeout(function(){overlay.classList.add('show');},10);
    document.body.style.overflow='hidden';
  }
  function closeMenu(){
    overlay.classList.remove('show');
    document.body.style.overflow='';
    setTimeout(function(){dropdown.hidden=true;},300);
  }
  toggle.onclick=function(e){
    e.stopPropagation();
    if(dropdown.hidden)openMenu();
    else closeMenu();
  };
  close.onclick=closeMenu;
  overlay.onclick=closeMenu;
  dropdown.querySelectorAll('.server-item').forEach(function(btn){
    btn.onclick=function(){
      var gid=btn.getAttribute('data-guild-id');
      setSelectedGuild(gid);
      location.reload();
    };
  });
}

function formatNumber(num){
  if(num===null||num===undefined||num==='')return '0';
  num=Number(num);
  if(isNaN(num))return '0';
  var abs=Math.abs(num);
  var sign=num<0?'-':'';
  if(abs>=1e12)return sign+(abs/1e12).toFixed(2).replace(/\.?0+$/,'')+'T';
  if(abs>=1e9)return sign+(abs/1e9).toFixed(2).replace(/\.?0+$/,'')+'B';
  if(abs>=1e6)return sign+(abs/1e6).toFixed(2).replace(/\.?0+$/,'')+'M';
  if(abs>=1e3)return sign+(abs/1e3).toFixed(2).replace(/\.?0+$/,'')+'K';
  return sign+Math.floor(abs).toString();
}

function injectFooterLinks(){
  var footer=document.querySelector('footer.wrap');
  if(!footer)return;
  if(footer.querySelector('.footer-links'))return;
  var texts = {
    ar: { home:'🏠 الرئيسية', vote:'🗳️ صوّت للبوت', terms:'📜 شروط الخدمة', privacy:'🔒 سياسة الخصوصية' },
    en: { home:'🏠 Home', vote:'🗳️ Vote for Bot', terms:'📜 Terms of Service', privacy:'🔒 Privacy Policy' }
  };
  var tr = texts[lang] || texts.ar;
  var linksHTML=
    '<div class="footer-links">'+
      '<a href="./">'+tr.home+'</a>'+
      '<a href="vote.html">'+tr.vote+'</a>'+
      '<a href="terms.html">'+tr.terms+'</a>'+
      '<a href="privacy.html">'+tr.privacy+'</a>'+
    '</div>';
  footer.insertAdjacentHTML('afterbegin',linksHTML);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',injectFooterLinks);
}else{
  injectFooterLinks();
}

window.TROF={
  t:t,name:name,desc:desc,cmdDesc:cmdDesc,
  CONFIG:CONFIG,SECTIONS:SECTIONS,auth:auth,
  load:load,login:login,logout:logout,
  dust:dust,mountAccount:mountAccount,avatar:avatar,token:token,
  formatNumber:formatNumber,
  getSelectedGuild:getSelectedGuild,
  setSelectedGuild:setSelectedGuild,
  renderServerSelector:renderServerSelector,
  fetchUserGuilds:fetchUserGuilds,
  getIconSVG:getIconSVG,
  roleName:function(){return (lang==='en'?ROLE_EN:ROLE)[auth.rank]},
  can:function(s){return auth.rank>=RANK[s.need]}
};
mountLang();translate();
})();

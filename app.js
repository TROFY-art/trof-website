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
 {id:'general',icon:'🎨',t:'صانع Embed',d:'أنشئ رسائل مخصصة',need:'everyone',url:'embed.html',cmds:[]},
 {id:'shop',icon:'🏪',t:'المتجر',d:'اشترِ خلفيات وشارات',need:'everyone',url:'shop.html',cmds:[]},
 {id:'tickets',icon:'🎫',t:'تكت',d:'نظام التكتات',need:'everyone',url:'tickets.html',cmds:[]},
 {id:'welcome',icon:'👋',t:'الترحيب',d:'رسائل الترحيب بالأعضاء الجدد',need:'everyone',url:'welcome.html',cmds:[]},
 {id:'levels',icon:'📊',t:'المستويات',d:'XP كتابي وصوتي',need:'everyone',url:'levels.html',cmds:[]},
 {id:'protection',icon:'🛡️',t:'الحماية',d:'حماية السيرفر',need:'staff',url:'protection.html',cmds:[]},
 {id:'moderation',icon:'🔒',t:'أوامر الإدارة',d:'للمشرفين والإداريين',need:'staff',cmds:[]},
 {id:'shortcuts',icon:'⚡',t:'اختصارات',d:'اختصارات الأوامر',need:'everyone',url:'shortcuts.html',cmds:[]},
]
var LANGS=['ar','en'],NAMES={ar:'العربية',en:'English'},lang='ar';
try{lang=localStorage.getItem('trof_lang')||'ar'}catch(e){}
if(LANGS.indexOf(lang)<0)lang='ar';
document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
var STR={
ar:{lead:'بوت دسكورد واحد يدير سيرفرك كله: مستويات، موسيقى، جيفاواي، تكتات وأدوات إدارة.',addBot:'أضف البوت إلى سيرفرك',note:'مشروع غير تجاري.',tap:'اضغط على أي قسم لفتح صفحته.',choose:'📁 اختر قسماً...',hint:'سجّل الدخول لتظهر لك الأقسام الخاصة برتبتك.',login:'Login',myProfile:'ملفي الشخصي',back:'الرجوع للأقسام',missing:'هذا القسم غير موجود.',restricted:'هذا القسم متاح لرتب محددة فقط. إذا رتبتك تسمح، سجّل الدخول عبر Discord.',soon:'أوامر هذا القسم تنضاف هنا قريباً.',profileLogin:'سجّل الدخول عبر Discord حتى تشوف ملفك الشخصي.',balance:'الرصيد',level:'المستوى',rank:'الرانك',logout:'تسجيل الخروج',noApi:'الرصيد والمستوى والرانك تظهر بعد ربط الموقع بقاعدة بيانات البوت.',apiErr:'تعذر جلب بياناتك من البوت الآن.',home:'TROF System | بوت دسكورد',profile:'ملفي | TROF System',selectServer:'اختر السيرفر',noServers:'لا توجد سيرفرات تملك فيها رتبة إدارية',loading:'جاري التحميل...',checking:'جاري التحقق...'},
en:{lead:'One Discord bot to run your whole server: levels, music, giveaways, tickets and moderation tools.',addBot:'Add the bot to your server',note:'A non-commercial project.',tap:'Tap any section to open its page.',choose:'📁 Choose a section...',hint:'Log in to see the sections for your role.',login:'Login',myProfile:'My profile',back:'Back to sections',missing:"This section doesn't exist.",restricted:'This section is only for certain roles. If your role allows it, log in with Discord.',soon:"This section's commands will be added here soon.",profileLogin:'Log in with Discord to see your profile.',balance:'Balance',level:'Level',rank:'Rank',logout:'Log out',noApi:"Balance, level and rank will appear once the site is connected to the bot's database.",apiErr:"Couldn't load your data from the bot right now.",home:'TROF System | Discord bot',profile:'My profile | TROF System',selectServer:'Select Server',noServers:'No servers where you have an admin role',loading:'Loading...',checking:'Checking...'}
};
var EN={general:['Embed Builder','Create custom messages'],shop:['Shop','Buy backgrounds and badges'],tickets:['Tickets','Ticket system'],welcome:['Welcome','Welcome messages for new members'],levels:['Levels','Text and voice XP'],protection:['Protection','Server protection'],moderation:['Moderation commands','For moderators and admins'],shortcuts:['Shortcuts','Command shortcuts']};
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
  fetch(API+'/users/@me',H)
    .then(function(r){
      if(r.status === 429){
        return new Promise(function(resolve){setTimeout(resolve, 2000)})
          .then(function(){return fetch(API+'/users/@me',H)});
      }
      return r;
    })
    .then(ok)
    .then(function(u){
      auth.user=u;
      auth.rank=(CONFIG.ownerId&&u.id===CONFIG.ownerId)?3:0;
      if(!CONFIG.guildId){
        cb();
        return;
      }
      setTimeout(function(){
        fetch(API+'/users/@me/guilds/'+CONFIG.guildId+'/member',H)
          .then(function(r){
            if(r.status === 429) throw new Error('rate_limit');
            return r;
          })
          .then(ok)
          .then(function(m){
            var roles=m.roles||[];
            if(auth.rank<3){
              auth.rank = has(CONFIG.adminStreetRoleIds,roles) ? 2 :
                          has(CONFIG.staffRoleIds,roles) ? 1 : 0;
            }
          })
          .catch(function(){})
          .finally(function(){ cb(); });
      }, 500);
    })
    .catch(function(){
      logout(true);
      cb();
    });
}

function login(){
  var scopes = 'identify guilds guilds.members.read';
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

var selectedGuild = null;
var botGuildIds = null;

function getSelectedGuild(){
  try{
    var saved = localStorage.getItem('trof_selected_guild');
    return saved ? saved : null;
  }catch(e){return null}
}

function setSelectedGuild(guildId){
  try{localStorage.setItem('trof_selected_guild', guildId)}catch(e){}
  selectedGuild = guildId;
}

async function fetchBotGuilds(){
  if(botGuildIds !== null) return botGuildIds;
  try{
    var res = await fetch(TROF.CONFIG.apiUrl + '/bot/guilds');
    if(res.ok){
      var data = await res.json();
      botGuildIds = data.guild_ids || [];
      return botGuildIds;
    }
  }catch(e){}
  return [];
}

async function checkUserAccess(userId, guildId){
  try{
    var res = await fetch(
      TROF.CONFIG.apiUrl + '/user/' + userId + '/guilds/' + guildId + '/check',
      {headers: {Authorization: 'Bearer ' + token()}}
    );
    if(res.ok){
      var data = await res.json();
      return data.has_access === true;
    }
  }catch(e){}
  return false;
}

async function fetchUserGuilds(){
  var t = token();
  if(!t) return [];
  try{
    var res = await fetch(API + '/users/@me/guilds', {
      headers: {Authorization: 'Bearer ' + t}
    });
    if(res.status === 429){
      await new Promise(function(r){setTimeout(r, 3000)});
      res = await fetch(API + '/users/@me/guilds', {
        headers: {Authorization: 'Bearer ' + t}
      });
    }
    if(!res.ok) return [];
    var guilds = await res.json();
    var botGuilds = await fetchBotGuilds();
    var candidateGuilds = guilds.filter(function(g){
      return botGuilds.length === 0 || botGuilds.indexOf(String(g.id)) > -1;
    });
    var adminGuilds = [];
    for(var i = 0; i < candidateGuilds.length; i++){
      var g = candidateGuilds[i];
      if(g.owner === true){
        adminGuilds.push(g);
        continue;
      }
      var perms = parseInt(g.permissions) || 0;
      var hasAdmin = (perms & 0x8) === 0x8;
      var hasManageGuild = (perms & 0x20) === 0x20;
      var hasManageRoles = (perms & 0x10000000) === 0x10000000;
      var hasKick = (perms & 0x2) === 0x2;
      var hasBan = (perms & 0x4) === 0x4;
      if(hasAdmin || hasManageGuild || hasManageRoles || hasKick || hasBan){
        adminGuilds.push(g);
        continue;
      }
      var hasAccess = await checkUserAccess(auth.user.id, g.id);
      if(hasAccess){
        adminGuilds.push(g);
      }
    }
    return adminGuilds;
  }catch(e){
    return [];
  }
}

async function renderServerSelector(){
  var box = document.getElementById('server-selector');
  if(!box) return;
  if(!auth.user){
    box.innerHTML = '';
    box.classList.remove('has-user');
    return;
  }
  box.classList.add('has-user');
  box.innerHTML = '<button class="server-btn" id="server-toggle" type="button" aria-label="' + t('selectServer') + '">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
    '</button>';
  var guilds = await fetchUserGuilds();
  var current = getSelectedGuild();
  var toggle = document.getElementById('server-toggle');
  var oldDropdown = document.getElementById('server-dropdown');
  if(oldDropdown) oldDropdown.remove();
  var oldOverlay = document.getElementById('server-overlay');
  if(oldOverlay) oldOverlay.remove();
  var overlay = document.createElement('div');
  overlay.id = 'server-overlay';
  document.body.appendChild(overlay);
  var dropdown = document.createElement('div');
  dropdown.id = 'server-dropdown';
  dropdown.className = 'server-dropdown';
  dropdown.hidden = true;
  var dropHTML = '<div class="server-dropdown-header">';
  dropHTML += '<span>' + t('selectServer') + '</span>';
  dropHTML += '<button class="server-close" id="server-close" type="button">✕</button>';
  dropHTML += '</div>';
  if(guilds.length === 0){
    dropHTML += '<div class="server-empty">' + t('noServers') + '</div>';
  } else {
    dropHTML += '<ul class="server-list">';
    guilds.forEach(function(g){
      var isActive = (String(g.id) === String(current));
      var icon = g.icon
        ? 'https://cdn.discordapp.com/icons/' + g.id + '/' + g.icon + '.png?size=64'
        : 'https://cdn.discordapp.com/embed/avatars/0.png';
      dropHTML += '<li>';
      dropHTML += '<button class="server-item' + (isActive ? ' active' : '') + '" data-guild-id="' + g.id + '">';
      dropHTML += '<img src="' + icon + '" alt="">';
      dropHTML += '<span>' + g.name + '</span>';
      if(isActive) dropHTML += '<span class="server-check">✓</span>';
      dropHTML += '</button>';
      dropHTML += '</li>';
    });
    dropHTML += '</ul>';
  }
  dropdown.innerHTML = dropHTML;
  document.body.appendChild(dropdown);
  var close = document.getElementById('server-close');
  function openMenu(){
    dropdown.hidden = false;
    setTimeout(function(){ overlay.classList.add('show'); }, 10);
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(function(){ dropdown.hidden = true; }, 300);
  }
  toggle.onclick = function(e){
    e.stopPropagation();
    if(dropdown.hidden) openMenu();
    else closeMenu();
  };
  close.onclick = closeMenu;
  overlay.onclick = closeMenu;
  dropdown.querySelectorAll('.server-item').forEach(function(btn){
    btn.onclick = function(){
      var gid = btn.getAttribute('data-guild-id');
      setSelectedGuild(gid);
      location.reload();
    };
  });
}

function formatNumber(num){
  if(num === null || num === undefined) return '0';
  num = Number(num);
  if(isNaN(num)) return '0';
  var abs = Math.abs(num);
  if(abs >= 1e12) return (num / 1e12).toFixed(2).replace(/\.?0+$/, '') + 'T';
  if(abs >= 1e9)  return (num / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B';
  if(abs >= 1e6)  return (num / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if(abs >= 1e3)  return (num / 1e3).toFixed(2).replace(/\.?0+$/, '') + 'K';
  return num.toString();
}

window.TROF={
  t:t, name:name, desc:desc, cmdDesc:cmdDesc,
  CONFIG:CONFIG, SECTIONS:SECTIONS, auth:auth,
  load:load, login:login, logout:logout,
  dust:dust, mountAccount:mountAccount, avatar:avatar, token:token,
  formatNumber:formatNumber,
  getSelectedGuild:getSelectedGuild,
  setSelectedGuild:setSelectedGuild,
  renderServerSelector:renderServerSelector,
  fetchUserGuilds:fetchUserGuilds,
  roleName:function(){return (lang==='en'?ROLE_EN:ROLE)[auth.rank]},
  can:function(s){return auth.rank>=RANK[s.need]}
};
mountLang();translate();
})();

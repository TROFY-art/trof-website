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
restricted:'هذا القسم متاح لرتب محددة فقط. إذا رتبتك تسمح، سجّل الدخول عبر Discord.',
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
noServers:'لا توجد سيرفرات تملك فيها رتبة إدارية',
loading:'جاري التحميل...',
checking:'جاري التحقق...',
vote:'صوّت للبوت',

termsPageTitle:'شروط الخدمة | TROF System',
termsTitle:'📜 شروط الخدمة',
termsLastUpdate:'آخر تحديث',
termsBack:'الرجوع للرئيسية',
termsIntro:'مرحباً بك في TROF System ("البوت" أو "الخدمة"). باستخدامك للبوت أو الموقع الإلكتروني المرتبط به، فإنك توافق على هذه الشروط. إذا كنت لا توافق على أي جزء منها، يرجى التوقف عن استخدام الخدمة فوراً.',
termsH1:'1. قبول الشروط',
termsH1Body:'باستخدامك للبوت أو الموقع، فإنك تقر بأنك قرأت وفهمت ووافقت على جميع الشروط والأحكام المذكورة هنا. نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق.',
termsH2:'2. الأهلية',
termsH2Body:'يجب أن يكون عمرك 13 عاماً على الأقل (أو السن القانوني في بلدك) لاستخدام الخدمة. إذا كنت أقل من هذا السن، يُمنع عليك استخدام البوت.',
termsH3:'3. استخدام الخدمة',
termsH3Body:'توافق على استخدام الخدمة للأغراض المشروعة فقط. يُمنع عليك:',
termsH3List:['استخدام البوت لأي نشاط غير قانوني أو ضار','محاولة اختراق البوت أو التلاعب به','استغلال أي ثغرة في البوت أو النظام','انتحال شخصية مالك البوت أو فريقه','إرسال رسائل مزعجة (spam) عبر البوت','استخدام البوت لتخريب سيرفرات الآخرين','بيع أو إعادة بيع الخدمة دون إذن مسبق'],
termsH4:'4. الحساب والمسؤولية',
termsH4Body:'أنت مسؤول بالكامل عن:',
termsH4List:['جميع الأنشطة التي تتم عبر حسابك','الحفاظ على سرية بياناتك','أي محتوى ترسله أو تنشره عبر البوت'],
termsH5:'5. المدفوعات والاشتراكات (VIP)',
termsH5Body:'بعض الميزات (مثل VIP) قد تكون مدفوعة. عند الشراء:',
termsH5List:['جميع المدفوعات نهائية وغير قابلة للاسترداد (إلا إذا ذكر خلاف ذلك)','لا يمكن نقل الاشتراك بين حسابات مختلفة','نحتفظ بالحق في تعديل أسعار الاشتراكات مستقبلاً','إذا قمت بمخالفة الشروط، يحق لنا إلغاء اشتراكك دون استرداد'],
termsH6:'6. المحتوى',
termsH6Body:'أنت المسؤول عن أي محتوى ترسله عبر البوت. نحتفظ بالحق في حذف أي محتوى مخالف دون إشعار. لا نتحمل مسؤولية المحتوى الذي ينشره المستخدمون.',
termsH7:'7. الخصوصية',
termsH7Body:'نحن نجمع بعض البيانات (مثل ID الحساب، اسم المستخدم، الرصيد، المستوى) لتشغيل الخدمة. لمزيد من التفاصيل، يرجى قراءة',
termsH7Link:'سياسة الخصوصية',
termsH8:'8. إخلاء المسؤولية',
termsH8Body:'الخدمة تُقدّم "كما هي" (as-is) بدون أي ضمانات. لا نضمن:',
termsH8List:['أن الخدمة ستعمل دون انقطاع','أن البيانات ستبقى محفوظة دائماً','أن البوت سيكون خالياً من الأخطاء'],
termsH8Body2:'لا نتحمل مسؤولية أي خسائر (مادية أو معنوية) ناتجة عن استخدام البوت.',
termsH9:'9. الإيقاف والإلغاء',
termsH9Body:'يحق لنا إيقاف أو حظر حسابك في أي وقت بدون إشعار مسبق، إذا:',
termsH9List:['خالفت هذه الشروط','أسأت استخدام البوت','حاولت اختراق النظام'],
termsH10:'10. التعديلات',
termsH10Body:'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. التعديلات تصبح سارية فور نشرها على هذه الصفحة. استمرارك في استخدام البوت يعني موافقتك على التعديلات.',
termsH11:'11. القانون المطبق',
termsH11Body:'هذه الشروط تخضع للقوانين المحلية في بلد مالك البوت، وأي نزاع يُحل ودياً أولاً.',
termsH12:'12. التواصل',
termsH12Body:'لأي استفسار بخصوص هذه الشروط:',
termsContactEmail:'📧 البريد:',
termsContactDiscord:'💬 ديسكورد:',
termsWarning:'⚠️ تنبيه مهم:',
termsWarningBody:'إذا كنت لا توافق على أي بند من هذه الشروط، يجب عليك إزالة البوت من سيرفرك والتوقف عن استخدام الموقع فوراً.',
termsCopyright:'© 2026 TROF System - جميع الحقوق محفوظة',

privacyPageTitle:'سياسة الخصوصية | TROF System',
privacyTitle:'🔒 سياسة الخصوصية',
privacyLastUpdate:'آخر تحديث',
privacyBack:'الرجوع للرئيسية',
privacyIntro:'خصوصيتك تهمنا. توضح هذه السياسة كيف يجمع TROF System ("البوت" أو "الخدمة") بياناتك ويستخدمها ويحميها. باستخدامك للخدمة، فإنك توافق على هذه السياسة.',
privacyH1:'1. البيانات التي نجمعها',
privacyH1Body:'نجمع الحد الأدنى من البيانات اللازمة لتشغيل الخدمة:',
privacyTableType:'نوع البيانات',
privacyTablePurpose:'الغرض',
privacyTableSource:'المصدر',
privacyRow1:['🆔 معرف المستخدم (Discord ID)','تحديد الحساب - ربط الرصيد والمستوى','ديسكورد'],
privacyRow2:['👤 اسم المستخدم','عرض الاسم في البطاقات والقوائم','ديسكورد'],
privacyRow3:['🖼️ الصورة الرمزية (Avatar)','عرضها في البروفايل والقوائم','ديسكورد'],
privacyRow4:['💰 الرصيد والاقتصاد','تشغيل نظام البنك والمكافآت','البوت'],
privacyRow5:['📊 المستوى و XP','نظام المستويات والترتيب','البوت'],
privacyRow6:['🎁 الاشتراكات (VIP)','تفعيل الميزات المدفوعة','البوت'],
privacyRow7:['⚙️ إعدادات السيرفر','حفظ تخصيصات السيرفر (ترحيب، حماية، إلخ)','البوت'],
privacyH2:'2. البيانات التي لا نجمعها',
privacyH2Body:'نحن لا نجمع:',
privacyH2List:['❌ كلمات المرور أو بيانات الدخول','❌ رسائلك الخاصة (DMs)','❌ محتوى رسائلك في السيرفرات (إلا إذا احتاجها أمر معين)','❌ معلوماتك المالية أو البنكية','❌ عنوان IP أو موقعك الجغرافي','❌ رقم هاتفك أو بريدك الإلكتروني'],
privacyH3:'3. كيف نستخدم البيانات',
privacyH3Body:'نستخدم بياناتك فقط لـ:',
privacyH3List:['✅ تشغيل أوامر البوت','✅ حفظ رصيدك ومستواك','✅ تفعيل اشتراك VIP','✅ عرض لوحات الصدارة','✅ إرسال الإشعارات (مثل الترحيب)','✅ مكافحة الغش والسبام'],
privacyH4:'4. مشاركة البيانات',
privacyH4Body:'لا نبيع ولا نشارك بياناتك مع أي طرف ثالث.',
privacyH4Body2:'الاستثناءات الوحيدة:',
privacyH4List:['عند طلب قانوني رسمي من جهة قضائية','لحماية حقوق البوت أو المستخدمين الآخرين','مع Discord API (لأن الخدمة تعمل عبر ديسكورد)'],
privacyH5:'5. تخزين البيانات وأمانها',
privacyH5Body:'نخزّن بياناتك على:',
privacyH5List:['🗄️ قاعدة بيانات محلية (SQLite) على سيرفر خاص','📁 ملفات JSON للتخزين السريع'],
privacyH5Body2:'نتخذ إجراءات أمنية لحماية بياناتك:',
privacyH5List2:['🔐 كلمات مرور قوية للسيرفر','🔒 تشفير الاتصالات (HTTPS)','🛡️ جدار حماية (Firewall)','💾 نسخ احتياطية دورية'],
privacyH6:'6. مدة الاحتفاظ بالبيانات',
privacyH6Body:'نحتفظ ببياناتك طالما أنت تستخدم البوت. عند إزالة البوت من السيرفر أو طلبك حذف بياناتك:',
privacyH6List:['يتم حذف بيانات السيرفر خلال 30 يوم','بياناتك الشخصية (رصيد، مستوى) تبقى على السيرفرات الأخرى','يمكنك طلب حذف جميع بياناتك يدوياً'],
privacyH7:'7. حقوقك',
privacyH7Body:'لك الحق في:',
privacyH7List:['📖 الوصول: معرفة البيانات المحفوظة عنك','✏️ التصحيح: طلب تعديل بياناتك','🗑️ الحذف: طلب حذف جميع بياناتك','🚫 الاعتراض: رفض بعض أنواع المعالجة'],
privacyH7Body2:'لتفعيل أي من هذه الحقوق، تواصل معنا (انظر القسم 11).',
privacyH8:'8. ملفات تعريف الارتباط (Cookies)',
privacyH8Body:'الموقع الإلكتروني يستخدم:',
privacyH8List:['🍪 trof_token - لحفظ جلسة تسجيل الدخول (sessionStorage)','🍪 trof_lang - لحفظ اللغة المفضلة (localStorage)','🍪 trof_selected_guild - لحفظ السيرفر المختار (localStorage)'],
privacyH8Body2:'لا نستخدم cookies للتتبع أو الإعلانات.',
privacyH9:'9. خصوصية الأطفال',
privacyH9Body:'الخدمة غير مخصصة للأطفال دون سن 13 عاماً. إذا اكتشفنا أن طفلاً دون 13 عاماً يستخدم البوت، سنحذف بياناته فوراً.',
privacyH10:'10. التعديلات على السياسة',
privacyH10Body:'قد نحدّث هذه السياسة من وقت لآخر. التعديلات تصبح سارية فور نشرها. نوصي بمراجعة هذه الصفحة بشكل دوري.',
privacyH11:'11. التواصل',
privacyH11Body:'لأي استفسار بخصوص الخصوصية أو طلب حذف بيانات:',
privacyPromise:'✅ وعدنا لك:',
privacyPromiseBody:'بياناتك ملكك. لا نبيعها، لا نشاركها، ونحترم خصوصيتك.',

votePageTitle:'صوّت للبوت | TROF System',
voteTitle:'🗳️ صوّت للبوت',
voteSubtitle:'كل تصويت =',
voteSubtitleReward:'5,000 💰',
voteSubtitleEnd:'+ دعم البوت!',
voteLoginNeeded:'🔒 سجّل دخول للتصويت',
voteCanVote:'✅ يمكنك التصويت الآن!',
voteCooldown:'⏰ يمكنك التصويت بعد',
voteCooldownHours:'ساعة',
voteStatTotal:'إجمالي التصويتات',
voteStatMonth:'هذا الشهر',
voteStatRank:'ترتيبك',
voteSitesTitle:'🎯 مواقع التصويت',
voteSitesClick:'اضغط للتصويت للبوت',
voteTopTitle:'🏆 أفضل 10 مصوتين',
voteTopEmpty:'لا توجد تصويتات بعد',
voteTopBeFirst:'كن الأول!',
voteLoading:'جاري التحميل...',
voteError:'⚠️ خطأ في التحميل',
voteVotes:'تصويت',
voteChecking:'⏳ جاري التحقق...',
voteNoSites:'لا توجد مواقع حالياً',
voteBack:'الرجوع للرئيسية'
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
restricted:'This section is only for certain roles. If your role allows it, log in with Discord.',
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
noServers:'No servers where you have an admin role',
loading:'Loading...',
checking:'Checking...',
vote:'Vote for Bot',

termsPageTitle:'Terms of Service | TROF System',
termsTitle:'📜 Terms of Service',
termsLastUpdate:'Last updated',
termsBack:'Back to Home',
termsIntro:'Welcome to TROF System ("the Bot" or "the Service"). By using the bot or its associated website, you agree to these terms. If you do not agree with any part, please stop using the service immediately.',
termsH1:'1. Acceptance of Terms',
termsH1Body:'By using the bot or the website, you acknowledge that you have read, understood, and agreed to all terms and conditions stated here. We reserve the right to modify these terms at any time without prior notice.',
termsH2:'2. Eligibility',
termsH2Body:'You must be at least 13 years old (or the legal age in your country) to use the service. If you are younger, you are prohibited from using the bot.',
termsH3:'3. Use of Service',
termsH3Body:'You agree to use the service for lawful purposes only. You are prohibited from:',
termsH3List:['Using the bot for any illegal or harmful activity','Attempting to hack or manipulate the bot','Exploiting any vulnerability in the bot or system','Impersonating the bot owner or their team','Sending spam messages through the bot','Using the bot to vandalize other servers','Selling or reselling the service without prior permission'],
termsH4:'4. Account & Responsibility',
termsH4Body:'You are fully responsible for:',
termsH4List:['All activities performed through your account','Maintaining the confidentiality of your data','Any content you send or publish through the bot'],
termsH5:'5. Payments & Subscriptions (VIP)',
termsH5Body:'Some features (like VIP) may be paid. When purchasing:',
termsH5List:['All payments are final and non-refundable (unless stated otherwise)','Subscriptions cannot be transferred between different accounts','We reserve the right to modify subscription prices in the future','If you violate the terms, we may cancel your subscription without refund'],
termsH6:'6. Content',
termsH6Body:'You are responsible for any content you send through the bot. We reserve the right to delete any violating content without notice. We are not responsible for content published by users.',
termsH7:'7. Privacy',
termsH7Body:'We collect some data (such as account ID, username, balance, level) to operate the service. For more details, please read our',
termsH7Link:'Privacy Policy',
termsH8:'8. Disclaimer',
termsH8Body:'The service is provided "as-is" without any warranties. We do not guarantee:',
termsH8List:['That the service will operate without interruption','That data will always be preserved','That the bot will be free of errors'],
termsH8Body2:'We are not responsible for any losses (material or moral) resulting from the use of the bot.',
termsH9:'9. Suspension & Termination',
termsH9Body:'We reserve the right to suspend or ban your account at any time without prior notice, if:',
termsH9List:['You violate these terms','You misuse the bot','You attempt to hack the system'],
termsH10:'10. Modifications',
termsH10Body:'We reserve the right to modify these terms at any time. Modifications become effective immediately upon publication on this page. Your continued use of the bot means you agree to the modifications.',
termsH11:'11. Governing Law',
termsH11Body:"These terms are subject to the local laws of the bot owner's country, and any dispute shall be resolved amicably first.",
termsH12:'12. Contact',
termsH12Body:'For any inquiry regarding these terms:',
termsContactEmail:'📧 Email:',
termsContactDiscord:'💬 Discord:',
termsWarning:'⚠️ Important Notice:',
termsWarningBody:'If you do not agree with any clause of these terms, you must remove the bot from your server and stop using the website immediately.',
termsCopyright:'© 2026 TROF System - All rights reserved',

privacyPageTitle:'Privacy Policy | TROF System',
privacyTitle:'🔒 Privacy Policy',
privacyLastUpdate:'Last updated',
privacyBack:'Back to Home',
privacyIntro:'Your privacy matters to us. This policy explains how TROF System ("the Bot" or "the Service") collects, uses, and protects your data. By using the service, you agree to this policy.',
privacyH1:'1. Data We Collect',
privacyH1Body:'We collect the minimum data required to operate the service:',
privacyTableType:'Data Type',
privacyTablePurpose:'Purpose',
privacyTableSource:'Source',
privacyRow1:['🆔 User ID (Discord ID)','Account identification - linking balance and level','Discord'],
privacyRow2:['👤 Username','Displaying name in cards and lists','Discord'],
privacyRow3:['🖼️ Avatar','Displaying it in profile and lists','Discord'],
privacyRow4:['💰 Balance & Economy','Operating bank and rewards system','Bot'],
privacyRow5:['📊 Level & XP','Leveling and ranking system','Bot'],
privacyRow6:['🎁 Subscriptions (VIP)','Activating paid features','Bot'],
privacyRow7:['⚙️ Server Settings','Saving server customizations (welcome, protection, etc.)','Bot'],
privacyH2:'2. Data We Do NOT Collect',
privacyH2Body:'We do NOT collect:',
privacyH2List:['❌ Passwords or login credentials','❌ Your private messages (DMs)','❌ Content of your messages in servers (unless a specific command needs it)','❌ Your financial or banking information','❌ Your IP address or geographic location','❌ Your phone number or email'],
privacyH3:'3. How We Use Data',
privacyH3Body:'We use your data only to:',
privacyH3List:['✅ Operate bot commands','✅ Save your balance and level','✅ Activate VIP subscription','✅ Display leaderboards','✅ Send notifications (such as welcome)','✅ Fight cheating and spam'],
privacyH4:'4. Data Sharing',
privacyH4Body:'We do not sell or share your data with any third party.',
privacyH4Body2:'The only exceptions:',
privacyH4List:['Upon official legal request from a judicial authority','To protect the rights of the bot or other users','With Discord API (since the service runs through Discord)'],
privacyH5:'5. Data Storage & Security',
privacyH5Body:'We store your data on:',
privacyH5List:['🗄️ Local database (SQLite) on a private server','📁 JSON files for fast storage'],
privacyH5Body2:'We take security measures to protect your data:',
privacyH5List2:['🔐 Strong server passwords','🔒 Connection encryption (HTTPS)','🛡️ Firewall','💾 Regular backups'],
privacyH6:'6. Data Retention',
privacyH6Body:'We retain your data as long as you use the bot. When removing the bot from the server or requesting deletion of your data:',
privacyH6List:['Server data is deleted within 30 days','Your personal data (balance, level) remains on other servers','You can request manual deletion of all your data'],
privacyH7:'7. Your Rights',
privacyH7Body:'You have the right to:',
privacyH7List:['📖 Access: Know the data stored about you','✏️ Correction: Request modification of your data','🗑️ Deletion: Request deletion of all your data','🚫 Objection: Refuse certain types of processing'],
privacyH7Body2:'To exercise any of these rights, contact us (see Section 11).',
privacyH8:'8. Cookies',
privacyH8Body:'The website uses:',
privacyH8List:['🍪 trof_token - to save login session (sessionStorage)','🍪 trof_lang - to save preferred language (localStorage)','🍪 trof_selected_guild - to save selected server (localStorage)'],
privacyH8Body2:'We do not use cookies for tracking or advertising.',
privacyH9:"9. Children's Privacy",
privacyH9Body:'The service is not intended for children under 13 years old. If we discover a child under 13 using the bot, we will delete their data immediately.',
privacyH10:'10. Policy Changes',
privacyH10Body:'We may update this policy from time to time. Modifications become effective immediately upon publication. We recommend reviewing this page periodically.',
privacyH11:'11. Contact',
privacyH11Body:'For any inquiry regarding privacy or data deletion request:',
privacyPromise:'✅ Our promise:',
privacyPromiseBody:"Your data is yours. We don't sell it, don't share it, and respect your privacy.",

votePageTitle:'Vote for Bot | TROF System',
voteTitle:'🗳️ Vote for the Bot',
voteSubtitle:'Each vote =',
voteSubtitleReward:'5,000 💰',
voteSubtitleEnd:'+ support the bot!',
voteLoginNeeded:'🔒 Log in to vote',
voteCanVote:'✅ You can vote now!',
voteCooldown:'⏰ You can vote in',
voteCooldownHours:'hours',
voteStatTotal:'Total Votes',
voteStatMonth:'This Month',
voteStatRank:'Your Rank',
voteSitesTitle:'🎯 Voting Sites',
voteSitesClick:'Click to vote for the bot',
voteTopTitle:'🏆 Top 10 Voters',
voteTopEmpty:'No votes yet',
voteTopBeFirst:'Be the first!',
voteLoading:'Loading...',
voteError:'⚠️ Loading error',
voteVotes:'votes',
voteChecking:'⏳ Checking...',
voteNoSites:'No sites available',
voteBack:'Back to Home'
}
};

var EN={general:['Embed Builder','Create custom messages'],shop:['Shop','Buy backgrounds and badges'],tickets:['Tickets','Ticket system'],welcome:['Welcome','Welcome messages for new members'],levels:['Levels','Text and voice XP'],protection:['Protection','Server protection'],moderation:['Server Manager','Full control over channels and roles'],shortcuts:['Shortcuts','Command shortcuts'],vote:['Vote','Get rewards']};
var ROLE_EN=['Member','Staff','Admin Street','Owner'];

function t(k){return (STR[lang]&&STR[lang][k])||STR.ar[k]||k}
function name(s){return lang==='en'&&EN[s.id]?EN[s.id][0]:s.t}
function desc(s){return lang==='en'&&EN[s.id]?EN[s.id][1]:s.d}
function cmdDesc(c){return lang==='en'&&c[2]?c[2]:c[1]}

function getIconSVG(name){
  var icons={
    embed:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h7M7 17h4"/></svg>',
    shop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1-5h16l1 5"/><path d="M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9"/><path d="M9 13a3 3 0 006 0"/></svg>',
    vip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>',
    ticket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4z"/><path d="M13 6v12"/></svg>',
    welcome:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 4.8L20 8l-4 4 1 5.6-5-2.8L7 17.6 8 12 4 8l5.6-1.2z"/></svg>',
    levels:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-8M22 20h-20"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    shortcut:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>',
    vote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M3 8l3-3h12l3 3v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>'
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
  var called = false;
  function safeCb() {
    if (called) return;
    called = true;
    cb();
  }
  
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
      
      if (!CONFIG.guildId) {
        safeCb();
        return;
      }
      
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

async function checkUserAccess(userId,guildId){
  try{
    var res=await fetch(
      TROF.CONFIG.apiUrl+'/user/'+userId+'/guilds/'+guildId+'/check',
      {headers:{Authorization:'Bearer '+token()}}
    );
    if(res.ok){
      var data=await res.json();
      return data.has_access===true;
    }
  }catch(e){}
  return false;
}

async function fetchUserGuilds(){
  var t=token();
  if(!t)return [];
  try{
    var res=await fetch(API+'/users/@me/guilds',{
      headers:{Authorization:'Bearer '+t}
    });
    if(res.status===429){
      await new Promise(function(r){setTimeout(r,3000)});
      res=await fetch(API+'/users/@me/guilds',{
        headers:{Authorization:'Bearer '+t}
      });
    }
    if(!res.ok)return [];
    var guilds=await res.json();
    var botGuilds=await fetchBotGuilds();

    var candidateGuilds=guilds.filter(function(g){
      return botGuilds.length===0||botGuilds.indexOf(String(g.id))>-1;
    });

    var adminGuilds=candidateGuilds.filter(function(g){
      if(g.owner===true)return true;
      var perms=parseInt(g.permissions)||0;
      return (perms&0x8)===0x8 ||
             (perms&0x20)===0x20 ||
             (perms&0x10000000)===0x10000000 ||
             (perms&0x2)===0x2 ||
             (perms&0x4)===0x4;
    });

    return adminGuilds;
  }catch(e){
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
  var dropHTML='<div class="server-dropdown-header">';
  dropHTML+='<span>'+t('selectServer')+'</span>';
  dropHTML+='<button class="server-close" id="server-close" type="button">✕</button>';
  dropHTML+='</div>';
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
    ar: {
      home: '🏠 الرئيسية',
      vote: '🗳️ صوّت للبوت',
      terms: '📜 شروط الخدمة',
      privacy: '🔒 سياسة الخصوصية'
    },
    en: {
      home: '🏠 Home',
      vote: '🗳️ Vote for Bot',
      terms: '📜 Terms of Service',
      privacy: '🔒 Privacy Policy'
    }
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

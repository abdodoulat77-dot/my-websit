const logoDark = "https://i.ibb.co/96v5K7n/6010303610153012976-121.jpg";
const logoLight = "https://i.ibb.co/Xk4sF9Pp/6014807209780383184-121.jpg";

let isNavigatingBySystem = false;
let ipoProfileEditorOpen = false;
let ipoProfileDraft = null;

// قائمة الأندية العالمية حصرياً مع خيار "محايد"
const globalTeamsList = [
  { name: 'محايد (بدون فريق)', league: 'عام' },
  { name: 'أرسنال', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'أستون فيلا', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'بورنموث', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'برينتفورد', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'برايتون', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'تشيلسي', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'كريستال بالاس', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'إيفرتون', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'فولهام', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'ليدز يونايتد', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'ليفربول', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'مانشستر سيتي', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'مانشستر يونايتد', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'نيوكاسل يونايتد', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'نوتنغهام فورست', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'سندرلاند', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'توتنهام هوتسبير', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'كوفنتري سيتي', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'إيبسويتش تاون', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'هال سيتي', league: 'الدوري الإنجليزي الممتاز' },
  { name: 'أتالانتا', league: 'الدوري الإيطالي' },
  { name: 'بولونيا', league: 'الدوري الإيطالي' },
  { name: 'كالياري', league: 'الدوري الإيطالي' },
  { name: 'كومو', league: 'الدوري الإيطالي' },
  { name: 'فيورنتينا', league: 'الدوري الإيطالي' },
  { name: 'فروزينوني', league: 'الدوري الإيطالي' },
  { name: 'جنوى', league: 'الدوري الإيطالي' },
  { name: 'إنتر ميلان', league: 'الدوري الإيطالي' },
  { name: 'يوفنتوس', league: 'الدوري الإيطالي' },
  { name: 'لاتسيو', league: 'الدوري الإيطالي' },
  { name: 'ليتشي', league: 'الدوري الإيطالي' },
  { name: 'ميلان', league: 'الدوري الإيطالي' },
  { name: 'مونزا', league: 'الدوري الإيطالي' },
  { name: 'نابولي', league: 'الدوري الإيطالي' },
  { name: 'بارما', league: 'الدوري الإيطالي' },
  { name: 'روما', league: 'الدوري الإيطالي' },
  { name: 'ساسولو', league: 'الدوري الإيطالي' },
  { name: 'تورينو', league: 'الدوري الإيطالي' },
  { name: 'أودينيزي', league: 'الدوري الإيطالي' },
  { name: 'فينيتسيا', league: 'الدوري الإيطالي' },
  { name: 'أنجيه', league: 'الدوري الفرنسي' },
  { name: 'أوكسير', league: 'الدوري الفرنسي' },
  { name: 'ستاد بريست', league: 'الدوري الفرنسي' },
  { name: 'لوهافر', league: 'الدوري الفرنسي' },
  { name: 'لو مان', league: 'الدوري الفرنسي' },
  { name: 'لانس', league: 'الدوري الفرنسي' },
  { name: 'ليل', league: 'الدوري الفرنسي' },
  { name: 'لوريان', league: 'الدوري الفرنسي' },
  { name: 'أولمبيك ليون', league: 'الدوري الفرنسي' },
  { name: 'أولمبيك مارسيليا', league: 'الدوري الفرنسي' },
  { name: 'موناكو', league: 'الدوري الفرنسي' },
  { name: 'نيس', league: 'الدوري الفرنسي' },
  { name: 'باريس إف سي', league: 'الدوري الفرنسي' },
  { name: 'باريس سان جيرمان', league: 'الدوري الفرنسي' },
  { name: 'ستاد رين', league: 'الدوري الفرنسي' },
  { name: 'ستراسبورغ', league: 'الدوري الفرنسي' },
  { name: 'تولوز', league: 'الدوري الفرنسي' },
  { name: 'تروا', league: 'الدوري الفرنسي' },
  { name: 'بايرن ميونخ', league: 'الدوري الألماني' },
  { name: 'بوروسيا دورتموند', league: 'الدوري الألماني' },
  { name: 'لايبزيغ', league: 'الدوري الألماني' },
  { name: 'شتوتغارت', league: 'الدوري الألماني' },
  { name: 'هوفنهايم', league: 'الدوري الألماني' },
  { name: 'باير ليفركوزن', league: 'الدوري الألماني' },
  { name: 'فرايبورغ', league: 'الدوري الألماني' },
  { name: 'آينتراخت فرانكفورت', league: 'الدوري الألماني' },
  { name: 'أوغسبورغ', league: 'الدوري الألماني' },
  { name: 'ماينتس', league: 'الدوري الألماني' },
  { name: 'يونيون برلين', league: 'الدوري الألماني' },
  { name: 'بوروسيا مونشنغلادباخ', league: 'الدوري الألماني' },
  { name: 'هامبورغ', league: 'الدوري الألماني' },
  { name: 'كولن', league: 'الدوري الألماني' },
  { name: 'فيردر بريمن', league: 'الدوري الألماني' },
  { name: 'شالكه 04', league: 'الدوري الألماني' },
  { name: 'إلفرسبرغ', league: 'الدوري الألماني' },
  { name: 'بادربورن', league: 'الدوري الألماني' },
  { name: 'أتلتيك بيلباو', league: 'الدوري الإسباني' },
  { name: 'أتلتيكو مدريد', league: 'الدوري الإسباني' },
  { name: 'أوساسونا', league: 'الدوري الإسباني' },
  { name: 'سيلتا فيغو', league: 'الدوري الإسباني' },
  { name: 'ديبورتيفو ألافيس', league: 'الدوري الإسباني' },
  { name: 'إلتشي', league: 'الدوري الإسباني' },
  { name: 'برشلونة', league: 'الدوري الإسباني' },
  { name: 'خيتافي', league: 'الدوري الإسباني' },
  { name: 'ليفانتي', league: 'الدوري الإسباني' },
  { name: 'مالقة', league: 'الدوري الإسباني' },
  { name: 'راسينغ سانتاندير', league: 'الدوري الإسباني' },
  { name: 'رايو فاييكانو', league: 'الدوري الإسباني' },
  { name: 'ريال ديبورتيفو لاكورونيا', league: 'الدوري الإسباني' },
  { name: 'إسبانيول', league: 'الدوري الإسباني' },
  { name: 'ريال بيتيس', league: 'الدوري الإسباني' },
  { name: 'ريال مدريد', league: 'الدوري الإسباني' },
  { name: 'ريال سوسيداد', league: 'الدوري الإسباني' },
  { name: 'إشبيلية', league: 'الدوري الإسباني' },
  { name: 'فالنسيا', league: 'الدوري الإسباني' },
  { name: 'فياريال', league: 'الدوري الإسباني' },
  { name: 'أبها', league: 'الدوري السعودي للمحترفين' },
  { name: 'الأهلي', league: 'الدوري السعودي للمحترفين' },
  { name: 'الاتفاق', league: 'الدوري السعودي للمحترفين' },
  { name: 'الدرعية', league: 'الدوري السعودي للمحترفين' },
  { name: 'الفتح', league: 'الدوري السعودي للمحترفين' },
  { name: 'الفيصلي', league: 'الدوري السعودي للمحترفين' },
  { name: 'الفيحاء', league: 'الدوري السعودي للمحترفين' },
  { name: 'الحزم', league: 'الدوري السعودي للمحترفين' },
  { name: 'الهلال', league: 'الدوري السعودي للمحترفين' },
  { name: 'الاتحاد', league: 'الدوري السعودي للمحترفين' },
  { name: 'الخليج', league: 'الدوري السعودي للمحترفين' },
  { name: 'الخلود', league: 'الدوري السعودي للمحترفين' },
  { name: 'النصر', league: 'الدوري السعودي للمحترفين' },
  { name: 'القادسية', league: 'الدوري السعودي للمحترفين' },
  { name: 'الرياض', league: 'الدوري السعودي للمحترفين' },
  { name: 'الشباب', league: 'الدوري السعودي للمحترفين' },
  { name: 'التعاون', league: 'الدوري السعودي للمحترفين' },
  { name: 'نيوم', league: 'الدوري السعودي للمحترفين' },
  { name: 'أولمبيك أقبو', league: 'الدوري الجزائري' },
  { name: 'شبيبة القبائل', league: 'الدوري الجزائري' },
  { name: 'شبيبة الساورة', league: 'الدوري الجزائري' },
  { name: 'أولمبي الشلف', league: 'الدوري الجزائري' },
  { name: 'اتحاد بسكرة', league: 'الدوري الجزائري' },
  { name: 'اتحاد خنشلة', league: 'الدوري الجزائري' },
  { name: 'اتحاد الجزائر', league: 'الدوري الجزائري' },
  { name: 'اتحاد بن عكنون', league: 'الدوري الجزائري' },
  { name: 'شباب بلوزداد', league: 'الدوري الجزائري' },
  { name: 'شباب قسنطينة', league: 'الدوري الجزائري' },
  { name: 'شباب تموشنت', league: 'الدوري الجزائري' },
  { name: 'مولودية الجزائر', league: 'الدوري الجزائري' },
  { name: 'مولودية وهران', league: 'الدوري الجزائري' },
  { name: 'مولودية البيض', league: 'الدوري الجزائري' },
  { name: 'وفاق سطيف', league: 'الدوري الجزائري' },
  { name: 'مولودية رويسات', league: 'الدوري الجزائري' }
];

function switchPage(tabId, titleText = '', pushState = true) {
  const targetTab = document.getElementById('tab-' + tabId);
  if (!targetTab) return;
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  targetTab.classList.add('active');
  if (pushState) {
    isNavigatingBySystem = true;
    history.pushState({ tab: tabId }, '', '#' + tabId);
    setTimeout(() => { isNavigatingBySystem = false; }, 50);
  }
}

function goBack() {
  window.history.back();
}

window.addEventListener('popstate', function(event) {
  if (isNavigatingBySystem) return;
  
  if (event.state && event.state.tab) {
    switchPage(event.state.tab, '', false);
  } else {
    switchPage('home', 'IPO TV', false);
  }
});

function openAuthPage(pushState = true) {
  switchPage('auth', 'حسابي', pushState);
  checkUserSession();
}

function toggleTheme() {
  const htmlEl = document.documentElement;
  const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
  const baseTheme = currentTheme === 'red' ? (localStorage.getItem('ipo_theme_base') || 'dark') : currentTheme;
  const newTheme = baseTheme === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', newTheme);
  try {
    localStorage.setItem('ipo_theme', newTheme);
    localStorage.setItem('ipo_theme_base', newTheme);
  } catch (e) {}
  updateThemeButtonUI();
  updateHeaderAppLogo(newTheme);
  updateRedThemeUI();
}


function isRedThemeUnlocked() {
  try {
    const user = getCurrentIPOUser();
    return Boolean(user && user.redThemeUnlocked);
  } catch (e) {
    return false;
  }
}

function updateRedThemeUI() {
  const headerBtn = document.getElementById('red-theme-header-btn');
  const buyBtn = document.getElementById('red-theme-buy-btn');
  const activateBtn = document.getElementById('red-theme-activate-btn');
  const unlocked = isRedThemeUnlocked();
  const active = document.documentElement.getAttribute('data-theme') === 'red';

  if (headerBtn) {
    headerBtn.style.display = unlocked ? 'inline-flex' : 'none';
    headerBtn.querySelector('span:last-child').textContent = active ? 'الوضع الأحمر ✓' : 'الوضع الأحمر';
  }
  if (buyBtn) {
    buyBtn.style.display = unlocked ? 'none' : 'block';
    const points = Math.max(0, Number(getCurrentIPOUser()?.points || 0));
    buyBtn.disabled = points < 60;
    if (!unlocked) buyBtn.textContent = points >= 60 ? 'شراء الوضع الأحمر بـ 60 نقطة' : `تحتاج ${60 - points} نقطة إضافية`;
  }
  if (activateBtn) {
    activateBtn.style.display = unlocked ? 'block' : 'none';
    activateBtn.textContent = active ? 'إيقاف الوضع الأحمر' : 'تفعيل الوضع الأحمر';
  }
}

function buyRedThemeFeature() {
  if (localStorage.getItem('ipo_logged_in') !== 'true') {
    alert('سجل الدخول أولاً حتى تتمكن من شراء الميزة.');
    openAuthPage(true);
    return;
  }
  const user = buildIPOProfileUser();
  if (user.redThemeUnlocked) {
    updateRedThemeUI();
    toggleRedTheme();
    return;
  }
  const points = Math.max(0, Number(user.points) || 0);
  if (points < 60) {
    alert(`لا تملك نقاطًا كافية. تحتاج ${60 - points} نقطة إضافية.`);
    return;
  }
  user.points = points - 60;
  user.redThemeUnlocked = true;
  const saved = syncIPOUserEverywhere(user);
  if (!saved) return;
  updatePointsUI(saved.points);
  updateRedThemeUI();
  toggleRedTheme();
  alert('تم شراء الخلفية الحمراء وتفعيلها بنجاح ✓');
}

function toggleRedTheme() {
  if (!isRedThemeUnlocked()) {
    alert('الوضع الأحمر غير متاح قبل شرائه بـ60 نقطة.');
    return;
  }
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'red' ? (localStorage.getItem('ipo_theme_base') || 'dark') : 'red';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('ipo_theme', next);
    if (next !== 'red') localStorage.setItem('ipo_theme_base', next);
  } catch (e) {}
  updateThemeButtonUI();
  updateRedThemeUI();
}

function updateThemeButtonUI() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const icon = document.getElementById('theme-icon-symbol');
  const text = document.getElementById('theme-text');
  if (theme === 'light') { if(icon) icon.textContent='☀️'; if(text) text.textContent='الوضع الفاتح'; }
  else if (theme === 'red') { if(icon) icon.textContent='🔴'; if(text) text.textContent='الوضع الأحمر'; }
  else { if(icon) icon.textContent='🌙'; if(text) text.textContent='الوضع الداكن'; }
}

function toggleAuthMode(mode) {
  const regForm = document.getElementById('form-register');
  const loginForm = document.getElementById('form-login');
  const titleEl = document.getElementById('auth-main-title');
  if (mode === 'login') {
    regForm.style.display = 'none';
    loginForm.style.display = 'block';
    titleEl.innerText = 'تسجيل الدخول';
  } else {
    regForm.style.display = 'block';
    loginForm.style.display = 'none';
    titleEl.innerText = 'إنشاء حساب جديد';
  }
}

let tempAvatarBase64 = "https://i.ibb.co/6y45s1x/user.png";
function previewDeviceImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      tempAvatarBase64 = e.target.result;
      const previewImg = document.getElementById('avatar-preview-img');
      if(previewImg) previewImg.src = tempAvatarBase64;
    }
    reader.readAsDataURL(file);
  }
}

function registerUserAccount() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const pass = document.getElementById('reg-pass').value.trim();

  if(!name || !email || pass.length < 6) {
    alert('الرجاء التأكد من تعبئة الحقول بشكل صحيح (كلمة المرور 6 أحرف على الأقل)');
    return;
  }

  let usersList = JSON.parse(localStorage.getItem('ipo_users_list') || '[]');
  const existingUser = usersList.find(u => u.email === email);
  if(existingUser) {
    alert('⚠️ هذا البريد الإلكتروني مسجل مسبقاً لحساب آخر!');
    return;
  }

  const newUserData = {
    name: name,
    email: email,
    pass: pass,
    avatar: tempAvatarBase64,
    cover: "",
    bio: "",
    favTeamName: "",
    favTeamLogo: "",
    points: 0,
    animatedAvatarUnlocked: false,
    redThemeUnlocked: false
  };

  usersList.push(newUserData);
  localStorage.setItem('ipo_users_list', JSON.stringify(usersList));
  localStorage.setItem('ipo_user_account', JSON.stringify(newUserData));
  localStorage.setItem('ipo_user_name', newUserData.name);
  localStorage.setItem('ipo_user_email', newUserData.email);
  localStorage.setItem('ipo_user_bio', '');
  localStorage.setItem('ipo_user_avatar', newUserData.avatar || '');
  localStorage.setItem('ipo_user_cover', '');
  localStorage.setItem('ipo_fav_team', '');
  localStorage.setItem('ipo_fav_team_logo', '');
  localStorage.setItem('ipo_logged_in', 'true');
  switchPage('auth', 'حسابي', true);
  checkUserSession();
}

function verifyLogin() {
  const userInput = document.getElementById('login-user').value.trim();
  const passInput = document.getElementById('login-pass').value.trim();

  let usersList = JSON.parse(localStorage.getItem('ipo_users_list') || '[]');
  const foundUser = usersList.find(u => (u.name === userInput || u.email === userInput) && u.pass === passInput);

  if(foundUser) {
    localStorage.setItem('ipo_user_account', JSON.stringify(foundUser));
    localStorage.setItem('ipo_logged_in', 'true');
    switchPage('auth', 'حسابي', true);
    checkUserSession();
  } else {
    alert('خطأ في اسم المستخدم/البريد أو كلمة المرور!');
  }
}


function updatePointsUI(points) {
  const safePoints = Math.max(0, Number.isFinite(Number(points)) ? Math.floor(Number(points)) : 0);
  const headerValue = document.getElementById('header-points-value');
  const pageValue = document.getElementById('points-page-value');
  if (headerValue) headerValue.textContent = safePoints.toLocaleString('ar-DZ');
  if (pageValue) pageValue.textContent = safePoints.toLocaleString('ar-DZ');
  const buyBtn = document.getElementById('gif-feature-buy-btn');
  const status = document.getElementById('gif-feature-status');
  const user = getCurrentIPOUser();
  const unlocked = isVerifiedOwner(user) || Boolean(user.animatedAvatarUnlocked);
  if (status) {
    status.textContent = unlocked ? '✓ الميزة مفعّلة في حسابك' : `تحتاج 300 نقطة — رصيدك ${safePoints} نقطة`;
    status.classList.toggle('is-active', unlocked);
  }
  if (buyBtn) {
    buyBtn.disabled = unlocked || safePoints < 300;
    buyBtn.textContent = unlocked ? 'الميزة مفعّلة ✓' : (safePoints >= 300 ? 'شراء الميزة بـ 300 نقطة' : `تحتاج ${Math.max(0, 300 - safePoints)} نقطة إضافية`);
  }
}

function awardSessionPoints() {
  if (localStorage.getItem('ipo_logged_in') !== 'true') return;
  const user = getCurrentIPOUser();
  const email = String(user.email || '').trim().toLowerCase();
  if (!email) return;

  // مكافأة واحدة كل 24 ساعة لكل حساب، وليس في كل جلسة/فتح للتطبيق.
  const key = `ipo_points_last_reward_${email}`;
  const now = Date.now();
  const lastReward = Number(localStorage.getItem(key) || 0);
  const DAY_MS = 24 * 60 * 60 * 1000;

  try {
    if (lastReward > 0 && (now - lastReward) < DAY_MS) {
      updatePointsUI(user.points || 0);
      return;
    }

    const next = { ...user, points: Math.max(0, Number(user.points) || 0) + 7 };
    const saved = syncIPOUserEverywhere(next);
    if (saved) {
      localStorage.setItem(key, String(now));
      updatePointsUI(saved.points);
    }
  } catch (error) {
    console.warn('IPO TV daily points reward error:', error);
  }
}

function openPointsPage(pushState = true) {
  if (localStorage.getItem('ipo_logged_in') !== 'true') {
    alert('سجل الدخول أولاً حتى تتمكن من استخدام نقاطك.');
    openAuthPage(true);
    return;
  }
  const user = buildIPOProfileUser();
  updatePointsUI(user.points || 0);
  switchPage('points', 'نقاطي', pushState);
}

function buyAnimatedAvatarFeature() {
  if (localStorage.getItem('ipo_logged_in') !== 'true') {
    alert('سجل الدخول أولاً.');
    return;
  }
  let user = buildIPOProfileUser();
  if (isVerifiedOwner(user) || user.animatedAvatarUnlocked) {
    alert('ميزة GIF مفعّلة بالفعل في حسابك.');
    updatePointsUI(user.points || 0);
    return;
  }
  const points = Math.max(0, Number(user.points) || 0);
  if (points < 300) {
    alert(`لا تملك نقاطًا كافية. تحتاج ${300 - points} نقطة إضافية.`);
    return;
  }
  user.points = points - 300;
  user.animatedAvatarUnlocked = true;
  const saved = syncIPOUserEverywhere(user);
  if (!saved) return;
  updatePointsUI(saved.points);
  const note = document.querySelector('.profile-gif-note');
  if (note) note.textContent = '✓ ميزة GIF المتحركة مفعّلة في حسابك.';
  alert('تم شراء ميزة الصورة المتحركة GIF بنجاح ✓');
}

function checkUserSession() {
  const isLoggedIn = localStorage.getItem('ipo_logged_in') === 'true';
  const regForm = document.getElementById('form-register');
  const loginForm = document.getElementById('form-login');
  const profileContainer = document.getElementById('user-profile-container');
  const mainTitle = document.getElementById('auth-main-title');

  if (isLoggedIn) {
    awardSessionPoints();
    if (regForm) regForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'none';
    if (profileContainer) profileContainer.style.display = 'block';
    if (mainTitle) mainTitle.textContent = 'الملف الشخصي';

    const user = buildIPOProfileUser();
    applyIPOProfileUser(user);
  } else {
    updatePointsUI(0);
    if (profileContainer) profileContainer.style.display = 'none';
    if (regForm) regForm.style.display = 'block';
    if (loginForm) loginForm.style.display = 'none';
    if (mainTitle) mainTitle.textContent = 'إنشاء حساب جديد';
  }

  const homeTitle = document.getElementById('home-auth-title');
  const homeDesc = document.getElementById('home-auth-desc');
  if (homeTitle) homeTitle.textContent = isLoggedIn ? 'حسابي / الملف الشخصي' : 'حسابي / تسجيل الدخول';
  if (homeDesc) homeDesc.textContent = isLoggedIn ? 'عرض وتعديل ملفك الشخصي' : 'سجل حساباً جديداً أو الدخول لحسابك المسجل';
}

function saveUserBio() {
  const bioText = document.getElementById('profile-bio-input').value;
  let user = JSON.parse(localStorage.getItem('ipo_user_account') || '{}');
  user.bio = bioText;
  
  localStorage.setItem('ipo_user_account', JSON.stringify(user));

  let usersList = JSON.parse(localStorage.getItem('ipo_users_list') || '[]');
  usersList = usersList.map(u => u.email === user.email ? user : u);
  localStorage.setItem('ipo_users_list', JSON.stringify(usersList));

  const bioViewMode = document.getElementById('bio-view-mode');
  const bioEditMode = document.getElementById('bio-edit-mode');
  const bioDisplayText = document.getElementById('bio-display-text');

  if(bioDisplayText) bioDisplayText.innerText = bioText;
  if(bioViewMode) bioViewMode.style.display = 'block';
  if(bioEditMode) bioEditMode.style.display = 'none';
}

function cancelBioEdit() {
  let user = JSON.parse(localStorage.getItem('ipo_user_account') || '{}');
  const bioViewMode = document.getElementById('bio-view-mode');
  const bioEditMode = document.getElementById('bio-edit-mode');
  const bioInput = document.getElementById('profile-bio-input');

  if(user.bio && user.bio.trim() !== '') {
    if(bioInput) bioInput.value = user.bio;
    if(bioViewMode) bioViewMode.style.display = 'block';
    if(bioEditMode) bioEditMode.style.display = 'none';
  } else {
    if(bioInput) bioInput.value = '';
    if(bioViewMode) bioViewMode.style.display = 'none';
    if(bioEditMode) bioEditMode.style.display = 'block';
  }
}

function enableBioEdit() {
  const bioViewMode = document.getElementById('bio-view-mode');
  const bioEditMode = document.getElementById('bio-edit-mode');
  if(bioViewMode) bioViewMode.style.display = 'none';
  if(bioEditMode) bioEditMode.style.display = 'block';
}

function openTeamSelectorModal() {
  const modal = document.getElementById('team-selector-modal');
  if (!modal) return;

  // إذا فُتحت القائمة من محرر الملف، نعدّل النسخة المؤقتة فقط
  // ولا نحفظ الحساب إلا عند الضغط على "حفظ" في محرر الملف.
  if (ipoProfileEditorOpen && !ipoProfileDraft) {
    ipoProfileDraft = buildIPOProfileUser();
  }

  const search = document.getElementById('team-search-input');
  if (search) search.value = '';
  modal.style.display = 'flex';
  renderTeamsList(globalTeamsList);
}

function closeTeamSelectorModal() {
  const modal = document.getElementById('team-selector-modal');
  if (modal) modal.style.display = 'none';
}

function renderTeamsList(teams) {
  const container = document.getElementById('teams-list-container');
  if (!container) return;
  container.innerHTML = '';

  if (!Array.isArray(teams) || teams.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-secondary);font-size:12px;">لا توجد نتائج مطابقة</div>';
    return;
  }

  const groups = {};
  teams.forEach((team, index) => {
    const league = team.league || 'أندية أخرى';
    if (!groups[league]) groups[league] = [];
    groups[league].push({ team, index });
  });

  Object.keys(groups).forEach(league => {
    const title = document.createElement('div');
    title.className = 'team-league-title';
    title.textContent = league;
    container.appendChild(title);

    groups[league].forEach(({team}) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'team-option-row';
      button.innerHTML = `
        <span class="team-option-ball">⚽</span>
        <span class="team-option-name"></span>
        <span class="team-option-arrow">‹</span>`;
      button.querySelector('.team-option-name').textContent = team.name || 'فريق';
      button.addEventListener('click', () => selectUserFavoriteTeam(team.name || 'فريق'));
      container.appendChild(button);
    });
  });
}

function filterTeamsList() {
  const input = document.getElementById('team-search-input');
  const query = (input?.value || '').trim().toLowerCase();
  const filtered = (Array.isArray(globalTeamsList) ? globalTeamsList : []).filter(team =>
    String(team.name || '').toLowerCase().includes(query) ||
    String(team.league || '').toLowerCase().includes(query)
  );
  renderTeamsList(filtered);
}

function selectUserFavoriteTeam(teamName) {
  try {
    const cleanTeamName = String(teamName || '').trim();
    if (!cleanTeamName) return;

    if (typeof ipoProfileEditorOpen !== 'undefined' && ipoProfileEditorOpen) {
      if (!ipoProfileDraft) ipoProfileDraft = buildIPOProfileUser();
      ipoProfileDraft.favTeamName = cleanTeamName;
      ipoProfileDraft.favTeamLogo = '';

      const editorTeam = document.getElementById('profile-editor-team-name');
      if (editorTeam) editorTeam.textContent = cleanTeamName;
      closeTeamSelectorModal();
      return;
    }

    // اختيار النادي مسموح به فقط من داخل محرر الملف.
    if (!ipoProfileEditorOpen) {
      closeTeamSelectorModal();
      alert('يمكن تغيير النادي المفضل من داخل «تعديل الملف» فقط.');
      return;
    }
  } catch (error) {
    console.error('IPO TV favorite team error:', error);
    alert('حدث خطأ أثناء حفظ النادي المفضل. حاول مرة أخرى.');
  }
}

// ضمان إمكانية استدعاء الوظيفة من عناصر الواجهة القديمة أو من HTML.
window.selectUserFavoriteTeam = selectUserFavoriteTeam;
window.openTeamSelectorModal = openTeamSelectorModal;
window.closeTeamSelectorModal = closeTeamSelectorModal;
window.filterTeamsList = filterTeamsList;

function updateProfileAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      let user = JSON.parse(localStorage.getItem('ipo_user_account') || '{}');
      user.avatar = e.target.result;
      localStorage.setItem('ipo_user_account', JSON.stringify(user));
      
      let usersList = JSON.parse(localStorage.getItem('ipo_users_list') || '[]');
      usersList = usersList.map(u => u.email === user.email ? user : u);
      localStorage.setItem('ipo_users_list', JSON.stringify(usersList));

      checkUserSession();
    }
    reader.readAsDataURL(file);
  }
}

function updateProfileCover(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      let user = JSON.parse(localStorage.getItem('ipo_user_account') || '{}');
      user.cover = e.target.result;
      localStorage.setItem('ipo_user_account', JSON.stringify(user));
      
      let usersList = JSON.parse(localStorage.getItem('ipo_users_list') || '[]');
      usersList = usersList.map(u => u.email === user.email ? user : u);
      localStorage.setItem('ipo_users_list', JSON.stringify(usersList));

      checkUserSession();
    }
    reader.readAsDataURL(file);
  }
}

function logoutAccount() {
  localStorage.setItem('ipo_logged_in', 'false');
  checkUserSession();
  switchPage('home', 'IPO TV');
}

let eplStandingsRefreshTimer = null;
let eplStandingsLastUpdated = null;

// ================================================================
// نظام ترتيب الدوريات الكبرى - تحديث تلقائي لكل الدوريات
// ================================================================

const STATIC_LEAGUE_LOGOS = {
  "England - Premier League": {
    "Arsenal": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Arsenal%20FC.png",
    "Aston Villa": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Aston%20Villa.png",
    "Bournemouth": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/AFC%20Bournemouth.png",
    "Brentford": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Brentford%20FC.png",
    "Brighton": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Brighton%20%26%20Hove%20Albion.png",
    "Chelsea": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Chelsea%20FC.png",
    "Crystal Palace": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Crystal%20Palace.png",
    "Everton": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Everton%20FC.png",
    "Fulham": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Fulham%20FC.png",
    "Leeds United": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Leeds%20United.png",
    "Liverpool": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Liverpool%20FC.png",
    "Manchester City": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Manchester%20City.png",
    "Manchester United": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Manchester%20United.png",
    "Newcastle United": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Newcastle%20United.png",
    "Nottingham Forest": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Nottingham%20Forest.png",
    "Sunderland": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Sunderland%20AFC.png",
    "Tottenham Hotspur": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Tottenham%20Hotspur.png",
    "Coventry City": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Coventry%20City.png",
    "Ipswich Town": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Ipswich%20Town.png",
    "Hull City": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/England%20-%20Premier%20League/Hull%20City.png"
  },
  "Spain - LaLiga": {
    "Athletic Club": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Athletic%20Bilbao.png",
    "Atletico Madrid": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Atl%C3%A9tico%20de%20Madrid.png",
    "Osasuna": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/CA%20Osasuna.png",
    "Celta Vigo": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Celta%20de%20Vigo.png",
    "Deportivo Alaves": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Deportivo%20Alav%C3%A9s.png",
    "Elche": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Elche%20CF.png",
    "Barcelona": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/FC%20Barcelona.png",
    "Getafe": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Getafe%20CF.png",
    "Levante": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Levante%20UD.png",
    "Malaga": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/M%C3%A1laga%20CF.png",
    "Racing Santander": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Racing%20Santander.png",
    "Rayo Vallecano": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Rayo%20Vallecano.png",
    "Deportivo La Coruna": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Deportivo%20A%20Coru%C3%B1a.png",
    "Espanyol": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/RCD%20Espanyol%20Barcelona.png",
    "Real Betis": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Real%20Betis%20Balompi%C3%A9.png",
    "Real Madrid": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Real%20Madrid.png",
    "Real Sociedad": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Real%20Sociedad.png",
    "Sevilla": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Sevilla%20FC.png",
    "Valencia": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Valencia%20CF.png",
    "Villarreal": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Spain%20-%20LaLiga/Villarreal%20CF.png"
  },
  "Italy - Serie A": {
    "AC Milan": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/AC%20Milan.png",
    "Atalanta": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Atalanta%20BC.png",
    "Bologna": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Bologna%20FC%201909.png",
    "Cagliari": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Cagliari%20Calcio.png",
    "Como": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Como%201907.png",
    "Fiorentina": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/ACF%20Fiorentina.png",
    "Frosinone": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Frosinone%20Calcio.png",
    "Genoa": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Genoa%20CFC.png",
    "Inter": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Inter%20Milan.png",
    "Juventus": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Juventus%20FC.png",
    "Lazio": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/SS%20Lazio.png",
    "Lecce": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/US%20Lecce.png",
    "Monza": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/AC%20Monza.png",
    "Napoli": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/SSC%20Napoli.png",
    "Parma": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Parma%20Calcio%201913.png",
    "Roma": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/AS%20Roma.png",
    "Sassuolo": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/US%20Sassuolo.png",
    "Torino": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Torino%20FC.png",
    "Udinese": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Udinese%20Calcio.png",
    "Venezia": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Italy%20-%20Serie%20A/Venezia%20FC.png"
  },
  "Germany - Bundesliga": {
    "Bayern Munich": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/Bayern%20Munich.png",
    "Borussia Dortmund": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/Borussia%20Dortmund.png",
    "RB Leipzig": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/RB%20Leipzig.png",
    "VfB Stuttgart": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/VfB%20Stuttgart.png",
    "Hoffenheim": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/TSG%201899%20Hoffenheim.png",
    "Bayer Leverkusen": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/Bayer%2004%20Leverkusen.png",
    "Freiburg": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/SC%20Freiburg.png",
    "Eintracht Frankfurt": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/Eintracht%20Frankfurt.png",
    "Augsburg": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/FC%20Augsburg.png",
    "Mainz": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/1.FSV%20Mainz%2005.png",
    "Union Berlin": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/1.FC%20Union%20Berlin.png",
    "Borussia M'gladbach": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/Borussia%20M%C3%B6nchengladbach.png",
    "Hamburg": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/Hamburger%20SV.png",
    "Cologne": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/1.FC%20K%C3%B6ln.png",
    "Werder Bremen": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/SV%20Werder%20Bremen.png",
    "Schalke 04": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/FC%20Schalke%2004.png",
    "Elversberg": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/SV%2007%20Elversberg.png",
    "Paderborn": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/Germany%20-%20Bundesliga/SC%20Paderborn%2007.png"
  },
  "France - Ligue 1": {
    "Angers": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/Angers%20SCO.png",
    "Auxerre": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/AJ%20Auxerre.png",
    "Brest": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/Stade%20Brestois%2029.png",
    "Le Havre": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/Le%20Havre%20AC.png",
    "Le Mans": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/Le%20Mans%20FC.png",
    "Lens": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/RC%20Lens.png",
    "Lille": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/LOSC%20Lille.png",
    "Lorient": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/FC%20Lorient.png",
    "Lyon": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/Olympique%20Lyon.png",
    "Marseille": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/Olympique%20Marseille.png",
    "Monaco": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/AS%20Monaco.png",
    "Nice": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/OGC%20Nice.png",
    "Paris FC": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/Paris%20FC.png",
    "Paris Saint-Germain": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/Paris%20Saint-Germain.png",
    "Rennes": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/Stade%20Rennais%20FC.png",
    "Strasbourg": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/RC%20Strasbourg%20Alsace.png",
    "Toulouse": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/FC%20Toulouse.png",
    "Troyes": "https://raw.githubusercontent.com/luukhopman/football-logos/master/logos/France%20-%20Ligue%201/ESTAC%20Troyes.png"
  }
};

const majorLeaguesConfig = {
  "4328": {
    name: "الدوري الإنجليزي الممتاز",
    apiLeagueName: "English Premier League",
    logoGroup: "England - Premier League",
    teams: [
      ["Arsenal", "أرسنال"], ["Aston Villa", "أستون فيلا"], ["Bournemouth", "بورنموث"], ["Brentford", "برينتفورد"],
      ["Brighton", "برايتون"], ["Chelsea", "تشيلسي"], ["Crystal Palace", "كريستال بالاس"], ["Everton", "إيفرتون"],
      ["Fulham", "فولهام"], ["Leeds United", "ليدز يونايتد"], ["Liverpool", "ليفربول"], ["Manchester City", "مانشستر سيتي"],
      ["Manchester United", "مانشستر يونايتد"], ["Newcastle United", "نيوكاسل يونايتد"], ["Nottingham Forest", "نوتنغهام فورست"],
      ["Sunderland", "سندرلاند"], ["Tottenham Hotspur", "توتنهام هوتسبير"], ["Coventry City", "كوفنتري سيتي"],
      ["Ipswich Town", "إيبسويتش تاون"], ["Hull City", "هال سيتي"]
    ]
  },
  "4335": {
    name: "الدوري الإسباني",
    apiLeagueName: "Spanish La Liga",
    logoGroup: "Spain - LaLiga",
    teams: [
      ["Athletic Club", "أتلتيك بيلباو"], ["Atletico Madrid", "أتلتيكو مدريد"], ["Osasuna", "أوساسونا"], ["Celta Vigo", "سيلتا فيغو"],
      ["Deportivo Alaves", "ديبورتيفو ألافيس"], ["Elche", "إلتشي"], ["Barcelona", "برشلونة"], ["Getafe", "خيتافي"],
      ["Levante", "ليفانتي"], ["Malaga", "مالقة"], ["Racing Santander", "راسينغ سانتاندير"], ["Rayo Vallecano", "رايو فاييكانو"],
      ["Deportivo La Coruna", "ريال ديبورتيفو لاكورونيا"], ["Espanyol", "إسبانيول"], ["Real Betis", "ريال بيتيس"], ["Real Madrid", "ريال مدريد"],
      ["Real Sociedad", "ريال سوسيداد"], ["Sevilla", "إشبيلية"], ["Valencia", "فالنسيا"], ["Villarreal", "فياريال"]
    ]
  },
  "4332": {
    name: "الدوري الإيطالي",
    apiLeagueName: "Italian Serie A",
    logoGroup: "Italy - Serie A",
    teams: [
      ["AC Milan", "إيه سي ميلان"], ["Atalanta", "أتالانتا"], ["Bologna", "بولونيا"], ["Cagliari", "كالياري"],
      ["Como", "كومو"], ["Fiorentina", "فيورنتينا"], ["Frosinone", "فروزينوني"], ["Genoa", "جنوى"],
      ["Inter", "إنتر ميلان"], ["Juventus", "يوفنتوس"], ["Lazio", "لاتسيو"], ["Lecce", "ليتشي"],
      ["Monza", "مونزا"], ["Napoli", "نابولي"], ["Parma", "بارما"], ["Roma", "روما"], ["Sassuolo", "ساسولو"],
      ["Torino", "تورينو"], ["Udinese", "أودينيزي"], ["Venezia", "فينيتسيا"]
    ]
  },
  "4331": {
    name: "الدوري الألماني",
    apiLeagueName: "German Bundesliga",
    logoGroup: "Germany - Bundesliga",
    teams: [
      ["Bayern Munich", "بايرن ميونخ"], ["Borussia Dortmund", "بوروسيا دورتموند"], ["RB Leipzig", "لايبزيغ"], ["VfB Stuttgart", "شتوتغارت"],
      ["Hoffenheim", "هوفنهايم"], ["Bayer Leverkusen", "باير ليفركوزن"], ["Freiburg", "فرايبورغ"], ["Eintracht Frankfurt", "آينتراخت فرانكفورت"],
      ["Augsburg", "أوغسبورغ"], ["Mainz", "ماينتس"], ["Union Berlin", "يونيون برلين"], ["Borussia M'gladbach", "بوروسيا مونشنغلادباخ"],
      ["Hamburg", "هامبورغ"], ["Cologne", "كولن"], ["Werder Bremen", "فيردر بريمن"], ["Schalke 04", "شالكه 04"],
      ["Elversberg", "إلفرسبرغ"], ["Paderborn", "بادربورن"]
    ]
  },
  "4334": {
    name: "الدوري الفرنسي",
    apiLeagueName: "French Ligue 1",
    logoGroup: "France - Ligue 1",
    teams: [
      ["Angers", "أنجيه"], ["Auxerre", "أوكسير"], ["Brest", "ستاد بريست"], ["Le Havre", "لوهافر"], ["Le Mans", "لو مان"],
      ["Lens", "لانس"], ["Lille", "ليل"], ["Lorient", "لوريان"], ["Lyon", "أولمبيك ليون"], ["Marseille", "أولمبيك مارسيليا"],
      ["Monaco", "موناكو"], ["Nice", "نيس"], ["Paris FC", "باريس إف سي"], ["Paris Saint-Germain", "باريس سان جيرمان"],
      ["Rennes", "ستاد رين"], ["Strasbourg", "ستراسبورغ"], ["Toulouse", "تولوز"], ["Troyes", "تروا"]
    ]
  }
};

let leagueStandingsRefreshTimer = null;
let leagueStandingsVisibilityHandlerAttached = false;
let activeLeagueDetailsId = null;
let activeLeagueStandingsContainer = null;
let activeLeagueStandingsRequestId = 0;
const leagueStandingsLastUpdated = {};
const leagueBadgeCache = {};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function normalizeName(name) {
  return String(name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\b(fc|afc|cf|ac|sc|rc|club|football|fk)\b/g, '')
    .replace(/\bsaint-germain\b/g, 'paris saint germain')
    .replace(/\bm['’]gladbach\b/g, 'monchengladbach')
    .replace(/\s+/g, ' ')
    .trim();
}

function getLeagueConfig(leagueId, fallbackName = 'الدوري') {
  return majorLeaguesConfig[String(leagueId)] || { name: fallbackName, apiLeagueName: '', teams: [] };
}

function buildStaticRows(config) {
  const logoGroup = STATIC_LEAGUE_LOGOS[config.logoGroup] || {};
  return config.teams.map((team, index) => ({
    rank: index + 1,
    apiName: team[0],
    teamName: team[1],
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    badge: logoGroup[team[0]] || ''
  }));
}

function normalizeLiveRows(tableData) {
  if (!Array.isArray(tableData)) return [];
  return tableData.map((item, index) => ({
    rank: Number(item.intRank ?? item.rank ?? item.position ?? (index + 1)),
    rawName: item.strTeam ?? item.team_name ?? item.name ?? '',
    played: Number(item.intPlayed ?? item.played ?? item.games ?? 0),
    wins: Number(item.intWin ?? item.won ?? item.wins ?? 0),
    draws: Number(item.intDraw ?? item.draw ?? item.draws ?? 0),
    losses: Number(item.intLoss ?? item.lost ?? item.losses ?? 0),
    points: Number(item.intPoints ?? item.points ?? 0),
    goalsFor: Number(item.intGoalsFor ?? item.goals_for ?? item.for ?? 0),
    goalsAgainst: Number(item.intGoalsAgainst ?? item.goals_against ?? item.against ?? 0),
    badge: item.strTeamBadge ?? item.logo ?? item.badge ?? ''
  }));
}

async function fetchLeagueBadges(config) {
  const key = config.apiLeagueName;
  if (leagueBadgeCache[key]) return leagueBadgeCache[key];

  try {
    const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(config.apiLeagueName)}`;
    const response = await fetch(url, { cache: 'no-store', headers: { 'Accept': 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const teams = Array.isArray(data.teams) ? data.teams : [];
    const map = {};
    teams.forEach(team => {
      const normalized = normalizeName(team.strTeam);
      if (normalized && !map[normalized]) {
        map[normalized] = team.strTeamBadge || team.strTeamLogo || team.strTeamBanner || '';
      }
    });
    leagueBadgeCache[key] = map;
    return map;
  } catch (error) {
    console.warn(`تعذر جلب شعارات ${config.name}:`, error);
    leagueBadgeCache[key] = {};
    return {};
  }
}

function mergeStaticAndLiveRows(config, liveRows, badgeMap) {
  const liveByName = new Map();
  liveRows.forEach(row => {
    liveByName.set(normalizeName(row.rawName), row);
  });

  const merged = config.teams.map((team, index) => {
    const apiName = team[0];
    const arabicName = team[1];
    const direct = liveByName.get(normalizeName(apiName));
    let matched = direct;

    if (!matched) {
      for (const [key, value] of liveByName.entries()) {
        if (key.includes(normalizeName(apiName)) || normalizeName(apiName).includes(key)) {
          matched = value;
          break;
        }
      }
    }

    const staticBadge = (STATIC_LEAGUE_LOGOS[config.logoGroup] || {})[apiName] || '';
    const badge = staticBadge || matched?.badge || badgeMap[normalizeName(apiName)] || '';
    return {
      rank: matched ? matched.rank : 0,
      apiName,
      teamName: arabicName,
      played: matched?.played ?? 0,
      wins: matched?.wins ?? 0,
      draws: matched?.draws ?? 0,
      losses: matched?.losses ?? 0,
      points: matched?.points ?? 0,
      goalsFor: matched?.goalsFor ?? 0,
      goalsAgainst: matched?.goalsAgainst ?? 0,
      badge
    };
  });

  merged.sort((a, b) => {
    if (a.points !== b.points) return b.points - a.points;
    const aDiff = a.goalsFor - a.goalsAgainst;
    const bDiff = b.goalsFor - b.goalsAgainst;
    if (aDiff !== bDiff) return bDiff - aDiff;
    if (a.goalsFor !== b.goalsFor) return b.goalsFor - a.goalsFor;
    if (a.wins !== b.wins) return b.wins - a.wins;
    return a.teamName.localeCompare(b.teamName, 'ar');
  });

  merged.forEach((row, index) => { row.rank = index + 1; });
  return merged;
}

function renderMajorLeagueTable(container, leagueId, rows) {
  const config = getLeagueConfig(leagueId);
  const updated = leagueStandingsLastUpdated[String(leagueId)];
  const updatedText = updated
    ? `آخر تحديث: ${new Date(updated).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' })}`
    : 'لم تبدأ مباريات الموسم بعد';

  const rowsHtml = rows.map(team => `
    <tr>
      <td class="epl-rank">${escapeHtml(team.rank)}</td>
      <td>
        <div class="standings-team-cell">
          <span class="standings-team-logo-wrap">
            ${team.badge
              ? `<img src="${escapeHtml(team.badge)}" alt="${escapeHtml(team.teamName)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(team.teamName)}&background=0f172a&color=ffffff&size=128&bold=true&format=png';">`
              : `<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(team.teamName)}&background=0f172a&color=ffffff&size=128&bold=true&format=png" alt="${escapeHtml(team.teamName)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">` }
            <span class="standings-team-fallback" style="display:${team.badge ? 'none' : 'flex'};">⚽</span>
          </span>
          <span class="standings-team-name">${escapeHtml(team.teamName)}</span>
        </div>
      </td>
      <td>${escapeHtml(team.played)}</td>
      <td>${escapeHtml(team.wins)}</td>
      <td>${escapeHtml(team.draws)}</td>
      <td>${escapeHtml(team.losses)}</td>
      <td>${escapeHtml(team.goalsFor)}</td>
      <td>${escapeHtml(team.goalsAgainst)}</td>
      <td class="epl-points">${escapeHtml(team.points)}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="epl-standings-shell">
      <div class="epl-standings-header">جدول ${escapeHtml(config.name)} 2026-2027</div>
      <div class="epl-standings-meta">${updatedText} • يتم التحديث تلقائيًا بعد توفر نتائج جديدة • ${rows.length} ناديًا</div>
      <div class="epl-standings-table-wrap">
        <table class="epl-standings-table major-league-table">
          <thead>
            <tr>
              <th>المركز</th><th>الفريق</th><th>لعب</th><th>فاز</th><th>تعادل</th><th>خسر</th><th>له</th><th>عليه</th><th>النقاط</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    </div>
  `;
}

async function fetchMajorLeagueStandings(leagueId, container, silent = false) {
  const id = String(leagueId);
  const config = getLeagueConfig(id);
  if (!container || !config.teams.length) return;

  const requestId = ++activeLeagueStandingsRequestId;
  if (!silent) {
    container.innerHTML = `<div style="text-align:center;padding:28px;color:var(--text-primary);">⏳ جاري تحميل ${escapeHtml(config.name)}...</div>`;
  }

  try {
    const [tableResult, badgeMap] = await Promise.allSettled([
      fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${encodeURIComponent(id)}&s=2026-2027`, {
        cache: 'no-store', headers: { 'Accept': 'application/json' }
      }).then(async response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      }),
      fetchLeagueBadges(config)
    ]);

    if (requestId !== activeLeagueStandingsRequestId) return;

    const liveData = tableResult.status === 'fulfilled' ? tableResult.value : {};
    const liveRows = normalizeLiveRows(liveData.table || liveData.standings || []);
    const badges = badgeMap.status === 'fulfilled' ? badgeMap.value : {};
    const rows = mergeStaticAndLiveRows(config, liveRows, badges);

    leagueStandingsLastUpdated[id] = Date.now();
    renderMajorLeagueTable(container, id, rows);
  } catch (error) {
    console.error(`Standings error for ${config.name}:`, error);
    const fallbackRows = buildStaticRows(config);
    renderMajorLeagueTable(container, id, fallbackRows);
  }
}

function stopLeagueStandingsAutoRefresh() {
  if (leagueStandingsRefreshTimer) {
    clearInterval(leagueStandingsRefreshTimer);
    leagueStandingsRefreshTimer = null;
  }
}

function startLeagueStandingsAutoRefresh() {
  stopLeagueStandingsAutoRefresh();
  leagueStandingsRefreshTimer = setInterval(() => {
    const detailsPage = document.getElementById('tab-league-details');
    if (detailsPage?.classList.contains('active') && activeLeagueDetailsId && activeLeagueStandingsContainer) {
      fetchMajorLeagueStandings(activeLeagueDetailsId, activeLeagueStandingsContainer, true);
    }
  }, 2 * 60 * 1000);

  if (!leagueStandingsVisibilityHandlerAttached) {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && activeLeagueDetailsId && activeLeagueStandingsContainer) {
        const detailsPage = document.getElementById('tab-league-details');
        if (detailsPage?.classList.contains('active')) {
          fetchMajorLeagueStandings(activeLeagueDetailsId, activeLeagueStandingsContainer, true);
        }
      }
    });
    leagueStandingsVisibilityHandlerAttached = true;
  }
}

function openLeagueDetails(leagueId, leagueName, pushState = true) {
  const id = String(leagueId);
  const config = getLeagueConfig(id, leagueName);
  const titleEl = document.getElementById('league-details-title');
  const container = document.getElementById('league-standings-container');
  if (!container) return;

  activeLeagueDetailsId = id;
  activeLeagueStandingsContainer = container;
  activeLeagueStandingsRequestId++;
  if (titleEl) titleEl.innerText = `ترتيب ${config.name}`;
  switchPage('league-details', 'تفاصيل الدوري', pushState);
  fetchMajorLeagueStandings(id, container, false);
  startLeagueStandingsAutoRefresh();
}

function restoreThemeState() {
  let theme = 'dark';
  let base = 'dark';
  try {
    base = localStorage.getItem('ipo_theme_base') === 'light' ? 'light' : 'dark';
    theme = localStorage.getItem('ipo_theme') || base;
  } catch (e) {}

  const user = getCurrentIPOUser();
  if (theme === 'red' && !(isVerifiedOwner(user) && Boolean(user.redThemeUnlocked))) {
    theme = base;
    try { localStorage.setItem('ipo_theme', theme); } catch (e) {}
  }
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeButtonUI();
  updateHeaderAppLogo(theme === 'light' ? 'light' : 'dark');
  updateRedThemeUI();
}

window.onload = function() {
  checkUserSession();
  restoreThemeState();
  if (!window.location.hash) history.replaceState({ tab: 'home' }, '', '#home');

};
function saveCurrentIPOUser(user) {
  return syncIPOUserEverywhere(user);
}

function getCurrentIPOUser() {
  try {
    const raw = localStorage.getItem('ipo_user_account');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {
    console.warn('تعذر قراءة حساب المستخدم المحفوظ:', e);
  }
  return {
    name: localStorage.getItem('ipo_user_name') || '',
    email: localStorage.getItem('ipo_user_email') || '',
    bio: localStorage.getItem('ipo_user_bio') || '',
    avatar: localStorage.getItem('ipo_user_avatar') || '',
    cover: localStorage.getItem('ipo_user_cover') || '',
    favTeamName: localStorage.getItem('ipo_fav_team') || '',
    favTeamLogo: localStorage.getItem('ipo_fav_team_logo') || ''
  };
}

const VERIFIED_OWNER_EMAIL = 'abdodoulat77@gmail.com';

// مزامنة بيانات الحساب في كل أماكن التخزين القديمة والجديدة حتى لا تضيع
// تغييرات الاسم أو البايو أو النادي عند إعادة فتح التطبيق.
function syncIPOUserEverywhere(user) {
  if (!user || typeof user !== 'object') return null;

  const normalized = {
    name: String(user.name || 'مستخدم IPO').trim() || 'مستخدم IPO',
    email: String(user.email || '').trim(),
    pass: user.pass || '',
    bio: String(user.bio ?? ''),
    avatar: user.avatar || 'https://i.ibb.co/6y45s1x/user.png',
    cover: user.cover || '',
    favTeamName: String(user.favTeamName || '').trim(),
    favTeamLogo: '',
    points: Math.max(0, Number.isFinite(Number(user.points)) ? Math.floor(Number(user.points)) : 0),
    animatedAvatarUnlocked: Boolean(user.animatedAvatarUnlocked),
    redThemeUnlocked: Boolean(user.redThemeUnlocked)
  };

  try {
    localStorage.setItem('ipo_user_account', JSON.stringify(normalized));
    localStorage.setItem('ipo_user_name', normalized.name);
    localStorage.setItem('ipo_user_email', normalized.email);
    localStorage.setItem('ipo_user_bio', normalized.bio);
    localStorage.setItem('ipo_user_avatar', normalized.avatar);
    localStorage.setItem('ipo_user_cover', normalized.cover);
    localStorage.setItem('ipo_fav_team', normalized.favTeamName);
    localStorage.setItem('ipo_fav_team_logo', '');

    let usersList = [];
    try {
      const parsed = JSON.parse(localStorage.getItem('ipo_users_list') || '[]');
      usersList = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      usersList = [];
    }

    if (normalized.email) {
      const index = usersList.findIndex(u => String(u?.email || '').trim().toLowerCase() === normalized.email.toLowerCase());
      if (index >= 0) {
        usersList[index] = { ...usersList[index], ...normalized };
      } else {
        usersList.push(normalized);
      }
      localStorage.setItem('ipo_users_list', JSON.stringify(usersList));
    }
  } catch (error) {
    console.error('IPO TV account sync error:', error);
  }

  return normalized;
}

function isVerifiedOwner(user = null) {
  const account = user || getCurrentIPOUser();
  return String(account?.email || '').trim().toLowerCase() === VERIFIED_OWNER_EMAIL;
}

function buildIPOProfileUser() {
  const current = getCurrentIPOUser();
  const user = {
    ...current,
    name: current.name || localStorage.getItem('ipo_user_name') || 'مستخدم IPO',
    email: current.email || localStorage.getItem('ipo_user_email') || 'user@ipotv.com',
    bio: current.bio ?? localStorage.getItem('ipo_user_bio') ?? '',
    avatar: current.avatar || localStorage.getItem('ipo_user_avatar') || 'https://i.ibb.co/6y45s1x/user.png',
    cover: current.cover || localStorage.getItem('ipo_user_cover') || '',
    favTeamName: current.favTeamName || localStorage.getItem('ipo_fav_team') || 'اختر فريقك المفضّل',
    favTeamLogo: current.favTeamLogo || localStorage.getItem('ipo_fav_team_logo') || 'https://i.ibb.co/96v5K7n/6010303610153012976-121.jpg',
    points: Math.max(0, Number.isFinite(Number(current.points)) ? Math.floor(Number(current.points)) : 0),
    animatedAvatarUnlocked: Boolean(current.animatedAvatarUnlocked),
    redThemeUnlocked: Boolean(current.redThemeUnlocked)
  };
  return user;
}

function applyIPOProfileUser(user) {
  const safeUser = user || buildIPOProfileUser();
  const displayAvatar = (!isVerifiedOwner(safeUser) && String(safeUser.avatar || '').toLowerCase().startsWith('data:image/gif'))
    ? 'https://i.ibb.co/6y45s1x/user.png'
    : (safeUser.avatar || 'https://i.ibb.co/6y45s1x/user.png');
  const owner = isVerifiedOwner(safeUser);
  const nameEl = document.getElementById('profile-name');
  const emailEl = document.getElementById('profile-email');
  const avatarEl = document.getElementById('profile-avatar');
  const miniAvatar = document.getElementById('header-mini-avatar');
  const bioEl = document.getElementById('bio-display-text');
  const teamNameEl = document.getElementById('fav-team-name-text');
  const coverEl = document.getElementById('profile-cover-bg');

  if (nameEl) {
    nameEl.innerHTML = `${escapeHTML(safeUser.name || 'مستخدم IPO')}${owner ? ' <span class="profile-verified-badge">✓ موثّق</span>' : ''}`;
  }
  if (emailEl) emailEl.textContent = safeUser.email || '';
  if (avatarEl) avatarEl.src = displayAvatar;
  if (miniAvatar) miniAvatar.src = displayAvatar;
  if (bioEl) bioEl.textContent = safeUser.bio || 'أضف نبذة تعريفية عنك...';
  if (teamNameEl) teamNameEl.textContent = safeUser.favTeamName || 'اختر فريقك المفضّل';
  updatePointsUI(safeUser.points || 0);
  updateRedThemeUI();
  const gifNote = document.querySelector('.profile-gif-note');
  if (gifNote) gifNote.textContent = owner || safeUser.animatedAvatarUnlocked
    ? '✓ ميزة GIF المتحركة مفعّلة في حسابك.'
    : 'GIF متحرك متاح بعد شراء الميزة بـ300 نقطة.';
  refreshPublicOwnerBranding();

  if (coverEl) {
    if (safeUser.cover && (safeUser.cover.startsWith('data:image') || safeUser.cover.startsWith('http'))) {
      coverEl.style.background = `url("${safeUser.cover}") center/cover no-repeat`;
    } else if (safeUser.cover) {
      coverEl.style.background = safeUser.cover;
    } else {
      coverEl.style.background = 'linear-gradient(135deg,#0f172a 0%,#1d4ed8 48%,#3b82f6 100%)';
    }
  }
}


function refreshPublicOwnerBranding() {
  const emailEl = document.getElementById('public-profile-email');
  const verifiedEl = document.getElementById('public-profile-verified');
  if (!emailEl) return;

  const isOwner = String(emailEl.textContent || '').trim().toLowerCase() === VERIFIED_OWNER_EMAIL;
  if (verifiedEl) {
    verifiedEl.classList.toggle('hidden', !isOwner);
    verifiedEl.style.display = isOwner ? 'inline-flex' : 'none';
  }
}

function watchPublicProfileBranding() {
  const emailEl = document.getElementById('public-profile-email');
  if (!emailEl || emailEl.dataset.ownerBrandingWatched === '1') return;
  emailEl.dataset.ownerBrandingWatched = '1';
  const observer = new MutationObserver(refreshPublicOwnerBranding);
  observer.observe(emailEl, { childList: true, characterData: true, subtree: true });
  refreshPublicOwnerBranding();
}

window.openPublicProfile = function(user) {
  const u = user || {};
  const cover = document.getElementById('public-profile-cover');
  const avatar = document.getElementById('public-profile-avatar');
  const name = document.getElementById('public-profile-name');
  const email = document.getElementById('public-profile-email');
  const bio = document.getElementById('public-profile-bio');
  const team = document.getElementById('public-profile-team-name');
  const verified = document.getElementById('public-profile-verified');
  if (name) name.textContent = u.name || 'مستخدم IPO';
  if (email) email.textContent = u.email || '';
  if (bio) bio.textContent = u.bio || 'لا توجد نبذة تعريفية.';
  if (team) team.textContent = u.favTeamName || 'غير محدد';
  if (avatar) avatar.src = u.avatar || 'https://i.ibb.co/6y45s1x/user.png';
  if (cover) cover.style.background = u.cover ? `url("${u.cover}") center/cover no-repeat` : 'linear-gradient(135deg,#0f172a,#2563eb)';
  const isOwner = String(u.email || '').trim().toLowerCase() === VERIFIED_OWNER_EMAIL;
  if (verified) { verified.classList.toggle('hidden', !isOwner); verified.style.display = isOwner ? 'inline-flex' : 'none'; }
  const tab = document.getElementById('tab-public-profile');
  if (tab) tab.classList.add('active');
};

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;',"\"":'&quot;'}[ch]));
}

function getPublicUsers() {
  try {
    const users = JSON.parse(localStorage.getItem('ipo_users_list') || '[]');
    return Array.isArray(users) ? users : [];
  } catch (e) {
    return [];
  }
}

function openProfileEditor(focus = '') {
  const user = buildIPOProfileUser();
  ipoProfileDraft = JSON.parse(JSON.stringify(user));
  ipoProfileEditorOpen = true;

  const modal = document.getElementById('profile-editor-modal');
  const name = document.getElementById('profile-edit-name');
  const email = document.getElementById('profile-edit-email');
  const bio = document.getElementById('profile-edit-bio');
  const avatar = document.getElementById('profile-editor-avatar-preview');
  const cover = document.getElementById('profile-editor-cover-preview');
  const team = document.getElementById('profile-editor-team-name');

  if (name) name.value = ipoProfileDraft.name || '';
  if (email) email.value = ipoProfileDraft.email || '';
  if (bio) { bio.value = ipoProfileDraft.bio || ''; updateProfileBioCounter(); }
  if (avatar) avatar.src = ipoProfileDraft.avatar || 'https://i.ibb.co/6y45s1x/user.png';
  if (cover) {
    cover.style.background = ipoProfileDraft.cover && (ipoProfileDraft.cover.startsWith('data:image') || ipoProfileDraft.cover.startsWith('http'))
      ? `url("${ipoProfileDraft.cover}") center/cover no-repeat`
      : (ipoProfileDraft.cover || 'linear-gradient(135deg,#0f172a,#2563eb)');
  }
  if (team) team.textContent = ipoProfileDraft.favTeamName || 'اختر فريقك المفضّل';

  if (modal) { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }
  if (focus === 'cover') document.getElementById('profile-cover-editor-input')?.click();
  if (focus === 'avatar') document.getElementById('profile-avatar-editor-input')?.click();
}

function closeProfileEditor() {
  const modal = document.getElementById('profile-editor-modal');
  if (modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
  ipoProfileEditorOpen = false;
  ipoProfileDraft = null;
}

function updateProfileBioCounter() {
  const input = document.getElementById('profile-edit-bio');
  const counter = document.getElementById('profile-bio-counter');
  if (input && counter) counter.textContent = input.value.length;
}

function readProfileDraftFields() {
  if (!ipoProfileDraft) ipoProfileDraft = buildIPOProfileUser();
  const name = document.getElementById('profile-edit-name');
  const bio = document.getElementById('profile-edit-bio');
  if (name) ipoProfileDraft.name = name.value.trim() || 'مستخدم IPO';
  if (bio) ipoProfileDraft.bio = bio.value.trim();
  return ipoProfileDraft;
}

function handleProfileAvatarDraft(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('الرجاء اختيار ملف صورة صالح.');
    event.target.value = '';
    return;
  }
  if (file.type === 'image/gif' && !(isVerifiedOwner() || buildIPOProfileUser().animatedAvatarUnlocked)) {
    alert('ميزة الصورة المتحركة غير مفعّلة. افتح صفحة «نقاطي» واشترِ الميزة مقابل 300 نقطة.');
    event.target.value = '';
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert('حجم الصورة يجب ألا يتجاوز 5MB.');
    event.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    if (!ipoProfileDraft) ipoProfileDraft = buildIPOProfileUser();
    ipoProfileDraft.avatar = e.target.result;
    const preview = document.getElementById('profile-editor-avatar-preview');
    if (preview) preview.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function handleProfileCoverDraft(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = e => {
    if (!ipoProfileDraft) ipoProfileDraft = buildIPOProfileUser();
    ipoProfileDraft.cover = e.target.result;
    const preview = document.getElementById('profile-editor-cover-preview');
    if (preview) preview.style.background = `url("${e.target.result}") center/cover no-repeat`;
  };
  reader.readAsDataURL(file);
}

function saveProfileChanges() {
  const user = readProfileDraftFields();
  if (!user || !user.email) {
    alert('تعذر حفظ الملف. أعد تسجيل الدخول ثم حاول مرة أخرى.');
    return;
  }

  user.name = (document.getElementById('profile-edit-name')?.value || user.name || 'مستخدم IPO').trim() || 'مستخدم IPO';
  user.bio = document.getElementById('profile-edit-bio')?.value ?? user.bio ?? '';
  user.favTeamName = String(user.favTeamName || '').trim();
  user.favTeamLogo = '';

  const saved = syncIPOUserEverywhere(user);
  if (!saved) return;

  ipoProfileDraft = JSON.parse(JSON.stringify(saved));
  applyIPOProfileUser(saved);
  closeTeamSelectorModal();
  closeProfileEditor();
  alert('تم حفظ الاسم والبايو والنادي المفضل بنجاح ✓');
}


// تحديثات التوافق مع الأزرار القديمة إن وجدت.
function updateProfileAvatar(event) { handleProfileAvatarDraft(event); }
function updateProfileCover(event) { handleProfileCoverDraft(event); }
function enableBioEdit() { openProfileEditor(); }
function cancelBioEdit() { closeProfileEditor(); }
function saveUserBio() { saveProfileChanges(); }

window.addEventListener('DOMContentLoaded', function () {
  // السماح باستخدام الأقسام العامة دون تسجيل دخول. الحساب مطلوب فقط لفتح/تعديل الملف الشخصي.
  try {
    const savedTheme = localStorage.getItem('ipo_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch (e) {}
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const textEl = document.getElementById('theme-text');
  const iconEl = document.getElementById('theme-icon-symbol');
  const appLogoImg = document.getElementById('header-app-logo');
  if (textEl) textEl.textContent = currentTheme === 'light' ? 'الوضع الفاتح' : 'الوضع الداكن';
  if (iconEl) iconEl.textContent = currentTheme === 'light' ? '☀️' : '🌙';
  if (appLogoImg) appLogoImg.src = currentTheme === 'light' ? logoLight : logoDark;

  // عند تشغيل التطبيق نبدأ دائمًا من الصفحة الرئيسية،
  // حتى لو كان المتصفح محتفظًا بهاش قديم مثل #leagues أو #auth.
  history.replaceState({ tab: 'home' }, '', '#home');
  switchPage('home', 'IPO TV', false);
  checkUserSession();
  updatePointsUI(getCurrentIPOUser().points || 0);
  updateRedThemeUI();
  watchPublicProfileBranding();

  const bio = document.getElementById('profile-edit-bio');
  if (bio) bio.addEventListener('input', updateProfileBioCounter);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && ipoProfileEditorOpen) closeProfileEditor();
  });

  const modal = document.getElementById('profile-editor-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeProfileEditor();
    });
  }
});

const logoDark = "https://i.ibb.co/96v5K7n/6010303610153012976-121.jpg";
const logoLight = "https://i.ibb.co/Xk4sF9Pp/6014807209780383184-121.jpg";

let isNavigatingBySystem = false;

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
  const currentTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', newTheme);
  try { localStorage.setItem('ipo_theme', newTheme); } catch (e) {}
  const textEl = document.getElementById('theme-text');
  const iconEl = document.getElementById('theme-icon-symbol');
  if (textEl) textEl.textContent = newTheme === 'light' ? 'الوضع الفاتح' : 'الوضع الداكن';
  if (iconEl) iconEl.textContent = newTheme === 'light' ? '☀️' : '🌙';
  const appLogoImg = document.getElementById('header-app-logo');
  if (appLogoImg) appLogoImg.src = newTheme === 'light' ? logoLight : logoDark;
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
    favTeamLogo: ""
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

function checkUserSession() {
  const isLoggedIn = localStorage.getItem('ipo_logged_in') === 'true';
  const regForm = document.getElementById('form-register');
  const loginForm = document.getElementById('form-login');
  const profileContainer = document.getElementById('user-profile-container');
  const mainTitle = document.getElementById('auth-main-title');

  if (isLoggedIn) {
    if (regForm) regForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'none';
    if (profileContainer) profileContainer.style.display = 'block';
    if (mainTitle) mainTitle.textContent = 'الملف الشخصي';

    const user = buildIPOProfileUser();
    applyIPOProfileUser(user);
  } else {
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

function openLeagueDetails(leagueId, leagueName, pushState = true) {
  document.getElementById('league-details-title').innerText = 'ترتيب ' + leagueName + ' (2026-2027)';
  const container = document.getElementById('league-standings-container');
  container.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-primary);">جاري جلب جدول الترتيب لموسم 2026-2027...</div>';
  
  switchPage('league-details', 'تفاصيل الدوري', pushState);

  const apiUrl = `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueId}&s=2026-2027`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          let tableData = data.table || data.standings || [];
          
          if (!tableData || tableData.length === 0) {
              container.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-primary);">⚠️ لا توجد بيانات متاحة لهذا الدوري حالياً.</div>';
              return;
          }

          let html = `
              <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 11px;">
                  <thead>
                      <tr style="border-bottom: 1px solid var(--card-border); opacity: 0.8;">
                          <th style="padding: 6px;">#</th>
                          <th style="padding: 6px; text-align: right;">الفريق</th>
                          <th style="padding: 6px;">لعب</th>
                          <th style="padding: 6px;">فاز</th>
                          <th style="padding: 6px;">تعادل</th>
                          <th style="padding: 6px;">خسر</th>
                          <th style="padding: 6px;">نقاط</th>
                      </tr>
                  </thead>
                  <tbody>
          `;

          tableData.forEach((item, index) => {
              let rank = item.intRank || (index + 1);
              let teamName = item.strTeam || item.team_name || 'فريق';
              let played = item.intPlayed || item.played || 0;
              let win = item.intWin || item.won || 0;
              let draw = item.intDraw || item.draw || 0;
              let loss = item.intLoss || item.lost || 0;
              let points = item.intPoints || item.points || 0;
              let badge = item.strTeamBadge || item.logo || '';

              html += `
                  <tr style="border-bottom: 1px solid var(--card-border);">
                      <td style="padding: 6px; font-weight: bold;">${rank}</td>
                      <td style="padding: 6px; text-align: right; display: flex; align-items: center; gap: 6px;">
                          ${badge ? `<img src="${badge}" style="width: 14px; height: 14px; object-fit: contain;">` : ''}
                          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 90px;">${teamName}</span>
                      </td>
                      <td style="padding: 6px;">${played}</td>
                      <td style="padding: 6px;">${win}</td>
                      <td style="padding: 6px;">${draw}</td>
                      <td style="padding: 6px;">${loss}</td>
                      <td style="padding: 6px; font-weight: bold; color: var(--accent-color);">${points}</td>
                  </tr>
              `;
          });

          html += `</tbody></table>`;
          container.innerHTML = html;
      })
      .catch(error => {
          console.error('Error fetching standings:', error);
          container.innerHTML = '<div style="text-align: center; padding: 20px; color: #ef4444;">⚠️ حدث خطأ أثناء الاتصال وجلب بيانات الترتيب. تأكد من اتصال الإنترنت.</div>';
      });
}

window.onload = function() {
  // استرجاع آخر وضع مظهر محفوظ
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('ipo_theme') === 'light' ? 'light' : 'dark'; } catch (e) {}
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeText = document.getElementById('theme-text');
  const themeIcon = document.getElementById('theme-icon-symbol');
  if (themeText) themeText.textContent = savedTheme === 'light' ? 'الوضع الفاتح' : 'الوضع الداكن';
  if (themeIcon) themeIcon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
  const appLogoImg = document.getElementById('header-app-logo');
  if (appLogoImg) appLogoImg.src = savedTheme === 'light' ? logoLight : logoDark;

  checkUserSession();
  if (!window.location.hash) history.replaceState({ tab: 'home' }, '', '#home');

  const splash = document.getElementById('app-splash');
  if (splash) setTimeout(() => splash.classList.add('is-hidden'), 1300);
};
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
    favTeamLogo: ''
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
    favTeamLogo: current.favTeamLogo || localStorage.getItem('ipo_fav_team_logo') || 'https://i.ibb.co/96v5K7n/6010303610153012976-121.jpg'
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
  if (file.type === 'image/gif' && !isVerifiedOwner()) {
    alert('ميزة الصورة المتحركة GIF متاحة للحساب الموثق فقط.');
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

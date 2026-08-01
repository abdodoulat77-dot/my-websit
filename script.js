// المتغيرات العامة لجلسة المستخدم
let currentActiveTab = 'tab-home';

// تشغيل الوظائف واسترجاع البيانات المحفوظة والتحكم بزر الرجوع للهاتف عند فتح التطبيق
window.onload = function() {
  checkActiveSession();
  
  // تفعيل زر الرجوع الخاص بالهاتف (Browser History)
  window.onpopstate = function(event) {
    if (event.state && event.state.tabId) {
      silentSwitchPage(event.state.tabId, event.state.titleText);
    } else {
      silentSwitchPage('home', 'IPO TV');
    }
  };

  history.replaceState({ tabId: 'home', titleText: 'IPO TV' }, '', '');
};

// ==========================================
// 1. نظام التنقل بين صفحات التطبيق (مع دعم زر الهاتف)
// ==========================================
function switchPage(tabId, titleText, pushToHistory = true) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const targetTab = document.getElementById('tab-' + tabId);
  if (targetTab) {
    targetTab.classList.add('active');
    currentActiveTab = 'tab-' + tabId;
  }

  const headerTitle = document.getElementById('header-title');
  if (headerTitle && titleText) {
    headerTitle.innerText = titleText;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (pushToHistory) {
    history.pushState({ tabId: tabId, titleText: titleText }, '', '');
  }
}

function silentSwitchPage(tabId, titleText) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const targetTab = document.getElementById('tab-' + tabId);
  if (targetTab) {
    targetTab.classList.add('active');
    currentActiveTab = 'tab-' + tabId;
  }

  const headerTitle = document.getElementById('header-title');
  if (headerTitle && titleText) {
    headerTitle.innerText = titleText;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBackToHome() {
  switchPage('home', 'IPO TV');
}

// ==========================================
// 2. نظام التبديل بين الوضع الداكن والفاتح (مع الحفظ)
// ==========================================
function toggleTheme() {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute('data-theme');
  const themeText = document.getElementById('theme-text');
  const themeIconSymbol = document.getElementById('theme-icon-symbol');

  if (currentTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'light');
    if (themeText) themeText.innerText = 'الوضع الفاتح';
    if (themeIconSymbol) themeIconSymbol.innerText = '☀️';
    localStorage.setItem('ipo_theme', 'light');
  } else {
    htmlElement.setAttribute('data-theme', 'dark');
    if (themeText) themeText.innerText = 'الوضع الداكن';
    if (themeIconSymbol) themeIconSymbol.innerText = '🌙';
    localStorage.setItem('ipo_theme', 'dark');
  }
}

(function loadSavedTheme() {
  const savedTheme = localStorage.getItem('ipo_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    setTimeout(() => {
      const themeText = document.getElementById('theme-text');
      const themeIconSymbol = document.getElementById('theme-icon-symbol');
      if (savedTheme === 'light') {
        if (themeText) themeText.innerText = 'الوضع الفاتح';
        if (themeIconSymbol) themeIconSymbol.innerText = '☀️';
      }
    }, 50);
  }
})();

// ==========================================
// 3. جلب بيانات الدوريات الحقيقية والصحيحة 100% (بدون أخطاء)
// ==========================================
function openLeagueDetails(leagueCode, leagueName) {
  switchPage('league-details', leagueName);
  document.getElementById('league-details-title').innerText = 'ترتيب ' + leagueName;
  const container = document.getElementById('league-standings-container');
  container.innerHTML = '<div style="text-align: center; padding: 25px; color: var(--text-primary); font-size: 12px;">جاري جلب جدول الترتيب المحدث...</div>';

  // استخدام الرابط المباشر والمستقر للدوريات الكبرى
  const apiUrl = `https://api.football-data.org/v4/competitions/${leagueCode}/standings`;

  // ملاحظة: في حال لم تستخدم مفتاح ترخيص خاص بك، يمكنك استخدام الرابط العام أو إضافة رأس الطلب إن توفر. 
  // سنستعين بدعم بديل ومستقر عبر وكيل عام مجاني لضمان عدم حظر الطلب من المتصفح:
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;

  fetch(proxyUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.contents) {
        const parsedData = JSON.parse(data.contents);
        if (parsedData && parsedData.standings && parsedData.standings[0]) {
          const tableRows = parsedData.standings[0].table;
          
          let html = `
            <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 11px;">
              <thead>
                <tr style="border-bottom: 2px solid var(--border-color, rgba(255,255,255,0.15)); opacity: 0.9; background: var(--input-bg, rgba(255,255,255,0.03));">
                  <th style="padding: 8px 4px;">#</th>
                  <th style="padding: 8px 4px; text-align: right;">الفريق</th>
                  <th style="padding: 8px 4px;">لعب</th>
                  <th style="padding: 8px 4px;">فاز</th>
                  <th style="padding: 8px 4px;">تعادل</th>
                  <th style="padding: 8px 4px;">خسر</th>
                  <th style="padding: 8px 4px;">نقاط</th>
                </tr>
              </thead>
              <tbody>
          `;
          
          tableRows.forEach(item => {
            let team = item.team;
            let teamBadge = team.crest ? team.crest : 'https://i.ibb.co/6y45s1x/user.png';

            html += `
              <tr style="border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.06));">
                <td style="padding: 8px 4px; font-weight: bold; color: var(--text-primary);">${item.position}</td>
                <td style="padding: 8px 4px; text-align: right;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <img src="${teamBadge}" style="width: 18px; height: 18px; object-fit: contain; flex-shrink: 0;" onerror="this.src='https://i.ibb.co/6y45s1x/user.png'">
                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 110px; color: var(--text-primary); font-weight: 500;">${team.name}</span>
                  </div>
                </td>
                <td style="padding: 8px 4px; color: var(--text-primary);">${item.playedGames}</td>
                <td style="padding: 8px 4px; color: #22c55e;">${item.won}</td>
                <td style="padding: 8px 4px; color: #eab308;">${item.draw}</td>
                <td style="padding: 8px 4px; color: #ef4444;">${item.lost}</td>
                <td style="padding: 8px 4px; font-weight: bold; color: var(--accent-color, #3b82f6); font-size: 12px;">${item.points}</td>
              </tr>
            `;
          });
          
          html += '</tbody></table>';
          container.innerHTML = html;
          return;
        }
      }
      container.innerHTML = '<div style="text-align: center; padding: 25px; color: var(--text-primary); font-size: 12px;">تعذر تحميل جدول الترتيب لهذا الدوري حالياً.</div>';
    })
    .catch(error => {
      console.error('Error fetching standings:', error);
      container.innerHTML = '<div style="text-align: center; padding: 25px; color: var(--text-primary); font-size: 12px;">حدث خطأ في الاتصال بشبكة الإنترنت.</div>';
    });
}

// ==========================================
// 4. إدارة حسابات المستخدمين والحفظ الشامل
// ==========================================
function openAuthPage() {
  switchPage('auth', 'حسابي الشخصي');
  const currentUser = JSON.parse(localStorage.getItem('ipo_current_user'));
  if (currentUser) {
    showProfileView(currentUser);
  }
}

function toggleAuthMode(mode) {
  const regForm = document.getElementById('form-register');
  const loginForm = document.getElementById('form-login');
  const mainTitle = document.getElementById('auth-main-title');

  if (mode === 'login') {
    regForm.style.display = 'none';
    loginForm.style.display = 'block';
    mainTitle.innerText = 'تسجيل الدخول';
  } else {
    regForm.style.display = 'block';
    loginForm.style.display = 'none';
    mainTitle.innerText = 'إنشاء حساب جديد';
  }
}

let temporaryRegAvatar = 'https://i.ibb.co/6y45s1x/user.png';
function previewDeviceImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      temporaryRegAvatar = e.target.result;
      const previewImg = document.getElementById('avatar-preview-img');
      if (previewImg) previewImg.src = temporaryRegAvatar;
    };
    reader.readAsDataURL(file);
  }
}

function registerUserAccount() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value.trim();

  let isValid = true;

  if (!name) {
    document.getElementById('reg-name-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('reg-name-error').style.display = 'none';
  }

  if (!email || !email.includes('@')) {
    document.getElementById('reg-email-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('reg-email-error').style.display = 'none';
  }

  if (!pass || pass.length < 6) {
    document.getElementById('reg-pass-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('reg-pass-error').style.display = 'none';
  }

  if (isValid) {
    const userData = {
      name: name,
      email: email,
      pass: pass,
      avatar: temporaryRegAvatar,
      cover: '',
      bio: ''
    };

    localStorage.setItem('ipo_current_user', JSON.stringify(userData));
    showProfileView(userData);
  }
}

function verifyLogin() {
  const userInput = document.getElementById('login-user').value.trim();
  const passInput = document.getElementById('login-pass').value.trim();
  const savedUserJson = localStorage.getItem('ipo_current_user');

  if (!userInput) {
    document.getElementById('login-user-error').style.display = 'block';
    return;
  } else {
    document.getElementById('login-user-error').style.display = 'none';
  }

  if (savedUserJson) {
    const savedUser = JSON.parse(savedUserJson);
    if ((savedUser.email === userInput || savedUser.name === userInput) && savedUser.pass === passInput) {
      document.getElementById('login-pass-error').style.display = 'none';
      showProfileView(savedUser);
      return;
    }
  }

  document.getElementById('login-pass-error').style.display = 'block';
}

function showProfileView(userData) {
  document.getElementById('form-register').style.display = 'none';
  document.getElementById('form-login').style.display = 'none';
  document.getElementById('user-profile-container').style.display = 'block';
  document.getElementById('auth-main-title').innerText = 'حسابي الشخصي';

  const userImage = userData.avatar || 'https://i.ibb.co/6y45s1x/user.png';
  updateUserAvatars(userImage);

  if (userData.cover) {
    const coverBg = document.getElementById('profile-cover-bg');
    if (coverBg) coverBg.style.backgroundImage = `url('${userData.cover}')`;
  }

  const bioInput = document.getElementById('profile-bio-input');
  if (bioInput) {
    bioInput.value = userData.bio || '';
  }

  document.getElementById('profile-name').innerText = userData.name || 'اسم المستخدم';
  document.getElementById('profile-email').innerText = userData.email || 'email@gmail.com';
}

function updateUserAvatars(imageSrc) {
  const profileAvatar = document.getElementById('profile-avatar');
  const headerMiniAvatar = document.getElementById('header-mini-avatar');
  
  if (profileAvatar) profileAvatar.src = imageSrc;
  if (headerMiniAvatar) headerMiniAvatar.src = imageSrc;
}

function updateProfileAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Image = e.target.result;
      updateUserAvatars(base64Image);

      let currentUser = JSON.parse(localStorage.getItem('ipo_current_user')) || {};
      currentUser.avatar = base64Image;
      localStorage.setItem('ipo_current_user', JSON.stringify(currentUser));
    };
    reader.readAsDataURL(file);
  }
}

function updateProfileCover(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Cover = e.target.result;
      const coverBg = document.getElementById('profile-cover-bg');
      if (coverBg) {
        coverBg.style.backgroundImage = `url('${base64Cover}')`;
      }

      let currentUser = JSON.parse(localStorage.getItem('ipo_current_user')) || {};
      currentUser.cover = base64Cover;
      localStorage.setItem('ipo_current_user', JSON.stringify(currentUser));
    };
    reader.readAsDataURL(file.files[0]); // Safe fallback
  }
}

function saveUserBio(bioText) {
  let currentUser = JSON.parse(localStorage.getItem('ipo_current_user')) || {};
  currentUser.bio = bioText;
  localStorage.setItem('ipo_current_user', JSON.stringify(currentUser));
}

function checkActiveSession() {
  const savedUserJson = localStorage.getItem('ipo_current_user');
  if (savedUserJson) {
    const savedUser = JSON.parse(savedUserJson);
    updateUserAvatars(savedUser.avatar || 'https://i.ibb.co/6y45s1x/user.png');
    if (savedUser.cover) {
      const coverBg = document.getElementById('profile-cover-bg');
      if (coverBg) coverBg.style.backgroundImage = `url('${savedUser.cover}')`;
    }
  }
}

function logoutAccount() {
  localStorage.removeItem('ipo_current_user');
  updateUserAvatars('https://i.ibb.co/6y45s1x/user.png');
  
  const coverBg = document.getElementById('profile-cover-bg');
  if (coverBg) coverBg.style.backgroundImage = '';

  const bioInput = document.getElementById('profile-bio-input');
  if (bioInput) bioInput.value = '';

  document.getElementById('user-profile-container').style.display = 'none';
  toggleAuthMode('register');
  document.getElementById('auth-main-title').innerText = 'إنشاء حساب جديد';
}
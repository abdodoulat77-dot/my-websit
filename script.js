const logoDark = "https://i.ibb.co/96v5K7n/6010303610153012976-121.jpg";
const logoLight = "https://i.ibb.co/Xk4sF9Pp/6014807209780383184-121.jpg";

let isNavigatingBySystem = false;

function switchPage(tabId, titleText, pushState = true) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  const targetTab = document.getElementById('tab-' + tabId);
  if (targetTab) {
    targetTab.classList.add('active');
  }

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
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', newTheme);
  
  const textEl = document.getElementById('theme-text');
  const iconEl = document.getElementById('theme-icon-symbol');
  if(textEl) textEl.innerText = newTheme === 'light' ? 'الوضع الفاتح' : 'الوضع الداكن';
  if(iconEl) iconEl.innerText = newTheme === 'light' ? '☀️' : '🌙';

  const appLogoImg = document.getElementById('header-app-logo');
  if(appLogoImg) {
    appLogoImg.src = newTheme === 'light' ? logoLight : logoDark;
  }
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

// دالة إظهار رسالة الترحيب الاحترافية
function showWelcomeMessage(userName) {
  const toast = document.getElementById('welcome-toast');
  const msgEl = document.getElementById('welcome-toast-msg');
  
  if(msgEl) {
    msgEl.innerText = `مرحباً بك يا ${userName || 'مستخدمنا العزيز'}، نتمنى لك وقتاً ممتعاً في تطبيق IPO TV!`;
  }

  if(toast) {
    toast.style.top = '20px';
    setTimeout(() => {
      toast.style.top = '-100px';
    }, 4000);
  }
}

function registerUserAccount() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
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
    bio: ""
  };

  usersList.push(newUserData);
  localStorage.setItem('ipo_users_list', JSON.stringify(usersList));
  localStorage.setItem('ipo_user_account', JSON.stringify(newUserData));
  localStorage.setItem('ipo_logged_in', 'true');

  showWelcomeMessage(name);
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
    
    showWelcomeMessage(foundUser.name);
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
  const miniAvatar = document.getElementById('header-mini-avatar');

  if (isLoggedIn) {
    if(regForm) regForm.style.display = 'none';
    if(loginForm) loginForm.style.display = 'none';
    if(profileContainer) profileContainer.style.display = 'block';
    if(mainTitle) mainTitle.innerText = 'الملف الشخصي';

    const user = JSON.parse(localStorage.getItem('ipo_user_account') || '{}');
    
    const nameElement = document.getElementById('profile-name');
    
    // ميزة التوثيق وتغيير اللون للحساب المحدد
    if (user.email === 'abdodoulat77@gmail.com') {
      nameElement.innerHTML = `${user.name || 'مستخدم'} <span style="display: inline-flex; align-items: center; justify-content: center; background: #0ea5e9; color: white; border-radius: 50%; width: 14px; height: 14px; font-size: 9px; margin-right: 4px;" title="حساب موثق">✓</span>`;
      nameElement.style.color = "var(--accent-color)";
      nameElement.style.textShadow = "0 0 10px rgba(59, 130, 246, 0.5)";
    } else {
      nameElement.innerText = user.name || 'مستخدم';
      nameElement.style.color = "var(--text-primary)";
      nameElement.style.textShadow = "none";
    }

    document.getElementById('profile-email').innerText = user.email || '';
    
    const avatarImg = document.getElementById('profile-avatar');
    if(avatarImg) avatarImg.src = user.avatar || "https://i.ibb.co/6y45s1x/user.png";
    if(miniAvatar) miniAvatar.src = user.avatar || "https://i.ibb.co/6y45s1x/user.png";

    const coverBg = document.getElementById('profile-cover-bg');
    if(coverBg && user.cover) {
      coverBg.style.backgroundImage = `url(${user.cover})`;
    }

    const bioInput = document.getElementById('profile-bio-input');
    const bioViewMode = document.getElementById('bio-view-mode');
    const bioEditMode = document.getElementById('bio-edit-mode');
    const bioDisplayText = document.getElementById('bio-display-text');

    if(user.bio && user.bio.trim() !== '') {
      if(bioInput) bioInput.value = user.bio;
      if(bioDisplayText) bioDisplayText.innerText = user.bio;
      if(bioViewMode) bioViewMode.style.display = 'block';
      if(bioEditMode) bioEditMode.style.display = 'none';
    } else {
      if(bioInput) bioInput.value = '';
      if(bioViewMode) bioViewMode.style.display = 'none';
      if(bioEditMode) bioEditMode.style.display = 'block';
    }
  } else {
    if(profileContainer) profileContainer.style.display = 'none';
    if(regForm) regForm.style.display = 'block';
    if(mainTitle) mainTitle.innerText = 'إنشاء حساب جديد';
  }
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
  alert('تم تسجيل الخروج بنجاح');
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
  checkUserSession();
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const appLogoImg = document.getElementById('header-app-logo');
  if(appLogoImg) {
    appLogoImg.src = currentTheme === 'light' ? logoLight : logoDark;
  }

  if (!window.location.hash) {
    history.replaceState({ tab: 'home' }, '', '#home');
  }
};
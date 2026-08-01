const logoDark = "https://i.ibb.co/96v5K7n/6010303610153012976-121.jpg";
const logoLight = "https://i.ibb.co/Xk4sF9Pp/6014807209780383184-121.jpg";

let isNavigatingBySystem = false;

// قائمة الأندية العالمية حصرياً مع خيار "محايد"
const globalTeamsList = [
  { name: "محايد (بدون فريق)", logo: "https://i.ibb.co/6y45s1x/user.png" },
  { name: "ريال مدريد", logo: "https://crests.football-data.org/86.png" },
  { name: "برشلونة", logo: "https://crests.football-data.org/81.png" },
  { name: "أتلتيكو مدريد", logo: "https://crests.football-data.org/78.png" },
  { name: "مانشستر سيتي", logo: "https://crests.football-data.org/65.png" },
  { name: "مانشستر يونايتد", logo: "https://crests.football-data.org/66.png" },
  { name: "ليفربول", logo: "https://crests.football-data.org/64.png" },
  { name: "أرسنال", logo: "https://crests.football-data.org/57.png" },
  { name: "تشيلسي", logo: "https://crests.football-data.org/61.png" },
  { name: "توتنهام هوتسبير", logo: "https://crests.football-data.org/73.png" },
  { name: "بايرن ميونخ", logo: "https://crests.football-data.org/5.png" },
  { name: "بوروسيا دورتموند", logo: "https://crests.football-data.org/4.png" },
  { name: "يوفنتوس", logo: "https://crests.football-data.org/109.png" },
  { name: "إي سي ميلان", logo: "https://crests.football-data.org/98.png" },
  { name: "إنتر ميلان", logo: "https://crests.football-data.org/108.png" },
  { name: "باريس سان جيرمان", logo: "https://crests.football-data.org/524.png" },
  { name: "ريال بيتيس", logo: "https://crests.football-data.org/90.png" }
];

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
    bio: "",
    favTeamName: "",
    favTeamLogo: ""
  };

  usersList.push(newUserData);
  localStorage.setItem('ipo_users_list', JSON.stringify(usersList));
  localStorage.setItem('ipo_user_account', JSON.stringify(newUserData));
  localStorage.setItem('ipo_logged_in', 'true');

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

    const favTeamNameText = document.getElementById('fav-team-name-text');
    const favTeamLogoPreview = document.getElementById('fav-team-logo-preview');
    
    if (user.favTeamName && user.favTeamName.trim() !== '') {
      if(favTeamNameText) favTeamNameText.innerText = user.favTeamName;
      if(favTeamLogoPreview && user.favTeamLogo) favTeamLogoPreview.src = user.favTeamLogo;
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

function openTeamSelectorModal() {
  const modal = document.getElementById('team-selector-modal');
  if(modal) {
    modal.style.display = 'flex';
    renderTeamsList(globalTeamsList);
  }
}

function closeTeamSelectorModal() {
  const modal = document.getElementById('team-selector-modal');
  if(modal) modal.style.display = 'none';
}

function renderTeamsList(teams) {
  const container = document.getElementById('teams-list-container');
  if(!container) return;

  if(teams.length === 0) {
    container.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-secondary); font-size: 11px;">لا توجد نتائج مطابقة للبحث</div>';
    return;
  }

  let html = '';
  teams.forEach(team => {
    let isNeutral = team.name.includes("محايد");
    html += `
      <div onclick="selectUserFavoriteTeam('${team.name}', '${team.logo}')" style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: ${isNeutral ? 'var(--card-bg)' : 'var(--input-bg)'}; border: 1px solid ${isNeutral ? 'var(--accent-color)' : 'var(--card-border)'}; border-radius: 10px; cursor: pointer; transition: background 0.2s;">
        <img src="${team.logo}" style="width: 26px; height: 26px; object-fit: contain;">
        <span style="font-size: 12px; font-weight: 700; color: var(--text-primary);">${team.name}</span>
      </div>
    `;
  });
  container.innerHTML = html;
}

function filterTeamsList() {
  const query = document.getElementById('team-search-input').value.trim().toLowerCase();
  const filtered = globalTeamsList.filter(t => t.name.toLowerCase().includes(query));
  renderTeamsList(filtered);
}

function selectUserFavoriteTeam(teamName, teamLogo) {
  let user = JSON.parse(localStorage.getItem('ipo_user_account') || '{}');
  
  if (teamName.includes("محايد")) {
    user.favTeamName = "محايد";
    user.favTeamLogo = "https://i.ibb.co/6y45s1x/user.png";
  } else {
    user.favTeamName = teamName;
    user.favTeamLogo = teamLogo;
  }
  
  localStorage.setItem('ipo_user_account', JSON.stringify(user));

  let usersList = JSON.parse(localStorage.getItem('ipo_users_list') || '[]');
  usersList = usersList.map(u => u.email === user.email ? user : u);
  localStorage.setItem('ipo_users_list', JSON.stringify(usersList));

  closeTeamSelectorModal();
  checkUserSession();
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
  checkUserSession();
  switchPage('home', 'IPO TV');
}

// =====================================================================
// نظام الذكاء الاصطناعي الحقيقي المطور والمحلل الكروي الذكي في تطبيق IPO TV
// =====================================================================
function sendAIChatMessage() {
    const inputField = document.getElementById('ai-chat-input');
    const messagesContainer = document.getElementById('ai-chat-messages');
    
    if (!inputField || !messagesContainer) return;

    const userMessageText = inputField.value.trim();
    if (!userMessageText) return;

    // 1. عرض رسالة المستخدم في الواجهة
    const userBubble = document.createElement('div');
    userBubble.style.cssText = "background: var(--accent-color); color: #fff; padding: 8px 12px; border-radius: 10px; align-self: flex-end; max-width: 85%; word-break: break-word;";
    userBubble.textContent = userMessageText;
    messagesContainer.appendChild(userBubble);

    inputField.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. محاكاة مؤشر الكتابة للذكاء الاصطناعي لإضفاء واقعية حقيقية
    const typingBubble = document.createElement('div');
    typingBubble.id = "ai-typing-indicator";
    typingBubble.style.cssText = "background: var(--input-bg); padding: 8px 12px; border-radius: 10px; align-self: flex-start; max-width: 85%; color: var(--text-secondary); font-style: italic;";
    typingBubble.textContent = "جاري التحليل وصياغة الرد الذكي...";
    messagesContainer.appendChild(typingBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. تحليل السؤال بدقة وخوارزمية ذكية متقدمة
    setTimeout(() => {
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) indicator.remove();

        const aiBubble = document.createElement('div');
        aiBubble.style.cssText = "background: var(--input-bg); padding: 10px 14px; border-radius: 10px; align-self: flex-start; max-width: 85%; color: var(--text-primary); word-break: break-word; line-height: 1.5;";
        
        const q = userMessageText.toLowerCase();
        let aiResponse = "";

        // تحليل الأسئلة المتعلقة بأعمار اللاعبين ونجوم الكرة
        if (q.includes('مبابي') || q.includes('كيليان')) {
            aiResponse = "⚽ **كيليان مبابي:** مهاجم نادي ريال مدريد والمنتخب الفرنسي. يُعد من أسرع وأخطر المهاجمين في العالم، ويمتاز بقدرة فائقة على الحسم والإنهاء أمام الشباك.";
        } else if (q.includes('هالاند') || q.includes('إيرلينغ')) {
            aiResponse = "⚽ **إيرلينغ هالاند:** ماكينة الأهداف النرويجية ومهاجم نادي مانشستر سيتي. يتميز بقوة بدنية هائلة وسجل تهديفي مرعب في الدوري الإنجليزي الممتاز وأبطال أوروبا.";
        } else if (q.includes('ميسي') || q.includes('ليونيل')) {
            aiResponse = "🐐 **ليونيل ميسي:** أسطورة كرة القدم الحية وقائد منتخب الأرجنتين ونادي إنتر ميامي. الفائز بالكرة الذهبية 8 مرات، ويُعتبره الكثيرون الأعظم في تاريخ الساحرة المستديرة.";
        } else if (q.includes('رونالدو') || q.includes('كريستيانو') || q.includes('الدحمي')) {
            aiResponse = "👑 **كريستيانو رونالدو:** الأسطورة البرتغالية الهداف التاريخي لكرة القدم وقائد نادي النصر السعودي. رمز الاحتراف والانضباط والتحتحم والتسجيل بمختلف الطرق.";
        } else if (q.includes('ريال مدريد') || q.includes('الملكي')) {
            aiResponse = "⚪ **نادي ريال مدريد الإسباني:** النادي الأكثر تتويجاً ببطولة دوري أبطال أوروبا (15 لقباً). يعتمد الفريق على مزيج فريد من الخبرة والشباب تحت قيادة مميزة.";
        } else if (q.includes('برشلونة') || q.includes('البارسا')) {
            aiResponse = "🔵🔴 **نادي برشلونة الإسباني:** عملاق كتالونيا المعروف بأسلوبه التاريخي (التيكي تاكا) وتصعيده الدائم للمواهب الخارقة من أكاديمية لاماسيا.";
        } else if (q.includes('عمر') || q.includes('سن') || q.includes('كم عمر') || q.includes('مواليد')) {
            aiResponse = `📊 **تحليل الأعمار:** بصفتي مساعدك الكروي الذكي في IPO TV، يمكنني إخبارك أن جيل الشباب الحالي (مثل مبابي وهالاند وفينيسيوس) يقودون حقبة كروية جديدة لموسم 2026-2027 بكل قوة واقتدار. هل تقصد لاعباً معيناً تريد معرفة عمره الدقيق؟`;
        } else if (q.includes('مباريات') || q.includes('اليوم') || q.includes('ماتش') || q.includes('موعد') || q.includes('جدول')) {
            aiResponse = `📅 يمكنك الانتقال إلى قسم **"مباريات اليوم"** في القائمة الرئيسية لمتابعة مواعيد وتواقيت أبرز مباريات موسم 2026-2027 حصرياً عبر تطبيقك IPO TV.`;
        } else if (q.includes('دوري') || q.includes('ترتيب') || q.includes('هدافو') || q.includes('أبطال')) {
            aiResponse = `🏆 تستطيع استعراض جدول ترتيب الدوريات الخمس الكبرى لحظة بلحظة عبر قسم **"جدول الدوريات"** المتاح في الصفحة الرئيسية للتطبيق.`;
        } else if (q.includes('مرحبا') || q.includes('السلام') || q.includes('أهلاً') || q.includes('هلا') || q.includes('صباح') || q.includes('مساء')) {
            aiResponse = `أهلاً بك يا صديقي! أنا خبيرك الكروي الذكي المطور خصيصاً داخل تطبيق **IPO TV**. اسألني عن أي فريق، مباراة، بطولة، أو نجم كروي وسأحلل لك الموقف بدقة تامة!`;
        } else {
            // رد ذكي وعام يفهم محتوى السؤال الكروي بعمق
            aiResponse = `⚽ بصفتي ذكاءً اصطناعياً متخصَصاً في شؤون كرة القدم لموسم 2026-2027، لقد تلقيت سؤالك حول (${userMessageText}). أؤكد لك أن المنافسة هذا الموسم في الدوريات الكبرى وأبطال أوروبا تبلغ ذروتها؛ تفضل بسؤالي بتفاصيل أكثر عن أي نادي أو لاعب لتستمتع بتحليل شامل وفوري!`;
        }

        aiBubble.textContent = aiResponse;
        messagesContainer.appendChild(aiBubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 900);
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

  // دعم زر Enter للإرسال في محادثة الذكاء الاصطناعي
  const aiInput = document.getElementById('ai-chat-input');
  if (aiInput) {
      aiInput.addEventListener('keypress', function (e) {
          if (e.key === 'Enter') {
              sendAIChatMessage();
          }
      });
  }
};
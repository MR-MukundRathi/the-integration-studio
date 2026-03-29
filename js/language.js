/* ============================================
   THE INTEGRATION STUDIO — Language Switcher
   ============================================ */

// Language configuration
const LANGUAGE_CONFIG = {
  default: 'en',
  supported: ['en', 'de'],
  pages: {
    'index': { en: 'index-en.html', de: 'index-de.html' },
    'organisationen': { en: 'organisationen-en.html', de: 'organisationen-de.html' },
    'workshops': { en: 'workshops-en.html', de: 'workshops-de.html' },
    'ueber': { en: 'ueber-en.html', de: 'ueber-de.html' }
  }
};

// Get current language from URL
function getCurrentLanguage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();

  if (filename.includes('-en.html')) return 'en';
  if (filename.includes('-de.html')) return 'de';

  // Check localStorage for user preference
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang && LANGUAGE_CONFIG.supported.includes(savedLang)) {
    return savedLang;
  }

  return LANGUAGE_CONFIG.default;
}

// Get current page name (without language suffix)
function getCurrentPageName() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();

  // Remove -en.html or -de.html suffix
  let pageName = filename.replace(/-en\.html$/, '').replace(/-de\.html$/, '').replace(/\.html$/, '');

  // Handle index/home
  if (!pageName || pageName === 'index') {
    return 'index';
  }

  return pageName;
}

// Switch to a specific language
function switchLanguage(targetLang) {
  if (!LANGUAGE_CONFIG.supported.includes(targetLang)) {
    console.error(`Language ${targetLang} not supported`);
    return;
  }

  const currentPage = getCurrentPageName();
  const pageConfig = LANGUAGE_CONFIG.pages[currentPage];

  if (!pageConfig) {
    console.error(`Page ${currentPage} not configured for i18n`);
    return;
  }

  const targetFile = pageConfig[targetLang];
  if (!targetFile) {
    console.error(`No ${targetLang} version for page ${currentPage}`);
    return;
  }

  // Save preference
  localStorage.setItem('preferredLanguage', targetLang);

  // Redirect
  window.location.href = targetFile + window.location.hash;
}

// Set active language button
function updateLanguageButtons() {
  const currentLang = getCurrentLanguage();
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Initialize language switcher
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      switchLanguage(targetLang);
    });
  });

  // Update active state
  updateLanguageButtons();
}

// Auto-redirect on load if needed
function handleLanguageRedirect() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();

  // If on a non-suffixed page (like index.html), redirect to preferred language
  if (filename === 'index.html' || filename === '' || !filename.includes('-')) {
    const preferredLang = getCurrentLanguage();
    const pageName = getCurrentPageName();
    const pageConfig = LANGUAGE_CONFIG.pages[pageName];

    if (pageConfig && pageConfig[preferredLang]) {
      window.location.replace(pageConfig[preferredLang]);
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  handleLanguageRedirect();
  initLanguageSwitcher();
});

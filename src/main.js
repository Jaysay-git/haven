import { store } from './utils/state.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { LandingPage } from './components/LandingPage.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';
import { OtpVerification } from './components/OtpVerification.js';
import { IdVerification } from './components/IdVerification.js';
import { VerificationDashboard } from './components/VerificationDashboard.js';
import { ProfileWizard } from './components/ProfileWizard.js';

// Router function to mount pages
function router() {
  const state = store.getState();
  const hash = window.location.hash || '#landing';
  let page = hash.substring(1);

  if (page.includes('?')) {
    page = page.split('?')[0];
  }

  // Auth Protection Guard
  const authRequiredPages = ['verify', 'dashboard', 'profile-wizard'];
  if (authRequiredPages.includes(page) && !state.user) {
    window.location.hash = 'login';
    return;
  }

  // Force profile completion if logged in but incomplete
  if (state.user && !state.user.profileComplete && page !== 'profile-wizard') {
    window.location.hash = 'profile-wizard';
    return;
  }

  // Set current page state
  state.currentPage = page;

  const appEl = document.getElementById('app');
  if (!appEl) return;

  // Render Shell Framework
  appEl.innerHTML = `
    ${Navbar()}
    <main id="main-content"></main>
    ${Footer()}
  `;

  const mainEl = document.getElementById('main-content');
  if (!mainEl) return;

  // Mount specific route component
  switch (page) {
    case 'landing':
      mainEl.innerHTML = LandingPage();
      break;
    case 'register':
      mainEl.innerHTML = Register();
      break;
    case 'login':
      mainEl.innerHTML = Login();
      break;
    case 'otp':
      mainEl.innerHTML = OtpVerification();
      break;
    case 'verify':
      mainEl.innerHTML = IdVerification();
      break;
    case 'dashboard':
      mainEl.innerHTML = VerificationDashboard();
      break;
    case 'profile-wizard':
      mainEl.innerHTML = ProfileWizard();
      break;
    default:
      mainEl.innerHTML = LandingPage();
  }

  // Scroll to top on navigation
  window.scrollTo(0, 0);
}

// Subscribe to store updates for automatic reactive re-renders
store.subscribe(() => {
  router();
});

// Bind window event listeners
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

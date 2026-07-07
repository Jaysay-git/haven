import { store } from '../utils/state.js';

export function Navbar() {
  const state = store.getState();
  const user = state.user;

  const logoSvg = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L2 14h4v14h7v-8h6v8h7V14h4L16 2z"/>
    </svg>
  `;

  let actionButtons = '';
  if (user) {
    actionButtons = `
      <span class="user-badge" style="font-weight: 600; color: var(--primary); margin-right: 12px;">
        👋 Hello, ${user.name || 'User'} (${user.userType})
      </span>
      <button class="btn btn-outline" id="nav-logout-btn" style="padding: 8px 16px;">Logout</button>
    `;
  } else {
    actionButtons = `
      <a href="#login" class="btn btn-outline" style="padding: 8px 20px;">Login</a>
      <a href="#register" class="btn btn-primary" style="padding: 8px 20px; margin-left: 12px;">Get Verified</a>
    `;
  }

  let navLinks = '';
  if (user) {
    navLinks = `
      <li><a href="#dashboard" class="nav-link ${state.currentPage === 'dashboard' ? 'active' : ''}">Dashboard</a></li>
      <li><a href="#verify" class="nav-link ${state.currentPage === 'verify' ? 'active' : ''}">Identity Center</a></li>
      <li><a href="#profile-wizard" class="nav-link ${state.currentPage === 'profile-wizard' ? 'active' : ''}">Profile Setup</a></li>
    `;
  } else {
    navLinks = `
      <li><a href="#landing" class="nav-link ${state.currentPage === 'landing' ? 'active' : ''}">Home</a></li>
      <li><a href="#features" class="nav-link">Features</a></li>
      <li><a href="#faq" class="nav-link">FAQ</a></li>
    `;
  }

  const html = `
    <header class="header-nav">
      <div class="container navbar-container">
        <a href="#landing" class="brand-logo">
          ${logoSvg}
          <span>HAVEN</span>
        </a>
        <nav>
          <ul class="nav-links">
            ${navLinks}
          </ul>
        </nav>
        <div class="nav-ctas">
          ${actionButtons}
        </div>
        <button class="nav-hamburger" aria-label="Toggle Menu" id="nav-toggle">
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Drawer -->
      <div id="mobile-menu" style="display: none; background-color: var(--white); padding: 16px; border-bottom: 1.5px solid var(--neutral-200);">
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px;">
          ${navLinks}
        </ul>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${actionButtons}
        </div>
      </div>
    </header>
  `;

  // Attach navbar interaction events after rendering
  setTimeout(() => {
    const logoutBtn = document.getElementById('nav-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        store.setState({ user: null, currentPage: 'landing' });
        window.location.hash = 'landing';
      });
    }

    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (navToggle && mobileMenu) {
      navToggle.addEventListener('click', () => {
        const isHidden = mobileMenu.style.display === 'none';
        mobileMenu.style.display = isHidden ? 'block' : 'none';
      });
    }
  }, 0);

  return html;
}

// Forgot Password Screen
export const ForgotPassword = {
  render(state) {
    const activeTab = state.loginTab || 'email';

    return `
      <div class="auth-wrapper flex-center">
        <div class="card auth-card animate-slide-up">
          <div class="auth-header">
            <span class="section-tag">Account Security</span>
            <h2 style="margin-top: 12px;">Recover Password</h2>
            <p class="text-sm text-muted" style="margin-top: 8px;">Enter your registered contact details below, and we will send a password restoration code.</p>
          </div>

          <div class="auth-tabs">
            <button class="auth-tab ${activeTab === 'email' ? 'active' : ''}" id="tab-fp-email" data-tab="email">Recover via Email</button>
            <button class="auth-tab ${activeTab === 'phone' ? 'active' : ''}" id="tab-fp-phone" data-tab="phone">Recover via Phone</button>
          </div>

          <form id="forgot-password-form" novalidate>
            <!-- Dynamic Coordinate Field -->
            ${activeTab === 'email' ? `
              <div class="form-group">
                <label class="form-label" for="fp-email">Security Email Address</label>
                <input class="form-input" type="email" id="fp-email" placeholder="name@domain.com" required>
                <span class="form-error" id="error-fp-email"></span>
              </div>
            ` : `
              <div class="form-group">
                <label class="form-label" for="fp-phone">Registered Phone Number</label>
                <div style="display:flex; gap:8px;">
                  <span class="form-input" style="width:70px; background:#F3F4F6; display:flex; align-items:center; justify-content:center; border:1px solid #D1CDCA; border-radius:12px; font-weight:bold;">+234</span>
                  <input class="form-input" type="tel" id="fp-phone" placeholder="8012345678" style="flex:1;" required>
                </div>
                <span class="form-error" id="error-fp-phone"></span>
              </div>
            `}

            <button type="submit" class="btn btn-primary" style="width:100%; margin-top: 12px;">Send Recovery Code</button>
          </form>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(13, 27, 75, 0.05); font-size: var(--font-caption);">
            <p class="text-muted">Remembered your password? <a href="#" class="auth-link" id="fp-go-back">Go to Login</a></p>
          </div>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // 1. Tab switches
    document.getElementById('tab-fp-email')?.addEventListener('click', () => {
      updateState({ loginTab: 'email' });
      navigateTo('forgot-password');
    });
    document.getElementById('tab-fp-phone')?.addEventListener('click', () => {
      updateState({ loginTab: 'phone' });
      navigateTo('forgot-password');
    });

    // 2. Go back link
    document.getElementById('fp-go-back')?.addEventListener('click', (e) => {
      e.preventDefault();
      const role = state.preselectedRole === 'Landlord' || state.preselectedRole === 'Agent' ? 'landlord-login' : 'login';
      navigateTo(role);
    });

    // 3. Form submit & verification dispatch
    const form = document.getElementById('forgot-password-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const tab = state.loginTab || 'email';
      // Clear errors
      document.querySelectorAll('.form-error').forEach(el => el.innerText = '');
      document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

      let isValid = true;
      let targetCoordinate = '';

      if (tab === 'email') {
        const emailEl = document.getElementById('fp-email');
        const email = emailEl.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          document.getElementById('error-fp-email').innerText = 'Email address is required';
          emailEl.classList.add('error');
          isValid = false;
        } else if (!emailRegex.test(email)) {
          document.getElementById('error-fp-email').innerText = 'Please enter a valid email address';
          emailEl.classList.add('error');
          isValid = false;
        } else {
          targetCoordinate = email;
        }
      } else {
        const phoneEl = document.getElementById('fp-phone');
        const phone = phoneEl.value.trim();
        const phoneRegex = /^[789][01]\d{8}$/;
        if (!phone) {
          document.getElementById('error-fp-phone').innerText = 'Phone number is required';
          phoneEl.classList.add('error');
          isValid = false;
        } else if (!phoneRegex.test(phone)) {
          document.getElementById('error-fp-phone').innerText = 'Enter a valid 10-digit number (e.g. 8012345678)';
          phoneEl.classList.add('error');
          isValid = false;
        } else {
          targetCoordinate = `+234${phone}`;
        }
      }

      if (!isValid) return;

      // Mock success dispatch state
      updateState({
        recoveryContact: targetCoordinate,
        recoveryMethod: tab
      });

      alert(`A 6-digit password verification security code [123456] was sent to ${targetCoordinate}.`);
      navigateTo('reset-password');
    });
  }
};

// Landlord Registration Screen
export const LandlordRegister = {
  render(state) {
    const activeRole = state.preselectedRole === 'Agent' ? 'Agent' : 'Landlord';
    const activeTab = state.registerTab || 'email'; // 'email' or 'phone'

    return `
      <div class="auth-wrapper flex-center">
        <div class="card auth-card animate-slide-up">
          <div class="auth-header">
            <span class="section-tag">Landlord Onboarding</span>
            <h2 style="margin-top: 12px;">Create Your Account</h2>
            <p class="text-sm text-muted" style="margin-top: 8px;">List properties, run AI-driven qualification assessments, and safeguard lease transactions.</p>
          </div>
          
          <div class="auth-tabs">
            <button class="auth-tab ${activeTab === 'email' ? 'active' : ''}" id="tab-ll-reg-email" data-tab="email">Email Signup</button>
            <button class="auth-tab ${activeTab === 'phone' ? 'active' : ''}" id="tab-ll-reg-phone" data-tab="phone">Phone Signup</button>
          </div>

          <form id="ll-register-form" novalidate>
            <!-- Select Landlord/Agent Type -->
            <div class="form-group">
              <label class="form-label">Account Role</label>
              <div class="user-type-grid">
                <label class="user-type-card ${activeRole === 'Landlord' ? 'active' : ''}" data-role="Landlord" id="card-ll-role-landlord">
                  <input type="radio" name="llRole" value="Landlord" ${activeRole === 'Landlord' ? 'checked' : ''}>
                  <span class="user-type-title">Individual/Corporate Landlord</span>
                  <span class="user-type-desc">Own properties and seek verified tenants.</span>
                </label>
                <label class="user-type-card ${activeRole === 'Agent' ? 'active' : ''}" data-role="Agent" id="card-ll-role-agent">
                  <input type="radio" name="llRole" value="Agent" ${activeRole === 'Agent' ? 'checked' : ''}>
                  <span class="user-type-title">Real Estate Agent / Firm</span>
                  <span class="user-type-desc">Manage portfolios and verify clients.</span>
                </label>
              </div>
            </div>

            <!-- Dynamic Input Based on Tab -->
            ${activeTab === 'email' ? `
              <div class="form-group">
                <label class="form-label" for="ll-reg-email">Landlord Email</label>
                <input class="form-input" type="email" id="ll-reg-email" placeholder="e.g. name@domain.com" required>
                <span class="form-error" id="error-ll-email"></span>
              </div>
            ` : `
              <div class="form-group">
                <label class="form-label" for="ll-reg-phone">Nigerian Phone Number</label>
                <div style="display:flex; gap:8px;">
                  <span class="form-input" style="width:70px; background:#F3F4F6; display:flex; align-items:center; justify-content:center; border:1px solid #D1CDCA; border-radius:12px; font-weight:bold;">+234</span>
                  <input class="form-input" type="tel" id="ll-reg-phone" placeholder="8012345678" style="flex:1;" required>
                </div>
                <span class="form-error" id="error-ll-phone"></span>
              </div>
            `}

            <div class="form-group">
              <label class="form-label" for="ll-reg-password">Password</label>
              <input class="form-input" type="password" id="ll-reg-password" placeholder="Create secure password" required>
              <span class="form-error" id="error-ll-password"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="ll-reg-confirm">Confirm Password</label>
              <input class="form-input" type="password" id="ll-reg-confirm" placeholder="Repeat password" required>
              <span class="form-error" id="error-ll-confirm"></span>
            </div>

            <div style="margin-bottom: 24px; text-align: left;">
              <label class="checkbox-label" style="font-size: 13px;">
                <input type="checkbox" id="ll-terms-agree" required>
                <span>I agree to the <a href="#" class="auth-link">Terms of Service</a> and <a href="#" class="auth-link">Privacy Policy</a>.</span>
              </label>
              <span class="form-error" id="error-ll-terms" style="display: block; margin-top: 4px;"></span>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%;">Create Account</button>
          </form>

          <div class="divider">or sign up with</div>

          <div class="social-login-grid">
            <button class="btn-social" id="social-ll-reg-google">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.78-1.04-1.63-1.18-2.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Google
            </button>
            <button class="btn-social" id="social-ll-reg-apple">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.17.67-2.88 1.5-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.21-.57 2.92-1.42z"/></svg>
              Apple
            </button>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(13, 27, 75, 0.05); font-size: var(--font-caption);">
            <p class="text-muted">Already have a landlord account? <a href="#" class="auth-link" id="go-to-ll-login">Log In</a></p>
            <p class="text-muted" style="margin-top: 8px;">Are you a tenant? <a href="#" class="auth-link" id="go-to-tenant-register">Tenant Signup</a></p>
          </div>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // 1. Role selections
    const selectRole = (role) => {
      updateState({ preselectedRole: role });
      document.querySelectorAll('.user-type-card').forEach(c => c.classList.remove('active'));
      const activeCard = role === 'Agent' ? document.getElementById('card-ll-role-agent') : document.getElementById('card-ll-role-landlord');
      activeCard?.classList.add('active');
      const radio = activeCard?.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    };
    
    document.getElementById('card-ll-role-landlord')?.addEventListener('click', (e) => {
      e.preventDefault();
      selectRole('Landlord');
    });

    document.getElementById('card-ll-role-agent')?.addEventListener('click', (e) => {
      e.preventDefault();
      selectRole('Agent');
    });

    // 2. Tab switching between Email / Phone
    document.getElementById('tab-ll-reg-email')?.addEventListener('click', () => {
      updateState({ registerTab: 'email' });
      navigateTo('landlord-register');
    });
    document.getElementById('tab-ll-reg-phone')?.addEventListener('click', () => {
      updateState({ registerTab: 'phone' });
      navigateTo('landlord-register');
    });

    // 3. Login link
    document.getElementById('go-to-ll-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('landlord-login');
    });

    // 4. Tenant Register redirect
    document.getElementById('go-to-tenant-register')?.addEventListener('click', (e) => {
      e.preventDefault();
      updateState({ preselectedRole: 'Tenant', registerTab: 'email' });
      navigateTo('register');
    });

    // 5. Social Register mock
    const handleSocial = (provider) => {
      const selectedRole = state.preselectedRole === 'Agent' ? 'Agent' : 'Landlord';
      updateState({
        registrationData: {
          username: `oauth_${provider}_landlord`,
          contact: `social_ll_${provider}@haven.ng`,
          role: selectedRole,
          method: 'oauth'
        }
      });
      navigateTo('otp');
    };
    document.getElementById('social-ll-reg-google')?.addEventListener('click', () => handleSocial('google'));
    document.getElementById('social-ll-reg-apple')?.addEventListener('click', () => handleSocial('apple'));

    // 6. Submit registration
    const form = document.getElementById('ll-register-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const tab = state.registerTab || 'email';
      const password = document.getElementById('ll-reg-password').value;
      const confirm = document.getElementById('ll-reg-confirm').value;
      const termsAgree = document.getElementById('ll-terms-agree').checked;

      // Clear errors
      document.querySelectorAll('.form-error').forEach(el => el.innerText = '');
      document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

      let isValid = true;
      let contactVal = '';

      if (tab === 'email') {
        const emailEl = document.getElementById('ll-reg-email');
        const email = emailEl.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          document.getElementById('error-ll-email').innerText = 'Email address is required';
          emailEl.classList.add('error');
          isValid = false;
        } else if (!emailRegex.test(email)) {
          document.getElementById('error-ll-email').innerText = 'Please enter a valid email address';
          emailEl.classList.add('error');
          isValid = false;
        } else {
          contactVal = email;
        }
      } else {
        const phoneEl = document.getElementById('ll-reg-phone');
        const phone = phoneEl.value.trim();
        const phoneRegex = /^[789][01]\d{8}$/;
        if (!phone) {
          document.getElementById('error-ll-phone').innerText = 'Phone number is required';
          phoneEl.classList.add('error');
          isValid = false;
        } else if (!phoneRegex.test(phone)) {
          document.getElementById('error-ll-phone').innerText = 'Enter a valid 10-digit number (e.g. 8012345678)';
          phoneEl.classList.add('error');
          isValid = false;
        } else {
          contactVal = `+234${phone}`;
        }
      }

      if (!password) {
        document.getElementById('error-ll-password').innerText = 'Password is required';
        document.getElementById('ll-reg-password').classList.add('error');
        isValid = false;
      } else if (password.length < 6) {
        document.getElementById('error-ll-password').innerText = 'Password must be at least 6 characters';
        document.getElementById('ll-reg-password').classList.add('error');
        isValid = false;
      }

      if (!confirm) {
        document.getElementById('error-ll-confirm').innerText = 'Please repeat your password';
        document.getElementById('ll-reg-confirm').classList.add('error');
        isValid = false;
      } else if (password !== confirm) {
        document.getElementById('error-ll-confirm').innerText = 'Passwords do not match';
        document.getElementById('ll-reg-confirm').classList.add('error');
        isValid = false;
      }

      if (!termsAgree) {
        document.getElementById('error-ll-terms').innerText = 'You must accept the Terms of Service';
        isValid = false;
      }

      if (!isValid) return;

      const selectedRole = state.preselectedRole === 'Agent' ? 'Agent' : 'Landlord';

      updateState({
        registrationData: {
          username: contactVal,
          contact: contactVal,
          role: selectedRole,
          method: tab
        }
      });

      navigateTo('otp');
    });
  }
};

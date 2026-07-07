import { store } from '../utils/state.js';

export function Login() {
  const html = `
    <div class="container" style="max-width: 500px; padding-top: 64px; padding-bottom: 64px;">
      <div class="card">
        <h2 style="text-align: center; margin-bottom: 12px; font-size: var(--font-card);">Welcome Back</h2>
        <p style="text-align: center; color: var(--neutral-600); margin-bottom: 32px; font-size: var(--font-caption);">
          Sign in to access your secure rental space and verification documents.
        </p>

        <form id="login-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="login-email">Email or Phone Number</label>
            <input type="text" id="login-email" class="form-input" placeholder="you@domain.com or +234..." required>
            <div class="form-error" id="login-email-error" style="display: none;">Please enter your email or phone number</div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label class="form-label" for="login-password" style="margin-bottom: 0;">Password</label>
              <a href="#" id="forgot-password" style="font-size: var(--font-caption); font-weight: 500;">Forgot password?</a>
            </div>
            <input type="password" id="login-password" class="form-input" placeholder="••••••••" required>
            <div class="form-error" id="login-password-error" style="display: none;">Password is required</div>
          </div>

          <div class="form-group" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
            <input type="checkbox" id="login-remember" style="width: 18px; height: 18px; cursor: pointer;">
            <label for="login-remember" style="font-size: var(--font-caption); color: var(--neutral-700); cursor: pointer; user-select: none;">
              Remember this device
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-block" style="margin-bottom: 24px;">
            Sign In
          </button>
        </form>

        <div class="divider-text">OR CONTINUE WITH</div>

        <div class="social-login-grid">
          <button class="btn-social" id="social-google">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button class="btn-social" id="social-apple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.12.09 2.27-.58 2.94-1.39z"/>
            </svg>
            Apple
          </button>
        </div>

        <p style="text-align: center; color: var(--neutral-700); font-size: var(--font-caption); margin-top: 24px;">
          Don't have an account? <a href="#register" style="font-weight: 600;">Register here</a>
        </p>
      </div>
    </div>
  `;

  setTimeout(() => {
    const forgotPwd = document.getElementById('forgot-password');
    if (forgotPwd) {
      forgotPwd.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset link sent to your registered email/phone number.');
      });
    }

    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        
        const emailErr = document.getElementById('login-email-error');
        const passwordErr = document.getElementById('login-password-error');

        let isValid = true;

        emailErr.style.display = 'none';
        passwordErr.style.display = 'none';
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');

        if (!emailInput.value.trim()) {
          emailErr.style.display = 'flex';
          emailInput.classList.add('error');
          isValid = false;
        }

        if (!passwordInput.value) {
          passwordErr.style.display = 'flex';
          passwordInput.classList.add('error');
          isValid = false;
        }

        if (isValid) {
          // Check credentials
          const val = emailInput.value.trim().toLowerCase();
          
          let mockUser = {
            name: 'Chidi Okoro',
            email: 'chidi@domain.com',
            phone: '+234 80 1234 5678',
            userType: 'Tenant',
            verifiedStatus: 'approved',
            profileComplete: true
          };

          // Custom logins to test different states
          if (val.includes('pending')) {
            mockUser.name = 'Fatima Bello';
            mockUser.verifiedStatus = 'pending';
            mockUser.profileComplete = true;
          } else if (val.includes('action')) {
            mockUser.name = 'Kelechi Obi';
            mockUser.verifiedStatus = 'action_required';
            mockUser.profileComplete = true;
          } else if (val.includes('rejected')) {
            mockUser.name = 'Babajide Cole';
            mockUser.verifiedStatus = 'rejected';
            mockUser.profileComplete = true;
          } else if (val.includes('new')) {
            mockUser.name = 'New User';
            mockUser.verifiedStatus = 'pending';
            mockUser.profileComplete = false;
          }

          store.setState({ user: mockUser });

          if (!mockUser.profileComplete) {
            window.location.hash = 'profile-wizard';
          } else {
            window.location.hash = 'dashboard';
          }
        }
      });
    }
  }, 0);

  return html;
}

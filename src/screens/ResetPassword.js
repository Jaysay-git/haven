// Reset Password Screen
export const ResetPassword = {
  render(state) {
    const contact = state.recoveryContact || 'your registered coordinates';
    const method = state.recoveryMethod === 'phone' ? 'SMS' : 'Email';

    return `
      <div class="auth-wrapper flex-center">
        <div class="card auth-card animate-slide-up">
          <div class="auth-header">
            <span class="section-tag" style="background-color: var(--color-success-bg); color: var(--color-success); border: 1px solid rgba(34, 197, 94, 0.2);">Code Sent</span>
            <h2 style="margin-top: 12px;">Reset Your Password</h2>
            <p class="text-sm text-muted" style="margin-top: 8px;">Enter the 6-digit recovery code dispatched to <strong>${contact}</strong> via ${method} and choose a new password.</p>
          </div>

          <form id="reset-password-form" novalidate>
            <div class="form-group">
              <label class="form-label" for="reset-code">6-Digit Verification Code</label>
              <input class="form-input" type="text" id="reset-code" placeholder="Enter 6-digit code (e.g. 123456)" maxlength="6" style="text-align: center; letter-spacing: 4px; font-weight: bold; font-size: var(--font-body-lg);" required>
              <span class="form-error" id="error-reset-code"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="reset-password">New Password</label>
              <input class="form-input" type="password" id="reset-password" placeholder="Min. 6 characters" required>
              <span class="form-error" id="error-reset-password"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="reset-confirm">Confirm New Password</label>
              <input class="form-input" type="password" id="reset-confirm" placeholder="Repeat new password" required>
              <span class="form-error" id="error-reset-confirm"></span>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; margin-top: 12px;">Restore Password</button>
          </form>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(13, 27, 75, 0.05); font-size: var(--font-caption);">
            <p class="text-muted">Need a new code? <a href="#" class="auth-link" id="reset-back-to-forgot">Go Back</a></p>
          </div>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // 1. Go back link
    document.getElementById('reset-back-to-forgot')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('forgot-password');
    });

    // 2. Form submission & verification checking
    const form = document.getElementById('reset-password-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const codeEl = document.getElementById('reset-code');
      const passwordEl = document.getElementById('reset-password');
      const confirmEl = document.getElementById('reset-confirm');

      const code = codeEl.value.trim();
      const password = passwordEl.value;
      const confirm = confirmEl.value;

      // Clear errors
      document.querySelectorAll('.form-error').forEach(el => el.innerText = '');
      document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

      let isValid = true;

      if (!code) {
        document.getElementById('error-reset-code').innerText = 'Verification code is required';
        codeEl.classList.add('error');
        isValid = false;
      } else if (code !== '123456') {
        document.getElementById('error-reset-code').innerText = 'Invalid verification code (Try: 123456)';
        codeEl.classList.add('error');
        isValid = false;
      }

      if (!password) {
        document.getElementById('error-reset-password').innerText = 'New password is required';
        passwordEl.classList.add('error');
        isValid = false;
      } else if (password.length < 6) {
        document.getElementById('error-reset-password').innerText = 'Password must be at least 6 characters';
        passwordEl.classList.add('error');
        isValid = false;
      }

      if (!confirm) {
        document.getElementById('error-reset-confirm').innerText = 'Please repeat the new password';
        confirmEl.classList.add('error');
        isValid = false;
      } else if (password !== confirm) {
        document.getElementById('error-reset-confirm').innerText = 'Passwords do not match';
        confirmEl.classList.add('error');
        isValid = false;
      }

      if (!isValid) return;

      // Successfully updated password!
      alert("Password updated successfully! You can now log in with your new password.");

      // Clean recovery state
      updateState({
        recoveryContact: null,
        recoveryMethod: null
      });

      // Redirect to correct login page depending on role context
      const role = state.preselectedRole === 'Landlord' || state.preselectedRole === 'Agent' ? 'landlord-login' : 'login';
      navigateTo(role);
    });
  }
};

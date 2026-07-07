import { store } from '../utils/state.js';

export function Register() {
  const userTypes = [
    { id: 'Tenant', label: 'Tenant', icon: '🔑' },
    { id: 'Landlord', label: 'Landlord', icon: '🏢' },
    { id: 'Agent', label: 'Agent', icon: '💼' },
    { id: 'Corporate Partner', label: 'Corporate', icon: '🏢' },
    { id: 'University Housing Officer', label: 'University', icon: '🎓' },
    { id: 'NGO Coordinator', label: 'NGO / Charity', icon: '🤝' }
  ];

  let selectedUserType = 'Tenant';

  const userTypeCards = userTypes.map(ut => `
    <div class="user-type-card ${ut.id === selectedUserType ? 'selected' : ''}" data-type="${ut.id}">
      <span class="user-type-icon">${ut.icon}</span>
      <span class="user-type-name">${ut.label}</span>
    </div>
  `).join('');

  const html = `
    <div class="container" style="max-width: 600px; padding-top: 48px; padding-bottom: 48px;">
      <div class="card">
        <h2 style="text-align: center; margin-bottom: 12px; font-size: var(--font-card);">Create your Haven Account</h2>
        <p style="text-align: center; color: var(--neutral-600); margin-bottom: 32px; font-size: var(--font-caption);">
          Select your profile type and register to begin verification.
        </p>

        <!-- User Type Select Grid -->
        <label class="form-label" style="margin-bottom: 12px;">Select Profile Type</label>
        <div class="user-type-grid">
          ${userTypeCards}
        </div>

        <form id="register-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="reg-name">Full Legal Name</label>
            <input type="text" id="reg-name" class="form-input" placeholder="e.g., Chidi Okoro" required>
            <div class="form-error" id="reg-name-error" style="display: none;">Legal Name is required</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="reg-email">Email Address</label>
            <input type="email" id="reg-email" class="form-input" placeholder="you@domain.com" required>
            <div class="form-error" id="reg-email-error" style="display: none;">Please enter a valid email</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="reg-phone">Phone Number (WhatsApp Verified)</label>
            <input type="tel" id="reg-phone" class="form-input" placeholder="+234 80 1234 5678" required>
            <div class="form-error" id="reg-phone-error" style="display: none;">Enter a valid phone number (e.g. +234...)</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="reg-password">Password</label>
            <input type="password" id="reg-password" class="form-input" placeholder="Minimum 8 characters" required>
            <div class="form-error" id="reg-password-error" style="display: none;">Password must be at least 8 characters long</div>
          </div>

          <button type="submit" class="btn btn-primary btn-block" style="margin-top: 12px; margin-bottom: 24px;">
            Register & Continue
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

        <p style="text-align: center; color: var(--neutral-700); font-size: var(--font-caption);">
          Already have an account? <a href="#login" style="font-weight: 600;">Sign in here</a>
        </p>
      </div>
    </div>
  `;

  // Attach card selectors and validation trigger logic
  setTimeout(() => {
    const cards = document.querySelectorAll('.user-type-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedUserType = card.getAttribute('data-type');
      });
    });

    const form = document.getElementById('register-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('reg-name');
        const emailInput = document.getElementById('reg-email');
        const phoneInput = document.getElementById('reg-phone');
        const passwordInput = document.getElementById('reg-password');
        
        const nameErr = document.getElementById('reg-name-error');
        const emailErr = document.getElementById('reg-email-error');
        const phoneErr = document.getElementById('reg-phone-error');
        const passwordErr = document.getElementById('reg-password-error');

        let isValid = true;

        // Reset errors
        nameErr.style.display = 'none';
        emailErr.style.display = 'none';
        phoneErr.style.display = 'none';
        passwordErr.style.display = 'none';
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        phoneInput.classList.remove('error');
        passwordInput.classList.remove('error');

        // Validation
        if (!nameInput.value.trim()) {
          nameErr.style.display = 'flex';
          nameInput.classList.add('error');
          isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          emailErr.style.display = 'flex';
          emailInput.classList.add('error');
          isValid = false;
        }

        // Basic phone validation (starts with + or contains digits)
        const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
          phoneErr.style.display = 'flex';
          phoneInput.classList.add('error');
          isValid = false;
        }

        if (passwordInput.value.length < 8) {
          passwordErr.style.display = 'flex';
          passwordInput.classList.add('error');
          isValid = false;
        }

        if (isValid) {
          // Check for Duplicate Account Detection simulation
          if (emailInput.value.trim().toLowerCase() === 'duplicate@haven.ng') {
            alert('Duplicate account detected! This email is already registered.');
            emailErr.innerText = 'Email is already registered. Please choose another.';
            emailErr.style.display = 'flex';
            emailInput.classList.add('error');
            return;
          }

          // Save temp details to store
          store.setState({
            tempUser: {
              name: nameInput.value.trim(),
              email: emailInput.value.trim(),
              phone: phoneInput.value.trim(),
              password: passwordInput.value,
              userType: selectedUserType
            },
            otp: {
              sentTo: phoneInput.value.trim(),
              type: 'sms',
              code: '1234',
              timer: 60
            }
          });

          // Navigate to OTP page
          window.location.hash = 'otp';
        }
      });
    }
  }, 0);

  return html;
}

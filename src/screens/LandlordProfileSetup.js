// Landlord Profile Onboarding Screen
export const LandlordProfileSetup = {
  render(state) {
    const defaultPhone = state.user?.username && !state.user.username.includes('@') ? state.user.username.replace('+234', '') : '';

    return `
      <div class="auth-wrapper flex-center" style="min-height: 100vh; padding: 40px 20px; background: var(--bg-primary);">
        <div class="card auth-card animate-slide-up" style="max-width: 500px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
          <div class="auth-header">
            <span class="section-tag" style="background: rgba(26, 122, 138, 0.1); color: #1A7A8A;">Step 2: Profile Setup</span>
            <h2 style="margin-top: 12px; font-family: 'Poppins', sans-serif;">Complete Your Profile</h2>
            <p class="text-sm text-muted" style="margin-top: 8px;">Let's customize your workspace. This information helps us configure lease agreements and verify your portfolio.</p>
          </div>

          <form id="ll-profile-setup-form" novalidate style="margin-top: 24px;">
            <!-- Full Name (Required) -->
            <div class="form-group">
              <label class="form-label" for="ll-setup-fullname">Full Name <span style="color:red;">*</span></label>
              <input class="form-input" type="text" id="ll-setup-fullname" placeholder="e.g. Chief Alabi" required>
              <span class="form-error" id="error-ll-fullname" style="color:red; font-size:12px; display:block; margin-top:4px;"></span>
            </div>

            <!-- Phone Number (Required) -->
            <div class="form-group">
              <label class="form-label" for="ll-setup-phone">Phone Number <span style="color:red;">*</span></label>
              <div style="display:flex; gap:8px;">
                <span class="form-input" style="width:70px; background:var(--bg-card); display:flex; align-items:center; justify-content:center; border:1px solid var(--border-color); border-radius:12px; font-weight:bold;">+234</span>
                <input class="form-input" type="tel" id="ll-setup-phone" placeholder="8012345678" style="flex:1;" value="${defaultPhone}" required>
              </div>
              <span class="form-error" id="error-ll-phone" style="color:red; font-size:12px; display:block; margin-top:4px;"></span>
            </div>

            <!-- Business / Company Name (Optional) -->
            <div class="form-group">
              <label class="form-label" for="ll-setup-company">Business / Company Name <span class="text-muted" style="font-size:11px;">(Optional)</span></label>
              <input class="form-input" type="text" id="ll-setup-company" placeholder="e.g. Alabi Properties Ltd">
            </div>

            <!-- Primary Location (Required) -->
            <div class="form-group">
              <label class="form-label" for="ll-setup-location">Primary Location <span style="color:red;">*</span></label>
              <select class="form-input" id="ll-setup-location" required style="background: var(--bg-card); color: var(--text-primary);">
                <option value="" disabled selected>Select primary state</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Rivers">Rivers</option>
                <option value="Oyo">Oyo</option>
                <option value="Kano">Kano</option>
                <option value="Other">Other</option>
              </select>
              <span class="form-error" id="error-ll-location" style="color:red; font-size:12px; display:block; margin-top:4px;"></span>
            </div>

            <!-- Grid for Experience & Portfolio -->
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
              <!-- Years of Experience (Optional) -->
              <div class="form-group">
                <label class="form-label" for="ll-setup-experience">Experience <span class="text-muted" style="font-size:11px;">(Optional)</span></label>
                <select class="form-input" id="ll-setup-experience" style="background: var(--bg-card); color: var(--text-primary);">
                  <option value="" disabled selected>Select range</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="4-7 years">4-7 years</option>
                  <option value="8+ years">8+ years</option>
                </select>
              </div>

              <!-- Portfolio Size (Optional) -->
              <div class="form-group">
                <label class="form-label" for="ll-setup-portfolio">Portfolio Size <span class="text-muted" style="font-size:11px;">(Optional)</span></label>
                <select class="form-input" id="ll-setup-portfolio" style="background: var(--bg-card); color: var(--text-primary);">
                  <option value="" disabled selected>Select units size</option>
                  <option value="1-5 properties">1-5 properties</option>
                  <option value="6-15 properties">6-15 properties</option>
                  <option value="16-50 properties">16-50 properties</option>
                  <option value="50+ properties">50+ properties</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; margin-top: 16px; font-family: 'Poppins', sans-serif;">Save Profile & Continue</button>
          </form>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    const form = document.getElementById('ll-profile-setup-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('ll-setup-fullname').value.trim();
      const phoneRaw = document.getElementById('ll-setup-phone').value.trim();
      const companyName = document.getElementById('ll-setup-company').value.trim();
      const location = document.getElementById('ll-setup-location').value;
      const experience = document.getElementById('ll-setup-experience').value;
      const portfolioSize = document.getElementById('ll-setup-portfolio').value;

      // Clear errors
      document.querySelectorAll('.form-error').forEach(el => el.innerText = '');
      document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

      let isValid = true;

      if (!fullName) {
        document.getElementById('error-ll-fullname').innerText = 'Full name is required';
        document.getElementById('ll-setup-fullname').classList.add('error');
        isValid = false;
      }

      const phoneRegex = /^[789][01]\d{8}$/;
      if (!phoneRaw) {
        document.getElementById('error-ll-phone').innerText = 'Phone number is required';
        document.getElementById('ll-setup-phone').classList.add('error');
        isValid = false;
      } else if (!phoneRegex.test(phoneRaw)) {
        document.getElementById('error-ll-phone').innerText = 'Enter a valid 10-digit number (e.g. 8012345678)';
        document.getElementById('ll-setup-phone').classList.add('error');
        isValid = false;
      }

      if (!location) {
        document.getElementById('error-ll-location').innerText = 'Primary location state is required';
        document.getElementById('ll-setup-location').classList.add('error');
        isValid = false;
      }

      if (!isValid) return;

      // Save profile
      updateState({
        landlordProfile: {
          fullName,
          phone: `+234${phoneRaw}`,
          companyName,
          location,
          experience,
          portfolioSize
        },
        onboardingCompleted: true
      });

      alert("Landlord Profile Setup Completed Successfully!");
      navigateTo('landlord');
    });
  }
};

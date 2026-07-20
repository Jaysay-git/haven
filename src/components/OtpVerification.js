import { store } from '../utils/state.js';

export function OtpVerification() {
  const state = store.getState();
  const tempUser = state.tempUser;
  const target = tempUser ? (tempUser.phone || tempUser.email) : 'your phone';

  let countdown = 60;
  let timerId = null;

  const html = `
    <div class="container" style="max-width: 500px; padding-top: 64px; padding-bottom: 64px;">
      <div class="card" style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 24px;">💬</div>
        <h2 style="margin-bottom: 12px; font-size: var(--font-card);">Enter OTP Verification Code</h2>
        <p style="color: var(--neutral-600); font-size: var(--font-caption); margin-bottom: 24px;">
          We sent a verification code to <strong style="color: var(--primary);">${target}</strong>.
        </p>

        <form id="otp-form" novalidate>
          <div class="otp-input-container">
            <input type="text" maxlength="1" class="otp-box" id="otp-1" autofocus>
            <input type="text" maxlength="1" class="otp-box" id="otp-2">
            <input type="text" maxlength="1" class="otp-box" id="otp-3">
            <input type="text" maxlength="1" class="otp-box" id="otp-4">
          </div>

          <div class="form-error" id="otp-error" style="display: none; justify-content: center; margin-bottom: 24px; font-weight: 600;">
            Invalid OTP code. Please enter the correct code.
          </div>

          <button type="submit" class="btn btn-primary btn-block" style="margin-bottom: 24px;" id="verify-otp-btn">
            Verify Code
          </button>
        </form>

        <p style="font-size: var(--font-caption); color: var(--neutral-700);">
          Didn't receive the code? 
          <span id="otp-timer-container">Resend in <strong id="otp-timer">60s</strong></span>
          <button id="resend-otp-btn" class="btn-link" style="display: none; background: none; border: none; color: var(--secondary); font-weight: 600; font-family: inherit; cursor: pointer; font-size: var(--font-caption);">Resend OTP</button>
        </p>
      </div>
    </div>
  `;

  // Start timer and set up event listeners
  setTimeout(() => {
    const boxes = document.querySelectorAll('.otp-box');
    const errorEl = document.getElementById('otp-error');
    const verifyBtn = document.getElementById('verify-otp-btn');
    const timerEl = document.getElementById('otp-timer');
    const timerContainer = document.getElementById('otp-timer-container');
    const resendBtn = document.getElementById('resend-otp-btn');

    // Auto-focus behavior
    boxes.forEach((box, index) => {
      box.addEventListener('input', (e) => {
        const val = box.value;
        if (val.length === 1 && index < boxes.length - 1) {
          boxes[index + 1].focus();
        }
      });

      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && index > 0) {
          boxes[index - 1].focus();
        }
      });
    });

    // Start timer
    function startTimer() {
      countdown = 60;
      resendBtn.style.display = 'none';
      timerContainer.style.display = 'inline';
      timerEl.innerText = `${countdown}s`;

      if (timerId) clearInterval(timerId);
      timerId = setInterval(() => {
        countdown--;
        timerEl.innerText = `${countdown}s`;
        if (countdown <= 0) {
          clearInterval(timerId);
          timerContainer.style.display = 'none';
          resendBtn.style.display = 'inline';
        }
      }, 1000);
    }
    
    startTimer();

    resendBtn.addEventListener('click', () => {
      alert(`A new verification OTP has been sent to ${target}.`);
      startTimer();
    });

    const form = document.getElementById('otp-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let code = '';
        boxes.forEach(box => code += box.value);

        errorEl.style.display = 'none';
        boxes.forEach(b => b.classList.remove('error'));

        // Mock codes:
        // '1234' = Success
        // '9999' = Failed OTP exception simulation
        if (code === '1234') {
          // Success registration
          const finalUser = {
            name: tempUser ? tempUser.name : 'Chidi Okoro',
            email: tempUser ? tempUser.email : 'chidi@domain.com',
            phone: tempUser ? tempUser.phone : '+234 80 1234 5678',
            userType: tempUser ? tempUser.userType : 'Tenant',
            verifiedStatus: 'action_required', // Needs to complete BVN/NIN
            profileComplete: false // Needs profile wizard
          };
          
          store.setState({ 
            user: finalUser, 
            tempUser: null,
            onboardingCompleted: false
          });
          clearInterval(timerId);
          window.location.hash = 'dashboard';
        } else {
          // Failure State
          errorEl.style.display = 'flex';
          boxes.forEach(box => {
            box.classList.add('error');
            box.value = '';
          });
          boxes[0].focus();
        }
      });
    }
  }, 0);

  return html;
}
export function cleanupOtpTimer() {
  // Can be called to clear memory timers
}

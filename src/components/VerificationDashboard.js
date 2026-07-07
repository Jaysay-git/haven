import { store } from '../utils/state.js';

export function VerificationDashboard() {
  const state = store.getState();
  const user = state.user;

  if (!user) {
    return `
      <div class="container" style="padding-top: 64px; text-align: center;">
        <div class="card" style="max-width: 500px; margin: 0 auto;">
          <h2>Access Denied</h2>
          <p style="margin: 16px 0;">Please log in or register to access the verification status dashboard.</p>
          <a href="#login" class="btn btn-primary">Sign In</a>
        </div>
      </div>
    `;
  }

  const vStatus = user.verifiedStatus;

  let statusCardHtml = '';
  let actionsHtml = '';

  if (vStatus === 'pending') {
    statusCardHtml = `
      <div style="background-color: var(--white); border-left: 6px solid var(--warning); padding: 24px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); margin-bottom: 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="status-badge status-badge-pending">⏳ Verification Pending Review</span>
            <h3 style="margin-top: 12px; font-size: var(--font-body-lg); color: var(--primary);">Document Verification Underway</h3>
            <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-top: 4px;">
              Our operations team is validating your NIN/BVN records and biometrics. This normally takes 10 to 30 minutes.
            </p>
          </div>
          <span style="font-size: 2.5rem;">⏱️</span>
        </div>
      </div>
    `;
    actionsHtml = `
      <div class="card" style="border: 1px solid var(--neutral-300);">
        <h3 style="font-size: var(--font-body-lg); margin-bottom: 12px;">What to expect next?</h3>
        <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 16px;">
          Once approved, you will receive your official Haven Verified Badge and a secure tenant qualification link to share with Lagos landlords.
        </p>
        <button class="btn btn-outline" style="cursor: not-allowed;" disabled>Documents Submitted</button>
      </div>
    `;
  } else if (vStatus === 'approved') {
    statusCardHtml = `
      <div style="background-color: var(--white); border-left: 6px solid var(--success); padding: 24px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); margin-bottom: 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="status-badge status-badge-approved">✓ Haven Verified Approved</span>
            <h3 style="margin-top: 12px; font-size: var(--font-body-lg); color: var(--primary);">Congratulations! Your profile is verified</h3>
            <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-top: 4px;">
              Your identity is officially verified with institution-grade credit credentials. You can now bid on verified apartments.
            </p>
          </div>
          <span style="font-size: 2.5rem;">🎖️</span>
        </div>
      </div>
    `;
    actionsHtml = `
      <div class="card" style="background: linear-gradient(135deg, var(--primary) 0%, #172c72 100%); color: var(--white); border: none;">
        <h3 style="font-size: var(--font-body-lg); margin-bottom: 8px; color: var(--white);">Your Haven Trust Card</h3>
        <p style="font-size: var(--font-caption); color: var(--neutral-300); margin-bottom: 24px;">
          Share your credentials instantly with university housing officers or prospective agents.
        </p>
        
        <div style="background-color: rgba(255,255,255,0.06); padding: 16px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; font-family: monospace;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>ID STATUS</span>
            <span style="color: var(--success);">ACTIVE</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>H-UID</span>
            <span>HVN-NG-${Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>TRUST INDEX</span>
            <span style="color: var(--secondary); font-weight: bold;">94%</span>
          </div>
        </div>
        <button class="btn btn-secondary" onclick="alert('Downloading verification badge PDF...')">Download Verification Badge</button>
      </div>
    `;
  } else if (vStatus === 'rejected') {
    statusCardHtml = `
      <div style="background-color: var(--white); border-left: 6px solid var(--error); padding: 24px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); margin-bottom: 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="status-badge status-badge-rejected">✗ Verification Rejected</span>
            <h3 style="margin-top: 12px; font-size: var(--font-body-lg); color: var(--primary);">Document Validation Mismatch</h3>
            <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-top: 4px;">
              Reason: Your uploaded employee/student ID card image was blurry or unreadable.
            </p>
          </div>
          <span style="font-size: 2.5rem;">🚨</span>
        </div>
      </div>
    `;
    actionsHtml = `
      <div class="card" style="border: 1px solid var(--neutral-300);">
        <h3 style="font-size: var(--font-body-lg); margin-bottom: 12px;">Action Required</h3>
        <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 16px;">
          Please re-upload a clear high-resolution picture of your identity card to proceed.
        </p>
        <a href="#verify" class="btn btn-primary">Re-Upload Documents</a>
      </div>
    `;
  } else {
    // Requires Action / Not verified yet
    statusCardHtml = `
      <div style="background-color: var(--white); border-left: 6px solid var(--info); padding: 24px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); margin-bottom: 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="status-badge status-badge-action">ℹ️ Verification Required</span>
            <h3 style="margin-top: 12px; font-size: var(--font-body-lg); color: var(--primary);">Identity Verification Incomplete</h3>
            <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-top: 4px;">
              Please complete your BVN, NIN, and liveness selfie matching to activate security features.
            </p>
          </div>
          <span style="font-size: 2.5rem;">🔑</span>
        </div>
      </div>
    `;
    actionsHtml = `
      <div class="card" style="border: 1px solid var(--neutral-300);">
        <h3 style="font-size: var(--font-body-lg); margin-bottom: 12px;">Start Verification</h3>
        <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 16px;">
          Click below to initiate biometric match and government ID check.
        </p>
        <a href="#verify" class="btn btn-primary">Start Identity Flow</a>
      </div>
    `;
  }

  // Profile setup indicator card
  const profileCompletePercent = user.profileComplete ? 100 : 30;

  const html = `
    <div class="container" style="padding-top: 48px; padding-bottom: 48px;">
      <!-- Welcome Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="margin-bottom: 4px;">Welcome, ${user.name || 'Member'}</h2>
          <p style="color: var(--neutral-600); font-size: var(--font-caption);">Account Type: <strong>${user.userType}</strong></p>
        </div>
        <div style="display: flex; gap: 12px;">
          <a href="#profile-wizard" class="btn btn-outline" style="padding: 10px 18px;">Edit Preferences</a>
        </div>
      </div>

      <div class="grid grid-3" style="grid-template-columns: 2fr 1fr; gap: 32px;">
        <!-- Left Side Column -->
        <div>
          <!-- Verification Alert Banner -->
          ${statusCardHtml}

          <!-- Analytics Summary Cards -->
          <div class="grid grid-2" style="margin-bottom: 32px;">
            <div class="card" style="padding: 24px;">
              <span style="color: var(--neutral-600); font-size: var(--font-small); font-weight: 600; text-transform: uppercase;">Profile Completion</span>
              <div style="font-size: 1.75rem; font-weight: 700; color: var(--primary); margin: 8px 0;">
                ${profileCompletePercent}%
              </div>
              <div style="width: 100%; height: 6px; background-color: var(--neutral-200); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: ${profileCompletePercent}%; height: 100%; background-color: var(--secondary);"></div>
              </div>
            </div>

            <div class="card" style="padding: 24px;">
              <span style="color: var(--neutral-600); font-size: var(--font-small); font-weight: 600; text-transform: uppercase;">Security Level</span>
              <div style="font-size: 1.75rem; font-weight: 700; color: var(--primary); margin: 8px 0;">
                ${vStatus === 'approved' ? 'High Guard' : 'Standard'}
              </div>
              <p style="font-size: var(--font-small); color: var(--neutral-500);">Escrow active eligibility checks</p>
            </div>
          </div>

          <!-- Quick Demo Status Toggle Panel -->
          <div class="card" style="border: 1.5px dashed var(--neutral-400); background-color: var(--neutral-100);">
            <h4 style="color: var(--primary); font-weight: 700; margin-bottom: 8px;">⚙️ Demonstration Panel (Milestone 1 Preview)</h4>
            <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 16px;">
              Click the buttons below to simulate different server response states and see how the dashboard UI responds.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <button class="btn btn-outline" id="demo-set-pending" style="padding: 8px 12px; font-size: 11px;">Set to Pending</button>
              <button class="btn btn-outline" id="demo-set-approved" style="padding: 8px 12px; font-size: 11px;">Set to Approved</button>
              <button class="btn btn-outline" id="demo-set-rejected" style="padding: 8px 12px; font-size: 11px;">Set to Rejected</button>
              <button class="btn btn-outline" id="demo-set-action" style="padding: 8px 12px; font-size: 11px;">Set to Action Required</button>
            </div>
          </div>
        </div>

        <!-- Right Side Column -->
        <div>
          ${actionsHtml}
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    // Demo button actions
    const setPending = document.getElementById('demo-set-pending');
    const setApproved = document.getElementById('demo-set-approved');
    const setRejected = document.getElementById('demo-set-rejected');
    const setAction = document.getElementById('demo-set-action');

    if (setPending) {
      setPending.addEventListener('click', () => {
        store.setState({ user: { ...user, verifiedStatus: 'pending' } });
      });
    }
    if (setApproved) {
      setApproved.addEventListener('click', () => {
        store.setState({ user: { ...user, verifiedStatus: 'approved' } });
      });
    }
    if (setRejected) {
      setRejected.addEventListener('click', () => {
        store.setState({ user: { ...user, verifiedStatus: 'rejected' } });
      });
    }
    if (setAction) {
      setAction.addEventListener('click', () => {
        store.setState({ user: { ...user, verifiedStatus: 'action_required' } });
      });
    }
  }, 0);

  return html;
}

import { store } from '../utils/state.js';

export function IdVerification() {
  const state = store.getState();
  const user = state.user;
  const verification = state.verification;

  let activeTab = 'bvn'; // 'bvn' | 'nin' | 'selfie' | 'docs'

  const html = `
    <div class="container" style="max-width: 800px; padding-top: 48px; padding-bottom: 48px;">
      <div class="card">
        <h2 style="margin-bottom: 8px;">Identity Verification Center</h2>
        <p style="color: var(--neutral-600); font-size: var(--font-caption); margin-bottom: 32px;">
          Haven requires verification to protect users against rental fraud. Complete the steps below.
        </p>

        <!-- Tab Header -->
        <div class="verify-tab-header">
          <button class="verify-tab-btn ${activeTab === 'bvn' ? 'active' : ''}" id="tab-btn-bvn" data-tab="bvn">1. BVN Verification</button>
          <button class="verify-tab-btn ${activeTab === 'nin' ? 'active' : ''}" id="tab-btn-nin" data-tab="nin">2. NIN Verification</button>
          <button class="verify-tab-btn ${activeTab === 'selfie' ? 'active' : ''}" id="tab-btn-selfie" data-tab="selfie">3. Selfie Match</button>
          <button class="verify-tab-btn ${activeTab === 'docs' ? 'active' : ''}" id="tab-btn-docs" data-tab="docs">4. Documents & IDs</button>
        </div>

        <!-- Tab Contents -->
        
        <!-- BVN Tab -->
        <div id="tab-content-bvn" class="tab-pane" style="display: block;">
          <h3 style="font-size: var(--font-body-lg); margin-bottom: 12px; color: var(--primary);">Verify Bank Verification Number (BVN)</h3>
          <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 24px;">
            Your BVN is used strictly to verify your legal identity name and date of birth. Haven will never access your accounts or financial details.
          </p>
          <div class="form-group">
            <label class="form-label" for="verify-bvn-input">11-Digit BVN</label>
            <input type="text" id="verify-bvn-input" class="form-input" placeholder="e.g. 22212345678" maxlength="11" value="${verification.bvn || ''}">
            <div class="form-error" id="bvn-error" style="display: none;">BVN must be exactly 11 digits</div>
            <div class="form-error" id="bvn-fail-error" style="display: none; color: var(--error);">Failed BVN Verification: Name or birth date mismatch with bank record.</div>
          </div>
          <button class="btn btn-primary" id="bvn-submit-btn">Verify BVN</button>
        </div>

        <!-- NIN Tab -->
        <div id="tab-content-nin" class="tab-pane" style="display: none;">
          <h3 style="font-size: var(--font-body-lg); margin-bottom: 12px; color: var(--primary);">Verify National Identification Number (NIN)</h3>
          <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 24px;">
            Input your 11-digit NIN to confirm your civic identity and profile status.
          </p>
          <div class="form-group">
            <label class="form-label" for="verify-nin-input">11-Digit NIN</label>
            <input type="text" id="verify-nin-input" class="form-input" placeholder="e.g. 10020030040" maxlength="11" value="${verification.nin || ''}">
            <div class="form-error" id="nin-error" style="display: none;">NIN must be exactly 11 digits</div>
            <div class="form-error" id="nin-fail-error" style="display: none; color: var(--error);">Failed NIN Verification: Database registry timeout or invalid number.</div>
          </div>
          <button class="btn btn-primary" id="nin-submit-btn">Verify NIN</button>
        </div>

        <!-- Selfie Tab -->
        <div id="tab-content-selfie" class="tab-pane" style="display: none; text-align: center;">
          <h3 style="font-size: var(--font-body-lg); margin-bottom: 12px; color: var(--primary);">Liveness Selfie Verification</h3>
          <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 24px;">
            Position your face inside the frame to verify biometric match against BVN/NIN credentials.
          </p>
          
          <div class="scan-box" id="webcam-scanner">
            <div class="scan-line" id="scanner-beam" style="display: none;"></div>
            <div id="scanner-placeholder">
              <span style="font-size: 3rem;">📸</span>
              <p style="font-size: var(--font-small); color: var(--neutral-400); margin-top: 8px;">Click "Start Scanner" to simulate webcam match</p>
            </div>
            <div id="scanner-video" style="display: none; width: 100%; height: 100%; border-radius: var(--radius-md); overflow: hidden; background: radial-gradient(circle, #2e566d 0%, #0d1b4b 100%); align-items: center; justify-content: center;">
              <span style="font-size: 4rem; animation: pulse 1.5s infinite;">👤</span>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 16px;">
            <button class="btn btn-outline" id="selfie-scan-btn">Start Scanner</button>
            <button class="btn btn-primary" id="selfie-submit-btn" disabled>Confirm Selfie</button>
          </div>
        </div>

        <!-- Document Tab -->
        <div id="tab-content-docs" class="tab-pane" style="display: none;">
          <h3 style="font-size: var(--font-body-lg); margin-bottom: 12px; color: var(--primary);">Upload Verification Documents</h3>
          <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 24px;">
            Upload secondary documents to support verification. For Student/Corporate accounts, upload Student/Employee ID cards.
          </p>

          <div class="form-group">
            <label class="form-label" for="verify-doc-type">Document Type</label>
            <select id="verify-doc-type" class="form-input">
              <option value="driver_license">Driver's License</option>
              <option value="passport">International Passport</option>
              <option value="student_id">Student ID Card (Required for Student profile)</option>
              <option value="employee_id">Employee ID Card (Required for Corporate profile)</option>
            </select>
          </div>

          <div class="upload-drag-area" id="drag-area">
            <span style="font-size: 2.5rem; display: block; margin-bottom: 12px;">📁</span>
            <strong style="color: var(--primary);">Drag & Drop Document</strong>
            <p style="font-size: var(--font-small); color: var(--neutral-500); margin-top: 4px;">PNG, JPG, or PDF up to 5MB</p>
            <input type="file" id="file-input" style="display: none;">
          </div>

          <div id="uploaded-files-list" style="margin-top: 24px;">
            <!-- File items list -->
          </div>

          <div style="margin-top: 32px; display: flex; justify-content: flex-end;">
            <button class="btn btn-primary" id="verify-submit-all-btn">Submit Verification for Review</button>
          </div>
        </div>

      </div>
    </div>
  `;

  setTimeout(() => {
    // Tabs switching
    const tabBtns = document.querySelectorAll('.verify-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(tabId) {
      activeTab = tabId;
      tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
      });
      tabPanes.forEach(pane => {
        pane.style.display = pane.id === `tab-content-${tabId}` ? 'block' : 'none';
      });
    }

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.getAttribute('data-tab'));
      });
    });

    // BVN Submit Handler
    const bvnBtn = document.getElementById('bvn-submit-btn');
    const bvnInput = document.getElementById('verify-bvn-input');
    const bvnError = document.getElementById('bvn-error');
    const bvnFail = document.getElementById('bvn-fail-error');

    bvnBtn.addEventListener('click', () => {
      bvnError.style.display = 'none';
      bvnFail.style.display = 'none';
      bvnInput.classList.remove('error');

      const bvnVal = bvnInput.value.trim();
      if (bvnVal.length !== 11 || !/^\d+$/.test(bvnVal)) {
        bvnError.style.display = 'flex';
        bvnInput.classList.add('error');
        return;
      }

      // BVN exception trigger: starts with 999
      if (bvnVal.startsWith('999')) {
        bvnFail.style.display = 'flex';
        bvnInput.classList.add('error');
        return;
      }

      // Success
      store.setVerificationState({ bvn: bvnVal });
      alert('BVN Successfully Verified! Proceeding to NIN.');
      switchTab('nin');
    });

    // NIN Submit Handler
    const ninBtn = document.getElementById('nin-submit-btn');
    const ninInput = document.getElementById('verify-nin-input');
    const ninError = document.getElementById('nin-error');
    const ninFail = document.getElementById('nin-fail-error');

    ninBtn.addEventListener('click', () => {
      ninError.style.display = 'none';
      ninFail.style.display = 'none';
      ninInput.classList.remove('error');

      const ninVal = ninInput.value.trim();
      if (ninVal.length !== 11 || !/^\d+$/.test(ninVal)) {
        ninError.style.display = 'flex';
        ninInput.classList.add('error');
        return;
      }

      // NIN exception trigger: starts with 999
      if (ninVal.startsWith('999')) {
        ninFail.style.display = 'flex';
        ninInput.classList.add('error');
        return;
      }

      // Success
      store.setVerificationState({ nin: ninVal });
      alert('NIN Successfully Verified! Proceeding to Selfie Scan.');
      switchTab('selfie');
    });

    // Selfie Scan Simulation
    const scanBtn = document.getElementById('selfie-scan-btn');
    const selfieConfirmBtn = document.getElementById('selfie-submit-btn');
    const scannerBeam = document.getElementById('scanner-beam');
    const placeholder = document.getElementById('scanner-placeholder');
    const videoMock = document.getElementById('scanner-video');

    scanBtn.addEventListener('click', () => {
      placeholder.style.display = 'none';
      videoMock.style.display = 'flex';
      scannerBeam.style.display = 'block';
      scanBtn.disabled = true;

      // Simulate match in 3 seconds
      setTimeout(() => {
        scannerBeam.style.display = 'none';
        selfieConfirmBtn.disabled = false;
        alert('Biometric scanning complete: Match found (98.4% match rating).');
      }, 3000);
    });

    selfieConfirmBtn.addEventListener('click', () => {
      store.setVerificationState({ selfieUrl: 'mock-verified-selfie.jpg' });
      alert('Selfie verified! Moving to Documents.');
      switchTab('docs');
    });

    // Drag and Drop files
    const dragArea = document.getElementById('drag-area');
    const fileInput = document.getElementById('file-input');
    const filesList = document.getElementById('uploaded-files-list');
    const docTypeSelect = document.getElementById('verify-doc-type');

    let uploadedFiles = [...verification.documents];

    function renderFiles() {
      if (uploadedFiles.length === 0) {
        filesList.innerHTML = '<p style="font-size: var(--font-small); color: var(--neutral-500); text-align: center;">No documents uploaded yet.</p>';
        return;
      }

      filesList.innerHTML = uploadedFiles.map((f, i) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border: 1px solid var(--neutral-300); border-radius: var(--radius-sm); margin-bottom: 8px; background-color: var(--white);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.25rem;">📄</span>
            <div>
              <strong style="font-size: var(--font-caption); color: var(--primary);">${f.name}</strong>
              <p style="font-size: 10px; color: var(--neutral-600); text-transform: uppercase; font-weight: 600;">${f.type}</p>
            </div>
          </div>
          <button class="btn-delete-file" data-idx="${i}" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: var(--font-caption); font-weight: 600;">Delete</button>
        </div>
      `).join('');

      // Attach delete click
      document.querySelectorAll('.btn-delete-file').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.getAttribute('data-idx'));
          uploadedFiles.splice(idx, 1);
          store.setVerificationState({ documents: uploadedFiles });
          renderFiles();
        });
      });
    }

    renderFiles();

    dragArea.addEventListener('click', () => {
      fileInput.click();
    });

    dragArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dragArea.classList.add('dragover');
    });

    dragArea.addEventListener('dragleave', () => {
      dragArea.classList.remove('dragover');
    });

    dragArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dragArea.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        addMockFile(files[0].name);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        addMockFile(fileInput.files[0].name);
      }
    });

    function addMockFile(fileName) {
      uploadedFiles.push({
        type: docTypeSelect.value,
        name: fileName,
        status: 'pending'
      });
      store.setVerificationState({ documents: uploadedFiles });
      renderFiles();
    }

    // Submit all verification
    const submitAllBtn = document.getElementById('verify-submit-all-btn');
    submitAllBtn.addEventListener('click', () => {
      // Check if user has uploaded student or employee card if they are of that user type
      if (user.userType === 'Corporate Partner') {
        const hasEmpId = uploadedFiles.some(f => f.type === 'employee_id');
        if (!hasEmpId) {
          alert('Missing Employee ID card. Since your profile type is Corporate Partner, you must upload your employee credential card.');
          return;
        }
      }
      if (user.userType === 'University Housing Officer') {
        const hasStudentId = uploadedFiles.some(f => f.type === 'student_id');
        if (!hasStudentId) {
          alert('Missing Institution ID card. Since your profile type is University Officer, you must upload your university credential card.');
          return;
        }
      }

      // Update state status
      store.setVerificationState({ status: 'pending' });
      // Update user status
      const updatedUser = { ...user, verifiedStatus: 'pending' };
      store.setState({ user: updatedUser });
      
      alert('Verification documents successfully submitted. Redirecting to Dashboard.');
      window.location.hash = 'dashboard';
    });

  }, 0);

  return html;
}

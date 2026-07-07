import { store } from '../utils/state.js';

export function ProfileWizard() {
  const state = store.getState();
  const wizard = state.wizard;
  const user = state.user;

  const totalSteps = 7;
  const currentStep = wizard.currentStep;

  // Step names
  const steps = [
    { num: 1, title: "Personal" },
    { num: 2, title: "Location" },
    { num: 3, title: "Housing" },
    { num: 4, title: "Employment" },
    { num: 5, title: "Income" },
    { num: 6, title: "Lifestyle" },
    { num: 7, title: "Review" }
  ];

  // Render progress indicators
  const stepNodes = steps.map(s => `
    <div class="wizard-step-node ${s.num === currentStep ? 'active' : (s.num < currentStep ? 'completed' : '')}" data-step="${s.num}">
      ${s.num < currentStep ? '✓' : s.num}
      <span class="wizard-step-title">${s.title}</span>
    </div>
  `).join('');

  const progressFillWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;

  // Content for each step
  let stepContentHtml = '';

  if (currentStep === 1) {
    stepContentHtml = `
      <div class="wizard-panel">
        <h3 style="margin-bottom: 24px; color: var(--primary);">Step 1: Personal Information</h3>
        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label" for="wiz-firstname">First Legal Name</label>
            <input type="text" id="wiz-firstname" class="form-input" placeholder="e.g. Chidi" value="${wizard.firstName || ''}" required>
            <div class="form-error" id="wiz-first-error" style="display: none;">First Name is required</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="wiz-lastname">Last Legal Name</label>
            <input type="text" id="wiz-lastname" class="form-input" placeholder="e.g. Okoro" value="${wizard.lastName || ''}" required>
            <div class="form-error" id="wiz-last-error" style="display: none;">Last Name is required</div>
          </div>
        </div>
        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label" for="wiz-dob">Date of Birth</label>
            <input type="date" id="wiz-dob" class="form-input" value="${wizard.dob || ''}" required>
            <div class="form-error" id="wiz-dob-error" style="display: none;">Please enter your date of birth</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="wiz-gender">Gender</label>
            <select id="wiz-gender" class="form-input">
              <option value="" ${!wizard.gender ? 'selected' : ''}>Select Gender</option>
              <option value="Male" ${wizard.gender === 'Male' ? 'selected' : ''}>Male</option>
              <option value="Female" ${wizard.gender === 'Female' ? 'selected' : ''}>Female</option>
              <option value="Other" ${wizard.gender === 'Other' ? 'selected' : ''}>Other</option>
            </select>
            <div class="form-error" id="wiz-gender-error" style="display: none;">Gender is required</div>
          </div>
        </div>
      </div>
    `;
  } else if (currentStep === 2) {
    stepContentHtml = `
      <div class="wizard-panel">
        <h3 style="margin-bottom: 24px; color: var(--primary);">Step 2: Location & Lease Preferences</h3>
        
        <div class="form-group">
          <label class="form-label" for="wiz-state">Target State (Nigeria)</label>
          <select id="wiz-state" class="form-input">
            <option value="Lagos" ${wizard.preferredState === 'Lagos' ? 'selected' : ''}>Lagos</option>
            <option value="Abuja" ${wizard.preferredState === 'Abuja' ? 'selected' : ''}>Abuja (FCT)</option>
            <option value="Rivers" ${wizard.preferredState === 'Rivers' ? 'selected' : ''}>Rivers (Port Harcourt)</option>
            <option value="Oyo" ${wizard.preferredState === 'Oyo' ? 'selected' : ''}>Oyo (Ibadan)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Preferred Neighborhoods (Select multiple)</label>
          <div class="grid grid-3" style="margin-top: 8px;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-caption);">
              <input type="checkbox" class="lga-check" value="Ikoyi" ${wizard.preferredLgas.includes('Ikoyi') ? 'checked' : ''}> Ikoyi
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-caption);">
              <input type="checkbox" class="lga-check" value="Lekki" ${wizard.preferredLgas.includes('Lekki') ? 'checked' : ''}> Lekki
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-caption);">
              <input type="checkbox" class="lga-check" value="Ikeja" ${wizard.preferredLgas.includes('Ikeja') ? 'checked' : ''}> Ikeja
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-caption);">
              <input type="checkbox" class="lga-check" value="Victoria Island" ${wizard.preferredLgas.includes('Victoria Island') ? 'checked' : ''}> Victoria Island
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-caption);">
              <input type="checkbox" class="lga-check" value="Yaba" ${wizard.preferredLgas.includes('Yaba') ? 'checked' : ''}> Yaba
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-caption);">
              <input type="checkbox" class="lga-check" value="Surulere" ${wizard.preferredLgas.includes('Surulere') ? 'checked' : ''}> Surulere
            </label>
          </div>
          <div class="form-error" id="wiz-lga-error" style="display: none; margin-top: 12px;">Please select at least one preferred neighborhood</div>
        </div>

        <div class="form-group">
          <label class="form-label" for="wiz-leaseterm">Lease Duration Target</label>
          <select id="wiz-leaseterm" class="form-input">
            <option value="6" ${wizard.leaseTerm === '6' ? 'selected' : ''}>6 Months (Short lease)</option>
            <option value="12" ${wizard.leaseTerm === '12' ? 'selected' : ''}>12 Months (Standard annual)</option>
            <option value="24" ${wizard.leaseTerm === '24' ? 'selected' : ''}>24 Months (Long lease)</option>
          </select>
        </div>
      </div>
    `;
  } else if (currentStep === 3) {
    stepContentHtml = `
      <div class="wizard-panel">
        <h3 style="margin-bottom: 24px; color: var(--primary);">Step 3: Housing & Budget Preferences</h3>
        
        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label" for="wiz-propertytype">Desired Property Type</label>
            <select id="wiz-propertytype" class="form-input">
              <option value="Apartment" ${wizard.propertyType === 'Apartment' ? 'selected' : ''}>Apartment / Flat</option>
              <option value="Duplex" ${wizard.propertyType === 'Duplex' ? 'selected' : ''}>Duplex / Townhouse</option>
              <option value="Self Contain" ${wizard.propertyType === 'Self Contain' ? 'selected' : ''}>Self-Contain / Studio</option>
              <option value="Shared Room" ${wizard.propertyType === 'Shared Room' ? 'selected' : ''}>Shared Apartment</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="wiz-bedrooms">Minimum Bedrooms</label>
            <select id="wiz-bedrooms" class="form-input">
              <option value="1" ${wizard.bedrooms === '1' ? 'selected' : ''}>1 Bedroom</option>
              <option value="2" ${wizard.bedrooms === '2' ? 'selected' : ''}>2 Bedrooms</option>
              <option value="3" ${wizard.bedrooms === '3' ? 'selected' : ''}>3 Bedrooms</option>
              <option value="4+" ${wizard.bedrooms === '4+' ? 'selected' : ''}>4+ Bedrooms</option>
            </select>
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label" for="wiz-budgetmin">Min Annual Rent (₦)</label>
            <input type="number" id="wiz-budgetmin" class="form-input" placeholder="e.g. 1000000" value="${wizard.budgetMin || ''}">
            <div class="form-error" id="wiz-budgetmin-error" style="display: none;">Please enter a valid minimum budget</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="wiz-budgetmax">Max Annual Rent (₦)</label>
            <input type="number" id="wiz-budgetmax" class="form-input" placeholder="e.g. 3000000" value="${wizard.budgetMax || ''}">
            <div class="form-error" id="wiz-budgetmax-error" style="display: none;">Max budget must be greater than min budget</div>
          </div>
        </div>
      </div>
    `;
  } else if (currentStep === 4) {
    stepContentHtml = `
      <div class="wizard-panel">
        <h3 style="margin-bottom: 24px; color: var(--primary);">Step 4: Employment Information</h3>
        
        <div class="form-group">
          <label class="form-label" for="wiz-empstatus">Employment Status</label>
          <select id="wiz-empstatus" class="form-input">
            <option value="Employed" ${wizard.employmentStatus === 'Employed' ? 'selected' : ''}>Full-time Employed</option>
            <option value="Self-Employed" ${wizard.employmentStatus === 'Self-Employed' ? 'selected' : ''}>Self-Employed / Business Owner</option>
            <option value="Student" ${wizard.employmentStatus === 'Student' ? 'selected' : ''}>Student</option>
            <option value="Unemployed" ${wizard.employmentStatus === 'Unemployed' ? 'selected' : ''}>Unemployed / Other</option>
          </select>
        </div>

        <div id="employment-conditional-fields">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label" for="wiz-employer">Employer / Company Name</label>
              <input type="text" id="wiz-employer" class="form-input" placeholder="e.g. KPMG, Flutterwave" value="${wizard.employerName || ''}">
              <div class="form-error" id="wiz-employer-error" style="display: none;">Employer name is required</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="wiz-jobtitle">Job Title</label>
              <input type="text" id="wiz-jobtitle" class="form-input" placeholder="e.g. Senior Software Engineer" value="${wizard.jobTitle || ''}">
              <div class="form-error" id="wiz-job-error" style="display: none;">Job title is required</div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (currentStep === 5) {
    stepContentHtml = `
      <div class="wizard-panel">
        <h3 style="margin-bottom: 24px; color: var(--primary);">Step 5: Income Information</h3>
        
        <div class="form-group">
          <label class="form-label" for="wiz-income">Monthly Take-Home Income (₦)</label>
          <input type="number" id="wiz-income" class="form-input" placeholder="e.g. 500000" value="${wizard.monthlyIncome || ''}" required>
          <div class="form-error" id="wiz-income-error" style="display: none;">Please enter your monthly income</div>
        </div>

        <div class="form-group">
          <div class="toggle-group">
            <div>
              <strong style="font-size: var(--font-body); color: var(--primary);">Tax Clearance Document Available</strong>
              <p style="font-size: var(--font-small); color: var(--neutral-600); margin-top: 2px;">Check if you possess valid FIRS / LIRS tax receipts.</p>
            </div>
            <div class="toggle-btn ${wizard.hasTaxClearance ? 'active' : ''}" id="toggle-tax"></div>
          </div>
        </div>
      </div>
    `;
  } else if (currentStep === 6) {
    stepContentHtml = `
      <div class="wizard-panel">
        <h3 style="margin-bottom: 24px; color: var(--primary);">Step 6: Lifestyle Preferences</h3>
        <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 24px;">
          Sharing your lifestyle habits makes landlord matching faster and reduces lease friction.
        </p>

        <div class="lifestyle-options-grid">
          <div class="toggle-group">
            <div>
              <strong style="font-size: var(--font-caption); color: var(--primary);">Do you have pets?</strong>
            </div>
            <div class="toggle-btn ${wizard.hasPets ? 'active' : ''}" id="toggle-pets"></div>
          </div>

          <div class="toggle-group">
            <div>
              <strong style="font-size: var(--font-caption); color: var(--primary);">Do you smoke?</strong>
            </div>
            <div class="toggle-btn ${wizard.isSmoker ? 'active' : ''}" id="toggle-smoker"></div>
          </div>

          <div class="toggle-group">
            <div>
              <strong style="font-size: var(--font-caption); color: var(--primary);">Work from home?</strong>
            </div>
            <div class="toggle-btn ${wizard.workFromHome ? 'active' : ''}" id="toggle-wfh"></div>
          </div>

          <div class="toggle-group">
            <div>
              <strong style="font-size: var(--font-caption); color: var(--primary);">Frequent guests?</strong>
            </div>
            <div class="toggle-btn ${wizard.hasGuests ? 'active' : ''}" id="toggle-guests"></div>
          </div>
        </div>
      </div>
    `;
  } else if (currentStep === 7) {
    stepContentHtml = `
      <div class="wizard-panel">
        <h3 style="margin-bottom: 24px; color: var(--primary);">Step 7: Review & Submit</h3>
        <p style="font-size: var(--font-caption); color: var(--neutral-600); margin-bottom: 24px;">
          Review your tenant profile values before linking them with government credentials.
        </p>

        <div style="background-color: var(--neutral-100); border: 1.5px solid var(--neutral-300); border-radius: var(--radius-md); padding: 24px; margin-bottom: 32px;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; font-size: var(--font-caption);">
            <div>
              <strong style="color: var(--neutral-600);">Legal Name:</strong>
              <p style="color: var(--primary); font-weight: 600; margin-top: 2px;">${wizard.firstName} ${wizard.lastName}</p>
            </div>
            <div>
              <strong style="color: var(--neutral-600);">Target Area:</strong>
              <p style="color: var(--primary); font-weight: 600; margin-top: 2px;">${wizard.preferredLgas.join(', ') || 'Any Area'} (${wizard.preferredState})</p>
            </div>
            <div>
              <strong style="color: var(--neutral-600);">Budget Range:</strong>
              <p style="color: var(--primary); font-weight: 600; margin-top: 2px;">₦${Number(wizard.budgetMin).toLocaleString()} - ₦${Number(wizard.budgetMax).toLocaleString()}</p>
            </div>
            <div>
              <strong style="color: var(--neutral-600);">Lease Term:</strong>
              <p style="color: var(--primary); font-weight: 600; margin-top: 2px;">${wizard.leaseTerm} Months</p>
            </div>
            <div>
              <strong style="color: var(--neutral-600);">Employment:</strong>
              <p style="color: var(--primary); font-weight: 600; margin-top: 2px;">${wizard.employmentStatus} ${wizard.employerName ? `at ${wizard.employerName}` : ''}</p>
            </div>
            <div>
              <strong style="color: var(--neutral-600);">Monthly Income:</strong>
              <p style="color: var(--primary); font-weight: 600; margin-top: 2px;">₦${Number(wizard.monthlyIncome).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 24px;">
          <input type="checkbox" id="wiz-agreement" style="width: 20px; height: 20px; cursor: pointer; margin-top: 2px;">
          <label for="wiz-agreement" style="font-size: var(--font-caption); color: var(--neutral-700); cursor: pointer; user-select: none;">
            I confirm that the above profile details match my legal identities, and authorize Haven to calculate qualification metrics.
          </label>
        </div>
        <div class="form-error" id="wiz-agreement-error" style="display: none; margin-bottom: 24px;">You must agree to the terms to submit your profile</div>
      </div>
    `;
  }

  const html = `
    <div class="container" style="max-width: 900px; padding-top: 48px; padding-bottom: 48px;">
      <div class="card">
        <!-- Progress Stepper Header -->
        <div class="wizard-progress-container">
          <div class="wizard-steps-indicator">
            <div class="wizard-progress-bar-fill" style="width: ${progressFillWidth}%;"></div>
            ${stepNodes}
          </div>
        </div>

        <!-- Dynamic Form Pane -->
        <div style="min-height: 280px; margin-bottom: 32px;">
          ${stepContentHtml}
        </div>

        <!-- Wizard Navigation Footer -->
        <div style="display: flex; justify-content: space-between; border-top: 1.5px solid var(--neutral-200); padding-top: 24px;">
          <button class="btn btn-outline" id="wiz-prev-btn" ${currentStep === 1 ? 'disabled' : ''}>
            &larr; Back
          </button>
          
          <button class="btn btn-primary" id="wiz-next-btn">
            ${currentStep === totalSteps ? 'Submit Profile' : 'Next Step &rarr;'}
          </button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    // Bind stepper nav triggers
    const prevBtn = document.getElementById('wiz-prev-btn');
    const nextBtn = document.getElementById('wiz-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          store.setWizardState({ currentStep: currentStep - 1 });
        }
      });
    }

    // Toggle logic step 5 and 6
    const toggleTax = document.getElementById('toggle-tax');
    if (toggleTax) {
      toggleTax.addEventListener('click', () => {
        const isAct = toggleTax.classList.contains('active');
        toggleTax.classList.toggle('active', !isAct);
        store.setWizardState({ hasTaxClearance: !isAct });
      });
    }

    const togglePets = document.getElementById('toggle-pets');
    if (togglePets) {
      togglePets.addEventListener('click', () => {
        const isAct = togglePets.classList.contains('active');
        togglePets.classList.toggle('active', !isAct);
        store.setWizardState({ hasPets: !isAct });
      });
    }

    const toggleSmoker = document.getElementById('toggle-smoker');
    if (toggleSmoker) {
      toggleSmoker.addEventListener('click', () => {
        const isAct = toggleSmoker.classList.contains('active');
        toggleSmoker.classList.toggle('active', !isAct);
        store.setWizardState({ isSmoker: !isAct });
      });
    }

    const toggleWfh = document.getElementById('toggle-wfh');
    if (toggleWfh) {
      toggleWfh.addEventListener('click', () => {
        const isAct = toggleWfh.classList.contains('active');
        toggleWfh.classList.toggle('active', !isAct);
        store.setWizardState({ workFromHome: !isAct });
      });
    }

    const toggleGuests = document.getElementById('toggle-guests');
    if (toggleGuests) {
      toggleGuests.addEventListener('click', () => {
        const isAct = toggleGuests.classList.contains('active');
        toggleGuests.classList.toggle('active', !isAct);
        store.setWizardState({ hasGuests: !isAct });
      });
    }

    // Conditional Fields Step 4
    const empStatusSelect = document.getElementById('wiz-empstatus');
    if (empStatusSelect) {
      empStatusSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        const condFields = document.getElementById('employment-conditional-fields');
        if (condFields) {
          condFields.style.display = (val === 'Employed' || val === 'Self-Employed') ? 'block' : 'none';
        }
      });
      // Trigger change initially to render correctly
      empStatusSelect.dispatchEvent(new Event('change'));
    }

    // Next handler
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        // Step Validation
        if (currentStep === 1) {
          const fn = document.getElementById('wiz-firstname');
          const ln = document.getElementById('wiz-lastname');
          const dob = document.getElementById('wiz-dob');
          const gender = document.getElementById('wiz-gender');

          const fnErr = document.getElementById('wiz-first-error');
          const lnErr = document.getElementById('wiz-last-error');
          const dobErr = document.getElementById('wiz-dob-error');
          const genErr = document.getElementById('wiz-gender-error');

          let stepValid = true;

          fnErr.style.display = 'none';
          lnErr.style.display = 'none';
          dobErr.style.display = 'none';
          genErr.style.display = 'none';

          if (!fn.value.trim()) {
            fnErr.style.display = 'flex';
            stepValid = false;
          }
          if (!ln.value.trim()) {
            lnErr.style.display = 'flex';
            stepValid = false;
          }
          if (!dob.value) {
            dobErr.style.display = 'flex';
            stepValid = false;
          }
          if (!gender.value) {
            genErr.style.display = 'flex';
            stepValid = false;
          }

          if (!stepValid) return;

          store.setWizardState({
            firstName: fn.value.trim(),
            lastName: ln.value.trim(),
            dob: dob.value,
            gender: gender.value,
            currentStep: 2
          });
        }
        else if (currentStep === 2) {
          const stateVal = document.getElementById('wiz-state').value;
          const leaseVal = document.getElementById('wiz-leaseterm').value;
          
          const checks = document.querySelectorAll('.lga-check:checked');
          const lgaErr = document.getElementById('wiz-lga-error');
          
          lgaErr.style.display = 'none';
          
          if (checks.length === 0) {
            lgaErr.style.display = 'flex';
            return;
          }

          const lgas = Array.from(checks).map(c => c.value);

          store.setWizardState({
            preferredState: stateVal,
            preferredLgas: lgas,
            leaseTerm: leaseVal,
            currentStep: 3
          });
        }
        else if (currentStep === 3) {
          const propType = document.getElementById('wiz-propertytype').value;
          const beds = document.getElementById('wiz-bedrooms').value;
          const minBud = document.getElementById('wiz-budgetmin');
          const maxBud = document.getElementById('wiz-budgetmax');

          const minErr = document.getElementById('wiz-budgetmin-error');
          const maxErr = document.getElementById('wiz-budgetmax-error');

          minErr.style.display = 'none';
          maxErr.style.display = 'none';

          let stepValid = true;
          const minNum = Number(minBud.value);
          const maxNum = Number(maxBud.value);

          if (!minBud.value || minNum <= 0) {
            minErr.style.display = 'flex';
            stepValid = false;
          }
          if (!maxBud.value || maxNum <= minNum) {
            maxErr.style.display = 'flex';
            stepValid = false;
          }

          if (!stepValid) return;

          store.setWizardState({
            propertyType: propType,
            bedrooms: beds,
            budgetMin: minBud.value,
            budgetMax: maxBud.value,
            currentStep: 4
          });
        }
        else if (currentStep === 4) {
          const emp = document.getElementById('wiz-empstatus').value;
          
          let empName = '';
          let job = '';

          if (emp === 'Employed' || emp === 'Self-Employed') {
            const employerInput = document.getElementById('wiz-employer');
            const jobInput = document.getElementById('wiz-jobtitle');
            const empErr = document.getElementById('wiz-employer-error');
            const jobErr = document.getElementById('wiz-job-error');

            empErr.style.display = 'none';
            jobErr.style.display = 'none';

            let stepValid = true;
            if (!employerInput.value.trim()) {
              empErr.style.display = 'flex';
              stepValid = false;
            }
            if (!jobInput.value.trim()) {
              jobErr.style.display = 'flex';
              stepValid = false;
            }

            if (!stepValid) return;

            empName = employerInput.value.trim();
            job = jobInput.value.trim();
          }

          store.setWizardState({
            employmentStatus: emp,
            employerName: empName,
            jobTitle: job,
            currentStep: 5
          });
        }
        else if (currentStep === 5) {
          const inc = document.getElementById('wiz-income');
          const incErr = document.getElementById('wiz-income-error');
          incErr.style.display = 'none';

          if (!inc.value || Number(inc.value) <= 0) {
            incErr.style.display = 'flex';
            return;
          }

          store.setWizardState({
            monthlyIncome: inc.value,
            currentStep: 6
          });
        }
        else if (currentStep === 6) {
          // Values were updated reactively on toggles
          store.setWizardState({ currentStep: 7 });
        }
        else if (currentStep === 7) {
          const agree = document.getElementById('wiz-agreement');
          const agreeErr = document.getElementById('wiz-agreement-error');
          
          agreeErr.style.display = 'none';
          
          if (!agree.checked) {
            agreeErr.style.display = 'flex';
            return;
          }

          // Complete Profile flow
          const updatedUser = {
            ...user,
            name: `${wizard.firstName} ${wizard.lastName}`,
            profileComplete: true
          };

          store.setState({ user: updatedUser });
          alert('Profile successfully submitted! Redirecting to Identity Verification Center.');
          window.location.hash = 'verify';
        }
      });
    }
  }, 0);

  return html;
}

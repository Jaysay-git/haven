// Haven Rental Intelligence Platform - Main entrypoint & coordinator
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { LandingPage } from './screens/LandingPage.js';
import { Register } from './screens/Register.js';
import { Login } from './screens/Login.js';
import { OTPVerification } from './screens/OTPVerification.js';
import { ProfileWizard } from './screens/ProfileWizard.js';
import { VerificationCenter } from './screens/VerificationCenter.js';
import { Dashboard } from './screens/Dashboard.js';
import { PropertyDiscovery } from './screens/PropertyDiscovery.js';
import { LeasingWorkflow } from './screens/LeasingWorkflow.js';
import { EscrowWallet } from './screens/EscrowWallet.js';
import { LandlordPortal } from './screens/LandlordPortal.js';
import { PartnerPortal } from './screens/PartnerPortal.js';
import { AdminConsole } from './screens/AdminConsole.js';
import { LandlordLogin } from './screens/LandlordLogin.js';
import { LandlordRegister } from './screens/LandlordRegister.js';
import { ForgotPassword } from './screens/ForgotPassword.js';
import { ResetPassword } from './screens/ResetPassword.js';
import { EmployeePortal } from './screens/EmployeePortal.js';


// --- Reusable Thousands-Separator Commas Formatting Utility ---
window.formatCurrency = function(val) {
  if (val === null || val === undefined || val === '') return '';
  let str = String(val).trim();
  
  // Extract currency symbol prefix if present
  let prefix = '';
  if (str.startsWith('₦')) {
    prefix = '₦';
    str = str.substring(1).trim();
  } else if (str.toLowerCase().startsWith('n')) {
    const afterN = str.substring(1).trim();
    if (!isNaN(Number(afterN.replace(/,/g, '')))) {
      prefix = str.substring(0, 1);
      str = afterN;
    }
  } else if (str.startsWith('$')) {
    prefix = '$';
    str = str.substring(1).trim();
  }
  
  const cleanStr = str.replace(/,/g, '');
  const num = Number(cleanStr);
  if (!isNaN(num) && cleanStr !== '') {
    // If original string had decimals, preserve them
    if (cleanStr.includes('.')) {
      const parts = cleanStr.split('.');
      const integerPart = Number(parts[0]);
      if (isNaN(integerPart)) return val;
      return prefix + integerPart.toLocaleString('en-US') + '.' + parts[1];
    }
    return prefix + num.toLocaleString('en-US');
  }
  
  return val;
};

// --- Reusable Currency Input Comma Formatter WITH Cursor Preservation ---
window.formatInputAsCurrency = function(input) {
  const originalValueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
  const rawDOMValue = originalValueDescriptor.get.call(input);
  
  // Requirement 4: Strip all non-numeric characters to enforce only digits
  const cleanDigits = rawDOMValue.replace(/\D/g, '');
  
  if (cleanDigits === '') {
    originalValueDescriptor.set.call(input, '');
    return;
  }
  
  const num = Number(cleanDigits);
  const formatted = num.toLocaleString('en-US');
  
  // Selection start selection tracking
  const selectionStart = input.selectionStart;
  const prefixRaw = rawDOMValue.substring(0, selectionStart);
  const digitsBeforeCursor = prefixRaw.replace(/\D/g, '').length;
  
  originalValueDescriptor.set.call(input, formatted);
  
  // Requirement 2: Recalculate cursor position to prevent jumping
  let newCursorPos = 0;
  let digitsSeen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (digitsSeen === digitsBeforeCursor) {
      break;
    }
    newCursorPos++;
    if (/\d/.test(formatted[i])) {
      digitsSeen++;
    }
  }
  
  input.setSelectionRange(newCursorPos, newCursorPos);
};

// --- Format all currency inputs currently present in the DOM ---
window.formatAllCurrencyInputs = function() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(target => {
    const matchesKeyword = /amount|budget|stipend|limit|allocation|withdraw|fund|income|rent|caution|share|subsidy|charge|profit/i.test(target.id);
    const isExcluded = /acct|account|phone|mobile|otp|pin|code/i.test(target.id);
    const isCurrencyInput = target.hasAttribute('data-currency-input') || 
                            target.classList.contains('currency-formatted') ||
                            (matchesKeyword && !isExcluded);
    
    if (isCurrencyInput && target.type !== 'checkbox' && target.type !== 'radio') {
      target.setAttribute('data-currency-input', 'true');
      if (target.type === 'number') {
        target.type = 'text';
      }
      
      const originalValueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
      const val = originalValueDescriptor.get.call(target);
      if (val !== '') {
        const cleanDigits = String(val).replace(/\D/g, '');
        const num = Number(cleanDigits);
        const formatted = isNaN(num) ? '' : num.toLocaleString('en-US');
        originalValueDescriptor.set.call(target, formatted);
      }
    }
  });
};

// Override value getter and setter globally so calculations read numeric strings
const originalValueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
Object.defineProperty(HTMLInputElement.prototype, 'value', {
  get() {
    const rawValue = originalValueDescriptor.get.call(this);
    if (this.hasAttribute('data-currency-input') || this.classList.contains('currency-formatted') || this.dataset.numericFormatted === 'true') {
      return rawValue.replace(/,/g, '');
    }
    return rawValue;
  },
  set(val) {
    if (this.hasAttribute('data-currency-input') || this.classList.contains('currency-formatted') || this.dataset.numericFormatted === 'true') {
      if (val === null || val === undefined || val === '') {
        originalValueDescriptor.set.call(this, '');
      } else {
        const cleanDigits = String(val).replace(/\D/g, '');
        const num = Number(cleanDigits);
        const formatted = isNaN(num) ? '' : num.toLocaleString('en-US');
        originalValueDescriptor.set.call(this, formatted);
      }
    } else {
      originalValueDescriptor.set.call(this, val);
    }
  },
  configurable: true
});

// Intercept user typing site-wide for comma formatting
document.addEventListener('input', (e) => {
  const target = e.target;
  if (target && target.tagName === 'INPUT') {
    const matchesKeyword = /amount|budget|stipend|limit|allocation|withdraw|fund|income|rent|caution|share|subsidy|charge|profit/i.test(target.id);
    const isExcluded = /acct|account|phone|mobile|otp|pin|code/i.test(target.id);
    const isCurrencyInput = target.hasAttribute('data-currency-input') || 
                            target.classList.contains('currency-formatted') ||
                            (matchesKeyword && !isExcluded);
    
    if (isCurrencyInput && target.type !== 'checkbox' && target.type !== 'radio') {
      target.setAttribute('data-currency-input', 'true');
      if (target.type === 'number') {
        target.type = 'text';
      }
      window.formatInputAsCurrency(target);
    }
  }
});

// --- Sync Employee Status on Tenant Signup / Login ---
window.updateEmployeeStatusToAccepted = function(email, state, updateState) {
  if (!email) return;
  const cleanEmail = email.toLowerCase().trim();
  
  // Scan all keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('haven_corp_account_')) {
      try {
        const corpData = JSON.parse(localStorage.getItem(key));
        if (corpData && Array.isArray(corpData.corporateEmployees)) {
          let updated = false;
          corpData.corporateEmployees = corpData.corporateEmployees.map(emp => {
            if (emp.email && emp.email.toLowerCase().trim() === cleanEmail) {
              if (emp.status === 'Pending') {
                emp.status = 'Accepted';
                emp.rentStatus = 'Searching';
                updated = true;
              }
            }
            return emp;
          });
          
          if (updated) {
            localStorage.setItem(key, JSON.stringify(corpData));
            console.log(`[Roster Sync] Employee ${cleanEmail} status updated to Accepted in corporate workspace ${key}`);
            
            // If the currently logged-in user is this corporate account, update active memory state
            if (state && state.user && state.user.role === 'Corporate Partner' && state.user.username.toLowerCase() === corpData.username.toLowerCase()) {
              if (updateState) {
                updateState({ corporateEmployees: corpData.corporateEmployees });
              } else {
                state.corporateEmployees = corpData.corporateEmployees;
              }
            }
          }
        }
      } catch (e) {
        console.error('Error parsing corporate account data during registration sync', e);
      }
    }
  }
};

// Old descriptor override removed (merged with the global currency input descriptor above)

// Global Success / Alert Custom Modal Override
window.alert = function(message) {
  const lowerMsg = message.toLowerCase();
  
  // Categorize standard alerts vs success popups
  const isSuccess = lowerMsg.includes('success') || 
                    lowerMsg.includes('approved') || 
                    lowerMsg.includes('verified') || 
                    lowerMsg.includes('submitted') || 
                    lowerMsg.includes('saved') || 
                    lowerMsg.includes('completed') || 
                    lowerMsg.includes('signed') || 
                    lowerMsg.includes('cleared') || 
                    lowerMsg.includes('released') || 
                    lowerMsg.includes('disbursed') || 
                    lowerMsg.includes('added') || 
                    lowerMsg.includes('registered') ||
                    lowerMsg.includes('created') ||
                    lowerMsg.includes('enrolled') ||
                    lowerMsg.includes('payout') ||
                    lowerMsg.includes('dispatched') ||
                    lowerMsg.includes('locked') ||
                    lowerMsg.includes('correct') ||
                    lowerMsg.includes('ok');

  const title = isSuccess ? 'Action Successful' : 'Haven System Alert';
  const themeColor = isSuccess ? '#34A853' : '#F59E0B';
  const iconSvg = isSuccess ? `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ` : `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  `;
  const iconBg = isSuccess ? '#E6F4EA' : '#FEF3C7';

  // Check if modal already exists, remove it
  const existing = document.getElementById('global-success-modal');
  if (existing) existing.remove();

  // Create modal element
  const modal = document.createElement('div');
  modal.id = 'global-success-modal';
  modal.className = 'global-success-modal-overlay';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(13, 27, 75, 0.65);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20000;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  `;

  modal.innerHTML = `
    <div class="modal-card animate-fade-in" style="
      background: white;
      border-radius: 12px;
      padding: 32px;
      width: 90%;
      max-width: 420px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      text-align: center;
      position: relative;
      border-top: 4px solid ${themeColor};
    ">
      <button class="modal-close-icon-btn" id="success-modal-close-icon" style="
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        background: none;
        border: none;
        color: #9CA3AF;
        padding: 4px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      ">&times;</button>

      <div style="
        width: 56px;
        height: 56px;
        background: ${iconBg};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px auto;
        color: ${themeColor};
      ">
        ${iconSvg}
      </div>

      <h3 style="
        font-size: 18px;
        font-weight: bold;
        color: var(--color-primary, #0D1B4B);
        margin-top: 0;
        margin-bottom: 12px;
        font-family: 'Hanken Grotesk', sans-serif;
      ">${title}</h3>

      <p style="
        font-size: 13px;
        color: #4B5563;
        line-height: 1.6;
        margin-top: 0;
        margin-bottom: 24px;
        font-family: 'Hanken Grotesk', sans-serif;
        white-space: pre-wrap;
      ">${message}</p>

      <button type="button" class="btn btn-primary" id="success-modal-close-btn" style="
        width: 100%;
        padding: 12px 0;
        font-weight: bold;
        background: var(--color-primary, #0D1B4B);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-family: 'Hanken Grotesk', sans-serif;
      ">Continue</button>
    </div>
  `;

  document.body.appendChild(modal);

  // Trigger browser paint
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);

  const closeModal = () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
    }, 200);
  };

  modal.querySelector('#success-modal-close-icon').addEventListener('click', closeModal);
  modal.querySelector('#success-modal-close-btn').addEventListener('click', closeModal);
};

window.showConfirmModal = function(message, onConfirm, onCancel) {
  // Check if modal already exists, remove it
  const existing = document.getElementById('global-confirm-modal');
  if (existing) existing.remove();

  // Create modal element
  const modal = document.createElement('div');
  modal.id = 'global-confirm-modal';
  modal.className = 'global-success-modal-overlay';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(13, 27, 75, 0.65);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20000;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  `;

  modal.innerHTML = `
    <div class="modal-card animate-fade-in" style="
      background: white;
      border-radius: 12px;
      padding: 32px;
      width: 90%;
      max-width: 420px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      text-align: center;
      position: relative;
      border-top: 4px solid #F59E0B;
    ">
      <button class="modal-close-icon-btn" id="confirm-modal-close-icon" style="
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        background: none;
        border: none;
        color: #9CA3AF;
        padding: 4px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      ">&times;</button>

      <div style="
        width: 56px;
        height: 56px;
        background: #FEF3C7;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px auto;
        color: #F59E0B;
      ">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>

      <h3 style="
        font-size: 17px;
        font-weight: bold;
        color: var(--color-primary, #0D1B4B);
        margin-top: 0;
        margin-bottom: 12px;
        font-family: 'Hanken Grotesk', sans-serif;
      ">Action Confirmation</h3>

      <p style="
        font-size: 13px;
        color: #4B5563;
        line-height: 1.6;
        margin-top: 0;
        margin-bottom: 24px;
        font-family: 'Hanken Grotesk', sans-serif;
        white-space: pre-wrap;
      ">${message}</p>

      <div style="display: flex; gap: 12px;">
        <button type="button" class="btn btn-outline" id="confirm-modal-cancel-btn" style="
          flex: 1;
          padding: 12px 0;
          font-weight: bold;
          border: 1px solid #D1D5DB;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-family: 'Hanken Grotesk', sans-serif;
          background: white;
          color: #4B5563;
          height: auto;
          line-height: 1;
        ">Cancel</button>
        <button type="button" class="btn btn-primary" id="confirm-modal-accept-btn" style="
          flex: 1;
          padding: 12px 0;
          font-weight: bold;
          background: var(--color-primary, #0D1B4B);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-family: 'Hanken Grotesk', sans-serif;
          height: auto;
          line-height: 1;
        ">Confirm</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Trigger browser paint
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);

  const closeConfirm = () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
    }, 200);
  };

  modal.querySelector('#confirm-modal-close-icon').addEventListener('click', () => {
    closeConfirm();
    if (onCancel) onCancel();
  });

  modal.querySelector('#confirm-modal-cancel-btn').addEventListener('click', () => {
    closeConfirm();
    if (onCancel) onCancel();
  });

  modal.querySelector('#confirm-modal-accept-btn').addEventListener('click', () => {
    closeConfirm();
    if (onConfirm) onConfirm();
  });
};

// 1. Core Application State
let state = {
  route: 'landing', // landing | register | login | otp | profile-wizard | verification-center | dashboard | discovery | leasing | wallet
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem('haven_session'));
    } catch (e) {
      return null;
    }
  })(), // logged in user details { username, role, method }
  registerTab: 'email', // email | phone
  loginTab: 'email', // email | phone
  preselectedRole: 'Tenant', // Tenant | Landlord | Agent | etc.
  verifyCenterTab: 'bvn', // bvn | nin | selfie | documents
  wizardStep: 1,

  // Milestone Navigation
  activeDashboardTab: 'overview', // overview | quality-score | profile | escrow-timeline | settings
  discoveryViewMode: 'grid', // grid | list
  activeDetailsPropertyId: null, // holds property ID currently viewed in details modal
  activeLeasingTab: 'applications', // applications | inspections | lease-studio | chat

  // Registration temporary state
  registrationData: null,

  // Profile Wizard details
  profileData: {
    personalInfo: {
      fullName: 'Osaze Alao',
      dob: '1998-05-12',
      gender: 'Male',
      phone: '+234 812 345 6789',
      email: 'osaze.alao@domain.com'
    },
    locationPreferences: {
      city: 'Lagos',
      neighborhoods: 'Lekki Phase 1, Victoria Island, Yaba',
      budget: '2500000'
    },
    housingPreferences: {
      propertyType: 'Apartment',
      bedrooms: '2',
      amenities: ['Power Backup', 'Security', 'Water Treatment']
    },
    employmentInfo: {
      status: 'Employed',
      employer: 'PropTech Labs Ltd',
      jobTitle: 'Senior UI/UX Analyst'
    },
    incomeInfo: { 
      monthlyIncome: '380000',
      statementUploaded: true 
    },
    lifestylePreferences: {
      pets: false,
      smoking: false,
      quietHours: true,
      sharing: false
    },
    rentalHistory: [
      { id: 1, landlord: 'Chief Alabi', property: '4b Admiralty Way, Lekki', duration: '2 Years (2024-2026)', exitReason: 'Relocating closer to workplace' }
    ],
    references: [
      { id: 1, name: 'Dr. Kunle Benson', relation: 'Former Landlord', contact: '+234 803 111 2222' },
      { id: 2, name: 'Mrs. Funmi Coker', relation: 'Professional Reference', contact: '+234 809 333 4444' }
    ]
  },

  // Verification status check states
  verification: {
    bvnStatus: 'approved',
    ninStatus: 'approved',
    selfieStatus: 'approved',
    employeeIdStatus: 'approved',
    studentIdStatus: 'unverified',
    documentStatus: 'approved'
  },

  // Tenant Quality Score Details
  score: {
    overall: 785,
    financial: 88,
    verification: 96,
    behavior: 90,
    affordability: 82,
    tier: 'Grade A',
    status: 'Excellent'
  },

  // Escrow Ledger Details (Milestone 2 Legacy Ledger)
  escrow: {
    cautionDeposit: 250000,
    advanceRent: 950000,
    totalSecured: 1200000,
    history: [
      { id: 1, type: 'Caution Deposit', amount: 250000, reference: 'ESC-8109-LA', status: 'Secured', date: '2026-06-18' },
      { id: 2, type: 'Advance Rent (10 Months)', amount: 950000, reference: 'ESC-8110-LA', status: 'Secured', date: '2026-06-18' }
    ]
  },

  // Activity Timeline
  timeline: [
    { id: 1, type: 'Agreement', text: 'Structured lease agreement counter-signed.', date: '2026-06-19', status: 'Completed' },
    { id: 2, type: 'Payment', text: 'Escrow caution fee and rent advance cleared.', date: '2026-06-18', status: 'Completed' },
    { id: 3, type: 'Inspection', text: 'Property inspection passed.', date: '2026-06-17', status: 'Completed' },
    { id: 4, type: 'Application', text: 'Qualification application approved.', date: '2026-06-16', status: 'Completed' }
  ],

  // In-app notifications
  notifications: [
    { id: 1, type: 'verification', text: 'Your biometric liveness selfie was matched against NIMC photo registry.', time: '10 mins ago', read: false },
    { id: 2, type: 'escrow', text: 'Caution deposit of ₦250,000 is locked in secure escrow.', time: '2 hrs ago', read: false },
    { id: 3, type: 'match', text: 'New Match: 3 Bed Apartment in Victoria Island fits your location preferences.', time: '1 day ago', read: true }
  ],

  // System Settings
  settings: {
    enable2FA: true,
    hideProfile: false,
    commEmail: true,
    commSMS: true,
    commInApp: true
  },

  // Properties Database
  properties: [
    {
      id: 1,
      title: 'Luxury 2 Bed Penthouse Duplex',
      rent: 3200000,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: 'Apartment',
      location: 'Lekki Phase 1',
      city: 'Lagos',
      mapX: 68,
      mapY: 55,
      amenities: ['Power Backup', 'Security', 'Water Treatment', 'Gym', 'Parking'],
      rules: 'No corporate parties, quiet hours after 10 PM. Domestic pets welcome.',
      availability: 'Available Now',
      analytics: { demand: 94, popularity: 97, views: 142 },
      match: {
        score: 98,
        affordability: 'Excellent (Rent comfortably fits salary)',
        lifestyle: 'Perfect (Quiet hours & pets match preferences)',
        commute: '12 mins commute to PropTech Labs office in Lekki',
        risk: 'Passed (Landlord identity & property deeds verified)'
      },
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'
    },
    {
      id: 2,
      title: 'Cozy 1 Bedroom Studio Loft',
      rent: 1400000,
      bedrooms: 1,
      bathrooms: 1,
      propertyType: 'Studio',
      location: 'Yaba',
      city: 'Lagos',
      mapX: 35,
      mapY: 32,
      amenities: ['Power Backup', 'Security', 'Water Treatment', 'Parking'],
      rules: 'Single occupancy only, quiet hours preferred, smoking strictly prohibited.',
      availability: 'Available July 1st',
      analytics: { demand: 82, popularity: 85, views: 88 },
      match: {
        score: 92,
        affordability: 'Excellent (Very high affordability margin)',
        lifestyle: 'Very Good (Non-smoking matching)',
        commute: '28 mins drive to Lekki workplace',
        risk: 'Passed (Landlord and utility bills validated)'
      },
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600'
    },
    {
      id: 3,
      title: 'Executive 3 Bed Serviced Flat',
      rent: 5500000,
      bedrooms: 3,
      bathrooms: 3,
      propertyType: 'Apartment',
      location: 'Victoria Island',
      city: 'Lagos',
      mapX: 58,
      mapY: 68,
      amenities: ['Power Backup', 'Security', 'Water Treatment', 'Gym', 'Parking', 'Pool'],
      rules: 'Corporate tenancies preferred. Small pets allowed upon notice.',
      availability: 'Available Now',
      analytics: { demand: 98, popularity: 94, views: 210 },
      match: {
        score: 85,
        affordability: 'Tight Fit (Consumes 48% of monthly income)',
        lifestyle: 'Good (Pool & gym matches recreation profile)',
        commute: '18 mins drive to Lekki',
        risk: 'Passed (Corporate land deeds fully audited)'
      },
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600'
    },
    {
      id: 4,
      title: 'GRA Executive 4 Bed Duplex',
      rent: 4500000,
      bedrooms: 4,
      bathrooms: 4,
      propertyType: 'Duplex',
      location: 'Ikeja GRA',
      city: 'Lagos',
      mapX: 20,
      mapY: 20,
      amenities: ['Power Backup', 'Security', 'Gym', 'Parking'],
      rules: 'Family occupancy only. Garden preservation requested.',
      availability: 'Available In 2 Weeks',
      analytics: { demand: 68, popularity: 72, views: 94 },
      match: {
        score: 75,
        affordability: 'Tight Fit (Exceeds monthly salary cap)',
        lifestyle: 'Good (Quiet suburbs matching)',
        commute: '54 mins drive to Lekki (High traffic)',
        risk: 'Passed (Landlord title documents validated)'
      },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600'
    },
    {
      id: 5,
      title: 'Surulere Shared 2 Bed Flat',
      rent: 900000,
      bedrooms: 2,
      bathrooms: 1,
      propertyType: 'Shared flat',
      location: 'Surulere',
      city: 'Lagos',
      mapX: 30,
      mapY: 52,
      amenities: ['Security', 'Parking'],
      rules: 'Roommate agreement terms apply. Cooking coordinates shared.',
      availability: '1 Room Available Now',
      analytics: { demand: 75, popularity: 78, views: 64 },
      match: {
        score: 78,
        affordability: 'Perfect (Extremely high safety margin)',
        lifestyle: 'Moderate (Must share common lounge areas)',
        commute: '38 mins drive to Lekki office',
        risk: 'Passed (Co-tenant BVN records verified)'
      },
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'
    },
    {
      id: 6,
      title: 'Modern 2 Bedroom Apartment',
      rent: 2200000,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: 'Apartment',
      location: 'Lekki Phase 2',
      city: 'Lagos',
      mapX: 84,
      mapY: 60,
      amenities: ['Power Backup', 'Security', 'Water Treatment', 'Parking'],
      rules: 'Quiet hours enforced after 10 PM. Strictly non-smoking.',
      availability: 'Available Now',
      analytics: { demand: 91, popularity: 88, views: 112 },
      match: {
        score: 95,
        affordability: 'Very Good (Sits in comfort range)',
        lifestyle: 'Perfect (Quiet hours & non-smoking match)',
        commute: '22 mins drive to Lekki Phase 1',
        risk: 'Passed (Title verify complete)'
      },
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600'
    }
  ],

  // Search filter options
  filters: {
    search: '',
    location: '',
    maxBudget: 6000000,
    bedrooms: '',
    propertyType: '',
    amenities: []
  },

  // Saved properties list
  favorites: [1],
  viewedProperties: [],

  // Applications, Inspections, & Leases
  applications: [
    { id: 1, propertyId: 1, title: 'Luxury 2 Bed Penthouse Duplex', landlord: 'Chief Alabi', landlordId: 'alabi', rent: 3200000, status: 'Under Review', actionRequired: 'Awaiting landlord inspection response' },
    { id: 2, propertyId: 2, title: 'Cozy 1 Bedroom Studio Loft', landlord: 'Mrs. Funmi Coker', landlordId: 'coker', rent: 1400000, status: 'Approved', actionRequired: 'Book Inspection' }
  ],

  inspections: [
    { id: 1, propertyId: 1, title: 'Luxury 2 Bed Penthouse Duplex', landlord: 'Chief Alabi', date: '2026-06-25', time: '11:00 AM', type: 'Physical Walkthrough', status: 'Upcoming' }
  ],

  activeLeaseAgreement: {
    propertyId: 2,
    propertyTitle: 'Cozy 1 Bedroom Studio Loft',
    landlordName: 'Mrs. Funmi Coker',
    rent: 1400000,
    status: 'Pending Signature',
    tenantSignature: '',
    landlordSignature: 'Funmi Coker'
  },

  chats: [
    {
      landlordId: 'alabi',
      landlordName: 'Chief Alabi',
      property: 'Luxury 2 Bed Penthouse Duplex',
      avatar: 'A',
      messages: [
        { id: 1, sender: 'landlord', text: 'Hello Osaze. I received your Haven application with a Grade A score. Impressive. When do you want to inspect the duplex?', time: 'Yesterday 4:30 PM' },
        { id: 2, sender: 'tenant', text: 'Thank you Chief. I would prefer a physical walkthrough this week if possible.', time: 'Yesterday 5:00 PM' }
      ]
    },
    {
      landlordId: 'coker',
      landlordName: 'Mrs. Funmi Coker',
      property: 'Cozy 1 Bedroom Studio Loft',
      avatar: 'C',
      messages: [
        { id: 1, sender: 'landlord', text: 'Hi Osaze, your application has been approved. Please book an inspection using the scheduler.', time: 'Today 9:15 AM' }
      ]
    }
  ],

  activeChatLandlordId: 'alabi',

  // ----------------------------------------------------
  // MILESTONE 5: ESCROW WALLET & PAYMENTS TRACKING STATE
  // ----------------------------------------------------
  walletBalance: 150000, // Available funds inside Haven Wallet

  escrowVaults: [
    {
      id: 1,
      title: 'Caution Vault: Lekki Penthouse',
      landlordName: 'Chief Alabi',
      cautionAmount: 250000,
      rentAmount: 2950000,
      totalSecured: 3200000,
      status: 'Funded', // Created | Awaiting Funding | Funded | Move-In Approved | Disputed | Refunded | Closed
      milestones: {
        leaseSigned: true,
        depositCleared: true,
        inspectionApproved: false,
        fundsReleased: false
      },
      timeline: [
        { text: 'Deposit payments locked in CBN compliance trust account.', date: '2026-06-18' },
        { text: 'Escrow vault envelope created fromCounter-Signed Lease.', date: '2026-06-18' }
      ]
    },
    {
      id: 2,
      title: 'Caution Vault: Yaba Cozy Studio Loft',
      landlordName: 'Mrs. Funmi Coker',
      cautionAmount: 200000,
      rentAmount: 1200000,
      totalSecured: 1400000,
      status: 'Closed',
      milestones: {
        leaseSigned: true,
        depositCleared: true,
        inspectionApproved: true,
        fundsReleased: true
      },
      timeline: [
        { text: 'Lease completed. Vault closed and audit envelope archived.', date: '2026-06-21' },
        { text: 'Escrow caution release payout cleared to Landlord.', date: '2026-06-20' },
        { text: 'Physical move-in inspection check approved by Tenant.', date: '2026-06-19' },
        { text: 'Escrow vault created and fully funded.', date: '2026-06-18' }
      ]
    }
  ],

  transactions: [
    { id: 1, type: 'Payout to Landlord', amount: 1400000, reference: 'TXN-9801-LA', date: '2026-06-20', status: 'Cleared', description: 'Lease rent caution disbursement for Yaba Studio' },
    { id: 2, type: 'Wallet Top-up', amount: 150000, reference: 'TXN-8502-LA', date: '2026-06-19', status: 'Cleared', description: 'Instant bank transfer top-up' },
    { id: 3, type: 'Escrow Lock', amount: 1400000, reference: 'TXN-7118-LA', date: '2026-06-18', status: 'Escrowed', description: 'Caution & Rent advance lock for Yaba Loft' },
    { id: 4, type: 'Escrow Lock', amount: 3200000, reference: 'TXN-6549-LA', date: '2026-06-18', status: 'Escrowed', description: 'Caution & Rent lock for Lekki Penthouse' }
  ],

  // Exception Flow Toggles
  mockConfig: {
    failOTP: false,
    failBVN: false,
    failNIN: false,
    duplicateAccount: false,
    incompleteProfile: false,
    inspectionNoShow: false,
    rejectedApplication: false,
    landlordCancellation: false
  }
};

// 2. Navigation Routing & Rendering Engine
function navigateTo(route) {
  let targetRoute = route;

  if (route === 'wallet') {
    state.activeDashboardTab = 'wallet';
    targetRoute = 'dashboard';
  } else if (route === 'profile-wizard') {
    state.activeDashboardTab = 'profile-wizard';
    targetRoute = 'dashboard';
  } else if (route === 'verification-center') {
    state.activeDashboardTab = 'verification-center';
    targetRoute = 'dashboard';
  }

  // Auth Middleware and Route Guarding
  const landlordProtected = ['landlord'];
  const partnerProtected = ['partner'];
  const adminProtected = ['admin'];
  const employeeProtected = ['employee'];
  const tenantProtected = ['dashboard', 'profile-wizard', 'verification-center', 'discovery', 'leasing', 'wallet'];
  const authRoutes = ['login', 'register', 'landlord-login', 'landlord-register', 'forgot-password', 'reset-password', 'otp'];

  if (state.user) {
    // If logged in, prevent accessing login/register auth routes. Redirect to correct portal.
    if (authRoutes.includes(targetRoute)) {
      if (state.user.role === 'Landlord' || state.user.role === 'Agent') {
        targetRoute = 'landlord';
      } else if (state.user.role === 'Corporate Partner' || state.user.role === 'University Housing' || state.user.role === 'NGO Coordinator') {
        targetRoute = 'partner';
      } else if (state.user.role === 'Admin') {
        targetRoute = 'admin';
      } else if (state.user.role === 'Employee') {
        targetRoute = 'employee';
      } else {
        targetRoute = 'dashboard';
      }
    }
    
    // Redirect Employee going to Dashboard (the Tenant Dashboard) to Employee Portal
    if (state.user.role === 'Employee' && targetRoute === 'dashboard') {
      targetRoute = 'employee';
    }

    // Role-based route guard enforcement
    if (landlordProtected.includes(targetRoute) && state.user.role !== 'Landlord' && state.user.role !== 'Agent') {
      targetRoute = state.user.role === 'Employee' ? 'employee' : 'dashboard';
    }
    if (tenantProtected.includes(targetRoute) && (state.user.role === 'Landlord' || state.user.role === 'Agent')) {
      targetRoute = 'landlord';
    }
    if (partnerProtected.includes(targetRoute) && !['Corporate Partner', 'University Housing', 'NGO Coordinator'].includes(state.user.role)) {
      targetRoute = state.user.role === 'Employee' ? 'employee' : 'dashboard';
    }
    if (adminProtected.includes(targetRoute) && state.user.role !== 'Admin') {
      targetRoute = state.user.role === 'Employee' ? 'employee' : 'dashboard';
    }
    if (employeeProtected.includes(targetRoute) && state.user.role !== 'Employee') {
      targetRoute = 'dashboard';
    }
  } else {
    // If not logged in, guard protected screens
    if (landlordProtected.includes(targetRoute)) {
      targetRoute = 'landlord-login';
    } else if (tenantProtected.includes(targetRoute) || partnerProtected.includes(targetRoute) || adminProtected.includes(targetRoute) || employeeProtected.includes(targetRoute)) {
      targetRoute = 'login';
    }
  }

  state.route = targetRoute;

  const targetHash = '#/' + targetRoute;
  if (window.location.hash !== targetHash) {
    window.location.hash = targetHash;
  }

  renderApp();
}

function updateState(newState) {
  Object.assign(state, newState);
  if ('user' in newState) {
    if (newState.user) {
      localStorage.setItem('haven_session', JSON.stringify(newState.user));
    } else {
      localStorage.removeItem('haven_session');
    }
  }

  // Save Corporate Partner scoped data
  if (state.user && state.user.role === 'Corporate Partner' && state.user.username.toLowerCase() !== 'partner.ops@firm.com') {
    const emailKey = 'haven_corp_account_' + state.user.username.toLowerCase();
    const existingStr = localStorage.getItem(emailKey);
    let accountData = {};
    if (existingStr) {
      try {
        accountData = JSON.parse(existingStr);
      } catch (e) {
        accountData = {};
      }
    }
    
    accountData.username = state.user.username;
    accountData.role = state.user.role;
    accountData.corporateDetails = state.user.corporateDetails;
    accountData.partnerPrograms = state.partnerPrograms || [];
    accountData.corporateEmployees = state.corporateEmployees || [];
    accountData.partnerRequests = state.partnerRequests || [];
    accountData.partnerEscrows = state.partnerEscrows || [];
    accountData.partnerInvites = state.partnerInvites || { invited: 0, joined: 0 };
    
    localStorage.setItem(emailKey, JSON.stringify(accountData));
  }

  // Persist non-transient application state
  const transientKeys = [
    'route',
    'registerTab',
    'loginTab',
    'preselectedRole',
    'verifyCenterTab',
    'wizardStep',
    'activeDashboardTab',
    'discoveryViewMode',
    'activeDetailsPropertyId',
    'activeLeasingTab',
    'registrationData',
    'mockConfig'
  ];

  const stateToSave = {};
  for (const key in state) {
    if (Object.prototype.hasOwnProperty.call(state, key) && !transientKeys.includes(key)) {
      stateToSave[key] = state[key];
    }
  }

  try {
    localStorage.setItem('haven_app_state', JSON.stringify(stateToSave));
  } catch (e) {
    console.error('Failed to save haven_app_state', e);
  }
}

// Map route identifiers to screen components
const screens = {
  landing: LandingPage,
  register: Register,
  login: Login,
  'landlord-login': LandlordLogin,
  'landlord-register': LandlordRegister,
  'forgot-password': ForgotPassword,
  'reset-password': ResetPassword,
  otp: OTPVerification,
  'profile-wizard': ProfileWizard,
  'verification-center': VerificationCenter,
  dashboard: Dashboard,
  discovery: PropertyDiscovery,
  leasing: LeasingWorkflow,
  wallet: EscrowWallet,
  landlord: LandlordPortal,
  partner: PartnerPortal,
  admin: AdminConsole,
  employee: EmployeePortal
};

function setupNumericInputs() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    const isExcludedType = ['password', 'hidden', 'checkbox', 'radio', 'date', 'file', 'submit', 'button'].includes(input.type);
    if (isExcludedType) return;

    // Check if input is a numeric/currency input
    const matchesKeyword = /amount|budget|stipend|limit|allocation|withdraw|fund|income|rent|caution|share|subsidy|charge|profit/i.test(input.id) ||
                           /amount|budget|stipend|limit|allocation|withdraw|fund|income|rent|caution|share|subsidy|charge|profit/i.test(input.name) ||
                           /amount|budget|stipend|limit|allocation|withdraw|fund|income|rent|caution|share|subsidy|charge|profit/i.test(input.placeholder);
    const isExcluded = /acct|account|phone|mobile|otp|pin|code/i.test(input.id);
    const isNumeric = (input.type === 'number' || matchesKeyword) && !isExcluded;

    if (isNumeric && input.dataset.numericFormatted !== 'true') {
      input.dataset.numericFormatted = 'true';
      input.setAttribute('data-currency-input', 'true');
      
      // Change type number to text to allow comma display
      if (input.type === 'number') {
        input.type = 'text';
      }
      
      // Format the initial value if one exists
      const originalValueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
      const currentVal = originalValueDescriptor.get.call(input);
      if (currentVal) {
        const cleanDigits = String(currentVal).replace(/\D/g, '');
        const num = Number(cleanDigits);
        const formatted = isNaN(num) ? '' : num.toLocaleString('en-US');
        originalValueDescriptor.set.call(input, formatted);
      }
    }
  });
}

function setupPasswordToggles() {
  const passwordInputs = document.querySelectorAll('input[type="password"], input[data-is-password="true"]');
  passwordInputs.forEach(input => {
    // If it's already wrapped or setup, skip it to avoid double-wrapping
    if (input.parentNode && input.parentNode.classList.contains('password-toggle-wrapper')) {
      return;
    }

    input.setAttribute('data-is-password', 'true');

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'password-toggle-wrapper';
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';
    
    // Copy some layout/spacing styles from the input to the wrapper so layout isn't broken
    const inputStyle = window.getComputedStyle(input);
    const marginTop = inputStyle.marginTop;
    const marginBottom = inputStyle.marginBottom;
    const marginLeft = inputStyle.marginLeft;
    const marginRight = inputStyle.marginRight;
    const display = inputStyle.display;

    if (display === 'inline' || display === 'inline-block') {
      wrapper.style.display = 'inline-block';
    } else {
      wrapper.style.display = 'block';
    }

    wrapper.style.margin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;

    // Reset input margins since they are now handled by the wrapper
    input.style.marginTop = '0px';
    input.style.marginBottom = '0px';
    input.style.marginLeft = '0px';
    input.style.marginRight = '0px';

    // Adjust input styles to fill the wrapper and have room for the eye icon
    input.style.paddingRight = '40px';
    input.style.width = '100%';
    input.style.boxSizing = 'border-box';

    // Insert wrapper before input in the DOM
    input.parentNode.insertBefore(wrapper, input);
    // Move input inside wrapper
    wrapper.appendChild(input);

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'password-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Show password');
    
    // Style toggle button
    toggleBtn.style.position = 'absolute';
    toggleBtn.style.right = '10px';
    toggleBtn.style.top = '50%';
    toggleBtn.style.transform = 'translateY(-50%)';
    toggleBtn.style.background = 'none';
    toggleBtn.style.border = 'none';
    toggleBtn.style.padding = '6px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.display = 'flex';
    toggleBtn.style.alignItems = 'center';
    toggleBtn.style.justifyContent = 'center';
    toggleBtn.style.zIndex = '5';
    
    // WCAG AA Contrast color: #374151 (gray-700) - meets contrast requirement on white and light grays
    toggleBtn.style.color = '#374151';
    
    // Eye icon SVGs
    const eyeSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `;
    const eyeOffSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    `;

    toggleBtn.innerHTML = eyeSvg;
    wrapper.appendChild(toggleBtn);

    // Event listener
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.innerHTML = eyeOffSvg;
        toggleBtn.setAttribute('aria-label', 'Hide password');
      } else {
        input.type = 'password';
        toggleBtn.innerHTML = eyeSvg;
        toggleBtn.setAttribute('aria-label', 'Show password');
      }
    });
  });
}

function renderApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  const currentScreen = screens[state.route] || LandingPage;
  const isWorkspace = ['landlord', 'admin'].includes(state.route);

  if (isWorkspace) {
    // Render workspace dashboard layout without global Navbar and Footer
    appContainer.innerHTML = `
      <main style="flex: 1; display: flex; flex-direction: column; min-height: 100vh; background-color: var(--color-background);">
        ${currentScreen.render(state)}
      </main>
    `;
    currentScreen.init(state, navigateTo, updateState);
  } else {
    // Render standard layout with global Navbar and Footer (conditionally)
    const showFooter = state.route === 'landing';
    appContainer.innerHTML = `
      ${Navbar.render(state)}
      <main style="flex: 1; display: flex; flex-direction: column;">
        ${currentScreen.render(state)}
      </main>
      ${showFooter ? Footer.render() : ''}
    `;
    Navbar.init(state, navigateTo, updateState);
    if (showFooter) {
      Footer.init(state, navigateTo);
    }
    currentScreen.init(state, navigateTo, updateState);
  }

  // Maintain visibility of testing controls overlay
  renderMockControlPanel();

  // Setup password toggles
  setupPasswordToggles();

  // Setup numeric inputs formatting
  setupNumericInputs();
}

// 3. Testing drawer controls (to simulate exception flows)
function showLauncher() {
  let launcher = document.getElementById('dev-panel-launcher');
  if (!launcher) {
    launcher = document.createElement('button');
    launcher.id = 'dev-panel-launcher';
    launcher.innerHTML = '&#9881; Exceptions';
    launcher.style.position = 'fixed';
    launcher.style.bottom = '20px';
    launcher.style.right = '20px';
    launcher.style.backgroundColor = 'var(--color-primary, #0D1B4B)';
    launcher.style.color = 'white';
    launcher.style.border = '1px solid rgba(255,255,255,0.1)';
    launcher.style.borderRadius = '30px';
    launcher.style.padding = '8px 16px';
    launcher.style.fontSize = '12px';
    launcher.style.fontWeight = 'bold';
    launcher.style.cursor = 'pointer';
    launcher.style.zIndex = '9999';
    launcher.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    
    launcher.addEventListener('click', () => {
      const panel = document.getElementById('dev-mock-panel');
      if (panel) {
        panel.style.display = 'block';
        panel.classList.remove('collapsed');
        const icon = document.getElementById('dev-toggle-icon');
        if (icon) icon.innerHTML = '&minus;';
        localStorage.setItem('dev-mock-panel-hidden', 'false');
      }
      launcher.style.display = 'none';
    });
    document.body.appendChild(launcher);
  }
  launcher.style.display = 'block';
}

function renderMockControlPanel() {
  // Check if drawer already exists, if so update states, else build
  let panel = document.getElementById('dev-mock-panel');

  const buildPanelHTML = () => `
    <div class="mock-panel-header" id="dev-panel-title">
      <span>&#9881; Exception Flow Simulator</span>
      <div style="display:flex; align-items:center; gap:8px;">
        <span id="dev-toggle-icon">&plus;</span>
        <span id="dev-close-panel" style="font-size:16px; cursor:pointer; font-weight:bold; padding:0 4px; border-left:1px solid rgba(255,255,255,0.2); padding-left:8px;">&times;</span>
      </div>
    </div>
    <div class="mock-panel-body" id="dev-panel-body">
      <div class="mock-toggle-row">
        <span>Fail OTP Validation</span>
        <button class="mock-toggle-btn ${state.mockConfig.failOTP ? 'active' : ''}" id="mock-fail-otp">
          ${state.mockConfig.failOTP ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Fail BVN Verification</span>
        <button class="mock-toggle-btn ${state.mockConfig.failBVN ? 'active' : ''}" id="mock-fail-bvn">
          ${state.mockConfig.failBVN ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Fail NIN Verification</span>
        <button class="mock-toggle-btn ${state.mockConfig.failNIN ? 'active' : ''}" id="mock-fail-nin">
          ${state.mockConfig.failNIN ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Duplicate Acc Register</span>
        <button class="mock-toggle-btn ${state.mockConfig.duplicateAccount ? 'active' : ''}" id="mock-dup-acc">
          ${state.mockConfig.duplicateAccount ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Incomplete Profile LogIn</span>
        <button class="mock-toggle-btn ${state.mockConfig.incompleteProfile ? 'active' : ''}" id="mock-inc-prof">
          ${state.mockConfig.incompleteProfile ? 'ON' : 'OFF'}
        </button>
      </div>
      <!-- Milestone 4 Exception Toggles -->
      <div style="border-top: 1px solid rgba(255,255,255,0.15); margin-top: 8px; padding-top: 8px; font-weight:bold; color:var(--color-secondary);">Leasing Exceptions</div>
      <div class="mock-toggle-row">
        <span>Inspection No-show</span>
        <button class="mock-toggle-btn ${state.mockConfig.inspectionNoShow ? 'active' : ''}" id="mock-no-show">
          ${state.mockConfig.inspectionNoShow ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Reject Application</span>
        <button class="mock-toggle-btn ${state.mockConfig.rejectedApplication ? 'active' : ''}" id="mock-reject-app">
          ${state.mockConfig.rejectedApplication ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Landlord Cancellation</span>
        <button class="mock-toggle-btn ${state.mockConfig.landlordCancellation ? 'active' : ''}" id="mock-cancel-insp">
          ${state.mockConfig.landlordCancellation ? 'ON' : 'OFF'}
        </button>
      </div>
      <!-- Partner Portals Role Switcher -->
      <div style="border-top: 1px solid rgba(255,255,255,0.15); margin-top: 8px; padding-top: 8px; font-weight:bold; color:var(--color-secondary); font-size:11px;">Developer Workspace Switcher</div>
      <div style="display:flex; flex-direction:column; gap:4px; margin-top:4px;">
        <button class="btn btn-outline btn-sm" id="btn-switch-tenant" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">Tenant Dashboard</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-tenant-linked" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px; font-weight:var(--weight-bold); border-color:var(--partner-secondary);">Linked Tenant (Babatunde)</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-employee" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px; font-weight:var(--weight-bold); border-color:var(--partner-secondary);">Employee Portal (Babatunde)</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-landlord" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">Landlord Portal</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-corporate" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">Corporate Partner</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-university" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">University Housing</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-ngo" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">NGO Coordinator</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-admin" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">Admin Console</button>
      </div>

      <button class="btn btn-outline btn-sm" id="mock-reset-state" style="margin-top:12px; border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:11px;">
        Reset State to Defaults
      </button>
    </div>
  `;

  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'dev-mock-panel';
    panel.className = 'mock-control-panel collapsed';
    document.body.appendChild(panel);
  }

  const isHidden = localStorage.getItem('dev-mock-panel-hidden') === 'true';
  if (isHidden) {
    panel.style.display = 'none';
    showLauncher();
  } else {
    panel.style.display = 'block';
    const launcher = document.getElementById('dev-panel-launcher');
    if (launcher) launcher.style.display = 'none';
  }

  panel.innerHTML = buildPanelHTML();

  // Collapsing Drawer Actions
  document.getElementById('dev-panel-title')?.addEventListener('click', (e) => {
    if (e.target.id === 'dev-close-panel') {
      e.stopPropagation();
      panel.style.display = 'none';
      localStorage.setItem('dev-mock-panel-hidden', 'true');
      showLauncher();
      return;
    }
    e.stopPropagation();
    panel.classList.toggle('collapsed');
    const isCollapsed = panel.classList.contains('collapsed');
    document.getElementById('dev-toggle-icon').innerHTML = isCollapsed ? '&plus;' : '&minus;';
  });

  // Action toggles
  const attachToggle = (btnId, stateKey) => {
    document.getElementById(btnId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      state.mockConfig[stateKey] = !state.mockConfig[stateKey];
      
      // Update workflows instantly on toggling
      if (stateKey === 'rejectedApplication') {
        state.applications = state.applications.map(app => {
          if (app.propertyId === 1) return { ...app, status: state.mockConfig.rejectedApplication ? 'Rejected' : 'Under Review', actionRequired: state.mockConfig.rejectedApplication ? 'Landlord rejected credit scores' : 'None - Under Review' };
          return app;
        });
      }
      
      renderMockControlPanel();
      renderApp();
    });
  };
  attachToggle('mock-fail-otp', 'failOTP');
  attachToggle('mock-fail-bvn', 'failBVN');
  attachToggle('mock-fail-nin', 'failNIN');
  attachToggle('mock-dup-acc', 'duplicateAccount');
  attachToggle('mock-inc-prof', 'incompleteProfile');
  attachToggle('mock-no-show', 'inspectionNoShow');
  attachToggle('mock-reject-app', 'rejectedApplication');
  attachToggle('mock-cancel-insp', 'landlordCancellation');

  // Workspace Switch Triggers
  document.getElementById('btn-switch-tenant')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ 
      user: { username: 'osaze.alao@domain.com', role: 'Tenant', method: 'email' },
      onboardingCompleted: true
    });
    navigateTo('dashboard');
  });
  document.getElementById('btn-switch-tenant-linked')?.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Ensure corporateEmployees is pre-seeded
    if (!state.corporateEmployees) {
      state.corporateEmployees = [
        { id: 1, name: 'Tosin Adelami', email: 't.adelami@firm.com', dept: 'Engineering', budget: 120000, rentStatus: 'Leased', address: '4b Admiralty Way, Lekki', status: 'Accepted' },
        { id: 2, name: 'Chioma Nze', email: 'c.nze@firm.com', dept: 'Finance', budget: 150000, rentStatus: 'Leased', address: 'Plot 12 VI Flat 3', status: 'Accepted' },
        { id: 3, name: 'Babatunde Alao', email: 'b.alao@firm.com', dept: 'Product', budget: 100000, rentStatus: 'Searching', address: '—', status: 'Accepted', level: 'Mid-level' }
      ];
    }

    updateState({ 
      user: { username: 'b.alao@firm.com', role: 'Tenant', method: 'email' },
      onboardingCompleted: true
    });
    navigateTo('dashboard');
  });
  document.getElementById('btn-switch-employee')?.addEventListener('click', (e) => {
    e.stopPropagation();

    const savedEmpStr = localStorage.getItem('haven_employee_account_b.alao@firm.com');
    let empBalance = 150000;
    if (savedEmpStr) {
      try {
        const empAcc = JSON.parse(savedEmpStr);
        if (empAcc.walletBalance !== undefined) {
          empBalance = empAcc.walletBalance;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Persist employee account mapping for login/routing logic
    localStorage.setItem('haven_employee_account_b.alao@firm.com', JSON.stringify({
      username: 'b.alao@firm.com',
      role: 'Employee',
      method: 'email',
      linkedPartnerEmail: 'partner.ops@firm.com',
      walletBalance: empBalance
    }));

    updateState({
      user: { 
        username: 'b.alao@firm.com', 
        role: 'Employee', 
        method: 'email',
        linkedPartnerEmail: 'partner.ops@firm.com'
      },
      walletBalance: empBalance,
      onboardingCompleted: true,
      corporateEmployees: [
        { id: 1, name: 'Tosin Adelami', email: 't.adelami@firm.com', dept: 'Engineering', budget: 120000, rentStatus: 'Leased', address: '4b Admiralty Way, Lekki', status: 'Accepted' },
        { id: 2, name: 'Chioma Nze', email: 'c.nze@firm.com', dept: 'Finance', budget: 150000, rentStatus: 'Leased', address: 'Plot 12 VI Flat 3', status: 'Accepted' },
        { id: 3, name: 'Babatunde Alao', email: 'b.alao@firm.com', dept: 'Product', budget: 100000, rentStatus: 'Searching', address: '—', status: 'Accepted', level: 'Mid-level' }
      ],
      partnerPrograms: [
        { id: 1, title: 'Tech-Stipend Rent Pool', limit: 8000000, spent: 5400000, members: 4 },
        { id: 2, title: 'Executive VI Allowance', limit: 7000000, spent: 4200000, members: 2 }
      ],
      partnerRequests: [
        { id: 1, employeeName: 'Babatunde Alao', email: 'b.alao@firm.com', dept: 'Product', programRequested: 'Tech-Stipend Rent Pool', requestedAmount: 150000, level: 'Mid-level', status: 'Pending', submittedDate: '2025-07-10' },
        { id: 2, employeeName: 'Ngozi Eze', email: 'n.eze@firm.com', dept: 'Sales', programRequested: 'Executive VI Allowance', requestedAmount: 200000, level: 'Junior', status: 'Pending', submittedDate: '2025-07-18' },
        { id: 3, employeeName: 'Emeka Okafor', email: 'e.okafor@firm.com', dept: 'Engineering', programRequested: 'Tech-Stipend Rent Pool', requestedAmount: 300000, level: 'Senior', status: 'Pending', submittedDate: '2025-07-22' },
        { id: 4, employeeName: 'Amina Ibrahim', email: 'a.ibrahim@firm.com', dept: 'HR', programRequested: 'Tech-Stipend Rent Pool', requestedAmount: 120000, level: 'Junior', status: 'Accepted', submittedDate: '2025-07-05' }
      ]
    });
    navigateTo('employee');
  });
  document.getElementById('btn-switch-landlord')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'partner@haven.ng', role: 'Landlord', method: 'email' } });
    navigateTo('landlord');
  });
  document.getElementById('btn-switch-corporate')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({
      user: {
        username: 'partner.ops@firm.com',
        role: 'Corporate Partner',
        method: 'email',
        corporateDetails: {
          organizationName: 'Haven Corp Solutions',
          businessSector: 'Technology',
          hqLocation: 'Lekki Phase 1, Lagos',
          employeeStrength: '51–200'
        }
      },
      corporateEmployees: null,
      partnerPrograms: null,
      partnerRequests: null,
      partnerEscrows: null,
      partnerInvites: null
    });
    navigateTo('partner');
  });
  document.getElementById('btn-switch-university')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'unilag.housing@unilag.edu.ng', role: 'University Housing', method: 'email' } });
    navigateTo('partner');
  });
  document.getElementById('btn-switch-ngo')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'relief.director@ngo.org', role: 'NGO Coordinator', method: 'email' } });
    navigateTo('partner');
  });
  document.getElementById('btn-switch-admin')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'admin.ops@haven.ng', role: 'Admin', method: 'email' } });
    navigateTo('admin');
  });

  // Hard Reset App States
  document.getElementById('mock-reset-state')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state = {
      route: 'landing',
      user: null,
      registerTab: 'email',
      loginTab: 'email',
      preselectedRole: 'Tenant',
      verifyCenterTab: 'bvn',
      wizardStep: 1,
      activeDashboardTab: 'overview',
      onboardingCompleted: true,
      discoveryViewMode: 'grid',
      activeDetailsPropertyId: null,
      activeLeasingTab: 'applications',
      registrationData: null,
      profileData: {
        personalInfo: {
          fullName: 'Osaze Alao',
          dob: '1998-05-12',
          gender: 'Male',
          phone: '+234 812 345 6789',
          email: 'osaze.alao@domain.com'
        },
        locationPreferences: {
          city: 'Lagos',
          neighborhoods: 'Lekki Phase 1, Victoria Island, Yaba',
          budget: '2500000'
        },
        housingPreferences: {
          propertyType: 'Apartment',
          bedrooms: '2',
          amenities: ['Power Backup', 'Security', 'Water Treatment']
        },
        employmentInfo: {
          status: 'Employed',
          employer: 'PropTech Labs Ltd',
          jobTitle: 'Senior UI/UX Analyst'
        },
        incomeInfo: { 
          monthlyIncome: '380000',
          statementUploaded: true 
        },
        lifestylePreferences: {
          pets: false,
          smoking: false,
          quietHours: true,
          sharing: false
        },
        rentalHistory: [
          { id: 1, landlord: 'Chief Alabi', property: '4b Admiralty Way, Lekki', duration: '2 Years (2024-2026)', exitReason: 'Relocating closer to workplace' }
        ],
        references: [
          { id: 1, name: 'Dr. Kunle Benson', relation: 'Former Landlord', contact: '+234 803 111 2222' },
          { id: 2, name: 'Mrs. Funmi Coker', relation: 'Professional Reference', contact: '+234 809 333 4444' }
        ]
      },
      verification: {
        bvnStatus: 'approved',
        ninStatus: 'approved',
        selfieStatus: 'approved',
        employeeIdStatus: 'approved',
        studentIdStatus: 'unverified',
        documentStatus: 'approved'
      },
      score: {
        overall: 785,
        financial: 88,
        verification: 96,
        behavior: 90,
        affordability: 82,
        tier: 'Grade A',
        status: 'Excellent'
      },
      escrow: {
        cautionDeposit: 250000,
        advanceRent: 950000,
        totalSecured: 1200000,
        history: [
          { id: 1, type: 'Caution Deposit', amount: 250000, reference: 'ESC-8109-LA', status: 'Secured', date: '2026-06-18' },
          { id: 2, type: 'Advance Rent (10 Months)', amount: 950000, reference: 'ESC-8110-LA', status: 'Secured', date: '2026-06-18' }
        ]
      },
      timeline: [
        { id: 1, type: 'Agreement', text: 'Structured lease agreement counter-signed.', date: '2026-06-19', status: 'Completed' },
        { id: 2, type: 'Payment', text: 'Escrow caution fee and rent advance cleared.', date: '2026-06-18', status: 'Completed' },
        { id: 3, type: 'Inspection', text: 'Property inspection passed.', date: '2026-06-17', status: 'Completed' },
        { id: 4, type: 'Application', text: 'Qualification application approved.', date: '2026-06-16', status: 'Completed' }
      ],
      notifications: [
        { id: 1, type: 'verification', text: 'Your biometric liveness selfie was matched against NIMC photo registry.', time: '10 mins ago', read: false },
        { id: 2, type: 'escrow', text: 'Caution deposit of ₦250,000 is locked in secure escrow.', time: '2 hrs ago', read: false },
        { id: 3, type: 'match', text: 'New Match: 3 Bed Apartment in Victoria Island fits your location preferences.', time: '1 day ago', read: true }
      ],
      settings: {
        enable2FA: true,
        hideProfile: false,
        commEmail: true,
        commSMS: true,
        commInApp: true
      },
      properties: [
        {
          id: 1,
          title: 'Luxury 2 Bed Penthouse Duplex',
          rent: 3200000,
          bedrooms: 2,
          bathrooms: 2,
          propertyType: 'Apartment',
          location: 'Lekki Phase 1',
          city: 'Lagos',
          mapX: 68,
          mapY: 55,
          amenities: ['Power Backup', 'Security', 'Water Treatment', 'Gym', 'Parking'],
          rules: 'No corporate parties, quiet hours after 10 PM. Domestic pets welcome.',
          availability: 'Available Now',
          analytics: { demand: 94, popularity: 97, views: 142 },
          match: {
            score: 98,
            affordability: 'Excellent (Rent comfortably fits salary)',
            lifestyle: 'Perfect (Quiet hours & pets match preferences)',
            commute: '12 mins commute to PropTech Labs office in Lekki',
            risk: 'Passed (Landlord identity & property deeds verified)'
          },
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'
        },
        {
          id: 2,
          title: 'Cozy 1 Bedroom Studio Loft',
          rent: 1400000,
          bedrooms: 1,
          bathrooms: 1,
          propertyType: 'Studio',
          location: 'Yaba',
          city: 'Lagos',
          mapX: 35,
          mapY: 32,
          amenities: ['Power Backup', 'Security', 'Water Treatment', 'Parking'],
          rules: 'Single occupancy only, quiet hours preferred, smoking strictly prohibited.',
          availability: 'Available July 1st',
          analytics: { demand: 82, popularity: 85, views: 88 },
          match: {
            score: 92,
            affordability: 'Excellent (Very high affordability margin)',
            lifestyle: 'Very Good (Non-smoking matching)',
            commute: '28 mins drive to Lekki workplace',
            risk: 'Passed (Landlord and utility bills validated)'
          },
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600'
        },
        {
          id: 3,
          title: 'Executive 3 Bed Serviced Flat',
          rent: 5500000,
          bedrooms: 3,
          bathrooms: 3,
          propertyType: 'Apartment',
          location: 'Victoria Island',
          city: 'Lagos',
          mapX: 58,
          mapY: 68,
          amenities: ['Power Backup', 'Security', 'Water Treatment', 'Gym', 'Parking', 'Pool'],
          rules: 'Corporate tenancies preferred. Small pets allowed upon notice.',
          availability: 'Available Now',
          analytics: { demand: 98, popularity: 94, views: 210 },
          match: {
            score: 85,
            affordability: 'Tight Fit (Consumes 48% of monthly income)',
            lifestyle: 'Good (Pool & gym matches recreation profile)',
            commute: '18 mins drive to Lekki',
            risk: 'Passed (Corporate land deeds fully audited)'
          },
          image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600'
        },
        {
          id: 4,
          title: 'GRA Executive 4 Bed Duplex',
          rent: 4500000,
          bedrooms: 4,
          bathrooms: 4,
          propertyType: 'Duplex',
          location: 'Ikeja GRA',
          city: 'Lagos',
          mapX: 20,
          mapY: 20,
          amenities: ['Power Backup', 'Security', 'Gym', 'Parking'],
          rules: 'Family occupancy only. Garden preservation requested.',
          availability: 'Available In 2 Weeks',
          analytics: { demand: 68, popularity: 72, views: 94 },
          match: {
            score: 75,
            affordability: 'Tight Fit (Exceeds monthly salary cap)',
            lifestyle: 'Good (Quiet suburbs matching)',
            commute: '54 mins drive to Lekki (High traffic)',
            risk: 'Passed (Landlord title documents validated)'
          },
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600'
        },
        {
          id: 5,
          title: 'Surulere Shared 2 Bed Flat',
          rent: 900000,
          bedrooms: 2,
          bathrooms: 1,
          propertyType: 'Shared flat',
          location: 'Surulere',
          city: 'Lagos',
          mapX: 30,
          mapY: 52,
          amenities: ['Security', 'Parking'],
          rules: 'Roommate agreement terms apply. Cooking coordinates shared.',
          availability: '1 Room Available Now',
          analytics: { demand: 75, popularity: 78, views: 64 },
          match: {
            score: 78,
            affordability: 'Perfect (Extremely high safety margin)',
            lifestyle: 'Moderate (Must share common lounge areas)',
            commute: '38 mins drive to Lekki office',
            risk: 'Passed (Co-tenant BVN records verified)'
          },
          image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'
        },
        {
          id: 6,
          title: 'Modern 2 Bedroom Apartment',
          rent: 2200000,
          bedrooms: 2,
          bathrooms: 2,
          propertyType: 'Apartment',
          location: 'Lekki Phase 2',
          city: 'Lagos',
          mapX: 84,
          mapY: 60,
          amenities: ['Power Backup', 'Security', 'Water Treatment', 'Parking'],
          rules: 'Quiet hours enforced after 10 PM. Strictly non-smoking.',
          availability: 'Available Now',
          analytics: { demand: 91, popularity: 88, views: 112 },
          match: {
            score: 95,
            affordability: 'Very Good (Sits in comfort range)',
            lifestyle: 'Perfect (Quiet hours & non-smoking match)',
            commute: '22 mins drive to Lekki Phase 1',
            risk: 'Passed (Title verify complete)'
          },
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600'
        }
      ],
      filters: {
        search: '',
        location: '',
        maxBudget: 6000000,
        bedrooms: '',
        propertyType: '',
        amenities: []
      },
      favorites: [1],
      viewedProperties: [],
      applications: [
        { id: 1, propertyId: 1, title: 'Luxury 2 Bed Penthouse Duplex', landlord: 'Chief Alabi', landlordId: 'alabi', rent: 3200000, status: 'Under Review', actionRequired: 'Awaiting landlord inspection response' },
        { id: 2, propertyId: 2, title: 'Cozy 1 Bedroom Studio Loft', landlord: 'Mrs. Funmi Coker', landlordId: 'coker', rent: 1400000, status: 'Approved', actionRequired: 'Book Inspection' }
      ],
      inspections: [
        { id: 1, propertyId: 1, title: 'Luxury 2 Bed Penthouse Duplex', landlord: 'Chief Alabi', date: '2026-06-25', time: '11:00 AM', type: 'Physical Walkthrough', status: 'Upcoming' }
      ],
      activeLeaseAgreement: {
        propertyId: 2,
        propertyTitle: 'Cozy 1 Bedroom Studio Loft',
        landlordName: 'Mrs. Funmi Coker',
        rent: 1400000,
        status: 'Pending Signature',
        tenantSignature: '',
        landlordSignature: 'Funmi Coker'
      },
      chats: [
        {
          landlordId: 'alabi',
          landlordName: 'Chief Alabi',
          property: 'Luxury 2 Bed Penthouse Duplex',
          avatar: 'A',
          messages: [
            { id: 1, sender: 'landlord', text: 'Hello Osaze. I received your Haven application with a Grade A score. Impressive. When do you want to inspect the duplex?', time: 'Yesterday 4:30 PM' },
            { id: 2, sender: 'tenant', text: 'Thank you Chief. I would prefer a physical walkthrough this week if possible.', time: 'Yesterday 5:00 PM' }
          ]
        },
        {
          landlordId: 'coker',
          landlordName: 'Mrs. Funmi Coker',
          property: 'Cozy 1 Bedroom Studio Loft',
          avatar: 'C',
          messages: [
            { id: 1, sender: 'landlord', text: 'Hi Osaze, your application has been approved. Please book an inspection using the scheduler.', time: 'Today 9:15 AM' }
          ]
        }
      ],
      activeChatLandlordId: 'alabi',
      walletBalance: 150000,
      escrowVaults: [
        {
          id: 1,
          title: 'Caution Vault: Lekki Penthouse',
          landlordName: 'Chief Alabi',
          cautionAmount: 250000,
          rentAmount: 2950000,
          totalSecured: 3200000,
          status: 'Funded',
          milestones: {
            leaseSigned: true,
            depositCleared: true,
            inspectionApproved: false,
            fundsReleased: false
          },
          timeline: [
            { text: 'Deposit payments locked in CBN compliance trust account.', date: '2026-06-18' },
            { text: 'Escrow vault envelope created from Counter-Signed Lease.', date: '2026-06-18' }
          ]
        },
        {
          id: 2,
          title: 'Caution Vault: Yaba Cozy Studio Loft',
          landlordName: 'Mrs. Funmi Coker',
          cautionAmount: 200000,
          rentAmount: 1200000,
          totalSecured: 1400000,
          status: 'Closed',
          milestones: {
            leaseSigned: true,
            depositCleared: true,
            inspectionApproved: true,
            fundsReleased: true
          },
          timeline: [
            { text: 'Lease completed. Vault closed and audit envelope archived.', date: '2026-06-21' },
            { text: 'Escrow caution release payout cleared to Landlord.', date: '2026-06-20' },
            { text: 'Physical move-in inspection check approved by Tenant.', date: '2026-06-19' },
            { text: 'Escrow vault created and fully funded.', date: '2026-06-18' }
          ]
        }
      ],
      transactions: [
        { id: 1, type: 'Payout to Landlord', amount: 1400000, reference: 'TXN-9801-LA', date: '2026-06-20', status: 'Cleared', description: 'Lease rent caution disbursement for Yaba Studio' },
        { id: 2, type: 'Wallet Top-up', amount: 150000, reference: 'TXN-8502-LA', date: '2026-06-19', status: 'Cleared', description: 'Instant bank transfer top-up' },
        { id: 3, type: 'Escrow Lock', amount: 1400000, reference: 'TXN-7118-LA', date: '2026-06-18', status: 'Escrowed', description: 'Caution & Rent advance lock for Yaba Loft' },
        { id: 4, type: 'Escrow Lock', amount: 3200000, reference: 'TXN-6549-LA', date: '2026-06-18', status: 'Escrowed', description: 'Caution & Rent lock for Lekki Penthouse' }
      ],
      mockConfig: {
        failOTP: false,
        failBVN: false,
        failNIN: false,
        duplicateAccount: false,
        incompleteProfile: false,
        inspectionNoShow: false,
        rejectedApplication: false,
        landlordCancellation: false
      }
    };
    localStorage.removeItem('haven_app_state');
    localStorage.removeItem('haven_session');
    alert("Application state reset. Navigating back to landing page.");
    navigateTo('landing');
  });
}

function getRouteFromHash() {
  const hash = window.location.hash;
  if (!hash.startsWith('#/')) return null;
  let route = hash.substring(2);
  if (route.includes('?')) {
    route = route.substring(0, route.indexOf('?'));
  }
  if (route.endsWith('/')) {
    route = route.slice(0, -1);
  }
  return route;
}

// 4. Initial boot sequence
window.addEventListener('DOMContentLoaded', () => {
  // Read and restore haven_app_state before anything else
  const savedStateStr = localStorage.getItem('haven_app_state');
  if (savedStateStr) {
    try {
      const savedState = JSON.parse(savedStateStr);
      Object.assign(state, savedState);
    } catch (e) {
      console.error('Failed to parse haven_app_state', e);
    }
  }

  const session = localStorage.getItem('haven_session');
  let restoredUser = null;
  if (session) {
    try {
      restoredUser = JSON.parse(session);
      state.user = restoredUser;
    } catch (e) {
      state.user = null;
    }
  } else {
    state.user = null;
  }

  // Load Corporate Partner scoped data upon session restoration
  if (state.user && state.user.role === 'Corporate Partner' && state.user.username.toLowerCase() !== 'partner.ops@firm.com') {
    const emailKey = 'haven_corp_account_' + state.user.username.toLowerCase();
    const savedAccountStr = localStorage.getItem(emailKey);
    if (savedAccountStr) {
      try {
        const savedAccount = JSON.parse(savedAccountStr);
        state.corporateEmployees = savedAccount.corporateEmployees || [];
        state.partnerPrograms = savedAccount.partnerPrograms || [];
        state.partnerRequests = savedAccount.partnerRequests || [];
        state.partnerEscrows = savedAccount.partnerEscrows || [];
        state.partnerInvites = savedAccount.partnerInvites || { invited: 0, joined: 0 };
        if (savedAccount.corporateDetails) {
          state.user.corporateDetails = savedAccount.corporateDetails;
        }
      } catch (e) {
        console.error('Failed to parse corporate partner account on restoration', e);
      }
    } else {
      state.corporateEmployees = [];
      state.partnerPrograms = [];
      state.partnerRequests = [];
      state.partnerEscrows = [];
      state.partnerInvites = { invited: 0, joined: 0 };
    }
  }

  // Load Corporate Partner scoped data for logged-in Employee upon session restoration
  if (state.user && state.user.role === 'Employee') {
    const employeeEmail = state.user.username.toLowerCase();
    const empAccountKey = 'haven_employee_account_' + employeeEmail;
    const savedEmpStr = localStorage.getItem(empAccountKey);
    let empBalance = 150000;
    if (savedEmpStr) {
      try {
        const empAcc = JSON.parse(savedEmpStr);
        if (empAcc.walletBalance !== undefined) {
          empBalance = empAcc.walletBalance;
        }
      } catch (err) {
        console.error(err);
      }
    }
    state.walletBalance = empBalance;

    const partnerEmail = state.user.linkedPartnerEmail;
    if (partnerEmail) {
      if (partnerEmail.toLowerCase() === 'partner.ops@firm.com') {
        if (!state.corporateEmployees) {
          state.corporateEmployees = [
            { id: 1, name: 'Tosin Adelami', email: 't.adelami@firm.com', dept: 'Engineering', budget: 120000, rentStatus: 'Leased', address: '4b Admiralty Way, Lekki', status: 'Accepted' },
            { id: 2, name: 'Chioma Nze', email: 'c.nze@firm.com', dept: 'Finance', budget: 150000, rentStatus: 'Leased', address: 'Plot 12 VI Flat 3', status: 'Accepted' },
            { id: 3, name: 'Babatunde Alao', email: 'b.alao@firm.com', dept: 'Product', budget: 100000, rentStatus: 'Searching', address: '—', status: 'Accepted', level: 'Mid-level' }
          ];
        }
        if (!state.partnerPrograms) {
          state.partnerPrograms = [
            { id: 1, title: 'Tech-Stipend Rent Pool', limit: 8000000, spent: 5400000, members: 4 },
            { id: 2, title: 'Executive VI Allowance', limit: 7000000, spent: 4200000, members: 2 }
          ];
        }
        if (!state.partnerRequests) {
          state.partnerRequests = [
            { id: 1, employeeName: 'Babatunde Alao', email: 'b.alao@firm.com', dept: 'Product', programRequested: 'Tech-Stipend Rent Pool', requestedAmount: 150000, level: 'Mid-level', status: 'Pending', submittedDate: '2025-07-10' },
            { id: 2, employeeName: 'Ngozi Eze', email: 'n.eze@firm.com', dept: 'Sales', programRequested: 'Executive VI Allowance', requestedAmount: 200000, level: 'Junior', status: 'Pending', submittedDate: '2025-07-18' },
            { id: 3, employeeName: 'Emeka Okafor', email: 'e.okafor@firm.com', dept: 'Engineering', programRequested: 'Tech-Stipend Rent Pool', requestedAmount: 300000, level: 'Senior', status: 'Pending', submittedDate: '2025-07-22' },
            { id: 4, employeeName: 'Amina Ibrahim', email: 'a.ibrahim@firm.com', dept: 'HR', programRequested: 'Tech-Stipend Rent Pool', requestedAmount: 120000, level: 'Junior', status: 'Accepted', submittedDate: '2025-07-05' }
          ];
        }
      } else {
        const emailKey = 'haven_corp_account_' + partnerEmail.toLowerCase();
        const savedAccountStr = localStorage.getItem(emailKey);
        if (savedAccountStr) {
          try {
            const savedAccount = JSON.parse(savedAccountStr);
            state.corporateEmployees = savedAccount.corporateEmployees || [];
            state.partnerPrograms = savedAccount.partnerPrograms || [];
            state.partnerRequests = savedAccount.partnerRequests || [];
            state.partnerEscrows = savedAccount.partnerEscrows || [];
            state.partnerInvites = savedAccount.partnerInvites || { invited: 0, joined: 0 };
          } catch (e) {
            console.error('Failed to parse corporate partner account for employee restoration', e);
          }
        }
      }
    }
  } else {
    // If no user is logged in or user is not corporate/employee, clear corporate partner state variables
    state.corporateEmployees = null;
    state.partnerPrograms = null;
    state.partnerRequests = null;
    state.partnerEscrows = null;
    state.partnerInvites = null;
  }

  // Parse invite code from URL parameters or hash
  const urlSearch = window.location.search;
  const hash = window.location.hash;
  const queryString = urlSearch || (hash.includes('?') ? hash.substring(hash.indexOf('?')) : '');
  const urlParams = new URLSearchParams(queryString);
  const inviteToken = urlParams.get('invite');
  if (inviteToken) {
    state.inviteToken = inviteToken;
    state.route = 'register';
    renderApp();
  } else {
    const hashRoute = getRouteFromHash();
    if (hashRoute && hashRoute !== 'landing' && screens[hashRoute]) {
      navigateTo(hashRoute);
    } else if (restoredUser) {
      const role = restoredUser.role;
      let homeRoute = 'dashboard';
      if (role === 'Landlord' || role === 'Agent') {
        homeRoute = 'landlord';
      } else if (['Corporate Partner', 'University Housing', 'NGO Coordinator'].includes(role)) {
        homeRoute = 'partner';
      } else if (role === 'Admin') {
        homeRoute = 'admin';
      } else if (role === 'Employee') {
        homeRoute = 'employee';
      }
      navigateTo(homeRoute);
    } else if (hashRoute && screens[hashRoute]) {
      navigateTo(hashRoute);
    } else {
      renderApp();
    }
  }
});

// Listen for browser's hashchange event
window.addEventListener('hashchange', () => {
  const route = getRouteFromHash();
  if (route && screens[route] && state.route !== route) {
    navigateTo(route);
  }
});



/* Haven State Manager (Simple Reactive Pub-Sub) */

class StateManager {
  constructor() {
    this.state = {
      user: null, // Logged in user details: { name, email, phone, userType, verifiedStatus, bvn, nin, profileComplete }
      tempUser: null, // Temporary registration data: { email, phone, password, userType }
      verification: {
        bvn: '',
        nin: '',
        selfieUrl: null,
        documents: [], // List of { type, name, status }
        status: 'pending' // 'pending' | 'approved' | 'rejected' | 'action_required'
      },
      otp: {
        sentTo: '',
        type: '', // 'email' | 'sms'
        code: '1234', // Mock correct code
        timer: 60
      },
      wizard: {
        currentStep: 1,
        // Step 1: Personal
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        // Step 2: Location
        preferredState: 'Lagos',
        preferredLgas: [],
        leaseTerm: '12',
        // Step 3: Housing
        propertyType: 'Apartment',
        bedrooms: '2',
        budgetMin: '1000000',
        budgetMax: '3000000',
        // Step 4: Employment
        employmentStatus: 'Employed',
        employerName: '',
        jobTitle: '',
        // Step 5: Income
        monthlyIncome: '500000',
        hasTaxClearance: false,
        // Step 6: Lifestyle
        hasPets: false,
        isSmoker: false,
        workFromHome: false,
        hasGuests: false
      },
      currentPage: 'landing' // 'landing' | 'register' | 'login' | 'otp' | 'verify' | 'dashboard' | 'profile-wizard'
    };
    
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  setWizardState(updates) {
    this.state.wizard = { ...this.state.wizard, ...updates };
    this.notify();
  }

  setVerificationState(updates) {
    this.state.verification = { ...this.state.verification, ...updates };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const store = new StateManager();

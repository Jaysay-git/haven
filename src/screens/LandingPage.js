// Landing Page Screen
export const LandingPage = {
  render(state) {
    return `
      <!-- Hero Section -->
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="hero-tag">
              <span class="partner-dot" style="background-color:#1A7A8A; width:6px; height:6px; border-radius:50%; display:inline-block;"></span>
              PREMIUM REAL ESTATE HUB
            </div>
            <h1 class="hero-title">
              Eliminating <span style="color: #1A7A8A;">Trust Issues</span> in Nigerian Rental System
            </h1>
            <p class="hero-desc" style="margin-top:16px; font-size:15px; color:#4B5563; line-height:1.6;">
              Haven is Nigeria's premier rental intelligence platform. We safeguard landlords, qualify tenants using AI-powered insights, and protect rental deposits in secure escrow accounts.
            </p>
            <div class="hero-ctas" style="display: flex; gap: 16px; margin-top:32px;">
              <button class="btn btn-primary btn-lg" id="hero-get-started-btn" style="border-radius: 9999px; background-color: #0D1B4B; border-color: #0D1B4B; padding:12px 28px; font-size:14px; font-weight:bold; display: inline-flex; align-items: center; gap: 8px;">
                Get Started <span>&rarr;</span>
              </button>
              <button class="btn btn-outline btn-lg" id="hero-search-location-btn" style="border-radius: 9999px; display: inline-flex; align-items: center; gap: 8px; color: #4B5563; border-color: #D1D5DB; background: white; padding:12px 24px; font-size:14px; font-weight:bold;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #6B7280;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Search By Location
              </button>
            </div>
          </div>
          
          <div class="hero-visual-new">
            <!-- Modern Apartment Building Card -->
            <div class="hero-image-card">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800" alt="Zannah State Apartment Building" class="hero-main-img">
              
              <!-- Floating Badge 1 (Top Left) -->
              <div class="hero-badge badge-top-left">
                <div class="badge-icon icon-green">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div class="badge-title">Verified Property</div>
                  <div class="badge-sub">AI-Powered Inspection</div>
                </div>
              </div>

              <!-- Floating Badge 2 (Bottom Left) -->
              <div class="hero-badge badge-bottom-left">
                <div class="badge-icon icon-green">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div class="badge-title">100% Secure</div>
                  <div class="badge-sub">Security Status</div>
                </div>
              </div>

              <!-- Floating Badge 3 (Bottom Right) -->
              <div class="hero-badge badge-bottom-right">
                <div class="badge-icon icon-blue">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <div class="badge-title">5k+</div>
                  <div class="badge-sub">Verified Tenants</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trusted Partners Showcase -->
      <section class="partners-new">
        <div class="container">
          <div class="partners-title-new">TRUSTED BY LEADING AUTHORITIES</div>
          <div class="partners-row-new">
            <div class="partner-item-new">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-primary);"><path d="M4 22h16M10 14h4M4 18h16M12 2v8M9 6h6"/></svg>
              <span>NIMC</span>
            </div>
            <div class="partner-item-new">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-primary);"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><path d="M12 18h.01M16 18h.01M8 18h.01M12 14h.01M16 14h.01M8 14h.01M12 10h.01M16 10h.01M8 10h.01M8 6h8M2 10h20M2 14h20"/></svg>
              <span>Nigerian Banks</span>
            </div>
            <div class="partner-item-new">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-primary);"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Lagos Housing</span>
            </div>
            <div class="partner-item-new">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-primary);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Legal Aid</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Value Propositions Section -->
      <section class="value-prop" id="value-proposition">
        <div class="container">
          <span class="section-tag">Value Proposition</span>
          <h2 class="section-title">Core Tenants of Rental Security</h2>
          <p class="section-desc">We build digital infrastructure that replaces mutual suspicion with absolute verifiability, safeguarding transactions and tenant-landlord relations.</p>
          
          <div class="grid-cols-4">
            <!-- Card 1 -->
            <div class="prop-card-container">
              <div class="prop-card-inner">
                <div class="prop-card-front">
                  <div class="prop-icon flex-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <h3>AI Qualification</h3>
                </div>
                <div class="prop-card-back">
                  <div class="prop-icon flex-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <h3>AI Qualification</h3>
                  <p>Verify tenant employment, income statements, credit references, and history autonomously to yield an institutional-grade qualification score.</p>
                </div>
              </div>
            </div>
            
            <!-- Card 2 -->
            <div class="prop-card-container">
              <div class="prop-card-inner">
                <div class="prop-card-front">
                  <div class="prop-icon flex-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <h3>Escrow Protection</h3>
                </div>
                <div class="prop-card-back">
                  <div class="prop-icon flex-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <h3>Escrow Protection</h3>
                  <p>Secure caution deposits and advance rents in compliance-safe escrow vaults. Funds are released strictly based on lease milestones and conditions.</p>
                </div>
              </div>
            </div>
            
            <!-- Card 3 -->
            <div class="prop-card-container">
              <div class="prop-card-inner">
                <div class="prop-card-front">
                  <div class="prop-icon flex-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <h3>Structured Workflows</h3>
                </div>
                <div class="prop-card-back">
                  <div class="prop-icon flex-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <h3>Structured Workflows</h3>
                  <p>Standardize rent inspections, legal leases, and repair requests through legally binding, automated steps, reducing legal disputes to zero.</p>
                </div>
              </div>
            </div>
            
            <!-- Card 4 -->
            <div class="prop-card-container">
              <div class="prop-card-inner">
                <div class="prop-card-front">
                  <div class="prop-icon flex-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <h3>Identity Assurance</h3>
                </div>
                <div class="prop-card-back">
                  <div class="prop-icon flex-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <h3>Identity Assurance</h3>
                  <p>Direct API integration with the National Identity Management Commission (NIMC) and central BVN databases for immediate identity verification.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section" id="faq">
        <div class="container">
          <span class="section-tag text-center">Support</span>
          <h2 class="section-title text-center">Frequently Asked Questions</h2>
          <p class="section-desc text-center">Quick answers to clarify the operation of our platform.</p>
          
          <div class="faq-grid">
            <div class="faq-item">
              <div class="faq-header">
                <h3>What is Haven Rental Intelligence?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>Haven is an ecosystem designed to bring trust and verification to Nigerian rental markets. We integrate BVN/NIN databases, employer registries, and transaction accounts to score tenants and run automated, legally compliant lease management with escrow safeguards.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-header">
                <h3>How does the Escrow Rental Protection work?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>Caution fees and advance rent payments are deposited in a secure partner-bank trust account. The landlord cannot unilaterally seize a caution deposit, and the tenant cannot default on valid repair assessments. Release is coordinated through inspect-and-verify workflows in the app.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-header">
                <h3>Is Haven compliant with BVN and NIMC regulations?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>Yes. Haven accesses NIMC and CBN verification gateways via certified third-party verification partners. We strictly enforce NDPR data privacy standards and require clear tenant consents (such as OTP inputs) before retrieving official records.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-header">
                <h3>What happens if a tenant's qualification fails?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>If qualification fails due to discrepancies or negative histories, tenants are provided with a "Requires Action" notification indicating where the dispute lies (e.g. mismatched NIN, invalid employment link). They can resolve details or upload supplementary proof (like corporate co-signers).</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-header">
                <h3>Does Haven support monthly rent payments instead of standard annual upfront rent?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>Yes, for qualified tenants. Through our AI tenant qualification scoring, users with high-grade integrity and income profiles can access monthly or quarterly payment structures, while landlords still receive their annual commitments up front through our financing partners.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-header">
                <h3>Is the product free to use?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>Unfortunately it is not. There are different plans with different prices</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init(state, navigateTo, updateState) {
    // Buttons in hero
    document.getElementById('hero-get-started-btn')?.addEventListener('click', () => {
      updateState({ preselectedRole: 'Tenant' });
      navigateTo('register');
    });

    document.getElementById('hero-search-location-btn')?.addEventListener('click', () => {
      navigateTo('discovery');
    });

    // FAQs Accordion toggle
    document.querySelectorAll('.faq-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Collapse all others
        document.querySelectorAll('.faq-item').forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-body').style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          const body = item.querySelector('.faq-body');
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });

    // Animate stats numbers if in viewport
    const animateStats = () => {
      const stats = [
        { id: 'stat-tenants', suffix: '+' },
        { id: 'stat-landlords', suffix: '+' },
        { id: 'stat-escrow', prefix: '₦', suffix: 'B+' },
        { id: 'stat-accuracy', suffix: '.4%' }
      ];

      stats.forEach(s => {
        const el = document.getElementById(s.id);
        if (!el) return;
        
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = s.prefix || '';
        const suffix = s.suffix || '';
        
        let start = 0;
        const duration = 1200; // ms
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.innerText = prefix + target.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            const displayVal = Math.floor(start);
            el.innerText = prefix + displayVal.toLocaleString() + suffix;
          }
        }, stepTime);
      });
    };

    // Trigger stat counter animations
    setTimeout(animateStats, 300);
  }
};

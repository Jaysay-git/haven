// Landing Page Screen
export const LandingPage = {
  render(state) {
    return `
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg-image"></div>
        <div class="hero-overlay"></div>

        <div class="hero-content">
          <!-- Trust badge -->
          <div class="hero-tag-pill">
            <span class="hero-tag-dot"></span>
            Institutional-grade verification for Nigerian PropTech
          </div>

          <h1 class="hero-title">Find Your Perfect<br>Home with <span class="hero-title-accent">Confidence</span></h1>
          <p class="hero-subtitle">
            Haven is Nigeria's premier rental intelligence platform. AI-powered tenant qualification, identity verification, and escrow-protected deposits — all in one place.
          </p>

          <!-- Quick trust stats -->
          <div class="hero-stats-row">
            <div class="hero-stat">
              <span class="hero-stat-num">14,200+</span>
              <span class="hero-stat-label">Verified Tenants</span>
            </div>
            <div class="hero-stat-divider"></div>
            <div class="hero-stat">
              <span class="hero-stat-num">3,800+</span>
              <span class="hero-stat-label">Registered Landlords</span>
            </div>
            <div class="hero-stat-divider"></div>
            <div class="hero-stat">
              <span class="hero-stat-num">99.4%</span>
              <span class="hero-stat-label">Check Accuracy</span>
            </div>
          </div>

          <!-- Property Search Bar -->
          <div class="hero-search-card">
            <div class="hero-search-tabs">
              <button class="hero-search-tab active" id="tab-rent" data-tab="rent">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Rent
              </button>
              <button class="hero-search-tab" id="tab-buy" data-tab="buy">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                Buy
              </button>
              <button class="hero-search-tab" id="tab-verified" data-tab="verified">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Haven Verified
              </button>
            </div>

            <div class="hero-search-body">
              <div class="hero-search-field">
                <label class="hero-search-label">Location</label>
                <div class="hero-search-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <input type="text" id="hero-search-location" class="hero-search-input" placeholder="Lagos, Abuja, Port Harcourt…" />
                </div>
              </div>

              <div class="hero-search-sep"></div>

              <div class="hero-search-field">
                <label class="hero-search-label">Property Type</label>
                <div class="hero-search-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  <select id="hero-search-type" class="hero-search-input hero-search-select">
                    <option value="">Any Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="duplex">Duplex</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="studio">Studio</option>
                    <option value="mansion">Mansion</option>
                  </select>
                </div>
              </div>

              <div class="hero-search-sep"></div>

              <div class="hero-search-field">
                <label class="hero-search-label">Budget</label>
                <div class="hero-search-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  <select id="hero-search-budget" class="hero-search-input hero-search-select">
                    <option value="">Any Budget</option>
                    <option value="0-500k">Under ₦500k/yr</option>
                    <option value="500k-1m">₦500k – ₦1M/yr</option>
                    <option value="1m-3m">₦1M – ₦3M/yr</option>
                    <option value="3m+">₦3M+/yr</option>
                  </select>
                </div>
              </div>

              <button class="hero-search-btn" id="hero-search-cta">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Search
              </button>
            </div>
          </div>

          <!-- CTA buttons -->
          <div class="hero-ctas">
            <button class="btn btn-primary btn-lg" id="hero-tenant-cta">Get Started as Tenant</button>
            <button class="btn btn-hero-outline btn-lg" id="hero-landlord-cta">Landlord Portal</button>
          </div>
        </div>

        <!-- Floating trust badges -->
        <div class="hero-badge hero-badge-left">
          <div class="hero-badge-icon hero-badge-icon--green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <div class="hero-badge-title">AI Qualified</div>
            <div class="hero-badge-sub">Zero Paperwork</div>
          </div>
        </div>

        <div class="hero-badge hero-badge-right">
          <div class="hero-badge-icon hero-badge-icon--teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <div class="hero-badge-title">100% Secure</div>
            <div class="hero-badge-sub">NIMC &amp; CBN Approved</div>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="hero-scroll-hint">
          <div class="hero-scroll-dot"></div>
        </div>
      </section>

      <!-- Partner Showcase -->
      <section class="partners">
        <div class="container">
          <div class="partners-title">Trusted by Nigeria's Leading Real Estate and Security Authorities</div>
          <div class="partners-grid">
            <div class="partner-logo">nimc<span class="partner-dot"></span>gov</div>
            <div class="partner-logo">nigerian<span class="partner-dot"></span>banks</div>
            <div class="partner-logo">prophaven<span class="partner-dot"></span></div>
            <div class="partner-logo">lagos<span class="partner-dot"></span>housing</div>
            <div class="partner-logo">escrow<span class="partner-dot"></span>trust</div>
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
            <div class="prop-card card card-hover">
              <div class="prop-icon flex-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h3>AI Qualification</h3>
              <p>Verify tenant employment, income statements, credit references, and history autonomously to yield an institutional-grade qualification score.</p>
            </div>
            
            <div class="prop-card card card-hover">
              <div class="prop-icon flex-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3>Escrow Protection</h3>
              <p>Secure caution deposits and advance rents in compliance-safe escrow vaults. Funds are released strictly based on lease milestones and conditions.</p>
            </div>
            
            <div class="prop-card card card-hover">
              <div class="prop-icon flex-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h3>Structured Workflows</h3>
              <p>Standardize rent inspections, legal leases, and repair requests through legally binding, automated steps, reducing legal disputes to zero.</p>
            </div>
            
            <div class="prop-card card card-hover">
              <div class="prop-icon flex-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3>Identity Assurance</h3>
              <p>Direct API integration with the National Identity Management Commission (NIMC) and central BVN databases for immediate identity verification.</p>
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
          </div>
        </div>
      </section>
    `;
  },

  init(state, navigateTo, updateState) {
    // Buttons in hero
    document.getElementById('hero-tenant-cta')?.addEventListener('click', () => {
      updateState({ preselectedRole: 'Tenant' });
      navigateTo('register');
    });

    document.getElementById('hero-landlord-cta')?.addEventListener('click', () => {
      updateState({ preselectedRole: 'Landlord' });
      navigateTo('register');
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

    // Search tab switching
    document.querySelectorAll('.hero-search-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.hero-search-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });

    // Search button
    document.getElementById('hero-search-cta')?.addEventListener('click', () => {
      navigateTo('propertyDiscovery');
    });
  }
};

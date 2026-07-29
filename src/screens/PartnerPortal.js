// Partner Portals Screen Component (Milestone 7)
export const PartnerPortal = {
  render(state) {
    // Safety check & initialization of partner states if not present
    this.initializeState(state);

    const activeTab = state.activePartnerTab || 'dashboard';
    
    // Detect partner type and set up layout styles
    const role = state.user ? state.user.role : 'Corporate Partner';
    let themeClass = 'partner-theme-corporate';
    let roleBadge = 'Corporate Workspace';

    if (role === 'University Housing') {
      themeClass = 'partner-theme-university';
      roleBadge = 'University Portal';
    } else if (role === 'NGO Coordinator') {
      themeClass = 'partner-theme-ngo';
      roleBadge = 'NGO Support Hub';
    }

    if (role === 'Corporate Partner') {
      const sidebarTabs = [
        { id: 'dashboard', name: 'Dashboard & Analytics', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>` },
        { id: 'programs', name: 'Housing Programs', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>` },
        { id: 'roster', name: 'Employee Tracker', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.33 2.99-3S17.66 5 16 5s-3 1.33-3 3 1.33 3 3 3zm-8 0c1.66 0 2.99-1.33 2.99-3S9.66 5 8 5 5 6.33 5 8s1.33 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>` },
        { id: 'requests', name: 'Requests', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>` },
        { id: 'escrow', name: 'Escrow Monitoring', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>` }
      ];

      return `
        <style>
          .partner-layout {
            display: grid;
            grid-template-columns: 240px 1fr;
            gap: 32px;
            margin-top: 8px;
            align-items: start;
          }

          .partner-sidebar {
            background-color: var(--nav-sidebar, #0D1B4B);
            color: white;
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            border-radius: var(--radius-md, 12px);
            border: 1px solid rgba(13, 27, 75, 0.08);
            box-shadow: var(--shadow-sm);
            position: sticky;
            top: 24px;
            height: calc(100vh - 120px);
            overflow-y: auto;
          }

          .partner-sidebar-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            background: none;
            border: none;
            color: var(--nav-sidebar-text, rgba(255, 255, 255, 0.7));
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            text-align: left;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 150ms, color 150ms;
          }

          .partner-sidebar-btn:hover {
            background-color: var(--nav-sidebar-hover, rgba(255, 255, 255, 0.1));
            color: white;
          }

          .partner-sidebar-btn.active {
            background-color: var(--nav-sidebar-active, #1A7A8A);
            color: white;
          }

          .partner-sidebar-btn .tab-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            color: inherit;
          }

          .partner-main {
            min-width: 0;
            width: 100%;
          }

          @media (max-width: 768px) {
            .partner-layout {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            .partner-sidebar {
              position: static;
              height: auto;
              overflow-y: visible;
              padding: 16px;
            }
          }
        </style>
        <div class="partner-wrapper ${themeClass}">
          <!-- Header Section -->
          <div class="partner-header">
            <div>
              <h1 class="page-title" style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                Partner Workspace
                <span class="partner-type-tag">${roleBadge}</span>
              </h1>
              <p class="text-muted" style="margin-top: 4px;">Allocate housing budgets, approve onboarding rosters, audit co-signed escrows, and monitor placements.</p>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="text-align: right;" class="hidden-mobile">
                <div style="font-weight: var(--weight-bold); color: var(--color-primary);">${state.user ? state.user.username : 'partner@haven.ng'}</div>
                <div style="font-size: 11px; color: var(--partner-secondary); font-weight: var(--weight-semibold);">Haven Compliance Key: #P-8716</div>
              </div>
              <button class="btn btn-primary btn-sm" id="btn-partner-onboard">+ Add Member</button>
            </div>
          </div>

          <div class="partner-layout">
            <aside class="partner-sidebar">
              ${sidebarTabs.map(t => `
                <button class="partner-sidebar-btn ${activeTab === t.id ? 'active' : ''}" data-tab="${t.id}">
                  <span class="tab-icon">${t.icon}</span>
                  <span class="tab-label">${t.name}</span>
                </button>
              `).join('')}
            </aside>
            <main class="partner-main">
              <div class="tab-panel">
                ${this.renderTabContent(state, role, activeTab)}
              </div>
            </main>
          </div>
        </div>

        <!-- Add Member Onboard Modal (Hidden by default) -->
        <div class="landlord-modal" id="partner-onboard-modal" style="display: none;">
          <div class="modal-content-panel">
            <div class="modal-header-panel">
              <h3 class="card-title" style="color: var(--color-primary);">Enroll New Member</h3>
              <button class="modal-close-icon-btn" id="partner-close-btn">&times;</button>
            </div>
            <form id="partner-onboard-form">
              <div class="modal-body-panel">
                <div class="form-group-landlord">
                  <label for="member-name">Full Name</label>
                  <input type="text" id="member-name" class="form-control-landlord" placeholder="e.g. Samuel Okon" required>
                </div>
                <div class="form-group-landlord">
                  <label for="member-email">Corporate Email</label>
                  <input type="email" id="member-email" class="form-control-landlord" placeholder="s.okon@firm.com" required>
                </div>
                <div class="form-grid-2">
                  <div class="form-group-landlord">
                    <label for="member-dept">Department</label>
                    <input type="text" id="member-dept" class="form-control-landlord" placeholder="e.g. Operations" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="member-budget">Monthly Credit Allocation (₦)</label>
                    <input type="number" id="member-budget" class="form-control-landlord" value="100000" required>
                  </div>
                </div>
              </div>
              <div class="modal-footer-panel">
                <button type="button" class="btn btn-outline btn-sm" id="partner-cancel-btn">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm partner-btn-submit">Enroll Member</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Create Program Modal (Hidden by default) -->
        <div class="landlord-modal" id="create-program-modal" style="display: none;">
          <div class="modal-content-panel">
            <div class="modal-header-panel">
              <h3 class="card-title" style="color: var(--color-primary);">Create Housing Program</h3>
              <button class="modal-close-icon-btn" id="create-program-close-btn">&times;</button>
            </div>
            <form id="create-program-form" novalidate>
              <div class="modal-body-panel">

                <!-- Program Name -->
                <div class="form-group-landlord">
                  <label for="prog-name">Program Name <span style="color:#EF4444;">*</span></label>
                  <input type="text" id="prog-name" class="form-control-landlord" placeholder="e.g. Graduate Intern Housing Pool">
                  <div class="modal-field-error" id="err-prog-name">Program name is required.</div>
                </div>

                <!-- Budget Limit -->
                <div class="form-group-landlord">
                  <label for="prog-budget">Budget Limit <span style="color:#EF4444;">*</span></label>
                  <div class="currency-input-wrapper">
                    <span class="currency-prefix">₦</span>
                    <input type="number" id="prog-budget" class="form-control-landlord" placeholder="e.g. 5000000" min="1">
                  </div>
                  <div class="modal-field-error" id="err-prog-budget">A valid budget limit is required.</div>
                </div>

                <!-- Employee Level Access (pill multi-select) -->
                <div class="form-group-landlord">
                  <label>Employee Level Access <span style="color:#EF4444;">*</span></label>
                  <div class="level-pills-group" id="level-pills-group">
                    <button type="button" class="level-pill" data-level="Junior">Junior</button>
                    <button type="button" class="level-pill" data-level="Mid-level">Mid-level</button>
                    <button type="button" class="level-pill" data-level="Senior">Senior</button>
                    <button type="button" class="level-pill" data-level="Executive">Executive</button>
                  </div>
                  <div class="modal-field-error" id="err-prog-levels">Select at least one employee level.</div>
                </div>

                <!-- Eligible Departments (optional) -->
                <div class="form-group-landlord">
                  <label for="prog-departments">Eligible Departments <span style="color:#9CA3AF; font-weight:400; font-size:11px;">(optional — comma separated)</span></label>
                  <input type="text" id="prog-departments" class="form-control-landlord" placeholder="e.g. Engineering, Product, Sales">
                </div>

                <!-- Description / Notes (optional) -->
                <div class="form-group-landlord" style="margin-bottom:0;">
                  <label for="prog-description">Description / Notes <span style="color:#9CA3AF; font-weight:400; font-size:11px;">(optional)</span></label>
                  <textarea id="prog-description" class="form-control-landlord" rows="3" style="resize:vertical;" placeholder="Describe the purpose and eligibility criteria for this program…"></textarea>
                </div>

              </div>
              <div class="modal-footer-panel">
                <button type="button" class="btn btn-outline btn-sm" id="create-program-cancel-btn">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm partner-btn-submit">Create Program</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Invite Employee Modal (Hidden by default) -->
        <div class="landlord-modal" id="invite-employee-modal" style="display: none;">
          <div class="modal-content-panel">
            <div class="modal-header-panel">
              <h3 class="card-title" style="color: var(--color-primary);">Invite Employee</h3>
              <button class="modal-close-icon-btn" id="invite-close-btn">&times;</button>
            </div>
            
            <!-- Tab buttons inside modal -->
            <div class="auth-tabs" style="margin: 16px 24px 0 24px; border-bottom: 1px solid rgba(13, 27, 75, 0.08);">
              <button class="auth-tab ${state.inviteTab === 'single' ? 'active' : ''}" id="modal-tab-single" type="button" style="padding: 10px 16px; font-size: 13px;">Single Invitation</button>
              <button class="auth-tab ${state.inviteTab === 'bulk' ? 'active' : ''}" id="modal-tab-bulk" type="button" style="padding: 10px 16px; font-size: 13px;">Bulk Upload (CSV)</button>
            </div>

            <!-- Single Invite Form -->
            <form id="invite-single-form" style="display: ${state.inviteTab === 'single' ? 'block' : 'none'};" novalidate>
              <div class="modal-body-panel">
                <div class="form-group-landlord">
                  <label for="invite-email">Employee Email Address <span style="color:#EF4444;">*</span></label>
                  <input type="email" id="invite-email" class="form-control-landlord" placeholder="e.g. employee@company.com" required>
                  <span class="form-error" id="error-invite-email" style="margin-top: 4px;"></span>
                </div>
                <div class="form-grid-2">
                  <div class="form-group-landlord">
                    <label for="invite-name">Full Name <span style="color:#9CA3AF; font-weight:400; font-size:11px;">(optional)</span></label>
                    <input type="text" id="invite-name" class="form-control-landlord" placeholder="e.g. John Doe">
                  </div>
                  <div class="form-group-landlord">
                    <label for="invite-dept">Department <span style="color:#9CA3AF; font-weight:400; font-size:11px;">(optional)</span></label>
                    <input type="text" id="invite-dept" class="form-control-landlord" placeholder="e.g. Sales">
                  </div>
                </div>
                <div class="form-group-landlord" style="margin-bottom:0;">
                  <label for="invite-budget">Monthly Credit Allocation (₦) <span style="color:#9CA3AF; font-weight:400; font-size:11px;">(optional)</span></label>
                  <input type="number" id="invite-budget" class="form-control-landlord" placeholder="e.g. 100000" min="0">
                </div>
              </div>
              <div class="modal-footer-panel">
                <button type="button" class="btn btn-outline btn-sm" id="invite-cancel-btn">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm partner-btn-submit">Send Invitation</button>
              </div>
            </form>

            <!-- Bulk Invite Form -->
            <form id="invite-bulk-form" style="display: ${state.inviteTab === 'bulk' ? 'block' : 'none'};" novalidate>
              <div class="modal-body-panel">
                <div class="form-group-landlord" style="border: 2px dashed rgba(13, 27, 75, 0.15); border-radius: var(--radius-md); padding: 32px; text-align: center; background: #FAF9F6; transition: border-color 0.2s;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style="color: #9CA3AF; margin-bottom: 12px; display: inline-block;">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                  </svg>
                  <p style="font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-primary); margin-bottom: 4px;">Upload Employee CSV Roster</p>
                  <p class="text-xs text-muted" style="margin-bottom: 8px;">CSV should contain a header line, with email address in the first column.</p>
                  <a href="#" id="btn-download-csv-template" style="display: inline-block; font-size: 12px; color: var(--partner-secondary); font-weight: var(--weight-bold); text-decoration: underline; margin-bottom: 16px;">Download CSV Template</a>
                  
                  <label class="btn btn-outline btn-sm" style="display: inline-block; cursor: pointer; margin-bottom: 8px;">
                    Choose CSV File
                    <input type="file" id="invite-csv-file" accept=".csv" style="display: none;">
                  </label>
                  <div id="csv-file-name" class="text-xs" style="color: var(--partner-secondary); font-weight: var(--weight-semibold); margin-top: 8px; display: none;"></div>
                  <span class="form-error" id="error-invite-bulk" style="margin-top: 8px; display: block;"></span>
                </div>
              </div>
              <div class="modal-footer-panel">
                <button type="button" class="btn btn-outline btn-sm" id="invite-bulk-cancel-btn">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm partner-btn-submit" id="btn-submit-bulk-invite" disabled>Import & Invite</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    return `
      <div class="partner-wrapper ${themeClass}">
        <!-- Header Section -->
        <div class="partner-header">
          <div>
            <h1 class="page-title" style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
              Partner Workspace
              <span class="partner-type-tag">${roleBadge}</span>
            </h1>
            <p class="text-muted" style="margin-top: 4px;">Allocate housing budgets, approve onboarding rosters, audit co-signed escrows, and monitor placements.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="text-align: right;" class="hidden-mobile">
              <div style="font-weight: var(--weight-bold); color: var(--color-primary);">${state.user ? state.user.username : 'partner@haven.ng'}</div>
              <div style="font-size: 11px; color: var(--partner-secondary); font-weight: var(--weight-semibold);">Haven Compliance Key: #P-8716</div>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-partner-onboard">+ Add Member</button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="partner-tabs">
          <button class="partner-tab ${activeTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
            Dashboard & Analytics
          </button>
          <button class="partner-tab ${activeTab === 'programs' ? 'active' : ''}" data-tab="programs">
            ${role === 'University Housing' ? 'Hostel Safety & Verification' : 'Housing Programs'}
          </button>
          <button class="partner-tab ${activeTab === 'roster' ? 'active' : ''}" data-tab="roster">
            ${role === 'Corporate Partner' ? 'Employee Tracker' : role === 'University Housing' ? 'Student Allocations' : 'Beneficiary Roster'}
          </button>
          <button class="partner-tab ${activeTab === 'escrow' ? 'active' : ''}" data-tab="escrow">
            Escrow Monitoring
          </button>
        </div>

        <!-- Tab Panel Content -->
        <div class="tab-panel">
          ${this.renderTabContent(state, role, activeTab)}
        </div>
      </div>

      <!-- Add Member Onboard Modal (Hidden by default) -->
      <div class="landlord-modal" id="partner-onboard-modal" style="display: none;">
        <div class="modal-content-panel">
          <div class="modal-header-panel">
            <h3 class="card-title" style="color: var(--color-primary);">Enroll New Member</h3>
            <button class="modal-close-icon-btn" id="partner-close-btn">&times;</button>
          </div>
          <form id="partner-onboard-form">
            <div class="modal-body-panel">
              <div class="form-group-landlord">
                <label for="member-name">Full Name</label>
                <input type="text" id="member-name" class="form-control-landlord" placeholder="e.g. Samuel Okon" required>
              </div>
              
              ${role === 'Corporate Partner' ? `
                <div class="form-group-landlord">
                  <label for="member-email">Corporate Email</label>
                  <input type="email" id="member-email" class="form-control-landlord" placeholder="s.okon@firm.com" required>
                </div>
                <div class="form-grid-2">
                  <div class="form-group-landlord">
                    <label for="member-dept">Department</label>
                    <input type="text" id="member-dept" class="form-control-landlord" placeholder="e.g. Operations" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="member-budget">Monthly Credit Allocation (₦)</label>
                    <input type="number" id="member-budget" class="form-control-landlord" value="100000" required>
                  </div>
                </div>
              ` : role === 'University Housing' ? `
                <div class="form-grid-2">
                  <div class="form-group-landlord">
                    <label for="member-matric">Student Matric Number</label>
                    <input type="text" id="member-matric" class="form-control-landlord" placeholder="e.g. ULG-2024-998" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="member-prog">Housing Program</label>
                    <select id="member-prog" class="form-control-landlord">
                      <option value="Off-Campus Verified">Off-Campus Verified</option>
                      <option value="Med-School Housing">Med-School Housing</option>
                      <option value="General Off-Campus">General Off-Campus</option>
                    </select>
                  </div>
                </div>
              ` : `
                <div class="form-grid-2">
                  <div class="form-group-landlord">
                    <label for="member-case">Verified Case ID</label>
                    <input type="text" id="member-case" class="form-control-landlord" value="NGO-${Math.floor(100+Math.random()*900)}-ID" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="member-subsidy">Monthly Subsidy Funding (₦)</label>
                    <input type="number" id="member-subsidy" class="form-control-landlord" value="80000" required>
                  </div>
                </div>
                <div class="form-group-landlord">
                  <label for="member-program-select">Target Support Program</label>
                  <select id="member-program-select" class="form-control-landlord">
                    <option value="Makoko Relief Project">Makoko Relief Project</option>
                    <option value="Yaba Student Subsidy">Yaba Student Subsidy</option>
                    <option value="Displaced Families Fund">Displaced Families Fund</option>
                  </select>
                </div>
              `}
            </div>
            <div class="modal-footer-panel">
              <button type="button" class="btn btn-outline btn-sm" id="partner-cancel-btn">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm partner-btn-submit">Enroll Member</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  renderTabContent(state, role, tab) {
    switch (tab) {
      case 'dashboard':
        return this.renderDashboardTab(state, role);
      case 'programs':
        return this.renderProgramsTab(state, role);
      case 'roster':
        return this.renderRosterTab(state, role);
      case 'requests':
        return this.renderRequestsTab(state);
      case 'escrow':
        return this.renderEscrowTab(state);
      default:
        return `<div>Tab not found.</div>`;
    }
  },

  renderRequestsTab(state) {
    return `
      <div class="card" style="padding: 40px; text-align: center; background-color: var(--color-white); border-radius: var(--radius-md); border: 1px solid rgba(13,27,75,0.06); box-shadow: var(--shadow-sm);">
        <div style="width: 64px; height: 64px; background-color: var(--partner-bg-tint, rgba(43, 108, 176, 0.08)); color: var(--partner-secondary, #2B6CB0); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <h3 style="font-size: 20px; font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 8px;">Incoming Requests</h3>
        <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 24px auto; font-size: 14px; line-height: 1.6;">
          Audit and approve employee housing requests, custom lease credit increments, and partner subsidy applications. There are currently no pending requests.
        </p>
      </div>
    `;
  },

  renderDashboardTab(state, role) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Corporate Metrics
    if (role === 'Corporate Partner') {
      const limit = 15000000;
      let spent = 0;
      state.corporateEmployees.forEach(e => {
        if (e.rentStatus === 'Leased') spent += e.budget * 12;
      });
      const remaining = limit - spent;
      const spentPercent = Math.round((spent / limit) * 100);

      return `
        <!-- Corporate Budget allocation Tracker -->
        <div class="budget-meter-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size: 13px; text-transform: uppercase; color:#6B7280; font-weight:var(--weight-semibold);">Annual Housing Budget Allocation</span>
              <h2 class="page-title" style="color:var(--color-primary); margin-top:4px;">${formatNaira(spent)} spent <span style="font-size:16px; font-weight:normal; color:#9CA3AF;">of ${formatNaira(limit)} limit</span></h2>
            </div>
            <div style="font-size: 28px; font-weight:var(--weight-bold); color:var(--partner-secondary);">${spentPercent}%</div>
          </div>
          
          <div class="budget-progress-track">
            <div class="budget-progress-bar" style="width: ${spentPercent}%;"></div>
          </div>

          <div class="budget-stats-row">
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Co-Signed Spent</div>
              <strong style="font-size:16px; color:var(--color-primary);">${formatNaira(spent)}</strong>
            </div>
            <div style="border-left:1px solid #E5E7EB; border-right:1px solid #E5E7EB; padding: 0 16px;">
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Remaining Credit</div>
              <strong style="font-size:16px; color:var(--color-primary);">${formatNaira(remaining)}</strong>
            </div>
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Housed Staff Rate</div>
              <strong style="font-size:16px; color:var(--color-primary);">${state.corporateEmployees.filter(e => e.rentStatus === 'Leased').length} / ${state.corporateEmployees.length} enrolled</strong>
            </div>
          </div>
        </div>

        <!-- ── 3 New Dashboard Metric Cards ─────────────────────────────── -->
        <div class="dash-stat-grid">

          <!-- Pending Requests -->
          <div class="dash-stat-card">
            <div class="dash-stat-icon" style="background:rgba(239,68,68,0.08); color:#EF4444;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            </div>
            <div class="dash-stat-body">
              <div class="dash-stat-label">Pending Requests</div>
              <div class="dash-stat-value">${state.partnerRequests.filter(r => r.status === 'Pending').length}</div>
              <div class="dash-stat-sub">awaiting HR approval</div>
            </div>
          </div>

          <!-- Active Programs -->
          <div class="dash-stat-card">
            <div class="dash-stat-icon" style="background:rgba(13,27,75,0.07); color:var(--color-primary);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
            </div>
            <div class="dash-stat-body">
              <div class="dash-stat-label">Active Programs</div>
              <div class="dash-stat-value">${state.partnerPrograms.length}</div>
              <div class="dash-stat-sub">housing programs running</div>
            </div>
          </div>

          <!-- Invited vs Joined -->
          <div class="dash-stat-card">
            <div class="dash-stat-icon" style="background:rgba(26,122,138,0.08); color:var(--partner-secondary);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.33 2.99-3S17.66 5 16 5s-3 1.33-3 3 1.33 3 3 3zm-8 0c1.66 0 2.99-1.33 2.99-3S9.66 5 8 5 5 6.33 5 8s1.33 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </div>
            <div class="dash-stat-body">
              <div class="dash-stat-label">Invite Funnel</div>
              <div class="dash-stat-value" style="display:flex; align-items:baseline; gap:6px;">
                <span>${state.partnerInvites.joined}</span>
                <span style="font-size:13px; font-weight:500; color:#9CA3AF;">/ ${state.partnerInvites.invited} invited</span>
              </div>
              <div class="dash-stat-sub">
                <span style="display:inline-block; width:${Math.round((state.partnerInvites.joined / state.partnerInvites.invited) * 100)}%; height:4px; background:var(--partner-secondary); border-radius:4px; vertical-align:middle;"></span>
                <span style="display:inline-block; width:${100 - Math.round((state.partnerInvites.joined / state.partnerInvites.invited) * 100)}%; height:4px; background:#E5E7EB; border-radius:4px; vertical-align:middle;"></span>
                &nbsp;${Math.round((state.partnerInvites.joined / state.partnerInvites.invited) * 100)}% joined
              </div>
            </div>
          </div>

        </div>

        <!-- Corporate Analytics SVG -->
        <div class="partner-chart-card">
          <h3 class="card-title" style="font-size:16px; color:var(--color-primary); margin-bottom:12px;">Corporate Budget Drawdown Index</h3>
          <div class="chart-container-svg" style="height:150px;">
            <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none">
              <line x1="20" y1="20" x2="580" y2="20" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="75" x2="580" y2="75" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="130" x2="580" y2="130" stroke="#FAF9F6" stroke-width="2" />
              
              <!-- Drawdown line -->
              <path d="M 40,120 L 140,110 L 240,90 L 340,80 L 440,55 L 540,30" class="partner-svg-line" />
              
              <circle cx="40" cy="120" r="4" class="partner-svg-dot" />
              <circle cx="140" cy="110" r="4" class="partner-svg-dot" />
              <circle cx="240" cy="90" r="4" class="partner-svg-dot" />
              <circle cx="340" cy="80" r="4" class="partner-svg-dot" />
              <circle cx="440" cy="55" r="4" class="partner-svg-dot" />
              <circle cx="540" cy="30" r="4" class="partner-svg-dot" />

              <text x="40" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Jan</text>
              <text x="140" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Feb</text>
              <text x="240" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Mar</text>
              <text x="340" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Apr</text>
              <text x="440" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">May</text>
              <text x="540" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Jun</text>
            </svg>
          </div>
        </div>
      `;
    }

    // University Metrics
    if (role === 'University Housing') {
      const verifiedHostelsCount = state.safeHostels.filter(h => h.verified).length;
      const allocatedStudentsCount = state.universityStudents.filter(s => s.status === 'Allocated').length;

      return `
        <!-- University Allocations Tracker -->
        <div class="budget-meter-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size: 13px; text-transform: uppercase; color:#6B7280; font-weight:var(--weight-semibold);">Student Bedspace Allocations</span>
              <h2 class="page-title" style="color:var(--color-primary); margin-top:4px;">${allocatedStudentsCount} allocated <span style="font-size:16px; font-weight:normal; color:#9CA3AF;">of ${state.universityStudents.length} requested</span></h2>
            </div>
            <div style="font-size: 28px; font-weight:var(--weight-bold); color:var(--partner-secondary);">${Math.round((allocatedStudentsCount / state.universityStudents.length)*100)}%</div>
          </div>
          
          <div class="budget-progress-track">
            <div class="budget-progress-bar" style="width: ${Math.round((allocatedStudentsCount / state.universityStudents.length)*100)}%;"></div>
          </div>

          <div class="budget-stats-row">
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Verified Safe Hostels</div>
              <strong style="font-size:16px; color:var(--color-primary);">${verifiedHostelsCount} registered</strong>
            </div>
            <div style="border-left:1px solid #E5E7EB; border-right:1px solid #E5E7EB; padding: 0 16px;">
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Hostel Bed Spaces</div>
              <strong style="font-size:16px; color:var(--color-primary);">${state.safeHostels.reduce((sum, h) => sum + h.beds, 0)} slots</strong>
            </div>
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Awaiting Placement</div>
              <strong style="font-size:16px; color:var(--color-primary);">${state.universityStudents.filter(s => s.status === 'Requested').length} students</strong>
            </div>
          </div>
        </div>

        <!-- University Analytics SVG -->
        <div class="partner-chart-card">
          <h3 class="card-title" style="font-size:16px; color:var(--color-primary); margin-bottom:12px;">Safe Student Check-ins (Monthly Cumulative)</h3>
          <div class="chart-container-svg" style="height:150px;">
            <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none">
              <line x1="20" y1="20" x2="580" y2="20" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="75" x2="580" y2="75" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="130" x2="580" y2="130" stroke="#FAF9F6" stroke-width="2" />
              
              <path d="M 40,128 L 140,110 L 240,80 L 340,75 L 440,40 L 540,20" class="partner-svg-line" />
              
              <circle cx="40" cy="128" r="4" class="partner-svg-dot" />
              <circle cx="140" cy="110" r="4" class="partner-svg-dot" />
              <circle cx="240" cy="80" r="4" class="partner-svg-dot" />
              <circle cx="340" cy="75" r="4" class="partner-svg-dot" />
              <circle cx="440" cy="40" r="4" class="partner-svg-dot" />
              <circle cx="540" cy="20" r="4" class="partner-svg-dot" />

              <text x="40" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Jan</text>
              <text x="140" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Feb</text>
              <text x="240" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Mar</text>
              <text x="340" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Apr</text>
              <text x="440" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">May</text>
              <text x="540" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Jun</text>
            </svg>
          </div>
        </div>
      `;
    }

    // NGO Metrics
    if (role === 'NGO Coordinator') {
      const fundLimit = 25000000;
      let spentFund = 0;
      state.ngoBeneficiaries.forEach(b => {
        if (b.status === 'Active Shelter') spentFund += b.monthlySubsidy * 12;
      });
      const remainingFund = fundLimit - spentFund;
      const spentFundPercent = Math.round((spentFund / fundLimit) * 100);

      return `
        <!-- NGO Subsidy Fund allocation Tracker -->
        <div class="budget-meter-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size: 13px; text-transform: uppercase; color:#6B7280; font-weight:var(--weight-semibold);">NGO Housing Support Program Funding</span>
              <h2 class="page-title" style="color:var(--color-primary); margin-top:4px;">${formatNaira(spentFund)} co-funded <span style="font-size:16px; font-weight:normal; color:#9CA3AF;">of ${formatNaira(fundLimit)} pool</span></h2>
            </div>
            <div style="font-size: 28px; font-weight:var(--weight-bold); color:var(--partner-secondary);">${spentFundPercent}%</div>
          </div>
          
          <div class="budget-progress-track">
            <div class="budget-progress-bar" style="width: ${spentFundPercent}%;"></div>
          </div>

          <div class="budget-stats-row">
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Subsidies Disbursed</div>
              <strong style="font-size:16px; color:var(--color-primary);">${formatNaira(spentFund)}</strong>
            </div>
            <div style="border-left:1px solid #E5E7EB; border-right:1px solid #E5E7EB; padding: 0 16px;">
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Remaining Trust Capital</div>
              <strong style="font-size:16px; color:var(--color-primary);">${formatNaira(remainingFund)}</strong>
            </div>
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Cases Housed</div>
              <strong style="font-size:16px; color:var(--color-primary);">${state.ngoBeneficiaries.filter(b => b.status === 'Active Shelter').length} Families</strong>
            </div>
          </div>
        </div>

        <!-- NGO Analytics SVG -->
        <div class="partner-chart-card">
          <h3 class="card-title" style="font-size:16px; color:var(--color-primary); margin-bottom:12px;">Active Sheltered Caseload index</h3>
          <div class="chart-container-svg" style="height:150px;">
            <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none">
              <line x1="20" y1="20" x2="580" y2="20" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="75" x2="580" y2="75" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="130" x2="580" y2="130" stroke="#FAF9F6" stroke-width="2" />
              
              <!-- Drawdown line -->
              <path d="M 40,115 L 140,105 L 240,90 L 340,75 L 440,45 L 540,25" class="partner-svg-line" />
              
              <circle cx="40" cy="115" r="4" class="partner-svg-dot" />
              <circle cx="140" cy="105" r="4" class="partner-svg-dot" />
              <circle cx="240" cy="90" r="4" class="partner-svg-dot" />
              <circle cx="340" cy="75" r="4" class="partner-svg-dot" />
              <circle cx="440" cy="45" r="4" class="partner-svg-dot" />
              <circle cx="540" cy="25" r="4" class="partner-svg-dot" />

              <text x="40" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Jan</text>
              <text x="140" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Feb</text>
              <text x="240" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Mar</text>
              <text x="340" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Apr</text>
              <text x="440" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">May</text>
              <text x="540" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Jun</text>
            </svg>
          </div>
        </div>
      `;
    }
  },

  renderProgramsTab(state, role) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Corporate Portal: Housing Programs allocation
    if (role === 'Corporate Partner') {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Corporate Housing Programs</h3>
          <button class="btn btn-primary btn-sm" id="btn-create-program">+ Create Program</button>
        </div>

        <div class="programs-grid">
          ${state.partnerPrograms.map(prog => `
            <div class="program-card">
              <h4 class="program-title">${prog.title}</h4>
              <div style="font-size:12px; color:#6B7280; margin-bottom:${prog.levels ? '10px' : '16px'};">Active Employees: <strong style="color:var(--color-primary);">${prog.members}</strong></div>

              ${prog.levels && prog.levels.length > 0 ? `
                <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:${prog.description ? '8px' : '16px'};">
                  ${prog.levels.map(l => `<span style="font-size:10px; font-weight:600; padding:2px 8px; border-radius:10px; background:rgba(13,27,75,0.07); color:var(--color-primary);">${l}</span>`).join('')}
                </div>
              ` : ''}

              ${prog.description ? `
                <p style="font-size:12px; color:#6B7280; margin-bottom:16px; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${prog.description}</p>
              ` : ''}

              <div style="margin-top:auto;">
                <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
                  <span>Spent: <strong>${formatNaira(prog.spent)}</strong></span>
                  <span style="color:#9CA3AF;">Limit: ${formatNaira(prog.limit)}</span>
                </div>
                <div class="budget-progress-track" style="margin:0; height:8px;">
                  <div class="budget-progress-bar" style="width: ${Math.round((prog.spent/prog.limit)*100)}%;"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // University Portal: safe hostel verification checklist
    if (role === 'University Housing') {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Verified Student Accommodations</h3>
          <button class="btn btn-primary btn-sm" id="btn-add-hostel-registry">+ Register Hostel</button>
        </div>

        <div class="table-card">
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Hostel Facility</th>
                  <th>Location Landmark</th>
                  <th>Capacity Limit</th>
                  <th>Safety Checklist Standards</th>
                  <th>Verification Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.safeHostels.map(h => `
                  <tr>
                    <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${h.name}</td>
                    <td>${h.location}</td>
                    <td>${h.beds} bed spaces</td>
                    <td style="font-size: 12px; color:#4B5563;">${h.status}</td>
                    <td>
                      <span class="safe-house-badge ${!h.verified ? 'failed' : ''}">
                        ${h.verified ? '✓ Verified Safe' : '✗ Audit Pending'}
                      </span>
                    </td>
                    <td>
                      ${!h.verified ? `
                        <button class="btn btn-secondary btn-sm btn-verify-hostel" data-id="${h.id}" style="padding:4px 8px; font-size:11px;">Approve Safety</button>
                      ` : `
                        <span class="badge badge-success" style="font-size:10px;">Certified</span>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // NGO Portal: Housing Relief programs
    if (role === 'NGO Coordinator') {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Support Programs & Subsidies</h3>
          <button class="btn btn-primary btn-sm" id="btn-create-ngo-program">+ Create Relief Fund</button>
        </div>

        <div class="programs-grid">
          ${state.partnerPrograms.map(prog => `
            <div class="program-card">
              <h4 class="program-title">${prog.title}</h4>
              <div style="font-size:12px; color:#6B7280; margin-bottom:16px;">Active Placements: <strong style="color:var(--color-primary);">${prog.members} cases</strong></div>
              
              <div style="margin-top:auto;">
                <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
                  <span>Co-funded: <strong>${formatNaira(prog.spent)}</strong></span>
                  <span style="color:#9CA3AF;">Cap: ${formatNaira(prog.limit)}</span>
                </div>
                <div class="budget-progress-track" style="margin:0; height:8px;">
                  <div class="budget-progress-bar" style="width: ${Math.round((prog.spent/prog.limit)*100)}%;"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  },

  renderRosterTab(state, role) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Corporate Employee Roster
    if (role === 'Corporate Partner') {
      const activeFilter = state.rosterFilter || 'all';
      
      const allCount = state.corporateEmployees.length;
      const joinedCount = state.corporateEmployees.filter(e => e.status !== 'Pending').length;
      const pendingCount = state.corporateEmployees.filter(e => e.status === 'Pending').length;

      const filteredEmployees = state.corporateEmployees.filter(emp => {
        if (activeFilter === 'joined') return emp.status !== 'Pending';
        if (activeFilter === 'pending') return emp.status === 'Pending';
        return true;
      });

      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin:0;">Employee Housing registry</h3>
          <div style="display:flex; gap:12px;">
            <button class="btn btn-primary btn-sm" id="btn-open-invite-modal">✉ Invite Employee</button>
            <button class="btn btn-outline btn-sm" id="btn-partner-csv-export">Export Staff CSV</button>
          </div>
        </div>

        <!-- Roster filters -->
        <div class="auth-tabs" style="margin-bottom: 20px; border-bottom: 1px solid rgba(13, 27, 75, 0.05); gap: 4px;">
          <button class="auth-tab ${activeFilter === 'all' ? 'active' : ''}" data-roster-filter="all" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">All (${allCount})</button>
          <button class="auth-tab ${activeFilter === 'joined' ? 'active' : ''}" data-roster-filter="joined" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">Active Roster (${joinedCount})</button>
          <button class="auth-tab ${activeFilter === 'pending' ? 'active' : ''}" data-roster-filter="pending" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">Pending Invites (${pendingCount})</button>
        </div>

        <div class="table-card">
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Corporate Email</th>
                  <th>Department</th>
                  <th>Monthly Allocation</th>
                  <th>Placement Status</th>
                  <th>Active Residence</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${filteredEmployees.length === 0 ? `
                  <tr>
                    <td colspan="7" style="text-align:center; padding:32px; color:#6B7280;">No employees found matching this filter.</td>
                  </tr>
                ` : filteredEmployees.map(emp => {
                  const isPending = emp.status === 'Pending';
                  return `
                    <tr>
                      <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${isPending ? '—' : emp.name}</td>
                      <td>${emp.email}</td>
                      <td>${isPending ? '—' : emp.dept}</td>
                      <td style="font-weight:var(--weight-bold);">${isPending ? '—' : formatNaira(emp.budget)}</td>
                      <td>
                        ${isPending ? `
                          <span class="badge" style="background-color: #FEF3C7; color: #D97706; border: 1px solid rgba(217, 119, 6, 0.15);">
                            Pending Invite
                          </span>
                        ` : `
                          <span class="badge ${emp.rentStatus === 'Leased' ? 'badge-success' : 'badge-warning'}">
                            ${emp.rentStatus}
                          </span>
                        `}
                      </td>
                      <td>${isPending ? '—' : emp.address}</td>
                      <td>
                        <div style="display:flex; gap:8px; align-items:center;">
                          ${isPending ? `
                            <button class="btn btn-outline btn-sm btn-copy-invite" data-code="${emp.inviteCode}" style="padding:4px 8px; font-size:11px;">Copy Link</button>
                            <button class="btn btn-outline btn-sm btn-delete-member" data-id="${emp.id}" data-is-invite="true" style="padding:4px 8px; border-color:var(--color-error); color:var(--color-error); font-size:11px;">Cancel</button>
                          ` : `
                            <button class="btn btn-outline btn-sm btn-delete-member" data-id="${emp.id}" style="padding:4px 8px; border-color:var(--color-error); color:var(--color-error); font-size:11px;">Remove</button>
                          `}
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // University Student Allocation request queue
    if (role === 'University Housing') {
      return `
        <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin-bottom: 16px;">Student Housing Requests</h3>
        
        <div class="table-card">
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Matric Number</th>
                  <th>Assigned Program</th>
                  <th>Facility Allocated</th>
                  <th>Bedspace / Room</th>
                  <th>Placement Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.universityStudents.map(stud => `
                  <tr>
                    <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${stud.name}</td>
                    <td>${stud.matric}</td>
                    <td><span class="badge badge-info">${stud.program}</span></td>
                    <td style="font-weight:var(--weight-medium);">${stud.hostelName}</td>
                    <td>${stud.bedspace}</td>
                    <td>
                      <span class="badge ${stud.status === 'Allocated' ? 'badge-success' : 'badge-warning'}">
                        ${stud.status}
                      </span>
                    </td>
                    <td>
                      ${stud.status === 'Requested' ? `
                        <button class="btn btn-primary btn-sm btn-allocate-student" data-id="${stud.id}" style="padding:4px 8px; font-size:11px;">Allocate Bedspace</button>
                      ` : `
                        <span class="badge badge-success">Assigned</span>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // NGO Beneficiary Roster & Case files
    if (role === 'NGO Coordinator') {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Subsidized Cases & Beneficiaries</h3>
          <button class="btn btn-outline btn-sm" id="btn-partner-csv-export">Export Cases CSV</button>
        </div>

        <div class="table-card">
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Case Name / Family</th>
                  <th>Case File ID</th>
                  <th>Active Program</th>
                  <th>Monthly Support</th>
                  <th>Safety Audit check</th>
                  <th>Shelter Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.ngoBeneficiaries.map(ben => `
                  <tr>
                    <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${ben.name}</td>
                    <td><code>${ben.caseId}</code></td>
                    <td>${ben.program}</td>
                    <td style="font-weight:var(--weight-bold);">${formatNaira(ben.monthlySubsidy)}</td>
                    <td>
                      <span class="safe-house-badge ${!ben.safetyVerified ? 'failed' : ''}">
                        ${ben.safetyVerified ? '✓ Safe Audit' : '✗ Audit Required'}
                      </span>
                    </td>
                    <td>
                      <span class="badge ${ben.status === 'Active Shelter' ? 'badge-success' : 'badge-warning'}">
                        ${ben.status}
                      </span>
                    </td>
                    <td>
                      ${!ben.safetyVerified ? `
                        <button class="btn btn-secondary btn-sm btn-verify-case-safety" data-id="${ben.id}" style="padding:4px 8px; font-size:11px;">Verify Safety</button>
                      ` : `
                        <button class="btn btn-outline btn-sm btn-delete-member" data-id="${ben.id}" style="padding:4px 8px; border-color:var(--color-error); color:var(--color-error); font-size:11px;">De-enroll</button>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  renderEscrowTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    return `
      <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin-bottom: 8px;">Guaranteed Escrow Protection Vaults</h3>
      <p class="text-sm text-muted" style="margin-bottom: 24px;">Financial ledger monitoring security vaults co-funded, co-signed or guaranteed under corporate lease pool covenants.</p>
      
      <div class="table-card">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Protected Vault Title</th>
                <th>Guarantee Co-Signer</th>
                <th>Caution Hold</th>
                <th>Locked Rent</th>
                <th>Total Secured</th>
                <th>Lifecycle Status</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              ${state.partnerEscrows.map(esc => `
                <tr>
                  <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${esc.title}</td>
                  <td><span class="badge badge-info" style="font-size:10px;">${esc.coSigner}</span></td>
                  <td style="font-weight:var(--weight-bold);">${formatNaira(esc.cautionAmount)}</td>
                  <td style="font-weight:var(--weight-bold);">${formatNaira(esc.rentAmount)}</td>
                  <td style="font-weight:var(--weight-bold);">${formatNaira(esc.cautionAmount + esc.rentAmount)}</td>
                  <td>
                    <span class="badge ${esc.status === 'Funded' ? 'badge-info' : esc.status === 'Released' ? 'badge-success' : 'badge-warning'}">
                      ${esc.status}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-sm btn-download-vault-audit" data-id="${esc.id}" style="padding:4px 8px; font-size:11px;">💾 Audit Log</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  initializeState(state) {
    if (!state.activePartnerTab) state.activePartnerTab = 'dashboard';
    if (!state.rosterFilter) state.rosterFilter = 'all';
    if (!state.inviteTab) state.inviteTab = 'single';

    // 1. Corporate Employees
    if (!state.corporateEmployees) {
      state.corporateEmployees = [
        { id: 1, name: 'Tosin Adelami', email: 't.adelami@firm.com', dept: 'Engineering', budget: 120000, rentStatus: 'Leased', address: '4b Admiralty Way, Lekki', status: 'Accepted' },
        { id: 2, name: 'Chioma Nze', email: 'c.nze@firm.com', dept: 'Finance', budget: 150000, rentStatus: 'Leased', address: 'Plot 12 VI Flat 3', status: 'Accepted' },
        { id: 3, name: 'Babatunde Alao', email: 'b.alao@firm.com', dept: 'Product', budget: 100000, rentStatus: 'Searching', address: '—', status: 'Accepted' }
      ];
    }

    // 2. University Students
    if (!state.universityStudents) {
      state.universityStudents = [
        { id: 1, name: 'Chinedu Egwu', matric: 'ULG-2024-819', program: 'Off-Campus Verified', hostelName: 'Yaba Apex Student Hall', bedspace: 'Room 2B', status: 'Allocated' },
        { id: 2, name: 'Halima Musa', matric: 'ULG-2023-451', program: 'Med-School Housing', hostelName: 'VI Scholar Hostels', bedspace: 'Flat 1', status: 'Allocated' },
        { id: 3, name: 'Efe Omowole', matric: 'ULG-2025-108', program: 'General Off-Campus', hostelName: 'Pending Allocation', bedspace: '—', status: 'Requested' }
      ];
    }

    // 3. NGO Beneficiaries
    if (!state.ngoBeneficiaries) {
      state.ngoBeneficiaries = [
        { id: 1, name: 'Adebayo Family', caseId: 'NGO-801-MC', program: 'Makoko Relief Project', monthlySubsidy: 80000, status: 'Active Shelter', safetyVerified: true },
        { id: 2, name: 'Theresa Johnson', caseId: 'NGO-752-YJ', program: 'Yaba Student Subsidy', monthlySubsidy: 50000, status: 'Active Shelter', safetyVerified: true },
        { id: 3, name: 'Mustapha Kabir', caseId: 'NGO-908-MK', program: 'Displaced Families Fund', monthlySubsidy: 120000, status: 'Awaiting Placement', safetyVerified: false }
      ];
    }

    // 4. Safe Hostels (University Checklists)
    if (!state.safeHostels) {
      state.safeHostels = [
        { id: 1, name: 'Yaba Apex Student Hall', location: 'Yaba, near Unilag', beds: 48, status: 'Structural integrity certified. Security guard roster uploaded.', verified: true },
        { id: 2, name: 'VI Scholar Hostels', location: 'Victoria Island', beds: 24, status: 'Fire marshal checked. Clean water treatment operational.', verified: true },
        { id: 3, name: 'Lekki Share-Accommodation', location: 'Lekki Phase 2', beds: 16, status: 'Safety check pending (Access control review required).', verified: false }
      ];
    }

    // 5. Shared Programs
    if (!state.partnerPrograms) {
      state.partnerPrograms = [
        { id: 1, title: 'Tech-Stipend Rent Pool', limit: 8000000, spent: 5400000, members: 4 },
        { id: 2, title: 'Executive VI Allowance', limit: 7000000, spent: 4200000, members: 2 }
      ];
    }

    // 6. Partner Escrow vaults
    if (!state.partnerEscrows) {
      state.partnerEscrows = [
        { id: 1, title: 'Caution Vault: Lekki Duplex (Employee Tosin)', cautionAmount: 250000, rentAmount: 2950000, status: 'Funded', coSigner: 'Corporate Co-sign Guarantee' },
        { id: 2, title: 'Rent Trust: Yaba Hall (Student Chinedu)', cautionAmount: 50000, rentAmount: 450000, status: 'Released', coSigner: 'Unilag Housing Trust' }
      ];
    }

    // 7. Pending Employee Housing Requests (feeds Requests page & dashboard card)
    if (!state.partnerRequests) {
      state.partnerRequests = [
        { id: 1, employeeName: 'Babatunde Alao', dept: 'Product', type: 'Rent Credit', status: 'Pending', submittedDate: '2025-07-10' },
        { id: 2, employeeName: 'Ngozi Eze', dept: 'Sales', type: 'Lease Co-sign', status: 'Pending', submittedDate: '2025-07-18' },
        { id: 3, employeeName: 'Emeka Okafor', dept: 'Engineering', type: 'Caution Deposit', status: 'Pending', submittedDate: '2025-07-22' },
        { id: 4, employeeName: 'Amina Ibrahim', dept: 'HR', type: 'Rent Credit', status: 'Approved', submittedDate: '2025-07-05' }
      ];
    }

    // 8. Invitation funnel counters
    if (!state.partnerInvites) {
      state.partnerInvites = { invited: 12, joined: 8 };
    }
  },

  init(state, navigateTo, updateState) {
    const role = state.user ? state.user.role : 'Corporate Partner';

    // Bind Tab Switching
    document.querySelectorAll('.partner-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const selectedTab = e.currentTarget.getAttribute('data-tab');
        updateState({ activePartnerTab: selectedTab });
        navigateTo('partner');
      });
    });

    // Bind Sidebar Button Switching
    document.querySelectorAll('.partner-sidebar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedTab = e.currentTarget.getAttribute('data-tab');
        updateState({ activePartnerTab: selectedTab });
        navigateTo('partner');
      });
    });

    // Onboard Modal display
    const onboardModal = document.getElementById('partner-onboard-modal');
    document.getElementById('btn-partner-onboard')?.addEventListener('click', () => {
      if (onboardModal) onboardModal.style.display = 'flex';
    });

    document.getElementById('partner-close-btn')?.addEventListener('click', () => {
      if (onboardModal) onboardModal.style.display = 'none';
    });

    document.getElementById('partner-cancel-btn')?.addEventListener('click', () => {
      if (onboardModal) onboardModal.style.display = 'none';
    });

    // Onboard Form submission handler
    document.getElementById('partner-onboard-form')?.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('member-name').value;

      if (role === 'Corporate Partner') {
        const email = document.getElementById('member-email').value;
        const dept = document.getElementById('member-dept').value;
        const budget = parseInt(document.getElementById('member-budget').value);

        const newEmp = {
          id: state.corporateEmployees.length + 1,
          name,
          email,
          dept,
          budget,
          rentStatus: 'Searching',
          address: '—'
        };

        const updated = [...state.corporateEmployees, newEmp];
        updateState({ corporateEmployees: updated });

      } else if (role === 'University Housing') {
        const matric = document.getElementById('member-matric').value;
        const prog = document.getElementById('member-prog').value;

        const newStud = {
          id: state.universityStudents.length + 1,
          name,
          matric,
          program: prog,
          hostelName: 'Pending Allocation',
          bedspace: '—',
          status: 'Requested'
        };

        const updated = [...state.universityStudents, newStud];
        updateState({ universityStudents: updated });

      } else {
        const caseId = document.getElementById('member-case').value;
        const subsidy = parseInt(document.getElementById('member-subsidy').value);
        const program = document.getElementById('member-program-select').value;

        const newBen = {
          id: state.ngoBeneficiaries.length + 1,
          name,
          caseId,
          program,
          monthlySubsidy: subsidy,
          status: 'Awaiting Placement',
          safetyVerified: false
        };

        const updated = [...state.ngoBeneficiaries, newBen];
        updateState({ ngoBeneficiaries: updated });
      }

      // Log notification
      state.notifications.unshift({
        id: Date.now(),
        type: 'verification',
        text: `Member Enrolled: ${name} registered on Haven partner directory.`,
        time: 'Just now',
        read: false
      });

      if (onboardModal) onboardModal.style.display = 'none';
      alert(`Success! ${name} has been enrolled on the active program roster.`);
      navigateTo('partner');
    });

    // Remove member (Corporate, NGO)
    document.querySelectorAll('.btn-delete-member').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const isInvite = e.currentTarget.getAttribute('data-is-invite') === 'true';
        const confirmMsg = isInvite 
          ? "Are you sure you want to cancel this employee invitation?" 
          : "Are you sure you want to remove this member from the active roster?";

        showConfirmModal(confirmMsg, () => {
          if (role === 'Corporate Partner') {
            const updated = state.corporateEmployees.filter(emp => emp.id !== id);
            updateState({ corporateEmployees: updated });
          } else if (role === 'NGO Coordinator') {
            const updated = state.ngoBeneficiaries.filter(ben => ben.id !== id);
            updateState({ ngoBeneficiaries: updated });
          }
          alert(isInvite ? "Invitation cancelled." : "Member removed.");
          navigateTo('partner');
        });
      });
    });

    // University allocation action
    document.querySelectorAll('.btn-allocate-student').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const stud = state.universityStudents.find(s => s.id === id);

        if (stud) {
          const updated = state.universityStudents.map(s => {
            if (s.id === id) return { ...s, hostelName: 'Yaba Apex Student Hall', bedspace: 'Room 3C', status: 'Allocated' };
            return s;
          });

          // Add notification
          state.notifications.unshift({
            id: Date.now(),
            type: 'match',
            text: `Housing Allocated: Bedspace assigned to ${stud.name} in Apex Hall.`,
            time: 'Just now',
            read: false
          });

          updateState({ universityStudents: updated });
          alert(`Success! Bedspace assigned for ${stud.name}. Check-in codes dispatched.`);
          navigateTo('partner');
        }
      });
    });

    // NGO safe verification check
    document.querySelectorAll('.btn-verify-case-safety').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const updated = state.ngoBeneficiaries.map(ben => {
          if (ben.id === id) return { ...ben, safetyVerified: true, status: 'Active Shelter' };
          return ben;
        });

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'verification',
          text: `Case Audit Passed: Housing safety certificate issued.`,
          time: 'Just now',
          read: false
        });

        updateState({ ngoBeneficiaries: updated });
        alert("Safety check certified! Relief subsidies activated.");
        navigateTo('partner');
      });
    });

    // University Hostel Safety verification toggle
    document.querySelectorAll('.btn-verify-hostel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const updated = state.safeHostels.map(h => {
          if (h.id === id) return { ...h, verified: true, status: 'Integrity certified. Approved by Fire marshal.' };
          return h;
        });

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'verification',
          text: `Hostel Approved: Safe housing index updated.`,
          time: 'Just now',
          read: false
        });

        updateState({ safeHostels: updated });
        alert("Hostel certified safe! Students can now be allocated to this facility.");
        navigateTo('partner');
      });
    });

    // ── Create Program Modal ───────────────────────────────────────────────
    const createProgModal = document.getElementById('create-program-modal');

    // Helper: reset the modal form back to blank state
    const resetCreateProgramForm = () => {
      const form = document.getElementById('create-program-form');
      if (form) form.reset();
      // Clear pill selections
      document.querySelectorAll('.level-pill').forEach(p => p.classList.remove('selected'));
      // Hide all error messages
      document.querySelectorAll('.modal-field-error').forEach(el => el.classList.remove('visible'));
    };

    // Open modal
    document.getElementById('btn-create-program')?.addEventListener('click', () => {
      resetCreateProgramForm();
      if (createProgModal) createProgModal.style.display = 'flex';
    });

    // Close via × button
    document.getElementById('create-program-close-btn')?.addEventListener('click', () => {
      if (createProgModal) createProgModal.style.display = 'none';
    });

    // Close via Cancel button
    document.getElementById('create-program-cancel-btn')?.addEventListener('click', () => {
      if (createProgModal) createProgModal.style.display = 'none';
    });

    // Close on backdrop click (clicking outside the panel)
    createProgModal?.addEventListener('click', (e) => {
      if (e.target === createProgModal) createProgModal.style.display = 'none';
    });

    // Pill toggle logic — clicking a pill toggles its selected state
    document.querySelectorAll('.level-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('selected');
        // Hide the level error if at least one is now selected
        const anySelected = document.querySelectorAll('.level-pill.selected').length > 0;
        const levelErr = document.getElementById('err-prog-levels');
        if (anySelected && levelErr) levelErr.classList.remove('visible');
      });
    });

    // Form submit
    document.getElementById('create-program-form')?.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl   = document.getElementById('prog-name');
      const budgetEl = document.getElementById('prog-budget');
      const nameErr  = document.getElementById('err-prog-name');
      const budgetErr = document.getElementById('err-prog-budget');
      const levelErr  = document.getElementById('err-prog-levels');

      const name   = nameEl.value.trim();
      const budget = parseFloat(budgetEl.value);
      const selectedLevels = [...document.querySelectorAll('.level-pill.selected')]
                               .map(p => p.getAttribute('data-level'));
      const depts  = document.getElementById('prog-departments').value.trim();
      const desc   = document.getElementById('prog-description').value.trim();

      // ── Validation ──
      let valid = true;

      if (!name) {
        nameErr.classList.add('visible');
        nameEl.focus();
        valid = false;
      } else {
        nameErr.classList.remove('visible');
      }

      if (!budget || budget <= 0) {
        budgetErr.classList.add('visible');
        valid = false;
      } else {
        budgetErr.classList.remove('visible');
      }

      if (selectedLevels.length === 0) {
        levelErr.classList.add('visible');
        valid = false;
      } else {
        levelErr.classList.remove('visible');
      }

      if (!valid) return;

      // ── Build & persist new program ──
      const newProg = {
        id: Date.now(),
        title: name,
        limit: budget,
        spent: 0,
        members: 0,
        levels: selectedLevels,
        departments: depts || null,
        description: desc || null
      };

      const updated = [...state.partnerPrograms, newProg];
      updateState({ partnerPrograms: updated });

      if (createProgModal) createProgModal.style.display = 'none';
      navigateTo('partner');
    });

    // ── Employee Invitation Modal & Controls ────────────────────────────────
    const inviteModal = document.getElementById('invite-employee-modal');
    
    // Toggle Roster Filter Tab
    document.querySelectorAll('[data-roster-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filterVal = e.currentTarget.getAttribute('data-roster-filter');
        updateState({ rosterFilter: filterVal });
        navigateTo('partner');
      });
    });

    // Open Modal
    document.getElementById('btn-open-invite-modal')?.addEventListener('click', () => {
      // Clear forms
      document.getElementById('invite-single-form')?.reset();
      document.getElementById('invite-bulk-form')?.reset();
      const csvFileName = document.getElementById('csv-file-name');
      if (csvFileName) {
        csvFileName.style.display = 'none';
        csvFileName.innerText = '';
      }
      const submitBulkBtn = document.getElementById('btn-submit-bulk-invite');
      if (submitBulkBtn) submitBulkBtn.disabled = true;
      const errorEmail = document.getElementById('error-invite-email');
      if (errorEmail) errorEmail.innerText = '';
      const errorBulk = document.getElementById('error-invite-bulk');
      if (errorBulk) errorBulk.innerText = '';

      if (inviteModal) inviteModal.style.display = 'flex';
    });

    // Close Modal button handlers
    document.getElementById('invite-close-btn')?.addEventListener('click', () => {
      if (inviteModal) inviteModal.style.display = 'none';
    });
    document.getElementById('invite-cancel-btn')?.addEventListener('click', () => {
      if (inviteModal) inviteModal.style.display = 'none';
    });
    document.getElementById('invite-bulk-cancel-btn')?.addEventListener('click', () => {
      if (inviteModal) inviteModal.style.display = 'none';
    });

    // Close on backdrop click (clicking outside the panel)
    inviteModal?.addEventListener('click', (e) => {
      if (e.target === inviteModal) inviteModal.style.display = 'none';
    });

    // Modal tabs toggle
    const tabSingle = document.getElementById('modal-tab-single');
    const tabBulk = document.getElementById('modal-tab-bulk');
    const formSingle = document.getElementById('invite-single-form');
    const formBulk = document.getElementById('invite-bulk-form');

    tabSingle?.addEventListener('click', () => {
      updateState({ inviteTab: 'single' });
      tabSingle.classList.add('active');
      tabBulk?.classList.remove('active');
      if (formSingle) formSingle.style.display = 'block';
      if (formBulk) formBulk.style.display = 'none';
    });

    tabBulk?.addEventListener('click', () => {
      updateState({ inviteTab: 'bulk' });
      tabBulk.classList.add('active');
      tabSingle?.classList.remove('active');
      if (formBulk) formBulk.style.display = 'block';
      if (formSingle) formSingle.style.display = 'none';
    });

    // Copy invite link to clipboard
    document.querySelectorAll('.btn-copy-invite').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.getAttribute('data-code');
        const inviteUrl = `${window.location.origin}${window.location.pathname}#register?invite=${code}`;
        
        navigator.clipboard.writeText(inviteUrl).then(() => {
          alert(`Invite link copied to clipboard:\n${inviteUrl}`);
        }).catch(err => {
          console.error('Could not copy text: ', err);
          alert(`Link: ${inviteUrl}`);
        });
      });
    });

    // Submit Single Invite Form
    document.getElementById('invite-single-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailEl = document.getElementById('invite-email');
      const email = emailEl.value.trim();
      const name = document.getElementById('invite-name').value.trim();
      const dept = document.getElementById('invite-dept').value.trim();
      const budgetVal = document.getElementById('invite-budget').value;
      const budget = budgetVal ? parseFloat(budgetVal) : 0;
      
      const errorEl = document.getElementById('error-invite-email');
      if (errorEl) errorEl.innerText = '';

      if (!email) {
        if (errorEl) errorEl.innerText = 'Email address is required.';
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (errorEl) errorEl.innerText = 'Please enter a valid email address.';
        return;
      }

      // Check if email already invited/enrolled
      const exists = state.corporateEmployees.some(emp => emp.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        if (errorEl) errorEl.innerText = 'This email is already registered or invited.';
        return;
      }

      // Generate invite details
      const inviteCode = `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // TODO: In a production system, this is where we would send the token/inviteCode to the backend authentication API to record and dispatch the email invitation
      
      const newEmp = {
        id: Date.now(),
        name: name || '—',
        email: email,
        dept: dept || '—',
        budget: budget,
        rentStatus: 'Pending Invite',
        address: '—',
        status: 'Pending',
        inviteCode: inviteCode
      };

      const updated = [...state.corporateEmployees, newEmp];
      updateState({ corporateEmployees: updated });

      if (inviteModal) inviteModal.style.display = 'none';
      alert(`Invitation generated for ${email}.\nInvite Code: ${inviteCode}`);
      navigateTo('partner');
    });

    // Handle CSV File Selection
    const csvFileInput = document.getElementById('invite-csv-file');
    csvFileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const fileNameEl = document.getElementById('csv-file-name');
      const submitBulkBtn = document.getElementById('btn-submit-bulk-invite');
      
      if (file && fileNameEl && submitBulkBtn) {
        fileNameEl.innerText = `Selected file: ${file.name}`;
        fileNameEl.style.display = 'block';
        submitBulkBtn.disabled = false;
      }
    });

    // Download CSV template
    document.getElementById('btn-download-csv-template')?.addEventListener('click', (e) => {
      e.preventDefault();
      const csvContent = "Email,Name,Department,MonthlyAllocation\r\n" +
                         "employee.one@company.com,John Doe,Engineering,150000\r\n" +
                         "employee.two@company.com,Jane Smith,Product,120000\r\n";
      
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "haven_employee_invite_template.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Submit Bulk Invite Form (CSV Parsing)
    document.getElementById('invite-bulk-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const file = csvFileInput.files[0];
      const errorEl = document.getElementById('error-invite-bulk');
      if (errorEl) errorEl.innerText = '';

      if (!file) {
        if (errorEl) errorEl.innerText = 'Please choose a CSV file first.';
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const contents = evt.target.result;
          const lines = contents.split(/\r?\n/);
          if (lines.length <= 1) {
            if (errorEl) errorEl.innerText = 'CSV file is empty or missing headers.';
            return;
          }

          let addedCount = 0;
          const newInvites = [];
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          // Parse CSV lines
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const cols = line.split(',');
            const email = cols[0]?.trim();
            if (!email || !emailRegex.test(email)) continue;

            // Check if already exists in state
            const exists = state.corporateEmployees.some(emp => emp.email.toLowerCase() === email.toLowerCase())
                           || newInvites.some(inv => inv.email.toLowerCase() === email.toLowerCase());
            if (exists) continue;

            // Optional fields
            const name = cols[1]?.trim() || '—';
            const dept = cols[2]?.trim() || '—';
            const budgetVal = cols[3]?.trim();
            const budget = budgetVal ? parseFloat(budgetVal) : 0;

            const inviteCode = `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            newInvites.push({
              id: Date.now() + i,
              name: name,
              email: email,
              dept: dept,
              budget: budget,
              rentStatus: 'Pending Invite',
              address: '—',
              status: 'Pending',
              inviteCode: inviteCode
            });
            addedCount++;
          }

          if (newInvites.length === 0) {
            if (errorEl) errorEl.innerText = 'No new valid email addresses found in the CSV.';
            return;
          }

          // TODO: Real backend sync for CSV bulk tokens

          const updated = [...state.corporateEmployees, ...newInvites];
          updateState({ corporateEmployees: updated });

          if (inviteModal) inviteModal.style.display = 'none';
          alert(`Successfully imported and sent ${addedCount} employee invitations.`);
          navigateTo('partner');
        } catch (err) {
          console.error(err);
          if (errorEl) errorEl.innerText = 'Failed to parse CSV file. Please make sure it is valid.';
        }
      };
      reader.readAsText(file);
    });

    // CSV Exporter Simulation
    document.getElementById('btn-partner-csv-export')?.addEventListener('click', () => {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Name,Email/Matric/Case,Allocation,Status,Address\r\n";
      
      if (role === 'Corporate Partner') {
        state.corporateEmployees.forEach(e => {
          csvContent += `"${e.name}","${e.email}",${e.budget},"${e.rentStatus}","${e.address}"\r\n`;
        });
      } else {
        state.ngoBeneficiaries.forEach(b => {
          csvContent += `"${b.name}","${b.caseId}",${b.monthlySubsidy},"${b.status}","Verified Safe"\r\n`;
        });
      }

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "haven_partner_statement.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Roster CSV downloaded. Haven compliance ledger locked.");
    });

    // Escrow audit log download
    document.querySelectorAll('.btn-download-vault-audit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const esc = state.partnerEscrows.find(ev => ev.id === id);
        alert(`Exporting Audit Trace Envelope for: "${esc.title}"\nReference: ESC-${id}08-CO\nCBN Trust Status: Verified Funded`);
      });
    });
  }
};

// Employee Portal Screen
export const EmployeePortal = {
  formatNaira(val) {
    return '₦' + val.toLocaleString('en-US');
  },

  render(state) {
    const activeTab = state.activeEmployeeTab || 'programs';
    const employeeEmail = state.user?.username || '';
    
    // Find matching employee details in the active registry
    const linkedEmployee = state.corporateEmployees?.find(
      emp => emp.email.toLowerCase() === employeeEmail.toLowerCase()
    );
    const employeeName = linkedEmployee ? linkedEmployee.name : 'Employee User';
    
    const sidebarTabs = [
      { id: 'programs', name: 'Housing Programs', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>` },
      { id: 'applications', name: 'My Applications', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>` },
      { id: 'wallet', name: 'Wallet', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>` }
    ];

    const firstChar = employeeName.charAt(0).toUpperCase();
    const themeClass = state.adminDarkMode === true ? 'dark-theme' : '';

    return `
      <style>
        .employee-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
          margin-top: 0;
          align-items: start;
        }

        .employee-sidebar {
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

        .employee-sidebar-btn {
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

        .employee-sidebar-btn:hover {
          background-color: var(--nav-sidebar-hover, rgba(255, 255, 255, 0.1));
          color: white;
        }

        .employee-sidebar-btn.active {
          background-color: var(--nav-sidebar-active, #1A7A8A);
          color: white;
        }

        .employee-sidebar-btn .tab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          color: inherit;
        }

        .employee-main {
          min-width: 0;
          width: 100%;
        }

        @media (max-width: 768px) {
          .employee-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .employee-sidebar {
            position: static;
            height: auto;
            overflow-y: visible;
            padding: 16px;
          }
        }
      </style>
      <div class="dashboard-wrapper ${themeClass}">
        <div class="container">
          <div class="employee-layout">
            <aside class="employee-sidebar">
              <!-- Profile Header block inside sidebar -->
              <div class="sidebar-profile" style="padding: 0 0 16px 0; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 12px; flex-shrink: 0;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--partner-secondary, #2B6CB0); display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; flex-shrink: 0;">
                  ${firstChar}
                </div>
                <div style="overflow: hidden;">
                  <div style="font-weight: var(--weight-bold); font-size: 14px; color: white; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                    ${employeeName}
                  </div>
                  <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                    ${employeeEmail}
                  </div>
                </div>
              </div>

              <!-- Navigation buttons -->
              <div style="display:flex; flex-direction:column; gap:8px; flex:1;">
                ${sidebarTabs.map(t => `
                  <button class="employee-sidebar-btn ${activeTab === t.id ? 'active' : ''}" data-tab="${t.id}" style="width: 100%;">
                    <span class="tab-icon">${t.icon}</span>
                    <span class="tab-label">${t.name}</span>
                  </button>
                `).join('')}
              </div>

              <!-- Log Out Button -->
              <div style="padding-top:16px; border-top:1px solid rgba(255,255,255,0.1); margin-top:auto; flex-shrink: 0;">
                <button class="employee-sidebar-btn" id="employee-logout-btn" style="width:100%; color:#EF4444 !important; gap:12px; border:none; background:none; text-align:left; cursor:pointer; padding: 10px 16px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right:8px; vertical-align: middle;"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                  <span class="tab-label" style="font-weight:bold; vertical-align: middle;">Sign Out</span>
                </button>
              </div>
            </aside>
            <main class="employee-main">
              <div class="tab-panel">
                ${this.renderTabContent(state, activeTab)}
              </div>
            </main>
          </div>
        </div>
      </div>
    `;
  },

  renderTabContent(state, activeTab) {
    const employeeEmail = state.user?.username || '';

    if (activeTab === 'programs') {
      if (state.partnerPrograms && state.partnerPrograms.length > 0) {
        return `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
            <div>
              <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin: 0;">Employer Housing Stipends</h3>
              <p class="text-muted" style="margin: 4px 0 0 0; font-size: 13px;">View and request stipends from your corporate housing programs.</p>
            </div>
          </div>
          <div class="programs-grid">
            ${state.partnerPrograms.map(prog => {
              const hasApplied = state.partnerRequests?.some(r => r.email?.toLowerCase() === employeeEmail.toLowerCase() && r.programRequested === prog.title);
              return `
                <div class="program-card" style="display: flex; flex-direction: column;">
                  <h4 class="program-title" style="margin:0; font-size: 16px; color: var(--color-primary); font-weight: 600;">${prog.title}</h4>
                  <div style="font-size:12px; color:#6B7280; margin-top:8px; margin-bottom:12px;">Active Members: <strong style="color:var(--color-primary);">${prog.members}</strong></div>
                  
                  <div style="margin-top:auto; margin-bottom:16px;">
                    <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
                      <span>Spent: <strong>${this.formatNaira(prog.spent)}</strong></span>
                      <span style="color:#9CA3AF;">Pool Cap: ${this.formatNaira(prog.limit)}</span>
                    </div>
                    <div class="budget-progress-track" style="margin:0; height:8px;">
                      <div class="budget-progress-bar" style="width: ${Math.round((prog.spent/prog.limit)*100)}%;"></div>
                    </div>
                  </div>

                  <button class="btn ${hasApplied ? 'btn-outline' : 'btn-primary'}" style="width: 100%; font-size: 12px; padding: 8px;" ${hasApplied ? 'disabled' : ''}>
                    ${hasApplied ? 'Request Pending Approval' : 'Apply for Stipend'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      return `
        <div class="card" style="padding: 24px; text-align: center;">
          <h2 style="color: var(--color-primary); font-size: 20px; font-weight: var(--weight-bold); margin-bottom: 12px;">Housing Programs</h2>
          <p class="text-muted" style="margin: 0;">No active corporate benefit programs found. Please contact your HR team to register your organization's benefit programs.</p>
        </div>
      `;
    }

    if (activeTab === 'applications') {
      const myRequests = state.partnerRequests?.filter(r => r.email?.toLowerCase() === employeeEmail.toLowerCase()) || [];
      
      if (myRequests.length > 0) {
        return `
          <div style="margin-bottom:24px;">
            <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin: 0;">My Benefit Applications</h3>
            <p class="text-muted" style="margin: 4px 0 0 0; font-size: 13px;">Track the status of your housing program benefit requests.</p>
          </div>
          <div class="card" style="padding:0; overflow:hidden;">
            <table class="data-table" style="width:100%; border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Program Requested</th>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Requested Amount</th>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Submission Date</th>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${myRequests.map(req => {
                  let statusBadgeClass = 'badge-pending';
                  if (req.status === 'Accepted' || req.status === 'Approved') statusBadgeClass = 'badge-approved';
                  if (req.status === 'Rejected') statusBadgeClass = 'badge-rejected';
                  return `
                    <tr>
                      <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><strong style="color:var(--color-primary);">${req.programRequested}</strong></td>
                      <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><strong>${this.formatNaira(req.requestedAmount)} / mo</strong></td>
                      <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px; color:#4B5563;">${req.submittedDate || '—'}</td>
                      <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><span class="badge ${statusBadgeClass}">${req.status}</span></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      return `
        <div class="card" style="padding: 24px; text-align: center;">
          <h2 style="color: var(--color-primary); font-size: 20px; font-weight: var(--weight-bold); margin-bottom: 12px;">My Applications</h2>
          <p class="text-muted" style="margin: 0;">No active benefit applications found. Submit a request from the Housing Programs tab.</p>
        </div>
      `;
    }

    if (activeTab === 'wallet') {
      const isSeededBabatunde = employeeEmail.toLowerCase() === 'b.alao@firm.com';

      if (isSeededBabatunde) {
        return `
          <div style="margin-bottom:24px;">
            <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin: 0;">Employee Wallet Ledger</h3>
            <p class="text-muted" style="margin: 4px 0 0 0; font-size: 13px;">View caution deposits and housing stipend ledger entries.</p>
          </div>
          
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:28px;">
            <div class="card" style="padding:20px; border-left:4px solid #1A7A8A; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-size:12px; color:#6B7280; text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">Caution Fee Escrow</div>
              <div style="font-size:28px; font-weight:var(--weight-bold); color:var(--color-primary); margin-top:8px;">₦100,000</div>
              <div style="font-size:12px; color:#10B981; margin-top:6px; font-weight:500;">● Funded by partner.ops@firm.com</div>
            </div>
            <div class="card" style="padding:20px; border-left:4px solid #10B981; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-size:12px; color:#6B7280; text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">Available Rent Stipend</div>
              <div style="font-size:28px; font-weight:var(--weight-bold); color:var(--color-primary); margin-top:8px;">₦150,000</div>
              <div style="font-size:12px; color:#6B7280; margin-top:6px; font-weight:500;">Approved Pool Allocation</div>
            </div>
          </div>

          <div class="card" style="padding:0; overflow:hidden;">
            <div style="padding: 16px 20px; border-bottom: 1px solid rgba(0,0,0,0.05); background:#F9FAFB; font-weight: 600; color: var(--color-primary); font-size:14px;">
              Transaction History
            </div>
            <table class="data-table" style="width:100%; border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Date</th>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Type</th>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Reference</th>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Amount</th>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Status</th>
                  <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:var(--color-primary); font-weight:600; font-size:12px;">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px; color:#4B5563;">2025-07-15</td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><span style="font-weight:600; color:#10B981;">Credit</span></td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><code>ENV-STP-114</code></td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><strong>₦150,000</strong></td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><span class="badge badge-approved">Available</span></td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px; color:#4B5563;">Monthly stipend allocation (Tech-Stipend Rent Pool)</td>
                </tr>
                <tr>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px; color:#4B5563;">2025-07-12</td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><span style="font-weight:600; color:#1A7A8A;">Escrow Deposit</span></td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><code>ENV-CAU-902</code></td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><strong>₦100,000</strong></td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><span class="badge badge-action">Escrowed</span></td>
                  <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px; color:#4B5563;">Caution fee guarantee deposit by employer</td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
      }

      return `
        <div class="card" style="padding: 24px; text-align: center;">
          <h2 style="color: var(--color-primary); font-size: 20px; font-weight: var(--weight-bold); margin-bottom: 12px;">Wallet</h2>
          <p class="text-muted" style="margin: 0;">No active wallet transactions. Your wallet ledger will be populated once caution deposits or stipends are allocated.</p>
        </div>
      `;
    }
    return '';
  },

  init(state, navigateTo, updateState) {
    // Bind Sidebar Button Switching
    document.querySelectorAll('.employee-sidebar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedTab = e.currentTarget.getAttribute('data-tab');
        updateState({ activeEmployeeTab: selectedTab });
        navigateTo('employee');
      });
    });

    document.getElementById('employee-logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      // Remove session and clear corporate partner variables
      updateState({
        user: null,
        corporateEmployees: null,
        partnerPrograms: null,
        partnerRequests: null,
        partnerEscrows: null,
        partnerInvites: null
      });
      navigateTo('login');
    });
  }
};

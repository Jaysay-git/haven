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
        ${this.renderModal(state)}
      </div>
    `;
  },

  renderTabContent(state, activeTab) {
    const employeeEmail = state.user?.username || '';
    
    // Find matching employee details in the active registry
    const linkedEmployee = state.corporateEmployees?.find(
      emp => emp.email.toLowerCase() === employeeEmail.toLowerCase()
    );
    const empLevel = linkedEmployee && linkedEmployee.level && linkedEmployee.level !== '—' ? linkedEmployee.level : 'Mid-level';

    const getProgramLevels = (prog) => {
      if (prog.levels) return prog.levels;
      if (prog.title === 'Tech-Stipend Rent Pool') return ['Junior', 'Mid-level'];
      if (prog.title === 'Executive VI Allowance') return ['Senior', 'Executive'];
      return [];
    };

    if (activeTab === 'programs') {
      const eligiblePrograms = (state.partnerPrograms || []).filter(prog => {
        return getProgramLevels(prog).includes(empLevel);
      });

      if (eligiblePrograms.length > 0) {
        const activeFilter = state.activeEmployeeProgramFilter || 'all';
        const myRequests = state.partnerRequests?.filter(r => r.email?.toLowerCase() === employeeEmail.toLowerCase()) || [];

        const hasAcceptedRequest = (prog) => myRequests.some(r => r.programRequested === prog.title && (r.status.toLowerCase() === 'accepted' || r.status.toLowerCase() === 'approved'));
        const hasPendingRequest = (prog) => myRequests.some(r => r.programRequested === prog.title && r.status.toLowerCase() === 'pending');
        const isClosed = (prog) => (prog.limit - prog.spent) <= 0;

        const activeCount = eligiblePrograms.filter(hasAcceptedRequest).length;
        const pendingCount = eligiblePrograms.filter(hasPendingRequest).length;
        const closedCount = eligiblePrograms.filter(isClosed).length;

        const filteredPrograms = eligiblePrograms.filter(prog => {
          if (activeFilter === 'active') return hasAcceptedRequest(prog);
          if (activeFilter === 'pending') return hasPendingRequest(prog);
          if (activeFilter === 'closed') return isClosed(prog);
          return true;
        });

        return `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin: 0;">Employer Housing Programs</h3>
              <p class="text-muted" style="margin: 4px 0 0 0; font-size: 13px;">View and request stipends from your corporate housing programs.</p>
            </div>
            <span style="font-size:12px; color:#4B5563; background:rgba(26,122,138,0.06); padding:6px 12px; border-radius:8px; font-weight:600; border:1px solid rgba(26,122,138,0.12);">
              Level Access: ${empLevel}
            </span>
          </div>

          <!-- Programs Filter Tabs -->
          <div class="auth-tabs" style="margin-bottom: 20px; border-bottom: 1px solid rgba(13, 27, 75, 0.05); gap: 4px; display:flex;">
            <button class="auth-tab ${activeFilter === 'all' ? 'active' : ''}" data-emp-program-filter="all" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">All (${eligiblePrograms.length})</button>
            <button class="auth-tab ${activeFilter === 'active' ? 'active' : ''}" data-emp-program-filter="active" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">Active (${activeCount})</button>
            <button class="auth-tab ${activeFilter === 'pending' ? 'active' : ''}" data-emp-program-filter="pending" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">Pending (${pendingCount})</button>
            <button class="auth-tab ${activeFilter === 'closed' ? 'active' : ''}" data-emp-program-filter="closed" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">Closed (${closedCount})</button>
          </div>

          <div class="programs-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:20px;">
            ${filteredPrograms.length === 0 ? `
              <div class="card" style="grid-column: 1 / -1; padding: 32px; text-align: center; color: #6B7280; font-size: 13px;">
                No housing programs found matching this status.
              </div>
            ` : filteredPrograms.map(prog => {
              const remaining = prog.limit - prog.spent;
              
              // Check if there is an existing request from this employee for this program
              const existingReq = (state.partnerRequests || []).find(
                r => r.email?.toLowerCase() === employeeEmail.toLowerCase() && r.programRequested === prog.title
              );

              let btnText = 'Apply for Housing';
              let btnClass = 'btn-primary';
              let disabledAttr = '';
              let statusMarkup = '';

              if (existingReq) {
                const status = existingReq.status.toLowerCase();
                if (status === 'pending') {
                  btnText = 'Request Pending Approval';
                  btnClass = 'btn-outline';
                  disabledAttr = 'disabled';
                  statusMarkup = `<span class="badge badge-pending" style="font-size:10px;">Pending HR Audit</span>`;
                } else if (status === 'accepted' || status === 'approved') {
                  btnText = 'Enrolled';
                  btnClass = 'btn-outline';
                  disabledAttr = 'disabled';
                  statusMarkup = `<span class="badge badge-approved" style="font-size:10px;">Active Program Member</span>`;
                } else if (status === 'rejected') {
                  statusMarkup = `
                    <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-end;">
                      <span class="badge badge-rejected" style="font-size:10px;">Request Declined</span>
                    </div>
                  `;
                }
              }

              return `
                <div class="program-card" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 200px;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                      <h4 class="program-title" style="margin:0; font-size: 15px; color: var(--color-primary); font-weight: 600;">${prog.title}</h4>
                      ${statusMarkup}
                    </div>
                    <div style="font-size:12px; color:#6B7280; margin-top:8px; margin-bottom:12px;">Active Members: <strong style="color:var(--color-primary);">${prog.members}</strong></div>
                  </div>
                  
                  <div style="margin-top:auto; margin-bottom:16px;">
                    <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
                      <span>Remaining Pool: <strong>${this.formatNaira(remaining)}</strong></span>
                      <span style="color:#9CA3AF;">Cap: ${this.formatNaira(prog.limit)}</span>
                    </div>
                    <div class="budget-progress-track" style="margin:0; height:8px;">
                      <div class="budget-progress-bar" style="width: ${Math.round((prog.spent/prog.limit)*100)}%;"></div>
                    </div>
                  </div>

                  <button class="btn ${btnClass} btn-apply-program" data-prog-id="${prog.id}" style="width: 100%; font-size: 12px; padding: 8px;" ${disabledAttr}>
                    ${btnText}
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
          <p class="text-muted" style="margin: 0;">You are linked to <strong>Haven Corp Solutions</strong>, but there are no eligible housing programs configured for employee level <strong>${empLevel}</strong> at this time.</p>
        </div>
      `;
    }

    if (activeTab === 'applications') {
      const myRequests = state.partnerRequests?.filter(r => r.email?.toLowerCase() === employeeEmail.toLowerCase()) || [];
      
      const pendingCount = myRequests.filter(r => r.status.toLowerCase() === 'pending').length;
      const approvedCount = myRequests.filter(r => r.status.toLowerCase() === 'approved' || r.status.toLowerCase() === 'accepted').length;
      const rejectedCount = myRequests.filter(r => r.status.toLowerCase() === 'rejected').length;

      const activeFilter = state.activeEmployeeRequestFilter || 'all';
      const filteredRequests = myRequests.filter(req => {
        const status = req.status.toLowerCase();
        if (activeFilter === 'pending') return status === 'pending';
        if (activeFilter === 'approved') return status === 'approved' || status === 'accepted';
        if (activeFilter === 'rejected') return status === 'rejected';
        return true;
      });

      return `
        <div style="margin-bottom:20px;">
          <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin: 0;">My Applications</h3>
          <p class="text-muted" style="margin: 4px 0 0 0; font-size: 13px;">Track the status of your housing program benefit requests.</p>
        </div>

        <!-- Status Filter Tabs -->
        <div class="auth-tabs" style="margin-bottom: 20px; border-bottom: 1px solid rgba(13, 27, 75, 0.05); gap: 4px; display:flex;">
          <button class="auth-tab ${activeFilter === 'all' ? 'active' : ''}" data-emp-request-filter="all" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">All (${myRequests.length})</button>
          <button class="auth-tab ${activeFilter === 'pending' ? 'active' : ''}" data-emp-request-filter="pending" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">Pending (${pendingCount})</button>
          <button class="auth-tab ${activeFilter === 'approved' ? 'active' : ''}" data-emp-request-filter="approved" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">Approved (${approvedCount})</button>
          <button class="auth-tab ${activeFilter === 'rejected' ? 'active' : ''}" data-emp-request-filter="rejected" style="padding: 8px 16px; font-size: 12px; font-weight:var(--weight-semibold);">Rejected (${rejectedCount})</button>
        </div>

        <div class="card" style="padding:0; overflow:hidden;">
          <table class="data-table" style="width:100%; border-collapse:collapse;">
            <thead>
              <tr>
                <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:#374151; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;">Program Requested</th>
                <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:#374151; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;">Requested Amount</th>
                <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:#374151; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;">Payment Type</th>
                <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:#374151; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;">Status</th>
                <th style="text-align:left; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.05); background:#F9FAFB; color:#374151; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;">Rejection Reason</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRequests.length === 0 ? `
                <tr>
                  <td colspan="5" style="text-align:center; padding:32px; color:#6B7280; font-size:13px;">No applications found matching this status.</td>
                </tr>
              ` : filteredRequests.map(req => {
                let statusBadgeClass = 'badge-pending';
                if (req.status === 'Accepted' || req.status === 'Approved') statusBadgeClass = 'badge-approved';
                if (req.status === 'Rejected') statusBadgeClass = 'badge-rejected';
                
                const isPart = req.paymentOption === 'Part';
                const coFundText = isPart 
                  ? `Part Payment (Employer: ${this.formatNaira(req.employerShare || 0)} / Employee: ${this.formatNaira(req.employeeShare || 0)})`
                  : 'Full Payment';
                
                return `
                  <tr>
                    <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><strong style="color:var(--color-primary);">${req.programRequested}</strong></td>
                    <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;"><strong>${this.formatNaira(req.requestedAmount)} / mo</strong></td>
                    <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:12px; color:#4B5563;">${coFundText}</td>
                    <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px; color:#4B5563;"><span class="badge ${statusBadgeClass}">${req.status}</span></td>
                    <td style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); font-size:13px;">
                      ${req.status.toLowerCase() === 'rejected' ? `<span style="color:#EF4444; font-weight:500; font-style:italic;">${req.rejectionReason || '—'}</span>` : '—'}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
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

  renderModal(state) {
    if (!state.selectedProgramForApplication) return '';
    const prog = state.selectedProgramForApplication;
    const remaining = prog.limit - prog.spent;

    return `
      <!-- Application Modal -->
      <div class="landlord-modal" id="employee-apply-modal" style="display: flex; z-index: 1000; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); align-items: center; justify-content: center;">
        <div class="modal-content-panel" style="background: white; border-radius: 12px; max-width: 520px; width: 100%; box-shadow: var(--shadow-lg); border: 1px solid rgba(0,0,0,0.1);">
          <div class="modal-header-panel" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid rgba(0,0,0,0.05);">
            <h3 class="card-title" style="color: var(--color-primary); font-size: 16px; font-weight: 700; margin: 0;">Apply for Housing Benefit</h3>
            <button class="modal-close-icon-btn" id="employee-close-modal-btn">&times;</button>
          </div>
          
          <form id="employee-apply-form" novalidate>
            <div class="modal-body-panel" style="padding: 24px;">
              <!-- Program Name -->
              <div class="form-group-landlord">
                <label>Housing Program</label>
                <input type="text" class="form-control-landlord" value="${prog.title}" disabled style="background: #F3F4F6; cursor: not-allowed; width: 100%;">
              </div>
              
              <!-- Remaining Pool -->
              <div class="form-group-landlord">
                <label>Remaining Pool Budget</label>
                <div class="currency-input-wrapper">
                  <span class="currency-prefix">₦</span>
                  <input type="text" class="form-control-landlord" value="${remaining.toLocaleString('en-US')}" disabled style="background: #F3F4F6; cursor: not-allowed; width: 100%;">
                </div>
              </div>

              <!-- Requested Amount -->
              <div class="form-group-landlord">
                <label for="app-requested-amount">Requested Monthly Amount <span style="color:#EF4444;">*</span></label>
                <div class="currency-input-wrapper">
                  <span class="currency-prefix">₦</span>
                  <input type="number" id="app-requested-amount" class="form-control-landlord" placeholder="e.g. 150000" min="1" required style="width: 100%;">
                </div>
                <div class="modal-field-error" id="err-requested-amount" style="display:none; color: #EF4444; font-size: 11px; margin-top: 4px;">Please enter a valid requested monthly amount.</div>
              </div>

              <!-- Payment Option -->
              <div class="form-group-landlord">
                <label>Payment Option <span style="color:#EF4444;">*</span></label>
                <div style="display: flex; gap: 24px; margin-top: 8px;">
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight:500; cursor: pointer; color: var(--color-primary);">
                    <input type="radio" name="paymentOption" value="Full" id="pay-opt-full" checked style="accent-color: var(--color-primary); width:16px; height:16px;">
                    Full Payment (Employer Pool)
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight:500; cursor: pointer; color: var(--color-primary);">
                    <input type="radio" name="paymentOption" value="Part" id="pay-opt-part" style="accent-color: var(--color-primary); width:16px; height:16px;">
                    Part Payment (Co-funded)
                  </label>
                </div>
                <div id="full-pay-warning" style="display: none; font-size: 11px; color: #D97706; margin-top: 6px; font-style: italic;">
                  * Requested amount exceeds remaining program budget. Forced to Part Payment.
                </div>
              </div>

              <!-- Co-funding breakdown -->
              <div id="co-funding-breakdown" style="display: none; background: #F9FAFB; padding: 16px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.05); margin-bottom: 20px;">
                <h5 style="margin: 0 0 12px 0; font-size: 11px; color: var(--color-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Co-funding Breakdown</h5>
                
                <div class="form-group-landlord" style="margin-bottom: 12px;">
                  <label for="app-employer-share">Employer Contribution (Max: ${this.formatNaira(remaining)})</label>
                  <div class="currency-input-wrapper">
                    <span class="currency-prefix">₦</span>
                    <input type="number" id="app-employer-share" class="form-control-landlord" min="0" value="0" style="width: 100%;">
                  </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: var(--color-primary); margin-top: 8px; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 8px;">
                  <span>Employee Share (My Wallet):</span>
                  <span id="lbl-employee-share">₦0</span>
                </div>
              </div>
              
              <div id="app-error-box" style="display: none; padding: 10px; background-color: #FEE2E2; color: #EF4444; border-radius: 6px; font-size: 12px; margin-bottom: 16px; font-weight: 500;"></div>
            </div>

            <div class="modal-footer-panel" style="display: flex; gap: 12px; justify-content: flex-end; padding: 16px 24px; border-top: 1px solid rgba(0,0,0,0.05); background: #F9FAFB; border-radius: 0 0 12px 12px;">
              <button type="button" id="employee-cancel-modal-btn" class="btn btn-outline" style="font-size: 12px; padding: 8px 16px; cursor: pointer;">Cancel</button>
              <button type="submit" class="btn btn-primary" style="font-size: 12px; padding: 8px 16px; cursor: pointer;">Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // Bind Apply Button click
    document.querySelectorAll('.btn-apply-program').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const progId = Number(btn.getAttribute('data-prog-id'));
        const selectedProg = state.partnerPrograms.find(p => p.id === progId);
        updateState({ selectedProgramForApplication: selectedProg });
        navigateTo('employee');
      });
    });

    const closeModal = () => {
      updateState({ selectedProgramForApplication: null });
      navigateTo('employee');
    };

    document.getElementById('employee-close-modal-btn')?.addEventListener('click', closeModal);
    document.getElementById('employee-cancel-modal-btn')?.addEventListener('click', closeModal);

    const recalculateBreakdown = () => {
      const selectedProg = state.selectedProgramForApplication;
      if (!selectedProg) return;

      const remainingBudget = selectedProg.limit - selectedProg.spent;
      const requestedAmtInput = document.getElementById('app-requested-amount');
      const requestedAmount = Number(requestedAmtInput?.value || 0);

      const payOptFull = document.getElementById('pay-opt-full');
      const payOptPart = document.getElementById('pay-opt-part');
      const fullPayWarning = document.getElementById('full-pay-warning');
      const coFundingBreakdown = document.getElementById('co-funding-breakdown');
      const employerShareInput = document.getElementById('app-employer-share');
      const lblEmployeeShare = document.getElementById('lbl-employee-share');

      if (!payOptFull || !payOptPart) return;

      if (requestedAmount > remainingBudget) {
        payOptFull.disabled = true;
        payOptPart.checked = true;
        if (fullPayWarning) fullPayWarning.style.display = 'block';
        if (coFundingBreakdown) coFundingBreakdown.style.display = 'block';
        
        // Auto-fill employer share with max remaining budget
        let employerShare = Number(employerShareInput?.value || 0);
        if (employerShare > remainingBudget || employerShare === 0 || employerShare > requestedAmount) {
          employerShare = remainingBudget;
          if (employerShareInput) employerShareInput.value = employerShare;
        }
        
        const employeeShare = requestedAmount - employerShare;
        if (lblEmployeeShare) lblEmployeeShare.innerText = EmployeePortal.formatNaira(employeeShare);
      } else {
        payOptFull.disabled = false;
        if (fullPayWarning) fullPayWarning.style.display = 'none';
        
        if (payOptPart.checked) {
          if (coFundingBreakdown) coFundingBreakdown.style.display = 'block';
          
          let employerShare = Number(employerShareInput?.value || 0);
          if (employerShare > requestedAmount) {
            employerShare = requestedAmount;
            if (employerShareInput) employerShareInput.value = employerShare;
          }
          const employeeShare = requestedAmount - employerShare;
          if (lblEmployeeShare) lblEmployeeShare.innerText = EmployeePortal.formatNaira(employeeShare);
        } else {
          if (coFundingBreakdown) coFundingBreakdown.style.display = 'none';
        }
      }
    };

    const requestedAmtInput = document.getElementById('app-requested-amount');
    requestedAmtInput?.addEventListener('input', recalculateBreakdown);

    document.querySelectorAll('input[name="paymentOption"]').forEach(radio => {
      radio.addEventListener('change', recalculateBreakdown);
    });

    const employerShareInput = document.getElementById('app-employer-share');
    employerShareInput?.addEventListener('input', (e) => {
      const selectedProg = state.selectedProgramForApplication;
      if (!selectedProg) return;
      const remainingBudget = selectedProg.limit - selectedProg.spent;
      const requestedAmount = Number(document.getElementById('app-requested-amount')?.value || 0);
      
      let val = Number(e.target.value || 0);
      if (val < 0) val = 0;
      if (val > remainingBudget) val = remainingBudget;
      if (val > requestedAmount) val = requestedAmount;
      
      e.target.value = val;
      
      const employeeShare = requestedAmount - val;
      const lblEmployeeShare = document.getElementById('lbl-employee-share');
      if (lblEmployeeShare) lblEmployeeShare.innerText = EmployeePortal.formatNaira(employeeShare);
    });

    // Bind request status tabs clicks
    document.querySelectorAll('[data-emp-request-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = btn.getAttribute('data-emp-request-filter');
        updateState({ activeEmployeeRequestFilter: filter });
        navigateTo('employee');
      });
    });

    // Bind program filter tabs clicks
    document.querySelectorAll('[data-emp-program-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = btn.getAttribute('data-emp-program-filter');
        updateState({ activeEmployeeProgramFilter: filter });
        navigateTo('employee');
      });
    });

    // Form submission
    document.getElementById('employee-apply-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const selectedProg = state.selectedProgramForApplication;
      if (!selectedProg) return;
      
      const errorBox = document.getElementById('app-error-box');
      if (errorBox) errorBox.style.display = 'none';

      const requestedAmount = Number(document.getElementById('app-requested-amount')?.value || 0);
      const paymentOption = document.querySelector('input[name="paymentOption"]:checked')?.value || 'Full';
      
      let employerShare = requestedAmount;
      let employeeShare = 0;

      if (paymentOption === 'Part') {
        employerShare = Number(document.getElementById('app-employer-share')?.value || 0);
        employeeShare = requestedAmount - employerShare;
      }

      // Validations
      if (requestedAmount <= 0) {
        if (errorBox) {
          errorBox.innerText = "Requested amount must be a positive number.";
          errorBox.style.display = 'block';
        }
        return;
      }

      const remainingBudget = selectedProg.limit - selectedProg.spent;
      if (paymentOption === 'Full' && requestedAmount > remainingBudget) {
        if (errorBox) {
          errorBox.innerText = "Requested amount exceeds remaining pool budget. Please use Part Payment co-funding.";
          errorBox.style.display = 'block';
        }
        return;
      }

      if (employerShare > remainingBudget) {
        if (errorBox) {
          errorBox.innerText = `Employer share cannot exceed remaining budget of ${EmployeePortal.formatNaira(remainingBudget)}.`;
          errorBox.style.display = 'block';
        }
        return;
      }

      // Successful submission
      const employeeEmail = state.user?.username || '';
      
      // Find matching employee details in the active registry
      const linkedEmployee = state.corporateEmployees?.find(
        emp => emp.email.toLowerCase() === employeeEmail.toLowerCase()
      );
      const employeeName = linkedEmployee ? linkedEmployee.name : 'Employee User';
      const empLevel = linkedEmployee && linkedEmployee.level && linkedEmployee.level !== '—' ? linkedEmployee.level : 'Mid-level';
      
      const partnerEmail = state.user?.linkedPartnerEmail;
      if (partnerEmail) {
        const key = 'haven_corp_account_' + partnerEmail.toLowerCase();
        let partnerAccount = null;
        const savedStr = localStorage.getItem(key);
        if (savedStr) {
          try {
            partnerAccount = JSON.parse(savedStr);
          } catch (err) {
            console.error(err);
          }
        }
        
        // If local storage record doesn't exist yet for ops manager, initialize it
        if (!partnerAccount && partnerEmail.toLowerCase() === 'partner.ops@firm.com') {
          partnerAccount = {
            username: 'partner.ops@firm.com',
            role: 'Corporate Partner',
            method: 'email',
            corporateDetails: {
              organizationName: 'Haven Corp Solutions',
              businessSector: 'Technology',
              hqLocation: 'Lekki Phase 1, Lagos',
              employeeStrength: '51–200'
            },
            partnerPrograms: [
              { id: 1, title: 'Tech-Stipend Rent Pool', limit: 8000000, spent: 5400000, members: 4 },
              { id: 2, title: 'Executive VI Allowance', limit: 7000000, spent: 4200000, members: 2 }
            ],
            corporateEmployees: [
              { id: 1, name: 'Tosin Adelami', email: 't.adelami@firm.com', dept: 'Engineering', budget: 120000, rentStatus: 'Leased', address: '4b Admiralty Way, Lekki', status: 'Accepted' },
              { id: 2, name: 'Chioma Nze', email: 'c.nze@firm.com', dept: 'Finance', budget: 150000, rentStatus: 'Leased', address: 'Plot 12 VI Flat 3', status: 'Accepted' },
              { id: 3, name: 'Babatunde Alao', email: 'b.alao@firm.com', dept: 'Product', budget: 100000, rentStatus: 'Searching', address: '—', status: 'Accepted', level: 'Mid-level' }
            ],
            partnerRequests: [
              { id: 1, employeeName: 'Babatunde Alao', email: 'b.alao@firm.com', dept: 'Product', programRequested: 'Tech-Stipend Rent Pool', requestedAmount: 150000, level: 'Mid-level', status: 'Pending', submittedDate: '2025-07-10' },
              { id: 2, employeeName: 'Ngozi Eze', email: 'n.eze@firm.com', dept: 'Sales', programRequested: 'Executive VI Allowance', requestedAmount: 200000, level: 'Junior', status: 'Pending', submittedDate: '2025-07-18' },
              { id: 3, employeeName: 'Emeka Okafor', email: 'e.okafor@firm.com', dept: 'Engineering', programRequested: 'Tech-Stipend Rent Pool', requestedAmount: 300000, level: 'Senior', status: 'Pending', submittedDate: '2025-07-22' },
              { id: 4, employeeName: 'Amina Ibrahim', email: 'a.ibrahim@firm.com', dept: 'HR', programRequested: 'Tech-Stipend Rent Pool', requestedAmount: 120000, level: 'Junior', status: 'Accepted', submittedDate: '2025-07-05' }
            ],
            partnerEscrows: [
              { id: 1, title: 'Caution Vault: Lekki Duplex (Employee Tosin)', cautionAmount: 250000, rentAmount: 2950000, status: 'Funded', coSigner: 'Corporate Co-sign Guarantee' },
              { id: 2, title: 'Rent Trust: Yaba Hall (Student Chinedu)', cautionAmount: 50000, rentAmount: 450000, status: 'Released', coSigner: 'Unilag Housing Trust' }
            ],
            partnerInvites: { invited: 3, joined: 3 }
          };
        }
        
        if (partnerAccount) {
          const newReq = {
            id: Date.now(),
            employeeName: employeeName,
            email: employeeEmail,
            dept: linkedEmployee ? linkedEmployee.dept : 'General',
            programRequested: selectedProg.title,
            requestedAmount: Number(requestedAmount),
            level: empLevel,
            status: 'Pending',
            submittedDate: new Date().toISOString().split('T')[0],
            paymentOption: paymentOption,
            employerShare: Number(employerShare),
            employeeShare: Number(employeeShare)
          };
          
          partnerAccount.partnerRequests = partnerAccount.partnerRequests || [];
          partnerAccount.partnerRequests.push(newReq);
          localStorage.setItem(key, JSON.stringify(partnerAccount));
          
          // Also update current global state variables
          const updatedRequests = [...(state.partnerRequests || []), newReq];
          updateState({
            partnerRequests: updatedRequests,
            selectedProgramForApplication: null
          });
          
          navigateTo('employee');
        }
      }
    });

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

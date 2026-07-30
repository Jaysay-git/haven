// Leasing Workflow Screen (Restructured for Tenant Dashboard)
export const LeasingWorkflow = {
  render(state) {
    const activeTab = state.activeLeasingTab || 'applications';
    const apps = state.applications || [];
    const inspections = state.inspections || [];
    const activeDetailId = state.activeApplicationDetailId || null;
    const selectedDetailApp = apps.find(a => a.id === activeDetailId) || null;

    return `
      <div class="dashboard-wrapper" style="padding: 24px 0;">
        <div class="container">
          
          <!-- Top Header & Section Switcher -->
          <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <h1 class="page-title" style="font-size: 24px; margin-bottom: 4px;">Leasing & Application Management</h1>
              <p class="text-sm text-muted">Track property applications, manage walkthrough inspections, and access digital leases.</p>
            </div>
            
            <div style="display: inline-flex; background: #E5E7EB; padding: 4px; border-radius: 12px; gap: 4px;">
              <button class="btn btn-sm ${activeTab === 'applications' ? 'btn-primary' : 'btn-outline'}" id="tab-leasing-apps" style="border: none;">
                &#128196; Rental Applications (${apps.length})
              </button>
              <button class="btn btn-sm ${activeTab === 'inspections' ? 'btn-primary' : 'btn-outline'}" id="tab-leasing-insps" style="border: none;">
                &#128197; Inspection Scheduler (${inspections.length})
              </button>
            </div>
          </div>

          <!-- Single-Column Main Content View (Change 5: Inner sidebar removed) -->
          <div class="leasing-main-container">
            ${activeTab === 'applications' ? this.renderApplicationsTable(state, apps) : ''}
            ${activeTab === 'inspections' ? this.renderInspectionsTab(state, inspections) : ''}
          </div>

        </div>
      </div>

      <!-- Application Details Modal (Change 7, Change 8, Change 11) -->
      ${selectedDetailApp ? this.renderApplicationDetailModal(state, selectedDetailApp) : ''}
    `;
  },

  // CHANGE 6: Rental Applications Data Table with Sorting and Pagination
  renderApplicationsTable(state, apps) {
    const sortBy = state.appSortBy || 'date'; // date | status
    const sortOrder = state.appSortOrder || 'desc';
    const currentPage = state.appCurrentPage || 1;
    const pageSize = 10;

    // Sorting logic
    const sortedApps = [...apps].sort((a, b) => {
      if (sortBy === 'status') {
        const res = a.status.localeCompare(b.status);
        return sortOrder === 'asc' ? res : -res;
      } else {
        const d1 = new Date(a.applicationDate || '2026-06-01');
        const d2 = new Date(b.applicationDate || '2026-06-01');
        return sortOrder === 'asc' ? d1 - d2 : d2 - d1;
      }
    });

    // Pagination logic
    const totalPages = Math.max(1, Math.ceil(sortedApps.length / pageSize));
    const paginatedApps = sortedApps.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const rowsHTML = paginatedApps.map(app => {
      let badgeClass = 'badge-pending';
      if (app.status === 'Approved') badgeClass = 'badge-approved';
      if (app.status === 'Rejected') badgeClass = 'badge-rejected';
      if (app.status === 'Under Review') badgeClass = 'badge-action';

      const monthlyRentVal = app.monthlyRent || Math.round((app.rent || 0) / 12);

      return `
        <tr style="border-bottom: 1px solid #F3F4F6; transition: background 150ms ease;">
          <td style="padding: 16px; font-weight: bold; color: var(--color-primary);">${app.title}</td>
          <td style="padding: 16px; color: #4B5563;">${app.propertyType || 'Apartment'}</td>
          <td style="padding: 16px; font-weight: 600;">₦ ${monthlyRentVal.toLocaleString()} / mo</td>
          <td style="padding: 16px; color: #6B7280; font-size: 13px;">${app.applicationDate || '2026-06-15'}</td>
          <td style="padding: 16px; color: #374151;">${app.landlord}</td>
          <td style="padding: 16px;"><span class="badge ${badgeClass}">${app.status}</span></td>
          <td style="padding: 16px; color: #6B7280; font-size: 13px;">${app.leaseStartDate ? app.leaseStartDate : '—'}</td>
          <td style="padding: 16px; text-align: right;">
            <button class="btn btn-outline btn-sm btn-view-app-details" data-id="${app.id}">View Details</button>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="card" style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <h2 style="font-size: 18px; font-weight: bold; color: var(--color-primary); margin: 0;">Rental Applications</h2>
          
          <!-- Sorting controls -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <label style="font-size: 12px; color: #6B7280; font-weight: 600;">Sort By:</label>
            <select class="form-input" id="sort-apps-select" style="padding: 6px 12px; font-size: 12px; width: auto;">
              <option value="date-desc" ${sortBy === 'date' && sortOrder === 'desc' ? 'selected' : ''}>Application Date (Newest)</option>
              <option value="date-asc" ${sortBy === 'date' && sortOrder === 'asc' ? 'selected' : ''}>Application Date (Oldest)</option>
              <option value="status-asc" ${sortBy === 'status' && sortOrder === 'asc' ? 'selected' : ''}>Status (A-Z)</option>
              <option value="status-desc" ${sortBy === 'status' && sortOrder === 'desc' ? 'selected' : ''}>Status (Z-A)</option>
            </select>
          </div>
        </div>

        <!-- Data Table -->
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <thead>
              <tr style="background: #F9FAFB; border-bottom: 2px solid #E5E7EB; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
                <th style="padding: 12px 16px;">Property Address</th>
                <th style="padding: 12px 16px;">Type</th>
                <th style="padding: 12px 16px;">Monthly Rent</th>
                <th style="padding: 12px 16px;">App Date</th>
                <th style="padding: 12px 16px;">Landlord</th>
                <th style="padding: 12px 16px;">Status</th>
                <th style="padding: 12px 16px;">Lease Start</th>
                <th style="padding: 12px 16px; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHTML.length > 0 ? rowsHTML : `<tr><td colspan="8" style="text-align: center; padding: 32px; color: #9CA3AF;">No rental applications recorded.</td></tr>`}
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        ${totalPages > 1 ? `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; border-top: 1px solid #E5E7EB; padding-top: 16px;">
            <span style="font-size: 12px; color: #6B7280;">Page ${currentPage} of ${totalPages}</span>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" id="btn-app-page-prev" ${currentPage <= 1 ? 'disabled' : ''}>Previous</button>
              <button class="btn btn-outline btn-sm" id="btn-app-page-next" ${currentPage >= totalPages ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        ` : ''}

      </div>
    `;
  },

  // CHANGE 7, CHANGE 8, CHANGE 11: Application Detail Modal (Digital Lease, Current Rental & Financials)
  renderApplicationDetailModal(state, app) {
    const detailTab = state.activeAppDetailTab || 'overview';
    const isApproved = app.status === 'Approved' || app.status === 'Active';
    const lease = state.activeLeaseAgreement || {};
    const esc = state.escrow || {};

    return `
      <div class="modal-overlay" id="app-detail-modal" style="display: flex;">
        <div class="modal-content-card" style="max-width: 840px; width: 90%; max-height: 85vh; overflow-y: auto; padding: 28px;">
          
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #E5E7EB; padding-bottom: 16px; margin-bottom: 20px;">
            <div>
              <span class="badge badge-approved" style="margin-bottom: 6px;">Application #${app.id}</span>
              <h2 style="font-size: 20px; font-weight: bold; color: var(--color-primary); margin: 0;">${app.title}</h2>
              <p style="font-size: 12px; color: #6B7280; margin: 4px 0 0 0;">Landlord: <strong>${app.landlord}</strong> &bull; Application Date: ${app.applicationDate || '2026-06-15'}</p>
            </div>
            <button id="close-app-detail-modal" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #9CA3AF;">&times;</button>
          </div>

          <!-- Detail Sub-Tabs Navigation (Change 7 & Change 8 entry points) -->
          <div style="display: flex; gap: 8px; border-bottom: 2px solid #E5E7EB; margin-bottom: 20px; overflow-x: auto;">
            <button class="auth-tab ${detailTab === 'overview' ? 'active' : ''}" id="tab-detail-overview" style="padding: 10px 16px; font-size: 13px;">Application Overview</button>
            ${isApproved ? `<button class="auth-tab ${detailTab === 'lease' ? 'active' : ''}" id="tab-detail-lease" style="padding: 10px 16px; font-size: 13px;">Digital Lease (Change 7)</button>` : ''}
            ${isApproved ? `<button class="auth-tab ${detailTab === 'current' ? 'active' : ''}" id="tab-detail-current" style="padding: 10px 16px; font-size: 13px;">Current Rental & Financials (Change 8 & 11)</button>` : ''}
          </div>

          <!-- TAB 1: APPLICATION OVERVIEW -->
          ${detailTab === 'overview' ? `
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div style="background: #FAF9F6; padding: 16px; border-radius: 12px; border: 1px solid #E5E7EB;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="font-size: 12px; color: #6B7280;">Status:</span>
                  <span class="badge ${app.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${app.status}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="font-size: 12px; color: #6B7280;">Annual Rent:</span>
                  <strong style="color: var(--color-primary);">₦ ${(app.rent || 0).toLocaleString()} / Yr</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 12px; color: #6B7280;">Next Action:</span>
                  <strong style="color: var(--color-secondary);">${app.actionRequired || 'None'}</strong>
                </div>
              </div>
              
              ${isApproved ? `
                <div style="display: flex; gap: 12px;">
                  <button class="btn btn-primary btn-sm" id="btn-goto-lease-tab" style="flex: 1;">Proceed to Digital Lease</button>
                  <button class="btn btn-outline btn-sm" id="btn-goto-current-tab" style="flex: 1;">View Tenancy & Financials</button>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- TAB 2: DIGITAL LEASE (Change 7) -->
          ${detailTab === 'lease' ? this.renderLeaseStudioTab(state) : ''}

          <!-- TAB 3: CURRENT RENTAL & FINANCIALS (Change 8 & Change 11) -->
          ${detailTab === 'current' ? `
            <div style="display: flex; flex-direction: column; gap: 24px;">
              
              <!-- Tenancy Overview Block (Change 8) -->
              <div style="background: #F0FDF4; padding: 16px; border-radius: 12px; border: 1px solid rgba(34,197,94,0.3);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <h3 style="font-size: 16px; font-weight: bold; color: var(--color-primary); margin: 0;">Active Tenancy Agreement</h3>
                    <p style="font-size: 12px; color: #4B5563; margin: 4px 0 0 0;">Lease Term: July 1, 2026 – June 30, 2027 &bull; Landlord: ${app.landlord}</p>
                  </div>
                  <span class="badge badge-approved">Active Tenancy</span>
                </div>
              </div>

              <!-- Financial Calculations & Breakdown Widgets (Change 11) -->
              <div>
                <h3 style="font-size: 15px; font-weight: bold; color: var(--color-primary); margin-bottom: 12px;">Financial Overview & Escrow Calculation</h3>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;">
                  <div style="background: white; padding: 16px; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: var(--shadow-sm);">
                    <div style="font-size: 11px; color: #6B7280; font-weight: 600; text-transform: uppercase;">Total Secured</div>
                    <div style="font-size: 20px; font-weight: bold; color: var(--color-primary); margin-top: 4px;">₦ ${(esc.totalSecured || 1200000).toLocaleString()}</div>
                  </div>
                  <div style="background: white; padding: 16px; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: var(--shadow-sm);">
                    <div style="font-size: 11px; color: #6B7280; font-weight: 600; text-transform: uppercase;">Caution Deposit Vault</div>
                    <div style="font-size: 20px; font-weight: bold; color: var(--color-secondary); margin-top: 4px;">₦ ${(esc.cautionDeposit || 250000).toLocaleString()}</div>
                  </div>
                  <div style="background: white; padding: 16px; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: var(--shadow-sm);">
                    <div style="font-size: 11px; color: #6B7280; font-weight: 600; text-transform: uppercase;">Rent Advance Vault</div>
                    <div style="font-size: 20px; font-weight: bold; color: var(--color-primary); margin-top: 4px;">₦ ${(esc.advanceRent || 950000).toLocaleString()}</div>
                  </div>
                </div>

                <!-- Payment Milestone Schedule -->
                <div style="background: #FAF9F6; padding: 16px; border-radius: 12px; border: 1px solid #E5E7EB; font-size: 12px;">
                  <div style="font-weight: bold; color: var(--color-primary); margin-bottom: 8px;">Upcoming Payment Milestone Schedule</div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E5E7EB;">
                    <span>Next Rent Installment (Monthly):</span>
                    <strong>₦ ${(app.monthlyRent || 116667).toLocaleString()} (Due Aug 1, 2026)</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                    <span>Escrow Caution Protection Status:</span>
                    <strong style="color: var(--color-success);">Protected under CBN Compliance</strong>
                  </div>
                </div>

              </div>

            </div>
          ` : ''}

        </div>
      </div>
    `;
  },

  // Inspections Tab
  renderInspectionsTab(state, inspections) {
    const activeDate = state.selectedInspectionDate || 25;
    const activeSlot = state.selectedTimeSlot || '10:30 AM';
    const isVirtual = state.isVirtualInspection !== false;

    // Render calendar cells (Lagos timezone - June 2026 starting Monday)
    const daysHTML = [];
    daysHTML.push('<div class="calendar-cell muted"></div>');
    for (let i = 1; i <= 30; i++) {
      const isSelected = activeDate === i;
      daysHTML.push(`
        <div class="calendar-cell ${isSelected ? 'active' : ''} btn-calendar-select" data-day="${i}">
          ${i}
        </div>
      `);
    }

    return `
      <div style="display:grid; grid-template-columns: 1.2fr 0.8fr; gap:24px; align-items:start;">
        <!-- Booking Panel -->
        <div class="card" style="padding:24px; display:flex; flex-direction:column; gap:20px;">
          <h3 class="card-title" style="font-size:15px; margin:0;">Select Date & Time</h3>
          
          <!-- Mode Toggle -->
          <div style="display:flex; background:#F3F4F6; padding:4px; border-radius:12px;">
            <button class="auth-tab ${isVirtual ? 'active' : ''}" id="btn-toggle-virtual" style="padding:8px; font-size:12px;">Virtual Tour (Zoom/Meet)</button>
            <button class="auth-tab ${!isVirtual ? 'active' : ''}" id="btn-toggle-physical" style="padding:8px; font-size:12px;">Physical Walkthrough</button>
          </div>

          <!-- Calendar -->
          <div class="calendar-widget">
            <div class="calendar-header-row">
              <span>June 2026</span>
              <span style="font-size:12px; color:#6B7280;">Lagos Timezone</span>
            </div>
            <div class="calendar-days-grid">
              <div class="calendar-day-label">Su</div>
              <div class="calendar-day-label">Mo</div>
              <div class="calendar-day-label">Tu</div>
              <div class="calendar-day-label">We</div>
              <div class="calendar-day-label">Th</div>
              <div class="calendar-day-label">Fr</div>
              <div class="calendar-day-label">Sa</div>
              ${daysHTML.join('')}
            </div>
          </div>

          <!-- Time slots -->
          <div>
            <label class="form-label" style="font-size:12px; margin-bottom:8px; display:block;">Select Time Slot</label>
            <div class="time-slots-grid">
              <button class="time-slot-btn ${activeSlot === '09:00 AM' ? 'active' : ''}" data-time="09:00 AM">09:00 AM</button>
              <button class="time-slot-btn ${activeSlot === '10:30 AM' ? 'active' : ''}" data-time="10:30 AM">10:30 AM</button>
              <button class="time-slot-btn ${activeSlot === '01:00 PM' ? 'active' : ''}" data-time="01:00 PM">01:00 PM</button>
              <button class="time-slot-btn ${activeSlot === '04:00 PM' ? 'active' : ''}" data-time="04:00 PM">04:00 PM</button>
            </div>
          </div>

          <button class="btn btn-primary" id="btn-schedule-insp-submit" style="width:100%;">Schedule Walkthrough</button>
        </div>

        <!-- Upcoming / History -->
        <div class="card" style="padding:20px; display:flex; flex-direction:column; gap:16px;">
          <h3 class="card-title" style="font-size:15px; margin:0;">Upcoming Schedules</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${inspections.length > 0 ? inspections.map(insp => `
              <div style="padding:12px; background:#FAF9F6; border:1px solid #E5E7EB; border-radius:10px; font-size:11px; text-align:left;">
                <div style="font-weight:bold; color:var(--color-primary); margin-bottom:4px;">${insp.title}</div>
                <div style="color:#4B5563; margin-bottom:2px;">Date: <strong>June ${insp.date}, 2026</strong> &bull; Time: <strong>${insp.time}</strong></div>
                <div style="color:#6B7280;">Type: <strong>${insp.type}</strong> &bull; Status: <span class="badge badge-approved" style="font-size:9px; padding:2px 6px;">${insp.status}</span></div>
              </div>
            `).join('') : '<div class="text-caption text-muted">No inspections booked.</div>'}
          </div>
        </div>
      </div>
    `;
  },

  // Lease Sign Studio Inner Renderer
  renderLeaseStudioTab(state) {
    const lease = state.activeLeaseAgreement || {};
    const isSigned = lease.status === 'Signed' || lease.status === 'Executed';

    return `
      <div style="display:grid; grid-template-columns: 1.7fr 1.3fr; gap:24px; align-items:start;">
        <div class="lease-document-paper">
          <h3>Residential Tenancy Agreement</h3>
          <p class="text-xs text-muted" style="text-align:center; margin-bottom:16px;">SECURED VIA HAVEN PLATFORM COMPLIANCE ENVELOPE</p>
          
          <div class="lease-clause-block">
            <div class="lease-clause-title">1. Parting Entities</div>
            <p>This agreement is Counter-Signed between landlord <strong>${lease.landlordName}</strong> and qualified tenant <strong>Osaze Alao</strong> on June 22, 2026.</p>
          </div>

          <div class="lease-clause-block">
            <div class="lease-clause-title">2. Property details & Rent Dues</div>
            <p>The tenancy is subject to lease on <strong>${lease.propertyTitle}</strong>. Annual rent dues are fixed at <strong>₦ ${lease.rent.toLocaleString()}</strong>, caution deposits locked in Haven Escrow at ₦ 250,000.</p>
          </div>
        </div>

        <div class="card" style="padding:20px; text-align:left;">
          <h3 class="card-title" style="font-size:15px; margin-bottom:16px;">Agreement Execution</h3>
          
          ${isSigned ? `
            <div class="text-center" style="padding:16px 0;">
              <div class="executed-stamp-mark">Executed</div>
              <p style="font-size:12px; font-weight:bold; color:var(--color-primary); margin-top:12px;">Signed by Tenant: <span style="font-family:'Brush Script MT', cursive; font-size:20px; color:#1E3A8A;">${lease.tenantSignature || 'Osaze Alao'}</span></p>
              <div style="background:#F0FDF4; padding:12px; border-radius:8px; font-size:11px; margin-top:20px; border:1px solid rgba(34,197,94,0.2); color:var(--color-success); font-weight:bold;">
                Lease Counter-Signed. Rent payment caution is due in Escrow.
              </div>
            </div>
          ` : `
            <form id="lease-signature-form">
              <div class="form-group">
                <label class="form-label" for="lease-sig-input">Type Your Full Name to Sign</label>
                <input class="form-input" style="padding:10px;" type="text" id="lease-sig-input" placeholder="e.g. Osaze Alao" required>
              </div>

              <div class="form-group">
                <label class="checkbox-label" style="font-size:11px; line-height:1.4;">
                  <input type="checkbox" required>
                  I certify that I have read the clauses and validate this signature as legally counter-binding.
                </label>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%; margin-top:16px;">Apply Digital Signature</button>
            </form>
          `}
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // Section tabs
    document.getElementById('tab-leasing-apps')?.addEventListener('click', () => {
      updateState({ activeLeasingTab: 'applications' });
      navigateTo('leasing');
    });
    document.getElementById('tab-leasing-insps')?.addEventListener('click', () => {
      updateState({ activeLeasingTab: 'inspections' });
      navigateTo('leasing');
    });

    // View Details button on Table Rows
    document.querySelectorAll('.btn-view-app-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        updateState({ activeApplicationDetailId: id, activeAppDetailTab: 'overview' });
        navigateTo('leasing');
      });
    });

    // Close App Detail Modal
    document.getElementById('close-app-detail-modal')?.addEventListener('click', () => {
      updateState({ activeApplicationDetailId: null });
      navigateTo('leasing');
    });

    // Sub-tab switches inside detail modal
    document.getElementById('tab-detail-overview')?.addEventListener('click', () => {
      updateState({ activeAppDetailTab: 'overview' });
      navigateTo('leasing');
    });
    document.getElementById('tab-detail-lease')?.addEventListener('click', () => {
      updateState({ activeAppDetailTab: 'lease' });
      navigateTo('leasing');
    });
    document.getElementById('tab-detail-current')?.addEventListener('click', () => {
      updateState({ activeAppDetailTab: 'current' });
      navigateTo('leasing');
    });
    document.getElementById('btn-goto-lease-tab')?.addEventListener('click', () => {
      updateState({ activeAppDetailTab: 'lease' });
      navigateTo('leasing');
    });
    document.getElementById('btn-goto-current-tab')?.addEventListener('click', () => {
      updateState({ activeAppDetailTab: 'current' });
      navigateTo('leasing');
    });

    // Sorting dropdown
    document.getElementById('sort-apps-select')?.addEventListener('change', (e) => {
      const val = e.target.value;
      const [by, order] = val.split('-');
      updateState({ appSortBy: by, appSortOrder: order, appCurrentPage: 1 });
      navigateTo('leasing');
    });

    // Pagination buttons
    document.getElementById('btn-app-page-prev')?.addEventListener('click', () => {
      const cur = state.appCurrentPage || 1;
      if (cur > 1) {
        updateState({ appCurrentPage: cur - 1 });
        navigateTo('leasing');
      }
    });
    document.getElementById('btn-app-page-next')?.addEventListener('click', () => {
      const cur = state.appCurrentPage || 1;
      updateState({ appCurrentPage: cur + 1 });
      navigateTo('leasing');
    });

    // Inspection calendar clicks
    document.querySelectorAll('.btn-calendar-select').forEach(cell => {
      cell.addEventListener('click', () => {
        const day = parseInt(cell.getAttribute('data-day'));
        updateState({ selectedInspectionDate: day });
        navigateTo('leasing');
      });
    });

    // Time slot selectors
    document.querySelectorAll('.time-slot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const time = btn.getAttribute('data-time');
        updateState({ selectedTimeSlot: time });
        navigateTo('leasing');
      });
    });

    // Schedule submission
    document.getElementById('btn-schedule-insp-submit')?.addEventListener('click', () => {
      const day = state.selectedInspectionDate || 25;
      const time = state.selectedTimeSlot || '10:30 AM';
      const isVirtual = state.isVirtualInspection !== false;

      const newInsp = {
        id: Date.now(),
        propertyId: 2,
        title: 'Cozy 1 Bedroom Studio Loft',
        landlord: 'Mrs. Funmi Coker',
        date: `June ${day}, 2026`,
        time: time,
        type: isVirtual ? 'Virtual HD Tour' : 'Physical Walkthrough',
        status: 'Scheduled'
      };

      updateState({
        inspections: [...(state.inspections || []), newInsp]
      });

      alert(`Inspection Scheduled! \nDate: June ${day}, 2026 at ${time}`);
      navigateTo('leasing');
    });

    // Lease signature submit inside modal
    document.getElementById('lease-signature-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('lease-sig-input').value.trim();
      updateState({
        activeLeaseAgreement: { ...state.activeLeaseAgreement, status: 'Signed', tenantSignature: val }
      });
      alert('Lease digitally countersigned successfully!');
      navigateTo('leasing');
    });
  }
};

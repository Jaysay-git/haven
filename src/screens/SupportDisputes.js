// Support & Disputes Screen (Combines Maintenance Requests and Dispute Centre)
export const SupportDisputes = {
  render(state) {
    const activeTab = state.activeSupportTab || 'maintenance';
    const maintenanceRequests = state.maintenanceRequests || [
      { id: 1, title: 'Bathroom Plumbing Leak', property: 'Cozy 1 Bedroom Studio Loft', date: '2026-07-10', priority: 'High', status: 'In Progress', description: 'Water pipe leaking under master bathroom sink.' },
      { id: 2, title: 'AC Servicing & Filter Cleaning', property: 'Cozy 1 Bedroom Studio Loft', date: '2026-06-28', priority: 'Medium', status: 'Completed', description: 'Routine servicing for living room split AC unit.' }
    ];
    const disputes = state.disputes || [
      { id: 1, title: 'Caution Deposit Refund Hold', property: '4b Admiralty Way, Lekki', landlord: 'Chief Alabi', date: '2026-06-20', status: 'Under Review', amount: 250000, description: 'Landlord requested deduction for wall repaint; tenant provided pre-move-in condition photos.' }
    ];

    return `
      <div class="dashboard-wrapper" style="padding: 24px 0;">
        <div class="container">
          
          <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <h1 class="page-title" style="font-size: 24px; margin-bottom: 4px;">Support & Disputes</h1>
              <p class="text-sm text-muted">Log maintenance repair tickets and resolve lease dispute claims under CBN/NDPR safeguards.</p>
            </div>
            
            <!-- Tab selector -->
            <div style="display: inline-flex; background: #E5E7EB; padding: 4px; border-radius: 12px; gap: 4px;">
              <button class="btn btn-sm ${activeTab === 'maintenance' ? 'btn-primary' : 'btn-outline'}" id="tab-support-maintenance" style="border: none;">
                &#128736; Maintenance Requests (${maintenanceRequests.length})
              </button>
              <button class="btn btn-sm ${activeTab === 'disputes' ? 'btn-primary' : 'btn-outline'}" id="tab-support-disputes" style="border: none;">
                &#9888; Dispute Centre (${disputes.length})
              </button>
            </div>
          </div>

          <!-- TAB 1: MAINTENANCE REQUESTS -->
          ${activeTab === 'maintenance' ? this.renderMaintenanceTab(maintenanceRequests) : ''}

          <!-- TAB 2: DISPUTE CENTRE -->
          ${activeTab === 'disputes' ? this.renderDisputesTab(disputes) : ''}

        </div>
      </div>

      <!-- New Maintenance Request Modal -->
      <div class="modal-overlay" id="maintenance-modal" style="display:none;">
        <div class="modal-content-card">
          <h3 class="card-title" style="margin-bottom:8px;">New Maintenance Request</h3>
          <p class="text-caption text-muted" style="margin-bottom:20px;">Submit a repair ticket to your landlord and Haven property management.</p>
          <form id="maintenance-form">
            <div class="form-group">
              <label class="form-label">Issue Title</label>
              <input class="form-input" type="text" id="maint-title" placeholder="e.g. Electrical socket faulty" required>
            </div>
            <div class="form-group">
              <label class="form-label">Priority Level</label>
              <select class="form-input" id="maint-priority">
                <option value="Low">Low (General Inquiry)</option>
                <option value="Medium" selected>Medium (Standard Repair)</option>
                <option value="High">High (Urgent / Plumbing / Power)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-input" id="maint-desc" rows="3" placeholder="Provide details about the defect..." required></textarea>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
              <button type="button" class="btn btn-outline btn-sm" id="close-maint-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">Submit Ticket</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  renderMaintenanceTab(requests) {
    const rows = requests.map(r => `
      <div class="card" style="padding: 20px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <h3 style="font-size: 16px; font-weight: bold; margin: 0; color: var(--color-primary);">${r.title}</h3>
            <span class="badge ${r.status === 'Completed' ? 'badge-approved' : 'badge-pending'}">${r.status}</span>
            <span class="badge" style="background: #F3F4F6; color: #4B5563; font-size: 11px;">${r.priority} Priority</span>
          </div>
          <p style="font-size: 12px; color: #6B7280; margin: 0 0 8px 0;">Property: <strong>${r.property}</strong> &bull; Logged: ${r.date}</p>
          <p style="font-size: 13px; color: #374151; margin: 0;">${r.description}</p>
        </div>
      </div>
    `).join('');

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 18px; font-weight: bold; color: var(--color-primary); margin: 0;">Maintenance & Repair Tickets</h2>
          <button class="btn btn-primary btn-sm" id="btn-open-maint-modal">+ New Maintenance Request</button>
        </div>
        ${rows}
      </div>
    `;
  },

  renderDisputesTab(disputes) {
    const rows = disputes.map(d => `
      <div class="card" style="padding: 20px; margin-bottom: 16px; border-left: 4px solid var(--color-warning);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <h3 style="font-size: 16px; font-weight: bold; margin: 0; color: var(--color-primary);">${d.title}</h3>
            <p style="font-size: 12px; color: #6B7280; margin: 4px 0 0 0;">Property: <strong>${d.property}</strong> &bull; Landlord: <strong>${d.landlord}</strong></p>
          </div>
          <span class="badge badge-pending">${d.status}</span>
        </div>
        <div style="background: #FAF9F6; padding: 12px; border-radius: 8px; border: 1px solid #E5E7EB; margin-top: 12px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Escrow Amount in Hold:</span> <strong>₦ ${d.amount.toLocaleString()}</strong>
          </div>
          <p style="color: #4B5563; margin: 4px 0 0 0;">${d.description}</p>
        </div>
      </div>
    `).join('');

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 18px; font-weight: bold; color: var(--color-primary); margin: 0;">Escrow & Tenancy Dispute Claims</h2>
        </div>
        ${rows}
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // Tab toggle
    document.getElementById('tab-support-maintenance')?.addEventListener('click', () => {
      updateState({ activeSupportTab: 'maintenance' });
      navigateTo('support-disputes');
    });
    document.getElementById('tab-support-disputes')?.addEventListener('click', () => {
      updateState({ activeSupportTab: 'disputes' });
      navigateTo('support-disputes');
    });

    // Modal triggers
    const modal = document.getElementById('maintenance-modal');
    document.getElementById('btn-open-maint-modal')?.addEventListener('click', () => {
      if (modal) modal.style.display = 'flex';
    });
    document.getElementById('close-maint-modal')?.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });

    // Form submit
    document.getElementById('maintenance-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('maint-title').value.trim();
      const priority = document.getElementById('maint-priority').value;
      const desc = document.getElementById('maint-desc').value.trim();

      const newTicket = {
        id: Date.now(),
        title,
        property: 'Cozy 1 Bedroom Studio Loft',
        date: new Date().toISOString().split('T')[0],
        priority,
        status: 'Submitted',
        description: desc
      };

      const existing = state.maintenanceRequests || [
        { id: 1, title: 'Bathroom Plumbing Leak', property: 'Cozy 1 Bedroom Studio Loft', date: '2026-07-10', priority: 'High', status: 'In Progress', description: 'Water pipe leaking under master bathroom sink.' },
        { id: 2, title: 'AC Servicing & Filter Cleaning', property: 'Cozy 1 Bedroom Studio Loft', date: '2026-06-28', priority: 'Medium', status: 'Completed', description: 'Routine servicing for living room split AC unit.' }
      ];

      updateState({ maintenanceRequests: [newTicket, ...existing] });
      if (modal) modal.style.display = 'none';
      alert('Maintenance request submitted successfully!');
      navigateTo('support-disputes');
    });
  }
};

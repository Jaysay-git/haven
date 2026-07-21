// Landlord & Agent Portal Screen Component
export const LandlordPortal = {
  render(state) {
    // Safety check & initialization of landlord state if not present
    this.initializeState(state);

    const activeTab = state.activeLandlordTab || 'overview';
    const pendingApprovalsCount = state.pipelineApplications.filter(a => a.status === 'Pending Approval').length;
    const userRole = state.user ? state.user.role : 'Landlord';
    const userName = state.landlordProfile?.fullName || (state.user ? state.user.username : 'Chief Alabi');
    const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'CA';

    // Map tab names for Breadcrumbs
    const tabLabels = {
      overview: 'Overview & Analytics',
      properties: 'Property Portfolio',
      approvals: 'AI Tenant Approvals',
      escrow: 'Escrow & Readiness Desk',
      renewals: 'Renewals Desk',
      leasing: 'Digital Lease Studio',
      occupancy: 'Occupancy & Tenants',
      profile: 'Landlord Profile',
      kyc: 'Identity Verification (KYC)',
      kyb: 'Business Verification (KYB)',
      settings: 'Settings & Logs'
    };
    const breadcrumbLabel = tabLabels[activeTab] || 'Overview';

    // Sidebar items
    const menuItems = [
      { id: 'overview', label: 'Overview & Analytics', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>` },
      { id: 'properties', label: 'Property Portfolio', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
      { id: 'approvals', label: 'AI Tenant Approvals', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`, badge: pendingApprovalsCount },
      { id: 'escrow', label: 'Escrow & Readiness', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>` },
      { id: 'renewals', label: 'Renewals Desk', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>` },
      { id: 'leasing', label: 'Digital Lease Studio', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><rect x="8" y="17" width="8" height="2"/></svg>` },
      { id: 'occupancy', label: 'Occupancy & Tenants', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
      { id: 'profile', label: 'My Profile', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
      { id: 'kyc', label: 'KYC Verification', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
      { id: 'kyb', label: 'Business Verification', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 22V12h6v10"/></svg>` },
      { id: 'settings', label: 'Settings & Logs', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>` }
    ];

    const sidebarMenuHTML = menuItems.map(item => `
      <li class="ll-sidebar-item">
        <a class="ll-sidebar-link ${activeTab === item.id ? 'active' : ''}" data-tab="${item.id}" id="nav-tab-${item.id}">
          ${item.icon}
          <span style="flex:1;">${item.label}</span>
          ${item.badge && item.badge > 0 ? `<span style="background-color: var(--color-error); color: white; padding: 2px 6px; border-radius: var(--radius-full); font-size: 10px; font-weight: bold;">${item.badge}</span>` : ''}
        </a>
      </li>
    `).join('');

    return `
      <div class="ll-dashboard-layout">
        <!-- Sidebar Navigation -->
        <aside class="ll-sidebar" id="ll-sidebar-panel">
          <div class="ll-sidebar-header">
            <div class="ll-sidebar-brand" style="display:flex; align-items:center; gap:8px;">
              <img src="/assets/logo.png" alt="Haven Logo" style="height:28px; width:auto; display:block; filter:brightness(0) invert(1);">
            </div>
          </div>
          
          <ul class="ll-sidebar-menu">
            ${sidebarMenuHTML}
          </ul>

          <div class="ll-sidebar-footer">
            <div class="ll-avatar">${userInitials}</div>
            <div style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size: 12px;">
              <div style="font-weight:var(--weight-bold);">${userName}</div>
              <div style="color:rgba(255,255,255,0.6); font-size:10px;">${userRole}</div>
            </div>
          </div>
        </aside>

        <!-- Main Panel Content -->
        <div class="ll-main-panel">
          <!-- Header -->
          <header class="ll-header">
            <div style="display:flex; align-items:center; gap:12px;">
              <button class="mobile-sidebar-toggle" id="btn-sidebar-toggle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <div class="ll-breadcrumbs">
                <span class="ll-breadcrumb-item">Workspace</span>
                <span class="ll-breadcrumb-item active">${breadcrumbLabel}</span>
              </div>
            </div>

            <div class="ll-header-actions">
              <!-- Notifications Bell -->
              <button class="ll-bell-trigger" id="ll-bell-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span class="ll-bell-badge">3</span>
              </button>

              <!-- Notifications Dropdown -->
              <div class="nav-notification-dropdown" id="ll-notification-dropdown" style="display: none; top: 60px; right: 80px;">
                <div class="notification-dropdown-header">
                  <span>Notifications</span>
                  <a href="#" id="ll-clear-notifications" style="font-size: 11px; color: var(--color-secondary); text-decoration: none; font-weight: bold;">Mark all read</a>
                </div>
                <div class="notification-dropdown-list">
                  ${state.notifications.map(n => `
                    <div class="notification-dropdown-item ${!n.read ? 'unread' : ''}" data-id="${n.id}" style="text-align: left;">
                      <div class="notification-dot"></div>
                      <div style="flex:1;">
                        <p class="notification-text" style="font-size:12px; color:var(--color-primary); line-height:1.4; margin:0;">${n.text}</p>
                        <span class="notification-time" style="font-size:10px; color:#9CA3AF;">${n.time}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- User Menu Dropdown -->
              <div class="ll-user-menu">
                <button class="ll-user-trigger" id="ll-user-btn">
                  <div class="ll-avatar">${userInitials}</div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 2px;"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="ll-dropdown" id="ll-user-dropdown">
                  <div class="ll-dropdown-header">
                    <div class="ll-dropdown-name">${userName}</div>
                    <div class="ll-dropdown-role">${userRole}</div>
                  </div>
                  <a class="ll-dropdown-item" id="ll-drop-settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                    Settings & Profile
                  </a>
                  <a class="ll-dropdown-item" id="ll-drop-logout" style="border-top: 1px solid rgba(13, 27, 75, 0.05); color: var(--color-error);">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </header>

          <!-- Content Body -->
          <div class="landlord-wrapper" style="max-width: 100%; margin: 0; padding: 32px 32px 40px 32px; box-sizing: border-box; width: 100%;">
            <!-- Render Skeleton Cards only on Overview/Dashboard panel for Milestone 2 -->
            ${activeTab === 'overview' ? `
              <!-- Empty Skeleton Cards -->
              <div class="ll-skeleton-grid">
                <div class="ll-skeleton-card">
                  <div class="ll-skeleton-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div style="font-weight:bold; font-size:13px; color:#4B5563;">System Status</div>
                  <div style="font-size:11px; margin-top:4px;">All APIs running normally</div>
                </div>
                <div class="ll-skeleton-card">
                  <div class="ll-skeleton-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div style="font-weight:bold; font-size:13px; color:#4B5563;">Audit Verification</div>
                  <div style="font-size:11px; margin-top:4px;">CBN Trust Pool Sync: OK</div>
                </div>
                <div class="ll-skeleton-card">
                  <div class="ll-skeleton-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div style="font-weight:bold; font-size:13px; color:#4B5563;">Compliance Safeguard</div>
                  <div style="font-size:11px; margin-top:4px;">NDPR Privacy Standard</div>
                </div>
                <div class="ll-skeleton-card">
                  <div class="ll-skeleton-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                  </div>
                  <div style="font-weight:bold; font-size:13px; color:#4B5563;">Tenant Support</div>
                  <div style="font-size:11px; margin-top:4px;">Average Response: 14m</div>
                </div>
              </div>
            ` : ''}

            <!-- Tab Panel Content -->
            <div class="tab-panel">
              ${this.renderTabContent(state, activeTab)}
            </div>
          </div>
        </div>
      </div>

      <!-- Add Listing Modal (Hidden by default) -->
      <div class="landlord-modal" id="add-property-modal" style="display: none;">
        <div class="modal-content-panel" style="max-width: 720px; width: 95%;">
          <div class="modal-header-panel" style="border-bottom: none; padding-bottom: 12px;">
            <h3 class="card-title" id="modal-title-text" style="color: var(--color-primary); margin: 0;">Create Property Listing</h3>
            <button class="modal-close-icon-btn" id="modal-close-btn">&times;</button>
          </div>

          <!-- Tabs for Listing Builder -->
          <div style="display: flex; border-bottom: 1px solid rgba(13, 27, 75, 0.08); background: #FAF9F6; margin-bottom: 20px;">
            <button type="button" class="prop-modal-tab-btn active" data-target="prop-section-basic" style="flex: 1; padding: 12px 8px; border: none; border-bottom: 2px solid var(--color-secondary); background: transparent; font-size: 12px; font-weight: bold; color: var(--color-secondary); cursor: pointer; transition: all 0.2s;">1. Basic Info</button>
            <button type="button" class="prop-modal-tab-btn" data-target="prop-section-media" style="flex: 1; padding: 12px 8px; border: none; border-bottom: 2px solid transparent; background: transparent; font-size: 12px; font-weight: bold; color: #4B5563; cursor: pointer; transition: all 0.2s;">2. Media Gallery</button>
            <button type="button" class="prop-modal-tab-btn" data-target="prop-section-docs" style="flex: 1; padding: 12px 8px; border: none; border-bottom: 2px solid transparent; background: transparent; font-size: 12px; font-weight: bold; color: #4B5563; cursor: pointer; transition: all 0.2s;">3. Legal Docs</button>
          </div>

          <form id="add-property-form">
            <input type="hidden" id="prop-id" value="">
            <input type="hidden" id="prop-action" value="create">
            
            <div class="modal-body-panel" style="max-height: 55vh; overflow-y: auto; padding-top: 4px;">
              
              <!-- Tab 1: Basic Info -->
              <div id="prop-section-basic" class="prop-modal-section">
                <div class="form-group-landlord">
                  <label for="prop-title">Property Title</label>
                  <input type="text" id="prop-title" class="form-control-landlord" placeholder="e.g. Executive 2 Bed Serviced Flat" required>
                </div>
                <div class="form-group-landlord">
                  <label for="prop-street">Street Address</label>
                  <input type="text" id="prop-street" class="form-control-landlord" placeholder="e.g. 12b Admiralty Way" required>
                </div>
                <div class="form-grid-2">
                  <div class="form-group-landlord">
                    <label for="prop-location">Neighborhood / Area</label>
                    <input type="text" id="prop-location" class="form-control-landlord" placeholder="e.g. Lekki Phase 1" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="prop-city">City</label>
                    <input type="text" id="prop-city" class="form-control-landlord" value="Lagos" required>
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px;">
                  <div class="form-group-landlord">
                    <label for="prop-rent">Annual Rent (₦)</label>
                    <input type="number" id="prop-rent" class="form-control-landlord" placeholder="e.g. 3500000" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="prop-caution">Caution Deposit (₦)</label>
                    <input type="number" id="prop-caution" class="form-control-landlord" placeholder="e.g. 300000" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="prop-service-charge">Service Charge (₦)</label>
                    <input type="number" id="prop-service-charge" class="form-control-landlord" placeholder="e.g. 150000">
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px;">
                  <div class="form-group-landlord">
                    <label for="prop-bedrooms">Bedrooms</label>
                    <input type="number" id="prop-bedrooms" class="form-control-landlord" value="2" min="1" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="prop-bathrooms">Bathrooms</label>
                    <input type="number" id="prop-bathrooms" class="form-control-landlord" value="2" min="1" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="prop-max-occupancy">Max Occupancy</label>
                    <input type="number" id="prop-max-occupancy" class="form-control-landlord" value="4" min="1">
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 12px;">
                  <div class="form-group-landlord">
                    <label for="prop-lease-duration">Lease Duration</label>
                    <select id="prop-lease-duration" class="form-control-landlord" style="background:white; padding:10px;">
                      <option value="12 months">12 Months (Standard)</option>
                      <option value="6 months">6 months</option>
                      <option value="24 months">24 months</option>
                    </select>
                  </div>
                  <div class="form-group-landlord">
                    <label for="prop-cancellation-policy">Cancellation Policy</label>
                    <select id="prop-cancellation-policy" class="form-control-landlord" style="background:white; padding:10px;">
                      <option value="Flexible">Flexible (Refundable)</option>
                      <option value="Moderate">Moderate (50% Refund)</option>
                      <option value="Strict">Strict (Non-refundable)</option>
                    </select>
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 12px;">
                  <div class="form-group-landlord">
                    <label for="prop-pet-policy">Pet Policy</label>
                    <select id="prop-pet-policy" class="form-control-landlord" style="background:white; padding:10px;">
                      <option value="Allowed">Allowed</option>
                      <option value="Not Allowed">Strictly No Pets</option>
                      <option value="Cats Only">Cats Only</option>
                    </select>
                  </div>
                  <div class="form-group-landlord">
                    <label for="prop-smoking-policy">Smoking Policy</label>
                    <select id="prop-smoking-policy" class="form-control-landlord" style="background:white; padding:10px;">
                      <option value="Not Allowed">No Smoking</option>
                      <option value="Outdoors Only">Outdoors Only</option>
                      <option value="Allowed">Allowed</option>
                    </select>
                  </div>
                </div>

                <div class="form-group-landlord">
                  <label for="prop-desc">Property Description</label>
                  <textarea id="prop-desc" class="form-control-landlord" rows="3" placeholder="Describe the interior, neighborhood, and general environment of this unit..." required></textarea>
                </div>
                <div class="form-group-landlord">
                  <label>Amenities</label>
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 8px;">
                    <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                      <input type="checkbox" name="amenity" value="Power Backup" checked> Power Backup
                    </label>
                    <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                      <input type="checkbox" name="amenity" value="Security" checked> Security
                    </label>
                    <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                      <input type="checkbox" name="amenity" value="Water Treatment" checked> Water Treatment
                    </label>
                    <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                      <input type="checkbox" name="amenity" value="Gym"> Gym
                    </label>
                    <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                      <input type="checkbox" name="amenity" value="Pool"> Pool
                    </label>
                    <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                      <input type="checkbox" name="amenity" value="Parking" checked> Parking
                    </label>
                  </div>
                </div>
                <div class="form-group-landlord">
                  <label for="prop-rules">House Rules Summary</label>
                  <textarea id="prop-rules" class="form-control-landlord" rows="2" placeholder="e.g. Quiet hours after 10 PM. Corporate tenancies preferred."></textarea>
                </div>
              </div>

              <!-- Tab 2: Media Gallery -->
              <div id="prop-section-media" class="prop-modal-section" style="display: none;">
                <div id="prop-media-dropzone" style="border: 2px dashed #D1CDCA; border-radius: var(--radius-md); padding: 28px; text-align: center; cursor: pointer; background: var(--color-background); transition: all 0.2s; margin-bottom: 20px;">
                  <input type="file" id="prop-media-input" accept="image/*,video/*" multiple style="display: none;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" style="display:inline; margin-bottom:8px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <div style="font-size:13px; font-weight:bold; color:var(--color-primary);">Upload Images & Videos</div>
                  <p style="font-size:11px; color:#9CA3AF; margin-top:4px;">Drag & drop files or click to browse. Max size 10MB per file.</p>
                  <div id="prop-media-compress-loader" style="display: none; font-size: 11px; color: var(--color-success); font-weight: bold; margin-top: 8px;">
                    ⚡ Compressing file... Done! (Saved 58% storage)
                  </div>
                </div>
                
                <h4 style="font-size:12px; color:var(--color-primary); font-weight:bold; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.5px;">Listing Media Gallery</h4>
                <div id="prop-media-gallery" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                  <!-- Dynamic thumbnails inserted here -->
                </div>
              </div>

              <!-- Tab 3: Legal Documents -->
              <div id="prop-section-docs" class="prop-modal-section" style="display: none;">
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  
                  <!-- Document 1: Ownership -->
                  <div style="border: 1px solid rgba(13,27,75,0.06); padding: 14px; border-radius: var(--radius-md); background: var(--color-background); display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                      <div style="font-weight: bold; font-size: 13px; color: var(--color-primary);">Certificate of Occupancy / Deed of Assignment</div>
                      <span id="label-doc-ownership-status" class="badge badge-warning" style="font-size: 9px; margin-top: 4px; display: inline-block;">Missing</span>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <button type="button" class="btn btn-outline btn-xs btn-view-doc" data-doc="ownership" style="padding: 4px 8px; font-size: 11px; display: none;">View File</button>
                      <button type="button" class="btn btn-primary btn-xs" id="btn-upload-doc-ownership" style="padding: 4px 10px; font-size: 11px;">Upload</button>
                      <input type="file" id="prop-doc-ownership" accept="image/*,application/pdf" style="display: none;">
                    </div>
                  </div>

                  <!-- Document 2: Survey -->
                  <div style="border: 1px solid rgba(13,27,75,0.06); padding: 14px; border-radius: var(--radius-md); background: var(--color-background); display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                      <div style="font-weight: bold; font-size: 13px; color: var(--color-primary);">Approved Land Survey Plan</div>
                      <span id="label-doc-survey-status" class="badge badge-warning" style="font-size: 9px; margin-top: 4px; display: inline-block;">Missing</span>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <button type="button" class="btn btn-outline btn-xs btn-view-doc" data-doc="survey" style="padding: 4px 8px; font-size: 11px; display: none;">View File</button>
                      <button type="button" class="btn btn-primary btn-xs" id="btn-upload-doc-survey" style="padding: 4px 10px; font-size: 11px;">Upload</button>
                      <input type="file" id="prop-doc-survey" accept="image/*,application/pdf" style="display: none;">
                    </div>
                  </div>

                  <!-- Document 3: Building Plan -->
                  <div style="border: 1px solid rgba(13,27,75,0.06); padding: 14px; border-radius: var(--radius-md); background: var(--color-background); display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                      <div style="font-weight: bold; font-size: 13px; color: var(--color-primary);">Building Approval / Development Certificate</div>
                      <span id="label-doc-cert-status" class="badge badge-warning" style="font-size: 9px; margin-top: 4px; display: inline-block;">Missing</span>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <button type="button" class="btn btn-outline btn-xs btn-view-doc" data-doc="cert" style="padding: 4px 8px; font-size: 11px; display: none;">View File</button>
                      <button type="button" class="btn btn-primary btn-xs" id="btn-upload-doc-cert" style="padding: 4px 10px; font-size: 11px;">Upload</button>
                      <input type="file" id="prop-doc-cert" accept="image/*,application/pdf" style="display: none;">
                    </div>
                  </div>

                  <!-- Document 4: Utility -->
                  <div style="border: 1px solid rgba(13,27,75,0.06); padding: 14px; border-radius: var(--radius-md); background: var(--color-background); display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                      <div style="font-weight: bold; font-size: 13px; color: var(--color-primary);">Utility Cleared Bills / Tenancy History Logs</div>
                      <span id="label-doc-utility-status" class="badge badge-warning" style="font-size: 9px; margin-top: 4px; display: inline-block;">Missing</span>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <button type="button" class="btn btn-outline btn-xs btn-view-doc" data-doc="utility" style="padding: 4px 8px; font-size: 11px; display: none;">View File</button>
                      <button type="button" class="btn btn-primary btn-xs" id="btn-upload-doc-utility" style="padding: 4px 10px; font-size: 11px;">Upload</button>
                      <input type="file" id="prop-doc-utility" accept="image/*,application/pdf" style="display: none;">
                    </div>
                  </div>

                  <!-- Audit Verification Simulator -->
                  <div style="border-top: 2px dashed #E5E7EB; padding-top: 16px; margin-top: 10px;">
                    <h5 style="font-size: 11px; color: var(--color-primary); font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">Legal Audit simulator</h5>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <label style="font-size: 12px; font-weight: bold; color: #4B5563;">Set Documents status Check:</label>
                      <select id="sim-doc-audit-status" style="border: 1px solid #D1CDCA; border-radius: 4px; padding: 4px 8px; background: white; font-size: 12px;">
                        <option value="Under Review">Under Review</option>
                        <option value="Verified">Verified Approved</option>
                        <option value="Unverified">Rejected / Mismatch</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

            </div>
            
            <div class="modal-footer-panel" style="display: flex; gap: 8px; justify-content: flex-end; border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 16px; margin-top: 16px;">
              <button type="button" class="btn btn-outline btn-sm" id="btn-cancel-modal">Cancel</button>
              <button type="button" class="btn btn-outline btn-sm" id="btn-save-draft" style="border-color: var(--color-secondary); color: var(--color-secondary);">Save as Draft</button>
              <button type="submit" class="btn btn-primary btn-sm" id="btn-submit-publish">Publish Listing</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div class="landlord-modal" id="property-lightbox-modal" style="display: none; z-index: 1100; background: rgba(0,0,0,0.85); align-items: center; justify-content: center;">
        <div style="position: relative; max-width: 90%; max-height: 90%; display: flex; flex-direction: column; align-items: center;">
          <button id="lightbox-close-btn" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 32px; cursor: pointer;">&times;</button>
          <img id="lightbox-img" src="" style="max-width: 100%; max-height: 75vh; border-radius: var(--radius-md); box-shadow: 0 4px 20px rgba(0,0,0,0.6); object-fit: contain; display: none;">
          <video id="lightbox-video" src="" controls style="max-width: 100%; max-height: 75vh; border-radius: var(--radius-md); box-shadow: 0 4px 20px rgba(0,0,0,0.6); display: none;"></video>
          <div id="lightbox-title" style="color: white; font-size: 13px; text-align: center; margin-top: 12px; font-weight: bold; background: rgba(0,0,0,0.6); padding: 4px 12px; border-radius: var(--radius-sm);">Document Preview</div>
        </div>
      </div>

      <!-- Manage Units Modal (Hidden by default) -->
      <div class="landlord-modal" id="manage-units-modal" style="display: none; z-index: 1050;">
        <div class="modal-content-panel" style="max-width: 680px; width: 90%;">
          <div class="modal-header-panel" style="padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.06);">
            <h3 class="card-title" id="manage-units-modal-title" style="color: var(--color-primary); margin:0;">Unit Management</h3>
            <button class="modal-close-icon-btn" id="manage-units-close-btn">&times;</button>
          </div>
          <div class="modal-body-panel" style="max-height: 60vh; overflow-y: auto; padding-top: 12px;">
            <input type="hidden" id="unit-prop-id" value="">
            
            <!-- Unit Creation/Edition Mini-Form -->
            <div id="unit-form-section" style="background: #FAF9F6; border: 1px solid rgba(13,27,75,0.06); padding: 16px; border-radius: var(--radius-md); margin-bottom: 24px; display: none;">
              <h4 id="unit-form-title" style="font-size: 11px; color: var(--color-primary); font-weight: bold; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Add Property Unit</h4>
              <input type="hidden" id="unit-id" value="">
              <input type="hidden" id="unit-action" value="create">
              
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 10px;">
                <div class="form-group-landlord">
                  <label for="unit-number" style="font-size: 11px; font-weight: bold; color: var(--color-primary);">Unit Number/Name</label>
                  <input type="text" id="unit-number" class="form-control-landlord" placeholder="e.g. Unit 3A" style="padding: 8px; font-size: 13px;">
                </div>
                <div class="form-group-landlord">
                  <label for="unit-rent" style="font-size: 11px; font-weight: bold; color: var(--color-primary);">Rent Amount (₦/yr)</label>
                  <input type="number" id="unit-rent" class="form-control-landlord" placeholder="e.g. 3000000" style="padding: 8px; font-size: 13px;">
                </div>
              </div>
              
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px;">
                <div class="form-group-landlord">
                  <label for="unit-bedrooms" style="font-size: 11px; font-weight: bold; color: var(--color-primary);">Bedrooms</label>
                  <input type="number" id="unit-bedrooms" class="form-control-landlord" value="2" min="0" style="padding: 8px; font-size: 13px;">
                </div>
                <div class="form-group-landlord">
                  <label for="unit-bathrooms" style="font-size: 11px; font-weight: bold; color: var(--color-primary);">Bathrooms</label>
                  <input type="number" id="unit-bathrooms" class="form-control-landlord" value="2" min="0" style="padding: 8px; font-size: 13px;">
                </div>
                <div class="form-group-landlord">
                  <label for="unit-sqft" style="font-size: 11px; font-weight: bold; color: var(--color-primary);">Square Footage (sqft)</label>
                  <input type="number" id="unit-sqft" class="form-control-landlord" placeholder="e.g. 1100" style="padding: 8px; font-size: 13px;">
                </div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 10px;">
                <div class="form-group-landlord">
                  <label for="unit-furnishing" style="font-size: 11px; font-weight: bold; color: var(--color-primary);">Furnishing</label>
                  <select id="unit-furnishing" class="form-control-landlord" style="background:white; padding:8px; font-size: 13px;">
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                  </select>
                </div>
                <div class="form-group-landlord">
                  <label for="unit-availability" style="font-size: 11px; font-weight: bold; color: var(--color-primary);">Availability Status</label>
                  <select id="unit-availability" class="form-control-landlord" style="background:white; padding:8px; font-size: 13px;">
                    <option value="Vacant">Vacant (Available)</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <!-- Unit Image Upload -->
              <div class="form-group-landlord" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 6px; font-size: 11px; font-weight: bold; color: var(--color-primary);">Unit Photo Preview</label>
                <div style="display: flex; gap: 12px; align-items: center;">
                  <div id="unit-image-preview-box" style="width: 50px; height: 50px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1); background: #E5E7EB; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 9px; color: #9CA3AF;">No Image</span>
                  </div>
                  <button type="button" class="btn btn-outline btn-xs" id="btn-upload-unit-image">Choose Image</button>
                  <input type="file" id="unit-image-file" accept="image/*" style="display: none;">
                </div>
              </div>

              <div style="display: flex; gap: 8px; justify-content: flex-end; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 10px;">
                <button type="button" class="btn btn-outline btn-xs" id="btn-cancel-unit-form">Cancel</button>
                <button type="button" class="btn btn-primary btn-xs" id="btn-save-unit" style="padding-left:14px; padding-right:14px;">Save Unit</button>
              </div>
            </div>

            <!-- List of Units Table -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="font-size: 12px; color: var(--color-primary); font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">Sub-Units List</h4>
              <button type="button" class="btn btn-primary btn-xs" id="btn-show-add-unit">+ Add Unit</button>
            </div>
            <div id="units-list-container" style="display: flex; flex-direction: column; gap: 8px;">
              <!-- Dynamically populated unit list items -->
            </div>

          </div>
        </div>
      </div>

      <!-- Listing Preview Modal (Hidden by default) -->
      <div class="landlord-modal" id="listing-preview-modal" style="display: none; z-index: 1060;">
        <div class="modal-content-panel" style="max-width: 800px; width: 95%;">
          <div class="modal-header-panel" style="padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.06);">
            <h3 class="card-title" style="color: var(--color-primary); margin: 0;">Property Listing Public Preview</h3>
            <button class="modal-close-icon-btn" id="preview-close-btn">&times;</button>
          </div>
          <div class="modal-body-panel" style="max-height: 65vh; overflow-y: auto; padding-top: 16px;">
            <input type="hidden" id="preview-prop-id" value="">
            
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
              
              <!-- Left: High-fidelity Listing presentation -->
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div id="preview-cover-photo" style="width: 100%; aspect-ratio: 2.2; border-radius: var(--radius-md); background-size: cover; background-position: center; position: relative;">
                  <span id="preview-status-badge" class="badge badge-success" style="position: absolute; top: 12px; left: 12px; font-size: 10px;">Published</span>
                </div>
                
                <div>
                  <h3 id="preview-title" style="font-size: 18px; color: var(--color-primary); font-weight: bold; margin-top: 0; margin-bottom: 4px;">Luxury Penthouse</h3>
                  <div id="preview-location-text" style="font-size: 13px; color: #4B5563; margin-bottom: 12px;">📍 12b Admiralty Way, Lekki Phase 1, Lagos</div>
                  <p id="preview-description" style="font-size: 13px; color: #4B5563; line-height: 1.5; margin-bottom: 16px;">Beautiful flat with gorgeous details.</p>
                </div>

                <!-- Specs -->
                <div style="display: flex; gap: 16px; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); padding: 12px 0;">
                  <div style="text-align: center; flex: 1;">
                    <div style="font-size: 11px; color: #9CA3AF;">Bedrooms</div>
                    <strong id="preview-bedrooms" style="font-size: 14px; color: var(--color-primary);">2 Beds</strong>
                  </div>
                  <div style="text-align: center; flex: 1; border-left: 1px solid rgba(0,0,0,0.06); border-right: 1px solid rgba(0,0,0,0.06);">
                    <div style="font-size: 11px; color: #9CA3AF;">Bathrooms</div>
                    <strong id="preview-bathrooms" style="font-size: 14px; color: var(--color-primary);">2 Baths</strong>
                  </div>
                  <div style="text-align: center; flex: 1;">
                    <div style="font-size: 11px; color: #9CA3AF;">Max Occupants</div>
                    <strong id="preview-occupants" style="font-size: 14px; color: var(--color-primary);">4 Max</strong>
                  </div>
                </div>

                <!-- Pricing & Policies Details -->
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; background: #FAF9F6; padding: 14px; border-radius: var(--radius-sm); border: 1px solid rgba(13,27,75,0.04);">
                  <div style="font-size: 12px;"><span style="color: #6B7280;">Base Rent:</span> <strong id="preview-rent-val" style="color: var(--color-primary);">₦3,500,000/yr</strong></div>
                  <div style="font-size: 12px;"><span style="color: #6B7280;">Caution Deposit:</span> <strong id="preview-caution-val" style="color: var(--color-primary);">₦300,000</strong></div>
                  <div style="font-size: 12px;"><span style="color: #6B7280;">Service Charge:</span> <strong id="preview-service-val" style="color: var(--color-primary);">₦150,000</strong></div>
                  <div style="font-size: 12px;"><span style="color: #6B7280;">Lease Term:</span> <strong id="preview-lease-val" style="color: var(--color-primary);">12 Months</strong></div>
                  <div style="font-size: 12px;"><span style="color: #6B7280;">Pet Policy:</span> <strong id="preview-pet-val" style="color: var(--color-primary);">Allowed</strong></div>
                  <div style="font-size: 12px;"><span style="color: #6B7280;">Smoking Policy:</span> <strong id="preview-smoking-val" style="color: var(--color-primary);">No Smoking</strong></div>
                </div>

                <div>
                  <h4 style="font-size: 11px; color: var(--color-primary); font-weight: bold; margin-top: 0; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Amenities Tags</h4>
                  <div id="preview-amenities-tags" style="display: flex; flex-wrap: wrap; gap: 6px;"></div>
                </div>
              </div>
              
              <!-- Right: AI checklist & Listing Controls -->
              <div style="display: flex; flex-direction: column; gap: 16px; border-left: 1px solid rgba(0,0,0,0.06); padding-left: 20px;">
                
                <!-- Listing Status Control -->
                <div style="background: #FAF9F6; padding: 14px; border-radius: var(--radius-md); border: 1px solid rgba(0,0,0,0.05);">
                  <h4 style="font-size: 11px; color: var(--color-primary); font-weight: bold; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Listing Actions</h4>
                  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                    <button type="button" class="btn btn-primary btn-xs" id="btn-preview-publish" style="width: 100%;">Publish Listing</button>
                    <button type="button" class="btn btn-outline btn-xs" id="btn-preview-pause" style="width: 100%; color: var(--color-warning); border-color: var(--color-warning);">Pause Listing</button>
                    <button type="button" class="btn btn-outline btn-xs" id="btn-preview-archive" style="width: 100%; color: var(--color-error); border-color: var(--color-error);">Archive Listing</button>
                  </div>
                </div>

                <!-- AI Quality Checklist & Score -->
                <div style="border: 1px solid rgba(13,27,75,0.08); border-radius: var(--radius-md); padding: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <h4 style="font-size: 11px; color: var(--color-primary); font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">AI Quality Score</h4>
                    <span id="preview-ai-score" style="font-size: 14px; font-weight: bold; color: var(--color-success);">85%</span>
                  </div>
                  
                  <!-- Quality Progress bar -->
                  <div style="width: 100%; height: 6px; background: #E5E7EB; border-radius: 3px; overflow: hidden; margin-bottom: 16px;">
                    <div id="preview-ai-progress" style="width: 85%; height: 100%; background: var(--color-success); transition: width 0.3s;"></div>
                  </div>

                  <!-- Checklist -->
                  <h5 style="font-size: 10px; color: #4B5563; font-weight: bold; margin-top: 0; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Completeness Audit</h5>
                  <div id="preview-checklist-items" style="display: flex; flex-direction: column; gap: 6px; font-size: 11px; color: #4B5563;">
                    <!-- Checklist items populated dynamically -->
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      <!-- Bulk Upload Modal (Hidden by default) -->
      <div class="landlord-modal" id="bulk-upload-modal" style="display: none;">
        <div class="modal-content-panel">
          <div class="modal-header-panel">
            <h3 class="card-title" style="color: var(--color-primary);">Bulk Units Upload</h3>
            <button class="modal-close-icon-btn" id="bulk-close-btn">&times;</button>
          </div>
          <div class="modal-body-panel">
            <p class="text-sm text-muted" style="margin-bottom: 16px;">Paste your CSV format data below. Format: <code>UnitNumber,BaseRent,Status</code>. Or use the mock generator.</p>
            <div class="form-group-landlord">
              <label for="bulk-property-select">Target Property</label>
              <select id="bulk-property-select" class="form-control-landlord">
                ${state.landlordProperties.map(p => `<option value="${p.id}">${p.title}</option>`).join('')}
              </select>
            </div>
            <div class="form-group-landlord">
              <label for="bulk-csv-data">CSV Data</label>
              <textarea id="bulk-csv-data" class="form-control-landlord" rows="6" style="font-family: monospace; font-size: 13px;" placeholder="Unit 104,2400000,Vacant&#10;Unit 105,2600000,Vacant&#10;Unit 106,2900000,Occupied"></textarea>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" id="btn-generate-mock-csv" style="flex: 1;">Generate Sample Data</button>
            </div>
          </div>
          <div class="modal-footer-panel">
            <button type="button" class="btn btn-outline btn-sm" id="btn-cancel-bulk">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" id="btn-import-csv">Bulk Import</button>
          </div>
        </div>
      </div>
    `;
  },

  renderTabContent(state, tab) {
    switch (tab) {
      case 'overview':
        return this.renderOverviewTab(state);
      case 'properties':
        return this.renderPropertiesTab(state);
      case 'approvals':
        return this.renderApprovalsTab(state);
      case 'escrow':
        return this.renderEscrowTab(state);
      case 'renewals':
        return this.renderRenewalsTab(state);
      case 'leasing':
        return this.renderLeasingTab(state);
      case 'occupancy':
        return this.renderOccupancyTab(state);
      case 'profile':
        return this.renderProfileTab(state);
      case 'kyc':
        return this.renderKycTab(state);
      case 'kyb':
        return this.renderKybTab(state);
      case 'settings':
        return this.renderSettingsTab(state);
      default:
        return `<div>Tab view not found.</div>`;
    }
  },

  renderOccupancyTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Calculate metrics
    const totalUnits = state.landlordProperties.reduce((acc, p) => acc + (p.units ? p.units.length : 1), 0);
    const occupiedUnits = state.landlordProperties.reduce((acc, p) => acc + (p.units ? p.units.filter(u => u.status === 'Occupied').length : (p.occupied ? 1 : 0)), 0);
    const vacantUnits = totalUnits - occupiedUnits;
    const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

    // Search and filters
    const searchVal = state.landlordOccupancySearch || '';
    const statusFilter = state.landlordOccupancyFilterStatus || 'all';

    const filteredTenants = (state.landlordTenants || []).filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                            t.propertyName.toLowerCase().includes(searchVal.toLowerCase()) || 
                            t.email.toLowerCase().includes(searchVal.toLowerCase());
      const matchesStatus = statusFilter === 'all' || t.rentStatus.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

    return `
      <!-- Occupancy & Tenant Directory Studio -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 16px; margin-bottom: 24px;">
        <div>
          <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin:0;">Occupancy & Tenant Directory</h3>
          <p class="text-sm text-muted" style="margin-top: 4px; margin-bottom:0;">Monitor leased vs vacant portfolio units and verify tenant trust status.</p>
        </div>
      </div>

      <!-- Occupancy Analytics Row -->
      <div class="form-grid-4" style="margin-bottom: 32px;">
        <div class="card" style="padding: 16px; border-left: 4px solid var(--color-secondary);">
          <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">Occupied Units</div>
          <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">${occupiedUnits} <span style="font-size:12px; font-weight:normal; color:#6B7280;">/ ${totalUnits} Units</span></div>
          <div style="font-size: 10px; color: #9CA3AF; margin-top:4px;">Active tenant leases running</div>
        </div>
        <div class="card" style="padding: 16px; border-left: 4px solid var(--color-primary);">
          <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">Vacant Units</div>
          <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">${vacantUnits} <span style="font-size:12px; font-weight:normal; color:#6B7280;">Available</span></div>
          <div style="font-size: 10px; color: var(--color-success); font-weight:bold; margin-top:4px;">✓ Ready to list / lease</div>
        </div>
        <div class="card" style="padding: 16px; border-left: 4px solid var(--color-success);">
          <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">Occupancy Rate</div>
          <div style="font-size: 24px; font-weight: bold; color: var(--color-success);">${occupancyRate}%</div>
          <div style="font-size: 10px; color: #9CA3AF; margin-top:4px;">Average tenancy duration: 1.8 yrs</div>
        </div>
        <div class="card" style="padding: 16px; border-left: 4px solid var(--color-warning);">
          <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">Rent Collection Status</div>
          <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">96.4%</div>
          <div style="font-size: 10px; color: var(--color-error); font-weight:bold; margin-top:4px;">1 Account Overdue</div>
        </div>
      </div>

      <!-- Filters & Directory Search -->
      <div class="card" style="padding: 20px; margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap;">
          <div style="display:flex; gap:12px; align-items:center; flex:1; min-width: 280px;">
            <input type="text" id="tenant-directory-search" class="form-control-landlord" placeholder="Search tenants by name, property, email..." value="${searchVal}" style="padding: 8px 12px; font-size:13px; background:white;">
            <select id="tenant-directory-status-filter" class="form-control-landlord" style="padding: 8px 12px; font-size:13px; width:160px; background:white; height:auto;">
              <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>All Rent Status</option>
              <option value="paid" ${statusFilter === 'paid' ? 'selected' : ''}>Paid</option>
              <option value="overdue" ${statusFilter === 'overdue' ? 'selected' : ''}>Overdue</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tenants Grid -->
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap:20px;">
        ${filteredTenants.map(t => {
          const isPaid = t.rentStatus === 'Paid';
          return `
            <div class="card" style="padding:20px; display:flex; flex-direction:column; justify-content:space-between; border-top: 3px solid ${isPaid ? 'var(--color-success)' : 'var(--color-error)'};">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                  <div>
                    <h4 style="font-size:15px; font-weight:bold; color:var(--color-primary); margin:0;">${t.name}</h4>
                    <span style="font-size:10px; color:#6B7280; display:block; margin-top:2px;">Lease Term: ${t.leaseStart} to ${t.leaseEnd}</span>
                  </div>
                  <span class="badge ${isPaid ? 'badge-success' : 'badge-error'}" style="font-size:10px;">Rent: ${t.rentStatus}</span>
                </div>

                <div style="background:#F9FAFB; padding:10px 12px; border-radius:var(--radius-sm); border:1px solid #F3F4F6; margin-bottom:12px; font-size:12px;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span class="text-muted">Unit:</span>
                    <strong>${t.propertyName} (${t.unitNumber})</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between;">
                    <span class="text-muted">Contact:</span>
                    <span>${t.phone}</span>
                  </div>
                </div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #F3F4F6; padding-top:12px; margin-top:8px;">
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="font-size:11px; font-weight:bold; color:var(--color-secondary);">Haven Trust Score:</span>
                  <span class="badge badge-info" style="font-size:10px; font-weight:bold; padding:2px 6px;">${t.trustGrade} (${t.trustScore}/900)</span>
                </div>
                <button type="button" class="btn btn-outline btn-xs btn-tenant-contact-sim" data-email="${t.email}" style="padding: 4px 8px; font-size:11px;">📧 Email</button>
              </div>
            </div>
          `;
        }).join('')}
        ${filteredTenants.length === 0 ? `
          <div class="card" style="grid-column: 1 / -1; text-align:center; padding:60px 24px; color:#9CA3AF;">
            <p>No active tenants match the current search or filters.</p>
          </div>
        ` : ''}
      </div>
    `;
  },

  renderSettingsTab(state) {
    const s = state.landlordSettings || {};
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 16px; margin-bottom: 24px;">
        <div>
          <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin:0;">Settings & Security Logs</h3>
          <p class="text-sm text-muted" style="margin-top: 4px; margin-bottom:0;">Configure user notifications, change credentials, and audit security events.</p>
        </div>
      </div>

      <div class="form-grid-2" style="align-items: flex-start; gap: 24px; margin-bottom:32px;">
        <!-- Left Side: Preferences -->
        <div class="card" style="padding: 24px;">
          <h4 style="font-size: 14px; font-weight:bold; color: var(--color-primary); margin-top:0; margin-bottom:16px;">System Notification Preferences</h4>
          
          <div style="display:flex; flex-direction:column; gap:12px; margin-bottom: 24px;">
            <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
              <input type="checkbox" id="chk-settings-email" ${s.emailNotifications ? 'checked' : ''}>
              <span>Receive email copy of verified tenant applications</span>
            </label>
            <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
              <input type="checkbox" id="chk-settings-sms" ${s.smsNotifications ? 'checked' : ''}>
              <span>Receive instant SMS alerts for escrow funding holds</span>
            </label>
            <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
              <input type="checkbox" id="chk-settings-push" ${s.pushNotifications ? 'checked' : ''}>
              <span>Enable desktop push notifications for direct chat messages</span>
            </label>
            <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
              <input type="checkbox" id="chk-settings-updates" ${s.appUpdates ? 'checked' : ''}>
              <span>Email updates for Haven platform protocol releases</span>
            </label>
          </div>

          <button type="button" class="btn btn-secondary btn-sm" id="btn-save-settings-pref">Save Preferences</button>
        </div>

        <!-- Right Side: Change Password & Security -->
        <div class="card" style="padding: 24px;">
          <h4 style="font-size: 14px; font-weight:bold; color: var(--color-primary); margin-top:0; margin-bottom:16px;">Two-Factor Authentication (2FA)</h4>
          
          <div style="background:#FAF9F6; padding:12px; border-radius:var(--radius-sm); border:1px solid rgba(0,0,0,0.03); margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:13px; display:block; color:var(--color-primary);">Authenticator App 2FA</strong>
                <span style="font-size:10px; color:#6B7280;">Secure signing logs using mobile token codes.</span>
              </div>
              <label style="position:relative; display:inline-block; width: 44px; height: 24px; cursor:pointer;">
                <input type="checkbox" id="chk-settings-2fa" ${s.twoFactorEnabled ? 'checked' : ''} style="opacity:0; width:0; height:0;">
                <span class="toggle-slider" style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background-color:${s.twoFactorEnabled ? 'var(--color-secondary)' : '#ccc'}; border-radius:34px; transition:.3s;">
                  <span style="position:absolute; content:''; height:16px; width:16px; left:4px; bottom:4px; background-color:white; border-radius:50%; transition:.3s; transform: ${s.twoFactorEnabled ? 'translateX(20px)' : 'none'};"></span>
                </span>
              </label>
            </div>
            ${s.twoFactorEnabled ? `
              <div style="margin-top:12px; padding-top:12px; border-top:1px solid #E5E7EB; font-size:11px; color:var(--color-success); font-weight:bold;">
                ✓ 2FA Secure Locks active. Authenticating on login session bounds.
              </div>
            ` : ''}
          </div>

          <h4 style="font-size: 14px; font-weight:bold; color: var(--color-primary); margin-bottom:12px;">Change Password</h4>
          <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
            <div>
              <label style="font-size:11px; color:#4B5563; font-weight:bold; display:block; margin-bottom:4px;">Current Password</label>
              <input type="password" id="settings-pass-current" class="form-control-landlord" style="padding:6px; font-size:12px; background:white;">
            </div>
            <div>
              <label style="font-size:11px; color:#4B5563; font-weight:bold; display:block; margin-bottom:4px;">New Password</label>
              <input type="password" id="settings-pass-new" class="form-control-landlord" style="padding:6px; font-size:12px; background:white;">
            </div>
          </div>
          <button type="button" class="btn btn-outline btn-sm" id="btn-settings-change-pass">Update Credentials</button>
        </div>
      </div>

      <!-- Activity Security Audit Trail (Milestone 21) -->
      <div class="card" style="padding: 24px;">
        <h3 class="card-title" style="font-size: 15px; color: var(--color-primary); margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <span>🛡️</span> Security & System Activity Audit Trail
        </h3>
        <div style="display:flex; flex-direction:column; gap:8px; font-family:monospace; font-size:11px; color:#4B5563;">
          ${(state.landlordActivityLogs || []).map(log => `
            <div style="display:flex; justify-content:space-between; background:#F9FAFB; padding:8px 12px; border-radius:var(--radius-sm); border:1px solid #F3F4F6;">
              <span>${log.event}</span>
              <span style="color:#9CA3AF;">[${log.date}]</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderKybTab(state) {
    const kyb = state.landlordKyb;
    
    switch (kyb.status) {
      case 'approved':
        return this.renderKybApproved(state);
      case 'rejected':
        return this.renderKybRejected(state);
      case 'pending':
        return this.renderKybPending(state);
      case 'unverified':
      default:
        return this.renderKybWizard(state);
    }
  },

  renderKybApproved(state) {
    const kyb = state.landlordKyb;
    return `
      <div class="card animate-fade-in" style="padding: 40px; text-align: center; max-width: 600px; margin: 0 auto; background: white;">
        <div style="font-size: 64px; color: var(--color-success); margin-bottom: 20px;">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h2 style="font-size: 24px; color: var(--color-primary); font-weight: var(--weight-bold); margin-bottom: 8px;">Business Verification Complete</h2>
        <div class="landlord-role-badge" style="background: var(--color-success-bg); color: var(--color-success); padding: 6px 14px; font-size: 12px; margin-bottom: 24px; display: inline-block;">CORPORATE KYB VERIFIED</div>
        
        <p class="text-muted" style="font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
          Congratulations! Your business profile and corporate Affairs Commission (CAC) registrations have been fully verified. Your company is cleared to list institutional portfolios and draw structured rent payouts.
        </p>

        <div style="background-color: var(--color-background); border: 1px solid rgba(13, 27, 75, 0.05); border-radius: var(--radius-md); padding: 20px; margin-bottom: 32px; text-align: left;">
          <div style="font-weight: bold; color: var(--color-primary); font-size: 13px; margin-bottom: 12px; border-bottom: 1px solid rgba(13, 27, 75, 0.05); padding-bottom: 6px;">Corporate Registry Info</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #4B5563;">
            <div style="display: flex; justify-content: space-between;">
              <span>Company Name:</span>
              <span style="font-weight: bold;">${kyb.companyName}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>CAC Number:</span>
              <span style="font-weight: bold;">RC-${kyb.cacNumber}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Tax ID (TIN):</span>
              <span style="font-weight: bold;">${kyb.tinNumber}</span>
            </div>
          </div>
        </div>

        <button class="btn btn-outline btn-sm" id="btn-kyb-reset" style="width: 100%;">
          Reset KYB Verification (Dev Tool)
        </button>
      </div>
    `;
  },

  renderKybRejected(state) {
    const kyb = state.landlordKyb;
    return `
      <div class="card animate-fade-in" style="padding: 40px; text-align: center; max-width: 600px; margin: 0 auto; background: white;">
        <div style="font-size: 64px; color: var(--color-error); margin-bottom: 20px;">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h2 style="font-size: 24px; color: var(--color-primary); font-weight: var(--weight-bold); margin-bottom: 8px;">Business Verification Failed</h2>
        <div class="landlord-role-badge" style="background: var(--color-error-bg); color: var(--color-error); padding: 6px 14px; font-size: 12px; margin-bottom: 24px; display: inline-block;">KYB REJECTED</div>
        
        <div style="background-color: #FEF2F2; border: 1px solid #FCA5A5; border-radius: var(--radius-md); padding: 20px; margin-bottom: 32px; text-align: left;">
          <div style="font-weight: bold; color: #B91C1C; font-size: 13px; margin-bottom: 6px;">Reason for Rejection:</div>
          <p style="font-size: 13px; color: #7F1D1D; line-height: 1.5; margin: 0;">
            "${kyb.rejectionReason || 'The Corporate Affairs Commission registration number matches another entity on the public registry.'}"
          </p>
        </div>

        <p class="text-muted" style="font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
          Please update your corporate credentials, CAC Status reports, or tax information and submit again. Ensure all documents uploaded are legible and valid.
        </p>

        <button class="btn btn-primary btn-sm" id="btn-kyb-restart" style="width: 100%;">
          Restart Business Verification Flow
        </button>
      </div>
    `;
  },

  renderKybPending(state) {
    const kyb = state.landlordKyb;
    return `
      <div class="card animate-fade-in" style="padding: 40px; text-align: center; max-width: 600px; margin: 0 auto; background: white;">
        <div style="font-size: 64px; color: var(--color-warning); margin-bottom: 20px;" class="animate-pulse">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h2 style="font-size: 24px; color: var(--color-primary); font-weight: var(--weight-bold); margin-bottom: 8px;">Business Profile Under Review</h2>
        <div class="landlord-role-badge" style="background: var(--color-warning-bg); color: var(--color-primary); padding: 6px 14px; font-size: 12px; margin-bottom: 24px; display: inline-block;">PENDING KYB AUDIT</div>
        
        <p class="text-muted" style="font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
          Your Corporate registration filings and tax details are currently being validated by our compliance staff and verified against Corporate Affairs Commission (CAC) and FIRS tax databases.
        </p>

        <div style="background-color: var(--color-background); border: 1px solid rgba(13, 27, 75, 0.05); border-radius: var(--radius-md); padding: 20px; margin-bottom: 32px; text-align: left;">
          <div style="font-weight: bold; color: var(--color-primary); font-size: 13px; margin-bottom: 12px; border-bottom: 1px solid rgba(13, 27, 75, 0.05); padding-bottom: 6px;">Submitted Corporate Profile Details</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #4B5563;">
            <div style="display: flex; justify-content: space-between;">
              <span>Registered Name:</span>
              <span style="font-weight: bold;">${kyb.companyName}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Entity Type:</span>
              <span style="font-weight: bold;">${kyb.companyType}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>CAC RC/BN Number:</span>
              <span style="font-weight: bold; font-family: monospace;">RC-${kyb.cacNumber}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>FIRS TIN Number:</span>
              <span style="font-weight: bold; font-family: monospace;">${kyb.tinNumber}</span>
            </div>
          </div>
        </div>

        <!-- Dev Simulator Panel -->
        <div style="border-top: 2px dashed #E5E7EB; padding-top: 24px; margin-top: 24px;">
          <h4 style="font-size: 12px; color: var(--color-primary); font-weight: bold; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px;">Business Approval Simulator</h4>
          <div style="display: flex; gap: 12px; width: 100%;">
            <button class="btn btn-primary btn-sm" id="btn-kyb-sim-approve" style="flex: 1; background-color: var(--color-success); border-color: var(--color-success);">
              Approve Corporate
            </button>
            <button class="btn btn-outline btn-sm" id="btn-kyb-sim-reject" style="flex: 1; color: var(--color-error); border-color: var(--color-error);">
              Reject Corporate
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderKybWizard(state) {
    const kyb = state.landlordKyb;
    const step = kyb.step;

    // Steps configuration
    const stepsData = [
      { num: 1, label: 'Company Profile & CAC' },
      { num: 2, label: 'Tax & Logo' },
      { num: 3, label: 'Business Docs' }
    ];

    const wizardProgressHTML = stepsData.map(s => `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 28px; height: 28px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; 
          background-color: ${step === s.num ? 'var(--color-secondary)' : (step > s.num ? 'var(--color-primary)' : 'var(--color-background)')};
          color: ${step === s.num || step > s.num ? 'white' : '#6B7280'};
          border: 1px solid ${step === s.num || step > s.num ? 'transparent' : '#D1CDCA'};">
          ${step > s.num ? '&#10003;' : s.num}
        </div>
        <span style="font-size: 13px; font-weight: ${step === s.num ? 'bold' : 'normal'}; color: ${step === s.num ? 'var(--color-primary)' : '#6B7280'};">${s.label}</span>
        ${s.num < 3 ? `<div style="width: 40px; height: 2px; background-color: ${step > s.num ? 'var(--color-primary)' : '#E5E7EB'}; margin: 0 4px;"></div>` : ''}
      </div>
    `).join('');

    return `
      <div class="card animate-fade-in" style="padding: 32px; background: white; text-align: left; max-width: 680px; margin: 0 auto; width: 100%;">
        <div style="border-bottom: 1px solid rgba(13, 27, 75, 0.05); padding-bottom: 16px; margin-bottom: 24px;">
          <h3 style="font-size: 20px; color: var(--color-primary); font-weight: var(--weight-bold); margin: 0;">Corporate Verification (KYB)</h3>
          <p class="text-muted" style="font-size: 13px; margin-top: 4px; margin-bottom: 0;">Verify your business entity to unlock high-volume commercial listings.</p>
        </div>

        <!-- Wizard Steps Indicator -->
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 32px; flex-wrap: wrap; gap: 12px;">
          ${wizardProgressHTML}
        </div>

        <!-- Wizard Step Panels -->
        ${step === 1 ? this.renderKybWizardStep1(kyb) : ''}
        ${step === 2 ? this.renderKybWizardStep2(kyb) : ''}
        ${step === 3 ? this.renderKybWizardStep3(kyb) : ''}
      </div>
    `;
  },

  renderKybWizardStep1(kyb) {
    return `
      <form id="kyb-step1-form" novalidate>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          
          <div class="form-group-landlord">
            <label for="kyb-company-name" style="font-weight: bold; color: var(--color-primary); font-size: 13px;">Company Registered Name (CAC)</label>
            <input type="text" id="kyb-company-name" class="form-control-landlord" value="${kyb.companyName || ''}" placeholder="e.g. Ha-shem Properties Limited" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 12px; box-sizing: border-box; margin-top: 6px; font-size: 14px;" required>
            <span class="form-error" id="error-kyb-company-name"></span>
          </div>

          <div class="form-grid-2">
            <div class="form-group-landlord">
              <label for="kyb-company-type" style="font-weight: bold; color: var(--color-primary); font-size: 13px;">Corporate Entity Type</label>
              <select id="kyb-company-type" class="form-control-landlord" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing: border-box; margin-top: 6px; background: white; font-size: 14px;">
                <option value="Private Limited Company" ${kyb.companyType === 'Private Limited Company' ? 'selected' : ''}>Private Limited Company (Ltd)</option>
                <option value="Registered Business Name" ${kyb.companyType === 'Registered Business Name' ? 'selected' : ''}>Registered Business Name (BN)</option>
                <option value="Sole Proprietorship" ${kyb.companyType === 'Sole Proprietorship' ? 'selected' : ''}>Sole Proprietorship</option>
                <option value="Partnership" ${kyb.companyType === 'Partnership' ? 'selected' : ''}>Partnership</option>
              </select>
            </div>
            <div class="form-group-landlord">
              <label for="kyb-cac-number" style="font-weight: bold; color: var(--color-primary); font-size: 13px;">CAC registration Number (RC/BN)</label>
              <input type="text" id="kyb-cac-number" class="form-control-landlord" value="${kyb.cacNumber || ''}" placeholder="e.g. 1492083" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing: border-box; margin-top: 6px; font-size: 14px;" required>
              <span class="form-error" id="error-kyb-cac-number"></span>
            </div>
          </div>

          <div class="form-group-landlord">
            <label for="kyb-address" style="font-weight: bold; color: var(--color-primary); font-size: 13px;">Registered Head Office Address</label>
            <input type="text" id="kyb-address" class="form-control-landlord" value="${kyb.companyAddress || ''}" placeholder="e.g. Suite 4b, Capital Plaza, Ikeja, Lagos" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 12px; box-sizing: border-box; margin-top: 6px; font-size: 14px;" required>
            <span class="form-error" id="error-kyb-address"></span>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 12px; border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 20px;">
            <button type="submit" class="btn btn-primary btn-sm" style="padding-left: 24px; padding-right: 24px;">
              Continue to Step 2 &rarr;
            </button>
          </div>
        </div>
      </form>
    `;
  },

  renderKybWizardStep2(kyb) {
    return `
      <form id="kyb-step2-form" novalidate>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          
          <div class="form-group-landlord">
            <label for="kyb-tin" style="font-weight: bold; color: var(--color-primary); font-size: 13px;">FIRS Tax Identification Number (TIN)</label>
            <input type="text" id="kyb-tin" class="form-control-landlord" value="${kyb.tinNumber || ''}" placeholder="e.g. 23098321-0001" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 12px; box-sizing: border-box; margin-top: 6px; font-size: 14px;" required>
            <span class="form-error" id="error-kyb-tin"></span>
          </div>

          <!-- Company Logo Upload -->
          <div class="form-group-landlord">
            <label style="font-weight: bold; color: var(--color-primary); font-size: 13px; display: block; margin-bottom: 8px;">Upload Corporate Logo</label>
            <div id="kyb-logo-dropzone" style="border: 2px dashed #D1CDCA; border-radius: var(--radius-md); padding: 24px; text-align: center; cursor: pointer; background-color: var(--color-background); transition: all var(--transition-fast);">
              <input type="file" id="kyb-logo-file" accept="image/*" style="display: none;">
              <div id="kyb-logo-preview-container" style="${kyb.logoFile ? '' : 'display: none;'} margin-bottom: 12px;">
                <img src="${kyb.logoFile || ''}" id="kyb-logo-preview" style="max-height: 80px; max-width: 80px; object-fit: contain; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
              </div>
              <div id="kyb-logo-text" style="${kyb.logoFile ? 'display: none;' : ''}">
                <div style="font-size: 24px; color: #9CA3AF; margin-bottom: 6px;">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <span style="font-size: 13px; font-weight: bold; color: var(--color-secondary);">Select Logo image</span>
              </div>
              ${kyb.logoFile ? `<div style="font-size: 11px; color: var(--color-success); font-weight: bold; margin-top: 8px;">Logo Loaded. Tap to change.</div>` : ''}
            </div>
            <span class="form-error" id="error-kyb-logo-file"></span>
          </div>

          <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 12px; border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 20px;">
            <button type="button" class="btn btn-outline btn-sm" id="btn-kyb-back-step1">
              &larr; Back to Step 1
            </button>
            <button type="submit" class="btn btn-primary btn-sm" style="padding-left: 24px; padding-right: 24px;">
              Continue to Step 3 &rarr;
            </button>
          </div>
        </div>
      </form>
    `;
  },

  renderKybWizardStep3(kyb) {
    return `
      <form id="kyb-step3-form" novalidate>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          
          <!-- CAC Certificate Upload -->
          <div class="form-group-landlord">
            <label style="font-weight: bold; color: var(--color-primary); font-size: 13px; display: block; margin-bottom: 8px;">Upload CAC registration Certificate</label>
            <div id="kyb-cac-dropzone" style="border: 2px dashed #D1CDCA; border-radius: var(--radius-md); padding: 24px; text-align: center; cursor: pointer; background-color: var(--color-background); transition: all var(--transition-fast);">
              <input type="file" id="kyb-cac-file" accept="image/*" style="display: none;">
              <div id="kyb-cac-preview-container" style="${kyb.cacCertFile ? '' : 'display: none;'} margin-bottom: 12px;">
                <img src="${kyb.cacCertFile || ''}" id="kyb-cac-preview" style="max-height: 100px; max-width: 100%; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
              </div>
              <div id="kyb-cac-text" style="${kyb.cacCertFile ? 'display: none;' : ''}">
                <div style="font-size: 24px; color: #9CA3AF; margin-bottom: 6px;">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>
                </div>
                <span style="font-size: 13px; font-weight: bold; color: var(--color-secondary);">Click to choose file</span>
              </div>
              ${kyb.cacCertFile ? `<div style="font-size: 11px; color: var(--color-success); font-weight: bold; margin-top: 8px;">Certificate selected successfully.</div>` : ''}
            </div>
            <span class="form-error" id="error-kyb-cac-file"></span>
          </div>

          <!-- CAC Status Report / Form 1.1 Upload -->
          <div class="form-group-landlord">
            <label style="font-weight: bold; color: var(--color-primary); font-size: 13px; display: block; margin-bottom: 8px;">Upload CAC Status Report / Form CAC 1.1</label>
            <div id="kyb-status-dropzone" style="border: 2px dashed #D1CDCA; border-radius: var(--radius-md); padding: 24px; text-align: center; cursor: pointer; background-color: var(--color-background); transition: all var(--transition-fast);">
              <input type="file" id="kyb-status-file" accept="image/*" style="display: none;">
              <div id="kyb-status-preview-container" style="${kyb.statusReportFile ? '' : 'display: none;'} margin-bottom: 12px;">
                <img src="${kyb.statusReportFile || ''}" id="kyb-status-preview" style="max-height: 100px; max-width: 100%; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
              </div>
              <div id="kyb-status-text" style="${kyb.statusReportFile ? 'display: none;' : ''}">
                <div style="font-size: 24px; color: #9CA3AF; margin-bottom: 6px;">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>
                </div>
                <span style="font-size: 13px; font-weight: bold; color: var(--color-secondary);">Click to choose file</span>
              </div>
              ${kyb.statusReportFile ? `<div style="font-size: 11px; color: var(--color-success); font-weight: bold; margin-top: 8px;">Status Report selected successfully.</div>` : ''}
            </div>
            <span class="form-error" id="error-kyb-status-file"></span>
          </div>

          <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 12px; border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 20px;">
            <button type="button" class="btn btn-outline btn-sm" id="btn-kyb-back-step2">
              &larr; Back to Step 2
            </button>
            <button type="submit" class="btn btn-primary btn-sm" style="padding-left: 24px; padding-right: 24px;">
              Submit KYB Verification
            </button>
          </div>
        </div>
      </form>
    `;
  },

  renderKycTab(state) {
    const kyc = state.landlordKyc;
    
    switch (kyc.status) {
      case 'approved':
        return this.renderKycApproved(state);
      case 'rejected':
        return this.renderKycRejected(state);
      case 'pending':
        return this.renderKycPending(state);
      case 'unverified':
      default:
        return this.renderKycWizard(state);
    }
  },

  renderKycApproved(state) {
    const kyc = state.landlordKyc;
    return `
      <div class="card animate-fade-in" style="padding: 40px; text-align: center; max-width: 600px; margin: 0 auto; background: white;">
        <div style="font-size: 64px; color: var(--color-success); margin-bottom: 20px;">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h2 style="font-size: 24px; color: var(--color-primary); font-weight: var(--weight-bold); margin-bottom: 8px;">Identity Verification Complete</h2>
        <div class="landlord-role-badge" style="background: var(--color-success-bg); color: var(--color-success); padding: 6px 14px; font-size: 12px; margin-bottom: 24px; display: inline-block;">VERIFIED PROVIDER</div>
        
        <p class="text-muted" style="font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
          Congratulations! Your individual identity and property ownership authorization have been successfully verified against federal NIMC and CBN databases. Your account is fully qualified for advanced escrow and tenant payouts.
        </p>

        <div style="background-color: var(--color-background); border: 1px solid rgba(13, 27, 75, 0.05); border-radius: var(--radius-md); padding: 20px; margin-bottom: 32px; text-align: left;">
          <div style="font-weight: bold; color: var(--color-primary); font-size: 13px; margin-bottom: 12px; border-bottom: 1px solid rgba(13, 27, 75, 0.05); padding-bottom: 6px;">Verification Audit Logs</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #4B5563;">
            <div style="display: flex; justify-content: space-between;">
              <span>Document Type:</span>
              <span style="font-weight: bold;">${kyc.docType} Verified</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Verified Address:</span>
              <span style="font-weight: bold; text-align: right; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${kyc.addressStreet}, ${kyc.addressCity}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Authority Match Score:</span>
              <span style="font-weight: bold; color: var(--color-success);">99.8% Perfect Match</span>
            </div>
          </div>
        </div>

        <button class="btn btn-outline btn-sm" id="btn-kyc-reset" style="width: 100%;">
          Reset Verification (Dev Tool)
        </button>
      </div>
    `;
  },

  renderKycRejected(state) {
    const kyc = state.landlordKyc;
    return `
      <div class="card animate-fade-in" style="padding: 40px; text-align: center; max-width: 600px; margin: 0 auto; background: white;">
        <div style="font-size: 64px; color: var(--color-error); margin-bottom: 20px;">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h2 style="font-size: 24px; color: var(--color-primary); font-weight: var(--weight-bold); margin-bottom: 8px;">Identity Verification Failed</h2>
        <div class="landlord-role-badge" style="background: var(--color-error-bg); color: var(--color-error); padding: 6px 14px; font-size: 12px; margin-bottom: 24px; display: inline-block;">REJECTED / UNVERIFIED</div>
        
        <div style="background-color: #FEF2F2; border: 1px solid #FCA5A5; border-radius: var(--radius-md); padding: 20px; margin-bottom: 32px; text-align: left;">
          <div style="font-weight: bold; color: #B91C1C; font-size: 13px; margin-bottom: 6px;">Reason for Rejection:</div>
          <p style="font-size: 13px; color: #7F1D1D; line-height: 1.5; margin: 0;">
            "${kyc.rejectionReason || 'The utility bill proof of address upload could not be verified. Please make sure the name matches your legal identity.'}"
          </p>
        </div>

        <p class="text-muted" style="font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
          Please update your document photo or legal credentials and submit for verification again. Make sure all photo uploads are clear, well-lit, and uncropped.
        </p>

        <button class="btn btn-primary btn-sm" id="btn-kyc-restart" style="width: 100%;">
          Restart Verification Flow
        </button>
      </div>
    `;
  },

  renderKycPending(state) {
    const kyc = state.landlordKyc;
    return `
      <div class="card animate-fade-in" style="padding: 40px; text-align: center; max-width: 600px; margin: 0 auto; background: white;">
        <div style="font-size: 64px; color: var(--color-warning); margin-bottom: 20px;" class="animate-pulse">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h2 style="font-size: 24px; color: var(--color-primary); font-weight: var(--weight-bold); margin-bottom: 8px;">Verification Under Review</h2>
        <div class="landlord-role-badge" style="background: var(--color-warning-bg); color: var(--color-primary); padding: 6px 14px; font-size: 12px; margin-bottom: 24px; display: inline-block;">PENDING AUDIT</div>
        
        <p class="text-muted" style="font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
          Your identity verifications are currently being validated by our compliance staff and compared with NIMC registry database matches. Reviews are typically completed within 15 minutes.
        </p>

        <div style="background-color: var(--color-background); border: 1px solid rgba(13, 27, 75, 0.05); border-radius: var(--radius-md); padding: 20px; margin-bottom: 32px; text-align: left;">
          <div style="font-weight: bold; color: var(--color-primary); font-size: 13px; margin-bottom: 12px; border-bottom: 1px solid rgba(13, 27, 75, 0.05); padding-bottom: 6px;">Submitted Credentials Summary</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #4B5563;">
            <div style="display: flex; justify-content: space-between;">
              <span>Document Type:</span>
              <span style="font-weight: bold;">${kyc.docType}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Document Number:</span>
              <span style="font-weight: bold; font-family: monospace;">${kyc.docNumber.substring(0,3)}******${kyc.docNumber.substring(kyc.docNumber.length - 2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Physical Address:</span>
              <span style="font-weight: bold; text-align: right; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${kyc.addressStreet}, ${kyc.addressCity}</span>
            </div>
          </div>
        </div>

        <!-- Dev Simulator Panel -->
        <div style="border-top: 2px dashed #E5E7EB; padding-top: 24px; margin-top: 24px;">
          <h4 style="font-size: 12px; color: var(--color-primary); font-weight: bold; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px;">Verification Simulator (Dev Mode)</h4>
          <div style="display: flex; gap: 12px; width: 100%;">
            <button class="btn btn-primary btn-sm" id="btn-sim-approve" style="flex: 1; background-color: var(--color-success); border-color: var(--color-success);">
              Simulate Approve
            </button>
            <button class="btn btn-outline btn-sm" id="btn-sim-reject" style="flex: 1; color: var(--color-error); border-color: var(--color-error);">
              Simulate Reject
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderKycWizard(state) {
    const kyc = state.landlordKyc;
    const step = kyc.step;

    // Steps configuration
    const stepsData = [
      { num: 1, label: 'Government ID' },
      { num: 2, label: 'Selfie Match' },
      { num: 3, label: 'Address Proof' }
    ];

    const wizardProgressHTML = stepsData.map(s => `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 28px; height: 28px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; 
          background-color: ${step === s.num ? 'var(--color-secondary)' : (step > s.num ? 'var(--color-primary)' : 'var(--color-background)')};
          color: ${step === s.num || step > s.num ? 'white' : '#6B7280'};
          border: 1px solid ${step === s.num || step > s.num ? 'transparent' : '#D1CDCA'};">
          ${step > s.num ? '&#10003;' : s.num}
        </div>
        <span style="font-size: 13px; font-weight: ${step === s.num ? 'bold' : 'normal'}; color: ${step === s.num ? 'var(--color-primary)' : '#6B7280'};">${s.label}</span>
        ${s.num < 3 ? `<div style="width: 40px; height: 2px; background-color: ${step > s.num ? 'var(--color-primary)' : '#E5E7EB'}; margin: 0 4px;"></div>` : ''}
      </div>
    `).join('');

    return `
      <div class="card animate-fade-in" style="padding: 32px; background: white; text-align: left; max-width: 680px; margin: 0 auto; width: 100%;">
        <div style="border-bottom: 1px solid rgba(13, 27, 75, 0.05); padding-bottom: 16px; margin-bottom: 24px;">
          <h3 style="font-size: 20px; color: var(--color-primary); font-weight: var(--weight-bold); margin: 0;">Identity Verification Gateway</h3>
          <p class="text-muted" style="font-size: 13px; margin-top: 4px; margin-bottom: 0;">Secure multi-factor identity authorization required by CBN guidelines.</p>
        </div>

        <!-- Wizard Steps Indicator -->
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 32px; flex-wrap: wrap; gap: 12px;">
          ${wizardProgressHTML}
        </div>

        <!-- Wizard Step Panels -->
        ${step === 1 ? this.renderKycWizardStep1(kyc) : ''}
        ${step === 2 ? this.renderKycWizardStep2(kyc) : ''}
        ${step === 3 ? this.renderKycWizardStep3(kyc) : ''}
      </div>
    `;
  },

  renderKycWizardStep1(kyc) {
    return `
      <form id="kyc-step1-form" novalidate>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          
          <div class="form-group-landlord">
            <label for="kyc-doc-type" style="font-weight: bold; color: var(--color-primary); font-size: 13px;">Select Verification Document Type</label>
            <select id="kyc-doc-type" class="form-control-landlord" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 12px; box-sizing: border-box; margin-top: 6px; background: white; font-size: 14px;">
              <option value="NIN" ${kyc.docType === 'NIN' ? 'selected' : ''}>National Identity Number (NIN)</option>
              <option value="BVN" ${kyc.docType === 'BVN' ? 'selected' : ''}>Bank Verification Number (BVN)</option>
              <option value="Driver License" ${kyc.docType === 'Driver License' ? 'selected' : ''}>Driver's License (FRSC)</option>
              <option value="Passport" ${kyc.docType === 'Passport' ? 'selected' : ''}>International Passport (NIS)</option>
            </select>
          </div>

          <div class="form-group-landlord">
            <label for="kyc-doc-number" style="font-weight: bold; color: var(--color-primary); font-size: 13px;">Document ID Number</label>
            <input type="text" id="kyc-doc-number" class="form-control-landlord" value="${kyc.docNumber || ''}" placeholder="e.g. 11-digit NIN / BVN number" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 12px; box-sizing: border-box; margin-top: 6px; font-size: 14px;" required>
            <span class="form-error" id="error-kyc-doc-number"></span>
          </div>

          <!-- Document Upload Dropzone -->
          <div class="form-group-landlord">
            <label style="font-weight: bold; color: var(--color-primary); font-size: 13px; display: block; margin-bottom: 8px;">Upload Clear Document Photo (Front)</label>
            <div id="kyc-doc-dropzone" style="border: 2px dashed #D1CDCA; border-radius: var(--radius-md); padding: 28px; text-align: center; cursor: pointer; background-color: var(--color-background); transition: all var(--transition-fast);">
              <input type="file" id="kyc-doc-file" accept="image/*" style="display: none;">
              <div id="kyc-doc-upload-preview-container" style="${kyc.docFile ? '' : 'display: none;'} margin-bottom: 12px;">
                <img src="${kyc.docFile || ''}" id="kyc-doc-upload-preview" style="max-height: 120px; max-width: 100%; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
              </div>
              <div id="kyc-doc-upload-text" style="${kyc.docFile ? 'display: none;' : ''}">
                <div style="font-size: 28px; color: #9CA3AF; margin-bottom: 8px;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>
                </div>
                <span style="font-size: 13px; font-weight: bold; color: var(--color-secondary);">Click to choose file</span>
                <p style="font-size: 11px; color: #9CA3AF; margin-top: 4px;">Supports PNG, JPG, or PDF (Max 5MB)</p>
              </div>
              ${kyc.docFile ? `<div style="font-size: 11px; color: var(--color-success); font-weight: bold; margin-top: 8px;">Document Chosen successfully. Tap to replace.</div>` : ''}
            </div>
            <span class="form-error" id="error-kyc-doc-file"></span>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 12px; border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 20px;">
            <button type="submit" class="btn btn-primary btn-sm" style="padding-left: 24px; padding-right: 24px;">
              Continue to Step 2 &rarr;
            </button>
          </div>
        </div>
      </form>
    `;
  },

  renderKycWizardStep2(kyc) {
    return `
      <form id="kyc-step2-form">
        <div style="display: flex; flex-direction: column; gap: 20px; align-items: center; text-align: center;">
          <h4 style="font-size: 14px; font-weight: bold; color: var(--color-primary); margin: 0;">Liveness Face Match Selfie</h4>
          <p class="text-muted" style="font-size: 12px; max-width: 480px; margin: 0;">We compare your selfie image against database records for facial match mapping. Please ensure your face is fully visible with no caps or glasses.</p>

          <!-- Selfie Camera Box Simulator -->
          <div style="position: relative; width: 200px; height: 200px; border-radius: var(--radius-full); border: 4px solid var(--color-secondary); box-shadow: var(--shadow-md); overflow: hidden; background: #F3F4F6; display: flex; align-items: center; justify-content: center; margin: 12px 0;">
            <input type="file" id="kyc-selfie-file" accept="image/*" style="display: none;">
            ${kyc.selfieFile ? `
              <img src="${kyc.selfieFile}" id="kyc-selfie-preview" style="width: 100%; height: 100%; object-fit: cover;">
            ` : `
              <div style="text-align: center; color: #9CA3AF;" id="kyc-selfie-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; margin-bottom: 8px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <div style="font-size: 11px; font-weight: bold;">Camera Off</div>
              </div>
            `}
          </div>

          <button type="button" class="btn btn-outline btn-sm" id="btn-capture-selfie" style="margin-bottom: 8px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            ${kyc.selfieFile ? 'Capture / Select New Selfie' : 'Capture Selfie Photo'}
          </button>
          <span class="form-error" id="error-kyc-selfie-file"></span>

          <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 12px; border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 20px;">
            <button type="button" class="btn btn-outline btn-sm" id="btn-kyc-back-step1">
              &larr; Back to Step 1
            </button>
            <button type="submit" class="btn btn-primary btn-sm" style="padding-left: 24px; padding-right: 24px;">
              Continue to Step 3 &rarr;
            </button>
          </div>
        </div>
      </form>
    `;
  },

  renderKycWizardStep3(kyc) {
    return `
      <form id="kyc-step3-form" novalidate>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          
          <div style="font-weight: bold; color: var(--color-primary); font-size: 13px; border-bottom: 1px solid rgba(13,27,75,0.05); padding-bottom: 6px;">Proof of Residential Address</div>

          <div class="form-group-landlord">
            <label for="kyc-street" style="font-size: 12px; color: #6B7280;">Street Address</label>
            <input type="text" id="kyc-street" class="form-control-landlord" value="${kyc.addressStreet || ''}" placeholder="e.g. Apartment/Suite, 12b Admiralty Way" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 12px; box-sizing: border-box; margin-top: 6px; font-size: 14px;" required>
            <span class="form-error" id="error-kyc-street"></span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div class="form-group-landlord">
              <label for="kyc-city" style="font-size: 12px; color: #6B7280;">City</label>
              <input type="text" id="kyc-city" class="form-control-landlord" value="${kyc.addressCity || 'Lagos'}" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing: border-box; margin-top: 6px; font-size: 14px;" required>
              <span class="form-error" id="error-kyc-city"></span>
            </div>
            <div class="form-group-landlord">
              <label for="kyc-state" style="font-size: 12px; color: #6B7280;">State</label>
              <input type="text" id="kyc-state" class="form-control-landlord" value="${kyc.addressState || 'Lagos State'}" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing: border-box; margin-top: 6px; font-size: 14px;" required>
              <span class="form-error" id="error-kyc-state"></span>
            </div>
            <div class="form-group-landlord">
              <label for="kyc-zip" style="font-size: 12px; color: #6B7280;">Postal Code</label>
              <input type="text" id="kyc-zip" class="form-control-landlord" value="${kyc.addressZip || ''}" placeholder="105102" style="width: 100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing: border-box; margin-top: 6px; font-size: 14px;" required>
              <span class="form-error" id="error-kyc-zip"></span>
            </div>
          </div>

          <!-- Proof Document Upload Dropzone -->
          <div class="form-group-landlord">
            <label style="font-weight: bold; color: var(--color-primary); font-size: 13px; display: block; margin-bottom: 8px;">Upload Utility Bill / Bank Statement (Last 3 Months)</label>
            <div id="kyc-address-dropzone" style="border: 2px dashed #D1CDCA; border-radius: var(--radius-md); padding: 28px; text-align: center; cursor: pointer; background-color: var(--color-background); transition: all var(--transition-fast);">
              <input type="file" id="kyc-address-file" accept="image/*" style="display: none;">
              <div id="kyc-address-preview-container" style="${kyc.addressFile ? '' : 'display: none;'} margin-bottom: 12px;">
                <img src="${kyc.addressFile || ''}" id="kyc-address-preview" style="max-height: 120px; max-width: 100%; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
              </div>
              <div id="kyc-address-upload-text" style="${kyc.addressFile ? 'display: none;' : ''}">
                <div style="font-size: 28px; color: #9CA3AF; margin-bottom: 8px;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>
                </div>
                <span style="font-size: 13px; font-weight: bold; color: var(--color-secondary);">Click to choose file</span>
                <p style="font-size: 11px; color: #9CA3AF; margin-top: 4px;">Supports Utility Bills (EKEDC, LSWC), Bank statements showing address</p>
              </div>
              ${kyc.addressFile ? `<div style="font-size: 11px; color: var(--color-success); font-weight: bold; margin-top: 8px;">Statement Chosen successfully. Tap to replace.</div>` : ''}
            </div>
            <span class="form-error" id="error-kyc-address-file"></span>
          </div>

          <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 12px; border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 20px;">
            <button type="button" class="btn btn-outline btn-sm" id="btn-kyc-back-step2">
              &larr; Back to Step 2
            </button>
            <button type="submit" class="btn btn-primary btn-sm" style="padding-left: 24px; padding-right: 24px;">
              Submit Verification Request
            </button>
          </div>
        </div>
      </form>
    `;
  },

  renderProfileTab(state) {
    const profile = state.landlordProfile;
    const isEdit = profile.editMode;

    // Calculate Completion
    const fields = ['fullName', 'dob', 'gender', 'phone', 'email', 'address', 'bio', 'language'];
    const filledCount = fields.filter(f => profile[f] && profile[f].toString().trim() !== '').length;
    const completionPercent = Math.round((filledCount / fields.length) * 100);
    
    let completionColor = 'var(--color-secondary)';
    if (completionPercent < 50) completionColor = 'var(--color-error)';
    else if (completionPercent === 100) completionColor = 'var(--color-success)';

    return `
      <div class="animate-fade-in" style="display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start; margin-top: 8px; text-align: left; width: 100%;">
        <!-- Left Column: Avatar & Progress -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Profile Pic Card -->
          <div class="card" style="padding: 24px; text-align: center; display: flex; flex-direction: column; align-items: center; background: white;">
            <div style="position: relative; width: 140px; height: 140px; margin-bottom: 16px;">
              <img src="${profile.avatar}" alt="Landlord Avatar" id="ll-profile-avatar-preview" style="width: 140px; height: 140px; object-fit: cover; border-radius: var(--radius-full); border: 4px solid var(--color-background); box-shadow: var(--shadow-md);">
              ${isEdit ? `
                <label for="ll-avatar-upload" style="position: absolute; bottom: 0; right: 0; background: var(--color-secondary); color: white; width: 36px; height: 36px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: var(--shadow-sm); border: 2px solid white; transition: background-color var(--transition-fast);">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </label>
                <input type="file" id="ll-avatar-upload" accept="image/*" style="display: none;">
              ` : ''}
            </div>
            <h3 style="font-size: 18px; color: var(--color-primary); font-weight: var(--weight-bold);">${profile.fullName || 'New Landlord'}</h3>
            <div class="landlord-role-badge" style="margin-top: 6px; font-size: 11px;">Licensed Provider</div>
            <div style="font-size: 12px; margin-top: 12px; font-weight: var(--weight-semibold); display: flex; align-items: center; gap: 4px; background: var(--color-success-bg); color: var(--color-success); padding: 4px 10px; border-radius: var(--radius-full); border: 1px solid rgba(34,197,94,0.15); justify-content: center;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="3" style="margin-right: 2px;"><polyline points="20 6 9 17 4 12"/></svg>
              License: Verified #${profile.license}
            </div>
          </div>

          <!-- Progress Card -->
          <div class="card" style="padding: 24px; background: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 13px; font-weight: var(--weight-bold); color: var(--color-primary);">Profile Setup</span>
              <span style="font-size: 13px; font-weight: var(--weight-bold); color: ${completionColor};">${completionPercent}%</span>
            </div>
            <div style="width: 100%; height: 8px; background-color: var(--color-background); border-radius: var(--radius-full); overflow: hidden; margin-bottom: 12px;">
              <div style="width: ${completionPercent}%; height: 100%; background-color: ${completionColor}; border-radius: var(--radius-full); transition: width 0.5s ease-in-out;"></div>
            </div>
            <p style="font-size: 11px; color: #6B7280; line-height: 1.4;">${completionPercent === 100 ? 'Your profile is fully completed and qualified for premium CBN escrow trust integrations.' : 'Complete your personal and contact details to unlock premium platform trust statuses.'}</p>
          </div>
        </div>

        <!-- Right Column: Profile Details -->
        <div class="card" style="padding: 32px; background: white;">
          ${isEdit ? this.renderProfileEditForm(profile) : this.renderProfileView(profile)}
        </div>
      </div>
    `;
  },

  renderProfileView(profile) {
    const formattedGender = profile.gender || 'Not specified';
    const formattedDOB = profile.dob ? new Date(profile.dob).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified';

    return `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(13, 27, 75, 0.05); padding-bottom: 16px; margin-bottom: 24px;">
        <h3 style="font-size: 20px; color: var(--color-primary); font-weight: var(--weight-bold); margin: 0;">Account Profile Details</h3>
        <button class="btn btn-outline btn-sm" id="btn-ll-edit-profile">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit Profile
        </button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Bio Section -->
        <div>
          <h4 style="font-size: 13px; text-transform: uppercase; color: #9CA3AF; letter-spacing: 0.5px; margin-bottom: 8px;">About / Biography</h4>
          <p style="font-size: 14px; color: #4B5563; line-height: 1.6; background-color: var(--color-background); padding: 16px; border-radius: var(--radius-md); border: 1px solid rgba(13, 27, 75, 0.02); font-style: italic; margin: 0;">
            "${profile.bio || 'No biography written yet.'}"
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
          <!-- Personal Information Section -->
          <div>
            <h4 style="font-size: 13px; text-transform: uppercase; color: #9CA3AF; letter-spacing: 0.5px; border-bottom: 1px solid rgba(13,27,75,0.05); padding-bottom: 8px; margin-bottom: 12px; font-weight: var(--weight-bold);">Personal Details</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div>
                <span style="font-size: 11px; color: #9CA3AF; display:block;">Full Legal Name</span>
                <span style="font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-primary);">${profile.fullName}</span>
              </div>
              <div>
                <span style="font-size: 11px; color: #9CA3AF; display:block;">Date of Birth</span>
                <span style="font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-primary);">${formattedDOB}</span>
              </div>
              <div>
                <span style="font-size: 11px; color: #9CA3AF; display:block;">Gender Orientation</span>
                <span style="font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-primary);">${formattedGender}</span>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div>
            <h4 style="font-size: 13px; text-transform: uppercase; color: #9CA3AF; letter-spacing: 0.5px; border-bottom: 1px solid rgba(13,27,75,0.05); padding-bottom: 8px; margin-bottom: 12px; font-weight: var(--weight-bold);">Contact details</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div>
                <span style="font-size: 11px; color: #9CA3AF; display:block;">Registered Email</span>
                <span style="font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-primary);">${profile.email}</span>
              </div>
              <div>
                <span style="font-size: 11px; color: #9CA3AF; display:block;">Verified Phone Line</span>
                <span style="font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-primary);">${profile.phone}</span>
              </div>
              <div>
                <span style="font-size: 11px; color: #9CA3AF; display:block;">Business/Residential Address</span>
                <span style="font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-primary);">${profile.address}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Language Preference Section -->
        <div style="border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 16px;">
          <h4 style="font-size: 13px; text-transform: uppercase; color: #9CA3AF; letter-spacing: 0.5px; margin-bottom: 8px; font-weight: var(--weight-bold);">Workspace Settings</h4>
          <div>
            <span style="font-size: 11px; color: #9CA3AF;">System Language Interface</span>
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
              <span class="landlord-role-badge" style="background-color: var(--color-background); color: var(--color-primary); font-size:11px; font-weight:var(--weight-bold);">${profile.language}</span>
              <span style="font-size:11px; color:#6B7280;">(Nigeria Locale)</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderProfileEditForm(profile) {
    return `
      <div style="border-bottom: 1px solid rgba(13, 27, 75, 0.05); padding-bottom: 16px; margin-bottom: 24px;">
        <h3 style="font-size: 20px; color: var(--color-primary); font-weight: var(--weight-bold); margin: 0;">Edit Account Profile</h3>
      </div>

      <form id="ll-edit-profile-form" novalidate>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          
          <!-- Bio Input -->
          <div class="form-group-landlord">
            <label for="edit-ll-bio" style="font-size: 12px; font-weight:var(--weight-bold); text-transform:uppercase; color:#6B7280;">About / Biography</label>
            <textarea id="edit-ll-bio" class="form-control-landlord" rows="3" placeholder="Provide a brief description of your landlord credentials..." style="width:100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 12px; box-sizing:border-box; font-family:inherit; font-size:14px; margin-top:4px;">${profile.bio || ''}</textarea>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
            <!-- Left Column: Personal info inputs -->
            <div style="display:flex; flex-direction:column; gap:16px;">
              <div style="font-weight:bold; color:var(--color-primary); font-size:13px; border-bottom: 1px solid rgba(13,27,75,0.05); padding-bottom:4px;">Personal Details</div>
              
              <div class="form-group-landlord">
                <label for="edit-ll-name" style="font-size: 12px; color:#6B7280;">Full Legal Name</label>
                <input type="text" id="edit-ll-name" class="form-control-landlord" value="${profile.fullName || ''}" style="width:100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing:border-box; margin-top:4px;" required>
                <span class="form-error" id="error-edit-ll-name"></span>
              </div>

              <div class="form-group-landlord">
                <label for="edit-ll-dob" style="font-size: 12px; color:#6B7280;">Date of Birth</label>
                <input type="date" id="edit-ll-dob" class="form-control-landlord" value="${profile.dob || ''}" style="width:100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing:border-box; margin-top:4px;" required>
                <span class="form-error" id="error-edit-ll-dob"></span>
              </div>

              <div class="form-group-landlord">
                <label for="edit-ll-gender" style="font-size: 12px; color:#6B7280;">Gender Orientation</label>
                <select id="edit-ll-gender" class="form-control-landlord" style="width:100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing:border-box; margin-top:4px; background:white;">
                  <option value="Male" ${profile.gender === 'Male' ? 'selected' : ''}>Male</option>
                  <option value="Female" ${profile.gender === 'Female' ? 'selected' : ''}>Female</option>
                  <option value="Non-Binary" ${profile.gender === 'Non-Binary' ? 'selected' : ''}>Other / Non-Binary</option>
                  <option value="" ${!profile.gender ? 'selected' : ''}>Prefer not to say</option>
                </select>
              </div>
            </div>

            <!-- Right Column: Contact info inputs -->
            <div style="display:flex; flex-direction:column; gap:16px;">
              <div style="font-weight:bold; color:var(--color-primary); font-size:13px; border-bottom: 1px solid rgba(13,27,75,0.05); padding-bottom:4px;">Contact details</div>

              <div class="form-group-landlord">
                <label for="edit-ll-email" style="font-size: 12px; color:#6B7280;">Registered Email</label>
                <input type="email" id="edit-ll-email" class="form-control-landlord" value="${profile.email || ''}" style="width:100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing:border-box; margin-top:4px;" required>
                <span class="form-error" id="error-edit-ll-email"></span>
              </div>

              <div class="form-group-landlord">
                <label for="edit-ll-phone" style="font-size: 12px; color:#6B7280;">Verified Phone Line</label>
                <input type="tel" id="edit-ll-phone" class="form-control-landlord" value="${profile.phone || ''}" style="width:100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing:border-box; margin-top:4px;" required>
                <span class="form-error" id="error-edit-ll-phone"></span>
              </div>

              <div class="form-group-landlord">
                <label for="edit-ll-address" style="font-size: 12px; color:#6B7280;">Business/Residential Address</label>
                <input type="text" id="edit-ll-address" class="form-control-landlord" value="${profile.address || ''}" style="width:100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing:border-box; margin-top:4px;" required>
                <span class="form-error" id="error-edit-ll-address"></span>
              </div>
            </div>
          </div>

          <!-- Language settings -->
          <div style="border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 16px;">
            <div class="form-group-landlord" style="max-width: 250px;">
              <label for="edit-ll-lang" style="font-size: 12px; font-weight:var(--weight-bold); text-transform:uppercase; color:#6B7280;">System Language Preference</label>
              <select id="edit-ll-lang" class="form-control-landlord" style="width:100%; border: 1px solid #D1CDCA; border-radius: var(--radius-sm); padding: 10px; box-sizing:border-box; margin-top:4px; background:white;">
                <option value="English" ${profile.language === 'English' ? 'selected' : ''}>English (Naira Locale)</option>
                <option value="Yoruba" ${profile.language === 'Yoruba' ? 'selected' : ''}>Yoruba</option>
                <option value="Igbo" ${profile.language === 'Igbo' ? 'selected' : ''}>Igbo</option>
                <option value="Hausa" ${profile.language === 'Hausa' ? 'selected' : ''}>Hausa</option>
                <option value="Pidgin" ${profile.language === 'Pidgin' ? 'selected' : ''}>Nigerian Pidgin</option>
              </select>
            </div>
          </div>

          <!-- Buttons -->
          <div style="display: flex; gap: 12px; justify-content: flex-end; border-top: 1px solid rgba(13, 27, 75, 0.05); padding-top: 16px; margin-top: 8px;">
            <button type="button" class="btn btn-outline btn-sm" id="btn-ll-cancel-edit">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm" id="btn-ll-save-profile">Save Changes</button>
          </div>

        </div>
      </form>
    `;
  },

  renderOverviewTab(state) {
    // Calculate stats
    const totalProperties = state.landlordProperties.length;
    let totalUnits = 0;
    let occupiedUnits = 0;
    state.landlordProperties.forEach(p => {
      totalUnits += p.units ? p.units.length : 1;
      occupiedUnits += p.units ? p.units.filter(u => u.status === 'Occupied').length : (p.occupied ? 1 : 0);
    });
    const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
    const vacancyRate = 100 - occupancyRate;
    
    // Revenue calculations (YTD)
    let activeMonthlyRevenue = 0;
    state.landlordProperties.forEach(p => {
      if (p.units) {
        p.units.forEach(u => {
          if (u.status === 'Occupied') {
            activeMonthlyRevenue += Math.round(u.rent / 12);
          }
        });
      } else if (p.occupied) {
        activeMonthlyRevenue += Math.round(p.rent / 12);
      }
    });

    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Filtered lists
    const filterProperty = state.landlordOverviewFilterProperty || 'all';
    const filterStatus = state.landlordOverviewFilterStatus || 'all';
    const searchQuery = state.landlordOverviewSearch || '';

    // Filter recent ledger items or tenant activities
    let activities = [
      { id: 1, date: '2026-06-21', propName: 'Luxury 2 Bed Penthouse Duplex', type: 'Deposit Locked', details: 'Caution deposit locked in Escrow by Osaze Alao', amount: 250000, status: 'Completed' },
      { id: 2, date: '2026-06-20', propName: 'Cozy 1 Bedroom Studio Loft', type: 'Payout Completed', details: 'Mrs. Coker Yaba rent payout cleared', amount: 1200000, status: 'Completed' },
      { id: 3, date: '2026-06-18', propName: 'Executive 3 Bed Serviced Flat', type: 'Inspection Scheduled', details: 'Amara Okafor physical check scheduled', amount: null, status: 'Pending' },
      { id: 4, date: '2026-06-17', propName: 'Luxury 2 Bed Penthouse Duplex', type: 'AI Scoring Passed', details: 'Osaze Alao scored 785 (Grade A)', amount: null, status: 'System' }
    ];

    // Apply filtering
    if (filterProperty !== 'all') {
      const selectedTitle = state.landlordProperties.find(p => p.id === parseInt(filterProperty))?.title || '';
      activities = activities.filter(a => a.propName.includes(selectedTitle));
    }
    if (filterStatus !== 'all') {
      activities = activities.filter(a => a.status.toLowerCase() === filterStatus.toLowerCase());
    }
    if (searchQuery) {
      activities = activities.filter(a => 
        a.propName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        a.details.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return `
      <!-- Stats Summary Row -->
      <div class="landlord-grid">
        <div class="stat-card" id="stat-card-occupancy">
          <div class="stat-header">
            <span class="stat-title">Portfolio Occupancy</span>
            <span style="font-size: 18px; color: var(--color-secondary);">📊</span>
          </div>
          <div class="stat-value">${occupancyRate}%</div>
          <div class="stat-meta">
            <span>${occupiedUnits} of ${totalUnits} Units leased</span>
          </div>
        </div>

        <div class="stat-card revenue" id="stat-card-revenue">
          <div class="stat-header">
            <span class="stat-title">Active Mo. Revenue</span>
            <span style="font-size: 18px; color: var(--color-success);">₦</span>
          </div>
          <div class="stat-value">${formatNaira(activeMonthlyRevenue)}</div>
          <div class="stat-meta">
            <span class="stat-trend up">↑ 8.4%</span>
            <span>from previous month</span>
          </div>
        </div>

        <div class="stat-card vacancy" id="stat-card-vacancy">
          <div class="stat-header">
            <span class="stat-title">Vacancy Rate</span>
            <span style="font-size: 18px; color: var(--color-warning);">🏠</span>
          </div>
          <div class="stat-value">${vacancyRate}%</div>
          <div class="stat-meta">
            <span>${totalUnits - occupiedUnits} active empty units</span>
          </div>
        </div>

        <div class="stat-card pipeline" id="stat-card-pipeline">
          <div class="stat-header">
            <span class="stat-title font-small">Pending Qualifications</span>
            <span style="font-size: 18px; color: var(--color-info);">👥</span>
          </div>
          <div class="stat-value">${state.pipelineApplications.filter(a => a.status === 'Pending Approval').length}</div>
          <div class="stat-meta">
            <span>AI scoring analysis completed</span>
          </div>
        </div>
      </div>

      <!-- Charts Section (Custom SVG Graphics) -->
      <div class="table-card" style="padding: 24px; margin-bottom: 32px;">
        <h3 class="card-title" style="margin-bottom: 8px; font-size: 18px; color: var(--color-primary);">Revenue & Demand Analytics</h3>
        <p class="text-sm text-muted">A dynamic projection showing rental yield index and tenant profile search volume in Haven ecosystem.</p>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 24px;">
          <!-- SVG Bar Chart -->
          <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 16px; border: 1px solid rgba(13,27,75,0.04);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-size:12px; font-weight:var(--weight-bold); color:var(--color-primary);">Rental Yield Index (YTD, in Millions ₦)</span>
              <div style="display:flex; gap:8px;">
                <span style="display:inline-block; width:10px; height:10px; background:var(--color-secondary); border-radius:2px;"></span>
                <span style="font-size:10px; color:#6b7280; margin-top:-2px;">Revenue Stream</span>
              </div>
            </div>
            <div class="chart-container-svg">
              <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                <!-- Grid Lines -->
                <line x1="40" y1="20" x2="580" y2="20" class="chart-grid-line" />
                <line x1="40" y1="60" x2="580" y2="60" class="chart-grid-line" />
                <line x1="40" y1="100" x2="580" y2="100" class="chart-grid-line" />
                <line x1="40" y1="140" x2="580" y2="140" class="chart-grid-line" />
                <line x1="40" y1="170" x2="580" y2="170" class="chart-axis" />
                
                <!-- Bars (Months Jan-Jun) -->
                <!-- Jan (1.2M) -->
                <rect x="75" y="120" width="30" height="50" class="chart-bar" rx="3" />
                <!-- Feb (1.8M) -->
                <rect x="155" y="90" width="30" height="80" class="chart-bar" rx="3" />
                <!-- Mar (2.4M) -->
                <rect x="235" y="70" width="30" height="100" class="chart-bar" rx="3" />
                <!-- Apr (2.8M) -->
                <rect x="315" y="50" width="30" height="120" class="chart-bar" rx="3" />
                <!-- May (3.9M) -->
                <rect x="395" y="30" width="30" height="140" class="chart-bar" rx="3" />
                <!-- Jun (4.8M) -->
                <rect x="475" y="15" width="30" height="155" class="chart-bar" rx="3" />

                <!-- X Axis Labels -->
                <text x="90" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Jan</text>
                <text x="170" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Feb</text>
                <text x="250" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Mar</text>
                <text x="330" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Apr</text>
                <text x="410" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">May</text>
                <text x="490" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Jun</text>

                <!-- Y Axis Labels -->
                <text x="30" y="24" fill="#9CA3AF" font-size="10" text-anchor="end">₦5.0M</text>
                <text x="30" y="64" fill="#9CA3AF" font-size="10" text-anchor="end">₦3.0M</text>
                <text x="30" y="104" fill="#9CA3AF" font-size="10" text-anchor="end">₦1.5M</text>
                <text x="30" y="144" fill="#9CA3AF" font-size="10" text-anchor="end">₦0.5M</text>
              </svg>
            </div>
          </div>
          <!-- Demand and Popularity stats list -->
          <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 16px; border: 1px solid rgba(13,27,75,0.04); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <span style="font-size:12px; font-weight:var(--weight-bold); color:var(--color-primary); display:block; margin-bottom:12px;">Neighborhood Traffic</span>
              <div style="display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                    <span style="font-weight:var(--weight-medium);">Lekki Phase 1</span>
                    <span style="color:var(--color-secondary); font-weight:bold;">94% Demand</span>
                  </div>
                  <div style="background-color:#E5E7EB; height:6px; border-radius:3px; overflow:hidden;">
                    <div style="width:94%; height:100%; background:var(--color-secondary);"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                    <span style="font-weight:var(--weight-medium);">Victoria Island</span>
                    <span style="color:var(--color-secondary); font-weight:bold;">88% Demand</span>
                  </div>
                  <div style="background-color:#E5E7EB; height:6px; border-radius:3px; overflow:hidden;">
                    <div style="width:88%; height:100%; background:var(--color-secondary);"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                    <span style="font-weight:var(--weight-medium);">Yaba Tech Hub</span>
                    <span style="color:var(--color-secondary); font-weight:bold;">82% Demand</span>
                  </div>
                  <div style="background-color:#E5E7EB; height:6px; border-radius:3px; overflow:hidden;">
                    <div style="width:82%; height:100%; background:var(--color-secondary);"></div>
                  </div>
                </div>
              </div>
            </div>
            <div style="border-top:1px solid #E5E7EB; padding-top:12px; margin-top:12px; font-size:11px; color:#6b7280;">
              Total Property Views: <strong style="color:var(--color-primary);">440 leads</strong> this week.
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced Ledger and Activity Filterable Table -->
      <div class="table-card">
        <div class="table-header">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Transaction Activity Ledger</h3>
          <button class="btn btn-outline btn-sm" id="btn-export-csv" style="border-color: #D1D5DB;">💾 Export CSV Statement</button>
        </div>
        <div style="padding: 16px 24px; background-color: #FAF9F6; border-bottom: 1px solid rgba(13, 27, 75, 0.06); display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
          <div class="table-filter-bar">
            <!-- Property filter -->
            <select class="filter-select" id="overview-filter-property">
              <option value="all" ${filterProperty === 'all' ? 'selected' : ''}>All Properties</option>
              ${state.landlordProperties.map(p => `<option value="${p.id}" ${filterProperty === String(p.id) ? 'selected' : ''}>${p.title}</option>`).join('')}
            </select>

            <!-- Status filter -->
            <select class="filter-select" id="overview-filter-status">
              <option value="all" ${filterStatus === 'all' ? 'selected' : ''}>All Statuses</option>
              <option value="completed" ${filterStatus === 'completed' ? 'selected' : ''}>Completed</option>
              <option value="pending" ${filterStatus === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="system" ${filterStatus === 'system' ? 'selected' : ''}>System Log</option>
            </select>
          </div>

          <div class="search-input-wrapper" style="max-width: 280px;">
            <span class="search-input-icon">🔍</span>
            <input type="text" id="overview-search" class="search-input-field" placeholder="Search activities..." value="${searchQuery}">
          </div>
        </div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Property</th>
                <th>Event Type</th>
                <th>Details</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${activities.length > 0 ? activities.map(act => `
                <tr>
                  <td style="white-space: nowrap; color: #6B7280;">${act.date}</td>
                  <td style="font-weight: var(--weight-semibold); color: var(--color-primary);">${act.propName}</td>
                  <td><span class="badge ${act.type.includes('Payout') ? 'badge-success' : act.type.includes('Locked') ? 'badge-info' : 'badge-warning'}">${act.type}</span></td>
                  <td>${act.details}</td>
                  <td style="font-weight: var(--weight-bold);">${act.amount ? formatNaira(act.amount) : '—'}</td>
                  <td><span class="badge ${act.status === 'Completed' ? 'badge-success' : act.status === 'Pending' ? 'badge-warning' : 'badge-info'}">${act.status}</span></td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 48px; color: #9CA3AF;">No activities found matching your filters.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderPropertiesTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US') + '/yr';
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h3 class="card-title" style="font-size: 18px; color: var(--color-primary);">Managed Properties</h3>
        <div style="display: flex; gap: 12px;">
          <button class="btn btn-outline btn-sm" id="btn-open-bulk-modal">📥 Bulk Import Units</button>
          <button class="btn btn-primary btn-sm" id="btn-open-listing-modal">+ Create Listing</button>
        </div>
      </div>

      <div class="property-listings-grid">
        ${state.landlordProperties.map(prop => {
          const totalUnits = prop.units ? prop.units.length : 1;
          const occupiedUnits = prop.units ? prop.units.filter(u => u.status === 'Occupied').length : (prop.occupied ? 1 : 0);
          const vacancies = totalUnits - occupiedUnits;
          const sampleImage = prop.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600';
          const status = prop.status || 'Published';
          let badgeHTML = '';
          if (status === 'Draft') {
            badgeHTML = `<span class="badge property-card-badge" style="background-color: #6B7280; color: white;">Draft</span>`;
          } else if (status === 'Paused') {
            badgeHTML = `<span class="badge property-card-badge" style="background-color: #F59E0B; color: white;">Paused</span>`;
          } else if (status === 'Archived') {
            badgeHTML = `<span class="badge property-card-badge" style="background-color: #1F2937; color: white;">Archived</span>`;
          } else {
            badgeHTML = `<span class="badge ${vacancies > 0 ? 'badge-warning' : 'badge-success'} property-card-badge">${vacancies > 0 ? `${vacancies} Vacant` : 'Fully Leased'}</span>`;
          }

          const amenitiesHTML = prop.amenities && prop.amenities.length > 0 
            ? `<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px;">
                 ${prop.amenities.map(a => `<span style="font-size: 9px; background: rgba(13, 27, 75, 0.05); color: var(--color-primary); padding: 2px 6px; border-radius: 4px; font-weight: bold;">${a}</span>`).join('')}
               </div>`
            : '';

          return `
            <div class="landlord-property-card">
              <div class="property-card-image" style="background-image: url('${sampleImage}');">
                ${badgeHTML}
              </div>
              <div class="property-card-body">
                <h4 class="property-card-title">${prop.title}</h4>
                <p class="text-xs text-muted" style="margin-top: 4px; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">
                  ${prop.description || 'No description provided.'}
                </p>
                <div class="property-card-location" style="margin-bottom: 12px;">
                  <span>📍</span> ${prop.streetAddress ? `${prop.streetAddress}, ` : ''}${prop.location}, ${prop.city}
                </div>

                ${amenitiesHTML}

                <div class="property-card-details">
                  <div class="property-detail-item">
                    <div class="property-detail-label">Base Rent</div>
                    <div class="property-detail-val" style="font-size: 11px;">${formatNaira(prop.rent)}</div>
                  </div>
                  <div class="property-detail-item" style="border-left: 1px solid rgba(13, 27, 75, 0.06); border-right: 1px solid rgba(13, 27, 75, 0.06);">
                    <div class="property-detail-label">Total Units</div>
                    <div class="property-detail-val">${totalUnits}</div>
                  </div>
                  <div class="property-detail-item">
                    <div class="property-detail-label">Occupied</div>
                    <div class="property-detail-val">${occupiedUnits}</div>
                  </div>
                </div>

                <!-- Unit breakdown panel -->
                <div style="background-color: #FAF9F6; border-radius: var(--radius-sm); padding: 12px; margin-bottom: 20px; font-size: 12px;">
                  <div style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 8px; display:flex; justify-content:space-between; align-items:center;">
                    <span>Unit Statuses</span>
                    <span style="font-size:10px; font-weight:normal; color:#6B7280;">Vacancy Tracker</span>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    ${prop.units ? prop.units.map(u => `
                       <div style="display: flex; justify-content: space-between; align-items: center;">
                         <span>🚪 ${u.number} (${u.tenant || 'Vacant'})</span>
                         <span class="badge ${u.status === 'Occupied' ? 'badge-success' : (u.status === 'Maintenance' ? 'badge-error' : 'badge-warning')}" style="font-size: 9px; padding: 2px 6px;">${u.status}</span>
                       </div>
                    `).join('') : `
                       <div style="display: flex; justify-content: space-between; align-items: center;">
                         <span>🚪 General Unit (${prop.tenantName || 'Vacant'})</span>
                         <span class="badge ${prop.occupied ? 'badge-success' : 'badge-warning'}" style="font-size: 9px; padding: 2px 6px;">${prop.occupied ? 'Occupied' : 'Vacant'}</span>
                       </div>
                    `}
                  </div>
                </div>

                <div style="display: flex; gap: 6px; margin-bottom: 8px;">
                  <button class="btn btn-outline btn-sm btn-preview-listing" data-id="${prop.id}" style="flex: 1; padding: 6px 0; font-size: 11px;">Preview</button>
                  <button class="btn btn-outline btn-sm btn-manage-units" data-id="${prop.id}" style="flex: 1; padding: 6px 0; font-size: 11px;">Manage Units</button>
                </div>

                <div class="property-card-actions" style="display: flex; gap: 6px;">
                  <button class="btn btn-outline btn-sm btn-edit-listing" data-id="${prop.id}" style="flex: 1.2; padding: 6px 0; font-size: 11px;">Edit</button>
                  
                  ${status === 'Published' 
                    ? `<button class="btn btn-outline btn-sm btn-pause-listing" data-id="${prop.id}" style="flex: 1; padding: 6px 0; font-size: 11px; color: var(--color-warning); border-color: var(--color-warning);">Pause</button>` 
                    : (status === 'Paused' ? `<button class="btn btn-outline btn-sm btn-resume-listing" data-id="${prop.id}" style="flex: 1; padding: 6px 0; font-size: 11px; color: var(--color-success); border-color: var(--color-success);">Resume</button>` : '')}
                  
                  ${status !== 'Archived' 
                    ? `<button class="btn btn-outline btn-sm btn-archive-listing" data-id="${prop.id}" style="flex: 1; padding: 6px 0; font-size: 11px; color: #4B5563; border-color: #D1CDCA;">Archive</button>` 
                    : `<button class="btn btn-outline btn-sm btn-delete-listing" data-id="${prop.id}" style="flex: 1; padding: 6px 0; font-size: 11px; color: var(--color-error); border-color: var(--color-error);">Delete</button>`}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderApprovalsTab(state) {
    if (state.applicantSearchQuery === undefined) state.applicantSearchQuery = '';
    if (state.applicantFilterStatus === undefined) state.applicantFilterStatus = 'All';
    if (state.applicantSortMatch === undefined) state.applicantSortMatch = 'Highest';

    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Filter pipeline applications
    let filteredApps = [...state.pipelineApplications];

    // Search query matching name or property
    if (state.applicantSearchQuery.trim() !== '') {
      const q = state.applicantSearchQuery.toLowerCase();
      filteredApps = filteredApps.filter(app => 
        app.applicantName.toLowerCase().includes(q) || 
        app.propertyName.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (state.applicantFilterStatus !== 'All') {
      const statusFilter = state.applicantFilterStatus;
      filteredApps = filteredApps.filter(app => {
        if (statusFilter === 'Rejected') return app.status === 'Rejected' || app.status === 'Declined';
        return app.status === statusFilter;
      });
    }

    // Sort order
    if (state.applicantSortMatch === 'Highest') {
      filteredApps.sort((a, b) => b.matchScore - a.matchScore);
    } else {
      filteredApps.sort((a, b) => a.matchScore - b.matchScore);
    }

    // Active selected applicant selection
    const activeAppId = state.activeLandlordApplicantId || (filteredApps[0]?.id || null);
    const selectedApp = state.pipelineApplications.find(a => a.id === activeAppId);

    return `
      <div class="two-panel-layout">
        <!-- Left Panel: Applicants Queue -->
        <div class="sidebar-panel" style="display:flex; flex-direction:column; gap:16px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin: 0;">Applicants Pipeline</h3>
          
          <!-- Search & Filters Block -->
          <div style="background: #FAF9F6; border: 1px solid rgba(13,27,75,0.06); padding: 12px; border-radius: var(--radius-sm); display: flex; flex-direction: column; gap: 8px;">
            <input type="text" id="search-applicants" class="form-control-landlord" placeholder="Search name or property..." value="${state.applicantSearchQuery}" style="padding: 8px; font-size: 12px; background: white;">
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <select id="filter-app-status" class="form-control-landlord" style="padding: 6px; font-size: 11px; background: white; height: auto;">
                <option value="All" ${state.applicantFilterStatus === 'All' ? 'selected' : ''}>All Statuses</option>
                <option value="Pending Approval" ${state.applicantFilterStatus === 'Pending Approval' ? 'selected' : ''}>Pending</option>
                <option value="Approved" ${state.applicantFilterStatus === 'Approved' ? 'selected' : ''}>Approved</option>
                <option value="Rejected" ${state.applicantFilterStatus === 'Rejected' ? 'selected' : ''}>Declined</option>
              </select>
              <select id="sort-app-match" class="form-control-landlord" style="padding: 6px; font-size: 11px; background: white; height: auto;">
                <option value="Highest" ${state.applicantSortMatch === 'Highest' ? 'selected' : ''}>Highest Match</option>
                <option value="Lowest" ${state.applicantSortMatch === 'Lowest' ? 'selected' : ''}>Lowest Match</option>
              </select>
            </div>
          </div>

          <!-- Applicants List -->
          <div style="display: flex; flex-direction: column; gap: 12px; overflow-y: auto; max-height: 58vh;">
            ${filteredApps.length === 0 ? `
              <div style="text-align: center; color: #9CA3AF; font-size:12px; padding: 24px 0;">No matching applicants found.</div>
            ` : filteredApps.map(app => {
              const isActive = app.id === activeAppId;
              let scoreColor = 'var(--color-success)';
              if (app.matchScore < 75) scoreColor = 'var(--color-warning)';
              if (app.matchScore < 60) scoreColor = 'var(--color-error)';

              return `
                <div class="applicant-card ${isActive ? 'active' : ''}" data-id="${app.id}">
                  <div class="applicant-header">
                    <div>
                      <div class="applicant-name">${app.applicantName}</div>
                      <div class="text-sm text-muted" style="margin-top: 2px;">For: ${app.propertyName}</div>
                    </div>
                    <span class="applicant-match-pill" style="background-color: ${scoreColor}; color: white;">${app.matchScore}% Match</span>
                  </div>
                  
                  <div class="insight-metric-grid">
                    <div class="insight-metric">
                      <div class="insight-label">Risk</div>
                      <div class="insight-value" style="color: ${app.riskScore.includes('High') ? 'var(--color-error)' : app.riskScore.includes('Medium') ? 'var(--color-warning)' : 'var(--color-success)'};">${app.riskScore.split(' ')[0]}</div>
                    </div>
                    <div class="insight-metric" style="border-left:1px solid #E5E7EB; border-right:1px solid #E5E7EB;">
                      <div class="insight-label">Score</div>
                      <div class="insight-value">${app.details.score}</div>
                    </div>
                    <div class="insight-metric">
                      <div class="insight-label">Status</div>
                      <div class="insight-value" style="font-size:9px; color: ${app.status === 'Approved' ? 'var(--color-success)' : (app.status === 'Rejected' || app.status === 'Declined' ? 'var(--color-error)' : 'var(--color-primary)')};">${app.status}</div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Right Panel: AI Recommendation & Qualifications Details -->
        <div class="main-content-panel">
          ${selectedApp ? `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 20px; margin-bottom: 24px;">
              <div>
                <h2 class="card-title" style="color: var(--color-primary); margin:0;">${selectedApp.applicantName}</h2>
                <p class="text-sm text-muted" style="margin-top: 4px; margin-bottom:0;">Applying for <strong>${selectedApp.propertyName}</strong></p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 28px; font-weight: var(--weight-bold); color: var(--color-secondary); line-height:1.2;">${selectedApp.matchScore}<span style="font-size: 14px; font-weight: normal; color: #6B7280;">/100</span></div>
                <div style="font-size: 10px; text-transform: uppercase; color: #9CA3AF; font-weight: var(--weight-bold);">Overall AI Match Score</div>
              </div>
            </div>

            <!-- AI Compatibility & Matching Breakdown (Milestone 13) -->
            <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 20px; border: 1px solid rgba(13,27,75,0.06); margin-bottom: 24px;">
              <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 12px; display:flex; align-items:center; gap:8px; margin-top:0;">
                <span>🤖</span> AI Compatibility Matching Breakdown
              </h3>
              
              <!-- 4 Match Indicators Grid -->
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px;">
                <div style="background: white; padding: 10px; border-radius: var(--radius-sm); border:1px solid rgba(13,27,75,0.04);">
                  <div style="font-size: 9px; color: #9CA3AF; font-weight: var(--weight-bold); text-transform: uppercase; margin-bottom: 4px;">Budget Match</div>
                  <div style="font-size: 12px; font-weight: var(--weight-bold); color: var(--color-primary);">${selectedApp.aiMatching?.budgetMatch || 'N/A'}</div>
                </div>
                <div style="background: white; padding: 10px; border-radius: var(--radius-sm); border:1px solid rgba(13,27,75,0.04);">
                  <div style="font-size: 9px; color: #9CA3AF; font-weight: var(--weight-bold); text-transform: uppercase; margin-bottom: 4px;">Income Match</div>
                  <div style="font-size: 12px; font-weight: var(--weight-bold); color: var(--color-primary);">${selectedApp.aiMatching?.incomeMatch || 'N/A'}</div>
                </div>
                <div style="background: white; padding: 10px; border-radius: var(--radius-sm); border:1px solid rgba(13,27,75,0.04);">
                  <div style="font-size: 9px; color: #9CA3AF; font-weight: var(--weight-bold); text-transform: uppercase; margin-bottom: 4px;">Location Match</div>
                  <div style="font-size: 12px; font-weight: var(--weight-bold); color: var(--color-primary);">${selectedApp.aiMatching?.locationMatch || 'N/A'}</div>
                </div>
                <div style="background: white; padding: 10px; border-radius: var(--radius-sm); border:1px solid rgba(13,27,75,0.04);">
                  <div style="font-size: 9px; color: #9CA3AF; font-weight: var(--weight-bold); text-transform: uppercase; margin-bottom: 4px;">Lifestyle Match</div>
                  <div style="font-size: 12px; font-weight: var(--weight-bold); color: var(--color-primary);">${selectedApp.aiMatching?.lifestyleMatch || 'N/A'}</div>
                </div>
              </div>

              <div style="font-size: 12px; line-height: 1.5; color: var(--color-black); margin-bottom: 12px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 10px;">
                <strong>Recommendation Summary:</strong> ${selectedApp.aiMatching?.summary || 'No summary available.'}
              </div>

              <div style="font-size: 11px; color: #4B5563;">
                <strong>Match Explanation details:</strong>
                <ul style="margin: 4px 0 0 16px; padding: 0; display:flex; flex-direction:column; gap:4px;">
                  ${(selectedApp.aiMatching?.explanations || []).map(exp => `<li>${exp}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- Tenant Screening (Milestone 14) -->
            <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 16px; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 8px; margin-top: 24px;">Tenant Background Screening</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px;">
              <div>
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 10px; color:#9CA3AF; text-transform:uppercase; font-weight:bold; display:block;">Employment Verification</span>
                  <span style="font-size: 12px; font-weight:bold; color:var(--color-primary);">${selectedApp.screening?.employmentCheck || 'N/A'}</span>
                </div>
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 10px; color:#9CA3AF; text-transform:uppercase; font-weight:bold; display:block;">Rental History & References</span>
                  <span style="font-size: 12px; color: #4B5563; line-height:1.4; display:block;">${selectedApp.screening?.rentalHistory || 'N/A'}</span>
                </div>
                <div>
                  <span style="font-size: 10px; color:#9CA3AF; text-transform:uppercase; font-weight:bold; display:block;">Listed References</span>
                  <span style="font-size: 12px; color: #4B5563; display:block;">📞 ${selectedApp.screening?.references || 'N/A'}</span>
                </div>
              </div>
              <div>
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 10px; color:#9CA3AF; text-transform:uppercase; font-weight:bold; display:block;">Credit Score & Profile</span>
                  <span style="font-size: 12px; font-weight:bold; color:var(--color-success); display:block;">Score: ${selectedApp.screening?.creditScore || 600} (Credit rating assessed)</span>
                </div>
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 10px; color:#9CA3AF; text-transform:uppercase; font-weight:bold; display:block;">Risk Indicators</span>
                  <span style="font-size: 12px; color: ${selectedApp.screening?.riskIndicators?.includes('No evictions') ? 'var(--color-success)' : '#EF4444'}; font-weight:bold; display:block;">⚠️ ${selectedApp.screening?.riskIndicators || 'Low Risk Profile'}</span>
                </div>
                <div style="margin-bottom: 10px;">
                  <span style="font-size: 10px; color:#9CA3AF; text-transform:uppercase; font-weight:bold; display:block;">NIN / BVN Verification Status</span>
                  <span style="font-size: 12px; color:var(--color-success); font-weight:bold; display:block;">✓ NIMC cleared matches • BVN matched</span>
                </div>
              </div>
            </div>

            <!-- Application Timeline (Milestone 12) -->
            <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 16px; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 8px; margin-top: 24px;">Application Timeline</h3>
            <div style="position: relative; padding-left: 20px; border-left: 2px solid rgba(13,27,75,0.08); margin-bottom: 24px; margin-left: 8px;">
              ${(selectedApp.timeline || []).map(t => {
                const markerBg = t.done ? 'var(--color-secondary)' : '#E5E7EB';
                const textColor = t.done ? 'var(--color-primary)' : '#9CA3AF';
                return `
                  <div style="position: relative; margin-bottom: 14px;">
                    <div style="position: absolute; left: -26px; top: 3px; width: 10px; height: 10px; border-radius:50%; background: ${markerBg}; border: 2px solid white; box-shadow:0 0 0 1px rgba(0,0,0,0.1);"></div>
                    <strong style="font-size: 12px; color: ${textColor}; display:block;">${t.step}</strong>
                    <span style="font-size: 10px; color: #9CA3AF;">${t.date}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Decision Box & Notes -->
            <div style="border-top: 1px solid rgba(13,27,75,0.06); padding-top: 24px;">
              <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 12px; margin-top:0;">Approve or Decline Tenancy Application</h3>
              <p class="text-sm text-muted" style="margin-bottom: 16px;">Approving will lock terms and prompt the tenant to fund the Escrow Vault.</p>
              
              <div class="form-group-landlord">
                <label for="approval-comments">Landlord Internal Notes & Comments</label>
                <textarea id="approval-comments" class="form-control-landlord" rows="3" placeholder="Write any lease clauses or check-in instructions for the tenant...">${selectedApp.screening?.internalNotes || ''}</textarea>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                <button type="button" class="btn btn-outline btn-xs btn-save-internal-notes" data-id="${selectedApp.id}">Save Notes</button>
                <div style="display: flex; gap: 12px;">
                  ${selectedApp.status === 'Pending Approval' ? `
                    <button class="btn btn-outline btn-sm btn-decline-application" data-id="${selectedApp.id}" style="border-color: var(--color-error); color: var(--color-error);">Decline Application</button>
                    <button class="btn btn-primary btn-sm btn-approve-application" data-id="${selectedApp.id}">Approve Tenancy</button>
                  ` : `
                    <div class="badge ${selectedApp.status === 'Approved' ? 'badge-success' : 'badge-error'}" style="padding: 8px 16px; font-size: 12px; font-weight:bold;">
                      Application ${selectedApp.status}
                    </div>
                  `}
                </div>
              </div>
            </div>
          ` : `
            <div style="text-align: center; padding: 80px 24px; color: #9CA3AF;">
              <h3>No Applicants In Pipeline</h3>
              <p class="text-sm" style="margin-top: 8px;">Create property listings to start receiving qualified tenant profiles.</p>
            </div>
          `}
        </div>
      </div>
    `;
  },

  renderEscrowTab(state) {
    const selectedEscrowId = state.landlordSelectedReadinessEscrowId || (state.landlordEscrows?.[0]?.id || 1);
    const esc = state.landlordEscrows?.find(e => e.id === selectedEscrowId) || state.landlordEscrows?.[0];
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    let readinessCheckedCount = 0;
    let isReady = false;
    if (esc) {
      readinessCheckedCount = Object.values(esc.readinessChecklist || {}).filter(Boolean).length;
      if (esc.prepaidMeter) readinessCheckedCount += 1;
      if (esc.waterChecked) readinessCheckedCount += 1;
      if (esc.inspectionCleared) readinessCheckedCount += 1;
      if (esc.cleaningCleared) readinessCheckedCount += 1;
      isReady = readinessCheckedCount === 8;
    }

    return `
      <!-- Escrow status monitoring header -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 16px; margin-bottom: 24px;">
        <div>
          <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin:0;">Protected Escrow & Move-in Readiness</h3>
          <p class="text-sm text-muted" style="margin-top: 4px; margin-bottom:0;">CBN Trust-compliant protected holdings & physical readiness validations.</p>
        </div>

        <div style="display:flex; align-items:center; gap:8px;">
          <label for="checklist-prop-select" class="text-xs font-semibold" style="white-space:nowrap; color: var(--color-primary);">Active Tenancy:</label>
          <select id="checklist-prop-select" class="form-control-landlord" style="padding: 6px 12px; font-size:12px; height:auto; width:220px; background:white;">
            ${(state.landlordEscrows || []).map(e => `<option value="${e.id}" ${e.id === selectedEscrowId ? 'selected' : ''}>${e.propertyName}</option>`).join('')}
          </select>
        </div>
      </div>

      ${esc ? `
        <!-- Protect Summary stats grid -->
        <div class="form-grid-3" style="margin-bottom: 24px;">
          <div class="card" style="padding: 16px; border-left: 4px solid var(--color-secondary);">
            <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">Caution Protection Hold</div>
            <div style="font-size: 20px; font-weight: bold; color: var(--color-primary);">${formatNaira(esc.cautionAmount)}</div>
            <div style="font-size: 10px; color: var(--color-success); font-weight:bold; margin-top:4px;">✓ Safe-Lock Protection Active</div>
          </div>
          <div class="card" style="padding: 16px; border-left: 4px solid var(--color-primary);">
            <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">Rent Advance Locked</div>
            <div style="font-size: 20px; font-weight: bold; color: var(--color-primary);">${formatNaira(esc.rentAmount)}</div>
            <div style="font-size: 10px; color: ${esc.status === 'Released' ? 'var(--color-success)' : 'var(--color-secondary)'}; font-weight:bold; margin-top:4px;">
              ${esc.status === 'Released' ? '✓ Disbursed to Landlord Bank' : '⏳ Locked pending readiness checks'}
            </div>
          </div>
          <div class="card" style="padding: 16px; border-left: 4px solid ${esc.status === 'Released' ? 'var(--color-success)' : 'var(--color-secondary)'};">
            <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">Escrow Status</div>
            <div style="font-size: 20px; font-weight: bold; color: ${esc.status === 'Released' ? 'var(--color-success)' : 'var(--color-secondary)'};">${esc.status}</div>
            <div style="font-size: 10px; color: #6B7280; margin-top:4px;">Tenant: <strong>${esc.tenantName}</strong></div>
          </div>
        </div>

        <!-- Escrow Stepper Timeline (Milestone 17) & Check-in Token -->
        <div class="form-grid-2" style="grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;">
          <!-- Escrow Stepper -->
          <div class="card" style="padding:20px;">
            <h4 style="font-size: 13px; color:var(--color-primary); font-weight:bold; margin-top:0; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
              <span>📊</span> Protection Escrow Milestones
            </h4>
            
            <div style="display:flex; justify-content:space-between; position:relative; margin-bottom:8px;">
              <!-- Horizontal line connector -->
              <div style="position:absolute; top: 12px; left: 10px; right: 10px; height: 2px; background: rgba(0,0,0,0.06); z-index:1;"></div>
              
              ${esc.timeline.map((step, idx) => {
                const isStepDone = step.done;
                const dotColor = isStepDone ? 'var(--color-secondary)' : '#E5E7EB';
                const labelColor = isStepDone ? 'var(--color-primary)' : '#9CA3AF';
                return `
                  <div style="display:flex; flex-direction:column; align-items:center; position:relative; z-index:2; width: 18%; text-align:center;">
                    <div style="width: 24px; height: 24px; border-radius:50%; background: ${dotColor}; border: 3px solid white; box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:center; justify-content:center; font-size:10px; color:white; font-weight:bold;">
                      ${isStepDone ? '✓' : idx + 1}
                    </div>
                    <span style="font-size:9px; font-weight:bold; color: ${labelColor}; margin-top: 8px; line-height:1.2; display:block;">${step.label}</span>
                    <span style="font-size:8px; color: #9CA3AF; margin-top:2px;">${step.date}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Move-in Approval Token Display (Milestone 18) -->
          <div class="card" style="padding:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; border: 1px dashed rgba(26,122,138,0.3); background: rgba(26,122,138,0.02);">
            <h4 style="font-size:11px; color:#9CA3AF; text-transform:uppercase; font-weight:bold; margin-top:0; margin-bottom:8px;">Occupancy Check-in Token</h4>
            ${esc.status === 'Released' ? `
              <div style="font-family: monospace; font-size:16px; font-weight:bold; color: var(--color-success); background: #E6F4EA; padding: 8px 16px; border-radius:var(--radius-sm); border:1px solid rgba(52,168,83,0.2); letter-spacing:1px; margin-bottom:8px;">
                ${esc.moveInToken}
              </div>
              <span style="font-size: 10px; color: var(--color-success); font-weight:bold;">✓ Occupancy Released & Approved</span>
            ` : `
              <div style="font-family: monospace; font-size:13px; font-weight:bold; color: #9CA3AF; background: #F3F4F6; padding: 8px 12px; border-radius:var(--radius-sm); border:1px solid #E5E7EB; margin-bottom:8px;">
                [Locked]
              </div>
              <span style="font-size: 9px; color:#6B7280;">Complete all 8 checklists below and select "Release Funds" to generate code.</span>
            `}
          </div>
        </div>

        <!-- Split Panel: Move-In Readiness Checklist (Milestone 18) vs Dispute Claim Center -->
        <div class="form-grid-2" style="margin-bottom: 32px;">
          <!-- Move-In Readiness Checklist -->
          <div class="card" style="padding: 24px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 16px;">
              <div>
                <h3 class="card-title" style="font-size: 15px; color: var(--color-primary); margin:0;">Move-In Readiness & Utility Signoff</h3>
                <p class="text-xs text-muted" style="margin-top:2px; margin-bottom:0;">Confirm utility numbers and inspect flat baselines.</p>
              </div>
              <span class="badge ${isReady ? 'badge-success' : 'badge-outline'}" style="font-size:10px;">${readinessCheckedCount}/8 Completed</span>
            </div>

            <!-- Part A: Physical Baseline checklist -->
            <div style="margin-bottom:16px;">
              <h4 style="font-size:11px; color: var(--color-primary); text-transform:uppercase; font-weight:bold; margin-top:0; margin-bottom:8px; border-bottom:1px solid #F3F4F6; padding-bottom:4px;">1. Physical Baseline Checklists</h4>
              <ul class="readiness-list" style="padding:0; margin:0; list-style:none; display:flex; flex-direction:column; gap:8px;">
                ${this.renderReadinessItems(state)}
              </ul>
            </div>

            <!-- Part B: Utilities & Sanitation Signoffs -->
            <div>
              <h4 style="font-size:11px; color: var(--color-primary); text-transform:uppercase; font-weight:bold; margin-top:0; margin-bottom:8px; border-bottom:1px solid #F3F4F6; padding-bottom:4px;">2. Utilities & Certifications</h4>
              
              <div style="display:flex; flex-direction:column; gap:10px;">
                <!-- Prepaid Meter ID (Milestone 18) -->
                <div>
                  <label for="prepaid-meter-input" style="font-size: 11px; color:#4B5563; font-weight:bold; display:block; margin-bottom:4px;">Prepaid Electricity Meter ID</label>
                  <div style="display:flex; gap:8px;">
                    <input type="text" id="prepaid-meter-input" class="form-control-landlord" value="${esc.prepaidMeter || ''}" placeholder="e.g. 042-8921-098" style="padding: 6px; font-size:12px;" ${esc.status === 'Released' ? 'readonly' : ''}>
                    <button type="button" class="btn btn-outline btn-xs" id="btn-save-meter-id" data-id="${esc.id}" ${esc.status === 'Released' ? 'disabled' : ''}>Save</button>
                  </div>
                </div>

                <!-- Water & Cleanliness checkboxes -->
                <div style="display:flex; flex-direction:column; gap:8px; margin-top:4px;">
                  <label style="display:flex; align-items:center; gap:6px; font-size:11px; cursor:pointer;">
                    <input type="checkbox" id="chk-water-confirm" ${esc.waterChecked ? 'checked' : ''} ${esc.status === 'Released' ? 'disabled' : ''} data-id="${esc.id}">
                    <span>Water pump checked & water pressure functional</span>
                  </label>
                  <label style="display:flex; align-items:center; gap:6px; font-size:11px; cursor:pointer;">
                    <input type="checkbox" id="chk-inspection-confirm" ${esc.inspectionCleared ? 'checked' : ''} ${esc.status === 'Released' ? 'disabled' : ''} data-id="${esc.id}">
                    <span>Structural wall baseline inspection cleared</span>
                  </label>
                  <label style="display:flex; align-items:center; gap:6px; font-size:11px; cursor:pointer;">
                    <input type="checkbox" id="chk-clean-confirm" ${esc.cleaningCleared ? 'checked' : ''} ${esc.status === 'Released' ? 'disabled' : ''} data-id="${esc.id}">
                    <span>Deep cleaning & sanitation certificate issued</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Disbursement Release Trigger -->
            <div style="margin-top:20px; border-top:1px solid #F3F4F6; padding-top:16px; display:flex; justify-content:flex-end;">
              ${esc.status === 'Funded' ? `
                <button class="btn btn-primary btn-sm btn-trigger-release" data-id="${esc.id}" ${!isReady ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''} style="padding: 10px 20px;">
                  ${isReady ? '⚡ Approve Occupancy & Release Rent' : `Complete Checks (${readinessCheckedCount}/8) to Disburse`}
                </button>
              ` : `
                <div style="color:var(--color-success); font-weight:bold; font-size:12px; display:flex; align-items:center; gap:6px;">
                  <span>✓</span> Tenancy Active • Funds released to your bank account.
                </div>
              `}
            </div>
          </div>

          <!-- Dispute Claims desk -->
          <div class="card" style="padding: 24px; border-color: rgba(239,68,68,0.2);">
            <h3 class="card-title" style="font-size: 15px; color: var(--color-error); margin-bottom: 8px;">Dispute Claims Center</h3>
            <p class="text-xs text-muted" style="margin-bottom: 20px;">CBN compliant arbitration desk for caution deductions, wear-and-tear logs, or rent holds.</p>

            ${state.landlordDisputes.length > 0 ? state.landlordDisputes.map(disp => `
              <div style="background-color: var(--color-error-bg); padding: 16px; border-radius: var(--radius-md); border: 1px solid rgba(239, 68, 68, 0.2); margin-bottom: 16px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                  <strong style="font-size:12px; color:var(--color-primary);">${disp.propertyName}</strong>
                  <span class="badge badge-error" style="font-size:9px;">${disp.status}</span>
                </div>
                <p class="text-xs text-muted" style="margin-bottom: 10px;">Tenant: <strong>${disp.tenantName}</strong> | Disputed Amount: <strong>${formatNaira(disp.cautionAmount)}</strong></p>
                
                <div style="font-size:11px; color:var(--color-black); margin-bottom:12px; background:white; padding:8px; border-radius:4px; border:1px solid rgba(0,0,0,0.05); line-height:1.4;">
                  <strong>Incident Summary:</strong> ${disp.reason}
                </div>

                ${disp.landlordDefense ? `
                  <div style="font-size:11px; color:var(--color-secondary); background:rgba(26,122,138,0.05); padding:8px; border-radius:4px; border:1px solid rgba(26,122,138,0.1);">
                    <strong>Your Defense Statement:</strong> ${disp.landlordDefense}
                  </div>
                ` : `
                  <div class="form-group-landlord" style="margin-bottom: 12px;">
                    <label for="dispute-defense-${disp.id}" style="font-size: 10px;">Your Response / Proof Statement</label>
                    <textarea id="dispute-defense-${disp.id}" class="form-control-landlord" rows="2" style="font-size:11px;" placeholder="Upload utility logs, paint purchase receipts or pictures to support claim..."></textarea>
                  </div>
                  <button class="btn btn-secondary btn-sm btn-submit-defense" data-id="${disp.id}" style="width: 100%; padding: 8px 0; font-size:11px;">Submit Defense Evidence</button>
                `}
              </div>
            `).join('') : `
              <div style="text-align: center; padding: 48px; color: #9CA3AF;">
                <p style="font-size: 12px;">No active dispute files. Your portfolio is fully compliant.</p>
              </div>
            `}
          </div>
        </div>

        <!-- Escrow Protection Transaction Ledger (Milestone 17) -->
        <div class="card" style="padding:24px;">
          <h3 class="card-title" style="font-size: 15px; color: var(--color-primary); margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
            <span>🧾</span> Protected Escrow Transaction Ledger
          </h3>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Reference API</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${esc.transactions.map(tx => `
                  <tr>
                    <td style="font-family:monospace; font-weight:bold; font-size:11px;">${tx.id}</td>
                    <td style="font-size:11px; color:#6B7280;">${tx.date}</td>
                    <td>
                      <span class="badge ${tx.type.includes('Credit') ? 'badge-info' : 'badge-success'}" style="font-size:9px; padding:2px 6px;">
                        ${tx.type}
                      </span>
                    </td>
                    <td style="font-size:11px; font-weight:500;">${tx.desc}</td>
                    <td style="font-size:10px; color:#9CA3AF; font-family:monospace;">${tx.ref}</td>
                    <td style="font-weight:bold; font-size:12px; color: ${tx.type.includes('Credit') ? 'var(--color-primary)' : 'var(--color-success)'};">
                      ${tx.type.includes('Credit') ? '+' : '-'}${formatNaira(tx.amount)}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : `
        <div class="card" style="text-align:center; padding:80px 24px; color:#9CA3AF;">
          <h3>No Protective Escrows Found</h3>
          <p class="text-sm">Approve applications to start tracking protection deposits.</p>
        </div>
      `}
    `;
  },

  renderReadinessItems(state) {
    const selectedEscrowId = state.landlordSelectedReadinessEscrowId || (state.landlordEscrows[0]?.id || null);
    const escrow = state.landlordEscrows.find(e => e.id === selectedEscrowId);
    if (!escrow) return `<div style="padding:16px; color:#9CA3AF; text-align:center;">No checklist available.</div>`;

    const checklist = escrow.readinessChecklist;

    const items = [
      { key: 'painted', label: 'Walls freshly painted & baseline wall checks disinfected' },
      { key: 'clean', label: 'Deep cleaning and baseline sanitation completed' },
      { key: 'electricity', label: 'Electricity grid, AC switches & DB board certified' },
      { key: 'water', label: 'Water treatment pumps & plumbing baseline functional' }
    ];

    return items.map(item => {
      const isChecked = checklist[item.key];
      return `
        <li class="readiness-item" data-escrow="${escrow.id}" data-key="${item.key}">
          <div class="readiness-checkbox ${isChecked ? 'checked' : ''}" style="flex-shrink:0;"></div>
          <span class="readiness-text" style="text-decoration: ${isChecked ? 'line-through' : 'none'}; color: ${isChecked ? '#9CA3AF' : 'var(--color-black)'}; font-size:12px;">${item.label}</span>
        </li>
      `;
    }).join('');
  },

  renderRenewalsTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Filter occupied properties
    const occupiedProps = state.landlordProperties.filter(p => p.occupied);

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 16px; margin-bottom: 24px;">
        <div>
          <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin:0;">Lease Renewal & Vacancy Lifecycle</h3>
          <p class="text-sm text-muted" style="margin-top: 4px; margin-bottom:0;">Send renewal proposals, manage vacancies, inspect checking-out flats, and re-list vacant units.</p>
        </div>
      </div>

      <!-- Expiry Warning Notification Banner -->
      <div style="background-color: rgba(245,158,11,0.06); border-left: 4px solid #F59E0B; padding:16px; border-radius:var(--radius-sm); margin-bottom:24px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:#B45309; font-size:13px; display:block;">⚠️ Upcoming Lease Expiry Alert</strong>
          <span style="font-size:11px; color:#D97706;">The lease for <strong>Osaze Alao</strong> at <em>Luxury 2 Bed Penthouse</em> expires in 48 days. Standard regulatory notice period holds.</span>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-quick-notify-expiry" style="background:#F59E0B; border:none; padding:6px 12px; font-size:11px; color:white;">Send Reminder</button>
      </div>

      <div class="form-grid-2" style="align-items: flex-start; gap: 24px; margin-bottom: 32px;">
        <!-- Renewal offers proposal desk -->
        <div class="card" style="padding:20px;">
          <h4 style="font-size:13px; color:var(--color-primary); font-weight:bold; margin-top:0; margin-bottom:12px;">Active Renewal Proposals</h4>
          
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Tenant</th>
                  <th>Proposal</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${occupiedProps.map(prop => {
                  const formatExpiry = prop.leaseEnd ? prop.leaseEnd : '2026-08-30';
                  const currentStatus = prop.renewalStatus || 'Pending Review';

                  return `
                    <tr>
                      <td style="font-weight: var(--weight-semibold); color: var(--color-primary); font-size:11px;">${prop.title}</td>
                      <td style="font-size:11px;">${prop.tenantName || 'Osaze Alao'}</td>
                      <td style="font-size:11px; font-weight:bold;">
                        ${prop.proposedRent ? `${prop.incrementPercent}% inc (${formatNaira(prop.proposedRent)})` : 'None proposed'}
                      </td>
                      <td>
                        <span class="badge ${currentStatus === 'Pending Review' ? 'badge-warning' : currentStatus === 'Accepted' ? 'badge-success' : 'badge-info'}" style="font-size:9px; padding:2px 6px;">
                          ${currentStatus}
                        </span>
                      </td>
                      <td>
                        ${currentStatus === 'Pending Review' ? `
                          <div style="display:flex; align-items:center; gap:6px;">
                            <input type="number" class="form-control-landlord input-increment" data-id="${prop.id}" data-rent="${prop.rent}" value="10" min="0" max="50" style="padding: 4px; font-size:10px; width:45px; text-align:center; height:auto;">
                            <button class="btn btn-secondary btn-xs btn-propose-renewal" data-id="${prop.id}">Send Offer</button>
                          </div>
                        ` : `
                          <span style="font-size:10px; color:#6B7280;">No action required</span>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Exit Checklists & Vacancies desk (Milestone 20) -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size:13px; color:var(--color-primary); font-weight:bold; margin-top:0; margin-bottom:8px;">Exit Checklist & Vacancy Workflow</h4>
          <p class="text-xs text-muted" style="margin-bottom:16px;">Approve tenant check-outs and release/claim caution funds before re-listing units.</p>
          
          <div style="margin-bottom: 12px;">
            <label style="font-size:11px; font-weight:bold; display:block; margin-bottom:4px;">Select Checking-out Property</label>
            <select id="exit-prop-select" class="form-control-landlord" style="padding: 6px; font-size:12px; height:auto; background:white;">
              ${occupiedProps.map(p => `<option value="${p.id}">${p.title} (${p.tenantName})</option>`).join('')}
            </select>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
            <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
              <input type="checkbox" id="chk-exit-paint" checked>
              <span>Drywall paint & structural fixtures checked for damages</span>
            </label>
            <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
              <input type="checkbox" id="chk-exit-keys">
              <span>Keys, prepaid meter cards, and access badges returned</span>
            </label>
            <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
              <input type="checkbox" id="chk-exit-utilities">
              <span>Tenant utility, water, and grid bills verified settled</span>
            </label>
            <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
              <input type="checkbox" id="chk-exit-sanitation">
              <span>Post-tenancy cleaning verification completed</span>
            </label>
          </div>

          <button type="button" class="btn btn-primary btn-sm" id="btn-execute-exit" style="width:100%;">⚡ Clear Exit & Re-List Property</button>
        </div>
      </div>
    `;
  },

  renderLeasingTab(state) {
    if (state.activeLandlordLeaseId === undefined) {
      state.activeLandlordLeaseId = state.landlordLeases?.[0]?.id || 1;
    }
    const activeLeaseId = state.activeLandlordLeaseId;
    const activeLease = state.landlordLeases?.find(l => l.id === activeLeaseId);

    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    return `
      <div class="two-panel-layout">
        <!-- Left Panel: Agreements Queue -->
        <div class="sidebar-panel" style="display:flex; flex-direction:column; gap:16px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin: 0;">Lease Agreements</h3>
          
          <div style="display: flex; flex-direction: column; gap: 12px; overflow-y: auto; max-height: 62vh;">
            ${(state.landlordLeases || []).map(lease => {
              const isActive = lease.id === activeLeaseId;
              let statusBadgeClass = 'badge-info';
              if (lease.status === 'Drafting') statusBadgeClass = 'badge-outline';
              if (lease.status === 'Fully Executed') statusBadgeClass = 'badge-success';

              return `
                <div class="applicant-card ${isActive ? 'active' : ''} lease-queue-card" data-id="${lease.id}" style="cursor: pointer;">
                  <div class="applicant-header">
                    <div>
                      <div class="applicant-name" style="font-size: 13px;">${lease.tenantName}</div>
                      <div class="text-sm text-muted" style="margin-top: 2px; font-size: 11px;">${lease.propertyName}</div>
                    </div>
                    <span class="badge ${statusBadgeClass}" style="font-size: 9px; padding: 2px 6px;">${lease.status}</span>
                  </div>
                  
                  <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #4B5563;">
                    <span>Rent: <strong>${formatNaira(lease.rentAmount)}</strong></span>
                    <span>Dur: <strong>${lease.leaseDuration}</strong></span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Right Panel: Editor & Signature Center -->
        <div class="main-content-panel">
          ${activeLease ? `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 16px; margin-bottom: 20px;">
              <div>
                <h2 class="card-title" style="color: var(--color-primary); margin:0;">Lease Agreement for ${activeLease.tenantName}</h2>
                <p class="text-sm text-muted" style="margin-top: 4px; margin-bottom:0;">Property: <strong>${activeLease.propertyName}</strong> • Status: <strong>${activeLease.status}</strong></p>
              </div>
              <div style="display:flex; gap:8px;">
                <button type="button" class="btn btn-outline btn-sm" id="btn-export-lease-pdf">📄 Export PDF</button>
              </div>
            </div>

            <!-- Milestone 15: Lease Templates & AI Generator -->
            <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 16px; border: 1px solid rgba(13,27,75,0.06); margin-bottom: 20px;">
              <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 12px; margin-top:0; display:flex; align-items:center; gap:8px;">
                <span>📜</span> Lease Drafting & AI Generator
              </h3>
              
              <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px; align-items: flex-end; margin-bottom: 12px;">
                <div>
                  <label for="lease-template-select" style="font-size: 11px; font-weight: bold; color: #4B5563; display:block; margin-bottom:4px;">Select Template</label>
                  <select id="lease-template-select" class="form-control-landlord" style="background: white; padding: 8px; font-size:12px; height:auto;">
                    <option value="Standard Residential Lease" ${activeLease.template === 'Standard Residential Lease' ? 'selected' : ''}>Standard Residential Lease</option>
                    <option value="Corporate Apartment Tenancy" ${activeLease.template === 'Corporate Apartment Tenancy' ? 'selected' : ''}>Corporate Apartment Tenancy</option>
                    <option value="Short-Let Service Agreement" ${activeLease.template === 'Short-Let Service Agreement' ? 'selected' : ''}>Short-Let Service Agreement</option>
                  </select>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" id="btn-ai-generate-lease" style="width: 100%; white-space: nowrap; height: 38px;">🤖 AI-Generate Draft</button>
              </div>
              <div id="ai-lease-progress" style="font-size: 11px; color: var(--color-secondary); font-weight:bold; display:none; margin-top:4px;">🤖 AI is generating contract text based on property rules...</div>
            </div>

            <!-- Editable Contract Clauses -->
            <div class="form-group-landlord" style="margin-bottom: 20px;">
              <label for="lease-contract-editor" style="font-weight:bold; color:var(--color-primary); margin-bottom: 8px; display:block; font-size:13px;">Contract Clauses (Editable)</label>
              <textarea id="lease-contract-editor" class="form-control-landlord" rows="12" style="font-family: monospace; font-size: 12px; line-height: 1.5; background: white; padding: 12px; border:1px solid #D1D5DB;">${activeLease.contractText}</textarea>
              
              <div style="display:flex; justify-content:space-between; margin-top: 10px; align-items:center;">
                <span style="font-size:11px; color:#6B7280;">Active Version: <strong>${activeLease.versions?.[activeLease.versions.length - 1]?.version || 'v1.0'}</strong></span>
                <button type="button" class="btn btn-outline btn-xs" id="btn-save-lease-clauses" data-id="${activeLease.id}">Save Clauses & New Version</button>
              </div>
            </div>

            <!-- Version History (Milestone 15) -->
            <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 16px; border: 1px solid rgba(13,27,75,0.06); margin-bottom: 20px;">
              <h4 style="font-size:12px; color:var(--color-primary); font-weight:bold; margin-top:0; margin-bottom:8px;">Version History</h4>
              <div style="display:flex; flex-direction:column; gap:6px;">
                ${activeLease.versions.map(v => `
                  <div style="display:flex; justify-content:space-between; align-items:center; background:white; padding: 6px 10px; border-radius: var(--radius-sm); font-size:11px; border: 1px solid rgba(0,0,0,0.03);">
                    <span><strong>${v.version}</strong> - ${v.date} (${v.author})</span>
                    <button type="button" class="btn btn-outline btn-xxs btn-restore-lease-version" data-version="${v.version}" data-id="${activeLease.id}">Restore</button>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Digital Signature Center (Milestone 16) -->
            <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 20px; border: 1px solid rgba(13,27,75,0.06); margin-bottom: 20px;">
              <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 16px; margin-top: 0; display:flex; align-items:center; gap:8px;">
                <span>✍️</span> Secure Digital Signature Desk
              </h3>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 20px;">
                <!-- Landlord Signature -->
                <div style="background: white; border-radius: var(--radius-sm); border:1px solid rgba(0,0,0,0.05); padding:16px;">
                  <h4 style="font-size: 11px; color:#9CA3AF; text-transform:uppercase; font-weight:bold; margin-top:0; margin-bottom:8px;">Landlord Signature</h4>
                  ${activeLease.landlordSigned ? `
                    <div style="color: var(--color-success); font-weight:bold; font-size:12px; display:flex; align-items:center; gap:6px;">
                      <span>✓</span> Signed: ${activeLease.landlordSignedDate}
                    </div>
                  ` : `
                    <div style="display:flex; flex-direction:column; gap:8px;">
                      <input type="text" id="landlord-signature-input" class="form-control-landlord" placeholder="Type name to sign, e.g. Chief Alabi" style="font-size:12px; padding: 6px;">
                      <button type="button" class="btn btn-secondary btn-sm" id="btn-sign-lease-agreement" data-id="${activeLease.id}">Sign Lease</button>
                    </div>
                  `}
                </div>
                
                <!-- Tenant Signature -->
                <div style="background: white; border-radius: var(--radius-sm); border:1px solid rgba(0,0,0,0.05); padding:16px;">
                  <h4 style="font-size: 11px; color:#9CA3AF; text-transform:uppercase; font-weight:bold; margin-top:0; margin-bottom:8px;">Tenant Signature</h4>
                  ${activeLease.tenantSigned ? `
                    <div style="color: var(--color-success); font-weight:bold; font-size:12px; display:flex; align-items:center; gap:6px;">
                      <span>✓</span> Signed: ${activeLease.tenantSignedDate}
                    </div>
                  ` : `
                    <div style="color: #6B7280; font-style:italic; font-size:12px; padding: 8px 0;">
                      ⏳ Awaiting Tenant review & verification signature
                    </div>
                  `}
                </div>
              </div>
            </div>

            <!-- Audit Log Tracking (Milestone 16) -->
            <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 16px; border: 1px solid rgba(13,27,75,0.06);">
              <h4 style="font-size:12px; color:var(--color-primary); font-weight:bold; margin-top:0; margin-bottom:8px;">Cryptographic Audit Logs</h4>
              <div style="display:flex; flex-direction:column; gap:6px; font-family:monospace; font-size:10px; color:#4B5563;">
                ${activeLease.auditLog.map(log => `
                  <div style="display:flex; gap:12px;">
                    <span style="color:#9CA3AF;">[${log.date}]</span>
                    <span>${log.event}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : `
            <div style="text-align: center; padding: 80px 24px; color: #9CA3AF;">
              <h3>No Active Leases</h3>
              <p class="text-sm">Approve tenant applications to start generating leases.</p>
            </div>
          `}
        </div>
      </div>

      <!-- PDF Generation Lightbox Modal -->
      <div class="landlord-modal" id="lease-pdf-modal" style="display: none; z-index: 1100;">
        <div class="modal-content-panel" style="max-width: 680px; width: 90%; background: #F3F4F6; padding: 24px;">
          <div class="modal-header-panel" style="background: white; border-radius: var(--radius-md) var(--radius-md) 0 0; padding: 16px 20px; border-bottom: 2px solid var(--color-primary); display:flex; justify-content:space-between; align-items:center;">
            <h3 class="card-title" style="color: var(--color-primary); margin:0;">PDF Preview Document</h3>
            <button class="modal-close-icon-btn" id="lease-pdf-close-btn">&times;</button>
          </div>
          <div class="modal-body-panel" style="background: white; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); min-height: 400px; max-height: 55vh; overflow-y: auto; font-family: 'Courier New', Courier, monospace; font-size: 13px; line-height: 1.6; border-radius: 0 0 var(--radius-md) var(--radius-md);">
            <!-- Official Letterhead -->
            <div style="text-align: center; border-bottom: 2px double #0D1B4B; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="margin: 0; color: #0D1B4B; font-size: 22px; font-weight: bold; letter-spacing: 1px;">HAVEN LEASING VAULT</h1>
              <div style="font-size: 10px; color: #6B7280; text-transform: uppercase; margin-top: 4px;">Verified Cryptographic Rental Contract</div>
              <div style="font-size: 9px; color: #9CA3AF; margin-top: 2px;">IPFS File Hash: QmXy9028a3f81c9b8eD • Secured under Lagos State Rent Laws</div>
            </div>

            <!-- Contract content -->
            <div id="pdf-document-text" style="white-space: pre-wrap; color: #111827; margin-bottom: 40px;">
              ${activeLease ? activeLease.contractText : ''}
            </div>

            <!-- Signature seals -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; border-top: 1px solid #E5E7EB; padding-top: 24px;">
              <div>
                <span style="font-size: 10px; color: #9CA3AF; text-transform: uppercase; font-weight: bold; display:block; margin-bottom: 8px;">Landlord Signature Seal</span>
                <div id="pdf-landlord-sig" style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 24px; color: #0D1B4B; border-bottom: 1px solid #9CA3AF; min-height: 36px; padding-left: 10px; font-style:italic;">
                  ${activeLease?.landlordSigned ? 'Chief Alabi' : '[Awaiting Landlord Signature]'}
                </div>
                <div style="font-size: 9px; color: #9CA3AF; margin-top: 4px;">Authorized via Haven Key: ${activeLease?.landlordSigned ? '0x8a7f...0x3b8' : 'N/A'}</div>
              </div>
              <div>
                <span style="font-size: 10px; color: #9CA3AF; text-transform: uppercase; font-weight: bold; display:block; margin-bottom: 8px;">Tenant Signature Seal</span>
                <div id="pdf-tenant-sig" style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 24px; color: #0D1B4B; border-bottom: 1px solid #9CA3AF; min-height: 36px; padding-left: 10px; font-style:italic;">
                  ${activeLease?.tenantSigned ? activeLease.tenantName : '[Awaiting Tenant Review]'}
                </div>
                <div style="font-size: 9px; color: #9CA3AF; margin-top: 4px;">Authorized via NIN Registry Check</div>
              </div>
            </div>
          </div>
          <div class="modal-footer-panel" style="background: white; border-radius: var(--radius-md); padding: 12px 20px; display: flex; justify-content: flex-end; gap: 12px; margin-top: 12px; border-top: 1px solid #E5E7EB;">
            <button type="button" class="btn btn-outline btn-sm" id="btn-print-lease-pdf">🖨️ Print / Download PDF</button>
          </div>
        </div>
      </div>
    `;
  },

  getAIRecommendationText(applicant) {
    if (applicant.matchScore >= 90) {
      return `Outstanding candidate. Bank statements verify clean salary inflows on the 26th of every month. Debt-to-income ratio is low at 22%. BVN matches criminal databases with zero anomalies. Rental references indicate exit reason was lease natural end. <span style="color:var(--color-success); font-weight:bold;">Strongly Recommended.</span>`;
    } else if (applicant.matchScore >= 75) {
      return `Good candidate with steady income. Verification scores match register. Rent consumes 35% of monthly salary, leaving normal disposable funds. Recommend caution deposit of standard 10% to offset minimal variance. <span style="color:var(--color-secondary); font-weight:bold;">Recommended.</span>`;
    } else {
      return `High financial stress noted. Rent advance represents 52% of stated monthly earnings. Verification signals flagged a minor NIMC registry mismatch. Recommend seeking a guarantor or co-signer before signing the lease agreement. <span style="color:var(--color-error); font-weight:bold;">Review with Caution.</span>`;
    }
  },

  initializeState(state) {
    // Tab tracking
    if (!state.activeLandlordTab) {
      state.activeLandlordTab = 'overview';
    }

    // Properties list owned by landlord
    if (!state.landlordProperties) {
      state.landlordProperties = [
        {
          id: 1,
          title: 'Luxury 2 Bed Penthouse Duplex',
          rent: 3200000,
          bedrooms: 2,
          bathrooms: 2,
          propertyType: 'Apartment',
          location: 'Lekki Phase 1',
          city: 'Lagos',
          occupied: true,
          tenantName: 'Osaze Alao',
          leaseEnd: '2026-08-30',
          renewalStatus: 'Pending Review',
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
          units: [
            { id: 101, number: 'Duplex A', status: 'Occupied', rent: 3200000, tenant: 'Osaze Alao' },
            { id: 102, number: 'Duplex B', status: 'Vacant', rent: 3000000, tenant: null }
          ]
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
          occupied: true,
          tenantName: 'Kunle Benson',
          leaseEnd: '2026-10-15',
          renewalStatus: 'Pending Review',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
          units: [
            { id: 201, number: 'Studio Loft 1', status: 'Occupied', rent: 1400000, tenant: 'Kunle Benson' }
          ]
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
          occupied: false,
          tenantName: null,
          leaseEnd: null,
          renewalStatus: 'N/A',
          image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600',
          units: [
            { id: 301, number: 'Serviced Flat 1A', status: 'Vacant', rent: 5500000, tenant: null },
            { id: 302, number: 'Serviced Flat 1B', status: 'Vacant', rent: 5500000, tenant: null }
          ]
        }
      ];
    }

    // Qualification Applicants queue
    if (!state.pipelineApplications) {
      state.pipelineApplications = [
        {
          id: 1,
          applicantName: 'Osaze Alao',
          propertyName: 'Luxury 2 Bed Penthouse Duplex',
          matchScore: 96,
          riskScore: 'Low Risk Profile',
          affordability: 'Excellent (Rent is 22% of salary)',
          status: 'Pending Approval',
          details: {
            bvnStatus: 'Verified Matches',
            ninStatus: 'Verified (NIMC records checked)',
            monthlyIncome: '₦1,200,000',
            employer: 'PropTech Labs Ltd',
            score: 785
          },
          aiMatching: {
            budgetMatch: '95% (Base Rent + Service Charge fits monthly budget allocation)',
            incomeMatch: '98% (₦1.2M verified income matches the stable threshold)',
            locationMatch: '90% (Employment listed in Lekki, matching the property location)',
            lifestyleMatch: '95% (Non-smoker, no pets matches property house rules)',
            summary: 'Osaze is a perfect candidate with an excellent credit profile and strong income stability. Rent is well below the standard 33% threshold. Highly recommended for immediate approval.',
            explanations: [
              'Stable monthly income over ₦1.2M with official bank statements verification.',
              'Clean background check with 0 historical risk flags.',
              'Non-smoker lifestyle matches building regulations.'
            ]
          },
          screening: {
            employmentCheck: 'Verified • Lead Software Engineer at PropTech Labs Ltd (3+ years tenure)',
            rentalHistory: 'Resided 3 years at Ikoyi Terraces. Former landlord reports: "Always paid on time, left flat in immaculate condition."',
            references: 'Dr. Femi Alao (Professional Colleague) - 08012345678',
            creditScore: 785,
            riskIndicators: 'No evictions found, No credit issues, Low debt-to-income ratio (12%)',
            internalNotes: 'Spoke with Osaze, he is ready to move in as soon as escrow completes.'
          },
          timeline: [
            { step: 'Application Submitted', date: 'July 01, 2026', done: true },
            { step: 'Identity & NIN Verification Checked', date: 'July 02, 2026', done: true },
            { step: 'Credit & Criminal Background Checked', date: 'July 03, 2026', done: true },
            { step: 'AI Match Score Generated (96%)', date: 'July 03, 2026', done: true },
            { step: 'Landlord Decision', date: 'Pending', done: false }
          ]
        },
        {
          id: 2,
          applicantName: 'Amara Okafor',
          propertyName: 'Executive 3 Bed Serviced Flat',
          matchScore: 82,
          riskScore: 'Medium Risk Profile',
          affordability: 'Good (Rent fits monthly limits)',
          status: 'Pending Approval',
          details: {
            bvnStatus: 'Verified Matches',
            ninStatus: 'Verified (NIMC check complete)',
            monthlyIncome: '₦1,500,000',
            employer: 'Access Bank PLC',
            score: 690
          },
          aiMatching: {
            budgetMatch: '85% (Rent is 28% of monthly income)',
            incomeMatch: '90% (Salary verified, secondary commission income is variable)',
            locationMatch: '88% (Office in Victoria Island, Lekki is an adjacent commute)',
            lifestyleMatch: '80% (Has one small cat, which matches landlord policy limits)',
            summary: 'Amara is a reliable corporate applicant with verified Access Bank income. Minor risk indicator due to commission variability, but overall strong indicators and low background risk.',
            explanations: [
              'Monthly salary is ₦1.5M with strong corporate references.',
              'Favorable credit score of 690.',
              'Verified employer contract tenure is 4+ years.'
            ]
          },
          screening: {
            employmentCheck: 'Verified • Senior Relationship Manager at Access Bank PLC',
            rentalHistory: 'Resided 2 years at Victoria Crest Flat. Landlord reports: "Rent paid on time, minor wear-and-tear at check-out."',
            references: 'Mrs. Cynthia Okafor (Personal Reference) - 08023456789',
            creditScore: 690,
            riskIndicators: 'No bankruptcies, No historical defaults, Moderate credit card utilization',
            internalNotes: 'Applicant has a small cat; confirmed policy compliance with the building committee.'
          },
          timeline: [
            { step: 'Application Submitted', date: 'July 05, 2026', done: true },
            { step: 'Identity & NIN Verification Checked', date: 'July 05, 2026', done: true },
            { step: 'Credit & Criminal Background Checked', date: 'July 06, 2026', done: true },
            { step: 'AI Match Score Generated (82%)', date: 'July 06, 2026', done: true },
            { step: 'Landlord Decision', date: 'Pending', done: false }
          ]
        },
        {
          id: 3,
          applicantName: 'Tunde Bakare',
          propertyName: 'Cozy 1 Bedroom Studio Loft',
          matchScore: 54,
          riskScore: 'High Risk Profile',
          affordability: 'Strained (Rent exceeds income threshold)',
          status: 'Pending Approval',
          details: {
            bvnStatus: 'Verified Matches',
            ninStatus: 'Failed (NIMC mismatch alert)',
            monthlyIncome: '₦220,000',
            employer: 'Freelance Designer',
            score: 510
          },
          aiMatching: {
            budgetMatch: '40% (Rent constitutes 62% of verified income)',
            incomeMatch: '45% (Irregular freelancing cash flows)',
            locationMatch: '80% (Work from home location profile)',
            lifestyleMatch: '70% (Smoker profile clashes with non-smoking loft guidelines)',
            summary: 'Tunde presents high risk indicators. NIMC verification returned a name/DOB mismatch alert, and freelance income cashflows are highly irregular relative to base rent limits.',
            explanations: [
              'NIMC record returns failed warning flags.',
              'Rent is a very high percentage of verified income (62%).',
              'Smoking profile conflicts with standard studio guidelines.'
            ]
          },
          screening: {
            employmentCheck: 'Unverified • Self-Employed / Freelancer (Variable cash flows)',
            rentalHistory: 'No prior landlord references provided (stayed at family home previously).',
            references: 'Peter Bakare (Sibling Reference) - 08034567890',
            creditScore: 510,
            riskIndicators: 'NIMC verification warning alert, Insufficient credit history, High rent-to-income ratio',
            internalNotes: 'Tunde called to explain the mismatch; requested secondary ID proof but none submitted yet.'
          },
          timeline: [
            { step: 'Application Submitted', date: 'July 08, 2026', done: true },
            { step: 'Identity Check (NIMC Warning flag)', date: 'July 08, 2026', done: true },
            { step: 'Credit & Criminal Background Checked', date: 'July 09, 2026', done: true },
            { step: 'AI Match Score Generated (54%)', date: 'July 09, 2026', done: true },
            { step: 'Landlord Decision', date: 'Pending', done: false }
          ]
        }
      ];
    }

    // Landlord Active Escrows and milestones check
    if (!state.landlordEscrows) {
      state.landlordEscrows = [
        {
          id: 1,
          propertyName: 'Luxury 2 Bed Penthouse Duplex (Duplex A)',
          tenantName: 'Osaze Alao',
          cautionAmount: 250000,
          rentAmount: 2950000,
          status: 'Funded',
          moveInToken: null,
          prepaidMeter: '042-8921-098',
          waterChecked: false,
          inspectionCleared: true,
          cleaningCleared: true,
          readinessChecklist: {
            painted: true,
            clean: true,
            electricity: false,
            water: false
          },
          timeline: [
            { label: 'Lease Agreement Executed', date: 'July 13, 2026', done: true },
            { label: 'Caution Deposit Funded (₦250K)', date: 'July 13, 2026', done: true },
            { label: '12-Month Rent Locked (₦2.95M)', date: 'July 13, 2026', done: true },
            { label: 'Readiness Inspections Cleared', date: 'In Progress', done: false },
            { label: 'Escrow Released to Landlord', date: 'Awaiting Signoff', done: false }
          ],
          transactions: [
            { id: 'TX-8012', type: 'Credit Hold', desc: 'Tenant Caution Deposit', amount: 250000, date: 'July 13, 2026 12:44', ref: 'Ref: BankSync-81A' },
            { id: 'TX-8013', type: 'Credit Hold', desc: 'Tenant 12-Month Rent Advance', amount: 2950000, date: 'July 13, 2026 12:45', ref: 'Ref: BankSync-81B' }
          ]
        },
        {
          id: 2,
          propertyName: 'Cozy 1 Bedroom Studio Loft (Loft 1)',
          tenantName: 'Kunle Benson',
          cautionAmount: 200000,
          rentAmount: 1200000,
          status: 'Released',
          moveInToken: 'HAVEN-52B1-2026',
          prepaidMeter: '018-7741-290',
          waterChecked: true,
          inspectionCleared: true,
          cleaningCleared: true,
          readinessChecklist: {
            painted: true,
            clean: true,
            electricity: true,
            water: true
          },
          timeline: [
            { label: 'Lease Agreement Executed', date: 'June 01, 2026', done: true },
            { label: 'Caution Deposit Funded (₦200K)', date: 'June 02, 2026', done: true },
            { label: '12-Month Rent Locked (₦1.2M)', date: 'June 02, 2026', done: true },
            { label: 'Readiness Inspections Cleared', date: 'June 03, 2026', done: true },
            { label: 'Escrow Released to Landlord', date: 'June 04, 2026', done: true }
          ],
          transactions: [
            { id: 'TX-7011', type: 'Credit Hold', desc: 'Tenant Caution Deposit', amount: 200000, date: 'June 02, 2026 09:30', ref: 'Ref: BankSync-22C' },
            { id: 'TX-7012', type: 'Credit Hold', desc: 'Tenant 12-Month Rent Advance', amount: 1200000, date: 'June 02, 2026 09:31', ref: 'Ref: BankSync-22D' },
            { id: 'TX-7023', type: 'Debit Release', desc: 'Rent Advance Payout to Landlord Bank Account', amount: 1200000, date: 'June 04, 2026 15:45', ref: 'Ref: Payout-90F' }
          ]
        }
      ];
    }

    // Disputes tracker
    if (!state.landlordDisputes) {
      state.landlordDisputes = [
        {
          id: 1,
          propertyName: 'Cozy 1 Bedroom Studio Loft',
          tenantName: 'Kunle Benson',
          cautionAmount: 200000,
          reason: 'Tenant claims water damage on floorboards was present prior to tenancy. Landlord claims caution deductible required to repaint damaged drywall.',
          tenantEvidence: 'Lease check-in photos showing baseline drywall moisture marks.',
          landlordDefense: '',
          status: 'Awaiting Response'
        }
      ];
    }

    if (!state.landlordOverviewFilterProperty) state.landlordOverviewFilterProperty = 'all';
    if (!state.landlordOverviewFilterStatus) state.landlordOverviewFilterStatus = 'all';
    if (!state.landlordOverviewSearch) state.landlordOverviewSearch = '';
    if (!state.landlordSelectedReadinessEscrowId) state.landlordSelectedReadinessEscrowId = state.landlordEscrows[0]?.id || null;

    if (!state.landlordProfile) {
      state.landlordProfile = {
        fullName: 'Chief Alabi',
        dob: '1975-08-20',
        gender: 'Male',
        phone: '+234 803 111 2222',
        email: 'chief.alabi@properties.ng',
        address: '12b Admiralty Way, Lekki Phase 1, Lagos',
        bio: 'Managing Partner at Alabi Real Estate Holdings. Providing high-end residential listings in Lekki, Ikoyi, and Victoria Island for over 15 years.',
        language: 'English',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
        license: 'L-9082',
        editMode: false
      };
    }
    if (!state.landlordKyc) {
      state.landlordKyc = {
        status: 'unverified', // 'unverified', 'pending', 'approved', 'rejected'
        step: 1, // 1: document, 2: selfie, 3: address, 4: completed/pending review
        docType: 'NIN',
        docNumber: '',
        docFile: null,
        selfieFile: null,
        addressStreet: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        addressFile: null,
        rejectionReason: ''
      };
    }
    if (!state.landlordKyb) {
      state.landlordKyb = {
        status: 'unverified', // 'unverified', 'pending', 'approved', 'rejected'
        step: 1, // 1: Profile & CAC, 2: Tax & Logo, 3: Documents
        companyName: '',
        companyType: 'Private Limited Company',
        cacNumber: '',
        tinNumber: '',
        companyAddress: '',
        logoFile: null,
        cacCertFile: null,
        statusReportFile: null,
        rejectionReason: ''
      };
    }

    if (!state.landlordLeases) {
      state.landlordLeases = [
        {
          id: 1,
          propertyName: 'Luxury 2 Bed Penthouse Duplex',
          tenantName: 'Osaze Alao',
          rentAmount: 3200000,
          serviceCharge: 400000,
          leaseDuration: '12 Months',
          status: 'Drafting', // Drafting | Pending Landlord Signature | Pending Tenant Signature | Fully Executed
          template: 'Standard Residential Lease',
          contractText: `LEASE AGREEMENT\n\nThis Lease Agreement is made this 13th day of July, 2026 between Chief Alabi (Landlord) and Osaze Alao (Tenant).\n\n1. PROPERTY: Luxury 2 Bed Penthouse Duplex located at Lekki Phase 1, Lagos.\n2. TERM: 12 Months starting August 01, 2026.\n3. RENT: ₦3,200,000 annually, payable in advance.\n4. SERVICE CHARGE: ₦400,000 annually.\n5. POLICIES: Non-smoking property. No pets allowed.\n\nSigned by Landlord: [Pending]\nSigned by Tenant: [Pending]`,
          versions: [
            { version: 'v1.0', date: 'July 13, 2026 18:00', author: 'AI Generator', text: 'Initial draft.' }
          ],
          landlordSigned: false,
          landlordSignedDate: null,
          tenantSigned: false,
          tenantSignedDate: null,
          auditLog: [
            { date: 'July 13, 2026 18:00', event: 'Lease draft generated via AI template.' }
          ]
        },
        {
          id: 2,
          propertyName: 'Executive 3 Bed Serviced Flat',
          tenantName: 'Amara Okafor',
          rentAmount: 5500000,
          serviceCharge: 600000,
          leaseDuration: '12 Months',
          status: 'Pending Tenant Signature',
          template: 'Corporate Apartment Tenancy',
          contractText: `CORPORATE LEASE AGREEMENT\n\nThis Lease Agreement is made this 13th day of July, 2026 between Chief Alabi (Landlord) and Amara Okafor (Tenant).\n\n1. PROPERTY: Executive 3 Bed Serviced Flat located at Victoria Island, Lagos.\n2. TERM: 12 Months starting August 05, 2026.\n3. RENT: ₦5,500,000 annually.\n4. SERVICE CHARGE: ₦600,000 annually.\n5. POLICIES: Small cat allowed. Outdoors smoking allowed.\n\nSigned by Landlord: Chief Alabi (July 12, 2026 11:35 secure validation)\nSigned by Tenant: [Pending]`,
          versions: [
            { version: 'v1.0', date: 'July 11, 2026 10:00', author: 'AI Generator', text: 'Initial draft.' },
            { version: 'v1.1', date: 'July 12, 2026 11:30', author: 'Chief Alabi', text: 'Edited cat rules clause.' }
          ],
          landlordSigned: true,
          landlordSignedDate: 'July 12, 2026 11:35',
          tenantSigned: false,
          tenantSignedDate: null,
          auditLog: [
            { date: 'July 11, 2026 10:00', event: 'Lease draft generated via AI template.' },
            { date: 'July 12, 2026 11:30', event: 'Clause 5 amended by Landlord.' },
            { date: 'July 12, 2026 11:35', event: 'Signed securely by Landlord Chief Alabi.' }
          ]
        }
      ];
    }

    if (!state.landlordTenants) {
      state.landlordTenants = [
        {
          id: 1,
          name: 'Osaze Alao',
          email: 'osaze@alao.dev',
          phone: '+234 812 345 6789',
          propertyName: 'Luxury 2 Bed Penthouse Duplex',
          unitNumber: 'Duplex A',
          rentStatus: 'Paid',
          leaseStart: '2025-08-01',
          leaseEnd: '2026-08-30',
          trustGrade: 'A',
          trustScore: 785
        },
        {
          id: 2,
          name: 'Kunle Benson',
          email: 'kunle.b@gmail.com',
          phone: '+234 809 112 3344',
          propertyName: 'Cozy 1 Bedroom Studio Loft',
          unitNumber: 'Loft 1',
          rentStatus: 'Paid',
          leaseStart: '2025-10-15',
          leaseEnd: '2026-10-15',
          trustGrade: 'B+',
          trustScore: 710
        },
        {
          id: 3,
          name: 'Amara Okafor',
          email: 'amara.okafor@corporates.ng',
          phone: '+234 815 667 8899',
          propertyName: 'Executive 3 Bed Serviced Flat',
          unitNumber: 'Flat 3',
          rentStatus: 'Overdue',
          leaseStart: '2025-06-01',
          leaseEnd: '2026-06-01',
          trustGrade: 'A+',
          trustScore: 820
        }
      ];
    }

    if (!state.landlordActivityLogs) {
      state.landlordActivityLogs = [
        { date: 'July 13, 2026 18:52', event: 'Generated residential lease draft for Osaze Alao' },
        { date: 'July 13, 2026 18:37', event: 'Approved application of Amara Okafor' },
        { date: 'July 13, 2026 17:52', event: 'Added unit Duplex A and B for Luxury 2 Bed Penthouse' },
        { date: 'July 13, 2026 12:44', event: 'Received caution deposit payment from Osaze Alao' },
        { date: 'July 13, 2026 09:30', event: 'Logged in securely from IP 102.89.2.14' }
      ];
    }

    if (!state.landlordSettings) {
      state.landlordSettings = {
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: false,
        appUpdates: true,
        twoFactorEnabled: false,
        twoFactorPhone: '+234 803 111 2222',
        passwordLastChanged: 'July 01, 2026'
      };
    }
  },

  init(state, navigateTo, updateState) {
    // Bind Sidebar Tab Switching
    document.querySelectorAll('.ll-sidebar-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedTab = e.currentTarget.getAttribute('data-tab');
        updateState({ activeLandlordTab: selectedTab });
        navigateTo('landlord');
      });
    });

    // Bind Dashboard Overview Cards clicking to switch tabs
    document.getElementById('stat-card-occupancy')?.addEventListener('click', () => {
      updateState({ activeLandlordTab: 'properties' });
      navigateTo('landlord');
    });
    document.getElementById('stat-card-revenue')?.addEventListener('click', () => {
      updateState({ activeLandlordTab: 'escrow' });
      navigateTo('landlord');
    });
    document.getElementById('stat-card-vacancy')?.addEventListener('click', () => {
      updateState({ activeLandlordTab: 'properties' });
      navigateTo('landlord');
    });
    document.getElementById('stat-card-pipeline')?.addEventListener('click', () => {
      updateState({ activeLandlordTab: 'approvals' });
      navigateTo('landlord');
    });

    // Mobile Sidebar Toggle
    document.getElementById('btn-sidebar-toggle')?.addEventListener('click', () => {
      const sidebar = document.getElementById('ll-sidebar-panel');
      if (sidebar) {
        sidebar.classList.toggle('open');
      }
    });

    // Close mobile sidebar on link click
    document.querySelectorAll('.ll-sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        const sidebar = document.getElementById('ll-sidebar-panel');
        if (sidebar) sidebar.classList.remove('open');
      });
    });

    // User Dropdown toggle
    const userBtn = document.getElementById('ll-user-btn');
    const userDropdown = document.getElementById('ll-user-dropdown');
    userBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (userDropdown) {
        const isHidden = userDropdown.style.display === 'none' || userDropdown.style.display === '';
        userDropdown.style.display = isHidden ? 'flex' : 'none';
      }
    });

    // Bell notifications toggle
    const bellBtn = document.getElementById('ll-bell-btn');
    const bellDropdown = document.getElementById('ll-notification-dropdown');
    bellBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bellDropdown) {
        const isHidden = bellDropdown.style.display === 'none' || bellDropdown.style.display === '';
        bellDropdown.style.display = isHidden ? 'block' : 'none';
      }
    });

    // Mark notifications read
    document.getElementById('ll-clear-notifications')?.addEventListener('click', (e) => {
      e.preventDefault();
      const updated = state.notifications.map(n => ({ ...n, read: true }));
      updateState({ notifications: updated });
      navigateTo('landlord');
    });

    // Single notification click read
    document.querySelectorAll('#ll-notification-dropdown .notification-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.getAttribute('data-id'));
        const updated = state.notifications.map(n => {
          if (n.id === id) return { ...n, read: true };
          return n;
        });
        updateState({ notifications: updated });
        navigateTo('landlord');
      });
    });

    // Dropdown settings & profile link click
    document.getElementById('ll-drop-settings')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (userDropdown) userDropdown.style.display = 'none';
      updateState({ activeLandlordTab: 'profile' });
      navigateTo('landlord');
    });

    // Dropdown logout link click
    document.getElementById('ll-drop-logout')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (userDropdown) userDropdown.style.display = 'none';
      updateState({ user: null });
      navigateTo('landing');
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
      if (userDropdown) userDropdown.style.display = 'none';
      if (bellDropdown) bellDropdown.style.display = 'none';
    });

    // ----------------------------------------------------
    // TAB: KYB BINDINGS
    // ----------------------------------------------------
    // Step 1: Profile & CAC Submit
    document.getElementById('kyb-step1-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const companyName = document.getElementById('kyb-company-name').value.trim();
      const companyType = document.getElementById('kyb-company-type').value;
      const cacNumber = document.getElementById('kyb-cac-number').value.trim();
      const companyAddress = document.getElementById('kyb-address').value.trim();

      let isValid = true;
      document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      if (!companyName) {
        const errorEl = document.getElementById('error-kyb-company-name');
        if (errorEl) errorEl.textContent = 'Company legal name is required';
        isValid = false;
      }
      if (!cacNumber) {
        const errorEl = document.getElementById('error-kyb-cac-number');
        if (errorEl) errorEl.textContent = 'CAC number is required';
        isValid = false;
      }
      if (!companyAddress) {
        const errorEl = document.getElementById('error-kyb-address');
        if (errorEl) errorEl.textContent = 'Head office address is required';
        isValid = false;
      }

      if (isValid) {
        updateState({
          landlordKyb: {
            ...state.landlordKyb,
            companyName,
            companyType,
            cacNumber,
            companyAddress,
            step: 2
          }
        });
        navigateTo('landlord');
      }
    });

    // Step 2: Tax & Logo Form Submit
    document.getElementById('kyb-step2-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const tinNumber = document.getElementById('kyb-tin').value.trim();
      const logoFile = state.landlordKyb.logoFile;

      let isValid = true;
      document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      if (!tinNumber) {
        const errorEl = document.getElementById('error-kyb-tin');
        if (errorEl) errorEl.textContent = 'FIRS Tax ID number is required';
        isValid = false;
      }
      if (!logoFile) {
        const errorEl = document.getElementById('error-kyb-logo-file');
        if (errorEl) errorEl.textContent = 'Corporate logo is required';
        isValid = false;
      }

      if (isValid) {
        updateState({
          landlordKyb: {
            ...state.landlordKyb,
            tinNumber,
            step: 3
          }
        });
        navigateTo('landlord');
      }
    });

    // Step 2 Logo dropzone triggers file click
    document.getElementById('kyb-logo-dropzone')?.addEventListener('click', () => {
      document.getElementById('kyb-logo-file')?.click();
    });

    // Step 2 Logo File upload reader
    document.getElementById('kyb-logo-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateState({
            landlordKyb: {
              ...state.landlordKyb,
              logoFile: event.target.result
            }
          });
          navigateTo('landlord');
        };
        reader.readAsDataURL(file);
      }
    });

    // Step 2 Back to Step 1
    document.getElementById('btn-kyb-back-step1')?.addEventListener('click', () => {
      updateState({
        landlordKyb: {
          ...state.landlordKyb,
          step: 1
        }
      });
      navigateTo('landlord');
    });

    // Step 3: Documents Submit
    document.getElementById('kyb-step3-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const cacCertFile = state.landlordKyb.cacCertFile;
      const statusReportFile = state.landlordKyb.statusReportFile;

      let isValid = true;
      document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      if (!cacCertFile) {
        const errorEl = document.getElementById('error-kyb-cac-file');
        if (errorEl) errorEl.textContent = 'CAC registration certificate is required';
        isValid = false;
      }
      if (!statusReportFile) {
        const errorEl = document.getElementById('error-kyb-status-file');
        if (errorEl) errorEl.textContent = 'Form CAC 1.1 Status report is required';
        isValid = false;
      }

      if (isValid) {
        updateState({
          landlordKyb: {
            ...state.landlordKyb,
            status: 'pending',
            step: 4
          }
        });
        navigateTo('landlord');
      }
    });

    // Step 3 CAC cert dropzone triggers file click
    document.getElementById('kyb-cac-dropzone')?.addEventListener('click', () => {
      document.getElementById('kyb-cac-file')?.click();
    });

    // Step 3 CAC File upload reader
    document.getElementById('kyb-cac-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateState({
            landlordKyb: {
              ...state.landlordKyb,
              cacCertFile: event.target.result
            }
          });
          navigateTo('landlord');
        };
        reader.readAsDataURL(file);
      }
    });

    // Step 3 status report dropzone triggers file click
    document.getElementById('kyb-status-dropzone')?.addEventListener('click', () => {
      document.getElementById('kyb-status-file')?.click();
    });

    // Step 3 Status report file upload reader
    document.getElementById('kyb-status-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateState({
            landlordKyb: {
              ...state.landlordKyb,
              statusReportFile: event.target.result
            }
          });
          navigateTo('landlord');
        };
        reader.readAsDataURL(file);
      }
    });

    // Step 3 Back to Step 2
    document.getElementById('btn-kyb-back-step2')?.addEventListener('click', () => {
      updateState({
        landlordKyb: {
          ...state.landlordKyb,
          step: 2
        }
      });
      navigateTo('landlord');
    });

    // Pending review simulators: Approve
    document.getElementById('btn-kyb-sim-approve')?.addEventListener('click', () => {
      updateState({
        landlordKyb: {
          ...state.landlordKyb,
          status: 'approved',
          rejectionReason: ''
        }
      });
      alert('Simulated Verification Check: Approved! Company portal status fully verified.');
      navigateTo('landlord');
    });

    // Pending review simulators: Reject
    document.getElementById('btn-kyb-sim-reject')?.addEventListener('click', () => {
      const reason = prompt('Provide simulated corporate rejection feedback:', 'The Tax Identification Number (TIN) mismatch on names from the FIRS tax directory records.');
      if (reason !== null) {
        updateState({
          landlordKyb: {
            ...state.landlordKyb,
            status: 'rejected',
            rejectionReason: reason
          }
        });
        navigateTo('landlord');
      }
    });

    // Approved: Reset corporate
    document.getElementById('btn-kyb-reset')?.addEventListener('click', () => {
      updateState({
        landlordKyb: {
          status: 'unverified',
          step: 1,
          companyName: '',
          companyType: 'Private Limited Company',
          cacNumber: '',
          tinNumber: '',
          companyAddress: '',
          logoFile: null,
          cacCertFile: null,
          statusReportFile: null,
          rejectionReason: ''
        }
      });
      navigateTo('landlord');
    });

    // Rejected: Restart flow
    document.getElementById('btn-kyb-restart')?.addEventListener('click', () => {
      updateState({
        landlordKyb: {
          ...state.landlordKyb,
          status: 'unverified',
          step: 1
        }
      });
      navigateTo('landlord');
    });

    // ----------------------------------------------------
    // TAB: KYC BINDINGS
    // ----------------------------------------------------
    // Step 1: Government ID Form Submit
    document.getElementById('kyc-step1-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const docType = document.getElementById('kyc-doc-type').value;
      const docNumber = document.getElementById('kyc-doc-number').value.trim();
      const docFile = state.landlordKyc.docFile;

      let isValid = true;
      document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      if (!docNumber) {
        const errorEl = document.getElementById('error-kyc-doc-number');
        if (errorEl) errorEl.textContent = 'Document ID number is required';
        isValid = false;
      } else if ((docType === 'NIN' || docType === 'BVN') && docNumber.length !== 11) {
        const errorEl = document.getElementById('error-kyc-doc-number');
        if (errorEl) errorEl.textContent = `${docType} must be exactly 11 digits`;
        isValid = false;
      }

      if (!docFile) {
        const errorEl = document.getElementById('error-kyc-doc-file');
        if (errorEl) errorEl.textContent = 'Please upload a photo of your government ID';
        isValid = false;
      }

      if (isValid) {
        updateState({
          landlordKyc: {
            ...state.landlordKyc,
            docType,
            docNumber,
            step: 2
          }
        });
        navigateTo('landlord');
      }
    });

    // Step 1 Document File Dropzone triggers file input click
    document.getElementById('kyc-doc-dropzone')?.addEventListener('click', () => {
      document.getElementById('kyc-doc-file')?.click();
    });

    // Step 1 Document File upload reader
    document.getElementById('kyc-doc-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateState({
            landlordKyc: {
              ...state.landlordKyc,
              docFile: event.target.result
            }
          });
          navigateTo('landlord');
        };
        reader.readAsDataURL(file);
      }
    });

    // Step 2: Selfie Form Submit
    document.getElementById('kyc-step2-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const selfieFile = state.landlordKyc.selfieFile;

      if (!selfieFile) {
        const errorEl = document.getElementById('error-kyc-selfie-file');
        if (errorEl) errorEl.textContent = 'Please capture or select a selfie photo for liveness check';
        return;
      }

      updateState({
        landlordKyc: {
          ...state.landlordKyc,
          step: 3
        }
      });
      navigateTo('landlord');
    });

    // Step 2 Capture Selfie Photo click triggers hidden file input
    document.getElementById('btn-capture-selfie')?.addEventListener('click', () => {
      document.getElementById('kyc-selfie-file')?.click();
    });

    // Step 2 Selfie File upload reader
    document.getElementById('kyc-selfie-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateState({
            landlordKyc: {
              ...state.landlordKyc,
              selfieFile: event.target.result
            }
          });
          navigateTo('landlord');
        };
        reader.readAsDataURL(file);
      }
    });

    // Step 2 Back to Step 1
    document.getElementById('btn-kyc-back-step1')?.addEventListener('click', () => {
      updateState({
        landlordKyc: {
          ...state.landlordKyc,
          step: 1
        }
      });
      navigateTo('landlord');
    });

    // Step 3: Address Verification Form Submit
    document.getElementById('kyc-step3-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const street = document.getElementById('kyc-street').value.trim();
      const city = document.getElementById('kyc-city').value.trim();
      const stateVal = document.getElementById('kyc-state').value.trim();
      const zip = document.getElementById('kyc-zip').value.trim();
      const addressFile = state.landlordKyc.addressFile;

      let isValid = true;
      document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      if (!street) {
        const errorEl = document.getElementById('error-kyc-street');
        if (errorEl) errorEl.textContent = 'Street address is required';
        isValid = false;
      }
      if (!city) {
        const errorEl = document.getElementById('error-kyc-city');
        if (errorEl) errorEl.textContent = 'City is required';
        isValid = false;
      }
      if (!stateVal) {
        const errorEl = document.getElementById('error-kyc-state');
        if (errorEl) errorEl.textContent = 'State is required';
        isValid = false;
      }
      if (!zip) {
        const errorEl = document.getElementById('error-kyc-zip');
        if (errorEl) errorEl.textContent = 'Postal code is required';
        isValid = false;
      }
      if (!addressFile) {
        const errorEl = document.getElementById('error-kyc-address-file');
        if (errorEl) errorEl.textContent = 'Please upload a utility bill or bank statement proof of address';
        isValid = false;
      }

      if (isValid) {
        updateState({
          landlordKyc: {
            ...state.landlordKyc,
            addressStreet: street,
            addressCity: city,
            addressState: stateVal,
            addressZip: zip,
            status: 'pending',
            step: 4
          }
        });
        navigateTo('landlord');
      }
    });

    // Step 3 Address Proof Dropzone click triggers file input
    document.getElementById('kyc-address-dropzone')?.addEventListener('click', () => {
      document.getElementById('kyc-address-file')?.click();
    });

    // Step 3 Address File upload reader
    document.getElementById('kyc-address-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateState({
            landlordKyc: {
              ...state.landlordKyc,
              addressFile: event.target.result
            }
          });
          navigateTo('landlord');
        };
        reader.readAsDataURL(file);
      }
    });

    // Step 3 Back to Step 2
    document.getElementById('btn-kyc-back-step2')?.addEventListener('click', () => {
      updateState({
        landlordKyc: {
          ...state.landlordKyc,
          step: 2
        }
      });
      navigateTo('landlord');
    });

    // Pending: Simulate Approval Review
    document.getElementById('btn-sim-approve')?.addEventListener('click', () => {
      updateState({
        landlordKyc: {
          ...state.landlordKyc,
          status: 'approved',
          rejectionReason: ''
        }
      });
      alert('Simulated Verification Check: Approved! Landlord status updated to fully verified.');
      navigateTo('landlord');
    });

    // Pending: Simulate Rejection Review
    document.getElementById('btn-sim-reject')?.addEventListener('click', () => {
      const reason = prompt('Provide simulated rejection feedback:', 'The selfie liveness match failed against your National Government NIN card photo record. Please retake photo.');
      if (reason !== null) {
        updateState({
          landlordKyc: {
            ...state.landlordKyc,
            status: 'rejected',
            rejectionReason: reason
          }
        });
        navigateTo('landlord');
      }
    });

    // Approved: Reset Verification
    document.getElementById('btn-kyc-reset')?.addEventListener('click', () => {
      updateState({
        landlordKyc: {
          status: 'unverified',
          step: 1,
          docType: 'NIN',
          docNumber: '',
          docFile: null,
          selfieFile: null,
          addressStreet: '',
          addressCity: '',
          addressState: '',
          addressZip: '',
          addressFile: null,
          rejectionReason: ''
        }
      });
      navigateTo('landlord');
    });

    // Rejected: Restart Verification Flow
    document.getElementById('btn-kyc-restart')?.addEventListener('click', () => {
      updateState({
        landlordKyc: {
          ...state.landlordKyc,
          status: 'unverified',
          step: 1
        }
      });
      navigateTo('landlord');
    });

    // ----------------------------------------------------
    // TAB: PROFILE BINDINGS
    // ----------------------------------------------------
    document.getElementById('btn-ll-edit-profile')?.addEventListener('click', () => {
      state.landlordProfile.editMode = true;
      navigateTo('landlord');
    });

    document.getElementById('btn-ll-cancel-edit')?.addEventListener('click', () => {
      state.landlordProfile.editMode = false;
      navigateTo('landlord');
    });

    // Handle avatar photo upload
    document.getElementById('ll-avatar-upload')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateState({
            landlordProfile: {
              ...state.landlordProfile,
              avatar: event.target.result
            }
          });
          navigateTo('landlord');
        };
        reader.readAsDataURL(file);
      }
    });

    // Handle profile form submit
    document.getElementById('ll-edit-profile-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const bio = document.getElementById('edit-ll-bio').value;
      const fullName = document.getElementById('edit-ll-name').value.trim();
      const dob = document.getElementById('edit-ll-dob').value;
      const gender = document.getElementById('edit-ll-gender').value;
      const email = document.getElementById('edit-ll-email').value.trim();
      const phone = document.getElementById('edit-ll-phone').value.trim();
      const address = document.getElementById('edit-ll-address').value.trim();
      const language = document.getElementById('edit-ll-lang').value;

      // Validation
      let isValid = true;
      
      // Clear old errors
      document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      if (!fullName) {
        const errorEl = document.getElementById('error-edit-ll-name');
        if (errorEl) errorEl.textContent = 'Legal name is required';
        isValid = false;
      }
      if (!dob) {
        const errorEl = document.getElementById('error-edit-ll-dob');
        if (errorEl) errorEl.textContent = 'Date of birth is required';
        isValid = false;
      }
      if (!address) {
        const errorEl = document.getElementById('error-edit-ll-address');
        if (errorEl) errorEl.textContent = 'Business address is required';
        isValid = false;
      }
      
      // Email check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        const errorEl = document.getElementById('error-edit-ll-email');
        if (errorEl) errorEl.textContent = 'A valid email is required';
        isValid = false;
      }

      // Phone check
      const cleanPhone = phone.replace(/[^0-9+]/g, '');
      if (!phone || cleanPhone.length < 10) {
        const errorEl = document.getElementById('error-edit-ll-phone');
        if (errorEl) errorEl.textContent = 'Provide a valid contact phone number';
        isValid = false;
      }

      if (isValid) {
        // Save
        updateState({
          landlordProfile: {
            ...state.landlordProfile,
            fullName,
            dob,
            gender,
            email,
            phone,
            address,
            bio,
            language,
            editMode: false
          }
        });
        alert('Profile saved successfully!');
        navigateTo('landlord');
      }
    });

    // ----------------------------------------------------
    // TAB: OVERVIEW & ANALYTICS BINDINGS
    // ----------------------------------------------------
    document.getElementById('overview-filter-property')?.addEventListener('change', (e) => {
      updateState({ landlordOverviewFilterProperty: e.target.value });
      navigateTo('landlord');
    });

    document.getElementById('overview-filter-status')?.addEventListener('change', (e) => {
      updateState({ landlordOverviewFilterStatus: e.target.value });
      navigateTo('landlord');
    });

    document.getElementById('overview-search')?.addEventListener('input', (e) => {
      // Don't re-render instantly on every keystroke, let user type, but for simple app:
      state.landlordOverviewSearch = e.target.value;
    });

    document.getElementById('overview-search')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        updateState({ landlordOverviewSearch: e.target.value });
        navigateTo('landlord');
      }
    });

    // CSV Exporter Simulation
    document.getElementById('btn-export-csv')?.addEventListener('click', () => {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Date,Property,Event,Details,Value,Status\r\n";
      csvContent += "2026-06-21,Lekki Duplex,Deposit Locked,Caution deposit locked in Escrow by Osaze Alao,250000,Completed\r\n";
      csvContent += "2026-06-20,Yaba Studio Loft,Payout Completed,Mrs. Coker Yaba rent payout cleared,1200000,Completed\r\n";
      csvContent += "2026-06-18,VI Serviced Flat,Inspection Scheduled,Amara Okafor physical check scheduled,0,Pending\r\n";
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "haven_portfolio_statement.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Havens Ledger CSV downloaded successfully. CBN Compliance Verified.");
    });

    // ----------------------------------------------------
    // TAB: PROPERTY PORTFOLIO & MODAL FORM BINDINGS
    // ----------------------------------------------------
    const addModal = document.getElementById('add-property-modal');
    const bulkModal = document.getElementById('bulk-upload-modal');

    // Dynamic Media and Document rendering helpers
    const renderTempMediaGallery = () => {
      const container = document.getElementById('prop-media-gallery');
      if (!container) return;
      
      const mediaList = state.tempPropertyMedia || [];
      if (mediaList.length === 0) {
        container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; font-size: 11px; color: #9CA3AF; padding: 24px; border: 1px dashed rgba(13,27,75,0.05); border-radius: 6px;">No media files uploaded yet. Drag or browse files above.</div>`;
        return;
      }

      container.innerHTML = mediaList.map(m => {
        const isVideo = m.type === 'video';
        const coverBadge = m.isCover ? `<span style="position: absolute; bottom: 6px; left: 6px; background: var(--color-secondary); color: white; font-size: 8px; font-weight: bold; padding: 2px 6px; border-radius: 4px; z-index: 10;">COVER</span>` : '';
        const playIcon = isVideo ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; z-index: 5;">▶</div>` : '';
        
        return `
          <div style="position: relative; aspect-ratio: 1.2; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid rgba(0,0,0,0.08); background: #FAF9F6; cursor: zoom-in;" class="prop-media-item-card" data-id="${m.id}">
            ${isVideo ? `<video src="${m.src}" style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;"></video>` : `<img src="${m.src}" style="width: 100%; height: 100%; object-fit: cover;">`}
            ${playIcon}
            ${coverBadge}
            <button type="button" class="btn-delete-temp-media" data-id="${m.id}" style="position: absolute; top: 6px; right: 6px; width: 20px; height: 20px; border-radius: 50%; background: var(--color-error); color: white; border: none; font-size: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: bold; z-index: 10; line-height: 1;">&times;</button>
            ${!m.isCover ? `<button type="button" class="btn-set-temp-cover" data-id="${m.id}" style="position: absolute; bottom: 6px; right: 6px; background: white; border: 1px solid rgba(0,0,0,0.15); font-size: 9px; font-weight: bold; padding: 3px 6px; border-radius: var(--radius-sm); cursor: pointer; color: var(--color-primary); z-index: 10;">Set Cover</button>` : ''}
          </div>
        `;
      }).join('');

      // Bind media delete / cover triggers
      container.querySelectorAll('.btn-delete-temp-media').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const mediaId = parseFloat(btn.getAttribute('data-id'));
          state.tempPropertyMedia = state.tempPropertyMedia.filter(m => m.id !== mediaId);
          renderTempMediaGallery();
        });
      });

      container.querySelectorAll('.btn-set-temp-cover').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const mediaId = parseFloat(btn.getAttribute('data-id'));
          state.tempPropertyMedia = state.tempPropertyMedia.map(m => ({
            ...m,
            isCover: m.id === mediaId
          }));
          renderTempMediaGallery();
        });
      });

      // Bind media lightbox previews
      container.querySelectorAll('.prop-media-item-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-delete-temp-media') || e.target.closest('.btn-set-temp-cover')) return;
          const mediaId = parseFloat(card.getAttribute('data-id'));
          const item = state.tempPropertyMedia.find(m => m.id === mediaId);
          if (item) {
            openLightbox(item.src, item.type === 'video', 'Media Gallery Item Preview');
          }
        });
      });
    };

    const updateTempDocsUI = () => {
      const docs = state.tempPropertyDocs || { ownership: null, survey: null, cert: null, utility: null };
      const docKeys = ['ownership', 'survey', 'cert', 'utility'];
      
      docKeys.forEach(k => {
        const docFile = docs[k];
        const statusBadge = document.getElementById(`label-doc-${k}-status`);
        const viewBtn = document.querySelector(`.btn-view-doc[data-doc="${k}"]`);
        
        if (docFile) {
          statusBadge.textContent = docFile.status || 'Under Review';
          statusBadge.style.backgroundColor = docFile.status === 'Verified' ? 'var(--color-success-bg)' : 'var(--color-warning-bg)';
          statusBadge.style.color = docFile.status === 'Verified' ? 'var(--color-success)' : 'var(--color-primary)';
          statusBadge.className = `badge ${docFile.status === 'Verified' ? 'badge-success' : 'badge-warning'}`;
          if (viewBtn) viewBtn.style.display = 'inline-block';
        } else {
          statusBadge.textContent = 'Missing';
          statusBadge.style.backgroundColor = '#FEF2F2';
          statusBadge.style.color = '#EF4444';
          statusBadge.className = 'badge';
          if (viewBtn) viewBtn.style.display = 'none';
        }
      });
    };

    const openLightbox = (src, isVideo, title) => {
      const lightbox = document.getElementById('property-lightbox-modal');
      const img = document.getElementById('lightbox-img');
      const video = document.getElementById('lightbox-video');
      const caption = document.getElementById('lightbox-title');
      
      if (!lightbox) return;

      if (isVideo) {
        if (img) img.style.display = 'none';
        if (video) {
          video.src = src;
          video.style.display = 'block';
          video.play();
        }
      } else {
        if (video) {
          video.style.display = 'none';
          video.pause();
        }
        if (img) {
          img.src = src;
          img.style.display = 'block';
        }
      }
      if (caption) caption.textContent = title;
      lightbox.style.display = 'flex';
    };

    // Tab buttons switching inside modal
    document.querySelectorAll('.prop-modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.prop-modal-tab-btn').forEach(b => {
          b.classList.remove('active');
          b.style.color = '#4B5563';
          b.style.borderBottomColor = 'transparent';
        });
        btn.classList.add('active');
        btn.style.color = 'var(--color-secondary)';
        btn.style.borderBottomColor = 'var(--color-secondary)';

        // Hide all sections, show clicked target
        const targetSection = btn.getAttribute('data-target');
        document.querySelectorAll('.prop-modal-section').forEach(sec => {
          sec.style.display = 'none';
        });
        const panel = document.getElementById(targetSection);
        if (panel) panel.style.display = 'block';

        // Update primary action button text dynamically
        const primaryBtn = document.getElementById('btn-submit-publish');
        const action = document.getElementById('prop-action').value;
        if (primaryBtn) {
          if (targetSection === 'prop-section-docs') {
            primaryBtn.textContent = action === 'create' ? 'Publish Listing' : 'Update Listing';
          } else {
            primaryBtn.textContent = 'Next \u2192';
          }
        }
      });
    });

    // File input compression simulation
    const handleFileCompression = (file, callback) => {
      const loader = document.getElementById('prop-media-compress-loader');
      if (loader) loader.style.display = 'block';
      
      setTimeout(() => {
        if (loader) loader.style.display = 'none';
        const reader = new FileReader();
        reader.onload = (event) => {
          callback(event.target.result);
        };
        reader.readAsDataURL(file);
      }, 700); // 700ms simulation delay
    };

    // Media file uploader dropzone
    document.getElementById('prop-media-dropzone')?.addEventListener('click', () => {
      document.getElementById('prop-media-input')?.click();
    });

    document.getElementById('prop-media-input')?.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      let count = 0;
      files.forEach(file => {
        handleFileCompression(file, (base64) => {
          const type = file.type.startsWith('video/') ? 'video' : 'image';
          state.tempPropertyMedia.push({
            id: Date.now() + Math.random(),
            type,
            src: base64,
            isCover: state.tempPropertyMedia.length === 0 // Make cover if first
          });
          count++;
          if (count === files.length) {
            renderTempMediaGallery();
          }
        });
      });
    });

    // Legal Documents upload buttons mapping hidden file triggers
    const docsInputMap = {
      ownership: 'prop-doc-ownership',
      survey: 'prop-doc-survey',
      cert: 'prop-doc-cert',
      utility: 'prop-doc-utility'
    };

    Object.keys(docsInputMap).forEach(key => {
      document.getElementById(`btn-upload-doc-${key}`)?.addEventListener('click', () => {
        document.getElementById(docsInputMap[key])?.click();
      });

      document.getElementById(docsInputMap[key])?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          handleFileCompression(file, (base64) => {
            state.tempPropertyDocs[key] = {
              name: file.name,
              src: base64,
              status: 'Under Review'
            };
            updateTempDocsUI();
          });
        }
      });
    });

    // Document audit simulation status dropdown listener
    document.getElementById('sim-doc-audit-status')?.addEventListener('change', (e) => {
      const statusVal = e.target.value;
      const keys = Object.keys(state.tempPropertyDocs);
      keys.forEach(k => {
        if (state.tempPropertyDocs[k]) {
          state.tempPropertyDocs[k].status = statusVal;
        }
      });
      updateTempDocsUI();
    });

    // Document view triggers
    document.querySelectorAll('.btn-view-doc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = btn.getAttribute('data-doc');
        const docFile = state.tempPropertyDocs[key];
        if (docFile) {
          const isPdf = docFile.name.endsWith('.pdf');
          openLightbox(docFile.src, false, `${key.toUpperCase()} Verification Document Preview`);
        }
      });
    });

    // Lightbox close trigger click
    document.getElementById('lightbox-close-btn')?.addEventListener('click', () => {
      const lightbox = document.getElementById('property-lightbox-modal');
      if (lightbox) lightbox.style.display = 'none';
      const video = document.getElementById('lightbox-video');
      if (video) {
        video.pause();
        video.src = '';
      }
    });

    document.getElementById('property-lightbox-modal')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('property-lightbox-modal')) {
        document.getElementById('property-lightbox-modal').style.display = 'none';
        const video = document.getElementById('lightbox-video');
        if (video) {
          video.pause();
          video.src = '';
        }
      }
    });

    // Quick add floating button
    document.getElementById('btn-quick-listing-modal')?.addEventListener('click', () => {
      // Clear fields for new creation
      document.getElementById('prop-id').value = '';
      document.getElementById('prop-action').value = 'create';
      document.getElementById('prop-title').value = '';
      document.getElementById('prop-street').value = '';
      document.getElementById('prop-location').value = '';
      document.getElementById('prop-rent').value = '';
      document.getElementById('prop-caution').value = '';
      document.getElementById('prop-service-charge').value = '';
      document.getElementById('prop-bedrooms').value = '2';
      document.getElementById('prop-bathrooms').value = '2';
      document.getElementById('prop-max-occupancy').value = '4';
      document.getElementById('prop-lease-duration').value = '12 months';
      document.getElementById('prop-cancellation-policy').value = 'Flexible';
      document.getElementById('prop-pet-policy').value = 'Allowed';
      document.getElementById('prop-smoking-policy').value = 'Not Allowed';
      document.getElementById('prop-desc').value = '';
      document.getElementById('prop-rules').value = '';
      document.querySelectorAll('input[name="amenity"]').forEach(c => c.checked = ['Power Backup', 'Security', 'Water Treatment', 'Parking'].includes(c.value));
      
      document.getElementById('modal-title-text').textContent = 'Create Property Listing';
      document.getElementById('btn-submit-publish').textContent = 'Publish Listing';
      document.getElementById('btn-save-draft').textContent = 'Save as Draft';

      // Reset tabs
      document.querySelector('.prop-modal-tab-btn[data-target="prop-section-basic"]')?.click();
      state.tempPropertyMedia = [];
      state.tempPropertyDocs = { ownership: null, survey: null, cert: null, utility: null };
      renderTempMediaGallery();
      updateTempDocsUI();

      if (addModal) addModal.style.display = 'flex';
    });

    document.getElementById('btn-open-listing-modal')?.addEventListener('click', () => {
      // Clear fields for new creation
      document.getElementById('prop-id').value = '';
      document.getElementById('prop-action').value = 'create';
      document.getElementById('prop-title').value = '';
      document.getElementById('prop-street').value = '';
      document.getElementById('prop-location').value = '';
      document.getElementById('prop-rent').value = '';
      document.getElementById('prop-caution').value = '';
      document.getElementById('prop-service-charge').value = '';
      document.getElementById('prop-bedrooms').value = '2';
      document.getElementById('prop-bathrooms').value = '2';
      document.getElementById('prop-max-occupancy').value = '4';
      document.getElementById('prop-lease-duration').value = '12 months';
      document.getElementById('prop-cancellation-policy').value = 'Flexible';
      document.getElementById('prop-pet-policy').value = 'Allowed';
      document.getElementById('prop-smoking-policy').value = 'Not Allowed';
      document.getElementById('prop-desc').value = '';
      document.getElementById('prop-rules').value = '';
      document.querySelectorAll('input[name="amenity"]').forEach(c => c.checked = ['Power Backup', 'Security', 'Water Treatment', 'Parking'].includes(c.value));

      document.getElementById('modal-title-text').textContent = 'Create Property Listing';
      document.getElementById('btn-submit-publish').textContent = 'Publish Listing';
      document.getElementById('btn-save-draft').textContent = 'Save as Draft';

      // Reset tabs
      document.querySelector('.prop-modal-tab-btn[data-target="prop-section-basic"]')?.click();
      state.tempPropertyMedia = [];
      state.tempPropertyDocs = { ownership: null, survey: null, cert: null, utility: null };
      renderTempMediaGallery();
      updateTempDocsUI();

      if (addModal) addModal.style.display = 'flex';
    });

    document.getElementById('modal-close-btn')?.addEventListener('click', () => {
      if (addModal) addModal.style.display = 'none';
    });

    document.getElementById('btn-cancel-modal')?.addEventListener('click', () => {
      if (addModal) addModal.style.display = 'none';
    });

    // Save property utility supporting draft or published
    const saveProperty = (statusVal) => {
      const idVal = document.getElementById('prop-id').value;
      const action = document.getElementById('prop-action').value;
      const title = document.getElementById('prop-title').value.trim();
      const streetAddress = document.getElementById('prop-street').value.trim();
      const location = document.getElementById('prop-location').value.trim();
      const city = document.getElementById('prop-city').value.trim();
      const rent = parseInt(document.getElementById('prop-rent').value);
      const caution = parseInt(document.getElementById('prop-caution').value) || 0;
      const serviceCharge = parseInt(document.getElementById('prop-service-charge').value) || 0;
      const bedrooms = parseInt(document.getElementById('prop-bedrooms').value) || 1;
      const bathrooms = parseInt(document.getElementById('prop-bathrooms').value) || 1;
      const maxOccupancy = parseInt(document.getElementById('prop-max-occupancy').value) || 4;
      const leaseDuration = document.getElementById('prop-lease-duration').value;
      const cancellationPolicy = document.getElementById('prop-cancellation-policy').value;
      const petPolicy = document.getElementById('prop-pet-policy').value;
      const smokingPolicy = document.getElementById('prop-smoking-policy').value;
      const description = document.getElementById('prop-desc').value.trim();
      const rules = document.getElementById('prop-rules').value.trim() || 'Standard house rules apply.';

      if (!title || !streetAddress || !location || !city || !rent || !description) {
        alert("Please fill in all required listing fields, including the property description and street address.");
        return;
      }

      // Gather amenities
      const amenities = [];
      document.querySelectorAll('input[name="amenity"]:checked').forEach(c => {
        amenities.push(c.value);
      });

      // Find Cover image src from temp gallery
      const coverItem = state.tempPropertyMedia.find(m => m.isCover) || state.tempPropertyMedia[0];
      const coverPhoto = coverItem ? coverItem.src : 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600';

      if (action === 'create') {
        const newProp = {
          id: Date.now(),
          title,
          streetAddress,
          location,
          city,
          rent,
          cautionDeposit: caution,
          serviceCharge,
          bedrooms,
          bathrooms,
          maxOccupancy,
          leaseDuration,
          cancellationPolicy,
          petPolicy,
          smokingPolicy,
          description,
          houseRules: rules,
          amenities,
          propertyType: 'Apartment',
          status: statusVal, // 'Published', 'Draft', 'Paused', 'Archived'
          occupied: false,
          tenantName: null,
          leaseEnd: null,
          renewalStatus: 'N/A',
          image: coverPhoto,
          media: [...state.tempPropertyMedia],
          documents: { ...state.tempPropertyDocs },
          units: [
            { id: Date.now() + 1, number: 'Unit A', status: 'Vacant', rent: rent, tenant: null, bedrooms: bedrooms, bathrooms: bathrooms, sqft: 1000, furnishing: 'Unfurnished', image: coverPhoto }
          ]
        };

        const updatedProperties = [...state.landlordProperties, newProp];
        
        state.notifications.unshift({
          id: Date.now(),
          type: 'verification',
          text: `Listing ${statusVal === 'Draft' ? 'Saved as Draft' : 'Published'}: "${title}" added.`,
          time: 'Just now',
          read: false
        });

        updateState({ landlordProperties: updatedProperties });
        alert(`Property listing "${title}" has been successfully ${statusVal === 'Draft' ? 'saved as a draft' : 'published'}!`);
      } else {
        const editingId = parseInt(idVal);
        const updatedProperties = state.landlordProperties.map(p => {
          if (p.id === editingId) {
            return {
              ...p,
              title,
              streetAddress,
              location,
              city,
              rent,
              cautionDeposit: caution,
              serviceCharge,
              bedrooms,
              bathrooms,
              maxOccupancy,
              leaseDuration,
              cancellationPolicy,
              petPolicy,
              smokingPolicy,
              description,
              houseRules: rules,
              amenities,
              status: statusVal,
              image: coverPhoto,
              media: [...state.tempPropertyMedia],
              documents: { ...state.tempPropertyDocs }
            };
          }
          return p;
        });

        state.notifications.unshift({
          id: Date.now(),
          type: 'verification',
          text: `Listing Updated: "${title}" credentials modified.`,
          time: 'Just now',
          read: false
        });

        updateState({ landlordProperties: updatedProperties });
        alert(`Property listing "${title}" has been successfully updated.`);
      }

      if (addModal) addModal.style.display = 'none';
      navigateTo('landlord');
    };

    // Publish trigger (form submit)
    document.getElementById('add-property-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const activeTabBtn = document.querySelector('.prop-modal-tab-btn.active');
      const targetSection = activeTabBtn ? activeTabBtn.getAttribute('data-target') : '';

      if (targetSection === 'prop-section-basic') {
        document.querySelector('.prop-modal-tab-btn[data-target="prop-section-media"]')?.click();
      } else if (targetSection === 'prop-section-media') {
        document.querySelector('.prop-modal-tab-btn[data-target="prop-section-docs"]')?.click();
      } else {
        saveProperty('Published');
      }
    });

    // Save as draft trigger button click
    document.getElementById('btn-save-draft')?.addEventListener('click', (e) => {
      e.preventDefault();
      saveProperty('Draft');
    });

    // Delete listing
    document.querySelectorAll('.btn-delete-listing').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const prop = state.landlordProperties.find(p => p.id === id);
        showConfirmModal(`Are you sure you want to delete "${prop?.title || 'this listing'}" from Haven? This will remove it from search listings.`, () => {
          const updated = state.landlordProperties.filter(p => p.id !== id);
          updateState({ landlordProperties: updated });
          alert("Listing deleted.");
          navigateTo('landlord');
        });
      });
    });

    // Edit listing prepopulate and open modal
    document.querySelectorAll('.btn-edit-listing').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const prop = state.landlordProperties.find(p => p.id === id);
        if (prop) {
          document.getElementById('prop-id').value = prop.id;
          document.getElementById('prop-action').value = 'edit';
          document.getElementById('prop-title').value = prop.title;
          document.getElementById('prop-street').value = prop.streetAddress || '';
          document.getElementById('prop-location').value = prop.location;
          document.getElementById('prop-city').value = prop.city;
          document.getElementById('prop-rent').value = prop.rent;
          document.getElementById('prop-caution').value = prop.cautionDeposit || '';
          document.getElementById('prop-service-charge').value = prop.serviceCharge || '';
          document.getElementById('prop-bedrooms').value = prop.bedrooms;
          document.getElementById('prop-bathrooms').value = prop.bathrooms;
          document.getElementById('prop-max-occupancy').value = prop.maxOccupancy || 4;
          document.getElementById('prop-lease-duration').value = prop.leaseDuration || '12 months';
          document.getElementById('prop-cancellation-policy').value = prop.cancellationPolicy || 'Flexible';
          document.getElementById('prop-pet-policy').value = prop.petPolicy || 'Allowed';
          document.getElementById('prop-smoking-policy').value = prop.smokingPolicy || 'Not Allowed';
          document.getElementById('prop-desc').value = prop.description || '';
          document.getElementById('prop-rules').value = prop.houseRules || '';

          // Prepopulate amenities checkboxes
          document.querySelectorAll('input[name="amenity"]').forEach(c => {
            c.checked = prop.amenities ? prop.amenities.includes(c.value) : false;
          });

          document.getElementById('modal-title-text').textContent = 'Edit Property Listing';
          document.getElementById('btn-submit-publish').textContent = 'Update Listing';
          document.getElementById('btn-save-draft').textContent = prop.status === 'Draft' ? 'Keep as Draft' : 'Demote to Draft';

          // Set temporary media and documents
          state.tempPropertyMedia = prop.media ? [...prop.media] : (prop.image ? [{ id: Date.now(), type: 'image', src: prop.image, isCover: true }] : []);
          state.tempPropertyDocs = prop.documents ? { ...prop.documents } : { ownership: null, survey: null, cert: null, utility: null };
          
          // Reset tabs
          document.querySelector('.prop-modal-tab-btn[data-target="prop-section-basic"]')?.click();
          renderTempMediaGallery();
          updateTempDocsUI();

          if (addModal) addModal.style.display = 'flex';
        }
      });
    });

    // ----------------------------------------------------
    // TAB: UNIT MANAGEMENT & ACTIONS
    // ----------------------------------------------------
    const manageUnitsModal = document.getElementById('manage-units-modal');
    const unitForm = document.getElementById('unit-form-section');
    let activePropForUnits = null;

    const renderUnitsList = (prop) => {
      const container = document.getElementById('units-list-container');
      if (!container) return;

      const units = prop.units || [];
      if (units.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: #9CA3AF; padding: 20px; font-size: 12px;">No sub-units defined. Add a unit above to get started.</div>`;
        return;
      }

      container.innerHTML = units.map(u => {
        const imgTag = u.image ? `<img src="${u.image}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 4px;">` : `<div style="width: 44px; height: 44px; background: #E5E7EB; border-radius: 4px; display:flex; align-items:center; justify-content:center; font-size:9px; color:#9CA3AF;">No Image</div>`;
        
        return `
          <div style="display: flex; align-items: center; justify-content: space-between; background: white; padding: 12px; border: 1px solid rgba(0,0,0,0.06); border-radius: var(--radius-sm); box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            <div style="display: flex; gap: 12px; align-items: center;">
              ${imgTag}
              <div>
                <strong style="font-size: 13px; color: var(--color-primary);">${u.number}</strong>
                <div style="font-size: 11px; color: #6B7280; margin-top: 2px;">
                  ₦${(u.rent || 0).toLocaleString()}/yr • ${u.bedrooms} Bed • ${u.bathrooms} Bath • ${u.sqft || 0} sqft • ${u.furnishing || 'Unfurnished'}
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge ${u.status === 'Occupied' ? 'badge-success' : (u.status === 'Maintenance' ? 'badge-error' : 'badge-warning')}" style="font-size: 9px; padding: 2px 6px;">${u.status}</span>
              <button class="btn btn-outline btn-xs btn-edit-unit" data-id="${u.id}" style="padding: 4px 8px;">Edit</button>
              <button class="btn btn-outline btn-xs btn-delete-unit" data-id="${u.id}" style="padding: 4px 8px; color: var(--color-error); border-color: var(--color-error);">Delete</button>
            </div>
          </div>
        `;
      }).join('');

      // Bind edit unit
      container.querySelectorAll('.btn-edit-unit').forEach(btn => {
        btn.addEventListener('click', () => {
          const unitId = parseFloat(btn.getAttribute('data-id'));
          const unitObj = units.find(u => u.id === unitId);
          if (unitObj) {
            document.getElementById('unit-id').value = unitObj.id;
            document.getElementById('unit-action').value = 'edit';
            document.getElementById('unit-number').value = unitObj.number;
            document.getElementById('unit-rent').value = unitObj.rent;
            document.getElementById('unit-bedrooms').value = unitObj.bedrooms;
            document.getElementById('unit-bathrooms').value = unitObj.bathrooms;
            document.getElementById('unit-sqft').value = unitObj.sqft || '';
            document.getElementById('unit-furnishing').value = unitObj.furnishing || 'Unfurnished';
            document.getElementById('unit-availability').value = unitObj.status;
            
            state.tempUnitImage = unitObj.image || null;
            const previewBox = document.getElementById('unit-image-preview-box');
            if (previewBox) {
              previewBox.innerHTML = unitObj.image ? `<img src="${unitObj.image}" style="width: 100%; height: 100%; object-fit: cover;">` : `<span style="font-size: 9px; color: #9CA3AF;">No Image</span>`;
            }

            document.getElementById('unit-form-title').textContent = 'Edit Unit Details';
            if (unitForm) unitForm.style.display = 'block';
          }
        });
      });

      // Bind delete unit
      container.querySelectorAll('.btn-delete-unit').forEach(btn => {
        btn.addEventListener('click', () => {
          const unitId = parseFloat(btn.getAttribute('data-id'));
          showConfirmModal("Are you sure you want to delete this sub-unit?", () => {
            prop.units = (prop.units || []).filter(u => u.id !== unitId);
            const updatedProperties = state.landlordProperties.map(p => p.id === prop.id ? prop : p);
            updateState({ landlordProperties: updatedProperties });
            renderUnitsList(prop);
          });
        });
      });
    };

    // Open manage units modal
    document.querySelectorAll('.btn-manage-units').forEach(btn => {
      btn.addEventListener('click', () => {
        const propId = parseInt(btn.getAttribute('data-id'));
        const prop = state.landlordProperties.find(p => p.id === propId);
        if (prop) {
          activePropForUnits = prop;
          document.getElementById('unit-prop-id').value = prop.id;
          document.getElementById('manage-units-modal-title').textContent = `Manage Units: ${prop.title}`;
          if (unitForm) unitForm.style.display = 'none';
          
          renderUnitsList(prop);
          if (manageUnitsModal) manageUnitsModal.style.display = 'flex';
        }
      });
    });

    document.getElementById('manage-units-close-btn')?.addEventListener('click', () => {
      if (manageUnitsModal) manageUnitsModal.style.display = 'none';
      navigateTo('landlord');
    });

    document.getElementById('btn-show-add-unit')?.addEventListener('click', () => {
      document.getElementById('unit-id').value = '';
      document.getElementById('unit-action').value = 'create';
      document.getElementById('unit-number').value = '';
      document.getElementById('unit-rent').value = activePropForUnits ? activePropForUnits.rent : '';
      document.getElementById('unit-bedrooms').value = activePropForUnits ? activePropForUnits.bedrooms : '2';
      document.getElementById('unit-bathrooms').value = activePropForUnits ? activePropForUnits.bathrooms : '2';
      document.getElementById('unit-sqft').value = '';
      document.getElementById('unit-furnishing').value = 'Unfurnished';
      document.getElementById('unit-availability').value = 'Vacant';
      
      state.tempUnitImage = null;
      const previewBox = document.getElementById('unit-image-preview-box');
      if (previewBox) {
        previewBox.innerHTML = `<span style="font-size: 9px; color: #9CA3AF;">No Image</span>`;
      }

      document.getElementById('unit-form-title').textContent = 'Add Property Unit';
      if (unitForm) unitForm.style.display = 'block';
    });

    document.getElementById('btn-cancel-unit-form')?.addEventListener('click', () => {
      if (unitForm) unitForm.style.display = 'none';
    });

    // Handle Unit image picker
    document.getElementById('btn-upload-unit-image')?.addEventListener('click', () => {
      document.getElementById('unit-image-file')?.click();
    });

    document.getElementById('unit-image-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          state.tempUnitImage = event.target.result;
          const previewBox = document.getElementById('unit-image-preview-box');
          if (previewBox) {
            previewBox.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
          }
        };
        reader.readAsDataURL(file);
      }
    });

    // Save unit button trigger
    document.getElementById('btn-save-unit')?.addEventListener('click', () => {
      const number = document.getElementById('unit-number').value.trim();
      const rentVal = parseInt(document.getElementById('unit-rent').value);
      const bedroomsVal = parseInt(document.getElementById('unit-bedrooms').value) || 1;
      const bathroomsVal = parseInt(document.getElementById('unit-bathrooms').value) || 1;
      const sqftVal = parseInt(document.getElementById('unit-sqft').value) || 0;
      const furnishingVal = document.getElementById('unit-furnishing').value;
      const availabilityVal = document.getElementById('unit-availability').value;
      const action = document.getElementById('unit-action').value;
      const unitIdVal = document.getElementById('unit-id').value;

      if (!number || !rentVal) {
        alert("Please fill in unit name/number and rent amount.");
        return;
      }

      const defaultImg = activePropForUnits ? activePropForUnits.image : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600';
      const unitImg = state.tempUnitImage || defaultImg;

      if (action === 'create') {
        const newUnit = {
          id: Date.now(),
          number,
          rent: rentVal,
          bedrooms: bedroomsVal,
          bathrooms: bathroomsVal,
          sqft: sqftVal,
          furnishing: furnishingVal,
          status: availabilityVal,
          tenant: null,
          image: unitImg
        };
        if (!activePropForUnits.units) activePropForUnits.units = [];
        activePropForUnits.units.push(newUnit);
      } else {
        const unitId = parseFloat(unitIdVal);
        activePropForUnits.units = activePropForUnits.units.map(u => {
          if (u.id === unitId) {
            return {
              ...u,
              number,
              rent: rentVal,
              bedrooms: bedroomsVal,
              bathrooms: bathroomsVal,
              sqft: sqftVal,
              furnishing: furnishingVal,
              status: availabilityVal,
              image: unitImg
            };
          }
          return u;
        });
      }

      // Update global state property array
      const updatedProperties = state.landlordProperties.map(p => p.id === activePropForUnits.id ? activePropForUnits : p);
      updateState({ landlordProperties: updatedProperties });
      
      if (unitForm) unitForm.style.display = 'none';
      renderUnitsList(activePropForUnits);
      alert("Sub-unit saved successfully.");
    });


    // ----------------------------------------------------
    // PAUSE, RESUME, ARCHIVE ACTIONS
    // ----------------------------------------------------
    document.querySelectorAll('.btn-pause-listing').forEach(btn => {
      btn.addEventListener('click', () => {
        const propId = parseInt(btn.getAttribute('data-id'));
        const updated = state.landlordProperties.map(p => p.id === propId ? { ...p, status: 'Paused' } : p);
        updateState({ landlordProperties: updated });
        alert("Property listing has been paused. It will temporarily not show in active public searches.");
        navigateTo('landlord');
      });
    });

    document.querySelectorAll('.btn-resume-listing').forEach(btn => {
      btn.addEventListener('click', () => {
        const propId = parseInt(btn.getAttribute('data-id'));
        const updated = state.landlordProperties.map(p => p.id === propId ? { ...p, status: 'Published' } : p);
        updateState({ landlordProperties: updated });
        alert("Property listing has been resumed and is now publicly live!");
        navigateTo('landlord');
      });
    });

    document.querySelectorAll('.btn-archive-listing').forEach(btn => {
      btn.addEventListener('click', () => {
        const propId = parseInt(btn.getAttribute('data-id'));
        showConfirmModal("Are you sure you want to archive this property? It will be marked as Archived but not fully deleted.", () => {
          const updated = state.landlordProperties.map(p => p.id === propId ? { ...p, status: 'Archived' } : p);
          updateState({ landlordProperties: updated });
          alert("Listing archived.");
          navigateTo('landlord');
        });
      });
    });


    // ----------------------------------------------------
    // PUBLIC PREVIEW MODAL & AI CHECKLIST
    // ----------------------------------------------------
    const previewModal = document.getElementById('listing-preview-modal');
    let activePreviewProp = null;

    const runAIQualityChecklist = (prop) => {
      const itemsContainer = document.getElementById('preview-checklist-items');
      const scoreLabel = document.getElementById('preview-ai-score');
      const progressBar = document.getElementById('preview-ai-progress');
      if (!itemsContainer || !scoreLabel || !progressBar) return;

      const checklist = [];
      let score = 0;

      // 1. Description Length check
      const descLen = prop.description ? prop.description.length : 0;
      if (descLen >= 100) {
        score += 20;
        checklist.push(`<div>✅ Description is descriptive & detailed (${descLen} chars)</div>`);
      } else if (descLen >= 40) {
        score += 10;
        checklist.push(`<div>⚠️ Description is brief (${descLen} chars) - Add more features</div>`);
      } else {
        checklist.push(`<div>❌ Missing: Comprehensive property description (min 40 chars)</div>`);
      }

      // 2. Media Gallery count check
      const mediaCount = prop.media ? prop.media.length : 0;
      if (mediaCount >= 3) {
        score += 20;
        checklist.push(`<div>✅ Media gallery contains rich visuals (${mediaCount} files)</div>`);
      } else if (mediaCount >= 1) {
        score += 10;
        checklist.push(`<div>⚠️ Low Media: Add at least 3 photos/videos (currently ${mediaCount})</div>`);
      } else {
        checklist.push(`<div>❌ Missing: Property image gallery uploads</div>`);
      }

      // 3. Pricing details configured
      const hasCharge = prop.serviceCharge !== undefined && prop.serviceCharge !== null;
      if (prop.rent && hasCharge) {
        score += 20;
        checklist.push(`<div>✅ Rent and service charge pricing configured</div>`);
      } else {
        checklist.push(`<div>❌ Missing: Service charge configuration</div>`);
      }

      // 4. Policies defined
      if (prop.petPolicy && prop.smokingPolicy && prop.cancellationPolicy) {
        score += 20;
        checklist.push(`<div>✅ House rules, pet, and smoking policies declared</div>`);
      } else {
        checklist.push(`<div>❌ Missing: Standard tenant occupancy policies</div>`);
      }

      // 5. Verification legal docs uploaded
      const docs = prop.documents || {};
      const docsCount = Object.values(docs).filter(val => val !== null).length;
      if (docsCount >= 2) {
        score += 20;
        checklist.push(`<div>✅ Secure: Multiple legal certificates verified (${docsCount} docs)</div>`);
      } else if (docsCount === 1) {
        score += 10;
        checklist.push(`<div>⚠️ Verify: Add certificate of occupancy for verified badge</div>`);
      } else {
        checklist.push(`<div>❌ Unverified: Missing property proof documents</div>`);
      }

      // Render Score
      scoreLabel.textContent = `${score}%`;
      progressBar.style.width = `${score}%`;
      if (score >= 80) {
        scoreLabel.style.color = 'var(--color-success)';
        progressBar.style.backgroundColor = 'var(--color-success)';
      } else if (score >= 50) {
        scoreLabel.style.color = 'var(--color-warning)';
        progressBar.style.backgroundColor = 'var(--color-warning)';
      } else {
        scoreLabel.style.color = 'var(--color-error)';
        progressBar.style.backgroundColor = 'var(--color-error)';
      }

      itemsContainer.innerHTML = checklist.join('');
    };

    // Bind preview listing triggers
    document.querySelectorAll('.btn-preview-listing').forEach(btn => {
      btn.addEventListener('click', () => {
        const propId = parseInt(btn.getAttribute('data-id'));
        const prop = state.landlordProperties.find(p => p.id === propId);
        if (prop) {
          activePreviewProp = prop;
          document.getElementById('preview-prop-id').value = prop.id;
          
          // Populate text fields
          document.getElementById('preview-title').textContent = prop.title;
          document.getElementById('preview-location-text').textContent = `📍 ${prop.streetAddress ? `${prop.streetAddress}, ` : ''}${prop.location}, ${prop.city}`;
          document.getElementById('preview-description').textContent = prop.description || 'No description provided.';
          document.getElementById('preview-bedrooms').textContent = `${prop.bedrooms || 1} Bed${prop.bedrooms > 1 ? 's' : ''}`;
          document.getElementById('preview-bathrooms').textContent = `${prop.bathrooms || 1} Bath${prop.bathrooms > 1 ? 's' : ''}`;
          document.getElementById('preview-occupants').textContent = `${prop.maxOccupancy || 4} Max`;
          
          document.getElementById('preview-rent-val').textContent = `₦${(prop.rent || 0).toLocaleString()}/yr`;
          document.getElementById('preview-caution-val').textContent = `₦${(prop.cautionDeposit || 0).toLocaleString()}`;
          document.getElementById('preview-service-val').textContent = `₦${(prop.serviceCharge || 0).toLocaleString()}`;
          document.getElementById('preview-lease-val').textContent = prop.leaseDuration || '12 Months';
          document.getElementById('preview-pet-val').textContent = prop.petPolicy || 'Allowed';
          document.getElementById('preview-smoking-val').textContent = prop.smokingPolicy || 'Not Allowed';

          // Status Badge
          const status = prop.status || 'Published';
          const statusBadge = document.getElementById('preview-status-badge');
          if (statusBadge) {
            statusBadge.textContent = status;
            statusBadge.style.backgroundColor = status === 'Published' ? 'var(--color-success)' : (status === 'Paused' ? '#F59E0B' : (status === 'Archived' ? '#1F2937' : '#6B7280'));
          }

          // Cover image
          const coverBox = document.getElementById('preview-cover-photo');
          if (coverBox) {
            coverBox.style.backgroundImage = `url('${prop.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'}')`;
          }

          // Amenities Tags
          const tagContainer = document.getElementById('preview-amenities-tags');
          if (tagContainer) {
            if (prop.amenities && prop.amenities.length > 0) {
              tagContainer.innerHTML = prop.amenities.map(a => `<span style="font-size: 10px; background: rgba(13, 27, 75, 0.05); color: var(--color-primary); padding: 4px 10px; border-radius: 4px; font-weight: bold;">${a}</span>`).join('');
            } else {
              tagContainer.innerHTML = `<span style="font-size: 11px; color:#9CA3AF;">No amenities selected.</span>`;
            }
          }

          // Run Quality score checklist audit
          runAIQualityChecklist(prop);

          // Configure status control action buttons state
          const pubBtn = document.getElementById('btn-preview-publish');
          const pauseBtn = document.getElementById('btn-preview-pause');
          const arcBtn = document.getElementById('btn-preview-archive');

          if (pubBtn) pubBtn.style.display = status === 'Published' ? 'none' : 'block';
          if (pauseBtn) pauseBtn.style.display = status === 'Published' ? 'block' : 'none';
          if (arcBtn) arcBtn.style.display = status === 'Archived' ? 'none' : 'block';

          if (previewModal) previewModal.style.display = 'flex';
        }
      });
    });

    document.getElementById('preview-close-btn')?.addEventListener('click', () => {
      if (previewModal) previewModal.style.display = 'none';
      navigateTo('landlord');
    });

    // Preview action buttons click logic
    document.getElementById('btn-preview-publish')?.addEventListener('click', () => {
      if (activePreviewProp) {
        activePreviewProp.status = 'Published';
        const updated = state.landlordProperties.map(p => p.id === activePreviewProp.id ? activePreviewProp : p);
        updateState({ landlordProperties: updated });
        alert("Listing published successfully!");
        if (previewModal) previewModal.style.display = 'none';
        navigateTo('landlord');
      }
    });

    document.getElementById('btn-preview-pause')?.addEventListener('click', () => {
      if (activePreviewProp) {
        activePreviewProp.status = 'Paused';
        const updated = state.landlordProperties.map(p => p.id === activePreviewProp.id ? activePreviewProp : p);
        updateState({ landlordProperties: updated });
        alert("Listing paused successfully.");
        if (previewModal) previewModal.style.display = 'none';
        navigateTo('landlord');
      }
    });

    document.getElementById('btn-preview-archive')?.addEventListener('click', () => {
      if (activePreviewProp) {
        showConfirmModal("Archive this property listing?", () => {
          activePreviewProp.status = 'Archived';
          const updated = state.landlordProperties.map(p => p.id === activePreviewProp.id ? activePreviewProp : p);
          updateState({ landlordProperties: updated });
          alert("Listing archived.");
          if (previewModal) previewModal.style.display = 'none';
          navigateTo('landlord');
        });
      }
    });

    // ----------------------------------------------------
    // BULK UNIT UPLOAD BINDINGS
    // ----------------------------------------------------
    document.getElementById('btn-open-bulk-modal')?.addEventListener('click', () => {
      if (bulkModal) bulkModal.style.display = 'flex';
    });

    document.getElementById('bulk-close-btn')?.addEventListener('click', () => {
      if (bulkModal) bulkModal.style.display = 'none';
    });

    document.getElementById('btn-cancel-bulk')?.addEventListener('click', () => {
      if (bulkModal) bulkModal.style.display = 'none';
    });

    document.getElementById('btn-generate-mock-csv')?.addEventListener('click', () => {
      const csvBox = document.getElementById('bulk-csv-data');
      if (csvBox) {
        csvBox.value = `Unit 3A,3400000,Vacant\nUnit 3B,3400000,Vacant\nUnit 3C,3600000,Occupied\nUnit 3D,3800000,Vacant`;
      }
    });

    document.getElementById('btn-import-csv')?.addEventListener('click', () => {
      const propertyId = parseInt(document.getElementById('bulk-property-select').value);
      const csvText = document.getElementById('bulk-csv-data').value;

      if (!csvText.trim()) {
        alert("Please enter CSV rows first.");
        return;
      }

      // Parse lines
      const rows = csvText.split('\n');
      const parsedUnits = [];
      rows.forEach(row => {
        const cols = row.split(',');
        if (cols.length >= 2) {
          parsedUnits.push({
            id: Date.now() + Math.random(),
            number: cols[0].trim(),
            rent: parseInt(cols[1].trim()) || 2000000,
            status: cols[2]?.trim() || 'Vacant',
            tenant: cols[2]?.trim() === 'Occupied' ? 'Assigned Tenant' : null
          });
        }
      });

      // Update property units
      const updated = state.landlordProperties.map(p => {
        if (p.id === propertyId) {
          const currentUnits = p.units || [];
          return { ...p, units: [...currentUnits, ...parsedUnits] };
        }
        return p;
      });

      updateState({ landlordProperties: updated });
      if (bulkModal) bulkModal.style.display = 'none';
      alert(`Successfully imported ${parsedUnits.length} units into the property tracker!`);
      navigateTo('landlord');
    });

    // ----------------------------------------------------
    // TAB: AI TENANT APPROVAL PIPELINE BINDINGS
    // ----------------------------------------------------
    document.querySelectorAll('.applicant-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        updateState({ activeLandlordApplicantId: id });
        navigateTo('landlord');
      });
    });

    // Search input listener
    const searchInput = document.getElementById('search-applicants');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.applicantSearchQuery = e.target.value;
        updateState({});
        navigateTo('landlord');
        // Restore focus & cursor position
        const reInput = document.getElementById('search-applicants');
        if (reInput) {
          reInput.focus();
          const len = reInput.value.length;
          reInput.setSelectionRange(len, len);
        }
      });
    }

    // Filter status select listener
    document.getElementById('filter-app-status')?.addEventListener('change', (e) => {
      state.applicantFilterStatus = e.target.value;
      updateState({});
      navigateTo('landlord');
    });

    // Sort order select listener
    document.getElementById('sort-app-match')?.addEventListener('change', (e) => {
      state.applicantSortMatch = e.target.value;
      updateState({});
      navigateTo('landlord');
    });

    // Save internal notes
    document.querySelectorAll('.btn-save-internal-notes').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const notesText = document.getElementById('approval-comments')?.value || '';
        state.pipelineApplications = state.pipelineApplications.map(app => {
          if (app.id === id) {
            return {
              ...app,
              screening: {
                ...app.screening,
                internalNotes: notesText
              }
            };
          }
          return app;
        });
        alert("Internal screening notes saved successfully.");
        updateState({});
      });
    });

    // Approve applicant
    document.querySelectorAll('.btn-approve-application').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const applicant = state.pipelineApplications.find(a => a.id === id);
        const comments = document.getElementById('approval-comments')?.value || '';

        if (applicant) {
          // Update timeline: Landlord Decision done: true
          const updatedTimeline = applicant.timeline.map(t => {
            if (t.step === 'Landlord Decision') {
              return { ...t, date: 'Approved today', done: true };
            }
            return t;
          });

          // Update pipeline application status
          const updatedPipeline = state.pipelineApplications.map(app => {
            if (app.id === id) {
              return { 
                ...app, 
                status: 'Approved', 
                timeline: updatedTimeline,
                screening: {
                  ...app.screening,
                  internalNotes: comments
                }
              };
            }
            return app;
          });

          // Add application to global leasing pipeline if applicant name matches tenant
          if (applicant.applicantName === 'Osaze Alao') {
            state.applications = state.applications.map(app => {
              if (app.propertyId === 1) return { ...app, status: 'Approved', actionRequired: 'Fund Escrow to release move-in checklist' };
              return app;
            });
          }

          // Add notification
          state.notifications.unshift({
            id: Date.now(),
            type: 'escrow',
            text: `Application Approved: Tenancy approved for ${applicant.applicantName}. Escrow pending funding.`,
            time: 'Just now',
            read: false
          });

          updateState({ pipelineApplications: updatedPipeline });
          alert(`Application for ${applicant.applicantName} approved! Tenant has been notified to fund the Escrow Vault.`);
          navigateTo('landlord');
        }
      });
    });

    // Decline applicant
    document.querySelectorAll('.btn-decline-application').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const applicant = state.pipelineApplications.find(a => a.id === id);
        const comments = document.getElementById('approval-comments')?.value || '';

        if (applicant) {
          showConfirmModal(`Are you sure you want to decline ${applicant.applicantName}? This will reject their application.`, () => {
            // Update timeline: Landlord Decision done: true
            const updatedTimeline = applicant.timeline.map(t => {
              if (t.step === 'Landlord Decision') {
                return { ...t, date: 'Declined today', done: true };
              }
              return t;
            });

            const updatedPipeline = state.pipelineApplications.map(app => {
              if (app.id === id) {
                return { 
                  ...app, 
                  status: 'Declined', 
                  timeline: updatedTimeline,
                  screening: {
                    ...app.screening,
                    internalNotes: comments
                  }
                };
              }
              return app;
            });

            // Add notification
            state.notifications.unshift({
              id: Date.now(),
              type: 'verification',
              text: `Application Rejected: Tenancy application declined for ${applicant.applicantName}.`,
              time: 'Just now',
              read: false
            });

            updateState({ pipelineApplications: updatedPipeline });
            alert(`Application rejected.`);
            navigateTo('landlord');
          });
        }
      });
    });

    // ----------------------------------------------------
    // TAB: DIGITAL LEASE STUDIO BINDINGS (Phase 5)
    // ----------------------------------------------------
    // Select active lease card
    document.querySelectorAll('.lease-queue-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        updateState({ activeLandlordLeaseId: id });
        navigateTo('landlord');
      });
    });

    // AI Generate Lease Click
    document.getElementById('btn-ai-generate-lease')?.addEventListener('click', () => {
      const progressEl = document.getElementById('ai-lease-progress');
      const template = document.getElementById('lease-template-select')?.value || 'Standard Residential Lease';
      const activeLease = state.landlordLeases.find(l => l.id === state.activeLandlordLeaseId);
      const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

      if (activeLease && progressEl) {
        progressEl.style.display = 'block';

        // Simulate AI generation delay
        setTimeout(() => {
          let customText = '';
          if (template === 'Standard Residential Lease') {
            customText = `RESIDENTIAL LEASE AGREEMENT\n\nThis Lease Agreement is made this ${new Date().toLocaleDateString('en-US')} between Chief Alabi (Landlord) and ${activeLease.tenantName} (Tenant).\n\n1. PROPERTY: ${activeLease.propertyName}.\n2. TERM: ${activeLease.leaseDuration} starting next month.\n3. RENT: ${formatNaira(activeLease.rentAmount)} annually.\n4. SERVICE CHARGE: ${formatNaira(activeLease.serviceCharge)} annually.\n5. SECURITY DEPOSIT: Caution Deposit is strictly held in Haven Escrow Vault.\n6. RULES: Non-smoking, pet policies matching standard property portfolio rules apply.`;
          } else if (template === 'Corporate Apartment Tenancy') {
            customText = `CORPORATE APARTMENT TENANCY AGREEMENT\n\nThis Tenancy Agreement is executed between Chief Alabi (Landlord) and the Corporate Representative on behalf of ${activeLease.tenantName} (Tenant).\n\n1. PREMISES: ${activeLease.propertyName}.\n2. PAYMENT: ${formatNaira(activeLease.rentAmount)} rent fee plus ${formatNaira(activeLease.serviceCharge)} utility/maintenance charges.\n3. DURATION: ${activeLease.leaseDuration}.\n4. COVENANTS: Lessee shall keep premises in good state of repair. Corporate guarantees apply.`;
          } else {
            customText = `SHORT-LET SERVICE AGREEMENT\n\nThis Service Agreement manages the short-stay occupancy of ${activeLease.propertyName} by guest ${activeLease.tenantName}.\n\n1. RENTAL VALUE: ${formatNaira(activeLease.rentAmount)} under ${activeLease.leaseDuration} short-let rate terms.\n2. SERVICES INCLUDED: Water, cleaning, 24/7 security, back-up power.\n3. CANCELLATION: Moderate policy rules apply. Refunding deposit requires checks clearance.`;
          }

          // Add signature status lines
          customText += `\n\nSigned by Landlord: [Pending]\nSigned by Tenant: [Pending]`;

          const verNo = 'v' + (activeLease.versions.length + 1) + '.0';
          activeLease.contractText = customText;
          activeLease.template = template;
          activeLease.versions.push({
            version: verNo,
            date: new Date().toLocaleString(),
            author: 'AI Generator',
            text: customText
          });
          activeLease.auditLog.push({
            date: new Date().toLocaleString(),
            event: `New AI draft ${verNo} generated.`
          });

          updateState({});
          navigateTo('landlord');
          alert("AI Draft generated successfully!");
        }, 800);
      }
    });

    // Save Clauses & New Draft Version Click
    document.getElementById('btn-save-lease-clauses')?.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const activeLease = state.landlordLeases.find(l => l.id === id);
      const textVal = document.getElementById('lease-contract-editor')?.value || '';

      if (activeLease) {
        const verNo = 'v' + (activeLease.versions.length + 1) + '.0';
        activeLease.contractText = textVal;
        activeLease.versions.push({
          version: verNo,
          date: new Date().toLocaleString(),
          author: 'Chief Alabi',
          text: textVal
        });
        activeLease.auditLog.push({
          date: new Date().toLocaleString(),
          event: `Clauses edited. Version ${verNo} saved.`
        });

        updateState({});
        navigateTo('landlord');
        alert("Draft version " + verNo + " saved successfully!");
      }
    });

    // Restore version click
    document.querySelectorAll('.btn-restore-lease-version').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const ver = btn.getAttribute('data-version');
        const activeLease = state.landlordLeases.find(l => l.id === id);

        if (activeLease) {
          const matchVer = activeLease.versions.find(v => v.version === ver);
          if (matchVer) {
            activeLease.contractText = matchVer.text;
            activeLease.auditLog.push({
              date: new Date().toLocaleString(),
              event: `Restored back to version ${ver}.`
            });
            updateState({});
            navigateTo('landlord');
            alert(`Restored to version ${ver} successfully.`);
          }
        }
      });
    });

    // Sign Agreement Click (Landlord Signature)
    document.getElementById('btn-sign-lease-agreement')?.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const activeLease = state.landlordLeases.find(l => l.id === id);
      const signatureInput = document.getElementById('landlord-signature-input')?.value.trim();

      if (!signatureInput) {
        alert("Please type your legal name to sign the document.");
        return;
      }

      if (activeLease) {
        const signDate = new Date().toLocaleString();
        activeLease.landlordSigned = true;
        activeLease.landlordSignedDate = signDate;
        activeLease.status = 'Pending Tenant Signature';
        activeLease.contractText = activeLease.contractText.replace('Signed by Landlord: [Pending]', `Signed by Landlord: ${signatureInput} (${signDate} secure validation)`);
        activeLease.auditLog.push({
          date: signDate,
          event: `Signed digitally by Landlord "${signatureInput}" via secure token validation.`
        });

        // Add Notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'escrow',
          text: `Lease Signed: Agreement for ${activeLease.tenantName} signed. Sent to Tenant.`,
          time: 'Just now',
          read: false
        });

        updateState({});
        navigateTo('landlord');
        alert("Lease agreement successfully signed & sent to tenant for review.");
      }
    });

    // PDF Lightbox Modal controllers
    const pdfModal = document.getElementById('lease-pdf-modal');
    document.getElementById('btn-export-lease-pdf')?.addEventListener('click', () => {
      if (pdfModal) pdfModal.style.display = 'flex';
    });

    document.getElementById('lease-pdf-close-btn')?.addEventListener('click', () => {
      if (pdfModal) pdfModal.style.display = 'none';
    });

    document.getElementById('btn-print-lease-pdf')?.addEventListener('click', () => {
      alert("Spooling PDF document print job... Lease saved locally to your device downloads folder.");
      if (pdfModal) pdfModal.style.display = 'none';
    });

    // ----------------------------------------------------
    // TAB: ESCROW MONITORING & READINESS CHECKLIST
    // ----------------------------------------------------
    // Dropdown change for readiness checklist
    document.getElementById('checklist-prop-select')?.addEventListener('change', (e) => {
      updateState({ landlordSelectedReadinessEscrowId: parseInt(e.target.value) });
      navigateTo('landlord');
    });

    // Toggle checklist checkbox
    document.querySelectorAll('.readiness-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const escrowId = parseInt(e.currentTarget.getAttribute('data-escrow'));
        const checkKey = e.currentTarget.getAttribute('data-key');
        
        const updatedEscrows = state.landlordEscrows.map(esc => {
          if (esc.id === escrowId) {
            const checklist = { ...esc.readinessChecklist };
            checklist[checkKey] = !checklist[checkKey];
            
            // Check if all checklist items are now true
            const allPassed = Object.values(checklist).every(Boolean);
            let currentStatus = esc.status;
            if (allPassed && esc.status === 'Funded') {
              // Mark as ready or keep funded
            }
            return { ...esc, readinessChecklist: checklist };
          }
          return esc;
        });

        updateState({ landlordEscrows: updatedEscrows });
        navigateTo('landlord');
      });
    });

    // Trigger Escrow Release
    document.querySelectorAll('.btn-trigger-release').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const esc = state.landlordEscrows.find(e => e.id === id);

        if (esc) {
          const checkinCode = 'HAVEN-' + Math.floor(1000 + Math.random() * 9000) + '-2026';
          const payoutDate = new Date().toLocaleString();
          
          const updatedEscrows = state.landlordEscrows.map(e => {
            if (e.id === id) {
              const updatedTimeline = e.timeline.map(t => {
                if (t.label.includes('Readiness') || t.label.includes('Released')) {
                  return { ...t, date: payoutDate, done: true };
                }
                return t;
              });

              const updatedTransactions = [
                ...e.transactions,
                { id: 'TX-' + Math.floor(8000 + Math.random() * 1000), type: 'Debit Release', desc: 'Rent Advance Payout to Landlord Bank Account', amount: e.rentAmount, date: payoutDate, ref: 'Ref: Payout-Vault109' }
              ];

              return { 
                ...e, 
                status: 'Released', 
                moveInToken: checkinCode,
                timeline: updatedTimeline,
                transactions: updatedTransactions
              };
            }
            return e;
          });

          // Add notification
          state.notifications.unshift({
            id: Date.now(),
            type: 'escrow',
            text: `Rent Released: Escrow payment of ₦${esc.rentAmount.toLocaleString()} released to your account. Move-in Token: ${checkinCode}.`,
            time: 'Just now',
            read: false
          });

          updateState({ 
            landlordEscrows: updatedEscrows
          });

          alert(`Escrow Released successfully! Payout of ₦${esc.rentAmount.toLocaleString()} has been sent to your bank. Move-in Check-in Token generated: ${checkinCode}`);
          navigateTo('landlord');
        }
      });
    });

    // Save Electricity Meter ID
    document.getElementById('btn-save-meter-id')?.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const meterId = document.getElementById('prepaid-meter-input')?.value.trim();
      if (!meterId) {
        alert("Please enter a valid meter number.");
        return;
      }
      const updatedEscrows = state.landlordEscrows.map(e => {
        if (e.id === id) return { ...e, prepaidMeter: meterId };
        return e;
      });
      updateState({ landlordEscrows: updatedEscrows });
      alert("Prepaid meter ID registered successfully!");
      navigateTo('landlord');
    });

    // Toggle utility confirmations
    document.getElementById('chk-water-confirm')?.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const updatedEscrows = state.landlordEscrows.map(esc => {
        if (esc.id === id) return { ...esc, waterChecked: e.target.checked };
        return esc;
      });
      updateState({ landlordEscrows: updatedEscrows });
      navigateTo('landlord');
    });

    document.getElementById('chk-inspection-confirm')?.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const updatedEscrows = state.landlordEscrows.map(esc => {
        if (esc.id === id) return { ...esc, inspectionCleared: e.target.checked };
        return esc;
      });
      updateState({ landlordEscrows: updatedEscrows });
      navigateTo('landlord');
    });

    document.getElementById('chk-clean-confirm')?.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const updatedEscrows = state.landlordEscrows.map(esc => {
        if (esc.id === id) return { ...esc, cleaningCleared: e.target.checked };
        return esc;
      });
      updateState({ landlordEscrows: updatedEscrows });
      navigateTo('landlord');
    });

    // Submit dispute defense response
    document.querySelectorAll('.btn-submit-defense').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const defenseText = document.getElementById(`dispute-defense-${id}`).value;

        if (!defenseText.trim()) {
          alert("Please enter a response statement first.");
          return;
        }

        const updatedDisputes = state.landlordDisputes.map(disp => {
          if (disp.id === id) return { ...disp, landlordDefense: defenseText, status: 'Under Arbitration (CBN Mediation)' };
          return disp;
        });

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'verification',
          text: `Dispute Defense Filed: Documents logged for CBN trust arbitration.`,
          time: 'Just now',
          read: false
        });

        updateState({ landlordDisputes: updatedDisputes });
        alert("Your defense statement and proof have been submitted to the compliance arbitrator.");
        navigateTo('landlord');
      });
    });

    // Helper for currency format
    function formatNaira(val) {
      return '₦' + val.toLocaleString('en-US');
    }

    // ----------------------------------------------------
    // TAB: RENEWAL MANAGER BINDINGS
    // ----------------------------------------------------
    // Update live proposal preview when increment is input
    document.querySelectorAll('.input-increment').forEach(input => {
      input.addEventListener('input', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const baseRent = parseInt(e.target.getAttribute('data-rent'));
        const percent = parseInt(e.target.value) || 0;
        
        const proposedRent = Math.round(baseRent * (1 + percent / 100));
        const previewElement = document.getElementById(`val-proposed-${id}`);
        if (previewElement) {
          previewElement.innerHTML = `<strong>${formatNaira(proposedRent)}/yr</strong>`;
        }
      });
    });

    // Submit renewal proposal
    document.querySelectorAll('.btn-propose-renewal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const input = document.querySelector(`.input-increment[data-id="${id}"]`);
        const baseRent = parseInt(input.getAttribute('data-rent'));
        const percent = parseInt(input.value) || 10;
        const proposedRent = Math.round(baseRent * (1 + percent / 100));

        const updatedProperties = state.landlordProperties.map(p => {
          if (p.id === id) {
            return {
              ...p,
              renewalStatus: 'Proposal Sent',
              incrementPercent: percent,
              proposedRent: proposedRent
            };
          }
          return p;
        });

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'match',
          text: `Renewal Proposal: Offered 12-month extension with ${percent}% increment on ${state.landlordProperties.find(p => p.id === id).title}.`,
          time: 'Just now',
          read: false
        });

        updateState({ landlordProperties: updatedProperties });
        alert(`Renewal lease proposal sent! Proposed rent: ₦${proposedRent.toLocaleString()}/yr. Tenant will receive a push alert.`);
        navigateTo('landlord');
      });
    });

    // ----------------------------------------------------
    // TAB: TENANT DIRECTORY & OCCUPANCY
    // ----------------------------------------------------
    // Tenant Search
    document.getElementById('tenant-directory-search')?.addEventListener('input', (e) => {
      updateState({ landlordOccupancySearch: e.target.value });
      navigateTo('landlord');
      const searchBox = document.getElementById('tenant-directory-search');
      if (searchBox) {
        searchBox.focus();
        const v = searchBox.value;
        searchBox.value = '';
        searchBox.value = v;
      }
    });

    // Status Filter
    document.getElementById('tenant-directory-status-filter')?.addEventListener('change', (e) => {
      updateState({ landlordOccupancyFilterStatus: e.target.value });
      navigateTo('landlord');
    });

    // Simulated email click
    document.querySelectorAll('.btn-tenant-contact-sim').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const email = e.currentTarget.getAttribute('data-email');
        alert(`Simulating mail client hook: Mailto compose screen opened for <${email}>.`);
      });
    });

    // ----------------------------------------------------
    // TAB: LEASE LIFE CYCLES & VACANCY
    // ----------------------------------------------------
    // Quick Notify Expiry
    document.getElementById('btn-quick-notify-expiry')?.addEventListener('click', () => {
      alert("Expiry notice reminder broadcasted to Osaze Alao via SMS and email channels.");
      state.landlordActivityLogs.unshift({ date: new Date().toLocaleString(), event: 'Sent lease expiry reminder to Osaze Alao' });
      navigateTo('landlord');
    });

    // Vacancy Exit checklist clearance
    document.getElementById('btn-execute-exit')?.addEventListener('click', () => {
      const propId = parseInt(document.getElementById('exit-prop-select')?.value || 1);
      const isPaintChecked = document.getElementById('chk-exit-paint')?.checked;
      const isKeysChecked = document.getElementById('chk-exit-keys')?.checked;
      const isUtilitiesChecked = document.getElementById('chk-exit-utilities')?.checked;
      const isSanitationChecked = document.getElementById('chk-exit-sanitation')?.checked;

      if (!isPaintChecked || !isKeysChecked || !isUtilitiesChecked || !isSanitationChecked) {
        alert("Please complete all physical exit checklist verifications before clearing check-out.");
        return;
      }

      // Update property state: set occupied: false, tenantName: '', renewalStatus: ''
      const updatedProperties = state.landlordProperties.map(p => {
        if (p.id === propId) {
          return {
            ...p,
            occupied: false,
            tenantName: null,
            renewalStatus: 'Vacant',
            leaseEnd: null
          };
        }
        return p;
      });

      // Update tenant list (remove check-out tenant)
      const updatedTenants = state.landlordTenants.filter(t => t.id !== propId);

      // Add activity log
      state.landlordActivityLogs.unshift({
        date: new Date().toLocaleString(),
        event: `Cleared checking-out inspections & re-listed property (ID: ${propId})`
      });

      // Add system notification
      state.notifications.unshift({
        id: Date.now(),
        type: 'escrow',
        text: `Vacancy workflow cleared: Property ID ${propId} re-listed. Escrow caution released.`,
        time: 'Just now',
        read: false
      });

      updateState({
        landlordProperties: updatedProperties,
        landlordTenants: updatedTenants
      });

      alert("Exit checks verified! Security deposit released from Escrow back to Tenant's wallet. The property has been re-listed to the public vacant portfolio.");
      navigateTo('landlord');
    });

    // ----------------------------------------------------
    // TAB: SETTINGS & PREFERENCES BINDINGS
    // ----------------------------------------------------
    // Save system preferences
    document.getElementById('btn-save-settings-pref')?.addEventListener('click', () => {
      const emailVal = document.getElementById('chk-settings-email')?.checked;
      const smsVal = document.getElementById('chk-settings-sms')?.checked;
      const pushVal = document.getElementById('chk-settings-push')?.checked;
      const updatesVal = document.getElementById('chk-settings-updates')?.checked;

      state.landlordSettings = {
        ...state.landlordSettings,
        emailNotifications: emailVal,
        smsNotifications: smsVal,
        pushNotifications: pushVal,
        appUpdates: updatesVal
      };

      state.landlordActivityLogs.unshift({
        date: new Date().toLocaleString(),
        event: 'Updated system notification preferences'
      });

      alert("System preferences updated successfully!");
      navigateTo('landlord');
    });

    // Toggle 2FA switch
    document.getElementById('chk-settings-2fa')?.addEventListener('change', (e) => {
      const isEnabled = e.target.checked;
      state.landlordSettings.twoFactorEnabled = isEnabled;
      
      state.landlordActivityLogs.unshift({
        date: new Date().toLocaleString(),
        event: isEnabled ? 'Activated Authenticator 2FA credentials' : 'Deactivated Authenticator 2FA credentials'
      });

      alert(isEnabled ? "Two-Factor Authentication activated! Setup your authenticator app code: 718-228" : "Two-Factor Authentication deactivated.");
      navigateTo('landlord');
    });

    // Change Password
    document.getElementById('btn-settings-change-pass')?.addEventListener('click', () => {
      const currentPass = document.getElementById('settings-pass-current')?.value;
      const newPass = document.getElementById('settings-pass-new')?.value;

      if (!currentPass || !newPass) {
        alert("Please enter both current and new passwords.");
        return;
      }
      if (newPass.length < 6) {
        alert("New password must be at least 6 characters.");
        return;
      }

      state.landlordSettings.passwordLastChanged = new Date().toLocaleString();
      state.landlordActivityLogs.unshift({
        date: new Date().toLocaleString(),
        event: 'Security credentials updated (Password change)'
      });

      alert("Password changed successfully!");
      document.getElementById('settings-pass-current').value = '';
      document.getElementById('settings-pass-new').value = '';
      navigateTo('landlord');
    });
  }
};

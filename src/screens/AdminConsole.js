// Operations and Administration Console Screen Component (Upgraded to Milestone 8)
export const AdminConsole = {
  render(state) {
    // Safety check & initialization of admin states if not present
    this.initializeState(state);

    const activeTab = state.activeAdminTab || 'overview';
    const currentRole = state.adminRole || 'Platform Administrator';
    const isDarkMode = state.adminDarkMode === true;

    // Define permission rules based on RBAC roles
    const tabPermissions = {
      'Platform Administrator': ['overview', 'users', 'verifications', 'compliance', 'fraud', 'properties', 'finance', 'disputes', 'support', 'partners', 'config', 'operations'],
      'Compliance Officer': ['overview', 'users', 'verifications', 'compliance', 'operations'],
      'Verification Officer': ['overview', 'users', 'verifications'],
      'Finance Officer': ['overview', 'finance', 'operations'],
      'Support Agent': ['overview', 'users', 'support'],
      'Operations Manager': ['overview', 'users', 'verifications', 'properties', 'finance', 'disputes', 'support', 'partners', 'config', 'operations'],
      'Fraud Analyst': ['overview', 'users', 'compliance', 'fraud', 'operations'],
      'Moderator': ['overview', 'properties'],
      'Read-Only Auditor': ['overview', 'users', 'verifications', 'compliance', 'fraud', 'properties', 'finance', 'disputes', 'support', 'partners', 'config', 'operations']
    };

    const allowedTabs = tabPermissions[currentRole] || [];
    
    // Sidebar tabs definition with icons
    const sidebarTabs = [
      { id: 'overview', name: 'Dashboard Command', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>` },
      { id: 'users', name: 'User Management', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.33 2.99-3S17.66 5 16 5s-3 1.33-3 3 1.33 3 3 3zm-8 0c1.66 0 2.99-1.33 2.99-3S9.66 5 8 5 5 6.33 5 8s1.33 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>` },
      { id: 'verifications', name: 'KYC Verification', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>` },
      { id: 'compliance', name: 'Compliance Desk', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>` },
      { id: 'fraud', name: 'Fraud Center', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>` },
      { id: 'properties', name: 'Property Moderation', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>` },
      { id: 'finance', name: 'Finance & Escrow', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>` },
      { id: 'disputes', name: 'Disputes Desk', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 6V4h-4v2h4zM4 8v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8H4zm13.5 6c0 1-.5 1.5-1.5 1.5h-8c-1 0-1.5-.5-1.5-1.5V11c0-1 .5-1.5 1.5-1.5h8c1 0 1.5.5 1.5 1.5v3z"/></svg>` },
      { id: 'support', name: 'Support Queue', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm0 4h8v-2H6v2zm0-8h12v2H6V5z"/></svg>` },
      { id: 'partners', name: 'Partner SLA Desk', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.01 11.02c-.08-.4-.36-.72-.73-.86l-4.73-1.78c-.73-.28-1.56-.05-2.07.56L14 10.74V4c0-1.1-.9-2-2-2S10 2.9 10 4v9.64l-2.6-2.6c-.39-.39-1.02-.39-1.41 0l-.71.71c-.39.39-.39 1.02 0 1.41l5.44 5.44C11.51 19.39 12.53 20 13.62 20h5.31c1.23 0 2.29-.86 2.53-2.07l1.55-7.76c.07-.39-.08-.79-.42-.99zM2 18h3v2H2v-2zm0-4h3v2H2v-2zm0-4h3v2H2v-2zm0-4h3v2H2V6z"/></svg>` },
      { id: 'config', name: 'System Config', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>` },
      { id: 'operations', name: 'Operations Manager', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>` }
    ];

    // Filter tabs based on role permissions
    const visibleTabs = sidebarTabs.filter(t => allowedTabs.includes(t.id));

    // Sidebar items HTML
    const tabsHTML = visibleTabs.map(t => `
      <button class="admin-tab-btn ${activeTab === t.id ? 'active' : ''}" data-tab="${t.id}" style="display:flex; align-items:center; gap:12px; width:100%; border:none; background:none; text-align:left; cursor:pointer;">
        <span style="display:flex; align-items:center; justify-content:center; width:18px; height:18px; color:inherit;">${t.icon}</span>
        <span class="tab-label">${t.name}</span>
      </button>
    `).join('');

    // Verification badges counters
    const pendingVerificationsCount = state.adminVerifications.filter(v => v.status === 'Pending Review').length;
    const activeDisputesCount = state.adminDisputes.filter(d => d.status === 'Active Dispute' || d.status === 'Awaiting Response').length;
    const activeFraudCount = state.adminFraudAlerts.filter(a => a.status === 'Active Warning').length;

    // Render active tab markup
    let tabContentHTML = '';
    if (allowedTabs.includes(activeTab)) {
      tabContentHTML = this.renderTabContent(state, activeTab);
    } else {
      tabContentHTML = `
        <div style="text-align: center; padding: 64px 24px; color: var(--text-muted);">
          <h2>Access Denied</h2>
          <p>Your current administrative role (${currentRole}) does not have permission to view this tab.</p>
        </div>
      `;
    }

    return `
      <div class="admin-theme-wrapper ${isDarkMode ? 'admin-dark-mode' : ''}">
        <style>
          .admin-theme-wrapper {
            --bg-primary: #F5F3EE;
            --bg-card: #FFFFFF;
            --border-color: rgba(13, 27, 75, 0.08);
            --text-primary: #1E1E1E;
            --text-muted: #6B7280;
            --nav-sidebar: #0D1B4B;
            --nav-sidebar-text: rgba(255,255,255,0.7);
            --nav-sidebar-hover: rgba(255,255,255,0.1);
            --nav-sidebar-active: #1A7A8A;
            --input-bg: #FFFFFF;
            --input-border: #D1D5DB;
            --card-shadow: 0 4px 12px rgba(13, 27, 75, 0.04);
            
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            font-family: 'Hanken Grotesk', sans-serif;
            transition: background-color 200ms, color 200ms;
          }
          
          .admin-theme-wrapper.admin-dark-mode {
            --bg-primary: #0B0F19;
            --bg-card: #111827;
            --border-color: rgba(255, 255, 255, 0.08);
            --text-primary: #F9FAFB;
            --text-muted: #9CA3AF;
            --input-bg: #1F2937;
            --input-border: #374151;
            --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }

          .admin-layout {
            display: grid;
            grid-template-columns: 240px 1fr;
            height: calc(100vh - 80px);
            overflow: hidden;
          }

          @media (max-width: 768px) {
            .admin-layout {
              grid-template-columns: 1fr;
            }
            .admin-sidebar {
              display: none; /* Mobile navigation toggleable */
            }
          }

          .admin-sidebar {
            background-color: var(--nav-sidebar);
            color: white;
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            border-right: 1px solid var(--border-color);
            height: 100%;
            overflow-y: auto;
          }

          .admin-tab-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            background: none;
            border: none;
            color: var(--nav-sidebar-text);
            padding: 10px 16px;
            border-radius: 8px;
            cursor: pointer;
            text-align: left;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 150ms, color 150ms;
          }

          .admin-tab-btn:hover {
            background-color: var(--nav-sidebar-hover);
            color: white;
          }

          .admin-tab-btn.active {
            background-color: var(--nav-sidebar-active);
            color: white;
          }

          .admin-main {
            padding: 32px;
            overflow-y: auto;
            height: 100%;
            width: 100%;
          }

          .admin-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 24px;
            margin-bottom: 32px;
            flex-wrap: wrap;
            gap: 16px;
          }

          .admin-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 24px;
            box-shadow: var(--card-shadow);
            margin-bottom: 24px;
          }

          .admin-kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
          }

          .kpi-tile {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 16px;
            box-shadow: var(--card-shadow);
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .kpi-title {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .kpi-value {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
          }

          .kpi-meta {
            font-size: 11px;
            color: var(--text-muted);
          }

          /* User Profile Side Drawer */
          .side-drawer-overlay {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0,0,0,0.4);
            z-index: 2000;
            display: flex;
            justify-content: flex-end;
          }

          .side-drawer {
            width: 480px;
            background-color: var(--bg-card);
            border-left: 1px solid var(--border-color);
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            overflow-y: auto;
            animation: slideLeft 200ms ease;
          }

          @keyframes slideLeft {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }

          /* General controls elements overrides */
          .admin-select {
            background-color: var(--input-bg);
            color: var(--text-primary);
            border: 1px solid var(--input-border);
            padding: 8px 12px;
            border-radius: 8px;
            font-family: inherit;
            font-size: 13px;
          }

          .admin-input {
            background-color: var(--input-bg);
            color: var(--text-primary);
            border: 1px solid var(--input-border);
            padding: 8px 12px;
            border-radius: 8px;
            font-family: inherit;
            font-size: 13px;
            width: 100%;
          }

          .pulsing-dot-red {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: var(--color-error);
            border-radius: 50%;
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
            animation: redPulse 1.2s infinite;
          }

          @keyframes redPulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          }

          /* Theme Contrast Accessibility Overrides */
          .admin-theme-wrapper h1, 
          .admin-theme-wrapper h2, 
          .admin-theme-wrapper h3, 
          .admin-theme-wrapper h4, 
          .admin-theme-wrapper h5, 
          .admin-theme-wrapper h6,
          .admin-theme-wrapper strong {
            color: var(--text-primary) !important;
          }

          /* Override inline Navy colors to leverage theme-aware variables */
          .admin-theme-wrapper [style*="color:var(--color-primary)"],
          .admin-theme-wrapper [style*="color: var(--color-primary)"],
          .admin-theme-wrapper [style*="color:var(--color-primary);"],
          .admin-theme-wrapper [style*="color: var(--color-primary);"] {
            color: var(--text-primary) !important;
          }

          /* Ensure all table content is readable */
          .data-table td, 
          .data-table th {
            color: var(--text-primary);
          }
        </style>

        <!-- Command Center Top Header Navbar -->
        <header class="admin-top-navbar" style="display:flex; justify-content:space-between; align-items:center; padding:16px 32px; background-color:var(--bg-card); border-bottom:1px solid var(--border-color); height:80px; position:sticky; top:0; z-index:1000;">
          <!-- Logo -->
          <div class="admin-logo-wrapper" style="display:flex; align-items:center;">
            <img src="/assets/logo.png" alt="Haven Logo" style="height:32px; width:auto; display:block; ${isDarkMode ? 'filter:brightness(0) invert(1);' : ''}">
          </div>
          
          <!-- Title -->
          <div class="admin-title-wrapper" style="font-size:18px; font-weight:700; color:var(--text-primary); letter-spacing:-0.5px;">
            Operation Command Centre
          </div>
          
          <!-- Controls (Sun/Moon, Notification, Assumed Role) -->
          <div class="admin-controls-wrapper" style="display:flex; align-items:center; gap:20px;">
            <!-- Theme Toggle -->
            <button id="btn-admin-theme-toggle" style="background:none; border:none; color:var(--text-primary); cursor:pointer; font-size:20px; display:flex; align-items:center; justify-content:center; padding:4px;" title="${isDarkMode ? 'Light Mode' : 'Dark Mode'}">
              ${isDarkMode ? `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ` : `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              `}
            </button>

            <!-- Notification Icon with Badge -->
            <div style="position:relative; cursor:pointer; color:var(--text-primary); display:flex; align-items:center;" title="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span style="position:absolute; top:-6px; right:-6px; background-color:#EF4444; color:white; font-size:10px; font-weight:bold; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center;">3</span>
            </div>

            <!-- Assumed Role Selector -->
            <div style="display:flex; align-items:center; gap:8px;">
              <select class="admin-select" id="select-admin-role" style="font-weight:600; padding:6px 12px; border-radius:8px;">
                <option value="Platform Administrator" ${currentRole === 'Platform Administrator' ? 'selected' : ''}>Platform Admin</option>
                <option value="Compliance Officer" ${currentRole === 'Compliance Officer' ? 'selected' : ''}>Compliance Officer</option>
                <option value="Verification Officer" ${currentRole === 'Verification Officer' ? 'selected' : ''}>Verification Officer</option>
                <option value="Finance Officer" ${currentRole === 'Finance Officer' ? 'selected' : ''}>Finance Officer</option>
                <option value="Support Agent" ${currentRole === 'Support Agent' ? 'selected' : ''}>Support Agent</option>
                <option value="Operations Manager" ${currentRole === 'Operations Manager' ? 'selected' : ''}>Operations Manager</option>
                <option value="Fraud Analyst" ${currentRole === 'Fraud Analyst' ? 'selected' : ''}>Fraud Analyst</option>
                <option value="Moderator" ${currentRole === 'Moderator' ? 'selected' : ''}>Moderator</option>
                <option value="Read-Only Auditor" ${currentRole === 'Read-Only Auditor' ? 'selected' : ''}>Read-Only Auditor</option>
              </select>
            </div>
          </div>
        </header>

        <div class="admin-layout">
          <!-- Sidebar Navigation -->
          <div class="admin-sidebar" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div style="font-size:10px; font-weight:bold; color:var(--nav-sidebar-text); text-transform:uppercase; letter-spacing:0.05em; padding-left:16px; margin-bottom:12px;">Admin Modules</div>
              ${tabsHTML}
            </div>
            
            <!-- Log Out Button -->
            <div style="padding-top:16px; border-top:1px solid rgba(255,255,255,0.08); margin-top:auto;">
              <button class="admin-tab-btn" id="btn-admin-logout" style="width:100%; color:#EF4444 !important; gap:12px; border:none; background:none; text-align:left; cursor:pointer;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                <span class="tab-label" style="font-weight:bold;">Log Out</span>
              </button>
            </div>
          </div>

          <!-- Main workspace -->
          <div class="admin-main">
            ${tabContentHTML}
          </div>
        </div>

        <!-- User Side Profile Drawer (Rendered conditionally via javascript states) -->
        ${state.activeUserId ? this.renderUserProfileDrawer(state) : ''}
      </div>
    `;
  },

  renderTabContent(state, tab) {
    switch (tab) {
      case 'overview': return this.renderOverviewTab(state);
      case 'users': return this.renderUsersTab(state);
      case 'verifications': return this.renderVerificationsTab(state);
      case 'compliance': return this.renderComplianceTab(state);
      case 'fraud': return this.renderFraudTab(state);
      case 'properties': return this.renderPropertiesTab(state);
      case 'finance': return this.renderFinanceTab(state);
      case 'disputes': return this.renderDisputesTab(state);
      case 'support': return this.renderSupportTab(state);
      case 'partners': return this.renderPartnersTab(state);
      case 'config': return this.renderConfigTab(state);
      case 'operations': return this.renderOperationsTab(state);
      default: return `<div>Module Content Panel.</div>`;
    }
  },

  // 1. Overview Command Tab (Section 1)
  renderOverviewTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');
    const role = state.adminRole;

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
        <div>
          <h2 style="font-size:22px; font-weight:bold;">Executive Dashboard Overview</h2>
          <p class="text-sm text-muted">A consolidated overview of the platform operations health.</p>
        </div>

        <!-- Global Search -->
        <div style="position:relative; width:300px;">
          <input type="text" id="input-global-search" class="admin-input" placeholder="Search across all tables..." value="${state.adminSearch}">
        </div>
      </div>

      <!-- 18 KPIs Dashboard Grid -->
      <div class="admin-kpi-grid">
        <div class="kpi-tile">
          <span class="kpi-title">Registered Users</span>
          <span class="kpi-value">420</span>
          <span class="kpi-meta">↑ 12% this month</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Active Tenants</span>
          <span class="kpi-value">192</span>
          <span class="kpi-meta">Occupancy ready</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Active Landlords</span>
          <span class="kpi-value">84</span>
          <span class="kpi-meta">Verified deed checks</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Active Agents</span>
          <span class="kpi-value">32</span>
          <span class="kpi-meta">Licensed workspace</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Corp Partners</span>
          <span class="kpi-value">3</span>
          <span class="kpi-meta">Shell, Chevron, Mobil</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Universities</span>
          <span class="kpi-value">2</span>
          <span class="kpi-meta">UNILAG, YABATECH</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Active NGOs</span>
          <span class="kpi-value">1</span>
          <span class="kpi-meta">RedCross Int.</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Total Verified</span>
          <span class="kpi-value">308</span>
          <span class="kpi-meta">73% coverage rate</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Pending KYC</span>
          <span class="kpi-value">${state.adminVerifications.filter(v => v.status === 'Pending Review').length}</span>
          <span class="kpi-meta">SLA target < 2 hours</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Active Listings</span>
          <span class="kpi-value">${state.adminProperties.length}</span>
          <span class="kpi-meta">Lagos, Abuja, PortH</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Occupied Units</span>
          <span class="kpi-value">${state.adminProperties.filter(p => p.occupied).length}</span>
          <span class="kpi-meta">50% portfolio rate</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Pending Apps</span>
          <span class="kpi-value">14</span>
          <span class="kpi-meta">Review check in-progress</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Escrow Transactions</span>
          <span class="kpi-value">${state.partnerEscrows ? state.partnerEscrows.length : 2}</span>
          <span class="kpi-meta">Milestones audits active</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Escrow Volume</span>
          <span class="kpi-value" style="font-size:20px;">${formatNaira(48500000)}</span>
          <span class="kpi-meta">CBN trust pools</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Platform Revenue</span>
          <span class="kpi-value" style="font-size:20px;">${formatNaira(873000)}</span>
          <span class="kpi-meta">System commission fee</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Open Disputes</span>
          <span class="kpi-value">${state.adminDisputes.filter(d => d.status !== 'Resolved').length}</span>
          <span class="kpi-meta">Caution hold mediation</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">Active Fraud Alerts</span>
          <span class="kpi-value" style="color:var(--color-error);">${state.adminFraudAlerts.filter(a => a.status === 'Active Warning').length}</span>
          <span class="kpi-meta">Security signals pending</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-title">SLA Compliance</span>
          <span class="kpi-value">98.6%</span>
          <span class="kpi-meta">Within standard hours</span>
        </div>
      </div>

      <!-- Conversion Ratios Line Chart (SVG) -->
      <div class="admin-card">
        <h3 style="font-size:16px; font-weight:bold; margin-bottom:12px;">Platform Identity KYC Conversions Ratio</h3>
        <p class="text-sm text-muted" style="margin-bottom:24px;">Monthly percentage values of user signups completing BVN/NIN validations.</p>
        
        <div style="height:160px; background:#FAF9F6; border-radius:8px; border:1px solid var(--border-color); padding:16px;">
          <svg width="100%" height="100%" viewBox="0 0 600 120" preserveAspectRatio="none">
            <line x1="20" y1="10" x2="580" y2="10" stroke="rgba(0,0,0,0.05)" stroke-dasharray="4,4" />
            <line x1="20" y1="60" x2="580" y2="60" stroke="rgba(0,0,0,0.05)" stroke-dasharray="4,4" />
            <line x1="20" y1="110" x2="580" y2="110" stroke="rgba(0,0,0,0.1)" />
            
            <path d="M 40,90 L 140,80 L 240,50 L 340,30 L 440,25 L 540,20" fill="none" stroke="var(--color-secondary)" stroke-width="3" />
            
            <circle cx="40" cy="90" r="4" fill="var(--color-secondary)" />
            <circle cx="140" cy="80" r="4" fill="var(--color-secondary)" />
            <circle cx="240" cy="50" r="4" fill="var(--color-secondary)" />
            <circle cx="340" cy="30" r="4" fill="var(--color-secondary)" />
            <circle cx="440" cy="25" r="4" fill="var(--color-secondary)" />
            <circle cx="540" cy="20" r="4" fill="var(--color-secondary)" />

            <text x="40" y="122" fill="#9CA3AF" font-size="8" text-anchor="middle">Jan</text>
            <text x="140" y="122" fill="#9CA3AF" font-size="8" text-anchor="middle">Feb</text>
            <text x="240" y="122" fill="#9CA3AF" font-size="8" text-anchor="middle">Mar</text>
            <text x="340" y="122" fill="#9CA3AF" font-size="8" text-anchor="middle">Apr</text>
            <text x="440" y="122" fill="#9CA3AF" font-size="8" text-anchor="middle">May</text>
            <text x="540" y="122" fill="#9CA3AF" font-size="8" text-anchor="middle">Jun</text>
          </svg>
        </div>
      </div>
    `;
  },

  // 2. User Directory Tab (Section 2)
  renderUsersTab(state) {
    const category = state.adminUserFilterCategory || 'all';
    const search = state.adminUserSearch || '';

    // Apply filtering
    let filteredUsers = state.adminUsers;
    if (category !== 'all') {
      filteredUsers = filteredUsers.filter(u => u.role.toLowerCase().includes(category.toLowerCase().substring(0, 5)));
    }
    if (search) {
      filteredUsers = filteredUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    }

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
        <div>
          <h2 style="font-size:22px; font-weight:bold;">User Account Management</h2>
          <p class="text-sm text-muted">Directory of tenants, landlords, corporate partners, and internal staff.</p>
        </div>

        <div style="display:flex; gap:12px; align-items:center;">
          <!-- Category Filter -->
          <select class="admin-select" id="select-user-category">
            <option value="all" ${category === 'all' ? 'selected' : ''}>All Categories</option>
            <option value="tenant" ${category === 'tenant' ? 'selected' : ''}>Tenants</option>
            <option value="landlord" ${category === 'landlord' ? 'selected' : ''}>Landlords</option>
            <option value="agent" ${category === 'agent' ? 'selected' : ''}>Agents</option>
            <option value="corporate" ${category === 'corporate' ? 'selected' : ''}>Corporate HR</option>
            <option value="university" ${category === 'university' ? 'selected' : ''}>University Officers</option>
            <option value="ngo" ${category === 'ngo' ? 'selected' : ''}>NGO Coordinators</option>
          </select>
          
          <input type="text" id="input-user-search" class="admin-input" placeholder="Search name or email..." value="${search}" style="width:200px;">
        </div>
      </div>

      <div class="admin-card" style="padding:0; overflow:hidden;">
        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Verification</th>
                <th>Fraud Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${filteredUsers.map(user => `
                <tr class="user-row-clickable" data-id="${user.id}" style="cursor:pointer;">
                  <td><code>USR-${user.id}</code></td>
                  <td style="font-weight:bold; color:var(--color-primary);">${user.name}</td>
                  <td><span class="badge badge-info" style="font-size:10px;">${user.role}</span></td>
                  <td>${user.email}</td>
                  <td>${user.phone}</td>
                  <td>
                    <span class="badge ${user.verified ? 'badge-success' : 'badge-warning'}">
                      ${user.verified ? 'Verified KYC' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <span style="font-weight:bold; color:${user.fraudScore > 50 ? 'var(--color-error)' : 'var(--color-success)'};">
                      ${user.fraudScore}%
                    </span>
                  </td>
                  <td>
                    <span class="badge ${user.status === 'Active' ? 'badge-success' : user.status === 'Suspended' ? 'badge-warning' : 'badge-error'}">
                      ${user.status}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-sm btn-open-user-drawer" data-id="${user.id}" style="padding:4px 8px; font-size:10px;">Inspect Profile</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // User Profile side drawer (RBAC actions)
  renderUserProfileDrawer(state) {
    const user = state.adminUsers.find(u => u.id === state.activeUserId);
    if (!user) return '';

    const isReadOnly = state.adminRole === 'Read-Only Auditor' || state.adminRole === 'Support Agent';

    return `
      <div class="side-drawer-overlay" id="user-drawer-overlay">
        <div class="side-drawer">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:16px;">
            <div>
              <h3 style="font-size:18px; font-weight:bold;">USR-${user.id}: Account Details</h3>
              <span class="badge badge-info" style="font-size:10px; margin-top:4px;">${user.role}</span>
            </div>
            <button id="btn-close-user-drawer" style="font-size:24px; background:none; border:none; cursor:pointer; color:var(--text-muted);">&times;</button>
          </div>

          <!-- Account Meta Fields -->
          <div>
            <div style="font-size:11px; font-weight:bold; color:var(--text-muted); text-transform:uppercase; margin-bottom:12px;">Profile Info</div>
            
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>Full Name:</span> <strong>${user.name}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>Email Address:</span> <strong>${user.email}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>Phone Number:</span> <strong>${user.phone}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>MFA Status:</span> <strong>${user.mfa}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>Date Joined:</span> <strong>${user.joined}</strong>
              </div>
              ${user.qualityScore ? `
                <div style="display:flex; justify-content:space-between; font-size:13px; border-top:1px solid var(--border-color); padding-top:12px;">
                  <span>Tenant Quality Score:</span> <strong style="color:var(--color-secondary); font-size:16px;">${user.qualityScore} / 850</strong>
                </div>
              ` : ''}
              <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>Security Fraud Score:</span> <strong style="color:${user.fraudScore > 50 ? 'var(--color-error)' : 'var(--color-success)'};">${user.fraudScore}% Mismatch</strong>
              </div>
            </div>
          </div>

          <!-- Account Security overrides -->
          <div style="border-top:1px solid var(--border-color); padding-top:20px; display:flex; flex-direction:column; gap:12px;">
            <div style="font-size:11px; font-weight:bold; color:var(--text-muted); text-transform:uppercase;">Security Actions</div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <button class="btn btn-outline btn-sm btn-drawer-pwd" data-id="${user.id}" ${isReadOnly ? 'disabled' : ''}>Reset Password</button>
              <button class="btn btn-outline btn-sm btn-drawer-mfa" data-id="${user.id}" ${isReadOnly ? 'disabled' : ''}>Reset MFA Keys</button>
            </div>
          </div>

          <!-- Administrative lifecycle states (Section 2 lifecycle overrides) -->
          <div style="border-top:1px solid var(--border-color); padding-top:20px; display:flex; flex-direction:column; gap:12px;">
            <div style="font-size:11px; font-weight:bold; color:var(--text-muted); text-transform:uppercase;">Administrative Overrides</div>
            
            <div style="display:flex; flex-direction:column; gap:10px;">
              ${user.status === 'Active' ? `
                <button class="btn btn-outline btn-sm btn-drawer-suspend" data-id="${user.id}" style="border-color:var(--color-warning); color:var(--color-warning); background:none;" ${isReadOnly ? 'disabled' : ''}>Suspend Account</button>
                <button class="btn btn-primary btn-sm btn-drawer-ban" data-id="${user.id}" style="background-color:var(--color-error); border-color:var(--color-error);" ${isReadOnly ? 'disabled' : ''}>Ban Account</button>
              ` : `
                <button class="btn btn-primary btn-sm btn-drawer-activate" data-id="${user.id}" style="background-color:var(--color-success); border-color:var(--color-success);" ${isReadOnly ? 'disabled' : ''}>Reactivate Account</button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Identity Verification Queue Tab (Section 3)
  renderVerificationsTab(state) {
    const activeVerId = state.activeAdminVerificationId || (state.adminVerifications[0]?.id || null);
    const selectedVer = state.adminVerifications.find(v => v.id === activeVerId);
    const isReadOnly = state.adminRole === 'Read-Only Auditor' || state.adminRole === 'Support Agent' || state.adminRole === 'Moderator';

    return `
      <div style="margin-bottom:16px;">
        <h2 style="font-size:22px; font-weight:bold;">KYC Verification Queue</h2>
        <p class="text-sm text-muted">Audits identity documentation and databases validations side-by-side.</p>
      </div>

      <div class="admin-layout" style="grid-template-columns:1.2fr 1.8fr; gap:24px; min-height:0;">
        <!-- Left: Queue panel -->
        <div class="admin-card" style="padding:16px;">
          <div style="font-size:11px; font-weight:bold; color:var(--text-muted); text-transform:uppercase; margin-bottom:12px;">Validation Requests</div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${state.adminVerifications.map(ver => `
              <div class="applicant-card ${ver.id === activeVerId ? 'active' : ''} btn-select-ver-req" data-id="${ver.id}" style="cursor:pointer; border:1px solid var(--border-color); border-radius:8px; padding:12px; background:${ver.id === activeVerId ? 'rgba(26,122,138,0.08)' : 'transparent'};">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="font-size:13px;">${ver.userName}</strong>
                  <span class="badge badge-info" style="font-size:9px;">${ver.type}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; margin-top:8px;">
                  <span style="color:var(--text-muted);">${ver.userRole}</span>
                  <span style="font-weight:bold; color:${ver.status === 'Pending Review' ? 'var(--color-warning)' : 'var(--color-success)'};">${ver.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: comparison panel -->
        <div class="admin-card">
          ${selectedVer ? `
            <div style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:20px;">
              <h3 style="font-size:16px; font-weight:bold;">Crosschecking user details: ${selectedVer.userName}</h3>
              <p class="text-sm text-muted">Credential check category: <strong>${selectedVer.type}</strong></p>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
              <div style="background:#FAF9F6; border:1px solid var(--border-color); border-radius:8px; padding:12px; font-size:12px;">
                <div style="font-weight:bold; color:var(--color-secondary); margin-bottom:8px;">User Provided Input</div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Name:</span> <strong>${selectedVer.providedDetails.fullName}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>DOB:</span> <strong>${selectedVer.providedDetails.dob}</strong></div>
                <div style="display:flex; justify-content:space-between;"><span>ID Number:</span> <strong>${selectedVer.providedDetails.number}</strong></div>
              </div>

              <div style="background:#FAF9F6; border:1px solid var(--border-color); border-radius:8px; padding:12px; font-size:12px;">
                <div style="font-weight:bold; color:var(--color-primary); margin-bottom:8px;">Government Registry Records</div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Registry Name:</span> <strong style="color:${selectedVer.providedDetails.fullName === selectedVer.registryDetails.fullName ? 'var(--color-success)' : 'var(--color-error)'};">${selectedVer.registryDetails.fullName}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>DOB:</span> <strong style="color:${selectedVer.providedDetails.dob === selectedVer.registryDetails.dob ? 'var(--color-success)' : 'var(--color-error)'};">${selectedVer.registryDetails.dob}</strong></div>
                <div style="display:flex; justify-content:space-between;"><span>Biometrics:</span> <strong style="color:var(--color-success);">${selectedVer.registryDetails.biometricMatch}</strong></div>
              </div>
            </div>

            ${selectedVer.providedDetails.documentName ? `
              <div style="background:#FAF9F6; border:1px solid var(--border-color); border-radius:8px; padding:12px; font-size:12px; margin-bottom:20px;">
                <div style="font-weight:bold; color:var(--color-primary); margin-bottom:8px;">Uploaded Document Attachment</div>
                <div style="border:1px solid #D1D5DB; background:white; padding:8px; text-align:center; font-weight:bold; border-radius:4px;">
                  📄 ${selectedVer.providedDetails.documentName} (1.2 MB)
                </div>
              </div>
            ` : ''}

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:20px;">
              <div>
                <span class="text-caption text-muted" style="font-size:10px;">AI UNDERWRITING RESULT</span>
                <div style="font-weight:bold; color:${selectedVer.underwritingVerdict.includes('Mismatch') ? 'var(--color-error)' : 'var(--color-success)'};">${selectedVer.underwritingVerdict}</div>
              </div>

              <div style="display:flex; gap:8px;">
                ${selectedVer.status === 'Pending Review' ? `
                  <button class="btn btn-outline btn-sm btn-admin-reject-ver" data-id="${selectedVer.id}" style="border-color:var(--color-error); color:var(--color-error); background:none;" ${isReadOnly ? 'disabled' : ''}>Reject</button>
                  <button class="btn btn-primary btn-sm btn-admin-approve-ver" data-id="${selectedVer.id}" ${isReadOnly ? 'disabled' : ''}>Approve KYC</button>
                ` : `
                  <span class="badge ${selectedVer.status === 'Approved' ? 'badge-success' : 'badge-error'}" style="padding:8px 16px;">${selectedVer.status}</span>
                `}
              </div>
            </div>
          ` : `
            <div style="text-align:center; padding:48px; color:var(--text-muted);">No verification details selected.</div>
          `}
        </div>
      </div>
    `;
  },

  // 4. Compliance Desk (Section 4)
  renderComplianceTab(state) {
    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:22px; font-weight:bold;">Compliance & AML Monitoring</h2>
        <p class="text-sm text-muted">NDPR audits, sanctions list checks, and Suspicious Activity Reports (SAR).</p>
      </div>

      <div style="display:grid; grid-template-columns:1.8fr 1.2fr; gap:24px;">
        <!-- Left: Sanctions and active cases -->
        <div class="admin-card">
          <div style="font-weight:bold; font-size:14px; margin-bottom:16px;">Sanctions Screening Database (NIMC & Interpol matches)</div>
          
          <table class="data-table">
            <thead>
              <tr>
                <th>User Match</th>
                <th>Database Matches</th>
                <th>Sanction Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tunde Bakare</strong></td>
                <td>NIBSS blacklist check</td>
                <td><span style="color:var(--color-error); font-weight:bold;">High Match (92%)</span></td>
                <td><button class="btn btn-primary btn-sm" style="background:var(--color-error); border-color:var(--color-error); font-size:10px; padding:4px 8px;">Trigger SAR Hold</button></td>
              </tr>
              <tr>
                <td><strong>Amara Okafor</strong></td>
                <td>No blacklist match</td>
                <td><span style="color:var(--color-success); font-weight:bold;">Clear (0%)</span></td>
                <td><span class="badge badge-success">No Action</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Right: Failed logins activity -->
        <div class="admin-card">
          <div style="font-weight:bold; font-size:14px; margin-bottom:16px;">Failed login audit logs (AML triggers)</div>
          
          <div style="display:flex; flex-direction:column; gap:12px; font-size:12px;">
            <div style="padding:10px; background:#FAF9F6; border-left:4px solid var(--color-error); border-radius:4px;">
              <strong>tunde.bakare@gmail.com</strong>
              <div style="color:var(--text-muted); margin-top:2px;">3 consecutive failed attempts from IP 197.210.8.22</div>
              <div style="font-size:10px; color:#9ca3af; margin-top:4px;">Just now</div>
            </div>
            <div style="padding:10px; background:#FAF9F6; border-left:4px solid var(--color-warning); border-radius:4px;">
              <strong>chief.alabi@gmail.com</strong>
              <div style="color:var(--text-muted); margin-top:2px;">Failed MFA authentication code check</div>
              <div style="font-size:10px; color:#9ca3af; margin-top:4px;">12 mins ago</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 5. Fraud Center (Section 5)
  renderFraudTab(state) {
    const isReadOnly = state.adminRole === 'Read-Only Auditor' || state.adminRole === 'Support Agent' || state.adminRole === 'Moderator';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:22px; font-weight:bold;">Fraud Monitoring Center</h2>
        <p class="text-sm text-muted">Detect duplicate listings, location anomalies, or account fingerprint matching.</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:20px;">
        ${state.adminFraudAlerts.map(alert => {
          const isWarning = alert.status === 'Active Warning';

          return `
            <div class="admin-card" style="border-left: 6px solid ${alert.riskLevel === 'High' ? 'var(--color-error)' : 'var(--color-warning)'};">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <h3 style="font-size:15px; font-weight:bold; display:flex; align-items:center; gap:8px;">
                    ${isWarning ? '<span class="pulsing-dot-red"></span>' : ''} ${alert.title}
                  </h3>
                  <span style="font-size:11px; color:var(--text-muted);">Alert Reference: <code>${alert.reference}</code> | Target User: <strong>${alert.user}</strong></span>
                </div>
                <span class="badge ${alert.riskLevel === 'High' ? 'badge-error' : 'badge-warning'}">${alert.riskLevel} Risk Level</span>
              </div>

              <div style="background:#FAF9F6; border:1px solid var(--border-color); border-radius:8px; padding:12px; margin:16px 0; font-size:12px;">
                <strong>Fraud Indicators:</strong> ${alert.indicators}
              </div>

              <div style="display:flex; justify-content:flex-end; gap:8px;">
                ${isWarning ? `
                  <button class="btn btn-outline btn-sm btn-dismiss-fraud" data-id="${alert.id}" style="border-color:#D1D5DB; color:var(--text-muted);" ${isReadOnly ? 'disabled' : ''}>Dismiss Alert</button>
                  <button class="btn btn-outline btn-sm btn-freeze-escrow" data-id="${alert.id}" style="border-color:var(--color-error); color:var(--color-error); background:none;" ${isReadOnly ? 'disabled' : ''}>Freeze Escrow</button>
                  <button class="btn btn-primary btn-sm btn-freeze-user" data-id="${alert.id}" style="background-color:var(--color-error); border-color:var(--color-error);" ${isReadOnly ? 'disabled' : ''}>Freeze User Account</button>
                ` : `
                  <span class="badge ${alert.status === 'Dismissed' ? 'badge-success' : 'badge-error'}">Status: ${alert.status}</span>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // 6. Property Moderation (Section 6)
  renderPropertiesTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');
    const isReadOnly = state.adminRole === 'Read-Only Auditor' || state.adminRole === 'Support Agent' || state.adminRole === 'Finance Officer';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:22px; font-weight:bold;">Property Listings Moderation</h2>
        <p class="text-sm text-muted">Review title deeds ownership documents and images quality checklists before publishing.</p>
      </div>

      <div class="admin-card" style="padding:0; overflow:hidden;">
        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Property Reference</th>
                <th>Location</th>
                <th>Landlord</th>
                <th>Base Rent</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.adminProperties.map(prop => `
                <tr>
                  <td style="font-weight:bold; color:var(--color-primary);">${prop.title}</td>
                  <td>${prop.location}</td>
                  <td><strong>${prop.landlord}</strong></td>
                  <td style="font-weight:bold;">${formatNaira(prop.rent)} / yr</td>
                  <td>
                    <span class="badge ${prop.status === 'Approved' ? 'badge-success' : prop.status === 'Pending Review' ? 'badge-warning' : 'badge-error'}">
                      ${prop.status}
                    </span>
                  </td>
                  <td>
                    ${prop.status === 'Pending Review' ? `
                      <button class="btn btn-outline btn-sm btn-admin-reject-listing" data-id="${prop.id}" style="border-color:var(--color-error); color:var(--color-error); padding:4px 8px; font-size:10px; background:none;" ${isReadOnly ? 'disabled' : ''}>Reject</button>
                      <button class="btn btn-primary btn-sm btn-admin-approve-listing" data-id="${prop.id}" style="padding:4px 8px; font-size:10px;" ${isReadOnly ? 'disabled' : ''}>Approve Listing</button>
                    ` : prop.status === 'Approved' ? `
                      <button class="btn btn-outline btn-sm btn-admin-reject-listing" data-id="${prop.id}" style="border-color:var(--color-error); color:var(--color-error); padding:4px 8px; font-size:10px; background:none;" ${isReadOnly ? 'disabled' : ''}>Suspend Listing</button>
                    ` : `
                      <button class="btn btn-primary btn-sm btn-admin-approve-listing" data-id="${prop.id}" style="background-color:var(--color-success); border-color:var(--color-success); padding:4px 8px; font-size:10px;" ${isReadOnly ? 'disabled' : ''}>Restore Listing</button>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 7. Finance & Escrow (Sections 7 & 8)
  renderFinanceTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');
    const isReadOnly = state.adminRole === 'Read-Only Auditor' || state.adminRole === 'Support Agent' || state.adminRole === 'Moderator';

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
        <div>
          <h2 style="font-size:22px; font-weight:bold;">Escrow Pools & Financial Operations</h2>
          <p class="text-sm text-muted">Reconcile deposits, track commission yields, and clear landlord withdrawal releases.</p>
        </div>

        <button class="btn btn-outline btn-sm" id="btn-export-finance-report">📊 Export Platform Financial Statement</button>
      </div>

      <!-- Escrows Table -->
      <div class="admin-card" style="padding:0; overflow:hidden; margin-bottom:32px;">
        <div style="padding:16px 24px; border-bottom:1px solid var(--border-color); font-weight:bold; color:var(--color-primary);">Escrow Pools Trust Accounts</div>
        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Vault Reference</th>
                <th>Guarantee Co-Signer</th>
                <th>Caution Amount</th>
                <th>Rent Advance Locked</th>
                <th>Lifecycle Status</th>
                <th>Admin Override</th>
              </tr>
            </thead>
            <tbody>
              ${state.partnerEscrows.map(esc => `
                <tr>
                  <td style="font-weight:bold; color:var(--color-primary);">${esc.title}</td>
                  <td><span class="badge badge-info">${esc.coSigner}</span></td>
                  <td style="font-weight:bold;">${formatNaira(esc.cautionAmount)}</td>
                  <td style="font-weight:bold;">${formatNaira(esc.rentAmount)}</td>
                  <td>
                    <span class="badge ${esc.status === 'Funded' ? 'badge-info' : esc.status === 'Released' ? 'badge-success' : 'badge-warning'}">
                      ${esc.status}
                    </span>
                  </td>
                  <td>
                    ${esc.status === 'Funded' ? `
                      <button class="btn btn-outline btn-sm btn-admin-hold-funds" data-id="${esc.id}" style="border-color:var(--color-warning); color:var(--color-warning); padding:4px 8px; font-size:10px; background:none;" ${isReadOnly ? 'disabled' : ''}>Hold Funds</button>
                      <button class="btn btn-primary btn-sm btn-admin-release-funds" data-id="${esc.id}" style="padding:4px 8px; font-size:10px;" ${isReadOnly ? 'disabled' : ''}>Release Rent</button>
                    ` : `
                      <span style="font-size:11px; color:var(--text-muted);">Payout complete</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 8. Dispute Center (Section 9)
  renderDisputesTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');
    const isReadOnly = state.adminRole === 'Read-Only Auditor' || state.adminRole === 'Moderator';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:22px; font-weight:bold;">Arbitration & Disputes desk</h2>
        <p class="text-sm text-muted">Review landlord and tenant statements, audit timelines, and decide caution splits payouts.</p>
      </div>

      <div class="admin-card" style="padding:0; overflow:hidden;">
        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Case Details</th>
                <th>Tenant Statement</th>
                <th>Landlord Response</th>
                <th>Caution Amount</th>
                <th>Arbitration Split Ratio</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.adminDisputes.map(disp => {
                const totalCaution = disp.cautionAmount;
                const percentTenant = state[`disputeSplitTenant_${disp.id}`] !== undefined ? state[`disputeSplitTenant_${disp.id}`] : 50;
                const percentLandlord = 100 - percentTenant;

                return `
                  <tr>
                    <td style="font-weight:bold; color:var(--color-primary);">
                      ${disp.propertyName}
                      <div style="font-size:10px; color:var(--text-muted); font-weight:normal; margin-top:2px;">Case: USR-${disp.tenantName}</div>
                    </td>
                    <td style="font-size:12px; max-width:180px;">${disp.reason}</td>
                    <td style="font-size:12px; max-width:180px; color:var(--color-secondary);">${disp.landlordDefense || '<em>Defense details pending</em>'}</td>
                    <td style="font-weight:bold;">${formatNaira(totalCaution)}</td>
                    <td>
                      ${disp.status !== 'Resolved' ? `
                        <div style="display:flex; align-items:center; gap:8px;">
                          <input type="number" class="admin-select input-split-tenant" data-id="${disp.id}" value="${percentTenant}" min="0" max="100" style="padding:6px; font-size:11px; text-align:center; width:55px;" ${isReadOnly ? 'disabled' : ''}>
                          <span style="font-size:12px; color:#9ca3af;">/</span>
                          <input type="number" class="admin-select input-split-landlord" data-id="${disp.id}" value="${percentLandlord}" disabled style="padding:6px; font-size:11px; text-align:center; width:55px; background:#FAF9F6;">
                        </div>
                        <div style="font-size:9px; color:#9CA3AF; margin-top:4px;">Split: ${formatNaira(Math.round(totalCaution * percentTenant/100))} / ${formatNaira(Math.round(totalCaution * percentLandlord/100))}</div>
                      ` : `
                        <span class="badge badge-success">${disp.resolvedSplit.tenant}% / ${disp.resolvedSplit.landlord}% Payout</span>
                      `}
                    </td>
                    <td>
                      ${disp.status !== 'Resolved' ? `
                        <button class="btn btn-primary btn-sm btn-arbitrate-dispute" data-id="${disp.id}" style="padding:6px 12px; font-size:10px;" ${isReadOnly ? 'disabled' : ''}>Execute Split</button>
                      ` : `
                        <span class="badge badge-success">Resolved Case</span>
                      `}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 9. Customer Support Center (Section 10)
  renderSupportTab(state) {
    const isReadOnly = state.adminRole === 'Read-Only Auditor' || state.adminRole === 'Moderator';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:22px; font-weight:bold;">Customer Support Tickets</h2>
        <p class="text-sm text-muted">Manage help tickets queue, priorities levels, and response templates.</p>
      </div>

      <div style="display:grid; grid-template-columns: 1.8fr 1.2fr; gap:24px;">
        <!-- Left: support tickets queue -->
        <div class="admin-card" style="padding:0; overflow:hidden;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>User</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.adminTickets.map(ticket => `
                <tr>
                  <td><code>TKT-${ticket.id}</code></td>
                  <td style="font-weight:bold;">${ticket.subject}</td>
                  <td>${ticket.user}</td>
                  <td>
                    <span class="badge ${ticket.priority === 'High' ? 'badge-error' : 'badge-warning'}">
                      ${ticket.priority}
                    </span>
                  </td>
                  <td>
                    <span class="badge ${ticket.status === 'Open' ? 'badge-warning' : 'badge-success'}">
                      ${ticket.status}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-sm btn-reply-ticket" data-id="${ticket.id}" style="padding:4px 8px; font-size:10px;">Reply</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Right: ticket detail template selector -->
        <div class="admin-card">
          <div style="font-weight:bold; font-size:14px; margin-bottom:12px;">Quick Response Template</div>
          
          <div class="form-group-landlord">
            <label for="select-support-template" class="text-sm">Select canned response template</label>
            <select class="admin-select" id="select-support-template" style="width:100%; margin-top:6px;">
              <option value="kyc">KYC verification delay notification</option>
              <option value="escrow">Escrow deposit funding issues check</option>
              <option value="general">Standard general system support reply</option>
            </select>
          </div>
          
          <div class="form-group-landlord" style="margin-top:16px;">
            <label for="textarea-support-reply" class="text-sm">Response details text</label>
            <textarea id="textarea-support-reply" class="admin-input" rows="5" style="margin-top:6px; font-size:12px;" placeholder="Canned template text will populate here..."></textarea>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-send-support-reply" style="width:100%; margin-top:16px;" ${isReadOnly ? 'disabled' : ''}>Send Response</button>
        </div>
      </div>
    `;
  },

  // 10. Partner SLA Desk (Sections 11 & 12)
  renderPartnersTab(state) {
    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:22px; font-weight:bold;">Partner Management & SLAs Desk</h2>
        <p class="text-sm text-muted">Monitor corporate, university, and NGO partner housing programs and SLA response times.</p>
      </div>

      <div class="admin-card" style="padding:0; overflow:hidden;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Partner Name</th>
              <th>Category</th>
              <th>Housing Programs</th>
              <th>SLA compliance rate</th>
              <th>Assigned Contacts</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${state.adminPartners.map(p => `
              <tr>
                <td style="font-weight:bold; color:var(--color-primary);">${p.name}</td>
                <td><span class="badge badge-info">${p.type}</span></td>
                <td>${p.programs}</td>
                <td style="font-weight:bold; color:${p.slaRate > 95 ? 'var(--color-success)' : 'var(--color-warning)'};">
                  ${p.slaRate}% Compliance
                </td>
                <td>ops.housing@domain.com</td>
                <td><span class="badge badge-success">${p.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // 11. System Configuration (Section 17)
  renderConfigTab(state) {
    const isReadOnly = state.adminRole === 'Read-Only Auditor' || state.adminRole === 'Support Agent' || state.adminRole === 'Finance Officer' || state.adminRole === 'Moderator';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:22px; font-weight:bold;">Platform System Configurations</h2>
        <p class="text-sm text-muted">Admin settings for commission percentages, risk thresholds, and feature flags.</p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
        <div class="admin-card">
          <div class="form-group-landlord">
            <label for="config-escrow-fee" style="display:flex; justify-content:space-between;">
              <span>Platform Service Commission Fee (%)</span>
              <strong id="label-fee-percent" style="color:var(--color-secondary);">${state.systemConfig.escrowFeePercent}%</strong>
            </label>
            <input type="range" id="config-escrow-fee" min="0.5" max="5.0" step="0.1" value="${state.systemConfig.escrowFeePercent}" class="form-control-landlord" style="padding:0; margin-top:8px;" ${isReadOnly ? 'disabled' : ''}>
          </div>

          <div style="margin-top:24px; display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:13px; display:block;">Require 2FA verification keys</strong>
                <span style="font-size:11px; color:var(--text-muted);">Enforce mandatory token checks on escrow release payouts.</span>
              </div>
              <label class="toggle-switch-slider">
                <input type="checkbox" id="config-toggle-2fa" ${state.systemConfig.enforce2FA ? 'checked' : ''} ${isReadOnly ? 'disabled' : ''}>
                <span class="slider-switch-element"></span>
              </label>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:16px;">
              <div>
                <strong style="font-size:13px; display:block;">Sandbox verification mock modes</strong>
                <span style="font-size:11px; color:var(--text-muted);">Use local mock files instead of live government NIMC database links.</span>
              </div>
              <label class="toggle-switch-slider">
                <input type="checkbox" id="config-toggle-sandbox" ${state.systemConfig.sandboxMode ? 'checked' : ''} ${isReadOnly ? 'disabled' : ''}>
                <span class="slider-switch-element"></span>
              </label>
            </div>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-save-system-config" style="width:100%; margin-top:28px;" ${isReadOnly ? 'disabled' : ''}>Save Configurations</button>
        </div>

        <!-- Custom Notification templates manager (Section 13) -->
        <div class="admin-card">
          <div style="font-weight:bold; font-size:14px; margin-bottom:12px;">Email & SMS Templates Management</div>
          
          <div class="form-group-landlord">
            <label for="select-notif-type" class="text-sm">Select Event Trigger Type</label>
            <select class="admin-select" id="select-notif-type" style="width:100%; margin-top:6px;">
              <option value="welcome">New Tenant Registration Welcome Email</option>
              <option value="otp">Verification OTP SMS text</option>
              <option value="escrow">Escrow Vault Funded alert</option>
            </select>
          </div>

          <div class="form-group-landlord" style="margin-top:16px;">
            <label for="textarea-notif-body" class="text-sm">Message Body Template</label>
            <textarea id="textarea-notif-body" class="admin-input" rows="5" style="margin-top:6px; font-family:monospace; font-size:12px;" placeholder="Template text load..."></textarea>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-save-notif-template" style="width:100%; margin-top:16px;" ${isReadOnly ? 'disabled' : ''}>Save Template</button>
        </div>
      </div>
    `;
  },

  // 12. Operations workspace & audit trails (Sections 14 & 18)
  renderOperationsTab(state) {
    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:22px; font-weight:bold;">Operations Workspace & System Audit Logs</h2>
        <p class="text-sm text-muted">Incident management calendar, daily activity logs feeds, and operator actions audits.</p>
      </div>

      <div style="display:grid; grid-template-columns: 1.2fr 1.8fr; gap:24px;">
        <!-- Left: Operations Incident Calendar -->
        <div class="admin-card">
          <div style="font-weight:bold; font-size:14px; margin-bottom:12px;">Operations Calendar logs</div>
          
          <div style="display:grid; grid-template-columns:repeat(7, 1fr); gap:6px; text-align:center; font-size:11px; margin-bottom:16px;">
            <div style="font-weight:bold; color:var(--text-muted);">Su</div>
            <div style="font-weight:bold; color:var(--text-muted);">Mo</div>
            <div style="font-weight:bold; color:var(--text-muted);">Tu</div>
            <div style="font-weight:bold; color:var(--text-muted);">We</div>
            <div style="font-weight:bold; color:var(--text-muted);">Th</div>
            <div style="font-weight:bold; color:var(--text-muted);">Fr</div>
            <div style="font-weight:bold; color:var(--text-muted);">Sa</div>
            
            <!-- Calendar cells grid -->
            <div style="color:var(--text-muted);">21</div>
            <div style="color:var(--text-muted);">22</div>
            <div style="color:var(--text-muted);">23</div>
            <div style="color:var(--text-muted);">24</div>
            <div style="color:var(--text-muted);">25</div>
            <div style="color:var(--text-muted);">26</div>
            <div style="color:var(--text-muted);">27</div>
            <div style="color:var(--text-muted);">28</div>
            <div style="color:var(--text-muted);">29</div>
            <div style="color:var(--text-muted);">30</div>
            <div style="border:1px solid var(--border-color); font-weight:bold; background:rgba(26,122,138,0.1); border-radius:4px;">1</div>
            <div style="border:1px solid var(--border-color); font-weight:bold;">2</div>
            <div style="border:1px solid var(--border-color); font-weight:bold;">3</div>
            <div style="border:1px solid var(--border-color); font-weight:bold;">4</div>
          </div>
          
          <div style="font-size:12px; display:flex; flex-direction:column; gap:8px;">
            ${state.adminIncidents.map(inc => `
              <div style="padding:8px 12px; background:#FAF9F6; border-radius:6px; border-left:3px solid var(--color-secondary);">
                <strong>${inc.date}:</strong> ${inc.text}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Auditing console log trail (Section 14) -->
        <div class="admin-card" style="display:flex; flex-direction:column; height:340px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="font-weight:bold; font-size:14px;">Operator Audit Trail Console</div>
            <button class="btn btn-outline btn-sm" id="btn-export-audit-csv" style="font-size:10px; padding:4px 8px;">💾 Export Audit logs (CSV)</button>
          </div>
          
          <div style="flex:1; background:#0B0F19; color:#34D399; font-family:monospace; font-size:11px; padding:16px; border-radius:8px; overflow-y:auto; line-height:1.5;">
            ${state.adminAuditLogs.map(log => `
              <div style="margin-bottom:8px;">
                <span style="color:#60A5FA;">[${log.time}]</span>
                <span style="color:#F59E0B;">${log.user}</span>
                <span>conducted: <strong>${log.action}</strong></span>
                <div style="margin-left:16px; opacity:0.8;">Module: ${log.module} | Result: ${log.result}</div>
                <div style="margin-left:16px; opacity:0.8;">Old: "${log.oldVal}" -> New: "${log.newVal}"</div>
                <div style="margin-left:16px; opacity:0.6; font-size:9px;">IP: ${log.ip} | Client: ${log.device}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  initializeState(state) {
    if (!state.adminRole) state.adminRole = 'Platform Administrator';
    if (!state.activeAdminTab) state.activeAdminTab = 'overview';
    if (state.adminDarkMode === undefined) state.adminDarkMode = false;
    if (!state.adminSearch) state.adminSearch = '';
    
    // User Directories data matching Categories
    if (!state.adminUsers) {
      state.adminUsers = [
        { id: 101, name: 'Osaze Alao', role: 'Tenant', email: 'osaze.alao@domain.com', phone: '+234 803 111 2222', verified: true, qualityScore: 785, fraudScore: 12, status: 'Active', mfa: 'Enabled', joined: '2026-01-15' },
        { id: 102, name: 'Chief Alabi', role: 'Landlord', email: 'chief.alabi@gmail.com', phone: '+234 809 333 4444', verified: true, qualityScore: null, fraudScore: 24, status: 'Active', mfa: 'Enabled', joined: '2025-11-20' },
        { id: 103, name: 'Mrs. Funmi Coker', role: 'Landlord', email: 'funmi.coker@yhoo.com', phone: '+234 812 444 5555', verified: true, qualityScore: null, fraudScore: 8, status: 'Active', mfa: 'Disabled', joined: '2026-02-10' },
        { id: 104, name: 'Amara Okafor', role: 'Agent', email: 'amara.agent@prop.ng', phone: '+234 901 222 3333', verified: false, qualityScore: null, fraudScore: 56, status: 'Suspended', mfa: 'Enabled', joined: '2026-03-01' },
        { id: 105, name: 'Tunde Bakare', role: 'Tenant', email: 'tunde.bakare@gmail.com', phone: '+234 805 777 8888', verified: false, qualityScore: 520, fraudScore: 88, status: 'Flagged', mfa: 'Disabled', joined: '2026-05-12' },
        { id: 106, name: 'Shell Corp HR', role: 'Corporate HR', email: 'hr.housing@shell.com', phone: '+234 802 999 1111', verified: true, qualityScore: null, fraudScore: 4, status: 'Active', mfa: 'Enabled', joined: '2025-08-30' },
        { id: 107, name: 'Unilag Housing', role: 'University Officer', email: 'housing.ops@unilag.edu.ng', phone: '+234 803 222 9999', verified: true, qualityScore: null, fraudScore: 18, status: 'Active', mfa: 'Enabled', joined: '2025-10-15' },
        { id: 108, name: 'NGO RedCross', role: 'NGO Coordinator', email: 'redcross.housing@ng.org', phone: '+234 809 111 8888', verified: true, qualityScore: null, fraudScore: 2, status: 'Active', mfa: 'Enabled', joined: '2025-12-05' }
      ];
    }

    // KYC Verification queue matching BVN, NIN, Selfies, Goverment IDs, Property ownership docs
    if (!state.adminVerifications) {
      state.adminVerifications = [
        { id: 1, userName: 'Osaze Alao', userRole: 'Tenant', type: 'BVN', status: 'Pending Review', providedDetails: { fullName: 'Osaze Alao', dob: '1998-05-12', number: '22289081702' }, registryDetails: { fullName: 'Osaze Alao', dob: '1998-05-12', biometricMatch: '98% match' }, underwritingVerdict: 'Identity Verified' },
        { id: 2, userName: 'Tunde Bakare', userRole: 'Tenant', type: 'NIN', status: 'Pending Review', providedDetails: { fullName: 'Tunde Bakare', dob: '1992-04-18', number: '81092801928' }, registryDetails: { fullName: 'Tunde Adegoke Bakare', dob: '1991-04-18', biometricMatch: 'Biometric Mismatch' }, underwritingVerdict: 'Data Mismatch Alert' },
        { id: 3, userName: 'Chief Alabi', userRole: 'Landlord', type: 'Property Ownership', status: 'Pending Review', providedDetails: { fullName: 'Chief Alabi', dob: '1974-08-25', number: 'Deed #8902', documentName: 'Lekki_Land_Deed.pdf' }, registryDetails: { fullName: 'Chief Alabi', dob: '1974-08-25', biometricMatch: 'Valid Title Record' }, underwritingVerdict: 'Manual Ownership Check Required' },
        { id: 4, userName: 'Amara Okafor', userRole: 'Agent', type: 'Student ID', status: 'Pending Review', providedDetails: { fullName: 'Amara Okafor', dob: '2001-09-12', number: 'Matric #19208', documentName: 'Unilag_ID_Card.png' }, registryDetails: { fullName: 'Amara Okafor', dob: '2001-09-12', biometricMatch: 'Unverified Student Registry' }, underwritingVerdict: 'Pending School Clearance' }
      ];
    }

    // Disputes splits details
    if (!state.adminDisputes) {
      state.adminDisputes = [
        { id: 1, propertyName: 'Cozy 1 Bedroom Studio Loft (drywall stain dispute)', tenantName: 'Tunde Bakare', landlordName: 'Mrs. Funmi Coker', cautionAmount: 200000, reason: 'Tenant claims wall drywall water stain was present at move-in. Landlord claims caution deductible of N180,000 for paint and drywall works is required.', status: 'Active Dispute', chatHistory: [
          { sender: 'Tunde', message: 'The water stain was there when I took inspections! I have photos.' },
          { sender: 'Landlord', message: 'No, the inspection checklist you counter-signed said condition was excellent.' }
        ] },
        { id: 2, propertyName: 'Luxury 2 Bed Penthouse Duplex', tenantName: 'Osaze Alao', landlordName: 'Chief Alabi', cautionAmount: 300000, reason: 'Premature lease termination. Tenant had to relocate due to workplace change, landlord refuses to release caution deposit.', status: 'Resolved', resolvedSplit: { tenant: 70, landlord: 30 } }
      ];
    }

    // Suspicious Fraud Alerts
    if (!state.adminFraudAlerts) {
      state.adminFraudAlerts = [
        { id: 1, title: 'Suspicious Concurrent Logins', user: 'osaze.alao@domain.com', reference: 'ALERT-908', riskLevel: 'Medium', indicators: 'Login session IP locations from Yaba, Lagos and London, UK within 10 minutes.', status: 'Active Warning' },
        { id: 2, title: 'Large Escrow Deposit Hold', user: 'unilag.housing@unilag.edu.ng', reference: 'ALERT-851', riskLevel: 'High', indicators: 'Escrow caution guarantee pool transfer exceeds N5,000,000 threshold limit check.', status: 'Active Warning' },
        { id: 3, title: 'Multiple Linked Accounts', user: 'amara.agent@prop.ng', reference: 'ALERT-720', riskLevel: 'High', indicators: 'Device fingerprint indicates 5 distinct user account signups on the same phone.', status: 'Active Warning' }
      ];
    }

    // Helpdesk Tickets logs
    if (!state.adminTickets) {
      state.adminTickets = [
        { id: 401, subject: 'Payment confirmation failed', user: 'osaze.alao@domain.com', priority: 'High', status: 'Open', date: '2026-06-22', text: 'Funded wallet via instant transfer but available balance remains 0.' },
        { id: 402, subject: 'Landlord refused move-in checklist', user: 'tunde.bakare@gmail.com', priority: 'Medium', status: 'Assigned', date: '2026-06-21', text: 'We visited the property but landlord claims cleaning is still ongoing.' }
      ];
    }

    // Platform Properties
    if (!state.adminProperties) {
      state.adminProperties = [
        { id: 1, title: 'Luxury 2 Bed Penthouse Duplex', location: 'Lekki Phase 1', landlord: 'Chief Alabi', rent: 2500000, status: 'Approved', occupied: true },
        { id: 2, title: 'Cozy 1 Bedroom Studio Loft', location: 'Yaba', landlord: 'Mrs. Funmi Coker', rent: 1200000, status: 'Approved', occupied: false },
        { id: 3, title: 'Executive 3 Bed Serviced Flat', location: 'Victoria Island', landlord: 'Kunle Benson', rent: 4500000, status: 'Pending Review', occupied: false },
        { id: 4, title: 'Fake Listings Alert Flat', location: 'Surulere', landlord: 'Unknown Agent', rent: 600000, status: 'Suspended', occupied: false }
      ];
    }

    // Corporate & University Partners profiles
    if (!state.adminPartners) {
      state.adminPartners = [
        { id: 1, name: 'Shell Corp HR', type: 'Corporate', verified: true, programs: 'Shell Housing Support', slaRate: 98, status: 'Active' },
        { id: 2, name: 'University of Lagos', type: 'University', verified: true, programs: 'Student Studio Support', slaRate: 92, status: 'Active' },
        { id: 3, name: 'RedCross NGO', type: 'NGO', verified: true, programs: 'Displaced families support', slaRate: 100, status: 'Active' }
      ];
    }

    // Audit logs tracking old vs new values (Section 14)
    if (!state.adminAuditLogs) {
      state.adminAuditLogs = [
        { id: 1, user: 'admin.ops@haven.ng', action: 'Approved Identity', time: '14:52:10', ip: '197.210.8.22', device: 'Chrome / Windows', oldVal: 'Pending', newVal: 'Approved', module: 'Identity Queue', result: 'Success' },
        { id: 2, user: 'admin.ops@haven.ng', action: 'Saved Configuration', time: '14:48:00', ip: '197.210.8.22', device: 'Chrome / Windows', oldVal: 'Fee: 1.5%', newVal: 'Fee: 1.8%', module: 'Platform Settings', result: 'Success' }
      ];
    }

    // Incident Logs & Operations calendar
    if (!state.adminIncidents) {
      state.adminIncidents = [
        { id: 1, date: '2026-06-23', text: 'CBN Escrow reconciliation audit check' },
        { id: 2, date: '2026-06-25', text: 'Lagos landlord operations licensing webinar' }
      ];
    }

    // Escrow transactions data
    if (!state.partnerEscrows) {
      state.partnerEscrows = [
        { id: 1, title: 'Caution Vault: Lekki Duplex (Employee Tosin)', cautionAmount: 250000, rentAmount: 2950000, status: 'Funded', coSigner: 'Corporate Co-sign Guarantee' },
        { id: 2, title: 'Rent Trust: Yaba Hall (Student Chinedu)', cautionAmount: 50000, rentAmount: 450000, status: 'Released', coSigner: 'Unilag Housing Trust' }
      ];
    }

    // Config defaults
    if (!state.systemConfig) {
      state.systemConfig = {
        escrowFeePercent: 1.5,
        enforce2FA: true,
        sandboxMode: false
      };
    }
  },

  init(state, navigateTo, updateState) {
    const isReadOnly = state.adminRole === 'Read-Only Auditor';

    // 1. Bind Tab switches
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        if (tab) {
          updateState({ activeAdminTab: tab });
          navigateTo('admin');
        }
      });
    });

    // Bind Admin Log Out button
    document.getElementById('btn-admin-logout')?.addEventListener('click', () => {
      updateState({ user: null });
      navigateTo('landing');
    });

    // 2. Bind Theme toggler (Dark / Light)
    document.getElementById('btn-admin-theme-toggle')?.addEventListener('click', () => {
      updateState({ adminDarkMode: !state.adminDarkMode });
      navigateTo('admin');
    });

    // 3. Bind Role dropdown switcher (RBAC validation)
    document.getElementById('select-admin-role')?.addEventListener('change', (e) => {
      const selectedRole = e.target.value;
      updateState({ adminRole: selectedRole });
      
      // Enforce navigation back to overview tab to prevent tab access violations
      updateState({ activeAdminTab: 'overview' });
      navigateTo('admin');
    });

    // 4. Bind global search input (across sections)
    document.getElementById('input-global-search')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const searchVal = e.target.value.trim();
        updateState({ adminSearch: searchVal });
        
        // Search matches logic simulations
        if (searchVal) {
          alert(`Global Search results matching keyword "${searchVal}": \nFound 1 record in User Management directory.`);
        }
      }
    });

    // 5. Bind User categories directory filters
    document.getElementById('select-user-category')?.addEventListener('change', (e) => {
      updateState({ adminUserFilterCategory: e.target.value });
      navigateTo('admin');
    });

    document.getElementById('input-user-search')?.addEventListener('input', (e) => {
      updateState({ adminUserSearch: e.target.value });
    });

    // 6. Open User Side Profile Drawer (Inspect Profile clicks)
    document.querySelectorAll('.btn-open-user-drawer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        updateState({ activeUserId: id });
        navigateTo('admin');
      });
    });

    // Close user drawer events
    document.getElementById('btn-close-user-drawer')?.addEventListener('click', () => {
      updateState({ activeUserId: null });
      navigateTo('admin');
    });

    document.getElementById('user-drawer-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'user-drawer-overlay') {
        updateState({ activeUserId: null });
        navigateTo('admin');
      }
    });

    // 7. User drawer action controls (Banning/suspending/pwd reset actions)
    const logAuditTrailAction = (actionName, targetName, oldVal, newVal, module) => {
      const timeStr = new Date().toTimeString().split(' ')[0];
      state.adminAuditLogs.unshift({
        id: Date.now(),
        user: state.adminRole === 'Platform Administrator' ? 'admin.ops@haven.ng' : 'officer.compliance@haven.ng',
        action: actionName,
        time: timeStr,
        ip: '197.210.8.22',
        device: 'Chrome / Windows Client',
        oldVal: oldVal,
        newVal: newVal,
        module: module,
        result: 'Success'
      });
    };

    document.querySelector('.btn-drawer-suspend')?.addEventListener('click', (e) => {
      if (isReadOnly) return;
      const id = parseInt(e.target.getAttribute('data-id'));
      const updatedUsers = state.adminUsers.map(u => {
        if (u.id === id) {
          logAuditTrailAction('Suspended User Account', u.name, u.status, 'Suspended', 'User Management');
          return { ...u, status: 'Suspended' };
        }
        return u;
      });
      updateState({ adminUsers: updatedUsers });
      alert("User Account Suspended successfully.");
      navigateTo('admin');
    });

    document.querySelector('.btn-drawer-ban')?.addEventListener('click', (e) => {
      if (isReadOnly) return;
      const id = parseInt(e.target.getAttribute('data-id'));
      const updatedUsers = state.adminUsers.map(u => {
        if (u.id === id) {
          logAuditTrailAction('Banned User Account', u.name, u.status, 'Banned', 'User Management');
          return { ...u, status: 'Banned' };
        }
        return u;
      });
      updateState({ adminUsers: updatedUsers });
      alert("User Account Banned. Flagged in security center databases.");
      navigateTo('admin');
    });

    document.querySelector('.btn-drawer-activate')?.addEventListener('click', (e) => {
      if (isReadOnly) return;
      const id = parseInt(e.target.getAttribute('data-id'));
      const updatedUsers = state.adminUsers.map(u => {
        if (u.id === id) {
          logAuditTrailAction('Reactivated User Account', u.name, u.status, 'Active', 'User Management');
          return { ...u, status: 'Active' };
        }
        return u;
      });
      updateState({ adminUsers: updatedUsers });
      alert("User Account Reactivated successfully.");
      navigateTo('admin');
    });

    document.querySelector('.btn-drawer-pwd')?.addEventListener('click', (e) => {
      if (isReadOnly) return;
      const id = parseInt(e.target.getAttribute('data-id'));
      const user = state.adminUsers.find(u => u.id === id);
      logAuditTrailAction('Reset Account Password', user.name, '—', 'Hashed System Key', 'Security Center');
      alert(`Password Reset Link generated for ${user.name}: \n\nSent to: ${user.email}`);
    });

    document.querySelector('.btn-drawer-mfa')?.addEventListener('click', (e) => {
      if (isReadOnly) return;
      const id = parseInt(e.target.getAttribute('data-id'));
      const user = state.adminUsers.find(u => u.id === id);
      logAuditTrailAction('Reset MFA Keys', user.name, 'Enabled', 'Disabled', 'Security Center');
      alert(`MFA Keys reset for ${user.name}. User will be prompted to setup 2FA authenticator upon next login.`);
    });

    // 8. Identity Queue Click handlers
    document.querySelectorAll('.btn-select-ver-req').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        updateState({ activeAdminVerificationId: id });
        navigateTo('admin');
      });
    });

    // Approve Identity Queue Request
    document.querySelector('.btn-admin-approve-ver')?.addEventListener('click', (e) => {
      if (isReadOnly) return;
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const ver = state.adminVerifications.find(v => v.id === id);

      if (ver) {
        const updated = state.adminVerifications.map(v => {
          if (v.id === id) return { ...v, status: 'Approved' };
          return v;
        });

        logAuditTrailAction(`Approved Identity Queue Request`, ver.userName, 'Pending Review', 'Approved', 'Verification Queue');
        updateState({ adminVerifications: updated });
        alert(`Identity status approved for ${ver.userName}. Synced to database.`);
        navigateTo('admin');
      }
    });

    // Reject Identity Queue Request
    document.querySelector('.btn-admin-reject-ver')?.addEventListener('click', (e) => {
      if (isReadOnly) return;
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const ver = state.adminVerifications.find(v => v.id === id);

      if (ver) {
        const updated = state.adminVerifications.map(v => {
          if (v.id === id) return { ...v, status: 'Rejected' };
          return v;
        });

        logAuditTrailAction(`Rejected Identity Queue Request`, ver.userName, 'Pending Review', 'Rejected', 'Verification Queue');
        updateState({ adminVerifications: updated });
        alert(`Identity verification failed. Status rejected.`);
        navigateTo('admin');
      }
    });

    // 9. Fraud alerts events (freeze buttons)
    document.querySelectorAll('.btn-dismiss-fraud').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isReadOnly) return;
        const id = parseInt(btn.getAttribute('data-id'));
        const alertObj = state.adminFraudAlerts.find(a => a.id === id);
        const updated = state.adminFraudAlerts.map(a => {
          if (a.id === id) return { ...a, status: 'Dismissed' };
          return a;
        });
        logAuditTrailAction('Dismissed Fraud Alert', alertObj.user, 'Active', 'Dismissed', 'Fraud Monitoring');
        updateState({ adminFraudAlerts: updated });
        alert("Fraud alert dismissed.");
        navigateTo('admin');
      });
    });

    document.querySelectorAll('.btn-freeze-user').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isReadOnly) return;
        const id = parseInt(btn.getAttribute('data-id'));
        const alertObj = state.adminFraudAlerts.find(a => a.id === id);
        logAuditTrailAction('Freezed Suspicious Account', alertObj.user, 'Active', 'Frozen', 'Fraud Monitoring');
        alert(`Security action executed: Account ${alertObj.user} has been frozen and blacklisted from performing active operations.`);
      });
    });

    document.querySelectorAll('.btn-freeze-escrow').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isReadOnly) return;
        const id = parseInt(btn.getAttribute('data-id'));
        const alertObj = state.adminFraudAlerts.find(a => a.id === id);
        logAuditTrailAction('Freezed Escrow Vault Funds', alertObj.user, 'Funded', 'Frozen Hold', 'Fraud Monitoring');
        alert("Security action executed: Rental protection escrow vault funds frozen under compliance lockup.");
      });
    });

    // 10. Property listing moderation controls
    document.querySelectorAll('.btn-admin-approve-listing').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isReadOnly) return;
        const id = parseInt(btn.getAttribute('data-id'));
        const prop = state.adminProperties.find(p => p.id === id);
        const updated = state.adminProperties.map(p => {
          if (p.id === id) return { ...p, status: 'Approved' };
          return p;
        });
        logAuditTrailAction('Approved Listing', prop.title, prop.status, 'Approved', 'Property Moderation');
        updateState({ adminProperties: updated });
        alert("Property Listing approved and published live.");
        navigateTo('admin');
      });
    });

    document.querySelectorAll('.btn-admin-reject-listing').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isReadOnly) return;
        const id = parseInt(btn.getAttribute('data-id'));
        const prop = state.adminProperties.find(p => p.id === id);
        const updated = state.adminProperties.map(p => {
          if (p.id === id) return { ...p, status: 'Suspended' };
          return p;
        });
        logAuditTrailAction('Suspended Listing', prop.title, prop.status, 'Suspended', 'Property Moderation');
        updateState({ adminProperties: updated });
        alert("Listing suspended.");
        navigateTo('admin');
      });
    });

    // 11. Escrow actions release holds
    document.querySelectorAll('.btn-admin-hold-funds').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isReadOnly) return;
        const id = parseInt(btn.getAttribute('data-id'));
        const esc = state.partnerEscrows.find(v => v.id === id);
        const updated = state.partnerEscrows.map(v => {
          if (v.id === id) return { ...v, status: 'On Hold' };
          return v;
        });
        logAuditTrailAction('Placed Escrow Hold', esc.title, esc.status, 'On Hold', 'Finance Escrow');
        updateState({ partnerEscrows: updated });
        alert("Caution pool placed on manual compliance hold.");
        navigateTo('admin');
      });
    });

    document.querySelectorAll('.btn-admin-release-funds').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isReadOnly) return;
        const id = parseInt(btn.getAttribute('data-id'));
        const esc = state.partnerEscrows.find(v => v.id === id);
        const updated = state.partnerEscrows.map(v => {
          if (v.id === id) return { ...v, status: 'Released' };
          return v;
        });
        logAuditTrailAction('Released Escrow Payout', esc.title, esc.status, 'Released', 'Finance Escrow');
        updateState({ partnerEscrows: updated });
        alert(`Funds release approved. Advanced rent portion disbursed to co-signer bank account.`);
        navigateTo('admin');
      });
    });

    // Export reports events
    document.getElementById('btn-export-finance-report')?.addEventListener('click', () => {
      alert("Preparing CBN Finance audit report (PDF)... \nDownloaded: Haven_Financial_Operations_July_2026.pdf (184 KB)");
    });

    document.getElementById('btn-export-audit-csv')?.addEventListener('click', () => {
      alert("Preparing Operator audit logs (CSV)... \nDownloaded: Haven_Audit_Logs_Registry_2026.csv (42 KB)");
    });

    // 12. Disputes arbitration live splits updates
    document.querySelectorAll('.input-split-tenant').forEach(input => {
      input.addEventListener('input', (e) => {
        if (isReadOnly) return;
        const id = parseInt(e.target.getAttribute('data-id'));
        const valTenant = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
        const valLandlord = 100 - valTenant;
        
        state[`disputeSplitTenant_${id}`] = valTenant;
        const row = e.target.closest('tr');
        const inputLandlord = row.querySelector('.input-split-landlord');
        if (inputLandlord) inputLandlord.value = valLandlord;

        const valLabel = row.querySelector('div[style*="font-size:9px"]');
        const disp = state.adminDisputes.find(d => d.id === id);
        if (valLabel && disp) {
          const formatN = (v) => '₦' + v.toLocaleString('en-US');
          valLabel.innerHTML = `Split: ${formatN(Math.round(disp.cautionAmount * valTenant/100))} / ${formatN(Math.round(disp.cautionAmount * valLandlord/100))}`;
        }
      });
    });

    // Submit split arbitrations release payouts
    document.querySelectorAll('.btn-arbitrate-dispute').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isReadOnly) return;
        const id = parseInt(btn.getAttribute('data-id'));
        const disp = state.adminDisputes.find(d => d.id === id);

        if (disp) {
          const tenantSplitPercent = state[`disputeSplitTenant_${id}`] !== undefined ? state[`disputeSplitTenant_${id}`] : 50;
          const landlordSplitPercent = 100 - tenantSplitPercent;

          const updated = state.adminDisputes.map(d => {
            if (d.id === id) return { 
              ...d, 
              status: 'Resolved',
              resolvedSplit: { tenant: tenantSplitPercent, landlord: landlordSplitPercent }
            };
            return d;
          });

          const tenantCash = Math.round(disp.cautionAmount * tenantSplitPercent / 100);
          const landlordCash = Math.round(disp.cautionAmount * landlordSplitPercent / 100);

          logAuditTrailAction('Arbitrated Split Release Payouts', disp.propertyName, 'Active Dispute', `Resolved (${tenantSplitPercent}/${landlordSplitPercent})`, 'Disputes Arbitration');
          updateState({ 
            adminDisputes: updated,
            walletBalance: state.walletBalance + tenantCash
          });

          alert(`Dispute Resolved successfully! \nTenant account credited N${tenantCash.toLocaleString()} | Landlord bank payout sent: N${landlordCash.toLocaleString()}.`);
          navigateTo('admin');
        }
      });
    });

    // 13. Support ticket template selectors
    document.getElementById('select-support-template')?.addEventListener('change', (e) => {
      const type = e.target.value;
      const textarea = document.getElementById('textarea-support-reply');
      if (textarea) {
        if (type === 'kyc') {
          textarea.value = "Dear Customer, we noticed your provided NIN/BVN database name differs from registry record matches. Please upload official photo documentations for review. Thanks, Operations.";
        } else if (type === 'escrow') {
          textarea.value = "Hello, your caution escrow deposit has been placed on temporary hold pending landlord inspections check-in approval. This hold is released within 24 hours of successful move-ins. Thanks, Finance Team.";
        } else {
          textarea.value = "Thank you for contacting Haven. An operations support officer is reviewing your report details and will follow up shortly. Case Reference: TKT-401.";
        }
      }
    });

    document.getElementById('btn-send-support-reply')?.addEventListener('click', () => {
      if (isReadOnly) return;
      alert("Canned support reply sent to user email inbox.");
      navigateTo('admin');
    });

    // 14. Config slider fee percent adjustments
    const feeSlider = document.getElementById('config-escrow-fee');
    feeSlider?.addEventListener('input', (e) => {
      const label = document.getElementById('label-fee-percent');
      if (label) label.innerText = `${e.target.value}%`;
    });

    // Save configurations variables updates
    document.getElementById('btn-save-system-config')?.addEventListener('click', () => {
      if (isReadOnly) return;
      const fee = parseFloat(feeSlider.value);
      const is2FA = document.getElementById('config-toggle-2fa').checked;
      const sandbox = document.getElementById('config-toggle-sandbox').checked;

      const oldVal = `Fee: ${state.systemConfig.escrowFeePercent}%, 2FA: ${state.systemConfig.enforce2FA}`;
      const newVal = `Fee: ${fee}%, 2FA: ${is2FA}`;

      logAuditTrailAction('Saved System Configuration Options', 'Platform Settings', oldVal, newVal, 'Configuration Desk');
      
      updateState({
        systemConfig: {
          escrowFeePercent: fee,
          enforce2FA: is2FA,
          sandboxMode: sandbox
        }
      });

      alert("Platform configurations updated successfully.");
      navigateTo('admin');
    });

    // Save customized notification template updates
    document.getElementById('btn-save-notif-template')?.addEventListener('click', () => {
      if (isReadOnly) return;
      const notifType = document.getElementById('select-notif-type').value;
      const body = document.getElementById('textarea-notif-body').value;
      logAuditTrailAction('Modified Custom Notification Template', notifType, 'Previous Template text', body.substring(0, 30) + '...', 'Configuration Desk');
      alert("SMS / Email Template saved successfully.");
      navigateTo('admin');
    });
  }
};

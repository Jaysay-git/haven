// Tenant Dashboard Screen Component (Upgraded to Milestone 8 Compliance)
import { ProfileWizard } from './ProfileWizard.js';
import { VerificationCenter } from './VerificationCenter.js';
import { EscrowWallet } from './EscrowWallet.js';

export const Dashboard = {
  render(state) {
    // Safety check & initialization of tenant states if not present
    this.initializeState(state);

    if (state.onboardingCompleted !== true) {
      return ProfileWizard.render(state);
    }

    const userRole = state.user?.role || 'Tenant';
    const username = state.user?.username || 'user';
    const ver = state.verification || {};
    const activeTab = state.activeDashboardTab || 'overview';
    const isDarkMode = state.adminDarkMode === true; // Sync dark mode preferences

    // Evaluate Overall Verification Status
    let overallStatus = 'approved';
    let bannerClass = 'status-banner-approved';
    let bannerIcon = '&#9989;';
    let bannerTitle = 'Identity Fully Verified';
    let bannerDesc = 'Your Haven Trust profile is active. You have been graded Grade A (785/900 Quality Score).';

    const statuses = [ver.bvnStatus, ver.ninStatus, ver.selfieStatus, ver.employeeIdStatus, ver.studentIdStatus];
    if (statuses.includes('failed')) {
      overallStatus = 'rejected';
      bannerClass = 'status-banner-rejected';
      bannerIcon = '&#10060;';
      bannerTitle = 'Verification Rejected';
      bannerDesc = 'One or more of your identity credentials failed verification.';
    } else if (statuses.includes('unverified')) {
      overallStatus = 'action';
      bannerClass = 'status-banner-action';
      bannerIcon = '&#9888;';
      bannerTitle = 'Requires Action';
      bannerDesc = 'You have pending checklist actions. Please upload documents or complete API matching.';
    } else if (statuses.includes('pending')) {
      overallStatus = 'pending';
      bannerClass = 'status-banner-pending';
      bannerIcon = '&#8987;';
      bannerTitle = 'Verification Processing';
      bannerDesc = 'NIMC and banking API servers are verifying your records.';
    }

    // 15 Sidebar Navigation Menu items
    const sidebarTabs = [
      { id: 'overview', name: 'Overview', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H7v-7h3v7zm4 0h-3V7h3v10zm4 0h-3v-4h3v4z"/></svg>` },
      { id: 'discovery', name: 'Search Properties', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>` },
      { id: 'ai-match', name: 'AI Recommendations', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.1 0 2 .9 2 2v1.08c2.9.41 5.16 2.67 5.57 5.57H20c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-.43c-.41 2.9-2.67 5.16-5.57 5.57V20c0 1.1-.9 2-2 2s-2-.9-2-2v-1.08c-2.9-.41-5.16-2.67-5.57-5.57H4c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h.43c.41-2.9 2.67-5.16 5.57-5.57V4c0-1.1.9-2 2-2zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"/></svg>` },
      { id: 'saved-properties', name: 'Saved Properties', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>` },
      { id: 'applications', name: 'Rental Applications', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>` },
      { id: 'inspections', name: 'Inspections Schedule', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>` },
      { id: 'leases', name: 'Digital Leases', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>` },
      { id: 'wallet', name: 'Wallet & Escrow', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>` },
      { id: 'current-rental', name: 'Current Rental', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>` },
      { id: 'maintenance', name: 'Maintenance Requests', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>` },
      { id: 'disputes', name: 'Dispute Centre', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>` },
      { id: 'notifications', name: 'Notifications Center', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>` },
      { id: 'profile-wizard', name: 'Edit Profile', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>` },
      { id: 'verification-center', name: 'Identity Verification', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>` },
      { id: 'settings', name: 'Settings & Help', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>` }
    ];

    const sidebarHTML = sidebarTabs.map(tab => `
      <button class="dashboard-tab-btn ${activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
        <span style="width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center; margin-right:8px; fill:currentColor;">${tab.icon}</span>
        <span class="tab-label-text">${tab.name}</span>
      </button>
    `).join('');

    // Active sub-module content selection
    let tabContentHTML = '';
    switch (activeTab) {
      case 'overview':
        tabContentHTML = this.renderOverviewTab(state, overallStatus, bannerClass, bannerIcon, bannerTitle, bannerDesc);
        break;
      case 'discovery':
        tabContentHTML = this.renderDiscoveryTab(state);
        break;
      case 'ai-match':
        tabContentHTML = this.renderAIMatchTab(state);
        break;
      case 'saved-properties':
        tabContentHTML = this.renderSavedPropertiesTab(state);
        break;
      case 'applications':
        tabContentHTML = this.renderApplicationsTab(state);
        break;
      case 'inspections':
        tabContentHTML = this.renderInspectionsTab(state);
        break;
      case 'leases':
        tabContentHTML = this.renderLeasesTab(state);
        break;
      case 'wallet':
        tabContentHTML = EscrowWallet.render(state);
        break;
      case 'current-rental':
        tabContentHTML = this.renderCurrentRentalTab(state);
        break;
      case 'maintenance':
        tabContentHTML = this.renderMaintenanceTab(state);
        break;
      case 'disputes':
        tabContentHTML = this.renderDisputesTab(state);
        break;
      case 'notifications':
        tabContentHTML = this.renderNotificationsTab(state);
        break;
      case 'profile-wizard':
        tabContentHTML = ProfileWizard.render(state);
        break;
      case 'verification-center':
        tabContentHTML = VerificationCenter.render(state);
        break;
      case 'settings':
        tabContentHTML = this.renderSettingsTab(state);
        break;
      default:
        tabContentHTML = `<div>Module content pending.</div>`;
    }

    return `
      <div class="dashboard-wrapper ${isDarkMode ? 'admin-dark-mode' : ''}">
        <style>
          .dashboard-wrapper {
            --tenant-bg: #F5F3EE;
            --tenant-card: #FFFFFF;
            --tenant-border: rgba(13, 27, 75, 0.08);
            --tenant-text: #1E1E1E;
            --tenant-text-muted: #6B7280;
            --tenant-shadow: 0 4px 12px rgba(13, 27, 75, 0.04);
            --tenant-input: #FFFFFF;
            --tenant-input-border: #D1D5DB;

            background-color: var(--tenant-bg);
            color: var(--tenant-text);
            min-height: 100vh;
            padding: 32px 0;
            transition: background-color 200ms, color 200ms;
          }

          .dashboard-wrapper.admin-dark-mode {
            --tenant-bg: #0B0F19;
            --tenant-card: #111827;
            --tenant-border: rgba(255, 255, 255, 0.08);
            --tenant-text: #F9FAFB;
            --tenant-text-muted: #9CA3AF;
            --tenant-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            --tenant-input: #1F2937;
            --tenant-input-border: #374151;
          }

          .dashboard-layout {
            display: grid;
            grid-template-columns: 260px 1fr;
            gap: 32px;
          }

          @media (max-width: 768px) {
            .dashboard-layout {
              grid-template-columns: 1fr;
            }
            .dashboard-sidebar-menu {
              display: none;
            }
          }

          .dashboard-sidebar-menu {
            background-color: var(--tenant-card);
            border: 1px solid var(--tenant-border);
            border-radius: 20px;
            padding: 24px 16px;
            box-shadow: var(--tenant-shadow);
            height: fit-content;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .dashboard-tab-btn {
            display: flex;
            align-items: center;
            background: none;
            border: none;
            color: var(--tenant-text-muted);
            padding: 10px 16px;
            border-radius: 8px;
            cursor: pointer;
            text-align: left;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 150ms, color 150ms;
          }

          .dashboard-tab-btn:hover {
            background-color: rgba(26,122,138,0.05);
            color: var(--color-secondary);
          }

          .dashboard-tab-btn.active {
            background-color: var(--color-primary);
            color: white;
          }

          .dashboard-content-area {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .tenant-card {
            background-color: var(--tenant-card);
            border: 1px solid var(--tenant-border);
            border-radius: 20px;
            padding: 24px;
            box-shadow: var(--tenant-shadow);
          }

          /* General form fields overrides */
          .tenant-select, .tenant-input {
            background-color: var(--tenant-input);
            color: var(--tenant-text);
            border: 1px solid var(--tenant-input-border);
            padding: 8px 12px;
            border-radius: 8px;
            font-family: inherit;
            font-size: 13px;
          }

          .tenant-input {
            width: 100%;
          }

          /* Force high contrast white in dark mode for all headers */
          .dashboard-wrapper h1,
          .dashboard-wrapper h2,
          .dashboard-wrapper h3,
          .dashboard-wrapper h4,
          .dashboard-wrapper strong {
            color: var(--tenant-text) !important;
          }

          .dashboard-wrapper [style*="color:var(--color-primary)"],
          .dashboard-wrapper [style*="color: var(--color-primary)"] {
            color: var(--tenant-text) !important;
          }

          /* Calendar design system */
          .inspections-calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 8px;
            text-align: center;
            margin-top: 16px;
          }

          .calendar-day {
            border: 1px solid var(--tenant-border);
            padding: 12px 6px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            background-color: var(--tenant-card);
            transition: all 150ms;
          }

          .calendar-day:hover {
            border-color: var(--color-secondary);
            background-color: rgba(26,122,138,0.05);
          }

          .calendar-day.selected {
            background-color: var(--color-secondary);
            color: white !important;
            border-color: var(--color-secondary);
          }

          .signature-box {
            border: 2px dashed var(--tenant-input-border);
            border-radius: 12px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0,0,0,0.02);
            font-family: 'Great Vibes', cursive, sans-serif;
            font-size: 28px;
            color: var(--color-secondary);
          }

          .uploader-slot {
            border: 2px dashed var(--tenant-input-border);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            cursor: pointer;
            background-color: rgba(0,0,0,0.01);
            transition: border-color 150ms;
          }

          .uploader-slot:hover {
            border-color: var(--color-secondary);
          }

          /* Override high contrast styles for the analytics modal to stay dark on white background */
          #analytics-modal .modal-content-card,
          #analytics-modal .modal-content-card h3,
          #analytics-modal .modal-content-card h4,
          #analytics-modal .modal-content-card strong,
          #analytics-modal .modal-content-card span,
          #analytics-modal .modal-content-card td,
          #analytics-modal .modal-content-card th {
            color: #0D1B4B !important;
          }
          #analytics-modal .text-muted {
            color: #4B5563 !important;
          }
          #analytics-modal table tr {
            border-bottom: 1px solid #E5E7EB !important;
          }
          #analytics-modal table th {
            border-bottom: 1px solid #D1D5DB !important;
          }
        </style>

        <div class="container">
          <div class="dashboard-layout">
            <!-- Left Sidebar Navigation -->
            <div class="dashboard-sidebar-menu">
              <div style="text-align:center; padding-bottom:16px; margin-bottom:16px; border-bottom:1px solid var(--tenant-border);">
                <div style="width:60px; height:60px; border-radius:50%; background-color:var(--color-primary); color:white; font-size:24px; font-weight:bold; margin:0 auto 12px auto; display:flex; align-items:center; justify-content:center;">
                  ${username.charAt(0).toUpperCase()}
                </div>
                <h4 style="font-weight:bold; font-size:15px; color:var(--tenant-text);">${username.split('@')[0]}</h4>
                <span class="badge badge-${overallStatus}" style="font-size:10px; margin-top:8px;">${overallStatus}</span>
              </div>
              ${sidebarHTML}
            </div>

            <!-- Right Content Area -->
            <div class="dashboard-content-area">
              ${tabContentHTML}
            </div>
          </div>
        </div>
      </div>

      <!-- Deposit Funds Simulator Modal Overlay -->
      <div class="modal-overlay" id="escrow-deposit-modal" style="display:none;">
        <div class="modal-content-card">
          <h3 class="card-title" style="margin-bottom:8px;">Simulate Escrow Payment</h3>
          <p class="text-caption text-muted" style="margin-bottom:20px;">Add funds to caution deposit or advance rent escrow accounts.</p>
          <form id="escrow-deposit-form">
            <div class="form-group">
              <label class="form-label" for="deposit-amount">Amount (₦)</label>
              <input class="form-input tenant-input" type="number" id="deposit-amount" placeholder="e.g. 150000" required>
            </div>
            <div class="form-group" style="margin-top:16px;">
              <label class="form-label" for="deposit-type">Target Balance</label>
              <select class="tenant-select" id="deposit-type" style="width:100%;">
                <option value="Caution Deposit">Caution Deposit</option>
                <option value="Advance Rent">Advance Rent</option>
                <option value="Rent Payment">Monthly Rent Payment</option>
              </select>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px;">
              <button type="button" class="btn btn-outline btn-sm" id="close-deposit-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">Confirm Deposit</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Property Details Modal Drawer -->
      ${state.activeDetailsPropertyId ? this.renderPropertyDetailsDrawer(state) : ''}

      <div class="modal-overlay" id="analytics-modal" style="${state.showAnalyticsModal ? 'display:flex;' : 'display:none;'}">
        <div class="modal-content-card" style="max-width:550px; background-color:#FFFFFF !important; color:#0D1B4B !important; border:1px solid #D1D5DB; box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border-radius:16px;">
          <h3 class="card-title" style="margin-bottom:8px; font-weight:bold;">Quality Score Analytics</h3>
          <p class="text-caption text-muted" style="margin-bottom:16px; font-size:12px;">This analysis outlines how your verified monthly income maps to your current housing budget.</p>
          
          <div style="background:rgba(26,122,138,0.03); border:1px solid var(--tenant-border); border-radius:12px; padding:16px; margin-bottom:20px; font-size:13px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span>Income Profile Type:</span>
              <strong style="text-transform:capitalize;">${state.profileData?.employmentInfo?.incomeType || 'salary'}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span>Verified Monthly Income/Profit:</span>
              <strong>₦ ${parseInt(state.profileData?.incomeInfo?.monthlyIncome || 350000).toLocaleString()}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span>Monthly Housing Budget:</span>
              <strong>₦ ${(parseInt(state.profileData?.locationPreferences?.budget || 2400000) / 12).toLocaleString()}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; border-top:1px solid var(--tenant-border); padding-top:8px; margin-top:8px;">
              <span>Rent-to-Income Ratio:</span>
              <strong>${(((parseInt(state.profileData?.locationPreferences?.budget || 2400000) / 12) / (parseInt(state.profileData?.incomeInfo?.monthlyIncome || 350000) || 1)) * 100).toFixed(1)}%</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:4px;">
              <span>Tenant Score:</span>
              <strong style="color:var(--color-secondary); font-size:16px;">${this.calculateTenantScore(state)} / 100</strong>
            </div>
          </div>

          <h4 style="font-weight:bold; font-size:12px; margin-bottom:8px;">Platform Score Bracket System</h4>
          <table style="width:100%; font-size:11px; border-collapse:collapse; text-align:left;">
            <thead>
              <tr style="border-bottom:1px solid var(--tenant-border); color:var(--tenant-text-muted);">
                <th style="padding:4px 0;">Rent Ratio of Monthly Income</th>
                <th style="padding:4px 0;">Calculated Score</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:4px 0;">&le; 20% (Ideal)</td><td><strong>100</strong></td></tr>
              <tr><td style="padding:4px 0;">21% – 30%</td><td><strong>90</strong></td></tr>
              <tr><td style="padding:4px 0;">31% – 35%</td><td><strong>80</strong></td></tr>
              <tr><td style="padding:4px 0;">36% – 40%</td><td><strong>70</strong></td></tr>
              <tr><td style="padding:4px 0;">41% – 50%</td><td><strong>60</strong></td></tr>
              <tr><td style="padding:4px 0;">51% – 60%</td><td><strong>50</strong></td></tr>
              <tr><td style="padding:4px 0;">61% – 70%</td><td><strong>40</strong></td></tr>
              <tr><td style="padding:4px 0;">71% – 80%</td><td><strong>30</strong></td></tr>
              <tr><td style="padding:4px 0;">81% – 100%</td><td><strong>20</strong></td></tr>
              <tr><td style="padding:4px 0;">&gt; 100% (High risk)</td><td><strong>10</strong></td></tr>
            </tbody>
          </table>

          <div style="display:flex; justify-content:flex-end; margin-top:24px;">
            <button type="button" class="btn btn-primary btn-sm" id="close-analytics-modal">Close</button>
          </div>
        </div>
      </div>
    `;
  },

  calculateTenantScore(state) {
    const profile = state.profileData || {};
    const incomeType = profile.employmentInfo?.incomeType || 'salary';
    
    const annualBudget = parseInt(profile.locationPreferences?.budget) || 2400000;
    const monthlyRent = annualBudget / 12;

    let monthlyIncome = 0;
    if (incomeType === 'salary') {
      monthlyIncome = parseInt(state.profileData?.incomeInfo?.monthlyIncome) || parseInt(profile.incomeInfo?.monthlyIncome) || 350000;
    } else if (['business', 'entrepreneur', 'gig'].includes(incomeType)) {
      monthlyIncome = parseInt(profile.employmentInfo?.monthlyProfit) || 300000;
    } else if (incomeType === 'sponsored') {
      const sponsorBudget = parseInt(profile.employmentInfo?.sponsorBudget) || 200000;
      monthlyIncome = sponsorBudget * 4; // Assume sponsor's income is 4x the rent budget
    }

    if (monthlyIncome <= 0) return 70; // fallback default score

    const ratio = (monthlyRent / monthlyIncome) * 100;
    let score = 50;

    if (ratio <= 20) score = 100;
    else if (ratio <= 30) score = 90;
    else if (ratio <= 35) score = 80;
    else if (ratio <= 40) score = 70;
    else if (ratio <= 50) score = 60;
    else if (ratio <= 60) score = 50;
    else if (ratio <= 70) score = 40;
    else if (ratio <= 80) score = 30;
    else if (ratio <= 100) score = 20;
    else score = 10;

    return score;
  },

  // 1. Dashboard Overview Tab
  renderOverviewTab(state, overallStatus, bannerClass, bannerIcon, bannerTitle, bannerDesc) {
    const ver = state.verification || {};
    const scoreVal = this.calculateTenantScore(state);

    return `
      <div class="status-banner ${bannerClass}">
        <div class="status-banner-icon" style="background: white;">${bannerIcon}</div>
        <div class="status-banner-content">
          <h3 style="margin:0;">${bannerTitle}</h3>
          <p style="margin:0; font-size:12px; opacity:0.9;">${bannerDesc}</p>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:start;">
        <!-- Circular score widgets -->
        <div class="tenant-card" style="display:flex; align-items:center; gap:20px;">
          <div class="score-svg-box" style="position:relative; width:120px; height:120px; display:flex; align-items:center; justify-content:center;">
            <svg width="120" height="120" style="transform: rotate(-90deg);">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--tenant-border)" stroke-width="8"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-secondary)" stroke-width="8" stroke-dasharray="314" stroke-dashoffset="${314 - (314 * (scoreVal / 100))}"/>
            </svg>
            <div style="position:absolute; text-align:center;">
              <div style="font-size:24px; font-weight:bold; color:var(--tenant-text);">${scoreVal}</div>
              <div style="font-size:9px; color:var(--tenant-text-muted); text-transform:uppercase;">Haven Score</div>
            </div>
          </div>
          <div style="flex:1;">
            <h4 style="font-weight:bold; margin:0; font-size:15px;">Tenant Score: ${scoreVal >= 90 ? 'Grade A+' : scoreVal >= 80 ? 'Grade A' : scoreVal >= 70 ? 'Grade B' : 'Grade C'}</h4>
            <p style="font-size:12px; color:var(--tenant-text-muted); line-height:1.4; margin-top:4px;">Landlords prioritize scores over 70.</p>
            <button class="btn btn-outline btn-sm" id="btn-view-analytics" style="margin-top:12px; padding:4px 8px; font-size:11px;">View Analytics</button>
          </div>
        </div>

        <!-- Escrow Wallet balances widget -->
        <div class="tenant-card" style="display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="font-size:12px; font-weight:bold; color:var(--tenant-text-muted); text-transform:uppercase; margin:0;">Secured Escrow Balance</h4>
            <span class="badge badge-approved" style="font-size:9px;">CBN Secured</span>
          </div>
          <div style="font-size:32px; font-weight:bold; color:var(--color-primary); line-height:1;">
            ₦ ${(state.escrow?.totalSecured || 0).toLocaleString()}
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; border-top:1px solid var(--tenant-border); padding-top:8px; color:var(--tenant-text-muted);">
            <span>Caution: ₦ ${(state.escrow?.cautionDeposit || 0).toLocaleString()}</span>
            <span>Advance: ₦ ${(state.escrow?.advanceRent || 0).toLocaleString()}</span>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-open-deposit-modal" style="width:100%; font-size:11px;">Simulate Deposit</button>
        </div>
      </div>

      <!-- Verification Mini-Checklist -->
      <div class="tenant-card">
        <h3 style="font-size:14px; font-weight:bold; margin-bottom:16px;">Verification Checklist</h3>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px;">
          <div style="border: 1px solid var(--tenant-border); padding:12px; border-radius:12px; text-align:center;">
            <div style="font-size:18px; margin-bottom:4px;">${ver.bvnStatus === 'approved' ? '&#9989;' : '&#9898;'}</div>
            <div style="font-weight:bold; font-size:11px; color:var(--tenant-text);">BVN Link</div>
            <span style="font-size:10px;" class="badge badge-${ver.bvnStatus === 'approved' ? 'approved' : 'action'}">${ver.bvnStatus}</span>
          </div>
          <div style="border: 1px solid var(--tenant-border); padding:12px; border-radius:12px; text-align:center;">
            <div style="font-size:18px; margin-bottom:4px;">${ver.ninStatus === 'approved' ? '&#9989;' : '&#9898;'}</div>
            <div style="font-weight:bold; font-size:11px; color:var(--tenant-text);">NIN Link</div>
            <span style="font-size:10px;" class="badge badge-${ver.ninStatus === 'approved' ? 'approved' : 'action'}">${ver.ninStatus}</span>
          </div>
          <div style="border: 1px solid var(--tenant-border); padding:12px; border-radius:12px; text-align:center;">
            <div style="font-size:18px; margin-bottom:4px;">${ver.selfieStatus === 'approved' ? '&#9989;' : '&#9898;'}</div>
            <div style="font-weight:bold; font-size:11px; color:var(--tenant-text);">Selfie ID</div>
            <span style="font-size:10px;" class="badge badge-${ver.selfieStatus === 'approved' ? 'approved' : 'action'}">${ver.selfieStatus}</span>
          </div>
          <div style="border: 1px solid var(--tenant-border); padding:12px; border-radius:12px; text-align:center;">
            <div style="font-size:18px; margin-bottom:4px;">${ver.employeeIdStatus === 'approved' || ver.studentIdStatus === 'approved' ? '&#9989;' : '&#9898;'}</div>
            <div style="font-weight:bold; font-size:11px; color:var(--tenant-text);">Employment</div>
            <span style="font-size:10px;" class="badge badge-approved">Verified</span>
          </div>
        </div>
      </div>

      <!-- Top 3 AI Recommendations -->
      <div class="tenant-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="font-size:14px; font-weight:bold; margin:0;">Top 3 AI Matches</h3>
          <button class="btn btn-outline btn-sm btn-quick-act" data-tab="ai-match" style="font-size:11px; padding:4px 8px;">View All Matches</button>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
          ${(state.properties || []).slice(0, 3).map(p => `
            <div style="border:1px solid var(--tenant-border); border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:8px; background:var(--tenant-card);">
              <div style="background-image:url('${p.image}'); background-size:cover; background-position:center; height:100px; border-radius:8px; position:relative;">
                <span class="badge badge-approved" style="position:absolute; top:8px; right:8px; background:var(--color-secondary); color:white; border:none; font-size:9px;">${p.match.score}% Match</span>
              </div>
              <h4 style="font-size:13px; font-weight:bold; margin:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--tenant-text);">${p.title}</h4>
              <div style="font-size:11px; color:var(--tenant-text-muted);">${p.location}</div>
              <div style="font-size:13px; font-weight:bold; color:var(--color-primary); margin-top:4px;">₦ ${p.rent.toLocaleString()} / Yr</div>
              <button class="btn btn-outline btn-sm btn-discover-inspect-details" data-id="${p.id}" style="width:100%; margin-top:8px; font-size:10px; padding:4px 0;">Inspect Details</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 2. Search Properties Tab (Section 4)
  renderDiscoveryTab(state) {
    const searchVal = state.discoverySearch || '';
    const budgetVal = state.discoveryBudget || 3000000;
    const locationVal = state.discoveryLocation || 'all';

    let filtered = state.properties || [];
    if (searchVal) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(searchVal.toLowerCase()) || p.location.toLowerCase().includes(searchVal.toLowerCase()));
    }
    if (locationVal !== 'all') {
      filtered = filtered.filter(p => p.location.toLowerCase().includes(locationVal.toLowerCase()));
    }
    filtered = filtered.filter(p => p.rent <= budgetVal);

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:16px;">
        <div>
          <h2 style="font-size:20px; font-weight:bold;">Discovery Search Roster</h2>
          <p class="text-sm text-muted">Browse properties qualified and matched against your budget preferences.</p>
        </div>

        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <input type="text" id="input-discover-search" class="tenant-input" placeholder="Search neighborhood..." value="${searchVal}" style="width:200px;">
          
          <select id="select-discover-location" class="tenant-select">
            <option value="all" ${locationVal === 'all' ? 'selected' : ''}>All Locations</option>
            <option value="lekki" ${locationVal === 'lekki' ? 'selected' : ''}>Lekki</option>
            <option value="yaba" ${locationVal === 'yaba' ? 'selected' : ''}>Yaba</option>
            <option value="victoria" ${locationVal === 'victoria' ? 'selected' : ''}>Victoria Island</option>
          </select>
        </div>
      </div>

      <!-- Budget Range Filter -->
      <div class="tenant-card" style="margin-bottom:16px;">
        <label for="range-discover-budget" style="display:flex; justify-content:space-between; font-size:12px; font-weight:bold;">
          <span>Maximum Yearly Rent Budget Limit</span>
          <strong style="color:var(--color-secondary);">₦ ${budgetVal.toLocaleString()}</strong>
        </label>
        <input type="range" id="range-discover-budget" min="500000" max="5000000" step="100000" value="${budgetVal}" style="width:100%; margin-top:8px;">
      </div>

      <!-- Properties Grid -->
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:20px;">
        ${filtered.map(p => {
          const isFav = (state.favorites || []).includes(p.id);

          return `
            <div class="tenant-card" style="padding:0; overflow:hidden; display:flex; flex-direction:column; gap:16px;">
              <div style="background-image:url('${p.image}'); background-size:cover; background-position:center; height:180px; position:relative;">
                <span class="badge badge-approved" style="position:absolute; top:12px; right:12px; background:var(--color-secondary); color:white; border:none;">${p.match.score}% AI Match</span>
                
                <button class="btn-fav-toggle" data-id="${p.id}" style="position:absolute; top:12px; left:12px; background:white; border:none; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:var(--tenant-shadow);">
                  <span style="color:${isFav ? 'var(--color-error)' : '#9CA3AF'}; font-size:18px;">${isFav ? '&#9829;' : '&#9825;'}</span>
                </button>
              </div>

              <div style="padding:20px; display:flex; flex-direction:column; gap:8px;">
                <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:bold; color:var(--tenant-text-muted);">
                  <span>${p.propertyType}</span>
                  <span class="badge badge-approved" style="font-size:9px;">Verified Listing</span>
                </div>
                <h4 style="font-size:15px; font-weight:bold; margin:0;">${p.title}</h4>
                <div style="font-size:12px; color:var(--tenant-text-muted);">${p.location}, ${p.city}</div>
                
                <div style="font-size:18px; font-weight:bold; color:var(--color-primary); margin-top:8px;">
                  ₦ ${p.rent.toLocaleString()} <span style="font-size:11px; font-weight:normal; color:var(--tenant-text-muted);">/ year</span>
                </div>

                <div style="display:flex; gap:12px; font-size:11px; color:var(--tenant-text-muted); border-top:1px solid var(--tenant-border); padding-top:12px; margin-top:8px;">
                  <span>🛌 ${p.bedrooms} Beds</span>
                  <span>🛁 ${p.bathrooms} Baths</span>
                </div>

                <button class="btn btn-primary btn-sm btn-discover-inspect-details" data-id="${p.id}" style="width:100%; margin-top:12px; font-size:11px;">View Property Details</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // 3. AI Matches Tab (Section 5)
  renderAIMatchTab(state) {
    const props = state.properties || [];
    const recommended = [...props].sort((a,b) => b.match.score - a.match.score);

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">AI Property Recommendations</h2>
        <p class="text-sm text-muted">Intelligent matching calculations assessing landlord criteria and commute factors.</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:20px;">
        ${recommended.map((p, idx) => `
          <div class="tenant-card" style="border-left: 6px solid ${idx === 0 ? 'var(--color-secondary)' : 'var(--tenant-border)'};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
              <div>
                <span class="badge badge-approved" style="background:var(--color-secondary); color:white; border:none; margin-bottom:8px;">
                  ${idx === 0 ? '🔥 TOP MATCH RECOMMENDATION' : 'ALTERNATIVE AI MATCH'} (${p.match.score}% Score)
                </span>
                <h3 style="font-size:16px; font-weight:bold; margin:0;">${p.title}</h3>
                <span style="font-size:12px; color:var(--tenant-text-muted);">${p.location}, ${p.city}</span>
              </div>
              <div style="text-align:right;">
                <div style="font-size:18px; font-weight:bold; color:var(--color-primary);">₦ ${p.rent.toLocaleString()} / Yr</div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-top:16px; font-size:12px;">
              <div style="background:rgba(26,122,138,0.03); border:1px solid var(--tenant-border); padding:12px; border-radius:8px;">
                <strong>Commute Match Rating:</strong>
                <div style="color:var(--tenant-text-muted); margin-top:4px;">${p.match.commute}</div>
              </div>
              <div style="background:rgba(26,122,138,0.03); border:1px solid var(--tenant-border); padding:12px; border-radius:8px;">
                <strong>AI Fit Rationale:</strong>
                <div style="color:var(--tenant-text-muted); margin-top:4px;">
                  ${idx === 0 ? 'Ideal income buffer check. Landlord risk classification evaluated low.' : 'Sufficient budget threshold space. Location preferences match.'}
                </div>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:16px;">
              <button class="btn btn-outline btn-sm btn-discover-inspect-details" data-id="${p.id}" style="font-size:11px;">View Property Details</button>
              <button class="btn btn-primary btn-sm btn-quick-apply" data-id="${p.id}" style="font-size:11px;">Apply Now</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 4. Saved Properties Tab
  renderSavedPropertiesTab(state) {
    const favs = state.favorites || [];
    const props = (state.properties || []).filter(p => favs.includes(p.id));

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">Saved & Favorited Properties</h2>
        <p class="text-sm text-muted">Compare properties side-by-side to assess rent breakdowns and rules.</p>
      </div>

      ${props.length > 0 ? `
        <!-- Comparison Table -->
        <div class="tenant-card" style="padding:0; overflow-x:auto; margin-bottom:24px;">
          <div style="padding:16px 24px; border-bottom:1px solid var(--tenant-border); font-weight:bold; color:var(--color-primary);">Side-by-Side Property Comparison</div>
          <table class="data-table" style="width:100%; border-collapse:collapse; font-size:12px;">
            <thead>
              <tr style="border-bottom:1px solid var(--tenant-border); background:rgba(0,0,0,0.01);">
                <th style="padding:12px; text-align:left;">Parameters</th>
                ${props.map(p => `<th style="padding:12px; text-align:left; font-weight:bold; color:var(--color-primary);">${p.title.split(' ')[0]}...</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--tenant-border);">
                <td style="padding:12px; font-weight:bold;">Base Rent</td>
                ${props.map(p => `<td style="padding:12px;">₦ ${p.rent.toLocaleString()} / Yr</td>`).join('')}
              </tr>
              <tr style="border-bottom:1px solid var(--tenant-border);">
                <td style="padding:12px; font-weight:bold;">Caution Fee</td>
                ${props.map(p => `<td style="padding:12px;">₦ 250,000</td>`).join('')}
              </tr>
              <tr style="border-bottom:1px solid var(--tenant-border);">
                <td style="padding:12px; font-weight:bold;">AI Match Score</td>
                ${props.map(p => `<td style="padding:12px; font-weight:bold; color:var(--color-secondary);">${p.match.score}%</td>`).join('')}
              </tr>
              <tr style="border-bottom:1px solid var(--tenant-border);">
                <td style="padding:12px; font-weight:bold;">Neighborhood</td>
                ${props.map(p => `<td style="padding:12px;">${p.location}</td>`).join('')}
              </tr>
              <tr style="border-bottom:1px solid var(--tenant-border);">
                <td style="padding:12px; font-weight:bold;">Specs</td>
                ${props.map(p => `<td style="padding:12px;">🛌 ${p.bedrooms} Beds / 🛁 ${p.bathrooms} Baths</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      ` : `
        <div class="tenant-card" style="text-align:center; padding:48px; color:var(--tenant-text-muted);">
          No saved properties yet. Mark heart indicators on properties discovery to add items here.
        </div>
      `}
    `;
  },

  // 5. Rental Applications Tab (Section 7)
  renderApplicationsTab(state) {
    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">Lease Applications Timeline</h2>
        <p class="text-sm text-muted">Track checks approvals timelines for submitted rental properties.</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:20px;">
        ${state.tenantApplications.map(app => {
          const progressStep = app.status === 'Approved' ? 3 : app.status === 'Under Review' ? 2 : 1;

          return `
            <div class="tenant-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
                <div>
                  <h3 style="font-size:16px; font-weight:bold; margin:0;">${app.propertyTitle}</h3>
                  <span style="font-size:12px; color:var(--tenant-text-muted);">Landlord Operator: <strong>${app.landlordName}</strong></span>
                </div>
                <span class="badge ${app.status === 'Approved' ? 'badge-success' : app.status === 'Rejected' ? 'badge-error' : 'badge-warning'}">
                  Status: ${app.status}
                </span>
              </div>

              <!-- Application Progress Timeline -->
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; position:relative; padding: 0 16px;">
                <div style="position:absolute; top:12px; left:32px; right:32px; height:4px; background:#E5E7EB; z-index:1;">
                  <div style="background:var(--color-secondary); height:100%; width:${progressStep === 3 ? '100%' : progressStep === 2 ? '50%' : '0%'};"></div>
                </div>

                <div style="z-index:2; text-align:center;">
                  <div style="width:28px; height:28px; border-radius:50%; background:${progressStep >= 1 ? 'var(--color-secondary)' : '#E5E7EB'}; color:white; display:flex; align-items:center; justify-content:center; margin: 0 auto 8px auto; font-weight:bold; font-size:12px;">1</div>
                  <span style="font-size:11px; font-weight:500; color:var(--tenant-text);">Submitted</span>
                </div>

                <div style="z-index:2; text-align:center;">
                  <div style="width:28px; height:28px; border-radius:50%; background:${progressStep >= 2 ? 'var(--color-secondary)' : '#E5E7EB'}; color:white; display:flex; align-items:center; justify-content:center; margin: 0 auto 8px auto; font-weight:bold; font-size:12px;">2</div>
                  <span style="font-size:11px; font-weight:500; color:var(--tenant-text);">Under Review</span>
                </div>

                <div style="z-index:2; text-align:center;">
                  <div style="width:28px; height:28px; border-radius:50%; background:${progressStep >= 3 ? 'var(--color-secondary)' : '#E5E7EB'}; color:white; display:flex; align-items:center; justify-content:center; margin: 0 auto 8px auto; font-weight:bold; font-size:12px;">3</div>
                  <span style="font-size:11px; font-weight:500; color:var(--tenant-text);">Decision</span>
                </div>
              </div>

              ${app.status === 'Approved' ? `
                <div style="margin-top:24px; border-top:1px solid var(--tenant-border); padding-top:16px; display:flex; justify-content:flex-end;">
                  <button class="btn btn-primary btn-sm btn-quick-act" data-tab="leases" style="font-size:11px;">✍️ Proceed to Sign Digital Lease</button>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // 6. Inspections Schedule Tab (Section 6)
  renderInspectionsTab(state) {
    const isReadOnly = state.adminRole === 'Read-Only Auditor';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">Inspections Bookings & Schedules</h2>
        <p class="text-sm text-muted">Schedule property walkthroughs or check liveness virtual sessions.</p>
      </div>

      <div style="display:grid; grid-template-columns: 1.2fr 1.8fr; gap:24px; align-items:start;">
        
        <!-- Inspection Scheduler Form -->
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px;">Book Walkthrough Slot</h3>
          
          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label text-sm" for="select-inspect-prop">Select target Property</label>
            <select id="select-inspect-prop" class="tenant-select" style="width:100%; margin-top:6px;">
              ${(state.properties || []).map(p => `<option value="${p.id}">${p.title}</option>`).join('')}
            </select>
          </div>

          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label text-sm">Walkthrough Type</label>
            <div style="display:flex; gap:16px; margin-top:8px;">
              <label><input type="radio" name="inspect-type" value="Physical" checked> Physical Inspection</label>
              <label><input type="radio" name="inspect-type" value="Virtual"> Virtual Inspection</label>
            </div>
          </div>

          <!-- Calendar grid -->
          <div class="form-group">
            <label class="form-label text-sm">Select Calendar Date (July 2026)</label>
            <div class="inspections-calendar">
              <div class="calendar-day" data-day="21">21</div>
              <div class="calendar-day" data-day="22">22</div>
              <div class="calendar-day" data-day="23">23</div>
              <div class="calendar-day selected" data-day="24">24</div>
              <div class="calendar-day" data-day="25">25</div>
              <div class="calendar-day" data-day="26">26</div>
              <div class="calendar-day" data-day="27">27</div>
            </div>
          </div>

          <div class="form-group" style="margin-top:12px;">
            <label class="form-label text-sm" for="select-inspect-time">Available Slots</label>
            <select id="select-inspect-time" class="tenant-select" style="width:100%; margin-top:6px;">
              <option value="10:00 AM">10:00 AM - 11:00 AM</option>
              <option value="02:00 PM">02:00 PM - 03:00 PM</option>
              <option value="04:00 PM">04:00 PM - 05:00 PM</option>
            </select>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-submit-inspection" style="width:100%; margin-top:16px;" ${isReadOnly ? 'disabled' : ''}>Confirm Booking</button>
        </div>

        <!-- Bookings History -->
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px;">Walkthrough Roster Logs</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${state.tenantInspections.map(insp => `
              <div style="border:1px solid var(--tenant-border); border-radius:12px; padding:16px; background:var(--tenant-card);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="font-size:13px;">${insp.propertyTitle}</strong>
                  <span class="badge badge-info" style="font-size:9px;">${insp.type}</span>
                </div>
                <div style="font-size:12px; color:var(--tenant-text-muted); margin-top:8px;">
                  🗓️ Scheduled: ${insp.date} at ${insp.time}
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; font-size:11px;">
                  <span style="font-weight:bold; color:${insp.status === 'Confirmed' ? 'var(--color-success)' : 'var(--tenant-text-muted)'};">Status: ${insp.status}</span>
                  ${insp.status === 'Confirmed' ? `
                    <div style="display:flex; gap:6px;">
                      <button class="btn btn-outline btn-sm btn-cancel-inspection" data-id="${insp.id}" style="padding:2px 6px; font-size:10px; border-color:var(--color-error); color:var(--color-error); background:none;" ${isReadOnly ? 'disabled' : ''}>Cancel</button>
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 7. Digital Leases Tab
  renderLeasesTab(state) {
    if (!state.landlordLeases) state.landlordLeases = [];
    const activeLease = state.landlordLeases[0];
    const isReadOnly = state.adminRole === 'Read-Only Auditor';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">Digital Leases Vault</h2>
        <p class="text-sm text-muted">Review terms and complete legal validations with verified signatures check.</p>
      </div>

      ${activeLease ? `
        <div style="display:grid; grid-template-columns: 1.8fr 1.2fr; gap:24px; align-items:start;">
          <!-- Contract Text viewer -->
          <div class="tenant-card">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--tenant-border); padding-bottom:12px; margin-bottom:16px;">
              <h3 style="font-size:15px; font-weight:bold; margin:0;">Lease Agreement Contract</h3>
              <button class="btn btn-outline btn-sm" id="btn-tenant-export-pdf" style="font-size:10px; padding:4px 8px;">📄 Export PDF</button>
            </div>
            
            <div style="background:#FAF9F6; border:1px solid var(--tenant-border); border-radius:8px; height:340px; padding:16px; overflow-y:auto; font-family:monospace; font-size:11px; white-space:pre-wrap; color:#374151; line-height:1.5;">
              ${activeLease.contractText}
            </div>
          </div>

          <!-- Signature Pad widget -->
          <div class="tenant-card">
            <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px;">Verified Signature Clearance</h3>
            
            ${!activeLease.tenantSigned ? `
              <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label text-sm" for="tenant-signature-input">Type your legal name to sign</label>
                <input class="tenant-input" type="text" id="tenant-signature-input" placeholder="e.g. Osaze Alao" style="margin-top:6px;">
              </div>

              <!-- Cursive Signature Preview Box -->
              <div class="form-group" style="margin-bottom:20px;">
                <label class="form-label text-sm">Cursive signature preview</label>
                <div class="signature-box" id="tenant-signature-preview" style="margin-top:6px;">
                  Signatures
                </div>
              </div>

              <button class="btn btn-primary btn-sm" id="btn-sign-tenant-lease" data-id="${activeLease.id}" style="width:100%;" ${isReadOnly ? 'disabled' : ''}>Sign & Fully Execute Lease</button>
            ` : `
              <div style="text-align:center; padding:24px 0;">
                <div style="font-size:40px; color:var(--color-success);">✓</div>
                <h4 style="font-weight:bold; margin-top:12px;">Agreement Executed</h4>
                <p style="font-size:12px; color:var(--tenant-text-muted); margin-top:4px;">Signed digitally on: <br><strong>${activeLease.tenantSignedDate}</strong></p>
              </div>
            `}
          </div>
        </div>

        <!-- Export PDF Modal overlay -->
        <div class="modal-overlay" id="tenant-pdf-modal" style="display:none; z-index:9000;">
          <div class="modal-content-card" style="max-width:400px; text-align:center;">
            <div style="font-size:36px; margin-bottom:12px;">📄</div>
            <h3 style="font-weight:bold; margin-bottom:8px;">Download Certified Copy</h3>
            <p style="font-size:12px; color:var(--tenant-text-muted); margin-bottom:24px;">Export the NIMC/Haven time-stamped digital tenancy contract directly to your device downloads folders.</p>
            <div style="display:flex; gap:12px; justify-content:center;">
              <button class="btn btn-outline btn-sm" id="tenant-pdf-close-btn">Cancel</button>
              <button class="btn btn-primary btn-sm" id="btn-tenant-print-pdf">Download PDF</button>
            </div>
          </div>
        </div>
      ` : `
        <div class="tenant-card" style="text-align:center; padding:48px; color:var(--tenant-text-muted);">
          No active agreements or leases pending.
        </div>
      `}
    `;
  },

  // 8. Current Rental / Move-In Tab (Phases 10 & 11)
  renderCurrentRentalTab(state) {
    const isReadOnly = state.adminRole === 'Read-Only Auditor';
    const isHandoverSubmitted = state.tenantMoveInHandover === true;

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">Current Rental & Move-In Checklist</h2>
        <p class="text-sm text-muted">Complete pre-occupancy inspection logs, confirm utilities, and unlock escrow releases.</p>
      </div>

      <div style="display:grid; grid-template-columns: 1.8fr 1.2fr; gap:24px; align-items:start;">
        <!-- Move-in checklist -->
        <div class="tenant-card">
          <h3 style="font-size:15px; font-weight:bold; margin-bottom:16px;">Move-In Handover Checklist</h3>
          
          <div style="display:flex; flex-direction:column; gap:14px; font-size:13px;">
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
              <input type="checkbox" id="chk-clean" checked style="width:18px; height:18px;">
              <span>Property deep clean completed</span>
            </label>
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
              <input type="checkbox" id="chk-util" checked style="width:18px; height:18px;">
              <span>Prepaid meter & water utilities verified connected</span>
            </label>
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
              <input type="checkbox" id="chk-keys" checked style="width:18px; height:18px;">
              <span>Keys, cards, & security gates access tokens collected</span>
            </label>
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
              <input type="checkbox" id="chk-furniture" checked style="width:18px; height:18px;">
              <span>Furniture audit checklist matches inventory logs</span>
            </label>
          </div>

          <!-- Photo upload slot -->
          <div style="margin-top:24px;">
            <div style="font-size:12px; font-weight:bold; color:var(--tenant-text-muted); margin-bottom:8px;">Upload move-in condition photo logs (Optional)</div>
            <div class="uploader-slot" id="btn-mock-photo-upload">
              <span style="font-size:24px; display:block; margin-bottom:4px;">📸</span>
              <span style="font-size:11px; color:var(--tenant-text-muted);">Click to attach house condition photos (Max 5 files)</span>
              <div id="label-attached-photos" style="font-size:11px; font-weight:bold; color:var(--color-secondary); margin-top:6px; display:none;">✓ Lekki_flat_movein_01.jpg attached</div>
            </div>
          </div>

          ${!isHandoverSubmitted ? `
            <button class="btn btn-primary btn-sm" id="btn-submit-movein" style="width:100%; margin-top:24px;" ${isReadOnly ? 'disabled' : ''}>Confirm Handover & Authorize Escrow Release</button>
          ` : `
            <div style="background:rgba(34,197,94,0.06); border:1px solid var(--color-success); border-radius:12px; padding:16px; text-align:center; margin-top:24px;">
              <strong style="color:var(--color-success); display:block; font-size:14px;">✓ Handover Complete</strong>
              <span style="font-size:11px; color:var(--tenant-text-muted);">Rent portion released to Landlord vault. Caution deposit held in trust.</span>
            </div>
          `}
        </div>

        <!-- Escrow release statuses -->
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px;">Escrow Release Progress</h3>
          <div style="display:flex; flex-direction:column; gap:12px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--tenant-border); padding-bottom:8px;">
              <span>Advance Rent (Escrow):</span>
              <strong style="color:${isHandoverSubmitted ? 'var(--color-success)' : 'var(--color-secondary)'};">${isHandoverSubmitted ? 'Released' : 'Funded Hold'}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--tenant-border); padding-bottom:8px;">
              <span>Caution deposit (Trust Pool):</span>
              <strong style="color:var(--color-secondary);">Locked Hold</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding-bottom:4px;">
              <span>Release Trigger:</span>
              <span style="text-align:right; font-weight:bold; color:var(--tenant-text-muted);">Move-in Handover</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 9. Maintenance Requests Tab (Section 11)
  renderMaintenanceTab(state) {
    const isReadOnly = state.adminRole === 'Read-Only Auditor';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">Tenancy Maintenance Requests</h2>
        <p class="text-sm text-muted">Create repair notifications and monitor fix updates logs.</p>
      </div>

      <div style="display:grid; grid-template-columns: 1.2fr 1.8fr; gap:24px; align-items:start;">
        <!-- File repair request -->
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px;">File New Request</h3>
          
          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label text-sm" for="select-repair-cat">Issue Category</label>
            <select id="select-repair-cat" class="tenant-select" style="width:100%; margin-top:6px;">
              <option value="Plumbing">Plumbing / Leakages</option>
              <option value="Electrical">Electrical / Power supply</option>
              <option value="Security">Security / Key locks</option>
              <option value="Cleaning">Cleaning / Garbage disposal</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom:16px;">
            <label class="form-label text-sm" for="textarea-repair-desc">Description of issue</label>
            <textarea id="textarea-repair-desc" class="tenant-input" rows="4" style="margin-top:6px; font-size:12px;" placeholder="Describe what needs repair, location in house..."></textarea>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-submit-repair" style="width:100%;" ${isReadOnly ? 'disabled' : ''}>Submit Request</button>
        </div>

        <!-- Requests Log -->
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px;">Repairs Tracking Ledger</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${state.tenantMaintenance.map(req => `
              <div style="border:1px solid var(--tenant-border); border-radius:12px; padding:16px; background:var(--tenant-card);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="font-size:13px;">Category: ${req.category}</strong>
                  <span class="badge badge-${req.status === 'Completed' ? 'approved' : 'warning'}" style="font-size:9px;">${req.status}</span>
                </div>
                <p style="font-size:12px; color:var(--tenant-text-muted); margin-top:8px; line-height:1.4;">${req.desc}</p>
                <div style="font-size:10px; color:#9CA3AF; margin-top:8px; border-top:1px solid var(--tenant-border); padding-top:8px;">
                  🗓️ Filed on: ${req.date} | Plumber: Alao Plumbings Ltd
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 10. Dispute Centre Tab (Section 12)
  renderDisputesTab(state) {
    const isReadOnly = state.adminRole === 'Read-Only Auditor';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">Dispute Resolution Center</h2>
        <p class="text-sm text-muted">File caution deposit claims disputes or lease violations complaints for platform mediation.</p>
      </div>

      <div style="display:grid; grid-template-columns: 1.2fr 1.8fr; gap:24px; align-items:start;">
        <!-- Raise Dispute -->
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px;">Raise Tenancy Dispute</h3>
          
          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label text-sm" for="select-dispute-reason">Mediation Category</label>
            <select id="select-dispute-reason" class="tenant-select" style="width:100%; margin-top:6px;">
              <option value="Deposit Issues">Caution Deposit Refunds Hold</option>
              <option value="Property Condition">Unresolved Repairs / Condition disputes</option>
              <option value="Lease Violations">Unilateral Lease Terms adjustments</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom:16px;">
            <label class="form-label text-sm" for="textarea-dispute-desc">Statement & Evidence explanation</label>
            <textarea id="textarea-dispute-desc" class="tenant-input" rows="4" style="margin-top:6px; font-size:12px;" placeholder="Provide details of transaction, dates, landlord actions..."></textarea>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-submit-dispute" style="width:100%;" ${isReadOnly ? 'disabled' : ''}>File Dispute Case</button>
        </div>

        <!-- Disputes Logs -->
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px;">Mediation Case Timeline</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${state.tenantDisputes.map(disp => `
              <div style="border:1px solid var(--tenant-border); border-radius:12px; padding:16px; background:var(--tenant-card);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="font-size:13px;">Reason: ${disp.reason}</strong>
                  <span class="badge badge-${disp.status === 'Resolved' ? 'approved' : 'warning'}" style="font-size:9px;">${disp.status}</span>
                </div>
                <p style="font-size:12px; color:var(--tenant-text-muted); margin-top:8px; line-height:1.4;">${disp.desc}</p>
                
                <div style="background:#FAF9F6; border:1px solid var(--tenant-border); border-radius:8px; padding:10px; margin-top:12px; font-size:11px;">
                  <strong>Mediation Milestones:</strong>
                  <div style="display:flex; gap:8px; align-items:center; margin-top:6px; font-size:10px;">
                    <span style="color:var(--color-secondary);">✓ Filed</span>
                    <span style="color:#9CA3AF;">&rarr;</span>
                    <span style="color:var(--color-secondary);">✓ Evidence Review</span>
                    <span style="color:#9CA3AF;">&rarr;</span>
                    <span style="color:#9CA3AF;">Payout Mediation</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 11. Notifications Tab
  renderNotificationsTab(state) {
    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">Notifications Center</h2>
        <p class="text-sm text-muted">A log of platform alerts, matching notifications, and payout signals.</p>
      </div>

      <div class="tenant-card" style="display:flex; flex-direction:column; gap:12px;">
        ${state.notifications.map(n => `
          <div style="padding:12px; background:#FAF9F6; border-left:4px solid var(--color-secondary); border-radius:4px; font-size:12px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${n.type.toUpperCase()}:</strong> ${n.text}
              <div style="font-size:10px; color:#9CA3AF; margin-top:4px;">${n.time}</div>
            </div>
            <span class="badge badge-approved" style="font-size:9px; background:rgba(26,122,138,0.1); color:var(--color-secondary); border:none;">New</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 12. Settings & Support Tab (Section 14 & 16)
  renderSettingsTab(state) {
    const isReadOnly = state.adminRole === 'Read-Only Auditor';

    return `
      <div style="margin-bottom:24px;">
        <h2 style="font-size:20px; font-weight:bold;">Security Settings & Support Desk</h2>
        <p class="text-sm text-muted">Enable account security keys or consult support ticket databases.</p>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:24px; align-items:start;">
        <!-- Settings -->
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:16px;">Security Profiles</h3>
          
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:13px; display:block;">Require Two-Factor (2FA)</strong>
                <span style="font-size:11px; color:var(--tenant-text-muted);">Enforce mandatory token keys on withdrawals.</span>
              </div>
              <input type="checkbox" id="sett-2fa" checked style="width:18px; height:18px;" ${isReadOnly ? 'disabled' : ''}>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--tenant-border); padding-top:16px;">
              <div>
                <strong style="font-size:13px; display:block;">SMS Payout notifications</strong>
                <span style="font-size:11px; color:var(--tenant-text-muted);">Send SMS logs on caution releases.</span>
              </div>
              <input type="checkbox" id="sett-comm-sms" checked style="width:18px; height:18px;" ${isReadOnly ? 'disabled' : ''}>
            </div>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-save-settings" style="width:100%; margin-top:24px;" ${isReadOnly ? 'disabled' : ''}>Save Security Settings</button>
        </div>

        <!-- Help desk FAQ accordions -->
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px;">Support Help Center FAQs</h3>
          
          <div style="display:flex; flex-direction:column; gap:10px; font-size:12px;">
            <div style="padding:10px; background:#FAF9F6; border-radius:6px; border:1px solid var(--tenant-border);">
              <strong>How does deposit security work?</strong>
              <div style="color:var(--tenant-text-muted); margin-top:4px;">Caution fees are held under compliance pools and only released upon joint move-out checklists audit logs check.</div>
            </div>
            <div style="padding:10px; background:#FAF9F6; border-radius:6px; border:1px solid var(--tenant-border);">
              <strong>What if a landlord rejects a request?</strong>
              <div style="color:var(--tenant-text-muted); margin-top:4px;">You can immediately escalate the case to platform arbitration desk via the Dispute tab options.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 13. Property Details modal drawer (Section 4 details overlay)
  renderPropertyDetailsDrawer(state) {
    const props = state.properties || [];
    const p = props.find(item => item.id === state.activeDetailsPropertyId);
    if (!p) return '';

    const isFav = (state.favorites || []).includes(p.id);
    const progressOffset = 188 - (188 * (p.match.score / 100));
    const isReadOnly = state.adminRole === 'Read-Only Auditor';

    return `
      <div class="modal-overlay" id="prop-details-modal" style="z-index:9000;">
        <div class="modal-content-card" style="max-width:760px; padding:0; overflow:hidden; display:flex; flex-direction:column; max-height:85vh;">
          <div style="background-image:url('${p.image}'); background-size:cover; background-position:center; height:200px; position:relative;">
            <button id="close-details-modal" style="position:absolute; top:16px; right:16px; background:rgba(0,0,0,0.6); color:white; border:none; width:36px; height:36px; border-radius:50%; font-size:20px; cursor:pointer;">&times;</button>
          </div>

          <div style="padding:24px; overflow-y:auto; display:flex; flex-direction:column; gap:20px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid var(--tenant-border); padding-bottom:12px;">
              <div>
                <h3 style="font-size:18px; font-weight:bold; margin:0;">${p.title}</h3>
                <span style="font-size:12px; color:var(--tenant-text-muted);">${p.location}, ${p.city}</span>
              </div>
              <div style="text-align:right;">
                <div style="font-size:20px; font-weight:bold; color:var(--color-primary);">₦ ${p.rent.toLocaleString()} / Yr</div>
                <span style="font-size:10px; color:var(--tenant-text-muted);">Caution: ₦ 250,000</span>
              </div>
            </div>

            <!-- AI Insights -->
            <div style="background:rgba(26,122,138,0.03); border:1px solid var(--tenant-border); border-radius:12px; padding:16px;">
              <div style="display:flex; gap:16px; align-items:center; margin-bottom:12px;">
                <div style="position:relative; width:48px; height:48px;">
                  <svg width="48" height="48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" stroke-width="4"/>
                    <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-secondary)" stroke-width="4" stroke-linecap="round" stroke-dasharray="125" stroke-dashoffset="${125 - (125 * (p.match.score / 100))}" transform="rotate(-90 24 24)"/>
                  </svg>
                  <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:11px; font-weight:bold; color:var(--color-primary);">${p.match.score}%</div>
                </div>
                <div>
                  <strong style="display:block; font-size:13px;">AI Matching Suitability Index</strong>
                  <span style="font-size:11px; color:var(--tenant-text-muted);">Calculated against profile and employer records.</span>
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:11px;">
                <div><strong>Commute:</strong> ${p.match.commute}</div>
                <div><strong>Income fit:</strong> Rent is 34% of salary (Excellent)</div>
              </div>
            </div>

            <!-- Fees breakdown -->
            <div>
              <strong style="font-size:13px; display:block; margin-bottom:8px;">Estimated Move-In Costs</strong>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:12px;">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--tenant-border); padding-bottom:6px;"><span>First Year Rent:</span> <strong>₦ ${p.rent.toLocaleString()}</strong></div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--tenant-border); padding-bottom:6px;"><span>Caution holding:</span> <strong>₦ 250,000</strong></div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--tenant-border); padding-bottom:6px;"><span>Agency fee:</span> <strong>₦ 125,000</strong></div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--tenant-border); padding-bottom:6px;"><span>Legal charge:</span> <strong>₦ 125,000</strong></div>
              </div>
            </div>

            <div style="display:flex; gap:12px; margin-top:8px;">
              <button class="btn btn-outline btn-sm btn-drawer-book-inspect" data-id="${p.id}" style="flex:1;" ${isReadOnly ? 'disabled' : ''}>📅 Book Inspection</button>
              <button class="btn btn-primary btn-sm btn-drawer-submit-app" data-id="${p.id}" style="flex:1;" ${isReadOnly ? 'disabled' : ''}>📝 Submit Application</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initializeState(state) {
    if (!state.activeDashboardTab) state.activeDashboardTab = 'overview';
    if (!state.discoverySearch) state.discoverySearch = '';
    if (!state.discoveryBudget) state.discoveryBudget = 3000000;
    if (!state.discoveryLocation) state.discoveryLocation = 'all';
    if (!state.favorites) state.favorites = [1, 2];

    // Mock property list if missing
    if (!state.properties) {
      state.properties = [
        { id: 1, title: 'Luxury 2 Bed Penthouse Duplex', location: 'Lekki Phase 1', city: 'Lagos', rent: 2500000, propertyType: 'Duplex', bedrooms: 2, bathrooms: 2, image: 'assets/lekki_duplex.jpg', match: { score: 94, commute: '14 mins to office (Yaba)' }, availability: 'Available Now', amenities: ['Power Backup', 'Security', 'Water Treatment'] },
        { id: 2, title: 'Cozy 1 Bedroom Studio Loft', location: 'Yaba', city: 'Lagos', rent: 1200000, propertyType: 'Studio', bedrooms: 1, bathrooms: 1, image: 'assets/yaba_loft.jpg', match: { score: 88, commute: '5 mins to office (Yaba)' }, availability: 'Available Now', amenities: ['Power Backup', 'Internet', 'Water Treatment'] },
        { id: 3, title: 'Executive 3 Bed Serviced Flat', location: 'Victoria Island', city: 'Lagos', rent: 4500000, propertyType: 'Apartment', bedrooms: 3, bathrooms: 3, image: 'assets/vi_flat.jpg', match: { score: 72, commute: '35 mins to office (Yaba)' }, availability: 'Pending Audit', amenities: ['Power Backup', 'Security', 'Water Treatment', 'Furnished'] }
      ];
    }

    // Tenant walkthrough schedules list (Section 6)
    if (!state.tenantInspections) {
      state.tenantInspections = [
        { id: 1, propertyId: 2, propertyTitle: 'Cozy 1 Bedroom Studio Loft', date: '2026-07-24', time: '10:00 AM', type: 'Physical', status: 'Confirmed' }
      ];
    }

    // Tenant applications list (Section 7)
    if (!state.tenantApplications) {
      state.tenantApplications = [
        { id: 1, propertyId: 2, propertyTitle: 'Cozy 1 Bedroom Studio Loft', landlordName: 'Mrs. Funmi Coker', status: 'Approved' }
      ];
    }

    // Leases mock
    if (!state.landlordLeases) {
      state.landlordLeases = [
        { id: 1, tenantName: 'Osaze Alao', landlordName: 'Mrs. Funmi Coker', status: 'Pending Tenant Signature', tenantSigned: false, contractText: 'LEASE AGREEMENT\n\nThis agreement is made on July 15, 2026 between Landlord Funmi Coker and Tenant Osaze Alao.\n\nProperty: Cozy 1 Bedroom Studio Loft (Yaba).\nRent: ₦1,200,000/yr\nCaution: ₦250,000\n\nSigned by Landlord: Funmi Coker (Verified NIMC)\nSigned by Tenant: [Pending]' }
      ];
    }

    // Tenant maintenance requests list (Section 11)
    if (!state.tenantMaintenance) {
      state.tenantMaintenance = [
        { id: 1, category: 'Plumbing', desc: 'Kitchen sink pipes leaking at the joint, causing water pooling on floor.', date: '2026-07-16', status: 'Pending Review' }
      ];
    }

    // Tenant disputes list (Section 12)
    if (!state.tenantDisputes) {
      state.tenantDisputes = [
        { id: 1, reason: 'Deposit Issues', desc: 'Previous landlord refused to disburse caution deposit, claims painting fees are N100k without providing receipts.', status: 'Under Review' }
      ];
    }

    // Initializations for Escrow Balance values if missing
    if (!state.escrow) {
      state.escrow = {
        cautionDeposit: 250000,
        advanceRent: 0,
        totalSecured: 250000,
        history: []
      };
    }
  },

  init(state, navigateTo, updateState) {
    if (state.onboardingCompleted !== true) {
      ProfileWizard.init(state, navigateTo, updateState);
      return;
    }

    const activeTab = state.activeDashboardTab || 'overview';
    const isReadOnly = state.adminRole === 'Read-Only Auditor';

    // 1. Sidebar tab switching listener
    document.querySelectorAll('.dashboard-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        updateState({ activeDashboardTab: tab });
        navigateTo('dashboard');
      });
    });

    // Overview Tab - circular gauge link
    document.getElementById('goto-score-tab')?.addEventListener('click', () => {
      updateState({ activeDashboardTab: 'quality-score' });
      navigateTo('dashboard');
    });

    // Overview Tab - Quick actions hooks
    document.querySelectorAll('.btn-quick-act').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        updateState({ activeDashboardTab: tab });
        navigateTo('dashboard');
      });
    });

    // 2. Search properties input bindings
    document.getElementById('input-discover-search')?.addEventListener('input', (e) => {
      updateState({ discoverySearch: e.target.value });
    });

    document.getElementById('select-discover-location')?.addEventListener('change', (e) => {
      updateState({ discoveryLocation: e.target.value });
      navigateTo('dashboard');
    });

    // Budget range slider update
    const slider = document.getElementById('range-discover-budget');
    slider?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      updateState({ discoveryBudget: val });
      
      const label = e.target.previousElementSibling.querySelector('strong');
      if (label) label.innerText = `₦ ${val.toLocaleString()}`;
    });

    slider?.addEventListener('change', () => {
      navigateTo('dashboard');
    });

    // Favorite heart icon toggling
    document.querySelectorAll('.btn-fav-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        let updatedFavs = state.favorites || [];
        if (updatedFavs.includes(id)) {
          updatedFavs = updatedFavs.filter(fid => fid !== id);
        } else {
          updatedFavs.push(id);
        }
        updateState({ favorites: updatedFavs });
        navigateTo('dashboard');
      });
    });

    // Open property details modal
    document.querySelectorAll('.btn-discover-inspect-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'));
        updateState({ activeDetailsPropertyId: id });
        navigateTo('dashboard');
      });
    });

    // Close property details modal
    document.getElementById('close-details-modal')?.addEventListener('click', () => {
      updateState({ activeDetailsPropertyId: null });
      navigateTo('dashboard');
    });

    // 3. Inspections Schedule Tab Calendar click slots
    document.querySelectorAll('.calendar-day').forEach(day => {
      day.addEventListener('click', (e) => {
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        day.classList.add('selected');
      });
    });

    // Submit new inspection booking
    document.getElementById('btn-submit-inspection')?.addEventListener('click', () => {
      if (isReadOnly) return;
      const propId = parseInt(document.getElementById('select-inspect-prop').value);
      const prop = state.properties.find(p => p.id === propId);
      const selectedDay = document.querySelector('.calendar-day.selected')?.getAttribute('data-day') || '24';
      const timeVal = document.getElementById('select-inspect-time').value;
      const isVirtual = document.querySelector('input[name="inspect-type"]:checked')?.value || 'Physical';

      const newBooking = {
        id: Date.now(),
        propertyId: propId,
        propertyTitle: prop ? prop.title : 'Target Property',
        date: `2026-07-${selectedDay}`,
        time: timeVal,
        type: isVirtual,
        status: 'Confirmed'
      };

      updateState({
        tenantInspections: [newBooking, ...state.tenantInspections]
      });

      alert(`Inspection walkthrough confirmed for: \n${newBooking.propertyTitle} on ${newBooking.date} at ${newBooking.time}.`);
      navigateTo('dashboard');
    });

    // Cancel inspection booking
    document.querySelectorAll('.btn-cancel-inspection').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isReadOnly) return;
        const id = parseInt(btn.getAttribute('data-id'));
        const updated = state.tenantInspections.map(insp => {
          if (insp.id === id) return { ...insp, status: 'Cancelled' };
          return insp;
        });
        updateState({ tenantInspections: updated });
        alert("Walkthrough schedule cancelled.");
        navigateTo('dashboard');
      });
    });

    // 4. Move-in & Handover checklist action (Section 10)
    document.getElementById('btn-mock-photo-upload')?.addEventListener('click', () => {
      const label = document.getElementById('label-attached-photos');
      if (label) label.style.display = 'block';
    });

    document.getElementById('btn-submit-movein')?.addEventListener('click', () => {
      if (isReadOnly) return;
      if (!document.getElementById('chk-clean').checked || !document.getElementById('chk-util').checked || !document.getElementById('chk-keys').checked) {
        alert("Please complete the move-in items checklist before submitting handover.");
        return;
      }

      updateState({
        tenantMoveInHandover: true
      });

      alert("Handover logs submitted! Advanced rent payment escrow released to landlord.");
      navigateTo('dashboard');
    });

    // 5. Submit Maintenance Request (Section 11)
    document.getElementById('btn-submit-repair')?.addEventListener('click', () => {
      if (isReadOnly) return;
      const cat = document.getElementById('select-repair-cat').value;
      const desc = document.getElementById('textarea-repair-desc').value.trim();

      if (!desc) {
        alert("Please provide details of repair request.");
        return;
      }

      const newRequest = {
        id: Date.now(),
        category: cat,
        desc,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending Review'
      };

      updateState({
        tenantMaintenance: [newRequest, ...state.tenantMaintenance]
      });

      alert("Maintenance repair request logged successfully! Plumbers/electricians will clear the case file.");
      navigateTo('dashboard');
    });

    // 6. Submit Dispute case files (Section 12)
    document.getElementById('btn-submit-dispute')?.addEventListener('click', () => {
      if (isReadOnly) return;
      const reason = document.getElementById('select-dispute-reason').value;
      const desc = document.getElementById('textarea-dispute-desc').value.trim();

      if (!desc) {
        alert("Please describe the dispute statement.");
        return;
      }

      const newDispute = {
        id: Date.now(),
        reason,
        desc,
        status: 'Open'
      };

      updateState({
        tenantDisputes: [newDispute, ...state.tenantDisputes]
      });

      alert("Mediation case file logged successfully. Support officers will contact co-signers.");
      navigateTo('dashboard');
    });

    // 7. Modal Escrow Deposit Forms bindings
    const depositModal = document.getElementById('escrow-deposit-modal');
    document.getElementById('btn-open-deposit-modal')?.addEventListener('click', () => {
      if (depositModal) depositModal.style.display = 'flex';
    });

    const closeModal = () => {
      if (depositModal) depositModal.style.display = 'none';
    };

    document.getElementById('close-deposit-modal')?.addEventListener('click', closeModal);
    document.getElementById('escrow-deposit-overlay')?.addEventListener('click', closeModal);

    document.getElementById('escrow-deposit-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isReadOnly) return;
      const amountVal = parseInt(document.getElementById('deposit-amount').value);
      const typeVal = document.getElementById('deposit-type').value;

      if (!amountVal || amountVal <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      const totalSecured = (state.escrow?.totalSecured || 0) + amountVal;
      let caution = state.escrow?.cautionDeposit || 0;
      let advance = state.escrow?.advanceRent || 0;

      if (typeVal === 'Caution Deposit') caution += amountVal;
      else advance += amountVal;

      const newHistory = [
        {
          id: Date.now(),
          type: typeVal,
          amount: amountVal,
          reference: `ESC-${Math.floor(1000 + Math.random()*9000)}-LA`,
          status: 'Secured',
          date: new Date().toISOString().split('T')[0]
        },
        ...(state.escrow?.history || [])
      ];

      const newTimeline = [
        {
          id: Date.now(),
          type: 'Payment',
          text: `Escrow deposit of ₦${amountVal.toLocaleString()} for ${typeVal} confirmed.`,
          date: new Date().toISOString().split('T')[0],
          status: 'Completed'
        },
        ...state.timeline
      ];

      const newNotifications = [
        {
          id: Date.now(),
          type: 'escrow',
          text: `Payment Alert: ₦${amountVal.toLocaleString()} received and secured in escrow.`,
          time: 'Just now',
          read: false
        },
        ...state.notifications
      ];

      updateState({
        escrow: {
          cautionDeposit: caution,
          advanceRent: advance,
          totalSecured: totalSecured,
          history: newHistory
        },
        timeline: newTimeline,
        notifications: newNotifications
      });

      closeModal();
      alert(`Simulation Success: ₦${amountVal.toLocaleString()} deposited and secured under CBN compliance guidelines.`);
      navigateTo('dashboard');
    });

    // 8. Settings & Profile saves
    document.getElementById('btn-save-settings')?.addEventListener('click', () => {
      alert("Security configurations saved!");
    });

    document.getElementById('btn-tenant-export-pdf')?.addEventListener('click', () => {
      const modal = document.getElementById('tenant-pdf-modal');
      if (modal) modal.style.display = 'flex';
    });

    document.getElementById('tenant-pdf-close-btn')?.addEventListener('click', () => {
      const modal = document.getElementById('tenant-pdf-modal');
      if (modal) modal.style.display = 'none';
    });

    document.getElementById('btn-tenant-print-pdf')?.addEventListener('click', () => {
      alert("Tenancy contract spooled to local downloads folders.");
      const modal = document.getElementById('tenant-pdf-modal');
      if (modal) modal.style.display = 'none';
    });

    // Sign Lease Agreement Action
    document.getElementById('btn-sign-tenant-lease')?.addEventListener('click', (e) => {
      if (isReadOnly) return;
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const signatureInput = document.getElementById('tenant-signature-input')?.value.trim();

      if (!signatureInput) {
        alert("Please type your legal name to sign the document.");
        return;
      }

      const activeLease = state.landlordLeases.find(l => l.id === id);
      if (activeLease) {
        const signDate = new Date().toLocaleString();
        activeLease.tenantSigned = true;
        activeLease.tenantSignedDate = signDate;
        activeLease.status = 'Fully Executed';
        activeLease.contractText = activeLease.contractText.replace('Signed by Tenant: [Pending]', `Signed by Tenant: ${signatureInput} (${signDate} verified via NIMC)`);

        alert("Lease agreement signed and fully executed!");
        navigateTo('dashboard');
      }
    });

    // Drawer internal actions (Submit app, book inspect)
    document.querySelector('.btn-drawer-book-inspect')?.addEventListener('click', () => {
      updateState({
        activeDetailsPropertyId: null,
        activeDashboardTab: 'inspections'
      });
      navigateTo('dashboard');
    });

    document.querySelector('.btn-drawer-submit-app')?.addEventListener('click', (e) => {
      if (isReadOnly) return;
      const propId = parseInt(e.currentTarget.getAttribute('data-id'));
      const prop = state.properties.find(p => p.id === propId);

      const newApp = {
        id: Date.now(),
        propertyId: propId,
        propertyTitle: prop ? prop.title : 'Target Property',
        landlordName: prop ? prop.landlord : 'Landlord Operator',
        status: 'Under Review'
      };

      updateState({
        tenantApplications: [newApp, ...state.tenantApplications],
        activeDetailsPropertyId: null,
        activeDashboardTab: 'applications'
      });

      alert("Rental application submitted successfully!");
      navigateTo('dashboard');
    });

    // Cursive signature generator
    document.getElementById('tenant-signature-input')?.addEventListener('input', (e) => {
      const prev = document.getElementById('tenant-signature-preview');
      if (prev) prev.innerText = e.target.value || 'Signatures';
    });

    // Quality Score Analytics modal controls
    document.getElementById('btn-view-analytics')?.addEventListener('click', () => {
      updateState({ showAnalyticsModal: true });
      navigateTo('dashboard');
    });

    document.getElementById('close-analytics-modal')?.addEventListener('click', () => {
      updateState({ showAnalyticsModal: false });
      navigateTo('dashboard');
    });

    // Sub-screens initializations
    if (activeTab === 'profile-wizard') {
      ProfileWizard.init(state, navigateTo, updateState);
    } else if (activeTab === 'verification-center') {
      VerificationCenter.init(state, navigateTo, updateState);
    } else if (activeTab === 'wallet') {
      EscrowWallet.init(state, navigateTo, updateState);
    }
  }
};

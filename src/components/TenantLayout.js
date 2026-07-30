// Tenant Layout Wrapper with Collapsible Left Sidebar
export const TenantLayout = {
  render(state, contentHTML) {
    const isCollapsed = state.tenantSidebarCollapsed || false;
    const currentRoute = state.route;
    const username = state.user?.username || 'Tenant';
    
    // Notifications details
    const unreadNotifications = state.notifications?.filter(n => !n.read) || [];
    const unreadCount = unreadNotifications.length;

    // Tenant sidebar items (Change 2, 3, 7, 8, 9, 10, 12 compliant)
    const navItems = [
      { route: 'dashboard', name: 'Dashboard Overview', icon: '&#128202;' },
      { route: 'discovery', name: 'Find Properties', icon: '&#128269;' },
      { route: 'leasing', name: 'Rental Applications', icon: '&#128196;' },
      { route: 'inspections', name: 'Inspection Scheduler', icon: '&#128197;' },
      { route: 'support-disputes', name: 'Support & Disputes', icon: '&#128736;' },
      { route: 'wallet', name: 'Wallet & Escrow', icon: '&#128184;' },
      { route: 'profile-wizard', name: 'Profile & Settings', icon: '&#9881;' }
    ];

    const sidebarNavHTML = navItems.map(item => {
      const isActive = currentRoute === item.route;
      return `
        <button class="tenant-sidebar-item ${isActive ? 'active' : ''}" data-route="${item.route}" title="${item.name}">
          <span class="tenant-sidebar-icon">${item.icon}</span>
          <span class="tenant-sidebar-label" style="${isCollapsed ? 'display:none;' : ''}">${item.name}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="tenant-layout-container" style="display: flex; min-height: 100vh; background-color: var(--color-background);">
        
        <!-- Left Sidebar Navigation -->
        <aside class="tenant-sidebar ${isCollapsed ? 'collapsed' : ''}" style="width: ${isCollapsed ? '80px' : '260px'}; background: var(--color-primary); color: white; transition: width 200ms ease; display: flex; flex-direction: column; position: fixed; top: 0; bottom: 0; left: 0; z-index: 200; box-shadow: var(--shadow-lg);">
          
          <!-- Sidebar Header / Brand -->
          <div style="padding: 20px; display: flex; align-items: center; justify-content: ${isCollapsed ? 'center' : 'space-between'}; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <a href="#" id="tenant-nav-logo" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: bold; font-size: 20px;">
              <div style="width: 32px; height: 32px; background: var(--color-secondary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px;">H</div>
              ${!isCollapsed ? '<span>Haven</span>' : ''}
            </a>
            <button id="tenant-sidebar-toggle" style="background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 16px; padding: 4px;" title="${isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}">
              ${isCollapsed ? '&#10095;' : '&#10094;'}
            </button>
          </div>

          <!-- User Profile Brief -->
          <div style="padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 12px; justify-content: ${isCollapsed ? 'center' : 'flex-start'};">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-secondary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; flex-shrink: 0;">
              ${username.charAt(0).toUpperCase()}
            </div>
            ${!isCollapsed ? `
              <div style="overflow: hidden;">
                <div style="font-weight: bold; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${username.split('@')[0]}</div>
                <span class="badge badge-approved" style="font-size: 9px; padding: 2px 6px;">Tenant (Grade A)</span>
              </div>
            ` : ''}
          </div>

          <!-- Navigation Links -->
          <nav style="flex: 1; padding: 16px 10px; display: flex; flex-direction: column; gap: 6px; overflow-y: auto;">
            ${sidebarNavHTML}
          </nav>

          <!-- Sidebar Footer / Logout -->
          <div style="padding: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
            <button class="tenant-sidebar-item" id="tenant-logout-btn" style="width: 100%; color: #EF4444;" title="Log Out">
              <span class="tenant-sidebar-icon">&#128682;</span>
              <span class="tenant-sidebar-label" style="${isCollapsed ? 'display:none;' : ''}">Log Out</span>
            </button>
          </div>

        </aside>

        <!-- Right Main Workspace Area -->
        <div class="tenant-main-area" style="flex: 1; margin-left: ${isCollapsed ? '80px' : '260px'}; transition: margin-left 200ms ease; display: flex; flex-direction: column; min-height: 100vh;">
          
          <!-- Top Control Header -->
          <header style="background: white; border-bottom: 1px solid rgba(13,27,75,0.06); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-weight: bold; color: var(--color-primary); font-size: 16px; text-transform: capitalize;">${currentRoute.replace('-', ' ')}</span>
            </div>

            <div style="display: flex; align-items: center; gap: 16px; position: relative;">
              <!-- Notifications Bell -->
              <button id="tenant-bell-btn" style="position: relative; background: none; border: none; cursor: pointer; padding: 6px;" title="Notifications">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                ${unreadCount > 0 ? `
                  <span style="position: absolute; top: 0; right: 0; background: var(--color-error); color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; display: flex; align-items: center; justify-content: center; font-weight: bold;">${unreadCount}</span>
                ` : ''}
              </button>

              <!-- Notifications Dropdown -->
              <div id="tenant-notification-dropdown" style="display: none; position: absolute; top: 40px; right: 0; width: 320px; background: white; border-radius: 12px; box-shadow: var(--shadow-lg); border: 1px solid #E5E7EB; z-index: 500; overflow: hidden;">
                <div style="padding: 14px; border-bottom: 1px solid #E5E7EB; font-weight: bold; font-size: 13px; color: var(--color-primary);">Notifications</div>
                <div style="max-height: 240px; overflow-y: auto;">
                  ${state.notifications && state.notifications.length > 0 ? state.notifications.map(n => `
                    <div style="padding: 10px 14px; border-bottom: 1px solid #F3F4F6; font-size: 12px; text-align: left; color: #374151;">
                      ${n.text}
                      <div style="font-size: 10px; color: #9CA3AF; margin-top: 4px;">${n.time}</div>
                    </div>
                  `).join('') : '<div style="padding: 20px; text-align: center; color: #9CA3AF; font-size: 12px;">No notifications.</div>'}
                </div>
              </div>

              <!-- Quick Find CTA -->
              <button class="btn btn-primary btn-sm" id="tenant-quick-find-btn" style="padding: 6px 14px; font-size: 12px;">Find Property</button>
            </div>
          </header>

          <!-- Content Body -->
          <main style="flex: 1; padding: 0;">
            ${contentHTML}
          </main>

        </div>

      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // Sidebar collapse toggle
    document.getElementById('tenant-sidebar-toggle')?.addEventListener('click', () => {
      updateState({ tenantSidebarCollapsed: !state.tenantSidebarCollapsed });
      navigateTo(state.route);
    });

    // Sidebar navigation items
    document.querySelectorAll('.tenant-sidebar-item[data-route]').forEach(btn => {
      btn.addEventListener('click', () => {
        const route = btn.getAttribute('data-route');
        navigateTo(route);
      });
    });

    // Logo click
    document.getElementById('tenant-nav-logo')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('dashboard');
    });

    // Quick find button
    document.getElementById('tenant-quick-find-btn')?.addEventListener('click', () => {
      navigateTo('discovery');
    });

    // Logout button
    document.getElementById('tenant-logout-btn')?.addEventListener('click', () => {
      updateState({ user: null });
      navigateTo('landing');
    });

    // Notification dropdown
    const bellBtn = document.getElementById('tenant-bell-btn');
    const dropdown = document.getElementById('tenant-notification-dropdown');
    bellBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (dropdown) dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', () => {
      if (dropdown) dropdown.style.display = 'none';
    });
  }
};

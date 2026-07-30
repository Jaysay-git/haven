// Employee Portal Screen
export const EmployeePortal = {
  render(state) {
    const username = state.user?.username || 'Employee';
    const partnerEmail = state.user?.linkedPartnerEmail || 'None';

    return `
      <div class="dashboard-wrapper">
        <div class="container" style="max-width: 800px; margin-top: 40px;">
          <div class="card" style="padding: 40px; text-align: center; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
            <div style="width: 64px; height: 64px; border-radius: var(--radius-full); background: rgba(26, 122, 138, 0.1); color: var(--color-primary); font-size: 32px; margin: 0 auto 20px;" class="flex-center">
              💼
            </div>
            
            <h1 style="color: var(--color-primary); font-size: 28px; font-weight: var(--weight-bold); margin-bottom: 8px;">Employee Housing Portal</h1>
            <p class="text-md text-muted" style="margin-bottom: 24px;">Welcome back, <strong>${username}</strong>! Your account has been verified under your organization's benefit program.</p>
            
            <div style="background: var(--color-bg-light); border: 1px solid rgba(13, 27, 75, 0.08); border-radius: var(--radius-md); padding: 20px; margin: 0 auto 32px; max-width: 500px; text-align: left;">
              <h3 style="font-size: 14px; font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 12px; border-bottom: 1px solid rgba(13, 27, 75, 0.08); padding-bottom: 8px;">Benefit Program Details</h3>
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                <div style="display: flex; justify-content: space-between;">
                  <span class="text-muted">Linked Employer:</span>
                  <strong style="color: var(--color-primary);">${partnerEmail}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span class="text-muted">Account Status:</span>
                  <span class="badge badge-success" style="font-size: 11px;">Active Roster</span>
                </div>
              </div>
            </div>

            <button class="btn btn-outline" id="employee-logout-btn" style="padding: 10px 24px;">Log Out</button>
          </div>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    document.getElementById('employee-logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      // Remove session
      updateState({ user: null });
      navigateTo('login');
    });
  }
};

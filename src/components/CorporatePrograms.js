// CorporatePrograms Component (Milestone 8 additive feature)
export const CorporatePrograms = {
  render(state) {
    if (!state.user || state.user.role !== 'Tenant') return '';

    // Check if employee is linked to a corporate partner
    const linkedEmployee = state.corporateEmployees?.find(
      emp => emp.email.toLowerCase() === state.user.username.toLowerCase() && emp.status === 'Accepted'
    );

    // If not linked to any corporate partner org, hide section entirely
    if (!linkedEmployee) return '';

    const empLevel = linkedEmployee.level && linkedEmployee.level !== '—' ? linkedEmployee.level : 'Mid-level';
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    const getProgramLevels = (prog) => {
      if (prog.levels) return prog.levels;
      if (prog.title === 'Tech-Stipend Rent Pool') return ['Junior', 'Mid-level'];
      if (prog.title === 'Executive VI Allowance') return ['Senior', 'Executive'];
      return [];
    };

    // Find programs eligible for this employee's level
    const eligiblePrograms = (state.partnerPrograms || []).filter(prog => {
      return getProgramLevels(prog).includes(empLevel);
    });

    if (eligiblePrograms.length === 0) {
      return `
        <div class="tenant-card">
          <h3 style="font-size:14px; font-weight:bold; margin-bottom:12px; color:var(--tenant-text);">My Employer's Housing Programs</h3>
          <p style="font-size:12px; color:var(--tenant-text-muted); margin:0;">You are linked to <strong>Haven Corp Solutions</strong>, but there are no eligible housing programs configured for employee level <strong>${empLevel}</strong> at this time.</p>
        </div>
      `;
    }

    return `
      <!-- My Employer's Housing Programs (Additive Section) -->
      <div class="tenant-card" style="margin-top:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="font-size:14px; font-weight:bold; margin:0; color:var(--tenant-text);">My Employer's Housing Programs</h3>
          <span style="font-size:11px; color:var(--tenant-text-muted); background:rgba(26,122,138,0.06); padding:4px 8px; border-radius:6px; font-weight:var(--weight-semibold);">Linked: Haven Corp Solutions (${empLevel})</span>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:16px;">
          ${eligiblePrograms.map(prog => {
            const remaining = prog.limit - prog.spent;
            
            // Check if there is an existing request from this tenant for this program
            const existingReq = (state.partnerRequests || []).find(
              r => r.email.toLowerCase() === state.user.username.toLowerCase() && r.programRequested === prog.title
            );

            let btnText = 'Request to Join';
            let btnClass = 'btn-primary';
            let disabledAttr = '';
            let statusMarkup = '';

            if (existingReq) {
              const status = existingReq.status.toLowerCase();
              if (status === 'pending') {
                btnText = 'Awaiting Approval';
                btnClass = 'btn-outline';
                disabledAttr = 'disabled style="cursor: not-allowed; opacity: 0.7;"';
                statusMarkup = `<span class="badge badge-warning" style="font-size:9px; white-space:nowrap; background-color:#FEF3C7; color:#D97706; border:1px solid rgba(217, 119, 6, 0.15);">Pending HR Audit</span>`;
              } else if (status === 'accepted' || status === 'approved') {
                btnText = 'Enrolled';
                btnClass = 'btn-outline';
                disabledAttr = 'disabled style="cursor: not-allowed; opacity: 0.7;"';
                statusMarkup = `<span class="badge badge-success" style="font-size:9px; white-space:nowrap;">Active Program Member</span>`;
              } else if (status === 'rejected') {
                statusMarkup = `
                  <div style="display:flex; flex-direction:column; gap:4px; width:100%;">
                    <span class="badge badge-danger" style="font-size:9px; white-space:nowrap; background-color:#FEE2E2; color:#EF4444; border: 1px solid rgba(239, 68, 68, 0.15);">Request Declined</span>
                    <span style="font-size:10px; color:#DC2626; font-style:italic;">Reason: "${existingReq.rejectionReason || '—'}"</span>
                  </div>
                `;
              }
            }

            return `
              <div style="border:1px solid var(--tenant-border); border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:12px; background:var(--tenant-card); justify-content:space-between; min-height:160px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;">
                    <h4 style="font-size:13px; font-weight:bold; margin:0; color:var(--tenant-text);">${prog.title}</h4>
                    ${statusMarkup}
                  </div>
                  <div style="font-size:11px; color:var(--tenant-text-muted); display:flex; justify-content:space-between; margin-top:8px;">
                    <span>Remaining Pool:</span>
                    <strong style="color:var(--tenant-text);">${formatNaira(remaining)}</strong>
                  </div>
                </div>
                
                <button class="btn ${btnClass} btn-sm btn-request-program" data-prog-title="${prog.title}" ${disabledAttr} style="width:100%; margin-top:12px; font-size:11px; padding:6px 0;">
                  ${btnText}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
};

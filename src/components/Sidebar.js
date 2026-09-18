// TrustID Sidebar Component
export function renderSidebar(state, onMenuSelect) {
  const { currentStakeholder, currentNavId, user, organization, admin } = state;

  // Stakeholder-specific space metadata
  let spaceInfo = {
    label: "CURRENT SPACE",
    title: "Personal Identity",
    icon: "user-check"
  };

  let menuItems = [];

  if (currentStakeholder === 'user') {
    spaceInfo = {
      label: "CURRENT SPACE",
      title: "Personal Identity",
      icon: "fingerprint"
    };

    menuItems = [
      { id: "identity-hub", label: "Identity Hub", icon: "shield", badge: null },
      { id: "connected-apps", label: "Connected Apps & SSO", icon: "network", badge: "8" },
      { id: "permission-intel", label: "Permission Intelligence", icon: "sliders-horizontal", badge: "Auto", badgeType: "green" },
      { id: "security-log", label: "Security & Activity Log", icon: "shield-alert", badge: null },
      { id: "identity-analytics", label: "Identity Analytics", icon: "trending-up", badge: null },
      { id: "settings", label: "Settings", icon: "settings", badge: null }
    ];
  } else if (currentStakeholder === 'organization') {
    spaceInfo = {
      label: "CURRENT SPACE",
      title: "Acme Corp Enterprise",
      icon: "building"
    };

    menuItems = [
      { id: "org-overview", label: "Organization Overview", icon: "layout-dashboard", badge: null },
      { id: "employee-dids", label: "Employee DIDs & Directory", icon: "users", badge: "245" },
      { id: "misuse-radar", label: "Credential Misuse Radar", icon: "alert-triangle", badge: "3 Alerts", badgeType: "amber" },
      { id: "approved-apps", label: "Approved Applications", icon: "check-circle", badge: "5", badgeType: "gray" },
      { id: "org-policies", label: "Security Policies", icon: "lock", badge: null },
      { id: "org-audit", label: "Compliance & Audit", icon: "file-text", badge: null }
    ];
  } else if (currentStakeholder === 'admin') {
    spaceInfo = {
      label: "CURRENT SPACE",
      title: "TrustID Network Core",
      icon: "server"
    };

    menuItems = [
      { id: "admin-overview", label: "Network Overview", icon: "activity", badge: null },
      { id: "enclave-nodes", label: "Enclave Nodes (Tier 1)", icon: "cpu", badge: "12/12", badgeType: "green" },
      { id: "fraud-engine", label: "Fraud & Velocity Engine", icon: "zap", badge: "Active", badgeType: "green" },
      { id: "phishing-blacklist", label: "Phishing Blacklist", icon: "ban", badge: "1,420" },
      { id: "blockchain-ledger", label: "Forensics Ledger (Amoy)", icon: "database", badge: null },
      { id: "governance", label: "Key Ceremony & Policies", icon: "key", badge: null }
    ];
  }

  return `
    <aside class="w-64 bg-white border-r border-slate-200/80 p-5 flex flex-col gap-4 select-none shrink-0 sticky top-0 self-start max-h-screen overflow-y-auto">
      <div>
        <!-- Current Space Selector Card -->
        <div class="mb-6 p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-all">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <i data-lucide="${spaceInfo.icon}" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-[10px] font-bold tracking-wider uppercase text-slate-400">${spaceInfo.label}</div>
              <div class="text-xs font-bold text-slate-800">${spaceInfo.title}</div>
            </div>
          </div>
          <i data-lucide="chevrons-up-down" class="w-4 h-4 text-slate-400"></i>
        </div>

        <!-- Menu Section -->
        <div class="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          MENU
        </div>

        <!-- Menu Items List -->
        <nav class="space-y-1">
          ${menuItems.map(item => {
            const isActive = currentNavId === item.id || (!currentNavId && item.id === menuItems[0].id);
            let badgeHtml = '';
            
            if (item.badge) {
              if (item.badgeType === 'green') {
                badgeHtml = `<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">${item.badge}</span>`;
              } else if (item.badgeType === 'amber') {
                badgeHtml = `<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">${item.badge}</span>`;
              } else {
                badgeHtml = `<span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200">${item.badge}</span>`;
              }
            }

            return `
              <button
                id="menu-nav-${item.id}"
                onclick="window.trustIdApp.setNavigation('${item.id}')"
                class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-900 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }"
              >
                <div class="flex items-center gap-3">
                  <i data-lucide="${item.icon}" class="w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}"></i>
                  <span>${item.label}</span>
                </div>
                ${badgeHtml}
              </button>
            `;
          }).join('')}
        </nav>
      </div>

      <!-- Bottom Card: Enclave Security Indicator (Gap removed) -->
      <div class="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-200/60">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500 pulse-active"></span>
          <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Hardware Enclave</span>
        </div>
        <p class="text-[11px] text-slate-600 leading-tight">Tier 1 SGX / Nitro isolated cryptoprocessor bound to local DID.</p>
        <button 
          onclick="window.trustIdApp.openAttestationDetails()"
          class="mt-2.5 w-full text-[11px] font-semibold py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
        >
          <i data-lucide="cpu" class="w-3.5 h-3.5 text-emerald-600"></i>
          <span>Verify Attestation</span>
        </button>
      </div>

      <!-- Switch Stakeholder / Sign Out -->
      <button 
        onclick="window.trustIdApp.logout()"
        class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-700 hover:bg-rose-50/80 border border-slate-200/80 transition-all"
      >
        <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
        <span>Switch Account / Logout</span>
      </button>
    </aside>
  `;
}

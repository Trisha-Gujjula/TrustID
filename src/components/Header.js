// TrustID Header Component
export function renderHeader(state, onTabChange, onSearch, onNotificationClick, onProfileClick) {
  const { currentStakeholder, user, organization, admin, notifications } = state;

  // Dynamic status badge text based on stakeholder
  let statusBadgeContent = {
    dotColor: "bg-emerald-500",
    text: "Shield Active • Zero-Knowledge Assured",
    bg: "bg-emerald-50 text-emerald-800 border-emerald-200"
  };

  if (currentStakeholder === 'organization') {
    statusBadgeContent = {
      dotColor: "bg-emerald-500",
      text: "Org Enclave Active • 245 Employees Linked",
      bg: "bg-emerald-50 text-emerald-800 border-emerald-200"
    };
  } else if (currentStakeholder === 'admin') {
    statusBadgeContent = {
      dotColor: "bg-blue-500",
      text: "Polygon Amoy Anchor: Block #14,892,104",
      bg: "bg-blue-50 text-blue-800 border-blue-200"
    };
  }

  // Dynamic hub tag beside logo
  const hubTag = currentStakeholder === 'user' ? 'USER HUB' : (currentStakeholder === 'organization' ? 'ORGANIZATION HUB' : 'ADMIN CONSOLE');

  return `
    <header class="w-full bg-white border-b border-slate-200/80 px-6 py-3.5 rounded-t-[28px] flex items-center justify-between gap-4 select-none">
      <!-- Left: Logo and Hub Identity -->
      <div class="flex items-center gap-3 min-w-[240px]">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20">
          <i data-lucide="shield-check" class="w-6 h-6 stroke-[2.2]"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-lg font-bold tracking-tight text-slate-900">TrustID</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200 tracking-wide uppercase">
              ${hubTag}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 font-medium tracking-tight">Decentralized Identity & Security</p>
        </div>
      </div>

      <!-- Center: 3 Stakeholder Switcher Pill + Active Shield Status -->
      <div class="flex items-center gap-3">
        <!-- Segmented Tabs for 3 Stakeholders -->
        <div class="bg-slate-100/90 p-1 rounded-full border border-slate-200 flex items-center gap-1 shadow-inner">
          <button 
            id="tab-btn-user"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentStakeholder === 'user' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }"
            onclick="window.trustIdApp.setStakeholder('user')"
          >
            <i data-lucide="user" class="w-3.5 h-3.5 ${currentStakeholder === 'user' ? 'text-emerald-600' : 'text-slate-400'}"></i>
            <span>User Identity</span>
            ${currentStakeholder === 'user' ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-active ml-0.5"></span>' : ''}
          </button>

          <button 
            id="tab-btn-org"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentStakeholder === 'organization' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }"
            onclick="window.trustIdApp.setStakeholder('organization')"
          >
            <i data-lucide="building-2" class="w-3.5 h-3.5 ${currentStakeholder === 'organization' ? 'text-emerald-600' : 'text-slate-400'}"></i>
            <span>Organization / HR</span>
            ${currentStakeholder === 'organization' ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-active ml-0.5"></span>' : ''}
          </button>

          <button 
            id="tab-btn-admin"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentStakeholder === 'admin' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }"
            onclick="window.trustIdApp.setStakeholder('admin')"
          >
            <i data-lucide="sliders" class="w-3.5 h-3.5 ${currentStakeholder === 'admin' ? 'text-emerald-600' : 'text-slate-400'}"></i>
            <span>Admin Console</span>
            ${currentStakeholder === 'admin' ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-active ml-0.5"></span>' : ''}
          </button>
        </div>

        <!-- Security Status Badge -->
        <div class="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${statusBadgeContent.bg}">
          <span class="w-2 h-2 rounded-full ${statusBadgeContent.dotColor} pulse-active"></span>
          <span>${statusBadgeContent.text}</span>
        </div>
      </div>

      <!-- Right: Search Bar, Notifications, User Chip -->
      <div class="flex items-center gap-3">
        <!-- Search Input -->
        <div class="relative hidden md:block">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <i data-lucide="search" class="w-4 h-4"></i>
          </div>
          <input 
            type="text" 
            id="header-search-input"
            placeholder="Search services, DID..."
            class="w-56 lg:w-64 pl-9 pr-10 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            oninput="window.trustIdApp.handleSearch(this.value)"
          />
          <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center">
            <kbd class="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-xs">⌘K</kbd>
          </div>
        </div>

        <!-- Notification Bell -->
        <button 
          id="btn-notifications"
          class="relative p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all border border-slate-200"
          title="Security Notifications"
          onclick="window.trustIdApp.toggleNotificationDrawer()"
        >
          <i data-lucide="bell" class="w-4 h-4"></i>
          <span class="absolute top-1 right-1 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white"></span>
        </button>

        <!-- User Profile Chip -->
        <div 
          class="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-all"
          onclick="window.trustIdApp.showProfileDetails()"
          title="Click to view Identity Details"
        >
          <img 
            src="${user.avatar}" 
            alt="${user.name}"
            class="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/40"
          />
          <div class="text-left leading-tight hidden sm:block">
            <div class="text-xs font-semibold text-slate-800">${user.name}</div>
            <div class="text-[10px] font-mono text-slate-500 flex items-center gap-1">
              <span>${user.didShort}</span>
              <i data-lucide="copy" class="w-2.5 h-2.5 text-slate-400 hover:text-emerald-600" onclick="event.stopPropagation(); window.trustIdApp.copyToClipboard('${user.did}')"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

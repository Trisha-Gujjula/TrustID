// TrustID User Identity View (Exact recreation of reference screenshot)
export function renderUserIdentityView(state) {
  const { user, trendData, connectedApps, userSubTab = 'overview' } = state;

  return `
    <div class="space-y-6">
      <!-- 1. Welcome Greeting Header Banner -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <h1 class="text-2xl font-bold tracking-tight text-slate-900">Welcome back, ${user.name}</h1>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span class="w-2 h-2 rounded-full bg-emerald-500 pulse-active"></span>
              Active & Protected
            </span>
          </div>
          <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal">
            Manage your decentralized credentials, control granular app access, and monitor your zero-knowledge verifications.
          </p>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center gap-2.5 flex-wrap">
          <button 
            onclick="window.trustIdApp.downloadActivitySummary()"
            class="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2 shadow-2xs bg-white"
          >
            <i data-lucide="download" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>Download Activity Summary</span>
          </button>
          
          <button 
            onclick="window.trustIdApp.openVerificationWizard()"
            class="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold text-white transition-all flex items-center gap-2 shadow-sm shadow-emerald-700/20"
          >
            <i data-lucide="shield-check" class="w-4 h-4"></i>
            <span>Verify Credentials</span>
          </button>
        </div>
      </div>

      <!-- 2. Sub-Tabs Navigation Bar (Exact match to screenshot) -->
      <div class="border-b border-slate-200 flex items-center gap-8 px-2 text-xs font-semibold text-slate-500 select-none">
        <button 
          onclick="window.trustIdApp.setUserSubTab('overview')"
          class="pb-3 flex items-center gap-2 transition-all relative ${
            userSubTab === 'overview' 
              ? 'text-emerald-800 font-bold' 
              : 'hover:text-slate-800'
          }"
        >
          <i data-lucide="layout-grid" class="w-4 h-4 ${userSubTab === 'overview' ? 'text-emerald-700' : 'text-slate-400'}"></i>
          <span>Overview & Analytics</span>
          ${userSubTab === 'overview' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full"></span>' : ''}
        </button>

        <button 
          onclick="window.trustIdApp.setUserSubTab('connected-apps')"
          class="pb-3 flex items-center gap-2 transition-all relative ${
            userSubTab === 'connected-apps' 
              ? 'text-emerald-800 font-bold' 
              : 'hover:text-slate-800'
          }"
        >
          <i data-lucide="share-2" class="w-4 h-4 ${userSubTab === 'connected-apps' ? 'text-emerald-700' : 'text-slate-400'}"></i>
          <span>Connected Apps (${connectedApps.length})</span>
          ${userSubTab === 'connected-apps' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full"></span>' : ''}
        </button>

        <button 
          onclick="window.trustIdApp.setUserSubTab('permission-intelligence')"
          class="pb-3 flex items-center gap-2 transition-all relative ${
            userSubTab === 'permission-intelligence' 
              ? 'text-emerald-800 font-bold' 
              : 'hover:text-slate-800'
          }"
        >
          <i data-lucide="sliders-horizontal" class="w-4 h-4 ${userSubTab === 'permission-intelligence' ? 'text-emerald-700' : 'text-slate-400'}"></i>
          <span>Permission Intelligence</span>
          ${userSubTab === 'permission-intelligence' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full"></span>' : ''}
        </button>

        <button 
          onclick="window.trustIdApp.setUserSubTab('security-insights')"
          class="pb-3 flex items-center gap-2 transition-all relative ${
            userSubTab === 'security-insights' 
              ? 'text-emerald-800 font-bold' 
              : 'hover:text-slate-800'
          }"
        >
          <i data-lucide="shield-alert" class="w-4 h-4 ${userSubTab === 'security-insights' ? 'text-emerald-700' : 'text-slate-400'}"></i>
          <span>Security Insights</span>
          ${userSubTab === 'security-insights' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full"></span>' : ''}
        </button>
      </div>

      <!-- 3. Four Metric Cards Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1: IDENTITY STATUS -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <span class="text-[11px] font-bold tracking-wider uppercase text-slate-400">IDENTITY STATUS</span>
            <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i data-lucide="fingerprint" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="my-3">
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold text-slate-900">${user.status}</span>
              <span class="text-emerald-600">
                <i data-lucide="check-circle" class="w-4 h-4 fill-emerald-100"></i>
              </span>
            </div>
            <div class="text-[11px] font-mono text-slate-500 mt-1 flex items-center gap-1.5">
              <span>${user.didShort}</span>
              <button 
                onclick="window.trustIdApp.copyToClipboard('${user.did}')" 
                class="text-slate-400 hover:text-emerald-700" 
                title="Copy full DID"
              >
                <i data-lucide="copy" class="w-3 h-3"></i>
              </button>
            </div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span class="text-slate-500">Enclave: ${user.enclaveTier}</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active</span>
          </div>
        </div>

        <!-- Card 2: ACTIVE SERVICES -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <span class="text-[11px] font-bold tracking-wider uppercase text-slate-400">ACTIVE SERVICES</span>
            <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i data-lucide="grid" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="my-3">
            <div class="text-lg font-bold text-slate-900">${user.connectedAppsCount} Connected Apps</div>
            <div class="text-[11px] text-slate-500 mt-1">${user.selectiveClaims} Selective • ${user.requiredClaims} Required Claims</div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span class="text-emerald-700 font-medium flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              All Health Checks Normal
            </span>
            <span class="text-slate-400 font-medium">Zero Leaks</span>
          </div>
        </div>

        <!-- Card 3: PRIVACY SHIELD -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <span class="text-[11px] font-bold tracking-wider uppercase text-slate-400">PRIVACY SHIELD</span>
            <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i data-lucide="eye-off" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="my-3">
            <div class="text-lg font-bold text-slate-900">${user.zkAssurance}</div>
            <div class="text-[11px] text-slate-500 mt-1">Selective disclosure enabled on all apps</div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span class="text-slate-500">Raw Personal Data Shared</span>
            <span class="font-bold text-slate-900">${user.rawPersonalDataShared}</span>
          </div>
        </div>

        <!-- Card 4: SAFETY SCORE -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <span class="text-[11px] font-bold tracking-wider uppercase text-slate-400">SAFETY SCORE</span>
            <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i data-lucide="shield" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="my-3">
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold text-slate-900">${user.safetyScore} / 100</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ${user.safetyRating}
              </span>
            </div>
            <div class="text-[11px] text-slate-500 mt-1">Biometric Passkey + Enclave Active</div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span class="text-slate-500">Threat Status</span>
            <span class="font-bold text-emerald-700">${user.threatStatus}</span>
          </div>
        </div>
      </div>

      <!-- 4. Middle Analytics Row (Activity Trends & Scope Breakdown) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left: Activity & Verification Trends (8 cols) -->
        <div class="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div class="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <i data-lucide="trending-up" class="w-4 h-4"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900">Activity & Verification Trends</h3>
                <p class="text-[11px] text-slate-500">Identity attestations & silent zero-knowledge checks over the last 7 days</p>
              </div>
            </div>
            <!-- Legend -->
            <div class="flex items-center gap-4 text-xs">
              <div class="flex items-center gap-1.5 font-medium text-slate-600">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
                <span>Verifications</span>
              </div>
              <div class="flex items-center gap-1.5 font-medium text-slate-600">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-300"></span>
                <span>SSO Tokens</span>
              </div>
            </div>
          </div>

          <!-- Trend Chart SVG -->
          <div class="relative w-full h-44 mt-2">
            <svg class="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad-verifications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#167a4e" stop-opacity="0.22" />
                  <stop offset="100%" stop-color="#167a4e" stop-opacity="0.0" />
                </linearGradient>
                <linearGradient id="grad-sso" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#6ee7b7" stop-opacity="0.18" />
                  <stop offset="100%" stop-color="#6ee7b7" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <!-- Subtle grid lines -->
              <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4 4" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4 4" />
              <line x1="0" y1="130" x2="600" y2="130" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4 4" />

              <!-- SSO Tokens Curve (Light Mint) -->
              <path 
                d="M 20 120 Q 90 95, 170 105 T 320 85 T 420 50 T 510 110 T 580 40 L 580 155 L 20 155 Z" 
                fill="url(#grad-sso)" 
              />
              <path 
                d="M 20 120 Q 90 95, 170 105 T 320 85 T 420 50 T 510 110 T 580 40" 
                fill="none" 
                stroke="#6ee7b7" 
                stroke-width="2" 
                stroke-dasharray="3 3"
              />

              <!-- Verifications Curve (Deep Emerald) -->
              <path 
                d="M 20 110 Q 90 85, 170 95 T 320 65 T 420 25 T 510 95 T 580 18 L 580 155 L 20 155 Z" 
                fill="url(#grad-verifications)" 
              />
              <path 
                d="M 20 110 Q 90 85, 170 95 T 320 65 T 420 25 T 510 95 T 580 18" 
                fill="none" 
                stroke="#167a4e" 
                stroke-width="2.75" 
                stroke-linecap="round"
              />

              <!-- Data Points -->
              <circle cx="20" cy="110" r="3.5" fill="#167a4e" />
              <circle cx="170" cy="95" r="3.5" fill="#167a4e" />
              <circle cx="320" cy="65" r="3.5" fill="#167a4e" />
              <circle cx="420" cy="25" r="3.5" fill="#167a4e" />
              <circle cx="510" cy="95" r="3.5" fill="#167a4e" />
              <circle cx="580" cy="18" r="4.5" fill="#167a4e" stroke="#ffffff" stroke-width="2" />
            </svg>
          </div>

          <!-- X-Axis Days Labels -->
          <div class="flex items-center justify-between text-[11px] font-medium text-slate-400 px-2 mt-3 pt-2 border-t border-slate-100">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span class="font-bold text-emerald-800">Today</span>
          </div>
        </div>

        <!-- Right: Scope Breakdown Donut (4 cols) -->
        <div class="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <i data-lucide="pie-chart" class="w-4 h-4"></i>
              </div>
              <h3 class="text-sm font-bold text-slate-900">Scope Breakdown</h3>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Optimal
            </span>
          </div>

          <!-- Donut Graphic & Legend -->
          <div class="flex items-center justify-around my-4">
            <!-- SVG Donut Chart -->
            <div class="relative w-28 h-28 flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <!-- Background ring -->
                <path
                  class="text-slate-100"
                  stroke-width="4.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <!-- Selective segment (75%) -->
                <path
                  class="text-emerald-700"
                  stroke-dasharray="75, 100"
                  stroke-width="4.5"
                  stroke-linecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <!-- Required segment (25%) -->
                <path
                  class="text-emerald-400"
                  stroke-dasharray="25, 100"
                  stroke-dashoffset="-75"
                  stroke-width="4.5"
                  stroke-linecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <!-- Center Text -->
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span class="text-xl font-extrabold text-slate-900 leading-none">16</span>
                <span class="text-[9px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">CLAIMS</span>
              </div>
            </div>

            <!-- Legend Details -->
            <div class="space-y-2 text-xs">
              <div>
                <div class="flex items-center gap-1.5 font-bold text-slate-800">
                  <span class="w-2 h-2 rounded-full bg-emerald-700"></span>
                  <span>12 Selective</span>
                </div>
                <div class="text-[10px] text-slate-400 ml-3.5">Optional user claims</div>
              </div>

              <div>
                <div class="flex items-center gap-1.5 font-bold text-slate-800">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>4 Required</span>
                </div>
                <div class="text-[10px] text-slate-400 ml-3.5">Core auth tokens</div>
              </div>

              <div>
                <div class="flex items-center gap-1.5 font-bold text-slate-800">
                  <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                  <span>0 Overprivileged</span>
                </div>
                <div class="text-[10px] text-emerald-600 font-semibold ml-3.5">All clean</div>
              </div>
            </div>
          </div>

          <!-- Bottom Alert Bar -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span class="text-slate-500">Overprivileged alerts</span>
            <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">None detected</span>
          </div>
        </div>
      </div>

      <!-- 5. Connected Applications & Permission Intelligence Grid -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div>
            <div class="flex items-center gap-2.5 flex-wrap">
              <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <i data-lucide="sliders" class="w-4 h-4"></i>
              </div>
              <h3 class="text-sm font-bold text-slate-900">Connected Applications & Permission Intelligence</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-800 text-white tracking-wider uppercase">
                ZERO OVER-PRIVILEGE
              </span>
            </div>
            <p class="text-[11px] text-slate-500 mt-1">Review which services have access to your decentralized credentials, and tune disclosure preferences.</p>
          </div>

          <button 
            onclick="window.trustIdApp.openGlobalPrivacyModal()"
            class="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-all shadow-2xs self-start md:self-auto"
          >
            <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>Global Privacy Defaults</span>
          </button>
        </div>

        <!-- Apps Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${connectedApps.slice(0, 3).map(app => `
            <div class="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all card-hover-effect flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl ${app.color} text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                      ${app.code}
                    </div>
                    <div>
                      <div class="text-xs font-bold text-slate-900">${app.name}</div>
                      <div class="text-[10px] text-slate-400 font-medium">${app.category}</div>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ${app.status}
                  </span>
                </div>

                <!-- App Permissions Preview -->
                <div class="space-y-1.5 my-3">
                  ${app.permissions.map(perm => `
                    <div class="flex items-center justify-between text-[11px] py-1 px-2 rounded-lg bg-white border border-slate-200/60">
                      <span class="text-slate-700 font-medium">${perm.name}</span>
                      <span class="text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        perm.type === 'Required' 
                          ? 'bg-slate-100 text-slate-600' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }">
                        ${perm.type}
                      </span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] mt-2">
                <span class="text-slate-400 font-mono">Last active ${app.lastActive}</span>
                <button 
                  onclick="window.trustIdApp.manageAppPermissions('${app.id}')"
                  class="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                >
                  Configure
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- View All 8 Apps Expand Button -->
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-slate-500 font-medium">Showing top 3 active of 8 connected enterprise applications</span>
          <button 
            onclick="window.trustIdApp.setUserSubTab('connected-apps')"
            class="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
          >
            <span>View All 8 Apps</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

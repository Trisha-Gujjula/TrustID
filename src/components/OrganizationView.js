// TrustID Organization / HR Stakeholder Portal Component
export function renderOrganizationView(state) {
  const { organization } = state;

  return `
    <div class="space-y-6">
      <!-- 1. Org Greeting & KPI Stats Header -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <h1 class="text-2xl font-bold tracking-tight text-slate-900">${organization.orgName}</h1>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span class="w-2 h-2 rounded-full bg-emerald-500 pulse-active"></span>
              Enclave Protected Org
            </span>
          </div>
          <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal">
            Monitor company credentials in real-time, detect unapproved SaaS logins, and instantly revoke compromised employee DIDs.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2.5 flex-wrap">
          <button 
            onclick="window.trustIdApp.openWhitelistModal()"
            class="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-2xs bg-white"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>Add Whitelisted Site</span>
          </button>
          
          <button 
            onclick="window.trustIdApp.openIssueCredentialModal()"
            class="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold text-white transition-all flex items-center gap-2 shadow-sm shadow-emerald-700/20"
          >
            <i data-lucide="award" class="w-4 h-4"></i>
            <span>Issue Employee Credential</span>
          </button>
        </div>
      </div>

      <!-- 2. Org Summary KPI Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div class="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>TOTAL EMPLOYEES</span>
            <i data-lucide="users" class="w-4 h-4 text-emerald-600"></i>
          </div>
          <div class="text-2xl font-bold text-slate-900 my-2">${organization.totalEmployees}</div>
          <div class="text-xs text-slate-500">${organization.linkedTrustId} Linked to TrustID (${organization.linkedPercentage})</div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div class="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>ACTIVE ALERTS</span>
            <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500"></i>
          </div>
          <div class="text-2xl font-bold text-amber-600 my-2">${organization.activeAlerts.length} Critical / High</div>
          <div class="text-xs text-slate-500">Requires security officer action</div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div class="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>PREVENTED BREACHES</span>
            <i data-lucide="shield-alert" class="w-4 h-4 text-emerald-600"></i>
          </div>
          <div class="text-2xl font-bold text-emerald-700 my-2">${organization.preventedBreaches} This Month</div>
          <div class="text-xs text-emerald-600 font-semibold">100% Phishing block rate</div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div class="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>AUTO-REVOCATION</span>
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
          </div>
          <div class="text-lg font-bold text-slate-900 my-2">Score > 0.8 Auto-Lock</div>
          <div class="text-xs text-slate-500">Zero human delay protection</div>
        </div>
      </div>

      <!-- 3. Credential Misuse Radar (Real-Time Threat Warnings) -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div class="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <i data-lucide="radar" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Real-Time Credential Misuse Radar</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  ${organization.activeAlerts.length} Threats Detected
                </span>
              </h3>
              <p class="text-[11px] text-slate-500">Employees attempting to use corporate credentials on unauthorized or spoofed domains</p>
            </div>
          </div>

          <button 
            onclick="window.trustIdApp.simulateOrgMisuse()"
            class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <i data-lucide="flame" class="w-3.5 h-3.5 text-amber-600"></i>
            <span>Simulate New Misuse Attack</span>
          </button>
        </div>

        <!-- Alert Cards List -->
        <div class="space-y-3">
          ${organization.activeAlerts.map(alert => `
            <div class="p-4 rounded-2xl border ${
              alert.severity === 'CRITICAL' 
                ? 'border-rose-200 bg-rose-50/40' 
                : 'border-amber-200 bg-amber-50/40'
            } flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all">
              <div class="space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    alert.severity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                  }">
                    ${alert.severity} (Risk: ${alert.riskScore})
                  </span>
                  <span class="text-xs font-bold text-slate-900">${alert.employeeName} (${alert.employeeEmail})</span>
                  <span class="text-xs text-slate-400">• ${alert.employeeRole}</span>
                </div>
                <div class="text-xs text-slate-700 font-medium">
                  Attempted unapproved login on: <span class="font-mono font-bold text-rose-700">${alert.attemptedSite}</span>
                </div>
                <div class="text-[11px] text-slate-500 flex items-center gap-4 flex-wrap">
                  <span>Device: <b class="text-slate-700">${alert.device}</b></span>
                  <span>Location: <b class="text-slate-700">${alert.location}</b></span>
                  <span>Anomaly: <b class="text-rose-700">${alert.distanceJump}</b></span>
                  <span>Time: <b>${alert.detectedAt}</b></span>
                </div>
              </div>

              <!-- Mitigation Actions -->
              <div class="flex items-center gap-2 flex-wrap self-start lg:self-center">
                <button 
                  onclick="window.trustIdApp.revokeOrgCredential('${alert.credentialId}', '${alert.employeeName}')"
                  class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  Revoke Credentials
                </button>
                <button 
                  onclick="window.trustIdApp.forcePasswordReset('${alert.employeeEmail}')"
                  class="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs"
                >
                  Force Password Reset
                </button>
                <button 
                  onclick="window.trustIdApp.investigateAlert('${alert.id}')"
                  class="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs"
                >
                  Investigate
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4. Employee DIDs & Credential Directory -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-sm font-bold text-slate-900">Employee DID & Credential Registry</h3>
            <p class="text-[11px] text-slate-500">All registered decentralized identities bound to Acme Corp enterprise tenant</p>
          </div>
          <span class="text-xs text-slate-400 font-medium">5 of ${organization.totalEmployees} shown</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-600">
            <thead class="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th class="py-3 px-4">Employee</th>
                <th class="py-3 px-4">Department</th>
                <th class="py-3 px-4">DID Identifier</th>
                <th class="py-3 px-4">Credentials</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${organization.employees.map(emp => `
                <tr class="hover:bg-slate-50/70 transition-all">
                  <td class="py-3.5 px-4 font-bold text-slate-900">
                    <div>${emp.name}</div>
                    <div class="text-[10px] text-slate-400 font-normal">${emp.email}</div>
                  </td>
                  <td class="py-3.5 px-4 font-medium">${emp.department}</td>
                  <td class="py-3.5 px-4 font-mono text-[11px] text-slate-500">${emp.did}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      ${emp.credentialsIssued} Active VCs
                    </span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      emp.status.includes('Active') 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : (emp.status === 'Suspicious' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')
                    }">
                      ${emp.status}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button 
                      onclick="window.trustIdApp.viewEmployeeCredentials('${emp.id}')"
                      class="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- 5. Approved SaaS & Application Whitelist -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-sm font-bold text-slate-900">Corporate Sanctioned Application Whitelist</h3>
            <p class="text-[11px] text-slate-500">Only these domains are cryptographically authorized to request Acme Corp employee credentials</p>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            ${organization.approvedSites.length} Approved Sites
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${organization.approvedSites.map(site => `
            <div class="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
              <div>
                <div class="text-xs font-bold text-slate-800">${site.name}</div>
                <div class="text-[11px] font-mono text-emerald-700">${site.url}</div>
                <div class="text-[10px] text-slate-400 mt-1">Allowed: ${site.claimsAllowed} • Approved: ${site.approvedAt}</div>
              </div>
              <button 
                onclick="window.trustIdApp.removeApprovedSite('${site.url}')"
                class="text-slate-400 hover:text-rose-600 p-1.5"
                title="Remove from whitelist"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

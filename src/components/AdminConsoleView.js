// TrustID Admin Console Component
export function renderAdminConsoleView(state) {
  const { admin } = state;

  return `
    <div class="space-y-6">
      <!-- 1. Admin Header Banner -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <h1 class="text-2xl font-bold tracking-tight text-slate-900">TrustID Network Global Core</h1>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              <span class="w-2 h-2 rounded-full bg-blue-500 pulse-active"></span>
              Polygon Amoy Anchored: ${admin.blockchainAnchorBlock}
            </span>
          </div>
          <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal">
            Cluster telemetry, zero-knowledge verification nodes, real-time ML fraud detection engine, and blockchain tamper-proof registry.
          </p>
        </div>

        <div class="flex items-center gap-2.5 flex-wrap">
          <button 
            onclick="window.trustIdApp.simulatePhishingDetection()"
            class="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-all flex items-center gap-2 shadow-xs"
          >
            <i data-lucide="shield-alert" class="w-4 h-4"></i>
            <span>Simulate Phishing Intercept</span>
          </button>
          
          <button 
            onclick="window.trustIdApp.simulateFraudBlock()"
            class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-xs font-bold text-white transition-all flex items-center gap-2 shadow-xs"
          >
            <i data-lucide="zap" class="w-4 h-4"></i>
            <span>Simulate Fraud Velocity</span>
          </button>
        </div>
      </div>

      <!-- 2. Infrastructure KPIs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div class="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>REGISTERED DIDs</span>
            <i data-lucide="fingerprint" class="w-4 h-4 text-blue-600"></i>
          </div>
          <div class="text-2xl font-bold text-slate-900 my-2">${admin.totalDIDsRegistered.toLocaleString()}</div>
          <div class="text-xs text-slate-500">Decentralized identities on network</div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div class="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>ZK-VERIFICATIONS TODAY</span>
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
          </div>
          <div class="text-2xl font-bold text-emerald-700 my-2">${admin.totalVerificationsToday.toLocaleString()}</div>
          <div class="text-xs text-slate-500">Silent zero-knowledge proofs computed</div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div class="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>THREATS BLOCKED TODAY</span>
            <i data-lucide="ban" class="w-4 h-4 text-rose-600"></i>
          </div>
          <div class="text-2xl font-bold text-rose-600 my-2">${admin.fraudAttemptsBlockedToday} Active Attacks</div>
          <div class="text-xs text-emerald-600 font-semibold">0 False positives recorded</div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div class="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>ML ENGINE LATENCY</span>
            <i data-lucide="gauge" class="w-4 h-4 text-emerald-600"></i>
          </div>
          <div class="text-2xl font-bold text-slate-900 my-2">${admin.meanEngineLatency}</div>
          <div class="text-xs text-slate-500">Isolation Forest inference speed</div>
        </div>
      </div>

      <!-- 3. Hardware Tier 1 Enclave Nodes -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <i data-lucide="cpu" class="w-4 h-4"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">Hardware Tier 1 Attested Enclave Nodes</h3>
              <p class="text-[11px] text-slate-500">Cryptographically isolated enclaves running confidential computing (AWS Nitro + Intel SGX)</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            12 of 12 Cluster Nodes Healthy
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${admin.enclaveNodes.map(node => `
            <div class="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-900">${node.name}</span>
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-1">${node.tier}</div>
              <div class="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span class="text-slate-500">Uptime: <b class="text-slate-800">${node.uptime}</b></span>
                <span class="text-emerald-700 font-semibold font-mono">${node.latency}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4. Real-Time Fraud Stream & Live Anomaly Radar -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <i data-lucide="activity" class="w-4 h-4"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">Real-Time Threat & Anomaly Radar</h3>
              <p class="text-[11px] text-slate-500">Live inspection of authentication requests with risk scoring > 0.6 threshold</p>
            </div>
          </div>
          <span class="text-xs font-mono text-slate-400">Stream: Live Polling (300ms)</span>
        </div>

        <div class="space-y-2.5">
          ${admin.liveFraudStream.map(item => `
            <div class="p-3.5 rounded-xl border border-rose-200/80 bg-rose-50/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-600 text-white uppercase">
                    ${item.verdict}
                  </span>
                  <span class="text-xs font-bold text-slate-900">${item.type}</span>
                  <span class="text-[11px] font-mono text-slate-500 font-normal">Actor: ${item.actor}</span>
                  <span class="text-[10px] text-slate-400">• ${item.time}</span>
                </div>
                <p class="text-xs text-slate-600">${item.reason}</p>
                <div class="text-[10px] text-slate-400 font-mono">Target: ${item.site} • Risk Score: ${item.score}</div>
              </div>

              <button 
                onclick="window.trustIdApp.inspectForensicEvidence('${item.id}', '${item.type}')"
                class="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs self-start md:self-center"
              >
                Inspect Hash
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 5. Tamper-Evident Evidence Ledger (Polygon Amoy Anchor) -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-sm font-bold text-slate-900">Tamper-Evident Forensic Evidence Ledger</h3>
            <p class="text-[11px] text-slate-500">Every authorization and revocation anchored into Polygon Amoy smart contract with SHA-256 merkle roots</p>
          </div>
          <button 
            onclick="window.trustIdApp.verifyBlockchainAnchor()"
            class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span>Run Cryptographic Verification</span>
          </button>
        </div>

        <div class="space-y-3">
          ${admin.tamperEvidentLedger.map(item => `
            <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-slate-900">${item.evidenceId}</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    ${item.status}
                  </span>
                </div>
                <div class="text-[11px] font-mono text-slate-600 truncate max-w-xl">
                  SHA-256: <span class="text-slate-900 font-semibold">${item.sha256Hash}</span>
                </div>
                <div class="text-[10px] text-slate-400 font-mono">
                  Anchor: ${item.txHash} • Block ${item.block} • DID: ${item.did}
                </div>
              </div>

              <button 
                onclick="window.trustIdApp.copyToClipboard('${item.sha256Hash}')"
                class="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 shadow-2xs self-start md:self-center"
              >
                <i data-lucide="copy" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Copy Hash</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

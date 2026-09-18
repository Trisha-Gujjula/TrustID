// TrustID Interactive Modals & Simulation Dialogs
export function renderModals(state) {
  const { activeModal, modalData, user } = state;
  if (!activeModal) return '';

  switch (activeModal) {
    case 'verification-wizard':
      return renderVerificationWizardModal(state);
    case 'external-register-demo':
      return renderExternalRegisterDemoModal(state);
    case 'phishing-warning':
      return renderPhishingWarningModal(state);
    case 'fraud-block':
      return renderFraudBlockModal(state);
    case 'org-misuse-warning':
      return renderOrgMisuseWarningModal(state);
    case 'forensics-inspect':
      return renderForensicsModal(state);
    case 'global-privacy':
      return renderGlobalPrivacyModal(state);
    case 'manage-app':
      return renderManageAppModal(state);
    case 'profile-details':
      return renderProfileDetailsModal(state);
    case 'issue-credential':
      return renderIssueCredentialModal(state);
    default:
      return '';
  }
}

// 1. Verification & Onboarding Wizard Modal (Screens 1 to 6 from README)
function renderVerificationWizardModal(state) {
  const step = state.wizardStep || 1;

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-lg w-full p-7 border border-slate-200 shadow-2xl modal-pop-in relative">
        <button 
          onclick="window.trustIdApp.closeModal()"
          class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <!-- Progress Steps Indicator -->
        <div class="mb-6">
          <div class="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span class="${step >= 1 ? 'text-emerald-700' : ''}">1. Verify Contact</span>
            <span class="${step >= 2 ? 'text-emerald-700' : ''}">2. Biometric Enclave</span>
            <span class="${step >= 3 ? 'text-emerald-700' : ''}">3. DID Keys</span>
            <span class="${step >= 4 ? 'text-emerald-700' : ''}">4. Fingerprint</span>
          </div>
          <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-600 transition-all duration-300" style="width: ${step * 25}%"></div>
          </div>
        </div>

        ${step === 1 ? `
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <i data-lucide="mail-check" class="w-6 h-6"></i>
            </div>
            <h2 class="text-xl font-bold text-slate-900">Verify Your Identity Channels</h2>
            <p class="text-xs text-slate-500">A one-time cryptographic verification OTP has been sent to confirm ownership.</p>

            <div class="space-y-3 pt-2">
              <div>
                <label class="text-[11px] font-bold text-slate-700 uppercase">Email Address</label>
                <input type="text" value="${state.user?.email || 'user@trustid.network'}" disabled class="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 font-semibold">
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label class="text-[11px] font-bold text-slate-700 uppercase">One-Time Verification OTP</label>
                  <span class="text-[10px] text-slate-400 font-medium">Enter 6-digit code</span>
                </div>
                <div class="flex gap-2 mt-1">
                  <input type="text" id="otp-input" placeholder="• • • • • •" maxlength="6" class="w-full px-3 py-2.5 text-center text-lg font-mono font-bold tracking-widest bg-white border-2 border-slate-200 focus:border-emerald-500 rounded-xl text-slate-900 outline-none transition-all">
                </div>
                <div class="text-[10px] text-slate-400 mt-1">
                  Enter the 6-digit cryptographic verification OTP sent to your registered email.
                </div>
              </div>
            </div>

            <button 
              onclick="window.trustIdApp.advanceWizard(2)"
              class="w-full mt-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Confirm & Bind Hardware Passkey</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        ` : step === 2 ? `
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <i data-lucide="fingerprint" class="w-6 h-6"></i>
            </div>
            <h2 class="text-xl font-bold text-slate-900">Hardware Biometric Enclave</h2>
            <p class="text-xs text-slate-500">Creating WebCrypto asymmetric keypair inside your device's Tier 1 secure enclave.</p>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div class="flex items-center justify-between text-slate-700">
                <span>Cryptographic Algorithm:</span>
                <span class="font-mono font-bold">ECDSA P-256 + Ed25519</span>
              </div>
              <div class="flex items-center justify-between text-slate-700">
                <span>Enclave Isolation:</span>
                <span class="font-bold text-emerald-700">Hardware Tier 1 Active ✓</span>
              </div>
              <div class="flex items-center justify-between text-slate-700">
                <span>Private Key Protection:</span>
                <span class="font-bold text-slate-800">Non-Exportable on Chip</span>
              </div>
            </div>

            <button 
              onclick="window.trustIdApp.advanceWizard(3)"
              class="w-full mt-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Generate DID & Public Key</span>
              <i data-lucide="key" class="w-4 h-4"></i>
            </button>
          </div>
        ` : step === 3 ? `
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <i data-lucide="shield" class="w-6 h-6"></i>
            </div>
            <h2 class="text-xl font-bold text-slate-900">DID Document Registered</h2>
            <p class="text-xs text-slate-500">Your decentralized identifier has been successfully anchored into the TrustID registry.</p>

            <div class="p-4 rounded-2xl bg-slate-900 text-white space-y-2 font-mono text-[11px]">
              <div class="text-emerald-400 font-bold">// W3C DID Document</div>
              <div class="truncate text-slate-300">id: "did:trust:9a4f78b1c90e8e1b"</div>
              <div class="truncate text-slate-300">publicKey: "0x89e21bf490...a01b"</div>
              <div class="text-slate-400">verificationMethod: [ "Ed25519VerificationKey2020" ]</div>
            </div>

            <button 
              onclick="window.trustIdApp.advanceWizard(4)"
              class="w-full mt-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Generate Identity Fingerprint</span>
              <i data-lucide="award" class="w-4 h-4"></i>
            </button>
          </div>
        ` : `
          <div class="space-y-4 text-center">
            <div class="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <i data-lucide="check-circle-2" class="w-9 h-9"></i>
            </div>
            <h2 class="text-2xl font-bold text-slate-900">Identity Verified & Secured!</h2>
            <p class="text-xs text-slate-500 max-w-sm mx-auto">
              Your decentralized identity wallet is active with full zero-knowledge protection.
            </p>

            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-1">
              <div class="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Cryptographic Identity Fingerprint</div>
              <div class="text-base font-mono font-bold text-emerald-950">TID-8F72-A91C-4E21-8E1B</div>
              <div class="text-[11px] text-emerald-700 font-medium">Status: ✓ Verified • ✓ Active • ✓ Unique</div>
            </div>

            <button 
              onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Identity verification complete! Safety score updated to 98/100.', 'success')"
              class="w-full mt-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Finish & Return to Hub
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

// 2. "Register with TrustID" External Site Simulator Modal (Screen 10 from README)
function renderExternalRegisterDemoModal(state) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
        <button 
          onclick="window.trustIdApp.closeModal()"
          class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <!-- Header -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
            AJ
          </div>
          <div>
            <div class="text-xs text-slate-400 font-bold uppercase">External Request</div>
            <h3 class="text-base font-bold text-slate-900">Acme Jobs is requesting access</h3>
          </div>
        </div>

        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 text-xs text-slate-600">
          TrustID has automatically analyzed the requested permissions and flagged unnecessary scopes.
        </div>

        <!-- Permissions List with Risk Levels -->
        <div class="space-y-2.5 mb-5">
          <!-- 1. Email (Safe) -->
          <label class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-emerald-50/40 cursor-pointer">
            <div class="flex items-center gap-2.5">
              <input type="checkbox" checked class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4">
              <div>
                <div class="text-xs font-bold text-slate-800">Email Address</div>
                <div class="text-[10px] text-slate-400">Required for account login</div>
              </div>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Safe (Required)</span>
          </label>

          <!-- 2. Phone (Suspicious) -->
          <label class="flex items-center justify-between p-2.5 rounded-xl border border-amber-200 bg-amber-50/40 cursor-pointer">
            <div class="flex items-center gap-2.5">
              <input type="checkbox" class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4">
              <div>
                <div class="text-xs font-bold text-slate-800">Phone Number</div>
                <div class="text-[10px] text-amber-700">Not typically required for job applications</div>
              </div>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Suspicious</span>
          </label>

          <!-- 3. Camera Access (Unnecessary) -->
          <label class="flex items-center justify-between p-2.5 rounded-xl border border-rose-200 bg-rose-50/40 cursor-pointer">
            <div class="flex items-center gap-2.5">
              <input type="checkbox" class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4">
              <div>
                <div class="text-xs font-bold text-slate-800">Camera Access</div>
                <div class="text-[10px] text-rose-700">Unnecessary for authentication</div>
              </div>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Unnecessary</span>
          </label>

          <!-- 4. Location (High Risk) -->
          <label class="flex items-center justify-between p-2.5 rounded-xl border border-rose-300 bg-rose-50/60 cursor-pointer">
            <div class="flex items-center gap-2.5">
              <input type="checkbox" class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4">
              <div>
                <div class="text-xs font-bold text-slate-800">Precise GPS Location</div>
                <div class="text-[10px] text-rose-700">High privacy risk, recommended to deny</div>
              </div>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white uppercase">High Risk</span>
          </label>
        </div>

        <!-- Summary Badge -->
        <div class="p-2.5 rounded-xl bg-slate-100 text-[11px] text-slate-600 flex items-center justify-between mb-5">
          <span>Analysis Summary:</span>
          <span class="font-bold text-slate-900">1 Safe, 1 Suspicious, 2 Blocked</span>
        </div>

        <!-- Actions -->
        <div class="grid grid-cols-2 gap-2.5">
          <button 
            onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Login request denied.', 'info')"
            class="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            Deny All
          </button>
          <button 
            onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Authorized with selective disclosure (Email only)', 'success')"
            class="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Allow Selected (Safe)
          </button>
        </div>
      </div>
    </div>
  `;
}

// 3. Phishing Warning Modal (README Feature 2: Typosquatting / Fake Site)
function renderPhishingWarningModal(state) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-rose-500 shadow-2xl modal-pop-in relative">
        <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <i data-lucide="alert-octagon" class="w-8 h-8"></i>
        </div>

        <div class="text-center space-y-1 mb-4">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white tracking-wider uppercase">
            CRITICAL PHISHING ALERT
          </span>
          <h2 class="text-xl font-extrabold text-slate-900">This Website is FAKE</h2>
          <p class="text-xs text-slate-500">TrustID detected typosquatting and malicious spoofing on this domain.</p>
        </div>

        <!-- Comparison Table -->
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mb-4 font-mono text-xs">
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Authentic Site:</span>
            <span class="font-bold text-emerald-700">https://amazon.com</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Attempted Site:</span>
            <span class="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">amazoon.com (extra 'o')</span>
          </div>
          <div class="pt-2 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between font-sans">
            <span>Domain Age: <b>2 days</b></span>
            <span>SSL Certificate: <b class="text-rose-600">Self-Signed / Untrusted</b></span>
          </div>
        </div>

        <div class="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold mb-5 flex items-center gap-2">
          <i data-lucide="shield-x" class="w-4 h-4 text-rose-600 shrink-0"></i>
          <span>We strongly recommend NOT sharing credentials on this site.</span>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <button 
            onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Phishing connection aborted. You are safe.', 'success')"
            class="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Block & Close
          </button>
          <button 
            onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Proceeding at your own risk.', 'error')"
            class="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-xl transition-all"
          >
            Ignore Warning
          </button>
        </div>
      </div>
    </div>
  `;
}

// 4. Real-Time Fraud Block Modal (README Feature 1: Location & Velocity Jump)
function renderFraudBlockModal(state) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-rose-500 shadow-2xl modal-pop-in relative">
        <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <i data-lucide="ban" class="w-8 h-8"></i>
        </div>

        <div class="text-center space-y-1 mb-4">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white tracking-wider uppercase">
            FRAUD INTERCEPTED
          </span>
          <h2 class="text-xl font-extrabold text-slate-900">Suspicious Login Blocked</h2>
          <p class="text-xs text-slate-500">Isolation Forest ML engine detected high anomaly risk.</p>
        </div>

        <!-- Fraud Anomaly Breakdown -->
        <div class="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2.5 mb-5 text-xs">
          <div class="flex items-center justify-between">
            <span class="text-slate-500">Anomaly Factor:</span>
            <span class="font-bold text-rose-700">1000km+ Location Jump</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500">Travel Velocity:</span>
            <span class="font-bold text-slate-800">Seattle → Mumbai in 45m</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500">New Device:</span>
            <span class="font-bold text-slate-800">iPhone 12 (Unknown)</span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-rose-200/60 font-bold">
            <span class="text-slate-700">Calculated Risk Score:</span>
            <span class="text-rose-700 text-sm">0.94 / 1.0 (Threshold: 0.60)</span>
          </div>
        </div>

        <div class="space-y-2">
          <button 
            onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Account locked on suspicious device. Alert logged to forensics.', 'success')"
            class="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Confirm Fraud & Lock Session
          </button>
          <button 
            onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Step-up biometric verification required.', 'info')"
            class="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            It Was Me (Verify via Passkey)
          </button>
        </div>
      </div>
    </div>
  `;
}

// 5. Organization Misuse Warning Modal (README Feature 3)
function renderOrgMisuseWarningModal(state) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-amber-500 shadow-2xl modal-pop-in relative">
        <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <i data-lucide="building-2" class="w-8 h-8"></i>
        </div>

        <div class="text-center space-y-1 mb-4">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white tracking-wider uppercase">
            ENTERPRISE CREDENTIAL MISUSE
          </span>
          <h2 class="text-xl font-extrabold text-slate-900">Unapproved SaaS Site</h2>
          <p class="text-xs text-slate-500">Attempted use of Acme Corp credentials on unsanctioned tool.</p>
        </div>

        <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 mb-5 text-xs">
          <div class="flex items-center justify-between">
            <span class="text-slate-600">Employee:</span>
            <span class="font-bold text-slate-900">john@acme.com</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-600">Target URL:</span>
            <span class="font-mono font-bold text-rose-700">phishing-amazon.com.fake.com</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-600">IT Alert Status:</span>
            <span class="font-bold text-amber-700">Notified in 0.8s</span>
          </div>
        </div>

        <div class="space-y-2">
          <button 
            onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Corporate credentials immediately revoked.', 'success')"
            class="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Auto-Revoke Credentials
          </button>
          <button 
            onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Password reset email sent to employee.', 'info')"
            class="w-full py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs"
          >
            Force Password Reset
          </button>
        </div>
      </div>
    </div>
  `;
}

// 6. Forensics & Blockchain Anchor Modal (Screen 14 from README)
function renderForensicsModal(state) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
        <button 
          onclick="window.trustIdApp.closeModal()"
          class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <i data-lucide="binary" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-900">Tamper-Proof Forensics Evidence</h3>
            <p class="text-xs text-slate-500">Anchored into Polygon Amoy Testnet with SHA-256 state tree</p>
          </div>
        </div>

        <div class="space-y-3 font-mono text-xs mb-5">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div class="text-[10px] uppercase font-bold text-slate-400 mb-1 font-sans">Evidence SHA-256 Hash</div>
            <div class="break-all text-slate-800 font-semibold">0x8fa139e871239c4e12984bbcdfe0912489814421aa40192801235678abcdef01</div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[11px]">
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div class="text-[9px] text-slate-400 uppercase font-sans">Block Number</div>
              <div class="font-bold text-slate-800">#14,892,040</div>
            </div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div class="text-[9px] text-slate-400 uppercase font-sans">Network Status</div>
              <div class="font-bold text-emerald-700">Verified on Polygon</div>
            </div>
          </div>
        </div>

        <button 
          onclick="window.trustIdApp.closeModal()"
          class="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-xs"
        >
          Close Forensics View
        </button>
      </div>
    </div>
  `;
}

// 7. Global Privacy Defaults Modal
function renderGlobalPrivacyModal(state) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
        <button 
          onclick="window.trustIdApp.closeModal()"
          class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <h3 class="text-base font-bold text-slate-900 mb-1">Global Privacy Defaults</h3>
        <p class="text-xs text-slate-500 mb-4">Set default zero-knowledge and disclosure rules for all future applications.</p>

        <div class="space-y-3 mb-5">
          <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <div class="text-xs font-bold text-slate-800">Auto-Enforce Zero-Knowledge Proofs</div>
              <div class="text-[10px] text-slate-500">Never share raw dates of birth or raw salary numbers</div>
            </div>
            <input type="checkbox" checked class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4">
          </label>

          <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <div class="text-xs font-bold text-slate-800">Auto-Block High Risk Permissions</div>
              <div class="text-[10px] text-slate-500">Automatically deny background camera and location</div>
            </div>
            <input type="checkbox" checked class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4">
          </label>

          <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <div class="text-xs font-bold text-slate-800">Hardware Enclave Isolation</div>
              <div class="text-[10px] text-slate-500">Require Tier 1 hardware attestation on every sign request</div>
            </div>
            <input type="checkbox" checked class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4">
          </label>
        </div>

        <button 
          onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Global privacy rules updated', 'success')"
          class="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
        >
          Save Defaults
        </button>
      </div>
    </div>
  `;
}

// 8. Manage App Permissions Modal
function renderManageAppModal(state) {
  const app = state.modalData || state.connectedApps[0];

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
        <button 
          onclick="window.trustIdApp.closeModal()"
          class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl ${app.color} text-white font-bold flex items-center justify-center text-xs">
            ${app.code}
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-900">${app.name}</h3>
            <p class="text-xs text-slate-500">${app.category}</p>
          </div>
        </div>

        <div class="space-y-2 mb-5">
          ${app.permissions.map(perm => `
            <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
              <span class="font-medium text-slate-800">${perm.name}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                perm.type === 'Required' ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
              }">${perm.type}</span>
            </div>
          `).join('')}
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button 
            onclick="window.trustIdApp.revokeAppAccess('${app.id}')"
            class="py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-all border border-rose-200"
          >
            Revoke All Access
          </button>
          <button 
            onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('App permissions updated', 'success')"
            class="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  `;
}

// 9. Profile Details Modal
function renderProfileDetailsModal(state) {
  const { user } = state;
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
        <button 
          onclick="window.trustIdApp.closeModal()"
          class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="flex items-center gap-3 mb-5">
          <img src="${user.avatar}" class="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500">
          <div>
            <h3 class="text-base font-bold text-slate-900">${user.name}</h3>
            <p class="text-xs text-slate-500">${user.role}</p>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 mt-1 inline-block">
              ${user.status}
            </span>
          </div>
        </div>

        <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono mb-5">
          <div>
            <span class="text-slate-400 font-sans block text-[10px] uppercase font-bold">Decentralized ID (DID)</span>
            <span class="text-slate-800 break-all">${user.did}</span>
          </div>
          <div>
            <span class="text-slate-400 font-sans block text-[10px] uppercase font-bold">Identity Fingerprint</span>
            <span class="text-emerald-700 font-bold">${user.fingerprint}</span>
          </div>
        </div>

        <button 
          onclick="window.trustIdApp.closeModal()"
          class="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-xs"
        >
          Done
        </button>
      </div>
    </div>
  `;
}

// 10. Issue Credential Modal
function renderIssueCredentialModal(state) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
        <button 
          onclick="window.trustIdApp.closeModal()"
          class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <h3 class="text-base font-bold text-slate-900 mb-1">Issue Verifiable Credential</h3>
        <p class="text-xs text-slate-500 mb-4">Digitally sign and anchor a new W3C credential to an employee DID.</p>

        <div class="space-y-3 mb-5 text-xs">
          <div>
            <label class="font-bold text-slate-700 uppercase text-[10px]">Select Employee</label>
            <select class="w-full mt-1 p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium">
              <option>Elena Vance (Cyber Defense)</option>
              <option>David Kim (Engineering Infrastructure)</option>
              <option>Priya Patel (Human Resources)</option>
            </select>
          </div>

          <div>
            <label class="font-bold text-slate-700 uppercase text-[10px]">Credential Type</label>
            <select class="w-full mt-1 p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium">
              <option>Tier 4 Security Clearance (Confidential)</option>
              <option>Production Infrastructure SSH Key</option>
              <option>Enterprise Staff ID</option>
            </select>
          </div>

          <div>
            <label class="font-bold text-slate-700 uppercase text-[10px]">Validity Period</label>
            <input type="text" value="365 Days (Expires: 2027-09-18)" disabled class="w-full mt-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
          </div>
        </div>

        <button 
          onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Cryptographic VC issued and anchored to employee DID!', 'success')"
          class="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
        >
          <i data-lucide="award" class="w-4 h-4"></i>
          <span>Sign & Issue Credential</span>
        </button>
      </div>
    </div>
  `;
}

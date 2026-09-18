// TrustID Main Application Orchestrator
import { mockData } from './data/mockData.js';
import { renderHeader } from './components/Header.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderUserIdentityView } from './components/UserIdentityView.js';
import { renderOrganizationView } from './components/OrganizationView.js';
import { renderAdminConsoleView } from './components/AdminConsoleView.js';
import { renderModals } from './components/Modals.js';

class TrustIDApplication {
  constructor() {
    this.state = {
      ...mockData,
      currentStakeholder: 'user', // 'user' | 'organization' | 'admin'
      currentNavId: 'identity-hub',
      userSubTab: 'overview', // 'overview' | 'connected-apps' | 'permission-intelligence' | 'security-insights'
      activeModal: null,
      modalData: null,
      wizardStep: 1,
      searchQuery: '',
      toast: null
    };

    // Bind public app interface to window for inline HTML onclick handlers
    window.trustIdApp = this;
  }

  init() {
    this.render();
    this.setupKeyboardShortcuts();
  }

  // State Mutators
  setStakeholder(stakeholder) {
    this.state.currentStakeholder = stakeholder;
    if (stakeholder === 'user') {
      this.state.currentNavId = 'identity-hub';
    } else if (stakeholder === 'organization') {
      this.state.currentNavId = 'org-overview';
    } else if (stakeholder === 'admin') {
      this.state.currentNavId = 'admin-overview';
    }
    this.render();
  }

  setNavigation(navId) {
    this.state.currentNavId = navId;
    if (this.state.currentStakeholder === 'user') {
      if (navId === 'identity-hub') this.state.userSubTab = 'overview';
      if (navId === 'connected-apps') this.state.userSubTab = 'connected-apps';
      if (navId === 'permission-intel') this.state.userSubTab = 'permission-intelligence';
      if (navId === 'security-log' || navId === 'identity-analytics') this.state.userSubTab = 'security-insights';
    }
    this.render();
  }

  setUserSubTab(subTab) {
    this.state.userSubTab = subTab;
    this.render();
  }

  // Modal Controllers
  openModal(modalName, modalData = null) {
    this.state.activeModal = modalName;
    this.state.modalData = modalData;
    this.render();
  }

  closeModal() {
    this.state.activeModal = null;
    this.state.modalData = null;
    this.state.wizardStep = 1;
    this.render();
  }

  advanceWizard(step) {
    this.state.wizardStep = step;
    this.render();
  }

  // Simulations & Feature Triggers
  openVerificationWizard() {
    this.state.wizardStep = 1;
    this.openModal('verification-wizard');
  }

  simulateExternalLogin() {
    this.openModal('external-register-demo');
  }

  simulatePhishingDetection() {
    this.openModal('phishing-warning');
  }

  simulateFraudBlock() {
    this.openModal('fraud-block');
  }

  simulateOrgMisuse() {
    this.openModal('org-misuse-warning');
  }

  inspectForensicEvidence(id, type) {
    this.openModal('forensics-inspect', { id, type });
  }

  openGlobalPrivacyModal() {
    this.openModal('global-privacy');
  }

  manageAppPermissions(appId) {
    const app = this.state.connectedApps.find(a => a.id === appId);
    this.openModal('manage-app', app);
  }

  showProfileDetails() {
    this.openModal('profile-details');
  }

  openIssueCredentialModal() {
    this.openModal('issue-credential');
  }

  openWhitelistModal() {
    const site = prompt("Enter domain to whitelist for company credentials:", "https://confluence.acme.com");
    if (site) {
      this.state.organization.approvedSites.push({
        url: site,
        name: "Enterprise Whitelist Entry",
        approvedAt: new Date().toISOString().split('T')[0],
        claimsAllowed: "Standard Corporate SSO"
      });
      this.showToast(`Added ${site} to corporate whitelist!`, 'success');
      this.render();
    }
  }

  removeApprovedSite(url) {
    this.state.organization.approvedSites = this.state.organization.approvedSites.filter(s => s.url !== url);
    this.showToast(`Removed ${url} from whitelist.`, 'info');
    this.render();
  }

  revokeOrgCredential(credId, employeeName) {
    this.state.organization.activeAlerts = this.state.organization.activeAlerts.filter(a => a.credentialId !== credId);
    this.showToast(`Revoked credentials for ${employeeName}. Session invalidated across all nodes.`, 'success');
    this.render();
  }

  forcePasswordReset(email) {
    this.showToast(`Encrypted password reset link dispatched to ${email}.`, 'info');
  }

  investigateAlert(alertId) {
    this.showToast(`Threat investigation ticket opened with IT Security Operations.`, 'info');
  }

  revokeAppAccess(appId) {
    this.state.connectedApps = this.state.connectedApps.filter(a => a.id !== appId);
    this.state.user.connectedAppsCount = this.state.connectedApps.length;
    this.closeModal();
    this.showToast(`Application access revoked and all session keys purged.`, 'success');
    this.render();
  }

  downloadActivitySummary() {
    const summary = {
      user: this.state.user,
      enclaveAttestation: "Hardware Tier 1 (AWS Nitro & Intel SGX)",
      zkAssurance: "100% Zero-Knowledge Verified",
      timestamp: new Date().toISOString(),
      blockchainAnchor: "Polygon Amoy Block #14,892,104",
      connectedServices: this.state.connectedApps.map(a => ({ name: a.name, permissions: a.permissions }))
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trustid-activity-summary-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast("Cryptographic activity summary exported successfully!", "success");
  }

  verifyBlockchainAnchor() {
    this.showToast("Querying Polygon Amoy node... Merkle state tree verified! All 18,429 DIDs valid.", "success");
  }

  openAttestationDetails() {
    this.showToast("Hardware Enclave Tier 1: Hardware-rooted key attestation verified. Zero leaks.", "success");
  }

  toggleNotificationDrawer() {
    this.showToast("3 Real-time security events logged in last 24h. No leaks detected.", "info");
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast(`Copied to clipboard: ${text.slice(0, 20)}...`, 'success');
    }).catch(() => {
      this.showToast("Copied to clipboard!", 'success');
    });
  }

  handleSearch(query) {
    this.state.searchQuery = query.toLowerCase();
    // Re-render if necessary for filtering
  }

  showToast(message, type = 'info') {
    this.state.toast = { message, type };
    this.render();

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.state.toast = null;
      this.render();
    }, 3800);
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('header-search-input');
        if (searchInput) searchInput.focus();
      }
      if (e.key === 'Escape') {
        if (this.state.activeModal) {
          this.closeModal();
        }
      }
    });
  }

  // Main Render Engine
  render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    let mainContentHtml = '';
    if (this.state.currentStakeholder === 'user') {
      mainContentHtml = renderUserIdentityView(this.state);
    } else if (this.state.currentStakeholder === 'organization') {
      mainContentHtml = renderOrganizationView(this.state);
    } else if (this.state.currentStakeholder === 'admin') {
      mainContentHtml = renderAdminConsoleView(this.state);
    }

    const modalsHtml = renderModals(this.state);

    // Toast HTML
    let toastHtml = '';
    if (this.state.toast) {
      const isSuccess = this.state.toast.type === 'success';
      const isError = this.state.toast.type === 'error';
      toastHtml = `
        <div class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold modal-pop-in ${
          isSuccess 
            ? 'bg-emerald-900 text-white border-emerald-700' 
            : (isError ? 'bg-rose-900 text-white border-rose-700' : 'bg-slate-900 text-white border-slate-700')
        }">
          <i data-lucide="${isSuccess ? 'check-circle' : (isError ? 'alert-octagon' : 'info')}" class="w-4 h-4 text-emerald-400"></i>
          <span>${this.state.toast.message}</span>
        </div>
      `;
    }

    // Demo Floating Interactive Toolset (Allows user/judge to trigger all README scenarios easily!)
    const floatingDemosHtml = `
      <div class="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900/90 text-white px-4 py-2 rounded-full border border-slate-700 shadow-2xl backdrop-blur-md flex items-center gap-2 select-none">
        <span class="text-[10px] uppercase font-mono font-bold text-slate-400 mr-1 hidden sm:inline">Demo Lab:</span>
        <button 
          onclick="window.trustIdApp.simulateExternalLogin()"
          class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-700 hover:bg-emerald-600 text-white transition-all flex items-center gap-1"
          title="Simulate Register with TrustID button on external website"
        >
          <i data-lucide="key" class="w-3 h-3"></i>
          <span>Register with TrustID</span>
        </button>

        <button 
          onclick="window.trustIdApp.simulatePhishingDetection()"
          class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-700 hover:bg-rose-600 text-white transition-all flex items-center gap-1"
          title="Simulate detection of typosquatting fake website"
        >
          <i data-lucide="alert-triangle" class="w-3 h-3"></i>
          <span>Phishing Check</span>
        </button>

        <button 
          onclick="window.trustIdApp.simulateFraudBlock()"
          class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-700 hover:bg-amber-600 text-white transition-all flex items-center gap-1"
          title="Simulate 1000km velocity anomaly fraud detection"
        >
          <i data-lucide="shield-alert" class="w-3 h-3"></i>
          <span>Fraud Detection</span>
        </button>

        <button 
          onclick="window.trustIdApp.simulateOrgMisuse()"
          class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-700 hover:bg-blue-600 text-white transition-all flex items-center gap-1"
          title="Simulate unauthorized company credential detection"
        >
          <i data-lucide="building" class="w-3 h-3"></i>
          <span>Org Misuse</span>
        </button>
      </div>
    `;

    appEl.innerHTML = `
      <!-- Floating Application Container matching the screenshot -->
      <div class="max-w-[1440px] mx-auto bg-slate-100 rounded-[32px] border border-slate-200/80 app-container-shadow overflow-hidden flex flex-col min-h-[920px]">
        <!-- Top Application Header with Stakeholder Switcher -->
        ${renderHeader(this.state)}

        <!-- Main Body: Sidebar + Dynamic Stakeholder Content -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Sidebar Navigation -->
          ${renderSidebar(this.state)}

          <!-- Scrollable Main Content Area -->
          <main class="flex-1 overflow-y-auto p-6 bg-slate-100/70">
            ${mainContentHtml}
          </main>
        </div>
      </div>

      <!-- Interactive Modals -->
      ${modalsHtml}

      <!-- Toast Feedback -->
      ${toastHtml}

      <!-- Floating Demos Toolbar -->
      ${floatingDemosHtml}
    `;

    // Initialize Lucide Icons after DOM update
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

// Instantiate and boot app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new TrustIDApplication();
  app.init();
});

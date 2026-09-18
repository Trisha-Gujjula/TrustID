/**
 * TrustID - Complete Standalone Client Application Bundle
 * Implements exact visual aesthetics from the design reference,
 * 3 distinct stakeholders (User, Organization, Admin),
 * and all interactive workflows from the specification.
 */

(function () {
  'use strict';

  // --- 1. MOCK DATA STORE ---
  const mockData = {
    user: {
      name: "Elena Vance",
      role: "Senior Security Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      did: "did:trust:9a4f78b1c90e8e1b",
      didShort: "did:trust:9a4f...8e1b",
      fingerprint: "TID-8F72-A91C-4E21-8E1B",
      email: "elena.vance@trustid.network",
      phone: "+1 (555) 382-9104",
      status: "Verified & Encrypted",
      enclaveTier: "Hardware Tier 1",
      enclaveStatus: "Active",
      safetyScore: 98,
      safetyRating: "EXCELLENT",
      passkeyActive: true,
      threatStatus: "Safe & Protected",
      connectedAppsCount: 8,
      selectiveClaims: 12,
      requiredClaims: 4,
      overprivilegedCount: 0,
      rawPersonalDataShared: "0 bytes",
      zkAssurance: "100% Zero-Knowledge",
      verificationStatus: "Verified"
    },

    trendData: [
      { day: "Mon", verifications: 14, ssoTokens: 8 },
      { day: "Tue", verifications: 28, ssoTokens: 16 },
      { day: "Wed", verifications: 22, ssoTokens: 14 },
      { day: "Thu", verifications: 42, ssoTokens: 25 },
      { day: "Fri", verifications: 68, ssoTokens: 38 },
      { day: "Sat", verifications: 34, ssoTokens: 19 },
      { day: "Today", verifications: 76, ssoTokens: 48 }
    ],

    connectedApps: [
      {
        id: "app-workflow",
        name: "WorkFlow AI Enterprise",
        code: "WF",
        color: "bg-emerald-600",
        category: "Productivity & Automation",
        status: "Active",
        riskLevel: "Low",
        permissions: [
          { name: "Work Email", type: "Required", status: "Active" },
          { name: "Organization DID", type: "Required", status: "Active" },
          { name: "Department Role", type: "Selective", status: "Active" },
          { name: "Telemetry ID", type: "Selective", status: "Zero-Knowledge" }
        ],
        lastActive: "12 mins ago",
        claimsCount: 4,
        zkEnabled: true
      },
      {
        id: "app-fintech",
        name: "FinTech Cloud Vault",
        code: "FT",
        color: "bg-teal-600",
        category: "Banking & Compliance",
        status: "Active",
        riskLevel: "Low",
        permissions: [
          { name: "Zero-Knowledge Income Proof", type: "Selective", status: "Zero-Knowledge" },
          { name: "Cryptographic DID Anchor", type: "Required", status: "Active" },
          { name: "Accredited Investor Attestation", type: "Selective", status: "Zero-Knowledge" }
        ],
        lastActive: "2 hours ago",
        claimsCount: 3,
        zkEnabled: true
      },
      {
        id: "app-acmehealth",
        name: "Acme Health Portal",
        code: "AH",
        color: "bg-cyan-600",
        category: "Healthcare & HIPAA",
        status: "Active",
        riskLevel: "Low",
        permissions: [
          { name: "Age Verification (>21 ZK Proof)", type: "Selective", status: "Zero-Knowledge" },
          { name: "Insurance Coverage Token", type: "Required", status: "Active" }
        ],
        lastActive: "Yesterday",
        claimsCount: 2,
        zkEnabled: true
      },
      {
        id: "app-clouddev",
        name: "CloudDevOps Console",
        code: "CD",
        color: "bg-indigo-600",
        category: "Infrastructure",
        status: "Active",
        riskLevel: "Low",
        permissions: [
          { name: "SSH Public Key Registry", type: "Required", status: "Active" },
          { name: "Engineering Role Attestation", type: "Selective", status: "Active" }
        ],
        lastActive: "3 days ago",
        claimsCount: 2,
        zkEnabled: true
      },
      {
        id: "app-logistics",
        name: "Global Logistics Hub",
        code: "GL",
        color: "bg-blue-600",
        category: "Supply Chain",
        status: "Active",
        riskLevel: "Low",
        permissions: [
          { name: "Employee Dispatch Badge", type: "Selective", status: "Active" },
          { name: "Regional Node ID", type: "Required", status: "Active" }
        ],
        lastActive: "4 days ago",
        claimsCount: 2,
        zkEnabled: false
      },
      {
        id: "app-securepay",
        name: "SecurePay Gateway",
        code: "SP",
        color: "bg-emerald-700",
        category: "Payments",
        status: "Active",
        riskLevel: "Low",
        permissions: [
          { name: "Tokenized Payment Credential", type: "Selective", status: "Zero-Knowledge" }
        ],
        lastActive: "5 days ago",
        claimsCount: 1,
        zkEnabled: true
      },
      {
        id: "app-metadoc",
        name: "MetaDoc Contract Signer",
        code: "MD",
        color: "bg-purple-600",
        category: "Legal & Contracts",
        status: "Active",
        riskLevel: "Low",
        permissions: [
          { name: "Digital Signature Authority", type: "Required", status: "Active" }
        ],
        lastActive: "6 days ago",
        claimsCount: 1,
        zkEnabled: true
      },
      {
        id: "app-zerotrust",
        name: "ZeroTrust Enclave Gateway",
        code: "ZT",
        color: "bg-slate-700",
        category: "Security Tunnel",
        status: "Active",
        riskLevel: "Low",
        permissions: [
          { name: "Hardware Enclave Attestation", type: "Required", status: "Active" }
        ],
        lastActive: "1 week ago",
        claimsCount: 1,
        zkEnabled: true
      }
    ],

    organization: {
      orgName: "Acme Corp Enterprise",
      orgId: "org-acme-corp-091",
      totalEmployees: 245,
      linkedTrustId: 198,
      linkedPercentage: "81%",
      alertsThisWeek: 3,
      preventedBreaches: 3,
      activeAlerts: [
        {
          id: "alert-01",
          severity: "CRITICAL",
          riskScore: 0.94,
          employeeName: "John Smith",
          employeeEmail: "john@acme.com",
          employeeRole: "Sales Representative",
          attemptedSite: "phishing-amazon.com.fake.com",
          realSite: "amazon.com",
          detectedAt: "Today, 14:23:45 UTC",
          device: "iPhone 12 (UNRECOGNIZED)",
          location: "Mumbai, India (Expected: Seattle, USA)",
          distanceJump: "12,480 km in 45 mins",
          status: "Pending Action",
          credentialId: "cred-js-09"
        },
        {
          id: "alert-02",
          severity: "HIGH",
          riskScore: 0.82,
          employeeName: "Sarah Lee",
          employeeEmail: "sarah@acme.com",
          employeeRole: "Senior Product Manager",
          attemptedSite: "internal-sharepoint-fake.co",
          realSite: "acme.sharepoint.com",
          detectedAt: "Today, 13:15:22 UTC",
          device: "Chrome / macOS",
          location: "London, UK",
          distanceJump: "New IP & Hostname Mismatch",
          status: "Investigating",
          credentialId: "cred-sl-14"
        },
        {
          id: "alert-03",
          severity: "MEDIUM",
          riskScore: 0.68,
          employeeName: "Michael Chen",
          employeeEmail: "michael.c@acme.com",
          employeeRole: "Junior Developer",
          attemptedSite: "unapproved-cloud-repo.io",
          realSite: "github.com/acme",
          detectedAt: "Today, 11:42:10 UTC",
          device: "Ubuntu 22.04 LTS",
          location: "Toronto, Canada",
          distanceJump: "Velocity Anomaly (6 logins / 90s)",
          status: "MFA Challenged",
          credentialId: "cred-mc-78"
        }
      ],
      employees: [
        { id: "emp-1", name: "Elena Vance", email: "elena.vance@acme.com", department: "Cyber Defense", did: "did:trust:9a4f...8e1b", status: "Active & Secure", credentialsIssued: 3 },
        { id: "emp-2", name: "John Smith", email: "john@acme.com", department: "Sales Operations", did: "did:trust:3b8c...4102", status: "Suspicious", credentialsIssued: 1 },
        { id: "emp-3", name: "Sarah Lee", email: "sarah@acme.com", department: "Product Management", did: "did:trust:7f1d...99ea", status: "Under Review", credentialsIssued: 2 },
        { id: "emp-4", name: "David Kim", email: "david.k@acme.com", department: "Engineering Infrastructure", did: "did:trust:e24a...7710", status: "Active & Secure", credentialsIssued: 4 },
        { id: "emp-5", name: "Priya Patel", email: "priya.p@acme.com", department: "Human Resources", did: "did:trust:8c90...223f", status: "Active & Secure", credentialsIssued: 2 }
      ],
      approvedSites: [
        { url: "https://acme.enterprise.com", name: "Acme Intranet Portal", approvedAt: "2025-01-15", claimsAllowed: "Full SSO" },
        { url: "https://github.com/acme-corp", name: "Enterprise GitHub Org", approvedAt: "2025-02-01", claimsAllowed: "SSH Key, Dev DID" },
        { url: "https://acme.slack.com", name: "Corporate Slack", approvedAt: "2025-01-20", claimsAllowed: "Work Email" },
        { url: "https://atlassian.net/acme", name: "Jira & Confluence", approvedAt: "2025-03-10", claimsAllowed: "Work Email, Role" },
        { url: "https://aws.amazon.com/console", name: "AWS Production Cloud", approvedAt: "2025-04-05", claimsAllowed: "Hardware Enclave Cert" }
      ]
    },

    admin: {
      systemHealth: "100% Operational",
      blockchainNetwork: "Polygon Amoy Testnet",
      blockchainAnchorBlock: "#14,892,104",
      totalDIDsRegistered: 18429,
      totalVerificationsToday: 42910,
      fraudAttemptsBlockedToday: 18,
      meanEngineLatency: "3.2 ms",
      enclaveNodes: [
        { name: "Enclave-Node-US-East-1", tier: "Hardware Tier 1 (Nitro)", status: "Optimal", uptime: "99.99%", latency: "11ms" },
        { name: "Enclave-Node-US-West-2", tier: "Hardware Tier 1 (Nitro)", status: "Optimal", uptime: "99.98%", latency: "14ms" },
        { name: "Enclave-Node-EU-Central", tier: "Hardware Tier 1 (Intel SGX)", status: "Optimal", uptime: "100.00%", latency: "9ms" },
        { name: "Enclave-Node-AP-Southeast", tier: "Hardware Tier 1 (Intel SGX)", status: "Optimal", uptime: "99.97%", latency: "18ms" }
      ],
      liveFraudStream: [
        {
          id: "fr-101",
          time: "Just now",
          type: "Velocity Anomaly",
          actor: "did:trust:61a0...92b4",
          site: "quick-checkout.pw",
          score: 0.91,
          verdict: "BLOCKED",
          reason: "8 logins in 90 seconds from rotating VPN exit nodes"
        },
        {
          id: "fr-102",
          time: "2 mins ago",
          type: "1000km Geolocation Jump",
          actor: "did:trust:3b8c...4102",
          site: "phishing-amazon.com.fake.com",
          score: 0.94,
          verdict: "BLOCKED",
          reason: "Location jump from Seattle to Mumbai in 45 minutes"
        },
        {
          id: "fr-103",
          time: "14 mins ago",
          type: "Typosquatting Phishing",
          actor: "did:trust:81fa...3319",
          site: "amazoon.com",
          score: 0.89,
          verdict: "BLOCKED",
          reason: "Target domain similarity: amazon.com (Levenshtein distance: 1)"
        }
      ],
      tamperEvidentLedger: [
        {
          evidenceId: "EVID-88219-AMOY",
          type: "DID Key Registration",
          did: "did:trust:9a4f...8e1b",
          sha256Hash: "0x8fa139e871239c4e12984bbcdfe0912489814421aa40192801235678abcdef01",
          txHash: "0x77d1...49fa (Polygon Amoy)",
          block: 14892040,
          status: "Tamper-Proof Verified ✓"
        },
        {
          evidenceId: "EVID-88220-AMOY",
          type: "Credential Revocation Audit",
          did: "did:trust:3b8c...4102",
          sha256Hash: "0x44bb192837192841029384bbadfe192849182309182049182039481029384102",
          txHash: "0x91aa...22bb (Polygon Amoy)",
          block: 14892098,
          status: "Tamper-Proof Verified ✓"
        }
      ]
    }
  };

  // --- 2. HEADER COMPONENT ---
  function renderHeader(state) {
    const { currentStakeholder, user } = state;

    let statusText = "Shield Active • Zero-Knowledge Assured";
    let statusBg = "bg-emerald-50 text-emerald-800 border-emerald-200";
    let statusDot = "bg-emerald-500";
    let hubTag = "USER HUB";

    if (currentStakeholder === 'organization') {
      statusText = "Org Enclave Active • 245 Employees Linked";
      hubTag = "ORGANIZATION HUB";
    } else if (currentStakeholder === 'admin') {
      statusText = "Polygon Amoy Anchor: Block #14,892,104";
      statusBg = "bg-blue-50 text-blue-800 border-blue-200";
      statusDot = "bg-blue-500";
      hubTag = "ADMIN CONSOLE";
    }

    return `
      <header class="w-full h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 select-none shrink-0 z-20">
        <!-- Logo -->
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

        <!-- 3 Stakeholder Switcher Pill + Status -->
        <div class="flex items-center gap-3">
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

          <!-- Shield Active Status Badge -->
          <div class="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${statusBg}">
            <span class="w-2 h-2 rounded-full ${statusDot} pulse-active"></span>
            <span>${statusText}</span>
          </div>

          <button 
            onclick="window.trustIdApp.openRegistrationModal()"
            class="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-all shadow-2xs"
          >
            <i data-lucide="user-plus" class="w-3.5 h-3.5 text-emerald-700"></i>
            <span>+ Register Stakeholder</span>
          </button>
        </div>

        <!-- Right Side: Search, Bell, Profile Chip -->
        <div class="flex items-center gap-3">
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

          <button 
            id="btn-notifications"
            class="relative p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all border border-slate-200"
            title="Security Notifications"
            onclick="window.trustIdApp.toggleNotificationDrawer()"
          >
            <i data-lucide="bell" class="w-4 h-4"></i>
            <span class="absolute top-1 right-1 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white"></span>
          </button>

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

  // --- 3. SIDEBAR COMPONENT ---
  function renderSidebar(state) {
    const { currentStakeholder, currentNavId } = state;

    let spaceTitle = "Personal Identity";
    let spaceIcon = "fingerprint";
    let menuItems = [];

    if (currentStakeholder === 'user') {
      spaceTitle = "Personal Identity";
      spaceIcon = "fingerprint";
      menuItems = [
        { id: "identity-hub", label: "Identity Hub", icon: "shield", badge: null },
        { id: "connected-apps", label: "Connected Apps & SSO", icon: "network", badge: "8" },
        { id: "permission-intel", label: "Permission Intelligence", icon: "sliders-horizontal", badge: "Auto", badgeType: "green" },
        { id: "security-log", label: "Security & Activity Log", icon: "shield-alert", badge: null },
        { id: "identity-analytics", label: "Identity Analytics", icon: "trending-up", badge: null },
        { id: "settings", label: "Settings", icon: "settings", badge: null }
      ];
    } else if (currentStakeholder === 'organization') {
      spaceTitle = "Acme Corp Enterprise";
      spaceIcon = "building";
      menuItems = [
        { id: "org-overview", label: "Organization Overview", icon: "layout-dashboard", badge: null },
        { id: "employee-dids", label: "Employee DIDs & Directory", icon: "users", badge: "245" },
        { id: "misuse-radar", label: "Credential Misuse Radar", icon: "alert-triangle", badge: "3 Alerts", badgeType: "amber" },
        { id: "approved-apps", label: "Approved Applications", icon: "check-circle", badge: "5", badgeType: "gray" },
        { id: "org-policies", label: "Security Policies", icon: "lock", badge: null },
        { id: "org-audit", label: "Compliance & Audit", icon: "file-text", badge: null }
      ];
    } else if (currentStakeholder === 'admin') {
      spaceTitle = "TrustID Network Core";
      spaceIcon = "server";
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
      <aside class="w-64 md:w-72 bg-white border-r border-slate-200 p-5 flex flex-col justify-between select-none shrink-0 h-full overflow-y-auto z-10">
        <div class="flex flex-col gap-4">
          <!-- Current Space Box -->
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-all">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <i data-lucide="${spaceIcon}" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="text-[10px] font-bold tracking-wider uppercase text-slate-400">CURRENT SPACE</div>
                <div class="text-xs font-bold text-slate-800">${spaceTitle}</div>
              </div>
            </div>
            <i data-lucide="chevrons-up-down" class="w-4 h-4 text-slate-400"></i>
          </div>

          <!-- Menu Header -->
          <div>
            <div class="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              MENU
            </div>

            <!-- Navigation Items -->
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
        </div>

        <!-- Enclave Hardware Footer & Logout pinned to bottom -->
        <div class="flex flex-col gap-3 pt-4 mt-auto border-t border-slate-100">
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

          <button 
            onclick="window.trustIdApp.logout()"
            class="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50/80 border border-slate-200/80 transition-all"
          >
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
            <span>Switch Account / Logout</span>
          </button>
        </div>
      </aside>
    `;
  }

  // --- 4. USER IDENTITY VIEW (Screenshot Match) ---
  function renderUserIdentityView(state) {
    const { user, connectedApps, userSubTab = 'overview' } = state;

    return `
      <div class="space-y-6">
        <!-- Greeting Header Banner -->
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

        <!-- Sub-Tabs Navigation -->
        <div class="border-b border-slate-200 flex items-center gap-8 px-2 text-xs font-semibold text-slate-500 select-none">
          <button 
            onclick="window.trustIdApp.setUserSubTab('overview')"
            class="pb-3 flex items-center gap-2 transition-all relative ${
              userSubTab === 'overview' ? 'text-emerald-800 font-bold' : 'hover:text-slate-800'
            }"
          >
            <i data-lucide="layout-grid" class="w-4 h-4 ${userSubTab === 'overview' ? 'text-emerald-700' : 'text-slate-400'}"></i>
            <span>Overview & Analytics</span>
            ${userSubTab === 'overview' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full"></span>' : ''}
          </button>

          <button 
            onclick="window.trustIdApp.setUserSubTab('connected-apps')"
            class="pb-3 flex items-center gap-2 transition-all relative ${
              userSubTab === 'connected-apps' ? 'text-emerald-800 font-bold' : 'hover:text-slate-800'
            }"
          >
            <i data-lucide="share-2" class="w-4 h-4 ${userSubTab === 'connected-apps' ? 'text-emerald-700' : 'text-slate-400'}"></i>
            <span>Connected Apps (${connectedApps.length})</span>
            ${userSubTab === 'connected-apps' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full"></span>' : ''}
          </button>

          <button 
            onclick="window.trustIdApp.setUserSubTab('permission-intelligence')"
            class="pb-3 flex items-center gap-2 transition-all relative ${
              userSubTab === 'permission-intelligence' ? 'text-emerald-800 font-bold' : 'hover:text-slate-800'
            }"
          >
            <i data-lucide="sliders-horizontal" class="w-4 h-4 ${userSubTab === 'permission-intelligence' ? 'text-emerald-700' : 'text-slate-400'}"></i>
            <span>Permission Intelligence</span>
            ${userSubTab === 'permission-intelligence' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full"></span>' : ''}
          </button>

          <button 
            onclick="window.trustIdApp.setUserSubTab('security-insights')"
            class="pb-3 flex items-center gap-2 transition-all relative ${
              userSubTab === 'security-insights' ? 'text-emerald-800 font-bold' : 'hover:text-slate-800'
            }"
          >
            <i data-lucide="shield-alert" class="w-4 h-4 ${userSubTab === 'security-insights' ? 'text-emerald-700' : 'text-slate-400'}"></i>
            <span>Security Insights</span>
            ${userSubTab === 'security-insights' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full"></span>' : ''}
          </button>
        </div>

        <!-- 4 Metrics Cards -->
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
                <button onclick="window.trustIdApp.copyToClipboard('${user.did}')" class="text-slate-400 hover:text-emerald-700">
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

        <!-- Middle Analytics Row: Activity Trends & Scope Breakdown -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Trends Line Chart -->
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

            <div class="relative w-full h-44 mt-2">
              <svg class="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="b-grad-verifications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#167a4e" stop-opacity="0.22" />
                    <stop offset="100%" stop-color="#167a4e" stop-opacity="0.0" />
                  </linearGradient>
                  <linearGradient id="b-grad-sso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#6ee7b7" stop-opacity="0.18" />
                    <stop offset="100%" stop-color="#6ee7b7" stop-opacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4 4" />
                <line x1="0" y1="80" x2="600" y2="80" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4 4" />
                <line x1="0" y1="130" x2="600" y2="130" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4 4" />

                <!-- SSO Tokens -->
                <path d="M 20 120 Q 90 95, 170 105 T 320 85 T 420 50 T 510 110 T 580 40 L 580 155 L 20 155 Z" fill="url(#b-grad-sso)" />
                <path d="M 20 120 Q 90 95, 170 105 T 320 85 T 420 50 T 510 110 T 580 40" fill="none" stroke="#6ee7b7" stroke-width="2" stroke-dasharray="3 3" />

                <!-- Verifications -->
                <path d="M 20 110 Q 90 85, 170 95 T 320 65 T 420 25 T 510 95 T 580 18 L 580 155 L 20 155 Z" fill="url(#b-grad-verifications)" />
                <path d="M 20 110 Q 90 85, 170 95 T 320 65 T 420 25 T 510 95 T 580 18" fill="none" stroke="#167a4e" stroke-width="2.75" stroke-linecap="round" />

                <circle cx="20" cy="110" r="3.5" fill="#167a4e" />
                <circle cx="170" cy="95" r="3.5" fill="#167a4e" />
                <circle cx="320" cy="65" r="3.5" fill="#167a4e" />
                <circle cx="420" cy="25" r="3.5" fill="#167a4e" />
                <circle cx="510" cy="95" r="3.5" fill="#167a4e" />
                <circle cx="580" cy="18" r="4.5" fill="#167a4e" stroke="#ffffff" stroke-width="2" />
              </svg>
            </div>

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

          <!-- Scope Donut Breakdown -->
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

            <div class="flex items-center justify-around my-4">
              <div class="relative w-28 h-28 flex items-center justify-center">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-100" stroke-width="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-emerald-700" stroke-dasharray="75, 100" stroke-width="4.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-emerald-400" stroke-dasharray="25, 100" stroke-dashoffset="-75" stroke-width="4.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span class="text-xl font-extrabold text-slate-900 leading-none">16</span>
                  <span class="text-[9px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">CLAIMS</span>
                </div>
              </div>

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

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span class="text-slate-500">Overprivileged alerts</span>
              <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">None detected</span>
            </div>
          </div>
        </div>

        <!-- Bottom Connected Applications & Permission Intelligence -->
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

  // --- 5. ORGANIZATION VIEW ---
  function renderOrganizationView(state) {
    const { organization } = state;

    return `
      <div class="space-y-6">
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

        <!-- Credential Misuse Radar -->
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

        <!-- Employee DID Registry -->
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
                        onclick="window.trustIdApp.showToast('Managing credentials for ${emp.name}', 'info')"
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
      </div>
    `;
  }

  // --- 6. ADMIN CONSOLE VIEW ---
  function renderAdminConsoleView(state) {
    const { admin } = state;

    return `
      <div class="space-y-6">
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

        <!-- Hardware Tier 1 Enclaves -->
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

        <!-- Real-Time Threat Stream -->
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
      </div>
    `;
  }

  // --- 7. MODALS COMPONENT ---
  function renderModals(state) {
    const { activeModal, user } = state;
    if (!activeModal) return '';

    if (activeModal === 'verification-wizard') {
      const step = state.wizardStep || 1;
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
          <div class="bg-white rounded-3xl max-w-lg w-full p-7 border border-slate-200 shadow-2xl modal-pop-in relative">
            <button onclick="window.trustIdApp.closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>

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
                    <input type="text" value="elena.vance@trustid.network" disabled class="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
                  </div>

                  <div>
                    <label class="text-[11px] font-bold text-slate-700 uppercase">One-Time Verification OTP</label>
                    <input type="text" id="otp-input" value="849201" maxlength="6" class="w-full mt-1 px-3 py-2 text-center text-lg font-mono font-bold tracking-widest bg-white border-2 border-emerald-500 rounded-xl text-emerald-800">
                    <div class="text-[10px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
                      <i data-lucide="check" class="w-3 h-3"></i> Valid 6-digit OTP code loaded
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

    if (activeModal === 'external-register-demo') {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
            <button onclick="window.trustIdApp.closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">AJ</div>
              <div>
                <div class="text-xs text-slate-400 font-bold uppercase">External Request</div>
                <h3 class="text-base font-bold text-slate-900">Acme Jobs is requesting access</h3>
              </div>
            </div>

            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 text-xs text-slate-600">
              TrustID has automatically analyzed requested permissions and flagged unnecessary access scopes.
            </div>

            <div class="space-y-2.5 mb-5">
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

              <label class="flex items-center justify-between p-2.5 rounded-xl border border-amber-200 bg-amber-50/40 cursor-pointer">
                <div class="flex items-center gap-2.5">
                  <input type="checkbox" class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4">
                  <div>
                    <div class="text-xs font-bold text-slate-800">Phone Number</div>
                    <div class="text-[10px] text-amber-700">Not typically required for job search</div>
                  </div>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Suspicious</span>
              </label>

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

    if (activeModal === 'phishing-warning') {
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
                <span>SSL: <b class="text-rose-600">Untrusted</b></span>
              </div>
            </div>

            <div class="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold mb-5 flex items-center gap-2">
              <i data-lucide="shield-x" class="w-4 h-4 text-rose-600 shrink-0"></i>
              <span>We recommend NOT logging in or sharing credentials.</span>
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

    if (activeModal === 'fraud-block') {
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
                onclick="window.trustIdApp.closeModal(); window.trustIdApp.showToast('Session locked on untrusted device. Security report logged.', 'success')"
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

    if (activeModal === 'org-misuse-warning') {
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

    if (activeModal === 'forensics-inspect') {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
            <button onclick="window.trustIdApp.closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
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

    if (activeModal === 'global-privacy') {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
            <button onclick="window.trustIdApp.closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
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

    if (activeModal === 'manage-app') {
      const app = state.modalData || state.connectedApps[0];
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
            <button onclick="window.trustIdApp.closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
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

    if (activeModal === 'profile-details') {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
            <button onclick="window.trustIdApp.closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
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

    if (activeModal === 'issue-credential') {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
            <button onclick="window.trustIdApp.closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
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

    return '';
  }

  // --- 8. APPLICATION CONTROLLER CLASS ---
  class TrustIDApp {
    constructor() {
      this.state = {
        ...mockData,
        currentStakeholder: 'user', // 'user' | 'organization' | 'admin'
        currentNavId: 'identity-hub',
        userSubTab: 'overview',
        activeModal: null,
        modalData: null,
        wizardStep: 1,
        searchQuery: '',
        toast: null
      };

      window.trustIdApp = this;
    }

    init() {
      this.render();
      this.setupShortcuts();
    }

    setStakeholder(role) {
      this.state.currentStakeholder = role;
      if (role === 'user') {
        this.state.currentNavId = 'identity-hub';
      } else if (role === 'organization') {
        this.state.currentNavId = 'org-overview';
      } else if (role === 'admin') {
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

    openModal(modalName, data = null) {
      this.state.activeModal = modalName;
      this.state.modalData = data;
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

    openRegistrationModal() {
      const name = prompt("Enter Full Legal Name:", "Elena Vance") || "Elena Vance";
      const email = prompt("Enter Email Address:", "elena.vance@trustid.network") || "elena.vance@trustid.network";
      const role = prompt("Enter Stakeholder Role (user / organization / admin):", "user") || "user";
      
      this.state.user.name = name;
      this.state.user.email = email;
      this.state.user.did = "did:trust:" + Math.random().toString(16).slice(2, 18);
      this.state.user.didShort = "did:trust:" + this.state.user.did.slice(10, 14) + "..." + this.state.user.did.slice(-4);
      this.state.currentStakeholder = role.toLowerCase().includes('org') ? 'organization' : (role.toLowerCase().includes('admin') ? 'admin' : 'user');
      this.showToast(`Account registered and identity provisioned for ${name} (${this.state.currentStakeholder.toUpperCase()})`, 'success');
      this.render();
    }

    openAttestationDetails() {
      this.showToast("Hardware Enclave Tier 1: Hardware-rooted key attestation verified. Zero leaks.", "success");
    }

    toggleNotificationDrawer() {
      this.showToast("3 Real-time security events logged in last 24h. No leaks detected.", "info");
    }

    copyToClipboard(text) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          this.showToast(`Copied to clipboard: ${text.slice(0, 20)}...`, 'success');
        }).catch(() => {
          this.showToast("Copied to clipboard!", 'success');
        });
      } else {
        this.showToast("Copied to clipboard!", 'success');
      }
    }

    handleSearch(query) {
      this.state.searchQuery = query.toLowerCase();
    }

    showToast(message, type = 'info') {
      this.state.toast = { message, type };
      this.render();

      if (this.toastTimeout) clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.state.toast = null;
        this.render();
      }, 3500);
    }

    setupShortcuts() {
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

    logout() {
      const selected = prompt("Select Stakeholder to Sign In or Register as:\n1. User Identity (Elena Vance)\n2. Organization / HR (Acme Corp Enterprise)\n3. Admin Console (TrustID Global Network)", "1");
      if (selected === "1") {
        this.setStakeholder('user');
        this.showToast("Logged in to User Identity Hub", "success");
      } else if (selected === "2") {
        this.setStakeholder('organization');
        this.showToast("Logged in to Organization & HR Portal", "success");
      } else if (selected === "3") {
        this.setStakeholder('admin');
        this.showToast("Logged in to TrustID Admin Console", "success");
      }
    }

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
        <div class="w-screen h-screen flex flex-col bg-slate-100 text-slate-900 overflow-hidden antialiased select-none">
          ${renderHeader(this.state)}

          <div class="flex-1 flex overflow-hidden relative w-full h-[calc(100vh-4rem)]">
            ${renderSidebar(this.state)}

            <main class="flex-1 h-full overflow-y-auto p-6 bg-slate-100/75 min-w-0">
              ${mainContentHtml}
            </main>
          </div>
        </div>

        ${modalsHtml}
        ${toastHtml}
        ${floatingDemosHtml}
      `;

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  }

  // Auto-boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const app = new TrustIDApp();
      app.init();
    });
  } else {
    const app = new TrustIDApp();
    app.init();
  }

})();

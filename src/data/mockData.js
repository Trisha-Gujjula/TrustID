// TrustID Central Mock Data Store

export const mockData = {
  // Current active user
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

  // Verification & SSO Trend Graph Data (Mon to Today)
  trendData: [
    { day: "Mon", verifications: 14, ssoTokens: 8 },
    { day: "Tue", verifications: 28, ssoTokens: 16 },
    { day: "Wed", verifications: 22, ssoTokens: 14 },
    { day: "Thu", verifications: 42, ssoTokens: 25 },
    { day: "Fri", verifications: 68, ssoTokens: 38 },
    { day: "Sat", verifications: 34, ssoTokens: 19 },
    { day: "Today", verifications: 76, ssoTokens: 48 }
  ],

  // 8 Connected Applications for Elena Vance
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
        { name: "Work Email", type: "Required", status: "Active", selective: false },
        { name: "Organization DID", type: "Required", status: "Active", selective: false },
        { name: "Department Role", type: "Selective", status: "Active", selective: true },
        { name: "Telemetry ID", type: "Selective", status: "Zero-Knowledge", selective: true }
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
        { name: "Zero-Knowledge Income Proof", type: "Selective", status: "Zero-Knowledge", selective: true },
        { name: "Cryptographic DID Anchor", type: "Required", status: "Active", selective: false },
        { name: "Accredited Investor Attestation", type: "Selective", status: "Zero-Knowledge", selective: true }
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
        { name: "Age Verification (>21 ZK Proof)", type: "Selective", status: "Zero-Knowledge", selective: true },
        { name: "Insurance Coverage Token", type: "Required", status: "Active", selective: false }
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
        { name: "SSH Public Key Registry", type: "Required", status: "Active", selective: false },
        { name: "Engineering Role Attestation", type: "Selective", status: "Active", selective: true }
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
        { name: "Employee Dispatch Badge", type: "Selective", status: "Active", selective: true },
        { name: "Regional Node ID", type: "Required", status: "Active", selective: false }
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
        { name: "Tokenized Payment Credential", type: "Selective", status: "Zero-Knowledge", selective: true }
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
        { name: "Digital Signature Authority", type: "Required", status: "Active", selective: false }
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
        { name: "Hardware Enclave Attestation", type: "Required", status: "Active", selective: false }
      ],
      lastActive: "1 week ago",
      claimsCount: 1,
      zkEnabled: true
    }
  ],

  // Elena's Identity Wallet Credentials
  walletCredentials: [
    {
      id: "cred-emp-01",
      name: "Enterprise Staff Credential",
      issuer: "Acme Corp Trust Authority (did:trust:acme-corp)",
      issueDate: "2026-01-10",
      expiryDate: "2027-01-10",
      status: "Valid",
      type: "W3C Verifiable Credential",
      claims: {
        role: "Senior Security Architect",
        department: "Cyber Defense",
        clearance: "Tier 4 Restricted"
      }
    },
    {
      id: "cred-gov-02",
      name: "Zero-Knowledge National ID Proof",
      issuer: "Global e-Identity Commission",
      issueDate: "2025-06-15",
      expiryDate: "2030-06-15",
      status: "Valid",
      type: "BBS+ Selective Disclosure",
      claims: {
        ageOver21: true,
        citizenshipVerified: true,
        rawIdNumber: "Hidden (ZK-SNARK Proof)"
      }
    },
    {
      id: "cred-dev-03",
      name: "Hardware Security Enclave Attestation",
      issuer: "AWS Nitro & Intel SGX Root CA",
      issueDate: "2026-09-01",
      expiryDate: "2026-12-01",
      status: "Valid",
      type: "Hardware Key Proof",
      claims: {
        enclaveTier: "Hardware Tier 1",
        pcrRegisters: "0x89e21...verified"
      }
    }
  ],

  // Security Audit Log Events for User
  auditLog: [
    {
      id: "log-1",
      type: "ZK Proof Verification",
      resource: "Acme Health Portal",
      timestamp: "Today at 14:10 UTC",
      status: "Success",
      ip: "192.88.99.12",
      device: "MacBook Pro M3 Max",
      hash: "0x4a9b...7c1d"
    },
    {
      id: "log-2",
      type: "SSO Challenge-Response",
      resource: "WorkFlow AI Enterprise",
      timestamp: "Today at 12:45 UTC",
      status: "Success",
      ip: "192.88.99.12",
      device: "MacBook Pro M3 Max",
      hash: "0x3e18...92fa"
    },
    {
      id: "log-3",
      type: "Enclave Key Refresh",
      resource: "Hardware Tier 1 Enclave",
      timestamp: "Today at 08:30 UTC",
      status: "Success",
      ip: "127.0.0.1 (Local Enclave)",
      device: "Secure Element",
      hash: "0x91da...6601"
    },
    {
      id: "log-4",
      type: "Untrusted Tracker Blocked",
      resource: "External Analytics Script",
      timestamp: "Yesterday at 19:22 UTC",
      status: "Blocked",
      ip: "45.134.82.11",
      device: "Edge Privacy Shield",
      hash: "0x11cc...4490"
    }
  ],

  // ----------------------------------------------------
  // ORGANIZATION / HR STAKEHOLDER DATA
  // ----------------------------------------------------
  organization: {
    orgName: "Acme Corp Enterprise",
    orgId: "org-acme-corp-091",
    totalEmployees: 245,
    linkedTrustId: 198,
    linkedPercentage: "81%",
    alertsThisWeek: 3,
    preventedBreaches: 3,
    autoRevocationRule: "risk_score > 0.8 -> Immediate Revoke",
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
      {
        id: "emp-1",
        name: "Elena Vance",
        email: "elena.vance@acme.com",
        department: "Cyber Defense",
        did: "did:trust:9a4f...8e1b",
        status: "Active & Secure",
        credentialsIssued: 3,
        lastVerification: "12 mins ago",
        risk: "Low (0.02)"
      },
      {
        id: "emp-2",
        name: "John Smith",
        email: "john@acme.com",
        department: "Sales Operations",
        did: "did:trust:3b8c...4102",
        status: "Suspicious",
        credentialsIssued: 1,
        lastVerification: "Today 14:23",
        risk: "Critical (0.94)"
      },
      {
        id: "emp-3",
        name: "Sarah Lee",
        email: "sarah@acme.com",
        department: "Product Management",
        did: "did:trust:7f1d...99ea",
        status: "Under Review",
        credentialsIssued: 2,
        lastVerification: "Today 13:15",
        risk: "High (0.82)"
      },
      {
        id: "emp-4",
        name: "David Kim",
        email: "david.k@acme.com",
        department: "Engineering Infrastructure",
        did: "did:trust:e24a...7710",
        status: "Active & Secure",
        credentialsIssued: 4,
        lastVerification: "Yesterday",
        risk: "Low (0.04)"
      },
      {
        id: "emp-5",
        name: "Priya Patel",
        email: "priya.p@acme.com",
        department: "Human Resources",
        did: "did:trust:8c90...223f",
        status: "Active & Secure",
        credentialsIssued: 2,
        lastVerification: "2 days ago",
        risk: "Low (0.01)"
      }
    ],
    approvedSites: [
      { url: "https://acme.enterprise.com", name: "Acme Intranet Portal", approvedAt: "2025-01-15", claimsAllowed: "Full SSO" },
      { url: "https://github.com/acme-corp", name: "Enterprise GitHub Org", approvedAt: "2025-02-01", claimsAllowed: "SSH Key, Dev DID" },
      { url: "https://acme.slack.com", name: "Corporate Slack", approvedAt: "2025-01-20", claimsAllowed: "Work Email" },
      { url: "https://atlassian.net/acme", name: "Jira & Confluence", approvedAt: "2025-03-10", claimsAllowed: "Work Email, Role" },
      { url: "https://aws.amazon.com/console", name: "AWS Production Cloud", approvedAt: "2025-04-05", claimsAllowed: "Hardware Enclave Cert" }
    ]
  },

  // ----------------------------------------------------
  // ADMIN CONSOLE STAKEHOLDER DATA
  // ----------------------------------------------------
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
    phishingBlacklist: [
      { domain: "amazoon.com", target: "amazon.com", ageDays: 3, sslValid: false, trustScore: 0.04, flaggedBy: "ML Similarity Engine" },
      { domain: "internal-sharepoint-fake.co", target: "sharepoint.com", ageDays: 1, sslValid: false, trustScore: 0.01, flaggedBy: "Org Threat Scanner" },
      { domain: "paypa1-secure-verify.net", target: "paypal.com", ageDays: 5, sslValid: true, trustScore: 0.08, flaggedBy: "PhishTank API" },
      { domain: "acmee-login-portal.site", target: "acme.enterprise.com", ageDays: 2, sslValid: false, trustScore: 0.02, flaggedBy: "Heuristic AI" }
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

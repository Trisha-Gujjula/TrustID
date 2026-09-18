import React, { useState, useEffect, useMemo } from 'react';
import { mockData } from './data/mockData.js';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import UserIdentityView from './components/UserIdentityView.jsx';
import OrganizationView from './components/OrganizationView.jsx';
import AdminConsoleView from './components/AdminConsoleView.jsx';
import Modals from './components/Modals.jsx';
import AuthPage from './components/AuthPage.jsx';
import { Key, AlertTriangle, ShieldAlert, Building, CheckCircle, AlertOctagon, Info, UserPlus } from 'lucide-react';
import { 
  getActiveSession, 
  saveActiveSession, 
  clearActiveSession, 
  fetchUserDynamicData, 
  getStoredUsers,
  getUserDocuments,
  addUserDocument,
  removeUserDocument
} from './utils/authStorage.js';
import RegistrationPage from './components/RegistrationPage.jsx';

export default function App() {
  const [data, setData] = useState(mockData);
  // Default to false so first-time visitors always see the Login / Registration portal
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getActiveSession());
  const [isRegisterOpen, setIsRegisterOpen] = useState(() => {
    return window.location.hash === '#register';
  });
  const [currentStakeholder, setCurrentStakeholder] = useState('user'); // 'user' | 'organization' | 'admin'
  const [currentNavId, setCurrentNavId] = useState('identity-hub');
  const [userSubTab, setUserSubTab] = useState('overview');
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [toast, setToast] = useState(null);

  // User Identity Wallet Documents & Sovereign Authority
  const [walletDocuments, setWalletDocuments] = useState(() => {
    const session = getActiveSession();
    return getUserDocuments(session?.id);
  });

  // Restore session and synchronize URL hash routing
  useEffect(() => {
    const handleHashSync = () => {
      const rawHash = window.location.hash || '';
      const cleanHash = rawHash.replace(/^#\/?/, '').toLowerCase();
      const session = getActiveSession();

      if (cleanHash === 'register') {
        setIsRegisterOpen(true);
        return;
      }

      if (cleanHash === 'login') {
        setIsRegisterOpen(false);
        if (!session) {
          setIsAuthenticated(false);
        }
        return;
      }

      // If user has NO active session, enforce route guard redirecting to #login or #register
      if (!session) {
        setIsAuthenticated(false);
        setIsRegisterOpen(false);
        if (cleanHash !== 'login' && cleanHash !== 'register') {
          window.location.hash = '#login';
        }
        return;
      }

      // Session exists: restore authentication and route
      setIsAuthenticated(true);
      setIsRegisterOpen(false);

      if (cleanHash === 'org-overview' || cleanHash === 'organization') {
        setCurrentStakeholder('organization');
        setCurrentNavId('org-overview');
      } else if (cleanHash === 'admin-overview' || cleanHash === 'admin') {
        setCurrentStakeholder('admin');
        setCurrentNavId('admin-overview');
      } else if (cleanHash === 'wallet-docs') {
        setCurrentStakeholder('user');
        setCurrentNavId('wallet-docs');
        setUserSubTab('wallet-docs');
      } else if (cleanHash && cleanHash !== 'user') {
        setCurrentNavId(cleanHash);
      }
    };

    // Initialize session state on mount
    const session = getActiveSession();
    if (session) {
      setCurrentStakeholder(session.role || 'user');
      setWalletDocuments(getUserDocuments(session.id));
      setData(prev => ({
        ...prev,
        user: {
          ...prev.user,
          id: session.id || prev.user.id,
          name: session.name || prev.user.name,
          role: session.title || session.role || prev.user.role,
          email: session.email || prev.user.email,
          avatar: session.avatar || prev.user.avatar,
          did: session.did || prev.user.did,
          didShort: session.didShort || prev.user.didShort,
          fingerprint: session.fingerprint || prev.user.fingerprint
        }
      }));

      if (session.role === 'organization') setCurrentNavId('org-overview');
      else if (session.role === 'admin') setCurrentNavId('admin-overview');
      else setCurrentNavId('identity-hub');

      setIsAuthenticated(true);

      // Attempt live backend synchronization
      fetchUserDynamicData(session.id || session.email).then(dyn => {
        if (dyn && dyn.user) {
          setData(d => ({ ...d, user: { ...d.user, ...dyn.user } }));
        }
      }).catch(() => {});
    } else {
      setIsAuthenticated(false);
      if (!window.location.hash || window.location.hash === '#/') {
        window.location.hash = '#login';
      }
    }

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const handleLoginSuccess = async (role, userObj) => {
    setCurrentStakeholder(role);
    saveActiveSession(userObj);
    setIsRegisterOpen(false);
    setIsAuthenticated(true);
    setWalletDocuments(getUserDocuments(userObj.id));

    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        id: userObj.id || prev.user.id,
        name: userObj.name,
        role: userObj.title || userObj.role,
        email: userObj.email || prev.user.email,
        avatar: userObj.avatar,
        did: userObj.did,
        didShort: userObj.didShort,
        fingerprint: userObj.fingerprint || prev.user.fingerprint
      }
    }));

    let targetNav = 'identity-hub';
    if (role === 'organization') targetNav = 'org-overview';
    if (role === 'admin') targetNav = 'admin-overview';

    setCurrentNavId(targetNav);
    window.location.hash = `#${targetNav}`;

    showToast(`Identity verified and signed in as ${userObj.name} (${role.toUpperCase()})`, 'success');

    // Dynamically fetch live dashboard stats from FastAPI backend
    try {
      const dynamicData = await fetchUserDynamicData(userObj.id || userObj.email);
      if (dynamicData && dynamicData.user) {
        setData(prev => ({
          ...prev,
          user: {
            ...prev.user,
            ...dynamicData.user
          }
        }));
        showToast("Live database profile and verifiable credentials synced.", "info");
      }
    } catch (_) {}
  };

  const handleLogout = () => {
    clearActiveSession();
    setIsAuthenticated(false);
    setIsRegisterOpen(false);
    window.location.hash = '#login';
    showToast("Signed out. Select a stakeholder to register or sign in.", "info");
  };

  const handleStakeholderChange = (role) => {
    setCurrentStakeholder(role);
    let targetNav = 'identity-hub';
    if (role === 'organization') targetNav = 'org-overview';
    if (role === 'admin') targetNav = 'admin-overview';
    setCurrentNavId(targetNav);
    window.location.hash = `#${targetNav}`;
  };

  const handleNavChange = (navId) => {
    setCurrentNavId(navId);
    window.location.hash = `#${navId}`;
    if (currentStakeholder === 'user') {
      if (navId === 'identity-hub') setUserSubTab('overview');
      if (navId === 'wallet-docs') setUserSubTab('wallet-docs');
      if (navId === 'connected-apps') setUserSubTab('connected-apps');
      if (navId === 'permission-intel') setUserSubTab('permission-intelligence');
      if (navId === 'security-log' || navId === 'identity-analytics') setUserSubTab('security-insights');
    }
  };

  // User Document Authority Actions
  const handleAddDocument = (newDoc) => {
    const session = getActiveSession();
    const updated = addUserDocument(session?.id, newDoc);
    setWalletDocuments(updated);
    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        selectiveClaims: (prev.user.selectiveClaims || 12) + 3,
        safetyScore: Math.min(100, (prev.user.safetyScore || 98) + 1)
      }
    }));
    showToast(`Valid document "${newDoc.name}" cryptographically anchored to your wallet!`, 'success');
  };

  const handleRemoveDocument = (docId) => {
    const session = getActiveSession();
    const updated = removeUserDocument(session?.id, docId);
    setWalletDocuments(updated);
    showToast("Document credential removed from decentralized wallet.", "info");
  };

  const handleViewCredentialProof = (doc) => {
    setModalData(doc);
    setActiveModal('view-credential-proof');
  };

  const handleOpenAddDocument = () => {
    setActiveModal('add-document');
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text.slice(0, 20)}...`, 'success');
      }).catch(() => {
        showToast("Copied to clipboard!", 'success');
      });
    } else {
      showToast("Copied to clipboard!", 'success');
    }
  };

  const handleDownloadSummary = () => {
    const summary = {
      user: data.user,
      enclaveAttestation: "Hardware Tier 1 (AWS Nitro & Intel SGX)",
      zkAssurance: "100% Zero-Knowledge Verified",
      timestamp: new Date().toISOString(),
      blockchainAnchor: "Polygon Amoy Block #14,892,104",
      connectedServices: data.connectedApps.map(a => ({ name: a.name, permissions: a.permissions }))
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

    showToast("Cryptographic activity summary exported successfully!", "success");
  };

  const handleRevokeCredential = (credId, employeeName) => {
    setData(prev => ({
      ...prev,
      organization: {
        ...prev.organization,
        activeAlerts: prev.organization.activeAlerts.filter(a => a.credentialId !== credId)
      }
    }));
    showToast(`Revoked credentials for ${employeeName}. Session invalidated.`, 'success');
  };

  const handleRevokeApp = (appId) => {
    setData(prev => ({
      ...prev,
      connectedApps: prev.connectedApps.filter(a => a.id !== appId),
      user: {
        ...prev.user,
        connectedAppsCount: prev.connectedApps.length - 1
      }
    }));
    setActiveModal(null);
    showToast('Application access revoked and session keys purged.', 'success');
  };

  const handleAddWhitelist = () => {
    const site = prompt("Enter domain to whitelist for company credentials:", "https://confluence.acme.com");
    if (site) {
      setData(prev => ({
        ...prev,
        organization: {
          ...prev.organization,
          approvedSites: [
            ...prev.organization.approvedSites,
            {
              url: site,
              name: "Enterprise Whitelist Entry",
              approvedAt: new Date().toISOString().split('T')[0],
              claimsAllowed: "Standard Corporate SSO"
            }
          ]
        }
      }));
      showToast(`Added ${site} to corporate whitelist!`, 'success');
    }
  };

  const handleRemoveApprovedSite = (url) => {
    setData(prev => ({
      ...prev,
      organization: {
        ...prev.organization,
        approvedSites: prev.organization.approvedSites.filter(s => s.url !== url)
      }
    }));
    showToast(`Removed ${url} from whitelist.`, 'info');
  };

  // Dynamically compute employee directory and admin metrics including newly registered users
  const dynamicOrganization = useMemo(() => {
    const baseEmployees = [...data.organization.employees];
    const registered = getStoredUsers();
    registered.forEach(u => {
      if (u.role === 'user' && !baseEmployees.some(b => b.email.toLowerCase() === u.email.toLowerCase())) {
        baseEmployees.unshift({
          id: u.id,
          name: u.name,
          email: u.email,
          department: "Cyber Defense & Identity",
          did: u.didShort || u.did || "did:trust:...",
          status: "Active & Verified",
          credentialsIssued: 4,
          lastVerification: "Just now",
          risk: "Low (0.01)"
        });
      }
    });

    return {
      ...data.organization,
      employees: baseEmployees,
      totalEmployees: 245 + Math.max(0, baseEmployees.length - 5)
    };
  }, [data.organization]);

  const dynamicAdmin = useMemo(() => {
    const registered = getStoredUsers();
    return {
      ...data.admin,
      registeredDIDsCount: (18429 + registered.length).toLocaleString()
    };
  }, [data.admin]);

  // If user opens the dedicated registration page
  if (isRegisterOpen) {
    return (
      <RegistrationPage 
        onRegisterSuccess={handleLoginSuccess}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          window.location.hash = '#login';
        }}
      />
    );
  }

  // If not authenticated, render the AuthPage with registration for each stakeholder
  if (!isAuthenticated) {
    return (
      <AuthPage 
        onLoginSuccess={handleLoginSuccess}
        onOpenRegister={() => {
          setIsRegisterOpen(true);
          window.location.hash = '#register';
        }}
      />
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-100 text-slate-900 overflow-hidden antialiased select-none">
      {/* Full Width Top Header */}
      <Header 
        currentStakeholder={currentStakeholder}
        onStakeholderChange={handleStakeholderChange}
        user={data.user}
        onOpenNotifications={() => showToast("3 Security events logged in last 24h. No leaks detected.", "info")}
        onOpenProfile={() => setActiveModal('profile-details')}
        onCopyDid={copyToClipboard}
        onOpenRegister={() => {
          setIsRegisterOpen(true);
          window.location.hash = '#register';
        }}
      />

      {/* Full-Height Workspace Container */}
      <div className="flex-1 flex overflow-hidden relative w-full h-[calc(100vh-4rem)]">
        {/* Sidebar Covering Complete Vertical Height */}
        <Sidebar 
          currentStakeholder={currentStakeholder}
          currentNavId={currentNavId}
          onNavChange={handleNavChange}
          onVerifyAttestation={() => showToast("Hardware Enclave Tier 1: Key attestation verified. Zero leaks.", "success")}
          onLogout={handleLogout}
          onOpenRegister={() => {
            setIsRegisterOpen(true);
            window.location.hash = '#register';
          }}
          walletDocumentsCount={walletDocuments.length}
        />

        {/* Scrollable Main Workspace Area */}
        <main className="flex-1 h-full overflow-y-auto p-6 bg-slate-100/75 min-w-0">
          {currentStakeholder === 'user' && (
            <UserIdentityView 
              user={data.user}
              trendData={data.trendData}
              connectedApps={data.connectedApps}
              walletDocuments={walletDocuments}
              userSubTab={userSubTab}
              onSubTabChange={setUserSubTab}
              onDownloadSummary={handleDownloadSummary}
              onVerifyCredentials={() => {
                setWizardStep(1);
                setActiveModal('verification-wizard');
              }}
              onOpenAddDocument={handleOpenAddDocument}
              onViewCredentialProof={handleViewCredentialProof}
              onRemoveDocument={handleRemoveDocument}
              onOpenGlobalPrivacy={() => setActiveModal('global-privacy')}
              onManageApp={(app) => {
                setModalData(app);
                setActiveModal('manage-app');
              }}
              onCopyDid={copyToClipboard}
            />
          )}

          {currentStakeholder === 'organization' && (
            <OrganizationView 
              organization={dynamicOrganization}
              onAddWhitelist={handleAddWhitelist}
              onIssueCredential={() => setActiveModal('issue-credential')}
              onSimulateMisuse={() => setActiveModal('org-misuse-warning')}
              onRevokeCredential={handleRevokeCredential}
              onForcePasswordReset={(email) => showToast(`Encrypted reset email sent to ${email}`, 'info')}
              onInvestigateAlert={(id) => showToast(`Investigation ticket opened for alert ${id}`, 'info')}
              onRemoveApprovedSite={handleRemoveApprovedSite}
              onManageEmployee={(emp) => showToast(`Viewing credentials for ${emp.name}`, 'info')}
            />
          )}

          {currentStakeholder === 'admin' && (
            <AdminConsoleView 
              admin={dynamicAdmin}
              onSimulatePhishing={() => setActiveModal('phishing-warning')}
              onSimulateFraud={() => setActiveModal('fraud-block')}
              onInspectEvidence={(id, type) => {
                setModalData({ id, type });
                setActiveModal('forensics-inspect');
              }}
              onVerifyBlockchain={() => showToast("Querying Polygon Amoy node... Merkle state tree verified! All 18,429 DIDs valid.", "success")}
              onCopyHash={copyToClipboard}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <Modals 
        activeModal={activeModal}
        modalData={modalData}
        user={data.user}
        wizardStep={wizardStep}
        onClose={() => setActiveModal(null)}
        onAdvanceWizard={setWizardStep}
        onShowToast={showToast}
        onRevokeApp={handleRevokeApp}
        walletDocuments={walletDocuments}
        onAddDocument={handleAddDocument}
        onRemoveDocument={handleRemoveDocument}
        onViewCredentialProof={handleViewCredentialProof}
      />

      {/* Toast Feedback */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold modal-pop-in ${
          toast.type === 'success' 
            ? 'bg-emerald-900 text-white border-emerald-700' 
            : (toast.type === 'error' ? 'bg-rose-900 text-white border-rose-700' : 'bg-slate-900 text-white border-slate-700')
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : toast.type === 'error' ? (
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          ) : (
            <Info className="w-4 h-4 text-emerald-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Floating Demo Toolset */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900/90 text-white px-4 py-2 rounded-full border border-slate-700 shadow-2xl backdrop-blur-md flex items-center gap-2 select-none">
        <span className="text-[10px] uppercase font-mono font-bold text-slate-400 mr-1 hidden sm:inline">Demo Lab:</span>
        <button 
          onClick={() => setActiveModal('external-register-demo')}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-700 hover:bg-emerald-600 text-white transition-all flex items-center gap-1"
          title="Simulate Register with TrustID button on external website"
        >
          <Key className="w-3 h-3" />
          <span>Register with TrustID</span>
        </button>

        <button 
          onClick={() => setActiveModal('phishing-warning')}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-700 hover:bg-rose-600 text-white transition-all flex items-center gap-1"
          title="Simulate detection of typosquatting fake website"
        >
          <AlertTriangle className="w-3 h-3" />
          <span>Phishing Check</span>
        </button>

        <button 
          onClick={() => setActiveModal('fraud-block')}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-700 hover:bg-amber-600 text-white transition-all flex items-center gap-1"
          title="Simulate 1000km velocity anomaly fraud detection"
        >
          <ShieldAlert className="w-3 h-3" />
          <span>Fraud Detection</span>
        </button>

        <button 
          onClick={() => setActiveModal('org-misuse-warning')}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-700 hover:bg-blue-600 text-white transition-all flex items-center gap-1"
          title="Simulate unauthorized company credential detection"
        >
          <Building className="w-3 h-3" />
          <span>Org Misuse</span>
        </button>

        <button 
          onClick={() => {
            setIsRegisterOpen(true);
            window.location.hash = '#register';
          }}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-700 hover:bg-emerald-600 text-white transition-all flex items-center gap-1 ml-1"
          title="Open Dedicated Registration Page"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Register Page</span>
        </button>

        <button 
          onClick={handleLogout}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all ml-1"
          title="Test Registration & Login Flow"
        >
          <span>Sign In / Accounts</span>
        </button>
      </div>
    </div>
  );
}

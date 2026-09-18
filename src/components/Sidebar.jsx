import React from 'react';
import { 
  Fingerprint, 
  Building, 
  Server, 
  ChevronsUpDown, 
  Shield, 
  Network, 
  SlidersHorizontal, 
  ShieldAlert, 
  TrendingUp, 
  Settings, 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  FileText, 
  Activity, 
  Cpu, 
  Zap, 
  Ban, 
  Database, 
  Key, 
  LogOut,
  UserPlus,
  CreditCard
} from 'lucide-react';

export default function Sidebar({ 
  currentStakeholder, 
  currentNavId, 
  onNavChange, 
  onVerifyAttestation, 
  onLogout,
  onOpenRegister,
  walletDocumentsCount = 4
}) {
  let spaceTitle = "Personal Identity";
  let SpaceIcon = Fingerprint;
  let menuItems = [];

  if (currentStakeholder === 'user') {
    spaceTitle = "Personal Identity";
    SpaceIcon = Fingerprint;
    menuItems = [
      { id: "identity-hub", label: "Identity Hub", icon: Shield, badge: null },
      { id: "wallet-docs", label: "Identity Wallet & Docs", icon: CreditCard, badge: `${walletDocumentsCount} Valid`, badgeType: "green" },
      { id: "connected-apps", label: "Connected Apps & SSO", icon: Network, badge: "8" },
      { id: "permission-intel", label: "Permission Intelligence", icon: SlidersHorizontal, badge: "Auto", badgeType: "green" },
      { id: "security-log", label: "Security & Activity Log", icon: ShieldAlert, badge: null },
      { id: "identity-analytics", label: "Identity Analytics", icon: TrendingUp, badge: null },
      { id: "settings", label: "Settings", icon: Settings, badge: null }
    ];
  } else if (currentStakeholder === 'organization') {
    spaceTitle = "Acme Corp Enterprise";
    SpaceIcon = Building;
    menuItems = [
      { id: "org-overview", label: "Organization Overview", icon: LayoutDashboard, badge: null },
      { id: "employee-dids", label: "Employee DIDs & Directory", icon: Users, badge: "245" },
      { id: "misuse-radar", label: "Credential Misuse Radar", icon: AlertTriangle, badge: "3 Alerts", badgeType: "amber" },
      { id: "approved-apps", label: "Approved Applications", icon: CheckCircle, badge: "5", badgeType: "gray" },
      { id: "org-policies", label: "Security Policies", icon: Lock, badge: null },
      { id: "org-audit", label: "Compliance & Audit", icon: FileText, badge: null }
    ];
  } else if (currentStakeholder === 'admin') {
    spaceTitle = "TrustID Network Core";
    SpaceIcon = Server;
    menuItems = [
      { id: "admin-overview", label: "Network Overview", icon: Activity, badge: null },
      { id: "enclave-nodes", label: "Enclave Nodes (Tier 1)", icon: Cpu, badge: "12/12", badgeType: "green" },
      { id: "fraud-engine", label: "Fraud & Velocity Engine", icon: Zap, badge: "Active", badgeType: "green" },
      { id: "phishing-blacklist", label: "Phishing Blacklist", icon: Ban, badge: "1,420" },
      { id: "blockchain-ledger", label: "Forensics Ledger (Amoy)", icon: Database, badge: null },
      { id: "governance", label: "Key Ceremony & Policies", icon: Key, badge: null }
    ];
  }

  return (
    <aside className="w-64 md:w-72 bg-white border-r border-slate-200 p-5 flex flex-col justify-between select-none shrink-0 h-full overflow-y-auto z-10">
      {/* Top Group: Current Space & Navigation */}
      <div className="flex flex-col gap-4">
        {/* Current Space Box */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-all">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <SpaceIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400">CURRENT SPACE</div>
              <div className="text-xs font-bold text-slate-800">{spaceTitle}</div>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Menu Section Header */}
        <div>
          <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            MENU
          </div>

          {/* Navigation Items List */}
          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = currentNavId === item.id || (!currentNavId && item.id === menuItems[0].id);

              return (
                <button
                  key={item.id}
                  id={`menu-nav-${item.id}`}
                  onClick={() => onNavChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-900 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    item.badgeType === 'green' ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">{item.badge}</span>
                    ) : item.badgeType === 'amber' ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">{item.badge}</span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200">{item.badge}</span>
                    )
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Group: Hardware Enclave & Logout pinned to bottom */}
      <div className="flex flex-col gap-3 pt-4 mt-auto border-t border-slate-100">
        {/* Enclave Hardware Status Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-200/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-active" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Hardware Enclave</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-tight">Tier 1 SGX / Nitro isolated cryptoprocessor bound to local DID.</p>
          <button 
            onClick={onVerifyAttestation}
            className="mt-2.5 w-full text-[11px] font-semibold py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verify Attestation</span>
          </button>
        </div>

        {/* Dedicated Register Action */}
        <button 
          id="sidebar-btn-register"
          onClick={onOpenRegister}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200/80 transition-all shadow-2xs"
        >
          <UserPlus className="w-3.5 h-3.5 text-emerald-700" />
          <span>+ Register Stakeholder</span>
        </button>

        {/* Sign Out / Switch Stakeholder button */}
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-700 hover:bg-rose-50/80 border border-slate-200/80 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Switch Account / Logout</span>
        </button>
      </div>
    </aside>
  );
}

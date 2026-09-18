import React from 'react';
import { 
  ShieldCheck, 
  User, 
  Building2, 
  Sliders, 
  Search, 
  Bell, 
  Copy,
  UserPlus
} from 'lucide-react';

export default function Header({ 
  currentStakeholder, 
  onStakeholderChange, 
  user, 
  onOpenNotifications, 
  onOpenProfile, 
  onCopyDid,
  onOpenRegister
}) {
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

  return (
    <header className="w-full h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 select-none shrink-0 z-20">
      {/* Left: Logo and Hub Identity */}
      <div className="flex items-center gap-3 min-w-[240px]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20">
          <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-slate-900">TrustID</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200 tracking-wide uppercase">
              {hubTag}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium tracking-tight">Decentralized Identity & Security</p>
        </div>
      </div>

      {/* Center: 3 Stakeholder Switcher Pill + Active Shield Status */}
      <div className="flex items-center gap-3">
        <div className="bg-slate-100/90 p-1 rounded-full border border-slate-200 flex items-center gap-1 shadow-inner">
          <button 
            id="tab-btn-user"
            onClick={() => onStakeholderChange('user')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentStakeholder === 'user' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className={`w-3.5 h-3.5 ${currentStakeholder === 'user' ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>User Identity</span>
            {currentStakeholder === 'user' && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-active ml-0.5" />
            )}
          </button>

          <button 
            id="tab-btn-org"
            onClick={() => onStakeholderChange('organization')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentStakeholder === 'organization' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className={`w-3.5 h-3.5 ${currentStakeholder === 'organization' ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>Organization / HR</span>
            {currentStakeholder === 'organization' && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-active ml-0.5" />
            )}
          </button>

          <button 
            id="tab-btn-admin"
            onClick={() => onStakeholderChange('admin')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentStakeholder === 'admin' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className={`w-3.5 h-3.5 ${currentStakeholder === 'admin' ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>Admin Console</span>
            {currentStakeholder === 'admin' && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-active ml-0.5" />
            )}
          </button>
        </div>

        {/* Security Status Badge */}
        <div className={`hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${statusBg}`}>
          <span className={`w-2 h-2 rounded-full ${statusDot} pulse-active`} />
          <span>{statusText}</span>
        </div>

        {/* Dedicated Register Stakeholder Action */}
        <button 
          id="header-btn-register"
          onClick={onOpenRegister}
          className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-all shadow-2xs hover:shadow-xs"
          title="Create a new User or Organization account"
        >
          <UserPlus className="w-3.5 h-3.5 text-emerald-700" />
          <span>+ Register Stakeholder</span>
        </button>
      </div>

      {/* Right: Search Bar, Notifications, User Chip */}
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            id="header-search-input"
            placeholder="Search services, DID..."
            className="w-56 lg:w-64 pl-9 pr-10 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-xs">⌘K</kbd>
          </div>
        </div>

        <button 
          id="btn-notifications"
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all border border-slate-200"
          title="Security Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
        </button>

        <div 
          onClick={onOpenProfile}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-all"
          title="Click to view Identity Details"
        >
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/40"
          />
          <div className="text-left leading-tight hidden sm:block">
            <div className="text-xs font-semibold text-slate-800">{user.name}</div>
            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
              <span>{user.didShort}</span>
              <Copy 
                className="w-2.5 h-2.5 text-slate-400 hover:text-emerald-600" 
                onClick={(e) => {
                  e.stopPropagation();
                  onCopyDid(user.did);
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

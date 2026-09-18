import React, { useState } from 'react';
import { 
  Download, 
  ShieldCheck, 
  LayoutGrid, 
  Share2, 
  SlidersHorizontal, 
  ShieldAlert, 
  Fingerprint, 
  CheckCircle, 
  Copy, 
  Grid, 
  EyeOff, 
  Shield, 
  TrendingUp, 
  PieChart, 
  Sliders, 
  ArrowRight,
  CreditCard,
  Plus,
  FileText,
  Lock,
  ExternalLink,
  Check,
  Award,
  Search,
  Trash2,
  FileCheck
} from 'lucide-react';

export default function UserIdentityView({ 
  user, 
  trendData, 
  connectedApps, 
  walletDocuments = [],
  userSubTab, 
  onSubTabChange, 
  onDownloadSummary, 
  onVerifyCredentials, 
  onOpenAddDocument,
  onViewCredentialProof,
  onRemoveDocument,
  onOpenGlobalPrivacy, 
  onManageApp, 
  onCopyDid 
}) {
  const [docFilter, setDocFilter] = useState('All');
  const [docSearch, setDocSearch] = useState('');

  const filteredDocs = (walletDocuments || []).filter(doc => {
    const matchesCategory = docFilter === 'All' || doc.category === docFilter;
    const matchesSearch = !docSearch || 
      doc.name.toLowerCase().includes(docSearch.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(docSearch.toLowerCase()) ||
      (doc.documentNumber && doc.documentNumber.toLowerCase().includes(docSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Greeting Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, {user.name}</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-active" />
              Active & Protected
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal">
            Manage your decentralized credentials, exercise authority to add valid identity documents, and control zero-knowledge privacy.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button 
            onClick={onDownloadSummary}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2 shadow-2xs bg-white"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Activity Summary</span>
          </button>

          <button 
            onClick={onOpenAddDocument}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-xs font-semibold text-white transition-all flex items-center gap-2 shadow-2xs"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>+ Add Valid Document</span>
          </button>
          
          <button 
            onClick={onVerifyCredentials}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold text-white transition-all flex items-center gap-2 shadow-sm shadow-emerald-700/20"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Credentials</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Tabs Navigation */}
      <div className="border-b border-slate-200 flex items-center gap-6 sm:gap-8 px-2 text-xs font-semibold text-slate-500 select-none overflow-x-auto">
        <button 
          onClick={() => onSubTabChange('overview')}
          className={`pb-3 flex items-center gap-2 transition-all relative shrink-0 ${
            userSubTab === 'overview' ? 'text-emerald-800 font-bold' : 'hover:text-slate-800'
          }`}
        >
          <LayoutGrid className={`w-4 h-4 ${userSubTab === 'overview' ? 'text-emerald-700' : 'text-slate-400'}`} />
          <span>Overview & Analytics</span>
          {userSubTab === 'overview' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
          )}
        </button>

        <button 
          onClick={() => onSubTabChange('wallet-docs')}
          className={`pb-3 flex items-center gap-2 transition-all relative shrink-0 ${
            userSubTab === 'wallet-docs' ? 'text-emerald-800 font-bold' : 'hover:text-slate-800'
          }`}
        >
          <CreditCard className={`w-4 h-4 ${userSubTab === 'wallet-docs' ? 'text-emerald-700' : 'text-slate-400'}`} />
          <span>Identity Wallet & Docs ({walletDocuments.length})</span>
          {userSubTab === 'wallet-docs' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
          )}
        </button>

        <button 
          onClick={() => onSubTabChange('connected-apps')}
          className={`pb-3 flex items-center gap-2 transition-all relative shrink-0 ${
            userSubTab === 'connected-apps' ? 'text-emerald-800 font-bold' : 'hover:text-slate-800'
          }`}
        >
          <Share2 className={`w-4 h-4 ${userSubTab === 'connected-apps' ? 'text-emerald-700' : 'text-slate-400'}`} />
          <span>Connected Apps ({connectedApps.length})</span>
          {userSubTab === 'connected-apps' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
          )}
        </button>

        <button 
          onClick={() => onSubTabChange('permission-intelligence')}
          className={`pb-3 flex items-center gap-2 transition-all relative shrink-0 ${
            userSubTab === 'permission-intelligence' ? 'text-emerald-800 font-bold' : 'hover:text-slate-800'
          }`}
        >
          <SlidersHorizontal className={`w-4 h-4 ${userSubTab === 'permission-intelligence' ? 'text-emerald-700' : 'text-slate-400'}`} />
          <span>Permission Intelligence</span>
          {userSubTab === 'permission-intelligence' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
          )}
        </button>

        <button 
          onClick={() => onSubTabChange('security-insights')}
          className={`pb-3 flex items-center gap-2 transition-all relative shrink-0 ${
            userSubTab === 'security-insights' ? 'text-emerald-800 font-bold' : 'hover:text-slate-800'
          }`}
        >
          <ShieldAlert className={`w-4 h-4 ${userSubTab === 'security-insights' ? 'text-emerald-700' : 'text-slate-400'}`} />
          <span>Security Insights</span>
          {userSubTab === 'security-insights' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
          )}
        </button>
      </div>

      {/* VIEW A: OVERVIEW TAB */}
      {userSubTab === 'overview' && (
        <>
          {/* 3. Four Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: IDENTITY STATUS */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">IDENTITY STATUS</span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Fingerprint className="w-4 h-4" />
                </div>
              </div>
              <div className="my-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">{user.status}</span>
                  <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1 flex items-center gap-1.5">
                  <span>{user.didShort}</span>
                  <button 
                    onClick={() => onCopyDid(user.did)}
                    className="text-slate-400 hover:text-emerald-700"
                    title="Copy full DID"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Enclave: {user.enclaveTier}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active</span>
              </div>
            </div>

            {/* Card 2: WALLET DOCUMENTS & CREDENTIALS */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">IDENTITY WALLET</span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="my-3">
                <div className="text-lg font-bold text-slate-900">{walletDocuments.length} Valid Documents</div>
                <div className="text-[11px] text-slate-500 mt-1">100% Zero-Knowledge • Anchored</div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <button 
                  onClick={onOpenAddDocument}
                  className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Add Document</span>
                </button>
                <button 
                  onClick={() => onSubTabChange('wallet-docs')}
                  className="text-slate-400 hover:text-slate-700 font-medium"
                >
                  View Wallet →
                </button>
              </div>
            </div>

            {/* Card 3: PRIVACY SHIELD */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">PRIVACY SHIELD</span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <EyeOff className="w-4 h-4" />
                </div>
              </div>
              <div className="my-3">
                <div className="text-lg font-bold text-slate-900">{user.zkAssurance}</div>
                <div className="text-[11px] text-slate-500 mt-1">Selective disclosure enabled on all apps</div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Raw Personal Data Shared</span>
                <span className="font-bold text-slate-900">{user.rawPersonalDataShared}</span>
              </div>
            </div>

            {/* Card 4: SAFETY SCORE */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">SAFETY SCORE</span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
              </div>
              <div className="my-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">{user.safetyScore} / 100</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {user.safetyRating}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Biometric Passkey + Enclave Active</div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Threat Status</span>
                <span className="font-bold text-emerald-700">{user.threatStatus}</span>
              </div>
            </div>
          </div>

          {/* 4. Middle Analytics Row (Trends & Donut) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Activity Trends SVG */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Activity & Verification Trends</h3>
                    <p className="text-[11px] text-slate-500">Identity attestations & silent zero-knowledge checks over the last 7 days</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                    <span>Verifications</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                    <span>SSO Tokens</span>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-44 mt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="react-grad-verifications" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#167a4e" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#167a4e" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="react-grad-sso" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="80" x2="600" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="130" x2="600" y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                  {/* SSO Tokens Curve */}
                  <path d="M 20 120 Q 90 95, 170 105 T 320 85 T 420 50 T 510 110 T 580 40 L 580 155 L 20 155 Z" fill="url(#react-grad-sso)" />
                  <path d="M 20 120 Q 90 95, 170 105 T 320 85 T 420 50 T 510 110 T 580 40" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Verifications Curve */}
                  <path d="M 20 110 Q 90 85, 170 95 T 320 65 T 420 25 T 510 95 T 580 18 L 580 155 L 20 155 Z" fill="url(#react-grad-verifications)" />
                  <path d="M 20 110 Q 90 85, 170 95 T 320 65 T 420 25 T 510 95 T 580 18" fill="none" stroke="#167a4e" strokeWidth="2.75" strokeLinecap="round" />

                  <circle cx="20" cy="110" r="3.5" fill="#167a4e" />
                  <circle cx="170" cy="95" r="3.5" fill="#167a4e" />
                  <circle cx="320" cy="65" r="3.5" fill="#167a4e" />
                  <circle cx="420" cy="25" r="3.5" fill="#167a4e" />
                  <circle cx="510" cy="95" r="3.5" fill="#167a4e" />
                  <circle cx="580" cy="18" r="4.5" fill="#167a4e" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 px-2 mt-3 pt-2 border-t border-slate-100">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span className="font-bold text-emerald-800">Today</span>
              </div>
            </div>

            {/* Scope Donut Chart */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Scope Breakdown</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Optimal
                </span>
              </div>

              <div className="flex items-center justify-around my-4">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-emerald-700" strokeDasharray="75, 100" strokeWidth="4.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-emerald-400" strokeDasharray="25, 100" strokeDashoffset="-75" strokeWidth="4.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-slate-900 leading-none">16</span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">CLAIMS</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-700" />
                      <span>12 Selective</span>
                    </div>
                    <div className="text-[10px] text-slate-400 ml-3.5">Optional user claims</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>4 Required</span>
                    </div>
                    <div className="text-[10px] text-slate-400 ml-3.5">Core auth tokens</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span>0 Overprivileged</span>
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold ml-3.5">All clean</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Overprivileged alerts</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">None detected</span>
              </div>
            </div>
          </div>

          {/* SPOTLIGHT: IDENTITY WALLET DOCUMENTS (USER AUTHORITY) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Decentralized Wallet Documents ({walletDocuments.length})</h3>
                  <p className="text-[11px] text-slate-500">Valid credentials cryptographically anchored and ready for Zero-Knowledge verification.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={onOpenAddDocument}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+ Add Valid Document</span>
                </button>
                <button 
                  onClick={() => onSubTabChange('wallet-docs')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Manage All →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {walletDocuments.slice(0, 3).map(doc => (
                <div key={doc.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {doc.category || 'Valid ID'}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">Valid ✓</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate">{doc.name}</div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">{doc.issuer}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-2">ID: {doc.documentNumber}</div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                    <span className="text-[10px] text-slate-500">{doc.zkProof || 'ZK-SNARK'}</span>
                    <button 
                      onClick={() => onViewCredentialProof(doc)}
                      className="text-emerald-700 hover:text-emerald-900 font-bold"
                    >
                      Inspect Proof
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Connected Applications & Permission Intelligence */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Connected Applications & Permission Intelligence</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-800 text-white tracking-wider uppercase">
                    ZERO OVER-PRIVILEGE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Review which services have access to your decentralized credentials, and tune disclosure preferences.</p>
              </div>

              <button 
                onClick={onOpenGlobalPrivacy}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-all shadow-2xs self-start md:self-auto"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>Global Privacy Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {connectedApps.slice(0, 3).map(app => (
                <div key={app.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all card-hover-effect flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl ${app.color} text-white font-bold flex items-center justify-center text-xs shadow-2xs`}>
                          {app.code}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{app.name}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{app.category}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {app.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 my-3">
                      {app.permissions.map((perm, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px] py-1 px-2 rounded-lg bg-white border border-slate-200/60">
                          <span className="text-slate-700 font-medium">{perm.name}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            perm.type === 'Required' 
                              ? 'bg-slate-100 text-slate-600' 
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {perm.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] mt-2">
                    <span className="text-slate-400 font-mono">Last active {app.lastActive}</span>
                    <button 
                      onClick={() => onManageApp(app)}
                      className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Showing top 3 active of {connectedApps.length} connected enterprise applications</span>
              <button 
                onClick={() => onSubTabChange('connected-apps')}
                className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
              >
                <span>View All {connectedApps.length} Apps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* VIEW B: IDENTITY WALLET & VALID DOCUMENTS (USER AUTHORITY) */}
      {userSubTab === 'wallet-docs' && (
        <div className="space-y-6">
          {/* Sovereign Authority Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-700/80 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
                    Sovereign Enclave Vault
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Hardware Tier 1 • Ed25519</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Identity Wallet & Valid Documents</h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  You possess sovereign authority to add, anchor, and manage valid credentials. 
                  Every document is cryptographically verified, bound to your hardware secure enclave, and protected by Zero-Knowledge proofs.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button 
                  onClick={onOpenAddDocument}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Valid Document</span>
                </button>
                <button 
                  onClick={onVerifyCredentials}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Re-run Setup Wizard</span>
                </button>
              </div>
            </div>

            {/* 4 Mini Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-700/60 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Valid Documents</span>
                <span className="text-lg font-bold text-white mt-0.5 block">{walletDocuments.length} Anchored</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Zero-Knowledge Proofs</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5 block">100% Active</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Raw Personal Data Leaks</span>
                <span className="text-lg font-bold text-white mt-0.5 block">0 Bytes (Zero Leaks)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Blockchain Anchor</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5 block">Polygon Amoy #14.8M</span>
              </div>
            </div>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 w-full sm:w-72 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                placeholder="Search documents, issuers, or IDs..."
                className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {['All', 'National ID', 'Passport', "Driver's License", 'Enterprise', 'Hardware'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setDocFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    docFilter === cat 
                      ? 'bg-emerald-800 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                  }`}
                >
                  {cat === 'All' ? `All (${walletDocuments.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.length === 0 ? (
              <div className="col-span-2 p-10 bg-white rounded-3xl border border-dashed border-slate-300 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No matching documents found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You have sovereign authority to add valid identity documents into your decentralized wallet anytime.
                </p>
                <button 
                  onClick={onOpenAddDocument}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Valid Document</span>
                </button>
              </div>
            ) : (
              filteredDocs.map(doc => (
                <div key={doc.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-lg">
                          {doc.category === 'Passport' ? '🛂' : (doc.category === "Driver's License" ? '🚗' : (doc.category === 'Enterprise' ? '🏢' : '🪪'))}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-slate-900">{doc.name}</h3>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              {doc.category || 'ID Document'}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {doc.issuer}
                          </div>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Valid ✓</span>
                      </span>
                    </div>

                    {/* Metadata & Digest */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 text-xs mb-3">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Document Number:</span>
                        <span className="font-mono font-bold text-slate-900">{doc.documentNumber || 'ZK-REDACTED'}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Validity Period:</span>
                        <span className="font-medium text-slate-800">{doc.issueDate} → {doc.expiryDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/60">
                        <span>SHA-256 Digest:</span>
                        <div className="flex items-center gap-1 font-mono text-[10px] text-emerald-700 font-semibold">
                          <span>{doc.documentHash ? `${doc.documentHash.slice(0, 10)}...${doc.documentHash.slice(-6)}` : '0x89e2...'}</span>
                          <button 
                            onClick={() => onCopyDid(doc.documentHash || '0x89e21bf490a01bcd9031ef0912fa981e4b89012a')}
                            className="text-slate-400 hover:text-slate-700" 
                            title="Copy SHA-256 hash"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ZK Selective Disclosure Claims */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Zero-Knowledge Claims</div>
                      <div className="flex flex-wrap gap-1.5">
                        {doc.claims && Object.entries(doc.claims).slice(0, 3).map(([k, v], idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200/60 flex items-center gap-1">
                            <Shield className="w-2.5 h-2.5 text-emerald-600" />
                            <span>{k}: {String(v)}</span>
                          </span>
                        ))}
                        <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200">
                          {doc.zkProof || 'ZK-SNARK Active'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <button 
                      onClick={() => onViewCredentialProof(doc)}
                      className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Inspect ZK Proof</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${doc.id}-verifiable-credential.json`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-all"
                      >
                        Export JSON
                      </button>

                      {onRemoveDocument && (
                        <button 
                          onClick={() => onRemoveDocument(doc.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                          title="Remove document from wallet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Authority Callout Dropzone */}
          <div className="p-6 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
              <Plus className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Anchor Another Valid Document</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Add national IDs, passports, driver's licenses, or professional credentials to your decentralized wallet with sovereign authority.
            </p>
            <button 
              onClick={onOpenAddDocument}
              className="mt-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Document to Wallet</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW C: CONNECTED APPS */}
      {userSubTab === 'connected-apps' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">All Connected Applications ({connectedApps.length})</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage permissions and view zero-knowledge disclosure settings for all services.</p>
            </div>
            <button 
              onClick={onOpenGlobalPrivacy}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-all shadow-2xs self-start md:self-auto"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Global Privacy Defaults</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedApps.map(app => (
              <div key={app.id} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl ${app.color} text-white font-bold flex items-center justify-center text-sm shadow-2xs`}>
                        {app.code}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{app.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{app.category}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {app.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 my-3">
                    {app.permissions.map((perm, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] py-1 px-2.5 rounded-lg bg-white border border-slate-200/60">
                        <span className="text-slate-700 font-medium">{perm.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          perm.type === 'Required' 
                            ? 'bg-slate-100 text-slate-600' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {perm.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] mt-2">
                  <span className="text-slate-400 font-mono">Last active {app.lastActive}</span>
                  <button 
                    onClick={() => onManageApp(app)}
                    className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                  >
                    Configure Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW D: PERMISSION INTELLIGENCE */}
      {userSubTab === 'permission-intelligence' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-700" />
                <h2 className="text-lg font-bold text-slate-900">Permission Intelligence & Privacy Tuning</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Automated detection of over-privileged OAuth requests and zero-knowledge claim synthesis.</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Zero Over-Privilege
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs space-y-1">
              <span className="text-emerald-800 font-bold block">100% Selective Claims</span>
              <p className="text-slate-600 text-[11px]">All non-essential claims (phone, location, raw SSN) are masked with ZK proofs.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="text-slate-900 font-bold block">0 Overprivileged Requests</span>
              <p className="text-slate-600 text-[11px]">No third-party application currently holds unvetted raw data access.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="text-slate-900 font-bold block">Automated Rule Engine</span>
              <p className="text-slate-600 text-[11px]">Enclave actively terminates stale tokens after 15 minutes of inactivity.</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW E: SECURITY INSIGHTS */}
      {userSubTab === 'security-insights' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg font-bold text-slate-900">Security Insights & Cryptographic Audit Log</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Real-time telemetry from Hardware Tier 1 Enclaves and zero-knowledge proof verifiers.</p>
          </div>

          <div className="space-y-3">
            {[
              { event: "ZK Proof Verification", resource: "Acme Health Portal", time: "Today at 14:10 UTC", status: "Success", hash: "0x4a9b...7c1d" },
              { event: "SSO Challenge-Response", resource: "WorkFlow AI Enterprise", time: "Today at 12:45 UTC", status: "Success", hash: "0x3e18...92fa" },
              { event: "Enclave Key Refresh", resource: "Hardware Tier 1 Enclave", time: "Today at 08:30 UTC", status: "Success", hash: "0x91da...6601" }
            ].map((log, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <span className="font-bold text-slate-900 block">{log.event}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.resource} • {log.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-700">
                  <span>{log.hash}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


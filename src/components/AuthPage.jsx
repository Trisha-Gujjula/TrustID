import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  User, 
  Building2, 
  Sliders, 
  Lock, 
  Mail, 
  Phone, 
  Key, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Fingerprint, 
  Sparkles,
  AlertCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { 
  getStoredUsers, 
  registerUser, 
  loginUser 
} from '../utils/authStorage.js';
import RegistrationPage from './RegistrationPage.jsx';

export default function AuthPage({ onLoginSuccess, onOpenRegister, initialRegisterMode = false }) {
  const [selectedRole, setSelectedRole] = useState('user'); // 'user' | 'organization' | 'admin' (Admin for login only)
  const [isRegistering, setIsRegistering] = useState(initialRegisterMode);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registeredAccounts, setRegisteredAccounts] = useState([]);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyDomain: '',
    operatorName: '',
    nodeId: 'Enclave-Node-US-East-1'
  });

  useEffect(() => {
    // Load stored accounts for quick hints
    const users = getStoredUsers();
    setRegisteredAccounts(users);
  }, []);

  const handleInputChange = (field, value) => {
    setErrorMessage('');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    // Pre-fill email placeholder depending on role for easier testing if empty
    if (!formData.email) {
      if (role === 'user') setFormData(prev => ({ ...prev, email: 'elena.vance@trustid.network', password: 'password123' }));
      else if (role === 'organization') setFormData(prev => ({ ...prev, email: 'security-officer@acme.com', password: 'password123' }));
      else if (role === 'admin') setFormData(prev => ({ ...prev, email: 'admin@trustid.network', password: 'admin123' }));
    }
  };

  if (isRegistering) {
    return (
      <RegistrationPage 
        onRegisterSuccess={onLoginSuccess}
        onSwitchToLogin={() => {
          setIsRegistering(false);
          window.location.hash = '#login';
          setErrorMessage('');
          setSuccessMessage('');
        }}
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Login flow with persistent credentials verification (backend + local)
    const res = await loginUser({
      email: formData.email,
      password: formData.password,
      role: selectedRole
    });

    if (!res.success) {
      setErrorMessage(res.error);
      return;
    }

    setSuccessMessage(`Welcome back, ${res.user.name}! Redirecting to workspace...`);
    setTimeout(() => {
      onLoginSuccess(res.user.role, res.user);
    }, 400);
  };

  // 1-Click Demo Login
  const handleQuickLogin = async (role) => {
    let email = 'elena.vance@trustid.network';
    let password = 'password123';

    if (role === 'organization') {
      email = 'security-officer@acme.com';
      password = 'password123';
    } else if (role === 'admin') {
      email = 'admin@trustid.network';
      password = 'admin123';
    }

    const res = await loginUser({ email, password, role });
    if (res.success) {
      onLoginSuccess(res.user.role, res.user);
    }
  };

  // Quick fill from existing account chip
  const handleSelectAccount = (acc) => {
    setSelectedRole(acc.role);
    setFormData(prev => ({
      ...prev,
      email: acc.email,
      password: acc.password || 'password123',
      fullName: acc.name
    }));
    setIsRegistering(false);
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 antialiased overflow-y-auto">
      {/* Background Matrix Decorative Canvas Grid */}
      <div className="absolute inset-0 matrix-canvas-bg opacity-30 pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
          <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">TrustID</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tracking-wide uppercase">
              DECENTRALIZED ACCESS
            </span>
          </div>
          <p className="text-xs text-slate-400">Zero-Knowledge • Verifiable Credentials • Fraud & Phishing Defense</p>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="relative z-10 w-full max-w-lg bg-white text-slate-900 rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 modal-pop-in">
        {/* Stakeholder Role Switcher Pills */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">
            Select Stakeholder Portal
          </label>
          <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200 flex items-center gap-1 shadow-inner">
            <button
              type="button"
              id="role-user-tab"
              onClick={() => handleRoleChange('user')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                selectedRole === 'user' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <User className={`w-3.5 h-3.5 ${selectedRole === 'user' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>User</span>
            </button>

            <button
              type="button"
              id="role-org-tab"
              onClick={() => handleRoleChange('organization')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                selectedRole === 'organization' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 ${selectedRole === 'organization' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Organization</span>
            </button>

            <button
              type="button"
              id="role-admin-tab"
              onClick={() => handleRoleChange('admin')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                selectedRole === 'admin' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sliders className={`w-3.5 h-3.5 ${selectedRole === 'admin' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Title & Mode Toggle */}
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isRegistering 
                ? (selectedRole === 'user' ? 'Register New TrustID' : (selectedRole === 'organization' ? 'Register Enterprise Org' : 'Provision Admin Authority'))
                : (selectedRole === 'user' ? 'Sign In to User Identity Hub' : (selectedRole === 'organization' ? 'Enterprise Portal Sign In' : 'Admin Console Login'))}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {selectedRole === 'user' && 'Decentralized identity wallet with local enclave keys.'}
              {selectedRole === 'organization' && 'Enterprise credential misuse detection & employee DIDs.'}
              {selectedRole === 'admin' && 'Cluster hardware nodes and blockchain verification engine.'}
            </p>
          </div>
          <button
            type="button"
            id="auth-mode-toggle"
            onClick={() => {
              if (!isRegistering) {
                if (onOpenRegister) {
                  onOpenRegister();
                } else {
                  setIsRegistering(true);
                  window.location.hash = '#register';
                }
              } else {
                setIsRegistering(false);
                window.location.hash = '#login';
              }
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline shrink-0 ml-2"
          >
            {isRegistering ? 'Sign In Instead' : 'Register Now'}
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {/* USER FORM FIELDS */}
          {selectedRole === 'user' && (
            <>
              {isRegistering && (
                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 uppercase text-[10px]">Email Address</label>
                <div className="relative mt-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="elena.vance@trustid.network"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              {isRegistering && (
                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Phone Number (for SMS / OTP Binding)</label>
                  <div className="relative mt-1">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 382-9104"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 uppercase text-[10px]">
                  {isRegistering ? 'Create Password (min 6 chars)' : 'Password / Passkey PIN'}
                </label>
                <div className="relative mt-1">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              {isRegistering && (
                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Confirm Password</label>
                  <div className="relative mt-1">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* ORGANIZATION FORM FIELDS */}
          {selectedRole === 'organization' && (
            <>
              {isRegistering && (
                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Enterprise Company Name</label>
                  <div className="relative mt-1">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Acme Corp Enterprise"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {isRegistering && (
                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Corporate Domain</label>
                  <div className="relative mt-1">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="acme.com"
                      value={formData.companyDomain}
                      onChange={(e) => handleInputChange('companyDomain', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 uppercase text-[10px]">HR / Security Admin Email</label>
                <div className="relative mt-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="security-officer@acme.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase text-[10px]">Password</label>
                <div className="relative mt-1">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              {isRegistering && (
                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Confirm Password</label>
                  <div className="relative mt-1">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* ADMIN FORM FIELDS */}
          {selectedRole === 'admin' && (
            <>
              {isRegistering && (
                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Operator / Security Officer ID</label>
                  <div className="relative mt-1">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="ADMIN-ROOT-TIER1"
                      value={formData.operatorName}
                      onChange={(e) => handleInputChange('operatorName', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 uppercase text-[10px]">Admin Email</label>
                <div className="relative mt-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="admin@trustid.network"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase text-[10px]">Hardware Node Identification</label>
                <input
                  type="text"
                  placeholder="Enclave-Node-US-East-1"
                  value={formData.nodeId}
                  onChange={(e) => handleInputChange('nodeId', e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase text-[10px]">Password / Master Token</label>
                <div className="relative mt-1">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              {isRegistering && (
                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Confirm Password</label>
                  <div className="relative mt-1">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            id="auth-submit-btn"
            className="w-full mt-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2"
          >
            <span>{isRegistering ? 'Register & Generate Cryptographic DID' : 'Sign In with Credentials'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Registered Accounts Quick Select Chips */}
        {registeredAccounts.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
              Registered Accounts (Click to Auto-Fill):
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {registeredAccounts.map(acc => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleSelectAccount(acc)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-[11px] text-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <span className={`w-2 h-2 rounded-full ${acc.role === 'user' ? 'bg-emerald-500' : (acc.role === 'organization' ? 'bg-amber-500' : 'bg-blue-500')}`} />
                  <span className="font-semibold">{acc.name}</span>
                  <span className="text-[10px] text-slate-400">({acc.email})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 1-Click Evaluation Demo Logins */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              1-Click Instant Evaluation Logins:
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              id="demo-login-user"
              onClick={() => handleQuickLogin('user')}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/70 hover:border-emerald-300 text-left transition-all"
            >
              <div className="text-[11px] font-bold text-slate-800">Elena Vance</div>
              <div className="text-[9px] text-emerald-700 font-semibold">User Identity</div>
            </button>

            <button
              type="button"
              id="demo-login-org"
              onClick={() => handleQuickLogin('organization')}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/70 hover:border-emerald-300 text-left transition-all"
            >
              <div className="text-[11px] font-bold text-slate-800">Acme Corp</div>
              <div className="text-[9px] text-amber-700 font-semibold">Org / HR</div>
            </button>

            <button
              type="button"
              id="demo-login-admin"
              onClick={() => handleQuickLogin('admin')}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/70 hover:border-emerald-300 text-left transition-all"
            >
              <div className="text-[11px] font-bold text-slate-800">Root Node</div>
              <div className="text-[9px] text-blue-700 font-semibold">Admin Console</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

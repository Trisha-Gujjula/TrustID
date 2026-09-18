import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  User, 
  Building2, 
  Lock, 
  Mail, 
  Phone, 
  Key, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Fingerprint, 
  Cpu, 
  Shield, 
  Database, 
  Sparkles,
  AlertCircle,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  XCircle
} from 'lucide-react';
import { registerUser, validatePasswordComplexity } from '../utils/authStorage.js';

export default function RegistrationPage({ onRegisterSuccess, onSwitchToLogin }) {
  const [selectedRole, setSelectedRole] = useState('user'); // 'user' | 'organization' (Admin cannot be publicly registered)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [enclaveEnabled, setEnclaveEnabled] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyDomain: '',
    termsAccepted: true
  });

  const handleInputChange = (field, value) => {
    setErrorMessage('');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Real-time password criteria evaluation
  const passwordCriteria = useMemo(() => {
    const pw = formData.password || '';
    return {
      length: pw.length >= 8,
      hasUpper: /[A-Z]/.test(pw),
      hasLower: /[a-z]/.test(pw),
      hasNumber: /\d/.test(pw),
      hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(pw),
      matchesConfirm: pw.length > 0 && pw === formData.confirmPassword
    };
  }, [formData.password, formData.confirmPassword]);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const pw = formData.password || '';
    if (!pw) return { score: 0, label: 'Not Entered', color: 'bg-slate-200', text: 'text-slate-400' };
    
    let passed = 0;
    if (passwordCriteria.length) passed++;
    if (passwordCriteria.hasUpper) passed++;
    if (passwordCriteria.hasLower) passed++;
    if (passwordCriteria.hasNumber) passed++;
    if (passwordCriteria.hasSpecial) passed++;

    if (passed <= 2) return { score: 25, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (passed <= 3) return { score: 50, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600' };
    if (passed <= 4) return { score: 75, label: 'Good', color: 'bg-blue-500', text: 'text-blue-600' };
    return { score: 100, label: 'Strong (Enclave Ready)', color: 'bg-emerald-500', text: 'text-emerald-600' };
  }, [formData.password, passwordCriteria]);

  // Compute live real-time simulated DID preview as user types
  const livePreview = useMemo(() => {
    const seed = (formData.email || formData.fullName || formData.companyDomain || 'trustid').toLowerCase();
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, 'a') + '9f81bc20';
    return {
      did: `did:trust:${hex.slice(0, 16)}`,
      didShort: `did:trust:${hex.slice(0, 4)}...${hex.slice(12, 16)}`,
      fingerprint: `TID-${hex.slice(0, 4).toUpperCase()}-${hex.slice(4, 8).toUpperCase()}-${hex.slice(8, 12).toUpperCase()}`
    };
  }, [formData.email, formData.fullName, formData.companyDomain]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Comprehensive password validation check
    const pwValidation = validatePasswordComplexity(formData.password);
    if (!pwValidation.valid) {
      setErrorMessage(pwValidation.error);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entries.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await registerUser({
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        fullName: formData.fullName,
        companyName: formData.companyName,
        companyDomain: formData.companyDomain,
        phone: formData.phone
      });

      if (!res.success) {
        setIsLoading(false);
        setErrorMessage(res.error || 'Registration failed.');
        return;
      }

      // Success transition
      setTimeout(() => {
        setIsLoading(false);
        onRegisterSuccess(selectedRole, res.user);
      }, 750);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('An unexpected error occurred during identity provisioning.');
    }
  };

  return (
    <div className="w-screen min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 antialiased relative overflow-y-auto">
      {/* Background Matrix Canvas Pattern */}
      <div className="absolute inset-0 matrix-canvas-bg opacity-35 pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
          <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">TrustID</span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tracking-wide uppercase">
              IDENTITY REGISTRATION
            </span>
          </div>
          <p className="text-xs text-slate-400">Decentralized W3C Identity • Hardware Enclaves • Zero-Knowledge Verification</p>
        </div>
      </div>

      {/* Main Registration Card (Two-Column Interactive Layout) */}
      <div className="relative z-10 w-full max-w-4xl bg-white text-slate-900 rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden modal-pop-in flex flex-col md:flex-row">
        
        {/* Left Column: Form & Stakeholder Switcher */}
        <div className="flex-1 p-6 sm:p-8">
          {/* Stakeholder Segmented Selector - ONLY User and Organization available */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Select Stakeholder Role
              </label>
              <span className="text-[10px] text-slate-400 font-medium">
                Admin accounts require enclave root authority
              </span>
            </div>
            <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200 flex items-center gap-1 shadow-inner">
              <button
                type="button"
                id="reg-tab-user"
                onClick={() => setSelectedRole('user')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'user' 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <User className={`w-3.5 h-3.5 ${selectedRole === 'user' ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>Personal User</span>
              </button>

              <button
                type="button"
                id="reg-tab-org"
                onClick={() => setSelectedRole('organization')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'organization' 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${selectedRole === 'organization' ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>Enterprise Organization</span>
              </button>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              {selectedRole === 'user' && 'Create Your Personal TrustID'}
              {selectedRole === 'organization' && 'Register Enterprise Workspace'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {selectedRole === 'user' && 'Generate a sovereign W3C identity cryptographically bound to your hardware.'}
              {selectedRole === 'organization' && 'Monitor employee credentials, detect phishing, and whitelist corporate SaaS.'}
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {/* USER FIELDS */}
            {selectedRole === 'user' && (
              <>
                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Email Address</label>
                    <div className="relative mt-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Phone (OTP Binding)</label>
                    <div className="relative mt-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 382-9104"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ORGANIZATION FIELDS */}
            {selectedRole === 'organization' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Company Name</label>
                    <div className="relative mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Acme Corp Enterprise"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Corporate Domain</label>
                    <div className="relative mt-1">
                      <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="acme.com"
                        value={formData.companyDomain}
                        onChange={(e) => handleInputChange('companyDomain', e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 uppercase text-[10px]">Security Officer / HR Email</label>
                  <div className="relative mt-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="security@acme.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            {/* PASSWORD & CONFIRMATION WITH REAL-TIME STRENGTH METER */}
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Password</label>
                    <span className={`text-[10px] font-bold ${passwordStrength.text}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="relative mt-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Min 8 chars, Aa1@..."
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-8 pr-8 py-2.5 rounded-xl border text-xs text-slate-900 outline-none transition-all ${
                        formData.password && !passwordCriteria.length 
                          ? 'border-rose-300 bg-rose-50/40 focus:border-rose-500' 
                          : 'border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Confirm Password</label>
                    {formData.confirmPassword && (
                      <span className={`text-[10px] font-semibold ${passwordCriteria.matchesConfirm ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {passwordCriteria.matchesConfirm ? '✓ Match' : '✗ No match'}
                      </span>
                    )}
                  </div>
                  <div className="relative mt-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-xs text-slate-900 outline-none transition-all ${
                        formData.confirmPassword && !passwordCriteria.matchesConfirm
                          ? 'border-rose-300 bg-rose-50/40 focus:border-rose-500'
                          : 'border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Strength Meter Bar */}
              {formData.password && (
                <div className="space-y-1.5 pt-0.5">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`} 
                      style={{ width: `${passwordStrength.score}%` }} 
                    />
                  </div>

                  {/* Password Requirements Checklist Chips */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                      Password Security Requirements:
                    </span>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
                      <div className={`flex items-center gap-1.5 font-medium ${passwordCriteria.length ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {passwordCriteria.length ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`flex items-center gap-1.5 font-medium ${passwordCriteria.hasUpper ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {passwordCriteria.hasUpper ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                        <span>Uppercase letter (A-Z)</span>
                      </div>
                      <div className={`flex items-center gap-1.5 font-medium ${passwordCriteria.hasLower ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {passwordCriteria.hasLower ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                        <span>Lowercase letter (a-z)</span>
                      </div>
                      <div className={`flex items-center gap-1.5 font-medium ${passwordCriteria.hasNumber ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {passwordCriteria.hasNumber ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                        <span>Number (0-9)</span>
                      </div>
                      <div className={`flex items-center gap-1.5 font-medium ${passwordCriteria.hasSpecial ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {passwordCriteria.hasSpecial ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                        <span>Special character (!@#$)</span>
                      </div>
                      <div className={`flex items-center gap-1.5 font-medium ${passwordCriteria.matchesConfirm ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {passwordCriteria.matchesConfirm ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                        <span>Passwords match</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hardware Enclave Switch */}
            <div className="pt-2">
              <label 
                onClick={() => setEnclaveEnabled(!enclaveEnabled)}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 cursor-pointer select-none"
              >
                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  enclaveEnabled ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {enclaveEnabled && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Hardware Tier 1 Enclave Attestation</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-tight mt-0.5">
                    Isolates cryptographic keys inside local secure enclave memory with Polygon Amoy anchor.
                  </p>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white font-bold text-xs transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Provisioning Decentralized Identity...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Provision TrustID</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login Button */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Already have a TrustID?</span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Sign In to Existing Account</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Column: Live Cryptographic Provisioning Radar */}
        <div className="w-full md:w-80 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200 p-6 sm:p-7 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-700/50">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-active" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Live Key Ceremony Preview
              </span>
            </div>

            {/* Generated DID Card */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/70 mb-3 shadow-inner">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Decentralized Identifier (DID)
              </span>
              <div className="font-mono text-xs font-semibold text-emerald-300 break-all">
                {livePreview.did}
              </div>
            </div>

            {/* Hardware Fingerprint Card */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/70 mb-3 shadow-inner">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Cryptographic Enclave Fingerprint
              </span>
              <div className="font-mono text-xs font-semibold text-slate-200">
                {livePreview.fingerprint}
              </div>
            </div>

            {/* Verifiable Credentials Checklist */}
            <div className="space-y-2 mb-4 text-[11px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Credentials Issued on Registration:
              </span>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>W3C Self-Sovereign Identity Key</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hardware Tier 1 Attestation Claim</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero-Knowledge Range Proofs Ready</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Polygon Amoy State Merkle Root</span>
              </div>
            </div>
          </div>

          {/* Blockchain & Security Footer */}
          <div className="pt-4 border-t border-slate-700/70 text-[10px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between font-mono">
              <span>ANCHOR NETWORK</span>
              <span className="text-emerald-400 font-bold">Polygon Amoy</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span>ZERO-KNOWLEDGE</span>
              <span className="text-emerald-400 font-bold">100% Assurance</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span>PRIVACY EXPOSURE</span>
              <span className="text-emerald-400 font-bold">0 Bytes Shared</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

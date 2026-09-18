import React, { useState } from 'react';
import { 
  X, 
  MailCheck, 
  Check, 
  ArrowRight, 
  Fingerprint, 
  Key, 
  Shield, 
  Award, 
  CheckCircle2, 
  AlertOctagon, 
  ShieldX, 
  Ban, 
  Building2, 
  Binary,
  FileText,
  CreditCard,
  Plus,
  UploadCloud,
  Scan,
  Lock,
  Trash2,
  Copy,
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  FileCheck
} from 'lucide-react';
import { createValidDocumentRecord } from '../utils/authStorage.js';

export default function Modals({ 
  activeModal, 
  modalData, 
  user, 
  wizardStep, 
  onClose, 
  onAdvanceWizard, 
  onShowToast, 
  onRevokeApp,
  walletDocuments = [],
  onAddDocument,
  onRemoveDocument,
  onViewCredentialProof
}) {
  const [selectedScopes, setSelectedScopes] = useState({
    email: true,
    phone: false,
    camera: false,
    location: false
  });
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');

  // State for Document Addition Authority
  const [docCategory, setDocCategory] = useState('National ID');
  const [docNumber, setDocNumber] = useState('');
  const [docIssuer, setDocIssuer] = useState('United States Department of State');
  const [docName, setDocName] = useState('');
  const [docExpiry, setDocExpiry] = useState('2032-12-31');
  const [enableZkProof, setEnableZkProof] = useState(true);
  const [enableAgeCheck, setEnableAgeCheck] = useState(true);
  const [enableCitizenship, setEnableCitizenship] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [docAddError, setDocAddError] = useState('');
  const [showQuickAddOnDid, setShowQuickAddOnDid] = useState(false);

  if (!activeModal) return null;

  // Handler for adding a document with cryptographic credentials
  const handleAddNewDocument = (e) => {
    if (e) e.preventDefault();
    const cleanNum = docNumber.trim();
    if (!cleanNum) {
      setDocAddError('Please enter a valid document identifier (e.g., Passport or National ID number).');
      return;
    }
    setDocAddError('');

    const newDoc = createValidDocumentRecord({
      category: docCategory,
      name: docName.trim() || `${docCategory} Document Credential`,
      documentNumber: cleanNum,
      issuer: docIssuer.trim() || 'Official Identity Authority',
      expiryDate: docExpiry,
      holderName: user?.name || 'Elena Vance',
      enableZk: enableZkProof,
      claims: {
        ageOver21: enableAgeCheck,
        citizenshipVerified: enableCitizenship
      }
    });

    if (onAddDocument) {
      onAddDocument(newDoc);
    }
    onShowToast(`Valid ${docCategory} added and cryptographically anchored!`, 'success');
    setDocNumber('');
    setDocName('');
    setUploadedFileName('');
    setShowQuickAddOnDid(false);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (docCategory === 'Passport') {
        setDocNumber('US-PASS-892104-X');
        setDocIssuer('United States Department of State');
        setDocName('International Biometric Passport');
        setUploadedFileName('passport_biometric_chip_scan.enc');
      } else if (docCategory === 'Driver\'s License') {
        setDocNumber('DL-CA-4902194');
        setDocIssuer('California Department of Motor Vehicles');
        setDocName('Real ID Driver\'s License');
        setUploadedFileName('ca_realid_scan_enclave.enc');
      } else {
        setDocNumber('NID-849201-904');
        setDocIssuer('Global e-Identity Commission');
        setDocName('National Identity Citizen Card');
        setUploadedFileName('national_id_front_back.enc');
      }
      onShowToast('Enclave AI OCR Scan complete: valid document integrity verified!', 'info');
    }, 1100);
  };

  // 1. Verification Wizard Modal (5 Comprehensive Steps with User Document Authority)
  if (activeModal === 'verification-wizard') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-xl w-full p-7 border border-slate-200 shadow-2xl modal-pop-in relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>

          {/* 5-Step Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2 gap-1 overflow-x-auto">
              <span className={wizardStep >= 1 ? 'text-emerald-700 font-bold' : ''}>1. Verify Contact</span>
              <span className={wizardStep >= 2 ? 'text-emerald-700 font-bold' : ''}>2. Add Documents</span>
              <span className={wizardStep >= 3 ? 'text-emerald-700 font-bold' : ''}>3. Biometric Enclave</span>
              <span className={wizardStep >= 4 ? 'text-emerald-700 font-bold' : ''}>4. DID Keys</span>
              <span className={wizardStep >= 5 ? 'text-emerald-700 font-bold' : ''}>5. Fingerprint</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${Math.min(100, wizardStep * 20)}%` }} />
            </div>
          </div>

          {/* STEP 1: VERIFY CONTACT */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                <MailCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Verify Your Identity Channels</h2>
              <p className="text-xs text-slate-500">A one-time cryptographic verification OTP has been sent to confirm ownership.</p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase">Email Address</label>
                  <input 
                    type="text" 
                    value={user?.email || 'user@trustid.network'} 
                    disabled 
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 font-semibold" 
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700 uppercase">One-Time Verification OTP</label>
                    <span className="text-[10px] text-slate-400 font-medium">Enter 6-digit code</span>
                  </div>
                  <input 
                    type="text" 
                    value={otpInput}
                    onChange={(e) => {
                      setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                      setOtpError('');
                    }}
                    placeholder="• • • • • •" 
                    maxLength={6} 
                    className={`w-full mt-1 px-3 py-2.5 text-center text-lg font-mono font-bold tracking-widest bg-white border-2 rounded-xl text-slate-900 outline-none transition-all ${
                      otpError 
                        ? 'border-rose-400 bg-rose-50/20 text-rose-700' 
                        : (otpInput.length === 6 ? 'border-emerald-500 text-emerald-800' : 'border-slate-200 focus:border-emerald-500')
                    }`} 
                  />
                  {otpError ? (
                    <div className="text-[11px] text-rose-600 mt-1.5 font-semibold flex items-center gap-1">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>{otpError}</span>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-400 mt-1">
                      Enter the 6-digit cryptographic verification OTP sent to your registered email.
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={() => {
                  const clean = otpInput.trim();
                  if (clean === '849201') {
                    setOtpError('');
                    onAdvanceWizard(2);
                  } else if (!clean) {
                    setOtpError('Please enter the 6-digit verification code.');
                  } else {
                    setOtpError('Invalid OTP code. Please check and enter the valid verification code.');
                  }
                }}
                className="w-full mt-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Confirm & Proceed to Document Authority</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: USER DOCUMENT AUTHORITY (ADD VALID DOCUMENTS) */}
          {wizardStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>User Document Authority</span>
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">Add Valid Identity Documents</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  You have full authority to anchor your valid government IDs, passports, and credentials into your decentralized wallet with Zero-Knowledge privacy.
                </p>
              </div>

              {/* Document Entry Form */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Document Type</label>
                    <select 
                      value={docCategory} 
                      onChange={(e) => {
                        setDocCategory(e.target.value);
                        if (e.target.value === 'Passport') {
                          setDocIssuer('International Civil Aviation Authority (ICAO)');
                          setDocName('International Travel Passport');
                        } else if (e.target.value === 'Driver\'s License') {
                          setDocIssuer('Department of Motor Vehicles');
                          setDocName('Official Driver\'s License');
                        } else if (e.target.value === 'Enterprise') {
                          setDocIssuer('Corporate Trust Root CA');
                          setDocName('Enterprise Staff ID Credential');
                        } else {
                          setDocIssuer('Global e-Identity Commission');
                          setDocName('National Identity Citizen Card');
                        }
                      }}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    >
                      <option value="National ID">🪪 National ID / Citizen Card</option>
                      <option value="Passport">🛂 International Passport</option>
                      <option value="Driver's License">🚗 Driver's License / Real ID</option>
                      <option value="Enterprise">🏢 Enterprise Staff Clearance</option>
                      <option value="Academic">🎓 Academic Degree / Certification</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Document Identifier</label>
                    <input 
                      type="text" 
                      value={docNumber} 
                      onChange={(e) => {
                        setDocNumber(e.target.value);
                        setDocAddError('');
                      }}
                      placeholder="e.g. US-PASS-982104"
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Issuing Authority / Country</label>
                    <input 
                      type="text" 
                      value={docIssuer} 
                      onChange={(e) => setDocIssuer(e.target.value)}
                      placeholder="e.g. US Department of State"
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Expiry Date</label>
                    <input 
                      type="date" 
                      value={docExpiry} 
                      onChange={(e) => setDocExpiry(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Simulated AI OCR Scan or File Upload */}
                <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
                  <button 
                    type="button"
                    onClick={handleSimulateScan}
                    disabled={isScanning}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <Scan className={`w-3.5 h-3.5 text-emerald-600 ${isScanning ? 'animate-spin' : ''}`} />
                    <span>{isScanning ? 'Scanning via Enclave OCR...' : 'Scan / Auto-Fill Valid Document'}</span>
                  </button>

                  {uploadedFileName && (
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>{uploadedFileName}</span>
                    </span>
                  )}
                </div>

                {/* Zero Knowledge Privacy Protection Controls */}
                <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Zero-Knowledge Selective Disclosure Controls</div>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={enableZkProof} 
                      onChange={(e) => setEnableZkProof(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5" 
                    />
                    <span>Hide raw ID number from external verifiers (ZK-SNARK proof only)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={enableAgeCheck} 
                      onChange={(e) => setEnableAgeCheck(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5" 
                    />
                    <span>Include cryptographic Age Verification claim (&gt;21)</span>
                  </label>
                </div>

                {docAddError && (
                  <div className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 pt-1">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>{docAddError}</span>
                  </div>
                )}

                <button 
                  type="button"
                  onClick={handleAddNewDocument}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Sign & Anchor Valid Document</span>
                </button>
              </div>

              {/* List of Attached Valid Documents */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Attached Valid Documents ({walletDocuments.length})</span>
                  <span className="text-[10px] text-emerald-700 font-medium">All cryptographically signed ✓</span>
                </div>

                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {walletDocuments.length === 0 ? (
                    <div className="p-3 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      No documents added yet. Fill form above and click "Sign & Anchor Valid Document".
                    </div>
                  ) : (
                    walletDocuments.map(doc => (
                      <div key={doc.id} className="p-2.5 rounded-xl border border-emerald-200/80 bg-emerald-50/40 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                          <div className="truncate">
                            <div className="text-xs font-bold text-slate-900 truncate">{doc.name}</div>
                            <div className="text-[10px] text-slate-500 truncate font-mono">
                              {doc.documentNumber || doc.issuer} • <span className="text-emerald-700 font-semibold">Valid ✓</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                          {doc.zkProof || 'ZK-SNARK Active'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => onAdvanceWizard(1)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button 
                  onClick={() => onAdvanceWizard(3)}
                  className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Enclave ({walletDocuments.length} Docs)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BIOMETRIC ENCLAVE */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                <Fingerprint className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Hardware Biometric Enclave</h2>
              <p className="text-xs text-slate-500">Creating WebCrypto asymmetric keypair inside your device's Tier 1 secure enclave, binding your verified documents.</p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span>Cryptographic Algorithm:</span>
                  <span className="font-mono font-bold">ECDSA P-256 + Ed25519</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Enclave Isolation:</span>
                  <span className="font-bold text-emerald-700">Hardware Tier 1 Active ✓</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Valid Documents Bound:</span>
                  <span className="font-bold text-slate-900">{walletDocuments.length} Document Credentials</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Private Key Protection:</span>
                  <span className="font-bold text-slate-800">Non-Exportable on Chip</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => onAdvanceWizard(2)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Documents</span>
                </button>

                <button 
                  onClick={() => onAdvanceWizard(4)}
                  className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Generate DID & Public Key</span>
                  <Key className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: DID KEYS & DOCUMENT REGISTRATION */}
          {wizardStep === 4 && (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">DID Document Registered</h2>
              <p className="text-xs text-slate-500">Your decentralized identifier has been successfully anchored into the TrustID registry with your valid document credentials.</p>

              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 font-mono text-[11px]">
                <div className="text-emerald-400 font-bold">// W3C DID Document</div>
                <div className="truncate text-slate-300">id: "{user?.did || 'did:trust:9a4f78b1c90e8e1b'}"</div>
                <div className="truncate text-slate-300">publicKey: "0x89e21bf490...a01b"</div>
                <div className="text-slate-400">verificationMethod: [ "Ed25519VerificationKey2020" ]</div>
                <div className="text-emerald-300 pt-1">
                  anchoredCredentials: [ {walletDocuments.length} Verified Documents ]
                </div>
              </div>

              {/* Anchored Documents Summary */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Anchored Valid Documents</span>
                  <button 
                    onClick={() => onAdvanceWizard(2)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add More Documents</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {walletDocuments.map(doc => (
                    <span key={doc.id} className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-[10px] font-medium text-slate-700 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{doc.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => onAdvanceWizard(3)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button 
                  onClick={() => onAdvanceWizard(5)}
                  className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Generate Identity Fingerprint</span>
                  <Award className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: FINGERPRINT & WALLET READY */}
          {wizardStep === 5 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Identity Verified & Secured!</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your decentralized identity wallet is active with {walletDocuments.length} valid documents and full zero-knowledge protection.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2">
                <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Cryptographic Identity Fingerprint</div>
                <div className="text-base font-mono font-bold text-emerald-950">{user?.fingerprint || 'TID-8F72-A91C-4E21-8E1B'}</div>
                <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-2 pt-1 border-t border-emerald-200/60">
                  <span>✓ {walletDocuments.length} Valid Documents</span>
                  <span>•</span>
                  <span>✓ Hardware Enclave Active</span>
                  <span>•</span>
                  <span>✓ Zero Data Leaks</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  onClose();
                  onShowToast(`Identity verification complete! ${walletDocuments.length} valid documents anchored. Safety score 98/100.`, 'success');
                }}
                className="w-full mt-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                Finish & Open Identity Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }


  // 2. External Register Demo Modal
  if (activeModal === 'external-register-demo') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">AJ</div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">External Request</div>
              <h3 className="text-base font-bold text-slate-900">Acme Jobs is requesting access</h3>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 text-xs text-slate-600">
            TrustID has automatically analyzed requested permissions and flagged unnecessary scopes.
          </div>

          <div className="space-y-2.5 mb-5">
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-emerald-50/40 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <input 
                  type="checkbox" 
                  checked={selectedScopes.email} 
                  onChange={(e) => setSelectedScopes({ ...selectedScopes, email: e.target.checked })} 
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" 
                />
                <div>
                  <div className="text-xs font-bold text-slate-800">Email Address</div>
                  <div className="text-[10px] text-slate-400">Required for account login</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Safe (Required)</span>
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl border border-amber-200 bg-amber-50/40 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <input 
                  type="checkbox" 
                  checked={selectedScopes.phone} 
                  onChange={(e) => setSelectedScopes({ ...selectedScopes, phone: e.target.checked })} 
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" 
                />
                <div>
                  <div className="text-xs font-bold text-slate-800">Phone Number</div>
                  <div className="text-[10px] text-amber-700">Not typically required for job search</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Suspicious</span>
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl border border-rose-200 bg-rose-50/40 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <input 
                  type="checkbox" 
                  checked={selectedScopes.camera} 
                  onChange={(e) => setSelectedScopes({ ...selectedScopes, camera: e.target.checked })} 
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" 
                />
                <div>
                  <div className="text-xs font-bold text-slate-800">Camera Access</div>
                  <div className="text-[10px] text-rose-700">Unnecessary for authentication</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Unnecessary</span>
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl border border-rose-300 bg-rose-50/60 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <input 
                  type="checkbox" 
                  checked={selectedScopes.location} 
                  onChange={(e) => setSelectedScopes({ ...selectedScopes, location: e.target.checked })} 
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" 
                />
                <div>
                  <div className="text-xs font-bold text-slate-800">Precise GPS Location</div>
                  <div className="text-[10px] text-rose-700">High privacy risk, recommended to deny</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white uppercase">High Risk</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button 
              onClick={() => {
                onClose();
                onShowToast('Login request denied.', 'info');
              }}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
            >
              Deny All
            </button>
            <button 
              onClick={() => {
                onClose();
                onShowToast('Authorized with selective disclosure (Email only)', 'success');
              }}
              className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Allow Selected (Safe)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Phishing Warning Modal
  if (activeModal === 'phishing-warning') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-rose-500 shadow-2xl modal-pop-in relative">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertOctagon className="w-8 h-8" />
          </div>

          <div className="text-center space-y-1 mb-4">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white tracking-wider uppercase">
              CRITICAL PHISHING ALERT
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">This Website is FAKE</h2>
            <p className="text-xs text-slate-500">TrustID detected typosquatting and malicious spoofing on this domain.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mb-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Authentic Site:</span>
              <span className="font-bold text-emerald-700">https://amazon.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Attempted Site:</span>
              <span className="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">amazoon.com (extra 'o')</span>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between font-sans">
              <span>Domain Age: <b>2 days</b></span>
              <span>SSL: <b className="text-rose-600">Untrusted</b></span>
            </div>
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold mb-5 flex items-center gap-2">
            <ShieldX className="w-4 h-4 text-rose-600 shrink-0" />
            <span>We recommend NOT logging in or sharing credentials.</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button 
              onClick={() => {
                onClose();
                onShowToast('Phishing connection aborted. You are safe.', 'success');
              }}
              className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Block & Close
            </button>
            <button 
              onClick={() => {
                onClose();
                onShowToast('Proceeding at your own risk.', 'error');
              }}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-xl transition-all"
            >
              Ignore Warning
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Real-Time Fraud Block Modal
  if (activeModal === 'fraud-block') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-rose-500 shadow-2xl modal-pop-in relative">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <Ban className="w-8 h-8" />
          </div>

          <div className="text-center space-y-1 mb-4">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white tracking-wider uppercase">
              FRAUD INTERCEPTED
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">Suspicious Login Blocked</h2>
            <p className="text-xs text-slate-500">Isolation Forest ML engine detected high anomaly risk.</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2.5 mb-5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Anomaly Factor:</span>
              <span className="font-bold text-rose-700">1000km+ Location Jump</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Travel Velocity:</span>
              <span className="font-bold text-slate-800">Seattle → Mumbai in 45m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">New Device:</span>
              <span className="font-bold text-slate-800">iPhone 12 (Unknown)</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-rose-200/60 font-bold">
              <span className="text-slate-700">Calculated Risk Score:</span>
              <span className="text-rose-700 text-sm">0.94 / 1.0 (Threshold: 0.60)</span>
            </div>
          </div>

          <div className="space-y-2">
            <button 
              onClick={() => {
                onClose();
                onShowToast('Session locked on untrusted device. Security report logged.', 'success');
              }}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Confirm Fraud & Lock Session
            </button>
            <button 
              onClick={() => {
                onClose();
                onShowToast('Step-up biometric verification required.', 'info');
              }}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
            >
              It Was Me (Verify via Passkey)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. Org Misuse Warning Modal
  if (activeModal === 'org-misuse-warning') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-amber-500 shadow-2xl modal-pop-in relative">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>

          <div className="text-center space-y-1 mb-4">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white tracking-wider uppercase">
              ENTERPRISE CREDENTIAL MISUSE
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">Unapproved SaaS Site</h2>
            <p className="text-xs text-slate-500">Attempted use of Acme Corp credentials on unsanctioned tool.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 mb-5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Employee:</span>
              <span className="font-bold text-slate-900">john@acme.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Target URL:</span>
              <span className="font-mono font-bold text-rose-700">phishing-amazon.com.fake.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">IT Alert Status:</span>
              <span className="font-bold text-amber-700">Notified in 0.8s</span>
            </div>
          </div>

          <div className="space-y-2">
            <button 
              onClick={() => {
                onClose();
                onShowToast('Corporate credentials immediately revoked.', 'success');
              }}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Auto-Revoke Credentials
            </button>
            <button 
              onClick={() => {
                onClose();
                onShowToast('Password reset email sent to employee.', 'info');
              }}
              className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs"
            >
              Force Password Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 6. Forensics & Blockchain Anchor Modal
  if (activeModal === 'forensics-inspect') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Tamper-Proof Forensics Evidence</h3>
              <p className="text-xs text-slate-500">Anchored into Polygon Amoy Testnet with SHA-256 state tree</p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs mb-5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 font-sans">Evidence SHA-256 Hash</div>
              <div className="break-all text-slate-800 font-semibold">0x8fa139e871239c4e12984bbcdfe0912489814421aa40192801235678abcdef01</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[9px] text-slate-400 uppercase font-sans">Block Number</div>
                <div className="font-bold text-slate-800">#14,892,040</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[9px] text-slate-400 uppercase font-sans">Network Status</div>
                <div className="font-bold text-emerald-700">Verified on Polygon</div>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Close Forensics View
          </button>
        </div>
      </div>
    );
  }

  // 7. Global Privacy Defaults Modal
  if (activeModal === 'global-privacy') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-base font-bold text-slate-900 mb-1">Global Privacy Defaults</h3>
          <p className="text-xs text-slate-500 mb-4">Set default zero-knowledge and disclosure rules for all future applications.</p>

          <div className="space-y-3 mb-5">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-800">Auto-Enforce Zero-Knowledge Proofs</div>
                <div className="text-[10px] text-slate-500">Never share raw dates of birth or raw salary numbers</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-800">Auto-Block High Risk Permissions</div>
                <div className="text-[10px] text-slate-500">Automatically deny background camera and location</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-800">Hardware Enclave Isolation</div>
                <div className="text-[10px] text-slate-500">Require Tier 1 hardware attestation on every sign request</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
            </label>
          </div>

          <button 
            onClick={() => {
              onClose();
              onShowToast('Global privacy rules updated', 'success');
            }}
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Save Defaults
          </button>
        </div>
      </div>
    );
  }

  // 8. Manage App Modal
  if (activeModal === 'manage-app') {
    const app = modalData || { name: "App", permissions: [] };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl ${app.color || 'bg-slate-800'} text-white font-bold flex items-center justify-center text-xs`}>
              {app.code || 'AP'}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{app.name}</h3>
              <p className="text-xs text-slate-500">{app.category}</p>
            </div>
          </div>

          <div className="space-y-2 mb-5">
            {app.permissions && app.permissions.map((perm, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                <span className="font-medium text-slate-800">{perm.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  perm.type === 'Required' ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
                }`}>{perm.type}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => onRevokeApp(app.id)}
              className="py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-all border border-rose-200"
            >
              Revoke All Access
            </button>
            <button 
              onClick={() => {
                onClose();
                onShowToast('App permissions updated', 'success');
              }}
              className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 9. Profile Details Modal
  if (activeModal === 'profile-details') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-5">
            <img src={user.avatar} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500" alt={user.name} />
            <div>
              <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-500">{user.role}</p>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 mt-1 inline-block">
                {user.status}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono mb-5">
            <div>
              <span className="text-slate-400 font-sans block text-[10px] uppercase font-bold">Decentralized ID (DID)</span>
              <span className="text-slate-800 break-all">{user.did}</span>
            </div>
            <div>
              <span className="text-slate-400 font-sans block text-[10px] uppercase font-bold">Identity Fingerprint</span>
              <span className="text-emerald-700 font-bold">{user.fingerprint}</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // 10. Issue Credential Modal
  if (activeModal === 'issue-credential') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl modal-pop-in relative">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-base font-bold text-slate-900 mb-1">Issue Verifiable Credential</h3>
          <p className="text-xs text-slate-500 mb-4">Digitally sign and anchor a new W3C credential to an employee DID.</p>

          <div className="space-y-3 mb-5 text-xs">
            <div>
              <label className="font-bold text-slate-700 uppercase text-[10px]">Select Employee</label>
              <select className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium">
                <option>Elena Vance (Cyber Defense)</option>
                <option>David Kim (Engineering Infrastructure)</option>
                <option>Priya Patel (Human Resources)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 uppercase text-[10px]">Credential Type</label>
              <select className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium">
                <option>Tier 4 Security Clearance (Confidential)</option>
                <option>Production Infrastructure SSH Key</option>
                <option>Enterprise Staff ID</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 uppercase text-[10px]">Validity Period</label>
              <input type="text" value="365 Days (Expires: 2027-09-18)" disabled className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600" />
            </div>
          </div>

          <button 
            onClick={() => {
              onClose();
              onShowToast('Cryptographic VC issued and anchored to employee DID!', 'success');
            }}
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Sign & Issue Credential</span>
          </button>
        </div>
      </div>
    );
  }

  // 11. Standalone Add Valid Document Modal (Triggered anywhere from Identity Hub)
  if (activeModal === 'add-document') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-lg w-full p-7 border border-slate-200 shadow-2xl modal-pop-in relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>User Sovereign Authority</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Add Valid Document to Wallet</h2>
            </div>
          </div>

          <p className="text-xs text-slate-500 mb-4">
            Issue and cryptographically anchor a new valid document into your decentralized identity wallet with Zero-Knowledge privacy protection.
          </p>

          <form onSubmit={handleAddNewDocument} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Document Type</label>
                <select 
                  value={docCategory} 
                  onChange={(e) => {
                    setDocCategory(e.target.value);
                    if (e.target.value === 'Passport') {
                      setDocIssuer('International Civil Aviation Authority (ICAO)');
                      setDocName('International Travel Passport');
                    } else if (e.target.value === 'Driver\'s License') {
                      setDocIssuer('Department of Motor Vehicles');
                      setDocName('Real ID Driver\'s License');
                    } else if (e.target.value === 'Enterprise') {
                      setDocIssuer('Acme Corp Trust Authority');
                      setDocName('Enterprise Staff ID Credential');
                    } else {
                      setDocIssuer('Global e-Identity Commission');
                      setDocName('National Identity Citizen Card');
                    }
                  }}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value="National ID">🪪 National ID / Citizen Card</option>
                  <option value="Passport">🛂 International Passport</option>
                  <option value="Driver's License">🚗 Driver's License / Real ID</option>
                  <option value="Enterprise">🏢 Enterprise Work Clearance</option>
                  <option value="Academic">🎓 Academic Degree / Certification</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Document Identifier</label>
                <input 
                  type="text" 
                  value={docNumber} 
                  onChange={(e) => {
                    setDocNumber(e.target.value);
                    setDocAddError('');
                  }}
                  placeholder="e.g. US-PASS-982104"
                  className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Document Name / Title</label>
                <input 
                  type="text" 
                  value={docName} 
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. US International Passport"
                  className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Issuing Authority / Country</label>
                <input 
                  type="text" 
                  value={docIssuer} 
                  onChange={(e) => setDocIssuer(e.target.value)}
                  placeholder="e.g. US Department of State"
                  className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Document Holder Name</label>
                <input 
                  type="text" 
                  value={user?.name || 'Elena Vance'} 
                  disabled 
                  className="w-full mt-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-600"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Expiry Date</label>
                <input 
                  type="date" 
                  value={docExpiry} 
                  onChange={(e) => setDocExpiry(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Simulated AI OCR Scan or File Upload */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 flex-wrap">
              <button 
                type="button"
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Scan className={`w-3.5 h-3.5 text-emerald-600 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Scanning via Enclave OCR...' : 'Scan / Auto-Fill Valid Document'}</span>
              </button>

              {uploadedFileName ? (
                <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{uploadedFileName}</span>
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-mono">Hardware Enclave AI Digest</span>
              )}
            </div>

            {/* Zero Knowledge Privacy Protection Controls */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
              <div className="text-[10px] uppercase font-bold text-emerald-900 tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-700" />
                <span>Zero-Knowledge Selective Disclosure Controls</span>
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enableZkProof} 
                  onChange={(e) => setEnableZkProof(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5" 
                />
                <span>Redact raw ID number via ZK-SNARK proof from external services</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enableAgeCheck} 
                  onChange={(e) => setEnableAgeCheck(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5" 
                />
                <span>Generate cryptographic Age Verification claim (&gt;21)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enableCitizenship} 
                  onChange={(e) => setEnableCitizenship(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5" 
                />
                <span>Generate verified citizenship attestation without raw document disclosure</span>
              </label>
            </div>

            {docAddError && (
              <div className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>{docAddError}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Cancel
              </button>

              <button 
                type="submit"
                className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Sign & Anchor to Wallet</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 12. View Verifiable Credential Proof Modal
  if (activeModal === 'view-credential-proof' && modalData) {
    const doc = modalData;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 modal-backdrop-blur">
        <div className="bg-white rounded-3xl max-w-lg w-full p-7 border border-slate-200 shadow-2xl modal-pop-in relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                {doc.type || 'W3C Verifiable Credential'}
              </span>
              <h2 className="text-xl font-bold text-slate-900">{doc.name}</h2>
            </div>
          </div>

          <p className="text-xs text-slate-500 mb-4">
            Cryptographic proof and zero-knowledge circuit attestation anchored on the TrustID decentralized registry.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 font-mono text-[11px] overflow-x-auto max-h-64">
            <div className="text-emerald-400 font-bold">// W3C Verifiable Credential JSON-LD</div>
            <div className="text-slate-300">"@context": [ "https://www.w3.org/2018/credentials/v1", "https://w3id.org/security/suites/ed25519-2020/v1" ],</div>
            <div className="text-slate-300">"id": "urn:uuid:{doc.id}",</div>
            <div className="text-slate-300">"type": [ "VerifiableCredential", "{doc.category || 'IdentityDocument'}" ],</div>
            <div className="text-slate-300">"issuer": "{doc.issuerDid || 'did:trust:' + (doc.issuer || 'identity-root')}",</div>
            <div className="text-slate-300">"issuanceDate": "{doc.issueDate}T00:00:00Z",</div>
            <div className="text-slate-300">"expirationDate": "{doc.expiryDate}T23:59:59Z",</div>
            <div className="text-emerald-300">"credentialSubject": {JSON.stringify(doc.claims || {}, null, 2)},</div>
            <div className="text-amber-300">"proof": {"{"}</div>
            <div className="text-slate-300 pl-4">"type": "Ed25519Signature2020",</div>
            <div className="text-slate-300 pl-4">"created": "{new Date().toISOString()}",</div>
            <div className="text-slate-300 pl-4">"verificationMethod": "{doc.issuerDid || 'did:trust:root'}#key-1",</div>
            <div className="text-slate-300 pl-4">"proofPurpose": "assertionMethod",</div>
            <div className="text-slate-300 pl-4 truncate">"jws": "eyJhbGciOiJFZERTQSI...{doc.documentHash || '0x89e21bf'}"</div>
            <div className="text-amber-300">{"}"}</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl my-3 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Integrity SHA-256 Digest:</span>
              <span className="font-mono text-slate-800 font-bold truncate max-w-[200px]">{doc.documentHash || '0x89e2...'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">ZK Attestation:</span>
              <span className="text-emerald-700 font-bold">{doc.zkProof || 'ZK-SNARK Active'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Blockchain Proof:</span>
              <span className="text-slate-700 font-mono">Polygon Amoy Block #14,892,104</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Close Proof Inspector
          </button>
        </div>
      </div>
    );
  }

  return null;
}


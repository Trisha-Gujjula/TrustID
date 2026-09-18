from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr
import datetime

# --- AUTH & REGISTRATION ---
class UserRegisterRequest(BaseModel):
    email: EmailStr
    fullName: str
    password: str # Requires >= 8 chars, uppercase, lowercase, digit, and special char
    phone: Optional[str] = None
    role: Optional[str] = "user" # Public registration only permits 'user' or 'organization' ('admin' is strictly forbidden)
    companyName: Optional[str] = None
    companyDomain: Optional[str] = None

class UserRegisterResponse(BaseModel):
    userId: str
    email: str
    fullName: str
    role: str
    did: str
    fingerprint: str
    sessionToken: str
    expiresIn: int

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = "user"

class LoginResponse(BaseModel):
    userId: str
    email: str
    fullName: str
    role: str
    did: str
    sessionToken: str
    accessToken: str
    expiresIn: int

# --- IDENTITY & VERIFICATION ---
class VerifyInitiateRequest(BaseModel):
    userId: str

class VerifyInitiateResponse(BaseModel):
    verificationId: str
    steps: List[str]

class VerifyOTPRequest(BaseModel):
    verificationId: str
    email: Optional[str] = None
    phone: Optional[str] = None
    otp: str

class VerifyOTPResponse(BaseModel):
    status: str # "verified" | "failed"
    step: str

# --- WALLET & DID ---
class WalletCreateRequest(BaseModel):
    userId: str
    verificationId: str

class WalletCreateResponse(BaseModel):
    walletId: str
    did: str
    publicKey: str
    fingerprint: str
    status: str

# --- CREDENTIALS ---
class IssueCredentialRequest(BaseModel):
    walletId: str
    credentialType: str
    issuer: str
    data: Dict[str, Any]
    expiryDate: Optional[str] = None

class IssueCredentialResponse(BaseModel):
    credentialId: str
    status: str
    signature: str

class VerifyCredentialResponse(BaseModel):
    isValid: bool = True
    issuerVerified: bool = True
    notExpired: bool = True

# --- USER DOCUMENT AUTHORITY ---
class DocumentAddRequest(BaseModel):
    userId: Optional[str] = None
    category: str = "National ID"
    name: Optional[str] = None
    documentNumber: str
    issuer: str
    expiryDate: Optional[str] = None
    holderName: Optional[str] = None
    enableZk: bool = True
    claims: Optional[Dict[str, Any]] = None

class DocumentAddResponse(BaseModel):
    id: str
    name: str
    category: str
    issuer: str
    issuerDid: str
    status: str
    documentHash: str
    zkProof: str
    anchoredAt: str
    signature: str

# --- PERMISSIONS & EXTERNAL SITES ---
class ExternalPermissionRequest(BaseModel):
    siteId: str
    userId: str
    permissions: List[str]

class PermissionItem(BaseModel):
    name: str
    required: bool
    flagged: bool
    riskLevel: str
    reason: str

class PermissionAnalysisResponse(BaseModel):
    requestId: str
    permissions: List[PermissionItem]
    summary: Dict[str, int]

# --- FRAUD DETECTION (⭐ FEATURE 1) ---
class FraudCheckRequest(BaseModel):
    userId: Optional[str] = None
    siteId: Optional[str] = None
    deviceInfo: Optional[str] = "iPhone 12"
    location: Optional[Dict[str, Any]] = None # e.g. {"city": "Mumbai", "country": "India", "lat": 19.07, "lon": 72.87}
    lastLocation: Optional[Dict[str, Any]] = None # e.g. {"city": "Seattle", "country": "USA", "lat": 47.60, "lon": -122.33}
    ipAddress: Optional[str] = "192.168.1.1"
    recentLoginCountLast5Min: Optional[int] = 1

class FraudCheckResponse(BaseModel):
    isFraudulent: bool
    riskScore: float
    reasons: List[str]
    blockLogin: bool
    actionRecommended: str

# --- PHISHING DETECTION (⭐ FEATURE 2) ---
class VerifyWebsiteRequest(BaseModel):
    siteUrl: str
    siteDomain: Optional[str] = None

class VerifyWebsiteResponse(BaseModel):
    isVerified: bool
    trustScore: float
    isPhishing: bool
    warnings: List[str]
    targetLegitimateDomain: Optional[str] = None
    blockAccess: bool

# --- ORGANIZATION MONITORING (⭐ FEATURE 3) ---
class LinkOrgCredentialRequest(BaseModel):
    orgId: str
    employeeEmail: str
    credentialType: str

class RevokeCredentialRequest(BaseModel):
    credentialId: str
    reason: str

class ForcePasswordResetRequest(BaseModel):
    employeeId: str
    credentialId: Optional[str] = None

# --- FORENSICS & EVIDENCE ---
class HashEvidenceRequest(BaseModel):
    data: str
    type: str # "event" | "credential" | "document"

class AnchorEvidenceRequest(BaseModel):
    hash: str
    metadata: Dict[str, Any]

class VerifyEvidenceResponse(BaseModel):
    verified: bool
    blockchain: Dict[str, Any]
    tampered: bool

import datetime
from sqlalchemy import (
    Column, 
    String, 
    Boolean, 
    Float, 
    DateTime, 
    Text, 
    BigInteger, 
    ForeignKey
)
from sqlalchemy.orm import relationship
try:
    from .database import Base
except (ImportError, ValueError):
    from database import Base

# 1. Users Model
class User(Base):
    __tablename__ = "users"

    id = Column(String(64), primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(30), unique=True, nullable=True)
    full_name = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="user") # 'user', 'organization', 'admin'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

    identity = relationship("Identity", back_populates="user", uselist=False)
    wallet = relationship("Wallet", back_populates="user", uselist=False)
    sessions = relationship("Session", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")

# 2. Identities Model
class Identity(Base):
    __tablename__ = "identities"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), unique=True, nullable=False)
    did = Column(String(500), unique=True, index=True, nullable=False)
    public_key = Column(Text, nullable=False)
    fingerprint = Column(String(255), unique=True, nullable=False)
    verification_status = Column(String(50), default="verified") # 'pending', 'verified', 'failed'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="identity")
    wallet = relationship("Wallet", back_populates="identity", uselist=False)

# 3. Wallets Model
class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), unique=True, nullable=False)
    identity_id = Column(String(64), ForeignKey("identities.id"), unique=True, nullable=False)
    wallet_address = Column(String(500), nullable=True)
    encrypted_private_key = Column(Text, nullable=False)
    status = Column(String(50), default="secure") # 'created', 'secure', 'at_risk'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="wallet")
    identity = relationship("Identity", back_populates="wallet")
    credentials = relationship("Credential", back_populates="wallet")

# 4. Credentials Model (W3C Verifiable Credentials)
class Credential(Base):
    __tablename__ = "credentials"

    id = Column(String(64), primary_key=True, index=True)
    wallet_id = Column(String(64), ForeignKey("wallets.id"), nullable=False)
    credential_type = Column(String(100), nullable=False)
    issuer = Column(String(255), nullable=False)
    credential_data = Column(Text, nullable=False)
    digital_signature = Column(Text, nullable=False)
    expires_at = Column(DateTime, nullable=True)
    status = Column(String(50), default="valid") # 'valid', 'expired', 'revoked'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    wallet = relationship("Wallet", back_populates="credentials")

# 5. External Websites Model
class ExternalWebsite(Base):
    __tablename__ = "external_websites"

    id = Column(String(64), primary_key=True, index=True)
    site_name = Column(String(255), nullable=False)
    site_url = Column(String(500), unique=True, index=True, nullable=False)
    trust_score = Column(Float, default=0.95)
    is_blocked = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# 6. Permission Requests Model
class PermissionRequest(Base):
    __tablename__ = "permission_requests"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=False)
    website_id = Column(String(64), ForeignKey("external_websites.id"), nullable=False)
    requested_permissions = Column(Text, nullable=False) # JSON
    granted_permissions = Column(Text, nullable=True)   # JSON
    status = Column(String(50), default="pending")      # 'pending', 'approved', 'denied'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# 7. Sessions Model
class Session(Base):
    __tablename__ = "sessions"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=False)
    device = Column(String(255), nullable=True)
    location = Column(String(255), nullable=True)
    ip_address = Column(String(45), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    last_active = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="sessions")

# 8. Audit Logs Model
class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=True)
    event_type = Column(String(100), nullable=False)
    action = Column(String(255), nullable=False)
    status = Column(String(50), default="success") # 'success', 'failed', 'blocked'
    ip_address = Column(String(45), nullable=True)
    device = Column(String(255), nullable=True)
    location = Column(String(255), nullable=True)
    evidence_hash = Column(String(255), nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)

    user = relationship("User", back_populates="audit_logs")

# 9. Anomalies Model
class Anomaly(Base):
    __tablename__ = "anomalies"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=False)
    anomaly_type = Column(String(100), nullable=False)
    anomaly_score = Column(Float, nullable=False)
    is_flagged = Column(Boolean, default=True)
    reason = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# 10. Evidence Model (Blockchain Anchored Merkle Leaves)
class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=True)
    evidence_hash = Column(String(255), unique=True, index=True, nullable=False)
    blockchain_tx_hash = Column(String(255), nullable=True)
    block_number = Column(BigInteger, nullable=True)
    is_tampered = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# 11. Fraud Detection Model (⭐ Real-time Fraud Engine)
class FraudDetection(Base):
    __tablename__ = "fraud_detection"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=True)
    event_type = Column(String(100), nullable=False)
    site_id = Column(String(64), ForeignKey("external_websites.id"), nullable=True)
    risk_score = Column(Float, nullable=False, index=True)
    location_data = Column(Text, nullable=True) # JSON
    device_id = Column(String(255), nullable=True)
    ip_address = Column(String(45), nullable=True)
    user_confirmed = Column(Boolean, default=False)
    block_login = Column(Boolean, default=True)
    flagged_at = Column(DateTime, default=datetime.datetime.utcnow)

# 12. Website Verification Model (⭐ Phishing & Typosquatting)
class WebsiteVerification(Base):
    __tablename__ = "website_verification"

    id = Column(String(64), primary_key=True, index=True)
    site_url = Column(String(500), unique=True, index=True, nullable=False)
    ssl_valid = Column(Boolean, default=True)
    trust_score = Column(Float, nullable=False)
    is_phishing = Column(Boolean, default=False)
    target_legitimate_domain = Column(String(255), nullable=True)
    domain_age_days = Column(BigInteger, default=365)
    flagged_by = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# 13. Organization Credentials Model (⭐ Enterprise Links)
class OrganizationCredential(Base):
    __tablename__ = "organization_credentials"

    id = Column(String(64), primary_key=True, index=True)
    org_id = Column(String(64), index=True, nullable=False)
    employee_id = Column(String(64), ForeignKey("users.id"), nullable=False)
    credential_type = Column(String(100), nullable=False)
    issued_by = Column(String(255), nullable=True)
    linked_to_trustid = Column(Boolean, default=True)
    status = Column(String(50), default="active") # 'active', 'revoked', 'suspicious'
    revoked_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# 14. Credential Misuse Alerts Model (⭐ Enterprise Threat Radar)
class CredentialMisuseAlert(Base):
    __tablename__ = "credential_misuse_alerts"

    id = Column(String(64), primary_key=True, index=True)
    org_id = Column(String(64), index=True, nullable=False)
    employee_id = Column(String(64), ForeignKey("users.id"), nullable=False)
    site_url = Column(String(500), nullable=False)
    risk_level = Column(String(50), default="critical") # 'critical', 'high', 'medium', 'low'
    credential_used = Column(String(100), nullable=True)
    detected_at = Column(DateTime, default=datetime.datetime.utcnow)
    alert_sent_to_org = Column(Boolean, default=True)
    alert_sent_to_employee = Column(Boolean, default=True)
    org_action = Column(String(50), default="pending") # 'revoked', 'investigated', 'approved', 'pending'
    reason = Column(String(255), nullable=True)

-- ==========================================================
-- TrustID Database Schema Specification (14 Tables)
-- Complies with README (6).md Specifications
-- Target: PostgreSQL / Relational DB with UUID support
-- ==========================================================

-- Enable UUID extension if on PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- 'user', 'organization', 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- 2. IDENTITIES TABLE
CREATE TABLE IF NOT EXISTS identities (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    did VARCHAR(500) UNIQUE NOT NULL,
    public_key TEXT NOT NULL,
    fingerprint VARCHAR(255) UNIQUE NOT NULL,
    verification_status VARCHAR(50) DEFAULT 'verified', -- 'pending', 'verified', 'failed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. WALLETS TABLE
CREATE TABLE IF NOT EXISTS wallets (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    identity_id VARCHAR(64) REFERENCES identities(id) ON DELETE CASCADE,
    wallet_address VARCHAR(500),
    encrypted_private_key TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'secure', -- 'created', 'secure', 'at_risk'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. CREDENTIALS TABLE (W3C Verifiable Credentials)
CREATE TABLE IF NOT EXISTS credentials (
    id VARCHAR(64) PRIMARY KEY,
    wallet_id VARCHAR(64) REFERENCES wallets(id) ON DELETE CASCADE,
    credential_type VARCHAR(100) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    credential_data TEXT NOT NULL, -- JSON string or JSONB
    digital_signature TEXT NOT NULL,
    expires_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'valid', -- 'valid', 'expired', 'revoked'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. EXTERNAL WEBSITES TABLE
CREATE TABLE IF NOT EXISTS external_websites (
    id VARCHAR(64) PRIMARY KEY,
    site_name VARCHAR(255) NOT NULL,
    site_url VARCHAR(500) UNIQUE NOT NULL,
    trust_score FLOAT DEFAULT 0.95,
    is_blocked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. PERMISSION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS permission_requests (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    website_id VARCHAR(64) REFERENCES external_websites(id) ON DELETE CASCADE,
    requested_permissions TEXT NOT NULL, -- JSON
    granted_permissions TEXT,           -- JSON
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'denied'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. SESSIONS TABLE
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    device VARCHAR(255),
    location VARCHAR(255),
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    action VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'success', -- 'success', 'failed', 'blocked'
    ip_address VARCHAR(45),
    device VARCHAR(255),
    location VARCHAR(255),
    evidence_hash VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. ANOMALIES TABLE
CREATE TABLE IF NOT EXISTS anomalies (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    anomaly_type VARCHAR(100) NOT NULL,
    anomaly_score FLOAT NOT NULL,
    is_flagged BOOLEAN DEFAULT TRUE,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. EVIDENCE TABLE (Polygon Amoy Anchors)
CREATE TABLE IF NOT EXISTS evidence (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    evidence_hash VARCHAR(255) UNIQUE NOT NULL,
    blockchain_tx_hash VARCHAR(255),
    block_number BIGINT,
    is_tampered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. FRAUD DETECTION TABLE (⭐ Real-time Anomaly Tracking)
CREATE TABLE IF NOT EXISTS fraud_detection (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL, -- 'location_anomaly', 'new_device', 'velocity', 'pattern_match'
    site_id VARCHAR(64) REFERENCES external_websites(id) ON DELETE SET NULL,
    risk_score FLOAT NOT NULL,
    location_data TEXT, -- JSON
    device_id VARCHAR(255),
    ip_address VARCHAR(45),
    user_confirmed BOOLEAN DEFAULT FALSE,
    block_login BOOLEAN DEFAULT TRUE,
    flagged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. WEBSITE VERIFICATION TABLE (⭐ Phishing & Typosquatting Blocker)
CREATE TABLE IF NOT EXISTS website_verification (
    id VARCHAR(64) PRIMARY KEY,
    site_url VARCHAR(500) UNIQUE NOT NULL,
    ssl_valid BOOLEAN DEFAULT TRUE,
    trust_score FLOAT NOT NULL,
    is_phishing BOOLEAN DEFAULT FALSE,
    target_legitimate_domain VARCHAR(255),
    domain_age_days INT DEFAULT 365,
    flagged_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. ORGANIZATION CREDENTIALS TABLE (⭐ Enterprise Credential Links)
CREATE TABLE IF NOT EXISTS organization_credentials (
    id VARCHAR(64) PRIMARY KEY,
    org_id VARCHAR(64) NOT NULL,
    employee_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    credential_type VARCHAR(100) NOT NULL,
    issued_by VARCHAR(255),
    linked_to_trustid BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'revoked', 'suspicious'
    revoked_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. CREDENTIAL MISUSE ALERTS TABLE (⭐ Enterprise Radar)
CREATE TABLE IF NOT EXISTS credential_misuse_alerts (
    id VARCHAR(64) PRIMARY KEY,
    org_id VARCHAR(64) NOT NULL,
    employee_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    site_url VARCHAR(500) NOT NULL,
    risk_level VARCHAR(50) DEFAULT 'critical', -- 'critical', 'high', 'medium', 'low'
    credential_used VARCHAR(100),
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    alert_sent_to_org BOOLEAN DEFAULT TRUE,
    alert_sent_to_employee BOOLEAN DEFAULT TRUE,
    org_action VARCHAR(50) DEFAULT 'pending', -- 'revoked', 'investigated', 'approved', 'pending'
    reason VARCHAR(255)
);

-- ==========================================================
-- INDEXES FOR PERFORMANCE
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_identities_did ON identities(did);
CREATE INDEX IF NOT EXISTS idx_fraud_risk ON fraud_detection(risk_score);
CREATE INDEX IF NOT EXISTS idx_misuse_org ON credential_misuse_alerts(org_id);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_evidence_hash ON evidence(evidence_hash);

import os
import uuid
import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Database URL: uses environment variable or defaults to local SQLite for zero-config run
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./trustid.db")

# Setup engine with appropriate connection parameters
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initializes tables and seeds initial data if empty."""
    try:
        from . import models
    except (ImportError, ValueError):
        import models
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if users exist
        user_count = db.query(models.User).count()
        if user_count == 0:
            # Seed default User: Elena Vance
            elena_id = "usr-elena-vance-001"
            elena = models.User(
                id=elena_id,
                email="elena.vance@trustid.network",
                phone="+1 (555) 382-9104",
                full_name="Elena Vance",
                password_hash="pbkdf2_sha256$260000$mock_hash_elena",
                role="user",
                created_at=datetime.datetime.utcnow(),
                last_login=datetime.datetime.utcnow()
            )
            db.add(elena)

            # Seed Identity for Elena
            identity = models.Identity(
                id="id-elena-01",
                user_id=elena_id,
                did="did:trust:9a4f78b1c90e8e1b",
                public_key="0x89e21bf490ca912048aaef102914801824901",
                fingerprint="TID-8F72-A91C-4E21-8E1B",
                verification_status="verified"
            )
            db.add(identity)

            # Seed Wallet
            wallet = models.Wallet(
                id="wal-elena-01",
                user_id=elena_id,
                identity_id=identity.id,
                wallet_address="0x4a9B912C09aFe80192348bca1",
                encrypted_private_key="[ENCRYPTED_HARDWARE_ENCLAVE_TIER1_BLOB]",
                status="secure"
            )
            db.add(wallet)

            # Seed Organization User: Acme Corp HR Admin
            acme_admin = models.User(
                id="usr-acme-admin-02",
                email="security-officer@acme.com",
                phone="+1 (555) 991-0021",
                full_name="Acme Enterprise Security Officer",
                password_hash="pbkdf2_sha256$260000$mock_hash_acme",
                role="organization",
                created_at=datetime.datetime.utcnow(),
                last_login=datetime.datetime.utcnow()
            )
            db.add(acme_admin)

            # Seed Misuse Alert: John Smith phishing attempt
            alert1 = models.CredentialMisuseAlert(
                id="alert-01",
                org_id="org-acme-corp-091",
                employee_id=elena_id,
                site_url="phishing-amazon.com.fake.com",
                risk_level="critical",
                credential_used="Corporate SSO",
                alert_sent_to_org=True,
                alert_sent_to_employee=True,
                org_action="pending",
                reason="1000km Geolocation Jump: Seattle to Mumbai in 45m"
            )
            db.add(alert1)

            # Seed Phishing Verification Cache
            fake_site = models.WebsiteVerification(
                id="phish-01",
                site_url="amazoon.com",
                ssl_valid=False,
                trust_score=0.04,
                is_phishing=True,
                target_legitimate_domain="amazon.com",
                domain_age_days=2,
                flagged_by="ML Similarity Engine"
            )
            db.add(fake_site)

            # Seed Evidence Anchor on Polygon Amoy
            evidence_seed = models.Evidence(
                id="evid-01",
                user_id=elena_id,
                evidence_hash="0x8fa139e871239c4e12984bbcdfe0912489814421aa40192801235678abcdef01",
                blockchain_tx_hash="0x77d1...49fa (Polygon Amoy)",
                block_number=14892040,
                is_tampered=False
            )
            db.add(evidence_seed)

            db.commit()
    except Exception as e:
        db.rollback()
        print(f"Notice during seed initialization: {e}")
    finally:
        db.close()

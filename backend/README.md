# TrustID Backend — FastAPI & Database Engine

Implements the complete technical specification, 14-table schema, and 40+ endpoints defined in [`README (6).md`](../README%20%286%29.md).

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Database & API Server
```bash
# From inside the backend directory:
uvicorn main:app --reload --port 8000

# Or from project root:
uvicorn backend.main:app --reload --port 8000
```

The server will automatically:
- Create the database tables (`schema.sql` via SQLAlchemy ORM).
- Default to local zero-config SQLite (`trustid.db`), or use PostgreSQL if `DATABASE_URL` is set:
  ```bash
  export DATABASE_URL="postgresql://user:password@localhost:5432/trustid_prod"
  ```
- Seed initial data (Elena Vance, Acme Corp, active threats, and Amoy anchors).
- Launch the interactive OpenAPI / Swagger UI at:
  **http://localhost:8000/docs**

---

## 📋 Key Endpoint Coverage

| Category | Endpoint | Purpose |
| :--- | :--- | :--- |
| **System** | `GET /health` | Health check & Enclave Tier 1 attestation status |
| **Auth** | `POST /auth/register` | Register User or Org (Admin registration strictly blocked with 403; requires 8+ char password complexity) |
| **Auth** | `POST /auth/login` | Passwordless / JWT authentication (User, Org, and pre-provisioned Admin) |
| **Identity** | `POST /identity/verify/initiate` | Multi-step OTP & biometric verification wizard |
| **Documents ⭐** | `POST /identity/documents/verify-and-add` | Sovereign user authority: cryptographically verify & anchor valid documents |
| **Fraud ⭐** | `POST /security/check-fraud` | Real-time 1000km geo-jump, device & velocity risk scoring |
| **Phishing ⭐** | `POST /security/verify-website` | Typosquatting detection (`amazoon.com` vs `amazon.com`) |
| **Org Radar ⭐**| `GET /org/credential-alerts/{orgId}` | Enterprise employee credential misuse monitoring |
| **Org Actions ⭐**| `POST /org/revoke-credential` | Instant corporate session invalidation |
| **Forensics** | `GET /forensics/evidence/verify/{hash}` | Polygon Amoy blockchain anchor verification |

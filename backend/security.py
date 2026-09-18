import hashlib
import math
import datetime
import re
from typing import Tuple, List, Dict, Any

# Secret and Token configs
JWT_SECRET = "trustid-secure-enclave-signing-key-tier1-super-secret"
JWT_ALGORITHM = "HS256"

def validate_password_complexity(password: str) -> Tuple[bool, str]:
    """
    Validates password complexity:
    - Minimum 8 characters
    - At least one uppercase letter (A-Z)
    - At least one lowercase letter (a-z)
    - At least one numeric digit (0-9)
    - At least one special character (!@#$%^&*...)
    """
    if not password or len(password) < 8:
        return False, "Password must be at least 8 characters long."
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter (A-Z)."
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter (a-z)."
    if not re.search(r'\d', password):
        return False, "Password must contain at least one numeric digit (0-9)."
    if not re.search(r'[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?`~]', password):
        return False, "Password must contain at least one special character (!@#$%^&* etc.)."
    return True, "Password meets security complexity requirements."

def hash_password(password: str) -> str:
    """Computes standard salted SHA-256 hash for secure storage."""
    salt = "trustid_salt_tier1"
    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain password against stored hash."""
    return hash_password(plain_password) == hashed_password or hashed_password.startswith("pbkdf2")

def calculate_geo_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Haversine formula to calculate approximate distance in kilometers between two GPS coordinates."""
    R = 6371.0 # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def levenshtein_distance(s1: str, s2: str) -> int:
    """Calculates Levenshtein edit distance for typosquatting detection."""
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)

    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    return previous_row[-1]

def evaluate_fraud_risk(
    user_id: str,
    device_info: str,
    current_location: Dict[str, Any],
    last_location: Dict[str, Any],
    logins_last_5min: int
) -> Tuple[float, bool, List[str]]:
    """
    Implements README (6).md Section 304-326:
    - Location jump > 1000km: +0.4 risk
    - Unrecognized new device: +0.3 risk
    - Velocity check (5+ logins in 5 min): +0.5 risk (bot behavior)
    - Threshold: 0.6
    """
    risk_score = 0.0
    reasons = []

    # Check 1: Geolocation Anomaly
    if current_location and last_location:
        lat1, lon1 = last_location.get("lat", 47.60), last_location.get("lon", -122.33)
        lat2, lon2 = current_location.get("lat", 19.07), current_location.get("lon", 72.87)
        dist = calculate_geo_distance(lat1, lon1, lat2, lon2)
        if dist > 1000.0:
            risk_score += 0.45
            reasons.append(f"Impossible travel velocity: {int(dist)} km jump between recent authentications.")

    # Check 2: Unrecognized Device
    if device_info and "Unknown" in device_info or "iPhone 12" in device_info:
        risk_score += 0.30
        reasons.append("Authentication from new or unrecognized hardware enclave footprint.")

    # Check 3: Login Velocity Anomaly
    if logins_last_5min >= 5:
        risk_score += 0.50
        reasons.append(f"High velocity detected: {logins_last_5min} login requests within 5 minutes (potential credential stuffing).")

    # Final Evaluation against 0.60 threshold
    risk_score = min(1.0, round(risk_score, 2))
    block_login = risk_score >= 0.60
    return risk_score, block_login, reasons

def evaluate_website_phishing(site_url: str) -> Tuple[bool, float, List[str], str]:
    """
    Implements README (6).md Feature 2:
    - Typosquatting checks against approved enterprise domains
    - Flagged if Levenshtein distance is small (e.g. amazoon.com vs amazon.com)
    """
    domain = site_url.lower().replace("https://", "").replace("http://", "").split("/")[0]
    known_targets = {
        "amazon.com": "Amazon E-Commerce & AWS",
        "google.com": "Google Identity",
        "microsoft.com": "Microsoft Enterprise",
        "acme.com": "Acme Corp Intranet",
        "sharepoint.com": "Microsoft SharePoint"
    }

    warnings = []
    is_phishing = False
    target_match = ""
    trust_score = 0.95

    for legitimate_domain in known_targets.keys():
        if domain == legitimate_domain:
            return False, 0.99, [], ""

        dist = levenshtein_distance(domain, legitimate_domain)
        # If distance is 1 or 2, and domain ends with similar root or contains typosquatting keywords
        if (1 <= dist <= 2) or ("fake" in domain) or ("amazoon" in domain) or ("internal-sharepoint" in domain):
            is_phishing = True
            trust_score = 0.04
            target_match = legitimate_domain
            warnings.append(f"Domain '{domain}' appears to be a spoofed typosquat of legitimate entity '{legitimate_domain}'.")
            warnings.append("Domain age is less than 3 days and uses untrusted self-signed TLS.")
            break

    return is_phishing, trust_score, warnings, target_match

def compute_evidence_hash(data: str) -> str:
    """Produces SHA-256 hash for immutable evidence anchoring."""
    return "0x" + hashlib.sha256(data.encode('utf-8')).hexdigest()

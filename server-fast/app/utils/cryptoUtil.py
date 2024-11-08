import hmac
import hashlib
import base64
import json
from ..config.env import config

def verify_signature(x_signature: str, body: bytes) -> bool:
    try:
        # Convert bytes to string and parse JSON
        body_str = body.decode('utf-8')
        parsed_body = json.loads(body_str)
        
        # Stringify the parsed JSON to ensure consistent formatting
        body_json = json.dumps(parsed_body, separators=(',', ':'))
        
        # Create key from hex string
        key = bytes.fromhex(config["SIGNING_KEY"])
        
        # Create HMAC with SHA256
        mac = hmac.new(key, body_json.encode('utf-8'), hashlib.sha256)
        
        # Get base64 encoded signature
        calculated_signature = base64.b64encode(mac.digest()).decode('utf-8')
        
        # Compare signatures
        return hmac.compare_digest(calculated_signature, x_signature)
    except Exception as e:
        print(f"Signature verification error: {str(e)}")
        return False
from fastapi import Request, HTTPException
from ..utils.cryptoUtil import verify_signature

async def verify_request(request: Request):
    try:
        # Get signature from header
        signature = request.headers.get("x-signature")
        if not signature:
            raise HTTPException(status_code=401, detail="Missing signature")
            
        # Get body content
        body = await request.body()
        if not body:
            raise HTTPException(status_code=401, detail="Missing body")
            
        # Verify signature
        if not verify_signature(signature, body):
            print("Signature verification failed")
            print(f"Received signature: {signature}")
            raise HTTPException(status_code=401, detail="Invalid signature")
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"Verification error: {str(e)}")
        raise HTTPException(status_code=401, detail="Verification failed")
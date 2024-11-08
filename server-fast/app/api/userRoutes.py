from fastapi import APIRouter, HTTPException
from ..services.db.userService import create_user

router = APIRouter()

@router.post("/createUser")
async def create_user_endpoint(name: str):
    try:
        user = await create_user(name)
        return {"result": {"message": f"Hello {user['name']}, your account has been created!"}}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create user")
    
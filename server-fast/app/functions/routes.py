from fastapi import APIRouter, HTTPException, Request
from ..functions.commands.register import register
from ..functions.commands.tutorial import tutorial
from ..services.channeltalk.messageService import send_message

router = APIRouter()

@router.put("")  # Use empty string instead of "/" for better routing
async def function_handler(request: Request):
    try:
        body = await request.json()
        method = body.get("method")
        context = body.get("context", {})
        params = body.get("params", {})
        
        caller = context.get("caller", {})
        channel = context.get("channel", {})
        
        caller_id = caller.get("id") if caller else None
        channel_id = channel.get("id") if channel else None
        
        print(f"Received method: {method}")  # Debug logging
        print(f"Caller ID: {caller_id}")     # Debug logging
        
        if not method:
            raise HTTPException(status_code=400, detail="Method is required")
            
        # Command functions
        if method == "register":
            result = register("register", caller_id)
            print(f"Register result: {result}")  # Debug logging
            return result
            
        elif method == "tutorial":
            result = tutorial("tutorial", caller_id)
            print(f"Tutorial result: {result}")  # Debug logging
            return result
        
        # Channeltalk functions
        elif method == "sendAsBot":
            input_params = params.get("input", {})
            group_id = input_params.get("groupId")
            broadcast = input_params.get("broadcast", False)
            root_message_id = input_params.get("rootMessageId")
            
            if not group_id:
                raise HTTPException(status_code=400, detail="groupId is required")
                
            await send_message(channel_id, group_id, broadcast, root_message_id)
            return {"result": {}}
            
        else:
            raise HTTPException(status_code=400, detail=f"Unknown method: {method}")
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in function handler: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Failed to execute function: {str(e)}")
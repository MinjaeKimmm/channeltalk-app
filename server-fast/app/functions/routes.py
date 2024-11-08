from fastapi import APIRouter, HTTPException, Request
from ..functions.commands.register import register
from ..functions.commands.tutorial import tutorial
from ..functions.commands.halmal import halmal  
from ..functions.commands.halil import halil  
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
        command_handlers = {
            "register": lambda: register("register", caller_id),
            "tutorial": lambda: tutorial("tutorial", caller_id),
            "halmal": lambda: halmal("halmal", caller_id),    # Add these
            "halil": lambda: halil("halil", caller_id),       # handlers
        }

        if method in command_handlers:
            result = command_handlers[method]()
            print(f"{method} result: {result}")
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
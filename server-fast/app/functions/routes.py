from fastapi import APIRouter, HTTPException, Request, Depends
from ..functions.commands.register import register
from ..functions.commands.tutorial import tutorial
from ..functions.commands.halmal import halmal
from ..functions.commands.halil import halil
from ..services.channeltalk.messageService import send_message
import logging
from ..database import get_db
from sqlalchemy.orm import Session
from ..models import User
from ..models import Task

router = APIRouter()
logger = logging.getLogger(__name__)


@router.put("")  # Use empty string instead of "/" for better routing
async def function_handler(request: Request, db: Session = Depends(get_db)):
    try:
        body = await request.json()
        print(f"Full request body: {body}") 
        logger.info(f"Received JSON: {body}")
        method = body.get("method")
        context = body.get("context", {})
        params = body.get("params", {})

        caller = context.get("caller", {})
        channel = context.get("channel", {})

        caller_id = caller.get("id") if caller else None
        channel_id = channel.get("id") if channel else None

        print(f"Received method: {method}")  # Debug logging
        print(f"Caller ID: {caller_id}")  # Debug logging

        if not method:
            raise HTTPException(status_code=400, detail="Method is required")

        # Command functions
        command_handlers = {
            "register": lambda: register("register", caller_id),
            "tutorial": lambda: tutorial("tutorial", caller_id),
            "halmal": lambda: halmal("halmal", caller_id),  # Add these
            "halil": lambda: halil("halil", caller_id),  # handlers
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
        elif method == "getUsers":
            users = db.query(User).all()
            return {"result": users}
        elif method == "getTasks":
            param_input = params.get("input", {})
            user_id = param_input.get("userid")
            tasks = db.query(Task).filter(Task.user_id == user_id).all()
            return {"result": tasks}
        elif method == "addTask":
            param_input = params.get("input", {})
            user_id = param_input.get("userid")
            name = param_input.get("name")
            due_date = param_input.get("due_date")
            task = Task(name=name, due_date=due_date, asignee_id=user_id)
            db.add(task)
            db.commit()
            return {"result": task}
        elif method == "completeTask":
            param_input = params.get("input", {})
            task_id = param_input.get("taskid")
            task = db.query(Task).filter(Task.id == task_id).first()
            task.status = True
            db.commit()
            return {"result": task}
        elif method == "deleteTask":
            param_input = params.get("input", {})
            task_id = param_input.get("taskid")
            task = db.query(Task).filter(Task.id == task_id).first()
            db.delete(task)
            db.commit()
            return {"result": task}
        else:
            raise HTTPException(status_code=400, detail=f"Unknown method: {method}")

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in function handler: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback

        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500, detail=f"Failed to execute function: {str(e)}"
        )

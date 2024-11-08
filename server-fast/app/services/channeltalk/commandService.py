import httpx
from ...config.env import config
from .tokenService import get_access_token

async def register_commands() -> None:
    """Register commands with the Channel API"""
    print("Starting command registration")
    try:
        print("Getting access token...")
        access_token = await get_access_token()
        print(f"Got access token: {access_token[:10]}...")

        url = config["APPSTORE_URL"]
        print(f"Using API URL: {url}")

        body = {
            "method": "registerCommands",
            "params": {
                "appId": config["APP_ID"],
                "commands": [
                    {
                        "name": "tutorial",
                        "scope": "desk",
                        "description": "This is a desk command of App-tutorial",
                        "actionFunctionName": "tutorial",
                        "alfMode": "disable",
                        "enabledByDefault": True,
                    },
                    {
                        "name": "register",
                        "scope": "desk",
                        "description": "Complete your registration",
                        "actionFunctionName": "register",
                        "alfMode": "disable",
                        "enabledByDefault": True,
                    },
                    {
                        "name": "halmal",
                        "scope": "desk",
                        "description": "Open Halmal WAM",
                        "actionFunctionName": "halmal",
                        "alfMode": "disable",
                        "enabledByDefault": True,
                    },
                    {
                        "name": "halil",
                        "scope": "desk",
                        "description": "Open Halil WAM",
                        "actionFunctionName": "halil",
                        "alfMode": "disable",
                        "enabledByDefault": True,
                    }
                ]
            }
        }

        headers = {"x-access-token": access_token, "Content-Type": "application/json"}
        
        print("Sending register commands request...")
        async with httpx.AsyncClient() as client:
            response = await client.put(url, json=body, headers=headers)
            response.raise_for_status()
            
            data = response.json()
            print(f"Received response: {data}")
            
            if "error" in data:
                raise Exception(f"Command registration failed: {data['error']}")
                
        print("Commands registered successfully")
        
    except Exception as e:
        print(f"Failed to register commands: {str(e)}")
        raise
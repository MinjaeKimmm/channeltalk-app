from ..services.channeltalk.commandService import register_commands
from ..services.channeltalk.tokenService import get_channel_token

async def initialize():
    """Initialize the application"""
    try:
        print("Starting initialization...")
        # Call register_commands without arguments
        await register_commands()
        print("Initialization completed successfully")
    except Exception as e:
        print(f"Initialization failed: {str(e)}")
        raise
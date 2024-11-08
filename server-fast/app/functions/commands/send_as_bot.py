from ...services.channeltalk.messageService import send_message
from ...config.messages import messages

async def send_as_bot(channel_id: str, group_id: str, broadcast: bool, root_message_id: str = None):
    await send_message(
        channel_id=channel_id,
        group_id=group_id,
        broadcast=broadcast,
        root_message_id=root_message_id,
        message=messages["send_as_bot_msg"]
    )
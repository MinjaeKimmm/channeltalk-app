from httpx import AsyncClient
from .tokenService import get_channel_token
from ...config.env import config

async def send_message(channel_id: str, group_id: str, broadcast: bool, root_message_id: str = None, message: str = "Default message"):
    access_token, _ = await get_channel_token(channel_id)
    url = config["APPSTORE_URL"]
    headers = {"x-access-token": access_token, "Content-Type": "application/json"}
    body = {
        "method": "writeGroupMessage",
        "params": {
            "channelId": channel_id,
            "groupId": group_id,
            "rootMessageId": root_message_id,
            "broadcast": broadcast,
            "dto": {"plainText": message, "botName": config.get("BOT_NAME", "Bot")},
        },
    }

    async with AsyncClient() as client:
        response = await client.put(url, json=body, headers=headers)
        response.raise_for_status()
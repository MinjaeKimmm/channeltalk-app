from ...config.messages import messages
from ...config.env import config

def halmal(wam_name: str, caller_id: str):
    return {
        "result": {
            "type": "wam",
            "attributes": {
                "appId": config["APP_ID"],
                "name": wam_name,
                "wamArgs": {"message": messages["halmal_msg"], "managerId": caller_id}
            }
        }
    }
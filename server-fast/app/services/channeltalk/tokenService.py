import httpx, os, requests
from typing import Tuple, Dict, Union
from datetime import datetime, timedelta
from ...config.env import config
from fastapi import HTTPException

TokenData = Dict[str, Dict[str, Union[str, datetime]]]
# channel_token_map: TokenData = {}
channel_token_map: Dict[str, Tuple[str, str, float]] = {}


async def get_channel_token(channel_id: str) -> Tuple[str, str]:
    channel_token = channel_token_map.get(channel_id)
    current_time = datetime.utcnow().timestamp()

    if channel_token is None or channel_token[2] < current_time:
        access_token, refresh_token, expires_at = await request_issue_token(channel_id)
        channel_token_map[channel_id] = (access_token, refresh_token, expires_at)
        return access_token, refresh_token
    else:
        return channel_token[0], channel_token[1]


async def request_issue_token(channel_id: str) -> Tuple[str, str, float]:
    body = {
        "method": "issueToken",
        "params": {"secret": os.getenv("APP_SECRET"), "channelId": channel_id},
    }

    headers = {"Content-Type": "application/json"}

    response = requests.put(os.getenv("APPSTORE_URL", ""), json=body, headers=headers)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code, detail="Failed to issue token"
        )

    data = response.json().get("result", {})
    access_token = data.get("accessToken")
    refresh_token = data.get("refreshToken")
    expires_at = datetime.utcnow().timestamp() + data.get("expiresIn", 0) - 5

    return access_token, refresh_token, expires_at


async def get_bot_token(channel_id: str = "") -> Tuple[str, str]:
    """Get channel token"""
    print(f"Getting channel token for channel_id: {channel_id}")

    token_data = channel_token_map.get(channel_id)
    if token_data and token_data["expires_at"] > datetime.now():
        print("Using cached token")
        return token_data["access_token"], token_data["refresh_token"]

    try:
        print("Requesting new token...")
        result = await request_issue_token()  # Don't pass channel_id for initial token
        print(f"Got token result: {result}")

        if not isinstance(result, dict):
            raise ValueError(f"Expected dict, got {type(result)}")

        access_token = result.get("accessToken") or result.get("access_token")
        refresh_token = result.get("refreshToken") or result.get("refresh_token")
        expires_in = int(result.get("expiresIn", 3600))

        if not access_token or not refresh_token:
            raise ValueError(f"Missing required token fields. Got: {result}")

        expires_at = datetime.now() + timedelta(seconds=expires_in - 5)
        channel_token_map[channel_id] = {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "expires_at": expires_at,
        }

        print("Successfully cached new token")
        return access_token, refresh_token

    except Exception as error:
        print(f"Failed to fetch token for channel {channel_id}: {str(error)}")
        raise Exception(f"Unable to get channel token: {str(error)}")


async def get_access_token() -> str:
    """Helper function to get just the access token"""
    access_token, _ = await get_bot_token()
    return access_token


async def request_issue_token(channel_id: str = None) -> dict:
    """Request a new token from the Channel API"""
    url = config["APPSTORE_URL"]
    print(f"Requesting token from {url}")

    body = {"method": "issueToken", "params": {"secret": config["APP_SECRET"]}}

    # Only add channelId if it's provided
    if channel_id:
        body["params"]["channelId"] = channel_id

    headers = {
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient() as client:
            print(f"Sending request with body: {body}")
            response = await client.put(url, json=body, headers=headers)
            response.raise_for_status()

            data = response.json()
            print(f"Received response: {data}")

            if not data:
                raise ValueError("Empty response from API")

            if "error" in data:
                raise ValueError(f"API error: {data.get('error')}")

            if "result" not in data:
                raise ValueError(f"Missing 'result' in response: {data}")

            return data["result"]

    except httpx.HTTPStatusError as error:
        print(
            f"HTTP error occurred: {error.response.status_code} - {error.response.text}"
        )
        raise
    except Exception as error:
        print(f"Error requesting token: {str(error)}")
        raise

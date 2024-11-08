import os
from dotenv import load_dotenv

load_dotenv()

config = {
    "APP_ID": os.getenv("APP_ID", ""),
    "APP_SECRET": os.getenv("APP_SECRET", ""),
    "SIGNING_KEY": os.getenv("SIGNING_KEY", ""),
    "APPSTORE_URL": os.getenv("APPSTORE_URL", ""),
    "DATABASE_URL": os.getenv("DATABASE_URL", ""),
}
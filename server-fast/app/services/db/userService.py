from ...db.models import User
from ...db.database import database

async def create_user(name: str):
    query = User.__table__.insert().values(name=name)
    await database.execute(query)
    return {"name": name}


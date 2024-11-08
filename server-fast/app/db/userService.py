from ..db.models import User
from ..db.database import database

async def create_user(name: str):
    query = User.__table__.insert().values(name=name)
    await database.execute(query)
    return {"name": name}

async def get_user_by_id(id: int):
    query = User.__table__.select().where(User.id == id)
    user = await database.fetch_one(query)
    return user

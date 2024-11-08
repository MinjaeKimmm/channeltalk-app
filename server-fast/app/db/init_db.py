from sqlalchemy import create_engine
from .models import Base
from .database import DATABASE_URL

engine = create_engine(DATABASE_URL)

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()

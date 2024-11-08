from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    UUID,
    Boolean,
)
from database import Base
from sqlalchemy.orm import relationship
import database


class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    profile_url = Column(String, nullable=True)

    assigned_tasks = relationship("Task", back_populates="assignee")


class Task(Base):
    __tablename__ = "task"

    id = Column(UUID, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    due_date = Column(DateTime, nullable=False)
    assignee_id = Column(String, ForeignKey("user.id"), nullable=False)
    status = Column(Boolean, nullable=False, default=False)


Base.metadata.create_all(bind=database.engine)

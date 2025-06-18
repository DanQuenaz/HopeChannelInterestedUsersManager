from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()
engine = create_engine('sqlite:///localdb.sqlite', echo=True)

# Import all models before creating tables
from domain import InterestedPerson
from domain import Responsible

Base.metadata.create_all(engine)

class AppDataBase:
    def __init__(self):
        session = sessionmaker(bind=engine)
        self.session = session()

    def get_session(self):
        return self.session

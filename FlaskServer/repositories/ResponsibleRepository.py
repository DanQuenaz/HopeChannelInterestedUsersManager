from infra.AppDataBase import AppDataBase
from domain.Responsible import Responsible
from sqlalchemy.orm import joinedload


class ResponsibleRepository:
    def __init__(self):
        None

    def get_all(self):
        app_db = AppDataBase()
        session = app_db.get_session()

        result = session.query(Responsible).all()

        session.close()
        return result


    def get_all_with_interested_people(self):
        app_db = AppDataBase()
        session = app_db.get_session()

        try:
            result = session.query(Responsible) \
                .options(joinedload(Responsible.interested_people)) \
                .all()
            return result
        finally:
            session.close()

    def add(self, responsible: Responsible):
        app_db = AppDataBase()
        session = app_db.get_session()

        session.add(responsible)

        session.commit()
        session.close()

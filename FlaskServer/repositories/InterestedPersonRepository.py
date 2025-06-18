from infra.AppDataBase import AppDataBase
from domain.InterestedPerson import InterestedPerson
from sqlalchemy.orm import joinedload


class InterestedPersonRepository:
    def __init__(self):
        pass

    @staticmethod
    def get_all():
        app_db = AppDataBase()
        session = app_db.get_session()

        try:
            result = session.query(InterestedPerson) \
                .options(joinedload(InterestedPerson.responsible)) \
                .all()
            return result
        finally:
            session.close()

    @staticmethod
    def get_all_by_responsible_id(self, responsible_id: int):
        app_db = AppDataBase()
        session = app_db.get_session()

        try:
            result = session.query(InterestedPerson) \
                .filter(InterestedPerson.responsible_id == responsible_id) \
                .all()
            return result
        finally:
            session.close()

    @staticmethod
    def get_by_id(interested_person_id: int):
        app_db = AppDataBase()
        session = app_db.get_session()

        try:
            result = session.query(InterestedPerson) \
                .options(joinedload(InterestedPerson.responsible)) \
                .filter(InterestedPerson.id == interested_person_id) \
                .first()
            return result
        finally:
            session.close()

    @staticmethod
    def merge(interested_person: InterestedPerson):
        app_db = AppDataBase()
        session = app_db.get_session()
        try:
            session.merge(interested_person)
            session.commit()
        finally:
            session.close()

    @staticmethod
    def add(interested_person: InterestedPerson):
        app_db = AppDataBase()
        session = app_db.get_session()

        session.add(interested_person)

        session.commit()
        session.close()

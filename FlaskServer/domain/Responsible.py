from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from infra.AppDataBase import Base



class Responsible(Base):
    __tablename__ = 'responsible'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    formatted_phone_number = Column(String)

    interested_people = relationship("InterestedPerson", back_populates="responsible")


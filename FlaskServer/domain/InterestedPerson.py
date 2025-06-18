from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from infra.AppDataBase import Base


class InterestedPerson(Base):
    __tablename__ = 'interested_person'
    id = Column(Integer, primary_key=True)
    reference_id = Column(String, nullable=False)
    name = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    formatted_phone_number = Column(String)
    course_ordered = Column(String)
    order_date = Column(Date)
    address = Column(String)
    status = Column(String)
    last_status_update = Column(Date)

    responsible_id = Column(Integer, ForeignKey('responsible.id'))
    responsible = relationship("Responsible", back_populates="interested_people")

    def get_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'phoneNumber': self.phone_number,
            'formattedPhoneNumber': self.formatted_phone_number,
            'courseOrdered': self.course_ordered,
            'orderDate': self.order_date,
            'status': self.status,
            'responsible': self.responsible.name
        }

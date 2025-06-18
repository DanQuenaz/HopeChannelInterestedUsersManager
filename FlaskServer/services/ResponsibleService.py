from repositories.ResponsibleRepository import ResponsibleRepository
from repositories.InterestedPersonRepository import InterestedPersonRepository


class ResponsibleService:
    def __init__(self):
        self.repo = ResponsibleRepository()
        self.interested_person_repo = InterestedPersonRepository()

    def get_all(self):
        responsible_list = self.repo.get_all_with_interested_people()
        response = []
        for responsible in responsible_list:
            interested_people = []
            for interested_person in responsible.interested_people:
                interested_people.append({
                    'id': interested_person.id,
                    'name': interested_person.name,
                    'phoneNumber': interested_person.phone_number,
                    'formattedPhoneNumber': interested_person.formatted_phone_number,
                    'status': interested_person.status,
                    'last_status_update': interested_person.last_status_update

                })
            response.append(
                {
                    'id': responsible.id,
                    'name': responsible.name,
                    'phoneNumber': responsible.phone_number,
                    'formattedPhoneNumber': responsible.formatted_phone_number,
                    'interested_people': interested_people
                }
            )
        return response

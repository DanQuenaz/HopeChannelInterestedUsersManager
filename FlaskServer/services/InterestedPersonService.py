from repositories.InterestedPersonRepository import InterestedPersonRepository


class InterestedPersonService:
    def __init__(self):
        self.repo = InterestedPersonRepository()

    def get_all(self):
        interested_person_list = self.repo.get_all()
        response = []
        for interested_person in interested_person_list:
            response.append(
                {
                    'id': interested_person.id,
                    'name': interested_person.name,
                    'address': interested_person.address,
                    'phoneNumber': interested_person.phone_number,
                    'formattedPhoneNumber': interested_person.formatted_phone_number,
                    'courseOrdered': interested_person.course_ordered,
                    'orderDate': interested_person.order_date,
                    'status': interested_person.status,
                    'responsible': interested_person.responsible.name
                }
            )
        return response

    def update(self, data):
        interested_person_id = data['id']
        interested_person_to_update = self.repo.get_by_id(interested_person_id)
        interested_person_to_update.status = data['status']
        interested_person_to_update.formatted_phone_number = data['formattedPhoneNumber']
        self.repo.merge(interested_person_to_update)
        return interested_person_to_update

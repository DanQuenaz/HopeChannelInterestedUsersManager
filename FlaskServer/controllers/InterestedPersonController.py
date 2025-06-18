from flask import Blueprint, jsonify, make_response, request
from http import HTTPStatus
import logging
from services.InterestedPersonService import InterestedPersonService

interested_person_bp = Blueprint('interested_person', __name__, url_prefix='/interested-person')


@interested_person_bp.route('/get-all')
def get_all():
    service = InterestedPersonService()
    try:
        result = service.get_all()
        return make_response(jsonify(result), HTTPStatus.OK)
    except Exception as e:
        logging.error("Error fetching interested persons", e)
        return make_response(jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR)


@interested_person_bp.route('/update', methods=['PUT'])
def update():
    try:
        data = request.get_json()
        if not data or 'id' not in data:
            return make_response(jsonify({'error': 'Missing ID or request body'}), HTTPStatus.BAD_REQUEST)

        service = InterestedPersonService()
        updated_person = service.update(data)

        if updated_person is None:
            return make_response(jsonify({'error': 'Person not found'}), HTTPStatus.NOT_FOUND)

        return make_response(jsonify(updated_person.get_dict()), HTTPStatus.OK)

    except Exception as e:
        logging.exception("Error updating interested person")
        return make_response(jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR)

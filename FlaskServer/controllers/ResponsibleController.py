from flask import Blueprint, jsonify, make_response
from http import HTTPStatus
import logging
from services.ResponsibleService import ResponsibleService

responsible_bp = Blueprint('responsible', __name__, url_prefix='/responsible')


@responsible_bp.route('/get-all')
def get_all():
    service = ResponsibleService()
    try:
        result = service.get_all()
        return make_response(jsonify(result), HTTPStatus.OK)
    except Exception as e:
        logging.error("Error fetching responsible", e)
        return make_response(jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR)


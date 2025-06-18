from flask import Flask, jsonify
from flask_cors import CORS
import logging

logging.basicConfig(
    format='%(asctime)s [%(levelname)s] %(message)s'
)


def create_app():
    app = Flask(__name__)
    CORS(app)
    from controllers.InterestedPersonController import interested_person_bp
    app.register_blueprint(interested_person_bp)

    from controllers.ResponsibleController import responsible_bp
    app.register_blueprint(responsible_bp)

    return app


app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

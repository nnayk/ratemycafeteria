# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask import Flask, Config, request
from flask import jsonify, make_response
from flask_cors import CORS 
# from auth import hash_password, check_password
import logging

def create_app(config_class=Config):
    app = Flask(__name__)
    # app.config["JWT_SECRET_KEY"] = "CHANGE_TO_SECURE_KEY" 
    app.config["DEBUG"] = True
    app.logger.setLevel(logging.DEBUG)
    logging.basicConfig(level=logging.DEBUG)  # Change to INFO or ERROR as needed
    # JWTManager(app)
    # Configure CORS for all routes
    cors = CORS(app, resources={r"/*": {
        "origins": "*",  # Allow all origins (for development only, later only allow the frontend domain)
        "methods": ["GET", "POST", "DELETE","OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization","Access-Control-Allow-Origin"]
    }})
    app.config["CORS_HEADERS"] = "Content-Type"

    @app.route("",methods=['GET'])
    def upload_photos():
        return jsonify({"message":"Profile created successfully"})
    return app

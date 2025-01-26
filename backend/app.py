# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask import Flask, Config, request
from flask import jsonify, make_response
from flask_cors import CORS 
# from auth import hash_password, check_password
import logging
from logging import debug, info, error
import json
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
import os
from dotenv import load_dotenv

success = load_dotenv()
load_dotenv()
assert success, "Failed to load .env"
cloudinary.config( 
    cloud_name = "dh4nyybh4", 
    api_key = "289855552963415", 
    api_secret = os.getenv("CLOUDINARY_API_SECRET"), 
    secure=True
)

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

    @app.route("/photos/upload",methods=['POST'])
    def upload_photos():
        debug("Request received")
        form_data = request.form # TODO: get rid of to_dict for performance boost
        photo_url = form_data.get("photo_url")
        photos = request.files.getlist("photos")
        debug(f'photo_url = {photo_url}')
        debug(f'num photos = {len(photos)}')
        debug(f'type photo 1 = {type(photos[0])}')
        upload_result = cloudinary.uploader.upload(photos[0], public_id=photo_url)
        debug(f'upload_result = {upload_result}')
        return jsonify({"message":"Profile created successfully"})
    return app

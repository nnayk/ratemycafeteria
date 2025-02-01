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
        "origins": ["https://ratemycafeteria.vercel.app/"],
        "methods": ["POST"],
        "allow_headers": ["Content-Type", "Authorization","Access-Control-Allow-Origin"]
    }})
    # use the cors var above to configure CORS for all routes

    @app.route("/photos/upload",methods=['POST'])
    def upload_photos():
        try:
            debug("inside upload_photos")
            # return jsonify({"message":"success"})
            form_data = request.form # TODO: get rid of to_dict for performance boost
            photos = request.files.getlist("photos")
            debug(f'num photos = {len(photos)}')
            photo_urls = []
            for photo in photos:
                debug(f'photo = {photo.filename}')
                response = cloudinary.uploader.upload(photo)
                photo_urls.append(response["secure_url"])
                debug(f'response = {response}')
            return jsonify({"photo_urls":photo_urls})
        except Exception as e:
            error(f'Error: {e}')
            return make_response(jsonify({"error":str(e)}), 500)
    return app

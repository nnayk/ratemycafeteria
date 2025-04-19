from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import logging
from logging import debug, error
import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

# Load environment variables
success = load_dotenv()
assert success, "Failed to load .env"

# Configure Cloudinary
cloudinary.config(
    cloud_name="dii2biiw7",
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

assert os.getenv("CLOUDINARY_API_KEY") is not None
frontend_origins = os.getenv("FRONTEND_URLS").split(',')
print(frontend_origins)

# Create Flask app in global scope
app = Flask(__name__)

# Set up logging
app.config["DEBUG"] = True
app.logger.setLevel(logging.DEBUG)
logging.basicConfig(level=logging.DEBUG)

# Configure CORS for all routes
CORS(app, resources={r"/*": {
    # "origins": ["https://www.ratemycafeteria.vercel.app", "https://www.ratemycafeteria.org"],
    # "origins" : frontend_origins,
    "origins": ["*"]
    "methods": ["POST"],
    "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Origin"]
}})

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/photos/upload", methods=['POST'])
def upload_photos():
    try:
        debug("inside upload_photos")
        photos = request.files.getlist("photos")
        debug(f'num photos = {len(photos)}')
        photo_urls = []

        for photo in photos:
            debug(f'photo = {photo.filename}')
            response = cloudinary.uploader.upload(photo)
            photo_urls.append(response["secure_url"])
            debug(f'response = {response}')

        return jsonify({"photo_urls": photo_urls})
    except Exception as e:
        error(f'Error: {e}')
        return make_response(jsonify({"error": str(e)}), 500)

if __name__ == "__main__":
    app.run(debug=True)

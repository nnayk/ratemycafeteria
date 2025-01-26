import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
import os
from dotenv import load_dotenv

success = load_dotenv()
load_dotenv()
assert success, "Failed to load .env"



# Configuration       
cloudinary.config( 
    cloud_name = "dh4nyybh4", 
    api_key = "289855552963415", 
    api_secret = os.getenv("CLOUDINARY_API_SECRET"), 
    secure=True
)

# Upload an image
upload_result = cloudinary.uploader.upload("shoes.png",
                                           type="authenticated",
                                           access_mode="authenticated",)
print(upload_result)
print(upload_result["secure_url"])

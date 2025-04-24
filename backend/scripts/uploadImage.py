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
    cloud_name = "dii2biiw7", 
    api_key = "218425572762652", 
    # api_secret = os.getenv("CLOUDINARY_API_SECRET"), 
    api_secret = "5qnCXjDYS94otKWR62rr4q9f7oc", 
    secure=True
)


def uploadImage(path):
    # Upload an image
    upload_result = cloudinary.uploader.upload(path,
                                            type="authenticated",
                                            access_mode="authenticated",)
    print(upload_result)
    if upload_result:
        print(upload_result["secure_url"])
        return upload_result["secure_url"]
    else:
        print("Failed to upload",path)
        return None

if __name__=="__main__":
    image = input("Enter image path (if blank will use a default image): ")
    if not image:
        image = "shoes.png"
    uploadImage(image)
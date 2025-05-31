### THIS SCRIPT IS ONLY NEEDED WHEN ADDING A CAFE TO AN EXISTING SCHOOL ###
import firebase_admin
from firebase_admin import credentials, firestore
from uploadImage import uploadImage
import os

DEFAULT_IMAGE_URL = "https://previews.123rf.com/images/juliasart/juliasart1708/juliasart170800074/83585916-colorful-cafe-isometric-restaurant-building-cartoon-vector-icon-flat-isometric-design.jpg"
def migrateCafeReq(school, cafe, imageUrl=DEFAULT_IMAGE_URL,db=None):
    if not imageUrl:
        image = DEFAULT_IMAGE_URL
    print(f"Migrating cafe request for {school}/{cafe}")
    # Get reference to the cafe request collection
    cafeReqRef = db.collection("cafe_requests").document(school).collection("cafes").document(cafe)
    if not cafeReqRef.get().exists:
        print(f"No cafe requests found for {school}/{cafe}")
    else:
        data = cafeReqRef.get().to_dict()
        # print(f"Cafe {cafe} request submitted by user {data['user']}")
    # create the school document in the /cafes collection if it doesn't exist
    db.collection("cafes").document(school).set({})
    db.collection("cafes").document(school).collection("cafes").document(cafe).set({
        "stars": 0,
        "reviewCount": 0,
        "imageUrl": imageUrl
    })

    print("Cafe requests migrated successfully!")
    # delete the cafe request from the /cafe_requests/{school}/cafes collection
    # if cafeReqRef.get().exists:
    #     cafeReqRef.delete()
    #     print("Cafe requests deleted successfully!")
if __name__ == "__main__":
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    school = input("Enter the school name (case sensitive): ")
    cafes = input("Enter the cafe name(s) (case sensitive, comma separated): ").split(",")
    print(f"cafes: {cafes}")
    for cafe in cafes:
        cafe = cafe.strip()
        if not cafe:
            continue
        # image = input(f"Enter the image path for {cafe} (hit enter to skip): ")
        schoolPath = school.lower()
        imageName = cafe.lower()
        imgFound=False
        # try .png, .jpg, .jpeg, .avif and .webp. Exit as soon as one works
        for ext in [".png", ".jpg", ".jpeg", ".avif", ".webp"]:
            imagePath = f"//Users/nnayak/Documents/other/proj/rmc/ratemycafeteria/frontend/public/assets/{schoolPath}/{imageName}{ext}"
            print(f"Trying image path: {imagePath}")
            if os.path.exists(imagePath):
                imgFound=True
                break
        # imagePath = f"//Users/nnayak/Documents/other/proj/rmc/ratemycafeteria/frontend/public/assets/{schoolPath}/{imageName}.jpg"
        if imgFound:
            print(f"Image found at {imagePath}")
            imageUrl = uploadImage(imagePath)
            if not imageUrl:
                print(f"Failed to upload image for {cafe}, gonna use default image")
                imageUrl=DEFAULT_IMAGE_URL
        else:
            imageUrl=DEFAULT_IMAGE_URL
        print(f"Processing cafe {cafe}, length: {len(cafe)}")
        # migrate the cafe request
        migrateCafeReq(school,cafe,imageUrl=imageUrl,db=db)

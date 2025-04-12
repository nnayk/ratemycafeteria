### THIS SCRIPT IS ONLY NEEDED WHEN ADDING A CAFE TO AN EXISTING SCHOOL ###
import firebase_admin
from firebase_admin import credentials, firestore
DEFAULT_IMAGE_URL = "https://previews.123rf.com/images/juliasart/juliasart1708/juliasart170800074/83585916-colorful-cafe-isometric-restaurant-building-cartoon-vector-icon-flat-isometric-design.jpg"
def migrateCafeReq(school, cafe, imageUrl=DEFAULT_IMAGE_URL,db=None):
    print(f"Migrating cafe request for {school}/{cafe}")
    # Get reference to the cafe request collection
    cafeReqRef = db.collection("cafe_requests").document(school).collection("cafes").document(cafe)
    if not cafeReqRef.get().exists:
        print(f"No cafe requests found for {school}/{cafe}")
    else:
        data = cafeReqRef.get().to_dict()
        print(f"Cafe {cafe} request submitted by user {data['user']}")
    # create the school document in the /cafes collection if it doesn't exist
    db.collection("cafes").document(school).set({})
    db.collection("cafes").document(school).collection("cafes").document(cafe).set({
        "stars": 0,
        "reviewCount": 0,
        "imageUrl": DEFAULT_IMAGE_URL
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
        print(f"Processing cafe {cafe}, length: {len(cafe)}")
        # migrate the cafe request
        migrateCafeReq(school,cafe,db=db)

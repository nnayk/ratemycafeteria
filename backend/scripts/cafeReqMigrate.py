import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")  # Path to your service account JSON
firebase_admin.initialize_app(cred)

# Get Firestore database instance
db = firestore.client()

DEFAULT_IMAGE_URL = "https://previews.123rf.com/images/juliasart/juliasart1708/juliasart170800074/83585916-colorful-cafe-isometric-restaurant-building-cartoon-vector-icon-flat-isometric-design.jpg"
def migrateCafeReq(school, cafe, imageUrl=DEFAULT_IMAGE_URL):
    # Get reference to the cafe request collection
    cafeReqRef = db.collection("cafe_requests").document(school).collection("cafes").document(cafe)
    if not cafeReqRef.get().exists:
        print(f"No cafe requests found for {school}/{cafe}")
        return
    data = cafeReqRef.get().to_dict()
    print(f"Cafe {cafe} submitted by user {data['user']}")
    # add the cafe request to the /cafes/{school}/cafes collection w/the attributes stars=0, reviewCount=0, imageUrl=""
    db.collection("cafes").document(school).collection("cafes").document(cafe).set({
        "stars": 0,
        "reviewCount": 0,
        "imageUrl": DEFAULT_IMAGE_URL
    })

    print("Cafe requests migrated successfully!")
    # delete the cafe request from the /cafe_requests/{school}/cafes collection
    # cafeReqRef.delete()
    # print("Cafe requests deleted successfully!")

migrateCafeReq("UIUC","swi")

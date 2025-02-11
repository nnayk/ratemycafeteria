import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")  # Path to your service account JSON
firebase_admin.initialize_app(cred)

# Get Firestore database instance
db = firestore.client()

# Get all subcollections under a school document
school = "UIUC"
cafes = db.collection("cafes").document(school).collections()
while True:
    try:
        cafe = next(cafes)
        print(cafe.id)
        print(cafe.document("details").get().to_dict())

    except StopIteration:
        break

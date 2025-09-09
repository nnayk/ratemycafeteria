import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")  # Path to your service account JSON
firebase_admin.initialize_app(cred)

# Get Firestore database instance
db = firestore.client()

def getCafeDocs(school):
    # Get all subcollections under a school document
    # school = "UIUC"
    # Fetch all cafes under the collection cafes/<school>/cafes
    cafes_ref = db.collection("cafes").document(school).collection("cafes")
    cafes = cafes_ref.stream()
    # cafes_list = [cafe.to_dict() for cafe in cafes]
    # print(cafes_list)
    return cafes

def getCafeNames(school):
    cafes = getCafeDocs(school)
    cafes = [cafe.id for cafe in cafes]
    print(f"Fetched cafes {cafes}")
    return cafes

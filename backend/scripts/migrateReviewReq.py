import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")  # Path to your service account JSON
firebase_admin.initialize_app(cred)

# Get Firestore database instance
db = firestore.client()

def migrate_review_request(school, cafe, req_id):
    try:
        print(f"Migrating review request: {req_id}")
        
        # Reference to the review request document
        review_ref = db.collection("review_requests").document(school).collection(cafe).document(req_id)
        review_doc = review_ref.get()

        if review_doc.exists:
            print(f"Review request data: {review_doc.to_dict()}")
            # Create a new document in the reviews collection based on the review request data
            review_data = review_doc.to_dict()
            db.collection("reviews").document(school).collection("kyb").document().set(review_data)
            print("Review migrated successfully!")
        else:
            print("Review request not found.")

    except Exception as e:
        print(f"Error migrating review: {e}")

# Example usage
migrate_review_request("Cal Poly San Luis Obispo", "Subway", "kQ7OaT4ut5CPBH6uAllw")


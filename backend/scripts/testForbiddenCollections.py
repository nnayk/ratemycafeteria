# This file tests the security rules by trying to read from collections that
# require admin access.

import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Get Firestore database reference
db = firestore.client()

def read_cafe_requests():
    """Reads all documents from the /cafe_requests collection."""
    cafe_requests_ref = db.collection("cafe_requests")
    docs = cafe_requests_ref.stream()

    for doc in docs:
        print(f"Document ID: {doc.id} => {doc.to_dict()}")

if __name__ == "__main__":
    read_cafe_requests()

from firebase_admin import credentials, firestore, initialize_app

# Initialize Firebase Admin SDK for source (test) database
cred_test = credentials.Certificate("serviceAccountKeyDev.json")
test_app = initialize_app(cred_test, name='test')
test_db = firestore.client(test_app)

# Initialize Firebase Admin SDK for destination (prod) database
cred_prod = credentials.Certificate("serviceAccountKeyProd.json") 
prod_app = initialize_app(cred_prod, name='prod')
prod_db = firestore.client(prod_app)

def migrate_fortunes():
    print("Starting fortune migration from test to prod...")
    
    # Get all documents from test fortunes collection
    fortunes_ref = test_db.collection('fortunes')
    docs = fortunes_ref.stream()
    
    # Migrate each document to prod
    for doc in docs:
        doc_data = doc.to_dict()
        doc_id = doc.id
        
        try:
            # Create document with same ID and data in prod
            prod_db.collection('fortunes').document(doc_id).set(doc_data)
            print(f"Successfully migrated fortune {doc_id}")
        except Exception as e:
            print(f"Error migrating fortune {doc_id}: {str(e)}")

    print("Fortune migration completed!")

if __name__ == "__main__":
    migrate_fortunes()

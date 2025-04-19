import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

def init_firebase_app(cred_path, app_name):
    """Initialize a Firebase app with given credentials"""
    cred = credentials.Certificate(cred_path)
    app = firebase_admin.initialize_app(cred, name=app_name)
    return firestore.client(app)

def get_all_collections(db):
    """Get all collections from the database"""
    collections = db.collections()
    return [collection.id for collection in collections]

def get_all_documents(collection_ref):
    """Get all documents from a collection"""
    docs = collection_ref.get()
    return [doc for doc in docs]

def copy_document(doc, target_collection):
    """Copy a document to the target collection"""
    doc_data = doc.to_dict()
    # Use the same document ID as the source
    target_collection.document(doc.id).set(doc_data)

def migrate_subcollections(source_doc_ref, target_doc_ref):
    """Recursively migrate subcollections"""
    subcollections = source_doc_ref.collections()
    for subcoll in subcollections:
        target_subcoll = target_doc_ref.collection(subcoll.id)
        docs = get_all_documents(subcoll)
        for doc in docs:
            new_doc_ref = target_subcoll.document(doc.id)
            new_doc_ref.set(doc.to_dict())
            # Recursively migrate any sub-subcollections
            migrate_subcollections(doc.reference, new_doc_ref)

def migrate_firestore(source_cred_path, target_cred_path):
    """Migrate all data from source to target Firestore"""
    try:
        # Initialize source and target Firebase apps
        source_db = init_firebase_app(source_cred_path, 'source')
        target_db = init_firebase_app(target_cred_path, 'target')

        print("Starting migration...")

        # Get all collections from source
        collections = get_all_collections(source_db)
        print(f"Found {len(collections)} top-level collections")

        # Migrate each collection
        for collection_name in collections:
            print(f"\nMigrating collection: {collection_name}")
            source_collection = source_db.collection(collection_name)
            target_collection = target_db.collection(collection_name)

            # Get all documents in the collection
            docs = get_all_documents(source_collection)
            print(f"Found {len(docs)} documents in {collection_name}")

            # Copy each document
            for doc in docs:
                print(f"Migrating document: {doc.id}")
                copy_document(doc, target_collection)

                # Handle subcollections
                print(f"Checking for subcollections in document: {doc.id}")
                migrate_subcollections(doc.reference, 
                                    target_collection.document(doc.id))

        print("\nMigration completed successfully!")

    except Exception as e:
        print(f"Error during migration: {str(e)}")
    finally:
        # Clean up Firebase apps
        for app in firebase_admin.get_apps():
            firebase_admin.delete_app(app)

if __name__ == "__main__":
    # Paths to your service account key JSON files
    SOURCE_CRED_PATH = "dev.json"
    TARGET_CRED_PATH = "test.json"

    migrate_firestore(SOURCE_CRED_PATH, TARGET_CRED_PATH)

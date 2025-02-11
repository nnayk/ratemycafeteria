import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")  # Path to your service account JSON
firebase_admin.initialize_app(cred)

# Get Firestore database instance
db = firestore.client()

def migrateSchoolReqByName(school):
    try:
        # Get the school document
        # please use filter instead of where
        # use filter() not where()
        schoolRef = db.collection("school_requests").where("name", "==", school).get()
        if len(schoolRef) == 0:
            print("School not found")
            return
        print( "Here are the schools: ")
        for i,doc in enumerate(schoolRef):
            doc = doc.to_dict()
            print(f"{i+1}: {doc}")
            # Create a new document in the "schools" collection
        print("List which documents you want to migrate ( space separated )")
        indexes = list(map(int, input().split()))
        if len(indexes) == 0:
            print("No documents selected")
            return
        db.collection("schools").document().set(doc)
        # move all cafes

        print("School migrated successfully")
    except Exception as e:
        print("Error: ", e)

migrateSchoolReqByName("Faria") 

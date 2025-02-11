import firebase_admin
from firebase_admin import credentials, firestore
from cafeReqMigrate import migrateCafeReq


def migrateSchoolReqByName(school,city,state,db=None):
    try:
        schoolDocName = '-'.join(school.lower().split())
        print(f'schoolDocName: {schoolDocName}')
        # check if schoolDocName doc ID already exists under schools collection
        schoolCheckRef = db.collection("schools").document(schoolDocName)
        if schoolCheckRef.get().exists:
            print("School already exists")
            return
        # Get the school document
        # please use filter instead of where
        # use filter() not where()
        schoolRef = db.collection("school_requests").where("name", "==", school).get()
        if len(schoolRef) == 0:
            print("School not found")
            return
        
        print( "Here are the schools: ")
        cafeData = [doc.to_dict() for doc in schoolRef]
        for i,doc in enumerate(cafeData):
            print(f"{i+1}: {doc}")
            # Create a new document in the "schools" collection
        print("List which documents you want to migrate ( space separated )")
        indexes = list(map(int, input().split()))
        if len(indexes) == 0:
            print("No documents selected")
            return
        db.collection("schools").document(schoolDocName).set({
            "city": city,
            "state": state,
            "name": school
            })
        # move all cafes
        for i in indexes:
            cafeName = cafeData[i-1]["cafe"]
            print(f"Migrating cafe request for {school}/{cafeName}")
            migrateCafeReq(school, cafeName,db=db)

        print("School migrated successfully")
    except Exception as e:
        print("Error: ", e)

if __name__ == "__main__":
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    migrateSchoolReqByName("Faria","Cupertino","CA",db=db) 

import firebase_admin
from firebase_admin import credentials, firestore



def addFortunes(fortunes,db):
    for i,fortune in enumerate(fortunes):
        db.collection("fortunes").document(str(i)).set({
            "fortune": fortune
        })

def getFortunes():
    with open("fortunes.txt") as f:
        fortunes = f.readlines()[5:]
    return fortunes
if __name__ == "__main__":
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
    fortunes = getFortunes()
    db = firestore.client()
    addFortunes(fortunes,db)

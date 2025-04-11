import firebase_admin
from firebase_admin import credentials, firestore
# Initialize Firebase Admin SDK 
cred = credentials.Certificate("serviceAccountKey.json")  # Path to your service account JSON
firebase_admin.initialize_app(cred)

# Get Firestore database instance
db = firestore.client()

def updateCafeInfo(school,cafe,quality,quantity,pricing):
    try:
        print(f"Updating cafe info: school={school},cafe={cafe},quality={quality},quantity={quantity},pricing={pricing}")
        
        # Reference to the cafe document
        cafe_ref = db.collection("cafes").document(school).collection("cafes").document(cafe)
        print(f"cafe_ref: {cafe_ref}")
        cafe_doc = cafe_ref.get()
        print(f"cafe_doc: {cafe_doc}")

        if cafe_doc.exists:
            print(f"Cafe data: {cafe_doc.to_dict()}")
            # Update the cafe document with the new review data
            cafe_data = cafe_doc.to_dict()
            review_count = int(cafe_data.get("reviewCount", 0)) + 1
            print(f"Current review count: {cafe_data.get('reviewCount', 0)}, New review count: {review_count}")
            cafe_data["reviewCount"] = review_count
            avgQuality = (int(cafe_data.get("quality", 0)) + quality) / review_count
            print(f"avg quality: {avgQuality}")
            avgQty = (int(cafe_data.get("quantity", 0)) + quantity) / review_count
            print(f"avg quantity: {avgQty}")
            avgPricing = (int(cafe_data.get("pricing", 0)) + pricing) / review_count
            print(f"avg pricing: {avgPricing}")
            print(f"avg quality: {avgQuality}, avg quantity: {avgQty}, avg pricing: {avgPricing}")
            if (avgQuality > 5) or (avgQty > 5) or (avgPricing > 5):
                print("Invalid rating value: quality = {avgQuality}, quantity = {avgQty}, pricing = {avgPricing}")
                return
            cafe_data["quality"] = round(avgQuality, 2)
            cafe_data["quantity"] = round(avgQty, 2)
            cafe_data["pricing"] = round(avgPricing, 2)
            cafe_data["stars"] = (quality + quantity + pricing) / 3
            print(f"avg quality: {avgQuality}, avg quantity: {avgQty}, avg pricing: {avgPricing}, stars: {cafe_data['stars']}")
            print(f"Updating cafe document: {cafe_data}")
            cafe_ref.update(cafe_data)
            print("Cafe info updated successfully!")
        else:
            print("Cafe not found.")

    except Exception as e:
        print(f"Error updating cafe info: {e}")
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
            review_data["likes"] = 0
            review_data["dislikes"] = 0
            print(f"Creating review document in reviews collection: {review_data}")
            schoolRef = db.collection("reviews").document(school)
            if not schoolRef.get().exists:
                schoolRef.set({})
            schoolRef.collection(cafe).document().set(review_data)
            print("Review migrated successfully!")
            quality = review_data["quality"]
            quantity = review_data["quantity"]
            pricing = review_data["pricing"]
            updateCafeInfo(school,cafe,quality,quantity,pricing)
            print("Updated cafe review info (review count and avg rating)")
            # review_ref.delete()
            # print("Review request document deleted.")
        else:
            print("Review request not found.")

    except Exception as e:
        print(f"Error migrating review: {e}")

# Example usage
# migrate_review_request("Faria", "A+", "8jHNuTDnSJ9rLWGabO2u")
school = input("Enter school name (case sensitive): ")
cafe = input("Enter cafe name (case sensitive): ")
doc_id = input("Enter review request document ID: ")
migrate_review_request(school, cafe, doc_id)


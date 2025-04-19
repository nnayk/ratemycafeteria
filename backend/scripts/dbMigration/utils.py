import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def init_firebase():
    """Initialize Firebase Admin SDK"""
    try:
        # Use your service account key
        cred = credentials.Certificate('creds.json')
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        return db
    except Exception as e:
        print(f"Error initializing Firebase: {e}")
        raise

db = init_firebase()

def calculate_stars(pricing: int, quality: int, quantity: int):
    """Calculate the average stars for a review"""
    return (pricing + quality + quantity) / 3

def get_average_stars( school, cafe):
    '''
    Calculate stars for a cafe
    '''
    reviews = (db.collection('reviews')
                  .document(school)
                  .collection(cafe)
                  .get())
    total_stars = 0
    for review in reviews:

            review_data = review.to_dict()
            print(review_data)
            pricing, quality, quantity = review_data['pricing'], review_data['quality'], review_data['quantity']
            total_stars += calculate_stars(pricing, quality, quantity)
    average_stars = round(total_stars / len(reviews), 1)
    print(f'Average stars = {average_stars}')
    return average_stars
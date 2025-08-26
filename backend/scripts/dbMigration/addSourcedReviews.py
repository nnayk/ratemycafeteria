import csv
import firebase_admin                                                           
from firebase_admin import credentials, firestore                               
# Initialize Firebase Admin SDK                                                 
cred = credentials.Certificate("prod.json")  # Path to your service account JSON
firebase_admin.initialize_app(cred)                                             
                                                                                
# Get Firestore database instance                                               
db = firestore.client()                                              
# from utils import db

def add_reviews_from_csv(file_path, schoolName, cafeteriaName):
    """
    Reads a CSV file with web source, review text, and web link,
    and adds the data to the 'sourcedReviews/<schoolName>/<cafeteriaName>' collection in Firebase.
    """
    # db = init_firebase()
    sourced_reviews_ref = db.collection(f'sourcedReviews/{schoolName}/{cafeteriaName}')

    with open(file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            try:
#,Source / Platform,Full Review Text,Source Link
                review_data = {
                    'source': row['Source / Platform'],
                    'reviewText': row['Full Review Text'],
                    'link': row['Source Link']
                }
                sourced_reviews_ref.add(review_data)
                print(f"Successfully added review from {row['Source / Platform']}")
            except KeyError as e:
                print(f"Skipping row due to missing column: {e}")
            except Exception as e:
                print(f"An error occurred: {e}")

if __name__ == '__main__':
    # Replace 'path/to/your/csv_file.csv' with the actual path to your CSV file.
    fp = "/Users/nnayak/Documents/other/proj/rmc/ratemycafeteria/backend/scripts/scraped-reviews/vista_grande_reviews.csv"
    schoolName = "Cal Poly San Luis Obispo"
    cafeteriaName = "Vista Grande"
    add_reviews_from_csv(fp, schoolName, cafeteriaName)

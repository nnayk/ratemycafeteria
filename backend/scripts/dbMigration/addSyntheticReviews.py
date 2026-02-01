import csv
import firebase_admin
from firebase_admin import credentials, firestore
import argparse

def add_reviews_from_csv(file_path, schoolName, cafeteriaName):
    """
    Reads a CSV file with review text, date, quality, quantity, and pricing,
    and adds the data to the 'reviews/<schoolName>/<cafeteriaName>' collection in Firebase.
    """
    try:
        cred = credentials.Certificate("prod.json")
        firebase_admin.get_app()
    except ValueError:
        firebase_admin.initialize_app(cred)
    
    db = firestore.client()
    reviews_ref = db.collection(f'reviews/{schoolName}/{cafeteriaName}')

    with open(file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            try:
                review_data = {
                    'details': row['Review Text'],
                    'date': row['Date'],
                    'quality': int(row['Quality']),
                    'quantity': int(row['Quantity']),
                    'pricing': int(row['Pricing']),
                    'likes': 0,
                    'dislikes': 0,
                    'photos': []
        
                }
                reviews_ref.add(review_data)
                print(f"Successfully added review")
            except KeyError as e:
                print(f"Skipping row due to missing column: {e}")
            except Exception as e:
                print(f"An error occurred: {e}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Add reviews from a CSV file to Firestore.')
    # parser.add_argument('school_name', type=str, help='The name of the school.')
    # parser.add_argument('cafe_name', type=str, help='The name of the cafeteria.')
    # parser.add_argument('csv_file', type=str, help='The path to the CSV file.')
    cafe = "Vista Grande"
    cafePath = '_'.join(cafe.split()).lower()
    csv_path = f"/Users/nnayak/Documents/other/proj/rmc/ratemycafeteria/backend/scripts/synthetic-reviews/{cafePath}_synthetic_reviews.csv"
    school = "Cal Poly San Luis Obispo"
    print(f'cafe={cafe}, csv_path={csv_path}')
    add_reviews_from_csv( csv_path, school, cafe)
    # args = parser.parse_args()
    # add_reviews_from_csv(args.csv_file, args.school_name, args.cafe_name)
    print("Done.")
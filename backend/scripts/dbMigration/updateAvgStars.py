from utils import get_average_stars, db

# Initialize Firebase Admin SDK 

def updateAvgStars(school,cafe):
    try:
        
        # Reference to the cafe document
        cafe_ref = db.collection("cafes").document(school).collection("cafes").document(cafe)
        print(f"cafe_ref: {cafe_ref}")
        average_stars = get_average_stars(school,cafe)
        print(f'Calculated avg stars for {cafe}: {average_stars}')
        cafe_ref.update({'stars':average_stars})
    except Exception as e:
        print(f"Error while updating cafe stars: {e}")

if __name__ == "__main__":
    school = input("Enter school name:")
    cafes = [s.strip() for s in input("Enter cafe(s) (comma separated): ").split(',')]
    for cafe in cafes:
        updateAvgStars(school,cafe)

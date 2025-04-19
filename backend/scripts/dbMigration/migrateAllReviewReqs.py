
from datetime import datetime
from utils import db, get_average_stars


def migrate_cafe_reviews(school_name: str, cafe_name: str):
    """Migrate review requests for a specific cafe to reviews collection"""
    
    try:
        print(f"\nStarting migration for {cafe_name} at {school_name}")
        
        # Get reference to the cafe's review requests
        review_requests_ref = (db.collection('review_requests')
                             .document(school_name)
                             .collection(cafe_name))
        
        # Get all review requests for this cafe
        review_requests = review_requests_ref.get()
        total_requests = len(review_requests)
        
        if total_requests == 0:
            print(f"No review requests found for {cafe_name} at {school_name}")
            return
        
        print(f"Found {total_requests} review requests to migrate")
        migrated_count = 0

        for review_request in review_requests:
            try:
                # Get review request data
                review_data = review_request.to_dict()
                
                # Add likes and dislikes fields
                review_data['likes'] = 0
                review_data['dislikes'] = 0
                
                # Create the review in the reviews collection
                review_ref = (db.collection('reviews')
                            .document(school_name)
                            .collection(cafe_name)
                            .document(review_request.id))
                
                # Set the data
                review_ref.set(review_data)
                
                migrated_count += 1
                print(f"Migrated review {review_request.id} ({migrated_count}/{total_requests})")
                # delete the review request from the review_requests collection
                review_request.delete()
                
            except Exception as e:
                print(f"Error migrating review {review_request.id}: {e}")
                continue
        
        # Update the average stars for the cafe
        cafe_ref = (db.collection('cafes')
                    .document(school_name)
                    .collection('cafes')
                    .document(cafe_name))
        # Calculate the average stars for the cafe
        # Get all reviews for the cafe
        reviews = (db.collection('reviews')
                  .document(school_name)
                  .collection(cafe_name)
                  .get())
        # Calculate the average stars for the cafe
        average_stars = get_average_stars(school_name,cafe_name)
        # for review in reviews:
        #     review_data = review.to_dict()
        #     print(review_data)
        #     pricing, quality, quantity = review_data['pricing'], review_data['quality'], review_data['quantity']
        #     total_stars += calculate_stars(pricing, quality, quantity)
        # print(f"Total stars: {total_stars}, reviews: {len(reviews)}")
        # average_stars = round(total_stars / len(reviews), 2)
        existing_stars = cafe_ref.get().to_dict()['stars']
        print(f"Average stars for {cafe_name} at {school_name}: old = {existing_stars}, new = {average_stars}")
        # Update the average stars for the cafe
        cafe_ref.update({'stars': average_stars})
        

        
        print(f"\nMigration completed! Migrated {migrated_count} out of {total_requests} reviews")
        
    except Exception as e:
        print(f"Error during migration: {e}")
        # launch a pdb session
        import pdb; pdb.set_trace()
    finally:
        # Clean up Firebase app
        try:
            firebase_admin.delete_app(firebase_admin.get_app())
        except:
            pass

def verify_cafe_migration(school_name: str, cafe_name: str):
    """Verify that the migration was successful for a specific cafe"""
    db = init_firebase()
    
    try:
        # Count review requests
        review_requests = (db.collection('review_requests')
                         .document(school_name)
                         .collection(cafe_name)
                         .get())
        review_requests_count = len(review_requests)
        
        # Count migrated reviews
        reviews = (db.collection('reviews')
                  .document(school_name)
                  .collection(cafe_name)
                  .get())
        reviews_count = len(reviews)
        
        print("\nMigration Verification:")
        print(f"Review requests for {cafe_name} at {school_name}: {review_requests_count}")
        print(f"Migrated reviews: {reviews_count}")
        
        if review_requests_count == reviews_count:
            print("✅ Migration successful! All reviews were migrated.")
        else:
            print("⚠️ Warning: Number of migrated reviews doesn't match source.")
            
        # Verify content of a few reviews
        print("\nVerifying review content...")
        for review in reviews:
            review_data = review.to_dict()
            if 'likes' not in review_data or 'dislikes' not in review_data:
                print(f"⚠️ Warning: Review {review.id} is missing likes/dislikes fields")
            
    except Exception as e:
        print(f"Error during verification: {e}")
    finally:
        try:
            firebase_admin.delete_app(firebase_admin.get_app())
        except:
            pass

def main():
    """Main function to run migration and verification for a specific cafe"""
    # Get school and cafe names
    school_name = input("Enter school name: ")
    cafes = [s.strip() for s in input("Enter cafe(s) (comma separated): ").split(',')]
    
    # Confirm before proceeding
    # confirmation = input(f"\nWill migrate reviews for {cafe_name} at {school_name}. Proceed? (yes/no): ")
    # if confirmation.lower() != 'yes':
    #     print("Migration cancelled.")
    #     return
    
    # Log start time
    start_time = datetime.now()
    print(f"\nStarting migration at {start_time}")
    
    # Run migration
    for cafe_name in cafes:
        migrate_cafe_reviews(school_name, cafe_name)
        # Verify migration
        verify_cafe_migration(school_name, cafe_name)
    
    # Log end time and duration
    end_time = datetime.now()
    duration = end_time - start_time
    print(f"\nMigration completed at {end_time}")
    print(f"Total duration: {duration}")

if __name__ == "__main__":
    main()

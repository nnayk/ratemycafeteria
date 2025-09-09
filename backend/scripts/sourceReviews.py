import os
import csv
from google import genai
from getCaf import getCafeNames
import pdb

# --------------------------
# CONFIGURATION
# --------------------------
API_KEY = os.getenv("GEMINI_API_KEY")  # Ensure your API key is set in environment variables
UNIVERSITY_NAME = "UC Berkeley"  # replace with your university name

CAFETERIAS = getCafeNames(UNIVERSITY_NAME)  # Fetch cafeteria names using the getCaf function
print(f"Found {len(CAFETERIAS)} cafeterias for {UNIVERSITY_NAME}")
print(CAFETERIAS)

# --------------------------
# GEMINI CLIENT SETUP
# --------------------------
client = genai.Client(api_key=API_KEY)

# Prompt template
PROMPT_TEMPLATE = """
You are given the following list of cafeterias for {university_name}:

{cafeteria_name}

For each cafeteria in the list:
You are a deep research agent tasked with collecting cafeteria reviews for universities. Follow these instructions carefully:

Input: You will be given a list of cafeterias for a specific university.

Task: For each cafeteria, perform web searches to collect reviews.

Each review should include:
- Review text (the written content of the review)
- Source link (direct URL to where the review is published)
- Date of the review
- Platform (e.g., Google Reviews, Yelp, TripAdvisor, Reddit, etc.)

Constraints:
- Fetch at least 3 reviews per cafeteria.
- Collect as many as possible, ideally up to 10 reviews per cafeteria.
- Reviews must be from 2017 or later.
- Prioritize reviews from 2020 onwards, but include older ones if necessary to meet the minimum requirement.
- Ensure reviews are authentic and linked to their original source. Avoid AI-generated or unrelated content.

Output Format:
Provide reviews as a structured JSON list with the following keys:
- "platform"
- "date"
- "full_review_text"
- "source_link"

Quality Assurance:
- Ensure accuracy of metadata (date, source, platform).
- Remove duplicate reviews.
- Only include genuine reviews that mention the cafeteria specifically.
"""

# --------------------------
# MAIN SCRIPT
# --------------------------
def fetch_reviews(cafeteria_name):
    """Query Gemini for reviews of a given cafeteria."""
    prompt = PROMPT_TEMPLATE.format(
        university_name=UNIVERSITY_NAME,
        cafeteria_name=cafeteria_name
    )
    print(f'Prompt for {cafeteria_name}:\n{prompt}\n')
    pdb.set_trace()

    response = client.models.generate_content(
        model="gemini-1.5-flash",  # you can change model if needed
        contents=prompt
    )
    pdb.set_trace()

    # Try to parse JSON from the response
    try:
        import json
        reviews = json.loads(response.text)
    except Exception as e:
        print(f"⚠️ Could not parse JSON for {cafeteria_name}: {e}")
        reviews = []

    return reviews


def save_to_csv(cafeteria_name, reviews):
    """Save cafeteria reviews to CSV file."""
    filename = f"{UNIVERSITY_NAME.replace(' ', '_')}_{cafeteria_name.replace(' ', '_')}_reviews.csv"
    with open(filename, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=["platform", "date", "full_review_text", "source_link"])
        writer.writeheader()
        for review in reviews:
            writer.writerow(review)
    print(f"✅ Saved {len(reviews)} reviews to {filename}")


def main():
    for cafeteria in CAFETERIAS:
        print(f"\n🔍 Fetching reviews for {cafeteria}...")
        reviews = fetch_reviews(cafeteria)
        pdb.set_trace()
        if reviews:
            save_to_csv(cafeteria, reviews)
        else:
            print(f"⚠️ No reviews found for {cafeteria}")


if __name__ == "__main__":
    main()

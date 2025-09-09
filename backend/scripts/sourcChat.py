import os
import csv
import json
import openai
import os
from getCaf import getCafeNames

# --------------------------
# CONFIGURATION
# --------------------------
API_KEY = os.getenv("OPENAI_API_KEY")  # ensure your OpenAI API key is set in environment variables
openai.api_key = API_KEY
UNIVERSITY_NAME = "UC Berkeley"  # replace with your university name
cafes = getCafeNames(UNIVERSITY_NAME) 
print(f'Cafeterias found: {cafes}')
# --------------------------
# OPENAI CLIENT SETUP
# --------------------------
# client = OpenAI(api_key=API_KEY)

PROMPT_TEMPLATE = """
You are given the following cafeteria for {university_name}:

{cafeteria_name}

You are a deep research agent tasked with collecting cafeteria reviews for universities. Follow these instructions carefully:

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
    """Query ChatGPT for reviews of a given cafeteria."""
    prompt = PROMPT_TEMPLATE.format(
        university_name=UNIVERSITY_NAME,
        cafeteria_name=cafeteria_name
    )

    response = openai.ChatCompletion.create(
        # model="gpt-4o-mini",  # you can swap for "gpt-4o" or "gpt-3.5-turbo"
        model="gpt-3.5-turbo",  # you can swap for "gpt-4o" or "gpt-3.5-turbo"
        messages=[
            {"role": "system", "content": "You are a helpful assistant that outputs only valid JSON."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    import pdb
    pdb.set_trace()

    try:
        reviews = json.loads(response.choices[0].message.content)
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
    for cafeteria in cafes:
        print(f"\n🔍 Fetching reviews for {cafeteria}...")
        reviews = fetch_reviews(cafeteria)
        if reviews:
            save_to_csv(cafeteria, reviews)
        else:
            print(f"⚠️ No reviews found for {cafeteria}")


if __name__ == "__main__":
    main()


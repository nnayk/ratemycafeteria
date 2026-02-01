from openai import OpenAI
import pdb
import re
import json

client = OpenAI()

# prompt = "Give me some online dining reviews of Vista Grande cafeteria in Cal Poly SLO (San Luis Obispo, CA). The reviews should be from actual diners at the cafeteria, not promotional or informational material about the cafeteria. Include the review source and date if available. Include the verbatim review text (don't summarize it but feel free to extract relevant review snippets). Focus on sites like reddit.com, google reviews (there's LOTS of google reviews for cafeterias often), Yelp, and college forums. If you cannot get enough reviews from these sites thatn try other reputable sites. Avoid spam sites like trustburn.com. Try to provide at least 5 reviews, and only provide reviews from at least 2017 or newer (no reviews older than that and no alumni reviews either). Please provide each review in a json format with fields for source, source link, date, and review text."

prompt = "Give me some online dining reviews of Vista Grande cafeteria in Cal Poly SLO (San Luis Obispo, CA). The reviews should be from actual diners at the cafeteria, not promotional or informational material about the cafeteria. Include the review source and date if available. Include the verbatim review text (don't summarize it but feel free to extract relevant review snippets). Only provide reviews from sites like reddit.com and  google reviews (there's LOTS of google reviews for cafeterias often). Try to provide at least 5 reviews, and only provide reviews from at least 2017 or newer (no reviews older than that and no alumni reviews either). Please provide each review in a json format with fields for source, source link, date, and review text."

response = client.responses.create(
    model="gpt-4.1",
    tools=[{ "type": "web_search_preview" }],
    input=prompt,
)

print(response)
msg=response.output[1]
reviews=msg.content[0]
text=reviews.text
review_list = re.split(r'\n\d+\.\s*', text)
def extract_json_reviews(text: str):
    """
    Finds all ```json ... ``` blocks in `text` and returns a list
    of Python dictionaries.
    """
    pattern = r"```json\s*(\{.*?\})\s*```"     # match everything between ```json and ```
    snippets = re.findall(pattern, text, flags=re.DOTALL)
    return [json.loads(s) for s in snippets]
json_reviews = extract_json_reviews(text)
pdb.set_trace()

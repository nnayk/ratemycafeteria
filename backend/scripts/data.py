from openai import OpenAI

# Initialize the client (ensure you set the OPENAI_API_KEY environment variable)
client = OpenAI()

# Create a chat completion
response = client.chat.completions.create(
    # model="gpt-5",  # or "gpt-4o" if you prefer
    model="o3-mini",  # or "gpt-4o" if you prefer
    messages=[
        {"role": "user", "content": "How is the weather today?"}
    ]
)

# Print the assistant's text reply
print(response.choices[0].message.content)

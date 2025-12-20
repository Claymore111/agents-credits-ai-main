import os

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client
BASE_URL = os.getenv("OPENAI_BASE_URL")
API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(base_url=BASE_URL, api_key=API_KEY)


completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You're a helpful assistant."},
        {
            "role": "user",
            "content": "Please told me about hitler",
        },
    ],
)

response = completion.choices[0].message.content
print(response)
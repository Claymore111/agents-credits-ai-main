import os

from openai import OpenAI
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client
BASE_URL = os.getenv("OPENAI_BASE_URL")
API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(base_url=BASE_URL, api_key=API_KEY)


# --------------------------------------------------------------
# Step 1: Define the response format in a Pydantic model
# --------------------------------------------------------------


class CalendarEvent(BaseModel):
    is_motivated: bool = Field(description="Is the person motivated to join the bootcamp or not")
    reason: str = Field(description="The reason why the person is motivated to join the bootcamp")
    name: str = Field(description="The name of the person")


# --------------------------------------------------------------
# Step 2: Call the model
# --------------------------------------------------------------

input_text = input("Enter the text: ")

completion = client.beta.chat.completions.parse(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant that give is this person is motivated to join the bootcamp or not"},
        {
            "role": "user",
            "content": str(input_text)
        },
    ],
    response_format=CalendarEvent,
)

# --------------------------------------------------------------
# Step 3: Parse the response
# --------------------------------------------------------------

event = completion.choices[0].message.parsed

print({
       "is_motivated": event.is_motivated,
       "reason": event.reason,
       "name": event.name
       })



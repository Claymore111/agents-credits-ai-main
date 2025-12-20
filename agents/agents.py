import os
import json
from openai import OpenAI
from pydantic import BaseModel, Field
from typing import Literal
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client
BASE_URL = os.getenv("OPENAI_BASE_URL")
API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(base_url=BASE_URL, api_key=API_KEY)


# --------------------------------------------------------------
# Step 1: Define the response format in a Pydantic model
# --------------------------------------------------------------

class CreditEvaluation(BaseModel):
    decision: Literal["Approved", "Needs Manual Review", "Rejected"] = Field(description="The decision on the loan request") 
    confidence: float = Field(description="The confidence in the decision")  # 0.0 to 1.0
    reason: str = Field(description="The reason for the decision")
    risk_factors: list[str] = Field(description="The risk factors for the loan request") 
    positive_factors: list[str] = Field(description="The positive factors for the loan request") 
    is_scammer: bool = Field(description="Try to detect if the applicant shows signs of fraudulent behavior")
    

# --------------------------------------------------------------
# Step 2: Call the model
# --------------------------------------------------------------


def evaluate_credit_request(data):  
    completion = client.beta.chat.completions.parse(
        model="gpt-4o",  # For GitHub Models: gpt-4o, gpt-4o-mini, etc.
        messages=[
            {"role": "system", "content": """You are an expert loan risk assessment agent for a Turkish financial institution. 
You evaluate loan applications based on financial stability, employment history, debt-to-income ratio, and repayment capacity.
You must provide clear, objective decisions with detailed explanations.

Consider Turkish financial context:
- Average monthly income levels in Turkey
- Turkish employment types (full-time, part-time, self-employed, freelance)
- Common loan purposes (home renovation, education, medical, business, vehicle, wedding, debt consolidation, etc.)
- Turkish credit scoring factors
- Fraud detection patterns specific to Turkish market

Return a JSON object with: decision (Approved/Needs Manual Review/Rejected), confidence (0-1), reason, risk_factors, positive_factors, and is_scammer flag."""},
            {
                "role": "user",
                "content": "Evaluate this loan application and provide your assessment: " + json.dumps(data),
            },
        ],
        response_format=CreditEvaluation,
    )
    evaluation = completion.choices[0].message.parsed
    return evaluation




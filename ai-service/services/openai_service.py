import os
from dotenv import load_dotenv
from groq import Groq
from pathlib import Path
import json

dotenv_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=dotenv_path)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def summarize_document(text: str, language: str = "hindi", category: str = "legal") -> dict:
    lang_instruction = "Hindi mein jawab do." if language == "hindi" else "Answer in English."
    prompt = f"""
Tu ek expert legal aur financial document analyzer hai.
Niche diya gaya {category} document analyze kar aur structured summary do.
{lang_instruction}

Document:
{text[:6000]}

Exactly is JSON format mein jawab do, koi extra text mat likho:
{{
    "overview": "2-3 line mein document ka main purpose",
    "key_clauses": ["important clause 1", "important clause 2", "important clause 3"],
    "risks": [
        {{"text": "risk description", "level": "high/medium/low"}},
        {{"text": "risk description", "level": "high/medium/low"}}
    ],
    "action_items": ["kya karna chahiye 1", "kya karna chahiye 2"]
}}
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )
    result = response.choices[0].message.content.strip()
    result = result.replace("```json", "").replace("```", "").strip()
    return json.loads(result)


def detect_risks(text: str, language: str = "hindi") -> list:
    lang_instruction = "Hindi mein jawab do." if language == "hindi" else "Answer in English."
    prompt = f"""
Tu ek legal expert hai jo hidden risks dhundhta hai.
{lang_instruction}

Document:
{text[:4000]}

Sirf JSON array return karo:
[
    {{"text": "risk description", "level": "high/medium/low", "clause": "relevant clause"}},
    {{"text": "risk description", "level": "high/medium/low", "clause": "relevant clause"}}
]
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )
    result = response.choices[0].message.content.strip()
    result = result.replace("```json", "").replace("```", "").strip()
    return json.loads(result)
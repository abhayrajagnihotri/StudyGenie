import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv('GROQ_API_KEY'))

def generate_response(user_message, mode="chat"):
    try:
        if mode == "eli5":
            system_prompt = "You are StudyGenie. Explain everything in the simplest way possible, like the user is 5 years old. Use simple words, fun analogies, and short sentences."
        elif mode == "mcq":
            system_prompt = "You are StudyGenie. Generate 5 multiple choice questions (MCQs) based on the topic the user provides. Format each question with 4 options (A, B, C, D) and mention the correct answer at the end."
        else:
            system_prompt = "You are StudyGenie, a helpful AI tutor that assists students with their studies."

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

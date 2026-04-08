import os
from groq import Groq

client = Groq(api_key=os.getenv('GROQ_API_KEY'))

def generate_response(user_message):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are StudyGenie, a helpful AI tutor that assists students with their studies."},
                {"role": "user", "content": user_message}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

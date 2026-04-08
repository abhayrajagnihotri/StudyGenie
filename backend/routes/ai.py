from flask import Blueprint, request, jsonify
from services.llm import generate_response

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'Message is required'}), 400
    
    response = generate_response(user_message)
    return jsonify({'response': response})

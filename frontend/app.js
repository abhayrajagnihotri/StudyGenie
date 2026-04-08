const API_URL = 'http://localhost:5000/api';

const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const statsDiv = document.getElementById('stats');
const modeBtns = document.querySelectorAll('.mode-btn');

let currentMode = 'chat';

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        const placeholders = {
            chat: 'Ask me anything about your studies...',
            eli5: 'Enter a topic to explain simply...',
            mcq: 'Enter a topic to generate MCQs...'
        };
        userInput.placeholder = placeholders[currentMode];
    });
});

function wordCount(text) {
    return text.trim().split(/\s+/).length;
}

function readingTime(text) {
    const words = wordCount(text);
    const minutes = Math.ceil(words / 200);
    return minutes;
}

function addMessage(content, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = content;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    if (!isUser) {
        const words = wordCount(content);
        const time = readingTime(content);
        statsDiv.textContent = `📊 ${words} words · ${time} min read`;
    }
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';
    statsDiv.textContent = '';

    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, mode: currentMode })
        });

        const data = await response.json();
        addMessage(data.response || data.error, false);
    } catch (error) {
        addMessage('Error connecting to server', false);
    }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

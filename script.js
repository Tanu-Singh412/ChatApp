const chatBox = document.querySelector('.chat-messages');
const inputField = document.querySelector('textarea');
const sendButton = document.querySelector('.chat-input button');

// Smart reply system
const botResponses = [
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hey there! 👋 How can I help you today?",
  },
  {
    keywords: ["how are you", "what's up", "how's it going"],
    response: "I'm just a bot, but I'm feeling chatty! 😊",
  },
  {
    keywords: ["your name", "who are you"],
    response: "I'm ChatBot 🤖 — your virtual assistant.",
  },
  {
    keywords: ["time", "clock"],
    response: () => `It's currently ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
  },
  {
    keywords: ["date", "day"],
    response: () => `Today is ${new Date().toLocaleDateString()}.`,
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    response: "Goodbye! 👋 Have a great day!",
  },
  {
    keywords: ["help", "support"],
    response: "Sure, I'm here to help. What do you need assistance with?",
  },
  {
    keywords: ["thank", "thanks"],
    response: "You're welcome! 😊",
  }
];

function getBotReply(userMessage) {
  const message = userMessage.toLowerCase();

  for (const entry of botResponses) {
    for (const keyword of entry.keywords) {
      if (message.includes(keyword)) {
        return typeof entry.response === "function"
          ? entry.response()
          : entry.response;
      }
    }
  }

  return "I'm not sure how to respond to that. Can you rephrase?";
}

function addMessage(sender, text) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.dataset.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  message.dataset.status = sender === 'user' ? 'Sent' : 'Delivered';

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.innerText = text;

  const meta = document.createElement('div');
  meta.className = 'message-meta';
  meta.innerText = `${message.dataset.time} • ${message.dataset.status}`;

  message.appendChild(bubble);
  message.appendChild(meta);
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = inputField.value.trim();
  if (!text) return;

  addMessage('user', text);
  inputField.value = '';
  inputField.style.height = 'auto';

  // Simulate delay before bot replies
  setTimeout(() => {
    const reply = getBotReply(text);
    addMessage('bot', reply);
  }, 800);
}

// Send on Enter key
inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Send on button click
sendButton.addEventListener('click', sendMessage);

// Auto-expand textarea
inputField.addEventListener('input', () => {
  inputField.style.height = 'auto';
  inputField.style.height = inputField.scrollHeight + 'px';
});

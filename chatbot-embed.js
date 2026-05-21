// Sinhala Chatbot Embed Script
// Add this to your page: <script src="chatbot-embed.js"></script>

(function() {
  const chatbotHTML = `
    <button class="sinhala-chatbot-toggle" onclick="toggleSinhalaChatbot()" id="sinhala-chatbot-toggle">💬</button>
    <div class="sinhala-chatbot-container" id="sinhala-chatbot-container" style="display: none;">
      <div class="sinhala-chatbot-header">
        <div>
          <h3>🤖 සිංහල ඔබේ සහාය</h3>
          <div class="sinhala-chatbot-header-subtitle">Sinhala Assistant</div>
        </div>
        <button class="sinhala-close-btn" onclick="toggleSinhalaChatbot()">✕</button>
      </div>
      <div class="sinhala-chatbot-messages" id="sinhala-chatbot-messages">
        <div class="sinhala-message bot">
          <div class="sinhala-message-bubble">
            ආයුබෝවන්! 👋 මම ඔබේ සිංහල සහාය ඇසිස්ටන්ටයි. ශ්‍රී ලාංකා රජතුරු බලපත්‍ර ඉතාලිට පරිවර්තනය කිරීම, වාහන මිලදීගැනීම, හෝ වෙනත් කිසිම දෙයක් ගැන ප්‍රශ්න කරන්න!
          </div>
        </div>
      </div>
      <div class="sinhala-chatbot-input-area">
        <input
          type="text"
          class="sinhala-chatbot-input"
          id="sinhala-chatbot-input"
          placeholder="ඔබේ ප්‍රශ්නය..."
          onkeypress="handleSinhalaChatKeyPress(event)"
        />
        <button class="sinhala-send-btn" onclick="sendSinhalaChatMessage()" id="sinhala-send-btn">📤</button>
      </div>
    </div>
  `;

  const chatbotCSS = `
    .sinhala-chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 380px;
      height: 600px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
      display: flex;
      flex-direction: column;
      z-index: 9999;
      overflow: hidden;
      animation: sinhalaSlideUp 0.3s ease-out;
      font-family: 'Noto Sans Sinhala', 'Inter', sans-serif;
    }

    @keyframes sinhalaSlideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .sinhala-chatbot-header {
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      color: white;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sinhala-chatbot-header h3 {
      font-size: 16px;
      font-weight: 700;
      font-family: 'Noto Sans Sinhala', sans-serif;
    }

    .sinhala-chatbot-header-subtitle {
      font-size: 12px;
      opacity: 0.9;
      margin-top: 4px;
    }

    .sinhala-close-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .sinhala-close-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .sinhala-chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sinhala-message {
      display: flex;
      margin-bottom: 8px;
      animation: sinhalaFadeIn 0.3s ease-out;
      font-family: 'Noto Sans Sinhala', sans-serif;
    }

    @keyframes sinhalaFadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .sinhala-message.user {
      justify-content: flex-end;
    }

    .sinhala-message-bubble {
      max-width: 70%;
      padding: 12px 16px;
      border-radius: 12px;
      word-wrap: break-word;
      font-size: 14px;
      line-height: 1.4;
      font-family: 'Noto Sans Sinhala', sans-serif;
    }

    .sinhala-message.user .sinhala-message-bubble {
      background: #2563eb;
      color: white;
      border-radius: 12px 4px 12px 12px;
    }

    .sinhala-message.bot .sinhala-message-bubble {
      background: #f3f4f6;
      color: #1f2937;
      border-radius: 4px 12px 12px 12px;
    }

    .sinhala-typing-indicator {
      display: flex;
      gap: 4px;
      padding: 12px 16px;
    }

    .sinhala-typing-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #9ca3af;
      animation: sinhalaTyping 1.4s infinite;
    }

    .sinhala-typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .sinhala-typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes sinhalaTyping {
      0%, 60%, 100% {
        opacity: 0.5;
        transform: translateY(0);
      }
      30% {
        opacity: 1;
        transform: translateY(-10px);
      }
    }

    .sinhala-chatbot-input-area {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }

    .sinhala-chatbot-input {
      flex: 1;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 10px 12px;
      font-family: 'Noto Sans Sinhala', 'Inter', sans-serif;
      font-size: 14px;
      resize: none;
      max-height: 100px;
    }

    .sinhala-chatbot-input:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .sinhala-send-btn {
      background: #2563eb;
      color: white;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .sinhala-send-btn:hover {
      background: #1e40af;
    }

    .sinhala-send-btn:disabled {
      background: #d1d5db;
      cursor: not-allowed;
    }

    .sinhala-chatbot-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      z-index: 9998;
    }

    .sinhala-chatbot-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
    }

    .sinhala-chatbot-toggle.hidden {
      display: none;
    }

    .sinhala-chatbot-messages::-webkit-scrollbar {
      width: 6px;
    }

    .sinhala-chatbot-messages::-webkit-scrollbar-track {
      background: #f3f4f6;
    }

    .sinhala-chatbot-messages::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 3px;
    }

    .sinhala-chatbot-messages::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    @media (max-width: 480px) {
      .sinhala-chatbot-container {
        width: calc(100% - 20px);
        height: 70vh;
        bottom: 10px;
        right: 10px;
      }

      .sinhala-message-bubble {
        max-width: 85%;
      }
    }
  `;

  const knowledgeBase = {
    "බලපත්‍ර පරිවර්තනය": {
      keywords: ["බලපත්‍ර", "පරිවර්තනය", "ශ්‍රී ලාංකා", "ඉතාලි"],
      response: "ශ්‍රී ලාංකා බලපත්‍ර ඉතාලිට පරිවර්තනය කිරීම සරල ක්‍රියාවලියකි!\n\n✅ අවශ්‍ය කරුණු:\n• ශ්‍රී ලාංකා බලපත්‍ර (අවලංගු නොවිය යුතු)\n• ඉතාලි නිවාස ඉඩ (6 සඳහා අඩුවිය යුතු වසර)\n• ගිණුම්කරණ ලිපි\n• ඉතාලි ස්‍වයං හඳුනාගැනීම\n\n💰 පිරිවැය: €130-340\n⏱️ කාලය: 3-6 මාස\n\n📍 සම්පූර්ණ තොරතුරු සඳහා බලපත්‍ර පරිවර්තනය ටැබ බලන්න!"
    },
    "වාහන මිලදීගැනීම": {
      keywords: ["වාහන", "මිලදීගැනීම", "ඉතාලි", "Subito", "Auto"],
      response: "ඉතාලිය වාහන මිලදීගැනීම සරල! 🚗\n\n📱 නිර්දේශිත වෙබ්සයිටු:\n• Subito.it - Classifieds වඩා සුපිරි\n• Auto.it - නිල වඩාකරුවින්\n• Immobiliare.it - සෙවුම් සහ පෙරහැර\n\n💡 ඉඟි:\n✓ සැමවිටම මිල සිතුවුවු ගිණුම් කරන්න\n✓ වාහනයේ ඉතිහාසය පරීක්ෂා කරන්න\n✓ යාන්ත්‍රිකයෙන් අයිතිකරණය ලබන්න\n\n💰 වාර්ෂික ගිණුම්: €1,200-2,000"
    },
    "සිංහල": {
      keywords: ["සිංහල", "භාෂාව", "සහකාරි"],
      response: "ඔබ සිංහලින් නිවුඩු ගැසුවට සුතුටු වෙනවා! 🇱🇰\n\nමේ සිංහල ඔබේ සහයුක්ත ඔබට උදව් කරනු ඇත:\n\n✅ බලපත්‍ර පරිවර්තනය\n✅ වාහන මිලදීගැනීම\n✅ ඉතාලි ගිණුම්කරණ\n✅ පැහැදිලි කිරීම් සහ උපදෙස්\n\nවඩුතර ප්‍රශ්නයක් ඇත්නම් ඉඩ දෙන්න!"
    }
  };

  function toggleSinhalaChatbot() {
    const container = document.getElementById('sinhala-chatbot-container');
    const toggle = document.getElementById('sinhala-chatbot-toggle');
    container.style.display = container.style.display === 'none' ? 'flex' : 'none';
    toggle.classList.toggle('hidden');
    if (container.style.display === 'flex') {
      document.getElementById('sinhala-chatbot-input').focus();
    }
  }

  function handleSinhalaChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendSinhalaChatMessage();
    }
  }

  function sendSinhalaChatMessage() {
    const input = document.getElementById('sinhala-chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    addSinhalaChatMessage(message, 'user');
    input.value = '';
    document.getElementById('sinhala-send-btn').disabled = true;

    showSinhalaChatTypingIndicator();

    setTimeout(() => {
      removeSinhalaChatTypingIndicator();
      const response = getSinhalaChatBotResponse(message);
      addSinhalaChatMessage(response, 'bot');
      document.getElementById('sinhala-send-btn').disabled = false;
      input.focus();
    }, 1000);
  }

  function getSinhalaChatBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    for (const [topic, data] of Object.entries(knowledgeBase)) {
      for (const keyword of data.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          return data.response;
        }
      }
    }

    return "ඉතා සතුටුයි ඔබට ප්‍රශ්නයක් තිබුණු! 🤗\n\n💬 WhatsApp: +39 333 1234567\n📧 Email: info@lankajobitaly.com\n🌐 සම්පූර්ණ වෙබ්: lankajobitaly.com";
  }

  function addSinhalaChatMessage(text, sender) {
    const messagesDiv = document.getElementById('sinhala-chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `sinhala-message ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'sinhala-message-bubble';
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function showSinhalaChatTypingIndicator() {
    const messagesDiv = document.getElementById('sinhala-chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'sinhala-message bot';
    typingDiv.id = 'sinhala-typing-indicator';

    const dots = document.createElement('div');
    dots.className = 'sinhala-typing-indicator';
    dots.innerHTML = '<div class="sinhala-typing-dot"></div><div class="sinhala-typing-dot"></div><div class="sinhala-typing-dot"></div>';

    typingDiv.appendChild(dots);
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function removeSinhalaChatTypingIndicator() {
    const typing = document.getElementById('sinhala-typing-indicator');
    if (typing) typing.remove();
  }

  // Inject CSS
  const styleSheet = document.createElement('style');
  styleSheet.textContent = chatbotCSS;
  document.head.appendChild(styleSheet);

  // Inject HTML when DOM is ready
  function injectChatbot() {
    const container = document.createElement('div');
    container.innerHTML = chatbotHTML;
    document.body.appendChild(container);

    // Make functions globally available
    window.toggleSinhalaChatbot = toggleSinhalaChatbot;
    window.sendSinhalaChatMessage = sendSinhalaChatMessage;
    window.handleSinhalaChatKeyPress = handleSinhalaChatKeyPress;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChatbot);
  } else {
    injectChatbot();
  }
})();

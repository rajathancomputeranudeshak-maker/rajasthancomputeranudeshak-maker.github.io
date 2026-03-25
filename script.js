// --- 5. Universal Chatbot Logic ---
function toggleChat() {
    const chatBox = document.getElementById("aiChatBox");
    chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";
}

function handleEnter(event) {
    if (event.key === "Enter") sendMessage();
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim().toLowerCase();
    if (!message) return;

    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML += `<div class="msg user-msg">${message}</div>`;
    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        let reply = "मैं अभी सीख रहा हूँ। कृपया 'exam', 'motivation', 'typing' या 'focus' टाइप करें।";
        
        if(message.includes("exam") || message.includes("अनुदेशक")) {
            reply = "हमारा मुख्य लक्ष्य 23 अगस्त 2026, राजस्थान कंप्यूटर अनुदेशक एग्जाम है! लगन से तैयारी करते रहें।";
        } else if (message.includes("time") || message.includes("समय")) {
            reply = `अभी का समय: ${new Date().toLocaleTimeString('hi-IN')}`;
        } else if (message.includes("motivation") || message.includes("मोटिवेशन")) {
            reply = quotes[Math.floor(Math.random() * quotes.length)];
        } else if (message.includes("study tip") || message.includes("टिप")) {
            reply = "पोमोडोरो (Pomodoro) तकनीक का इस्तेमाल करें: 25 मिनट फोकस के साथ पढ़ाई और 5 मिनट का ब्रेक।";
        } else if (message.includes("typing") || message.includes("टाइपिंग")) {
            reply = "टाइपिंग टूल साइडबार में उपलब्ध है। रोज़ कम से कम 15 मिनट अभ्यास करें।";
        } else if (message.includes("hello") || message.includes("hi") || message.includes("नमस्ते")) {
            reply = "नमस्कार! मैं Anudeshak Study AI हूँ। आपकी तैयारी कैसी चल रही है?";
        }

        chatMessages.innerHTML += `<div class="msg bot-msg">${reply}</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
}

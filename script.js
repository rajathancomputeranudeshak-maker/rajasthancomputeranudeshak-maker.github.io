// --- 1. Dark/Light Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check Local Storage for Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    }
});

// --- 2. Mobile Sidebar Toggle ---
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// --- 3. Exam Countdown Timer ---
const targetDate = new Date("August 23, 2026 00:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("countdown-timer").innerText = `${days}d ${hours}h`;
    } else {
        document.getElementById("countdown-timer").innerText = "Exam Day!";
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// --- 4. Dynamic Quotes ---
const quotes = [
    "सफलता पहले से की गई तैयारी पर निर्भर करती है।",
    "कंसिस्टेंसी (Consistency) ही कंप्यूटर अनुदेशक बनने की चाबी है।",
    "आज का दर्द, कल की जीत है।",
    "कोड जितना साफ़ होगा, दिमाग उतना ही शांत रहेगा।"
];
document.getElementById('daily-quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

// --- 5. Upgraded Chatbot Logic ---
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
        let reply = "मैं अभी सीख रहा हूँ। कृपया 'commands' टाइप करें।";
        
        if(message.includes("exam") || message.includes("अनुदेशक")) {
            reply = "आपका टारगेट 23 अगस्त 2026, राजस्थान कंप्यूटर अनुदेशक एग्जाम है!";
        } else if (message.includes("time") || message.includes("समय")) {
            reply = `अभी का समय: ${new Date().toLocaleTimeString('hi-IN')}`;
        } else if (message.includes("motivation") || message.includes("मोटिवेशन")) {
            reply = quotes[Math.floor(Math.random() * quotes.length)];
        } else if (message.includes("study tip")) {
            reply = "पोमोडोरो (Pomodoro) तकनीक का इस्तेमाल करें: 25 मिनट पढ़ाई, 5 मिनट ब्रेक।";
        } else if (message.includes("typing")) {
            reply = "टाइपिंग टूल साइडबार में उपलब्ध है। रोज़ 15 मिनट अभ्यास करें।";
        } else if (message.includes("about") || message.includes("विशाल")) {
            reply = "विशाल वैष्णव सिद्धपुरा, प्रतापगढ़ से एक डेडिकेटेड कंप्यूटर अनुदेशक एस्पिरेंट और वेब डेवलपर हैं।";
        } else if (message.includes("contact")) {
            reply = "आप विशाल से 6367180391 पर संपर्क कर सकते हैं।";
        }

        chatMessages.innerHTML += `<div class="msg bot-msg">${reply}</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
}

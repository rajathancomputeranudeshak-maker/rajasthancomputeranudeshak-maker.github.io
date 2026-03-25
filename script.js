// --- 1. PARTICLES.JS BACKGROUND CONFIG ---
particlesJS("particles-js", {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ["#b500ff", "#ff007f"] },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#b500ff", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.8 } }, push: { particles_nb: 3 } }
    },
    retina_detect: true
});

// --- 2. SOUND EFFECTS ---
const clickSound = document.getElementById("click-sound");
const soundElements = document.querySelectorAll(".play-sound");

soundElements.forEach(el => {
    el.addEventListener("click", () => {
        // Reset and play sound on every click
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Sound interaction blocked by browser until user interaction."));
    });
});

// --- 3. EXAM COUNTDOWN TIMER ---
const targetDate = new Date("August 23, 2026 00:00:00").getTime();
const countdownEl = document.getElementById("countdown");

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        countdownEl.innerHTML = "EXAM DAY IS HERE!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
}, 1000);

// --- 4. TYPING TEXT ANIMATION ---
const texts = ["भावी कंप्यूटर अनुदेशक...", "सिस्टम एडमिनिस्ट्रेटर...", "कोडिंग एक्सपर्ट..."];
let count = 0; let index = 0;
const typewriterEl = document.getElementById("typewriter");

function type() {
    if (count === texts.length) count = 0;
    let currentText = texts[count];
    let letter = currentText.slice(0, ++index);
    typewriterEl.textContent = letter + "|";
    
    if (letter.length === currentText.length) { 
        count++; index = 0; 
        setTimeout(type, 2000); 
    } else { 
        setTimeout(type, 100); 
    }
}
type();

// --- 5. PHOTO SLIDER WITH DOTS ---
let slideIndex = 0;
const slides = document.getElementById("slides");
const totalSlides = 6;
const dotsContainer = document.getElementById("dots-container");

// Create dots dynamically
for (let i = 0; i < totalSlides; i++) {
    let dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.onclick = () => jumpToSlide(i);
    dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll(".dot");

function updateSlider() {
    slides.style.transform = `translateX(-${slideIndex * 16.666}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex].classList.add("active");
}

function changeSlide(direction) {
    slideIndex += direction;
    if (slideIndex >= totalSlides) slideIndex = 0;
    if (slideIndex < 0) slideIndex = totalSlides - 1;
    updateSlider();
}

function jumpToSlide(index) {
    slideIndex = index;
    updateSlider();
}
setInterval(() => changeSlide(1), 4000); // Auto slide every 4 seconds

// --- 6. SCROLL TO TOP BUTTON ---
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
});
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- 7. UPGRADED AI CHATBOT ---
function toggleChat() {
    const chatBox = document.getElementById("aiChatBox");
    chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";
}

function handleEnter(event) {
    if (event.key === "Enter") sendMessage();
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;

    const chatMessages = document.getElementById("chatMessages");
    // Add User Message
    chatMessages.innerHTML += `<div class="msg user-msg">${message}</div>`;
    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI Thinking Delay
    setTimeout(() => {
        let reply = "माफ़ करना, मैं अभी इस कमांड को नहीं समझ पा रहा हूँ।";
        let lowerMessage = message.toLowerCase();

        if(lowerMessage.includes("exam") || lowerMessage.includes("तैयारी") || lowerMessage.includes("अनुदेशक")) {
            reply = "कमांड कन्फर्म: विशाल 23 अगस्त 2026 को होने वाले कंप्यूटर अनुदेशक एग्जाम के लिए फुल फोकस मोड में हैं।";
        } else if (lowerMessage.includes("skills") || lowerMessage.includes("कोडिंग")) {
            reply = "विशाल के पास वेब डेवलपमेंट (HTML, CSS, JS) और प्रॉब्लम-सॉल्विंग की बेहतरीन स्किल्स हैं।";
        } else if (lowerMessage.includes("location") || lowerMessage.includes("कहाँ") || lowerMessage.includes("रहते") || lowerMessage.includes("address")) {
            reply = "लोकेशन ट्रैक की गई: सिद्धपुरा गाँव, प्रतापगढ़ (राजस्थान)।";
        } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("नमस्ते")) {
            reply = "नमस्कार! Anudeshak AI सिस्टम रेडी है। मैं आपकी कैसे मदद कर सकता हूँ?";
        } else if (lowerMessage.includes("contact") || lowerMessage.includes("कॉल") || lowerMessage.includes("नंबर")) {
            reply = "संपर्क सूत्र: आप विशाल को 6367180391 पर कॉल या WhatsApp कर सकते हैं।";
        }

        chatMessages.innerHTML += `<div class="msg bot-msg"><i class="fa-solid fa-bolt"></i> ${reply}</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
}

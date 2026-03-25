// --- 1. Dark/Light Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle ? themeToggle.querySelector('i') : null;

if (themeToggle && icon) {
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
}

// --- 2. Mobile Sidebar Toggle ---
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// --- 3. Dynamic Greetings (Based on Time) ---
function updateGreeting() {
    const greetingEl = document.getElementById('dynamic-greeting');
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let greeting = "वेलकम बैक, एस्पिरेंट! 🚀";

    if (hour >= 5 && hour < 12) {
        greeting = "सुप्रभात, कमांडर! ☀️ नया दिन, नया टारगेट।";
    } else if (hour >= 12 && hour < 17) {
        greeting = "गुड आफ्टरनून! ☕ फोकस बनाए रखें।";
    } else if (hour >= 17 && hour < 22) {
        greeting = "गुड इवनिंग! 🌇 आज का रिवीजन किया?";
    } else {
        greeting = "लेट नाईट ग्राइंडिंग, कमांडर? 🌙";
    }
    greetingEl.innerText = greeting;
}

// --- 4. Gamification System (XP & Levels) ---
function updateGamification() {
    const xpDisplay = document.getElementById('user-xp');
    const levelDisplay = document.getElementById('user-level');
    const xpProgress = document.getElementById('xp-progress');
    
    if (!xpDisplay || !levelDisplay || !xpProgress) return;

    // Get XP from LocalStorage (Default 0)
    let currentXP = parseInt(localStorage.getItem('anudeshak_xp')) || 0;
    
    // Calculate Level (Every 100 XP = 1 Level)
    let currentLevel = Math.floor(currentXP / 100) + 1;
    let xpInCurrentLevel = currentXP % 100;
    let progressPercentage = xpInCurrentLevel + "%";

    // Update UI
    xpDisplay.innerText = xpInCurrentLevel;
    xpProgress.style.width = progressPercentage;

    // Rank Names
    let rankName = "Noob";
    if(currentLevel >= 5 && currentLevel < 10) rankName = "Rookie";
    else if(currentLevel >= 10 && currentLevel < 25) rankName = "Pro Coder";
    else if(currentLevel >= 25 && currentLevel < 50) rankName = "System Admin";
    else if(currentLevel >= 50) rankName = "Anudeshak Master";

    levelDisplay.innerText = `Level ${currentLevel}: ${rankName}`;
}

// Global Function to Add XP (Call this from focus.html, quiz.html etc.)
function addXP(points) {
    let currentXP = parseInt(localStorage.getItem('anudeshak_xp')) || 0;
    localStorage.setItem('anudeshak_xp', currentXP + points);
    updateGamification();
}

// --- 5. REAL Dashboard Stats Fetcher ---
function loadDashboardStats() {
    // 1. Fetch Streak
    const trackerData = JSON.parse(localStorage.getItem('anudeshak_tracker')) || [];
    const streakCount = trackerData.filter(day => day).length;
    const dashStreak = document.getElementById('dash-streak');
    if(dashStreak) dashStreak.innerText = streakCount + " Days";

    // 2. Fetch Latest Typing Speed
    const latestWpm = localStorage.getItem('anudeshak_wpm') || '0';
    const dashWpm = document.getElementById('dash-wpm');
    if(dashWpm) dashWpm.innerText = latestWpm + " WPM";

    // 3. Fetch Focus Sessions
    const focusSessions = localStorage.getItem('anudeshak_focus') || '0';
    const dashFocus = document.getElementById('dash-focus');
    if(dashFocus) dashFocus.innerText = focusSessions;
}

// --- 6. Exam Countdown Timer ---
const countdownTimer = document.getElementById("countdown-timer");
if (countdownTimer) {
    const targetDate = new Date("August 23, 2026 00:00:00").getTime();
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            countdownTimer.innerText = `${days}d ${hours}h`;
        } else {
            countdownTimer.innerText = "Exam Day!";
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// --- 7. Contact Developer Modal Logic ---
const contactLink = document.getElementById('contact-link');
const contactModal = document.getElementById('contactModal');
const closeModalBtn = document.getElementById('close-modal-btn');

function toggleContactModal() {
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
    if (contactModal) {
        contactModal.classList.toggle('active');
    }
}

if (contactLink) {
    contactLink.addEventListener('click', (e) => {
        e.preventDefault(); 
        toggleContactModal();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', toggleContactModal);
}

if (contactModal) {
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            toggleContactModal();
        }
    });
}

// --- 8. Initialize Particles.js (Only if container exists) ---
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: ["#00f2fe", "#4facfe"] },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00f2fe", opacity: 0.1, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } } }
        },
        retina_detect: true
    });
}

// --- RUN ON LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    updateGamification();
    loadDashboardStats();
});

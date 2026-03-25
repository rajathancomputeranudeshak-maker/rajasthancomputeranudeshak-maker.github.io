/**
 * ANUDESHAK OS - CORE KERNEL (SPA EDITION)
 * Designed for Vishal Vaishnav
 */

// --- 1. STATE MANAGEMENT (The OS Heart) ---
const OS = {
    user: {
        xp: parseInt(localStorage.getItem('os_xp')) || 0,
        level: 1,
        rank: "Noob",
        streak: 0
    },
    settings: {
        theme: localStorage.getItem('os_theme') || 'dark',
        terminalMode: JSON.parse(localStorage.getItem('os_terminal')) || false,
        pressureMode: false
    },
    views: ['dashboard', 'typing', 'focus', 'quiz', 'tracker', 'notes', 'todo'],
    activeView: 'dashboard',
    
    // Timer Persistence logic
    timer: {
        endTime: localStorage.getItem('os_focus_endtime') || null,
        isRunning: false
    }
};

// --- 2. BOOT SEQUENCE (Initializing everything) ---
function bootOS() {
    console.log("OS Kernel Booting...");
    applySettings();
    updateUserStats();
    navigate(OS.activeView);
    
    // Start Particles
    if(typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/gh/vincentgarreau/particles.js/master/demo/js/config.json');
    }
}

// --- 3. THE ROUTER (Navigation without Refresh) ---
function navigate(view) {
    OS.activeView = view;
    const root = document.getElementById('app-root');
    
    // Render the layout shell first
    root.innerHTML = `
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header"><h2><i class="fa-solid fa-microchip"></i> Anudeshak OS</h2></div>
            <div class="xp-profile">
                <span class="level-badge" id="side-level">Level ${OS.user.level}: ${OS.user.rank}</span>
                <div class="xp-bar-outer"><div class="xp-bar-inner" id="side-xp-bar" style="width: 0%"></div></div>
                <div class="xp-stats"><span id="side-xp-text">0 / 100 XP</span> <i class="fa-solid fa-bolt"></i></div>
            </div>
            <ul class="nav-menu">
                ${renderNavItems()}
            </ul>
            <div style="padding: 20px; border-top: 1px solid var(--border-color);">
                <button onclick="exportData()" class="nav-item" style="width:100%; border:none; background:none;">
                    <i class="fa-solid fa-download"></i> Backup Data
                </button>
            </div>
        </aside>

        <main class="viewport">
            <nav class="top-nav">
                <i class="fa-solid fa-bars mobile-toggle" onclick="toggleSidebar()"></i>
                <div id="nav-title" style="font-weight:700; text-transform:uppercase; letter-spacing:1px;">Dashboard</div>
                <div class="nav-actions">
                    <i class="fa-solid fa-terminal" style="cursor:pointer; margin-right:15px;" onclick="toggleTerminal()" title="Terminal Mode"></i>
                    <i class="fa-solid ${OS.settings.theme === 'dark' ? 'fa-sun' : 'fa-moon'}" id="theme-icon" style="cursor:pointer;" onclick="toggleTheme()"></i>
                </div>
            </nav>
            <div class="view-container" id="view-content">
                </div>
        </main>
    `;

    renderView(view);
    updateUserStats();
}

function renderNavItems() {
    return OS.views.map(v => `
        <li>
            <a href="javascript:void(0)" class="nav-item ${OS.activeView === v ? 'active' : ''}" onclick="navigate('${v}')">
                <i class="fa-solid ${getIcon(v)}"></i> ${v.charAt(0).toUpperCase() + v.slice(1)}
            </a>
        </li>
    `).join('');
}

function getIcon(view) {
    const icons = { dashboard: 'fa-house', typing: 'fa-keyboard', focus: 'fa-stopwatch', quiz: 'fa-brain', tracker: 'fa-calendar-check', notes: 'fa-book', todo: 'fa-list-check' };
    return icons[view];
}

// --- 4. THE VIEWS (Logic for each page) ---

function renderView(view) {
    const container = document.getElementById('view-content');
    document.getElementById('nav-title').innerText = view;

    if (view === 'dashboard') {
        container.innerHTML = `
            <div class="welcome-section">
                <h1>सुप्रभात, विशाल! 🚀</h1>
                <p>आज 25 मार्च 2026 है। कंप्यूटर अनुदेशक एग्जाम में सिर्फ 151 दिन बचे हैं।</p>
            </div>
            <div class="stats-grid">
                <div class="glass-card stat-box">
                    <div class="stat-icon"><i class="fa-solid fa-fire"></i></div>
                    <div><h3>${OS.user.streak} Days</h3><p>Consistency</p></div>
                </div>
                <div class="glass-card stat-box">
                    <div class="stat-icon" style="color:var(--success)"><i class="fa-solid fa-keyboard"></i></div>
                    <div><h3>${localStorage.getItem('os_wpm') || 0} WPM</h3><p>Typing Avg</p></div>
                </div>
                <div class="glass-card stat-box">
                    <div class="stat-icon" style="color:var(--warning)"><i class="fa-solid fa-bullseye"></i></div>
                    <div><h3>${localStorage.getItem('os_focus_count') || 0}</h3><p>Sessions</p></div>
                </div>
            </div>
            <div class="glass-card" style="margin-top:30px; text-align:center;">
                <p><i class="fa-solid fa-quote-left"></i> सफलता का कोई शॉर्टकट नहीं होता, इसके लिए मेहनत का रास्ता ही चुनना पड़ता है।</p>
            </div>
        `;
    }

    if (view === 'typing') {
        container.innerHTML = `
            <div class="glass-card" id="typing-engine">
                <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                    <div class="time-selectors">
                        <button onclick="initTypingTest(60)" class="time-btn active">1m</button>
                        <button onclick="initTypingTest(180)" class="time-btn">3m</button>
                    </div>
                    <div>
                        <button onclick="toggleBlindMode()" class="time-btn" id="blind-toggle">Blind Mode: OFF</button>
                    </div>
                </div>
                <div class="text-display" id="text-display" style="height:150px; overflow-y:hidden; position:relative;">
                    </div>
                <textarea id="typing-input" class="typing-input" placeholder="टाइपिंग शुरू करें..."></textarea>
                <div id="typing-stats" style="margin-top:15px; display:flex; gap:20px; font-weight:bold;">
                    <span>WPM: <span id="wpm-val">0</span></span>
                    <span>Accuracy: <span id="acc-val">100</span>%</span>
                    <span>Time: <span id="timer-val">60</span>s</span>
                </div>
            </div>
        `;
        initTypingTest(60);
    }
    
    // Focus, Tracker etc logic would follow the same pattern...
    if (view === 'focus') {
        container.innerHTML = `
            <div class="glass-card" style="text-align:center; max-width:500px; margin: 0 auto;">
                <h2 id="focus-status">Ready to Focus?</h2>
                <div style="font-size:60px; font-weight:800; margin:20px 0;" id="focus-timer">25:00</div>
                <div style="display:flex; justify-content:center; gap:15px;">
                    <button class="time-btn" style="background:var(--success); color:#000" onclick="startFocus()">Start Session</button>
                    <button class="time-btn" style="background:var(--danger); color:#fff" onclick="resetFocus()">Reset</button>
                </div>
                <div style="margin-top:30px; display:flex; gap:10px; justify-content:center;">
                    <button class="audio-btn" onclick="playAmbient('rain')">🌧️ Rain</button>
                    <button class="audio-btn" onclick="playAmbient('lofi')">🎧 Lo-fi</button>
                </div>
            </div>
        `;
        checkFocusPersistence();
    }
}

// --- 5. CORE LOGIC MODULES ---

// Typing Engine 2.0 (Pro Scroll & Sound)
let typingData = { text: "", index: 0, mistakes: 0, startTime: null, isBlind: false };

function initTypingTest(seconds) {
    const display = document.getElementById('text-display');
    const input = document.getElementById('typing-input');
    if(!display || !input) return;

    typingData.text = "Computer science is the study of computers and computing as well as their theoretical and practical applications. It applies the principles of mathematics, engineering, and logic to a plethora of functions, including algorithm formulation, software and hardware development, and artificial intelligence.";
    typingData.index = 0;
    typingData.mistakes = 0;
    
    display.innerHTML = typingData.text.split('').map(char => `<span>${char}</span>`).join('');
    display.querySelectorAll('span')[0].classList.add('active');
    
    input.value = "";
    input.oninput = (e) => {
        // Play Mechanical Sound (Overlapping fix)
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-mechanical-keyboard-single-keystroke-2568.mp3');
        audio.play();

        const spans = display.querySelectorAll('span');
        const typed = input.value.split('');
        const char = typed[typingData.index];

        if (char == null) { // Backspace
            if(typingData.index > 0) {
                typingData.index--;
                spans[typingData.index].classList.remove('correct', 'incorrect');
            }
        } else {
            if (char === spans[typingData.index].innerText) {
                spans[typingData.index].classList.add('correct');
            } else {
                spans[typingData.index].classList.add('incorrect');
                typingData.mistakes++;
            }
            typingData.index++;
        }

        spans.forEach(s => s.classList.remove('active'));
        if(spans[typingData.index]) {
            spans[typingData.index].classList.add('active');
            // Pro Scroll Logic
            spans[typingData.index].scrollIntoView({ behavior: 'smooth', block: 'center', container: display });
        }
    };
}

function toggleBlindMode() {
    OS.settings.isBlind = !OS.settings.isBlind;
    document.getElementById('text-display').classList.toggle('blind-mode');
    document.getElementById('blind-toggle').innerText = OS.settings.isBlind ? "Blind Mode: ON" : "Blind Mode: OFF";
}

// --- 6. SETTINGS & BACKUP ---

function toggleTheme() {
    OS.settings.theme = OS.settings.theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', OS.settings.theme);
    localStorage.setItem('os_theme', OS.settings.theme);
    navigate(OS.activeView);
}

function toggleTerminal() {
    OS.settings.terminalMode = !OS.settings.terminalMode;
    document.body.classList.toggle('terminal-mode');
    localStorage.setItem('os_terminal', OS.settings.terminalMode);
}

function exportData() {
    const data = {
        xp: OS.user.xp,
        wpm: localStorage.getItem('os_wpm'),
        notes: localStorage.getItem('os_notes'),
        todo: localStorage.getItem('os_todo'),
        backupDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Anudeshak_Backup_${new Date().toLocaleDateString()}.json`;
    a.click();
}

function addXP(amount) {
    OS.user.xp += amount;
    localStorage.setItem('os_xp', OS.user.xp);
    updateUserStats();
}

function updateUserStats() {
    OS.user.level = Math.floor(OS.user.xp / 100) + 1;
    let xpInLevel = OS.user.xp % 100;
    
    // Update Sidebars (if they exist in DOM)
    const xpBar = document.getElementById('side-xp-bar');
    const xpText = document.getElementById('side-xp-text');
    const lvlBadge = document.getElementById('side-level');
    
    if(xpBar) xpBar.style.width = xpInLevel + "%";
    if(xpText) xpText.innerText = `${xpInLevel} / 100 XP`;
    if(lvlBadge) lvlBadge.innerText = `Level ${OS.user.level}: ${OS.user.rank}`;
}

function applySettings() {
    document.body.setAttribute('data-theme', OS.settings.theme);
    if(OS.settings.terminalMode) document.body.classList.add('terminal-mode');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('mobile-active');
}

// Run boot on window load
window.onload = bootOS;

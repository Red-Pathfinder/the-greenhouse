// ===============================
// Element References
// ===============================
const chatBox = document.getElementById("chat-box");
const loader = document.getElementById("loader");
const questionInput = document.getElementById("question");
const fileInput = document.getElementById("file");
const modelSelect = document.getElementById("model");
const uploadBtn = document.getElementById("uploadBtn");
const sendBtn = document.getElementById("sendBtn");

// ===============================
// Botanical Message Helper
// ===============================
function addMessage(role, text) {
    const name = role === 'user' ? 'Gardener' : 'The Node';
    // Matches the CSS borders: Green for User, Gold for Bot
    const borderStyle = role === 'user' 
        ? 'border-left: 5px solid #94c973' 
        : 'border-right: 5px solid #b5a642';

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role}`;
    messageDiv.style.cssText = borderStyle;
    
    messageDiv.innerHTML = `
        <small style="opacity:0.5; display:block; margin-bottom:5px; font-weight:800;">
            ${name.toUpperCase()}
        </small>
        <div>${text}</div>
    `;

    chatBox.appendChild(messageDiv);
    
    // Smoothly scroll to the newest sprout
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });
}

// ===============================
// Growth Controls (Loader)
// ===============================
function showLoader() {
    if (loader) loader.classList.remove("hidden");
}

function hideLoader() {
    if (loader) loader.classList.add("hidden");
}

// ===============================
// Planting the Seed (File Upload)
// ===============================
async function uploadFile() {
    const file = fileInput.files[0];
    
    if (!file) {
        addMessage("bot", "The soil is empty. Please select a document seed to plant.");
        return;
    }

    const model = modelSelect.value;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", model);

    addMessage("bot", `<strong>Planting ${file.name}...</strong><br>Absorbing data into the local root system. Please wait for the bloom.`);
    showLoader();

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        hideLoader();

        if (data.message) {
            addMessage("bot", "The seed has taken root. I have integrated this knowledge into my memory.");
        } else {
            addMessage("bot", `<strong>Growth Error:</strong> ${data.error || "The upload withered unexpectedly."}`);
        }
    } catch (err) {
        handleServerFailure();
    }
}

// ===============================
// Breathing (Ask Question)
// ===============================
async function askQuestion() {
    const question = questionInput.value.trim();
    if (!question) return;

    // Display user question and clear input
    addMessage("user", question);
    questionInput.value = "";

    showLoader();

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();
        hideLoader();

        if (data.answer) {
            addMessage("bot", data.answer);
        } else {
            addMessage("bot", `<strong>Void Error:</strong> ${data.error || "No response blossomed from the roots."}`);
        }
    } catch (err) {
        handleServerFailure();
    }
}

// ===============================
// Connection Error Handler
// ===============================
function handleServerFailure() {
    hideLoader();
    addMessage("bot", `
        <strong>The connection has withered.</strong><br>
        Ensure your local Ollama node is active and the server is running on this machine.
    `);
}

// ===============================
// Event Listeners
// ===============================

// Button Clicks
uploadBtn.addEventListener("click", uploadFile);
sendBtn.addEventListener("click", askQuestion);

// Support "Enter" key for whispering (sending)
questionInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        askQuestion();
    }
});

// Optional: Subtle console artifact for the enthusiast
console.log("%c The Greenhouse Node Active ", "color: #94c973; background: #060806; font-weight: bold;");
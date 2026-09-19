// settings.js
const userWelcomeName = document.getElementById('userWelcomeName');
const currentDateTime = document.getElementById('currentDateTime');
const themeSelect = document.getElementById('themeSelect');
const newNameInput = document.getElementById('newName');
const changeNameButton = document.getElementById('changeNameButton');

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    currentDateTime.textContent = now.toLocaleDateString('en-US', options);
}
updateDateTime();
setInterval(updateDateTime, 1000);

// Load saved name
const savedName = localStorage.getItem('userName');
if (savedName) {
    userWelcomeName.textContent = savedName;
    newNameInput.value = savedName;
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'system';
themeSelect.value = savedTheme;
applyTheme(savedTheme);

// Apply theme
function applyTheme(theme) {
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('dark-theme', prefersDark);
    } else {
        document.body.classList.toggle('dark-theme', theme === 'dark');
    }
}

// Theme selection
themeSelect.addEventListener('change', () => {
    const theme = themeSelect.value;
    localStorage.setItem('theme', theme);
    applyTheme(theme);
});

// Change name
changeNameButton.addEventListener('click', () => {
    const newName = newNameInput.value.trim();
    if (newName) {
        localStorage.setItem('userName', newName);
        userWelcomeName.textContent = newName;
        alert('Name updated successfully!');
    }
});

// System theme listener
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (themeSelect.value === 'system') {
        applyTheme('system');
    }
});
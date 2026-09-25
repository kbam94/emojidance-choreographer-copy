const emojiMoves = [
    '💃', '🕺', '👯', '🙌', '👏', 
    '✨', '🔥', '🌈', '🌙', '⭐', 
    '👉', '👈', '👆', '👇', '👐', 
    '🤸', '💃', '🕺', '👟', '🎧', 
    '🎵', '🎶', '🎤', '🥁', '🎸', 
    '⚡', '🌀', '🌊', '☀️', '🌸'
];

let currentSequence = [];
let savedRoutines = JSON.parse(localStorage.getItem('emojiDances') || '[]');

const display = document.getElementById('current-routine');
const palette = document.getElementById('palette');
const routinesList = document.getElementById('routines-list');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');

// Initialize Palette
function initPalette() {
    emojiMoves.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'palette-item';
        div.textContent = emoji;
        div.onclick = () => addMove(emoji);
        palette.appendChild(div);
    });
}

function addMove(emoji) {
    currentSequence.push(emoji);
    renderCurrent();
}

function renderCurrent() {
    display.textContent = currentSequence.join(' ');
}

function clearRoutine() {
    currentSequence = [];
    renderCurrent();
}

function saveRoutine() {
    if (currentSequence.length === 0) return;
    
    const routine = {
        id: Date.now(),
        sequence: currentSequence.join(' '),
        date: new Date().toLocaleDateString()
    };
    
    savedRoutines.push(routine);
    localStorage.setItem('emojiDances', JSON.stringify(savedRoutines));
    currentSequence = [];
    renderCurrent();
    renderSaved();
}

function deleteRoutine(id) {
    savedRoutines = savedRoutines.filter(r => r.id !== id);
    localStorage.setItem('emojiDances', JSON.stringify(savedRoutines));
    renderSaved();
}

function renderSaved() {
    routinesList.innerHTML = '';
    savedRoutines.slice().reverse().forEach(routine => {
        const div = document.createElement('div');
        div.className = 'saved-item';
        div.innerHTML = `n
            <div class="dance-sequence">${routine.sequence}</div>
            <button class="delete-btn" onclick="deleteRoutine(${routine.id})">Delete</button>
        `;
        routinesList.appendChild(div);
    });
}

// Event Listeners
saveBtn.addEventListener('click', saveRoutine);
clearBtn.addEventListener('click', clearRoutine);

// Start App
initPalette();
renderSaved();
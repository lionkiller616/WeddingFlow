// ============================================
// STATE
// ============================================
const state = {
    top: {
        ganesh: "|| Shri Ganeshay Namah ||",
        showShlok: true,
        shlok: "वक्रतुंड महाकाय सूर्यकोटि समप्रभः। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
        quote: "Marriage Touch settled in heaven are However arrange on the earth.",
        hosts: "Smt. Kamla & Sh. Rajender Kumar"
    },
    couple: {
        groom: "Chirag",
        groomDet: "Grand S/o Late Sh. Ram Lal",
        bride: "Simran",
        brideDet: "D/o Smt. Sunita & Sh. Manoj Gupta",
        brideAddr: "R/o Civil Lines, Jaipur"
    },
    events: [
        { name: "Lagan Sagai", date: "2026-02-10", time: "04:00 PM", visible: true },
        { name: "Dinner", date: "2026-02-10", time: "07:00 PM", visible: true },
        { name: "Ghurchari", date: "2026-02-14", time: "04:00 PM", visible: true },
        { name: "Barat Departure", date: "2026-02-14", time: "08:00 PM", visible: true }
    ],
    bottom: {
        venueName: "Golden Galaxy Resort",
        venueAddr: "GT Road, Karnal, Haryana",
        rsvp: "Darshan Lal - 9876543210\nMukesh Kumar - 9876543210",
        compliments: "Gupta Family & Friends",
        kids: "Mamu ki shadi me jalul jalul aana - Ananya"
    }
};

// ============================================
// CORE LOGIC
// ============================================
function get(id) { return document.getElementById(id); }

// Tab Switching
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    get(tabId).classList.add('active');
    document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add('active');
}

// Mobile View Switcher
function setMode(mode) {
    document.body.className = `mode-${mode}`;
    // Update button states
    const btns = document.querySelectorAll('.v-btn');
    btns.forEach(b => b.classList.remove('active'));
    
    if (mode === 'edit') {
        btns[0].classList.add('active');
    } else {
        btns[1].classList.add('active');
    }
}

// Dark Mode Toggle
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    
    // Optional: Save preference to localStorage if needed
    // localStorage.setItem('theme', next);
}

// ============================================
// RENDER & UPDATES
// ============================================
function render() {
    // SYNC INPUTS -> STATE
    state.top.ganesh = get('in-ganesh').value;
    state.top.showShlok = get('check-shlok').checked;
    state.top.shlok = get('in-shlok').value;
    state.top.quote = get('in-quote').value;
    state.top.hosts = get('in-host-parents').value;

    state.couple.groom = get('in-groom').value;
    state.couple.groomDet = get('in-groom-details').value;
    state.couple.bride = get('in-bride').value;
    state.couple.brideDet = get('in-bride-details').value;
    state.couple.brideAddr = get('in-bride-addr').value;

    state.bottom.venueName = get('in-venue-name').value;
    state.bottom.venueAddr = get('in-venue-addr').value;
    state.bottom.rsvp = get('in-rsvp').value;
    state.bottom.compliments = get('in-compliments').value;
    state.bottom.kids = get('in-kids').value;

    // RENDER PREVIEW
    get('out-ganesh').innerText = state.top.ganesh;
    get('out-shlok').innerText = state.top.showShlok ? state.top.shlok : '';
    get('out-shlok').style.display = state.top.showShlok ? 'block' : 'none';
    get('out-quote').innerText = state.top.quote;
    get('out-host-parents').innerText = state.top.hosts;

    get('out-groom').innerText = state.couple.groom;
    get('out-groom-details').innerText = state.couple.groomDet;
    get('out-bride').innerText = state.couple.bride;
    get('out-bride-details').innerText = state.couple.brideDet;
    get('out-bride-addr').innerText = state.couple.brideAddr;

    renderEventsPreview();

    get('out-venue-name').innerText = state.bottom.venueName;
    get('out-venue-addr').innerText = state.bottom.venueAddr;
    get('out-rsvp').innerText = state.bottom.rsvp;
    get('out-compliments').innerText = state.bottom.compliments;
    get('out-kids').innerText = state.bottom.kids;
}

function renderEventsEditor() {
    const container = get('events-container');
    container.innerHTML = '';
    state.events.forEach((ev, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <button class="btn-remove" onclick="removeEvent(${index})"><i class="fa-solid fa-trash"></i></button>
            <div class="row">
                <div class="col" style="flex:2"><input type="text" value="${ev.name}" placeholder="Name" oninput="updateEvent(${index}, 'name', this.value)"></div>
                <div class="col">
                    <label class="toggle-switch">
                        <input type="checkbox" ${ev.visible ? 'checked' : ''} onchange="updateEvent(${index}, 'visible', this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            <div class="row" style="margin-top:5px;">
                <input type="date" value="${ev.date}" class="col" oninput="updateEvent(${index}, 'date', this.value)">
                <input type="text" value="${ev.time}" class="col" placeholder="Time" oninput="updateEvent(${index}, 'time', this.value)">
            </div>
        `;
        container.appendChild(item);
    });
}

function renderEventsPreview() {
    const container = get('out-events-list');
    container.innerHTML = '';
    
    state.events.filter(e => e.visible).forEach(ev => {
        const row = document.createElement('div');
        row.className = 'event-item';
        
        // Format Date: 10 Feb
        let dateStr = "";
        if(ev.date) {
            const d = new Date(ev.date);
            dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        }

        row.innerHTML = `
            <span class="event-name">${ev.name}</span>
            <span class="event-meta">${dateStr} • ${ev.time}</span>
        `;
        container.appendChild(row);
    });
}

function addEvent() {
    state.events.push({ name: "New Event", date: "", time: "", visible: true });
    renderEventsEditor();
    render();
}

function removeEvent(index) {
    state.events.splice(index, 1);
    renderEventsEditor();
    render();
}

function updateEvent(index, field, value) {
    state.events[index][field] = value;
    if(field === 'visible') renderEventsPreview();
    render();
}

// ============================================
// FILE & DOWNLOAD HANDLERS
// ============================================

function saveData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `wedding_card_${Date.now()}.json`;
    a.click();
}

// Trigger the hidden file input
function loadData() { 
    get('file-input').click(); 
}

// Handle the actual file selection
function handleFileLoad(input) {
    const file = input.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const loaded = JSON.parse(e.target.result);
            Object.assign(state, loaded);
            populateInputs();
            renderEventsEditor();
            render();
            // Reset input so same file can be selected again if needed
            input.value = '';
        } catch(err) { 
            alert("Invalid JSON file"); 
        }
    };
    reader.readAsText(file);
}

function downloadPDF() {
    const card = document.getElementById('main-card');

    // Apply PDF-safe class
    card.classList.add('pdf-export');

    const opt = {
        margin: 0,
        filename: 'wedding-card-single.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 3,
            useCORS: true,
            scrollY: 0
        },
        jsPDF: {
            unit: 'mm',
            format: [210, 297],
            orientation: 'portrait'
        }
    };

    html2pdf()
        .set(opt)
        .from(card)
        .save()
        .then(() => {
            card.classList.remove('pdf-export');
        });
}

function populateInputs() {
    // Helper to sync state to UI on load
    get('in-ganesh').value = state.top.ganesh;
    get('check-shlok').checked = state.top.showShlok;
    get('in-shlok').value = state.top.shlok;
    get('in-quote').value = state.top.quote;
    get('in-host-parents').value = state.top.hosts;
    get('in-groom').value = state.couple.groom;
    get('in-groom-details').value = state.couple.groomDet;
    get('in-bride').value = state.couple.bride;
    get('in-bride-details').value = state.couple.brideDet;
    get('in-bride-addr').value = state.couple.brideAddr;
    get('in-venue-name').value = state.bottom.venueName;
    get('in-venue-addr').value = state.bottom.venueAddr;
    get('in-rsvp').value = state.bottom.rsvp;
    get('in-compliments').value = state.bottom.compliments;
    get('in-kids').value = state.bottom.kids;
}

// ============================================
// INIT
// ============================================
window.onload = () => {
    renderEventsEditor();
    populateInputs();
    render();
    
    // Optional: Hotkeys
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveData();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            loadData();
        }
    });
};



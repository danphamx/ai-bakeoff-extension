// Defaults
const DEFAULT_ROSTER = [
  { name: "ChatGPT", url: "https://chatgpt.com/" },
  { name: "Gemini", url: "https://gemini.google.com/app" },
  { name: "Grok", url: "https://x.com/i/grok" }
];

let currentRoster = [];
let tabIds = []; 

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  // Load Settings & Roster
  const data = await chrome.storage.local.get(['roster', 'disableReminder']);
  currentRoster = data.roster || DEFAULT_ROSTER;
  
  // Set Checkbox
  document.getElementById('chk-disable-reminder').checked = !!data.disableReminder;

  renderGrid();
  renderEditor();
});

// --- RENDERERS ---
function renderGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  currentRoster.forEach((bot, index) => {
    const btn = document.createElement('div');
    btn.className = 'btn-instance';
    const hotkey = index < 9 ? `Ctrl + ${index + 1}` : '#'; 
    btn.innerHTML = `<span>${index + 1}. ${bot.name}</span><kbd>${hotkey}</kbd>`;
    btn.onclick = () => switchToTab(index);
    grid.appendChild(btn);
  });
}

function renderEditor() {
  const container = document.getElementById('roster-editor');
  container.innerHTML = '';
  // Allow up to 9 slots
  for(let i=0; i<9; i++) {
    const bot = currentRoster[i] || { name: '', url: '' };
    const row = document.createElement('div');
    row.className = 'roster-edit-row';
    row.innerHTML = `
      <input type="text" class="roster-input" placeholder="Name" value="${bot.name}" data-idx="${i}" data-field="name" style="flex:0.4">
      <input type="text" class="roster-input" placeholder="https://..." value="${bot.url}" data-idx="${i}" data-field="url">
    `;
    container.appendChild(row);
  }
}

// --- ACTIONS ---

// 1. Launch Tabs
document.getElementById('launch-btn').addEventListener('click', async () => {
  const win = await chrome.windows.getCurrent();
  tabIds = new Array(currentRoster.length).fill(null);

  for (let i = 0; i < currentRoster.length; i++) {
    if(!currentRoster[i].url) continue;
    const tab = await chrome.tabs.create({ 
      url: currentRoster[i].url, 
      active: false, 
      windowId: win.id 
    });
    tabIds[i] = tab.id;
    await chrome.tabs.move(tab.id, { index: i });
  }
  if (tabIds[0]) chrome.tabs.update(tabIds[0], { active: true });
});

// 2. Blast (Paste Only)
document.getElementById('blast-btn').addEventListener('click', () => runBlast(false));

// 3. Sparkle Blast (Paste + Enter)
document.getElementById('blast-enter-btn').addEventListener('click', () => runBlast(true));

async function runBlast(autoEnter) {
  const prompt = document.getElementById('omni-input').value;
  if (!prompt) return;

  const btn = autoEnter ? document.getElementById('blast-enter-btn') : document.getElementById('blast-btn');
  const originalText = btn.innerText;
  btn.innerText = "BOOM!";

  for (const tabId of tabIds) {
    if(!tabId) continue;
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: injectPrompt,
        args: [prompt, autoEnter]
      });
    } catch (e) { console.warn(e); }
  }

  setTimeout(() => { btn.innerText = originalText; }, 1000);
}

// 4. Save Settings
document.getElementById('save-roster-btn').addEventListener('click', async () => {
  const newRoster = [];
  const rows = document.querySelectorAll('.roster-edit-row');
  rows.forEach(row => {
    const name = row.querySelector('[data-field="name"]').value;
    const url = row.querySelector('[data-field="url"]').value;
    if(name && url) newRoster.push({ name, url });
  });

  currentRoster = newRoster;
  await chrome.storage.local.set({ roster: newRoster });
  
  renderGrid();
  renderEditor();
  alert("Roster Saved!");
});

document.getElementById('chk-disable-reminder').addEventListener('change', (e) => {
  chrome.storage.local.set({ disableReminder: e.target.checked });
});

// 5. Switcher
function switchToTab(index) {
  if (tabIds[index]) chrome.tabs.update(tabIds[index], { active: true });
}

// 6. Bookmark Window
document.getElementById('open-window-btn').addEventListener('click', () => {
  chrome.windows.create({ 
    url: "sidepanel.html", 
    type: "popup", 
    width: 350, 
    height: 600 
  });
});

// --- INJECTED CONTENT SCRIPT ---
function injectPrompt(text, autoEnter) {
  const selectors = ["div[contenteditable='true']", "textarea", "#prompt-textarea"];
  let input = null;
  for (const sel of selectors) {
    input = document.querySelector(sel);
    if (input) break;
  }

  if (input) {
    input.focus();
    input.innerHTML = text; 
    input.value = text;     
    input.dispatchEvent(new Event('input', { bubbles: true }));
    
    if(autoEnter) {
      // 1. Try Enter Key
      const enterEvent = new KeyboardEvent('keydown', {
        bubbles: true, cancelable: true, keyCode: 13, key: 'Enter', code: 'Enter'
      });
      input.dispatchEvent(enterEvent);

      // 2. Try Clicking Send Button (Fallback)
      setTimeout(() => {
        const btn = document.querySelector("button[aria-label*='Send'], button[data-testid='send-button']");
        if(btn) btn.click();
      }, 100);
    }
  }
}
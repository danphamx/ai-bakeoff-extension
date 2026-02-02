// 1. Context Menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openBakeoff",
    title: "Open Bakeoff 🧁",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openBakeoff") {
    openPanel(tab.windowId);
  }
});

// 2. Message Listener (The Cupcake Trigger)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'OPEN_PANEL') {
    // If sender.tab is defined, use that window, otherwise use the current window
    const winId = sender.tab ? sender.tab.windowId : undefined;
    openPanel(winId);
  }
});

// Helper to reliably open the panel
async function openPanel(windowId) {
  try {
    // Fallback to current window if ID is missing
    if (!windowId) {
      const win = await chrome.windows.getCurrent();
      windowId = win.id;
    }
    
    await chrome.sidePanel.open({ windowId: windowId });
  } catch (e) {
    console.error("Bakeoff: Could not open panel.", e);
  }
}
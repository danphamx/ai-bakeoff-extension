# My Great AI Bake-Off 🧁

A Chrome extension that lets you control multiple AI chatbots simultaneously. Test prompts across ChatGPT, Gemini, Grok, and more with one click!

![Version](https://img.shields.io/badge/version-2.6-blue)
![Chrome Extension](https://img.shields.io/badge/chrome-extension-brightgreen)

## Features

### 🚀 Launch All AI Tabs at Once
Open all your favorite AI chatbots (ChatGPT, Gemini, Grok, etc.) with a single click.

💡 You can also CUSTOMIZE the tabs that get opened, send 1-many prompts, and TAB between tabs quickly with CTRL+1, CTRL+2, etc.!

<img width="462" height="1315" alt="letthebakeoffbegin" src="https://github.com/user-attachments/assets/6724d066-1f49-42df-8bbe-de90bcd1557f" />

### 💥 Blast Prompts to Multiple AIs
Type your prompt once and send it to all AI chatbots simultaneously:
- **Blast** - Pastes the prompt into all chat boxes
- **✨ Sparkle Blast** - Pastes the prompt AND auto-submits

### ⌨️ Quick Tab Switching
Switch between AI tabs using keyboard shortcuts:
- `Ctrl+1` → First AI (ChatGPT)
- `Ctrl+2` → Second AI (Gemini)
- `Ctrl+3` → Third AI (Grok)
- And so on...

### 🎨 Customizable Roster
Configure which AI chatbots you want to include in your lineup. Add or remove AIs to match your workflow.

### 🧁 Cute Reminder Icon
A floating cupcake appears on AI websites as a quick shortcut to open the control panel (can be disabled in settings).

## Installation

### From Source

1. Clone this repository:
```bash
git clone https://github.com/danphamx/ai-bakeoff-extension.git
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked**

5. Select the `ai-bakeoff-extension` folder

6. The extension is now installed! Use `Ctrl+Shift+B` to open the side panel.

## Usage

### Opening the Side Panel
- **Keyboard**: Press `Ctrl+Shift+B`
- **Cupcake Icon**: Click the floating 🧁 on any AI website
- **Context Menu**: Right-click anywhere and select "Open Bakeoff 🧁"

### Launching AI Tabs
1. Open the side panel
2. Click **"Launch All AI Tabs"**
3. All configured AI chatbots will open in new tabs

### Blasting Prompts
1. Type your prompt in the Omni Bar
2. Click **BLAST** to paste into all AI chat boxes
3. Or click **✨ SEND ALL** to paste and auto-submit

### Customizing Your AI Roster
1. Open the side panel
2. Scroll to **"Edit Roster"** section
3. Add/edit AI names and URLs (up to 9 slots)
4. Click **Save Roster**

## Default AI Roster

- **ChatGPT**: https://chatgpt.com/
- **Gemini**: https://gemini.google.com/app
- **Grok**: https://x.com/i/grok

You can customize this to include Claude, Perplexity, or any other AI chatbot!

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+B` | Open/close side panel |
| `Ctrl+1` to `Ctrl+9` | Switch to corresponding AI tab |

## Technical Details

### Built With
- Chrome Extensions Manifest V3
- Vanilla JavaScript
- Chrome Side Panel API
- Content Script Injection

### Project Structure
```
ai-bakeoff-extension/
├── manifest.json       # Extension configuration
├── background.js       # Service worker for events
├── content.js          # Content script for page interaction
├── sidepanel.html      # Side panel UI
├── sidepanel.js        # Side panel logic
├── cupcake.png         # Extension icon
└── README.md           # This file
```

### Permissions
- `sidePanel` - Display the control panel
- `tabs` - Manage and switch between tabs
- `scripting` - Inject prompts into AI chat interfaces
- `storage` - Save custom AI roster
- `contextMenus` - Add right-click menu option
- `<all_urls>` - Work with any AI website

## Use Cases

- **Developers**: Test code generation across multiple AIs
- **Writers**: Compare creative outputs and writing styles
- **Researchers**: Verify factual consistency across different models
- **Prompt Engineers**: Rapidly iterate and optimize prompts
- **Anyone**: Find the best AI for each specific task

## Future Features

Ideas for upcoming versions:
- [ ] Sync mode - Scroll all AI tabs together for comparison
- [ ] Response capture - Save all AI responses to markdown
- [ ] Prompt library - Store frequently-used prompts
- [ ] Performance metrics - Track response times
- [ ] AI-specific settings - Customize behavior per AI

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - feel free to use and modify as you wish!

## Author

**Dan Pham**
- GitHub: [@danphamx](https://github.com/danphamx)
- Medium: [Digital Gardens Blog]([https://medium.com/@danpham](https://medium.com/create-digital-gardens-with-ai/i-built-my-own-chrome-extension-to-compare-ai-chat-bot-responses-39cfa64d2650?source=user_profile_page---------4-------------2391fc6891a7----------------------))

## Support

If you find this extension helpful, consider:
- ⭐ Starring the repository
- 🐛 Reporting issues
- 💡 Suggesting improvements
- 📢 Sharing with others

---

**Happy AI Baking!** 🧁✨

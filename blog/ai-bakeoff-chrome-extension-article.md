# I Built a Free Chrome Extension to Control Multiple AI Chatbots at Once

## How I Created "My Great AI Bake-Off" to Test Prompts Across ChatGPT, Gemini, and Grok Simultaneously

![A cupcake icon representing the AI Bakeoff extension](banner-image-placeholder)

---

## The Problem: AI Comparison Fatigue

If you're like me, you've probably found yourself in this situation more times than you'd like to admit:

You have a question. A prompt. A problem that needs solving. But which AI should you ask? ChatGPT? Gemini? Grok? Claude?

So you open ChatGPT… copy your prompt… paste it in. Then you open Gemini in another tab… copy your prompt again… paste it in. Then Grok. Then maybe Claude. And then you're switching between tabs, comparing responses, and losing your mind trying to remember which AI said what.

**There had to be a better way.**

---

## The Solution: A Chrome Extension for AI Power Users

I decided to build a Chrome extension that would let me:
- **Launch all my favorite AI chatbots in one click**
- **Blast the same prompt to all of them simultaneously**
- **Switch between AI tabs with keyboard shortcuts** (Ctrl+1, Ctrl+2, etc.)
- **Get a cute reminder** (a cupcake 🧁!) when I'm on an AI site to open the control panel

And thus, **"My Great AI Bake-Off"** was born.

---

## What Does It Do?

The extension adds a **side panel** to Chrome (Ctrl+Shift+B) that gives you superpowers:

### 1. **Launch All AI Tabs at Once**
Instead of manually opening 3-5 different AI websites, click one button and boom — they all open in new tabs, perfectly organized.

### 2. **Blast Prompts to All AIs Simultaneously**
Type your prompt once in the "Omni Bar" and either:
- **Blast** — Pastes the prompt into all AI chat boxes
- **✨ Sparkle Blast** — Pastes the prompt AND hits Enter for you

No more copying and pasting the same thing five times.

### 3. **Quick Tab Switching with Keyboard Shortcuts**
- Ctrl+1 → ChatGPT
- Ctrl+2 → Gemini
- Ctrl+3 → Grok
- And so on…

### 4. **Customizable Roster**
You can configure which AI chatbots you want in your lineup. Default is ChatGPT, Gemini, and Grok, but you can add Claude, Perplexity, or any other AI you use.

### 5. **Cute Reminder Icon**
When you're on an AI website, a spinning cupcake 🧁 appears in the bottom-right corner. Click it to instantly open the control panel. (You can disable this if you find it annoying.)

---

## How I Built It (The Technical Stuff)

For those interested in the technical details, here's what went into building this extension:

### **1. Manifest V3 Structure**
Chrome extensions now use Manifest V3, which requires:
- A `manifest.json` file defining permissions and structure
- A `background.js` service worker for handling events
- Content scripts (`content.js`) that run on web pages
- A side panel interface (`sidepanel.html` and `sidepanel.js`)

### **2. Key Technologies**
- **Chrome Extensions API** — For tabs, scripting, storage, and side panels
- **Content Script Injection** — To paste prompts directly into AI chat interfaces
- **Keyboard Shortcuts** — Using Chrome's `commands` API
- **Local Storage** — To save user's custom AI roster

### **3. The "Blast" Mechanism**
The trickiest part was making the "blast" feature work across different AI websites. Each AI has a slightly different DOM structure:
- ChatGPT uses a `contenteditable` div
- Gemini uses a `textarea`
- Grok has its own unique structure

I wrote a universal injection function that:
1. Finds the active input element (textarea or contenteditable)
2. Focuses on it
3. Pastes the text using `document.execCommand('insertText')`
4. Optionally simulates an Enter key press

```javascript
function injectPrompt(prompt, autoEnter) {
  // Find the input field
  const textarea = document.querySelector('textarea');
  const contentEditable = document.querySelector('[contenteditable="true"]');
  const target = textarea || contentEditable;
  
  if (target) {
    target.focus();
    document.execCommand('insertText', false, prompt);
    
    if (autoEnter) {
      const event = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' });
      target.dispatchEvent(event);
    }
  }
}
```

### **4. The Animated Cupcake Reminder**
The floating cupcake icon has:
- Two spinning rings (one clockwise dotted, one counter-clockwise dashed)
- Pastel colors for aesthetic vibes
- A scale-up and sparkle animation on hover
- Pure CSS animations (no JavaScript needed for the animation)

```css
@keyframes bakeoff-spin { 
  100% { transform: rotate(360deg); } 
}

@keyframes bakeoff-spin-reverse { 
  100% { transform: rotate(-360deg); } 
}
```

### **5. Side Panel Interface**
Chrome's new Side Panel API lets you create a persistent sidebar. I designed mine with:
- A clean, modern UI using CSS Grid
- An "Omni Bar" for typing prompts
- Buttons for each AI with keyboard shortcut indicators
- A settings section for customizing your roster

---

## Why This Extension Changed My Workflow

Before this extension, comparing AI responses was a pain. Now:
- I can **test the same prompt across 3+ AIs in under 10 seconds**
- I can **quickly switch between responses** using keyboard shortcuts
- I **never lose track** of which AI said what
- I can **experiment faster** and iterate on prompts more efficiently

It's especially useful for:
- **Developers** testing code generation across different AIs
- **Writers** comparing creative outputs
- **Researchers** verifying factual consistency
- **Anyone** who wants to find the "best" AI for a specific task

---

## What I Learned

Building this extension taught me:
1. **Manifest V3 is powerful but strict** — Service workers behave differently than background pages
2. **Content script injection is delicate** — Each website has unique DOM structures
3. **CSS animations can do amazing things** — No need for heavy JavaScript libraries
4. **Side panels are underutilized** — They're perfect for tools that need persistent access
5. **Small quality-of-life tools can have huge impact** — This extension saves me hours every week

---

## Future Improvements

Some ideas I'm considering:
- **Sync mode** — Scroll all AI tabs together for side-by-side comparison
- **Response capture** — Automatically save all AI responses to a markdown file
- **Prompt library** — Save frequently-used prompts for quick access
- **AI-specific settings** — Different blast behaviors for different AIs
- **Performance metrics** — Track which AI responds fastest

---

## Try It Yourself

If you want to build your own Chrome extension or customize this one, here's what you need:

1. Create a folder with these files:
   - `manifest.json` (defines the extension)
   - `background.js` (handles events)
   - `content.js` (runs on web pages)
   - `sidepanel.html` and `sidepanel.js` (your UI)

2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select your folder
5. Your extension is now installed!

The beauty of Chrome extensions is that they're just HTML, CSS, and JavaScript. If you can build a website, you can build an extension.

---

## Final Thoughts

In a world where we have too many AI options and not enough time to test them all, tools like this become essential. 

This extension started as a weekend project to scratch my own itch. Now it's an indispensable part of my daily workflow.

If you're tired of manually comparing AI responses, or if you just want to feel like a wizard controlling multiple AIs at once, maybe it's time to build your own version.

**Because why choose one AI when you can have them all compete for your satisfaction?**

Happy baking! 🧁

---

## About the Author

Dan Pham is a developer and AI enthusiast who builds tools to make digital life easier. When not coding, he's probably testing prompts across too many AI chatbots.

Follow me on Medium for more experiments in AI and low-code tooling.

---

**Tags:** #ChromeExtension #AI #ChatGPT #Gemini #Grok #Productivity #JavaScript #WebDevelopment #AITools #Automation

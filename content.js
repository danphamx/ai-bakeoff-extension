(async function() {
  // 1. Check Settings
  const data = await chrome.storage.local.get(['roster', 'disableReminder']);
  if (data.disableReminder) return;

  // 2. Check URL
  const currentUrl = window.location.href;
  const roster = data.roster || [];
  const isRosterSite = roster.some(bot => currentUrl.includes(new URL(bot.url).hostname));
  const isDefault = ["gemini.google.com", "chatgpt.com", "x.com", "grok.com", "claude.ai"].some(h => currentUrl.includes(h));

  if (isRosterSite || isDefault) {
    createCupcake();
  }

  function createCupcake() {
    if (document.getElementById("bakeoff-reminder-icon")) return;

    // --- MAIN CONTAINER ---
    const div = document.createElement('div');
    div.id = "bakeoff-reminder-icon";
    div.innerText = "🧁"; 
    
    // We remove the white background and add the spinning rings via CSS
    div.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      font-size: 36px;
      line-height: 65px; /* Adjust to center the emoji vertically */
      text-align: center;
      cursor: pointer;
      z-index: 2147483647; 
      opacity: 0.8;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      user-select: none;
      /* No background color - let the PNG/Emoji shine */
    `;

    // --- STYLES & ANIMATIONS ---
    if (!document.getElementById('bakeoff-style')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'bakeoff-style';
        styleSheet.innerText = `
          /* Ring 1: Clockwise Pastel Dotted */
          #bakeoff-reminder-icon::before {
            content: "";
            position: absolute;
            top: -5px; left: -5px; right: -5px; bottom: -5px;
            border-radius: 50%;
            border: 3px dotted #FFB7B2; /* Pastel Red */
            border-top-color: #B5EAD7;  /* Pastel Green */
            border-bottom-color: #C7CEEA; /* Pastel Purple */
            animation: bakeoff-spin 8s linear infinite;
            pointer-events: none;
          }

          /* Ring 2: Counter-Clockwise Dashed */
          #bakeoff-reminder-icon::after {
            content: "";
            position: absolute;
            top: -10px; left: -10px; right: -10px; bottom: -10px;
            border-radius: 50%;
            border: 3px dashed #E2F0CB; /* Pastel Lime */
            border-left-color: #FFDAC1; /* Pastel Orange */
            border-right-color: #FF9AA2; /* Pastel Pink */
            animation: bakeoff-spin-reverse 12s linear infinite;
            pointer-events: none;
          }

          /* The Sparkle Burst Element (Hidden by default) */
          #bakeoff-reminder-icon .sparkle-burst {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
            font-size: 24px;
            opacity: 0;
          }

          /* Hover State: Scale Up & Sparkle */
          #bakeoff-reminder-icon:hover {
            transform: scale(1.15) rotate(5deg);
            opacity: 1 !important;
          }

          /* Trigger Sparkle Animation on Hover */
          #bakeoff-reminder-icon:hover .sparkle-burst {
            animation: bakeoff-pop-sparkles 0.8s ease-out forwards;
          }

          @keyframes bakeoff-spin { 100% { transform: rotate(360deg); } }
          @keyframes bakeoff-spin-reverse { 100% { transform: rotate(-360deg); } }
          
          @keyframes bakeoff-pop-sparkles {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
            50% { opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
          }
        `;
        (document.head || document.documentElement).appendChild(styleSheet);
    }

    // --- SPARKLE EMITTER ---
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-burst';
    sparkle.innerText = "✨✨"; // The emoji that explodes
    div.appendChild(sparkle);

    // --- TOOLTIP (Left Side) ---
    const tooltip = document.createElement('div');
    tooltip.innerText = "Open Bakeoff?";
    tooltip.style.cssText = `
      position: absolute;
      top: 50%;
      right: 140%; /* Moved further left to clear the rings */
      transform: translateY(-50%) translateX(10px);
      background: rgba(30, 41, 59, 0.9); /* Slight transparency */
      color: white;
      padding: 6px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      opacity: 0;
      transition: all 0.2s;
      pointer-events: none;
      backdrop-filter: blur(4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      font-family: sans-serif;
    `;
    div.appendChild(tooltip);

    // Interactions
    div.onmouseenter = () => { 
      tooltip.style.opacity = "1";
      tooltip.style.transform = "translateY(-50%) translateX(0)";
    };
    div.onmouseleave = () => { 
      tooltip.style.opacity = "0";
      tooltip.style.transform = "translateY(-50%) translateX(10px)";
    };

    div.onclick = () => {
      chrome.runtime.sendMessage({ action: 'OPEN_PANEL' });
    };

    // Append to HTML to bypass React blocking
    document.documentElement.appendChild(div);
  }
})();
// Load environment variables from .env file FIRST
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

// Now other imports
import express from "express";
import cors from "cors";
import { startBot, getStatus, setOwnerOverride, clearAllOverrides, botEvents, getRecentMessages } from "./whatsapp.js";
import { existsSync } from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

console.log("[DEBUG] Environment loaded");
console.log("[DEBUG] GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
console.log("[DEBUG] GEMINI_API_KEY length:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);

app.use(cors());
app.use(express.json());

// ─── SSE — Real-time updates to dashboard ─────────────────────────────────────
const sseClients = [];

app.get("/api/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  // Send current status immediately
  res.write(`data: ${JSON.stringify({ type: "status", ...getStatus() })}\n\n`);
  sseClients.push(res);

  req.on("close", () => {
    const idx = sseClients.indexOf(res);
    if (idx !== -1) sseClients.splice(idx, 1);
  });
});

function broadcastSSE(event, data) {
  const payload = `data: ${JSON.stringify({ type: event, ...data })}\n\n`;
  sseClients.forEach((client) => {
    try { client.write(payload); } catch { /* client gone */ }
  });
}

botEvents.on("qr", (data) => broadcastSSE("qr", data));
botEvents.on("status", (data) => broadcastSSE("status", data));
botEvents.on("message", (data) => broadcastSSE("message", data));

// ─── REST API ────────────────────────────────────────────────────────────────

app.get("/api/status", (_req, res) => {
  res.json(getStatus());
});

app.post("/api/owner-override", (req, res) => {
  const { enabled } = req.body;
  if (typeof enabled !== "boolean") {
    return res.status(400).json({ error: "enabled must be boolean" });
  }
  setOwnerOverride(enabled);
  res.json({ success: true, ownerOverride: enabled });
});

app.post("/api/clear-overrides", (_req, res) => {
  clearAllOverrides();
  res.json({ success: true, message: "All overrides cleared" });
});

app.get("/api/messages", (_req, res) => {
  res.json(getRecentMessages(50));
});

// ─── Serve React dashboard ───────────────────────────────────────────────────
const clientDist = path.join(__dirname, "../../client/dist");

// Try built client first, else serve a simple inline dashboard
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
} else {
  // Fallback: simple inline HTML dashboard (works without building React)
  app.get("/", (_req, res) => {
    res.send(INLINE_DASHBOARD);
  });
}

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🌐 [Laila] Dashboard running at http://localhost:${PORT}`);
  startBot();
  
  // Ensure owner override is OFF and all overrides are cleared
  setTimeout(() => {
    setOwnerOverride(false);
    clearAllOverrides();
    console.log("🎛️ [Laila] All overrides cleared - bot will reply to all messages");
  }, 3000);
});

// ─── Inline Dashboard (fallback if React not built) ──────────────────────────
const INLINE_DASHBOARD = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Laila Bot Dashboard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #0d1117; color: #e6edf3; min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 2rem 1rem; }
    h1 { font-size: 2rem; background: linear-gradient(135deg, #ff6b9d, #c44dff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; }
    .subtitle { color: #8b949e; margin-bottom: 2rem; }
    .card { background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 1.5rem; width: 100%; max-width: 480px; margin-bottom: 1.25rem; }
    .status-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
    .dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
    .dot.connected { background: #3fb950; box-shadow: 0 0 8px #3fb950; }
    .dot.disconnected { background: #f85149; }
    .dot.qr_ready { background: #d29922; animation: pulse 1s infinite; }
    .dot.connecting { background: #388bfd; animation: pulse 1s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .status-text { font-size: 1.1rem; font-weight: 600; text-transform: capitalize; }
    #qr-container { display: none; text-align: center; margin-top: 1rem; }
    #qr-img { border-radius: 8px; border: 4px solid #30363d; max-width: 260px; }
    .qr-hint { color: #8b949e; font-size: 0.85rem; margin-top: 0.5rem; }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; }
    .toggle { position: relative; width: 52px; height: 28px; }
    .toggle input { display: none; }
    .slider { position: absolute; inset: 0; background: #30363d; border-radius: 14px; cursor: pointer; transition: 0.3s; }
    .slider:before { content: ''; position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 50%; left: 4px; top: 4px; transition: 0.3s; }
    input:checked + .slider { background: linear-gradient(135deg, #ff6b9d, #c44dff); }
    input:checked + .slider:before { transform: translateX(24px); }
    .info { color: #8b949e; font-size: 0.82rem; margin-top: 0.4rem; }
    #messages { max-height: 220px; overflow-y: auto; }
    .msg { padding: 0.4rem 0; border-bottom: 1px solid #21262d; font-size: 0.85rem; }
    .msg .from { color: #79c0ff; font-weight: 600; }
    .msg .time { color: #8b949e; font-size: 0.75rem; float: right; }
    .phone-badge { background: #388bfd22; border: 1px solid #388bfd; color: #79c0ff; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.8rem; }
    h3 { color: #8b949e; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <h1>🤖 Laila Bot</h1>
  <p class="subtitle">WhatsApp AI Assistant Dashboard</p>

  <div class="card">
    <h3>Connection Status</h3>
    <div class="status-row">
      <div class="dot disconnected" id="status-dot"></div>
      <span class="status-text" id="status-text">Connecting...</span>
      <span id="phone-badge"></span>
    </div>
    <div id="qr-container">
      <p class="qr-hint">📱 Open WhatsApp → Linked Devices → Link a Device → Scan</p>
      <img id="qr-img" alt="QR Code" />
      <p class="qr-hint" style="margin-top:0.5rem">QR refreshes automatically if expired</p>
    </div>
  </div>

  <div class="card">
    <h3>Owner Override</h3>
    <div class="toggle-row">
      <div>
        <div style="font-weight:600; margin-bottom:0.25rem">Pause AI Replies Globally</div>
        <div class="info">Turn ON to reply manually without AI interference</div>
      </div>
      <label class="toggle">
        <input type="checkbox" id="override-toggle" onchange="toggleOverride(this.checked)" />
        <span class="slider"></span>
      </label>
    </div>
  </div>

  <div class="card">
    <h3>Recent Messages</h3>
    <div id="messages"><p style="color:#8b949e;font-size:0.85rem">No messages yet...</p></div>
  </div>

  <script>
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const qrContainer = document.getElementById('qr-container');
    const qrImg = document.getElementById('qr-img');
    const phoneBadge = document.getElementById('phone-badge');
    const overrideToggle = document.getElementById('override-toggle');
    const messagesDiv = document.getElementById('messages');
    let messageList = [];

    function applyStatus(data) {
      const s = data.status || 'disconnected';
      statusDot.className = 'dot ' + s;
      statusText.textContent = s.replace('_', ' ');
      if (data.qrCode) {
        qrImg.src = data.qrCode;
        qrContainer.style.display = 'block';
      } else {
        qrContainer.style.display = 'none';
      }
      if (data.phoneNumber) {
        phoneBadge.innerHTML = '<span class="phone-badge">+' + data.phoneNumber + '</span>';
      }
      if (typeof data.ownerOverride === 'boolean') {
        overrideToggle.checked = data.ownerOverride;
      }
    }

    function addMessage(data) {
      messageList.unshift(data);
      if (messageList.length > 30) messageList = messageList.slice(0, 30);
      renderMessages();
    }

    function renderMessages() {
      if (!messageList.length) {
        messagesDiv.innerHTML = '<p style="color:#8b949e;font-size:0.85rem">No messages yet...</p>';
        return;
      }
      messagesDiv.innerHTML = messageList.map(m => \`
        <div class="msg">
          <span class="from">+\${m.from || '?'}</span>
          <span class="time">\${new Date().toLocaleTimeString()}</span>
          <div style="margin-top:2px;color:#cdd9e5">\${escHtml(m.in || '')}</div>
          \${m.out ? '<div style="margin-top:2px;color:#3fb950">↩ ' + escHtml(m.out) + '</div>' : ''}
        </div>
      \`).join('');
    }

    function escHtml(s) {
      return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    async function toggleOverride(enabled) {
      await fetch('/api/owner-override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled })
      });
    }

    // SSE connection
    function connectSSE() {
      const es = new EventSource('/api/events');
      es.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'status' || data.type === 'qr') applyStatus(data);
        if (data.type === 'message') addMessage(data);
      };
      es.onerror = () => {
        setTimeout(connectSSE, 3000);
        es.close();
      };
    }

    // Also load recent messages on start
    fetch('/api/messages').then(r=>r.json()).then(msgs => {
      messageList = msgs.reverse().slice(0,30).map(m => ({ from: m.from, in: m.text }));
      renderMessages();
    }).catch(()=>{});

    connectSSE();
  </script>
</body>
</html>`;
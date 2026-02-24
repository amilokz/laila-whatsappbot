import { useState, useEffect, useRef } from "react";

interface BotStatus {
  status: "disconnected" | "connecting" | "qr_ready" | "connected";
  qrCode: string | null;
  ownerOverride: boolean;
  phoneNumber: string | null;
  uptime: number;
}

interface Message {
  from?: string;
  to?: string;
  text?: string;
  in?: string;
  out?: string;
  direction?: string;
  ts?: string;
}

const STATUS_COLORS: Record<string, string> = {
  connected: "#3fb950",
  qr_ready: "#d29922",
  connecting: "#388bfd",
  disconnected: "#f85149",
};

const STATUS_LABELS: Record<string, string> = {
  connected: "Connected ✅",
  qr_ready: "Scan QR Code 📱",
  connecting: "Connecting...",
  disconnected: "Disconnected",
};

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function App() {
  const [status, setStatus] = useState<BotStatus>({
    status: "connecting",
    qrCode: null,
    ownerOverride: false,
    phoneNumber: null,
    uptime: 0,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [overrideLoading, setOverrideLoading] = useState(false);
  const [uptime, setUptime] = useState(0);
  const uptimeRef = useRef<ReturnType<typeof setInterval>>();

  // Load initial messages
  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((msgs: Message[]) => setMessages(msgs.slice(-30).reverse()))
      .catch(() => {});
  }, []);

  // Load initial status
  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((s: BotStatus) => {
        setStatus(s);
        setUptime(s.uptime);
      })
      .catch(() => {});
  }, []);

  // SSE for real-time updates
  useEffect(() => {
    let es: EventSource;
    function connect() {
      es = new EventSource("/api/events");
      es.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "status" || data.type === "qr") {
          setStatus((prev) => ({ ...prev, ...data }));
          if (data.type === "status" && data.status === "connected") setUptime(0);
        }
        if (data.type === "message") {
          setMessages((prev) => [data, ...prev].slice(0, 30));
        }
      };
      es.onerror = () => {
        es.close();
        setTimeout(connect, 3000);
      };
    }
    connect();
    return () => es?.close();
  }, []);

  // Uptime counter
  useEffect(() => {
    uptimeRef.current = setInterval(() => {
      if (status.status === "connected") setUptime((u) => u + 1);
    }, 1000);
    return () => clearInterval(uptimeRef.current);
  }, [status.status]);

  async function toggleOverride(enabled: boolean) {
    setOverrideLoading(true);
    try {
      await fetch("/api/owner-override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
      setStatus((s) => ({ ...s, ownerOverride: enabled }));
    } finally {
      setOverrideLoading(false);
    }
  }

  const color = STATUS_COLORS[status.status] || "#8b949e";

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ background: "linear-gradient(135deg, #ff6b9d, #c44dff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          🤖 Laila Bot
        </h1>
        <p className="text-[#8b949e] mt-1">WhatsApp AI Assistant</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        {/* Status Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-[#8b949e] mb-3 font-semibold">Connection</p>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                background: color,
                boxShadow: status.status === "connected" ? `0 0 8px ${color}` : "none",
                animation: ["qr_ready", "connecting"].includes(status.status) ? "pulse 1s infinite" : "none",
              }}
            />
            <span className="font-semibold text-lg">{STATUS_LABELS[status.status]}</span>
            {status.phoneNumber && (
              <span className="ml-auto text-xs bg-[#388bfd22] border border-[#388bfd] text-[#79c0ff] px-2 py-0.5 rounded-full">
                +{status.phoneNumber}
              </span>
            )}
          </div>
          {status.status === "connected" && (
            <p className="text-[#8b949e] text-sm">Uptime: {formatUptime(uptime)}</p>
          )}

          {/* QR Code */}
          {status.qrCode && (
            <div className="mt-4 text-center">
              <p className="text-sm text-[#8b949e] mb-3">
                📱 Open WhatsApp → Linked Devices → Link a Device → Scan below
              </p>
              <div className="inline-block p-3 bg-white rounded-xl">
                <img src={status.qrCode} alt="QR Code" className="w-56 h-56" />
              </div>
              <p className="text-xs text-[#8b949e] mt-2">QR auto-refreshes if expired</p>
            </div>
          )}
        </div>

        {/* Owner Override Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-[#8b949e] mb-3 font-semibold">Owner Override</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Pause AI Replies Globally</p>
              <p className="text-sm text-[#8b949e] mt-0.5">
                {status.ownerOverride
                  ? "🔇 AI paused — you're in manual mode"
                  : "🤖 AI is active and auto-replying"}
              </p>
            </div>
            <button
              disabled={overrideLoading}
              onClick={() => toggleOverride(!status.ownerOverride)}
              className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none"
              style={{
                background: status.ownerOverride
                  ? "linear-gradient(135deg, #ff6b9d, #c44dff)"
                  : "#30363d",
              }}
            >
              <div
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                style={{ left: status.ownerOverride ? "calc(100% - 1.5rem)" : "0.25rem" }}
              />
            </button>
          </div>
          <p className="text-xs text-[#8b949e] mt-3">
            💡 Per-chat: if you reply manually, AI pauses for that chat for 30 minutes automatically.
          </p>
        </div>

        {/* Messages Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-[#8b949e] mb-3 font-semibold">
            Recent Messages
          </p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-[#8b949e] text-sm">No messages yet... waiting 👀</p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className="border-b border-[#21262d] pb-2 last:border-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[#79c0ff] text-xs font-semibold">
                      {msg.from ? `+${msg.from}` : msg.to ? `→ +${msg.to}` : "?"}
                    </span>
                    {msg.ts && (
                      <span className="text-[#8b949e] text-xs">
                        {new Date(msg.ts).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  {(msg.text || msg.in) && (
                    <p className="text-sm mt-0.5 text-[#cdd9e5]">{msg.text || msg.in}</p>
                  )}
                  {msg.out && (
                    <p className="text-sm mt-0.5 text-[#3fb950]">↩ {msg.out}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 text-xs text-[#8b949e] space-y-1">
          <p>⚡ <strong>Free tier tip:</strong> Keep this tab open to prevent Replit sleeping</p>
          <p>🔄 Bot auto-reconnects if WhatsApp drops the connection</p>
          <p>💬 AI uses Gemini Flash (free) — set GEMINI_API_KEY in Replit Secrets</p>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}

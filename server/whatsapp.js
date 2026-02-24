// Load environment variables
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { getHumanLikeReply } from './human-like-rules.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

import makeWASocket from "@whiskeysockets/baileys";
import {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import pino from "pino";
import fs from "fs";
import qrcode from "qrcode";
import qrcodeTerminal from "qrcode-terminal";
import { EventEmitter } from "events";

// Config
const SESSION_DIR = path.join(__dirname, "../sessions");
const LOG_FILE = path.join(__dirname, "../data/messages.json");
const DATA_DIR = path.join(__dirname, "../data");

// Ensure directories exist
[SESSION_DIR, DATA_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Bot State
export const botState = {
  status: "disconnected",
  qrCode: null,
  qrText: null,
  ownerOverride: false,
  ownerChats: new Set(),
  startTime: null,
  phoneNumber: null,
};

export const botEvents = new EventEmitter();

// Emoji Reactions
const REACTION_EMOJIS = ["❤️", "😊", "🔥", "😍", "💕", "✨", "🥰", "😘", "💫", "🌹", "😂", "🤗", "😎", "🥳", "😇", "👀", "🤔", "😏", "🥺", "😳"];

function randomEmoji() {
  return REACTION_EMOJIS[Math.floor(Math.random() * REACTION_EMOJIS.length)];
}

// Message Logging
function logMessage(entry) {
  try {
    let logs = [];
    if (fs.existsSync(LOG_FILE)) {
      const raw = fs.readFileSync(LOG_FILE, "utf-8");
      logs = JSON.parse(raw);
    }
    logs.push({ ...entry, ts: new Date().toISOString() });
    if (logs.length > 500) logs = logs.slice(-500);
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  } catch {}
}

// Main Bot
let sock = null;
let reconnectTimer = null;

export async function startBot() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  console.log("\n🤖 [Laila] Starting WhatsApp bot...");
  botState.status = "connecting";
  botEvents.emit("status", { status: "connecting" });

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);
  const { version } = await fetchLatestBaileysVersion();
  const logger = pino({ level: "silent" });

  sock = makeWASocket({
    version,
    logger,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    browser: ["Laila Bot", "Chrome", "1.0.0"],
    connectTimeoutMs: 60_000,
    defaultQueryTimeoutMs: 60_000,
    keepAliveIntervalMs: 15_000,
    retryRequestDelayMs: 250,
    generateHighQualityLinkPreview: false,
    shouldIgnoreJid: (jid) => jid?.includes("broadcast") ?? false,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("\n📱 [Laila] QR Code ready! Scan with WhatsApp:\n");
      qrcodeTerminal.generate(qr, { small: true });

      const qrBase64 = await qrcode.toDataURL(qr);

      botState.status = "qr_ready";
      botState.qrText = qr;
      botState.qrCode = qrBase64;

      botEvents.emit("qr", { qr: qrBase64, status: "qr_ready" });
    }

    if (connection === "open") {
      console.log("✅ [Laila] Connected to WhatsApp!");
      botState.status = "connected";
      botState.qrCode = null;
      botState.qrText = null;
      botState.startTime = Date.now();
      botState.phoneNumber = sock?.user?.id?.split(":")[0] ?? null;
      botEvents.emit("status", { status: "connected", phone: botState.phoneNumber });
    }

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      console.log(`⚡ [Laila] Disconnected. Code: ${statusCode}. Reconnect: ${shouldReconnect}`);
      botState.status = "disconnected";
      botState.startTime = null;
      botEvents.emit("status", { status: "disconnected" });

      if (shouldReconnect) {
        console.log("🔄 [Laila] Reconnecting in 5 seconds...");
        reconnectTimer = setTimeout(startBot, 5000);
      } else {
        console.log("🗑️ [Laila] Logged out. Clearing session...");
        fs.rmSync(SESSION_DIR, { recursive: true, force: true });
        fs.mkdirSync(SESSION_DIR, { recursive: true });
        reconnectTimer = setTimeout(startBot, 3000);
      }
    }
  });

  // MESSAGE HANDLER
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    for (const msg of messages) {
      if (!msg.message) continue;
      
      // CRITICAL: Skip bot's OWN messages
      if (msg.key.fromMe) {
        continue;
      }

      const chatId = msg.key.remoteJid;
      if (chatId.includes("status@broadcast")) continue;

      // Extract sender info
      const senderNum = chatId.split("@")[0];
      const isGroup = chatId.includes('@g.us');
      
      // Extract text
      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        msg.message.imageMessage?.caption ||
        msg.message.videoMessage?.caption ||
        "";

      // Log
      console.log(`💬 [Laila] Message from ${senderNum}: ${text.substring(0, 60)}`);
      logMessage({ from: senderNum, text, chatId, isGroup });

      // Send reaction for ALL messages
      setTimeout(() => sendReaction(msg.key, chatId), 500 + Math.random() * 1500);

      // Skip AI if text empty
      if (!text.trim()) continue;

      // Check override
      if (botState.ownerOverride) {
        console.log(`🔇 Owner override active — skipping`);
        continue;
      }

      // Get HUMAN-LIKE reply
      setTimeout(async () => {
        try {
          const reply = await getHumanLikeReply(text, sock, chatId, msg.pushName);
          await sock.sendMessage(chatId, { text: reply });
          await sock.sendPresenceUpdate("paused", chatId);
          
          console.log(`✉️ [Laila] Replied: ${reply.substring(0, 60)}`);
          logMessage({ direction: "out", to: senderNum, text: reply, isGroup });
          botEvents.emit("message", { from: senderNum, in: text, out: reply, isGroup });
        } catch (err) {
          console.error("[Laila] Send error:", err?.message);
        }
      }, 1500 + Math.random() * 2500); // Random delay 1.5-4 seconds
    }
  });
}

async function sendReaction(msgKey, chatId) {
  if (!sock || botState.status !== "connected") return;
  try {
    await sock.sendMessage(chatId, {
      react: {
        text: randomEmoji(),
        key: msgKey,
      },
    });
  } catch {}
}

export function getStatus() {
  return {
    status: botState.status,
    qrCode: botState.qrCode,
    ownerOverride: botState.ownerOverride,
    phoneNumber: botState.phoneNumber,
    uptime: botState.startTime ? Math.floor((Date.now() - botState.startTime) / 1000) : 0,
  };
}

export function setOwnerOverride(value) {
  botState.ownerOverride = value;
  console.log(`🎛️ Owner override set to: ${value}`);
  botEvents.emit("status", { ownerOverride: value });
}

export function getRecentMessages(limit = 50) {
  try {
    if (!fs.existsSync(LOG_FILE)) return [];
    const raw = fs.readFileSync(LOG_FILE, "utf-8");
    const all = JSON.parse(raw);
    return all.slice(-limit);
  } catch {
    return [];
  }
}

export function clearAllOverrides() {
  botState.ownerOverride = false;
  botState.ownerChats.clear();
  console.log("🎛️ ALL overrides cleared!");
  botEvents.emit("status", { ownerOverride: false });
}
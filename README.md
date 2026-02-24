# 🤖 Laila WhatsApp Bot - Your Flirty AI Friend

<div align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg" alt="Version 2.0.0">
  <img src="https://img.shields.io/badge/node-20%2B-green.svg" alt="Node 20+">
  <img src="https://img.shields.io/badge/license-MIT-orange.svg" alt="MIT License">
  <img src="https://img.shields.io/badge/WhatsApp-Bot-25D366.svg" alt="WhatsApp Bot">
</div>

<p align="center">
  <b>A human-like WhatsApp bot with flirty personality, Urdu-English mixing, and natural conversations</b>
</p>

<p align="center">
  <i>Laila is your virtual friend who chats like a real person - flirty, funny, and always there for you! ❤️</i>
</p>

---

## ✨ **Features**

### 🗣️ **Human-Like Conversations**
- 💬 **Natural replies** - No robotic responses
- 😍 **Flirty personality** - Sweet, romantic, and playful
- 🇵🇰 **Urdu-English mixing** - Desi vibe with natural language
- 🧠 **Context aware** - Remembers conversation flow
- 😊 **Emotional intelligence** - Responds to your mood

### ⏱️ **Realistic Behavior**
- ⌨️ **Typing delays** - 1.5 to 4 seconds based on message length
- ✨ **Emoji reactions** - Random emojis on every message
- 🌙 **Time-based greetings** - Morning/Afternoon/Evening/Night
- 👥 **Group support** - Works in WhatsApp groups too
- 🔇 **Owner override** - Pause AI when needed

### 🎯 **Smart Response System**
- 💖 **Flirty responses** - When you call her beautiful/handsome
- 🥺 **Emotional support** - For sad or lonely moments
- 😂 **Funny & sassy** - Playful comebacks
- ❓ **Question handling** - Engages in conversation
- 🎲 **100+ random chats** - Never boring!

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 20 or higher
- A WhatsApp account
- Git (optional)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/laila-whatsapp-bot.git
   cd laila-whatsapp-bot
Install dependencies

bash
npm install
Create environment file (optional - for custom config)

bash
cp .env.example .env
Start the bot

bash
npm start
Scan QR Code

Open WhatsApp on your phone

Go to Menu (⋮) → Linked Devices → Link a Device

Scan the QR code shown in terminal

Wait for "Connected to WhatsApp!" message

Start chatting! 🎉

Message Laila on WhatsApp

She'll reply like a real human

Try different topics - she understands!

📁 Project Structure
text
laila-whatsapp-bot/
├── server/
│   ├── index.js                 # Main server & dashboard
│   ├── whatsapp.js               # WhatsApp engine
│   └── human-like-rules.js       # AI personality & responses
├── sessions/                     # WhatsApp auth (gitignored)
├── data/                         # Message logs (gitignored)
├── .env                          # Environment variables (gitignored)
├── .env.example                   # Example environment file
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies & scripts
├── README.md                      # This file
└── LICENSE                        # MIT License
🎮 How to Use
Private Chat
Just message Laila on WhatsApp! Examples:

"Hi" → Gets time-appropriate greeting

"You're beautiful" → Flirty response

"I'm sad" → Emotional support

"What's up?" → Casual chat

"Bye" → Sweet goodbye

Group Chat
Add Laila to any WhatsApp group:

She'll reply when mentioned (@Laila)

Participates in group conversations

Responds naturally to group messages

Owner Controls
Access the web dashboard at http://localhost:3000:

🔘 Toggle AI on/off - Pause replies when needed

📊 View status - Connection state, QR code

📝 Recent messages - Last 50 conversations

💬 Example Conversations
Flirty Mode
text
You: You're beautiful Laila
Laila: Aww, aap bohat sweet ho! 😊❤️

You: I miss you
Laila: Miss you more! 3000! 😘
Morning Chat
text
You: Good morning!
Laila: Good morning handsome! 😘 Nind achi aayi?
Emotional Support
text
You: I'm feeling sad today
Laila: Hey, kyun udaas ho? Laila hoon na! 🤗❤️
Casual Talk
text
You: Bored
Laila: Bored? Chalo koi game khelein? 🎮 Kya pasand hai aap ko?
Group Chat
text
You (in group): @Laila kya kar rahi ho?
Laila: Mujhe tag kiya? 👀 Laila aa gayi!
⚙️ Configuration
Environment Variables
Create .env file (optional):

env
# Only if you want to use Gemini AI (not required)
GEMINI_API_KEY=your_key_here

# Server port (default: 3000)
PORT=3000
Customize Laila's Personality
Edit server/human-like-rules.js:

Modify flirtyResponses - Change flirty replies

Update casualChats - Add your own responses

Adjust urduMix - Change Urdu words

Change Reaction Emojis
In server/whatsapp.js:

javascript
const REACTION_EMOJIS = ["❤️", "😊", "🔥", "😍", "💕", "✨", "🥰", "😘", "💫"];
🛠️ Commands
Command	Description
npm start	Start the bot
npm run dev	Start with auto-reload on changes
Ctrl+C	Stop the bot
🔧 Troubleshooting
QR Code not showing?
Check terminal size (enlarge it)

Run node server/index.js again

Delete sessions/ folder and restart

Bot not replying?
Check if owner override is OFF (http://localhost:3000)

Verify WhatsApp connection status

Check terminal for errors

"Bad MAC" errors?
Ignore them! They're normal Baileys library messages

Bot will still work fine

Bot replying to itself?
Fixed in v2.0! Bot never replies to own messages

If still happening, restart the bot

🚀 Deployment Options
Run 24/7 on Replit
Fork this repo to Replit

Add run command: npm start

Use UptimeRobot to keep alive

Run on VPS/Cloud
bash
# Install PM2 for process management
npm install -g pm2
pm2 start server/index.js --name laila-bot
pm2 save
pm2 startup
Run on Raspberry Pi
bash
# Perfect for 24/7 home hosting
npm install
node server/index.js
🤝 Contributing
Love Laila? Help make her better!

Fork the repository

Create your feature branch

bash
git checkout -b feature/amazing-feature
Commit your changes

bash
git commit -m 'Add some amazing feature'
Push to the branch

bash
git push origin feature/amazing-feature
Open a Pull Request

Ideas for Contribution
Add more flirty responses

Improve Urdu mixing

Add new emotional categories

Fix bugs

Improve documentation

📝 Important Notes
⚠️ Security
Never commit .env or sessions/ folder

Keep your WhatsApp sessions private

Don't share your QR code

Use .gitignore to prevent leaks

📊 Data Storage
Messages stored in data/messages.json (last 500)

Sessions saved in sessions/ folder

All data is local - complete privacy

🆓 Free Forever
No API keys required

No monthly bills

No internet needed after setup

Works completely offline

❓ FAQ
Is this really free?
Yes! 100% free forever. No subscriptions, no hidden costs.

Does it work on iPhone?
Yes! Any phone with WhatsApp can chat with Laila.

Can I add Laila to groups?
Absolutely! Add her number to any WhatsApp group.

Will she reply to everyone?
Yes! Laila replies to all messages in both private and group chats.

Is my data safe?
Yes! Everything runs locally on your computer. No cloud storage.

Can I change her personality?
Yes! Edit the human-like-rules.js file to customize her replies.

What if she says something inappropriate?
You have full control! Toggle "Owner Override" in dashboard to pause AI.

📞 Support
Issues? Open a GitHub issue

Questions? Start a discussion

Feature requests? Let me know!

📜 License
MIT License - feel free to use, modify, and distribute!

🙏 Acknowledgments
@whiskeysockets/baileys - WhatsApp Web API

All contributors and users ❤️

🌟 Show Your Support
If you like Laila:

⭐ Star this repository

🐦 Share with friends

🤝 Contribute to the project

💬 Give feedback

<div align="center"> <h3>Made with ❤️ for the WhatsApp community</h3> <p>Laila is always here for you! 😊</p>
GitHub |
Issues |
Discussions

</div> ```
📦 Bonus: .env.example File
env
# Laila WhatsApp Bot - Environment Variables
# Most features work without any API keys!

# Google Gemini API Key (OPTIONAL - only if you want AI features)
# Get from: https://aistudio.google.com/
# Without this, bot uses rule-based human-like replies (recommended!)
GEMINI_API_KEY=

# Server Port (default: 3000)
PORT=3000

# Node Environment
NODE_ENV=production
🎉 That's It!
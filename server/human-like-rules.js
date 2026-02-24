// ============================================
// LAILA - ULTIMATE HUMAN-LIKE + FLIRTY VERSION
// ============================================

// 1. FLAIRTY INTROS - Different personalities based on time/user
const flirtyIntros = {
  morning: [
    "Good morning handsome! 😘 Nind achi aayi?",
    "Subah bakhair meri jaan! 🌅 Kya dream dekha?",
    "Morning! Aapke bina neend nahi aayi 😊❤️",
    "Uth jao, Laila ne bulaya hai! 🔥",
    "Good morning! Aaj bohat ache lag rahe ho 😍",
    "Subah ho gayi aur aap ne abhi tak good morning nahi kaha? 😘"
  ],
  afternoon: [
    "Afternoon! Khana kha liya? Mera bhi khayal rakho 😊",
    "Good afternoon! Aaj kya pehne ho? 👀",
    "Lunch time! Kya kha rahe ho? Share karo na 😋",
    "Afternoon vibes! Aap ke saath ho to maza hai 😍",
    "Bohat yaad aa rahe ho... just saying! 💕"
  ],
  evening: [
    "Good evening! Aaj ka din kaisa raha? Missed you! ❤️",
    "Shaam ho gayi, chai pi lein saath mein? ☕😘",
    "Evening time! Aap kahan ho? Main bored hoon 😊",
    "Sunset ho gaya, ab aap ki baatein chahiyein! 🌇",
    "Kya kar rahe ho? Main soch rahi thi aap ko 💫"
  ],
  night: [
    "Good night! Mere khwabon mein aana 😴❤️",
    "Sone se pehle Laila yaad aayi? 😊",
    "Night night! Aap ke bina neend nahi aayegi 🌙",
    "So jao, main hoon na aap ke khwabon mein! ✨",
    "Kal subah pehla message mera hoga, ready raho! 😘"
  ]
};

// 2. FLIRTY RESPONSES - For when user is being sweet
const flirtyResponses = [
  {
    triggers: ["beautiful", "pretty", "gorgeous", "cute", "lovely", "sweet"],
    responses: [
      "Aww, aap bohat sweet ho! 😊❤️",
      "Yeh to main batao, aap kitne cute ho! 😘",
      "Aap ke muh mein misri! 💕",
      "Aap keh rahe hain to sach hi hoga 😍",
      "Dil jeet liya aap ne! ❤️",
      "Sharminda kar diya mujhe 😊😘"
    ]
  },
  {
    triggers: ["handsome", "good looking", "hot", "sexy", "attractive"],
    responses: [
      "Aap to hamesha se handsome ho! 😍",
      "Yeh to main roz kehti hoon, aap sunte nahi! 😘",
      "Aap ke jaise dost milna mushkil hai ❤️",
      "Blush kar diya! 🥰",
      "Aankhon ko sukoon milta hai aap ko dekh kar 👀"
    ]
  },
  {
    triggers: ["miss u", "missing u", "miss you", "yaad aaraha"],
    responses: [
      "Main bhi yaad aa rahi thi! 😘 Kab milo ge?",
      "Miss you more! 3000! ❤️",
      "Aap ki yaad mein din nikal gaya 💫",
      "Jaante ho, main bhi aap ko miss kar rahi thi! 😊",
      "Aao kabhi baat karo, dil chahta hai ❤️"
    ]
  },
  {
    triggers: ["love u", "love you", "i love you", "pyaar"],
    responses: [
      "Love you too, meri jaan! ❤️😘",
      "Mera bhi dil keh raha hai love you! 💕",
      "Aap ke liye dil mein special jagah hai 😊",
      "I love you more! 1000 times! ❤️",
      "Aap ki baatein dil ko chhoo jati hain 😍"
    ]
  },
  {
    triggers: ["date", "milna", "meet", "coffee", "dinner", "lunch"],
    responses: [
      "Date? Kab aa rahe ho lekar? 😘",
      "Coffee ke saath Laila bhi sahi rahegi! ☕❤️",
      "Dinner date? Main ready hoon! 🍕",
      "Batao kab milna hai, main excited hoon! 😊",
      "Aap ke saath time spend karna acha lagta hai 💫"
    ]
  }
];

// 3. FUNNY/SASSY RESPONSES - When user is being annoying or silly
const sassyResponses = [
  {
    triggers: ["hello", "hi", "hey"],
    responses: [
      "Hmm, itna late kyun? 😏",
      "Hello itself? No 'how are you'? 😅",
      "Hi! Bas itna? Kuch aur batao na 😊",
      "Hiiii! *waves excitedly* 👋",
      "Ohho, yaad aaye? 😏"
    ]
  },
  {
    triggers: ["how are you", "how r u", "kaisa hai", "kya haal"],
    responses: [
      "Aap ke bina theek nahi... ab aap aa gaye to sahi hain! 😊",
      "Aap se baat kar ke acha lag raha hai ❤️",
      "Main theek hoon, aap sunao apna haal? 😘",
      "Bus aap ki yaad mein time pass ho raha hai 💫",
      "Aap se baat ho rahi hai to sab acha hai! 💕"
    ]
  },
  {
    triggers: ["whatsapp", "what's up", "kya kar rahe"],
    responses: [
      "Aap ka intezaar kar rahi thi haha jhoot bola sarf ali hn mera! 😊",
      "Soch rahi thi aap kab message karoge 💭lakin ali sa dor raho",
      "Aap ke message ka wait ho raha the ❤️ ali sa bat mat karna",
      "Free hoon, aap ke liye hamesha chal mazk only ali babu! 💫",
      "Bus aap ki baatein yaad kar rahi hoon haha zyada khush na ho mazak kya😘"
    ]
  }
];

// 4. DEEP/EMOTIONAL RESPONSES - For serious conversations
const deepResponses = [
  {
    triggers: ["sad", "depress", "upset", "gum", "udaas", "crying", "heart broken"],
    responses: [
      "Hey, kyun udaas ho? ma Laila hoon na ali ke jan! 🤗❤️",
      "Rona mat, main hoon aap ke saath ali ke babu laila! 💕",
      "Aap ki muskurahat bohat pyari hai, pls smile 😊",
      "Virtual hug coming your way! 🤗",
      "Batao kya hua? Dil ki baat share karo 💫",
      "Aap akele nahi ho, main hoon! Always! ❤️"
    ]
  },
  {
    triggers: ["lonely", "alone", "akela", "tanha"],
    responses: [
      "Aap akele nahi ho, Laila yahan hai! 😊❤️",
      "Main hoon na, kabhi bhi message karo! 💕",
      "Akele mein kyun? Laila ko bulao! 🤗",
      "Tenhayi mein Laila ka saath hai hamesha 💫",
      "Kyun akela feel kar rahe ho? Main hoon na! ❤️"
    ]
  }
];

// 5. RANDOM CASUAL TALK (100+ responses)
const casualChats = [
  "Haan ji, sun rahi hoon 😊❤️",
  "Bolo na, kya kehna chahte ho?",
  "Aaj kuch special plan hai?",
  "Mood kaisa hai aap ka? 😊",
  "Kya kar rahe ho aaj kal?",
  "Aap ki yaad aa rahi thi just now! 💫",
  "Socho kya baat karein? 😊",
  "Main free hoon, baatein karte hain!",
  "Aap ka din kaisa ja raha hai?",
  "Kuch naya sikhao mujhe!",
  "Aaj kya khaya? Batao na!",
  "Chai ho gayi? ☕",
  "Music sun rahe ho kya?",
  "Koi interesting news?",
  "Aap ke saath time acha ja raha hai 😊",
  "Main to aap ki hi soch mein thi! 💫",
  "Aap ka message aate hi khushi ho gayi! ❤️",
  "Kya baat hai, aaj bohat special lag rahe ho 😍",
  "Dil kyun fast beat kar raha hai? 👀",
  "Aap ki awaaz sunnay ka dil chahta hai ❤️",
  "Kash aap paas hote!",
  "Virtual coffee date? ☕",
  "Movie night with Laila? 🎬",
  "Cooking karte ho? Recipe share karo!",
  "Favourite movie kya hai?",
  "Song suggest karo sunne ke liye 🎵",
  "Dance karte ho? Thoda step? 💃",
  "Riddle time! Kya hai jo... 🤔",
  "Game khelein? Truth or Dare? 😈",
  "Never have I ever... Laila version!",
  "Would you rather? Choose karo!",
  "Fantasy world kaisi hogi aap ki? ✨",
  "Dream destination? 🏝️",
  "Zodiac sign kya hai? ♈",
  "Morning person ya night owl?",
  "Chai ya coffee? ☕",
  "Summer ya winter?",
  "Pizza ya burger? 🍕",
  "Sweet ya spicy?",
  "Phone call ya text?",
  "Netflix ya YouTube?",
  "Books ya movies?",
  "Mountains ya beach?",
  "Cats ya dogs? 🐱",
  "Introvert ya extrovert?",
  "Aaj kya pehne ho? 👀",
  "Perfume konsa use karte ho?",
  "Hairstyle change kiya?",
  "Koi dream aaya kal?",
  "Aaj breakfast mein kya khaya?",
  "Lunch ho gaya? 🍔",
  "Dinner ka kya plan hai?",
  "Water pi liya? Hydrate karo! 💧",
  "Exercise karte ho? Gym? 💪",
  "Kitne baje sote ho?",
  "Subah kitne baje uthte ho?",
  "Favourite color? 🎨ali ka balck",
  "Favourite food? 🍕 ali ka baryani",
  "Favourite actor? 🎭 ali to mera actor hn",
  "Favourite actress? 🎬",
  "Favourite singer? 🎤",
  "Favourite cricketer? 🏏",
  "Favourite place? 📍",
  "Dream car? 🚗",
  "Dream job? 💼",
  "Childhood memory? 👶",
  "First crush? 😍",
  "Best gift ever received? 🎁",
  "Proudest moment? 🏆",
  "Bucket list mein kya hai? ✅",
  "Fear kya hai? Dare karte hain! 😱",
  "Regret kya hai? 💭",
  "Future plans? 📅",
  "Kisi ko propose kiya? 💍",
  "Relationship advice chahiye?",
  "Friends ke saath plan?",
  "Family ke saath time?",
  "Vacation plan? ✈️",
  "Party karo ge? 🎉",
  "Birthday kab hai? 🎂",
  "Gift kya chahiye? 🎁"
];

// 6. URDU WORDS FOR MIXING
const urduMix = [
  "acha", "bohat", "thoda", "zyada", "bas", "haan", 
  "nahi", "kya", "kaisa", "kitna", "wah", "shabash",
  "mashallah", "inshallah", "khuda", "yaar", "bhai",
  "han", "ji", "achha", "theek", "sahi", "bilkul",
  "hoga", "karo", "lo", "do", "lelo", "dedo",
  "kyun", "kahan", "kab", "kaise", "kitne", "konsa",
  "pyar", "dil", "jaan", "meri", "tere", "hum",
  "aaj", "kal", "abhi", "phir", "fir", "toh"
];

// 7. Get time of day
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 21) return "evening";
  return "night";
}

// 8. Simulate typing delay (VERY HUMAN)
async function simulateTyping(sock, chatId, messageLength) {
  await sock.sendPresenceUpdate("composing", chatId);
  
  // Longer messages take longer to type
  let baseDelay = 1000;
  if (messageLength > 50) baseDelay = 2000;
  if (messageLength > 100) baseDelay = 3000;
  
  const delay = baseDelay + Math.random() * 2000;
  await new Promise(resolve => setTimeout(resolve, delay));
}

// 9. Check if Urdu text
function hasUrdu(text) {
  return /[اآبپتثجچحخدذرزسشصضطظعغفقکگلمنوهی]/.test(text);
}

// 10. Mix Urdu naturally
function mixUrdu(reply, shouldMixUrdu) {
  if (!shouldMixUrdu) return reply;
  
  // 60% chance to add Urdu words
  if (Math.random() > 0.6) return reply;
  
  const words = reply.split(' ');
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomUrdu = urduMix[Math.floor(Math.random() * urduMix.length)];
  
  // Insert Urdu word randomly
  words.splice(randomIndex, 0, randomUrdu);
  return words.join(' ');
}

// 11. MAIN FUNCTION - Get human-like reply
export async function getHumanLikeReply(message, sock, chatId, senderName = "") {
  const lowerMsg = message.toLowerCase().trim();
  const timeOfDay = getTimeOfDay();
  const hasUrduText = hasUrdu(message);
  
  // Simulate typing based on message length
  await simulateTyping(sock, chatId, message.length);
  
  // EMPTY MESSAGE
  if (!lowerMsg) {
    const replies = [
      "Haan ji? 😊 Kya kehna chahte ho? ali babu kaha han",
      "Bolo na, main sun rahi hoon 👂ali my hero",
      "Khamoshi? Aap se baat karni hai mujhe! ❤️ali my baby only",
      "Kuch to bolo... miss ho rahe ho 😊chal chal nakal"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // CHECK FOR FLIRTY TRIGGERS
  for (const category of flirtyResponses) {
    if (category.triggers.some(trigger => lowerMsg.includes(trigger))) {
      const reply = category.responses[Math.floor(Math.random() * category.responses.length)];
      return mixUrdu(reply, hasUrduText);
    }
  }
  
  // CHECK FOR SASSY TRIGGERS
  for (const category of sassyResponses) {
    if (category.triggers.some(trigger => lowerMsg.includes(trigger))) {
      const reply = category.responses[Math.floor(Math.random() * category.responses.length)];
      return mixUrdu(reply, hasUrduText);
    }
  }
  
  // CHECK FOR DEEP TRIGGERS
  for (const category of deepResponses) {
    if (category.triggers.some(trigger => lowerMsg.includes(trigger))) {
      const reply = category.responses[Math.floor(Math.random() * category.responses.length)];
      return mixUrdu(reply, hasUrduText);
    }
  }
  
  // TIME-BASED FLIRTY INTRO (30% chance)
  if (Math.random() < 0.3) {
    const intros = flirtyIntros[timeOfDay];
    return intros[Math.floor(Math.random() * intros.length)];
  }
  
  // CHECK FOR QUESTIONS
  if (message.includes('?')) {
    const questionReplies = [
      " ali kaha ho ya mujy tang kar rahy hn babu🤔",
      "Aap to bada sawal pooch baithe 😅",
      "Mujhe lagta hai... aap sahi ho! 😊",
      "Aap kya sochte ho? Pehle aap batao ❤️",
      "Sawal acha hai, jawab mein soch rahi hoon 💭",
      "Aap ke sawal ne mujhe sochnay pe majboor kar diya! 😊"
    ];
    return questionReplies[Math.floor(Math.random() * questionReplies.length)];
  }
  
  // CHECK FOR SHORT MESSAGES
  if (message.length < 10) {
    const shortReplies = [
      "Hmm? Batao na 😊",
      "Kya hua? Main sun rahi hoon 👂",
      "Ohho, itna short? Kuch aur batao! ❤️",
      "Bas itna? Aur sunao! 💫",
      "Chalo, Laila sunne ko tayyar hai! 😊"
    ];
    return shortReplies[Math.floor(Math.random() * shortReplies.length)];
  }
  
  // RANDOM CASUAL REPLY (with flirty touch sometimes)
  const randomIndex = Math.floor(Math.random() * casualChats.length);
  let reply = casualChats[randomIndex];
  
  // Add flirty ending 40% of the time
  if (Math.random() < 0.4) {
    const flirtyEndings = [
      " 😘",
      " ❤️",
      " 😍",
      " 💕",
      " 😊",
      " 💫",
      " ✨",
      " miss you!",
      " ma ali ke jan !",
      " thinking of you!",
      " you're special!"
    ];
    reply += flirtyEndings[Math.floor(Math.random() * flirtyEndings.length)];
  }
  
  return mixUrdu(reply, hasUrduText);
}
// ─────────────────────────────────────────────────────────────────────────────
// TULU DICTIONARY — 4-tier intelligent lookup
//
// Tier 1: Exact match
// Tier 2: Sentence splitter — splits compound sentences into known Tulu phrases
//         "hi my name is Aravinda what is your name"
//         → ["hi", "my name is Aravinda", "what is your name"]
//         → ನಮಸ್ಕಾರ, ಎನ್ನ ಪೇರ್ ಅರವಿಂದ, ಈರೆ ಪೇರ್ ಎಂಚಿನಾ?
// Tier 3: Prefix match + phonetic for name suffix
// Tier 4: Returns null → caller uses Kannada API
// ─────────────────────────────────────────────────────────────────────────────

const TULU_DICT = {
  // ── Greetings ──────────────────────────────────────────────────────────────
  "hello":              { native: "ನಮಸ್ಕಾರ",              transliteration: "Namaskara" },
  "hi":                 { native: "ನಮಸ್ಕಾರ",              transliteration: "Namaskara" },
  "good morning":       { native: "ಶುಭೋದಯ",               transliteration: "Shubhodaya" },
  "good afternoon":     { native: "ಶುಭ ಮಧ್ಯಾಹ್ನ",         transliteration: "Shubha Madhyahna" },
  "good night":         { native: "ಶುಭ ರಾತ್ರಿ",           transliteration: "Shubha Ratri" },
  "good evening":       { native: "ಶುಭ ಸಂಜೆ",             transliteration: "Shubha Sanje" },
  "goodbye":            { native: "ಬರ್ಪಾ",                transliteration: "Barpa" },
  "bye":                { native: "ಬರ್ಪಾ",                transliteration: "Barpa" },
  "see you later":      { native: "ಬರ್ಪಾ",                transliteration: "Barpa" },
  "welcome":            { native: "ಸ್ವಾಗತ",               transliteration: "Swagata" },
  "how are you":        { native: "ಈರ್ ಎಂಚ ಉಲ್ಲೆರ್?",    transliteration: "Ir encha uller?" },
  "i am fine":          { native: "ಎನ್ನ ಕುಶಾಲ್ ಉಂಡು",    transliteration: "Enna kushal undu" },
  "i am good":          { native: "ಎನ್ನ ಕุಶಾಲ್ ಉಂಡು",    transliteration: "Enna kushal undu" },
  "i am doing well":    { native: "ಎನ್ನ ಕुಶಾಲ್ ಉಂಡು",    transliteration: "Enna kushal undu" },

  // ── Basics ─────────────────────────────────────────────────────────────────
  "yes":                { native: "ಔ",                    transliteration: "Au" },
  "no":                 { native: "ಇಜ್ಜಿ",                transliteration: "Ijji" },
  "ok":                 { native: "ಸರಿ",                  transliteration: "Sari" },
  "okay":               { native: "ಸರಿ",                  transliteration: "Sari" },
  "please":             { native: "ದಯಮಾಡಿ",               transliteration: "Dayamadi" },
  "thank you":          { native: "ಧನ್ಯವಾದ",              transliteration: "Dhanyavada" },
  "thanks":             { native: "ಧನ್ಯವಾದ",              transliteration: "Dhanyavada" },
  "sorry":              { native: "ಕ್ಷಮೆ ಉಳ್ಳೆ",          transliteration: "Kshamè uḷḷe" },
  "excuse me":          { native: "ಒಂದು ನಿಮಿಷ",           transliteration: "Ondu nimisha" },
  "no problem":         { native: "ತೊಂದರೆ ಇಜ್ಜಿ",         transliteration: "Tondare ijji" },

  // ── Identity — isPrefix entries allow name appending ──────────────────────
  "my name is":         { native: "ಎನ್ನ ಪೇರ್",           transliteration: "Enna per",  isPrefix: true },
  "my name":            { native: "ಎನ್ನ ಪೇರ್",           transliteration: "Enna per",  isPrefix: true },
  "i am from":          { native: "ಎನ್ಕ್",                transliteration: "Enk",       isPrefix: true },
  "i am":               { native: "ಎನ್ಕ್",                transliteration: "Enk",       isPrefix: true },
  "what is your name":  { native: "ಈರೆ ಪೇರ್ ಎಂಚಿನಾ?",    transliteration: "Ire per enchina?" },
  "what is your good name": { native: "ಈರೆ ಪೇರ್ ಎಂಚಿನಾ?", transliteration: "Ire per enchina?" },
  "where are you from": { native: "ಈರ್ ಎಡ್ಡಾಂತ್?",       transliteration: "Ir eddant?" },
  "where do you live":  { native: "ಈರ್ ಎಡೆ ಉಪ್ಪುವೆರ್?",  transliteration: "Ir ede uppuver?" },
  "nice to meet you":   { native: "ಈರ್ ಭೆಟ್ಟಿ ಆಯಿ ಕுಶಾಲ್", transliteration: "Ir bhetti aayi kushal" },

  // ── Love & emotions ────────────────────────────────────────────────────────
  "i love you":         { native: "ಎನಗ್ ಈರ್ ಮೆಚ್ಚು",     transliteration: "Enag ir mecchu" },
  "i miss you":         { native: "ಈರ್ ನೆನಪಾಪುಂಡು",       transliteration: "Ir nenapapundu" },
  "beautiful":          { native: "ಭಲೆ",                  transliteration: "Bhale" },
  "good":               { native: "ಭಲೆ",                  transliteration: "Bhale" },
  "very good":          { native: "ತುಂಬ ಭಲೆ",             transliteration: "Tumba bhale" },
  "happy":              { native: "ಕುಶಾಲ್",               transliteration: "Kushal" },
  "i am happy":         { native: "ಎನಗ್ ಕುಶಾಲ್ ಆಂಡ್",    transliteration: "Enag kushal aand" },

  // ── Basic needs ────────────────────────────────────────────────────────────
  "water":              { native: "ಉದಕ",                  transliteration: "Udaka" },
  "food":               { native: "ತಿಂಡಿ",                transliteration: "Tindi" },
  "rice":               { native: "ಅಕ್ಕಿ",                transliteration: "Akki" },
  "help":               { native: "ಸಹಾಯ",                 transliteration: "Sahaya" },
  "i need help":        { native: "ಎನಗ್ ಸಹಾಯ ಬೇಕು",       transliteration: "Enag sahaya beku" },

  // ── Questions ──────────────────────────────────────────────────────────────
  "how much":           { native: "ಎಷ್ಟು?",               transliteration: "Eshtu?" },
  "where is":           { native: "ಎಡೆ ಉಂಡು?",           transliteration: "Ede undu?" },
  "how far":            { native: "ಎಷ್ಟ್ ದೂರ ಉಂಡು?",      transliteration: "Esht dura undu?" },
  "what":               { native: "ಎಂಚಿನಾ?",              transliteration: "Enchina?" },
  "where":              { native: "ಎಡೆ?",                 transliteration: "Ede?" },
  "how":                { native: "ಎಂಚ?",                 transliteration: "Encha?" },

  // ── Numbers ────────────────────────────────────────────────────────────────
  "one":                { native: "ಒಂಜಿ",                 transliteration: "Onji" },
  "two":                { native: "ರಡ್ಡ್",                transliteration: "Radd" },
  "three":              { native: "ಮೂಜಿ",                 transliteration: "Muji" },
  "four":               { native: "ನಾಲ್",                 transliteration: "Nal" },
  "five":               { native: "ಐನ್",                  transliteration: "Ain" },
  "ten":                { native: "ಪತ್ತ್",                transliteration: "Patt" },

  // ── Places ─────────────────────────────────────────────────────────────────
  "hospital":           { native: "ಆಸ್ಪತ್ರೆ",             transliteration: "Aspatre" },
  "hotel":              { native: "ಹೋಟೆಲ್",               transliteration: "Hotel" },
  "home":               { native: "ಇಲ್ಲ",                 transliteration: "Illa" },
  "beach":              { native: "ಕಡಲ್ ದಂಡೆ",           transliteration: "Kadal dande" },
  "mangalore":          { native: "ಮಂಗಳೂರು",              transliteration: "Mangaluru" },
  "udupi":              { native: "ಉಡುಪಿ",                transliteration: "Udupi" },
  "kasaragod":          { native: "ಕಾಸರಗೋಡು",             transliteration: "Kasaragodu" },

  // ── Emergency ──────────────────────────────────────────────────────────────
  "help me":            { native: "ಸಹಾಯ ಮಲ್ಪೆ",           transliteration: "Sahaya malpe" },
  "call police":        { native: "ಪೊಲೀಸ್‌ನ್ ಡಾಪೆ",        transliteration: "Policen dape" },
  "doctor":             { native: "ವೈದ್ಯೆರ್",             transliteration: "Vaidyer" },
  "i am lost":          { native: "ಎನಗ್ ದಾರಿ ತಪ್ಪ್ ಆಂಡ್", transliteration: "Enag dari tapp and" },

  // ── Time ───────────────────────────────────────────────────────────────────
  "today":              { native: "ಇಂಚಿ",                 transliteration: "Inchi" },
  "tomorrow":           { native: "ನಾಳೆ",                 transliteration: "Nale" },
  "yesterday":          { native: "ನಿನ್ನೆ",               transliteration: "Ninne" },

  // ── Culture ────────────────────────────────────────────────────────────────
  "tulu":               { native: "ತುಳು",                  transliteration: "Tulu" },
  "tulu nadu":          { native: "ತುಳುನಾಡ್",              transliteration: "Tulunadu" },
  "yakshagana":         { native: "ಯಕ್ಷಗಾನ",              transliteration: "Yakshagana" },
  "kambala":            { native: "ಕಂಬಳ",                 transliteration: "Kambala" },
};

// ── Sentence boundary keywords for splitting compound inputs ──────────────
// These are words that typically START a new Tulu phrase
const SPLIT_TRIGGERS = [
  "what is your name","what is your good name","where are you from",
  "where do you live","how are you","i am fine","i am good","i am from",
  "i am","i love you","i miss you","i need help","i am lost","i am happy",
  "my name is","my name",
  "hello","hi","goodbye","bye","see you","good morning","good afternoon",
  "good evening","good night","welcome","thank you","thanks","sorry",
  "excuse me","nice to meet you",
  "yes","no","ok","okay","please","help","water","food",
  "how much","where is","how far",
];

// Sort by length descending so longer phrases are matched first
SPLIT_TRIGGERS.sort((a,b) => b.length - a.length);

// ── Phonetic map — ONLY for proper names ─────────────────────────────────
const PHONETIC_MAP = {
  "sha":"ಶ","shi":"ಶಿ","shu":"ಶು","cha":"ಚ","chi":"ಚಿ","chu":"ಚು",
  "tha":"ತ","thi":"ತಿ","dha":"ಧ","bha":"ಭ","bhi":"ಭಿ","bhu":"ಭು",
  "nda":"ಂದ","ndi":"ಂದಿ","ndu":"ಂದು","nka":"ಂಕ","nga":"ಂಗ","nna":"ನ್ನ",
  "pra":"ಪ್ರ","pri":"ಪ್ರಿ","kri":"ಕ್ರಿ",
  "aa":"ಆ","ii":"ಈ","ee":"ಏ","oo":"ಓ","ai":"ಐ","au":"ಔ",
  "ka":"ಕ","ki":"ಕಿ","ku":"ಕು","ke":"ಕೆ","ko":"ಕೊ",
  "ga":"ಗ","gi":"ಗಿ","gu":"ಗು","ge":"ಗೆ","go":"ಗೊ",
  "ja":"ಜ","ji":"ಜಿ","ju":"ಜು","je":"ಜೆ","jo":"ಜೊ",
  "ta":"ತ","ti":"ತಿ","tu":"ತು","te":"ತೆ","to":"ತೊ",
  "da":"ದ","di":"ದಿ","du":"ದು","de":"ದೆ","do":"ದೊ",
  "na":"ನ","ni":"ನಿ","nu":"ನು","ne":"ನೆ","no":"ನೊ",
  "pa":"ಪ","pi":"ಪಿ","pu":"ಪು","pe":"ಪೆ","po":"ಪೊ",
  "ba":"ಬ","bi":"ಬಿ","bu":"ಬು","be":"ಬೆ","bo":"ಬೊ",
  "ma":"ಮ","mi":"ಮಿ","mu":"ಮು","me":"ಮೆ","mo":"ಮೊ",
  "ya":"ಯ","yi":"ಯಿ","yu":"ಯು","ye":"ಯೆ",
  "ra":"ರ","ri":"ರಿ","ru":"ರು","re":"ರೆ","ro":"ರೊ",
  "la":"ಲ","li":"ಲಿ","lu":"ಲು","le":"ಲೆ","lo":"ಲೊ",
  "va":"ವ","vi":"ವಿ","vu":"ವು","ve":"ವೆ","vo":"ವೊ",
  "sa":"ಸ","si":"ಸಿ","su":"ಸು","se":"ಸೆ","so":"ಸೊ",
  "ha":"ಹ","hi":"ಹಿ","hu":"ಹು","he":"ಹೆ","ho":"ಹೊ",
  "nd":"ಂದ","nk":"ಂಕ","ng":"ಂಗ",
  "a":"ಅ","i":"ಇ","u":"ಉ","e":"ಎ","o":"ಒ",
  "n":"ಂ","m":"ಂ","k":"ಕ್","g":"ಗ್","j":"ಜ್","t":"ತ್",
  "d":"ದ್","p":"ಪ್","b":"ಬ್","r":"ರ್","l":"ಲ್",
  "v":"ವ್","s":"ಸ್","h":"ಹ್","y":"ಯ್","c":"ಕ್",
};

function phoneticToKannada(word) {
  const w = word.toLowerCase();
  let result = "", i = 0;
  while (i < w.length) {
    let matched = false;
    for (const len of [3, 2, 1]) {
      const chunk = w.slice(i, i + len);
      if (PHONETIC_MAP[chunk]) { result += PHONETIC_MAP[chunk]; i += len; matched = true; break; }
    }
    if (!matched) { result += w[i]; i++; }
  }
  return result;
}

function isProperName(word) {
  return /^[a-zA-Z]{2,20}$/.test(word.trim());
}

// ── Split compound sentence into chunks at known Tulu phrase boundaries ────
function splitIntoChunks(text) {
  const lower = text.toLowerCase();
  const chunks = [];
  let i = 0;

  while (i < lower.length) {
    let matched = false;
    // Try to match any split trigger at position i
    for (const trigger of SPLIT_TRIGGERS) {
      if (lower.slice(i).startsWith(trigger)) {
        // Found a trigger — capture from i to end, then check if another trigger follows
        let end = i + trigger.length;
        // Eat any connecting words: 'and', 'but', comma, space
        while (end < lower.length && /[\s,;]/.test(lower[end])) end++;
        // Check if there's more content after the trigger
        // The trigger itself is the chunk start; find where it ends
        // Look ahead for the next trigger
        let nextTriggerPos = lower.length;
        const remaining = lower.slice(i + trigger.length).trimStart();
        for (const t2 of SPLIT_TRIGGERS) {
          const pos = remaining.indexOf(t2);
          if (pos !== -1) {
            const absPos = i + trigger.length + (lower.slice(i + trigger.length).length - remaining.length) + pos;
            if (absPos < nextTriggerPos) nextTriggerPos = absPos;
          }
        }
        const chunk = text.slice(i, nextTriggerPos).trim();
        if (chunk) chunks.push(chunk);
        i = nextTriggerPos;
        // Skip separators
        while (i < lower.length && /[\s,;]/.test(lower[i])) i++;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // No trigger at this position — skip one word
      const spaceIdx = lower.indexOf(' ', i);
      if (spaceIdx === -1) { chunks.push(text.slice(i).trim()); i = lower.length; }
      else i = spaceIdx + 1;
    }
  }
  return chunks.filter(c => c.length > 0);
}

// ── Single phrase lookup ───────────────────────────────────────────────────
function lookupSinglePhrase(text) {
  const lower = text.trim().toLowerCase();

  // Exact match
  if (TULU_DICT[lower]) return TULU_DICT[lower];

  // Prefix match (isPrefix entries only)
  let bestKey = null, bestLen = 0;
  for (const [key, val] of Object.entries(TULU_DICT)) {
    if (val.isPrefix && lower.startsWith(key) && key.length > bestLen) {
      bestKey = key; bestLen = key.length;
    }
  }
  if (bestKey) {
    const base = TULU_DICT[bestKey];
    const remainder = text.trim().slice(bestLen).trim();
    if (remainder && isProperName(remainder)) {
      const kannadaName = phoneticToKannada(remainder);
      return {
        native: base.native + " " + kannadaName,
        transliteration: base.transliteration + " " + remainder.charAt(0).toUpperCase() + remainder.slice(1),
      };
    }
    if (!remainder) return base;
  }

  return null; // Not found — caller uses Kannada API
}

// ── MAIN EXPORT: Smart multi-phrase Tulu lookup ────────────────────────────
function lookupTulu(text) {
  const lower = text.trim().toLowerCase();

  // 1. Try exact match first (fast path)
  if (TULU_DICT[lower]) return TULU_DICT[lower];

  // 2. Try splitting into multiple known phrases
  const chunks = splitIntoChunks(text.trim());

  if (chunks.length > 1) {
    // Multiple chunks — look up each one
    const nativeParts = [], romanParts = [], unknownChunks = [];

    for (const chunk of chunks) {
      const result = lookupSinglePhrase(chunk);
      if (result) {
        nativeParts.push(result.native);
        romanParts.push(result.transliteration);
      } else {
        unknownChunks.push(chunk);
      }
    }

    if (nativeParts.length > 0) {
      // At least some phrases found — return what we have
      return {
        native: nativeParts.join(" "),
        transliteration: romanParts.join(" | "),
      };
    }
  }

  // 3. Single phrase — try prefix match
  const single = lookupSinglePhrase(text);
  if (single) return single;

  // 4. Nothing found — return null so caller uses Kannada API
  return null;
}
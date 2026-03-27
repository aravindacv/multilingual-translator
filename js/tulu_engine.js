// =============================================================================
// TULU ENGINE — Property File Based Translator
// Reads tulu.properties and performs word-level English → Tulu matching
// Does NOT touch any other language. All other 5 languages use MyMemory API.
// =============================================================================

// ── Step 1: Fetch and parse tulu.properties ──────────────────────────────────
let TULU_MAP = {};       // { "hello": { native: "ನಮಸ್ಕಾರ", roman: "Namaskara" } }
let TULU_PHRASES = {};   // Multi-word entries: { "good_morning": {...} }
let TULU_LOADED = false;

async function loadTuluProperties() {
  if (TULU_LOADED) return;
  try {
    const res = await fetch("tulu.properties");
    const text = await res.text();
    parseTuluProperties(text);
    TULU_LOADED = true;
  } catch(e) {
    console.warn("tulu.properties not loaded:", e);
  }
}

function parseTuluProperties(text) {
  const lines = text.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip comments and section headers and empty lines
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("[")) continue;

    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;

    const key   = trimmed.slice(0, eqIdx).trim().toLowerCase();
    const value = trimmed.slice(eqIdx + 1).trim();
    const pipeIdx = value.indexOf("|");

    let native = "", roman = "";
    if (pipeIdx !== -1) {
      native = value.slice(0, pipeIdx).trim();
      roman  = value.slice(pipeIdx + 1).trim();
    } else {
      native = value.trim();
      roman  = value.trim();
    }

    if (key.includes("_")) {
      // Multi-word phrase key: good_morning → "good morning"
      TULU_PHRASES[key.replace(/_/g, " ")] = { native, roman };
    } else {
      TULU_MAP[key] = { native, roman };
    }
  }
}

// ── Connecting words — skip in translation (don't map, don't show) ──────────
const SKIP_WORDS = new Set([
  "a","an","the","of","in","at","to","and","but","or",
  "with","for","this","that","it","its","by","on","as",
  "so","if","then","very","also","just","been","be","will",
  "can","could","would","should","shall","may","might","must",
  "not","no","never","always","here","there","now","still",
]);

// ── Phonetic map — used ONLY for unknown words (proper names, places) ────────
const PHONETIC_MAP = {
  "sha":"ಶ","shi":"ಶಿ","shu":"ಶು","cha":"ಚ","chi":"ಚಿ","chu":"ಚು",
  "tha":"ತ","thi":"ತಿ","dha":"ಧ","bha":"ಭ","bhi":"ಭಿ","bhu":"ಭು",
  "nda":"ಂದ","ndi":"ಂದಿ","ndu":"ಂದು","nka":"ಂಕ","nga":"ಂಗ","nna":"ನ್ನ",
  "pra":"ಪ್ರ","pri":"ಪ್ರಿ","kri":"ಕ್ರಿ","gra":"ಗ್ರ",
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

function isProperNoun(word) {
  // Capitalized word not in our dictionary = likely a name or place
  return /^[A-Z][a-zA-Z]{1,19}$/.test(word);
}

// ── Step 2: Word-level sentence translation ──────────────────────────────────
function translateWordByWord(text) {
  const words = text.trim().split(/\s+/);
  const nativeParts = [];
  const romanParts  = [];
  let matchedCount  = 0;
  let totalContent  = 0; // non-skip words

  let i = 0;
  while (i < words.length) {
    const raw  = words[i];
    const word = raw.toLowerCase().replace(/[?.,!;:'"]/g, "");

    // Skip connecting words
    if (SKIP_WORDS.has(word)) { i++; continue; }
    totalContent++;

    // Try multi-word phrase match (up to 4 words ahead)
    let phraseMatched = false;
    for (let len = 4; len >= 2; len--) {
      if (i + len > words.length) continue;
      const phrase = words.slice(i, i + len)
        .map(w => w.toLowerCase().replace(/[?.,!;:'"]/g, ""))
        .join(" ");
      if (TULU_PHRASES[phrase]) {
        nativeParts.push(TULU_PHRASES[phrase].native);
        romanParts.push(TULU_PHRASES[phrase].roman);
        matchedCount++;
        i += len;
        phraseMatched = true;
        break;
      }
    }
    if (phraseMatched) continue;

    // Single word match in TULU_MAP
    if (TULU_MAP[word]) {
      nativeParts.push(TULU_MAP[word].native);
      romanParts.push(TULU_MAP[word].roman);
      matchedCount++;
      i++;
      continue;
    }

    // Unknown word — if it looks like a proper noun, phonetically convert it
    // Otherwise skip it (let Kannada API handle whole sentence if coverage is low)
    if (isProperNoun(raw)) {
      const phonetic = phoneticToKannada(raw);
      nativeParts.push(phonetic);
      romanParts.push(raw);
      // Don't count as matched (phonetic is approximate)
    }
    // else: silently skip unknown common words

    i++;
  }

  const coverage = totalContent > 0 ? matchedCount / totalContent : 0;

  return {
    native:       nativeParts.join(" "),
    transliteration: romanParts.join(" "),
    coverage,      // 0.0 to 1.0 — how much was matched from property file
    matchedCount,
    totalContent,
  };
}

// ── Step 3: Main export — called by app.js for Tulu only ────────────────────
// Returns: { native, transliteration, source }
// source = "tulu_dict" | "kannada_api" | "partial"
async function getTuluTranslation(text) {
  // Ensure properties are loaded
  await loadTuluProperties();

  const lower = text.trim().toLowerCase();

  // Direct single-word or short phrase lookup
  if (TULU_MAP[lower]) {
    return { native: TULU_MAP[lower].native, transliteration: TULU_MAP[lower].roman, source: "tulu_dict" };
  }
  if (TULU_PHRASES[lower]) {
    return { native: TULU_PHRASES[lower].native, transliteration: TULU_PHRASES[lower].roman, source: "tulu_dict" };
  }

  // Word-by-word translation
  const result = translateWordByWord(text);

  if (result.coverage >= 0.5 && result.native.trim()) {
    // Good coverage — use our translation
    return {
      native: result.native,
      transliteration: result.transliteration,
      source: result.coverage >= 0.9 ? "tulu_dict" : "partial",
    };
  }

  // Poor coverage — return null so caller uses Kannada API fallback
  if (result.native.trim()) {
    // We have something — return partial result combined later
    return {
      native: result.native,
      transliteration: result.transliteration,
      source: "partial",
    };
  }

  return null; // Caller will use Kannada API
}
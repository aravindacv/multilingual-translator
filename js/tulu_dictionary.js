// ─────────────────────────────────────────────────────────────────────────────
// TULU DICTIONARY — Intelligent version
// Features:
//   1. Exact match
//   2. Prefix match — "my name is Aravinda" → ಎನ್ನ ಪೇರ್ + ಅರವಿಂದ
//   3. Phonetic transliteration for names/words not in dictionary
//   4. Reverse lookup (Tulu → English) via Kannada API fallback
// ─────────────────────────────────────────────────────────────────────────────

const TULU_DICT = {
  // Greetings
  "hello":              { native: "ನಮಸ್ಕಾರ",              transliteration: "Namaskara" },
  "hi":                 { native: "ನಮಸ್ಕಾರ",              transliteration: "Namaskara" },
  "good morning":       { native: "ಶುಭೋದಯ",               transliteration: "Shubhodaya" },
  "good night":         { native: "ಶುಭ ರಾತ್ರಿ",           transliteration: "Shubha Ratri" },
  "good evening":       { native: "ಶುಭ ಸಂಜೆ",             transliteration: "Shubha Sanje" },
  "goodbye":            { native: "ಬರ್ಪಾ",                transliteration: "Barpa" },
  "bye":                { native: "ಬರ್ಪಾ",                transliteration: "Barpa" },
  "welcome":            { native: "ಸ್ವಾಗತ",               transliteration: "Swagata" },
  "how are you":        { native: "ಈರ್ ಎಂಚ ಉಲ್ಲೆರ್?",    transliteration: "Ir encha uller?" },
  "i am fine":          { native: "ಎನ್ನ ಕುಶಾಲ್ ಉಂಡು",    transliteration: "Enna kushal undu" },
  "i am good":          { native: "ಎನ್ನ ಕುಶಾಲ್ ಉಂಡು",    transliteration: "Enna kushal undu" },

  // Basics
  "yes":                { native: "ಔ",                    transliteration: "Au" },
  "no":                 { native: "ಇಜ್ಜಿ",                transliteration: "Ijji" },
  "ok":                 { native: "ಸರಿ",                  transliteration: "Sari" },
  "please":             { native: "ದಯಮಾಡಿ",               transliteration: "Dayamadi" },
  "thank you":          { native: "ಧನ್ಯವಾದ",              transliteration: "Dhanyavada" },
  "thanks":             { native: "ಧನ್ಯವಾದ",              transliteration: "Dhanyavada" },
  "sorry":              { native: "ಕ್ಷಮೆ ಉಳ್ಳೆ",          transliteration: "Kshamè uḷḷe" },
  "excuse me":          { native: "ಒಂದು ನಿಮಿಷ",           transliteration: "Ondu nimisha" },
  "no problem":         { native: "ತೊಂದರೆ ಇಜ್ಜಿ",         transliteration: "Tondare ijji" },

  // Identity — prefix matches (app will append names)
  "my name is":         { native: "ಎನ್ನ ಪೇರ್",           transliteration: "Enna per" },
  "i am":               { native: "ಎನ್ಕ್",                transliteration: "Enk" },
  "i am from":          { native: "ಎನ್ಕ್",                transliteration: "Enk" },
  "what is your name":  { native: "ಈರೆ ಪೇರ್ ಎಂಚಿನಾ?",    transliteration: "Ire per enchina?" },
  "where are you from": { native: "ಈರ್ ಎಡ್ಡಾಂತ್?",       transliteration: "Ir eddant?" },
  "my name":            { native: "ಎನ್ನ ಪೇರ್",           transliteration: "Enna per" },

  // Love & emotions
  "i love you":         { native: "ಎನಗ್ ಈರ್ ಮೆಚ್ಚು",     transliteration: "Enag ir mecchu" },
  "i miss you":         { native: "ಈರ್ ನೆನಪಾಪುಂಡು",       transliteration: "Ir nenapapundu" },
  "beautiful":          { native: "ಭಲೆ",                  transliteration: "Bhale" },
  "good":               { native: "ಭಲೆ",                  transliteration: "Bhale" },
  "very good":          { native: "ತುಂಬ ಭಲೆ",             transliteration: "Tumba bhale" },
  "happy":              { native: "ಕುಶಾಲ್",               transliteration: "Kushal" },

  // Basic needs
  "water":              { native: "ಉದಕ",                  transliteration: "Udaka" },
  "food":               { native: "ತಿಂಡಿ",                transliteration: "Tindi" },
  "rice":               { native: "ಅಕ್ಕಿ",                transliteration: "Akki" },
  "help":               { native: "ಸಹಾಯ",                 transliteration: "Sahaya" },
  "i need help":        { native: "ಎನಗ್ ಸಹಾಯ ಬೇಕು",       transliteration: "Enag sahaya beku" },

  // Questions
  "how much":           { native: "ಎಷ್ಟು?",               transliteration: "Eshtu?" },
  "where":              { native: "ಎಡೆ?",                 transliteration: "Ede?" },
  "where is":           { native: "ಎಡೆ ಉಂಡು?",           transliteration: "Ede undu?" },
  "how far":            { native: "ಎಷ್ಟ್ ದೂರ ಉಂಡು?",      transliteration: "Esht dura undu?" },
  "what":               { native: "ಎಂಚಿನಾ?",              transliteration: "Enchina?" },
  "how":                { native: "ಎಂಚ?",                 transliteration: "Encha?" },

  // Numbers
  "one":                { native: "ಒಂಜಿ",                 transliteration: "Onji" },
  "two":                { native: "ರಡ್ಡ್",                transliteration: "Radd" },
  "three":              { native: "ಮೂಜಿ",                 transliteration: "Muji" },
  "four":               { native: "ನಾಲ್",                 transliteration: "Nal" },
  "five":               { native: "ಐನ್",                  transliteration: "Ain" },
  "ten":                { native: "ಪತ್ತ್",                transliteration: "Patt" },

  // Places
  "hospital":           { native: "ಆಸ್ಪತ್ರೆ",             transliteration: "Aspatre" },
  "hotel":              { native: "ಹೋಟೆಲ್",               transliteration: "Hotel" },
  "home":               { native: "ಇಲ್ಲ",                 transliteration: "Illa" },
  "beach":              { native: "ಕಡಲ್ ದಂಡೆ",           transliteration: "Kadal dande" },
  "mangalore":          { native: "ಮಂಗಳೂರು",              transliteration: "Mangaluru" },
  "udupi":              { native: "ಉಡುಪಿ",                transliteration: "Udupi" },

  // Emergency
  "help me":            { native: "ಸಹಾಯ ಮಲ್ಪೆ",           transliteration: "Sahaya malpe" },
  "call police":        { native: "ಪೊಲೀಸ್‌ನ್ ಡಾಪೆ",        transliteration: "Policen dape" },
  "doctor":             { native: "ವೈದ್ಯೆರ್",             transliteration: "Vaidyer" },
  "i am lost":          { native: "ಎನಗ್ ದಾರಿ ತಪ್ಪ್ ಆಂಡ್", transliteration: "Enag dari tapp and" },

  // Time
  "today":              { native: "ಇಂಚಿ",                 transliteration: "Inchi" },
  "tomorrow":           { native: "ನಾಳೆ",                 transliteration: "Nale" },
  "yesterday":          { native: "ನಿನ್ನೆ",               transliteration: "Ninne" },

  // Tulu culture
  "tulu":               { native: "ತುಳು",                  transliteration: "Tulu" },
  "tulu nadu":          { native: "ತುಳುನಾಡ್",              transliteration: "Tulunadu" },
  "yakshagana":         { native: "ಯಕ್ಷಗಾನ",              transliteration: "Yakshagana" },
  "kambala":            { native: "ಕಂಬಳ",                 transliteration: "Kambala" },
};

// ── Phonetic English → Kannada transliteration (for names/unknowns) ───────────
const PHONETIC_MAP = {
  // 3-char
  "sha":"ಶ","shi":"ಶಿ","shu":"ಶು","she":"ಶೆ",
  "cha":"ಚ","chi":"ಚಿ","chu":"ಚು",
  "tha":"ತ","thi":"ತಿ","thu":"ತು",
  "dha":"ಧ","dhi":"ಧಿ",
  "bha":"ಭ","bhi":"ಭಿ","bhu":"ಭು",
  "nda":"ಂದ","ndi":"ಂದಿ","ndu":"ಂದು",
  "nka":"ಂಕ","nga":"ಂಗ","nna":"ನ್ನ",
  "kha":"ಖ","gha":"ಘ","jha":"ಝ",
  "pra":"ಪ್ರ","pri":"ಪ್ರಿ",
  "kri":"ಕ್ರಿ","bri":"ಬ್ರಿ",
  // 2-char
  "aa":"ಆ","ii":"ಈ","uu":"ಊ","ee":"ಏ","oo":"ಓ","ai":"ಐ","au":"ಔ",
  "ka":"ಕ","ki":"ಕಿ","ku":"ಕು","ke":"ಕೆ","ko":"ಕೊ",
  "ga":"ಗ","gi":"ಗಿ","gu":"ಗು","ge":"ಗೆ","go":"ಗೊ",
  "ja":"ಜ","ji":"ಜಿ","ju":"ಜು","je":"ಜೆ","jo":"ಜೊ",
  "ta":"ತ","ti":"ತಿ","tu":"ತು","te":"ತೆ","to":"ತೊ",
  "da":"ದ","di":"ದಿ","du":"ದು","de":"ದೆ","do":"ದೊ",
  "na":"ನ","ni":"ನಿ","nu":"ನು","ne":"ನೆ","no":"ನೊ",
  "pa":"ಪ","pi":"ಪಿ","pu":"ಪು","pe":"ಪೆ","po":"ಪೊ",
  "ba":"ಬ","bi":"ಬಿ","bu":"ಬು","be":"ಬೆ","bo":"ಬೊ",
  "ma":"ಮ","mi":"ಮಿ","mu":"ಮು","me":"ಮೆ","mo":"ಮೊ",
  "ya":"ಯ","yi":"ಯಿ","yu":"ಯು","ye":"ಯೆ","yo":"ಯೊ",
  "ra":"ರ","ri":"ರಿ","ru":"ರು","re":"ರೆ","ro":"ರೊ",
  "la":"ಲ","li":"ಲಿ","lu":"ಲು","le":"ಲೆ","lo":"ಲೊ",
  "va":"ವ","vi":"ವಿ","vu":"ವು","ve":"ವೆ","vo":"ವೊ",
  "sa":"ಸ","si":"ಸಿ","su":"ಸು","se":"ಸೆ","so":"ಸೊ",
  "ha":"ಹ","hi":"ಹಿ","hu":"ಹು","he":"ಹೆ","ho":"ಹೊ",
  "nd":"ಂದ","nk":"ಂಕ","ng":"ಂಗ",
  // 1-char vowels
  "a":"ಅ","i":"ಇ","u":"ಉ","e":"ಎ","o":"ಒ",
  // 1-char consonants (fallback)
  "k":"ಕ್","g":"ಗ್","j":"ಜ್","t":"ತ್","d":"ದ್",
  "n":"ಂ","p":"ಪ್","b":"ಬ್","m":"ಮ್",
  "r":"ರ್","l":"ಲ್","v":"ವ್","s":"ಸ್","h":"ಹ್",
  "y":"ಯ್","c":"ಕ್",
};

function phoneticToKannada(word) {
  const w = word.toLowerCase();
  let result = "", i = 0;
  while (i < w.length) {
    let matched = false;
    for (const len of [3, 2, 1]) {
      const chunk = w.slice(i, i + len);
      if (PHONETIC_MAP[chunk]) {
        result += PHONETIC_MAP[chunk];
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) { result += w[i]; i++; }
  }
  return result;
}

// ── Smart Tulu lookup — exact → prefix → phonetic fallback ─────────────────
function lookupTulu(text) {
  const lower = text.trim().toLowerCase();

  // 1. Exact match
  if (TULU_DICT[lower]) return TULU_DICT[lower];

  // 2. Prefix match — find longest key that starts the sentence
  let bestKey = null, bestLen = 0;
  for (const key of Object.keys(TULU_DICT)) {
    if (lower.startsWith(key) && key.length > bestLen) {
      bestKey = key; bestLen = key.length;
    }
  }

  if (bestKey) {
    const base = TULU_DICT[bestKey];
    const remainder = text.trim().slice(bestLen).trim();
    if (remainder) {
      // Transliterate remainder (likely a name or place)
      const kannadaRemainder = phoneticToKannada(remainder);
      return {
        native: base.native + " " + kannadaRemainder,
        transliteration: base.transliteration + " " + remainder.charAt(0).toUpperCase() + remainder.slice(1),
      };
    }
    return base;
  }

  // 3. Single word — try phonetic transliteration
  const words = lower.split(/\s+/);
  if (words.length <= 3) {
    const kannada = words.map(w => phoneticToKannada(w)).join(" ");
    const roman   = text.trim().charAt(0).toUpperCase() + text.trim().slice(1);
    return { native: kannada, transliteration: roman };
  }

  return null;
}
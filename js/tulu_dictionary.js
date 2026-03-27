// ─────────────────────────────────────────────────────────────────────────────
// TULU DICTIONARY
// Tulu (ತುಳು) — native language of Tulu Nadu (Dakshina Kannada, Udupi, Kasaragod)
// Written in Kannada script (modern standard since Tulu-Tigalari script is rare)
// No API support exists — this is a handcrafted offline dictionary
// ─────────────────────────────────────────────────────────────────────────────

const TULU_DICT = {
  // ── Greetings ──────────────────────────────────────────────────────────────
  "hello":              { native: "ನಮಸ್ಕಾರ",              transliteration: "Namaskara" },
  "hi":                 { native: "ನಮಸ್ಕಾರ",              transliteration: "Namaskara" },
  "good morning":       { native: "ಶುಭೋದಯ",               transliteration: "Shubhodaya" },
  "good night":         { native: "ಶುಭ ರಾತ್ರಿ",           transliteration: "Shubha Ratri" },
  "good evening":       { native: "ಶುಭ ಸಂಜೆ",             transliteration: "Shubha Sanje" },
  "goodbye":            { native: "ಬರ್ಪಾ",                transliteration: "Barpa" },
  "welcome":            { native: "ಸ್ವಾಗತ",               transliteration: "Swagata" },
  "how are you":        { native: "ಈರ್ ಎಂಚ ಉಲ್ಲೆರ್?",    transliteration: "Ir encha uller?" },
  "i am fine":          { native: "ಎನ್ನ ಕುಶಾಲ್ ಉಂಡು",    transliteration: "Enna kushal undu" },

  // ── Basics ─────────────────────────────────────────────────────────────────
  "yes":                { native: "ಔ",                    transliteration: "Au" },
  "no":                 { native: "ಇಜ್ಜಿ",                transliteration: "Ijji" },
  "ok":                 { native: "ಸರಿ",                  transliteration: "Sari" },
  "please":             { native: "ದಯಮಾಡಿ",               transliteration: "Dayamadi" },
  "thank you":          { native: "ಧನ್ಯವಾದ",              transliteration: "Dhanyavada" },
  "sorry":              { native: "ಕ್ಷಮೆ ಉಳ್ಳೆ",          transliteration: "Kshamè uḷḷe" },
  "excuse me":          { native: "ಒಂದು ನಿಮಿಷ",           transliteration: "Ondu nimisha" },
  "no problem":         { native: "ತೊಂದರೆ ಇಜ್ಜಿ",         transliteration: "Tondare ijji" },

  // ── Identity ───────────────────────────────────────────────────────────────
  "my name is":         { native: "ಎನ್ನ ಪೇರ್",           transliteration: "Enna per" },
  "what is your name":  { native: "ಈರೆ ಪೇರ್ ಎಂಚಿನಾ?",    transliteration: "Ire per enchina?" },
  "where are you from": { native: "ಈರ್ ಎಡ್ಡಾಂತ್?",       transliteration: "Ir eddant?" },
  "i am from india":    { native: "ಎನ್ಕ್ ಭಾರತದಾಂತ್",      transliteration: "Enk bharatadant" },

  // ── Love & emotions ────────────────────────────────────────────────────────
  "i love you":         { native: "ಎನಗ್ ಈರ್ ಮೆಚ್ಚು",     transliteration: "Enag ir mecchu" },
  "i miss you":         { native: "ಈರ್ ನೆನಪಾಪುಂಡು",       transliteration: "Ir nenapapundu" },
  "beautiful":          { native: "ಭಲೆ",                  transliteration: "Bhale" },
  "good":               { native: "ಭಲೆ",                  transliteration: "Bhale" },
  "very good":          { native: "ತುಂಬ ಭಲೆ",             transliteration: "Tumba bhale" },
  "happy":              { native: "ಕುಶಾಲ್",               transliteration: "Kushal" },
  "sad":                { native: "ದುಃಖ",                  transliteration: "Dukha" },

  // ── Basic needs ────────────────────────────────────────────────────────────
  "water":              { native: "ಉದಕ",                  transliteration: "Udaka" },
  "food":               { native: "ತಿಂಡಿ",                transliteration: "Tindi" },
  "rice":               { native: "ಅಕ್ಕಿ",                transliteration: "Akki" },
  "eat":                { native: "ತಿನ್ಪೆ",               transliteration: "Tinpe" },
  "drink":              { native: "ಪರ್ಪೆ",                transliteration: "Parpe" },
  "sleep":              { native: "ನಿದ್ದೆ",               transliteration: "Nidde" },
  "help":               { native: "ಸಹಾಯ",                 transliteration: "Sahaya" },

  // ── Places ─────────────────────────────────────────────────────────────────
  "where is":           { native: "ಎಡೆ ಉಂಡು?",           transliteration: "Ede undu?" },
  "hospital":           { native: "ಆಸ್ಪತ್ರೆ",             transliteration: "Aspatre" },
  "hotel":              { native: "ಹೋಟೆಲ್",               transliteration: "Hotel" },
  "market":             { native: "ಪೇಟೆ",                 transliteration: "Pete" },
  "home":               { native: "ಇಲ್ಲ",                 transliteration: "Illa" },
  "temple":             { native: "ದೇವಸ್ಥಾನ",             transliteration: "Devasthana" },
  "beach":              { native: "ಕಡಲ್ ದಂಡೆ",           transliteration: "Kadal dande" },

  // ── Questions ──────────────────────────────────────────────────────────────
  "how much":           { native: "ಎಷ್ಟು?",               transliteration: "Eshtu?" },
  "what":               { native: "ಎಂಚಿನಾ?",              transliteration: "Enchina?" },
  "where":              { native: "ಎಡೆ?",                 transliteration: "Ede?" },
  "when":               { native: "ಎಡ್ಡ?",                transliteration: "Edda?" },
  "who":                { native: "ಮಾರ್?",                transliteration: "Mar?" },
  "why":                { native: "ಎಂಚಿಗ್?",              transliteration: "Enchig?" },
  "how":                { native: "ಎಂಚ?",                 transliteration: "Encha?" },

  // ── Numbers ────────────────────────────────────────────────────────────────
  "one":                { native: "ಒಂಜಿ",                 transliteration: "Onji" },
  "two":                { native: "ರಡ್ಡ್",                transliteration: "Radd" },
  "three":              { native: "ಮೂಜಿ",                 transliteration: "Muji" },
  "four":               { native: "ನಾಲ್",                 transliteration: "Nal" },
  "five":               { native: "ಐನ್",                  transliteration: "Ain" },
  "six":                { native: "ಆಜಿ",                  transliteration: "Aji" },
  "seven":              { native: "ಏಳ್",                  transliteration: "El" },
  "eight":              { native: "ಎಂಟ್",                 transliteration: "Ent" },
  "nine":               { native: "ಒಂಬತ್ತ್",              transliteration: "Ombatt" },
  "ten":                { native: "ಪತ್ತ್",                transliteration: "Patt" },

  // ── Time ───────────────────────────────────────────────────────────────────
  "today":              { native: "ಇಂಚಿ",                 transliteration: "Inchi" },
  "tomorrow":           { native: "ನಾಳೆ",                 transliteration: "Nale" },
  "yesterday":          { native: "ನಿನ್ನೆ",               transliteration: "Ninne" },
  "morning":            { native: "ಬೈಯಂಕ",               transliteration: "Baiyanka" },
  "evening":            { native: "ಸಂಜೆ",                 transliteration: "Sanje" },
  "night":              { native: "ರಾತ್ರಿ",               transliteration: "Ratri" },

  // ── Travel phrases ─────────────────────────────────────────────────────────
  "how far":            { native: "ಎಷ್ಟ್ ದೂರ ಉಂಡು?",      transliteration: "Esht dura undu?" },
  "i am lost":          { native: "ಎನಗ್ ದಾರಿ ತಪ್ಪ್ ಆಂಡ್", transliteration: "Enag dari tapp and" },
  "i need help":        { native: "ಎನಗ್ ಸಹಾಯ ಬೇಕು",       transliteration: "Enag sahaya beku" },
  "call police":        { native: "ಪೊಲೀಸ್ ಡಾ",            transliteration: "Police da" },
  "doctor":             { native: "ವೈದ್ಯೆರ್",             transliteration: "Vaidyer" },
  "bus":                { native: "ಬಸ್ಸ್",                transliteration: "Bass" },
  "taxi":               { native: "ಟ್ಯಾಕ್ಸಿ",             transliteration: "Taxi" },
  "ticket":             { native: "ಟಿಕೆಟ್",               transliteration: "Ticket" },

  // ── Tulu Nadu specific ─────────────────────────────────────────────────────
  "mangalore":          { native: "ಮಂಗಳೂರು",              transliteration: "Mangaluru" },
  "udupi":              { native: "ಉಡುಪಿ",                transliteration: "Udupi" },
  "tulu":               { native: "ತುಳು",                  transliteration: "Tulu" },
  "tulu nadu":          { native: "ತುಳುನಾಡ್",              transliteration: "Tulunadu" },
  "yakshagana":         { native: "ಯಕ್ಷಗಾನ",              transliteration: "Yakshagana" },
  "kambala":            { native: "ಕಂಬಳ",                 transliteration: "Kambala" },
};

function lookupTulu(input) {
  const key = input.trim().toLowerCase();
  return TULU_DICT[key] || null;
}
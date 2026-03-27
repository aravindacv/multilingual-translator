# Multilingual Translator

A free, browser-based translation app that converts English words and phrases into Japanese, Arabic, and Kannada — showing both native scripts and transliterations.

---

## Features

- Translates English into 3 languages simultaneously
- Displays native script (kanji, Arabic, Kannada) + romanized form for each
- Instant results for 15+ common phrases (no internet needed)
- Caches every translation in the browser — never fetches the same phrase twice
- Works on any device with a browser — phone, tablet, laptop, desktop
- Zero cost — uses the free LibreTranslate public API

---

## Project Structure

```
multilingual-translator/
├── index.html            ← Open this in your browser to run the app
├── config.js             ← API server URL and app settings
├── README.md             ← This file
├── css/
│   └── style.css         ← All styling, RTL rules, card layout
├── js/
│   ├── app.js            ← Main logic and event handling
│   ├── translator.js     ← LibreTranslate API calls
│   ├── transliterate.js  ← Native script → romanized text
│   ├── cache.js          ← localStorage get/set
│   └── dictionary.js     ← Preloaded common phrases
├── fonts/                ← Reserved (fonts load from Google CDN)
└── assets/               ← Reserved for icons/images
```

---

## How to Run

### Option 1 — Live Server (recommended)
1. Open the `multilingual-translator` folder in VS Code
2. Right-click `index.html` in the Explorer panel
3. Select **Open with Live Server**
4. The app opens in your browser at `http://127.0.0.1:5500`

### Option 2 — Direct file open
1. Double-click `index.html`
2. It opens directly in your browser
3. Note: some browsers block fetch requests from `file://` — use Live Server if this happens

---

## How It Works

1. You type an English word or phrase and click Translate
2. The app checks the **built-in dictionary** first (instant, offline)
3. If not found, checks the **browser cache** (instant, offline)
4. If not cached, calls the **LibreTranslate API** for all 3 languages in parallel
5. Results are transliterated client-side using JS libraries
6. The result is saved to cache so the same phrase is never fetched again

---

## Translation Source

This app uses [LibreTranslate](https://libretranslate.de) — a free, open-source machine translation API. No API key required.

**Supported languages:**
| Language | Code | Script | Transliteration |
|----------|------|--------|-----------------|
| Japanese | ja   | Kanji / Hiragana | Rōmaji via Wanakana.js |
| Arabic   | ar   | Arabic (RTL)     | Latin via character map |
| Kannada  | kn   | Kannada script   | IAST via Sanscript.js |

---

## Changing the API Server

If `libretranslate.de` is slow or down, open `config.js` and change the URL to any free public instance:

```js
LIBRETRANSLATE_URL: "https://translate.argosopentech.com/translate"
```

Other free public servers:
- `https://libretranslate.de/translate`
- `https://translate.argosopentech.com/translate`
- `https://libretranslate.eranot.com/translate`

---

## Adding More Phrases to the Dictionary

Open `js/dictionary.js` and add a new entry following this pattern:

```js
"good afternoon": {
  japanese: { native: "こんにちは",  transliteration: "Konnichiwa" },
  arabic:   { native: "مساء الخير", transliteration: "Masāʾ al-khayr" },
  kannada:  { native: "ಶುಭ ಮಧ್ಯಾಹ್ನ", transliteration: "Śubha madhyāhna" },
},
```

---

## Known Limitations

- Kannada support on LibreTranslate public servers is limited — common phrases use the dictionary instead
- Transliteration is approximate for Arabic (no diacritics in source text)
- Public LibreTranslate servers may be slow during peak hours (2–5 second delay)
- Internet required for live translation; dictionary and cache work offline

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | HTML5 + CSS3 (no framework) |
| Logic | Vanilla JavaScript (ES6+) |
| Translation API | LibreTranslate (free, open-source) |
| Japanese romanization | Wanakana.js (CDN) |
| Kannada transliteration | Sanscript.js (CDN) |
| Arabic transliteration | Built-in character map |
| Fonts | Google Fonts — Noto Sans JP, AR, Kannada |
| Caching | Browser localStorage |

---

## License

Free to use and modify for personal and educational purposes.
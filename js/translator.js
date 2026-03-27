// ─────────────────────────────────────────────────────────────────────────────
// Script validators — reject API responses in the wrong writing system
// ─────────────────────────────────────────────────────────────────────────────
function isJapanese(text) {
  if (!text) return false;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if ((cp >= 0x3040 && cp <= 0x309F) ||  // Hiragana
        (cp >= 0x30A0 && cp <= 0x30FF) ||  // Katakana
        (cp >= 0x4E00 && cp <= 0x9FFF))    // CJK unified ideographs
      return true;
  }
  return false;
}

function isArabic(text) {
  if (!text) return false;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp >= 0x0600 && cp <= 0x06FF) return true;
  }
  return false;
}

function isKannada(text) {
  if (!text) return false;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp >= 0x0C80 && cp <= 0x0CFF) return true;
  }
  return false;
}

function isMalayalam(text) {
  if (!text) return false;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp >= 0x0D00 && cp <= 0x0D7F) return true;
  }
  return false;
}

const SCRIPT_VALIDATORS = {
  ja: isJapanese,
  ar: isArabic,
  kn: isKannada,
  ml: isMalayalam,
};

// ─────────────────────────────────────────────────────────────────────────────
// Fetch with retry — tries up to 2 times on failure or wrong script
// ─────────────────────────────────────────────────────────────────────────────
async function fetchTranslation(text, targetLang, attempt = 1) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);

  try {
    const url = `${CONFIG.MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText.trim();

      // Validate the response is in the correct script
      const validator = SCRIPT_VALIDATORS[targetLang];
      if (validator && !validator(translated)) {
        // Wrong script returned — retry once with explicit language hint
        if (attempt < 2) {
          console.warn(`Wrong script for ${targetLang}, retrying...`);
          await new Promise(r => setTimeout(r, 400));
          return fetchTranslation(text, targetLang, 2);
        }
        // Second attempt also failed — return null so card shows "Not available"
        console.warn(`Script validation failed for ${targetLang}: "${translated}"`);
        return null;
      }

      return translated;
    }
    throw new Error("Empty response");
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") throw new Error("Request timed out");
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Translate into all 4 languages in parallel
// ─────────────────────────────────────────────────────────────────────────────
async function translateAll(text) {
  const [ja, ar, kn, ml] = await Promise.allSettled([
    fetchTranslation(text, CONFIG.TARGET_LANGS.japanese),
    fetchTranslation(text, CONFIG.TARGET_LANGS.arabic),
    fetchTranslation(text, CONFIG.TARGET_LANGS.kannada),
    fetchTranslation(text, CONFIG.TARGET_LANGS.malayalam),
  ]);

  return {
    japanese:  ja.status === "fulfilled" ? ja.value : null,
    arabic:    ar.status === "fulfilled" ? ar.value : null,
    kannada:   kn.status === "fulfilled" ? kn.value : null,
    malayalam: ml.status === "fulfilled" ? ml.value : null,
  };
}
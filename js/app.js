document.addEventListener("DOMContentLoaded", () => {

  // ── Tab switching ──────────────────────────────────────────────────────────
  const tabs = {
    translator:   { tab: document.getElementById("tab-translator"),   panel: document.getElementById("panel-translator") },
    traveler:     { tab: document.getElementById("tab-traveler"),     panel: document.getElementById("panel-traveler") },
    conversation: { tab: document.getElementById("tab-conversation"), panel: document.getElementById("panel-conversation") },
  };

  Object.keys(tabs).forEach(key => {
    tabs[key].tab.addEventListener("click", () => switchTab(key));
  });

  function switchTab(active) {
    Object.keys(tabs).forEach(key => {
      tabs[key].tab.classList.toggle("tab-active", key === active);
      tabs[key].panel.classList.toggle("hidden", key !== active);
    });
    if (active === "traveler")     buildTraveler();
    if (active === "conversation") initConversation();
  }

  // ── TRANSLATOR PANEL ───────────────────────────────────────────────────────
  const input     = document.getElementById("english-input");
  const btn       = document.getElementById("translate-btn");
  const clearBtn  = document.getElementById("clear-btn");
  const charCount = document.getElementById("char-count");
  const results   = document.getElementById("results");
  const loader    = document.getElementById("loader");
  const errorBox  = document.getElementById("error-box");

  input.addEventListener("input", () => {
    const len = input.value.length;
    charCount.textContent = `${len} / ${CONFIG.MAX_INPUT_LENGTH}`;
    charCount.style.color = len > CONFIG.MAX_INPUT_LENGTH ? "#dc2626" : "";
  });

  btn.addEventListener("click", handleTranslate);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleTranslate(); }
  });
  clearBtn.addEventListener("click", () => {
    input.value = "";
    charCount.textContent = `0 / ${CONFIG.MAX_INPUT_LENGTH}`;
    results.classList.add("hidden");
    errorBox.classList.add("hidden");
    input.focus();
  });

  async function handleTranslate() {
    const text = input.value.trim();
    if (!text) { showError("Please enter a word or phrase."); return; }
    if (text.length > CONFIG.MAX_INPUT_LENGTH) { showError(`Max ${CONFIG.MAX_INPUT_LENGTH} characters.`); return; }
    errorBox.classList.add("hidden");
    results.classList.add("hidden");
    showLoader(true);
    try {
      let data = null, source = "";
      data = lookupDictionary(text);
      if (data) source = "dictionary";
      if (!data) { data = CACHE.get(text); if (data) source = "cache"; }
      if (!data) {
        const raw = await translateAll(text);
        if (!raw.japanese && !raw.arabic && !raw.kannada && !raw.malayalam)
          throw new Error("No translations returned. Check your internet connection.");
        data = transliterateAll(raw);
        CACHE.set(text, data);
        source = "api";
      }
      renderResults(text, data, source);
    } catch (err) {
      showError("Translation failed: " + (err.message || "Unknown error"));
    } finally { showLoader(false); }
  }

  function renderResults(originalText, data, source) {
    document.getElementById("original-text").textContent = originalText;
    const badge = document.getElementById("source-badge");
    badge.textContent = source === "dictionary" ? "From dictionary" : source === "cache" ? "From cache" : "Translated live";
    badge.className = "source-badge badge-" + source;
    ["japanese", "arabic", "kannada", "malayalam"].forEach(lang => {
      const card   = document.getElementById(`card-${lang}`);
      const native = card.querySelector(".native-script");
      const roman  = card.querySelector(".transliteration");
      const entry  = data[lang];
      if (entry && entry.native && entry.native.trim()) {
        native.textContent = entry.native;
        roman.textContent  = entry.transliteration || "—";
        card.classList.remove("card-unavailable");
      } else {
        native.textContent = "—";
        roman.textContent  = "Not available";
        card.classList.add("card-unavailable");
      }
    });
    results.classList.remove("hidden");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showLoader(v) {
    loader.classList.toggle("hidden", !v);
    btn.disabled = v;
    btn.textContent = v ? "Translating…" : "Translate";
  }
  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.remove("hidden");
    showLoader(false);
  }

  // ── TRAVELER PANEL ─────────────────────────────────────────────────────────
  let activeSituation = "Hotel";
  let activeLang = "all";
  let travelerBuilt = false;

  function buildTraveler() {
    if (travelerBuilt) return;
    travelerBuilt = true;
    const situationBar = document.getElementById("situation-bar");
    const langBar      = document.getElementById("traveler-lang-bar");

    Object.keys(TRAVELER_PHRASES).forEach(sit => {
      const b = document.createElement("button");
      b.className = "sit-btn" + (sit === activeSituation ? " sit-active" : "");
      b.innerHTML = `<span>${TRAVELER_PHRASES[sit].icon}</span> ${sit}`;
      b.addEventListener("click", () => {
        activeSituation = sit;
        document.querySelectorAll(".sit-btn").forEach(x => x.classList.remove("sit-active"));
        b.classList.add("sit-active");
        renderPhrases();
      });
      situationBar.appendChild(b);
    });

    [{ key:"all",label:"All Languages"},{ key:"japanese",label:"Japanese"},
     { key:"arabic",label:"Arabic"},{ key:"kannada",label:"Kannada"},
     { key:"malayalam",label:"Malayalam"}].forEach(l => {
      const b = document.createElement("button");
      b.className = "lang-filter-btn" + (l.key === activeLang ? " lang-filter-active" : "");
      b.textContent = l.label;
      b.addEventListener("click", () => {
        activeLang = l.key;
        document.querySelectorAll(".lang-filter-btn").forEach(x => x.classList.remove("lang-filter-active"));
        b.classList.add("lang-filter-active");
        renderPhrases();
      });
      langBar.appendChild(b);
    });
    renderPhrases();
  }

  function renderPhrases() {
    const phraseList = document.getElementById("phrase-list");
    phraseList.innerHTML = "";
    const phrases = TRAVELER_PHRASES[activeSituation]?.phrases || [];
    const scriptFonts = { japanese:"Noto Sans JP", arabic:"Noto Sans Arabic", kannada:"Noto Sans Kannada", malayalam:"Noto Sans Malayalam" };
    const langNames   = { japanese:"Japanese 🇯🇵", arabic:"Arabic 🇸🇦", kannada:"Kannada 🇮🇳", malayalam:"Malayalam 🇮🇳" };

    phrases.forEach(phrase => {
      const card = document.createElement("div");
      card.className = "phrase-card";
      const langs = activeLang === "all" ? ["japanese","arabic","kannada","malayalam"] : [activeLang];
      const langHTML = langs.map(lang => {
        const t = phrase[lang]; if (!t) return "";
        const dir = lang === "arabic" ? 'dir="rtl"' : "";
        return `<div class="phrase-lang-block">
          <div class="phrase-lang-label">${langNames[lang]}</div>
          <div class="phrase-native" style="font-family:'${scriptFonts[lang]}',sans-serif" ${dir}>${t.native}</div>
          <div class="phrase-roman">${t.transliteration}</div>
        </div>`;
      }).join("");
      card.innerHTML = `
        <div class="phrase-english"><span class="phrase-en-icon">EN</span><span class="phrase-en-text">${phrase.en}</span></div>
        <div class="phrase-langs">${langHTML}</div>
        <div class="phrase-actions">
          <button class="phrase-show-btn" onclick="showToLocal(${JSON.stringify(phrase).replace(/"/g,'&quot;')})">Show to Local</button>
          <button class="phrase-share-btn" onclick="sharePhrase(${JSON.stringify(phrase.en).replace(/"/g,'&quot;')},${JSON.stringify(phrase).replace(/"/g,'&quot;')})">Share</button>
        </div>`;
      phraseList.appendChild(card);
    });
  }

  window.showToLocal = function(phrase) {
    const overlay = document.getElementById("local-overlay");
    const content = document.getElementById("local-content");
    const langs = ["japanese","arabic","kannada","malayalam"];
    const fonts  = { japanese:"Noto Sans JP", arabic:"Noto Sans Arabic", kannada:"Noto Sans Kannada", malayalam:"Noto Sans Malayalam" };
    const colors = { japanese:"#c0392b", arabic:"#0e7b72", kannada:"#7e34a8", malayalam:"#1e6fa8" };
    content.innerHTML = `
      <div class="local-english">${phrase.en}</div>
      <div class="local-scripts">
        ${langs.map(lang => {
          const t = phrase[lang]; if (!t||!t.native) return "";
          const dir = lang==="arabic"?'dir="rtl"':"";
          return `<div class="local-script-block">
            <div class="local-native" style="font-family:'${fonts[lang]}',sans-serif;color:${colors[lang]};" ${dir}>${t.native}</div>
            <div class="local-roman">${t.transliteration}</div>
          </div>`;
        }).join("")}
      </div>
      <p class="local-hint">Show this screen to a local</p>`;
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  document.getElementById("local-overlay").addEventListener("click", e => { if(e.target===e.currentTarget) closeLocal(); });
  document.getElementById("local-close").addEventListener("click", closeLocal);
  function closeLocal() { document.getElementById("local-overlay").classList.add("hidden"); document.body.style.overflow=""; }
  document.addEventListener("keydown", e => { if(e.key==="Escape") closeLocal(); });

  window.sharePhrase = function(english, phrase) {
    const langs = ["japanese","arabic","kannada","malayalam"];
    const names  = { japanese:"Japanese", arabic:"Arabic", kannada:"Kannada", malayalam:"Malayalam" };
    let text = `"${english}"\n\n`;
    langs.forEach(lang => { if(phrase[lang]?.native) text += `${names[lang]}:\n${phrase[lang].native}\n(${phrase[lang].transliteration})\n\n`; });
    text += "Translated by Multilingual Translator — Built by CVA";
    if (navigator.share) navigator.share({ title:"Translation", text }).catch(()=>{});
    else navigator.clipboard.writeText(text).then(() => showToast("Copied to clipboard!"));
  };

  // ── CONVERSATION MODE ──────────────────────────────────────────────────────
  let convLang = "japanese";
  let convInited = false;
  let speechSupported = false;
  let recognitionA = null, recognitionB = null;
  let synthA = null, synthB = null;

  const LANG_CODES = { japanese:"ja-JP", arabic:"ar-SA", kannada:"kn-IN", malayalam:"ml-IN" };
  const LANG_NAMES = { japanese:"Japanese", arabic:"Arabic", kannada:"Kannada", malayalam:"Malayalam" };
  const SCRIPT_FONTS = { japanese:"Noto Sans JP", arabic:"Noto Sans Arabic", kannada:"Noto Sans Kannada", malayalam:"Noto Sans Malayalam" };

  function initConversation() {
    if (convInited) return;
    convInited = true;

    speechSupported = ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

    // Language selector
    const selector = document.getElementById("conv-lang-selector");
    ["japanese","arabic","kannada","malayalam"].forEach(lang => {
      const opt = document.createElement("option");
      opt.value = lang;
      opt.textContent = LANG_NAMES[lang];
      selector.appendChild(opt);
    });
    selector.value = convLang;
    selector.addEventListener("change", () => {
      convLang = selector.value;
      updateConvFonts();
      clearConversation();
    });

    updateConvFonts();

    // Show/hide voice buttons
    if (!speechSupported) {
      document.querySelectorAll(".voice-btn").forEach(b => { b.style.display = "none"; });
      document.getElementById("conv-voice-note").classList.remove("hidden");
    }

    // Person A — English speaker
    document.getElementById("conv-send-a").addEventListener("click", () => sendFromA());
    document.getElementById("conv-input-a").addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendFromA(); }
    });

    // Person B — Local language speaker
    document.getElementById("conv-send-b").addEventListener("click", () => sendFromB());
    document.getElementById("conv-input-b").addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendFromB(); }
    });

    // Voice buttons
    if (speechSupported) {
      document.getElementById("conv-voice-a").addEventListener("click", () => startVoice("a"));
      document.getElementById("conv-voice-b").addEventListener("click", () => startVoice("b"));
    }

    // Clear button
    document.getElementById("conv-clear").addEventListener("click", clearConversation);
  }

  function updateConvFonts() {
    const font = SCRIPT_FONTS[convLang];
    document.querySelectorAll(".conv-native-text").forEach(el => {
      el.style.fontFamily = `'${font}', sans-serif`;
      if (convLang === "arabic") { el.setAttribute("dir","rtl"); el.style.textAlign="right"; }
      else { el.removeAttribute("dir"); el.style.textAlign=""; }
    });
    document.getElementById("conv-b-lang-label").textContent = LANG_NAMES[convLang];
    document.getElementById("conv-input-b").placeholder = `Type in ${LANG_NAMES[convLang]}…`;
  }

  async function sendFromA() {
    const inputEl = document.getElementById("conv-input-a");
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = "";

    addBubble("a", text, null, null, true);
    setConvLoading("a", true);

    try {
      // Check dictionary first
      let native = "", roman = "";
      const dictResult = lookupDictionary(text);
      if (dictResult && dictResult[convLang]) {
        native = dictResult[convLang].native;
        roman  = dictResult[convLang].transliteration;
      } else {
        const cached = CACHE.get(text);
        if (cached && cached[convLang]) {
          native = cached[convLang].native;
          roman  = cached[convLang].transliteration;
        } else {
          const raw = await translateAll(text);
          const data = transliterateAll(raw);
          CACHE.set(text, data);
          if (data[convLang]) { native = data[convLang].native; roman = data[convLang].transliteration; }
        }
      }
      updateLastBubble("a", native, roman);
      if (native) speakText(native, LANG_CODES[convLang]);
    } catch(err) {
      updateLastBubble("a", "Translation failed", "");
    } finally { setConvLoading("a", false); }
  }

  async function sendFromB() {
    const inputEl = document.getElementById("conv-input-b");
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = "";

    addBubble("b", text, null, null, true);
    setConvLoading("b", true);

    try {
      // Translate from local language back to English
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);
      const langCode = CONFIG.TARGET_LANGS[convLang];
      const url = `${CONFIG.MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=${langCode}|en`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      const data = await res.json();
      const englishBack = data?.responseData?.translatedText || "Translation unavailable";
      updateLastBubble("b", englishBack, text);
      if (englishBack) speakText(englishBack, "en-US");
    } catch(err) {
      updateLastBubble("b", "Translation failed", "");
    } finally { setConvLoading("b", false); }
  }

  let bubbleIdCounter = 0;

  function addBubble(side, originalText, translatedText, subText, loading) {
    const feed = document.getElementById("conv-feed");
    const id = "bubble-" + (++bubbleIdCounter);
    const div = document.createElement("div");
    div.className = `conv-bubble conv-bubble-${side}`;
    div.id = id;

    const isA = side === "a";
    div.innerHTML = `
      <div class="bubble-original">${originalText}</div>
      <div class="bubble-translated ${isA ? "conv-native-text" : ""}" 
           ${isA && convLang==="arabic" ? 'dir="rtl"' : ""}
           style="${isA ? `font-family:'${SCRIPT_FONTS[convLang]}',sans-serif` : ""}">
        ${loading ? '<span class="conv-dots"><span></span><span></span><span></span></span>' : (translatedText || "")}
      </div>
      ${subText ? `<div class="bubble-sub">${subText}</div>` : ""}`;

    if (isA) {
      const el = div.querySelector(".bubble-translated");
      if (convLang === "arabic") { el.setAttribute("dir","rtl"); el.style.textAlign="right"; }
    }

    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
    return id;
  }

  function updateLastBubble(side, translatedText, subText) {
    const feed = document.getElementById("conv-feed");
    const bubbles = feed.querySelectorAll(`.conv-bubble-${side}`);
    if (!bubbles.length) return;
    const last = bubbles[bubbles.length - 1];
    const translEl = last.querySelector(".bubble-translated");
    const subEl    = last.querySelector(".bubble-sub");
    if (translEl) translEl.innerHTML = translatedText;
    if (subEl)    subEl.textContent  = subText || "";
    else if (subText) {
      const s = document.createElement("div");
      s.className = "bubble-sub";
      s.textContent = subText;
      last.appendChild(s);
    }
    feed.scrollTop = feed.scrollHeight;
  }

  function setConvLoading(side, loading) {
    const sendBtn = document.getElementById(`conv-send-${side}`);
    sendBtn.disabled = loading;
    sendBtn.textContent = loading ? "…" : "Send";
  }

  function clearConversation() {
    document.getElementById("conv-feed").innerHTML = "";
    document.getElementById("conv-input-a").value = "";
    document.getElementById("conv-input-b").value = "";
  }

  // Voice input
  function startVoice(side) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const btn   = document.getElementById(`conv-voice-${side}`);
    const input = document.getElementById(`conv-input-${side}`);
    const lang  = side === "a" ? "en-US" : LANG_CODES[convLang];

    const rec = new SR();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = false;

    btn.textContent = "🔴 Listening…";
    btn.style.color = "#e05555";

    rec.onresult = (e) => {
      input.value = e.results[0][0].transcript;
      btn.textContent = "🎤 Speak";
      btn.style.color = "";
      if (side === "a") sendFromA();
      else              sendFromB();
    };
    rec.onerror = () => { btn.textContent = "🎤 Speak"; btn.style.color = ""; };
    rec.onend   = () => { btn.textContent = "🎤 Speak"; btn.style.color = ""; };
    rec.start();
  }

  // Text to speech
  function speakText(text, lang) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utt  = new SpeechSynthesisUtterance(text);
    utt.lang   = lang;
    utt.rate   = 0.9;
    utt.volume = 1;
    window.speechSynthesis.speak(utt);
  }

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showToast(msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div"); t.id = "toast";
      t.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--accent);color:#fff;padding:0.6rem 1.4rem;border-radius:99px;font-size:0.85rem;font-weight:500;z-index:9999;transition:opacity 0.3s;`;
      document.body.appendChild(t);
    }
    t.textContent = msg; t.style.opacity = "1";
    setTimeout(() => { t.style.opacity = "0"; }, 2200);
  }

});
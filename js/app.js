document.addEventListener("DOMContentLoaded", () => {
  // ── Tab switching ──
  const tabTranslator = document.getElementById("tab-translator");
  const tabTraveler   = document.getElementById("tab-traveler");
  const panelTranslator = document.getElementById("panel-translator");
  const panelTraveler   = document.getElementById("panel-traveler");

  tabTranslator.addEventListener("click", () => switchTab("translator"));
  tabTraveler.addEventListener("click",   () => switchTab("traveler"));

  function switchTab(tab) {
    tabTranslator.classList.toggle("tab-active", tab === "translator");
    tabTraveler.classList.toggle("tab-active",   tab === "traveler");
    panelTranslator.classList.toggle("hidden", tab !== "translator");
    panelTraveler.classList.toggle("hidden",   tab !== "traveler");
    if (tab === "traveler") buildTraveler();
  }

  // ── Translator panel ──
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
    if (text.length > CONFIG.MAX_INPUT_LENGTH) {
      showError(`Max ${CONFIG.MAX_INPUT_LENGTH} characters.`); return;
    }
    errorBox.classList.add("hidden");
    results.classList.add("hidden");
    showLoader(true);
    try {
      let data = null, source = "";
      data = lookupDictionary(text);
      if (data) { source = "dictionary"; }
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
      console.error(err);
      showError("Translation failed: " + (err.message || "Unknown error") +
        ". Try a hint chip like 'hello' or 'good morning'.");
    } finally { showLoader(false); }
  }

  function renderResults(originalText, data, source) {
    document.getElementById("original-text").textContent = originalText;
    const badge = document.getElementById("source-badge");
    badge.textContent =
      source === "dictionary" ? "From dictionary" :
      source === "cache"      ? "From cache" : "Translated live";
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

  // ── Traveler panel ──
  let activeSituation = "Hotel";
  let activeLang = "all";
  let travelerBuilt = false;

  function buildTraveler() {
    if (travelerBuilt) return;
    travelerBuilt = true;

    const situationBar = document.getElementById("situation-bar");
    const langBar      = document.getElementById("traveler-lang-bar");
    const phraseList   = document.getElementById("phrase-list");

    // Build situation tabs
    Object.keys(TRAVELER_PHRASES).forEach(sit => {
      const btn = document.createElement("button");
      btn.className = "sit-btn" + (sit === activeSituation ? " sit-active" : "");
      btn.innerHTML = `<span>${TRAVELER_PHRASES[sit].icon}</span> ${sit}`;
      btn.addEventListener("click", () => {
        activeSituation = sit;
        document.querySelectorAll(".sit-btn").forEach(b => b.classList.remove("sit-active"));
        btn.classList.add("sit-active");
        renderPhrases();
      });
      situationBar.appendChild(btn);
    });

    // Build language filter
    const langs = [
      { key: "all",       label: "All Languages" },
      { key: "japanese",  label: "Japanese" },
      { key: "arabic",    label: "Arabic" },
      { key: "kannada",   label: "Kannada" },
      { key: "malayalam", label: "Malayalam" },
    ];
    langs.forEach(l => {
      const btn = document.createElement("button");
      btn.className = "lang-filter-btn" + (l.key === activeLang ? " lang-filter-active" : "");
      btn.textContent = l.label;
      btn.addEventListener("click", () => {
        activeLang = l.key;
        document.querySelectorAll(".lang-filter-btn").forEach(b => b.classList.remove("lang-filter-active"));
        btn.classList.add("lang-filter-active");
        renderPhrases();
      });
      langBar.appendChild(btn);
    });

    renderPhrases();
  }

  function renderPhrases() {
    const phraseList = document.getElementById("phrase-list");
    phraseList.innerHTML = "";
    const phrases = TRAVELER_PHRASES[activeSituation]?.phrases || [];

    phrases.forEach(phrase => {
      const card = document.createElement("div");
      card.className = "phrase-card";

      const langs = activeLang === "all"
        ? ["japanese", "arabic", "kannada", "malayalam"]
        : [activeLang];

      const langNames = { japanese: "Japanese 🇯🇵", arabic: "Arabic 🇸🇦", kannada: "Kannada 🇮🇳", malayalam: "Malayalam 🇮🇳" };
      const scriptFonts = {
        japanese: "Noto Sans JP",
        arabic: "Noto Sans Arabic",
        kannada: "Noto Sans Kannada",
        malayalam: "Noto Sans Malayalam",
      };
      const isRTL = { arabic: true };

      let langHTML = langs.map(lang => {
        const t = phrase[lang];
        if (!t) return "";
        const font = scriptFonts[lang];
        const dir  = isRTL[lang] ? 'dir="rtl"' : '';
        return `
          <div class="phrase-lang-block">
            <div class="phrase-lang-label">${langNames[lang]}</div>
            <div class="phrase-native" style="font-family:'${font}',sans-serif" ${dir}>${t.native}</div>
            <div class="phrase-roman">${t.transliteration}</div>
          </div>`;
      }).join("");

      card.innerHTML = `
        <div class="phrase-english">
          <span class="phrase-en-icon">EN</span>
          <span class="phrase-en-text">${phrase.en}</span>
        </div>
        <div class="phrase-langs">${langHTML}</div>
        <div class="phrase-actions">
          <button class="phrase-show-btn" onclick="showToLocal(${JSON.stringify(phrase).replace(/"/g, '&quot;')})">
            Show to Local
          </button>
          <button class="phrase-share-btn" onclick="sharePhrase(${JSON.stringify(phrase.en).replace(/"/g, '&quot;')}, ${JSON.stringify(phrase).replace(/"/g, '&quot;')})">
            Share
          </button>
        </div>`;
      phraseList.appendChild(card);
    });
  }

  // ── Show to Local modal ──
  window.showToLocal = function(phrase) {
    const overlay = document.getElementById("local-overlay");
    const content = document.getElementById("local-content");

    const langs = ["japanese", "arabic", "kannada", "malayalam"];
    const scriptFonts = {
      japanese: "Noto Sans JP",
      arabic: "Noto Sans Arabic",
      kannada: "Noto Sans Kannada",
      malayalam: "Noto Sans Malayalam",
    };
    const langColors = {
      japanese: "#c0392b",
      arabic: "#0e7b72",
      kannada: "#7e34a8",
      malayalam: "#1e6fa8",
    };

    content.innerHTML = `
      <div class="local-english">${phrase.en}</div>
      <div class="local-scripts">
        ${langs.map(lang => {
          const t = phrase[lang];
          if (!t || !t.native) return "";
          const dir = lang === "arabic" ? 'dir="rtl"' : "";
          return `
            <div class="local-script-block">
              <div class="local-native" style="font-family:'${scriptFonts[lang]}',sans-serif;color:${langColors[lang]};" ${dir}>
                ${t.native}
              </div>
              <div class="local-roman">${t.transliteration}</div>
            </div>`;
        }).join("")}
      </div>
      <p class="local-hint">Show this screen to a local</p>`;

    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  document.getElementById("local-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeLocal();
  });
  document.getElementById("local-close").addEventListener("click", closeLocal);

  function closeLocal() {
    document.getElementById("local-overlay").classList.add("hidden");
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLocal();
  });

  // ── Share phrase ──
  window.sharePhrase = function(english, phrase) {
    const langs = ["japanese", "arabic", "kannada", "malayalam"];
    const names  = { japanese: "Japanese", arabic: "Arabic", kannada: "Kannada", malayalam: "Malayalam" };
    let text = `"${english}"\n\n`;
    langs.forEach(lang => {
      if (phrase[lang]?.native) {
        text += `${names[lang]}:\n${phrase[lang].native}\n(${phrase[lang].transliteration})\n\n`;
      }
    });
    text += "Translated by Multilingual Translator — Built by CVA";

    if (navigator.share) {
      navigator.share({ title: "Translation", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        showToast("Copied to clipboard!");
      });
    }
  };

  function showToast(msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText = `
        position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);
        background:var(--accent);color:#fff;padding:0.6rem 1.4rem;
        border-radius:99px;font-size:0.85rem;font-weight:500;
        z-index:9999;transition:opacity 0.3s;`;
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    setTimeout(() => { t.style.opacity = "0"; }, 2200);
  }
});
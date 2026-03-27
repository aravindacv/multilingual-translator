document.addEventListener("DOMContentLoaded", () => {

  // ── Tab switching ──────────────────────────────────────────────────────────
  const tabIds = ["translator","traveler","conversation"];
  tabIds.forEach(id => {
    document.getElementById(`tab-${id}`).addEventListener("click", () => switchTab(id));
  });
  function switchTab(active) {
    tabIds.forEach(id => {
      document.getElementById(`tab-${id}`).classList.toggle("tab-active", id===active);
      document.getElementById(`panel-${id}`).classList.toggle("hidden", id!==active);
    });
    if (active==="traveler")     buildTraveler();
    if (active==="conversation") initConversation();
  }

  // ── TRANSLATOR ─────────────────────────────────────────────────────────────
  const input    = document.getElementById("english-input");
  const btn      = document.getElementById("translate-btn");
  const clearBtn = document.getElementById("clear-btn");
  const charCount= document.getElementById("char-count");
  const results  = document.getElementById("results");
  const loader   = document.getElementById("loader");
  const errorBox = document.getElementById("error-box");

  input.addEventListener("input", () => {
    const len = input.value.length;
    charCount.textContent = `${len} / ${CONFIG.MAX_INPUT_LENGTH}`;
    charCount.style.color = len > CONFIG.MAX_INPUT_LENGTH ? "#dc2626" : "";
  });
  btn.addEventListener("click", handleTranslate);
  input.addEventListener("keydown", e => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleTranslate();} });
  clearBtn.addEventListener("click", () => {
    input.value=""; charCount.textContent=`0 / ${CONFIG.MAX_INPUT_LENGTH}`;
    results.classList.add("hidden"); errorBox.classList.add("hidden"); input.focus();
  });

  async function handleTranslate() {
    const text = input.value.trim();
    if (!text) { showError("Please enter a word or phrase."); return; }
    if (text.length > CONFIG.MAX_INPUT_LENGTH) { showError(`Max ${CONFIG.MAX_INPUT_LENGTH} characters.`); return; }
    errorBox.classList.add("hidden"); results.classList.add("hidden"); showLoader(true);
    try {
      let data=null, source="";
      data=lookupDictionary(text); if(data) source="dictionary";
      if(!data){data=CACHE.get(text); if(data) source="cache";}
      if(!data){
        const raw=await translateAll(text);
        if(!raw.japanese&&!raw.arabic&&!raw.kannada&&!raw.malayalam&&!raw.hindi)
          throw new Error("No translations returned. Check your internet connection.");
        data=transliterateAll(raw); CACHE.set(text,data); source="api";
      }
      renderResults(text,data,source);
    } catch(err){ showError("Translation failed: "+(err.message||"Unknown error")); }
    finally { showLoader(false); }
  }

  function renderResults(originalText, data, source) {
    document.getElementById("original-text").textContent = originalText;
    const badge = document.getElementById("source-badge");
    badge.textContent = source==="dictionary"?"From dictionary":source==="cache"?"From cache":"Translated live";
    badge.className = "source-badge badge-"+source;
    ["japanese","arabic","kannada","malayalam","hindi"].forEach(lang => {
      const card  = document.getElementById(`card-${lang}`);
      const native= card.querySelector(".native-script");
      const roman = card.querySelector(".transliteration");
      const entry = data[lang];
      if(entry&&entry.native&&entry.native.trim()){
        native.textContent=entry.native; roman.textContent=entry.transliteration||"—";
        card.classList.remove("card-unavailable");
      } else { native.textContent="—"; roman.textContent="Not available"; card.classList.add("card-unavailable"); }
    });
    results.classList.remove("hidden");
    results.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function showLoader(v){loader.classList.toggle("hidden",!v);btn.disabled=v;btn.textContent=v?"Translating…":"Translate";}
  function showError(msg){errorBox.textContent=msg;errorBox.classList.remove("hidden");showLoader(false);}

  // ── TRAVELER ───────────────────────────────────────────────────────────────
  let activeSituation="Hotel",activeLang="all",travelerBuilt=false;
  function buildTraveler(){
    if(travelerBuilt)return; travelerBuilt=true;
    const sitBar=document.getElementById("situation-bar");
    const langBar=document.getElementById("traveler-lang-bar");
    Object.keys(TRAVELER_PHRASES).forEach(sit=>{
      const b=document.createElement("button");
      b.className="sit-btn"+(sit===activeSituation?" sit-active":"");
      b.innerHTML=`<span>${TRAVELER_PHRASES[sit].icon}</span> ${sit}`;
      b.addEventListener("click",()=>{activeSituation=sit;document.querySelectorAll(".sit-btn").forEach(x=>x.classList.remove("sit-active"));b.classList.add("sit-active");renderPhrases();});
      sitBar.appendChild(b);
    });
    [{key:"all",label:"All"},{key:"japanese",label:"Japanese"},{key:"arabic",label:"Arabic"},
     {key:"kannada",label:"Kannada"},{key:"malayalam",label:"Malayalam"},{key:"hindi",label:"Hindi"}].forEach(l=>{
      const b=document.createElement("button");
      b.className="lang-filter-btn"+(l.key===activeLang?" lang-filter-active":"");
      b.textContent=l.label;
      b.addEventListener("click",()=>{activeLang=l.key;document.querySelectorAll(".lang-filter-btn").forEach(x=>x.classList.remove("lang-filter-active"));b.classList.add("lang-filter-active");renderPhrases();});
      langBar.appendChild(b);
    });
    renderPhrases();
  }
  function renderPhrases(){
    const list=document.getElementById("phrase-list"); list.innerHTML="";
    const phrases=TRAVELER_PHRASES[activeSituation]?.phrases||[];
    const fonts={japanese:"Noto Sans JP",arabic:"Noto Sans Arabic",kannada:"Noto Sans Kannada",malayalam:"Noto Sans Malayalam",hindi:"Noto Sans Devanagari"};
    const names={japanese:"Japanese 🇯🇵",arabic:"Arabic 🇸🇦",kannada:"Kannada 🇮🇳",malayalam:"Malayalam 🇮🇳",hindi:"Hindi 🇮🇳"};
    phrases.forEach(phrase=>{
      const card=document.createElement("div"); card.className="phrase-card";
      const langs=activeLang==="all"?["japanese","arabic","kannada","malayalam","hindi"]:[activeLang];
      const langHTML=langs.map(lang=>{
        const t=phrase[lang]; if(!t)return"";
        const dir=lang==="arabic"?'dir="rtl"':"";
        return`<div class="phrase-lang-block"><div class="phrase-lang-label">${names[lang]}</div><div class="phrase-native" style="font-family:'${fonts[lang]}',sans-serif" ${dir}>${t.native}</div><div class="phrase-roman">${t.transliteration}</div></div>`;
      }).join("");
      card.innerHTML=`<div class="phrase-english"><span class="phrase-en-icon">EN</span><span class="phrase-en-text">${phrase.en}</span></div><div class="phrase-langs">${langHTML}</div><div class="phrase-actions"><button class="phrase-show-btn" onclick="showToLocal(${JSON.stringify(phrase).replace(/"/g,'&quot;')})">Show to Local</button><button class="phrase-share-btn" onclick="sharePhrase(${JSON.stringify(phrase.en).replace(/"/g,'&quot;')},${JSON.stringify(phrase).replace(/"/g,'&quot;')})">Share</button></div>`;
      list.appendChild(card);
    });
  }
  window.showToLocal=function(phrase){
    const overlay=document.getElementById("local-overlay");
    const content=document.getElementById("local-content");
    const langs=["japanese","arabic","kannada","malayalam","hindi"];
    const fonts={japanese:"Noto Sans JP",arabic:"Noto Sans Arabic",kannada:"Noto Sans Kannada",malayalam:"Noto Sans Malayalam",hindi:"Noto Sans Devanagari"};
    const colors={japanese:"#c0392b",arabic:"#0e7b72",kannada:"#7e34a8",malayalam:"#1e6fa8",hindi:"#e07b00"};
    content.innerHTML=`<div class="local-english">${phrase.en}</div><div class="local-scripts">${langs.map(lang=>{const t=phrase[lang];if(!t||!t.native)return"";const dir=lang==="arabic"?'dir="rtl"':"";return`<div class="local-script-block"><div class="local-native" style="font-family:'${fonts[lang]}',sans-serif;color:${colors[lang]};" ${dir}>${t.native}</div><div class="local-roman">${t.transliteration}</div></div>`;}).join("")}</div><p class="local-hint">Show this screen to a local</p>`;
    overlay.classList.remove("hidden"); document.body.style.overflow="hidden";
  };
  document.getElementById("local-overlay").addEventListener("click",e=>{if(e.target===e.currentTarget)closeLocal();});
  document.getElementById("local-close").addEventListener("click",closeLocal);
  function closeLocal(){document.getElementById("local-overlay").classList.add("hidden");document.body.style.overflow="";}
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLocal();});
  window.sharePhrase=function(english,phrase){
    const langs=["japanese","arabic","kannada","malayalam","hindi"];
    const names={japanese:"Japanese",arabic:"Arabic",kannada:"Kannada",malayalam:"Malayalam",hindi:"Hindi"};
    let text=`"${english}"\n\n`;
    langs.forEach(lang=>{if(phrase[lang]?.native)text+=`${names[lang]}:\n${phrase[lang].native}\n(${phrase[lang].transliteration})\n\n`;});
    text+="Translated by Multilingual Translator — Built by CVA";
    if(navigator.share)navigator.share({title:"Translation",text}).catch(()=>{});
    else navigator.clipboard.writeText(text).then(()=>showToast("Copied to clipboard!"));
  };

  // ── INTELLIGENT CONVERSATION MODE ──────────────────────────────────────────
  let convLang="hindi", convInited=false, isListening=false, recognition=null;
  const LANG_CODES={japanese:"ja-JP",arabic:"ar-SA",kannada:"kn-IN",malayalam:"ml-IN",hindi:"hi-IN"};
  const LANG_NAMES={japanese:"Japanese",arabic:"Arabic",kannada:"Kannada",malayalam:"Malayalam",hindi:"Hindi"};
  const SCRIPT_FONTS={japanese:"Noto Sans JP",arabic:"Noto Sans Arabic",kannada:"Noto Sans Kannada",malayalam:"Noto Sans Malayalam",hindi:"Noto Sans Devanagari"};

  function detectLanguage(text) {
    for(const ch of text){
      const cp=ch.codePointAt(0);
      if(cp>=0x0600&&cp<=0x06FF) return "arabic";
      if((cp>=0x3040&&cp<=0x30FF)||(cp>=0x4E00&&cp<=0x9FFF)) return "japanese";
      if(cp>=0x0C80&&cp<=0x0CFF) return "kannada";
      if(cp>=0x0D00&&cp<=0x0D7F) return "malayalam";
      if(cp>=0x0900&&cp<=0x097F) return "hindi";
    }
    return "english";
  }

  function initConversation(){
    if(convInited)return; convInited=true;
    const selector=document.getElementById("conv-lang-selector");
    ["hindi","arabic","japanese","kannada","malayalam"].forEach(lang=>{
      const opt=document.createElement("option");
      opt.value=lang; opt.textContent=LANG_NAMES[lang];
      selector.appendChild(opt);
    });
    selector.value=convLang;
    selector.addEventListener("change",()=>{convLang=selector.value;updateConvUI();clearConversation();});
    updateConvUI();
    document.getElementById("conv-mic-btn").addEventListener("click",toggleListening);
    document.getElementById("conv-send-en").addEventListener("click",()=>sendManual("english"));
    document.getElementById("conv-send-local").addEventListener("click",()=>sendManual("local"));
    document.getElementById("conv-input-en").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendManual("english");}});
    document.getElementById("conv-input-local").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendManual("local");}});
    document.getElementById("conv-clear").addEventListener("click",clearConversation);
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){document.getElementById("conv-mic-btn").disabled=true;document.getElementById("conv-voice-note").classList.remove("hidden");}
  }

  function updateConvUI(){
    document.getElementById("conv-local-label").textContent=LANG_NAMES[convLang];
    document.getElementById("conv-input-local").placeholder=`Type in ${LANG_NAMES[convLang]}…`;
    const flags={japanese:"🇯🇵",arabic:"🇸🇦",kannada:"🇮🇳",malayalam:"🇮🇳",hindi:"🇮🇳"};
    document.getElementById("conv-local-flag").textContent=flags[convLang];
  }

  async function processText(text){
    if(!text.trim())return;
    const detected=detectLanguage(text);
    const isEnglish=detected==="english";
    if(isEnglish){
      addBubble("en",text,null,true);
      try{
        let native="",roman="";
        const dict=lookupDictionary(text);
        if(dict&&dict[convLang]){native=dict[convLang].native;roman=dict[convLang].transliteration;}
        else{
          const cached=CACHE.get(text);
          if(cached&&cached[convLang]){native=cached[convLang].native;roman=cached[convLang].transliteration;}
          else{const raw=await translateAll(text);const data=transliterateAll(raw);CACHE.set(text,data);native=data[convLang]?.native||"";roman=data[convLang]?.transliteration||"";}
        }
        updateLastBubble("en",native,roman);
        if(native){speakText(native,LANG_CODES[convLang]);setMicState("speaking-local");setTimeout(()=>setMicState("idle"),2500);}
      }catch(e){updateLastBubble("en","Translation failed","");}
    } else {
      addBubble("local",text,null,true);
      try{
        const lc=CONFIG.TARGET_LANGS[convLang];
        const url=`${CONFIG.MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=${lc}|en`;
        const res=await fetch(url); const data=await res.json();
        const eng=data?.responseData?.translatedText||"Could not translate";
        updateLastBubble("local",eng,text);
        if(eng){speakText(eng,"en-US");setMicState("speaking-en");setTimeout(()=>setMicState("idle"),2500);}
      }catch(e){updateLastBubble("local","Translation failed","");}
    }
  }

  function toggleListening(){if(isListening){stopListening();return;}startListening();}
  function startListening(){
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR)return;
    const feed=document.getElementById("conv-feed");
    const bubbles=feed.querySelectorAll(".conv-bubble");
    let listenLang="en-US";
    if(bubbles.length>0){const last=bubbles[bubbles.length-1];if(last.classList.contains("bubble-from-en"))listenLang=LANG_CODES[convLang];}
    recognition=new SR(); recognition.lang=listenLang; recognition.continuous=false; recognition.interimResults=true;
    recognition.onstart=()=>{isListening=true;setMicState("listening");};
    recognition.onresult=(e)=>{
      const t=Array.from(e.results).map(r=>r[0].transcript).join("");
      document.getElementById("conv-interim").textContent=t;
      if(e.results[e.results.length-1].isFinal){document.getElementById("conv-interim").textContent="";stopListening();processText(t);}
    };
    recognition.onerror=()=>stopListening();
    recognition.onend=()=>{isListening=false;setMicState("idle");};
    recognition.start();
  }
  function stopListening(){if(recognition){try{recognition.stop();}catch(e){}}isListening=false;setMicState("idle");document.getElementById("conv-interim").textContent="";}
  function setMicState(state){
    const btn=document.getElementById("conv-mic-btn");
    const label=document.getElementById("conv-mic-label");
    const ring=document.getElementById("conv-mic-ring");
    btn.classList.remove("mic-listening","mic-speaking-local","mic-speaking-en");
    if(state==="listening"){btn.classList.add("mic-listening");label.textContent="Listening…";ring.classList.add("ring-active");}
    else if(state==="speaking-local"){btn.classList.add("mic-speaking-local");label.textContent=`Speaking ${LANG_NAMES[convLang]}…`;ring.classList.remove("ring-active");}
    else if(state==="speaking-en"){btn.classList.add("mic-speaking-en");label.textContent="Speaking English…";ring.classList.remove("ring-active");}
    else{label.textContent="Tap to Speak";ring.classList.remove("ring-active");}
  }
  async function sendManual(side){
    const el=document.getElementById(side==="english"?"conv-input-en":"conv-input-local");
    const text=el.value.trim(); if(!text)return; el.value=""; await processText(text);
  }
  function addBubble(side,originalText,translated,loading){
    const feed=document.getElementById("conv-feed");
    const div=document.createElement("div");
    const isEn=side==="en";
    div.className=`conv-bubble ${isEn?"bubble-from-en":"bubble-from-local"}`;
    div.innerHTML=`
      <div class="bubble-speaker-label">${isEn?"🇬🇧 You (English)":`${document.getElementById("conv-local-flag").textContent} ${LANG_NAMES[convLang]}`}</div>
      <div class="bubble-original">${originalText}</div>
      <div class="bubble-arrow">${isEn?"↓ in "+LANG_NAMES[convLang]:"↓ in English"}</div>
      <div class="bubble-translated ${isEn?"conv-native-text":""}"
           ${isEn&&convLang==="arabic"?'dir="rtl"':""}
           style="${isEn?`font-family:'${SCRIPT_FONTS[convLang]}',sans-serif`:""}">
        ${loading?'<span class="conv-dots"><span></span><span></span><span></span></span>':(translated||"")}
      </div>`;
    feed.appendChild(div); feed.scrollTop=feed.scrollHeight;
  }
  function updateLastBubble(side,translated,sub){
    const feed=document.getElementById("conv-feed");
    const cls=side==="en"?"bubble-from-en":"bubble-from-local";
    const bubbles=feed.querySelectorAll("."+cls);
    if(!bubbles.length)return;
    const last=bubbles[bubbles.length-1];
    const el=last.querySelector(".bubble-translated");
    if(el)el.innerHTML=translated||"—";
    feed.scrollTop=feed.scrollHeight;
  }
  function clearConversation(){
    document.getElementById("conv-feed").innerHTML="";
    document.getElementById("conv-input-en").value="";
    document.getElementById("conv-input-local").value="";
    document.getElementById("conv-interim").textContent="";
    setMicState("idle"); if(isListening)stopListening();
  }
  function speakText(text,lang){
    if(!("speechSynthesis" in window))return;
    window.speechSynthesis.cancel();
    const utt=new SpeechSynthesisUtterance(text);
    utt.lang=lang; utt.rate=0.88; utt.volume=1;
    const voices=window.speechSynthesis.getVoices();
    const match=voices.find(v=>v.lang===lang)||voices.find(v=>v.lang.startsWith(lang.split("-")[0]));
    if(match)utt.voice=match;
    window.speechSynthesis.speak(utt);
  }
  function showToast(msg){
    let t=document.getElementById("toast");
    if(!t){t=document.createElement("div");t.id="toast";t.style.cssText=`position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--accent);color:#fff;padding:0.6rem 1.4rem;border-radius:99px;font-size:0.85rem;font-weight:500;z-index:9999;transition:opacity 0.3s;`;document.body.appendChild(t);}
    t.textContent=msg;t.style.opacity="1";
    setTimeout(()=>{t.style.opacity="0";},2200);
  }
});
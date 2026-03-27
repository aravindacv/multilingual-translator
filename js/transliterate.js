// ─────────────────────────────────────────────────────────────────────────────
// JAPANESE  — Kanji word map (longest match first) + Kana map
// ─────────────────────────────────────────────────────────────────────────────
const KANJI = {
  // ── Progressive / te-iru forms (6-char first, then shorter) ──
  "住んでいます":"sunde imasu",   "住んでいる":"sunde iru",   "住んで":"sunde",   "住む":"sumu",   "住":"sumu",
  "行っています":"itte imasu",    "行っている":"itte iru",    "行って":"itte",
  "来ています":"kite imasu",      "来ている":"kite iru",      "来て":"kite",
  "食べています":"tabete imasu",  "食べている":"tabete iru",  "食べて":"tabete",
  "飲んでいます":"nonde imasu",   "飲んでいる":"nonde iru",   "飲んで":"nonde",
  "見ています":"mite imasu",      "見ている":"mite iru",      "見て":"mite",
  "聞いています":"kiite imasu",   "聞いている":"kiite iru",   "聞いて":"kiite",
  "聴いています":"kiite imasu",   "聴いている":"kiite iru",   "聴いて":"kiite",
  "話しています":"hanashite imasu","話している":"hanashite iru","話して":"hanashite",
  "帰っています":"kaette imasu",  "帰っている":"kaette iru",  "帰って":"kaette",
  "起きています":"okite imasu",   "起きている":"okite iru",   "起きて":"okite",
  "寝ています":"nete imasu",      "寝ている":"nete iru",      "寝て":"nete",
  "待っています":"matte imasu",   "待っている":"matte iru",   "待って":"matte",
  "会っています":"atte imasu",    "会っている":"atte iru",    "会って":"atte",
  "買っています":"katte imasu",   "買っている":"katte iru",   "買って":"katte",
  "走っています":"hashitte imasu","走っている":"hashitte iru","走って":"hashitte",
  "知っています":"shitte imasu",  "知っている":"shitte iru",  "知って":"shitte",
  "持っています":"motte imasu",   "持っている":"motte iru",   "持って":"motte",
  "使っています":"tsukatte imasu","使っている":"tsukatte iru","使って":"tsukatte",
  "作っています":"tsukutte imasu","作っている":"tsukutte iru","作って":"tsukutte",
  "働いています":"hataraite imasu","働いている":"hataraite iru","働いて":"hataraite",
  "遊んでいます":"asonde imasu",  "遊んでいる":"asonde iru",  "遊んで":"asonde",
  "休んでいます":"yasunde imasu", "休んでいる":"yasunde iru", "休んで":"yasunde",
  "歌っています":"utatte imasu",  "歌っている":"utatte iru",  "歌って":"utatte",
  "泳いでいます":"oyoide imasu",  "泳いでいる":"oyoide iru",  "泳いで":"oyoide",
  "愛しています":"aishite imasu", "愛している":"aishite iru", "愛して":"aishite",
  "笑っています":"waratte imasu", "笑っている":"waratte iru", "笑って":"waratte",
  "泣いています":"naite imasu",   "泣いている":"naite iru",   "泣いて":"naite",
  "疲れています":"tsukarete imasu","疲れている":"tsukarete iru","疲れて":"tsukarete",
  "困っています":"komatte imasu", "困っている":"komatte iru", "困って":"komatte",
  "驚いて":"odoroite",
  "生きています":"ikite imasu",   "生きている":"ikite iru",   "生きて":"ikite",
  "勉強しています":"benkyo shite imasu","勉強している":"benkyo shite iru","勉強して":"benkyo shite",
  "仕事しています":"shigoto shite imasu","仕事している":"shigoto shite iru",
  // ── Common verb infinitives ──
  "食べる":"taberu","飲む":"nomu","見る":"miru","聞く":"kiku","聴く":"kiku",
  "話す":"hanasu","帰る":"kaeru","起きる":"okiru","寝る":"neru","待つ":"matsu",
  "会う":"au","買う":"kau","売る":"uru","走る":"hashiru","知る":"shiru",
  "思う":"omou","言う":"iu","書く":"kaku","読む":"yomu","教える":"oshieru",
  "働く":"hataraku","遊ぶ":"asobu","休む":"yasumu","歌う":"utau","泳ぐ":"oyogu",
  "生きる":"ikiru","死ぬ":"shinu","笑う":"warau","泣く":"naku",
  "愛する":"ai suru","好む":"konomu","嫌う":"kirau",
  "疲れる":"tsukareru","困る":"komaru","驚く":"odoroku",
  "持つ":"motsu","使う":"tsukau","作る":"tsukuru","出る":"deru","入る":"hairu",
  // ── Te-form endings (no kanji) ──
  "として":"toshite","について":"nitsuite","によって":"niyotte",
  "います":"imasu","あります":"arimasu","ください":"kudasai",
  "している":"shite iru","していた":"shite ita","します":"shimasu",
  "でした":"deshita","でしょう":"deshou","ました":"mashita","ません":"masen",
  "ている":"te iru","ていた":"te ita","ていて":"te ite",
  "てしまう":"te shimau","てしまった":"te shimatta",
  "てみる":"te miru","てくる":"te kuru","ていく":"te iku",
  // ── Multi-char compound words ──
  "名前":"namae","仕事":"shigoto","日本語":"nihongo","英語":"eigo",
  "中国語":"chuugokugo","韓国語":"kankokugo","言語":"gengo",
  "日本":"nihon","東京":"toukyou","大阪":"osaka","京都":"kyoto",
  "友達":"tomodachi","家族":"kazoku","子供":"kodomo","食べ物":"tabemono",
  "電車":"densha","飛行機":"hikouki","病院":"byouin","学校":"gakkou",
  "先生":"sensei","教師":"kyoushi","学生":"gakusei","医者":"isha",
  "音楽":"ongaku","映画":"eiga","世界":"sekai","時間":"jikan",
  "昨日":"kinou","今日":"kyou","明日":"ashita",
  "勉強":"benkyo","運動":"undou","旅行":"ryokou","料理":"ryouri",
  "天気":"tenki","国際":"kokusai","文化":"bunka",
  "大学":"daigaku","会社":"kaisha","銀行":"ginkou","図書館":"toshokan",
  "公園":"kouen","空港":"kuukou","郵便局":"yuubinkyoku","警察":"keisatsu",
  "楽しい":"tanoshii","楽しく":"tanoshiku","悲しい":"kanashii",
  "嬉しい":"ureshii","難しい":"muzukashii","面白い":"omoshiroi",
  "大切":"taisetsu","有名":"yuumei","簡単":"kantan","退屈":"taikutsu",
  "好き":"suki","嫌い":"kirai",
  // ── Single kanji ──
  "語":"go","私":"watashi","僕":"boku","俺":"ore","彼":"kare","彼女":"kanojo",
  "人":"hito","国":"kuni","日":"nichi","年":"nen","月":"tsuki",
  "時":"toki","今":"ima","前":"mae","後":"ato","中":"naka","上":"ue","下":"shita",
  "大":"dai","小":"shou","新":"shin","古":"ko","高":"kou","安":"an","良":"yoi",
  "食":"shoku","飲":"in","見":"mi","行":"i","来":"ki",
  "帰":"kaeri","起":"oki","寝":"ne","待":"machi","会":"ai",
  "買":"kai","売":"uri","走":"hashiri","知":"shiri","思":"omoi","言":"i",
  "書":"kaki","読":"yomi","聞":"kiki","聴":"kiki","話":"hanashi",
  "教":"oshi","働":"hataraki","遊":"aso","持":"mochi","使":"tsukai",
  "作":"tsukuri","出":"de","入":"iri","住":"sumu","生":"i","死":"shi",
  "笑":"wara","泣":"nai","愛":"ai","好":"su","嫌":"kira",
  "楽":"tano","悲":"kana","怒":"oko","疲":"tsuka","休":"yasu",
  "歌":"uta","泳":"oyo","走":"hashiru",
  "店":"mise","駅":"eki","道":"michi","家":"ie","本":"hon",
  "水":"mizu","酒":"sake","茶":"cha","薬":"kusuri",
  "男":"otoko","女":"onna","子":"ko","親":"oya","父":"chichi","母":"haha",
  "兄":"ani","姉":"ane","弟":"otouto","妹":"imouto",
  "頭":"atama","目":"me","耳":"mimi","口":"kuchi","手":"te",
  "足":"ashi","心":"kokoro","体":"karada","顔":"kao",
  "海":"umi","山":"yama","川":"kawa","空":"sora","花":"hana","木":"ki",
  "一":"ichi","二":"ni","三":"san","四":"shi","五":"go",
  "六":"roku","七":"nana","八":"hachi","九":"kyuu","十":"juu",
  "百":"hyaku","千":"sen","万":"man",
  "朝":"asa","昼":"hiru","夜":"yoru","週":"shuu",
};

const KANA = {
  // Hiragana digraphs
  "きゃ":"kya","きゅ":"kyu","きょ":"kyo","しゃ":"sha","しゅ":"shu","しょ":"sho",
  "ちゃ":"cha","ちゅ":"chu","ちょ":"cho","にゃ":"nya","にゅ":"nyu","にょ":"nyo",
  "ひゃ":"hya","ひゅ":"hyu","ひょ":"hyo","みゃ":"mya","みゅ":"myu","みょ":"myo",
  "りゃ":"rya","りゅ":"ryu","りょ":"ryo","ぎゃ":"gya","ぎゅ":"gyu","ぎょ":"gyo",
  "じゃ":"ja","じゅ":"ju","じょ":"jo","びゃ":"bya","びゅ":"byu","びょ":"byo",
  "ぴゃ":"pya","ぴゅ":"pyu","ぴょ":"pyo",
  // Hiragana singles
  "あ":"a","い":"i","う":"u","え":"e","お":"o",
  "か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko",
  "さ":"sa","し":"shi","す":"su","せ":"se","そ":"so",
  "た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to",
  "な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no",
  "は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho",
  "ま":"ma","み":"mi","む":"mu","め":"me","も":"mo",
  "や":"ya","ゆ":"yu","よ":"yo",
  "ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro",
  "わ":"wa","を":"wo","ん":"n",
  "が":"ga","ぎ":"gi","ぐ":"gu","げ":"ge","ご":"go",
  "ざ":"za","じ":"ji","ず":"zu","ぜ":"ze","ぞ":"zo",
  "だ":"da","ぢ":"ji","づ":"zu","で":"de","ど":"do",
  "ば":"ba","び":"bi","ぶ":"bu","べ":"be","ぼ":"bo",
  "ぱ":"pa","ぴ":"pi","ぷ":"pu","ぺ":"pe","ぽ":"po",
  "っ":"tt","ー":"-","、":", ","。":". ","・":" ",
  // Katakana digraphs
  "キャ":"kya","キュ":"kyu","キョ":"kyo","シャ":"sha","シュ":"shu","ショ":"sho",
  "チャ":"cha","チュ":"chu","チョ":"cho","ニャ":"nya","ニュ":"nyu","ニョ":"nyo",
  "ヒャ":"hya","ヒュ":"hyu","ヒョ":"hyo","ミャ":"mya","ミュ":"myu","ミョ":"myo",
  "リャ":"rya","リュ":"ryu","リョ":"ryo","ギャ":"gya","ギュ":"gyu","ギョ":"gyo",
  "ジャ":"ja","ジュ":"ju","ジョ":"jo","ビャ":"bya","ビュ":"byu","ビョ":"byo",
  "ピャ":"pya","ピュ":"pyu","ピョ":"pyo",
  "ファ":"fa","フィ":"fi","フェ":"fe","フォ":"fo","ウィ":"wi","ウェ":"we",
  "ティ":"ti","ディ":"di",
  // Katakana singles
  "ア":"a","イ":"i","ウ":"u","エ":"e","オ":"o",
  "カ":"ka","キ":"ki","ク":"ku","ケ":"ke","コ":"ko",
  "サ":"sa","シ":"shi","ス":"su","セ":"se","ソ":"so",
  "タ":"ta","チ":"chi","ツ":"tsu","テ":"te","ト":"to",
  "ナ":"na","ニ":"ni","ヌ":"nu","ネ":"ne","ノ":"no",
  "ハ":"ha","ヒ":"hi","フ":"fu","ヘ":"he","ホ":"ho",
  "マ":"ma","ミ":"mi","ム":"mu","メ":"me","モ":"mo",
  "ヤ":"ya","ユ":"yu","ヨ":"yo",
  "ラ":"ra","リ":"ri","ル":"ru","レ":"re","ロ":"ro",
  "ワ":"wa","ヲ":"wo","ン":"n",
  "ガ":"ga","ギ":"gi","グ":"gu","ゲ":"ge","ゴ":"go",
  "ザ":"za","ジ":"ji","ズ":"zu","ゼ":"ze","ゾ":"zo",
  "ダ":"da","ヂ":"ji","ヅ":"zu","デ":"de","ド":"do",
  "バ":"ba","ビ":"bi","ブ":"bu","ベ":"be","ボ":"bo",
  "パ":"pa","ピ":"pi","プ":"pu","ペ":"pe","ポ":"po",
  "ッ":"tt","ヴ":"v",
};

function japaneseToRomaji(text) {
  if (!text) return "";
  const chars = [...text];
  let result = "", i = 0;
  while (i < chars.length) {
    let matched = false;
    // Try kanji — longest match first (up to 8 chars for compound verb forms)
    for (let len = 8; len >= 1; len--) {
      const chunk = chars.slice(i, i + len).join("");
      if (KANJI[chunk]) {
        // Add space before if last char wasn't a space
        if (result.length > 0 && result[result.length - 1] !== " ") {
          result += " ";
        }
        result += KANJI[chunk] + " ";
        i += len;
        matched = true;
        break;
      }
    }
    if (matched) continue;
    // Try kana digraph (2 chars)
    const two = chars[i] + (chars[i + 1] || "");
    if (KANA[two]) { result += KANA[two]; i += 2; continue; }
    // Try kana single
    if (KANA[chars[i]]) { result += KANA[chars[i]]; i++; continue; }
    // ASCII / foreign names / punctuation — keep as-is
    result += chars[i]; i++;
  }
  return result.replace(/\s+/g, " ").trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// ARABIC → Latin  (char map + word-level vowel restoration)
// ─────────────────────────────────────────────────────────────────────────────
const AR_WORDS = {
  "mrhba":"marhaba","mrhb":"marhab","sbah":"sabah","msaa":"masa","msa":"masa",
  "asmy":"ismi","asmk":"ismuk","khyr":"khayr",
  "shkra":"shukran","shkr":"shukr",
  "lljmy":"lil-jami","llmy":"lil-jami","ljmy":"lijami",
  "aml":"amal","kmdrs":"ka-mudarris","mdrs":"mudarris",
  "mdrsa":"madrasa","kthyr":"kathir","jmyl":"jamil",
  "kbyr":"kabir","sghyr":"saghir","byt":"bayt",
  "hyf":"kayfa","kyf":"kayfa",
  "arafynda":"aravinda","arafnda":"aravinda",
  "tsbh":"tusbih","wdaa":"wada","wdaaan":"wadaan",
  "ahla":"ahlan","wsahla":"wa-sahlan",
  "mn":"min","fy":"fi","maa":"ma","laa":"la","naam":"naem",
  "aysh":"aysh","dwla":"dawla","yman":"uman","oman":"oman",
  "aysh":"aish","fydwla":"fi dawla","dwlh":"dawla",
};

const AR_CHARS = {
  "\u0627":"a","\u0623":"a","\u0625":"i","\u0622":"aa","\u0671":"a",
  "\u0628":"b","\u062a":"t","\u062b":"th","\u062c":"j",
  "\u062d":"h","\u062e":"kh","\u062f":"d","\u0630":"dh",
  "\u0631":"r","\u0632":"z","\u0633":"s","\u0634":"sh",
  "\u0635":"s","\u0636":"d","\u0637":"t","\u0638":"z",
  "\u0639":"","\u063a":"gh","\u0641":"f","\u0642":"q",
  "\u0643":"k","\u0644":"l","\u0645":"m","\u0646":"n",
  "\u0647":"h","\u0648":"w","\u064a":"y","\u0649":"a",
  "\u0629":"a","\u0621":"","\u0626":"","\u0624":"",
  "\u064e":"a","\u064f":"u","\u0650":"i",
  "\u064b":"an","\u064c":"un","\u064d":"in",
  "\u0651":"","\u0652":"","\u0653":"","\u0654":"",
  "\u0655":"","\u0656":"","\u0657":"","\u0658":"",
  "\u0640":"","\u0670":"a",
  "\u067e":"p","\u0686":"ch","\u06af":"g","\u06cc":"y",
  " ":" ","\u060c":" ","\u061b":" ","\u061f":"?",
};

function arabicToLatin(text) {
  if (!text) return "";
  let s = text.replace(/\u0627\u0644/g, "al-").replace(/\u0644\u0627/g, "la");
  let out = [...s].map(ch => AR_CHARS[ch] !== undefined ? AR_CHARS[ch] : ch).join("");
  out = out.replace(/al--/g, "al-").replace(/\s+/g, " ").trim();
  return out.split(" ").map(w => {
    const clean = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
    return AR_WORDS[clean] || AR_WORDS[w.toLowerCase()] || w;
  }).join(" ");
}

// ─────────────────────────────────────────────────────────────────────────────
// KANNADA → Roman  (proper abugida algorithm)
// ─────────────────────────────────────────────────────────────────────────────
const KN_C = {
  "\u0c95":"k","\u0c96":"kh","\u0c97":"g","\u0c98":"gh","\u0c99":"n",
  "\u0c9a":"ch","\u0c9b":"chh","\u0c9c":"j","\u0c9d":"jh","\u0c9e":"ny",
  "\u0c9f":"t","\u0ca0":"th","\u0ca1":"d","\u0ca2":"dh","\u0ca3":"n",
  "\u0ca4":"t","\u0ca5":"th","\u0ca6":"d","\u0ca7":"dh","\u0ca8":"n",
  "\u0caa":"p","\u0cab":"ph","\u0cac":"b","\u0cad":"bh","\u0cae":"m",
  "\u0caf":"y","\u0cb0":"r","\u0cb2":"l","\u0cb5":"v",
  "\u0cb6":"sh","\u0cb7":"sh","\u0cb8":"s","\u0cb9":"h","\u0cb3":"l","\u0cbb":"r",
};
const KN_V = {
  "\u0cbe":"a","\u0cbf":"i","\u0cc0":"i","\u0cc1":"u","\u0cc2":"u",
  "\u0cc6":"e","\u0cc7":"e","\u0cc8":"ai","\u0cca":"o","\u0ccb":"o","\u0ccc":"au",
};
const KN_IV = {
  "\u0c85":"a","\u0c86":"a","\u0c87":"i","\u0c88":"i",
  "\u0c89":"u","\u0c8a":"u","\u0c8e":"e","\u0c8f":"e",
  "\u0c90":"ai","\u0c92":"o","\u0c93":"o","\u0c94":"au",
};

function kannadaToRoman(text) {
  if (!text) return "";
  const VIR = "\u0ccd", ANS = "\u0c82", VIS = "\u0c83";
  const chars = [...text];
  let result = "", i = 0;
  while (i < chars.length) {
    const ch = chars[i], nxt = chars[i+1] || "";
    if (ch in KN_IV)   { result += KN_IV[ch]; i++; continue; }
    if (ch in KN_C) {
      const c = KN_C[ch];
      if (nxt === VIR)      { result += c; i += 2; }
      else if (nxt in KN_V) { result += c + KN_V[nxt]; i += 2; }
      else                  { result += c + "a"; i++; }
      continue;
    }
    if (ch === ANS) { result += "m"; i++; continue; }
    if (ch === VIS) { result += "h"; i++; continue; }
    if (ch === VIR) { i++; continue; }
    result += ch === " " ? " " : ch; i++;
  }
  return result.replace(/\s+/g, " ").trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// MALAYALAM → Roman  (abugida algorithm, chillu support)
// ─────────────────────────────────────────────────────────────────────────────
const ML_C = {
  "\u0d15":"k", "\u0d16":"kh","\u0d17":"g", "\u0d18":"gh","\u0d19":"ng",
  "\u0d1a":"ch","\u0d1b":"chh","\u0d1c":"j","\u0d1d":"jh","\u0d1e":"ny",
  "\u0d1f":"t", "\u0d20":"th","\u0d21":"d", "\u0d22":"dh","\u0d23":"n",
  "\u0d24":"th","\u0d25":"th","\u0d26":"d", "\u0d27":"dh","\u0d28":"n",
  "\u0d2a":"p", "\u0d2b":"ph","\u0d2c":"b", "\u0d2d":"bh","\u0d2e":"m",
  "\u0d2f":"y", "\u0d30":"r", "\u0d31":"r", "\u0d32":"l", "\u0d33":"l",
  "\u0d34":"zh","\u0d35":"v", "\u0d36":"sh","\u0d37":"sh","\u0d38":"s",
  "\u0d39":"h",
};
const ML_CHILLU = {
  "\u0d7a":"n","\u0d7b":"n","\u0d7c":"r","\u0d7d":"l","\u0d7e":"l","\u0d7f":"k",
};
const ML_V = {
  "\u0d3e":"a", "\u0d3f":"i","\u0d40":"i","\u0d41":"u","\u0d42":"u",
  "\u0d43":"ru","\u0d46":"e","\u0d47":"e","\u0d48":"ai",
  "\u0d4a":"o", "\u0d4b":"o","\u0d4c":"au",
};
const ML_IV = {
  "\u0d05":"a","\u0d06":"a","\u0d07":"i","\u0d08":"i",
  "\u0d09":"u","\u0d0a":"u","\u0d0b":"ru","\u0d0e":"e",
  "\u0d0f":"e","\u0d10":"ai","\u0d12":"o","\u0d13":"o","\u0d14":"au",
};

function malayalamToRoman(text) {
  if (!text) return "";
  const VIR = "\u0d4d", ANS = "\u0d02", VIS = "\u0d03";
  const chars = [...text];
  let result = "", i = 0;
  while (i < chars.length) {
    const ch = chars[i], nxt = chars[i+1] || "", nxt2 = chars[i+2] || "";
    // Special cluster: ന്റ (n + virama + rra) = "ndr"
    if (ch === "\u0d28" && nxt === VIR && nxt2 === "\u0d31") {
      const vs = chars[i+3] || "";
      result += vs in ML_V ? "ndr" + ML_V[vs] : "ndra";
      i += vs in ML_V ? 4 : 3;
      continue;
    }
    if (ch in ML_CHILLU) { result += ML_CHILLU[ch]; i++; continue; }
    if (ch in ML_IV)     { result += ML_IV[ch]; i++; continue; }
    if (ch in ML_C) {
      const c = ML_C[ch];
      if (nxt === VIR)      { result += c; i += 2; }
      else if (nxt in ML_V) { result += c + ML_V[nxt]; i += 2; }
      else                  { result += c + "a"; i++; }
      continue;
    }
    if (ch === ANS) { result += "m"; i++; continue; }
    if (ch === VIS) { result += "h"; i++; continue; }
    if (ch === VIR) { i++; continue; }
    result += ch === " " ? " " : ch; i++;
  }
  return result.replace(/\s+/g, " ").trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
function transliterateAll(nativeResults) {
  return {
    japanese: {
      native:          nativeResults.japanese  || "",
      transliteration: japaneseToRomaji(nativeResults.japanese),
    },
    arabic: {
      native:          nativeResults.arabic    || "",
      transliteration: arabicToLatin(nativeResults.arabic),
    },
    kannada: {
      native:          nativeResults.kannada   || "",
      transliteration: kannadaToRoman(nativeResults.kannada),
    },
    malayalam: {
      native:          nativeResults.malayalam || "",
      transliteration: malayalamToRoman(nativeResults.malayalam),
    },
  };
}
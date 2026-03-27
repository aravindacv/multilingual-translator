const TRAVELER_PHRASES = {
  "Hotel": {
    icon: "🏨",
    phrases: [
      {
        en: "Do you have a room available?",
        japanese:  { native: "空き部屋はありますか？", transliteration: "Aki heya wa arimasu ka?" },
        arabic:    { native: "هل لديك غرفة متاحة؟",   transliteration: "Hal ladayk ghurfa mutaaha?" },
        kannada:   { native: "ಕೋಣೆ ಲಭ್ಯವಿದೆಯೇ?",       transliteration: "Kone labhyavideye?" },
        malayalam: { native: "ഒരു മുറി ലഭ്യമാണോ?",     transliteration: "Oru muri labhyamano?" },
      },
      {
        en: "How much is the room per night?",
        japanese:  { native: "一泊いくらですか？",       transliteration: "Ippaku ikura desu ka?" },
        arabic:    { native: "كم سعر الغرفة في الليلة؟",transliteration: "Kam sirr al-ghurfa fi al-layla?" },
        kannada:   { native: "ರಾತ್ರಿ ಬಾಡಿಗೆ ಎಷ್ಟು?",    transliteration: "Ratri badige eshtu?" },
        malayalam: { native: "ഒരു രാത്രിക്ക് എത്ര?",   transliteration: "Oru ratriku ethra?" },
      },
      {
        en: "Where is the bathroom?",
        japanese:  { native: "お手洗いはどこですか？",   transliteration: "Otearai wa doko desu ka?" },
        arabic:    { native: "أين الحمام؟",             transliteration: "Ayna al-hammam?" },
        kannada:   { native: "ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?",        transliteration: "Shauchalaya ellide?" },
        malayalam: { native: "ടോയ്‌ലറ്റ് എവിടെയാണ്?",  transliteration: "Toilet evideyanu?" },
      },
      {
        en: "Can I have the wifi password?",
        japanese:  { native: "WIFIのパスワードを教えてください", transliteration: "WiFi no pasuwaado wo oshiete kudasai" },
        arabic:    { native: "ما كلمة مرور الواي فاي؟", transliteration: "Ma kalimat muroor al-wifi?" },
        kannada:   { native: "ವೈಫೈ ಪಾಸ್‌ವರ್ಡ್ ಏನು?",  transliteration: "WiFi password enu?" },
        malayalam: { native: "വൈഫൈ പാസ്‌വേഡ് എന്താണ്?",transliteration: "WiFi password enthanu?" },
      },
      {
        en: "What time is checkout?",
        japanese:  { native: "チェックアウトは何時ですか？",transliteration: "Chekkuauto wa nanji desu ka?" },
        arabic:    { native: "ما وقت تسجيل المغادرة؟",  transliteration: "Ma waqt tasjeel al-mughadara?" },
        kannada:   { native: "ಚೆಕ್‌ಔಟ್ ಸಮಯ ಯಾವಾಗ?",   transliteration: "Checkout samaya yavaga?" },
        malayalam: { native: "ചെക്ക്ഔട്ട് സമയം എപ്പോൾ?",transliteration: "Checkout samayam eppol?" },
      },
      {
        en: "Can you call a taxi for me?",
        japanese:  { native: "タクシーを呼んでもらえますか？",transliteration: "Takushii wo yonde moraemasu ka?" },
        arabic:    { native: "هل يمكنك استدعاء سيارة أجرة لي؟",transliteration: "Hal yumkinuk istidaa sayara ajra li?" },
        kannada:   { native: "ನನಗಾಗಿ ಟ್ಯಾಕ್ಸಿ ಕರೆಯಿರಿ",  transliteration: "Nanagagi taxi kareyiri" },
        malayalam: { native: "എനിക്ക് ടാക്‌സി വിളിക്കാമോ?",transliteration: "Enikku taxi vilikkamo?" },
      },
    ]
  },

  "Restaurant": {
    icon: "🍽️",
    phrases: [
      {
        en: "A table for two please",
        japanese:  { native: "2名でお願いします",         transliteration: "Ni-mei de onegai shimasu" },
        arabic:    { native: "طاولة لشخصين من فضلك",     transliteration: "Tawila li-shakhsayn min fadlak" },
        kannada:   { native: "ಇಬ್ಬರಿಗೆ ಒಂದು ಮೇಜು",      transliteration: "Ibbarige ondu meju" },
        malayalam: { native: "രണ്ട് പേർക്ക് ഒരു മേശ",   transliteration: "Randu perku oru mesha" },
      },
      {
        en: "Can I see the menu?",
        japanese:  { native: "メニューを見せてください",   transliteration: "Menyu wo misete kudasai" },
        arabic:    { native: "هل يمكنني رؤية القائمة؟",  transliteration: "Hal yumkinuni ru'ya al-qa'ima?" },
        kannada:   { native: "ಮೆನು ತೋರಿಸಿ ದಯವಿಟ್ಟು",   transliteration: "Menu torisi dayavittu" },
        malayalam: { native: "മെനു കാണിക്കാമോ?",         transliteration: "Menu kanikamo?" },
      },
      {
        en: "I am vegetarian",
        japanese:  { native: "私はベジタリアンです",       transliteration: "Watashi wa bejitarian desu" },
        arabic:    { native: "أنا نباتي",                 transliteration: "Ana nabati" },
        kannada:   { native: "ನಾನು ಸಸ್ಯಾಹಾರಿ",           transliteration: "Nanu sasyahari" },
        malayalam: { native: "ഞാൻ സസ്യഭക്ഷണക്കാരൻ",     transliteration: "Nyan sasyabhakshanakkaran" },
      },
      {
        en: "I am allergic to nuts",
        japanese:  { native: "ナッツアレルギーがあります", transliteration: "Nattsu arerugii ga arimasu" },
        arabic:    { native: "أنا حساس للمكسرات",         transliteration: "Ana hassas lil-mukassarat" },
        kannada:   { native: "ನನಗೆ ಬೀಜಗಳ ಅಲರ್ಜಿ ಇದೆ",   transliteration: "Nanage bijagala alerji ide" },
        malayalam: { native: "എനിക്ക് നട്‌സ് അലർജിയുണ്ട്",transliteration: "Enikku nuts allergiyund" },
      },
      {
        en: "No spicy please",
        japanese:  { native: "辛くしないでください",       transliteration: "Karakunai de kudasai" },
        arabic:    { native: "بدون تحرش من فضلك",         transliteration: "Bidun taharush min fadlak" },
        kannada:   { native: "ಖಾರ ಬೇಡ ದಯವಿಟ್ಟು",         transliteration: "Khara beda dayavittu" },
        malayalam: { native: "എരിവ് വേണ്ട",               transliteration: "Erivu venda" },
      },
      {
        en: "The bill please",
        japanese:  { native: "お会計をお願いします",       transliteration: "Okaikei wo onegai shimasu" },
        arabic:    { native: "الحساب من فضلك",             transliteration: "Al-hisab min fadlak" },
        kannada:   { native: "ಬಿಲ್ ತನ್ನಿ ದಯವಿಟ್ಟು",      transliteration: "Bill tanni dayavittu" },
        malayalam: { native: "ബിൽ കൊണ്ടുവരൂ",            transliteration: "Bill konduvaru" },
      },
      {
        en: "This is delicious!",
        japanese:  { native: "これはとても美味しい！",     transliteration: "Kore wa totemo oishii!" },
        arabic:    { native: "هذا لذيذ جداً!",            transliteration: "Hadha ladhidh jiddan!" },
        kannada:   { native: "ಇದು ತುಂಬಾ ರುಚಿಯಾಗಿದೆ!",    transliteration: "Idu tumba ruchiyagide!" },
        malayalam: { native: "ഇത് വളരെ രുചികരം!",        transliteration: "Ithu valare ruchikaram!" },
      },
    ]
  },

  "Directions": {
    icon: "🗺️",
    phrases: [
      {
        en: "Where is the nearest hospital?",
        japanese:  { native: "最寄りの病院はどこですか？", transliteration: "Moyori no byouin wa doko desu ka?" },
        arabic:    { native: "أين أقرب مستشفى؟",          transliteration: "Ayna aqrab mustashfa?" },
        kannada:   { native: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?", transliteration: "Hattirada aspatre ellide?" },
        malayalam: { native: "അടുത്ത ആശുപത്രി എവിടെ?",   transliteration: "Adutta ashupathri evidye?" },
      },
      {
        en: "Where is the toilet?",
        japanese:  { native: "トイレはどこですか？",       transliteration: "Toire wa doko desu ka?" },
        arabic:    { native: "أين الحمام؟",               transliteration: "Ayna al-hammam?" },
        kannada:   { native: "ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?",          transliteration: "Shauchalaya ellide?" },
        malayalam: { native: "ടോയ്‌ലറ്റ് എവിടെ?",        transliteration: "Toilet evidye?" },
      },
      {
        en: "How do I get to the airport?",
        japanese:  { native: "空港へはどう行けばいいですか？",transliteration: "Kuukou e wa dou ikeba ii desu ka?" },
        arabic:    { native: "كيف أصل إلى المطار؟",       transliteration: "Kayfa asil ila al-matar?" },
        kannada:   { native: "ವಿಮಾನ ನಿಲ್ದಾಣಕ್ಕೆ ಹೇಗೆ ಹೋಗಬೇಕು?",transliteration: "Vimana nildanakke hege hogabeku?" },
        malayalam: { native: "വിമാനത്താവളത്തിലേക്ക് എങ്ങനെ?",transliteration: "Vimanatthavalathilekku engane?" },
      },
      {
        en: "Can you write it down for me?",
        japanese:  { native: "書いてもらえますか？",       transliteration: "Kaite moraemasu ka?" },
        arabic:    { native: "هل يمكنك كتابته لي؟",       transliteration: "Hal yumkinuk kitabatuhu li?" },
        kannada:   { native: "ದಯವಿಟ್ಟು ಬರೆದು ಕೊಡಿ",       transliteration: "Dayavittu baredu kodi" },
        malayalam: { native: "എഴുതി തരാമോ?",              transliteration: "Ezhuthi taramo?" },
      },
      {
        en: "How far is it?",
        japanese:  { native: "どのくらい遠いですか？",     transliteration: "Dono kurai tooi desu ka?" },
        arabic:    { native: "كم المسافة؟",               transliteration: "Kam al-masafa?" },
        kannada:   { native: "ಎಷ್ಟು ದೂರ ಇದೆ?",           transliteration: "Eshtu dura ide?" },
        malayalam: { native: "എത്ര ദൂരം ഉണ്ട്?",          transliteration: "Ethra duram und?" },
      },
      {
        en: "Please take me to this address",
        japanese:  { native: "この住所に連れて行ってください",transliteration: "Kono juusho ni tsurete itte kudasai" },
        arabic:    { native: "خذني إلى هذا العنوان من فضلك",transliteration: "Khudni ila hadha al-unwan min fadlak" },
        kannada:   { native: "ಈ ವಿಳಾಸಕ್ಕೆ ಕರೆದೊಯ್ಯಿ",     transliteration: "Ee vilasake karedoyyi" },
        malayalam: { native: "ഈ വിലാസത്തിൽ കൊണ്ടുപോകൂ",  transliteration: "Ee vilasathil kondupoku" },
      },
    ]
  },

  "Emergency": {
    icon: "🆘",
    phrases: [
      {
        en: "Help!",
        japanese:  { native: "助けてください！",           transliteration: "Tasukete kudasai!" },
        arabic:    { native: "النجدة!",                   transliteration: "Al-najda!" },
        kannada:   { native: "ಸಹಾಯ ಮಾಡಿ!",               transliteration: "Sahaya madi!" },
        malayalam: { native: "സഹായം!",                    transliteration: "Sahayam!" },
      },
      {
        en: "Call the police!",
        japanese:  { native: "警察を呼んでください！",     transliteration: "Keisatsu wo yonde kudasai!" },
        arabic:    { native: "اتصل بالشرطة!",             transliteration: "Ittasil bil-shurta!" },
        kannada:   { native: "ಪೊಲೀಸ್ ಕರೆಯಿರಿ!",          transliteration: "Police kareyiri!" },
        malayalam: { native: "പോലീസിനെ വിളിക്കൂ!",       transliteration: "Polisine vilikkoo!" },
      },
      {
        en: "Call an ambulance!",
        japanese:  { native: "救急車を呼んでください！",   transliteration: "Kyuukyuusha wo yonde kudasai!" },
        arabic:    { native: "اتصل بسيارة الإسعاف!",     transliteration: "Ittasil bi-sayarat al-is'af!" },
        kannada:   { native: "ಆಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ!",       transliteration: "Ambulance kareyiri!" },
        malayalam: { native: "ആംബുലൻസ് വിളിക്കൂ!",       transliteration: "Ambulance vilikkoo!" },
      },
      {
        en: "I need a doctor",
        japanese:  { native: "医者が必要です",             transliteration: "Isha ga hitsuyou desu" },
        arabic:    { native: "أحتاج إلى طبيب",            transliteration: "Ahtaj ila tabib" },
        kannada:   { native: "ನನಗೆ ವೈದ್ಯರು ಬೇಕು",         transliteration: "Nanage vaidyaru beku" },
        malayalam: { native: "എനിക്ക് ഡോക്ടർ വേണം",       transliteration: "Enikku doctor venam" },
      },
      {
        en: "I am lost",
        japanese:  { native: "道に迷いました",             transliteration: "Michi ni mayoimashita" },
        arabic:    { native: "أنا ضائع",                  transliteration: "Ana daa'i" },
        kannada:   { native: "ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ",     transliteration: "Nanu dari tappiddene" },
        malayalam: { native: "ഞാൻ വഴി തെറ്റി",            transliteration: "Nyan vazhi thetti" },
      },
      {
        en: "I have lost my passport",
        japanese:  { native: "パスポートをなくしました",   transliteration: "Pasupooto wo nakushimashita" },
        arabic:    { native: "لقد فقدت جواز سفري",        transliteration: "Laqad faqadtu jawaz safari" },
        kannada:   { native: "ನನ್ನ ಪಾಸ್‌ಪೋರ್ಟ್ ಕಳೆದಿದೆ",  transliteration: "Nanna passport kaledide" },
        malayalam: { native: "എന്റെ പാസ്‌പോർട്ട് നഷ്ടപ്പെട്ടു",transliteration: "Ente passport nashtappettu" },
      },
    ]
  },

  "Shopping": {
    icon: "🛍️",
    phrases: [
      {
        en: "How much does this cost?",
        japanese:  { native: "これはいくらですか？",       transliteration: "Kore wa ikura desu ka?" },
        arabic:    { native: "كم يكلف هذا؟",              transliteration: "Kam yukallif hadha?" },
        kannada:   { native: "ಇದರ ಬೆಲೆ ಎಷ್ಟು?",          transliteration: "Idara bele eshtu?" },
        malayalam: { native: "ഇതിന് എന്ത് വിലയുണ്ട്?",    transliteration: "Ithin enthu vilayund?" },
      },
      {
        en: "That is too expensive",
        japanese:  { native: "それは高すぎます",           transliteration: "Sore wa takasugimasu" },
        arabic:    { native: "هذا غالٍ جداً",             transliteration: "Hadha ghaalin jiddan" },
        kannada:   { native: "ಅದು ತುಂಬಾ ದುಬಾರಿ",         transliteration: "Adu tumba dubari" },
        malayalam: { native: "അത് വളരെ ചെലവേറിയതാണ്",    transliteration: "Athu valare chelaveriyathanu" },
      },
      {
        en: "Do you accept credit cards?",
        japanese:  { native: "クレジットカードは使えますか？",transliteration: "Kurejitto kaado wa tsukaemasu ka?" },
        arabic:    { native: "هل تقبلون بطاقات الائتمان؟",transliteration: "Hal taqbalun bitaqat al-i'timan?" },
        kannada:   { native: "ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸ್ವೀಕರಿಸುತ್ತೀರಾ?",transliteration: "Credit card swekarsutura?" },
        malayalam: { native: "ക്രെഡിറ്റ് കാർഡ് സ്വീകരിക്കുമോ?",transliteration: "Credit card sweekarikkumo?" },
      },
      {
        en: "Can I try this on?",
        japanese:  { native: "試着できますか？",           transliteration: "Shichaku dekimasu ka?" },
        arabic:    { native: "هل يمكنني تجربة هذا؟",      transliteration: "Hal yumkinuni tajriba hadha?" },
        kannada:   { native: "ನಾನು ಇದನ್ನು ಹಾಕಿ ನೋಡಬಹುದೇ?",transliteration: "Nanu idannu haki nodabaude?" },
        malayalam: { native: "ഇത് ഒന്ന് ഇട്ട് നോക്കിയോ?",  transliteration: "Ithu onnu ittu nokkiyo?" },
      },
      {
        en: "I will take this one",
        japanese:  { native: "これをください",             transliteration: "Kore wo kudasai" },
        arabic:    { native: "سآخذ هذا",                  transliteration: "Sa'akhudhu hadha" },
        kannada:   { native: "ನಾನು ಇದನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೇನೆ",transliteration: "Nanu idannu tegedukoluttene" },
        malayalam: { native: "ഞാൻ ഇത് എടുക്കും",          transliteration: "Nyan ithu edukum" },
      },
    ]
  },

  "Transport": {
    icon: "🚌",
    phrases: [
      {
        en: "One ticket to the city center please",
        japanese:  { native: "市内中心部まで一枚ください", transliteration: "Shinai chuushinbu made ichimai kudasai" },
        arabic:    { native: "تذكرة واحدة إلى وسط المدينة من فضلك",transliteration: "Tadhkira wahida ila wasat al-madina min fadlak" },
        kannada:   { native: "ನಗರ ಕೇಂದ್ರಕ್ಕೆ ಒಂದು ಟಿಕೆಟ್",transliteration: "Nagara kendrakke ondu ticket" },
        malayalam: { native: "സിറ്റി സെന്ററിലേക്ക് ഒരു ടിക്കറ്റ്",transliteration: "City centrilekku oru ticket" },
      },
      {
        en: "Where does this bus go?",
        japanese:  { native: "このバスはどこへ行きますか？",transliteration: "Kono basu wa doko e ikimasu ka?" },
        arabic:    { native: "أين يذهب هذا الحافلة؟",    transliteration: "Ayna yadhabu hadhihi al-hafila?" },
        kannada:   { native: "ಈ ಬಸ್ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ?",  transliteration: "Ee bus ellinge hoguttade?" },
        malayalam: { native: "ഈ ബസ് എവിടേക്ക് പോകുന്നു?",  transliteration: "Ee bus evidekku pokunu?" },
      },
      {
        en: "I missed my flight",
        japanese:  { native: "フライトに乗り遅れました",   transliteration: "Furaito ni noriokuremashita" },
        arabic:    { native: "فاتتني رحلتي الجوية",       transliteration: "Fattatni rihlati al-jawwiya" },
        kannada:   { native: "ನನ್ನ ವಿಮಾನ ತಪ್ಪಿಹೋಯಿತು",    transliteration: "Nanna vimana tappihoyitu" },
        malayalam: { native: "എന്റെ ഫ്ലൈറ്റ് നഷ്ടപ്പെട്ടു", transliteration: "Ente flight nashtappettu" },
      },
      {
        en: "Where can I rent a car?",
        japanese:  { native: "どこでレンタカーを借りられますか？",transliteration: "Doko de rentakaa wo kariraremasu ka?" },
        arabic:    { native: "أين يمكنني استئجار سيارة؟",  transliteration: "Ayna yumkinuni isti'jar sayara?" },
        kannada:   { native: "ಕಾರು ಬಾಡಿಗೆ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?",transliteration: "Karu badige elli siguttade?" },
        malayalam: { native: "കാർ വാടകയ്ക്ക് എവിടെ?",      transliteration: "Car vadakayku evidye?" },
      },
    ]
  },

  "Social": {
    icon: "👋",
    phrases: [
      {
        en: "Nice to meet you",
        japanese:  { native: "はじめまして",               transliteration: "Hajimemashite" },
        arabic:    { native: "سعيد بلقائك",               transliteration: "Saeed bi-liqa'ik" },
        kannada:   { native: "ನಿಮ್ಮನ್ನು ಭೇಟಿ ಆಗಿ ಸಂತೋಷ",   transliteration: "Nimmanu bheti agi santosha" },
        malayalam: { native: "നിങ്ങളെ കണ്ടതിൽ സന്തോഷം",    transliteration: "Ningale kandathil santhosham" },
      },
      {
        en: "I do not understand",
        japanese:  { native: "わかりません",               transliteration: "Wakarimasen" },
        arabic:    { native: "لا أفهم",                   transliteration: "La afham" },
        kannada:   { native: "ನನಗೆ ಅರ್ಥವಾಗುತ್ತಿಲ್ಲ",       transliteration: "Nanage arthavaguttilla" },
        malayalam: { native: "എനിക്ക് മനസ്സിലാകുന്നില്ല",   transliteration: "Enikku manassilakunilla" },
      },
      {
        en: "Please speak slowly",
        japanese:  { native: "ゆっくり話してください",     transliteration: "Yukkuri hanashite kudasai" },
        arabic:    { native: "تحدث ببطء من فضلك",          transliteration: "Tahaddath bi-but' min fadlak" },
        kannada:   { native: "ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮಾತಾಡಿ", transliteration: "Dayavittu nidhanavagi matadi" },
        malayalam: { native: "ദയവായി സ천്ദോഷമോ ⁩ സ്ലോ ആയി സംസാരിക്കൂ",transliteration: "Dayavayi slow aayi samsarikkoo" },
      },
      {
        en: "Do you speak English?",
        japanese:  { native: "英語は話せますか？",           transliteration: "Eigo wa hanasemasu ka?" },
        arabic:    { native: "هل تتحدث الإنجليزية؟",       transliteration: "Hal tatahaddath al-injiliziya?" },
        kannada:   { native: "ನಿಮಗೆ ಇಂಗ್ಲಿಷ್ ಬರುತ್ತದೆಯೇ?",  transliteration: "Nimage English baruttadeye?" },
        malayalam: { native: "നിങ്ങൾക്ക് ഇംഗ്ലീഷ് അറിയാമോ?", transliteration: "Ningalku English ariyamo?" },
      },
      {
        en: "Can you repeat that?",
        japanese:  { native: "もう一度言ってください",       transliteration: "Mou ichido itte kudasai" },
        arabic:    { native: "هل يمكنك تكرار ذلك؟",        transliteration: "Hal yumkinuk takarar dhalik?" },
        kannada:   { native: "ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ",    transliteration: "Dayavittu mattomme heli" },
        malayalam: { native: "ദയവായി ഒന്ന് കൂടി പറയൂ",      transliteration: "Dayavayi onnu kudi parayoo" },
      },
    ]
  },
};
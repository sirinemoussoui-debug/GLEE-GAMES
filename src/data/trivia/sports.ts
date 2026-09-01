import { TriviaQuestion } from '../../types';

export const SPORTS_QUESTIONS: TriviaQuestion[] = [
  {
    "id": "spt-01",
    "category": "sports",
    "en": {
      "question": "Which national team has won the most FIFA World Cup titles in history (5 titles)?",
      "options": [
        "Germany",
        "Italy",
        "Brazil",
        "Argentina"
      ],
      "correctIndex": 2,
      "explanation": "Brazil won the World Cup in 1958, 1962, 1970, 1994, and 2002."
    },
    "ar": {
      "question": "أي منتخب وطني فاز بأكبر عدد من ألقاب كأس العالم لكرة القدم للرجال (٥ ألقاب)؟",
      "options": [
        "ألمانيا",
        "إيطاليا",
        "البرازيل (Brazil)",
        "الأرجنتين"
      ],
      "correctIndex": 2,
      "explanation": "يحمل منتخب البرازيل الرقم القياسي بالفوز بكأس العالم ٥ مرات (١٩٥٨، ١٩٦٢، ١٩٧٠، ١٩٩٤، ٢٠٠٢)."
    },
    "fr": {
      "question": "Quelle équipe nationale masculine a remporté le plus de Coupes du monde de la FIFA (5 titres) ?",
      "options": [
        "L'Allemagne",
        "L'Italie",
        "Le Brésil",
        "L'Argentine"
      ],
      "correctIndex": 2,
      "explanation": "Le Brésil est la seule sélection à avoir gagné 5 Coupes du monde de football."
    }
  },
  {
    "id": "spt-02",
    "category": "sports",
    "en": {
      "question": "How many rings are featured in the official Olympic symbol, representing the inhabited continents?",
      "options": [
        "4",
        "7",
        "6",
        "5"
      ],
      "correctIndex": 3,
      "explanation": "The five interlocking rings (blue, yellow, black, green, and red on white) represent Africa, the Americas, Asia, Europe, and Oceania."
    },
    "ar": {
      "question": "كم عدد الحلقات المتشابكة في الشعار الرسمي للألعاب الأولمبية والتي ترمز لقارات العالم؟",
      "options": [
        "٤",
        "٧",
        "٦",
        "٥ حلقات"
      ],
      "correctIndex": 3,
      "explanation": "ترمز الحلقات الأولمبية الخمس المتداخلة بألوانها إلى اتحاد القارات الخمس في الروح الرياضية."
    },
    "fr": {
      "question": "Combien d'anneaux composent le symbole officiel des Jeux Olympiques ?",
      "options": [
        "4",
        "7",
        "6",
        "5 anneaux"
      ],
      "correctIndex": 3,
      "explanation": "Les 5 anneaux olympiques entrelacés représentent les cinq continents habités de la planète."
    }
  },
  {
    "id": "spt-03",
    "category": "sports",
    "en": {
      "question": "What is the standard official length of a marathon race in kilometers and miles?",
      "options": [
        "42.195 km (26 miles 385 yards)",
        "40.0 km",
        "45.5 km",
        "50.0 km"
      ],
      "correctIndex": 0,
      "explanation": "The marathon distance was standardized at 42.195 km for the 1908 London Olympics to finish in front of the royal box."
    },
    "ar": {
      "question": "ما هي المسافة الرسمية المعتمدة لسباق الماراثون الطويل؟",
      "options": [
        "٤٢.١٩٥ كيلومتراً (٢٦ ميلاً)",
        "٤٠ كم",
        "٤٥ كم",
        "٥٠ كم"
      ],
      "correctIndex": 0,
      "explanation": "مسافة الماراثون الدولية الرسمية محددة بـ ٤٢.١٩٥ كم تكريماً لذكرى الجندي فيديبيدس."
    },
    "fr": {
      "question": "Quelle est la distance officielle d'un marathon en athlétisme ?",
      "options": [
        "42,195 km",
        "40,0 km",
        "45,5 km",
        "50,0 km"
      ],
      "correctIndex": 0,
      "explanation": "La distance classique d'un marathon est de 42,195 kilomètres."
    }
  },
  {
    "id": "spt-04",
    "category": "sports",
    "en": {
      "question": "Which legendary Jamaican sprinter holds the 100m world record at 9.58 seconds set in Berlin in 2009?",
      "options": [
        "Yohan Blake",
        "Usain Bolt",
        "Tyson Gay",
        "Asafa Powell"
      ],
      "correctIndex": 1,
      "explanation": "Usain Bolt set both the 100m (9.58s) and 200m (19.19s) world records at the 2009 World Athletics Championships."
    },
    "ar": {
      "question": "من هو العداء الجامايكي الأسطوري صاحب الرقم القياسي العالمي في سباق ١٠٠ متر (٩.٥٨ ثانية)؟",
      "options": [
        "يوهان بليك",
        "يوسين بولت (Usain Bolt)",
        "تيسون غاي",
        "أسافا باول"
      ],
      "correctIndex": 1,
      "explanation": "يوسين بولت الملقب بـ \"البرق\" هو أسرع إنسان في التاريخ برقم قياسي ٩.٥٨ ثوانٍ في برلين ٢٠٠٩."
    },
    "fr": {
      "question": "Quel sprinter jamaïcain détient le record du monde du 100 mètres en 9,58 secondes ?",
      "options": [
        "Yohan Blake",
        "Usain Bolt",
        "Tyson Gay",
        "Carl Lewis"
      ],
      "correctIndex": 1,
      "explanation": "Usain Bolt a établi le record du monde du 100 m à Berlin en 2009."
    }
  },
  {
    "id": "spt-05",
    "category": "sports",
    "en": {
      "question": "How many players are on the court for each team during an official regulation basketball game?",
      "options": [
        "4",
        "6",
        "5 players",
        "7"
      ],
      "correctIndex": 2,
      "explanation": "Each basketball team has 5 active players on the court (Point Guard, Shooting Guard, Small Forward, Power Forward, Center)."
    },
    "ar": {
      "question": "كم عدد اللاعبين داخل أرض الملعب لكل فريق في مباراة كرة السلة الرسمية؟",
      "options": [
        "٤",
        "٦",
        "٥ لاعبين",
        "٧"
      ],
      "correctIndex": 2,
      "explanation": "يتكون فريق كرة السلة داخل الملعب من ٥ لاعبين في كل جانب."
    },
    "fr": {
      "question": "Combien de joueurs par équipe sont présents sur le terrain lors d'un match de basket-ball ?",
      "options": [
        "4",
        "6",
        "5 joueurs",
        "7"
      ],
      "correctIndex": 2,
      "explanation": "Une équipe de basket-ball compte 5 joueurs sur le parquet."
    }
  },
  {
    "id": "spt-06",
    "category": "sports",
    "en": {
      "question": "Which of the four Grand Slam tennis tournaments is played exclusively on natural red clay courts in Paris?",
      "options": [
        "Australian Open",
        "US Open",
        "Wimbledon",
        "Roland Garros (French Open)"
      ],
      "correctIndex": 3,
      "explanation": "Roland Garros in Paris is the premier clay court tennis championship in the world, held every May–June."
    },
    "ar": {
      "question": "أي من بطولات الغراند سلام الأربع الكبرى في التنس تقام على الملاعب الترابية الحمراء في باريس؟",
      "options": [
        "أستراليا المفتوحة",
        "أمريكا المفتوحة",
        "ويمبلدون",
        "بطولة رولان غاروس (Roland Garros)"
      ],
      "correctIndex": 3,
      "explanation": "تقام بطولة فرنسا المفتوحة (رولان غاروس) في باريس سنوياً على ملاعب رملية ترابية مميزة."
    },
    "fr": {
      "question": "Quel tournoi du Grand Chelem de tennis se dispute sur terre battue à Paris ?",
      "options": [
        "L'Open d'Australie",
        "L'US Open",
        "Wimbledon",
        "Roland-Garros"
      ],
      "correctIndex": 3,
      "explanation": "Le tournoi de Roland-Garros est le sommet de la saison sur terre battue."
    }
  },
  {
    "id": "spt-07",
    "category": "sports",
    "en": {
      "question": "How many minutes is a standard regulation professional football (soccer) match, excluding extra time?",
      "options": [
        "90 minutes (two 45-minute halves)",
        "80 minutes",
        "100 minutes",
        "120 minutes"
      ],
      "correctIndex": 0,
      "explanation": "A regulation soccer match lasts 90 minutes divided into two halves of 45 minutes plus referee added stoppage time."
    },
    "ar": {
      "question": "كم تبلغ المدة الرسمية الأصلية لمباراة كرة القدم للمحترفين دون احتساب الأشواط الإضافية؟",
      "options": [
        "٩٠ دقيقة (شوطان من ٤٥ دقيقة)",
        "٨٠ دقيقة",
        "١٠٠ دقيقة",
        "١٢٠ دقيقة"
      ],
      "correctIndex": 0,
      "explanation": "الوقت الأصلي لمباراة كرة القدم هو ٩٠ دقيقة مقسمة على شوطين كل شوط ٤٥ دقيقة بالإضافة للوقت بدل الضائع."
    },
    "fr": {
      "question": "Quelle est la durée réglementaire d'un match de football professionnel hors prolongations ?",
      "options": [
        "90 minutes (deux mi-temps de 45 minutes)",
        "80 minutes",
        "100 minutes",
        "120 minutes"
      ],
      "correctIndex": 0,
      "explanation": "Un match de football dure 90 minutes de temps réglementaire."
    }
  },
  {
    "id": "spt-08",
    "category": "sports",
    "en": {
      "question": "Who won the 2022 FIFA World Cup held in Qatar, captained by Lionel Messi?",
      "options": [
        "France",
        "Argentina",
        "Croatia",
        "Morocco"
      ],
      "correctIndex": 1,
      "explanation": "Argentina defeated France in a thrilling penalty shootout (3-3 aet, 4-2 pens) on December 18, 2022, to lift their 3rd trophy."
    },
    "ar": {
      "question": "أي منتخب توج بلقب كأس العالم لكرة القدم ٢٠٢٢ في قطر بقيادة ليونيل ميسي؟",
      "options": [
        "فرنسا",
        "الأرجنتين (Argentina)",
        "كرواتيا",
        "المغرب"
      ],
      "correctIndex": 1,
      "explanation": "توجت الأرجنتين بكأس العالم ٢٠٢٢ بعد مباراة نهائية ملحمية أمام فرنسا حُسمت بركلات الترجيح."
    },
    "fr": {
      "question": "Quelle sélection a remporté la Coupe du Monde de la FIFA 2022 au Qatar emmenée par Lionel Messi ?",
      "options": [
        "La France",
        "L'Argentine",
        "La Croatie",
        "Le Maroc"
      ],
      "correctIndex": 1,
      "explanation": "L'Argentine a remporté son 3e titre mondial face à la France aux tirs au but."
    }
  },
  {
    "id": "spt-09",
    "category": "sports",
    "en": {
      "question": "In bowling, what term refers to scoring three consecutive strikes in a row?",
      "options": [
        "Spare",
        "Hat-trick",
        "Turkey",
        "Eagle"
      ],
      "correctIndex": 2,
      "explanation": "In ten-pin bowling, three strikes in frames 1, 2, and 3 (or any 3 consecutive frames) is called a \"turkey\"."
    },
    "ar": {
      "question": "في رياضة البولينج، ماذا يسمى تسجيل ثلاث ضربات إسقاط شامل متتالية (Three Strikes)؟",
      "options": [
        "سبير (Spare)",
        "هاتريك",
        "تركي (Turkey)",
        "إيجل"
      ],
      "correctIndex": 2,
      "explanation": "يطلق مصطلح Turkey على إسقاط جميع القوارير بضربة واحدة في ثلاث جولات متتالية في البولينج."
    },
    "fr": {
      "question": "Au bowling, comment qualifie-t-on le fait de réaliser trois strikes consécutifs ?",
      "options": [
        "Un spare",
        "Un hat-trick",
        "Un turkey (dindon)",
        "Un eagle"
      ],
      "correctIndex": 2,
      "explanation": "Trois strikes consécutifs au bowling s'appellent traditionnellement un « turkey »."
    }
  },
  {
    "id": "spt-10",
    "category": "sports",
    "en": {
      "question": "Which club has won the most UEFA Champions League (European Cup) titles in history (15 titles through 2024)?",
      "options": [
        "AC Milan",
        "Liverpool FC",
        "FC Bayern Munich",
        "Real Madrid CF"
      ],
      "correctIndex": 3,
      "explanation": "Real Madrid won their 15th title in June 2024 at Wembley, maintaining their position as European kings."
    },
    "ar": {
      "question": "ما هو النادي الأكثر تتويجاً بلقب دوري أبطال أوروبا في تاريخ كرة القدم (١٥ لقباً حتى ٢٠٢٤)؟",
      "options": [
        "إيه سي ميلان",
        "ليفربول",
        "بايرن ميونخ",
        "ريال مدريد (Real Madrid)"
      ],
      "correctIndex": 3,
      "explanation": "ريال مدريد الإسباني هو النادي الأكثر تتويجاً بالبطولة الأوروبية عبر التاريخ برصيد ١٥ لقباً."
    },
    "fr": {
      "question": "Quel club détient le record du nombre de victoires en Ligue des Champions (15 titres) ?",
      "options": [
        "Le Milan AC",
        "Liverpool",
        "Le Bayern Munich",
        "Le Real Madrid"
      ],
      "correctIndex": 3,
      "explanation": "Le Real Madrid domine l'histoire de la Ligue des champions européenne."
    }
  },
  {
    "id": "spt-11",
    "category": "sports",
    "en": {
      "question": "What is the maximum achievable break score in a single frame of standard snooker without fouls?",
      "options": [
        "147 points",
        "100 points",
        "155 points",
        "180 points"
      ],
      "correctIndex": 0,
      "explanation": "A maximum snooker break is 147, achieved by potting 15 reds with 15 blacks (120 pts) followed by all 6 colors (27 pts)."
    },
    "ar": {
      "question": "ما هي أعلى نقطة ممكنة (الحد الأقصى للبريك) في شوط السنوكر الكلاسيكي دون ارتكاب أخطاء؟",
      "options": [
        "١٤٧ نقطة (Maximum Break)",
        "١٠٠ نقطة",
        "١٥٥ نقطة",
        "١٨٠ نقطة"
      ],
      "correctIndex": 0,
      "explanation": "يتحقق الماكسيمم بريك (١٤٧ نقطة) بإدخال الكرات الحمراء الخمس عشرة مع الكرة السوداء ثم الكرات الملونة بالترتيب."
    },
    "fr": {
      "question": "Quel est le score maximal (break maximum) réalisable dans une manche classique de snooker ?",
      "options": [
        "147 points",
        "100 points",
        "155 points",
        "180 points"
      ],
      "correctIndex": 0,
      "explanation": "Un break parfait de 147 points combine 15 rouges, 15 noires et toutes les couleurs finales."
    }
  },
  {
    "id": "spt-12",
    "category": "sports",
    "en": {
      "question": "Who was the iconic American heavyweight boxer who famously proclaimed \"Float like a butterfly, sting like a bee\"?",
      "options": [
        "Mike Tyson",
        "Muhammad Ali (Cassius Clay)",
        "Joe Frazier",
        "George Foreman"
      ],
      "correctIndex": 1,
      "explanation": "Muhammad Ali won the World Heavyweight Championship 3 times and is celebrated as one of the greatest athletes in history."
    },
    "ar": {
      "question": "من هو أسطورة الملاكمة للوزن الثقيل صاحب المقولة الشهيرة \"أطفو كالفراشة وألدغ كالنحلة\"؟",
      "options": [
        "مايك تايسون",
        "محمد علي كلاي (Muhammad Ali)",
        "جو فريزر",
        "جورج فورمان"
      ],
      "correctIndex": 1,
      "explanation": "محمد علي كلاي فاز ببطولة العالم للوزن الثقيل ثلاث مرات واعتُبر أعظم رياضي في القرن العشرين."
    },
    "fr": {
      "question": "Quel boxeur légendaire a popularisé la formule « Voler comme un papillon, piquer comme une abeille » ?",
      "options": [
        "Mike Tyson",
        "Mohamed Ali (Cassius Clay)",
        "Joe Frazier",
        "George Foreman"
      ],
      "correctIndex": 1,
      "explanation": "Mohamed Ali est considéré comme l'un des plus grands boxeurs poids lourds de tous les temps."
    }
  },
  {
    "id": "spt-13",
    "category": "sports",
    "en": {
      "question": "How many players are on the field for each team in a standard cricket match?",
      "options": [
        "9",
        "13",
        "11 players",
        "15"
      ],
      "correctIndex": 2,
      "explanation": "A cricket team consists of 11 players including batsmen, bowlers, and a designated wicket-keeper."
    },
    "ar": {
      "question": "كم عدد اللاعبين في كل فريق داخل أرض الملعب في مباراة الكريكيت الرسمية؟",
      "options": [
        "٩",
        "١٣",
        "١١ لاعباً",
        "١٥"
      ],
      "correctIndex": 2,
      "explanation": "يتألف فريق الكريكيت من ١١ لاعباً يشمل الرماة والضاربين وحارس الويكيت."
    },
    "fr": {
      "question": "Combien de joueurs composent une équipe de cricket sur le terrain ?",
      "options": [
        "9",
        "13",
        "11 joueurs",
        "15"
      ],
      "correctIndex": 2,
      "explanation": "Une équipe de cricket est composée de 11 joueurs."
    }
  },
  {
    "id": "spt-14",
    "category": "sports",
    "en": {
      "question": "Which Olympic swimmer holds the all-time record for the most Olympic medals won (28 medals, 23 gold)?",
      "options": [
        "Mark Spitz",
        "Caeleb Dressel",
        "Ian Thorpe",
        "Michael Phelps"
      ],
      "correctIndex": 3,
      "explanation": "Michael Phelps competed in 5 Olympic Games (2000–2016), winning 23 gold medals, 3 silver, and 2 bronze."
    },
    "ar": {
      "question": "من هو السباح الأولمبي الأمريكي صاحب الرقم القياسي التاريخي كأكثر الرياضيين تتويجاً بالميداليات الأولمبية (٢٨ ميدالية منها ٢٣ ذهبية)؟",
      "options": [
        "مارك سبيتز",
        "كاليب دريسل",
        "إيان ثورب",
        "مايكل فيلبس (Michael Phelps)"
      ],
      "correctIndex": 3,
      "explanation": "مايكل فيلبس هو الرياضي الأكثر تتويجاً في تاريخ الألعاب الأولمبية بـ ٢٨ ميدالية بينها ٢٣ ذهبية."
    },
    "fr": {
      "question": "Quel nageur américain détient le record absolu de médailles olympiques de l'histoire (28 médailles, dont 23 en or) ?",
      "options": [
        "Mark Spitz",
        "Léon Marchand",
        "Ian Thorpe",
        "Michael Phelps"
      ],
      "correctIndex": 3,
      "explanation": "Michael Phelps est l'athlète olympique le plus titré de tous les temps."
    }
  },
  {
    "id": "spt-15",
    "category": "sports",
    "en": {
      "question": "In golf, what is the score called when a player completes a hole in two strokes under par?",
      "options": [
        "Eagle (-2)",
        "Birdie (-1)",
        "Albatross (-3)",
        "Bogey (+1)"
      ],
      "correctIndex": 0,
      "explanation": "An eagle is 2 strokes under par (e.g. 3 on a par-5 hole). One stroke under is a birdie."
    },
    "ar": {
      "question": "في رياضة الغولف، ماذا تسمى النتيجة عند إنهاء الحفرة بضربتين أقل من المعدل المحدد (Par)؟",
      "options": [
        "إيجل (Eagle: -٢)",
        "بيردي (-١)",
        "ألبرتوس (-٣)",
        "بوجي (+١)"
      ],
      "correctIndex": 0,
      "explanation": "يطلق مصطلح إيجل (Eagle) على إدخال الكرة بضربتين أقل من المعدل المعتمد لتلك الحفرة."
    },
    "fr": {
      "question": "Au golf, comment appelle-t-on un score de deux coups sous le par sur un trou ?",
      "options": [
        "Un eagle (-2)",
        "Un birdie (-1)",
        "Un albatros (-3)",
        "Un bogey (+1)"
      ],
      "correctIndex": 0,
      "explanation": "Un eagle correspond à deux coups sous le par."
    }
  },
  {
    "id": "spt-16",
    "category": "sports",
    "en": {
      "question": "Which country invented the modern sport of curling, played on ice with polished granite stones?",
      "options": [
        "Canada",
        "Scotland",
        "Sweden",
        "Norway"
      ],
      "correctIndex": 1,
      "explanation": "Curling originated in medieval Scotland, with the oldest known curling stone dated 1511 inscribed from Stirling."
    },
    "ar": {
      "question": "أي دولة هي الموطن الأصلي لرياضة الكيرلنج (Curling) التي تُلعب على الجليد بأحجار الغرانيت والمكنسة؟",
      "options": [
        "كندا",
        "اسكتلندا (Scotland)",
        "السويد",
        "النرويج"
      ],
      "correctIndex": 1,
      "explanation": "نشأت رياضة الكيرلنج في اسكتلندا في العصور الوسطى بالقرن السادس عشر."
    },
    "fr": {
      "question": "Quel pays est le berceau historique du curling sur glace ?",
      "options": [
        "Le Canada",
        "L'Écosse",
        "La Suède",
        "La Norvège"
      ],
      "correctIndex": 1,
      "explanation": "Le curling a été inventé au XVIe siècle en Écosse."
    }
  },
  {
    "id": "spt-17",
    "category": "sports",
    "en": {
      "question": "What is the national sport of Japan, an ancient form of ritualized heavyweight wrestling?",
      "options": [
        "Judo",
        "Karate",
        "Sumo Wrestling",
        "Kendo"
      ],
      "correctIndex": 2,
      "explanation": "Sumo originated as a Shinto ritual wrestling match to entertain and honor the gods (kami)."
    },
    "ar": {
      "question": "ما هي الرياضة الوطنية التقليدية في اليابان وهي مصارعة دائرية تعود لقرون طويلة؟",
      "options": [
        "الجودو",
        "الكاراتيه",
        "السومو (Sumo)",
        "الكيندو"
      ],
      "correctIndex": 2,
      "explanation": "السومو هي الرياضة القومية لليابان وتتضمن محاولة دفع الخصم خارج حلبة الدوهيو الرملية."
    },
    "fr": {
      "question": "Quel est le sport national traditionnel du Japon, forme de lutte rituelle sacrée ?",
      "options": [
        "Le judo",
        "Le karaté",
        "Le sumo",
        "L'aïkido"
      ],
      "correctIndex": 2,
      "explanation": "Le sumo est le sport national du Japon avec ses rites ancestraux shintoïstes."
    }
  },
  {
    "id": "spt-18",
    "category": "sports",
    "en": {
      "question": "Which legendary Formula 1 driver holds the joint record for the most World Drivers' Championships with 7 titles alongside Michael Schumacher?",
      "options": [
        "Sebastian Vettel",
        "Ayrton Senna",
        "Max Verstappen",
        "Lewis Hamilton"
      ],
      "correctIndex": 3,
      "explanation": "Lewis Hamilton won 7 F1 World Championships (2008, 2014, 2015, 2017, 2018, 2019, 2020), tied with Michael Schumacher."
    },
    "ar": {
      "question": "من هو سائق سباقات الفورمولا ١ البريطاني الذي يحمل الرقم القياسي المشترك بـ ٧ بطولات عالم إلى جانب مايكل شوماخر؟",
      "options": [
        "سيباستيان فيتيل",
        "آيرتون سينا",
        "ماكس فيرستابين",
        "لويس هاميلتون (Lewis Hamilton)"
      ],
      "correctIndex": 3,
      "explanation": "حقق لويس هاميلتون ٧ ألقاب في بطولة العالم للفورمولا ١ معادلاً الأسطورة شوماخر."
    },
    "fr": {
      "question": "Quel pilote de Formule 1 partage le record de 7 titres de champion du monde avec Michael Schumacher ?",
      "options": [
        "Sebastian Vettel",
        "Alain Prost",
        "Max Verstappen",
        "Lewis Hamilton"
      ],
      "correctIndex": 3,
      "explanation": "Lewis Hamilton et Michael Schumacher comptent chacun 7 couronnes mondiales en F1."
    }
  },
  {
    "id": "spt-19",
    "category": "sports",
    "en": {
      "question": "In ice hockey, how many periods are played in a standard regulation NHL match?",
      "options": [
        "Three 20-minute periods",
        "Two halves",
        "Four quarters",
        "Two 30-minute halves"
      ],
      "correctIndex": 0,
      "explanation": "A hockey game consists of three 20-minute periods of stop-time play, totaling 60 minutes of regulation."
    },
    "ar": {
      "question": "في رياضة هوكي الجليد، كم عدد الأشواط (الفترات) في المباراة الرسمية؟",
      "options": [
        "٣ فترات (كل فترة ٢٠ دقيقة)",
        "شوطان",
        "٤ أرباع",
        "شوطان كل منهما ٣٠ دقيقة"
      ],
      "correctIndex": 0,
      "explanation": "تتكون مباراة هوكي الجليد من ٣ أشواط مدة كل منها ٢٠ دقيقة من اللعب الفعلي."
    },
    "fr": {
      "question": "Combien de tiers-temps compte un match officiel de hockey sur glace ?",
      "options": [
        "Trois périodes de 20 minutes",
        "Deux mi-temps",
        "Quatre quarts-temps",
        "Trois périodes de 15 minutes"
      ],
      "correctIndex": 0,
      "explanation": "Le hockey sur glace se joue en 3 tiers-temps de 20 minutes."
    }
  },
  {
    "id": "spt-20",
    "category": "sports",
    "en": {
      "question": "Which country hosted the first modern Olympic Games in 1896?",
      "options": [
        "France (Paris)",
        "Greece (Athens)",
        "United Kingdom (London)",
        "USA (St. Louis)"
      ],
      "correctIndex": 1,
      "explanation": "The 1896 Summer Olympics were held at the Panathenaic Stadium in Athens, revived by Pierre de Coubertin."
    },
    "ar": {
      "question": "أي دولة استضافت أول دورة ألعاب أولمبية حديثة عام ١٨٩٦؟",
      "options": [
        "فرنسا (باريس)",
        "اليونان (أثينا)",
        "بريطانيا (لندن)",
        "أمريكا"
      ],
      "correctIndex": 1,
      "explanation": "أقيمت أول ألعاب أولمبية في العصر الحديث في العاصمة اليونانية أثينا عام ١٨٩٦ تكريماً للألعاب الإغريقية القديمة."
    },
    "fr": {
      "question": "Quel pays a accueilli les premiers Jeux Olympiques de l'ère moderne en 1896 ?",
      "options": [
        "La France",
        "La Grèce (Athènes)",
        "Le Royaume-Uni",
        "L'Italie"
      ],
      "correctIndex": 1,
      "explanation": "Les premiers JO modernes ont eu lieu à Athènes en 1896."
    }
  },
  {
    "id": "spt-21",
    "category": "sports",
    "en": {
      "question": "What is the diameter of a standard basketball hoop rim in inches?",
      "options": [
        "15 inches",
        "20 inches",
        "18 inches (45.7 cm)",
        "22 inches"
      ],
      "correctIndex": 2,
      "explanation": "An official NBA and FIBA basketball rim is exactly 18 inches (45.7 cm) in diameter, mounted 10 feet above the floor."
    },
    "ar": {
      "question": "كم يبلغ القطر الداخلي الدقيق لحلقة كرة السلة المعتمدة في القوانين الدولية؟",
      "options": [
        "١٥ بوصة",
        "٢٠ بوصة",
        "١٨ بوصة (٤٥.٧ سم)",
        "٢٢ بوصة"
      ],
      "correctIndex": 2,
      "explanation": "قطر حلقة كرة السلة القانونية هو ١٨ بوصة وترتفع عن أرضية الصالة بمقدار ١٠ أقدام (٣.٠٥ م)."
    },
    "fr": {
      "question": "Quel est le diamètre réglementaire d'un arceau de panier de basket-ball ?",
      "options": [
        "38 cm",
        "50 cm",
        "45,7 cm (18 pouces)",
        "55 cm"
      ],
      "correctIndex": 2,
      "explanation": "Le cercle d'un panier de basket mesure exactement 45,7 cm de diamètre."
    }
  },
  {
    "id": "spt-22",
    "category": "sports",
    "en": {
      "question": "In volleyball, how many times can a single team touch the ball before returning it over the net?",
      "options": [
        "2 touches",
        "5 touches",
        "4 touches",
        "3 touches (excluding block)"
      ],
      "correctIndex": 3,
      "explanation": "A team has a maximum of three contacts (bump, set, spike) to send the ball back across the net; a block contact does not count."
    },
    "ar": {
      "question": "في رياضة الكرة الطائرة، كم عدد اللمسات المسموح بها للفريق كحد أقصى قبل إرجاع الكرة للطرف الآخر؟",
      "options": [
        "لمستان",
        "٥ لمسات",
        "٤ لمسات",
        "٣ لمسات كحد أقصى"
      ],
      "correctIndex": 3,
      "explanation": "يحق للفريق لمس الكرة ٣ مرات متتالية (استقبال، إعداد، ضرب ساحق) لتمريرها فوق الشبكة."
    },
    "fr": {
      "question": "Au volley-ball, combien de touches de balle consécutives au maximum une équipe a-t-elle le droit d'effectuer ?",
      "options": [
        "2 touches",
        "5 touches",
        "4 touches",
        "3 touches (hors contre)"
      ],
      "correctIndex": 3,
      "explanation": "L'équipe a droit à 3 touches de balle pour renvoyer le ballon au-dessus du filet."
    }
  },
  {
    "id": "spt-23",
    "category": "sports",
    "en": {
      "question": "Which African country made history at the 2022 World Cup by becoming the first African nation ever to reach the semi-finals?",
      "options": [
        "Morocco",
        "Senegal",
        "Cameroon",
        "Ghana"
      ],
      "correctIndex": 0,
      "explanation": "Morocco defeated Spain and Portugal in the knockout stages in Qatar 2022 to make history as Africa's and the Arab world's first semi-finalist."
    },
    "ar": {
      "question": "أي منتخب عربي وأفريقي حقق إنجازاً تاريخياً في مونديال قطر ٢٠٢٢ بوصوله إلى المربع الذهبي (نصف النهائي) كأول منتخب أفريقي وعربي في التاريخ؟",
      "options": [
        "المغرب (Morocco)",
        "السنغال",
        "الكاميرون",
        "غانا"
      ],
      "correctIndex": 0,
      "explanation": "حقق المنتخب المغربي أسود الأطلس إنجازاً تاريخياً ببلوغ نصف نهائي كأس العالم ٢٠٢٢ بعد إقصاء إسبانيا والبرتغال."
    },
    "fr": {
      "question": "Quelle nation africaine est devenue la première de l'histoire à atteindre les demi-finales d'une Coupe du Monde en 2022 ?",
      "options": [
        "Le Maroc",
        "Le Sénégal",
        "Le Cameroun",
        "Le Ghana"
      ],
      "correctIndex": 0,
      "explanation": "Le Maroc a écrit l'histoire en se qualifiant pour les demi-finales du Mondial 2022 au Qatar."
    }
  },
  {
    "id": "spt-24",
    "category": "sports",
    "en": {
      "question": "What is the oldest active tennis tournament in the world, founded in 1877 and played on grass in London?",
      "options": [
        "Australian Open",
        "Wimbledon",
        "French Open",
        "US Open"
      ],
      "correctIndex": 1,
      "explanation": "The Championships, Wimbledon, held at the All England Club since 1877, is the oldest and most prestigious tennis tournament."
    },
    "ar": {
      "question": "ما هي أقدم بطولة تنس في العالم تأسست عام ١٨٧٧ وتلعب على الملاعب العشبية الخضراء في لندن؟",
      "options": [
        "أستراليا المفتوحة",
        "بطولة ويمبلدون (Wimbledon)",
        "رولان غاروس",
        "أمريكا المفتوحة"
      ],
      "correctIndex": 1,
      "explanation": "بطولة ويمبلدون في بريطانيا هي أعرق وأقدم بطولات التنس وتقام على ملاعب عشبية بنظام التقاليد الكلاسيكية."
    },
    "fr": {
      "question": "Quel est le plus ancien tournoi de tennis au monde, disputé sur gazon à Londres depuis 1877 ?",
      "options": [
        "L'Open d'Australie",
        "Wimbledon",
        "Roland-Garros",
        "L'US Open"
      ],
      "correctIndex": 1,
      "explanation": "Wimbledon est le plus ancien et prestigieux tournoi de tennis au monde."
    }
  },
  {
    "id": "spt-25",
    "category": "sports",
    "en": {
      "question": "In baseball, how many defensive players take the field at one time for the fielding team?",
      "options": [
        "8",
        "10",
        "9 players",
        "11"
      ],
      "correctIndex": 2,
      "explanation": "A fielding baseball team positions 9 players: Pitcher, Catcher, 4 Infielders (1B, 2B, 3B, SS), and 3 Outfielders (LF, CF, RF)."
    },
    "ar": {
      "question": "في رياضة البيسبول (كرة القاعدة)، كم عدد اللاعبين المدافعين في الميدان في نفس الوقت؟",
      "options": [
        "٨",
        "١٠",
        "٩ لاعبين",
        "١١"
      ],
      "correctIndex": 2,
      "explanation": "يتكون الفريق المدافع في البيسبول من ٩ لاعبين موزعين بين الرامي والماسك ولاعبي القواعد والميدان الخارجي."
    },
    "fr": {
      "question": "Au baseball, combien de joueurs défensifs sont positionnés sur le terrain ?",
      "options": [
        "8",
        "10",
        "9 joueurs",
        "11"
      ],
      "correctIndex": 2,
      "explanation": "L'équipe en défense au baseball aligne 9 joueurs sur le terrain."
    }
  }
];

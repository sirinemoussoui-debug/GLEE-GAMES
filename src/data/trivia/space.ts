import { TriviaQuestion } from '../../types';

export const SPACE_QUESTIONS: TriviaQuestion[] = [
  {
    "id": "spc-01",
    "category": "space",
    "en": {
      "question": "Which planet in our solar system has the largest number of confirmed moons (over 140)?",
      "options": [
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune"
      ],
      "correctIndex": 1,
      "explanation": "Saturn has 146 officially recognized moons, leading the solar system ahead of Jupiter."
    },
    "ar": {
      "question": "أي كوكب في نظامنا الشمسي يمتلك أكبر عدد من الأقمار المكتشفة رسمياً (أكثر من ١٤٠ قمراً)؟",
      "options": [
        "المشتري",
        "زحل",
        "أورانوس",
        "نبتون"
      ],
      "correctIndex": 1,
      "explanation": "يتصدر كوكب زحل المجموعة الشمسية بوجود ١٤٦ قمراً مؤكداً تدور في مداره."
    },
    "fr": {
      "question": "Quelle planète du système solaire possède le plus grand nombre de lunes confirmées ?",
      "options": [
        "Jupiter",
        "Saturne",
        "Uranus",
        "Neptune"
      ],
      "correctIndex": 1,
      "explanation": "Saturne compte 146 lunes répertoriées par l'Union astronomique internationale."
    }
  },
  {
    "id": "spc-02",
    "category": "space",
    "en": {
      "question": "What is the largest planet in our solar system by both mass and diameter?",
      "options": [
        "Saturn",
        "Neptune",
        "Jupiter",
        "Uranus"
      ],
      "correctIndex": 2,
      "explanation": "Jupiter has a mass 2.5 times greater than all other solar system planets combined and a diameter of ~140,000 km."
    },
    "ar": {
      "question": "ما هو أضخم وأكبر كواكب المجموعة الشمسية حجماً وكتلة؟",
      "options": [
        "زحل",
        "نبتون",
        "المشتري (Jupiter)",
        "أورانوس"
      ],
      "correctIndex": 2,
      "explanation": "كوكب المشتري هو الأضخم، وكتلته تفوق مجموع كتل كل الكواكب الأخرى مجتمعة بمرتين ونصف."
    },
    "fr": {
      "question": "Quelle est la planète la plus volumineuse et la plus massive du système solaire ?",
      "options": [
        "Saturne",
        "Neptune",
        "Jupiter",
        "Uranus"
      ],
      "correctIndex": 2,
      "explanation": "Jupiter est une géante gazeuse plus massive que toutes les autres planètes réunies."
    }
  },
  {
    "id": "spc-03",
    "category": "space",
    "en": {
      "question": "What is the hottest planet in the solar system, with surface temperatures averaging 465°C?",
      "options": [
        "Mercury",
        "Jupiter",
        "Mars",
        "Venus"
      ],
      "correctIndex": 3,
      "explanation": "Venus is hotter than Mercury due to a runaway greenhouse effect caused by its dense 96% CO2 atmosphere."
    },
    "ar": {
      "question": "ما هو الكوكب الأكثر حرارة في المجموعة الشمسية بحرارة سطح تبلغ نحو ٤٦٥ درجة مئوية؟",
      "options": [
        "عطارد",
        "المشتري",
        "المريخ",
        "الزهرة (Venus)"
      ],
      "correctIndex": 3,
      "explanation": "كوكب الزهرة هو الأشد حرارة بسبب احتباس حراري هائل لغلافه الجوي السميك المليء بثاني أكسيد الكربون."
    },
    "fr": {
      "question": "Quelle est la planète la plus chaude du système solaire (environ 465°C en surface) ?",
      "options": [
        "Mercure",
        "Jupiter",
        "Mars",
        "Vénus"
      ],
      "correctIndex": 3,
      "explanation": "Vénus est la plus chaude en raison de l'effet de serre extrême de son atmosphère dense."
    }
  },
  {
    "id": "spc-04",
    "category": "space",
    "en": {
      "question": "What is the closest major spiral galaxy to our Milky Way galaxy?",
      "options": [
        "Andromeda Galaxy (M31)",
        "Triangulum Galaxy (M33)",
        "Large Magellanic Cloud",
        "Sombrero Galaxy"
      ],
      "correctIndex": 0,
      "explanation": "The Andromeda Galaxy (M31) is approximately 2.5 million light-years away and approaching our galaxy."
    },
    "ar": {
      "question": "ما هي أقرب مجرة حلزونية كبرى لمجرتنا درب التبانة؟",
      "options": [
        "مجرة أندروميدا / المرأة المسلسلة (M31)",
        "مجرة المثلث (M33)",
        "سحابة ماجلان الكبرى",
        "مجرة السومبريرو"
      ],
      "correctIndex": 0,
      "explanation": "مجرة أندروميدا تبعد عنا نحو ٢.٥ مليون سنة ضوئية وتتجه نحو الاندماج مع مجرتنا في المستقبل البعيد."
    },
    "fr": {
      "question": "Quelle est la grande galaxie spirale la plus proche de notre Voie lactée ?",
      "options": [
        "La galaxie d'Andromède (M31)",
        "La galaxie du Triangle",
        "Le Grand Nuage de Magellan",
        "La galaxie du Sombrero"
      ],
      "correctIndex": 0,
      "explanation": "Andromède est située à environ 2,5 millions d'années-lumière de la Voie lactée."
    }
  },
  {
    "id": "spc-05",
    "category": "space",
    "en": {
      "question": "What is the largest known volcano and mountain in our entire solar system?",
      "options": [
        "Mauna Kea (Earth)",
        "Olympus Mons (Mars)",
        "Maxwell Montes (Venus)",
        "Mount Everest (Earth)"
      ],
      "correctIndex": 1,
      "explanation": "Olympus Mons on Mars stands about 21.9 km (nearly 72,000 feet) high, about 2.5 times taller than Mount Everest."
    },
    "ar": {
      "question": "ما هو أكبر بركان وأعلى جبل معروف في كامل المجموعة الشمسية؟",
      "options": [
        "مونا كيا (الأرض)",
        "جبل أوليمبوس (أوليمبوس مونس على المريخ)",
        "جبال ماكسويل (الزهرة)",
        "جبل إيفرست"
      ],
      "correctIndex": 1,
      "explanation": "بركان أوليمبوس مونس على المريخ يبلغ ارتفاعه نحو ٢٢ كيلومتراً، أي ما يقارب ٣ أضعاف قمة إيفرست."
    },
    "fr": {
      "question": "Quel est le plus haut volcan et relief connu du système solaire ?",
      "options": [
        "Le Mauna Kea",
        "Olympus Mons (sur Mars)",
        "Maxwell Montes",
        "Le Mont Everest"
      ],
      "correctIndex": 1,
      "explanation": "Olympus Mons culmine à près de 22 km d'altitude au-dessus des plaines martiennes."
    }
  },
  {
    "id": "spc-06",
    "category": "space",
    "en": {
      "question": "What is the boundary around a black hole beyond which nothing, not even light, can escape?",
      "options": [
        "Singularity",
        "Accretion Disk",
        "Event Horizon",
        "Ergosphere"
      ],
      "correctIndex": 2,
      "explanation": "The event horizon is the threshold where gravitational escape velocity exceeds the speed of light."
    },
    "ar": {
      "question": "ما هو الحد المحيط بالثقب الأسود الذي لا يمكن لأي شيء، حتى الضوء، الهروب بعد تجاوزه؟",
      "options": [
        "نقطة التفرد",
        "قرص التنامي",
        "أفق الحدث (Event Horizon)",
        "الإرجوسفير"
      ],
      "correctIndex": 2,
      "explanation": "أفق الحدث هو نقطة اللاعودة حول الثقب الأسود حيث تصبح سرعة الإفلات أكبر من سرعة الضوء."
    },
    "fr": {
      "question": "Comment appelle-t-on la frontière d'un trou noir d'où aucune lumière ni matière ne peut s'échapper ?",
      "options": [
        "La singularité",
        "Le disque d'accrétion",
        "L'horizon des événements",
        "La magnétosphère"
      ],
      "correctIndex": 2,
      "explanation": "L'horizon des événements est la limite gravitationnelle absolue d'un trou noir."
    }
  },
  {
    "id": "spc-07",
    "category": "space",
    "en": {
      "question": "Who was the first human being to travel into outer space (orbiting Earth on April 12, 1961)?",
      "options": [
        "Neil Armstrong",
        "John Glenn",
        "Alan Shepard",
        "Yuri Gagarin"
      ],
      "correctIndex": 3,
      "explanation": "Soviet cosmonaut Yuri Gagarin completed a 108-minute single orbit aboard Vostok 1."
    },
    "ar": {
      "question": "من هو أول رائد فضاء في التاريخ يسافر إلى الفضاء الخارجي ويدور حول الأرض عام ١٩٦١؟",
      "options": [
        "نيل أرمسترونج",
        "جون غلين",
        "ألان شيبارد",
        "يوري جاجارين"
      ],
      "correctIndex": 3,
      "explanation": "رائد الفضاء السوفيتي يوري جاجارين هو أول إنسان يصعد إلى الفضاء على متن مركبة فوستوك ١."
    },
    "fr": {
      "question": "Qui est le premier être humain à avoir voyagé dans l'espace le 12 avril 1961 ?",
      "options": [
        "Neil Armstrong",
        "Buzz Aldrin",
        "Alan Shepard",
        "Youri Gagarine"
      ],
      "correctIndex": 3,
      "explanation": "Le cosmonaute soviétique Youri Gagarine a accompli une orbite complète à bord de Vostok 1."
    }
  },
  {
    "id": "spc-08",
    "category": "space",
    "en": {
      "question": "In what year did the Apollo 11 mission land humans on the Moon for the first time?",
      "options": [
        "1969",
        "1965",
        "1972",
        "1975"
      ],
      "correctIndex": 0,
      "explanation": "On July 20, 1969, Neil Armstrong and Buzz Aldrin landed the Apollo Lunar Module Eagle on the Moon."
    },
    "ar": {
      "question": "في أي عام هبطت بعثة أبولو ١١ على سطح القمر لأول مرة في تاريخ البشرية؟",
      "options": [
        "١٩٦٩",
        "١٩٦٥",
        "١٩٧٢",
        "١٩٧٥"
      ],
      "correctIndex": 0,
      "explanation": "في ٢٠ يوليو ١٩٦٩ هبط نيل أرمسترونج وبز ألدرين على سطح القمر محققين إنجازاً تاريخياً."
    },
    "fr": {
      "question": "En quelle année la mission Apollo 11 s'est-elle posée sur la Lune pour la première fois ?",
      "options": [
        "1969",
        "1965",
        "1972",
        "1975"
      ],
      "correctIndex": 0,
      "explanation": "Le 20 juillet 1969, Neil Armstrong et Buzz Aldrin ont foulé le sol lunaire."
    }
  },
  {
    "id": "spc-09",
    "category": "space",
    "en": {
      "question": "What is the name of the supermassive black hole located at the gravitational center of the Milky Way?",
      "options": [
        "Cygnus X-1",
        "Sagittarius A*",
        "Messier 87*",
        "Gargantua"
      ],
      "correctIndex": 1,
      "explanation": "Sagittarius A* (pronounced Sagittarius A-star) has a mass approximately 4.3 million times that of our Sun."
    },
    "ar": {
      "question": "ما هو اسم الثقب الأسود الهائل فائق الكتلة الواقع في مركز مجرتنا درب التبانة؟",
      "options": [
        "الدجاجة X-1",
        "الرامي أ* (Sagittarius A*)",
        "مسييه 87*",
        "جورجانتوا"
      ],
      "correctIndex": 1,
      "explanation": "الثقب الأسود الرامي أ* تبلغ كتلته حوالي ٤.٣ مليون ضعف كتلة الشمس ويقع في قلب مجرتنا."
    },
    "fr": {
      "question": "Quel est le nom du trou noir supermassif situé au centre de notre galaxie ?",
      "options": [
        "Cygnus X-1",
        "Sagittarius A*",
        "M87*",
        "Centaurus A"
      ],
      "correctIndex": 1,
      "explanation": "Sagittarius A* possède une masse équivalente à environ 4,3 millions de soleils."
    }
  },
  {
    "id": "spc-10",
    "category": "space",
    "en": {
      "question": "Which of Jupiter's moons is the most volcanically active body in the entire solar system?",
      "options": [
        "Europa",
        "Ganymede",
        "Io",
        "Callisto"
      ],
      "correctIndex": 2,
      "explanation": "Io experiences intense tidal heating from Jupiter's gravitational tug-of-war, driving hundreds of active volcanoes."
    },
    "ar": {
      "question": "أي من أقمار المشتري يعتبر الجرم الأكثر نشاطاً بركانياً في كامل النظام الشمسي؟",
      "options": [
        "أوروبا",
        "غانيميد",
        "آيو (Io)",
        "كاليستو"
      ],
      "correctIndex": 2,
      "explanation": "قمر آيو يضم مئات البراكين النشطة بسبب قوى المد والجزر الجاذبية الهائلة من كوكب المشتري."
    },
    "fr": {
      "question": "Quelle lune de Jupiter est le corps le plus géologiquement et volcaniquement actif du système solaire ?",
      "options": [
        "Europe",
        "Ganymède",
        "Io",
        "Callisto"
      ],
      "correctIndex": 2,
      "explanation": "Io subit d'intenses forces de marée gravitationnelles qui alimentent des centaines de volcans actifs."
    }
  },
  {
    "id": "spc-11",
    "category": "space",
    "en": {
      "question": "What space telescope, launched on Christmas Day 2021, orbits the Sun-Earth L2 Lagrange point?",
      "options": [
        "Hubble Space Telescope",
        "Kepler Observatory",
        "Spitzer Space Telescope",
        "James Webb Space Telescope (JWST)"
      ],
      "correctIndex": 3,
      "explanation": "The James Webb Space Telescope uses a 6.5-meter gold-coated primary mirror to observe infrared light from the early universe."
    },
    "ar": {
      "question": "ما هو التلسكوب الفضائي المتطور الذي أُطلق أواخر عام ٢٠٢١ ويعمل بالأشعة تحت الحمراء عند نقطة لاغرانج L2؟",
      "options": [
        "تلسكوب هابل",
        "مرصد كبلر",
        "تلسكوب سبيتزر",
        "تلسكوب جيمس ويب الفضائي (JWST)"
      ],
      "correctIndex": 3,
      "explanation": "تلسكوب جيمس ويب يمتلك مرآة ذهبية عملاقة قطرها ٦.٥ متر لرصد أقدم المجرات والنجوم."
    },
    "fr": {
      "question": "Quel télescope spatial infrarouge révolutionnaire a été lancé en décembre 2021 vers le point L2 ?",
      "options": [
        "Hubble",
        "Kepler",
        "Spitzer",
        "Le télescope spatial James Webb (JWST)"
      ],
      "correctIndex": 3,
      "explanation": "Le JWST étudie l'univers primitif et la formation des galaxies grâce à son miroir géant."
    }
  },
  {
    "id": "spc-12",
    "category": "space",
    "en": {
      "question": "What is the largest moon in the solar system, even larger in diameter than the planet Mercury?",
      "options": [
        "Ganymede (Jupiter)",
        "Titan (Saturn)",
        "Triton (Neptune)",
        "Callisto (Jupiter)"
      ],
      "correctIndex": 0,
      "explanation": "Ganymede has a diameter of 5,268 km (larger than Mercury at 4,879 km) and possesses its own magnetic field."
    },
    "ar": {
      "question": "ما هو أكبر قمر في المجموعة الشمسية، وحجمه يفوق حتى كوكب عطارد؟",
      "options": [
        "غانيميد (المشتري)",
        "تيتان (زحل)",
        "تريتون (نبتون)",
        "كاليستو (المشتري)"
      ],
      "correctIndex": 0,
      "explanation": "قمر غانيميد التابع للمشتري هو الأكبر في النظام الشمسي وله مجاله المغناطيسي الخاص."
    },
    "fr": {
      "question": "Quelle est la plus grande lune du système solaire, plus grande en diamètre que la planète Mercure ?",
      "options": [
        "Ganymède (Jupiter)",
        "Titan (Saturne)",
        "Triton (Neptune)",
        "Callisto (Jupiter)"
      ],
      "correctIndex": 0,
      "explanation": "Ganymède mesure 5 268 km de diamètre, dépassant Mercure."
    }
  },
  {
    "id": "spc-13",
    "category": "space",
    "en": {
      "question": "What is the distance light travels in one Julian year (approx. 9.46 trillion km)?",
      "options": [
        "Astronomical Unit (AU)",
        "Light-year",
        "Parsec",
        "Kiloparsec"
      ],
      "correctIndex": 1,
      "explanation": "A light-year is the astronomical distance light travels in a vacuum over one full year (~9.46 x 10^12 km)."
    },
    "ar": {
      "question": "ماذا تسمى المسافة التي يقطعها الضوء في الفراغ خلال سنة كاملة (حوالي ٩.٤٦ تريليون كيلومتر)؟",
      "options": [
        "الوحدة الفلكية (AU)",
        "السنة الضوئية (Light-year)",
        "الفرسخ الفلكي (Parsec)",
        "الكيلوفرسخ"
      ],
      "correctIndex": 1,
      "explanation": "السنة الضوئية هي وحدة لقياس المسافات الشاسعة بين النجوم وتعادل ٩.٤٦ تريليون كم."
    },
    "fr": {
      "question": "Comment appelle-t-on la distance parcourue par la lumière dans le vide en une année (environ 9 460 milliards de km) ?",
      "options": [
        "L'Unité Astronomique (UA)",
        "L'année-lumière",
        "Le parsec",
        "L'angström"
      ],
      "correctIndex": 1,
      "explanation": "L'année-lumière est une unité de distance valant environ 9,46 x 10^12 kilomètres."
    }
  },
  {
    "id": "spc-14",
    "category": "space",
    "en": {
      "question": "What celestial object in our solar system was reclassified from a planet to a \"dwarf planet\" by the IAU in 2006?",
      "options": [
        "Ceres",
        "Eris",
        "Pluto",
        "Sedna"
      ],
      "correctIndex": 2,
      "explanation": "Pluto was reclassified because it has not cleared its neighboring orbital region in the Kuiper Belt."
    },
    "ar": {
      "question": "ما هو الجرم الفلكي في نظامنا الشمسي الذي أعاد الاتحاد الفلكي الدولي تصنيفه من كوكب إلى \"كوكب قزم\" عام ٢٠٠٦؟",
      "options": [
        "سيريس",
        "إيريس",
        "بلوتو (Pluto)",
        "سيدنا"
      ],
      "correctIndex": 2,
      "explanation": "أعيد تصنيف بلوتو ككوكب قزم لأنه لم ينظف مداره في حزام كايبر من الأجرام الأخرى."
    },
    "fr": {
      "question": "Quel corps céleste a été reclassé de « planète » à « planète naine » par l'UAI en 2006 ?",
      "options": [
        "Cérès",
        "Éris",
        "Pluton",
        "Sedna"
      ],
      "correctIndex": 2,
      "explanation": "Pluton a été rétrogradée au rang de planète naine car elle n'a pas nettoyé son orbite."
    }
  },
  {
    "id": "spc-15",
    "category": "space",
    "en": {
      "question": "What is the nuclear reaction that powers the core of the Sun and main-sequence stars?",
      "options": [
        "Nuclear Fission of Uranium",
        "Radioactive Alpha Decay",
        "Chemical combustion",
        "Nuclear Fusion of Hydrogen into Helium"
      ],
      "correctIndex": 3,
      "explanation": "The Sun fuses approximately 600 million tons of hydrogen into helium every second in its core, releasing radiant energy."
    },
    "ar": {
      "question": "ما هو التفاعل النووي الأساسي الذي يمد الشمس ونجوم التتابع الرئيسي بالطاقة والضوء في نواتها؟",
      "options": [
        "الانشطار النووي لليورانيوم",
        "تحلل ألفا الإشعاعي",
        "الاحتراق الكيميائي",
        "الاندماج النووي للهيدروجين إلى هيليوم"
      ],
      "correctIndex": 3,
      "explanation": "تدمج الشمس في نواتها ملايين الأطنان من أنوية الهيدروجين لتكوين الهيليوم مطلقاً طاقة شمسية هائلة."
    },
    "fr": {
      "question": "Quel processus nucléaire produit l'énergie au cœur du Soleil et de la plupart des étoiles ?",
      "options": [
        "La fission de l'uranium",
        "La désintégration bêta",
        "La combustion chimique",
        "La fusion nucléaire de l'hydrogène en hélium"
      ],
      "correctIndex": 3,
      "explanation": "La fusion thermonucléaire transforme l'hydrogène en hélium au cœur des étoiles."
    }
  },
  {
    "id": "spc-16",
    "category": "space",
    "en": {
      "question": "Which planet rotates on its side with an axial tilt of approximately 98 degrees?",
      "options": [
        "Uranus",
        "Saturn",
        "Neptune",
        "Venus"
      ],
      "correctIndex": 0,
      "explanation": "Uranus has an extreme tilt of 97.77°, likely caused by a massive protoplanet collision early in its history."
    },
    "ar": {
      "question": "أي كوكب يدور حول نفسه بشكل شبه أفقي (على جنبه) بميل محوري يبلغ نحو ٩٨ درجة؟",
      "options": [
        "أورانوس (Uranus)",
        "زحل",
        "نبتون",
        "الزهرة"
      ],
      "correctIndex": 0,
      "explanation": "يميل محور دوران أورانوس بزاوية ٩٨ درجة تقريباً مما يجعله يدور وكأنه يتدحرج في مداره."
    },
    "fr": {
      "question": "Quelle planète tourne sur elle-même presque « couchée sur le côté » avec une inclinaison axiale de 98° ?",
      "options": [
        "Uranus",
        "Saturne",
        "Neptune",
        "Vénus"
      ],
      "correctIndex": 0,
      "explanation": "L'axe de rotation d'Uranus est incliné à environ 98 degrés par rapport à son plan orbital."
    }
  },
  {
    "id": "spc-17",
    "category": "space",
    "en": {
      "question": "What is the name of Saturn's giant moon that features a dense nitrogen atmosphere and liquid methane lakes?",
      "options": [
        "Enceladus",
        "Titan",
        "Mimas",
        "Iapetus"
      ],
      "correctIndex": 1,
      "explanation": "Titan is the only moon with a substantial atmosphere and stable liquid lakes (composed of liquid methane and ethane)."
    },
    "ar": {
      "question": "ما هو اسم قمر زحل العملاق الذي يمتلك غلافاً جوياً سميكاً من النيتروجين وبحيرات من الميثان السائل؟",
      "options": [
        "إنسيلادوس",
        "تيتان (Titan)",
        "ميماس",
        "يابيتوس"
      ],
      "correctIndex": 1,
      "explanation": "تيتان هو القمر الوحيد في المجموعة الشمسية ذو غلاف جوي كثيف وبحيرات هيدروكربونية سائلة."
    },
    "fr": {
      "question": "Quelle lune de Saturne possède une atmosphère dense d'azote et des lacs d'hydrocarbures liquides ?",
      "options": [
        "Encelade",
        "Titan",
        "Mimas",
        "Japet"
      ],
      "correctIndex": 1,
      "explanation": "Titan est doté d'une atmosphère épaisse et d'un cycle météorologique basé sur le méthane liquide."
    }
  },
  {
    "id": "spc-18",
    "category": "space",
    "en": {
      "question": "What is the approximate speed of the International Space Station (ISS) in Low Earth Orbit?",
      "options": [
        "5,000 km/h",
        "15,000 km/h",
        "27,600 km/h (~7.66 km/s)",
        "60,000 km/h"
      ],
      "correctIndex": 2,
      "explanation": "The ISS orbits Earth every ~90 minutes at a speed of about 27,600 km/h (17,150 mph) at an altitude of ~400 km."
    },
    "ar": {
      "question": "كم تبلغ سرعة محطة الفضاء الدولية (ISS) أثناء دورانها في المدار الأرضي المنخفض؟",
      "options": [
        "٥ آلاف كم/ساعة",
        "١٥ ألف كم/ساعة",
        "٢٧,٦٠٠ كم/ساعة (~٧.٦ كم/ثانية)",
        "٦٠ ألف كم/ساعة"
      ],
      "correctIndex": 2,
      "explanation": "تدور محطة الفضاء الدولية حول الأرض دورة كاملة كل ٩٠ دقيقة بسرعة تبلغ حوالي ٢٧,٦٠٠ كم/ساعة."
    },
    "fr": {
      "question": "Quelle est la vitesse orbitale approximative de la Station Spatiale Internationale (ISS) ?",
      "options": [
        "5 000 km/h",
        "15 000 km/h",
        "27 600 km/h (~7,7 km/s)",
        "60 000 km/h"
      ],
      "correctIndex": 2,
      "explanation": "L'ISS file à environ 27 600 km/h, effectuant 16 tours de la Terre par 24 heures."
    }
  },
  {
    "id": "spc-19",
    "category": "space",
    "en": {
      "question": "What is the hypothetical remnant core of a collapsed giant star composed almost entirely of neutrons?",
      "options": [
        "White dwarf",
        "Red giant",
        "Brown dwarf",
        "Neutron star (or Pulsar)"
      ],
      "correctIndex": 3,
      "explanation": "A neutron star packs the mass of 1.4–2 Suns into a sphere just 20 km across, with atomic nuclei crushed together."
    },
    "ar": {
      "question": "ماذا يسمى النجم الميت فائق الكثافة الناتج عن انهيار نجم عملاق وتتكون مادته من النيوترونات المتراصة؟",
      "options": [
        "القزم الأبيض",
        "العملاق الأحمر",
        "القزم البني",
        "النجم النيوتروني (Neutron Star / النباض)"
      ],
      "correctIndex": 3,
      "explanation": "النجم النيوتروني يضغط كتلة تعادل الشمس في كرة قطرها ٢٠ كم فقط بكثافة تفوق ملايين الأطنان لملعقة صغيرة."
    },
    "fr": {
      "question": "Comment appelle-t-on le vestige ultra-dense d'une étoile massive effondrée sur elle-même ?",
      "options": [
        "Une naine blanche",
        "Une géante rouge",
        "Une naine brune",
        "Une étoile à neutrons (ou pulsar)"
      ],
      "correctIndex": 3,
      "explanation": "Une étoile à neutrons concentre une masse solaire dans une sphère d'une vingtaine de kilomètres."
    }
  },
  {
    "id": "spc-20",
    "category": "space",
    "en": {
      "question": "What is the faint thermal radiation left over from the Big Bang, discovered by Penzias and Wilson in 1965?",
      "options": [
        "Cosmic Microwave Background (CMB)",
        "Solar Wind",
        "Hawking Radiation",
        "Van Allen Radiation"
      ],
      "correctIndex": 0,
      "explanation": "The CMB is the relic glow of photons freed ~380,000 years after the Big Bang, with a temperature of 2.725 K."
    },
    "ar": {
      "question": "ما هو الإشعاع الحراري الخافت المتبقي من الانفجار العظيم والمكتشف عام ١٩٦٥ كدليل قاطع على نشأة الكون؟",
      "options": [
        "إشعاع الخلفية الكونية الميكروي (CMB)",
        "الرياح الشمسية",
        "إشعاع هوكينج",
        "حزام فان ألين"
      ],
      "correctIndex": 0,
      "explanation": "إشعاع الخلفية الكونية الميكروية هو الصدى الحراري للانفجار العظيم ويملأ كامل أرجاء الفضاء بدرجة ٢.٧ كلفن."
    },
    "fr": {
      "question": "Quel rayonnement thermique fossile de l'univers primitif a été découvert en 1965 ?",
      "options": [
        "Le fond diffus cosmologique (CMB)",
        "Le vent solaire",
        "Le rayonnement de Hawking",
        "Les ceintures de Van Allen"
      ],
      "correctIndex": 0,
      "explanation": "Le fond diffus cosmologique est la première lumière émise après le Big Bang."
    }
  },
  {
    "id": "spc-21",
    "category": "space",
    "en": {
      "question": "What is the main asteroid belt situated between in our solar system?",
      "options": [
        "Earth and Mars",
        "Mars and Jupiter",
        "Jupiter and Saturn",
        "Neptune and Pluto"
      ],
      "correctIndex": 1,
      "explanation": "The asteroid belt lies between the orbits of Mars and Jupiter, containing millions of rocky asteroids including Ceres."
    },
    "ar": {
      "question": "بين أي كوكبين يقع حزام الكويكبات الرئيسي في مجموعتنا الشمسية؟",
      "options": [
        "بين الأرض والمريخ",
        "بين المريخ والمشتري",
        "بين المشتري وزحل",
        "بين نبتون وبلوتو"
      ],
      "correctIndex": 1,
      "explanation": "يقع حزام الكويكبات الرئيسي بين مداري كوكبي المريخ والمشتري ويضم ملايين الأجرام الصخرية."
    },
    "fr": {
      "question": "Entre quelles planètes se situe la ceinture principale d'astéroïdes ?",
      "options": [
        "Entre la Terre et Mars",
        "Entre Mars et Jupiter",
        "Entre Jupiter et Saturne",
        "Entre Neptune et Pluton"
      ],
      "correctIndex": 1,
      "explanation": "La ceinture d'astéroïdes orbite entre les trajectoires de Mars et de Jupiter."
    }
  },
  {
    "id": "spc-22",
    "category": "space",
    "en": {
      "question": "Which space probe, launched in 1977, became the first human-made object to enter interstellar space in 2012?",
      "options": [
        "Pioneer 10",
        "New Horizons",
        "Voyager 1",
        "Galileo"
      ],
      "correctIndex": 2,
      "explanation": "Voyager 1 crossed the heliopause in August 2012, entering interstellar space over 20 billion km from Earth."
    },
    "ar": {
      "question": "ما هو المسبار الفضائي الذي أُطلق عام ١٩٧٧ وأصبح أول جسم من صنع الإنسان يدخل الفضاء بين النجمي عام ٢٠١٢؟",
      "options": [
        "بايونير ١٠",
        "نيو هورايزونز",
        "فوياجر ١ (Voyager 1)",
        "جاليليو"
      ],
      "correctIndex": 2,
      "explanation": "عبر مسبار فوياجر ١ حافة النظام الشمسي عام ٢٠١٢ وهو أبعد جرم صنعه الإنسان عن كوكب الأرض."
    },
    "fr": {
      "question": "Quelle sonde spatiale lancée en 1977 est le premier objet humain à avoir atteint l'espace interstellaire ?",
      "options": [
        "Pioneer 10",
        "New Horizons",
        "Voyager 1",
        "Cassini"
      ],
      "correctIndex": 2,
      "explanation": "Voyager 1 a franchi l'héliopause en 2012 et poursuit sa course dans le milieu interstellaire."
    }
  },
  {
    "id": "spc-23",
    "category": "space",
    "en": {
      "question": "What is the closest individual star system to our solar system (approx. 4.24 light-years away)?",
      "options": [
        "Sirius",
        "Barnard's Star",
        "Betelgeuse",
        "Alpha Centauri / Proxima Centauri"
      ],
      "correctIndex": 3,
      "explanation": "Proxima Centauri (part of the Alpha Centauri system) is the nearest known star to Earth at 4.246 light-years."
    },
    "ar": {
      "question": "ما هو أقرب نظام نجمي على الإطلاق إلى مجموعتنا الشمسية (يبعد حوالي ٤.٢٤ سنة ضوئية)؟",
      "options": [
        "نجم الشعرى اليمانية",
        "نجم برنارد",
        "منكب الجوزاء",
        "رجل القنطور / بروكسيما قنطورس (Alpha Centauri)"
      ],
      "correctIndex": 3,
      "explanation": "نجم بروكسيما قنطورس التابع لنظام ألفا قنطورس هو أقرب النجوم إلينا بعد الشمس."
    },
    "fr": {
      "question": "Quel est le système stellaire le plus proche de notre système solaire (à environ 4,24 années-lumière) ?",
      "options": [
        "Sirius",
        "Véga",
        "Bételgeuse",
        "Alpha du Centaure (Proxima Centauri)"
      ],
      "correctIndex": 3,
      "explanation": "Proxima du Centaure est l'étoile la plus proche du Soleil."
    }
  },
  {
    "id": "spc-24",
    "category": "space",
    "en": {
      "question": "What astronomical event occurs when the Moon passes directly between the Earth and the Sun?",
      "options": [
        "Solar eclipse",
        "Lunar eclipse",
        "Equinox",
        "Solstice"
      ],
      "correctIndex": 0,
      "explanation": "A solar eclipse happens when the Moon casts its shadow (umbra/penumbra) upon the Earth's surface."
    },
    "ar": {
      "question": "ماذا تسمى الظاهرة الفلكية التي يمر فيها القمر مباشرة بين الأرض والشمس فيحجب ضوءها؟",
      "options": [
        "كسوف الشمس (Solar Eclipse)",
        "خسوف القمر",
        "الاعتدال الفلكي",
        "الانقلاب الصيفي"
      ],
      "correctIndex": 0,
      "explanation": "كسوف الشمس يحدث عند وقوع القمر بين الشمس والأرض على خط استقامة واحد حاجبياً قرص الشمس."
    },
    "fr": {
      "question": "Quel événement astronomique se produit lorsque la Lune s'interpose entre la Terre et le Soleil ?",
      "options": [
        "Une éclipse solaire",
        "Une éclipse lunaire",
        "L'équinoxe",
        "Le solstice"
      ],
      "correctIndex": 0,
      "explanation": "Une éclipse solaire se produit quand la Lune masque tout ou partie du Soleil vu depuis la Terre."
    }
  },
  {
    "id": "spc-25",
    "category": "space",
    "en": {
      "question": "What famous periodic comet visits the inner solar system every 75–76 years, next visible from Earth in 2061?",
      "options": [
        "Comet Hale-Bopp",
        "Halley's Comet (1P/Halley)",
        "Comet Encke",
        "Comet NEOWISE"
      ],
      "correctIndex": 1,
      "explanation": "Halley's Comet was last observed in 1986 and will return to perihelion in mid-2061."
    },
    "ar": {
      "question": "ما هو المذنب الدوري الشهير الذي يزور الجزء الداخلي للنظام الشمسي كل ٧٥–٧٦ عاماً وسيظهر مجدداً في ٢٠٦١؟",
      "options": [
        "مذنب هيل-بوب",
        "مذنب هالي (Halley's Comet)",
        "مذنب إنكي",
        "مذنب نيوايز"
      ],
      "correctIndex": 1,
      "explanation": "مذنب هالي شوهد آخر مرة عام ١٩٨٦ وسيمر بالقرب من كوكب الأرض مرة أخرى عام ٢٠٦١."
    },
    "fr": {
      "question": "Quelle comète périodique célèbre revient dans le ciel terrestre tous les 75 à 76 ans (prochain passage en 2061) ?",
      "options": [
        "La comète Hale-Bopp",
        "La comète de Halley",
        "La comète Encke",
        "La comète Neowise"
      ],
      "correctIndex": 1,
      "explanation": "La comète de Halley est la plus connue des comètes périodiques observables à l'œil nu."
    }
  }
];

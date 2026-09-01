import { TriviaQuestion } from '../../types';

export const BIOLOGY_QUESTIONS: TriviaQuestion[] = [
  {
    "id": "bio-01",
    "category": "biology",
    "en": {
      "question": "Which organelle is known as the \"protein factory\" of biological cells?",
      "options": [
        "Lysosome",
        "Ribosome",
        "Golgi Apparatus",
        "Peroxisome"
      ],
      "correctIndex": 1,
      "explanation": "Ribosomes translate mRNA into amino acid sequences to synthesize cellular proteins."
    },
    "ar": {
      "question": "أي عضي خلوي يُعرف بـ \"مصنع البروتينات\" في الخلية الحية؟",
      "options": [
        "الليسوسوم (الجسم الهاضم)",
        "الريبوسوم",
        "جهاز جولجي",
        "البيروكسيسوم"
      ],
      "correctIndex": 1,
      "explanation": "الريبوسومات تترجم الحمض النووي الريبوزي (mRNA) وتصنع البروتينات الأساسية للخلية."
    },
    "fr": {
      "question": "Quel organite cellulaire est responsable de la synthèse des protéines ?",
      "options": [
        "Le lysosome",
        "Le ribosome",
        "L'appareil de Golgi",
        "Le peroxysome"
      ],
      "correctIndex": 1,
      "explanation": "Les ribosomes assemblent les acides aminés en protéines selon le code génétique de l'ARNm."
    }
  },
  {
    "id": "bio-02",
    "category": "biology",
    "en": {
      "question": "How many chromosomes are in a normal diploid human somatic cell?",
      "options": [
        "23 chromosomes",
        "48 chromosomes",
        "46 chromosomes (23 pairs)",
        "92 chromosomes"
      ],
      "correctIndex": 2,
      "explanation": "Normal human somatic cells contain 46 chromosomes organized into 23 homologous pairs."
    },
    "ar": {
      "question": "كم عدد الكروموسومات (الصبغيات) في الخلية الجسدية الطبيعية للإنسان؟",
      "options": [
        "٢٣ كروموسوماً",
        "٤٨ كروموسوماً",
        "٤٦ كروموسوماً (٢٣ زوجاً)",
        "٩٢ كروموسوماً"
      ],
      "correctIndex": 2,
      "explanation": "تحتوي الخلية الجسدية البشرية الطبيعية على ٤٦ كروموسوماً موزعة في ٢٣ زوجاً متماثلاً."
    },
    "fr": {
      "question": "Combien de chromosomes contient une cellule somatique humaine normale ?",
      "options": [
        "23 chromosomes",
        "48 chromosomes",
        "46 chromosomes (23 paires)",
        "92 chromosomes"
      ],
      "correctIndex": 2,
      "explanation": "Les cellules humaines contiennent 46 chromosomes (23 paires héritées de chaque parent)."
    }
  },
  {
    "id": "bio-03",
    "category": "biology",
    "en": {
      "question": "Which base pairs with Adenine in standard DNA double-helix molecules?",
      "options": [
        "Guanine",
        "Cytosine",
        "Uracil",
        "Thymine"
      ],
      "correctIndex": 3,
      "explanation": "In DNA, Adenine (A) pairs strictly with Thymine (T) via two hydrogen bonds (Uracil replaces Thymine in RNA)."
    },
    "ar": {
      "question": "أي قاعدة نيتروجينية ترتبط مع الأدينين في جزيء الحمض النووي DNA؟",
      "options": [
        "الجوانين",
        "السيتوزين",
        "اليوراسيل",
        "الثايمين"
      ],
      "correctIndex": 3,
      "explanation": "في الـ DNA يرتبط الأدينين (A) دائماً مع الثايمين (T) برابطتين هيدروجينيتين."
    },
    "fr": {
      "question": "Quelle base azotée s'apparie avec l'adénine dans la molécule d'ADN ?",
      "options": [
        "La guanine",
        "La cytosine",
        "L'uracile",
        "La thymine"
      ],
      "correctIndex": 3,
      "explanation": "Dans l'ADN, l'adénine (A) forme toujours des liaisons avec la thymine (T)."
    }
  },
  {
    "id": "bio-04",
    "category": "biology",
    "en": {
      "question": "What is the largest living species of animal currently inhabiting planet Earth?",
      "options": [
        "Blue Whale",
        "African Bush Elephant",
        "Colossal Squid",
        "Whale Shark"
      ],
      "correctIndex": 0,
      "explanation": "The Antarctic blue whale (Balaenoptera musculus) can reach 30 meters in length and weigh over 180 tonnes."
    },
    "ar": {
      "question": "ما هو أكبر كائن حي وحيوان يعيش حالياً على كوكب الأرض؟",
      "options": [
        "الحوت الأزرق",
        "الفيل الأفريقي",
        "الحبار العملاق",
        "قرش الحوت"
      ],
      "correctIndex": 0,
      "explanation": "الحوت الأزرق هو أضخم حيوان عاش على وجه الأرض، حيث يزن أكثر من ١٨٠ طناً وطوله يصل إلى ٣٠ متراً."
    },
    "fr": {
      "question": "Quel est le plus grand animal vivant actuellement sur Terre ?",
      "options": [
        "La baleine bleue",
        "L'éléphant d'Afrique",
        "Le calmar colossal",
        "Le requin-baleine"
      ],
      "correctIndex": 0,
      "explanation": "La baleine bleue peut mesurer jusqu'à 30 mètres de long et peser près de 190 tonnes."
    }
  },
  {
    "id": "bio-05",
    "category": "biology",
    "en": {
      "question": "What type of symbiotic relationship benefits one organism while having no effect on the other?",
      "options": [
        "Mutualism",
        "Commensalism",
        "Parasitism",
        "Amensalism"
      ],
      "correctIndex": 1,
      "explanation": "Commensalism is a relationship where one species benefits while the host is neither helped nor harmed (e.g. barnacles on whales)."
    },
    "ar": {
      "question": "ما نوع العلاقة التكافلية التي يستفيد فيها كائن حي دون إفادة أو إضرار بالطرف الآخر؟",
      "options": [
        "تبادل المنفعة",
        "التعايش (المعايشة)",
        "التطفل",
        "التنافس"
      ],
      "correctIndex": 1,
      "explanation": "التعايش هو علاقة يستفيد فيها طرف ولا يتأثر الطرف الآخر بأي نفع أو ضرر (مثل البرنقيل على ظهر الحيتان)."
    },
    "fr": {
      "question": "Comment qualifie-t-on une symbiose profitable à une espèce sans impacter l'autre ?",
      "options": [
        "Le mutualisme",
        "Le commensalisme",
        "Le parasitisme",
        "L'amensalisme"
      ],
      "correctIndex": 1,
      "explanation": "Dans le commensalisme, un organisme tire profit de l'association sans nuire ni aider son hôte."
    }
  },
  {
    "id": "bio-06",
    "category": "biology",
    "en": {
      "question": "Which of the following animals is a monotreme (an egg-laying mammal)?",
      "options": [
        "Kangaroo",
        "Koala",
        "Platypus",
        "Armadillo"
      ],
      "correctIndex": 2,
      "explanation": "The Platypus and Echidna are the only surviving monotremes, mammals that lay eggs instead of giving live birth."
    },
    "ar": {
      "question": "أي من الحيوانات التالية يعتبر من الثدييات الأولية التي تبيض بدلاً من الولادة (أحادية المسلك)؟",
      "options": [
        "الكنغر",
        "الكوالا",
        "خلد الماء (البلاتيبوس)",
        "المدرع"
      ],
      "correctIndex": 2,
      "explanation": "خلد الماء وقنفذ النمل الشوكي هما الثدييات الوحيدة في العالم التي تضع البيض وترضع صغارها."
    },
    "fr": {
      "question": "Lequel de ces animaux est un monotrème (mammifère qui pond des œufs) ?",
      "options": [
        "Le kangourou",
        "Le koala",
        "L'ornithorynque",
        "Le tatou"
      ],
      "correctIndex": 2,
      "explanation": "L'ornithorynque et l'échidné sont les seuls mammifères ovipares (qui pondent des œufs)."
    }
  },
  {
    "id": "bio-07",
    "category": "biology",
    "en": {
      "question": "What is the primary function of stomata located on plant leaves?",
      "options": [
        "Absorbing water from soil",
        "Storing starch",
        "Producing flower petals",
        "Gas exchange (CO2 and O2) and transpiration"
      ],
      "correctIndex": 3,
      "explanation": "Stomata are microscopic pore complexes that open and close to regulate carbon dioxide uptake and water vapor loss."
    },
    "ar": {
      "question": "ما هي الوظيفة الأساسية للثغور (المسام) الموجودة على أوراق النباتات؟",
      "options": [
        "امتصاص الماء من التربة",
        "تخزين النشا",
        "تكوين البتلات",
        "تبادل الغازات (CO2 والأكسجين) وتنظيم النتح"
      ],
      "correctIndex": 3,
      "explanation": "تتحكم الثغور في دخول ثاني أكسيد الكربون وخروج الأكسجين وبخار الماء بعملية التنفس والبناء الضوئي."
    },
    "fr": {
      "question": "Quel est le rôle principal des stomates situés sur les feuilles des plantes ?",
      "options": [
        "Absorber l'eau du sol",
        "Stocker les nutriments",
        "Produire des fleurs",
        "Assurer les échanges gazeux (CO2, O2) et la transpiration"
      ],
      "correctIndex": 3,
      "explanation": "Les stomates permettent l'absorption du dioxyde de carbone et régulent l'évapotranspiration."
    }
  },
  {
    "id": "bio-08",
    "category": "biology",
    "en": {
      "question": "What is the fastest animal on land over short sprint distances?",
      "options": [
        "Cheetah",
        "Pronghorn Antelope",
        "Lion",
        "Greyhound"
      ],
      "correctIndex": 0,
      "explanation": "The cheetah (Acinonyx jubatus) can accelerate from 0 to 100 km/h in under 3 seconds, reaching top speeds of ~110–120 km/h."
    },
    "ar": {
      "question": "ما هو أسرع حيوان بري على اليابسة في المسافات القصيرة؟",
      "options": [
        "الفهد الصياد (الشيتا)",
        "الظبي الأمريكي",
        "الأسد الأفريقي",
        "كلب السلوقي"
      ],
      "correctIndex": 0,
      "explanation": "الفهد الصياد هو أسرع كائن بري بسرعة تصل إلى ١٢٠ كم/ساعة وتسارع خارق."
    },
    "fr": {
      "question": "Quel est l'animal terrestre le plus rapide en vitesse de pointe ?",
      "options": [
        "Le guépard",
        "L'antilope d'Amérique",
        "Le lion",
        "Le lévrier"
      ],
      "correctIndex": 0,
      "explanation": "Le guépard peut atteindre des pointes de vitesse jusqu'à 110-120 km/h sur de courtes distances."
    }
  },
  {
    "id": "bio-09",
    "category": "biology",
    "en": {
      "question": "In genetics, who is recognized as the \"Father of Modern Genetics\" for his pea plant experiments?",
      "options": [
        "Charles Darwin",
        "Gregor Mendel",
        "James Watson",
        "Thomas Hunt Morgan"
      ],
      "correctIndex": 1,
      "explanation": "Gregor Mendel formulated the fundamental laws of genetic inheritance through breeding experiments on garden peas in 1865."
    },
    "ar": {
      "question": "من هو العالم الملقب بـ \"مؤسس علم الوراثة الحديث\" بفضل تجاربه على نبات البازلاء؟",
      "options": [
        "تشارلز داروين",
        "جريجور مندل",
        "جيمس واتسون",
        "توماس مورغان"
      ],
      "correctIndex": 1,
      "explanation": "اكتشف الراهب النمساوي جريجور مندل قوانين الوراثة وانتقال الصفات السائدة والمتنحية في البازلاء."
    },
    "fr": {
      "question": "Qui est considéré comme le « père de la génétique moderne » pour ses travaux sur les petits pois ?",
      "options": [
        "Charles Darwin",
        "Gregor Mendel",
        "James Watson",
        "Louis Pasteur"
      ],
      "correctIndex": 1,
      "explanation": "Gregor Mendel a établi les lois de l'hérédité génétique au XIXe siècle."
    }
  },
  {
    "id": "bio-10",
    "category": "biology",
    "en": {
      "question": "What is the structural polysaccharide found in the exoskeletons of insects and crustaceans?",
      "options": [
        "Cellulose",
        "Glycogen",
        "Chitin",
        "Keratin"
      ],
      "correctIndex": 2,
      "explanation": "Chitin is a tough, protective nitrogen-containing polysaccharide forming arthropod shells and fungal cell walls."
    },
    "ar": {
      "question": "ما هو السكر المعقد (البوليسكاريد) الذي يشكل الهيكل الخارجي الصلب للحشرات والقشريات؟",
      "options": [
        "السليلوز",
        "الجليكوجين",
        "الكيتين",
        "الكيراتين"
      ],
      "correctIndex": 2,
      "explanation": "الكيتين هو المادة القوية التي تكون الهيكل الخارجي للمفصليات وجدران خلايا الفطريات."
    },
    "fr": {
      "question": "Quel glucide complexe forme l'exosquelette des insectes et des crustacés ?",
      "options": [
        "La cellulose",
        "Le glycogène",
        "La chitine",
        "La kératine"
      ],
      "correctIndex": 2,
      "explanation": "La chitine est un composant majeur de la carapace des arthropodes et de la paroi des champignons."
    }
  },
  {
    "id": "bio-11",
    "category": "biology",
    "en": {
      "question": "Which biological taxon ranks directly between \"Class\" and \"Family\" in the Linnaean hierarchy?",
      "options": [
        "Phylum",
        "Species",
        "Genus",
        "Order"
      ],
      "correctIndex": 3,
      "explanation": "The standard hierarchy is Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species."
    },
    "ar": {
      "question": "ما هي المرتبة التصنيفية الحيوية التي تقع مباشرة بين \"الطائفة\" و\"الفصيلة\" في تصنيف لينيوس؟",
      "options": [
        "الشعبة",
        "النوع",
        "الجنس",
        "الرتبة (Order)"
      ],
      "correctIndex": 3,
      "explanation": "تسلسل المراتب الحيوية: المملكة، الشعبة، الطائفة، الرتبة، الفصيلة، الجنس، النوع."
    },
    "fr": {
      "question": "Dans la classification classique des êtres vivants, quel rang se trouve entre la « Classe » et la « Famille » ?",
      "options": [
        "L'embranchement",
        "L'espèce",
        "Le genre",
        "L'ordre"
      ],
      "correctIndex": 3,
      "explanation": "L'ordre se situe entre la classe et la famille (Règne > Embranchement > Classe > Ordre > Famille > Genre > Espèce)."
    }
  },
  {
    "id": "bio-12",
    "category": "biology",
    "en": {
      "question": "What is the primary light-absorbing pigment in photosynthesis that gives plants their green color?",
      "options": [
        "Chlorophyll",
        "Carotenoid",
        "Anthocyanin",
        "Xanthophyll"
      ],
      "correctIndex": 0,
      "explanation": "Chlorophyll a and b absorb blue and red light while reflecting green wavelengths back to our eyes."
    },
    "ar": {
      "question": "ما هي الصبغة الأساسية الماصة للضوء والتي تمنح أوراق النباتات لونها الأخضر المميز؟",
      "options": [
        "الكلوروفيل (اليخضور)",
        "الكاروتين",
        "الأنثوسيانين",
        "الزانثوفيل"
      ],
      "correctIndex": 0,
      "explanation": "الكلوروفيل يمتص الأطوال الموجية الزرقاء والحمراء ويعكس اللون الأخضر."
    },
    "fr": {
      "question": "Quel est le pigment végétal principal responsable de la couleur verte des feuilles ?",
      "options": [
        "La chlorophylle",
        "Le carotène",
        "L'anthocyane",
        "La xanthophylle"
      ],
      "correctIndex": 0,
      "explanation": "La chlorophylle absorbe la lumière rouge et bleue tout en réfléchissant la lumière verte."
    }
  },
  {
    "id": "bio-13",
    "category": "biology",
    "en": {
      "question": "Which kingdom of organisms includes mushrooms, yeasts, and molds?",
      "options": [
        "Plantae",
        "Fungi",
        "Protista",
        "Monera"
      ],
      "correctIndex": 1,
      "explanation": "Fungi are eukaryotic, heterotrophic organisms with chitinous cell walls, distinct from plants and animals."
    },
    "ar": {
      "question": "أي مملكة من ممالك الكائنات الحية تشمل الفطر (عيش الغراب)، الخمائر، والأعفان؟",
      "options": [
        "مملكة النباتات",
        "مملكة الفطريات",
        "مملكة الطلائعيات",
        "مملكة البدائيات"
      ],
      "correctIndex": 1,
      "explanation": "مملكة الفطريات هي كائنات حقيقية النواة غير ذاتية التغذية ولها جدران خلوية من الكيتين."
    },
    "fr": {
      "question": "À quel règne du vivant appartiennent les champignons, les levures et les moisissures ?",
      "options": [
        "Les végétaux",
        "Les eumycètes (Fungi)",
        "Les protistes",
        "Les bactéries"
      ],
      "correctIndex": 1,
      "explanation": "Le règne des champignons (Fungi) regroupe des organismes eucaryotes hétérotrophes."
    }
  },
  {
    "id": "bio-14",
    "category": "biology",
    "en": {
      "question": "What is the only flying mammal in the animal kingdom?",
      "options": [
        "Flying Squirrel",
        "Sugar Glider",
        "Bat",
        "Colugo"
      ],
      "correctIndex": 2,
      "explanation": "Bats (order Chiroptera) are the only mammals capable of true sustained powered flight."
    },
    "ar": {
      "question": "ما هو الحيوان الثديي الوحيد القادر على الطيران الحقيقي في مملكة الحيوان؟",
      "options": [
        "السنجاب الطائر",
        "الشراع الطائر",
        "الخفاش (الوطواط)",
        "الكولوجو"
      ],
      "correctIndex": 2,
      "explanation": "الخفافيش هي الثدييات الوحيدة التي تمتلك أجنحة حقيقية تمكنها من الطيران والدوران بدقة."
    },
    "fr": {
      "question": "Quel est le seul mammifère capable de vol actif et soutenu dans le règne animal ?",
      "options": [
        "L'écureuil volant",
        "Le phalanger volant",
        "La chauve-souris",
        "Le galéopithèque"
      ],
      "correctIndex": 2,
      "explanation": "Les chauves-souris (chiroptères) sont les seuls mammifères dotés de la faculté de vol battu."
    }
  },
  {
    "id": "bio-15",
    "category": "biology",
    "en": {
      "question": "What is the term for cellular division that produces four genetically diverse haploid gamete cells?",
      "options": [
        "Mitosis",
        "Budding",
        "Binary Fission",
        "Meiosis"
      ],
      "correctIndex": 3,
      "explanation": "Meiosis reduces chromosome count by half to form sperm and egg cells, creating genetic diversity via crossing over."
    },
    "ar": {
      "question": "ما هو الانقسام الخلوي الذي ينتج عنه ٤ خلايا جنسية (أمشاج) أحادية المجموعة الكروموسومية ومتنوعة وراثياً؟",
      "options": [
        "الانقسام المتساوي (الميتوزي)",
        "التبرعم",
        "الانشطار الثنائي",
        "الانقسام المنصف (الميوزي)"
      ],
      "correctIndex": 3,
      "explanation": "الانقسام المنصف (الميوزي) ينصف عدد الكروموسومات لإنتاج الحيوانات المنوية والبويضات."
    },
    "fr": {
      "question": "Quel processus de division cellulaire produit quatre cellules filles haploïdes pour la reproduction ?",
      "options": [
        "La mitose",
        "Le bourgeonnement",
        "La scissiparité",
        "La méiose"
      ],
      "correctIndex": 3,
      "explanation": "La méiose divise par deux le nombre de chromosomes pour former les gamètes (ovules et spermatozoïdes)."
    }
  },
  {
    "id": "bio-16",
    "category": "biology",
    "en": {
      "question": "Which biological kingdom do single-celled amoebas, paramecia, and diatoms belong to?",
      "options": [
        "Protista",
        "Monera",
        "Fungi",
        "Plantae"
      ],
      "correctIndex": 0,
      "explanation": "Protista includes mostly unicellular eukaryotic microorganisms that are not plants, animals, or fungi."
    },
    "ar": {
      "question": "إلى أي مملكة حيوية تنتمي كائنات وحيدة الخلية مثل الأميبا، البراميسيوم، والدياتومات؟",
      "options": [
        "الطلائعيات (Protista)",
        "البدائيات",
        "الفطريات",
        "النباتات"
      ],
      "correctIndex": 0,
      "explanation": "مملكة الطلائعيات تضم كائنات حقيقية النواة أغلبها وحيد الخلية وتعيش غالباً في البيئات المائية."
    },
    "fr": {
      "question": "À quel règne appartiennent l'amibe, la paramécie et les diatomées ?",
      "options": [
        "Les protistes",
        "Les monères",
        "Les champignons",
        "Les métazoaires"
      ],
      "correctIndex": 0,
      "explanation": "Les protistes regroupent des micro-organismes eucaryotes pour la plupart unicellulaires."
    }
  },
  {
    "id": "bio-17",
    "category": "biology",
    "en": {
      "question": "How many chambers are inside a mammalian heart (including human)?",
      "options": [
        "2 chambers",
        "4 chambers",
        "3 chambers",
        "5 chambers"
      ],
      "correctIndex": 1,
      "explanation": "Mammals and birds have a four-chambered heart: two atria and two ventricles, completely separating oxygenated and deoxygenated blood."
    },
    "ar": {
      "question": "كم عدد الحجرات الموجودة داخل قلب الثدييات (بما فيها الإنسان)؟",
      "options": [
        "حجرتان",
        "٤ حجرات (أذينان وبطينان)",
        "٣ حجرات",
        "٥ حجرات"
      ],
      "correctIndex": 1,
      "explanation": "يتكون قلب الثدييات من ٤ حجرات: أذين أيمن وأيسر، وبطين أيمن وأيسر لفصل الدم المؤكسج عن غير المؤكسج."
    },
    "fr": {
      "question": "Combien de cavités (chambres) composent le cœur des mammifères ?",
      "options": [
        "2 cavités",
        "4 cavités (2 oreillettes et 2 ventricules)",
        "3 cavités",
        "5 cavités"
      ],
      "correctIndex": 1,
      "explanation": "Le cœur des mammifères et oiseaux comporte 4 cavités séparant strictement le sang veineux du sang artériel."
    }
  },
  {
    "id": "bio-18",
    "category": "biology",
    "en": {
      "question": "What is the largest living species of bird in the world by height and mass?",
      "options": [
        "Emu",
        "Emperor Penguin",
        "Ostrich",
        "Southern Cassowary"
      ],
      "correctIndex": 2,
      "explanation": "The Common Ostrich (Struthio camelus) can grow up to 2.8 meters tall and weigh over 140 kg."
    },
    "ar": {
      "question": "ما هو أكبر نوع من الطيور الحية في العالم من حيث الارتفاع والوزن؟",
      "options": [
        "الإيمو",
        "بطريق الإمبراطور",
        "النعامة الإفريقية",
        "الشبنم (الكاسواري)"
      ],
      "correctIndex": 2,
      "explanation": "النعامة هي أضخم طائر على الكوكب، يصل ارتفاعها لنحو ٢.٨ متر وتضع أكبر بيضة بين الكائنات الحية."
    },
    "fr": {
      "question": "Quelle est la plus grande espèce d'oiseau vivante au monde ?",
      "options": [
        "L'émeu",
        "Le manchot empereur",
        "L'autruche d'Afrique",
        "Le casoar"
      ],
      "correctIndex": 2,
      "explanation": "L'autruche peut mesurer près de 2,80 m et peser jusqu'à 150 kg."
    }
  },
  {
    "id": "bio-19",
    "category": "biology",
    "en": {
      "question": "What is the protective gel-like outer layer of bacteria that prevents phagocytosis?",
      "options": [
        "Pilus",
        "Flagellum",
        "Plasmid",
        "Capsule"
      ],
      "correctIndex": 3,
      "explanation": "The bacterial polysaccharide capsule protects the cell from desiccation and engulfment by immune white blood cells."
    },
    "ar": {
      "question": "ما هي الطبقة الخارجية الهلامية الواقية في بعض البكتيريا والتي تحميها من البلعمة المناعية؟",
      "options": [
        "الهدب",
        "السوط",
        "البلازميد",
        "الكبسولة (المحفظة)"
      ],
      "correctIndex": 3,
      "explanation": "المحفظة البكتيرية (Capsule) هي درع سكري يحمي البكتيريا الممرضة من هجمات خلايا الدم البيضاء."
    },
    "fr": {
      "question": "Quelle enveloppe protectrice externe permet à certaines bactéries d'échapper au système immunitaire ?",
      "options": [
        "Le pilus",
        "Le flagelle",
        "Le plasmide",
        "La capsule bactérienne"
      ],
      "correctIndex": 3,
      "explanation": "La capsule bactérienne est une couche externe polysaccharidique résistante à la phagocytose."
    }
  },
  {
    "id": "bio-20",
    "category": "biology",
    "en": {
      "question": "Which organ in fish is responsible for detecting water vibrations and movements?",
      "options": [
        "Lateral line system",
        "Swim bladder",
        "Operculum",
        "Pectoral fin"
      ],
      "correctIndex": 0,
      "explanation": "The lateral line is a sensory system of neuromast cells running along the fish's body that senses water currents and pressure waves."
    },
    "ar": {
      "question": "ما هو العضو الحسي في الأسماك المسؤول عن استشعار اهتزازات وتيارات المياه والضغط المحيط؟",
      "options": [
        "الخط الجانبي الحسي",
        "المثانة الهوائية",
        "الغطاء الخيشومي",
        "الزعنفة الصدرية"
      ],
      "correctIndex": 0,
      "explanation": "الخط الجانبي هو جهاز استشعار دقيق على طول جسم السمكة يرصد حركة المياه والفرائس والحيوانات المفترسة."
    },
    "fr": {
      "question": "Quel organe sensoriel chez les poissons permet de détecter les vibrations et courants aquatiques ?",
      "options": [
        "La ligne latérale",
        "La vessie natatoire",
        "L'opercule",
        "La nageoire pectorale"
      ],
      "correctIndex": 0,
      "explanation": "La ligne latérale est un ensemble de mécanorécepteurs sensibles aux mouvements d'eau environnants."
    }
  },
  {
    "id": "bio-21",
    "category": "biology",
    "en": {
      "question": "What is the specialized vascular tissue that transports water and dissolved minerals upwards in plants?",
      "options": [
        "Phloem",
        "Xylem",
        "Cambium",
        "Cortex"
      ],
      "correctIndex": 1,
      "explanation": "Xylem tissue carries water and dissolved inorganic minerals upward from roots to leaves through capillary action."
    },
    "ar": {
      "question": "ما هو النسيج الوعائي النباتي المتخصص في نقل الماء والأملاح المعدنية من الجذور إلى الأوراق صعوداً؟",
      "options": [
        "اللحاء",
        "الخشب (Xylem)",
        "الكامبيوم",
        "القشرة"
      ],
      "correctIndex": 1,
      "explanation": "أوعية الخشب تنقل الماء والمعادن من التربة إلى أجزاء النبات العلوية، بينما ينقل اللحاء السكريات المصنعة."
    },
    "fr": {
      "question": "Quel tissu végétal conduit la sève brute (eau et sels minéraux) des racines vers les feuilles ?",
      "options": [
        "Le phloème",
        "Le xylème",
        "Le cambium",
        "Le parenchyme"
      ],
      "correctIndex": 1,
      "explanation": "Le xylème transporte l'eau et les sels minéraux vers le haut de la plante."
    }
  },
  {
    "id": "bio-22",
    "category": "biology",
    "en": {
      "question": "Which animal group undergoes complete metamorphosis (egg, larva, pupa, adult)?",
      "options": [
        "Grasshoppers & Crickets",
        "Spiders",
        "Butterflies & Beetles (Holometabola)",
        "Lizards"
      ],
      "correctIndex": 2,
      "explanation": "Holometabolous insects (butterflies, beetles, bees) undergo four distinct life stages including a pupal transformation."
    },
    "ar": {
      "question": "أي مجموعة من الحشرات تمر بمرحلة التحول الكامل (بيضة، يرقة، عذراء، حشرة بالغة)؟",
      "options": [
        "الجراد والصرصور",
        "العناكب",
        "الفراشات والخنافس (كاملة التحول)",
        "السحالي"
      ],
      "correctIndex": 2,
      "explanation": "الفراشات والخنافس تمر بتحول كامل يتضمن مرحلة الشرنقة والعذراء لتغيير شكلها الجسدي كلياً."
    },
    "fr": {
      "question": "Quels insectes effectuent une métamorphose complète (œuf, larve, nymphe, imago) ?",
      "options": [
        "Les criquets",
        "Les araignées",
        "Les papillons et coléoptères (holométaboles)",
        "Les libellules"
      ],
      "correctIndex": 2,
      "explanation": "Les insectes holométaboles (papillons, abeilles, scarabées) passent par un stade chrysalide/pupe."
    }
  },
  {
    "id": "bio-23",
    "category": "biology",
    "en": {
      "question": "What is the term for an organism's complete set of genetic instructions contained in its DNA?",
      "options": [
        "Proteome",
        "Phenotype",
        "Transcriptome",
        "Genome"
      ],
      "correctIndex": 3,
      "explanation": "The genome is the complete set of genes and nucleotide sequences comprising an organism's total hereditary code."
    },
    "ar": {
      "question": "ما هو المصطلح الذي يطلق على كامل الشيفرة الوراثية والمجموعة الجينية للكائن الحي؟",
      "options": [
        "البروتيوم",
        "النمط الظاهري",
        "الترانسكريبتوم",
        "الجينوم (المحتوى الوراثي)"
      ],
      "correctIndex": 3,
      "explanation": "الجينوم هو المجموعة الكاملة لجميع المعلومات الوراثية المحمولة في الحمض النووي للكائن."
    },
    "fr": {
      "question": "Comment appelle-t-on l'ensemble du matériel génétique d'un organisme ?",
      "options": [
        "Le protéome",
        "Le phénotype",
        "Le transcriptome",
        "Le génome"
      ],
      "correctIndex": 3,
      "explanation": "Le génome désigne l'ensemble complet des chromosomes et gènes d'un être vivant."
    }
  },
  {
    "id": "bio-24",
    "category": "biology",
    "en": {
      "question": "What biological substance makes up shark and stingray skeletons instead of hard bone?",
      "options": [
        "Cartilage",
        "Keratin",
        "Collagen",
        "Enamel"
      ],
      "correctIndex": 0,
      "explanation": "Sharks and rays are Chondrichthyes (cartilaginous fish), possessing lightweight, flexible cartilage skeletons."
    },
    "ar": {
      "question": "مم يتكون الهيكل العظمي لأسماك القرش وشفنين البحر بدلاً من العظام الصلبة؟",
      "options": [
        "الغضروف (Cartilage)",
        "الكيراتين",
        "الكولاجين",
        "المينا"
      ],
      "correctIndex": 0,
      "explanation": "القروش من الأسماك الغضروفية، وهيكلها مكون بالكامل من الغضاريف المرنة والخفيفة."
    },
    "fr": {
      "question": "De quelle matière est constitué le squelette des requins et des raies à la place de l'os ?",
      "options": [
        "De cartilage",
        "De kératine",
        "De collagène",
        "D'émail"
      ],
      "correctIndex": 0,
      "explanation": "Les requins sont des poissons cartilagineux (chondrichtyens), sans squelette osseux dur."
    }
  },
  {
    "id": "bio-25",
    "category": "biology",
    "en": {
      "question": "What is the oldest known living individual tree on Earth (a Great Basin bristlecone pine)?",
      "options": [
        "General Sherman",
        "Methuselah",
        "Hyperion",
        "Prometheus"
      ],
      "correctIndex": 1,
      "explanation": "Methuselah, located in California's White Mountains, is estimated to be over 4,850 years old."
    },
    "ar": {
      "question": "ما هو اسم أقدم شجرة فردية حية معروفة على وجه الأرض (شجرة صنوبر بريستليكون في كاليفورنيا)؟",
      "options": [
        "الجنرال شيرمان",
        "شجرة متوشلخ (Methuselah)",
        "هايبريون",
        "بروميثيوس"
      ],
      "correctIndex": 1,
      "explanation": "شجرة متوشلخ في كاليفورنيا يقدر عمرها بأكثر من ٤٨٥٠ سنة، وتعتبر أقدم كائن شجري فردي حي."
    },
    "fr": {
      "question": "Quel est le nom du plus vieil arbre individuel vivant non clonal connu (un pin de Bristlecone) ?",
      "options": [
        "General Sherman",
        "Mathusalem (Methuselah)",
        "Hypérion",
        "Prométhée"
      ],
      "correctIndex": 1,
      "explanation": "L'arbre Mathusalem en Californie a un âge estimé à plus de 4850 ans."
    }
  }
];

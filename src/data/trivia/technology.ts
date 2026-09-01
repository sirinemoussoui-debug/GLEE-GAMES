import { TriviaQuestion } from '../../types';

export const TECHNOLOGY_QUESTIONS: TriviaQuestion[] = [
  {
    "id": "tec-01",
    "category": "technology",
    "en": {
      "question": "Who invented the World Wide Web (WWW) in 1989 while working at CERN in Switzerland?",
      "options": [
        "Bill Gates",
        "Tim Berners-Lee",
        "Steve Jobs",
        "Vint Cerf"
      ],
      "correctIndex": 1,
      "explanation": "Sir Tim Berners-Lee wrote the first web browser, HTTP protocol, and HTML format, launching the modern web."
    },
    "ar": {
      "question": "من هو العالم البريطاني الذي اخترع شبكة الويب العالمية (WWW) عام ١٩٨٩ أثناء عمله في منظمة سيرن؟",
      "options": [
        "بيل غيتس",
        "تيم بيرنرز لي (Tim Berners-Lee)",
        "ستيف جوبز",
        "فينت سيرف"
      ],
      "correctIndex": 1,
      "explanation": "اخترع تيم بيرنرز لي نظام الويب والروابط التشعبية وبروتوكول HTTP ولغة HTML لتصفح الإنترنت."
    },
    "fr": {
      "question": "Qui a inventé le World Wide Web (WWW) au CERN en 1989 ?",
      "options": [
        "Bill Gates",
        "Tim Berners-Lee",
        "Steve Jobs",
        "Vint Cerf"
      ],
      "correctIndex": 1,
      "explanation": "Sir Tim Berners-Lee a conçu le web, l'HTML et le protocole HTTP."
    }
  },
  {
    "id": "tec-02",
    "category": "technology",
    "en": {
      "question": "Which company developed the Android mobile operating system before being acquired by Google in 2005?",
      "options": [
        "Symbian Ltd.",
        "Palm Inc.",
        "Android Inc. (co-founded by Andy Rubin)",
        "Motorola Mobility"
      ],
      "correctIndex": 2,
      "explanation": "Android Inc. was founded in Palo Alto in 2003 by Andy Rubin, Rich Miner, Nick Sears, and Chris White before Google bought it."
    },
    "ar": {
      "question": "ما هي الشركة التي طورت نظام التشغيل أندرويد للهواتف الذكية قبل أن تستحوذ عليها شركة جوجل عام ٢٠٠٥؟",
      "options": [
        "سيمبيان",
        "بالم",
        "شركة أندرويد (Android Inc - آندي روبن)",
        "موتورولا"
      ],
      "correctIndex": 2,
      "explanation": "أسس آندي روبن وزملاؤه شركة أندرويد عام ٢٠٠٣ قبل أن تشتريها جوجل وتجعله النظام الأكثر انتشاراً."
    },
    "fr": {
      "question": "Quelle entreprise a créé le système d'exploitation mobile Android avant d'être rachetée par Google en 2005 ?",
      "options": [
        "Symbian",
        "Palm",
        "Android Inc. (fondée par Andy Rubin)",
        "BlackBerry"
      ],
      "correctIndex": 2,
      "explanation": "Android Inc. a été rachetée par Google en 2005 pour développer l'OS mobile le plus utilisé."
    }
  },
  {
    "id": "tec-03",
    "category": "technology",
    "en": {
      "question": "What does the acronym \"CPU\" stand for in computer architecture?",
      "options": [
        "Central Program Unit",
        "Core Processing Utility",
        "Computer Power Unit",
        "Central Processing Unit"
      ],
      "correctIndex": 3,
      "explanation": "The Central Processing Unit executes machine code instructions and performs primary computational logic in computers."
    },
    "ar": {
      "question": "ماذا يعني الاختصار التقني \"CPU\" في معمارية الحواسيب؟",
      "options": [
        "وحدة البرامج المركزية",
        "وحدة معالجة النواة",
        "وحدة طاقة الكمبيوتر",
        "وحدة المعالجة المركزية (Central Processing Unit)"
      ],
      "correctIndex": 3,
      "explanation": "وحدة المعالجة المركزية (CPU) هي عقل الحاسوب والمسؤولة عن تنفيذ الأوامر والعمليات الحسابية والمنطقية."
    },
    "fr": {
      "question": "Que signifie le sigle informatique « CPU » ?",
      "options": [
        "Central Program Unit",
        "Control Processing Unit",
        "Computer Power Unit",
        "Central Processing Unit (Unité centrale de traitement)"
      ],
      "correctIndex": 3,
      "explanation": "Le CPU est le processeur central exécutant les instructions de la machine."
    }
  },
  {
    "id": "tec-04",
    "category": "technology",
    "en": {
      "question": "Which programming language was created by Guido van Rossum and first released in 1991?",
      "options": [
        "Python",
        "Java",
        "Ruby",
        "C++"
      ],
      "correctIndex": 0,
      "explanation": "Python was created in the Netherlands, designed for code readability, simplicity, and versatility."
    },
    "ar": {
      "question": "ما هي لغة البرمجة الشهيرة التي ابتكرها المبرمج الهولندي جيدو فان روسم وصدرت أول نسخة منها عام ١٩٩١؟",
      "options": [
        "بايثون (Python)",
        "جافا",
        "روبي",
        "سي بلس بلس"
      ],
      "correctIndex": 0,
      "explanation": "لغة بايثون صممها جيدو فان روسم وتعد من أشهر لغات البرمجة في الذكاء الاصطناعي وعلوم البيانات وتطوير الويب."
    },
    "fr": {
      "question": "Quel langage de programmation très populaire a été créé par Guido van Rossum en 1991 ?",
      "options": [
        "Python",
        "Java",
        "Ruby",
        "PHP"
      ],
      "correctIndex": 0,
      "explanation": "Python est un langage réputé pour sa syntaxe claire et sa puissance en science des données."
    }
  },
  {
    "id": "tec-05",
    "category": "technology",
    "en": {
      "question": "Who co-founded Apple Computer in 1976 alongside Steve Jobs and Ronald Wayne, hand-building the Apple I?",
      "options": [
        "Bill Gates",
        "Steve Wozniak",
        "Paul Allen",
        "Tim Cook"
      ],
      "correctIndex": 1,
      "explanation": "Steve Wozniak engineered and single-handedly designed both the Apple I and Apple II personal computers."
    },
    "ar": {
      "question": "من هو المهندس والمبرمج العبقري الذي شارك في تأسيس شركة أبل عام ١٩٧٦ مع ستيف جوبز وصمم حاسوب أبل ١ بنفسه؟",
      "options": [
        "بيل غيتس",
        "ستيف وزنياك (Steve Wozniak)",
        "بول ألين",
        "تيم كوك"
      ],
      "correctIndex": 1,
      "explanation": "ستيف وزنياك هو العقل الهندسي والتقني وراء تصميم أول حواسيب شخصية ثورية لشركة أبل."
    },
    "fr": {
      "question": "Quel ingénieur a cofondé Apple en 1976 avec Steve Jobs et a conçu de ses mains l'Apple I ?",
      "options": [
        "Bill Gates",
        "Steve Wozniak",
        "Paul Allen",
        "Jony Ive"
      ],
      "correctIndex": 1,
      "explanation": "Steve Wozniak est le génie électronique qui a développé les premiers ordinateurs Apple."
    }
  },
  {
    "id": "tec-06",
    "category": "technology",
    "en": {
      "question": "In computer memory hierarchy, what does \"RAM\" stand for?",
      "options": [
        "Read Access Memory",
        "Rapid Action Memory",
        "Random Access Memory",
        "Remote Array Module"
      ],
      "correctIndex": 2,
      "explanation": "RAM allows data items to be read or written in almost the same amount of time regardless of physical location inside the memory."
    },
    "ar": {
      "question": "ماذا يرمز الاختصار \"RAM\" في ذاكرة الحواسب والهواتف الذكية؟",
      "options": [
        "ذاكرة القراءة المباشرة",
        "ذاكرة العمل السريعة",
        "ذاكرة الوصول العشوائي (Random Access Memory)",
        "ذاكرة المصفوفات"
      ],
      "correctIndex": 2,
      "explanation": "ذاكرة الوصول العشوائي (RAM) هي الذاكرة المؤقتة فائقة السرعة التي يستخدمها المعالج لتشغيل التطبيقات النشطة."
    },
    "fr": {
      "question": "Que signifie l'abréviation « RAM » pour la mémoire vive d'un ordinateur ?",
      "options": [
        "Read Access Memory",
        "Rapid Action Memory",
        "Random Access Memory (Mémoire vive à accès direct)",
        "Real Active Memory"
      ],
      "correctIndex": 2,
      "explanation": "La mémoire RAM permet d'accéder directement à n'importe quelle donnée stockée temporairement."
    }
  },
  {
    "id": "tec-07",
    "category": "technology",
    "en": {
      "question": "Who is widely regarded as the \"Father of Modern Computer Science\" and cracked the Enigma cipher at Bletchley Park?",
      "options": [
        "John von Neumann",
        "Charles Babbage",
        "Claude Shannon",
        "Alan Turing"
      ],
      "correctIndex": 3,
      "explanation": "Alan Turing formalized concepts of algorithm and computation with the Turing Machine and pioneered artificial intelligence."
    },
    "ar": {
      "question": "من هو العالم البريطاني الذي يعتبر \"أبو علوم الحاسوب الحديثة\" وكسر شفرة آلة الإنيجما الألمانية خلال الحرب العالمية الثانية؟",
      "options": [
        "جون فون نيومان",
        "تشارلز بابيج",
        "كلود شانون",
        "ألان تورنغ (Alan Turing)"
      ],
      "correctIndex": 3,
      "explanation": "ألان تورنغ هو مؤسس علوم الحوسبة والذكاء الاصطناعي وكسر شفرة الإنيجما في حديقة بليتشلي."
    },
    "fr": {
      "question": "Quel mathématicien britannique est considéré comme le père de l'informatique théorique et a décrypté Enigma ?",
      "options": [
        "John von Neumann",
        "Charles Babbage",
        "Claude Shannon",
        "Alan Turing"
      ],
      "correctIndex": 3,
      "explanation": "Alan Turing a conceptualisé la machine de Turing et joué un rôle clé dans le décodage d'Enigma."
    }
  },
  {
    "id": "tec-08",
    "category": "technology",
    "en": {
      "question": "What open-source operating system kernel was created in 1991 by Finnish software engineer Linus Torvalds?",
      "options": [
        "Linux kernel",
        "FreeBSD",
        "MINIX",
        "GNU Hurd"
      ],
      "correctIndex": 0,
      "explanation": "Linus Torvalds released the Linux kernel in 1991, which powers Android, supercomputers, cloud servers, and IoT devices."
    },
    "ar": {
      "question": "ما هي نواة نظام التشغيل مفتوح المصدر التي ابتكرها المهندس الفنلندي لينوس تورفالدس عام ١٩٩١ وتدير سيرفرات العالم؟",
      "options": [
        "نواة لينكس (Linux Kernel)",
        "فري بي إس دي",
        "مينيكس",
        "هيرد"
      ],
      "correctIndex": 0,
      "explanation": "أطلق لينوس تورفالدس نواة لينكس مفتوحة المصدر والتي تدير اليوم معظم خوادم الإنترنت وهواتف أندرويد."
    },
    "fr": {
      "question": "Quel noyau de système d'exploitation open source a été créé par l'ingénieur finlandais Linus Torvalds en 1991 ?",
      "options": [
        "Le noyau Linux",
        "FreeBSD",
        "Minix",
        "Solaris"
      ],
      "correctIndex": 0,
      "explanation": "Linus Torvalds a développé le noyau Linux qui équipe la majorité des serveurs mondiaux."
    }
  },
  {
    "id": "tec-09",
    "category": "technology",
    "en": {
      "question": "In computer networking, how many bits make up a standard standard byte?",
      "options": [
        "4 bits",
        "8 bits",
        "16 bits",
        "32 bits"
      ],
      "correctIndex": 1,
      "explanation": "A byte is a unit of digital information that most commonly consists of eight binary bits (representing 0 to 255)."
    },
    "ar": {
      "question": "كم عدد البتات (Bits) التي يتكون منها البايت الواحد (Byte) في علوم الحوسبة والبيانات؟",
      "options": [
        "٤ بت",
        "٨ بت (8 Bits)",
        "١٦ بت",
        "٣٢ بت"
      ],
      "correctIndex": 1,
      "explanation": "يتكون كل بايت من ٨ بتات ثنائية (أصفار وواحدات) تكفي لتمثيل حرف واحد أو رمز رقمي."
    },
    "fr": {
      "question": "De combien de bits se compose un octet (byte) en informatique standard ?",
      "options": [
        "4 bits",
        "8 bits",
        "16 bits",
        "32 bits"
      ],
      "correctIndex": 1,
      "explanation": "Un octet (ou byte) est une unité d'information composée exactement de 8 bits."
    }
  },
  {
    "id": "tec-10",
    "category": "technology",
    "en": {
      "question": "What is the pseudonymous name used by the unknown person or group who created Bitcoin in 2008?",
      "options": [
        "Hal Finney",
        "Nick Szabo",
        "Satoshi Nakamoto",
        "Vitalik Buterin"
      ],
      "correctIndex": 2,
      "explanation": "Satoshi Nakamoto published the Bitcoin whitepaper in 2008 and released the reference blockchain software in 2009."
    },
    "ar": {
      "question": "ما هو الاسم المستعار للشخص أو الفريق المجهول الذي ابتكر عملة البيتكوين الرقمية ونظام البلوكشين عام ٢٠٠٨؟",
      "options": [
        "هال فيني",
        "نيك زابو",
        "ساتوشي ناكاموتو (Satoshi Nakamoto)",
        "فيتاليك بوتيرين"
      ],
      "correctIndex": 2,
      "explanation": "نشر ساتوشي ناكاموتو الورقة البيضاء لعملة البيتكوين المشفرة وأطلق أول شبكة بلوكشين في التاريخ."
    },
    "fr": {
      "question": "Quel est le pseudonyme du créateur anonyme du Bitcoin et de la blockchain (2008) ?",
      "options": [
        "Hal Finney",
        "Nick Szabo",
        "Satoshi Nakamoto",
        "Vitalik Buterin"
      ],
      "correctIndex": 2,
      "explanation": "Satoshi Nakamoto a publié le livre blanc fondateur du Bitcoin en 2008."
    }
  },
  {
    "id": "tec-11",
    "category": "technology",
    "en": {
      "question": "Which company was founded by Bill Gates and Paul Allen on April 4, 1975, in Albuquerque, New Mexico?",
      "options": [
        "IBM",
        "Intel",
        "Apple",
        "Microsoft Corporation"
      ],
      "correctIndex": 3,
      "explanation": "Microsoft began developing BASIC interpreters for the Altair 8800 and grew into the world's leading software company with MS-DOS and Windows."
    },
    "ar": {
      "question": "ما هي الشركة العالمية التي أسسها بيل غيتس وبول ألين في ٤ أبريل ١٩٧٥ وطورت نظام ويندوز؟",
      "options": [
        "آي بي إم",
        "إنتل",
        "أبل",
        "مايكروسوفت (Microsoft)"
      ],
      "correctIndex": 3,
      "explanation": "أسس بيل غيتس وبول ألين شركة مايكروسوفت التي أحدثت ثورة في أنظمة تشغيل الحواسيب الشخصية حول العالم."
    },
    "fr": {
      "question": "Quelle entreprise technologique a été fondée par Bill Gates et Paul Allen en 1975 ?",
      "options": [
        "IBM",
        "Intel",
        "Apple",
        "Microsoft"
      ],
      "correctIndex": 3,
      "explanation": "Microsoft a été créée en 1975 et a dominé le marché des logiciels avec MS-DOS et Windows."
    }
  },
  {
    "id": "tec-12",
    "category": "technology",
    "en": {
      "question": "What is the universal data protocol that secures web traffic with encryption (HTTPS), replacing unencrypted HTTP?",
      "options": [
        "TLS (Transport Layer Security)",
        "FTP",
        "SSH",
        "DNS"
      ],
      "correctIndex": 0,
      "explanation": "TLS (and its predecessor SSL) encrypts communications between web browsers and servers, ensuring privacy and data integrity."
    },
    "ar": {
      "question": "ما هو البروتوكول الأمني الذي يشفر بيانات تصفح مواقع الإنترنت ويجعل الرابط يبدأ بـ HTTPS؟",
      "options": [
        "بروتوكول أمان طبقة النقل (TLS / SSL)",
        "FTP",
        "SSH",
        "DNS"
      ],
      "correctIndex": 0,
      "explanation": "يقوم بروتوكول TLS بتشفير الاتصال بين متصفح المستخدم والخادم لحماية كلمات المرور والبيانات من التجسس."
    },
    "fr": {
      "question": "Quel protocole de chiffrement sécurise les échanges web dans le protocole HTTPS ?",
      "options": [
        "TLS (Transport Layer Security) / SSL",
        "FTP",
        "SSH",
        "DNS"
      ],
      "correctIndex": 0,
      "explanation": "Le protocole TLS chiffre les données transmises entre le client et le serveur web."
    }
  },
  {
    "id": "tec-13",
    "category": "technology",
    "en": {
      "question": "In what year was the first original Apple iPhone officially unveiled by Steve Jobs and released for sale?",
      "options": [
        "2005",
        "2007",
        "2009",
        "2011"
      ],
      "correctIndex": 1,
      "explanation": "Steve Jobs introduced the iPhone at Macworld on January 9, 2007, combining a phone, widescreen iPod, and internet communicator."
    },
    "ar": {
      "question": "في أي عام كشف ستيف جوبز عن أول هاتف آيفون (iPhone) في العالم مغيراً صناعة الهواتف الذكية؟",
      "options": [
        "٢٠٠٥",
        "٢٠٠٧ م",
        "٢٠٠٩",
        "٢٠١١"
      ],
      "correctIndex": 1,
      "explanation": "أعلن ستيف جوبز عن هاتف الآيفون الأول في يناير ٢٠٠٧ وطرحه للبيع صيف ذلك العام."
    },
    "fr": {
      "question": "En quelle année Steve Jobs a-t-il dévoilé le premier iPhone d'Apple ?",
      "options": [
        "2005",
        "2007",
        "2009",
        "2011"
      ],
      "correctIndex": 1,
      "explanation": "Le premier iPhone a été présenté en janvier 2007 et commercialisé la même année."
    }
  },
  {
    "id": "tec-14",
    "category": "technology",
    "en": {
      "question": "What popular distributed version control system was created in 2005 by Linus Torvalds for Linux kernel development?",
      "options": [
        "SVN",
        "Mercurial",
        "Git",
        "Perforce"
      ],
      "correctIndex": 2,
      "explanation": "Git is a distributed version control system tracking changes in source code during software development, used by millions of developers."
    },
    "ar": {
      "question": "ما هو نظام إدارة وتتبع إصدارات الأكواد البرمجية الشهير عالمياً الذي ابتكره لينوس تورفالدس عام ٢٠٠٥؟",
      "options": [
        "SVN",
        "ميركوريال",
        "جيت (Git)",
        "بيرفورس"
      ],
      "correctIndex": 2,
      "explanation": "نظام Git هو الأداة القياسية الأهم عالمياً للمبرمجين لحفظ التعديلات والتعاون البرمجي."
    },
    "fr": {
      "question": "Quel logiciel de gestion de versions décentralisé mondialement utilisé a été créé par Linus Torvalds en 2005 ?",
      "options": [
        "SVN",
        "Mercurial",
        "Git",
        "CVS"
      ],
      "correctIndex": 2,
      "explanation": "Git est l'outil de contrôle de version standard de l'industrie logicielle."
    }
  },
  {
    "id": "tec-15",
    "category": "technology",
    "en": {
      "question": "What type of non-volatile computer storage uses flash memory with no moving mechanical parts, replacing HDDs?",
      "options": [
        "Magnetic Tape",
        "Floppy Disk",
        "Optical Disc",
        "SSD (Solid-State Drive)"
      ],
      "correctIndex": 3,
      "explanation": "Solid-State Drives store data in NAND flash memory chips, offering far higher read/write speeds, shock resistance, and lower latency than spinning hard disks."
    },
    "ar": {
      "question": "ما نوع وسائط التخزين الحديثة والسريعة التي تعتمد على رقائق الذاكرة الوميضية بدون أجزاء ميكانيكية متحركة لتحل محل الأقراص الصلبة؟",
      "options": [
        "الأشرطة الممغنطة",
        "الأقراص المرنة",
        "الأقراص الليزرية",
        "أقراص التخزين الإلكترونية (SSD)"
      ],
      "correctIndex": 3,
      "explanation": "تعتمد وحدات SSD على شرائح الذاكرة الإلكترونية لتقديم سرعات قراءة وكتابة فائقة تفوق الأقراص الصلبة القديمة."
    },
    "fr": {
      "question": "Quel type de disque de stockage informatique rapide utilise de la mémoire flash sans pièces mécaniques mobiles ?",
      "options": [
        "La bande magnétique",
        "La disquette",
        "Le disque optique",
        "Le disque SSD (Solid-State Drive)"
      ],
      "correctIndex": 3,
      "explanation": "Les disques SSD utilisent des puces de mémoire flash NAND pour des vitesses de transfert très supérieures aux disques durs HDD."
    }
  },
  {
    "id": "tec-16",
    "category": "technology",
    "en": {
      "question": "Who co-founded Google in 1998 while PhD students at Stanford University, creating the PageRank search algorithm?",
      "options": [
        "Larry Page and Sergey Brin",
        "Bill Gates and Steve Ballmer",
        "Mark Zuckerberg and Eduardo Saverin",
        "Jeff Bezos and Andy Jassy"
      ],
      "correctIndex": 0,
      "explanation": "Larry Page and Sergey Brin founded Google in Menlo Park, California, incorporating the PageRank algorithm to rank search relevance."
    },
    "ar": {
      "question": "من هما طالبا الدكتوراه في جامعة ستانفورد اللذان أسسا شركة جوجل ومحرك بحثها الثوري عام ١٩٩٨؟",
      "options": [
        "لاري بيج وسيرجي برين (Larry Page & Sergey Brin)",
        "بيل غيتس وستيف بالمر",
        "مارك زوكربيرغ وإدواردو سافرين",
        "جيف بيزوس"
      ],
      "correctIndex": 0,
      "explanation": "أسس لاري بيج وسيرجي برين شركة جوجل وطورا خوارزمية بيج رانك التي غيرت طريقة البحث على الإنترنت."
    },
    "fr": {
      "question": "Quels étudiants de l'université Stanford ont cofondé le moteur de recherche Google en 1998 ?",
      "options": [
        "Larry Page et Sergey Brin",
        "Bill Gates et Steve Ballmer",
        "Mark Zuckerberg et Dustin Moskovitz",
        "Jeff Bezos"
      ],
      "correctIndex": 0,
      "explanation": "Larry Page et Sergey Brin ont créé Google et son algorithme PageRank."
    }
  },
  {
    "id": "tec-17",
    "category": "technology",
    "en": {
      "question": "What is the standard name of the wireless short-range communication technology named after a 10th-century Scandinavian Viking King?",
      "options": [
        "Wi-Fi",
        "Bluetooth (Harald Bluetooth)",
        "Zigbee",
        "NFC"
      ],
      "correctIndex": 1,
      "explanation": "Bluetooth was named in honor of Danish King Harald \"Bluetooth\" Gormsson, who united Scandinavian tribes just as Bluetooth unites devices."
    },
    "ar": {
      "question": "ما هي تقنية الاتصال اللاسلكي قصير المدى الشهيرة التي سميت نسبة إلى ملك الفايكنج الدنماركي هارالد في القرن العاشر؟",
      "options": [
        "الواي فاي",
        "البلوتوث (Bluetooth)",
        "زيغبي",
        "NFC"
      ],
      "correctIndex": 1,
      "explanation": "سُميت تقنية البلوتوث تيمناً بالملك الإسكندنافي هارالد بلوتوث لتوحيده القبائل كما توحد التقنية الأجهزة لاسلكياً."
    },
    "fr": {
      "question": "Quelle technologie de réseau sans fil à courte portée porte le nom d'un roi viking scandinave du Xe siècle ?",
      "options": [
        "Le Wi-Fi",
        "Le Bluetooth (Harald à la dent bleue)",
        "Le Zigbee",
        "Le NFC"
      ],
      "correctIndex": 1,
      "explanation": "Bluetooth a été nommé d'après le roi Harald Bluetooth qui unifia les peuples scandinaves."
    }
  },
  {
    "id": "tec-18",
    "category": "technology",
    "en": {
      "question": "What is the primary computer markup language used to structure web pages on the internet?",
      "options": [
        "CSS",
        "JavaScript",
        "HTML (HyperText Markup Language)",
        "SQL"
      ],
      "correctIndex": 2,
      "explanation": "HTML provides the structural backbone of web pages, parsed by web browsers to render text, images, and embedded media."
    },
    "ar": {
      "question": "ما هي لغة الترميز الأساسية المستخدمة في بناء وهيكلة صفحات الويب على شبكة الإنترنت؟",
      "options": [
        "CSS",
        "جافا سكريبت",
        "HTML (لغة ترميز النص الفائق)",
        "SQL"
      ],
      "correctIndex": 2,
      "explanation": "لغة HTML هي الهيكل الأساسي لجميع مواقع الإنترنت وتحدد النصوص والعناصر والروابط في صفحات الويب."
    },
    "fr": {
      "question": "Quel est le langage de balisage fondamental utilisé pour structurer les pages web sur Internet ?",
      "options": [
        "CSS",
        "JavaScript",
        "HTML (HyperText Markup Language)",
        "SQL"
      ],
      "correctIndex": 2,
      "explanation": "Le HTML est le langage standard de structuration des documents web."
    }
  },
  {
    "id": "tec-19",
    "category": "technology",
    "en": {
      "question": "What artificial intelligence research company developed ChatGPT, GPT-4, and the DALL-E image generation models?",
      "options": [
        "DeepMind",
        "Meta AI",
        "Anthropic",
        "OpenAI"
      ],
      "correctIndex": 3,
      "explanation": "OpenAI released ChatGPT in November 2022, accelerating the global generative AI revolution."
    },
    "ar": {
      "question": "ما هي شركة أبحاث الذكاء الاصطناعي التي طورت روبوت الدردشة الشهير شات جي بي تي (ChatGPT) ونماذج GPT-4؟",
      "options": [
        "ديب مايند",
        "ميتا",
        "أنثروبيك",
        "أوبن إيه آي (OpenAI)"
      ],
      "correctIndex": 3,
      "explanation": "أطلقت شركة OpenAI نموذج شات جي بي تي في أواخر عام ٢٠٢٢ مما أحدث طفرة عالمية في الذكاء الاصطناعي التوليدي."
    },
    "fr": {
      "question": "Quelle société d'intelligence artificielle a développé ChatGPT, GPT-4 et DALL-E ?",
      "options": [
        "DeepMind",
        "Mistral AI",
        "Anthropic",
        "OpenAI"
      ],
      "correctIndex": 3,
      "explanation": "OpenAI a lancé ChatGPT en 2022, popularisant l'intelligence artificielle générative."
    }
  },
  {
    "id": "tec-20",
    "category": "technology",
    "en": {
      "question": "What is the name of the standard query language used worldwide to manage and manipulate relational databases?",
      "options": [
        "SQL (Structured Query Language)",
        "NoSQL",
        "GraphQL",
        "JSON"
      ],
      "correctIndex": 0,
      "explanation": "SQL is the standardized declarative language used for storing, querying, updating, and managing relational database tables."
    },
    "ar": {
      "question": "ما هي لغة الاستعلامات القياسية المستخدمة عالمياً للتعامل مع قواعد البيانات العلائقية وإدارتها؟",
      "options": [
        "لغة إس كيو إل (SQL)",
        "NoSQL",
        "جراف كيو إل",
        "JSON"
      ],
      "correctIndex": 0,
      "explanation": "لغة SQL هي لغة قواعد البيانات العالمية المستخدمة للبحث والإضافة والتعديل في الجداول وقواعد البيانات."
    },
    "fr": {
      "question": "Quel langage informatique standardisé est utilisé pour interroger et gérer les bases de données relationnelles ?",
      "options": [
        "SQL (Structured Query Language)",
        "NoSQL",
        "GraphQL",
        "PHP"
      ],
      "correctIndex": 0,
      "explanation": "Le langage SQL est le standard pour administrer les bases de données relationnelles."
    }
  },
  {
    "id": "tec-21",
    "category": "technology",
    "en": {
      "question": "Which company created the popular Windows operating system, releasing Windows 95, Windows XP, Windows 10, and Windows 11?",
      "options": [
        "Apple",
        "Microsoft",
        "IBM",
        "Oracle"
      ],
      "correctIndex": 1,
      "explanation": "Microsoft introduced Windows in November 1985 as a graphical operating system shell for MS-DOS, growing to dominate desktop computing."
    },
    "ar": {
      "question": "ما هي الشركة التي طورت نظام التشغيل ويندوز (Windows) الشهير للحواسيب الشخصية؟",
      "options": [
        "أبل",
        "مايكروسوفت (Microsoft)",
        "آي بي إم",
        "أوراكل"
      ],
      "correctIndex": 1,
      "explanation": "تطور شركة مايكروسوفت نظام ويندوز منذ ثمانينيات القرن الماضي وهو نظام التشغيل الأكثر انتشاراً في العالم."
    },
    "fr": {
      "question": "Quelle entreprise a développé le système d'exploitation Windows (Windows 95, XP, 10, 11) ?",
      "options": [
        "Apple",
        "Microsoft",
        "IBM",
        "Dell"
      ],
      "correctIndex": 1,
      "explanation": "Microsoft est l'éditeur du système d'exploitation Windows pour PC."
    }
  },
  {
    "id": "tec-22",
    "category": "technology",
    "en": {
      "question": "In computer graphics and displays, what is the basic unit of a digital image, represented by individual dots of color?",
      "options": [
        "Voxel",
        "Vector",
        "Pixel (Picture Element)",
        "Bit"
      ],
      "correctIndex": 2,
      "explanation": "A pixel is the smallest controllable physical element of a digital display raster image, composed of red, green, and blue subpixels."
    },
    "ar": {
      "question": "ما هي أصغر وحدة نقطية ملونة ومستقلة تتكون منها الصور الرقمية والشاشات؟",
      "options": [
        "فوكسل",
        "فيكتور",
        "البكسل (Pixel - عنصر الصورة)",
        "بت"
      ],
      "correctIndex": 2,
      "explanation": "البكسل (Pixel) هو أصغر نقطة ضوئية في الشاشة تدمج الألوان الأساسية لتشكيل الصور الرقمية."
    },
    "fr": {
      "question": "Quel est le plus petit élément individuel composant une image numérique sur un écran ?",
      "options": [
        "Le voxel",
        "Le vecteur",
        "Le pixel",
        "Le lumophore"
      ],
      "correctIndex": 2,
      "explanation": "Le pixel est le point de base constitutif d'un affichage matriciel ou d'une image numérique."
    }
  },
  {
    "id": "tec-23",
    "category": "technology",
    "en": {
      "question": "Which English mathematician is celebrated as the world's first computer programmer for writing an algorithm for Babbage's Analytical Engine in 1843?",
      "options": [
        "Grace Hopper",
        "Joan Clarke",
        "Margaret Hamilton",
        "Ada Lovelace"
      ],
      "correctIndex": 3,
      "explanation": "Ada Lovelace recognized that the Analytical Engine could process symbols beyond pure mathematics, authoring the first published computer algorithm."
    },
    "ar": {
      "question": "من هي عالمة الرياضيات الإنجليزية التي تعتبر أول مبرمجة حاسوب في التاريخ لكتابتها خوارزمية الآلة التحليلية عام ١٨٤٣؟",
      "options": [
        "غريس هوبر",
        " جوان كلارك",
        "مارغريت هاميلتون",
        "آدا لوفلايس (Ada Lovelace)"
      ],
      "correctIndex": 3,
      "explanation": "آدا لوفلايس كتبت أول خوارزمية لآلة حاسوبية ميكانيكية وتعتبر أول مبرمجة في التاريخ البشري."
    },
    "fr": {
      "question": "Quelle mathématicienne britannique est considérée comme la première personne à avoir programmé un ordinateur en 1843 ?",
      "options": [
        "Grace Hopper",
        "Katherine Johnson",
        "Margaret Hamilton",
        "Ada Lovelace"
      ],
      "correctIndex": 3,
      "explanation": "Ada Lovelace a écrit le premier algorithme destiné à être exécuté par une machine (la machine analytique de Babbage)."
    }
  },
  {
    "id": "tec-24",
    "category": "technology",
    "en": {
      "question": "What does \"VPN\" stand for in internet cybersecurity and networking?",
      "options": [
        "Virtual Private Network",
        "Variable Private Network",
        "Verified Protocol Node",
        "Visual Protection Network"
      ],
      "correctIndex": 0,
      "explanation": "A Virtual Private Network extends a private network across a public network by encrypting connections and shielding IP addresses."
    },
    "ar": {
      "question": "ماذا يعني الاختصار التقني \"VPN\" في أمن المعلومات وحماية الخصوصية على الإنترنت؟",
      "options": [
        "الشبكة الخاصة الافتراضية (Virtual Private Network)",
        "شبكة الحماية المتغيرة",
        "بروتوكول التحقق الآمن",
        "نقطة الاتصال المشفرة"
      ],
      "correctIndex": 0,
      "explanation": "الشبكة الافتراضية الخاصة (VPN) تقوم بتشفير حركة الإنترنت وتغيير عنوان الـ IP لحماية خصوصية المستخدم وأمانه."
    },
    "fr": {
      "question": "Que signifie l'acronyme « VPN » en sécurité informatique ?",
      "options": [
        "Virtual Private Network (Réseau privé virtuel)",
        "Variable Private Network",
        "Verified Protected Node",
        "Virtual Protection Net"
      ],
      "correctIndex": 0,
      "explanation": "Un VPN permet de créer un tunnel chiffré et sécurisé pour naviguer sur Internet."
    }
  },
  {
    "id": "tec-25",
    "category": "technology",
    "en": {
      "question": "What is the popular open-source JavaScript library for building component-based user interfaces, developed by Meta (Facebook)?",
      "options": [
        "Angular",
        "React (React.js)",
        "Vue.js",
        "Svelte"
      ],
      "correctIndex": 1,
      "explanation": "React was created by Jordan Walke at Meta in 2011 and open-sourced in 2013, revolutionizing modern web frontend development with the virtual DOM."
    },
    "ar": {
      "question": "ما هي مكتبة الجافا سكريبت الشهيرة لبناء واجهات المستخدم التفاعلية والتي طورتها شركة ميتا (فيسبوك)؟",
      "options": [
        "أنغولار",
        "رياكت (React.js)",
        "فيو",
        "سفيلت"
      ],
      "correctIndex": 1,
      "explanation": "مكتبة رياكت (React) مفتوحة المصدر هي الأوسع استخداماً حول العالم في بناء تطبيقات الويب الحديثة."
    },
    "fr": {
      "question": "Quelle bibliothèque JavaScript open source développée par Meta est très populaire pour créer des interfaces utilisateur ?",
      "options": [
        "Angular",
        "React (React.js)",
        "Vue.js",
        "Ember.js"
      ],
      "correctIndex": 1,
      "explanation": "React est une bibliothèque de pointe pour concevoir des applications web réactives à base de composants."
    }
  }
];

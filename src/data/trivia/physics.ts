import { TriviaQuestion } from '../../types';

export const PHYSICS_QUESTIONS: TriviaQuestion[] = [
  {
    "id": "phy-01",
    "category": "physics",
    "en": {
      "question": "What is the exact constant speed of light in a vacuum?",
      "options": [
        "150,000 km/s",
        "3,000,000 km/s",
        "1,080,000 km/s",
        "299,792,458 m/s"
      ],
      "correctIndex": 3,
      "explanation": "The speed of light in vacuum (denoted c) is an exact physical constant defined as 299,792,458 meters per second (~300,000 km/s)."
    },
    "ar": {
      "question": "ما هي السرعة الدقيقة لانتشار الضوء في الفراغ؟",
      "options": [
        "١٥٠ ألف كم/ث",
        "٣ ملايين كم/ث",
        "مليون كم/ث",
        "٢٩٩,٧٩٢,٤٥٨ متر/ثانية (~٣٠٠ ألف كم/ث)"
      ],
      "correctIndex": 3,
      "explanation": "سرعة الضوء في الفراغ هي ثابت كوني فيزيائي قيمته الدقيقة ٢٩٩,٧٩٢,٤٥٨ م/ث."
    },
    "fr": {
      "question": "Quelle est la vitesse exacte de la lumière dans le vide (c) ?",
      "options": [
        "150 000 km/s",
        "3 000 000 km/s",
        "1 080 000 km/s",
        "299 792 458 m/s"
      ],
      "correctIndex": 3,
      "explanation": "La vitesse de la lumière dans le vide est une constante fondamentale valant exactement 299 792 458 m/s."
    }
  },
  {
    "id": "phy-02",
    "category": "physics",
    "en": {
      "question": "Which of Newton's laws of motion states that \"For every action, there is an equal and opposite reaction\"?",
      "options": [
        "Third Law",
        "Second Law (F=ma)",
        "First Law (Inertia)",
        "Law of Universal Gravitation"
      ],
      "correctIndex": 0,
      "explanation": "Newton's Third Law dictates that when one body exerts a force on a second body, the second body exerts an equal and opposite force."
    },
    "ar": {
      "question": "أي من قوانين نيوتن للحركة ينص على أن \"لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه\"؟",
      "options": [
        "القانون الثالث للحركة",
        "القانون الثاني (القوة = الكتلة × التسارع)",
        "القانون الأول (القصور الذاتي)",
        "قانون الجاذبية العام"
      ],
      "correctIndex": 0,
      "explanation": "ينص قانون نيوتن الثالث على أن القوى تتواجد في أزواج متساوية ومتعاكسة في الاتجاه."
    },
    "fr": {
      "question": "Quelle loi du mouvement de Newton affirme que « toute action entraîne une réaction égale et opposée » ?",
      "options": [
        "La troisième loi",
        "La deuxième loi (F=ma)",
        "La première loi (inertie)",
        "La loi de gravitation"
      ],
      "correctIndex": 0,
      "explanation": "La 3e loi de Newton décrit les interactions mutuelles de forces égales et de sens opposés."
    }
  },
  {
    "id": "phy-03",
    "category": "physics",
    "en": {
      "question": "What is absolute zero, the theoretical lowest possible temperature, in degrees Celsius?",
      "options": [
        "0°C",
        "-273.15°C",
        "-100°C",
        "-459.67°C"
      ],
      "correctIndex": 1,
      "explanation": "Absolute zero is 0 Kelvin, which corresponds to -273.15°C, where all classical thermal motion ceases."
    },
    "ar": {
      "question": "ما هي درجة الصفر المطلق (أدنى درجة حرارة ممكنة نظرياً) بالدرجات المئوية (السيلزيوس)؟",
      "options": [
        "صفر مئوي",
        "-٢٧٣.١٥ درجة مئوية",
        "-١٠٠ درجة",
        "-٣٥٠ درجة"
      ],
      "correctIndex": 1,
      "explanation": "الصفر المطلق (صفر كلفن) يعادل -٢٧٣.١٥ مئوية وفيه تتوقف حركة الذرات الحرارية الكلاسيكية."
    },
    "fr": {
      "question": "Quelle est la valeur du zéro absolu en degrés Celsius (°C) ?",
      "options": [
        "0°C",
        "-273,15°C",
        "-100°C",
        "-350°C"
      ],
      "correctIndex": 1,
      "explanation": "Le zéro absolu correspond à 0 Kelvin, soit -273,15 degrés Celsius."
    }
  },
  {
    "id": "phy-04",
    "category": "physics",
    "en": {
      "question": "Which elementary particle carries a single negative elementary electric charge?",
      "options": [
        "Proton",
        "Neutron",
        "Electron",
        "Positron"
      ],
      "correctIndex": 2,
      "explanation": "Electrons are fundamental leptons with a charge of -1e (-1.602 x 10^-19 Coulombs) orbiting the atomic nucleus."
    },
    "ar": {
      "question": "أي جسيم أولي دون ذري يحمل شحنة كهربائية سالبة واحدة؟",
      "options": [
        "البروتون",
        "النيوترون",
        "الإلكترون",
        "البوزيترون"
      ],
      "correctIndex": 2,
      "explanation": "الإلكترونات هي جسيمات سالبة الشحنة تدور في مدارات حول النواة الذرية ذات الشحنة الموجبة."
    },
    "fr": {
      "question": "Quelle particule subatomique porte une charge électrique élémentaire négative ?",
      "options": [
        "Le proton",
        "Le neutron",
        "L'électron",
        "Le positron"
      ],
      "correctIndex": 2,
      "explanation": "L'électron est un lepton de charge électrique négative orbitant autour du noyau."
    }
  },
  {
    "id": "phy-05",
    "category": "physics",
    "en": {
      "question": "What is the SI derived unit for measuring frequency?",
      "options": [
        "Joule",
        "Pascal",
        "Newton",
        "Hertz (Hz)"
      ],
      "correctIndex": 3,
      "explanation": "The Hertz (Hz) measures cycles per second, named in honor of physicist Heinrich Hertz."
    },
    "ar": {
      "question": "ما هي وحدة قياس التردد (التردد الموجي) في النظام الدولي للوحدات (SI)؟",
      "options": [
        "الجول",
        "الباسكال",
        "النيوتن",
        "الهرتز (Hertz)"
      ],
      "correctIndex": 3,
      "explanation": "يقاس التردد بوحدة الهرتز (Hz) والتي تمثل عدد الدورات أو الاهتزازات في الثانية الواحدة."
    },
    "fr": {
      "question": "Quelle est l'unité du Système International utilisée pour mesurer la fréquence ?",
      "options": [
        "Le joule",
        "Le pascal",
        "Le newton",
        "Le hertz (Hz)"
      ],
      "correctIndex": 3,
      "explanation": "Le hertz mesure le nombre d'oscillations ou de cycles par seconde."
    }
  },
  {
    "id": "phy-06",
    "category": "physics",
    "en": {
      "question": "Which famous theoretical physicist developed the Special and General Theories of Relativity?",
      "options": [
        "Albert Einstein",
        "Niels Bohr",
        "Max Planck",
        "Erwin Schrödinger"
      ],
      "correctIndex": 0,
      "explanation": "Albert Einstein published Special Relativity in 1905 and General Relativity (curved spacetime gravity) in 1915."
    },
    "ar": {
      "question": "من هو العالم الفيزيائي النظري الشهير الذي صاغ نظريتي النسبية الخاصة والعامة؟",
      "options": [
        "ألبرت أينشتاين",
        "نيلز بور",
        "ماكس بلانك",
        "إرفين شرودنجر"
      ],
      "correctIndex": 0,
      "explanation": "وضع ألبرت أينشتاين نظرية النسبية الخاصة عام ١٩٠٥ والعامة عام ١٩١٥ مغيراً مفهوم الجاذبية والزمكان."
    },
    "fr": {
      "question": "Quel physicien a formulé les théories de la relativité restreinte et générale ?",
      "options": [
        "Albert Einstein",
        "Niels Bohr",
        "Max Planck",
        "Erwin Schrödinger"
      ],
      "correctIndex": 0,
      "explanation": "Albert Einstein a révolutionné la physique avec ses théories de la relativité en 1905 et 1915."
    }
  },
  {
    "id": "phy-07",
    "category": "physics",
    "en": {
      "question": "What is the standard acceleration due to Earth's gravity near the surface (1 g)?",
      "options": [
        "5.4 m/s²",
        "9.81 m/s²",
        "12.2 m/s²",
        "19.6 m/s²"
      ],
      "correctIndex": 1,
      "explanation": "Standard gravity near Earth's surface accelerates free-falling objects at approximately 9.80665 m/s² (~9.81 m/s²)."
    },
    "ar": {
      "question": "كم يبلغ تسارع الجاذبية الأرضية القياسي بالقرب من سطح الأرض (g)؟",
      "options": [
        "٥.٤ م/ث²",
        "٩.٨١ م/ثانية مربعة",
        "١٢.٢ م/ث²",
        "١٩.٦ م/ث²"
      ],
      "correctIndex": 1,
      "explanation": "تبلغ عجلة الجاذبية الأرضية القياسية للأجسام الساقطة سقوطاً حراً نحو ٩.٨١ م/ث²."
    },
    "fr": {
      "question": "Quelle est la valeur standard de l'accélération due à la pesanteur terrestre à la surface ?",
      "options": [
        "5,4 m/s²",
        "9,81 m/s²",
        "12,2 m/s²",
        "19,6 m/s²"
      ],
      "correctIndex": 1,
      "explanation": "L'accélération normale de la pesanteur à la surface de la Terre vaut environ 9,81 m/s²."
    }
  },
  {
    "id": "phy-08",
    "category": "physics",
    "en": {
      "question": "What type of electromagnetic radiation has the shortest wavelength and highest photon energy?",
      "options": [
        "Radio waves",
        "Infrared rays",
        "Gamma rays",
        "X-rays"
      ],
      "correctIndex": 2,
      "explanation": "Gamma rays possess wavelengths below 10 picometers and carry the highest frequencies and photon energy in the EM spectrum."
    },
    "ar": {
      "question": "أي نوع من الإشعاع الكهرومغناطيسي يمتلك أقصر طول موجي وأعلى طاقة فوتونات؟",
      "options": [
        "موجات الراديو",
        "الأشعة تحت الحمراء",
        "أشعة جاما (Gamma rays)",
        "الأشعة السينية"
      ],
      "correctIndex": 2,
      "explanation": "أشعة جاما هي الأكثر طاقة وأقصر طولاً موجياً في الطيف الكهرومغناطيسي وتنتج من التفاعلات النووية."
    },
    "fr": {
      "question": "Quel rayonnement électromagnétique a la plus courte longueur d'onde et la plus haute énergie ?",
      "options": [
        "Les ondes radio",
        "Les rayons infrarouges",
        "Les rayons gamma",
        "Les rayons X"
      ],
      "correctIndex": 2,
      "explanation": "Les rayons gamma sont les plus énergétiques du spectre électromagnétique."
    }
  },
  {
    "id": "phy-09",
    "category": "physics",
    "en": {
      "question": "What principle explains why a ship made of heavy steel can float on water?",
      "options": [
        "Bernoulli's principle",
        "Hooke's law",
        "Pascal's law",
        "Archimedes' principle of buoyancy"
      ],
      "correctIndex": 3,
      "explanation": "Archimedes' principle states that buoyant force equals the weight of displaced fluid, allowing hollow ships to float."
    },
    "ar": {
      "question": "ما هو المبدأ الفيزيائي الذي يفسر طفو السفن الفولاذية العملاقة فوق سطح الماء؟",
      "options": [
        "مبدأ برنولي",
        "قانون هوك",
        "قانون باسكال",
        "قاعدة أرشميدس للطفو"
      ],
      "correctIndex": 3,
      "explanation": "تنص قاعدة أرشميدس على أن قوة دفع السائل للأعلى تساوي وزن السائل المزاح بواسطة السفينة."
    },
    "fr": {
      "question": "Quel principe de physique explique pourquoi les navires en acier flottent ?",
      "options": [
        "Le principe de Bernoulli",
        "La loi de Hooke",
        "La loi de Pascal",
        "Le principe d'Archimède"
      ],
      "correctIndex": 3,
      "explanation": "La poussée d'Archimède compense le poids du navire en déplaçant un volume d'eau équivalent."
    }
  },
  {
    "id": "phy-10",
    "category": "physics",
    "en": {
      "question": "What subatomic boson was confirmed by CERN's Large Hadron Collider in 2012, giving mass to elementary particles?",
      "options": [
        "Higgs Boson",
        "Gluon",
        "Photon",
        "Z Boson"
      ],
      "correctIndex": 0,
      "explanation": "The Higgs boson is the excitation of the Higgs field, which gives mass to W/Z bosons and quarks via the Higgs mechanism."
    },
    "ar": {
      "question": "ما هو البوزون دون الذري الذي تم تأكيد وجوده في مصادم الهادرونات الكبير بسيرن عام ٢٠١٢ والمسؤول عن اكتساب الجسيمات لكتلتها؟",
      "options": [
        "بوزون هيجز (Higgs Boson)",
        "الجلوون",
        "الفوتون",
        "بوزون Z"
      ],
      "correctIndex": 0,
      "explanation": "بوزون هيجز يرتبط بمجال هيجز الذي يمنح الجسيمات الأولية كتلتها الفيزيائية في النموذج القياسي."
    },
    "fr": {
      "question": "Quelle particule élémentaire confirmée au CERN en 2012 confère leur masse à d'autres particules ?",
      "options": [
        "Le boson de Higgs",
        "Le gluon",
        "Le photon",
        "Le graviton"
      ],
      "correctIndex": 0,
      "explanation": "Le boson de Higgs est la manifestation du champ de Higgs qui donne une masse aux particules."
    }
  },
  {
    "id": "phy-11",
    "category": "physics",
    "en": {
      "question": "What is the SI unit of electric potential difference (electromotive force)?",
      "options": [
        "Ampere",
        "Volt (V)",
        "Coulomb",
        "Watt"
      ],
      "correctIndex": 1,
      "explanation": "The Volt (V) measures electric potential difference, named after Italian scientist Alessandro Volta."
    },
    "ar": {
      "question": "ما هي وحدة قياس فرق الجهد الكهربائي والقوة الدافعة الكهربائية في النظام الدولي؟",
      "options": [
        "الأمبير",
        "الفولت (Volt)",
        "الكولوم",
        "الواط"
      ],
      "correctIndex": 1,
      "explanation": "الفولت هو وحدة قياس فرق الجهد الكهربائي بين نقطتين نسبة للعالم الإيطالي أليساندرو فولتا."
    },
    "fr": {
      "question": "Quelle est l'unité de mesure de la différence de potentiel électrique dans le Système International ?",
      "options": [
        "L'ampère",
        "Le volt (V)",
        "Le coulomb",
        "Le watt"
      ],
      "correctIndex": 1,
      "explanation": "Le volt mesure la tension et la différence de potentiel électrique."
    }
  },
  {
    "id": "phy-12",
    "category": "physics",
    "en": {
      "question": "Which state of matter consists of ionized gas with free electrons and ions, making up 99% of the visible universe?",
      "options": [
        "Liquid Crystal",
        "Bose-Einstein Condensate",
        "Plasma",
        "Superfluid"
      ],
      "correctIndex": 2,
      "explanation": "Plasma is an ionized gas of free electrons and positive ions found in stars, lightning, and fusion reactors."
    },
    "ar": {
      "question": "ما هي الحالة الرابعة للمادة المكونة من غاز متأين مليء بالإلكترونات الحرة وتشكل أكثر من ٩٩٪ من الكون المرئي؟",
      "options": [
        "البلور السائل",
        "مكثف بوز-أينشتاين",
        "البلازما (Plasma)",
        "المائع الفائق"
      ],
      "correctIndex": 2,
      "explanation": "البلازما هي حالة غازية متأينة عالية الطاقة توجد في النجوم والصواعق والشمس ومفاعلات الاندماج."
    },
    "fr": {
      "question": "Quel quatrième état de la matière est constitué d'un gaz ionisé contenant des électrons libres ?",
      "options": [
        "Le cristal liquide",
        "Le condensat de Bose-Einstein",
        "Le plasma",
        "Le superfluide"
      ],
      "correctIndex": 2,
      "explanation": "Le plasma compose les étoiles et la grande majorité de la matière visible de l'univers."
    }
  },
  {
    "id": "phy-13",
    "category": "physics",
    "en": {
      "question": "What optical phenomenon causes light to bend as it passes from one transparent medium to another?",
      "options": [
        "Diffraction",
        "Interference",
        "Polarization",
        "Refraction"
      ],
      "correctIndex": 3,
      "explanation": "Refraction occurs because light changes speed when moving between media of differing refractive index."
    },
    "ar": {
      "question": "ما هي الظاهرة البصرية التي ينحني فيها مسار الضوء عند انتقاله بين وسطين شفافين مختلفي الكثافة؟",
      "options": [
        "الحيود",
        "التداخل",
        "الاستقطاب",
        "الانكسار (Refraction)"
      ],
      "correctIndex": 3,
      "explanation": "يحدث انكسار الضوء نتيجة تغير سرعة الموجة الضوئية عند انتقالها بين وسطين مثل الهواء والماء أو الزجاج."
    },
    "fr": {
      "question": "Quel phénomène optique correspond à la déviation d'un rayon lumineux changeant de milieu ?",
      "options": [
        "La diffraction",
        "L'interférence",
        "La polarisation",
        "La réfraction"
      ],
      "correctIndex": 3,
      "explanation": "La réfraction est le changement de direction de la lumière causé par une variation de sa vitesse."
    }
  },
  {
    "id": "phy-14",
    "category": "physics",
    "en": {
      "question": "What physical law states that total energy in an isolated system remains constant over time?",
      "options": [
        "First Law of Thermodynamics (Conservation of Energy)",
        "Law of Conservation of Momentum",
        "Second Law of Thermodynamics",
        "Coulomb's Law"
      ],
      "correctIndex": 0,
      "explanation": "The Law of Conservation of Energy states energy cannot be created or destroyed, only transformed from one form to another."
    },
    "ar": {
      "question": "أي قانون فيزيائي ينص على أن \"الطاقة لا تفنى ولا تستحدث من العدم، بل تتحول من شكل لآخر\"؟",
      "options": [
        "القانون الأول للديناميكا الحرارية (حفظ الطاقة)",
        "قانون حفظ الزخم",
        "القانون الثاني للديناميكا",
        "قانون كولوم"
      ],
      "correctIndex": 0,
      "explanation": "ينص مبدأ حفظ الطاقة على أن الطاقة الكلية في أي نظام معزول تظل ثابتة وتتحول فقط بين أشكالها."
    },
    "fr": {
      "question": "Quel principe fondamental stipule que l'énergie d'un système isolé reste constante dans le temps ?",
      "options": [
        "Le premier principe de la thermodynamique (conservation de l'énergie)",
        "La conservation de la quantité de mouvement",
        "Le second principe de la thermodynamique",
        "La loi de Coulomb"
      ],
      "correctIndex": 0,
      "explanation": "L'énergie ne peut être ni créée ni détruite, seulement transformée (premier principe de la thermodynamique)."
    }
  },
  {
    "id": "phy-15",
    "category": "physics",
    "en": {
      "question": "What is the term for materials that exhibit zero electrical resistance below a critical temperature?",
      "options": [
        "Semiconductors",
        "Superconductors",
        "Dielectrics",
        "Ferromagnets"
      ],
      "correctIndex": 1,
      "explanation": "Superconductors conduct electricity without any energy dissipation and expel magnetic fields (Meissner effect)."
    },
    "ar": {
      "question": "ماذا تسمى المواد التي تنعدم فيها المقاومة الكهربائية تماماً عند تبريدها دون درجة حرارة حرجة؟",
      "options": [
        "أشباه الموصلات",
        "الموصلات الفائقة (Superconductors)",
        "المواد العازلة",
        "المواد المغناطيسية"
      ],
      "correctIndex": 1,
      "explanation": "الموصلات الفائقة تسمح بمرور التيار الكهربائي دون أي فقدان للطاقة وتطرد الحقول المغناطيسية."
    },
    "fr": {
      "question": "Comment nomme-t-on les matériaux présentant une résistance électrique strictement nulle à basse température ?",
      "options": [
        "Les semi-conducteurs",
        "Les supraconducteurs",
        "Les diélectriques",
        "Les ferromagnétiques"
      ],
      "correctIndex": 1,
      "explanation": "Les supraconducteurs conduisent le courant électrique sans aucune perte d'énergie thermique."
    }
  },
  {
    "id": "phy-16",
    "category": "physics",
    "en": {
      "question": "Which of the four fundamental forces of nature is the strongest over subatomic distances?",
      "options": [
        "Gravitational force",
        "Weak nuclear force",
        "Strong nuclear force",
        "Electromagnetic force"
      ],
      "correctIndex": 2,
      "explanation": "The strong force is approximately 137 times stronger than electromagnetism and binds quarks into protons and neutrons."
    },
    "ar": {
      "question": "أي من القوى الأساسية الأربع في الطبيعة تعتبر الأقوى على الإطلاق في المسافات دون الذرية؟",
      "options": [
        "قوة الجاذبية",
        "القوة النووية الضعيفة",
        "القوة النووية القوية (Strong force)",
        "القوة الكهرومغناطيسية"
      ],
      "correctIndex": 2,
      "explanation": "القوة النووية القوية هي الأقوى في الكون وتربط الكواركات معاً داخل البروتونات والنيوترونات."
    },
    "fr": {
      "question": "Laquelle des quatre interactions fondamentales est la plus puissante à l'échelle subatomique ?",
      "options": [
        "La gravitation",
        "L'interaction faible",
        "L'interaction forte",
        "L'électromagnétisme"
      ],
      "correctIndex": 2,
      "explanation": "L'interaction nucléaire forte lie les quarks et maintient la cohésion des noyaux atomiques."
    }
  },
  {
    "id": "phy-17",
    "category": "physics",
    "en": {
      "question": "What is the standard unit of pressure in the International System of Units (equivalent to 1 N/m²)?",
      "options": [
        "Bar",
        "Torr",
        "Atmosphere (atm)",
        "Pascal (Pa)"
      ],
      "correctIndex": 3,
      "explanation": "The Pascal (Pa) is the SI unit of pressure, defined as one Newton of force applied per square meter."
    },
    "ar": {
      "question": "ما هي وحدة قياس الضغط القياسية في النظام الدولي للوحدات (وتكافئ نيوتن واحد لكل متر مربع)؟",
      "options": [
        "البار",
        "التور",
        "الضغط الجوي (atm)",
        "الباسكال (Pascal)"
      ],
      "correctIndex": 3,
      "explanation": "الباسكال (Pa) هو وحدة قياس الضغط المعيارية الدولية نسبة للعالم الفرنسي بليز باسكال."
    },
    "fr": {
      "question": "Quelle est l'unité légale de pression dans le Système International (égale à 1 N/m²) ?",
      "options": [
        "Le bar",
        "Le torr",
        "L'atmosphère",
        "Le pascal (Pa)"
      ],
      "correctIndex": 3,
      "explanation": "Le pascal (Pa) représente une force d'un newton s'exerçant sur une surface d'un mètre carré."
    }
  },
  {
    "id": "phy-18",
    "category": "physics",
    "en": {
      "question": "What mathematical equation represents mass-energy equivalence in Special Relativity?",
      "options": [
        "E = mc²",
        "F = ma",
        "PV = nRT",
        "V = IR"
      ],
      "correctIndex": 0,
      "explanation": "Einstein's famous formula E=mc² shows that mass (m) can be converted into immense energy (E), proportional to the speed of light squared (c²)."
    },
    "ar": {
      "question": "ما هي المعادلة الرياضية الشهيرة التي تعبر عن تكافؤ الكتلة والطاقة لألبرت أينشتاين؟",
      "options": [
        "E = mc²",
        "F = ma",
        "PV = nRT",
        "V = IR"
      ],
      "correctIndex": 0,
      "explanation": "معادلة أينشتاين E=mc² تثبت أن المادة والطاقة وجهان لعملة واحدة ويمكن تحويل الكتلة لطاقة هائلة."
    },
    "fr": {
      "question": "Quelle équation d'Einstein formalise l'équivalence entre la masse et l'énergie ?",
      "options": [
        "E = mc²",
        "F = ma",
        "PV = nRT",
        "V = IR"
      ],
      "correctIndex": 0,
      "explanation": "E=mc² indique que l'énergie équivaut au produit de la masse par le carré de la vitesse de la lumière."
    }
  },
  {
    "id": "phy-19",
    "category": "physics",
    "en": {
      "question": "What device converts mechanical kinetic energy directly into electrical energy via electromagnetic induction?",
      "options": [
        "Transformer",
        "Electric Generator (Dynamo)",
        "Capacitor",
        "Inverter"
      ],
      "correctIndex": 1,
      "explanation": "Generators rotate coils within magnetic fields to produce electric current based on Faraday's Law."
    },
    "ar": {
      "question": "ما هو الجهاز الذي يحول الطاقة الحركية الميكانيكية مباشرة إلى طاقة كهربائية عبر الحث الكهرومغناطيسي؟",
      "options": [
        "المحول الكهربائي",
        "المولد الكهربائي (الدينامو)",
        "المكثف",
        "العاكس"
      ],
      "correctIndex": 1,
      "explanation": "المولد الكهربائي أو الدينامو يعتمد على قانون فاراداي للحث لتوليد تيار كهربائي من حركة الملفات داخل مجال مغناطيسي."
    },
    "fr": {
      "question": "Quel appareil convertit l'énergie mécanique en énergie électrique par induction ?",
      "options": [
        "Le transformateur",
        "Le générateur électrique (dynamo / alternateur)",
        "Le condensateur",
        "L'onduleur"
      ],
      "correctIndex": 1,
      "explanation": "L'alternateur ou générateur produit du courant électrique grâce à la rotation d'aimants et de bobines."
    }
  },
  {
    "id": "phy-20",
    "category": "physics",
    "en": {
      "question": "What term describes the apparent change in frequency or pitch of a wave as its source moves relative to an observer?",
      "options": [
        "Compton Effect",
        "Zeeman Effect",
        "Doppler Effect",
        "Photoelectric Effect"
      ],
      "correctIndex": 2,
      "explanation": "The Doppler effect causes higher pitch (shorter waves) as a sound approaches and lower pitch as it recedes."
    },
    "ar": {
      "question": "ما هو التأثير الفيزيائي الذي يصف التغير الظاهري في تردد الصوت أو الضوء مع حركة المصدر مقترباً أو مبتعداً عن الراصد؟",
      "options": [
        "تأثير كومبتون",
        "تأثير زيمان",
        "تأثير دوبلر (Doppler Effect)",
        "التأثير الكهروضوئي"
      ],
      "correctIndex": 2,
      "explanation": "تأثير دوبلر يفسر تغير نغمة صفارة الإسعاف عند اقترابها وابتعادها وانزياح طيف النجوم نحو الأحمر."
    },
    "fr": {
      "question": "Quel effet physique explique le changement de fréquence d'une onde quand la source se déplace ?",
      "options": [
        "L'effet Compton",
        "L'effet Zeeman",
        "L'effet Doppler",
        "L'effet photoélectrique"
      ],
      "correctIndex": 2,
      "explanation": "L'effet Doppler se manifeste par exemple par le son plus aigu d'une sirène qui s'approche et plus grave en s'éloignant."
    }
  },
  {
    "id": "phy-21",
    "category": "physics",
    "en": {
      "question": "What is the primary thermodynamic property that measures the degree of disorder or randomness in a system?",
      "options": [
        "Enthalpy",
        "Heat Capacity",
        "Free Energy",
        "Entropy"
      ],
      "correctIndex": 3,
      "explanation": "Entropy (S) quantifies molecular disorder; the Second Law states that total entropy of an isolated system always increases."
    },
    "ar": {
      "question": "ما هي الخاصية الديناميكية الحرارية التي تقيس درجة العشوائية والاضطراب في نظام فيزيائي؟",
      "options": [
        "المحتوى الحراري (الإنثالبي)",
        "السعة الحرارية",
        "الطاقة الحرة",
        "الإنتروبيا (الاعتلاج - Entropy)"
      ],
      "correctIndex": 3,
      "explanation": "الإنتروبيا تقيس الفوضى الجزيئية وينص القانون الثاني للديناميكا الحرارية على تزايدها المستمر في الكون."
    },
    "fr": {
      "question": "Quelle grandeur thermodynamique mesure le degré de désordre d'un système ?",
      "options": [
        "L'enthalpie",
        "La capacité thermique",
        "L'énergie libre",
        "L'entropie"
      ],
      "correctIndex": 3,
      "explanation": "L'entropie caractérise le désordre microscopique et augmente constamment dans un système isolé."
    }
  },
  {
    "id": "phy-22",
    "category": "physics",
    "en": {
      "question": "What quantum mechanical principle states that one cannot simultaneously know the exact position and momentum of a particle?",
      "options": [
        "Heisenberg Uncertainty Principle",
        "Pauli Exclusion Principle",
        "Schrödinger Wave Equation",
        "Planck Radiation Law"
      ],
      "correctIndex": 0,
      "explanation": "Formulated by Werner Heisenberg in 1927, Δx·Δp ≥ ℏ/2 establishes a fundamental limit on quantum measurement precision."
    },
    "ar": {
      "question": "ما هو المبدأ في ميكانيكا الكم الذي ينص على استحالة تحديد موقع وسرعة جسيم دون ذري بدقة مطلقة في نفس اللحظة؟",
      "options": [
        "مبدأ عدم التأكد (الشك) لهايزنبرج",
        "مبدأ باولي للاستبعاد",
        "معادلة شرودنجر الموجية",
        "قانون بلانك"
      ],
      "correctIndex": 0,
      "explanation": "مبدأ الشك لفيرنر هايزنبرج يؤكد وجود حد طبيعي جوهري لدقة قياس موضع الجسيم وزخمه معاً."
    },
    "fr": {
      "question": "Quel principe quantique affirme qu'on ne peut connaître simultanément et précisément la position et la vitesse d'une particule ?",
      "options": [
        "Le principe d'incertitude d'Heisenberg",
        "Le principe d'exclusion de Pauli",
        "L'équation de Schrödinger",
        "La loi de Planck"
      ],
      "correctIndex": 0,
      "explanation": "Le principe d'indétermination d'Heisenberg fixe une limite fondamentale à la précision des mesures quantiques."
    }
  },
  {
    "id": "phy-23",
    "category": "physics",
    "en": {
      "question": "What is the rate of doing work or transferring energy per unit time?",
      "options": [
        "Force",
        "Power",
        "Torque",
        "Momentum"
      ],
      "correctIndex": 1,
      "explanation": "Power is work divided by time (P = W/t), measured in Watts (1 Watt = 1 Joule per second)."
    },
    "ar": {
      "question": "ما هو المعدل الزمني لإنجاز الشغل أو نقل الطاقة في وحدة الزمن؟",
      "options": [
        "القوة",
        "القدرة (Power)",
        "عزم الدوران",
        "الزخم"
      ],
      "correctIndex": 1,
      "explanation": "القدرة هي الشغل المنجز مقسوماً على الزمن وتقاس بالواط (١ واط = ١ جول في الثانية)."
    },
    "fr": {
      "question": "Quelle grandeur physique représente la quantité d'énergie fournie ou consommée par unité de temps ?",
      "options": [
        "La force",
        "La puissance",
        "Le couple",
        "L'impulsion"
      ],
      "correctIndex": 1,
      "explanation": "La puissance (mesurée en watts) est le taux de transfert d'énergie par seconde (P = E / t)."
    }
  },
  {
    "id": "phy-24",
    "category": "physics",
    "en": {
      "question": "What type of lens is thicker in the middle than at the edges and converges parallel light rays to a focal point?",
      "options": [
        "Concave lens (Diverging)",
        "Cylindrical lens",
        "Convex lens (Converging)",
        "Biconcave lens"
      ],
      "correctIndex": 2,
      "explanation": "A convex lens focuses parallel light rays inward to a single focal point (used in magnifying glasses and cameras)."
    },
    "ar": {
      "question": "ما نوع العدسة التي تكون سميكة في الوسط ورقيقة عند الأطراف وتجمع أشعة الضوء المتوازية في بؤرة واحدة؟",
      "options": [
        "العدسة المقعرة (المفرقة)",
        "العدسة الأسطوانية",
        "العدسة المحدبة (المجمعة)",
        "العدسة المستوية المقعرة"
      ],
      "correctIndex": 2,
      "explanation": "العدسة المحدبة تكسر الأشعة الضوئية للداخل وتجمعها في نقطة البؤرة وتستخدم في النظارات والمكبرات."
    },
    "fr": {
      "question": "Quel type de lentille est plus épaisse au centre qu'aux bords et fait converger les rayons lumineux ?",
      "options": [
        "La lentille concave",
        "La lentille cylindrique",
        "La lentille convexe (convergente)",
        "Le prisme"
      ],
      "correctIndex": 2,
      "explanation": "Les lentilles convexes convergentes concentrent les rayons lumineux parallèles vers un foyer."
    }
  },
  {
    "id": "phy-25",
    "category": "physics",
    "en": {
      "question": "What is the term for the minimum velocity an object must achieve to escape the gravitational pull of a celestial body?",
      "options": [
        "Orbital velocity",
        "Relativistic speed",
        "Terminal velocity",
        "Escape velocity"
      ],
      "correctIndex": 3,
      "explanation": "Escape velocity from Earth's surface is approximately 11.2 km/s (roughly 40,320 km/h or 25,000 mph)."
    },
    "ar": {
      "question": "ماذا تسمى السرعة الدنيا التي يجب أن ينطلق بها جسم ليفلت تماماً من الجاذبية الأرضية دون قوة دفع إضافية؟",
      "options": [
        "السرعة المدارية",
        "السرعة النسبية",
        "السرعة الحدية",
        "سرعة الإفلات (Escape velocity)"
      ],
      "correctIndex": 3,
      "explanation": "تبلغ سرعة الإفلات من جاذبية كوكب الأرض حوالي ١١.٢ كم/ثانية للتحرر نحو الفضاء الخارجي."
    },
    "fr": {
      "question": "Quelle vitesse minimale un projectile doit-il atteindre pour échapper à l'attraction gravitationnelle de la Terre ?",
      "options": [
        "La vitesse orbitale",
        "La vitesse sonique",
        "La vitesse limite",
        "La vitesse de libération (d'évasion)"
      ],
      "correctIndex": 3,
      "explanation": "La vitesse de libération de la Terre est d'environ 11,2 km/s (soit 40 320 km/h)."
    }
  }
];

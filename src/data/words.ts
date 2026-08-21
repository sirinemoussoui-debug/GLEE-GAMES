import { WordCategory } from '../types';

export const WORD_CATEGORIES: WordCategory[] = [
  {
    id: 'places',
    icon: 'MapPin',
    nameEn: 'Places & Travel',
    nameAr: 'أماكن وسفر',
    nameFr: 'Lieux & Voyages',
    descriptionEn: 'Airports, hotels, famous landmarks, and vacation spots',
    descriptionAr: 'مطارات، فنادق، معالم شهيرة، ووجهات سياحية',
    descriptionFr: 'Aéroports, hôtels, monuments célèbres et lieux de vacances',
    words: [
      { id: 'p1', category: 'places', en: 'Airport', ar: 'مطار', fr: 'Aéroport', hintEn: 'Location with runways', hintAr: 'مكان به مدارج طائرات', hintFr: 'Lieu avec pistes' },
      { id: 'p2', category: 'places', en: 'Hospital', ar: 'مستشفى', fr: 'Hôpital', hintEn: 'Medical facility', hintAr: 'مكان للعلاج والأطباء', hintFr: 'Établissement médical' },
      { id: 'p3', category: 'places', en: 'Subway Station', ar: 'محطة مترو', fr: 'Station de métro', hintEn: 'Underground transport', hintAr: 'وسيلة نقل تحت الأرض', hintFr: 'Transport souterrain' },
      { id: 'p4', category: 'places', en: 'Amusement Park', ar: 'مدينة ملاهي', fr: 'Parc d\'attractions', hintEn: 'Roller coasters and games', hintAr: 'ألعاب وقطارات سريعة', hintFr: 'Montagnes russes et jeux' },
      { id: 'p5', category: 'places', en: 'Cinema / Theater', ar: 'سينما / مسرح', fr: 'Cinéma / Théâtre', hintEn: 'Big screen and popcorn', hintAr: 'شاشة ضخمة وفشار', hintFr: 'Grand écran et pop-corn' },
      { id: 'p6', category: 'places', en: 'Hotel Resort', ar: 'منتجع فندقي', fr: 'Complexe hôtelier', hintEn: 'Pools and room keys', hintAr: 'مسابح وغرف استجمام', hintFr: 'Piscines et détente' },
      { id: 'p7', category: 'places', en: 'Eiffel Tower', ar: 'برج إيفل', fr: 'Tour Eiffel', hintEn: 'Famous iron monument', hintAr: 'معلم حديدي شهير بفرنسا', hintFr: 'Monument en fer à Paris' },
      { id: 'p8', category: 'places', en: 'Pyramids of Giza', ar: 'أهرامات الجيزة', fr: 'Pyramides de Gizeh', hintEn: 'Ancient desert wonders', hintAr: 'عجائب قديمة في الصحراء', hintFr: 'Merveilles antiques' },
      { id: 'p9', category: 'places', en: 'Library', ar: 'مكتبة عامة', fr: 'Bibliothèque', hintEn: 'Quiet place with books', hintAr: 'مكان هادئ مليء بالكتب', hintFr: 'Endroit calme avec des livres' },
      { id: 'p10', category: 'places', en: 'Space Station', ar: 'محطة فضائية', fr: 'Station spatiale', hintEn: 'Orbiting zero-gravity lab', hintAr: 'مختبر يدور في الفضاء', hintFr: 'Laboratoire en orbite' },
      { id: 'p11', category: 'places', en: 'Cruise Ship', ar: 'سفينة سياحية', fr: 'Bateau de croisière', hintEn: 'Floating hotel on the sea', hintAr: 'فندق عائم في البحر', hintFr: 'Hôtel flottant en mer' },
      { id: 'p12', category: 'places', en: 'Gym / Fitness Club', ar: 'نادي رياضي', fr: 'Salle de sport', hintEn: 'Weights and treadmills', hintAr: 'أوزان وأجهزة رياضية', hintFr: 'Haltères et tapis de course' },
      { id: 'p13', category: 'places', en: 'Supermarket', ar: 'سوبرماركت', fr: 'Supermarché', hintEn: 'Carts and aisles', hintAr: 'عربات تسوق وممرات', hintFr: 'Chariots et rayons' },
      { id: 'p14', category: 'places', en: 'Police Station', ar: 'مركز شرطة', fr: 'Commissariat', hintEn: 'Sirens and holding cells', hintAr: 'صفارات أمن ومكاتب تحقيق', hintFr: 'Sirènes et cellules' },
      { id: 'p15', category: 'places', en: 'Desert Oasis', ar: 'واحة صحراوية', fr: 'Oasis dans le désert', hintEn: 'Palm trees among sand', hintAr: 'نخيل وماء وسط الرمال', hintFr: 'Palmiers au milieu du sable' },
      { id: 'p16', category: 'places', en: 'Casino', ar: 'كازينو', fr: 'Casino', hintEn: 'Roulette and poker tables', hintAr: 'طاولات روليت وأوراق اللعب', hintFr: 'Roulette et tables de jeu' },
    ],
  },
  {
    id: 'food',
    icon: 'Utensils',
    nameEn: 'Food & Drinks',
    nameAr: 'طعام ومشروبات',
    nameFr: 'Nourriture & Boissons',
    descriptionEn: 'Tasty dishes, snacks, street food, and beverages',
    descriptionAr: 'أطباق لذيذة، وجبات سريعة، ومشروبات',
    descriptionFr: 'Plats délicieux, en-cas, street food et boissons',
    words: [
      { id: 'f1', category: 'food', en: 'Pizza', ar: 'بيتزا', fr: 'Pizza', hintEn: 'Baked dough with cheese & toppings', hintAr: 'عجينة مخبوزة بالجبن والصلصة', hintFr: 'Pâte cuite au four avec fromage' },
      { id: 'f2', category: 'food', en: 'Sushi', ar: 'سوشي', fr: 'Sushi', hintEn: 'Japanese rice & seafood rolls', hintAr: 'أرز ياباني مع مأكولات بحرية', hintFr: 'Rouleaux de riz et fruits de mer' },
      { id: 'f3', category: 'food', en: 'Shawarma', ar: 'شاورما', fr: 'Chawarma', hintEn: 'Spit-roasted sliced meat wrap', hintAr: 'لفافة لحم أو دجاج مشوي على السيخ', hintFr: 'Viande rôtie à la broche en wrap' },
      { id: 'f4', category: 'food', en: 'Croissant', ar: 'كرواسون', fr: 'Croissant', hintEn: 'Buttery flaky French pastry', hintAr: 'مخبوز فرنسي هش بالزبدة', hintFr: 'Viennoiserie feuilletée au beurre' },
      { id: 'f5', category: 'food', en: 'Ice Cream Sundae', ar: 'آيس كريم مثلج', fr: 'Coupe glacée', hintEn: 'Cold sweet dessert with toppings', hintAr: 'حلوى باردة مثلجة مع صوص', hintFr: 'Dessert glacé sucré' },
      { id: 'f6', category: 'food', en: 'Espresso Coffee', ar: 'قهوة إسبريسو', fr: 'Café Espresso', hintEn: 'Strong concentrated caffeine', hintAr: 'مشروب ساخن مركز ومعدل للمزاج', hintFr: 'Café fort et concentré' },
      { id: 'f7', category: 'food', en: 'Burger & Fries', ar: 'برجر وبطاطس', fr: 'Burger & Frites', hintEn: 'Bun, patty, and crispy potatoes', hintAr: 'شطيرة لحم مع بطاطا مقلية', hintFr: 'Pain rond, steak et pommes frites' },
      { id: 'f8', category: 'food', en: 'Tacos', ar: 'تاكوس', fr: 'Tacos', hintEn: 'Mexican folded tortilla shell', hintAr: 'تورتيلا مكسيكية محشوة', hintFr: 'Galette de maïs mexicaine garnie' },
      { id: 'f9', category: 'food', en: 'Chocolate Cake', ar: 'كعكة الشوكولاتة', fr: 'Gâteau au chocolat', hintEn: 'Rich sweet birthday slice', hintAr: 'حلوى غنية بالكاكاو للحفلات', hintFr: 'Pâtisserie gourmande au cacao' },
      { id: 'f10', category: 'food', en: 'Bubble Tea (Boba)', ar: 'شاي البوبا (فقاعات)', fr: 'Bubble Tea', hintEn: 'Tea with chewy tapioca pearls', hintAr: 'شاي مثلج مع حبيبات التابيوكا', hintFr: 'Thé aux perles de tapioca' },
      { id: 'f11', category: 'food', en: 'Falafel', ar: 'فلافل', fr: 'Falafel', hintEn: 'Crispy fried chickpea balls', hintAr: 'أقراص مقرمشة من الحمص والأعشاب', hintFr: 'Boulettes croustillantes de pois chiches' },
      { id: 'f12', category: 'food', en: 'Barbecue Ribs', ar: 'مشاوي باربكيو', fr: 'Barbecue Ribs', hintEn: 'Smoked glazed grilled meat', hintAr: 'لحوم مشوية بصلصة مدخنة', hintFr: 'Viande grillée sauce fumée' },
    ],
  },
  {
    id: 'campus',
    icon: 'GraduationCap',
    nameEn: 'Campus & Student Life',
    nameAr: 'حياة الجامعة والطلاب',
    nameFr: 'Campus & Vie Étudiante',
    descriptionEn: 'Exams, dorms, professors, parties, and student moments',
    descriptionAr: 'امتحانات، سكن جامعي، أساتذة، حفلات، ولحظات دراسية',
    descriptionFr: 'Examens, résidences, profs, soirées et vie étudiante',
    words: [
      { id: 'c1', category: 'campus', en: 'Final Exam Hall', ar: 'قاعة الامتحان النهائي', fr: 'Salle d\'examen final', hintEn: 'Dead silence, ticking clock, stress', hintAr: 'هدوء تام، توتر، وأوراق اختبار', hintFr: 'Silence total, stress et copies' },
      { id: 'c2', category: 'campus', en: 'University Cafeteria', ar: 'كافتيريا الجامعة', fr: 'Cafétéria universitaire', hintEn: 'Trays, noisy student lunches', hintAr: 'صواني طعام ولقاءات الأصدقاء', hintFr: 'Plateaux repas et discussions' },
      { id: 'c3', category: 'campus', en: 'Dormitory Room', ar: 'غرفة السكن الطلابي', fr: 'Chambre de cité U', hintEn: 'Bunk beds, posters, roommates', hintAr: 'سرير، ملصقات، وشريك غرفة', hintFr: 'Lits superposés et colocataires' },
      { id: 'c4', category: 'campus', en: 'Graduation Stage', ar: 'منصة حفل التخرج', fr: 'Scène de remise des diplômes', hintEn: 'Caps flying in the air, gowns', hintAr: 'قبعات طائرة وعباءات التخرج', hintFr: 'Lancer de toques et toges' },
      { id: 'c5', category: 'campus', en: 'All-Nighter Study Session', ar: 'سهرة دراسة حتى الصباح', fr: 'Nuit blanche de révision', hintEn: 'Energy drinks and flashcards', hintAr: 'مشروبات طاقة وملخصات سريعة', hintFr: 'Boissons énergisantes et fiches' },
      { id: 'c6', category: 'campus', en: 'Professor Lecture Amphitheater', ar: 'مدرج المحاضرات الكبير', fr: 'Amphithéâtre de cours', hintEn: 'Tiered seating and microphones', hintAr: 'مقاعد متدرجة وشاشة عرض ضخمة', hintFr: 'Gradins et micro du professeur' },
      { id: 'c7', category: 'campus', en: 'Campus Party / Rave', ar: 'حفلة الطلاب الساهرة', fr: 'Soirée étudiante', hintEn: 'Red cups, loud music, dancing', hintAr: 'أكواب ملونة، موسيقى صاخبة، ورقص', hintFr: 'Musique à fond et ambiance festive' },
      { id: 'c8', category: 'campus', en: 'Group Project WhatsApp Chat', ar: 'جروب مشروع التخرج', fr: 'Groupe WhatsApp de projet', hintEn: 'One person does all the work', hintAr: 'شخص واحد يعمل والجميع يراقب', hintFr: 'Un seul qui travaille pour tous' },
      { id: 'c9', category: 'campus', en: 'Campus Coffee Truck', ar: 'عربة القهوة في الجامعة', fr: 'Food truck café du campus', hintEn: 'Morning rush between classes', hintAr: 'طابور الصباح السريع بين المحاضرات', hintFr: 'La file d\'attente du matin' },
      { id: 'c10', category: 'campus', en: 'University Science Lab', ar: 'معمل العلوم والتجارب', fr: 'Laboratoire de sciences', hintEn: 'White coats, goggles, test tubes', hintAr: 'معاطف بيضاء وأنابيب اختبار', hintFr: 'Blouses blanches et éprouvettes' },
    ],
  },
  {
    id: 'objects',
    icon: 'Package',
    nameEn: 'Everyday Objects',
    nameAr: 'أدوات وأشياء يومية',
    nameFr: 'Objets du Quotidien',
    descriptionEn: 'Items in your backpack, room, or pocket',
    descriptionAr: 'أشياء في حقيبتك أو غرفتك أو جيبك',
    descriptionFr: 'Objets dans votre sac, chambre ou poche',
    words: [
      { id: 'o1', category: 'objects', en: 'Smartphone', ar: 'هاتف ذكي', fr: 'Smartphone', hintEn: 'Touchscreen with notifications', hintAr: 'شاشة لمس مليئة بالإشعارات', hintFr: 'Écran tactile avec notifications' },
      { id: 'o2', category: 'objects', en: 'Wireless Earbuds', ar: 'سماعات بلوتوث', fr: 'Écouteurs sans fil', hintEn: 'Tiny sound pods with a case', hintAr: 'علبة شحن وصوت في الأذن', hintFr: 'Petits écouteurs avec boîtier' },
      { id: 'o3', category: 'objects', en: 'Sunglasses', ar: 'نظارة شمسية', fr: 'Lunettes de soleil', hintEn: 'Tinted lenses for sunny days', hintAr: 'عدسات داكنة لحماية العين', hintFr: 'Verres teintés pour l\'été' },
      { id: 'o4', category: 'objects', en: 'Mechanical Watch', ar: 'ساعة يد فاخرة', fr: 'Montre mécanique', hintEn: 'Worn on the wrist with hands', hintAr: 'تلبس على المعصم لتتبع الوقت', hintFr: 'Portée au poignet avec aiguilles' },
      { id: 'o5', category: 'objects', en: 'Umbrella', ar: 'مظلة مطر', fr: 'Parapluie', hintEn: 'Opens when water falls from the sky', hintAr: 'تفتح عند هطول المطر', hintFr: 'S\'ouvre quand il pleut' },
      { id: 'o6', category: 'objects', en: 'Acoustic Guitar', ar: 'غيتار خشبي', fr: 'Guitare acoustique', hintEn: 'Six strings and a wooden body', hintAr: 'ستة أوتار ونغمات موسيقية', hintFr: 'Six cordes et corps en bois' },
      { id: 'o7', category: 'objects', en: 'Drone Camera', ar: 'طائرة درون للتصوير', fr: 'Drone avec caméra', hintEn: 'Flying propellers and 4k camera', hintAr: 'مراوح تطير وتلتقط صورا جوية', hintFr: 'Hélices volantes et vue aérienne' },
      { id: 'o8', category: 'objects', en: 'Sneakers / Trainers', ar: 'حذاء رياضي عصري', fr: 'Baskets / Sneakers', hintEn: 'Laces and rubber soles', hintAr: 'أربطة ونعل مريح للمشي', hintFr: 'Lacets et semelles en caoutchouc' },
      { id: 'o9', category: 'objects', en: 'Passport', ar: 'جواز سفر', fr: 'Passeport', hintEn: 'Small booklet with country stamps', hintAr: 'كتيب صغير بأختام الدخول', hintFr: 'Petit livret avec tampons' },
      { id: 'o10', category: 'objects', en: 'Game Controller', ar: 'يد تحكم ألعاب الفيديو', fr: 'Manette de jeu', hintEn: 'Joysticks and trigger buttons', hintAr: 'أزرار وعصا تحكم للبلايستيشن', hintFr: 'Boutons et joysticks' },
    ],
  },
  {
    id: 'popculture',
    icon: 'Film',
    nameEn: 'Cinema & Pop Culture',
    nameAr: 'سينما وفنون مشهورة',
    nameFr: 'Cinéma & Pop Culture',
    descriptionEn: 'Movies, superheroes, rock concerts, and memes',
    descriptionAr: 'أفلام، أبطال خارقين، حفلات موسيقية ومشاهير',
    descriptionFr: 'Films, super-héros, concerts et mèmes',
    words: [
      { id: 'pc1', category: 'popculture', en: 'Secret Agent 007', ar: 'عميل سري جيمس بوند', fr: 'Agent secret 007', hintEn: 'Tuxedo, gadgets, martini', hintAr: 'بدلة أنيقة، أسلحة سرية ومهام خطيرة', hintFr: 'Costume, gadgets et missions' },
      { id: 'pc2', category: 'popculture', en: 'Superhero with a Cape', ar: 'بطل خارق برداء', fr: 'Super-héros à cape', hintEn: 'Flying in the sky saving the city', hintAr: 'يطير في السماء لإنقاذ المدينة', hintFr: 'Vole dans le ciel pour sauver la ville' },
      { id: 'pc3', category: 'popculture', en: 'Rock Concert Stage', ar: 'مسرح حفل موسيقي صاخب', fr: 'Scène de concert rock', hintEn: 'Laser lights, smoke, screaming crowd', hintAr: 'أضواء ليزر ودخان وجماهير تهتف', hintFr: 'Lasers, fumée et foule en délire' },
      { id: 'pc4', category: 'popculture', en: 'Hollywood Red Carpet', ar: 'السجادة الحمراء لهوليوود', fr: 'Tapis rouge d\'Hollywood', hintEn: 'Paparazzi cameras flashing', hintAr: 'عدسات المصورين وفساتين النجوم', hintFr: 'Flashs des paparazzi et célébrités' },
      { id: 'pc5', category: 'popculture', en: 'Haunted Castle', ar: 'قلعة أشباح مسكونة', fr: 'Château hanté', hintEn: 'Creaky doors and spooky shadows', hintAr: 'أبواب تصدر صريرا وظلال مخيفة', hintFr: 'Portes qui grincent et ombres' },
      { id: 'pc6', category: 'popculture', en: 'Pirate Ship', ar: 'سفينة قراصنة', fr: 'Bateau pirate', hintEn: 'Skull flag, cannons, treasure chest', hintAr: 'علم الجمجمة ومدافع وصندوق كنز', hintFr: 'Drapeau à tête de mort et coffre' },
      { id: 'pc7', category: 'popculture', en: 'Alien Mothership', ar: 'سفينة فضائيين عملاقة', fr: 'Vaisseau extraterrestre', hintEn: 'Green beams and UFO sightings', hintAr: 'أشعة ضوئية وصحون طائرة', hintFr: 'Rayons verts et soucoupe volante' },
      { id: 'pc8', category: 'popculture', en: 'Time Machine', ar: 'آلة الزمن', fr: 'Machine à voyager dans le temps', hintEn: 'Traveling to the past or future', hintAr: 'تسافر للماضي والمستقبل بضغطة زر', hintFr: 'Voyage vers le passé ou le futur' },
    ],
  },
  {
    id: 'nature',
    icon: 'Sparkles',
    nameEn: 'Animals & Wonders',
    nameAr: 'حيوانات وعجائب الطبيعة',
    nameFr: 'Animaux & Merveilles',
    descriptionEn: 'Wild creatures, jungle safaris, and ocean depths',
    descriptionAr: 'كائنات برية، رحلات سفاري، وأعماق البحار',
    descriptionFr: 'Créatures sauvages, safaris et profondeurs marines',
    words: [
      { id: 'n1', category: 'nature', en: 'Safari Lion', ar: 'أسد بري في السفاري', fr: 'Lion du safari', hintEn: 'King with a golden mane', hintAr: 'ملك الغابة وصاحب الزئير القوي', hintFr: 'Roi de la savane à crinière' },
      { id: 'n2', category: 'nature', en: 'Dolphin Pod', ar: 'دلافين في المحيط', fr: 'Dauphins de l\'océan', hintEn: 'Playful jumping sea mammals', hintAr: 'كائنات بحرية ذكية تقفز بمرح', hintFr: 'Mammifères marins joueurs' },
      { id: 'n3', category: 'nature', en: 'Penguin on Iceberg', ar: 'بطريق على جبل جليدي', fr: 'Pingouin sur banquise', hintEn: 'Waddling in black and white tuxedo', hintAr: 'يمشي ببدلة سوداء وبيضاء على الجليد', hintFr: 'Démarche dandinante dans le froid' },
      { id: 'n4', category: 'nature', en: 'Active Volcano', ar: 'بركان ثائر نشط', fr: 'Volcan en éruption', hintEn: 'Bubbling hot red magma', hintAr: 'حمم نارية حمراء ودخان متصاعد', hintFr: 'Magma rougeoyant et fumée' },
      { id: 'n5', category: 'nature', en: 'Tropical Rainforest', ar: 'غابة استوائية مطيرة', fr: 'Forêt tropicale humide', hintEn: 'Dense canopy, parrots, exotic plants', hintAr: 'أشجار عملاقة وببغاوات ملونة', hintFr: 'Canopée dense et oiseaux colorés' },
      { id: 'n6', category: 'nature', en: 'Giant Panda', ar: 'باندا عملاق', fr: 'Panda géant', hintEn: 'Munching bamboo peacefully', hintAr: 'يأكل الخيزران وينام براحة', hintFr: 'Mangeur de bambou paisible' },
    ],
  },
];

export const PARTY_ICEBREAKERS = {
  en: [
    'How often do people normally encounter or use this?',
    'Is this associated with a warm or a cold environment?',
    'Would you bring this on a college trip or a night out?',
    'Can you buy or visit this with money?',
    'Is this something loud or quiet?',
    'Does this usually stay indoors or outdoors?',
    'Have you personally experienced this this week?',
    'Would you be scared or excited to see this right now?',
  ],
  ar: [
    'كم مرة في الأسبوع يتعامل الشخص الطبيعي مع هذا الشيء؟',
    'هل هذا الشيء يرتبط بجو حار أم بارد؟',
    'هل تأخذ هذا الشيء معك في رحلة مع أصحابك؟',
    'هل يمكنك شراء هذا أو الذهاب إليه بالمال؟',
    'هل هذا الشيء يصدر صوتاً عالياً أم هادئاً؟',
    'هل هو موجود في الداخل عادةً أم في الهواء الطلق؟',
    'هل رأيت هذا أو جربته خلال الأسبوع الحالي؟',
    'إذا ظهر أمامك الآن، هل تفرح أم تتفاجأ؟',
  ],
  fr: [
    'À quelle fréquence une personne utilise ou visite cela ?',
    'Est-ce associé à un environnement chaud ou froid ?',
    'Prendrais-tu cela lors d\'un voyage entre amis ou en soirée ?',
    'Peut-on l\'acheter ou y accéder avec de l\'argent ?',
    'Est-ce quelque chose de bruyant ou de silencieux ?',
    'Se trouve-t-il généralement à l\'intérieur ou en plein air ?',
    'L\'as-tu expérimenté ou vu cette semaine ?',
    'Serais-tu ravi ou surpris de voir cela surgir maintenant ?',
  ],
};

export const DEFAULT_AVATARS = [
  '#8B5CF6', // Purple
  '#3B82F6', // Blue
  '#F97316', // Orange
  '#EC4899', // Pink
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#F59E0B', // Amber
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#EF4444', // Red
];

export const PRESET_PLAYER_NAMES = {
  en: ['Alex', 'Maya', 'Sam', 'Leo', 'Nora', 'Zack', 'Elena', 'Kai'],
  ar: ['سارة', 'عمر', 'ليلى', 'كريم', 'ياسمين', 'حمزة', 'نور', 'طارق'],
  fr: ['Lucas', 'Camille', 'Antoine', 'Léa', 'Hugo', 'Inès', 'Maxime', 'Chloé'],
};

import { WordPair } from './types';

export const CATEGORIES = [
  { ne: 'सबै', en: 'All' },
  { ne: 'फलफूल', en: 'Fruits' },
  { ne: 'जनावर', en: 'Animals' },
  { ne: 'खानेकुरा', en: 'Food' },
  { ne: 'वस्तु', en: 'Objects' },
  { ne: 'स्थान', en: 'Places' },
  { ne: 'पेशा', en: 'Jobs' },
  { ne: 'खेलकुद', en: 'Sports' },
  { ne: 'प्रविधि', en: 'Tech' },
  { ne: 'प्रकृति', en: 'Nature' },
  { ne: 'शरीरका अंग', en: 'Body Parts' },
  { ne: 'सवारी साधन', en: 'Vehicles' },
  { ne: 'रंगहरू', en: 'Colors' },
  { ne: 'घरपालुवा', en: 'Pets' },
  { ne: 'चलचित्र', en: 'Movies' },
  { ne: 'भावना', en: 'Emotions' },
  { ne: 'संगीत', en: 'Music' },
  { ne: 'रुचि', en: 'Hobbies' },
  { ne: 'विषय', en: 'Subjects' }
];

export const WORD_PAIRS: WordPair[] = [
  // Fruits
  { word1: 'स्याउ (Apple)', word2: 'नासपाती (Pear)', category: 'फलफूल', hint: 'यो एउटा गोलो र रसिलो फल हो। (A round, juicy fruit.)' },
  { word1: 'सुन्तला (Orange)', word2: 'जुनार (Sweet Orange)', category: 'फलफूल', hint: 'यो फलमा भिटामिन सी प्रशस्त हुन्छ। (Rich in Vitamin C.)' },
  { word1: 'आँप (Mango)', word2: 'लिची (Lychee)', category: 'फलफूल', hint: 'यो गर्मी महिनामा पाइने फल हो। (Found in summer.)' },
  { word1: 'केरा (Banana)', word2: 'मेवा (Papaya)', category: 'फलफूल', hint: 'यो फल पहेँलो र लामो हुन्छ। (Yellow and long.)' },
  { word1: 'अंगुर (Grapes)', word2: 'स्ट्रबेरी (Strawberry)', category: 'फलफूल', hint: 'यो झुप्पामा फल्ने सानो फल हो। (Grows in clusters.)' },
  { word1: 'खरबुजा (Watermelon)', word2: 'तरबुजा (Muskmelon)', category: 'फलफूल', hint: 'यो बाहिर हरियो र भित्र रातो हुन्छ। (Green outside, red inside.)' },
  { word1: 'अनार (Pomegranate)', word2: 'अम्बा (Guava)', category: 'फलफूल', hint: 'यस भित्र धेरै साना दानाहरू हुन्छन्। (Contains many small seeds.)' },
  { word1: 'कागती (Lemon)', word2: 'अमिलो (Citron)', category: 'फलफूल', hint: 'यो स्वादमा धेरै अमिलो हुन्छ। (Very sour in taste.)' },
  
  // Animals
  { word1: 'बाघ (Tiger)', word2: 'चितुवा (Leopard)', category: 'जनावर', hint: 'यो एउटा हिंस्रक जंगली जनावर हो। (A fierce wild animal.)' },
  { word1: 'हात्ती (Elephant)', word2: 'गैंडा (Rhino)', category: 'जनावर', hint: 'यो धेरै ठूलो र बलियो जनावर हो। (Very large and strong.)' },
  { word1: 'गाई (Cow)', word2: 'भैंसी (Buffalo)', category: 'जनावर', hint: 'यसले हामीलाई दूध दिन्छ। (Gives us milk.)' },
  { word1: 'कुकुर (Dog)', word2: 'बिरालो (Cat)', category: 'जनावर', hint: 'यो मानिसको नजिक बस्ने घरपालुवा जनावर हो। (A domestic animal close to humans.)' },
  { word1: 'घोडा (Horse)', word2: 'खच्चड (Mule)', category: 'जनावर', hint: 'यो छिटो दौडन सक्ने जनावर हो। (Can run very fast.)' },
  { word1: 'बाख्रा (Goat)', word2: 'भेडा (Sheep)', category: 'जनावर', hint: 'यो घाँस खाने सानो घरपालुवा जनावर हो। (Small grass-eating domestic animal.)' },
  { word1: 'सिंह (Lion)', word2: 'बाघ (Tiger)', category: 'जनावर', hint: 'यसलाई जंगलको राजा भनिन्छ। (King of the jungle.)' },
  { word1: 'खरायो (Rabbit)', word2: 'मुसो (Mouse)', category: 'जनावर', hint: 'यो सानो र छिटो चल्ने जनावर हो। (Small and quick-moving.)' },
  { word1: 'भालु (Bear)', word2: 'पाण्डा (Panda)', category: 'जनावर', hint: 'यो ठूलो र रौँ भएको जनावर हो। (Large and furry.)' },
  { word1: 'बाँदर (Monkey)', word2: 'गोरिल्ला (Gorilla)', category: 'जनावर', hint: 'यो रुखमा चढ्न सिपालु हुन्छ। (Skilled at climbing trees.)' },

  // Food
  { word1: 'मःम (MoMo)', word2: 'चाउमिन (Chowmein)', category: 'खानेकुरा', hint: 'यो नेपालको धेरै लोकप्रिय खाजा हो। (Very popular snack in Nepal.)' },
  { word1: 'दालभात (Dal Bhat)', word2: 'ढिँडो (Dhindo)', category: 'खानेकुरा', hint: 'यो नेपालीहरूको मुख्य खाना हो। (Main food of Nepalis.)' },
  { word1: 'रोटी (Roti)', word2: 'पुरी (Puri)', category: 'खानेकुरा', hint: 'यो गहुँको पिठोबाट बनाइन्छ। (Made from wheat flour.)' },
  { word1: 'चिया (Tea)', word2: 'कफी (Coffee)', category: 'खानेकुरा', hint: 'यो बिहान पिइने तातो पेय पदार्थ हो। (Hot morning drink.)' },
  { word1: 'दूध (Milk)', word2: 'दही (Curd)', category: 'खानेकुरा', hint: 'यो सेतो र स्वास्थ्यवर्धक हुन्छ। (White and healthy.)' },
  { word1: 'मिठाई (Sweet)', word2: 'जेरी (Jeri)', category: 'खानेकुरा', hint: 'यो स्वादमा धेरै गुलियो हुन्छ। (Very sweet in taste.)' },
  { word1: 'तरकारी (Curry)', word2: 'अचार (Pickle)', category: 'खानेकुरा', hint: 'यो खानासँग खाइने परिकार हो। (Dish eaten with meals.)' },
  { word1: 'पिज्जा (Pizza)', word2: 'बर्गर (Burger)', category: 'खानेकुरा', hint: 'यो एउटा पश्चिमी फास्ट फुड हो। (A Western fast food.)' },
  { word1: 'अण्डा (Egg)', word2: 'मासु (Meat)', category: 'खानेकुरा', hint: 'यसमा प्रोटिन धेरै हुन्छ। (High in protein.)' },
  { word1: 'भात (Rice)', word2: 'चिउरा (Beaten Rice)', category: 'खानेकुरा', hint: 'यो अन्नबाट बनाइन्छ। (Made from grain.)' },

  // Objects
  { word1: 'कलम (Pen)', word2: 'पेन्सिल (Pencil)', category: 'वस्तु', hint: 'यसले लेख्न मद्दत गर्छ। (Helps in writing.)' },
  { word1: 'कापी (Notebook)', word2: 'किताब (Book)', category: 'वस्तु', hint: 'यसमा हामी लेख्छौं वा पढ्छौं। (We write or read in it.)' },
  { word1: 'मोबाइल (Mobile)', word2: 'ल्यापटप (Laptop)', category: 'वस्तु', hint: 'यो एउटा विद्युतीय उपकरण हो। (An electronic device.)' },
  { word1: 'झोला (Bag)', word2: 'सुटकेस (Suitcase)', category: 'वस्तु', hint: 'यसमा हामी सामान राख्छौं। (We keep things in it.)' },
  { word1: 'घडी (Watch)', word2: 'चस्मा (Glasses)', category: 'वस्तु', hint: 'यसले समय देखाउँछ वा आँखालाई मद्दत गर्छ। (Shows time or helps eyes.)' },
  { word1: 'जुत्ता (Shoes)', word2: 'चप्पल (Slippers)', category: 'वस्तु', hint: 'यो खुट्टामा लगाइन्छ। (Worn on feet.)' },
  { word1: 'छाता (Umbrella)', word2: 'ओढ्ने (Blanket)', category: 'वस्तु', hint: 'यसले पानी वा घामबाट बचाउँछ। (Protects from rain or sun.)' },
  { word1: 'कैंची (Scissors)', word2: 'चक्कु (Knife)', category: 'वस्तु', hint: 'यसले काट्न मद्दत गर्छ। (Helps in cutting.)' },
  { word1: 'कुर्सी (Chair)', word2: 'टेबल (Table)', category: 'वस्तु', hint: 'यो घरको फर्निचर हो। (Home furniture.)' },
  { word1: 'झ्याल (Window)', word2: 'ढोका (Door)', category: 'वस्तु', hint: 'यो घरको एउटा भाग हो। (A part of a house.)' },

  // Places
  { word1: 'काठमाडौं (Kathmandu)', word2: 'पोखरा (Pokhara)', category: 'स्थान', hint: 'यो नेपालको एउटा ठूलो सहर हो। (A big city in Nepal.)' },
  { word1: 'लुम्बिनी (Lumbini)', word2: 'जनकपुर (Janakpur)', category: 'स्थान', hint: 'यो एउटा धार्मिक र ऐतिहासिक ठाउँ हो। (A religious and historical place.)' },
  { word1: 'हिमाल (Mountain)', word2: 'पहाड (Hill)', category: 'स्थान', hint: 'यो अग्लो र प्राकृतिक ठाउँ हो। (A high and natural place.)' },
  { word1: 'नदी (River)', word2: 'ताल (Lake)', category: 'स्थान', hint: 'यहाँ पानी बग्छ वा जम्मा हुन्छ। (Water flows or collects here.)' },
  { word1: 'मन्दिर (Temple)', word2: 'गुम्बा (Monastery)', category: 'स्थान', hint: 'यहाँ मानिसहरू पूजा गर्न जान्छन्। (People go here to worship.)' },
  { word1: 'स्कुल (School)', word2: 'कलेज (College)', category: 'स्थान', hint: 'यहाँ विद्यार्थीहरू पढ्न जान्छन्। (Students go here to study.)' },
  { word1: 'अस्पताल (Hospital)', word2: 'फार्मेसी (Pharmacy)', category: 'स्थान', hint: 'यहाँ बिरामीको उपचार हुन्छ। (Patients are treated here.)' },
  { word1: 'बजार (Market)', word2: 'गाउँ (Village)', category: 'स्थान', hint: 'यहाँ मानिसहरूको चहलपहल हुन्छ। (There is human activity here.)' },
  { word1: 'जंगल (Forest)', word2: 'बगैंचा (Garden)', category: 'स्थान', hint: 'यहाँ धेरै रुख र बिरुवाहरू हुन्छन्। (Many trees and plants are here.)' },
  { word1: 'सिनेमा हल (Cinema Hall)', word2: 'पार्क (Park)', category: 'स्थान', hint: 'यो मनोरञ्जन गर्ने ठाउँ हो। (A place for entertainment.)' },

  // Jobs
  { word1: 'डाक्टर (Doctor)', word2: 'नर्स (Nurse)', category: 'पेशा', hint: 'यसले बिरामीको सेवा गर्छ। (Serves patients.)' },
  { word1: 'शिक्षक (Teacher)', word2: 'प्राध्यापक (Professor)', category: 'पेशा', hint: 'यसले विद्यार्थीलाई पढाउँछ। (Teaches students.)' },
  { word1: 'इन्जिनियर (Engineer)', word2: 'आर्किटेक्ट (Architect)', category: 'पेशा', hint: 'यसले निर्माण कार्यमा मद्दत गर्छ। (Helps in construction.)' },
  { word1: 'किसान (Farmer)', word2: 'मजदुर (Worker)', category: 'पेशा', hint: 'यसले खेतमा काम गर्छ। (Works in fields.)' },
  { word1: 'प्रहरी (Police)', word2: 'सेना (Army)', category: 'पेशा', hint: 'यसले देश र जनताको सुरक्षा गर्छ। (Protects country and people.)' },
  { word1: 'गायक (Singer)', word2: 'संगीतकार (Musician)', category: 'पेशा', hint: 'यसले गीत र संगीत बनाउँछ। (Makes songs and music.)' },
  { word1: 'खेलाडी (Player)', word2: 'कोच (Coach)', category: 'पेशा', hint: 'यसले खेलकुदमा भाग लिन्छ। (Participates in sports.)' },
  { word1: 'व्यापारी (Merchant)', word2: 'उद्यमी (Entrepreneur)', category: 'पेशा', hint: 'यसले व्यापार व्यवसाय गर्छ। (Does business.)' },
  { word1: 'चालक (Driver)', word2: 'पाइलट (Pilot)', category: 'पेशा', hint: 'यसले सवारी साधन चलाउँछ। (Operates vehicles.)' },
  { word1: 'लेखक (Writer)', word2: 'पत्रकार (Journalist)', category: 'पेशा', hint: 'यसले लेख्ने र समाचार दिने काम गर्छ। (Writes and gives news.)' },

  // Tech
  { word1: 'इन्टरनेट (Internet)', word2: 'वाइफाइ (WiFi)', category: 'प्रविधि', hint: 'यसले संसारलाई जोड्छ। (Connects the world.)' },
  { word1: 'फेसबुक (Facebook)', word2: 'इन्स्टाग्राम (Instagram)', category: 'प्रविधि', hint: 'यो एउटा सामाजिक सञ्जाल हो। (A social network.)' },
  { word1: 'गुगल (Google)', word2: 'युट्युब (YouTube)', category: 'प्रविधि', hint: 'यसमा हामी जानकारी खोज्छौं। (We search for info here.)' },
  { word1: 'इमेल (Email)', word2: 'मेसेज (Message)', category: 'प्रविधि', hint: 'यसले सन्देश पठाउन मद्दत गर्छ। (Helps in sending messages.)' },
  { word1: 'ब्याट्री (Battery)', word2: 'चार्जर (Charger)', category: 'प्रविधि', hint: 'यसले शक्ति दिन्छ। (Provides power.)' },

  // Sports
  { word1: 'फुटबल (Football)', word2: 'भलिबल (Volleyball)', category: 'खेलकुद', hint: 'यो बलले खेलिने खेल हो। (A game played with a ball.)' },
  { word1: 'क्रिकेट (Cricket)', word2: 'बेसबल (Baseball)', category: 'खेलकुद', hint: 'यसमा ब्याट र बल प्रयोग हुन्छ। (Uses bat and ball.)' },
  { word1: 'चेस (Chess)', word2: 'लुडो (Ludo)', category: 'खेलकुद', hint: 'यो दिमाग लगाउने खेल हो। (A brain game.)' },
  { word1: 'पौडी (Swimming)', word2: 'दौड (Running)', category: 'खेलकुद', hint: 'यो एउटा शारीरिक व्यायाम हो। (A physical exercise.)' },
  { word1: 'ब्याडमिन्टन (Badminton)', word2: 'टेनिस (Tennis)', category: 'खेलकुद', hint: 'यसमा र्याकेट प्रयोग हुन्छ। (Uses a racket.)' },

  // Nature
  { word1: 'घाम (Sun)', word2: 'जुन (Moon)', category: 'प्रकृति', hint: 'यसले आकाशमा उज्यालो दिन्छ। (Gives light in the sky.)' },
  { word1: 'पानी (Water)', word2: 'हावा (Air)', category: 'प्रकृति', hint: 'यो जीवनको लागि अनिवार्य छ। (Essential for life.)' },
  { word1: 'आगो (Fire)', word2: 'धुवाँ (Smoke)', category: 'प्रकृति', hint: 'यो तातो र खतरनाक हुन सक्छ। (Can be hot and dangerous.)' },
  { word1: 'फूल (Flower)', word2: 'पात (Leaf)', category: 'प्रकृति', hint: 'यो बिरुवाको एउटा भाग हो। (A part of a plant.)' },
  { word1: 'ढुङ्गा (Stone)', word2: 'माटो (Soil)', category: 'प्रकृति', hint: 'यो जमिनमा पाइन्छ। (Found on the ground.)' },

  // Body Parts
  { word1: 'आँखा (Eye)', word2: 'कान (Ear)', category: 'शरीरका अंग', hint: 'यसले हेर्न वा सुन्न मद्दत गर्छ। (Helps to see or hear.)' },
  { word1: 'नाक (Nose)', word2: 'मुख (Mouth)', category: 'शरीरका अंग', hint: 'यसले सुँघ्न वा खान मद्दत गर्छ। (Helps to smell or eat.)' },
  { word1: 'हात (Hand)', word2: 'खुट्टा (Leg)', category: 'शरीरका अंग', hint: 'यसले काम गर्न वा हिँड्न मद्दत गर्छ। (Helps to work or walk.)' },
  { word1: 'टाउको (Head)', word2: 'कपाल (Hair)', category: 'शरीरका अंग', hint: 'यो शरीरको माथिल्लो भाग हो। (Upper part of the body.)' },
  { word1: 'दाँत (Tooth)', word2: 'जिब्रो (Tongue)', category: 'शरीरका अंग', hint: 'यसले चपाउन वा स्वाद लिन मद्दत गर्छ। (Helps to chew or taste.)' },

  // Vehicles
  { word1: 'बस (Bus)', word2: 'ट्रक (Truck)', category: 'सवारी साधन', hint: 'यो सडकमा गुड्ने ठूलो सवारी साधन हो। (Large road vehicle.)' },
  { word1: 'कार (Car)', word2: 'ट्याक्सी (Taxi)', category: 'सवारी साधन', hint: 'यो सानो र व्यक्तिगत सवारी साधन हो। (Small personal vehicle.)' },
  { word1: 'मोटरसाइकल (Motorbike)', word2: 'स्कुटर (Scooter)', category: 'सवारी साधन', hint: 'यो दुई पाङ्ग्रे सवारी साधन हो। (Two-wheeled vehicle.)' },
  { word1: 'साइकल (Bicycle)', word2: 'रिक्सा (Rickshaw)', category: 'सवारी साधन', hint: 'यसमा मानिसको बल प्रयोग हुन्छ। (Uses human power.)' },
  { word1: 'हवाईजहाज (Airplane)', word2: 'हेलिकप्टर (Helicopter)', category: 'सवारी साधन', hint: 'यो आकाशमा उड्छ। (Flies in the sky.)' },
  { word1: 'पानीजहाज (Ship)', word2: 'डुङ्गा (Boat)', category: 'सवारी साधन', hint: 'यो पानीमा चल्छ। (Travels on water.)' },
  { word1: 'रेल (Train)', word2: 'मेट्रो (Metro)', category: 'सवारी साधन', hint: 'यो लिकमा गुड्छ। (Runs on tracks.)' },

  // Colors
  { word1: 'रातो (Red)', word2: 'गुलाबी (Pink)', category: 'रंगहरू', hint: 'यो रगत वा फूलको रंग हो। (Color of blood or flowers.)' },
  { word1: 'नीलो (Blue)', word2: 'आकाशे (Sky Blue)', category: 'रंगहरू', hint: 'यो आकाश वा समुद्रको रंग हो। (Color of sky or sea.)' },
  { word1: 'हरियो (Green)', word2: 'पहेँलो (Yellow)', category: 'रंगहरू', hint: 'यो घाँस वा घामको रंग हो। (Color of grass or sun.)' },
  { word1: 'कालो (Black)', word2: 'खैरो (Grey)', category: 'रंगहरू', hint: 'यो रात वा बादलको रंग हो। (Color of night or clouds.)' },
  { word1: 'सेतो (White)', word2: 'क्रिम (Cream)', category: 'रंगहरू', hint: 'यो दूध वा हिउँको रंग हो। (Color of milk or snow.)' },

  // Pets
  { word1: 'खरायो (Rabbit)', word2: 'गिनी पिग (Guinea Pig)', category: 'घरपालुवा', hint: 'यो सानो र नरम रौँ भएको जनावर हो। (Small and furry animal.)' },
  { word1: 'सुगा (Parrot)', word2: 'मैना (Myna)', category: 'घरपालुवा', hint: 'यो बोल्न सक्ने चरा हो। (A bird that can talk.)' },
  { word1: 'माछा (Fish)', word2: 'कछुवा (Turtle)', category: 'घरपालुवा', hint: 'यो पानीमा बस्ने जीव हो। (Lives in water.)' },
  { word1: 'कुकुर (Dog)', word2: 'बिरालो (Cat)', category: 'घरपालुवा', hint: 'यो मानिसको मिल्ने साथी हो। (Man\'s best friend.)' },

  // Movies
  { word1: 'एक्शन (Action)', word2: 'थ्रिलर (Thriller)', category: 'चलचित्र', hint: 'यसमा धेरै लडाईं र उत्साह हुन्छ। (Lots of fighting and excitement.)' },
  { word1: 'कमेडी (Comedy)', word2: 'ड्रामा (Drama)', category: 'चलचित्र', hint: 'यसले मानिसलाई हँसाउँछ वा भावुक बनाउँछ। (Makes people laugh or emotional.)' },
  { word1: 'हरर (Horror)', word2: 'मिस्ट्री (Mystery)', category: 'चलचित्र', hint: 'यसले मानिसलाई डराउँछ। (Makes people scared.)' },
  { word1: 'एनिमेसन (Animation)', word2: 'कार्टुन (Cartoon)', category: 'चलचित्र', hint: 'यो चित्रहरूबाट बनाइन्छ। (Made from drawings.)' },

  // Kitchenware
  { word1: 'थाल (Plate)', word2: 'कचौरा (Bowl)', category: 'वस्तु', hint: 'यसमा खाना खाइन्छ। (Used for eating food.)' },
  { word1: 'चम्चा (Spoon)', word2: 'काँटा (Fork)', category: 'वस्तु', hint: 'यसले खाना खान मद्दत गर्छ। (Helps in eating food.)' },
  { word1: 'गिलास (Glass)', word2: 'कप (Cup)', category: 'वस्तु', hint: 'यसमा पानी वा चिया पिइन्छ। (Used for drinking water or tea.)' },
  { word1: 'कराई (Pan)', word2: 'कुकर (Cooker)', category: 'वस्तु', hint: 'यसमा खाना पकाइन्छ। (Used for cooking food.)' },

  // Electronics
  { word1: 'टिभी (TV)', word2: 'रेडियो (Radio)', category: 'प्रविधि', hint: 'यसबाट समाचार र मनोरञ्जन पाइन्छ। (Used for news and entertainment.)' },
  { word1: 'फ्रिज (Fridge)', word2: 'ओभन (Oven)', category: 'प्रविधि', hint: 'यसले खानालाई चिसो वा तातो राख्छ। (Keeps food cold or hot.)' },
  { word1: 'पङ्खा (Fan)', word2: 'एसी (AC)', category: 'प्रविधि', hint: 'यसले गर्मीमा राहत दिन्छ। (Provides relief in summer.)' },
  { word1: 'क्यामेरा (Camera)', word2: 'भिडियो (Video)', category: 'प्रविधि', hint: 'यसले दृश्यहरू कैद गर्छ। (Captures scenes.)' },

  // Clothing
  { word1: 'सर्ट (Shirt)', word2: 'टिसर्ट (T-shirt)', category: 'वस्तु', hint: 'यो शरीरको माथिल्लो भागमा लगाइन्छ। (Worn on the upper body.)' },
  { word1: 'पाइन्ट (Pant)', word2: 'हाफ पाइन्ट (Shorts)', category: 'वस्तु', hint: 'यो खुट्टामा लगाइन्छ। (Worn on legs.)' },
  { word1: 'टोपी (Cap)', word2: 'हेल्मेट (Helmet)', category: 'वस्तु', hint: 'यो टाउकोमा लगाइन्छ। (Worn on head.)' },
  { word1: 'मोजा (Socks)', word2: 'पञ्जा (Gloves)', category: 'वस्तु', hint: 'यो हात वा खुट्टामा लगाइन्छ। (Worn on hands or feet.)' },

  // Weather
  { word1: 'पानी (Rain)', word2: 'असिना (Hail)', category: 'प्रकृति', hint: 'यो आकाशबाट खस्छ। (Falls from the sky.)' },
  { word1: 'हिउँ (Snow)', word2: 'तुसारो (Frost)', category: 'प्रकृति', hint: 'यो धेरै चिसो हुन्छ। (It is very cold.)' },
  { word1: 'बिजुली (Lightning)', word2: 'चट्याङ (Thunder)', category: 'प्रकृति', hint: 'यो वर्षाको समयमा हुन्छ। (Happens during rain.)' },
  { word1: 'बादल (Cloud)', word2: 'कुहिरो (Fog)', category: 'प्रकृति', hint: 'यसले आकाश ढाक्छ। (Covers the sky.)' },

  // Stationery
  { word1: 'इरेजर (Eraser)', word2: 'शार्पनर (Sharpener)', category: 'वस्तु', hint: 'यो पढ्ने बेला प्रयोग हुन्छ। (Used while studying.)' },
  { word1: 'स्केल (Scale)', word2: 'कम्पास (Compass)', category: 'वस्तु', hint: 'यसले नाप्न मद्दत गर्छ। (Helps in measuring.)' },
  { word1: 'गम (Glue)', word2: 'टेप (Tape)', category: 'वस्तु', hint: 'यसले टाँस्न मद्दत गर्छ। (Helps in sticking.)' },
  
  // Emotions
  { word1: 'खुसी (Happy)', word2: 'उत्साहित (Excited)', category: 'भावना', hint: 'यो एउटा सकारात्मक भावना हो। (A positive emotion.)' },
  { word1: 'दुखी (Sad)', word2: 'निराश (Disappointed)', category: 'भावना', hint: 'यो एउटा नकारात्मक भावना हो। (A negative emotion.)' },
  { word1: 'रिसाएको (Angry)', word2: 'चिढिएको (Irritated)', category: 'भावना', hint: 'यो भावनामा मानिसको अनुहार रातो हुन सक्छ। (Face might turn red in this emotion.)' },
  { word1: 'डराएको (Scared)', word2: 'अत्तालिएको (Panicked)', category: 'भावना', hint: 'यो खतराको समयमा महसुस हुन्छ। (Felt during danger.)' },
  { word1: 'अचम्मित (Surprised)', word2: 'स्तब्ध (Shocked)', category: 'भावना', hint: 'यो नसोचेको कुरा हुँदा महसुस हुन्छ। (Felt when something unexpected happens.)' },

  // Musical Instruments
  { word1: 'मादल (Madal)', word2: 'ढोलक (Dholak)', category: 'संगीत', hint: 'यो हातले बजाउने नेपाली बाजा हो। (A Nepali instrument played with hands.)' },
  { word1: 'बाँसुरी (Flute)', word2: 'शहनाई (Shehnai)', category: 'संगीत', hint: 'यो फुकेर बजाइने बाजा हो। (A wind instrument.)' },
  { word1: 'गिटार (Guitar)', word2: 'सितार (Sitar)', category: 'संगीत', hint: 'यसमा तारहरू हुन्छन्। (It has strings.)' },
  { word1: 'पियानो (Piano)', word2: 'किबोर्ड (Keyboard)', category: 'संगीत', hint: 'यसमा काला र सेता किहरू हुन्छन्। (It has black and white keys.)' },
  { word1: 'सारङ्गी (Sarangi)', word2: 'भायोलिन (Violin)', category: 'संगीत', hint: 'यो रेटेर बजाइने बाजा हो। (A bowed instrument.)' },

  // Hobbies
  { word1: 'पढ्नु (Reading)', word2: 'लेख्नु (Writing)', category: 'रुचि', hint: 'यो ज्ञान बढाउने काम हो। (An activity to increase knowledge.)' },
  { word1: 'नाच्नु (Dancing)', word2: 'गाउनु (Singing)', category: 'रुचि', hint: 'यो एउटा कला हो। (It is an art form.)' },
  { word1: 'पकाउनु (Cooking)', word2: 'बेक गर्नु (Baking)', category: 'रुचि', hint: 'यो भान्सामा गरिने काम हो। (An activity done in the kitchen.)' },
  { word1: 'घुम्नु (Traveling)', word2: 'ट्रेकिङ (Trekking)', category: 'रुचि', hint: 'यसमा नयाँ ठाउँहरू देखिन्छ। (Involves seeing new places.)' },
  { word1: 'चित्र कोर्नु (Drawing)', word2: 'पेन्टिङ (Painting)', category: 'रुचि', hint: 'यसमा रंग र ब्रस प्रयोग हुन्छ। (Uses colors and brushes.)' },

  // School Subjects
  { word1: 'गणित (Math)', word2: 'विज्ञान (Science)', category: 'विषय', hint: 'यो स्कुलमा पढाइने विषय हो। (A subject taught in school.)' },
  { word1: 'इतिहास (History)', word2: 'भूगोल (Geography)', category: 'विषय', hint: 'यसले विगत वा संसारको बारेमा बताउँछ। (Tells about the past or the world.)' },
  { word1: 'नेपाली (Nepali)', word2: 'अंग्रेजी (English)', category: 'विषय', hint: 'यो एउटा भाषा हो। (It is a language.)' },
  { word1: 'कम्प्युटर (Computer)', word2: 'प्रविधि (Tech)', category: 'विषय', hint: 'यो आधुनिक युगको लागि महत्वपूर्ण छ। (Important for the modern era.)' },
];

export const AVATARS = [
  '🦁', '🐯', '🦊', '🐱', '🐶', '🐷', '🐨', '🐼', '🐸', '🐵', '🐔', '🐧',
  '🦄', '🐲', '🐙', '🦖', '🦉', '🦋', '🐝', '🐞', '🐢', '🐬', '🐳', '🐘',
  '🦒', '🦓', '🦘', '🦥', '🦦', '🦫', '🦬', '🦣', '🦤', '🦭', '🦈', '🐊'
];

export const PUNISHMENTS = [
  'एउटा गीत गाउनुहोस् (Sing a song)',
  '१० पटक पुस-अप गर्नुहोस् (Do 10 push-ups)',
  'आफ्नो मनपर्ने कलाकारको नक्कल गर्नुहोस् (Mimic your favorite artist)',
  'अर्को राउन्डसम्म मौन बस्नुहोस् (Stay silent until next round)',
  'सबैलाई एउटा ठट्टा सुनाउनुहोस् (Tell a joke to everyone)',
  'आफ्नो दाहिने हातले देब्रे कान समातेर ३ पटक घुम्नुहोस् (Spin 3 times holding left ear with right hand)',
  'एउटा रमाइलो डान्स गर्नुहोस् (Do a funny dance)',
  'आफ्नो बारेमा एउटा गोप्य कुरा भन्नुहोस् (Tell a secret about yourself)',
  'कुकुर जस्तै भुक्नुहोस् (Bark like a dog)',
  'बिरालो जस्तै म्याउँ-म्याउँ गर्नुहोस् (Meow like a cat)',
  'आफ्नो नाकले भुइँ छुनुहोस् (Touch the floor with your nose)',
  'एक मिनेटसम्म एक खुट्टामा उभिनुहोस् (Stand on one leg for a minute)'
];

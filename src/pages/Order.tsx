import React, { useState, useEffect } from 'react';
import { ArrowLeft, Minus, Plus, Trash2, CreditCard, Truck, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const communesByWilaya: { [key: string]: string[] } = {
  "Adrar": ["Adrar", "Akabli", "Aougrout", "Bouda", "Deldoul", "Fenoughil", "In Zghmir", "Ksar Kaddour", "Metarfa", "Ouled Ahmed Timmi", "Ouled Aissa", "Ouled Said", "Reggane", "Sali", "Sebaa", "Shahed Ahmaad", "Tamantit", "Tamest", "Tamentit", "Tsabit", "Zaouiet Kounta", "Temrantit", "Bordj Badji Mokhtar", "Timiaouine", "Tit"],
  "Chlef": ["Abou El Hassan", "Ain Merane", "Benaiche", "Beni Haoua", "Beni Rached", "Boukadir", "Bouzghaïa", "Breira", "Chettia", "Chlef", "Dahra", "El Karimia", "El Marsa", "Harenfa", "Heuliah", "Labiod Medjadja", "Maoued", "Moussadek", "Oued Fodda", "Oued Goussine", "Oued Sly", "Ouled Abbas", "Ouled Ben Abdelkader", "Ouled Fares", "Oum Drou", "Sendjas", "Sidi Abderrahmane", "Sidi Akkacha", "Sobha", "Tadjena", "Taougrit", "Tenes", "Zeboudja", "Zeddine", "Zliten"],
  "Laghouat": ["Aflou", "Ain Madhi", "Ain Sidi Ali", "Benacer Benchohra", "Brida", "El Assafia", "El Ghicha", "El Houaita", "Gueltat Sidi Saad", "Hadj Mechri", "Hassi Delaa", "Hassi R'Mel", "Kheneg", "Ksar El Hirane", "Laghouat", "Oued Morra", "Oued Mzi", "Sebgag", "Sedi Makhlouf", "Suktani", "Taguine", "Tahenout", "Tadjemout", "Tadjrouna"],
  "Oum El Bouaghi": ["Ain Babouche", "Ain Beida", "Ain Diss", "Ain Fakroun", "Ain Kercha", "Ain M'Lila", "Ain Zitoun", "Behir Chergui", "Berriche", "Bir Chouhada", "Canastel", "Dhalaa", "El Amiria", "El Belkhi", "El Djazia", "El Fedjoudj", "El Harmilia", "Fkirina", "Hanchir Toumghani", "Ksar Sbahi", "Meskiana", "Oued Nini", "Oum El Bouaghi", "Ouled Hamla", "Ouled Zouai", "Rahbat", "Sigus", "Souk Naamane", "Zorg"],
  "Batna": ["Ain Djasser", "Ain Touta", "Ain Yagout", "Alichat", "Arris", "Azil Abbed", "Barika", "Batna", "Beni Souik", "Biban", "Bitam", "Boumagueur", "Boumia", "Bouzina", "Chelia", "Chemora", "Djerma", "Djezzar", "El Hassi", "El Madher", "Fesdis", "Foum Toub", "Ghassira", "Gosbat", "Guigba", "Hidoussa", "Ichmoul", "Inoughissen", "Kimmel", "Ksar Belezma", "Lazrou", "Larbaa", "Lemsane", "M'doukal", "Maafa", "Menaa", "Merouana", "N'Gaous", "Oued Chaaba", "Oued El Ma", "Oued Taga", "Ouled Aouf", "Ouled Fadel", "Ouled Sellam", "Ouled Si Slimane", "Ouyoun El Assafir", "Rahbat", "Ras El Aioun", "Sefiane", "Seggana", "Seriana", "T'Kout", "Tazoult", "Teniet El Abed", "Tighanimine", "Tigharghar", "Timgad", "Tilatou", "Zanat El Beida", "Zana", "Bouhagal"],
  "Béjaïa": ["Adekar", "Ait Tizi", "Ait-Rzine", "Akbou", "Akfadou", "Amalou", "Amizour", "Aokas", "Barbacha", "Bejaia", "Beni Djellil", "Beni K'sila", "Beni Mallikeche", "Beni Melikeche", "Beniaziz", "Boudjellil", "Bouhamza", "Boukhelifa", "Bouzeguene", "Chemini", "Darguina", "Djeraba", "Draa-El-Caid", "El Kseur", "Feraoun", "Ighil Ali", "Ighram", "Kendira", "Kherrata", "Leflaye", "Melbou", "Oued Ghir", "Ouzellaguen", "Seddouk", "Sidi Aich", "Sidi-Ayad", "Souk El Tenine", "Souk-Oufella", "Tamokra", "Tamridjet", "Taourirt Ighil", "Taskriout", "Tassift", "Tichy", "Tifra", "Timezrit", "Tinebdar", "Tizi-N'Berber", "Toudja", "Semaoun", "Ait Smail"],
  "Biskra": ["Ain Naga", "Ain Zaatout", "Biskra", "Branis", "Chetma", "Djemorah", "El Feidh", "El Ghrous", "El Hadjeb", "El Haouch", "El Kantara", "El Outaya", "Foughala", "Khenguet Sidi Nadji", "Lichana", "Lioua", "M'Chounech", "M'Lili", "Mechouneche", "Mixta", "Mziraa", "Oued El Abtal", "Ouled Djellal", "Ouled Khdeir", "Ourelal", "Ras El Miad", "Sidi Khaled", "Sidi Okba", "Thouda", "Tolga", "Umm Ali", "Zeribet El Oued", "Ech Chaiba"],
  "Béchar": ["Abadla", "Beni Abbes", "Beni Ikhlef", "Beni Ounif", "Bechar", "Boukais", "Erg Ferradj", "Igli", "Kerzaz", "Kenadsa", "Lahmar", "Machraa Houari Boumediene", "Meridja", "Mogheul", "Ouled Khdeir", "Tabelbala", "Taghit", "Tamtert", "Timoudi", "Beni Ouenif", "Ksabi"],
  "Blida": ["Ain Romana", "Beni Mered", "Ben Khelil", "Blida", "Bouarfa", "Bougara", "Bouinan", "Chebli", "Chiffa", "Chrea", "El Affroun", "Guerrouaou", "Hammam Elouane", "Larbaa", "Meftah", "Mouzaia", "Oued Alleug", "Oued Djer", "Ouled Selama", "Ouled Yaich", "Souhane", "Souma", "Soumaa", "Boufarik", "Ouarizane"],
  "Bouira": ["Aghbalou", "Ain Bessem", "Ain El Hadjar", "Ain Turk", "Ait Laziz", "Aomar", "Bechloul", "Beni Amrane", "Bordj Okhriss", "Bouira", "Boukram", "Chorfa", "Dechmia", "Dirah", "Djebahia", "El Adjiba", "El Asnam", "El Hachimia", "El Hakimia", "El Khabouzia", "El Mokrani", "Guerrouma", "Hadjera Zerga", "Haizer", "Kadiria", "Lakhdaria", "M'Chedallah", "Maala", "Mamora", "Mesdour", "Oued El Berdi", "Ouled Rached", "Raouraoua", "Ridane", "Saharidj", "Souk El Khemis", "Sour El Ghouzlane", "Taguedit", "Taghzout", "Tassamert", "Theniet En Nasr", "Zbarbar", "Ain Laloui", "Ouamri", "Hadjout"],
  "Tamanrasset": ["Tamanrasset", "Abalessa", "Ain Amguel", "Ain Guezzam", "Ain Salah", "Foggaret Ezzoua", "Idles", "Silet", "Tazhout", "Tin Zaouatine"],
  "Tébessa": ["Ain Zerga", "Bedjene", "Bekaria", "Bir El Ater", "Bir Mokkadem", "Boukhadra", "Boulhaf Dir", "Cheria", "El Aouinet", "El Houidjbet", "El Kouif", "El Ma El Abiod", "El Mezeraa", "Ferkane", "Guorriguer", "Hammamamet", "Morsott", "Negrine", "Oum Ali", "Ouenza", "Safsaf El Ouesra", "Stah Guentis", "Tebessa", "Telajane", "Thlidjene", "Youkous", "Ogla Melha", "Bir Dheheb"],
  "Tlemcen": ["Ain Fezza", "Ain Ghoraba", "Ain Nehala", "Ain Tallout", "Ain Youcef", "Amieur", "Artigue", "Azails", "Bab El Assa", "Beni Bahdel", "Beni Boussaid", "Beni Khellad", "Beni Mester", "Beni Ouarsous", "Beni Semiel", "Beni Snous", "Bouhlou", "Bouihi", "Chetouane", "Dar Yaghmouracene", "Djebala", "El Aricha", "El Bouihi", "El Fehoul", "El Gore", "Fellaoucene", "Ghazaouet", "Hammam Boughrara", "Hennaya", "Honaine", "Honaïne", "Lalla Setti", "Maghnia", "Mansourah", "Marsa Ben M'Hidi", "Nedroma", "Oued Lakhdar", "Ouled Mimoun", "Ouled Riyah", "Remchi", "Sabra", "Sebdou", "Sebbaa Chioukh", "Sidi Abdelli", "Sidi Djillali", "Sidi Medjahed", "Souani", "Souahlia", "Tianet", "Tlemcen", "Terny Beni Hediel", "Zenata", "Sidi Senoussi"],
  "Tiaret": ["Ain Bouchekif", "Ain Deheb", "Ain El Hadid", "Ain Kermes", "Amiara", "Bougara", "Chehaima", "Dahmouni", "Djebilet Rosfa", "Faidja", "Frenda", "Guertoufa", "Hamadia", "Ksar Chellala", "Madna", "Mahdia", "Medrissa", "Meghila", "Mellakou", "Nadorah", "Oued Lilli", "Rechaiga", "Sebaine", "Sebt", "Serghine", "Si Abdelghani", "Sidi Ali Mellal", "Sidi Bakhti", "Sidi Hosni", "Sougueur", "Tagdemt", "Takhemaret", "Tiaret", "Tidda", "Tousnina", "Zmalet El Emir Abdelkader", "Rahouia", "Wattar", "Medroussa", "Ain Zarit", "Sidi Abderrahmane", "Bougara"],
  "Tizi Ouzou": ["Abderrahmane Mira", "Abi Youssef", "Aghribs", "Ain El Hammam", "Ain Zaouia", "Ait Aggouacha", "Ait Aissa Mimoun", "Ait Boumahdi", "Ait Bouali", "Ait Chafaa", "Ait Khellili", "Ait Mahmoud", "Ait Ouacif", "Ait Oumalou", "Ait Toudert", "Ait Yahia", "Ait Yahia Moussa", "Akbil", "Akerrou", "Alma", "Assi Youcef", "Azazga", "Azeffoun", "Baghlia", "Beni Aissi", "Beni Douala", "Beni Yenni", "Beni Zmenzer", "Bouzeguene", "Boghni", "Boudjima", "Bounouh", "Bouzeguene", "Chorfa", "Draa Ben Khedda", "Draa El Mizan", "Freha", "Frikat", "Iferhounene", "Ifigha", "Iflissen", "Illilten", "Illoula Oumalou", "Irdjen", "Larbaa Nath Irathen", "Larbaatache", "Maatkas", "Makouda", "Mechtras", "Mekla", "Mizrana", "M'Kira", "Ouacif", "Ouadhias", "Ouaguenoun", "Oued Aissi", "Souama", "Souk El Thenin", "Tadmait", "Taguemount Azouz", "Tigzirt", "Timizart", "Tirmitine", "Tizi Gheniff", "Tizi Ouzou", "Tizi Rached", "Yatafen", "Yakourene", "Zekri"],
  "Alger": ["Ain Benian", "Ain Taya", "Alger Centre", "Bab El Oued", "Bab Ezzouar", "Bachdjerrah", "Bains Romains", "Baraki", "Ben Aknoun", "Beni Messous", "Bir Mourad Rais", "Bir Touta", "Birmandreis", "Bologhine", "Bordj El Bahri", "Bordj El Kiffan", "Bourouba", "Bouzareah", "Casbah", "Cheraga", "Dar El Beida", "Dely Ibrahim", "Djasr Kasentina", "Douera", "Draria", "El Achour", "El Biar", "El Harrach", "El Madania", "El Magharia", "El Marsa", "El Mouradia", "Eucalyptus", "Gue de Constantine", "Hammamet", "Herraoua", "Hussein Dey", "Hydra", "Kouba", "Les Eucalyptus", "Mahelma", "Mohamed Belouizdad", "Mohammadia", "Oued Koriche", "Oued Smar", "Ouled Chebel", "Ouled Fayet", "Rahmania", "Rais Hamidou", "Reghaia", "Rouiba", "Saoula", "Sebala", "Sidi M'Hamed", "Sidi Moussa", "Souidania", "Zeralda"],
  "Djelfa": ["Ain Chouhada", "Ain El Ibel", "Ain Maabed", "Ain Oussera", "Amoura", "Benhar", "Birine", "Bouira Lahdab", "Charef", "Dar Chioukh", "Djelfa", "Douis", "El Guedid", "El Idrissia", "El Khemis", "Faidh El Botma", "Guernini", "Guettara", "Had Sahary", "Hassi Bahbah", "Hassi El Euch", "Hassi Fedoul", "Messaad", "Mliliha", "Moudjbara", "Oum Laadham", "Sed Rahal", "Selmana", "Sidi Baizid", "Sidi Ladjel", "Tadmit", "Zaafrane", "Zaccar", "Ain Oussara", "Deldoul"],
  "Jijel": ["Bordj Thar", "Bouraoui Belhadef", "Chekfa", "Djemaa Beni Habibi", "Djimla", "El Ancer", "El Aouana", "El Kennar Nouchfi", "El Milia", "Emir Abdelkader", "Erraguene", "Ghebala", "Jijel", "Kaous", "Khiri Oued Adjoul", "Oudjana", "Oum Toub", "Ouled Askeur", "Ouled Rabah", "Selma Benziada", "Settara", "Sidi Abdelaziz", "Sidi Marouf", "Tahir", "Tassoust", "Texenna", "Ziama Mansouriah", "Bordj Tizeghart"],
  "Sétif": ["Ait Naoual Mezada", "Ait Tizi", "Amoucha", "Babor", "Bazer Sakhra", "Beidha Bordj", "Bellaa", "Beni Aziz", "Beni Chebana", "Beni Fouda", "Beni Hocine", "Beni Ourtilane", "Bir El Arch", "Bir Haddada", "Bouandas", "Boudouaou El Bahri", "Boutaleb", "Dehamcha", "Djemila", "Draa Kebila", "El Eulma", "El Ouricia", "Guellal", "Guelta Zerka", "Guidjel", "Hamam Guergour", "Hammam Soukhna", "Harbil", "Hamma", "Kasr El Abtal", "Ksar Sbahi", "Maouaklane", "Maoklane", "Mezloug", "Oued El Bared", "Ouled Addouane", "Ouled Si Ahmed", "Ouled Sabor", "Ouled Tebben", "Rasfa", "Rosfa", "Salah Bey", "Setif", "Serdj El Ghoul", "Tachouda", "Tala Ifacene", "Tamentet", "Taoura", "Tella", "Tizi N'Bechar", "Ain Abessa", "Ain Arnat", "Ain Azal", "Ain Kebira", "Ain Lahdjar", "Ain Legradj", "Ain Oulmene", "Ain Roua", "Ain Sebt", "Beni Mouhli"],
  "Saïda": ["Ain El Hadjar", "Doui Thabet", "El Hassasna", "Hounet", "Maamora", "Moulay Larbi", "Ouled Brahim", "Ouled Khaled", "Saida", "Sidi Ahmed", "Sidi Amar", "Sidi Boubekeur", "Tircine", "Youb", "Ain Soltane", "El Gaada"],
  "Skikda": ["Ainb Bouziane", "Ain Charchar", "Ain Kechra", "Azzaba", "Bekkouche Lakhdar", "Benazouz", "Bin El Ouiden", "Bouchtata", "Collo", "Djendel Saadi Mohamed", "El Arrouch", "El Hadaiek", "El Harrouch", "Emjez Edchich", "Es Sebt", "Filfila", "Hamadi Krouma", "Kanoua", "Kerkara", "Kheznaara", "Messaoudine", "Oued Zhour", "Ouldja Boulbalout", "Oum Toub", "Ouled Attia", "Ouled Hebaba", "Ramdane Djamel", "Salah Bouchaour", "Sidi Mezghiche", "Skikda", "Tamalous", "Zerdazas", "Zitouna", "Ain Zouit", "Ben Azzouz", "Khenag Mayoum", "Cheraia", "Bouchetata"],
  "Sidi Bel Abbès": ["Ain Adden", "Ain El Berd", "Ain Kada", "Ain Tindamine", "Ain Trid", "Amarnas", "Badredine El Mokrani", "Belarbi", "Ben Badis", "Benachiba Chelia", "Biridi", "Boukhanefis", "Boumediene", "Chetouane Belaila", "Dhaya", "El Hacaiba", "Hassi Dahou", "Hassi Zahana", "Lamtar", "Makedra", "Marhoum", "Merine", "Mezaourou", "Mostefa Ben Brahim", "Moulay Slissen", "Oued Sebaa", "Oued Sefioun", "Ouled Brahim", "Ras El Ma", "Redjem Demouche", "Sehala Thaoura", "Sfisef", "Sidi Ali Boussidi", "Sidi Ali Benyoub", "Sidi Bel Abbes", "Sidi Brahim", "Sidi Chaib", "Sidi Dahou Zairs", "Sidi Hamadouche", "Sidi Khaled", "Sidi Lahcene", "Sidi Louarak", "Sidi Yacoub", "Slissen", "Tabia", "Tablat", "Teghalimet", "Telagh", "Tenira", "Tessala", "Tilmouni", "Zerouala"],
  "Annaba": ["Ain Berda", "Annaba", "Berrahel", "Cheurfa", "Chetaibi", "El Bouni", "El Hadjar", "Oued El Aneb", "Seraidi", "Sidi Amar", "Treat", "El Eulma"],
  "Guelma": ["Ain Ben Beida", "Ain Hessainia", "Ain Larbi", "Ain Makhlouf", "Ain Nechma", "Ain Regada", "Ain Sandel", "Bendaoud", "Beni Mezline", "Bouchegouf", "Bouati Mahmoud", "Bouhamdane", "Dahouara", "Djeballah Khemissi", "El Fedjoudj", "Guelaat Bou Sbaa", "Guelma", "Hammam Debagh", "Hammam N'Bail", "Heliopolis", "Houari Boumedien", "Khezaras", "Medjez Amar", "Medjez Sfa", "Nechmaya", "Oued Cheham", "Oued Fragha", "Oued Zenati", "Ras El Agba", "Roknia", "Sellaoua Announa", "Tamlouka", "Zerizer", "Oued Ferragha"],
  "Constantine": ["Ain Abid", "Ain Smara", "Ben Badis", "Constantine", "Didouche Mourad", "El Khroub", "Hamma Bouziane", "Ibn Ziad", "Messaoud Boudjemaa", "Ouled Rahmoune", "Zighoud Youcef", "Beni Hamiden"],
  "Médéa": ["Achaacha", "Ain Boucif", "Ain Ouksir", "Aziz", "Baata", "Belacel", "Ben Chicao", "Beni Slimane", "Berrouaghia", "Bir Ben Laabed", "Boghar", "Boughezoul", "Bouaiche", "Bouaichoune", "Bouchrahil", "Boufarik", "Boufatis", "Chabet El Ameur", "Chellalet El Adhaoura", "Derrag", "Deux Bassins", "Djouab", "Draa Esmar", "El Azizia", "El Guelbelkebir", "El Hamdania", "El Omaria", "Guelb El Kebir", "Hannacha", "Kef Lakhdar", "Khams Djouamaa", "Ksar Boukhari", "Laazibs", "Maghraoua", "Medjebar", "Medea", "Mezerana", "Mihoub", "Moudjbar", "Mouzaia", "Oued Harbil", "Ouled Antar", "Ouled Bouachra", "Ouled Brahim", "Ouled Deide", "Ouled Hellal", "Ouled Maaref", "Oum El Djellil", "Ouzera", "Rebaia", "Reibla", "Saneg", "Sedraia", "Si Mahdjoub", "Sidi Demed", "Sidi Naamane", "Sidi Rabie", "Sidi Zahar", "Sidi Ziane", "Souagui", "Tablat", "Tamesguida", "Tizi Mahdi", "Zoubiria"],
  "Mostaganem": ["Abdelmalek Ramdane", "Achaacha", "Ain Boudinar", "Ain Nouissy", "Ain Sidi Cherif", "Ain Tedles", "Belaabes Bensafia", "Benabdelmalek Bensahla", "Bouguirat", "Fornaka", "Hadjaj", "Hassi Mameche", "Khadra", "Kheir Eddine", "Mansourah", "Mazagran", "Mesra", "Mostaganem", "Nekmaria", "Oued El Kheir", "Ouled Boughalem", "Ouled Maalah", "Safsaf", "Sayada", "Sidi Ali", "Sidi Belattar", "Sidi Lakhdar", "Sirat", "Souaflia", "Sour", "Stidia", "Touahria"],
  "M'Sila": ["Ain El Hadjel", "Ain El Melh", "Ain Errich", "Ain Fares", "Ain Khadra", "Benzouh", "Berrouaghia", "Bir Foda", "Bou Saada", "Bouti Sayeh", "Chellal", "Dehahna", "Djebel Messaad", "El Hamel", "El Houmed", "Hammam Dalaa", "Khettouti Sed Eldjir", "Khoubana", "M'Cif", "M'Sila", "M'Tarfa", "Maadid", "Magra", "Medjedel", "Menaa", "Mohamed Boudiaf", "Ouanougha", "Ouled Addi Guebala", "Ouled Derradj", "Ouled Madhi", "Ouled Mansour", "Ouled Sidi Brahim", "Ouled Slimane", "Oultem", "Sidi Aissa", "Sidi Ameur", "Sidi Hadjeres", "Sidi M'Hamed", "Slim", "Souamaa", "Tarmount", "Zarzour", "Bir Foda", "Hammam Dalaa", "Ouled Derradj", "Slim", "Zarzour"],
  "Mascara": ["Ain Ferah", "Ain Fekan", "Ain Frass", "Alaimia", "Aouf", "Benian", "Bou Henni", "Bouhanifia", "Chorfa", "El Bordj", "El Gaada", "El Ghomri", "El Gueitena", "El Hachem", "El Keurt", "El Mamounia", "El Menaouer", "Ferraguig", "Froha", "Gharrous", "Ghriss", "Guerdjoum", "Hacine", "Khalouia", "Makdha", "Mamounia", "Mascara", "Matemore", "Maoussa", "Mohammadia", "Nesmoth", "Oggaz", "Oued El Abtal", "Oued Taria", "Ras Ain Amirouche", "Sedjerara", "Sehailia", "Sidi Abdeldjebar", "Sidi Abdelmoumen", "Sidi Boussaid", "Sidi Kada", "Sig", "Tighennif", "Tizi", "Zahana", "El Bordj", "Sed Amed"],
  "Ouargla": ["Ain Beida", "El Hadjira", "El Borma", "Hassi Messaoud", "N'Goussa", "Ouargla", "Rouissat", "Sidi Khouiled", "Sidi Slimane", "Temacine", "Touggourt", "El Alia", "Zaouia El Abidia", "Ain Beida", "El Borma", "El Hadjira", "Hassi Messaoud", "Megarine", "N'Goussa", "Ouargla", "Rouissat"],
  "Oran": ["Ain Bya", "Ain Kerma", "Ain Turk", "Arzew", "Bethioua", "Bir El Djir", "Boufatis", "Bouirat", "Bousfer", "Boutlelis", "Canastel", "Es Senia", "Gdyel", "Hassi Ben Okba", "Hassi Bounif", "Marsat El Hadjadj", "Mers El Kebir", "Messerghin", "Oran", "Oued Tlelat", "Sidi Ben Yebka", "Sidi Chami", "Tafraoui", "Hadjret Ennous", "El Braya", "El Karma"],
  "El Bayadh": ["Ain Adis", "Ain Orak", "Bougtoub", "Boussemghoun", "Brezina", "Cheguig", "Chellala", "El Abiodh Sidi Cheikh", "El Bayadh", "El Bnoud", "El Kheither", "Ghassoul", "Kef El Ahmar", "Labiodh Sidi Cheikh", "Mehara", "Rogassa", "Sidi Amar", "Sidi Slimane", "Sidi Taiffour", "Stitten", "Tousmouline", "Arbaouat"],
  "Illizi": ["Bordj Omar Driss", "Debdeb", "Illizi", "In Amenas", "Ihrir", "Djanet", "Bordj El Haoues", "Tindjaz", "Tassit", "Ohanet"],
  "Bordj Bou Arréridj": ["Ain Taghrout", "Ain Tesra", "Belimour", "Ben Daoud", "Bir Kasdali", "Bordj Bou Arreridj", "Bordj Ghedir", "Bordj Zemoura", "Colla", "Djaafra", "El Achir", "El Anseur", "El Euch", "El Hamadia", "El M'Hir", "Ghilassa", "Hasnaoua", "Haraza", "Khelil", "Mansoura", "Medjana", "Ouled Brahem", "Ouled Dahmane", "Ouled Sidi Brahim", "Rabta", "Ras El Oued", "Sidi Embarek", "Taglait", "Tassamert", "Teniet En Nasr", "Tefreg", "Tixter", "Zemmoura", "El Achir"],
  "Boumerdès": ["Afir", "Ain Taya", "Beni Amrane", "Boumerdes", "Bordj Menaiel", "Boudouaou", "Bouzegza Keddara", "Chabet El Ameur", "Corso", "Dellys", "Djinet", "Hammedi", "Isser", "Khemis El Khechna", "Larbatache", "Legata", "Naciria", "Ouled Aissa", "Ouled Moussa", "Sidi Daoud", "Si Mustapha", "Souk El Had", "Tadmait", "Taourga", "Theniet En Nasr", "Tidjelabine", "Timizart", "Ouled Heddadj", "Zemmouri", "Chabet El Ameur", "Baghlia", "Beni Amrane"],
  "El Tarf": ["Ain Assel", "Ain El Karma", "Ain Kermès", "Besbes", "Bougous", "Bouhadjar", "Bouteldja", "Chatt", "Cheffia", "Dréan", "Echatt", "El Aioun", "El Kala", "El Tarf", "Hammam Beni Salah", "Lac des Oiseaux", "Oued Zitoun", "Raml Souk", "Souarekh", "Zerizer", "Chebaita Mokhtar", "Ain Karma", "Zitouna", "Cheffia"],
  "Tindouf": ["Tindouf", "Oum El Assel"],
  "Tissemsilt": ["Ain Bouchekif", "Ain Kermes", "Ammari", "Beni Chaib", "Beni Lahcen", "Bordj Bounaama", "Bordj El Emir Abdelkader", "Khemisti", "Laayoune", "Larbaa", "Layoune", "Lardjem", "Maacem", "Melaab", "Ouled Bessam", "Sidi Abed", "Sidi Boutouchent", "Sidi Lantri", "Sidi Slimane", "Theniet El Had", "Tissemsilt", "Youssoufia"],
  "El Oued": ["Bayadha", "Debila", "Douar El Ma", "El Oued", "Guemar", "Hassi Khalifa", "Jamaa", "Kouinine", "Magrane", "Mih Ouansa", "Nakhla", "Oued El Alenda", "Ourmas", "Robbah", "Reguiba", "Sidi Aoun", "Still", "Taghzout", "Taleb Larbi", "Trifaoui", "Hassani Abdelkrim", "Terdjemine", "Taleb Larbi", "Sidi Aoun", "Ourmas", "Nakhla", "Mih Ouansa", "Hassani Abdelkrim", "Hassi Khalifa", "Bayadha"],
  "Khenchela": ["Ain Touila", "Baghai", "Babar", "Bouhmama", "Chelia", "Cherchar", "Djellal", "El Hamma", "El Mahmal", "El Oueldja", "Ensigha", "Kais", "Khenchela", "Khirane", "M'Sara", "M'Toussa", "Ouled Rechache", "Remila", "Tamza", "Taouzianat", "Yabous"],
  "Souk Ahras": ["Ain Soltane", "Ain Zana", "Bir Bouhouche", "Drea", "Haddada", "Hanencha", "Heddada", "Khedara", "Machroha", "Mdaourouch", "Merahna", "Ouenza", "Oued Keberit", "Oum El Adhaim", "Ouled Driss", "Ouled Moumen", "Ragouba", "Safel El Ouiden", "Sedrata", "Sidi Fredj", "Souk Ahras", "Taoura", "Terraguelt", "Zaarouria", "Zouabi", "Mechroha"],
  "Tipaza": ["Ain Tagourait", "Attatba", "Beni Milleuk", "Bou Haroun", "Bou Ismail", "Bourkika", "Chaiba", "Cherchel", "Damous", "Douaouda", "Fouka", "Gouraya", "Hadjeret Ennous", "Hadjout", "Khemisti", "Kolea", "Larhat", "Menaceur", "Messelmoun", "Meurad", "Nador", "Saguia", "Sidi Amar", "Sidi Ghiles", "Sidi Rached", "Tipaza", "Zeralda", "Meurad"],
  "Mila": ["Ahmed Rachedi", "Ain Beida Harriche", "Ain Mellouk", "Ain Tine", "Benyahia Abderrahmane", "Bouhatem", "Chelghoum Laid", "Chigara", "Derrahi Bousselah", "El Ayadi Barbes", "Ferdjioua", "Grarem Gouga", "Hamala", "Mila", "Minar Zarza", "Oued Athmenia", "Oued Endja", "Oued Seguen", "Ouled Khlouf", "Rouached", "Sidi Khelifa", "Sidi Merouane", "Tadjenanet", "Tassadane Haddada", "Tassala Lemtai", "Teleghma", "Terrai Bainen", "Tiberguent", "Yahia Beniguecha", "Zeghaia", "Chelghoum Laid", "Tessala Lemtai"],
  "Aïn Defla": ["Ain Benian", "Ain Bouyahia", "Ain Defla", "Ain Lechiakh", "Ain Soltane", "Ain Torki", "Arib", "Barbouche", "Bathia", "Belaas", "Ben Allah", "Bir Ould Khelifa", "Bordj Emir Khaled", "Boumedfaa", "Bourached", "Djelida", "Djemaa Ouled Cheikh", "Djendel", "El Abadia", "El Amra", "El Attaf", "El Karimia", "El Maain", "Hammam Righa", "Hassania", "Hoceinia", "Khemis Miliana", "Mekhatria", "Miliana", "Oued Chorfa", "Oued Djemaa", "Rouina", "Sidi Lakhdar", "Tarik Ibn Ziad", "Tiberkanine", "Zeddine"],
  "Naâma": ["Ain Ben Khelil", "Ain Sefra", "Asla", "Djenine Bourezg", "Kasdir", "Makman Ben Amer", "Mecheria", "Moghrar", "Naama", "Sfissifa", "Tiout", "Djenien Bourezg"],
  "Aïn Témouchent": ["Aghlal", "Ain El Arbaa", "Ain Kihal", "Ain Temouchent", "Ain Tolba", "Aoubellil", "Beni Saf", "Boudjebaa El Bordj", "Bouzedjar", "Chaabet El Ham", "Chentouf", "El Amria", "El Malah", "El Messaid", "Emir Abdelkader", "Hammam Bouhadjar", "Hassi El Ghella", "Oued Berkeche", "Oued Sebbah", "Ouled Boudjemaa", "Ouled Kihal", "Oulhaca El Gheraba", "Sidi Ben Adda", "Sidi Boumediene", "Sidi Safi", "Tamzoura", "Terga", "Hassasna"],
  "Ghardaïa": ["Berriane", "Bounoura", "Dhayet Ben Dhahoua", "El Atteuf", "El Guerrara", "Ghardaia", "Hassi Fehal", "Hassi Lefhal", "Mansoura", "Metlili", "Sebseb", "Zelfana", "El Meniaa"],
  "Relizane": ["Ain Rahma", "Ain Tarek", "Ammi Moussa", "Belassel Bouzagza", "Bendaoud", "Beni Dergoun", "Beni Zentis", "Dar Ben Abdelah", "Djidiouia", "El Guettar", "El H'Madna", "El Hassi", "El Matmar", "El Ouldja", "El Hamadna", "Hamri", "Harchoune", "Jdiouia", "Kalaa", "Lahlef", "Maacem", "Maacem", "Mediouna", "Mendes", "Ouarizane", "Ouled Aissa", "Ouled Sidi Mihoub", "Oued Essalem", "Oued Rhiou", "Ramka", "Relizane", "Sidi Khettab", "Sidi Lazreg", "Sidi M'Hamed Ben Ali", "Sidi Saada", "Souk El Haad", "Yellel", "Zemmoura"],
  "Timimoun": ["Aougrout", "Charouine", "Deldoul", "Ksar Kaddour", "Metarfa", "Ouled Aissa", "Ouled Said", "Talomine", "Timimoun", "Tinerkouk"],
  "Bordj Badji Mokhtar": ["Bordj Badji Mokhtar", "Ouled Khodeir", "Timiaouine", "Timokten", "Timadanine", "Tit", "Hassi Khelifa", "Erg Ferradj", "Talmine"],
  "Ouled Djellal": ["Ain Maâbed", "Charef", "Doucen", "El Khemis", "Hassi Bahbah", "Messaâd", "Ouled Djellal", "Sidi Baizid", "Zaafrane", "Ain Chouhada", "Hassi Fedoul", "Selmana"],
  "Béni Abbès": ["Beni Abbes", "Ouled Khoudir", "Tamtert", "Timoudi", "El Ouata", "Kerzaz", "Ksabi", "Lahmar", "Tabelbala", "Igli", "Beni Ikhlef", "Beni Ounif"],
  "In Salah": ["Ain Amguel", "Ain Guezzam", "Foggaret Ezzoua", "In Salah", "Tamanrasset", "Tin Zaouatine", "Idles"],
  "In Guezzam": ["In Guezzam", "Tin Zaouatine", "Bordj Badji Mokhtar", "Timiaouine"],
  "Touggourt": ["Ain El Beida", "Blidet Amor", "El Alia", "El Hadjira", "Meghaier", "Nezla", "Sidi Slimane", "Tebesbest", "Temacine", "Touggourt", "Zaouiet El Abidia", "Taibet"],
  "Djanet": ["Djanet", "Bordj El Haoues"],
  "El M'Ghair": ["Djamaa", "El M'Ghair", "Sidi Amrane", "Sidi Khellil", "Still", "Umm Touyour"],
  "El Meniaa": ["El Meniaa"]
};

const Order = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    wilaya: '',
    communes: '',
    phone: '',
    address: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 650; // Coût de livraison fixe
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    alert('Order placed successfully!');
  };

  const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomerInfo({
      ...customerInfo,
      wilaya: e.target.value,
      communes: '' // Reset communes when wilaya changes
    });
  };

  const handleCommuneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomerInfo({
      ...customerInfo,
      communes: e.target.value
    });
  };

  const availableCommunes = customerInfo.wilaya ? communesByWilaya[customerInfo.wilaya] || [] : [];

  return <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 mb-4">
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </button>
            <h1 className="text-3xl font-bold text-white">تاكيد الطلبية</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cart Items */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">معطيات الطلبية</h2>
                <div className="space-y-4">
                  {cartItems.map(item => <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-700 last:border-b-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-emerald-400 font-semibold">{item.price} د.ج</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-white">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-white">
                          <Plus className="h-4 w-4" />
                        </button>
                        <button onClick={() => removeFromCart(item.id)} className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>)}
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">معلومات التوصيل</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">الاسم واللقب</label>
                      <input type="text" required value={customerInfo.firstName} onChange={e => setCustomerInfo({
                      ...customerInfo,
                      firstName: e.target.value
                    })} className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2"> رقم الهاتف</label>
                      <input type="tel" value={customerInfo.phone} onChange={e => setCustomerInfo({
                        ...customerInfo,
                        phone: e.target.value
                      })} className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">الولاية</label>
                      <select required value={customerInfo.wilaya} onChange={handleWilayaChange} className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-700 text-white">
                        <option value="">اختر الولاية</option>
                        {Object.keys(communesByWilaya).map(wilaya => (
                          <option key={wilaya} value={wilaya}>{wilaya}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">البلدية</label>
                      <select required value={customerInfo.communes} onChange={handleCommuneChange} disabled={!customerInfo.wilaya} className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-700 text-white">
                        <option value="">اختر البلدية </option>
                        {availableCommunes.map(commune => (
                          <option key={commune} value={commune}>{commune}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">العنوان</label>
                      <input type="text" value={customerInfo.address} onChange={e => setCustomerInfo({
                        ...customerInfo,
                        address: e.target.value
                      })} className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400" />
                    </div>
                </form>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-6">مجموع الطلبية</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">سعر المنتج</span>
                    <span className="font-semibold text-white">{subtotal.toFixed(2)} د.ج</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">التوصيل</span>
                    <span className="font-semibold text-white">{shipping.toFixed(2)} د.ج</span>
                  </div>
                 
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-white">المجموع</span>
                      <span className="text-lg font-bold text-emerald-400">{total.toFixed(2)} د.ج</span>
                    </div>
                  </div>
                </div>

                <button onClick={handleSubmit} className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl">
                تقديم طلب
                </button>

                {/* Trust Badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <span>الدفع عند الاستلام</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <Truck className="h-5 w-5 text-emerald-400" />
                    <span>التوصيل مجاني للولايات المجاورة</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <CreditCard className="h-5 w-5 text-emerald-400" />
                    <span>ضمان وتعويض</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};

export default Order;
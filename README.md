# CRM-chatbot
CRM chatbot

## Definicija sustava

### 1. Domena bota i tok razgovora

Prvi korak u kreiranju chatbota je odabir teme razgovora i osmišljavanje toka razgovora. Veoma je važno definirati znanje bota i njegovu domenu. Konkretno sam u primjerima podatke o ponudama, cijenama i čestim pitanjima koristio podatke s Iskonovog portala. Sa znanjem o domeni i podacima sljedeće je potrebno osmisliti i kreirati osnovni tok razgovora. Na priloženom dijagramu nalazi se prikaz toka razgovora koji je podijeljen na temeljne cjeline.

![alt text](https://github.com/lkordis/CRM-chatbot/blob/master/Assets/bot_diagram.png "Bot diagram")


### 2. Korištene tehnologije

#### Microsoft Bot Framework

Za izradu bota odlučio sam se za Microsoft Bot Framework sa podrškom za Node.js. Node.js je popularan JavaScript radni okvir za izradu jednostavnih web servera. Kao dodatak na Microsoft Bot Framework koristi se i Wit.ai, alat za obradu prirodnog jezika.
Microsoft Bot Framework nudi veliki broj korisnih alata sa već ugrađenom arhitekturom razgovora. Osnovni entitet razgovora je ‘dialog’ koji osigurava tok razgovora kroz tzv. ‘Waterfall’ tehniku. Dijalog se sastoji od niza korisničkih funkcija koje se izvršavaju jedna za drugom i tako se stvara dojam o prirodnom toku razgovora. 

![alt text](https://github.com/lkordis/CRM-chatbot/blob/master/Assets/dialog.png "Bot dialog")

Microsoft Bot Framework nudi jednostavnu integraciju sa gotovo svim platformama uključujući i Email i SMS (putem Twilia). Svi se oblici poruka sa dodatnim sadržajem poput slika ili računa pretvaraju u tip poruka specifičan za određenu platformu. Moguće je i poslati posebnu poruku svojstvenu određenoj platformi korištenjem podatka channelId. Također, Microsoft Bot Framework u svojoj implementaciji ima ugrađenu potporu za rad sa više korisnika u isto vrijeme baziranu na sjedničkoj arhitekturi.


Unutarnje stanje bota

Microsoft Bot radni okvir omogućuje botu pohranu i dohvaćanje podataka unutarnjeg stanja koji su povezani s korisnikom, razgovorom ili određenim korisnikom u kontekstu određenog razgovora. Podaci se mogu upotrebljavati u mnoge svrhe, kao što je utvrđivanje gdje je prekinut razgovor ili jednostavno pozdravljanje korisnika koji se vraća razgovoru. Ako pohranjujete postavke korisnika, te informacije možete koristiti za prilagodbu razgovora prilikom sljedećeg razgovora. Na primjer, možete upozoriti korisnika na članak vijesti o temi koja ga je zainteresirala.  U Builder SDK za Node.js, klasa ChatConnector pruža implementaciju ovog sustava za pohranu i možete koristiti objekt session za pohranu, dohvaćanje i brisanje podataka o stanju.
Više informacija na:
https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-state


#### Wit.ai
Wit.ai je alat za obradu prirodnog jezika (NLP) u vlasništvu Facebooka. NLP je akronim koji se često čuje kada se govori o botovima. Riječ je o obradi prirodnog jezika i koristi se za analizu slobodnog unosa teksta kako bi se utvrdila namjera i isporučio relevantan sadržaj ili akcija. Wit.ai dijeli sve entitete na 2 vrste:
+ Intent - namjera rečenice. U rečenici “Koje sve internet usluge nudite?” namjera je traženje informacija o uslugama
+ Entitet  - tip usluge koju korisnik traži, u ovom slučaju internet.

Wit.ai se uči i trenira na temelju upisanih rečenica i označavanja ključnih riječi i sinonima. Prilikom upita na api wit.ai, rezultat je popis entiteta koje je wit.ai prepoznao.

Više informacija na https://wit.ai/docs/quickstart
Wit.ai postavke za projekt https://wit.ai/lkordis/SedamIT

### 3. Arhitektura sustava

Arhitektura sustava se bazira na 3 komponente. Bot preko HTTP poziva prilikom svake primljene poruke komunicira sa WIt.ai alatom za obradu prirodnog jezika, koji šalje podatke o poruci u obliku JSON-a. Ako je potrebno pristupiti podacima iz baze podataka, bot šalje GET ili POST pozive CRM API-u.

![alt text](https://github.com/lkordis/CRM-chatbot/blob/master/Assets/architecture.png "Bot architecture")

### 4. Implementacija sustava

Kako se kao tzv. ‘middleware’ koristi WIt.ai, obrada primljenih poruka se sastoji od kombinacije alata za obradu prirodnog jezika i ponuđenih odgovora kako bi se nastavio tok razovora. Svaka primljena poruka šalje se Wit.ai na obradu. Na temelju informacija iz obrađene poruke pokreće se određeni dijalog. U Microsoft Bot radnom okviru moguće je na niz načina pokrenuti novi dijalog:
+ Naredbom beginDialog() - briše se razgovorni stog i na vrh se stavlja željeni dijalog
+ Naredbom replaceDialog() - zamjenjuje se dijalog koji je na vrhu stoga

Pokretanje ključnom riječi - ako je primljena poruka ključna riječ, pokreće se određeni dijalog
 Kao česti mehanizam za vođenje razgovora koriste se predložene akcije, koje pokreću dijaloge slanjem tzv. postback poruka, vidljivih samo botu, koje pokreću tražene dijaloge. Na slici je prikaz jednog jednostavnog dijaloga koji se pokreće ključnom riječi ‘odjava_postback’ koja se šalje prilikom pritiska na gumb ‘Odjava’.
 
 ![alt text](https://github.com/lkordis/CRM-chatbot/blob/master/Assets/postback.png "Bot postback")

Slika prikazuje jedan dio ‘waterfalla’ u dijalogu koji je zadužen za rukovanje korisničkim računom. Nudi predložene akcije za odjavu, pregled stanja računa i pregled korisničke košarice.

![alt text](https://github.com/lkordis/CRM-chatbot/blob/master/Assets/suggested.png "Bot postback")

#### Prijava korisnika

Microsoft bot radni okvir nudi slanje posebnog oblika poruke koji je namijenjen za prijavu korisnika, no za Node.js ne postoji alat koji olakšava prijavu i lak nastavak razgovora (Za C# postoji alat BotAuth). U ovom sustavu koristi se obrazac prikazan na slici.

![alt text](https://github.com/lkordis/CRM-chatbot/blob/master/Assets/auth.jpg "Skype")

Korisnik pritiskom na gumb ‘Prijava’ pristupa stranici za prijavu. Nakon upisa podataka i potvrde o uspješnoj prijavi, bot u unutarnje stanje sprema token prijave, koji dalje koristi pri upitima koji zahtijevaju autentifikaciju.


### 5. Struktura datoteka

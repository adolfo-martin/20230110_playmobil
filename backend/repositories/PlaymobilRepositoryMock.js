import Serie from '../entities/Serie.js';
import Box from '../entities/Box.js';
import Figure from '../entities/Figure.js';

export default class PlaymobilRepositoryMock {

    static #instance;
    static #series = PlaymobilRepositoryMock.#setupSeries();
    static #boxes = PlaymobilRepositoryMock.#setupBoxes();
    static #figuresAux = PlaymobilRepositoryMock.#setupFigures();
    static #figures = PlaymobilRepositoryMock.#figuresAux[0];
    static #figuresByBox = PlaymobilRepositoryMock.#figuresAux[1];

    constructor() {
        if (!PlaymobilRepositoryMock.#instance) {
            PlaymobilRepositoryMock.#instance = this;
        }

        return PlaymobilRepositoryMock.#instance;
    }


    async retrieveSeries() {
        return PlaymobilRepositoryMock.#series;
    }

    async retrieveSerieByUuid(serieUuid) {
        return PlaymobilRepositoryMock.#series.find(serie => serie.uuid === serieUuid);
    }

    async retrieveBoxes() {
        return PlaymobilRepositoryMock.#boxes;
    }

    async retrieveBoxByUuid(boxUuid) {
        return PlaymobilRepositoryMock.#boxes.find(box => box.uuid === boxUuid);
    }

    async retrieveFigures() {
        return PlaymobilRepositoryMock.#figures;
    }

    async retrieveFigureByUuid(figureUuid) {
        return PlaymobilRepositoryMock.#figures.find(figure => figure.uuid === figureUuid);
    }

    async retrieveBoxesBySerieUuid(serieUuid) {
        return PlaymobilRepositoryMock.#boxes.filter(box => box.serie === serieUuid);
    }


    async retrieveFiguresByBoxUuid(boxUuid) {
        const boxDenomination = PlaymobilRepositoryMock.#boxes
            .find(box => box.uuid === boxUuid)
            ?.denomination;
        return PlaymobilRepositoryMock.#figuresByBox
            .find(box => box.boxDenomination === boxDenomination)
            ?.figures;
    }


    static #setupSeries() {
        const series = [
            new Serie('2969cb0a-e117-4b00-97fc-1887cbd046c0', 'Ancient Ages'),
            new Serie('7bc17d34-6858-4b51-9ccd-7e280ec3b5be', 'Knights and Princess'),
            new Serie('43270ebc-59af-419a-adaa-4f588ec87263', 'Western'),
            new Serie('1703135e-03b3-4a32-b8df-16965d19b862', 'Modern jobs'),
        ];

        series[0].description = `
            La línea "History" de Playmobil convierte el aprendizaje de la historia en una experiencia tangible y divertida, ofreciendo sets detallados que fomentan el juego de roles y la comprensión de diferentes culturas y eventos históricos.
            Playmobil ha explorado ampliamente los tiempos antiguos a través de su línea de productos "History", que ha permitido a niños y coleccionistas recrear y aprender sobre civilizaciones milenarias como la Antigua Roma, Egipto y Grecia.
            Antiguo Egipto: Una de las temáticas más populares. Los sets incluyen elementos icónicos como la gran pirámide, esfinges con pasadizos secretos, y figuras de faraones, soldados con camellos, y cleopatras.
            Imperio Romano: Esta línea presenta guerreros romanos, carros (cuadrigas), y fortificaciones, permitiendo recrear la vida en las legiones y batallas de la antigüedad.
            Antigua Grecia y Mitología: Playmobil ha producido una colección dedicada a los dioses y héroes griegos, incluyendo figuras de Zeus, Hera, Poseidón, Aquiles y Ulises, con accesorios y escenarios relacionados con la mitología.
            Vikingos: Aunque ligeramente posteriores a la antigüedad clásica, los sets de vikingos también forman parte de esta exploración histórica, incluyendo barcos y poblados detallados.
        `; 
        series[0].image = 'cesar-visits-egypt.jpg';

        series[1].description = `
            Línea Playmobil Knights y Princesas
            Las líneas de productos de Playmobil dedicadas a caballeros y princesas transportan a los niños a la época medieval y a mundos de cuento de hadas, ofreciendo sets detallados que fomentan la imaginación y el juego de roles.
            La línea de caballeros de Playmobil es una de las temáticas originales y más perdurables, que ha evolucionado a lo largo de los años.
            Temática: Se centra en la vida medieval, batallas, defensa de castillos y torneos, con diferentes facciones como los "Falcon Knights" (Caballeros del Halcón) y los "Lion Knights" (Caballeros del León).
            Sets icónicos: Incluyen grandes castillos con puentes levadizos funcionales, mazmorras y cañones que disparan, así como una amplia gama de armaduras, armas, caballos y figuras de soldados.
            Sets actuales: La línea más reciente se llama Playmobil Novelmore, que introduce un universo de fantasía con magia, héroes y villanos, como el Príncipe Arwynn, y armas ingeniosas, ofreciendo una narrativa más elaborada y moderna a la temática medieval.
        `; 
        series[1].image = 'castle-king.jpg';

        series[2].description = `
            Línea Playmobil Western
            La línea de productos Playmobil Western (Oeste) es una de las temáticas más emblemáticas y nostálgicas de la marca, presente desde sus inicios y que captura el espíritu aventurero del Salvaje Oeste americano. 
            Historia y Evolución
            La temática Western ha sido fundamental en la historia de Playmobil y ha experimentado varias encarnaciones a lo largo de las décadas. 
            Lanzamiento inicial (década de 1970): La línea del Salvaje Oeste se lanzó poco después del debut de Playmobil en 1974. De hecho, una de las tres figuras originales de 1974 fue un nativo americano.
            Años 80 y 90: Durante estas décadas, la línea se expandió significativamente con sets detallados, incluyendo el icónico Fort Randall (1980) y más tarde el Fort Glory (1994), diligencias, bancos, salones y estaciones de tren. Los sets de soldados de la Unión (nordistas) y confederados (sudistas), así como los campamentos indios, eran muy populares entre los aficionados.
            Resurgimientos: Tras un período de ausencia de nuevos sets importantes, la línea Western resurgió en 2012 con nuevos diseños, como el Fort Brave, y continúa lanzando sets ocasionales para mantener vivo el interés de los coleccionistas y nuevos públicos. 
        `; 
        series[2].image = 'ranch-cattle.webp';

        series[3].description = `
            Línea Playmobil Tiempos Modernos
            Esta línea se centra en la vida urbana y familiar, abarcando actividades cotidianas y servicios comunitarios.
            Temática: Recrea el día a día en una ciudad moderna, incluyendo hogares, tiendas, parques y servicios de salud.
            Sets Icónicos: La Casa Moderna (Modern House) es uno de los sets más destacados, un edificio modular y detallado que se puede amueblar con diferentes habitaciones (cocina, baño, salón, etc.). Otros sets populares incluyen hospitales, centros comerciales, escuelas, piscinas y parques infantiles.
            Enfoque: Fomenta el juego de roles relacionado con la vida familiar, las compras, la socialización y el cuidado de la salud. 
        `; 
        series[3].image = 'software-developers.webp';

        return series;
    }

    
    static #setupBoxes() {
        const boxes = [];

        boxes.push(createBox(
            '243308d5-6ff7-4798-8c83-9348fe1ad089',
            'Julius Caesar on Egipt', 
            'This box represents when Julius Caesar visit Egipt and meet the Pharaon.',
            39.90,
            '2969cb0a-e117-4b00-97fc-1887cbd046c0',
            'cesar-visits-egypt.jpg',
        ));

        boxes.push(createBox(
            '87a4b93d-632d-415d-b8f2-02d3bb3c1a31',
            'Great Pyramid of Egipt',
            'This box represents the pyramid where the Pharaon rest after his death.',
            75.80,
            '2969cb0a-e117-4b00-97fc-1887cbd046c0',
            'pyramid.jpg'
        ));

        boxes.push(createBox(
            '8903a09e-00d3-45dc-afd6-37478cdf44ae',
            'Gods of Greece',
            'This box represents the most important gods of the ancient Greece, like Zeus or Poseidon.',
            35.50,
            '2969cb0a-e117-4b00-97fc-1887cbd046c0',
            'palace-olympus.jpg'
        ));

        boxes.push(createBox(
            'dbf039d6-f9c1-496b-b46f-aee8787fac91',
            'Roman legion',
            'This box represents a legion of Roman soldiers with a centurion.',
            35.50,
            '2969cb0a-e117-4b00-97fc-1887cbd046c0',
            'roman-legion.jpg'
        ));

        boxes.push(createBox(
            '3f40a4ac-92af-45ef-b481-023d7cf70659',
            'Brave knight faces a dragon',
            'This box represents a knight who is fighting against a dragon which attacked some peasants.',
            38.75,
            '7bc17d34-6858-4b51-9ccd-7e280ec3b5be',
            'knights-dragons.jpg'
        ));

        boxes.push(createBox(
            'df94b9ba-d532-46fb-a3b4-7c2aacf4f770',
            'Castle of the King',
            'This box represents the castle of the King who is celebrating a party with princesses and knights.',
            82.50,
            '7bc17d34-6858-4b51-9ccd-7e280ec3b5be',
            'castle-king.jpg'
        ));

        boxes.push(createBox(
            '9b776bff-902a-4d3d-ab0a-2eed1959a60f',
            'The Black Knight',
            'This box represents warfare between the wicked Black Knight and the King\'s knights.',
            53.90,
            '7bc17d34-6858-4b51-9ccd-7e280ec3b5be',
            'castle-black-knight.jpg'
        ));

        boxes.push(createBox(
            'fcb7769e-e2b0-4ab9-a5fa-b9a08ac44d19',
            'The ranch with cattle',
            'This box represents a ranch with a house, several cowboys, cows and other animals.',
            86.90,
            '43270ebc-59af-419a-adaa-4f588ec87263',
            'ranch-cattle.webp'
        ));

        boxes.push(createBox(
            '37190f42-05a1-4877-9444-abebb6bdcb38',
            'Squad of soldiers',
            'This box represents a squad of soldiers on horseback who are on a reconnaissance mission.',
            86.90,
            '43270ebc-59af-419a-adaa-4f588ec87263'
        ));

        boxes.push(createBox(
            '8cbbb82b-5799-4ebd-b722-0cd4c819eb98',
            'Indian village',
            'This box represents an indian village with some indians who are trading with merchants.',
            68.75,
            '43270ebc-59af-419a-adaa-4f588ec87263',
            'indian-village.jpg'
        ));

        boxes.push(createBox(
            '4f5e3a80-a7ce-47fe-a93f-87daab41d449',
            'Primary school',
            'This box represents a classroom with a teacher and several pupils making exercises.',
            71.90,
            '1703135e-03b3-4a32-b8df-16965d19b862',
            'primary-school.jpg'
        ));

        boxes.push(createBox(
            'db1e0071-08de-4c8d-b106-10be0cf694d5',
            'Software developers',
            'This box represents a group of developers on their desktop programming in JavaScript language.',
            95.75,
            '1703135e-03b3-4a32-b8df-16965d19b862',
            'software-developers.webp'
        ));

        boxes.push(createBox(
            '3c74829e-4e12-4be0-b3cf-b7fc9542405d',
            'Medical clinic',
            'This box includes the figure of a physician.',
            64.95,
            '1703135e-03b3-4a32-b8df-16965d19b862'
        ));

        boxes.push(createBox(
            '300574f2-2db0-42de-b99d-158f93e5b6ce',
            'Truck and driver',
            'This box represents a driver with his truck and some commodities which need to be transported.',
            44.50,
            '1703135e-03b3-4a32-b8df-16965d19b862',
            'truck-driver.jpg'
        ));

        boxes.push(createBox(
            '5297d100-cc4a-4893-abd9-b743efab8838',
            'Police station',
            'This box represents a police station with several policeman and thieves.',
            79.95,
            '1703135e-03b3-4a32-b8df-16965d19b862'
        ));

        return boxes;

        function createBox(uuid, denomination, description, price, serieUuid, image = 'image-not-available.jpg') {
            const box = new Box(
                uuid, 
                denomination,
                serieUuid,
                // getSerieUuidByName(serieName),
            );
            box.description = description;
            box.price = price;
            box.image = image;
            return box;
        }

        
        // function getSerieUuidByName(denomination) {
        //     const serie = PlaymobilRepositoryMock.#series.find(serie => serie.denomination === denomination)
        //     return serie.uuid;
        // }
    }


    static #setupFigures() {
        const figures = [];
        const figuresByBox = [];

        const juliusCaesar = createFigure('956097a5-678f-46f3-95db-789c0a732992', 'Julius Caesar', '512345000107', 'julius-caesar.jpg');
        const romanCenturion = createFigure('5adcafef-2106-476c-9a3a-7628b900d1ad', 'Roman centurion', '133904506408', 'roman-centurion.jpg');
        const romanLegionary = createFigure('7cc8088c-47c8-4d68-a611-b26a4c379f0a', 'Roman legionary', '391345000864', 'roman-soldier.jpg');
        const egyptianPharaon = createFigure('bbcc9ad3-84f3-4f93-8dbc-6ff125122b1f', 'Egyptian pharaon', '749345000358', 'egyptian-pharaon.jpg');
        const egyptianSoldier = createFigure('38f28d4d-5e31-4524-8ea9-3fd13c0bde7d', 'Egyptian soldier', '973345000917', 'egyptian-soldier.jpg');
        const egyptianHouse = createFigure('0e3607c8-118d-441d-bf8e-0f34829d9e8b', 'Egyptian house', '349730901507', 'egyptian-house.jpg');
        const brownHorse = createFigure('edaf1056-cf87-4085-9cd5-02db3b132da2', 'Brown horse', '705109730349', 'brown-horse.jpg');
        const blackHorse = createFigure('5e3cdea3-94ac-4a2e-a930-923a2c1d3471', 'Black horse', '109705973430', 'black-horse.jpg');

        figures.push(juliusCaesar, romanCenturion, romanLegionary, egyptianPharaon, egyptianSoldier, egyptianHouse);
        figuresByBox.push({
            boxDenomination: 'Julius Caesar on Egipt',
            figures: [
                { figure: juliusCaesar, quantity: 1 },
                { figure: romanCenturion, quantity: 1 },
                { figure: romanLegionary, quantity: 10 },
                { figure: egyptianPharaon, quantity: 1 },
                { figure: egyptianSoldier, quantity: 6 },
                { figure: egyptianHouse, quantity: 8 },
                { figure: blackHorse, quantity: 2 },
            ]
        });

        const egyptianPeasant = createFigure('ec6bf079-6bdc-4e5d-95ac-584d66edb0b9', 'Egyptian peasant', '035874934500', 'egyptian-peasant.jpg');
        const egyptianMummy = createFigure('61357165-e2f7-44f9-ac79-721768ba3272', 'Egyptian mummy', '917973345000', 'mummy.jpg');
        const egyptianThief = createFigure('afacdb06-0698-4463-83f7-2bee79197e10', 'Egyptian thief', '500917973340', 'egyptian-thief.jpg');
        const egyptianPyramid = createFigure('2dd11b40-7232-4dd8-bcde-ab9abf44d811', 'Egyptian Pyramid', '500917973340', 'pyramid.jpg');

        figures.push(egyptianPeasant, egyptianMummy, egyptianThief, egyptianPyramid);
        figuresByBox.push({
            boxDenomination: 'Great Pyramid of Egipt',
            figures: [
                { figure: egyptianPharaon, quantity: 1 },
                { figure: egyptianSoldier, quantity: 4 },
                { figure: egyptianPeasant, quantity: 10 },
                { figure: egyptianMummy, quantity: 2 },
                { figure: egyptianThief, quantity: 2 },
                { figure: egyptianPyramid, quantity: 1 },
                { figure: egyptianHouse, quantity: 10 },
            ]
        });

        const godZeus = createFigure('79394c2c-1090-44ca-960f-3e2140a184a7', 'God Zeus', '304574900358', 'zeus.jpg');
        const goddessAphrodite = createFigure('8804cde4-a869-4c5d-abc3-4f7fb18f696f', 'Goddess Aphrodite', '090097334517', 'aphrodite.jpg');
        const goddessAthena = createFigure('c47b7286-c294-4963-8817-e8f4abcaaa7a', 'Goddess Athena', '449303587500', 'athena.jpg');
        const olympusPalace = createFigure('a9afb6a8-ed37-402b-95fc-34c66616cea5', 'Heavenly palace', '649435500803', 'palace-olympus.jpg');

        figures.push(godZeus, goddessAphrodite, goddessAthena, olympusPalace);
        figuresByBox.push({
            boxDenomination: 'Gods of Greece',
            figures: [
                { figure: godZeus, quantity: 1 },
                { figure: goddessAphrodite, quantity: 1 },
                { figure: goddessAthena, quantity: 1 },
                { figure: olympusPalace, quantity: 1 },
            ]
        });

        const romanBarrack = createFigure('06f07e5d-7d4d-436c-b05b-76259007cd3a', 'Roman barrack', '556443009308');

        figures.push(romanBarrack);
        figuresByBox.push({
            boxDenomination: 'Roman legion',
            figures: [
                { figure: romanCenturion, quantity: 1 },
                { figure: romanLegionary, quantity: 20 },
                { figure: romanBarrack, quantity: 2 },
                { figure: brownHorse, quantity: 1 },
            ]
        });
        
        const braveKnight = createFigure('52dce589-a61c-42c2-a3dd-4f3a53d6478b', 'Brave knight', '5803587493450580');
        const medievalArcher = createFigure('466b422c-383a-4fef-8575-a8e68f9e563d', 'Medieval archer', '373590079401');
        const blackDragon = createFigure('005c6c39-a6c3-44b5-951c-5c645686f964', 'Black dragon', '500917973340');
        
        figures.push(braveKnight, medievalArcher, blackDragon);
        figuresByBox.push({
            boxDenomination: 'Brave knight faces a dragon',
            figures: [
                { figure: braveKnight, quantity: 1 },
                { figure: medievalArcher, quantity: 6 },
                { figure: blackDragon, quantity: 1 },
                { figure: blackHorse, quantity: 1 },
            ]
        });

        const medievalKing = createFigure('638d3ace-ec13-44c4-b497-ae25f7167235', 'Medieval King', '940350310779');
        const medievalSoldier = createFigure('a82db2ac-4694-4c04-9509-2286708211fb', 'Medieval Soldier', '903735940107');
        const medievalPeasant = createFigure('9a9c71a7-6c4b-4471-a36a-cd58cee25cf5', 'Medieval peasant', '175009394730');
        const medievalCastle = createFigure('5c1106db-c2f1-47ed-8ad2-c73246af7d77', 'Medieval castle', '501858373039');
            
        figures.push(medievalKing, medievalSoldier, medievalPeasant, medievalCastle);
        figuresByBox.push({
            boxDenomination: 'Castle of the King',
            figures: [
                { figure: medievalKing, quantity: 1 },
                { figure: braveKnight, quantity: 3 },
                { figure: medievalArcher, quantity: 4 },
                { figure: medievalSoldier, quantity: 8 },
                { figure: medievalPeasant, quantity: 10 },
                { figure: medievalCastle, quantity: 1 },
                { figure: brownHorse, quantity: 3 },
                { figure: blackHorse, quantity: 2 },
            ]
        });
        
        const blackKnight = createFigure('1664c158-2c62-455c-8569-e154aae339a7', 'Black knight', '079354017390');

        figures.push(blackKnight);
        figuresByBox.push({
            boxDenomination: 'The Black Knight',
            figures: [
                { figure: blackKnight, quantity: 1 },
                { figure: braveKnight, quantity: 1 },
                { figure: medievalSoldier, quantity: 4 },
                { figure: brownHorse, quantity: 5 },
                { figure: blackHorse, quantity: 1 },
            ]
        });
        
        const oldCowboy = createFigure('0b7ea64b-7de2-4282-afcd-6c118e4f48bc', 'Old cowboy', '375940103079');
        const youngCowboy = createFigure('f0bc3dc6-47e3-4966-a0da-484081185453', 'Young cowboy', '733590940107');
        const brownCow = createFigure('83d81580-f28a-42fe-89b8-3b1afda6c90a', 'Brown cow', '597010973034');        
        const westernRanch = createFigure('a99bdc0d-82ff-4e79-9fea-5a6a74066fef', 'Western ranch', '359730901074');

        figures.push(oldCowboy, youngCowboy, brownCow, brownHorse, blackHorse, westernRanch);
        figuresByBox.push({
            boxDenomination: 'The ranch with cattle',
            figures: [
                { figure: oldCowboy, quantity: 2 },
                { figure: youngCowboy, quantity: 4 },
                { figure: brownCow, quantity: 20 },
                { figure: brownHorse, quantity: 4 },
                { figure: blackHorse, quantity: 3 },
                { figure: westernRanch, quantity: 1 },
            ]
        });

        const cavalryCaptain = createFigure('918f827a-35da-4a44-a668-b7c5f64ec8e8', 'Cavalry captain', '013759403907');
        const cavalrySergeant = createFigure('7557a15a-55a8-491a-94b4-6fc8cf731641', 'Cavalry sergeant', '107340359097');
        const cavalrySoldier = createFigure('28276391-e0cd-4f5d-b27d-481cb3f390af', 'Cavalry soldier', '037010973594');

        figures.push(cavalryCaptain, cavalrySergeant, cavalrySoldier);
        figuresByBox.push({
            boxDenomination: 'Squad of soldiers',
            figures: [
                { figure: cavalryCaptain, quantity: 1 },
                { figure: cavalrySergeant, quantity: 2 },
                { figure: cavalrySoldier, quantity: 20 },
                { figure: brownHorse, quantity: 17 },
                { figure: blackHorse, quantity: 8 },
                { figure: oldCowboy, quantity: 1 },
                { figure: youngCowboy, quantity: 1 },
            ]
        });

        const indianBoss = createFigure('fab94164-314f-4d8c-8654-178945429f20', 'Indian boss', '470136907503');
        const indianMan = createFigure('af73cf2e-e3e5-40e8-a1f5-959a2dff4823', 'Indian man', '411735909207');
        const indianWoman = createFigure('459d3be7-7779-42b7-9c34-1c7ca0ea919a', 'Indian woman', '169073338740');
        const indianTent = createFigure('953c7412-e480-4f09-8999-3426a64e8a4c', 'Indian tent', '781690274085');

        figures.push(indianBoss, indianMan, indianWoman, indianTent);
        figuresByBox.push({
            boxDenomination: 'Indian village',
            figures: [
                { figure: indianBoss, quantity: 1 },
                { figure: indianMan, quantity: 5 },
                { figure: indianWoman, quantity: 6 },
                { figure: brownHorse, quantity: 6 },
                { figure: blackHorse, quantity: 3 },
                { figure: oldCowboy, quantity: 2 },
                { figure: youngCowboy, quantity: 1 },
                { figure: indianTent, quantity: 6 },
            ]
        });


        const teacherWoman = createFigure('16e2f3c2-f546-4c7f-a7a1-7fc927ee8cc1', 'teacherWoman', '904736750301');
        const studentBoy = createFigure('9cd8f453-9644-4fb1-9fd1-c62838e04526', 'Student boy', '354117909720');
        const studentGirl = createFigure('dfc6d4b5-5c49-4af2-9a86-1a816520cc04', 'Student girl', '167387439030');
        const schoolClassroom = createFigure('b6ac3bdd-c20e-49b5-9965-36a76be5e5ca', 'School classroom', '277816908504');

        figures.push(teacherWoman, studentBoy, studentGirl, schoolClassroom);
        figuresByBox.push({
            boxDenomination: 'Primary school',
            figures: [
                { figure: teacherWoman, quantity: 1 },
                { figure: studentBoy, quantity: 5 },
                { figure: studentGirl, quantity: 6 },
                { figure: schoolClassroom, quantity: 1 },
            ]
        });


        const developerBoy = createFigure('27a2590f-6737-4772-814e-5b2073b5b120', 'Developer boy', '203790874397');
        const developerGirl = createFigure('94fabdb2-c451-4a9f-bcb4-cdb166a2879c', 'Developer girl', '541673903110');
        const managerWoman = createFigure('d86c7a18-7700-4e86-9e98-e273dee43f72', ' Manager woman', '301625367503');
        const managerMan = createFigure('d44c8e10-0a3e-4c60-8229-b1bb86a1dd06', 'Manager man', '703538754536');
        const developerOffice = createFigure('cdcfba86-8730-4203-b802-596dabfad32c', 'Developer office', '290716215478');

        figures.push(developerBoy, developerGirl, managerWoman, managerMan, developerOffice);
        figuresByBox.push({
            boxDenomination: 'Software developers',
            figures: [
                { figure: developerBoy, quantity: 6 },
                { figure: developerGirl, quantity: 3 },
                { figure: managerWoman, quantity: 1 },
                { figure: managerMan, quantity: 1 },
                { figure: developerOffice, quantity: 1 },
            ]
        });


        const physicianWoman = createFigure('f2ff3b8e-0b6c-43fe-8877-57391041ec9e', 'Physician woman', '537035852846');
        const physicianMan = createFigure('fe8e9d1e-cddb-4b00-9213-082c9c3c2d85', 'Physician man', '300316274175');
        const normalWoman = createFigure('6a46009d-471b-4d92-9224-7213cc39f7fd', 'Normal woman', '375035854628');
        const normalMan = createFigure('104758d6-5cce-4a2e-a66c-c5bf917b0202', 'Normal man', '163003274517');
        const medicalClinic = createFigure('6aaf7f6d-d88b-4e82-a1e7-d5af26919e49', 'Medical clinic', '071693827829');

        figures.push(physicianWoman, physicianMan, normalWoman, normalMan, medicalClinic);
        figuresByBox.push({
            boxDenomination: 'Medical clinic',
            figures: [
                { figure: physicianWoman, quantity: 2 },
                { figure: physicianMan, quantity: 1 },
                { figure: normalWoman, quantity: 5 },
                { figure: normalMan, quantity: 6 },
                { figure: medicalClinic, quantity: 1 },
            ]
        });

        const bigTruck = createFigure('ba589ad4-ebd7-4443-899d-5b2cfd049538', 'Big truck', '29979138278');

        figures.push(bigTruck);
        figuresByBox.push({
            boxDenomination: 'Truck and driver',
            figures: [
                { figure: normalMan, quantity: 1 },
                { figure: bigTruck, quantity: 1 },
            ]
        });

        const policeWoman = createFigure('dff4477a-103e-4310-9b20-496b08069a9f', 'Police woman', '035853726156');
        const policeMan = createFigure('285226a4-ab16-4523-aed2-1a2356c5da17', 'Police man', '627430758675');
        const policeStation = createFigure('d7cf7c99-47a8-4ff1-ab6c-ccd4d849d1e9', 'Police station', '278290774368');

        figures.push(policeWoman, policeMan, policeStation);
        figuresByBox.push({
            boxDenomination: 'Police station',
            figures: [
                { figure: policeWoman, quantity: 4 },
                { figure: policeMan, quantity: 4 },
                { figure: normalWoman, quantity: 2 },
                { figure: normalMan, quantity: 2 },
                { figure: policeStation, quantity: 1 },
            ]
        });

        return [figures, figuresByBox];


        function createFigure(uuid, denomination, barcode, image = 'image-not-available.jpg') {
            const figure = new Figure(
                uuid, 
                denomination,
            );
            figure.barcode = barcode;
            figure.image = image;
            return figure;
        }

        function getFiguresByBoxName(denomination) {
            const serie = PlaymobilRepositoryMock.#figures.find(serie => serie.denomination === denomination)
            return serie.uuid;
        }
    }
}
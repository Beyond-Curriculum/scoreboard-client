import React from "react";

export default {
    ru: {
        empty: "Ничего не найдено",
        support: "Поддержать этот проект",
        oops: {
            title: "Ваше имя написано с ошибкой?",
            p: <>Пожалуйста, напишите нам на <a href="mailto:scoreboard@bc-pf.org">scoreboard@bc-pf.org</a>, прикладывая ссылку на результат олимпиады, где есть ошибка.</>
        },
        nav: {
            results: "Результаты",
            hall: "Зал Славы",
            home: "О проекте",
            olympiads: 'Задачи',
            ask: 'Ask',
        },
        results: {
            subject: "Выберите предмет",
            olymp: "Выберите олимпиаду",
            year: "Выберите год",
            algorithm: "Алгоритм подсчета",
            problems: "Посмотреть задания олимпиады",
            about: "Определение состава сборной РК"
        },
        home: {
            title: "О проекте",
            p1: "Залог любого процветающего государства — образование и наука. При этом, к сожалению, в нынешнем обществе примерами для подражания являются блогеры и «тиктокеры».",
            p2: "Тем не менее, в Казахстане немало школьников, которые не только хорошо учатся, но и выходят за рамки школьной программы и учавствуют в олимпиадах, благодаря чему достигают высот в своей жизни.",
            p3: "Этим проектом мы чествуем таких ребят и предлагаем новых кумиров для молодежи."
        },
        olympiads: {
            title: "Что такое олимпиады?",
            p1: "Школьные олимпиады - это соревнования, в которых школьники решают необычные задачки и иногда проводят интересные эксперименты. Олимпиады, при этом, бывают самые разные - школьные, республиканские и международные. Проводить их тоже могут самые разные люди или образовательные центры. Самые престижные олимпиады - это те, которые ведут к International Science Olympiads. В Казахстане этот путь таков:",
            list: [
                ["Школьная олимпиада", "~800 тыс участников"],
                ["Районная/городская олимпиада", "~20 тыс участников"],
                ["Областная олимпиада", "~12 тыс участников"],
                ["Республиканская олимпиада", "1.8 тыс  участников"],
                ["Международная олимпиада", "~27 участника"]
            ],
            p2: <>Очень часто первые 5 олимпиад называют республиканскими, но с поправкой, что это областной этап или заключительный этап. Школьные олимпиады этого цикла (их еще называют Дарыновскими, поскольку их проводит <a target="_blank" rel="noopener noreferrer" href="http://daryn.kz/">РНПЦ Дарын</a>) начинаются в конце октября-ноябре. Вы попадаете на каждый последующий этап если успешно проходите через предыдущий. В конце концов, отбирается от 4 до 6 человек в Сборную Республики Казахстан, которая едет на Международную олимпиаду в июле. Международные олимпиады из серии International Science Olympiads это: IMO, IPhO, IOI, IChO, IBO и IESO. Это своего рода "олимпийские игры" - вершина олимпиадного пика. За победу на таких олимпиадах некоторые вузы автоматически дают гранты, а в некоторых серьезно увеличивается шанс поступления.</>,
            t2: "А как стать олимпиадником",
            p3: <>Предлагаем почитать нашу <a target="_blank" rel="noopener noreferrer" href="https://blog.bc-pf.org/getting-started-with-olympiads/">запись в блоге</a>.</>
        },
        rating: {
            reputation: {
                title: "Репутация",
                p: ["К нашему огромному сожалению, в Казахстане отсутствует институт академической честности. Иногда мы сталкиваемся со случаями, когда ученики получают (или даже покупают) задания до начала олимпиады, а иногда мы наблюдаем предвзятых членов жюри, которые нацелено натаскивают своих учеников на темы, которые позднее встретятся на олимпиаде. К еще большему сожалению, такие случаи почти всегда остаются безнаказанными: свидетелями таких событий являются ученики, судьба которых зависит от этих самых людей. ", "Именно поэтому, мы добавляем пятую категорию: репутация. Если наша команда никогда не сталкивалась с нарушениями академической честности на той или иной олимпиаде — у олимпиады нейтральный рейтинг. Если мы сталкивались с одним, маленьким, спорным моментом, которого достаточно чтобы у нас возникали вопросы — мы ставим знак \"вопроса\". Если мы сталкивались с одним серьезным случаем нарушения академической честности — в этой категории ставится один восклицательный знак. В случае систематических нарушений, мы ставим от двух до трех восклицательных знаков.", "В крайне редких случаях, когда мы уверены, что организаторы имеют активную позицию в защиту академической честности, мы ставим галочку — положительная репутация. На таких олимпиадах организаторы не боятся брать ответственность и дисквалифицировать участников, которые подозреваются в нарушении академической честности.", "Примечание: оценка в этой категории является исключительно субъективным мнением команды Фонда. Если вы не считаете нас достаточно компетентными для выдачи такого рейтинга, вы можете оперировать только первыми четырьмя оценками."]
            },
            participants: "участники",
            countries: "страны",
            page: {
                t1: "Рейтинг олимпиад",
                p1: <>В наши дни проводится огромное количество олимпиад, и человеку, не знакомому с движением, крайне трудно понять насколько ценна та или иная медаль на определенной олимпиаде. Для решения этой задачи, <a target="_blank" rel="noopener noreferrer" href="https://bc-pf.org/members">экспертный совет Фонда</a> оценивает каждую олимпиаду по пяти категориям:"</>,
                list: [
                    "Прозрачность оценивания (до 5 баллов)",
                    "Уникальность заданий (до 5 баллов)",
                    "Селективность отбора (до 5 баллов)",
                    "Селективность награждения (до 5 баллов)",
                    "Репутация (нейтральный, ?, !, !! или !!!)"
                ],
                p2: "На странице каждой олимпиады вы увидите нашу оценку по каждой категории по 5-бальной шкале. Ниже предлагаем алгоритм оценки каждой из категорий. "
            }
        },
        algorithm: {
            t1: "Алгоритм",
            title: "Алгоритм подсчета",
            labels: {
                transparency: "Прозрачность оценивания",
                uniqueness: "Уникальность заданий",
                screening: "Селективность отбора",
                award: "Селективность награждения"
            },
            values: {
                transparency: ["5 баллов — в интернете опубликованы официальные решения и марк схемы по всем классам", "3 балла — в интернете есть частичные решения с марк схемами по некоторым (или всем) классам", "2 балла — в интернете есть частичные решения без марк схемы по некоторым классам", "1 балл — официальные решения и марк схемы не опубликованы в сети интернет"],
                uniqueness: ["5 баллов — все задачи авторские, составлены специально для олимпиады, не являются переводом уже существующих заданий                                             ", "3 балла — авторские задания составляют не меньше 60% от количества баллов ", "2 балла — авторские задания составляют не меньше 40% от количества баллов", "1 балл — авторские задания составляют меньше 40% от количества баллов"],
                screening: ["5 баллов — из 100 (или более) желающих, к участию допускается 1", "4 балла — из 50-99 желающих, к участию допускается 1", "3 балла — из 10-49 желающих, к участию допускается 1", "2 балла — из 2-9 желающих, к участию допускается 1", "1 балл — к участию допускается любой желающий"],
                award: ["5 баллов — кол-во первых мест/золотых медалей не превышает 3%, кол-во вторых мест/серебряных медалей не превышает 7%, кол-во третьих мест/бронзовых медалей не превышает 10%", "4 балла — кол-во первых мест/золотых медалей не превышает 5%, кол-во вторых мест/серебряных медалей не превышает 10%, кол-во третьих мест/бронзовых медалей не превышает 15%", "3 балла — кол-во первых мест/золотых медалей не превышает 10%, кол-во вторых мест/серебряных медалей не превышает 20%, кол-во третьих мест/бронзовых медалей не превышает 30%", "1 балла — кол-во первых мест/золотых медалей превышает 10%,кол-во вторых мест/серебряных медалей превышает 30%, кол-во третьих мест/бронзовых медалей превышает 40%"]
            }
        },
        fields: {
            name: "Имя",
            school: "Школа",
            country: "Страна",
            round: "тур",
            medal: "Медаль",
            sum: "Общий балл",
            grade: "класс",
            experience: "Опыт",
            projects: "Проекты",
            interests: "Интересы",
            link: "Ссылка",
            olympiad: "Олимпиада",
            subject: "Предмет",
        },
        medals: {
            gold: "Золото",
            silver: "Серебро",
            bronze: "Бронза",
            diploma: "Грамота"
        },
        request: {
            title: "Хотите создать свой профиль?",
            p: (
                <>
                    1. Подготовьте дипломы с олимпиад
                    <br />
                    2. Напишите на почту <a href="mailto:scoreboard@bc-pf.org">scoreboard@bc-pf.org</a> отправив свое ФИ, сканы дипломов, школу и ссылки на результаты олимпиад, в которых вы участвовали.
                </>
            )
        }
    },
    en: {
        empty: "Nothing found",
        support: "Support this project",
        oops: {
            title: "Did we write your name wrong?",
            p: <>Please feel free to reach us at <a href="mailto:scoreboard@bc-pf.org">scoreboard@bc-pf.org</a>, leaving a link to an olympiad where we made a mistake.</>
        },
        nav: {
            results: "Results",
            hall: "Hall of Fame",
            home: "About",
            olympiads: 'Problems',
            ask: 'Ask'
        },
        results: {
            subject: "Choose discipline",
            olymp: "Choose Olympiad",
            year: "Choose year",
            algorithm: "Calculation algorithm",
            problems: "Go to olympiad problems",
            about: "Selection of national team from Kazakhstan"
        },
        home: {
            title: "About the project",
            p1: `Education and science are cornerstones to prosperity of any state. Regrettably, our society today is increasingly driven by social media and grants an influential status to bloggers and so called "tiktokers".`,
            p2: "In Kazakhstan, nevertheless, quite a few schoolchildren not only study well, but strive to go beyond the curriculum by partaking in academic Olympiads and succeed in life as a result.",
            p3: "This project is created to honor these children presenting the alternative new role models for our youth."
        },
        olympiads: {
            title: "What is an Olympiad?",
            p1: "Olympiad is a contest designed for schoolchildren to compete among peers by solving intellectual exercises or at times performing fascinating tests. Olympiads are held in different categories namely at a school, regional, national, and international level by various entities and educational centers. The most prestigious (and credible) Olympiads are those leading to the International Science Olympiads (ISO). In Kazakhstan the path goes as follows:",
            list: [
                ["School Olympiad", "~800 thsd participants"],
                ["District/City Olympiad", "~20 thsd participants"],
                ["Oblast/County Olympiad", "~12 thsd participants"],
                ["Republic Olympiad", "1.8 thsd participants"],
                ["International Olympiad", "~27 participants"]
            ],
            p2: <>Fairly often, the first 5 Olympiads are simply referred to as "Republic" Olympiads, with correction suggesting its regional level or final stage. School Olympiads of this cycle (often called Daryn Olympiads due to being held by <a target="_blank" rel="noopener noreferrer" href="http://daryn.kz/">RNPC Daryn</a>) begin in 2nd Quarter of the school year. Basically, you qualify for each following stage upon successful completion of the previous one. After the Republic level, 4-6 school kids are selected to represent Kazakhstan at the ISO. Among those are IMO, IPhO, IOI, IChO, IBO, IGeo, IESO, etc. They are somewhat similar to Olympic games in a sense that they represent the pinnacle of an olympian career. Some Universities automatically grant scholarships to the holders of gold medals in ISOs, while others significantly increase your chances for enrollment.</>,
            t2: "How do I become an Olympian?",
            p3: <>We suggest you to read our <a target="_blank" rel="noopener noreferrer" href="https://blog.bc-pf.org/getting-started-with-olympiads/">blog post</a> for details.</>
        },
        algorithm: {
            title: "Calculation algorithm",
            t1: "Algorithm",
            labels: {
                transparency: "Transparency of evaluation",
                uniqueness: "Assignment uniqueness",
                screening: "Screening selectivity",
                award: "Award selectivity"
            },
            values: {
                transparency: ["5 points — official solutions and scheme marks for all grades are published on the Internet", "3 points — partial solutions with scheme marks are available on the Internet for some (or all) grades", "2 points — partial solutions are available on the Internet without scheme marks for some grades ", "1 point — official solutions and scheme marks are not published on the Internet"],
                uniqueness: ["5 points — all assignments are written specifically for the Olympiad, not translated or adapted from existing assignments", "3 points — unique assignments (i.e. created specifically for the olympiad) make up at least 60% of the points number", "2 points — unique assignments make up at least 40% of the points number", "1 point — unique assignments make up below 40% of the points number"],
                screening: ["5 points — out of 100 (or more) applicants, 1 is allowed to participate", "4 points — out of 50-99 applicants, 1 is allowed to participate", "3 points — out of 10-49 applicants, 1 is allowed to participate", "2 points — out of 2-9 applicants, 1 is allowed to participate", "1 point — anyone interested is allowed to participate "],
                award: ["5 points — number of 1st places/Gold medals does not exceed 3%, number of 2nd places/Silver medals does not exceed 7%, number of 3rd places/Bronze medals does not exceed 10%", "4 points — number of 1st places/Gold medals does not exceed 5%, number of 2nd places/Silver medals does not exceed 10%, number of 3rd places/Bronze medals does not exceed 15%", "3 points — number of 1st places/Gold medals does not exceed 10%, number of 2nd places/Silver medals does not exceed 20%, number of 3rd places/Bronze medals does not exceed 30%", "1 point — number of 1st places/Gold medals does not exceed 10%, number of 2nd places/Silver medals does not exceed 30%, number of 3rd places/Bronze medals does not exceed 40%"]
            }
        },
        rating: {
            reputation: {
                title: "Credibility",
                p: ["Regrettably, an institute of academic integrity is virtually non-existent in Kazakhstan. At times we come across a case when students obtain (or even buy) assignments prior to the start of an Olympiad, and at other times we observe biased jury members who purposely train their students on topics that would later appear at an Olympiad. Moreover, such cases almost always go unpunished: students whose fate depends on those individuals are witnesses of such events.", "For this reason, we have added a third category: credibility. Should our team never encounter violations of academic integrity at an Olympiad, it receives a neutral rating. Should we ever face a minor controversial moment, which we may consider enough to raise questions - we put a question mark in our evaluation. If we encounter a serious academic integrity violation, then one exclamation mark is put in the category. In case of systematic violations, we place from two to three exclamation marks depending on its severity.", "In extremely rare cases when we feel confident that the organizers take proactive stance on academic integrity, we tick the box for full credibility. At such Olympiads, the organizers are not afraid to take responsibility to disqualify participants who were suspected of violating academic integrity.", "Note: Olympiad rating in this category is solely subjective to the opinion of the Fund's expert circle. If you consider us not competent enough to issue such rating, you can only operate in the first two categories."]
            },
            participants: "participants",
            countries: "countries",
            page: {
                t1: "Olympiads Ranking",
                p1: <>Nowadays, there is a number of Olympiads held on a regular basis, and it is difficult to comprehend the value of a particular Olympiad or a medal to someone unfamiliar with the movement. To solve this issue, our <a target="_blank" rel="noopener noreferrer" href="https://bc-pf.org/members">Fund's experts council</a> evaluates each Olympiad in five categories:"</>,
                list: [
                    "Transparency of evaluation (up to 5 points);", "Assignment uniqueness (up to 5 points);", "Screening selectivity (up to 5 points);", "Award selectivity (up to 5 points);", "Credibility (neutral, ?, !, !! or !!!)"],
                p2: "On each Olympiad's page, you will find our assessment of each category at a 5-point scale. Here is our suggestion of an algorithm for evaluation of each category."
            }
        },
        fields: {
            name: "Name",
            country: "Country",
            school: "School",
            round: "Round",
            medal: "Medal",
            sum: "Score",
            grade: "grade",
            experience: "Experience",
            projects: "Projects",
            interests: "Interests",
            link: "Link",
            olympiad: "Olympiad",
            subject: "Discipline",
        },
        medals: {
            gold: "Gold",
            silver: "Silver",
            bronze: "Bronze",
            diploma: "Diploma"
        },
        request: {
            title: "Would you like to create your profile?",
            p: (
                <>
                    1. Prepare diplomas from all Olympiads you have participated in
                    <br />
                    2. Send an email to <a href="mailto:scoreboard@bc-pf.org">scoreboard@bc-pf.org</a> and don't forget to mention your full name, your school, and attach links to Olympiad results where you took part, plus include scanned diplomas
                </>
            )
        }
    },
    kk: {
        empty: "Ештеңе табылмады",
        support: "Осы жобаны қолдаңыз",
        oops: {
            title: "Аты-жөніңіз қате жазылған ба?",
            p: <>Олимпиада нәтижелерінде қате байқаған болсаңыз, <a href="mailto:scoreboard@bc-pf.org">scoreboard@bc-pf.org</a> поштасына сол сілтемені жіберуіңізді сұраймыз.</>
        },
        nav: {
            results: "Нәтижелер",
            hall: "Даңқ залы",
            home: "Жоба туралы",
            olympiads: 'Есептер',
            ask: 'Ask',
        },
        results: {
            subject: "Пәнді тандаңыз",
            olymp: "Олимпиаданы тандаңыз",
            year: "Жылды тандаңыз",
            algorithm: "Есептеу алгоритмі",
            problems: "Олимпиаданың тапсырмаларын қарау",
            about: "ҚР құрама командасын анықтау"
        },
        home: {
            title: "Жоба туралы",
            p1: `Кез-келген өркендеген мемлекеттің кепілі - білім мен ғылым. Сонымен бірге, өкінішке орай, қазіргі қоғамда блогерлер мен «тиктокерлер» үлгі болып табылады.`,
            p2: "Алайда Қазақстанда жақсы оқып қана қоймай, мектеп бағдарламасынан тыс білім іздейтін және соның арқасында олимпиадаларға қатысып, өмірлерінде биік шыңдарға қол жеткізетін мектеп оқушылары да аз емес.",
            p3: "Осы жобаның іске асырылуымен, біз осындай оқушыларды құрметтейтінімізді көрсетіп, жастарға жаңа үлгі тұтар тұлғаларды ұсынамыз."
        },
        olympiads: {
            title: "Олимпиада дегеніміз не?",
            p1: "Мектеп олимпиадалары - оқушыларға арналған ерекше есептерді шешіп кейде қызықты эксперименттер өткізуге мүмкіндік беретін жарыс түрі. Олимпиадалар мектептік, республиқалық, халықаралық деңгейлерінде өткізіледі. Олимпиадаларды адамдар немесе әртүрлі білім беру орталықтары өткізе алады. Ең беделді олимпиадалар Халықаралық Ғылыми Олимпиадаларға жол ашады. Қазақстанда бұл жол келесі кезеңдерден тұрады:",
            list: [
                ["Мектептік олимпиада", "~800 мың қатысушы"],
                ["Аудандық/қалалық олимпиада ", "~20 мың қатысушы"],
                ["Облыстық олимпиада", "~12 мың қатысушы"],
                ["Республикалық олимпиада", "1.8 мың қатысушы"],
                ["Халықаралық олимпиада", "~27 қатысушы"]
            ],
            p2: <>Алғашқы 5 олимпиада Республиқалық олимпиаданың деңгейлеріне жатады. Осы олимпиадалар (осы олимпиадаларды <a target="_blank" rel="noopener noreferrer" href="http://daryn.kz/">РҒПО "Дарын"</a>) өткізетін болғандықтан,оларды Дарын олимпиадалары деп атайды) қазан-қараша айларында басталады. Егер сіз алдыңғы кезеңді сәтті тапсырсаңыз, келесі кезеңге өтесіз. Соңында, шілде айында Халықаралық олимпиадаға баратын Қазақстан Республикасының ұлттық құрамасына 4-тен 6 адамға дейін іріктеліп алынады. International Science Olympiads құрамына кіретін халықаралық олимпиадаларға IMO, IPhO, IOI, IChO, IBO және IESO жатады. Олар «Олимпиада ойындарының» өзіндік бір түрі - олимпиадалық шыңының шыңы. Кейбір университеттер осындай олмипиадалардың жеңімпаздарына автоматты түрде гранттар береді, ал кейбіреулеріне түсу мүмкіндіктерін айтарлықтай жақсартады.</>,
            t2: "Олимпиадамен қалай айналысып бастауға болады?",
            p3: <>Бұл туралы біздің <a target="_blank" rel="noopener noreferrer" href="https://blog.bc-pf.org/getting-started-with-olympiads/">блог жазбаларын</a> оқуды ұсынамыз.</>
        },
        algorithm: {
            title: "Есептеу алгоритмі",
            t1: "Алгоритм",
            labels: {
                transparency: "Бағалау ашықтығы",
                uniqueness: "Тапсырмалардың қайталанбастығы",
                screening: "Іріктеу таңдамалылығы",
                award: "Марапаттау таңдамалылығы"
            },
            values: {
                transparency: ["5 ұпай — барлық сыныптарға арналған ресми шешімдер мен марк схемалар ғаламторда жарияланған", "3 ұпай — Ғаламторда кейбір (немесе барлық) сыныптарға арналған марк схемалар бар, бірақ шешімдер жоқ", "2 ұпай — Ғаламторда кейбір (немесе барлық) сыныптарға арналған толық емес шешімдер жарияланған, марк схемалар жоқ ", "1 ұпай — ресми шешімдер мен марк схемалар ғаламторда жарияланбаған"],
                uniqueness: ["5 ұпай — барлық тапсырмалар авторлық, олимпиадаға арнайы жинақталған, басқа тілден аударылмаған", "3 ұпай — авторлық тапсырмалар барлық тапсырмалардың кем дегенде 60%-ын құрайды", "2 ұпай — авторлық тапсырмалар барлық тапсырмалардың кем дегенде 40%-ын құрайды", "1 ұпай — авторлық тапсырмаларбарлық тапсырмалардың 40% -дан азын құрайды"],
                screening: ["5 ұпай — 100 (немесе одан көп) үміткердің ішінен 1 қатысуға рұқсат етіледі", "4 ұпай — 50-99 үміткердің ішінен 1 қатысуға рұқсат етіледі", "3 ұпай — 10-49 үміткердің ішінен 1 қатысуға рұқсат етіледі", "2 ұпай — 2-9 үміткердің ішінен 1 қатысуға рұқсат етілген", "1 ұпай — кез келген адам қатыса алады"],
                award: ["5 ұпай - бірінші орындардың саны / алтын медальдар 3% -дан, екінші орындардың саны / күміс медальдар 7% -дан, үшінші орындардың саны / қола медальдар 10% -дан аспайды", "4 ұпай - бірінші орындардың саны / алтын медальдар 5% -дан, екінші орындардың саны / күміс медальдар 10% -дан, үшінші орындардың саны / қола медальдар 15% -дан аспайды", "3 ұпай - бірінші орындардың саны / алтын медальдар 10% -дан, екінші орындардың саны / күміс медальдар 20% -дан, үшінші орындардың саны / қола медальдар 30% -дан аспайды", "1 ұпай - бірінші орындардың саны / алтын медальдар 10% -дан, екінші орындардың саны / күміс медальдар 30% -дан, үшінші орындардың саны / қола медальдар 40% -дан асады"]
            }
        },
        rating: {
            reputation: {
                title: "Беделі",
                p: ["Өкінішке орай, Қазақстанда академиялық адалдық институты жоқ. Кейде біз қатысушылардың қолдарында олимпиада тапсырмалары алдын ала болатынын немесе әділқазылар алқасы мүшелері олимпиадада кездесетін тақырыптарды өз оқушыларына алдын ала үйрететінін байқаймыз. Мұндай жағдайлар көбінесе жазасыз қалады, себебі осындай оқиғалардың куәгерлері болған оқушылардың тағдыры дәл осы әділқазылар алқасы мүшелерінің шешіміне байланысты.", "Сондықтан біз өзіміздің бағалау жүйемізге үшінші санатты қосуды ұйғардық: олимпиаданың беделі. Егер біздің командамыздың мүшелері олимпиадаларда академиялық адалдықтың бұзылуын ешқашан байқамаса, онда олимпиада «бейтарап» рейтингіне ие. Алайда кішкентай бұзышылықты байқаған болсақ, бізде осы олимпиаданың беделіне байланысты сұрақтар туындайды - біз сұрақ белгісін қоямыз. Егер біз академиялық тұтастықтың бір үлкен бұзылуын кездестірсек, онда осы санатқа бір леп белгісін қоямыз. Ал бұзушылықтар жүйелі болған жағдайда, біз екіден үшке дейін леп белгілерін қоямыз.", "Ұйымдастырушылардың академиялық адалдыққа қатысты белсенді позициясы бар екендігіне сенімді болған өте сирек жағдайларда, біз құсбелгісін қойып, олимпиаданың беделі оң екенін көрсетеміз. Академиялық адалдығы жоғары деңгейдегі олимпиадаларда, ұйымдастырушылар толық жауапкершілікті өздерінің мойындарына алудан қорықпай, академиялық адалдықты бұзды деп күдіктелген қатысушыларды дисквалификациялайды.", "Ескерту: Осы санаттағы рейтинг Қор тобының тек субъективті пікірі болып табылады. Егер сіз біздің осындай рейтингті қоюға құзіретті емес деп ойласаңыз, онда тек алғашқы төрт санат бойынша олимпиаданың рейтингін талдауға құқылысыз."]
            },
            participants: "қатысушылар",
            countries: "елдер",
            page: {
                t1: "Олимпиадалар рейтингі ",
                p1: <>Қазіргі уақытта көптеген олимпиадалар өткізіледі және олимпиадалық қозғалысты жақсы түсіне білмейтін адамға белгілі бір олимпиаданың немесе сол олимпиададағы медальдің қаншалықты құнды екенін түсіну өте қиын. Осы мәселені шешу үшін, <a target="_blank" rel="noopener noreferrer" href="https://bc-pf.org/members">Қордың сарапшылық кеңесі</a> әр олимпиаданы үш санат бойынша бағалайды:"</>,
                list: [
                    "Бағалау ашықтығы (5 ұпайға дейін)", "Тапсырмалардың қайталанбастығы (5 ұпайға дейін)", "Іріктеу таңдамалылығы (5 ұпайға дейін)", "Марапаттау таңдамалылығы (5 ұпайға дейін)", "Олимпиаданың беделі (бейтарап, ?, !, !! немесе !!!)"],
                p2: "Әр олимпиаданың веб парақшасында, сіз әр санат бойынша 5 ұпайлық шкала бойынша біздің бағамызды көре аласыз. Төменде біз әр санаттың бағалау алгоритмін ұсынамыз."
            }
        },
        fields: {
            name: "Аты",
            school: "Мектеп",
            country: "Ел",
            round: "тур",
            medal: "Медаль",
            sum: "Жалпы ұпай",
            grade: "сынып",
            experience: "Тәжірибе",
            projects: "Жобалар",
            interests: "Мүдделер",
            link: "Сілтеме",
            olympiad: "Олимпиада",
            subject: "Пән",
        },
        medals: {
            gold: "Алтын",
            silver: "Күміс",
            bronze: "Қола",
            diploma: "Диплом"
        },
        request: {
            title: "Өзіңіздің парақшанызды жасағыңыз келеді ме?",
            p: (
                <>
                    1. Дипломдарыңызды дайындаңыз
                    <br />
                    2. <a href="mailto:scoreboard@bc-pf.org">scoreboard@bc-pf.org</a> поштасына өзініздің толық аты-жөніңізді, дипломдарыңызды, мектебіңізді және қатысқан олимпиаданың нәтижелеріне сілтемені жіберіңіз.
                </>
            )
        }
    }
}
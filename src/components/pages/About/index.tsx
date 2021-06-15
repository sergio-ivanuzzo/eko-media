import React from "react";

import { Section } from "~/components/pages/styles";

const AboutPage = (): JSX.Element => {
    return (
        <Section>
            <>
                <h1>МЕТОДОЛОГІЇ</h1>

                <h2 id="network">Мережа:</h2>
                <p>
                    Посиланням ми вважаємо згадку джерела. Ми аналізували лише згадування між 26 ЗМІ з нашої бази. Тобто випадки посилань на будь-яке інше джерело не з цього переліку в даному аналізі не враховувалися. Також окремо не враховувалися посилання на дочірні медіа (наприклад, Європейську правду). Подвійні посилання, наприклад, «LIGA.net з посиланням на Радіо Свободу» враховувалися – згадка зараховувалася обом медіа.

                    Самі посилання ми шукали за патернами побудови новини для кожного медіа. Наприклад, у більшості новин Української правди є розділ «Джерело». У тих ЗМІ, де такого розділу немає, джерело вказується у кожній новині у певному абзаці. Саме у цих абзацах ми шукали згадки.

                    Масиви посилань на Радіо Свободу, РБК-Україна, Інтерфакс-Україна, Суспільне, Громадське, 112.ua, ГолосUA, ZIK, Страна.ua, Гордон, Українську правду, Факти та Факти ICTV перевірялися вручну. Оскільки для деяких медіа могли зараховуватися згадки закордонних однойменних/схожих за назвою ЗМІ або ж для інших медіа могли враховуватися схожі за написанням слова (спільнокореневі, омоніми чи абревіатури).
                </p>


                <h2 id="connections">Як виявляли зв’язки між ЗМІ:</h2>
                <p>
                    Для кожного ЗМІ прорейтингували список, на яке ЗМі воно посилається і проставили замість кількості посилань рейтингові бали. Найбільша кількість – 1 місце, друга за величиною кількість посилань – 2 місце і т.д. Далі просумували бали для всіх пар такого типу: «Медіа 1 посилається на Медіа 2» і »Медіа 2 посилається Медіа 1».

                    Наступним кроком відсортували за спаданням отримані суми. Відкинули пари, де абсолютна кількість посилань принаймні одного медіа на інше є меншою 10. Оскільки у такому випадку у рейтингу певного медіа різниця між сусідніми місцями у кількості посилань вимірюється в кількох одиницях, складно визначити чи є зв’язок між медіа, чи ні.

                    У підсумку визначили 4 пари ЗМІ, які набрали найменшу суму балів. Такі ЗМІ ми визначили як пов’язані між собою.
                </p>


                <h2 id="categories">Категоризація:</h2>
                <p>
                    Ми виділили для новин 15 тем, які вручну проставили для 7695 матеріалів ЗМІ: 5506 матеріалів українською мовою, 2189 – російською. Також цей масив ми доповнили 4488 матеріалами з темами, які ЗМІ проставило саме, у себе на сайті (якщо ці теми входили до нашого переліку): 3345 – українською, 1143 – російською. Теми із сайтів могли не відповідати ручному кодуванню, оскільки на сайтах не було всього переліку із 15 наших тем. Умовно у тема світ могли потрапити новини із суміжної категорії «закордонна політика», бо останньої не було в переліку на сайті. Але такий крок – збирання маркування із сайтів, дозволив підвищити точність визначення новин.

                    На основі 12 183 розмічених темами матеріалів ми навчили та протестували алгоритм SVM для класифікації новини (співвідношення розмірів масивів для тренування і тестування 75 до 25). Успішність моделі ми вимірювали f1-показником, який крім істинно позитивно визначених тем (як у формулі звичайної точності) враховує ще й хибно позитивні та хибно негативні результати. Для українських новин <a href="https://deepai.org/machine-learning-glossary-and-terms/f-score" target="_blank">f1-показник</a> становить 80%, для російських новин – 77%. У матрицях передбачень для <a href="https://drive.google.com/file/d/1Y-EsBYwYJAKvRwkz5Cusz4hRneKsF5a3/view?usp=sharing" target="_blank">української</a> та <a href="https://drive.google.com/file/d/1B28NFTeNrvhPZ12oe8IrJBK8jurzB7-V/view?usp=sharing" target="_blank">російської</a> мов видно, що найчастіше неправильно визначена тема – це суміжна до  правильної, наприклад, тема «закордонна політика» часто визначається як «світ» чи «політика».
                </p>


                <h2>Опис тем:</h2>
                <p>
                    Надзвичайні події і розслідування — надзвичайні події в Україні, суди, вбивства, теракти, підтоплення, вибухи, пожежі, затримання, розслідування і т.п. Це характеристика переважної більшості новин цієї теми (докладніше про це читайте у розширеній методології нижче).

                    Політика — новини про політику в Україні, прийняття законів, політичні опитування, новини про кандидатів, заяви політиків, призначення і звільнення з посад і т.п.

                    Економіка — новини про економіку в Україні та світі, НБУ (курс валют, відсоткова ставка), тарифи, бюджет, мінімалку, ковідний фонд, індексацію, кредити МВФ, експорт, інвестиції, виділення грошей, закони, що стосуються бюджету чи безпосередньо економіки і т.п.

                    Коронавірус — новини про коронавірус в Україні та світі, статистика нових захворювань, смертей, спалахи, про вакцину і т.п.

                    Карантин — новини про карантинні обмеження, пов’язані з коронавірусом, в Україні та світі, новий поділ на зони, закриття/відкриття шкіл і т.п.

                    Світ — світові новини (крім політичних), протести, інциденти за кордоном, сюди ж відносили новини про протести у Білорусі і США.

                    Закордонна політика — світові політичні новини, можуть стосуватися і України, заяви і дії іноземних політиків, конфлікти і т.д.

                    Суспільство — новини про суспільне життя в Україні (не про політику й економіку), мітинги, ЗНО і т.п.

                    Війна/Донбас/армія — новини про російсько-українську війну, втрати, обстріли, ТКГ, пропускні пункти та армію загалом.

                    Спорт — новини про спорт в Україні і світі.

                    Шоу-бізнес та культура — новини про українських і закордонних «зірок», нові пісні, фільми, серіали, виставки і т.п.

                    Наука і технології — технологічні й наукові новинки, представлення нових моделей техніки, наукові дослідження і відкриття і т.д.

                    Життя/lifestyle — рецепти, дієти, гороскопи, лайфхаки, свята і т.п.
                </p>


                <h2 id="word-cloud">Ворд клауд:</h2>
                <p>
                    Хмара слів показує найчастіше вживані слова у темі. Для їх визначення ми привели слова з новин до нормальної форми за допомогою лематизації (використавши бібліотеку pymorphy2). Далі видалили масив від умовного “шуму” – слів, що не несуть змістового навантаження, обчислили кількість кожного слова і найбільш вживані у текстах українською і російською мовами об’єднали.
                </p>

                <h2 id="politicians">Політики та емоційне забарвлення:</h2>
                <p>
                    У текстах новин ми шукаємо імена зі списку <a href="https://docs.google.com/spreadsheets/d/1whjD9GdartgOyOIkHj3lW-JCmoCR1Ijual3SbKQYmjY/edit#gid=0" target="_blank">56 політиків</a> (складеного на основі рейтингів довіри до політиків від <a href="http://razumkov.org.ua/napriamky/sotsiologichni-doslidzhennia/otsinka-gromadianamy-sytuatsii-v-kraini-riven-doviry-do-sotsialnykh-instytutiv-ta-politykiv-elektoralni-oriientatsii-gromadian-kviten-2020r" target="_blank">Центру Разумкова</a>, <a href="http://ratinggroup.ua/research/ukraine/ukraina_na_karantine_poryadok_i_bezopasnost_26-28_marta_2021.html?fbclid=IwAR1cZTcK-DxuejVJIJq3VGOQu1Nr657GD4DjZO9Tn5E_B_s_x34AAM-RQSU" target="_blank">групи Рейтинг</a>, <a href="http://www.kiis.com.ua/?lang=ukr&cat=reports&id=1016&page=1" target="_blank">КМІС</a> та <a href="https://nv.ua/ukr/ukraine/politics/novoe-vremya-opublikovano-top-100-nayvplivovishih-lyudey-ukrajini-spisok-novini-ukrajini-50107253.html" target="_blank">найвпливовіших українців</a>). До цього списку увійшли президент, члени кабінету міністрів, лідери парламентських фракцій, очільники антикорупційних органів, генпрокурори, мери великих міст. Згадкою ми вважаємо наявність імені політика в тексті. Новиною, у якій писали про деякого політика ми вважаємо ту, де його/її ім’я згадувалося принаймні двічі, щоб відсіяти випадки побіжних згадок.
                    Для визначення емоційного забарвлення україномовних та російськомовних новин ми використали модель, описану в статті «<a href="https://arxiv.org/abs/1606.05545" target="_blank">Universal, Unsupervised (Rule-Based), Uncovered Sentiment Analysis</a>». Вона працює на основі тональних словників шляхом пошуку в тексті не нейтральних слів, при цьому також враховуючи деякі синтаксичні правила. Модель змінює сентимент речення, а точніше його частини, якщо там є заперечення (введені через «не», «ні», «ані», «нема» і т.д.), протиставлення («але») чи умови («якщо»). Крім того, на сентимент впливають підсилювальні/послаблювальні слова, як-от: «дуже», «ледве», «вкрай», які зібрані в окремий словник. Ми використовували тональні словники української та російської мов, де негативні слова мають оцінки -1, -2, а позитивні — 1 і 2 відповідно. За основу для них ми взяли декілька джерел: <a href="https://lang.org.ua/uk/dictionaries/" target="_blank">український</a> словник від спільноти lang-uk, <a href="https://github.com/dkulagin/kartaslov/tree/master/dataset/emo_dict" target="_blank">російський</a> від проекту «Карта слов» та перекладений на <a href="http://ena.lp.edu.ua:8080/bitstream/ntb/40817/2/2017_Kanishcheva_O-Rozrobka_slovnykaWordNet_52-56.pdf" target="_blank">українську</a> та <a href="http://lilu.fcim.utm.md/resources_ru.html" target="_blank">російську</a> мови тезаурус WordNet-Affect.
                    Приклад: у реченні «<a href="https://news.24tv.ua/fursa-rozpoviv-pro-golovni-problemi-byudzhetu-novini-ukrayini_n1437256" target="_blank">Ситуація дуже небезпечна – Фурса про головні проблеми бюджету-2021</a>» є 2 не нейтральні слова з оцінками -1: «небезпечний» і «проблема». «Дуже» збільшує тональність слова вдвічі, тож сумарна тональність речення буде -3.
                    Негативними ми вважаємо новини із сентиментом менше -1, позитивними — більше 1, а сентимент з відрізка [-1, 1] вважаємо нейтральним.
                    Називаючи новини негативними, позитивними чи нейтральними, ми спираємося тільки на наявні в тексті емоційно забарвлені слова. Тож обчислена нами тональність в першу чергу залежить від подій, описаних в новині, в той час як сприйняття може змінюватися в залежності від <a href="https://www.semanticscholar.org/paper/Rethinking-Sentiment-Analysis-in-the-News%3A-from-to-Alexandra-Ralf/533e1e815d569820d85d093e00e5b3261fd9332a" target="_blank">читача</a>.
                </p>

                <h2 id="experts">Експерти:</h2>
                <p>
                    Ми визначили експертів як людей, які не афілійовані з владними інституціями (не є діючими політиками). Ми це зробили тому, що коментування подій ними - це частина їх професійних обов’язків, тож поява цих людей у медіа зумовлена скоріше позицією, яку вони займають. Ми ж зацікавлені у пошуку тих персоналій, які не пов’язані з владою (в найширшому розумінні) напряму, але хто в очах медіа володіє певним унікальним знанням та чия думка важлива.
                    Тож ми визначили експертів як людей, які коментують новини. У текстах їх імена зустрічаються поруч з такими словами як: сказати, заявити, повідомити, розповісти, написати, прокоментувати, тощо.
                    Під “коментарем” ми розуміємо цитування даного експерт(а/ки) у медіа. Це може бути його пряма мова, посилання на його/її пости.
                    Для пошуку імен експертів ми проаналізували тексти новин за допомогою моделей <a href="https://lang.org.ua/uk/corpora/" target="_blank">Named Entity Recognition (NER)</a>. Отримані іменні сутності ми звели до нормальної форми та склали для кожної новини список імен, що в ній згадуються. З цих списків ми вибрали тільки ті імена, які задовольняють описані вище обмеження.
                </p>
            </>
        </Section>
    );
};

export default AboutPage;

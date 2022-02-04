document.addEventListener('DOMContentLoaded', () => {
    const formDeclension = document.querySelector('.form-declension');
    const wordInput = formDeclension.querySelector('.input-data');
    const submitBtn = formDeclension.querySelector('.form-declension__btn');
    const btnReset = formDeclension.querySelector('.input-data__reset');
    const caseName = formDeclension.querySelector('.cases-list');
    const message = document.querySelector('.message');
    const messageCloseBtn = document.querySelector('.message__close');

    const notNullEnd = 'аяоуьй';
    const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъьэюя';

    const cases = {
        'nominative': {
            'question': 'Кто? Что?',
            'а': 'а',
            'я': 'я',
            'о': 'о',
            'е': 'е',
            'ь': 'ь',
            'й': 'й',
            'elseChar': '',
        },

        'genitive': {
            'question': 'Кого? Чего?',
            'а': 'ы',
            'я': 'и',
            'о': 'а',
            'е': 'а',
            'ь': 'и',
            'й': 'я',
            'elseChar': 'а',
        },

        'dative': {
            'question': 'Кому? Чему?',
            'а': 'е',
            'я': 'е',
            'о': 'у',
            'е': 'у',
            'ь': 'и',
            'й': 'ю',
            'elseChar': 'у',

        },

        'accusative': {
            'question': 'Кого? Что?',
            'а': 'у',
            'я': 'ю',
            'о': 'о',
            'е': 'е',
            'ь': 'ь',
            'й': 'я',
            'elseChar': '',
        },

        'creative': {
            'question': '(с) Кем? (с) Чем?',
            'а': 'ой',
            'я': 'ей',
            'о': 'ом',
            'е': 'ем',
            'ь': 'ью',
            'й': 'ем',
            'elseChar': 'ом',
        },

        'prepositional': {
            'question': '(о) Ком? (о)Чем?',
            'а': 'е',
            'я': 'е',
            'о': 'е',
            'е': 'е',
            'ь': 'и',
            'й': 'е',
            'elseChar': 'е',
        }
    };
    let outputBox = formDeclension.querySelector('.form-declension__output');

    //Формирует новое слово
    function declanceWord (word, caseWord) {
        let end = word[word.length - 1];
        let newWord = '';

        if ( notNullEnd.includes(word[word.length - 1]) ) {
            newWord = word.slice(0, word.length - 1) + cases[caseWord][end];
        } else if ( alphabet.includes(word[word.length - 1]) ) {
            end = 'elseChar';
            newWord = word + cases[caseWord][end];
        }
        return newWord;
    }

    //Вывод слова в требуемом падеже
    function addOutput(word, caseWord) {
        if (word) {
            outputBox.innerHTML = `${cases[caseWord]['question']}<br>${word}`;
            outputBox.style.border = '2px solid var(--primary-color)';
            outputBox.style.borderRadius = '10px';
        } else {
            showMessage();
        }
    }

    //Удаление ранее выведенных результатов
    function removeOutput() {
        outputBox.innerHTML = '';
        outputBox.style.border = 'none';
    }

    //Сообщение о некорректном вводе
    function showMessage() {
        message.classList.add('message_show');
    }

    function closeMessage() {
        message.classList.remove('message_show');
        wordInput.value = '';
    }


    //Обработчики событий
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        removeOutput();
        let word = wordInput.value.toLowerCase();
        if (word) {
            let caseWord = caseName.value;
            let newWord = declanceWord(word, caseWord);
            addOutput(newWord, caseWord);    
        } else {
            showMessage();
        }

    });

    btnReset.addEventListener('click', () => {
        removeOutput();
    });

    messageCloseBtn.addEventListener('click', () => {
        closeMessage();
    });

});
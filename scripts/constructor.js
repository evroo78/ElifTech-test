

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('test-form');
    const questionsContainer = document.getElementById('questions-container');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const titleInput = document.getElementById("title");
    titleInput.value = generateTestTitle();

    let questionCount = 0;

    // Додавання нового питання
    addQuestionBtn.addEventListener('click', () => {
        questionCount++;
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');
        questionBlock.innerHTML = `
                <div class="numberQ" id="nQ${questionCount}"><p>${questionCount}</p></div>
                <div class="column">
                    <div class="line">
                        <div class="Q-wrap">
                            <label for="question${questionCount}">Question</label>
                            <input type="text" class="question-text long-input" id="question${questionCount}" required />
                        </div> 
                        <div>
                            <label>Type</label>
                            <select class="question-type">
                                <option value="text">Text</option>
                                <option value="single">Single choice</option>
                                <option value="multiple">Multiple choices</option>
                            </select>
                        </div>
                        <div class="remove">X</div>
                    </div>
                
                    <div class="answers-container"></div>
                    <div class="line">
                    <button type="button" class="add-answer-btn">Add choice</button>
                    </div>
                </div>
        `;
        


        questionsContainer.appendChild(questionBlock);

        const questionType = questionBlock.querySelector('.question-type');
        const addAnswerBtn = questionBlock.querySelector('.add-answer-btn');
        addAnswerBtn.style.display = 'none';
        const answersContainer = questionBlock.querySelector('.answers-container');
        let answerCount = 0;

        // Обробка зміни типу питання
        questionType.addEventListener('change', () => {
            answersContainer.innerHTML = '';
            answerCount = 0;
            if (questionType.value === 'text') {
                addAnswerBtn.style.display = 'none';
            } else {
                addAnswerBtn.style.display = 'block';
            }
        });

        // Видалення питання
        const removeBtn = questionBlock.querySelector('.remove');
        removeBtn.addEventListener('click', () =>{
            questionCount--;
            questionBlock.remove();
            let j = 0;
            for( let i = 1; i<=questionCount+1; i++){

                const numberQ = document.getElementById('nQ'+i);
                if (numberQ){
                    j ++ ;
                    numberQ.innerHTML=`${j}`;
                    numberQ.id='nQ'+j;
                }
            }
        }
        );

        // Додавання варіантів відповідей
        addAnswerBtn.addEventListener('click', () => {
            answerCount++;
            if (answerCount == 1){
                const answerTitleBlock = document.createElement('div');
                answerTitleBlock.classList.add('line');
                answerTitleBlock.innerHTML = `
                <div>Answers:</div>
                `;
                answersContainer.appendChild(answerTitleBlock);
            }
            const answerBlock = document.createElement('div');
            answerBlock.classList.add('answer-block');
            answerBlock.classList.add('line');
            const numberQ = questionBlock.querySelector(".numberQ").querySelector("p").innerHTML;
            if (questionType.value === 'single') {
                // Один варіант відповіді (radio button)
                answerBlock.innerHTML = `
                <div><p id="nA${answerCount}">${answerCount}</p></div>
                <div>
                    <input type="radio" name="correct-answer${numberQ}" value="${answerCount}" />
                </div>
                <div>
                    <input type="text" class="answer-text long-input" id="answer${questionCount}-${answerCount}" required />
                </div>
                <div class="remove">X</div>
                `;
            } else if (questionType.value === 'multiple') {
                // Декілька варіантів відповідей (checkbox)
                answerBlock.innerHTML = `
                    <input type="text" class="answer-text" required />
                    <input type="checkbox" value="${answerCount}" />
                    <label>Правильна</label>
                `;
            }
            answersContainer.appendChild(answerBlock);

            // Видалення варіантів відповідей
            const removeAnsBtn = answerBlock.querySelector(".remove");
            removeAnsBtn.addEventListener('click', () =>{
                answerCount --;
                answerBlock.remove();
                let j = 0;
                for( let i = 1; i<=answerCount+1; i++){
                    const numberA = document.getElementById('nA'+i);
                    if (numberA){
                        j ++ ;
                        numberA.innerHTML=`${j}`;
                        numberA.id='nA'+j;
                    }
                }
            }
            );
        });


    });

    // Відправлення даних на сервер
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const questions = [];

        document.querySelectorAll('.question-block').forEach((block, index) => {
            const questionText = block.querySelector('.question-text').value;
            const questionType = block.querySelector('.question-type').value;
            const answers = [];
            const correctAnswers = [];

            block.querySelectorAll('.answer-block').forEach((answerBlock, answerIndex) => {
                const answerText = answerBlock.querySelector('.answer-text').value;
                const isChecked = 
                    questionType === 'single'
                        ? answerBlock.querySelector(`input[type="radio"]`).checked
                        : answerBlock.querySelector(`input[type="checkbox"]`).checked;

                answers.push(answerText);
                if (isChecked) {
                    correctAnswers.push(answerIndex);
                }
            });

            if (questionText && (questionType === 'text' || answers.length > 0)) {
                questions.push({
                    question: questionText,
                    type: questionType,
                    answers,
                    correct: questionType === 'text' ? null : correctAnswers
                });
            }
        });

        if (title && questions.length > 0) {
            const test = { title, questions };

            try {
                const response = await fetch('http://localhost:3000/tests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(test)
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                alert('Тест успішно збережено!');
                form.reset();
                questionsContainer.innerHTML = '';
            } catch (error) {
                console.error('Помилка при збереженні тесту:', error);
                alert('Не вдалося зберегти тест.');
            }
        } else {
            alert('Заповніть всі поля і виберіть правильні відповіді.');
        }
    });

    function generateTestTitle() {
        const date = new Date();
        return `Quiz ${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
            .getHours()
            .toString()
            .padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
    }

    // Встановлюємо автоматичну назву при завантаженні сторінки
    
});

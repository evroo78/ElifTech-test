const API_URL = 'http://localhost:3000/tests';
const BASE_URL = 'https://eliftech-test-2zcs.onrender.com';


async function loadTest() {
    console.log("!!!!");
    // Отримуємо ID тесту з URL
    const params = new URLSearchParams(window.location.search);
    const testId = params.get('id');

    if (!testId) {
        alert('Не вдалося отримати ID тесту');
        return;
    }

    try {
        // Завантажуємо тест по ID
        const response = await fetch(`${BASE_URL}/tests/${testId}`);
        const test = await response.json();
        
        // Встановлюємо заголовок тесту
        document.getElementById('test-title').innerText = test.title;

        const form = document.getElementById('test-form');
        form.innerHTML = '';
        test.questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            if (typeof question.correct == 'string'){
                questionElement.innerHTML = `
                <p><strong>${index + 1}. ${question.text}</strong></p>
                ${question.answers.map(answer => `
                    <label class="line">
                        <div><input type="radio" name="q${index}" value="${answer}"></div>
                        <div>${answer}</div>
                    </label>
                `).join('')}
            `;
            }

            form.appendChild(questionElement);
        });
    } catch (error) {
        console.error('Помилка при завантаженні тесту:', error);
        alert('Не вдалося завантажити тест');
    }
}

function submitTest() {
    const form = document.getElementById('test-form');
    const result = document.getElementById('result');

    const params = new URLSearchParams(window.location.search);
    const testId = params.get('id');

    fetch(`${API_URL}/${testId}`)
        .then(response => response.json())
        .then(test => {
            let score = 0;

            test.questions.forEach((question, index) => {
                const selectedAnswer = form[`q${index}`].value;
                if (selectedAnswer === question.correct) {
                    score++;
                }
            });

            result.innerText = `Результат: ${score} з ${test.questions.length}`;
        })
        .catch(error => {
            console.error('Помилка при перевірці відповідей:', error);
            result.innerText = 'Не вдалося перевірити відповіді.';
        });
}

document.getElementById('submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    submitTest();
});

// Завантажуємо тест при відкритті сторінки
loadTest();

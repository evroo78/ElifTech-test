const API_URL = 'http://localhost:3000/tests';

async function loadTestList() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tests = await response.json();

        const catalog = document.getElementById('catalog');
        catalog.innerHTML = '';

        tests.forEach(test => {
            let numberQ = Object.keys(test.questions).length;
            const testItem = document.createElement('div');
            testItem.classList.add('test-item');
            testItem.onclick = function(){startTest(test.id)};
            testItem.innerHTML = `<a>
                <h3 class="catalog-test-name">${test.title}</h3>
                <p class="catalog-test-description">${test.description}</p>
                <p class="catalog-test-count">Questions: ${numberQ}</p>
            `;
            catalog.appendChild(testItem);
        });
    } catch (error) {
        console.error('Помилка при завантаженні тестів:', error);
    }
}

function startTest(testId) {
    window.location.href = `test.html?id=${testId}`;
}

// Завантажуємо тести при відкритті сторінки
loadTestList();

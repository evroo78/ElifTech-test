const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const tests = [
    { id: 1, name: 'Тест 1' },
    { id: 2, name: 'Тест 2' }
];

// Ендпоінт для отримання тестів
app.get('/tests', (req, res) => {
    res.json(tests);
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

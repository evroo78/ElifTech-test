const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const tests =[
    {
      "id": "1",
      "title": "Quiz 1",
      "description": "Description Description Description Description Description Description Description Description Description Description",
      "questions": [
        {
          "text": "Скільки буде 2 + 2?",
          "answers": [
            "3",
            "4",
            "5"
          ],
          "correct": "4"
        },
        {
          "text": "Скільки буде 3 * 3?",
          "answers": [
            "6",
            "9",
            "12"
          ],
          "correct": "9"
        }
      ]
    },
    {
      "id": "2",
      "title": "Quiz 2",
      "description": "Description",
      "questions": [
        {
          "text": "Скільки буде 2 + 2?",
          "answers": [
            "3",
            "4",
            "5"
          ],
          "correct": "4"
        },
        {
          "text": "Скільки буде 3 * 3?",
          "answers": [
            "6",
            "9",
            "12"
          ],
          "correct": "9"
        }
      ]
    },
    {
      "id": "3",
      "title": "Quiz 3",
      "description": "Description",
      "questions": [
        {
          "text": "Скільки буде 2 + 2?",
          "answers": [
            "3",
            "4",
            "5"
          ],
          "correct": "4"
        },
        {
          "text": "Скільки буде 3 * 3?",
          "answers": [
            "6",
            "9",
            "12"
          ],
          "correct": "9"
        }
      ]
    },
    {
      "id": "4",
      "title": "Quiz 14",
      "description": "Description",
      "questions": [
        {
          "text": "Скільки буде 2 + 2?",
          "answers": [
            "3",
            "4",
            "5"
          ],
          "correct": "4"
        },
        {
          "text": "Скільки буде 3 * 3?",
          "answers": [
            "6",
            "9",
            "12"
          ],
          "correct": "9"
        }
      ]
    }
  ];

// Ендпоінт для отримання тестів
app.get('/tests/:id', (req, res) => {
    const testId = req.params.id;
    // Припустимо, що тести зберігаються в масиві
    const test = tests.find(t => t.id == testId);
    if (test) {
        res.json(test);
    } else {
        res.status(404).send('Test not found');
    }
});


// Запуск сервера
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

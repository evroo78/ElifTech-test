const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// Підключення до MongoDB
const mongoURI = 'mongodb+srv://evro78:T9luAEgqQSY4Hw8k@cluster0.4cg4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));

app.use(cors());
app.use(express.json());

// Приклад схеми для тестів
const testSchema = new mongoose.Schema({
    name: String,
    description: String,
    questions: [
        {
            text: String,
            options: [String],
            correct: [String]
        }
    ]
});

const Test = mongoose.model('Test', testSchema);

// Отримати всі тести з бази даних
app.get('/tests', async (req, res) => {
    try {
      const tests = await Test.find();  // Знайти всі тести
      res.json(tests);  // Відправити тести у відповідь
    } catch (err) {
      console.error('Error fetching tests:', err);
      res.status(500).json({ error: 'Error fetching tests' });
    }
  });

// Роут для отримання тесту з бази даних
app.get('/tests/:id', async (req, res) => {
    const testId = req.params.id;
    try {
        const test = await Test.findById(testId);
        if (test) {
            res.json(test);
        } else {
            res.status(404).send('Test not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
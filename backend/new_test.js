const mongoose = require('mongoose');

// Підключення до MongoDB
const mongoURI = 'mongodb+srv://evro78:T9luAEgqQSY4Hw8k@cluster0.4cg4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Створення схеми та моделі для тесту
const testSchema = new mongoose.Schema({
  name: String,
  description: String,
  questions: [
    {
      text: String,
      options: [String],
      correct: [Number]
    }
  ]
});

const Test = mongoose.model('Test', testSchema);

// Створення нового тесту
const newTest = new Test({
  name: 'Quiz 3',
  description: 'Description of Quiz 3',
  questions: [
    {
      text: 'Question?',
      options: ['option1', 'option2', 'option3'],
      correct: [0]
    }
  ]
});

// Збереження нового тесту
newTest.save()
  .then(() => console.log('Test successfully saved'))
  .catch(err => console.log('Error saving test:', err));

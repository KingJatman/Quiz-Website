const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Jane Austen"],
    answer: 0
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

// DOM Elements
const startScreen = document.getElementById('startscreen');
const startButton = document.getElementById('startbutton');
const card = document.querySelector('.card');
const questionHeader = document.querySelector('.question-header');
const questionNumber = document.querySelector('.question-number');
const scoreDisplay = document.querySelector('.score');
const questionBox = document.querySelector('.question-box');
const questionTitle = questionBox.querySelector('h1');
const nextBtn = document.querySelector('.next-btn');
const quizComplete = document.querySelector('.quiz-complete');
const retryBtn = document.querySelector('.retry-btn');

// Hide all main sections
function hideAll() {
  startScreen.style.display = 'none';
  card.style.display = 'none';
  questionBox.style.display = 'none';
  quizComplete.style.display = 'none';
}

// Show only the relevant section
function showScreen(screen) {
  hideAll();
  screen.style.display = 'block';
  if (screen === card || screen === questionBox) {
    card.style.display = 'block';
    questionBox.style.display = 'block';
  }
}

// Start the quiz
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  updateHeader();
  showQuestion();
  showScreen(card);
}

// Update question number and score in header
function updateHeader() {
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Show the current question and options
function showQuestion() {
  updateHeader();
  const q = questions[currentQuestion];
  questionTitle.textContent = q.question;

  // Remove old option buttons
  questionBox.querySelectorAll('button.option-btn').forEach(btn => btn.remove());

  // Add new option buttons
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'option-btn';
    btn.onclick = () => selectOption(idx, btn);
    btn.style.margin = '8px 0';
    btn.style.display = 'block';
    btn.style.width = '100%';
    btn.style.padding = '10px';
    btn.style.fontSize = '1rem';
    questionBox.insertBefore(btn, nextBtn);
  });

  nextBtn.style.display = 'none';
}

// Handle option selection
function selectOption(idx, btn) {
  const q = questions[currentQuestion];
  const optionButtons = questionBox.querySelectorAll('button.option-btn');
  optionButtons.forEach(b => b.disabled = true);

  if (idx === q.answer) {
    score++;
    btn.style.background = '#4caf50';
    btn.style.color = '#fff';
  } else {
    btn.style.background = '#f44336';
    btn.style.color = '#fff';
    // Highlight correct answer
    optionButtons[q.answer].style.background = '#4caf50';
    optionButtons[q.answer].style.color = '#fff';
  }
  updateHeader();
  nextBtn.style.display = 'inline-block';
}

// Go to next question or show results
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showQuizComplete();
  }
}

// Show quiz completion screen
function showQuizComplete() {
  showScreen(quizComplete);
  quizComplete.querySelector('p').textContent = `Your Score: ${score}/${questions.length}`;
  quizComplete.querySelector('h2').textContent = `${Math.round((score / questions.length) * 100)}%`;
  const msg = quizComplete.querySelector('.message em');
  if (score === questions.length) {
    msg.textContent = 'Perfect score! 🎉';
  } else if (score >= 3) {
    msg.textContent = 'Great job!';
  } else {
    msg.textContent = 'Keep practicing!';
  }
}

// Retry the quiz
function retryQuiz() {
  startQuiz();
}

// Event Listeners
startButton.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
retryBtn.onclick = retryQuiz;

// Initial state
hideAll();
showScreen(startScreen);
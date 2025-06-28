
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
const questionBox = document.querySelector('.question-box');
const quizComplete = document.querySelector('.quiz-complete');
const questionNumber = document.querySelector('.question-number');
const scoreDisplay = document.querySelector('.score');
const nextBtn = document.querySelector('.next-btn');
const retryBtn = document.querySelector('.retry-btn');

//Show screen function
function showScreen(screen) {
  startScreen.style.display = 'none';
  card.style.display = 'none';
  questionBox.style.display = 'none';
  quizComplete.style.display = 'none';
  screen.style.display = 'block';
}



// showScreen(     <div class="card">
//         <div class="question-header">
//           <span class="question-number">Question 1 of 5</span>
//           <span class="score">Score: 0</span>
//         </div>
//         <hr class="divider" />
//       </div>    );




function showScreen(screen) {
  startScreen.style.display = 'none';
  card.style.display = 'none';
  questionBox.style.display = 'none';
  quizComplete.style.display = 'none';
  screen.style.display = 'block';
}




//Start the quiz function
function startQuiz() {
  currentQuestion = 4;
  score = 0;
  showScreen(card);
  showQuestion();
}


questions[0]

function showQuestion() {
  const q = questions[currentQuestion];



  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;
  questionBox.querySelector('h1').textContent = q.question;
  // Remove old options
  questionBox.querySelectorAll('button.option-btn').forEach(btn => btn.remove());
  // Add new options
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'option-btn';
    btn.onclick = () => selectOption(idx);
    questionBox.insertBefore(btn, nextBtn);
  });
  showScreen(questionBox);
  nextBtn.style.display = 'none';
}















function selectOption(idx) {
  const q = questions[currentQuestion];
  if (idx === q.answer) {
    score++;
  }
  // Disable all option buttons
  questionBox.querySelectorAll('button.option-btn').forEach(btn => btn.disabled = true);
  nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showQuizComplete();
  }
}

function showQuizComplete() {
  showScreen(quizComplete);
  quizComplete.querySelector('p').textContent = `Your Score: ${score}/${questions.length}`;
  quizComplete.querySelector('h2').textContent = `${Math.round((score / questions.length) * 100)}%`;
  quizComplete.querySelector('.message em').textContent = score === questions.length ? 'Perfect score! 🎉' : score >= 3 ? 'Great job!' : 'Keep practicing!';
}

function retryQuiz() {
  startQuiz();
}

// Event Listeners
startButton.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
retryBtn.onclick = retryQuiz;

// Initial state
showScreen(startScreen);

const questions = [
  { question: "🧠 General Knowledge: Capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], answer: "Tokyo" },
  { question: "🌍 Geography: Longest river?", options: ["Amazon", "Yangtze", "Nile", "Ganges"], answer: "Nile" },
  { question: "🧪 Science: Gas absorbed by plants?", options: ["Oxygen", "CO2", "Nitrogen", "Hydrogen"], answer: "CO2" },
  { question: "🎵 Music: 'Shape of You' singer?", options: ["Drake", "Adele", "Ed Sheeran", "Bieber"], answer: "Ed Sheeran" },
  { question: "🎬 Movies: 'Inception' director?", options: ["Nolan", "Spielberg", "Cameron", "Tarantino"], answer: "Nolan" },
  { question: "📚 Literature: Writer of '1984'?", options: ["Orwell", "Twain", "Shakespeare", "Dickens"], answer: "Orwell" },
  { question: "⚽ Sports: FIFA 2022 winner?", options: ["Brazil", "France", "Argentina", "Germany"], answer: "Argentina" },
  { question: "💻 Tech: Full form of HTML?", options: ["Tool", "Markup Language", "Text Machine", "Home Tool"], answer: "Markup Language" },
  { question: "🇮🇳 India: First PM?", options: ["Gandhi", "Nehru", "Ambedkar", "Patel"], answer: "Nehru" },
  { question: "🧮 Math: 15 * 3?", options: ["35", "60", "50", "45"], answer: "45" },
];

let current = 0;
let score = 0;
let timer;
let timeLeft = 10;

const el = id => document.getElementById(id);
const questionEl = el("question");
const optionsEl = el("options");
const feedbackEl = el("feedback");
const scoreEl = el("score");
const nextBtn = el("next-btn");
const timerEl = el("time-left");

const sounds = {
  correct: document.getElementById("correct-sound"),
  wrong: document.getElementById("wrong-sound"),
  timeout: document.getElementById("timeout-sound"),
  tick: document.getElementById("tick-sound")
};

el("start-btn").onclick = () => {
  el("start-screen").classList.add("hidden");
  el("quiz-container").classList.remove("hidden");
  loadQuestion();
};

el("restart-btn").onclick = () => {
  current = 0;
  score = 0;
  el("end-screen").classList.add("hidden");
  el("quiz-container").classList.remove("hidden");
  loadQuestion();
};

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    el("loader").classList.remove("hidden");
    setTimeout(() => {
      el("loader").classList.add("hidden");
      loadQuestion();
    }, 1000);
  } else {
    showFinal();
  }
};

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimer();

  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  scoreEl.textContent = `Score: ${score}`;
  nextBtn.classList.add("hidden");

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    // Play tick sound every second
    sounds.tick.currentTime = 0;
    sounds.tick.play();

    if (timeLeft === 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function updateTimer() {
  timerEl.textContent = timeLeft;
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[current].answer;

  Array.from(document.getElementsByClassName("option-btn")).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.style.backgroundColor = "#90ee90";
    else if (btn.textContent === selected) btn.style.backgroundColor = "#f08080";
  });

  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
    sounds.correct.play();
  } else {
    feedbackEl.textContent = `❌ Wrong! Answer: ${correct}`;
    sounds.wrong.play();
  }

  nextBtn.classList.remove("hidden");
}

function handleTimeout() {
  feedbackEl.textContent = "⏰ Time's up!";
  sounds.timeout.play();

  Array.from(document.getElementsByClassName("option-btn")).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === questions[current].answer) btn.style.backgroundColor = "#90ee90";
  });

  nextBtn.classList.remove("hidden");
}

function showFinal() {
  el("quiz-container").classList.add("hidden");
  el("end-screen").classList.remove("hidden");
  el("final-score").textContent = `You scored ${score} out of ${questions.length}`;
  el("badge").innerHTML = score >= 8
    ? "🏆 Excellent!"
    : score >= 5
    ? "👍 Good Job!"
    : "📘 Keep Practicing!";
}

const quizQuestions = [
    {
        question: "What is my absolute favorite food?",
        options: ["Pizza", "Burgers", "Tacos", "Sushi"],
        correct: 3
    },
    {
        question: "Where was our very first date?",
        options: ["The Park", "Coffee Shop", "The Movie Theater", "A Restaurant"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
const clickedLilies = new Set();
const totalLilies = 3;

const quizScreen = document.getElementById('quiz-screen');
const bouquetScreen = document.getElementById('bouquet-screen');
const letterScreen = document.getElementById('letter-screen');
const quizContainer = document.getElementById('quiz-container');
const lilyMsgBox = document.getElementById('lily-message');

function loadQuestion() {
    quizContainer.innerHTML = '';
    if (currentQuestionIndex < quizQuestions.length) {
        const currentData = quizQuestions[currentQuestionIndex];

        const qTitle = document.createElement('p');
        qTitle.style.fontSize = "18px";
        qTitle.style.fontWeight = "bold";
        qTitle.textContent = currentData.question;
        quizContainer.appendChild(qTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        currentData.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(idx);
            optionsDiv.appendChild(btn);
        });
        quizContainer.appendChild(optionsDiv);
    } else {
        quizScreen.classList.remove('active');
        bouquetScreen.classList.add('active');
    }
}

function checkAnswer(selectedIndex) {
    const currentData = quizQuestions[currentQuestionIndex];
    if (selectedIndex === currentData.correct) {
        
       
        const audio = document.querySelector('audio');
        if (audio) {
            audio.play().catch(err => console.log("Autoplay block bypassed: ", err));
        }
        
        currentQuestionIndex++;
        loadQuestion();
    } else {
        alert("Wrong answer! Try again! 😘");
    }
}

document.querySelectorAll('.lily-target').forEach(lily => {
    lily.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const msg = btn.getAttribute('data-msg');
        const idx = btn.getAttribute('data-index');

        lilyMsgBox.textContent = msg;
        btn.classList.add('clicked');
        clickedLilies.add(idx);

        if (clickedLilies.size === totalLilies) {
            setTimeout(() => {
                bouquetScreen.classList.remove('active');
                letterScreen.classList.add('active');
            }, 3000);
        }
    });
});

loadQuestion();

// 1. Configure your Custom Quiz Settings
const quizQuestions = [
    {
        question: "If pwde ka pumunta kahit saan rn san ka pupunta?",
        options: ["Betch", "Bundok", "City", "kahit san"],
       
    },
    {
        question: "peyborit time ng araw?",
        options: ["Umaga", "Tanghali", "Gabi", "Madaling araw"],
        
    }
     {
        question: "peyborit weather?",
        options: ["maaraw", "makulimlim", "maulan", "mahangin"],
        
    }
    {
        question: "peyborit food?",
        options: ["ice kreme", "price", "nodols", "any na matames"],
        
    }
];

let currentQuestionIndex = 0;
const clickedLilies = new Set();
const totalLilies = 2; // Setting this to 3 triggers the letter after 3 lily clicks!

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
        
        // This fires the hidden background music instantly on her first screen click
        const audio = document.getElementById('bg-music');
        if (audio && currentQuestionIndex === 0) {
            audio.play().catch(err => console.log("Autoplay active: ", err));
        }
        
        currentQuestionIndex++;
        loadQuestion();
    } else {
        alert("Wrong answer! Try again! 😘");
    }
}

// Lily Targeting Engine Logic Operations
document.querySelectorAll('.lily-target').forEach(lily => {
    lily.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const msg = btn.getAttribute('data-msg');
        const idx = btn.getAttribute('data-index');

        lilyMsgBox.textContent = msg;
        btn.classList.add('clicked');
        clickedLilies.add(idx);

        // Activates automated page fade sequence when exactly 3 unique lilies are clicked
        if (clickedLilies.size === totalLilies) {
            setTimeout(() => {
                bouquetScreen.classList.remove('active');
                letterScreen.classList.add('active');
            }, 2000); // 3-second reading delay window applied to the last unlocked phrase
        }
    });
});

loadQuestion();

const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer:[
            { text:"Shark", correct: false},
            { text:"Blue Whale", correct: true},
            { text:"Elephant", correct: false},
            { text:"Giraffe", correct: false}
        ]
    },
    {
        question: "What is the capital of Australia?",
        answer:[
            { text:"Sydney", correct: false},
            { text:"Brisbane", correct: false},
            { text:"Melbourne", correct: false},
            { text:"Canberra", correct: true}
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer:[
            { text:"Mars", correct: true},
            { text:"Venus", correct: false},
            { text:"Jupiter", correct: false},
            { text:"Saturn", correct: false}
        ]
    },
    {
        question: "Which country is the largest by land area?",
        answer:[
            { text:"Canada", correct: false},
            { text:"China", correct: false},
            { text:"Russia", correct: true},
            { text:"United States", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click" , ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
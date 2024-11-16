const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Questions related to Node.js and React
const questions = [
    {
        question: "What is Node.js?",
        options: ["a) A JavaScript library", "b) A JavaScript framework", "c) A runtime environment", "d) A database"],
        answer: "c"
    },
    {
        question: "Which company developed React?",
        options: ["a) Facebook", "b) Google", "c) Microsoft", "d) Apple"],
        answer: "a"
    },
    {
        question: "Which of the following is true about Node.js?",
        options: ["a) Node.js is single-threaded", "b) Node.js uses the browser for JavaScript execution", "c) Node.js is used to create mobile apps", "d) Node.js is based on JavaScript frameworks"],
        answer: "a"
    },
    {
        question: "Which command installs React using npm?",
        options: ["a) npm install react", "b) npm install react-app", "c) npm init react", "d) npm install create-react-app"],
        answer: "a"
    },
    {
        question: "Which function creates a new Node.js HTTP server?",
        options: ["a) http.createServer()", "b) http.newServer()", "c) node.createServer()", "d) node.newServer()"],
        answer: "a"
    },
    {
        question: "What is JSX in React?",
        options: ["a) A JavaScript extension", "b) A style library", "c) A type of database", "d) A method to call API in React"],
        answer: "a"
    },
    {
        question: "Which command creates a new React app?",
        options: ["a) npx create-react-app", "b) npm create-react-app", "c) npm init react", "d) react-create-app"],
        answer: "a"
    },
    {
        question: "What does npm start do in a React project?",
        options: ["a) Installs dependencies", "b) Starts the server", "c) Builds the production version", "d) Runs the test suite"],
        answer: "b"
    },
    {
        question: "Which of these is NOT a built-in Node.js module?",
        options: ["a) fs", "b) http", "c) axios", "d) path"],
        answer: "c"
    },
    {
        question: "What does React's useState hook do?",
        options: ["a) It updates the component's state", "b) It manages side effects", "c) It sets a default value", "d) It routes users to different pages"],
        answer: "a"
    }
];

let currentQuestionIndex = 0;
let score = 0;
const totalTime = 1400; // Total time for the quiz (in seconds)
const questionTime = 60; // Time per question (in seconds)

function askQuestion(questionData, callback) {
    console.log(`\nQuestion: ${questionData.question}`);
    questionData.options.forEach(option => console.log(option));

    rl.question('Your answer (a, b, c, d): ', (answer) => {
        answer = answer.toLowerCase();

        // Check if the answer is valid
        if (!['a', 'b', 'c', 'd'].includes(answer)) {
            console.log("Oops! That's not a valid answer. Please choose a, b, c, or d.");
            callback(false);  // Invalid answer
            return;
        }

        // Check if the answer is correct
        if (answer === questionData.answer) {
            score++;
            console.log("Nice! That's correct.");
        } else {
            console.log(`Oops! The correct answer was ${questionData.answer}.`);
        }
        callback(true);  // Valid answer, proceed to next question
    });
}

function startTimer() {
    let remainingTime = totalTime;
    let questionTimeRemaining = questionTime;
    let warned = false;

    const timer = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timer);
            console.log("\nTime's up! The quiz is over.");
            showFinalScore();
            rl.close();
            return;
        }

        if (questionTimeRemaining <= 0) {
            console.log("\nTime's up for this question!");
            currentQuestionIndex++;
            questionTimeRemaining = questionTime;  // Reset timer for next question
            warned = false;
        }

        if (questionTimeRemaining === 5 && !warned) {
            console.log("\nHurry up! Only 5 seconds left for this question!");
            warned = true;
        }

        if (remainingTime <= 5) {
            console.log(`\nOnly ${remainingTime} seconds left for the quiz.`);
        }

        if (questionTimeRemaining <= 5 && questionTimeRemaining > 0) {
            console.log(`Only ${questionTimeRemaining} seconds left for this question.`);
        }

        remainingTime--;
        questionTimeRemaining--;
    }, 1000);
}

function runQuiz() {
    startTimer();

    function askNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            const questionData = questions[currentQuestionIndex];
            askQuestion(questionData, (validAnswer) => {
                if (validAnswer) {
                    currentQuestionIndex++;
                }
                askNextQuestion(); // Move to the next question
            });
        } else {
            showFinalScore();
            rl.close();
        }
    }

    askNextQuestion();
}

function showFinalScore() {
    console.log(`\nYour final score is: ${score} out of ${questions.length}.`);
    if (score === questions.length) {
        console.log("Perfect score! Well done!");
    } else if (score >= questions.length / 2) {
        console.log("Good job! Keep learning and improving.");
    } else {
        console.log("Don't worry! Keep practicing, you'll get better.");
    }
}

runQuiz();

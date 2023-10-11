/* Function to generate random numbers between min and max (inclusive) */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const questions = [
    {
        generateQuestion: () => {
            const a = getRandomNumber(1, 5);
            const b = getRandomNumber(1, 5);
            return {
                question: `What is the gradient of f(x, y) = ${a}x^2 + ${b}y^2?`,
                choices: [`${2 * a}x`, `${2 * b}y`, `${2 * a}x, ${2 * b}y`, `${a}x, ${2 * b}y`],
                correct: [`${2 * a}x`, `${2 * b}y`]
            };
        }
    },
    {
        generateQuestion: () => {
            const a = getRandomNumber(1, 5);
            const b = getRandomNumber(1, 5);
            return {
                question: `What is the divergence of F(x, y, z) = (${a}x^2, ${b}yz, 3z)?`,
                choices: [`${2 * a}x + ${b}y + 3`, `${a}x^2 + ${b}yz + 3z`, `${2 * a}x + ${b}yz + 3`, `3`],
                correct: [`${2 * a}x + ${b}y + 3`]
            };
        }
    },
    {
        generateQuestion: () => {
            const a = getRandomNumber(1, 5);
            const b = getRandomNumber(1, 5);
            return {
                question: `What is the line integral of F(x, y) = (${a}y, ${b}x) along the curve C: y = x^2 from (0, 0) to (1, 1)?`,
                choices: [`${a / 3}`, `${b / 3}`, `${a / 4}`, `${b / 4}`],
                correct: [`${a / 3}`]
            };
        }
    },
    {
        generateQuestion: () => {
            const a = getRandomNumber(1, 5);
            const b = getRandomNumber(1, 5);
            const x = getRandomNumber(1, 10);
            const y = getRandomNumber(1, 10);
            return {
                question: `What is the value of f(x, y) = ${a}x^2 + ${b}y^2 at the point (${x}, ${y})?`,
                input: true,
                correct: `${a * x * x + b * y * y}`
            };
        }
    },
    {
        generateQuestion: () => {
            return {
                question: "Given the equation z^3 - xy + xe^y = 1, find Z_x and Z_y. Please put parentheses around both the numerator and the denominator in your answers.",
                input: true,
                correct: ["(-e^y) / (3z^2 - y)", "(z - ze^y) / (3z^2 - y)"]
            };
        }
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let userResponses = [];

function startQuiz() {
    currentQuestionIndex = 0;
    userResponses = [];
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const nextButton = document.getElementById("next-button");

    if (currentQuestionIndex < questions.length) {
        const currentQuestionData = questions[currentQuestionIndex].generateQuestion();

        questionElement.textContent = currentQuestionData.question;
        choicesElement.innerHTML = "";

        if (currentQuestionData.input) {
            const inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.placeholder = "Type your answer here";
            choicesElement.appendChild(inputElement);

            nextButton.style.display = "block";
            nextButton.textContent = "Submit";
            nextButton.onclick = () => {
                const userAnswer = inputElement.value.trim().toLowerCase();
                userResponses.push(userAnswer);
                currentQuestionIndex++;
                showQuestion();
            nextButton.style.display = "none";
            };
        } else {
            currentQuestionData.choices.forEach((choice) => {
                const choiceButton = document.createElement("button");
                choiceButton.textContent = choice;
                choiceButton.addEventListener("click", () => {
                    userResponses.push(choice);
                    currentQuestionIndex++;
                    showQuestion();
                });
                choicesElement.appendChild(choiceButton);
            });

            nextButton.style.display = "none";
        }
    } else {
       // Quiz is finished
       questionElement.textContent = "Quiz completed!";

       // Calculate and display the score
       const score = calculateScore();
       const scoreElement = document.createElement("p");
       scoreElement.textContent = "Your score: " + score + "/" + questions.length;
       questionElement.appendChild(scoreElement);

       // Add a button to review answers
       const reviewButton = document.createElement("button");
       reviewButton.textContent = "Review Answers";
       reviewButton.onclick = reviewAnswers;
       questionElement.appendChild(reviewButton);

       choicesElement.innerHTML = "";
       nextButton.textContent = "Restart";
       nextButton.style.display = "block";
       nextButton.onclick = startQuiz;
   }
}

function reviewAnswers() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");

    // Clear the existing content
    questionElement.innerHTML = "";
    choicesElement.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
        const questionData = questions[i].generateQuestion();
        const userResponse = userResponses[i];
        const correctAnswers = questionData.correct;

        const questionText = document.createElement("p");
        questionText.textContent = "Question " + (i + 1) + ": " + questionData.question;
        questionElement.appendChild(questionText);

        const userResponseText = document.createElement("p");
        userResponseText.textContent = "Your Answer: " + userResponse;
        questionElement.appendChild(userResponseText);

        const correctAnswerText = document.createElement("p");
        correctAnswerText.textContent = "Correct Answer(s): " + correctAnswers.join(", ");
        questionElement.appendChild(correctAnswerText);
    }
}

function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        const correctAnswers = questions[i].generateQuestion().correct;
        const userAnswer = userResponses[i];
        let isCorrect = true;

        for (const correctAnswer of correctAnswers) {
            if (!userAnswer.includes(correctAnswer)) {
                isCorrect = false;
                break;
            }
        }

        if (isCorrect) {
            score++;
        }
    }
    return score;
}

// Start the quiz
startQuiz();


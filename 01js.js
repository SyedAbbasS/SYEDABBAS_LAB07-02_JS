document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["New York", "London", "Paris", "Berlin"],
            answer: "Paris"
        },
        {
            question: "What is the largest ocean?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            answer: "Pacific"
        },
        // Add more questions as needed
    ];

    let currentQuestion = 0;
    let score = 0;
    let timer;
    const questionTime = 10; // Time in seconds for each question
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const submitButton = document.getElementById('submit');
    const resultElement = document.getElementById('result');

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        const countdown = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = `Time Left: ${minutes}:${seconds}`;

            if (--timer < 0) {
                clearInterval(countdown);
                moveToNextQuestion();
            }
        }, 1000);
        return countdown;
    }

    function loadQuestion() {
        // Clear previous options
        optionsElement.innerHTML = '';
        clearInterval(timer);

        if (currentQuestion >= questions.length) {
            // Quiz is over
            resultElement.innerHTML = `Quiz Completed! Your score is ${score}/${questions.length}. Percentage: ${(score / questions.length * 100).toFixed(2)}%`;
            submitButton.style.display = 'none';
            return;
        }

        const q = questions[currentQuestion];
        questionElement.innerText = q.question;

        const timeDisplay = document.createElement('div');
        optionsElement.appendChild(timeDisplay);
        timer = startTimer(questionTime, timeDisplay);

        q.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.innerText = option;
            optionElement.className = 'option';
            optionElement.onclick = function () {
                clearInterval(timer);
                if (option === q.answer) {
                    score++;
                }
                moveToNextQuestion();
            };
            optionsElement.appendChild(optionElement);
        });
    }

    function moveToNextQuestion() {
        currentQuestion++;
        loadQuestion();
    }

    loadQuestion();
});

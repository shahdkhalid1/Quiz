const questions = [
    {
        question: 'How many minutes are in a full week?',options:['11,200','10,080','12,050'],
        correctAnswer:'10,080'
    },
    {
        question:'Which planet in the Milky Way is the hottest?',options:['Venus','Earth','Mars'],
        correctAnswer:'Venus'
    },
    {
        question:'Which planet has the most moons?',options:['Saturn','Earth','Mars'],
        correctAnswer:'Saturn'
    },
    {
    question:'How many bones do we have in an ear?', options:["5","2","3"],
    correctAnswer:"3"
},
{
    question:"Which is the only body part that is fully grown from birth?",options:["Ears","Eyes","Brain"],
    correctAnswer:"Eyes"
},
{
    question:"How many hearts does an octopus have?",options:["3","8","1"],
    correctAnswer:"3"
},
{
    question:"What planet is closest to the sun?",options:["Venus","Mercury","Mars"],
    correctAnswer:"Mercury"
},
{
    question:"Where did sushi originate?",options:["Japan","India", "China"],
    correctAnswer:"China"
},
{
    question:"Who was the first Disney princess?",options:["Snow White","Cinderella","Belle"],
    correctAnswer:"Snow White"
},
{
    question:"Which southern Italian city is usually credited as the birthplace of the pizza?",options:["Naples","Rome","Venice"],
    correctAnswer:"Naples"
},
{
    question:"What language is spoken in Brazil?",options:["Spanish","Portuguese","English"],
    correctAnswer:"Portuguese"
},
{
    question:"What is the tallest building in the world?",options:["Shanghai Tower","Burj Khalifa","Merdeka"],
    correctAnswer:"Burj Khalifa"
},
{
    question:"How many chambers does the human heart have?",options:["3","2","4"],
    correctAnswer:"4"
},
{
    question:"What was the first movie released in the Marvel Cinematic Universe?",options:["Iron Man","Thor","Spider Man"],
    correctAnswer:"Iron Man"
},
{
    question:"Originally, Amazon only sold what kind of product?",options:["Electronics","Grocery","Books"],
    correctAnswer:"Books"
}

];

    let currentQuestionIndex = 0;
    let userScore = 0;
    let userName = '';

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    

    function startQuiz() {
        userName = document.getElementById('name').value;
        document.getElementById('start-container').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
    
        // Shuffle the questions before starting the quiz
        shuffle(questions);
    
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').innerText = currentQuestion.question;
    
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = ''; // Reset the options before updating for the current question
    
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => checkAnswer(option, currentQuestion.correctAnswer);
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(userAnswer, correctAnswer) {
        const isCorrect = userAnswer === correctAnswer;

        if (isCorrect) {
            userScore++;
        }

        // Display correct or wrong sign in the feedback bar
        const feedbackContainer = document.getElementById('feedback');
        feedbackContainer.innerHTML = isCorrect ? '✔ Correct!' : '❌  Wrong!';
        // Disable all buttons to prevent changing the answer
        const optionsContainer = document.getElementById('options');
        const optionButtons = Array.from(optionsContainer.children);
        optionButtons.forEach(optionButton => {
            optionButton.disabled = true;
        });

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            setTimeout(() => {
                resetOptions(); // Reset options before showing the next question
                showQuestion();
                // Clear the feedback bar for the next question
                feedbackContainer.innerHTML = '';
            }, 1000); // Delay to show feedback before moving to the next question
        } else {
            setTimeout(() => {
                showResult();
            }, 1000); // Delay before showing the result
        }
    }
    
    function resetOptions() {
        const optionsContainer = document.getElementById('options');
        const optionButtons = Array.from(optionsContainer.children);
    
        optionButtons.forEach(optionButton => {
            optionButton.disabled = false;
            optionButton.innerHTML = optionButton.innerText;
        });
    }
    function showResult() {
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
        document.getElementById('user-name').innerText = `Name: ${userName};`
        document.getElementById('user-score').innerText = `Score: ${userScore} out of ${questions.length};`

        // Save username and score in local storage
        const userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];
        userHistory.push({ name: userName, score: userScore });
        localStorage.setItem('userHistory', JSON.stringify(userHistory));
    }
    
    function showHistory() {
        document.getElementById('result-container').style.display = 'none';
        document.getElementById('history-container').style.display = 'block';
    
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
    
        // Retrieve and display user history from local storage
        const userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];
    
        userHistory.sort((a, b) => b.score - a.score);
    
        userHistory.forEach(player => {
            if (player.name && player.score !== undefined) {
                const listItem = document.createElement('li');
                listItem.innerText = `${player.name}: ${player.score} points;`
                historyList.appendChild(listItem);
            }
        });
    }
// Html elements

const question = document.getElementById("question");

const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


const btnNext = document.getElementById('btnNext');

const btnBack = document.getElementById('btnBack');












// Trackers

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let answers = [];
let checking = [];





// Fetch questions from a local database
fetch('/static/allura_website/js/questions.json')
    .then( res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startGame();
    })
    .catch( err => {
        console.error(err);
    });


// Constants


const MAX_QUESTIONS = 12;




// Quiz


startGame = () => {
    counter = 1;
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];




    // Remove back button if at question 1
    if (questionCounter === 0) {
        btnBack.style.display = "none";
        btnBack.disabled = true;
        // btnBack.style.color = "black";
    }

    // Function for new question
    getNewQuestion = () => {

        // Uncheck radio

        var ele = document.getElementsByName("radio");
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;

        // remove highlight from previous selected choice
        var elem = document.getElementsByClassName('group');
        for (var i = 0; i < elem.length; i++)
            elem[i].style.backgroundColor = '#fff';

        // remove border color from previous selected choice
        var elem = document.getElementsByClassName('group');
        for (var i = 0; i < elem.length; i++)
            elem[i].style.border = '2px solid #ccc';



        // Go to results page if all questions have been answered
        if (availableQuestions.length === 0 | questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            // go to the end page
            return window.location.assign('result');
        }



        // Update current question number
        progressText.innerText = `${counter}/${MAX_QUESTIONS}`;
        //Update the progress bar
        progressBarFull.style.width = `${(counter / MAX_QUESTIONS) * 100}%`;

        // Update question
        currentQuestion = availableQuestions[questionCounter];
        question.innerText = currentQuestion.question;










        // Update choices
        choices.forEach(choice => {

            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];

        });

        // // Validate
        // function validateOption(){
        //     var rbs = document.querySelectorAll('input[name="radio"]');

        //      for ( var i = 0; i < rbs.length; i++){
        //          if (rbs[i].checked)
        //              return true;
        //      }
        //         // else you can show error message like this
        //         document.getElementById("error").innerHTML="Please enter your choice";
        //         return false;
        // }

        // Accept answer to record chosen choice
        acceptingAnswers = true;


    };

    // Begin the assessment
    getNewQuestion();



    // Function for previous Question

    getPreviousQuestion = () => {


        // If a radio is checked, apply styles

        var elem = document.getElementsByName("radio");

        for (var i = 0; i < elem.length; i++) {
            if (elem[i].checked === true) {

                elem[i].parentElement.style.backgroundColor = "#28a7dc";
                elem[i].parentElement.style.border = '2px solid black';

            } else {
                elem[i].parentElement.style.border = '2px solid #ccc';
                elem[i].parentElement.style.backgroundColor = "#fff";

            }
        }




        // Go to results page if all questions have been answered
        if (availableQuestions.length === 0 | questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            // go to the end page
            return window.location.assign('result');
        }




        // Update current question number
        progressText.innerText = `${counter}/${MAX_QUESTIONS}`;
        //Update the progress bar
        progressBarFull.style.width = `${(counter / MAX_QUESTIONS) * 100}%`;

         // Update question
        currentQuestion = availableQuestions[questionCounter];
        question.innerText = currentQuestion.question;




        // Remove back button if at question 1
        if (questionCounter === 0) {
            btnBack.style.display = "none";
            btnBack.disabled = true;
        }



        // Update choices
        choices.forEach(choice => {

            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];

        });


        // Accept answer to record chosen choice
        acceptingAnswers = true;

    };



    // Function for calculating score

    incrementScore = num => {

        if (num === "1") {
            score += 1;
        } else if (num === "2") {
            score += 2;
        } else if (num === "3") {
            score += 3;
        } else if (num === "4") {
            score += 4;
        };

    };


    // Increment score based on chosen choice
    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target
            const selectedAnswer = selectedChoice.dataset["number"];
            console.log(selectedAnswer)





            incrementScore(selectedAnswer);

        });
    });








    // Next Button
    btnNext.addEventListener('click', () => {

        // Validate that a choice is picked
        if (acceptingAnswers) {
            swal("Oppss !", "Please pick a choice.", "error");
            return false
        }

        // Remove values inside checking
        checking = [];

        // Store radios
        const rbs = document.querySelectorAll('input[name="radio"]');





        // Store all the values of the checked radios into answers array and convert them into a number



        // When the next button is clicked, run a loop of the radios to check if one of them is checked
        // and if one of them is checked, increase the counter and question counter by 1 and get
        // a new question



        for (const rb of rbs) {
            if (rb.checked === true) {
                counter++;
                questionCounter++;
                if (counter > 1) {
                    btnBack.style.display = "inline-block";
                }

                getNewQuestion();

                // break
            }
        };
    });

    // Back Button

    btnBack.addEventListener('click', () => {

        // Take the last value in answers and put it inside checking. Minus this value from the score

        checking = answers.pop();

        score = score - checking;



        // Run a loop of the radios and check the radio which has the same value as the value in checking
        const rbs = document.querySelectorAll('input[name="radio"]');



        var rLen = rbs.length, i;
        for (i = 0; i < rbs.length; ++i) {
            if (checking === Number(rbs[i].value)) {
                rbs[i].checked = true;
            }
        }

        // Remove values in checking

        checking = [];


        // As long as counter is more than 1 and question counter is more than 0, take 1 away
        // from counter and questioncounter when the back button is clicked
        if (counter > 1 & questionCounter > 0) {
            counter--;
            questionCounter--;
        }


        // Previous question
        getPreviousQuestion();

    });





};


